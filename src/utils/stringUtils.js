/**
 * String Utilities
 * Contains string parsing and manipulation bugs
 */

export class StringUtils {
  /**
   * Parse CSV data
   * BUG: Uses wrong delimiter
   */
  parseCSV(data) {
    // BUG: CSV uses comma, not semicolon
    const rows = data.split('\n');
    return rows.map(row => row.split(';'));
  }

  /**
   * Capitalize first letter
   * BUG: Doesn't handle empty strings
   */
  capitalize(str) {
    // BUG: str[0] is undefined for empty string
    return str[0].toUpperCase() + str.slice(1);
  }

  /**
   * Truncate string
   * BUG: Off-by-one in length check
   */
  truncate(str, maxLength) {
    // BUG: Should be > not >=
    if (str.length >= maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  /**
   * Parse JSON safely
   * BUG: Catches error but returns undefined, not null
   */
  safeParseJSON(str) {
    try {
      return JSON.parse(str);
    } catch {
      // BUG: Returns undefined implicitly, caller may not handle
    }
  }

  /**
   * Validate email
   * BUG: Regex is too simple, allows invalid emails
   */
  isValidEmail(email) {
    // BUG: This regex is way too permissive
    return email.includes('@');
  }

  /**
   * Slugify string
   * BUG: Doesn't handle multiple spaces or special chars
   */
  slugify(str) {
    // BUG: Only replaces first space, not all
    return str.toLowerCase().replace(' ', '-');
  }

  /**
   * Extract numbers from string
   * BUG: Returns strings, not numbers
   */
  extractNumbers(str) {
    // BUG: match returns strings, should parse to numbers
    return str.match(/\d+/g);
  }

  /**
   * Pad string to length
   * BUG: Doesn't handle when str is longer than length
   */
  padLeft(str, length, char = ' ') {
    // BUG: If str.length > length, this returns incorrect result
    return char.repeat(length - str.length) + str;
  }
}
