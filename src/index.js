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
    
    if (user) {
      const greeting = `Hello, ${user.name}!`;
      const email = user.email.toLowerCase();
      res.json({ greeting, email, user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
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
    
    const sum = calculator.add(Number(a), Number(b));
    const product = calculator.multiply(Number(a), Number(b));
    
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
    
    const result = await processor.fetchAndProcess();
    
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
    
    const lastItem = items[items.length - 1];
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
    
    const rows = stringUtils.parseCSV(csvData, ',');
    
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
  try {
    const client = new ApiClient();
    const data = await client.fetchExternal(req.query.url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SCENARIO 7: Loop Variable Shadowing
// Bug: Variable name collision in nested loop
// ============================================
app.post('/api/matrix', (req, res) => {
  try {
    const { matrix } = req.body;
    let total = 0;
    
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        total += matrix[i][j];
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
    
    if (user) {
      // Assume updates is an object with correct properties
      Object.assign(user, updates);
      await userService.updateUser(user);
      res.json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});