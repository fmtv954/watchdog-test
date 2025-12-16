/**
 * BugOracle Watchdog Test Suite
 * 
 * This application contains INTENTIONAL BUGS for testing the AI auto-fix capabilities.
 * Each module demonstrates a different type of common programming error.
 * 
 * Bug Categories:
 * 1. Null/Undefined Reference Errors
 * 2. Type Coercion Bugs
 * 3. Async/Await Mistakes
 * 4. Array/Loop Logic Errors
 * 5. String Handling Bugs
 * 6. Object/Property Access Errors
 */

import express from 'express';
import { UserService } from './services/userService.js';
import { DataProcessor } from './services/dataProcessor.js';
import { ApiClient } from './services/apiClient.js';
import { Calculator } from './utils/calculator.js';
import { StringUtils } from './utils/stringUtils.js';
import { initBugOracle } from './bugoracle.js';

const app = express();
app.use(express.json());

// Initialize BugOracle SDK
initBugOracle();

// ============================================
// SCENARIO 1: Null Reference Error
// Bug: Accessing property of null user
// ============================================
app.get('/api/users/:id', async (req, res) => {
  try {
    const userService = new UserService();
    const user = await userService.findById(req.params.id);
    
    // BUG: user can be null, accessing .name will throw
    const greeting = `Hello, ${user.name}!`;
    const email = user.email.toLowerCase();
    
    res.json({ greeting, email, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SCENARIO 2: Type Coercion Bug
// Bug: String concatenation instead of addition
// ============================================
app.post('/api/calculate', (req, res) => {
  try {
    const { a, b } = req.body;
    const calculator = new Calculator();
    
    // BUG: If a and b are strings from JSON, this concatenates
    const sum = calculator.add(a, b);
    const product = calculator.multiply(a, b);
    
    res.json({ sum, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SCENARIO 3: Async/Await Missing
// Bug: Not awaiting async function
// ============================================
app.get('/api/data', async (req, res) => {
  try {
    const processor = new DataProcessor();
    
    // BUG: Forgot to await, result is a Promise not data
    const result = processor.fetchAndProcess();
    
    res.json({ data: result, count: result.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SCENARIO 4: Off-by-One Error
// Bug: Array index out of bounds
// ============================================
app.post('/api/items/last', (req, res) => {
  try {
    const { items } = req.body;
    
    // BUG: Should be items.length - 1
    const lastItem = items[items.length];
    const firstItem = items[0];
    
    res.json({ first: firstItem, last: lastItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SCENARIO 5: String Split Bug
// Bug: Wrong delimiter causes incorrect parsing
// ============================================
app.post('/api/parse-csv', (req, res) => {
  try {
    const { csvData } = req.body;
    const stringUtils = new StringUtils();
    
    // BUG: CSV uses commas, but splitting by semicolon
    const rows = stringUtils.parseCSV(csvData);
    
    res.json({ rows, count: rows.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SCENARIO 6: Promise Rejection Not Handled
// Bug: Missing try/catch in async operation
// ============================================
app.get('/api/external', async (req, res) => {
  const client = new ApiClient();
  
  // BUG: No try/catch, unhandled promise rejection
  const data = await client.fetchExternal(req.query.url);
  res.json(data);
});

// ============================================
// SCENARIO 7: Loop Variable Shadowing
// Bug: Variable name collision in nested loop
// ============================================
app.post('/api/matrix', (req, res) => {
  try {
    const { matrix } = req.body;
    let total = 0;
    
    // BUG: Inner loop uses same variable 'i', causes infinite loop
    for (let i = 0; i < matrix.length; i++) {
      for (let i = 0; i < matrix[i].length; i++) {
        total += matrix[i][i];
      }
    }
    
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SCENARIO 8: Object Property Typo
// Bug: Accessing wrong property name
// ============================================
app.post('/api/user/update', async (req, res) => {
  try {
    const userService = new UserService();
    const { userId, updates } = req.body;
    
    const user = await userService.findById(userId);
    
    // BUG: Property is 'firstName' not 'firstname' (case sensitive)
    user.firstname = updates.firstName;
    user.lastname = updates.lastName;
    
    await userService.save(user);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SCENARIO 9: Comparison Bug
// Bug: Using = instead of === in condition
// ============================================
app.get('/api/status/:code', (req, res) => {
  try {
    const code = req.params.code;
    let status;
    
    // BUG: Assignment (=) instead of comparison (===)
    if (code = 'active') {
      status = 'User is active';
    } else if (code = 'inactive') {
      status = 'User is inactive';
    } else {
      status = 'Unknown status';
    }
    
    res.json({ code, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SCENARIO 10: Array Method Misuse
// Bug: Using find() expecting array, returns single item
// ============================================
app.get('/api/search', (req, res) => {
  try {
    const users = [
      { id: 1, name: 'Alice', role: 'admin' },
      { id: 2, name: 'Bob', role: 'user' },
      { id: 3, name: 'Charlie', role: 'admin' },
    ];
    
    const { role } = req.query;
    
    // BUG: find returns single item, should use filter for multiple
    const admins = users.find(u => u.role === role);
    
    res.json({ admins, count: admins.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Watchdog Test Server running on port ${PORT}`);
});
