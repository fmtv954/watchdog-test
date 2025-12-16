// Utility functions for user management

/**
 * Get the uppercase name from a user object
 * @param {Object} user - User object with name property
 * @returns {string} Uppercase name
 */
function getUserName(user) {
  // BUG: Crashes when user is null or undefined
  return user.name.toUpperCase();
}

/**
 * Format user greeting
 */
function greetUser(user) {
  const name = getUserName(user);
  return `Hello, ${name}!`;
}

module.exports = { getUserName, greetUser };
