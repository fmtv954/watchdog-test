/**
 * User Service
 * Contains bugs related to null handling and async operations
 */

const mockUsers = {
  '1': { id: '1', name: 'Alice', email: 'alice@example.com', firstName: 'Alice', lastName: 'Smith' },
  '2': { id: '2', name: 'Bob', email: 'bob@example.com', firstName: 'Bob', lastName: 'Jones' },
};

export class UserService {
  constructor() {
    this.users = { ...mockUsers };
  }

  /**
   * Find user by ID
   * Note: Returns null for non-existent users (intentional for testing)
   */
  async findById(id) {
    // Simulating async database call
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // BUG: Returns undefined/null for missing users
    return this.users[id] || null;
  }

  /**
   * Save user
   */
  async save(user) {
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // BUG: Doesn't validate user object before saving
    this.users[user.id] = user;
    return user;
  }

  /**
   * Get all users
   * BUG: Async function that forgets to return
   */
  async getAllUsers() {
    await new Promise(resolve => setTimeout(resolve, 10));
    // BUG: Missing return statement
    Object.values(this.users);
  }

  /**
   * Delete user
   * BUG: Doesn't check if user exists before delete
   */
  async deleteUser(id) {
    // BUG: No existence check, no error handling
    delete this.users[id];
    return { deleted: true };
  }
}
