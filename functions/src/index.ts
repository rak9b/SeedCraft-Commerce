import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

// Function to set user role
export const setUserRole = functions.https.onCall(async (data, context) => {
  // Check if the requesting user is an admin
  if (!context.auth || !context.auth.token.role || context.auth.token.role !== 'Admin') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only admins can set user roles'
    )
  }

  const { uid, role } = data

  // Validate input
  if (!uid || !role) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'uid and role are required'
    )
  }

  try {
    // Update the user's custom claims
    await admin.auth().setCustomUserClaims(uid, { role })
    
    // Also update the user document in Firestore
    await admin.firestore().collection('users').doc(uid).update({
      role,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })

    return { success: true, message: `User role updated to ${role}` }
  } catch (error) {
    console.error('Error updating user role:', error)
    throw new functions.https.HttpsError(
      'internal',
      'Failed to update user role'
    )
  }
})

// Function to log audit events
export const logAuditEvent = functions.firestore
  .document('auditLogs/{logId}')
  .onCreate((snap, context) => {
    const logData = snap.data()
    console.log(`Audit Event: ${logData.action} by ${logData.userId} at ${logData.timestamp}`)
    return null
  })

// Function to aggregate analytics data
export const aggregateAnalytics = functions.pubsub
  .schedule('every 1 hours from 00:00 to 23:00')
  .timeZone('Asia/Dhaka')
  .onRun(async (context) => {
    console.log('Aggregating analytics data...')
    
    // In a real implementation, this would aggregate data from various sources
    // and store the results in a separate collection for faster querying
    
    return null
  })

// Function to handle order creation
export const onOrderCreate = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snap, context) => {
    const order = snap.data()
    
    // Log the order creation
    await admin.firestore().collection('auditLogs').add({
      action: 'order_created',
      userId: order.userId,
      orderId: context.params.orderId,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
    
    // Update inventory
    const productRefs = order.items.map((item: any) => 
      admin.firestore().collection('products').doc(item.productId)
    )
    
    const products = await admin.firestore().getAll(...productRefs)
    
    const batch = admin.firestore().batch()
    
    products.forEach((productSnap, index) => {
      const product = productSnap.data()
      const orderItem = order.items[index]
      
      if (product && product.stock >= orderItem.quantity) {
        batch.update(productSnap.ref, {
          stock: product.stock - orderItem.quantity
        })
      } else {
        // Handle insufficient stock - in a real app, you might want to cancel the order
        console.warn(`Insufficient stock for product ${productSnap.id}`)
      }
    })
    
    await batch.commit()
    
    return null
  })