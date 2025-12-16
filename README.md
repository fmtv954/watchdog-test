# BugOracle Watchdog Test Suite 🐛🔍

This repository contains **intentionally buggy code** designed to test BugOracle's AI Watchdog auto-fix capabilities.

## Bug Scenarios

| #   | Name                    | Description                        | File:Line        |
| --- | ----------------------- | ---------------------------------- | ---------------- |
| 1   | Null Reference          | Accessing property of null user    | src/index.js:35  |
| 2   | Type Coercion           | String concat instead of addition  | src/index.js:52  |
| 3   | Missing Await           | Not awaiting async function        | src/index.js:67  |
| 4   | Off-by-One              | Array index out of bounds          | src/index.js:80  |
| 5   | Wrong Delimiter         | CSV parsed with semicolon          | src/index.js:93  |
| 6   | Unhandled Promise       | Missing try/catch                  | src/index.js:105 |
| 7   | Variable Shadowing      | Loop variable collision            | src/index.js:116 |
| 8   | Property Typo           | Wrong case: firstname vs firstName | src/index.js:135 |
| 9   | Assignment in Condition | Using = instead of ===             | src/index.js:152 |
| 10  | Array Method Misuse     | find() instead of filter()         | src/index.js:171 |

## Additional Bugs in Services

### UserService (src/services/userService.js)

- Returns null for missing users
- Missing return statement in getAllUsers
- No existence check before delete

### DataProcessor (src/services/dataProcessor.js)

- forEach with async callbacks (doesn't await)
- No null checks for nested properties
- Division by zero with empty arrays

### ApiClient (src/services/apiClient.js)

- No error handling for failed fetches
- Promise.all fails on any rejection
- Infinite recursion in retry logic
- Race condition in caching

### Calculator (src/utils/calculator.js)

- Type coercion bugs
- Wrong percentage formula
- toFixed returns string
- filter(Boolean) removes valid zeros

### StringUtils (src/utils/stringUtils.js)

- Wrong CSV delimiter
- Empty string handling
- Only replaces first occurrence
- Returns strings instead of numbers

## Running Tests

```bash
# Install dependencies
npm install

# Start the test server
npm start

# Run a specific scenario
npm run test:scenario 1

# Run all tests
npm test
```

## Testing with BugOracle

1. The server integrates with BugOracle SDK
2. Errors are automatically tracked
3. Watchdog evaluates severity and triggers auto-fix
4. AI analyzes code and generates patches
5. Draft PR created with fix

## API Endpoints

All endpoints are designed to fail in specific ways:

- `GET /api/users/:id` - Null reference error
- `POST /api/calculate` - Type coercion bug
- `GET /api/data` - Missing await
- `POST /api/items/last` - Off-by-one error
- `POST /api/parse-csv` - Wrong delimiter
- `GET /api/external` - Unhandled rejection
- `POST /api/matrix` - Variable shadowing
- `POST /api/user/update` - Property typo
- `GET /api/status/:code` - Assignment bug
- `GET /api/search` - Array method misuse
