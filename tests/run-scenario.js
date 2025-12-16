/**
 * Test Runner for Watchdog Scenarios
 * 
 * This script triggers each bug scenario and reports errors.
 * Run with: node tests/run-scenario.js <scenario-number>
 */

const scenarios = {
  1: {
    name: 'Null Reference Error',
    description: 'Accessing property of null user',
    endpoint: '/api/users/999',  // Non-existent user
    method: 'GET',
    expectedError: 'Cannot read properties of null'
  },
  2: {
    name: 'Type Coercion Bug',
    description: 'String concatenation instead of addition',
    endpoint: '/api/calculate',
    method: 'POST',
    body: { a: '5', b: '3' },  // Strings instead of numbers
    expectedResult: { sum: '53', product: 15 }  // sum should be 8, not "53"
  },
  3: {
    name: 'Missing Await',
    description: 'Not awaiting async function',
    endpoint: '/api/data',
    method: 'GET',
    expectedError: 'data is a Promise, not array'
  },
  4: {
    name: 'Off-by-One Error',
    description: 'Array index out of bounds',
    endpoint: '/api/items/last',
    method: 'POST',
    body: { items: ['a', 'b', 'c'] },
    expectedResult: { last: undefined }  // Should be 'c'
  },
  5: {
    name: 'Wrong Delimiter',
    description: 'CSV parsed with wrong delimiter',
    endpoint: '/api/parse-csv',
    method: 'POST',
    body: { csvData: 'name,age,city\nAlice,30,NYC' },
    expectedError: 'Parsed incorrectly'
  },
  6: {
    name: 'Unhandled Promise',
    description: 'No try/catch in async operation',
    endpoint: '/api/external?url=invalid',
    method: 'GET',
    expectedError: 'Unhandled promise rejection'
  },
  7: {
    name: 'Variable Shadowing',
    description: 'Loop variable collision',
    endpoint: '/api/matrix',
    method: 'POST',
    body: { matrix: [[1,2],[3,4]] },
    expectedError: 'Infinite loop or wrong result'
  },
  8: {
    name: 'Property Typo',
    description: 'Wrong property name (case sensitive)',
    endpoint: '/api/user/update',
    method: 'POST',
    body: { userId: '1', updates: { firstName: 'Alicia', lastName: 'Smithson' } },
    expectedError: 'Property not updated correctly'
  },
  9: {
    name: 'Assignment in Condition',
    description: 'Using = instead of === in if statement',
    endpoint: '/api/status/inactive',
    method: 'GET',
    expectedResult: { status: 'User is active' }  // Always active due to bug
  },
  10: {
    name: 'Array Method Misuse',
    description: 'find() returns single item, not array',
    endpoint: '/api/search?role=admin',
    method: 'GET',
    expectedError: 'admins.length is not iterable'
  }
};

async function runScenario(scenarioNum) {
  const scenario = scenarios[scenarioNum];
  if (!scenario) {
    console.log('Available scenarios:');
    Object.entries(scenarios).forEach(([num, s]) => {
      console.log(`  ${num}: ${s.name} - ${s.description}`);
    });
    return;
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`SCENARIO ${scenarioNum}: ${scenario.name}`);
  console.log(`Description: ${scenario.description}`);
  console.log(`Endpoint: ${scenario.method} ${scenario.endpoint}`);
  console.log('='.repeat(60));

  try {
    const baseUrl = process.env.TEST_URL || 'http://localhost:3001';
    const url = baseUrl + scenario.endpoint;
    
    const options = {
      method: scenario.method,
      headers: { 'Content-Type': 'application/json' },
    };
    
    if (scenario.body) {
      options.body = JSON.stringify(scenario.body);
    }

    console.log('\nSending request...');
    const response = await fetch(url, options);
    const data = await response.json();
    
    console.log('\nResponse:', JSON.stringify(data, null, 2));
    
    if (scenario.expectedError) {
      console.log(`\n⚠️  Expected Error: ${scenario.expectedError}`);
    }
    if (scenario.expectedResult) {
      console.log(`\n⚠️  Expected (buggy) Result: ${JSON.stringify(scenario.expectedResult)}`);
    }

  } catch (error) {
    console.error('\n❌ Request Failed:', error.message);
  }
}

// Run specified scenario or show all
const scenarioNum = process.argv[2];
runScenario(scenarioNum ? parseInt(scenarioNum) : null);
