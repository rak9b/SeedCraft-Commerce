#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Load seed data
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8'))
const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8'))

console.log('Seeding data...')

// In a real implementation, this would connect to Firebase or MongoDB
// and insert the seed data. For now, we'll just log what would be seeded.

console.log(`Seeding ${productsData.length} products:`)
productsData.forEach((product, index) => {
  console.log(`${index + 1}. ${product.title} (${product.genus} ${product.commonName}) - ${product.price} BDT`)
})

console.log(`\nSeeding ${usersData.length} users:`)
usersData.forEach((user, index) => {
  console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`)
})

console.log('\n✅ Seeding completed!')

// Export for use in other scripts
module.exports = { productsData, usersData }