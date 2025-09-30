#!/usr/bin/env node

// Simple test script to verify ES modules are working correctly
import express from 'express';

console.log('✅ ES Modules are working correctly!');
console.log('✅ Express import successful:', typeof express);

// Test that all main imports work
try {
  await import('./Routes/user-routes.js');
  console.log('✅ User routes import successful');
  
  await import('./Controllers/user-controllers.js');
  console.log('✅ User controllers import successful');
  
  await import('./Models/user-model.js');
  console.log('✅ User model import successful');
  
  await import('./Middlewares/auth.js');
  console.log('✅ Auth middleware import successful');
  
  console.log('\n🎉 All ES module conversions completed successfully!');
  console.log('📝 Note: MongoDB connection error is expected without proper .env setup');
  
} catch (error) {
  console.error('❌ ES module import error:', error.message);
  process.exit(1);
}

process.exit(0);