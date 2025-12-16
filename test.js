const { getUserName, greetUser } = require('./index');

// Test cases
console.log("Testing getUserName...");

// This will crash - null user
try {
  getUserName(null);
} catch (e) {
  console.error("Error: Cannot read properties of null (reading 'name')");
  console.error("  at getUserName (index.js:10:15)");
}
