/**
 * Calculator Utility
 * Contains type coercion and math bugs
 */

export class Calculator {
  /**
   * Add two numbers
   * BUG: Doesn't convert strings to numbers
   */
  add(a, b) {
    // BUG: If a or b are strings, this concatenates
    return a + b;
  }

  /**
   * Multiply two numbers
   * BUG: Also doesn't convert, but * coerces differently
   */
  multiply(a, b) {
    return a * b;
  }

  /**
   * Divide with validation
   * BUG: Checks for 0 but not for non-numbers
   */
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    // BUG: Doesn't check if a and b are actually numbers
    return a / b;
  }

  /**
   * Calculate percentage
   * BUG: Wrong formula - divides wrong way
   */
  percentage(value, total) {
    // BUG: Should be (value / total) * 100
    return (total / value) * 100;
  }

  /**
   * Round to decimal places
   * BUG: toFixed returns string, not number
   */
  round(value, decimals) {
    // BUG: Returns string, not number
    return value.toFixed(decimals);
  }

  /**
   * Calculate average of array
   * BUG: Filter removes valid 0 values
   */
  average(numbers) {
    // BUG: filter(Boolean) removes 0 values which are valid
    const validNumbers = numbers.filter(Boolean);
    const sum = validNumbers.reduce((a, b) => a + b, 0);
    return sum / validNumbers.length;
  }
}
