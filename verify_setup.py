#!/usr/bin/env python3
"""
Verification script to check if all dependencies are properly installed
for the Plant E-Commerce Platform.
"""

import sys
import importlib
import subprocess

def check_python_version():
    """Check if Python version is compatible"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8 or higher is required")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} is installed")
    return True

def check_package(package_name, import_name=None):
    """Check if a Python package is installed"""
    if import_name is None:
        import_name = package_name
    
    try:
        importlib.import_module(import_name)
        print(f"✅ {package_name} is installed")
        return True
    except ImportError:
        print(f"❌ {package_name} is not installed")
        return False

def check_node_and_npm():
    """Check if Node.js and npm are installed"""
    try:
        # Check Node.js
        result = subprocess.run(['node', '--version'], 
                              capture_output=True, text=True, check=True)
        print(f"✅ Node.js {result.stdout.strip()} is installed")
        
        # Check npm
        result = subprocess.run(['npm', '--version'], 
                              capture_output=True, text=True, check=True)
        print(f"✅ npm {result.stdout.strip()} is installed")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Node.js and/or npm are not installed")
        return False

def check_dependencies():
    """Check all required dependencies"""
    print("🔍 Checking Python dependencies...")
    
    dependencies = [
        ("fastapi", "fastapi"),
        ("uvicorn", "uvicorn"),
        ("motor", "motor.motor_asyncio"),
        ("pydantic", "pydantic"),
        ("pydantic-settings", "pydantic_settings"),
        ("python-jose", "jose"),
        ("passlib", "passlib"),
        ("bcrypt", "bcrypt"),
        ("python-multipart", "multipart"),
        ("pytz", "pytz"),
        ("bson", "bson"),
    ]
    
    all_good = True
    for package_name, import_name in dependencies:
        if not check_package(package_name, import_name):
            all_good = False
    
    return all_good

def check_frontend_dependencies():
    """Check if frontend dependencies are installed"""
    print("\n🔍 Checking frontend dependencies...")
    
    try:
        # Check if node_modules exists in web directory
        import os
        if os.path.exists("apps/web/node_modules"):
            print("✅ Frontend dependencies are installed")
            return True
        else:
            print("❌ Frontend dependencies are not installed. Run 'npm install'")
            return False
    except Exception as e:
        print(f"❌ Error checking frontend dependencies: {e}")
        return False

def main():
    """Main verification function"""
    print("🚀 Verifying Plant E-Commerce Platform Setup\n")
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Check Node.js and npm
    if not check_node_and_npm():
        sys.exit(1)
    
    # Check Python dependencies
    python_deps_ok = check_dependencies()
    
    # Check frontend dependencies
    frontend_deps_ok = check_frontend_dependencies()
    
    print("\n📋 Summary:")
    if python_deps_ok and frontend_deps_ok:
        print("✅ All dependencies are properly installed!")
        print("\n🎉 You're ready to run the Plant E-Commerce Platform!")
        print("\nTo start the application:")
        print("1. Start MongoDB (or run 'cd infra && docker-compose up -d')")
        print("2. Start the backend: cd apps/api && python -m uvicorn main:app --reload")
        print("3. Start the frontend: cd apps/web && npm run dev")
    else:
        print("❌ Some dependencies are missing!")
        print("\n🔧 Please run the setup script:")
        print("   On Linux/Mac: ./setup.sh")
        print("   On Windows: setup.bat")
        sys.exit(1)

if __name__ == "__main__":
    main()