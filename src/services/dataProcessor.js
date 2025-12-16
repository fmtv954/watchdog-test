/**
 * Data Processor
 * Contains async/await and data handling bugs
 */

export class DataProcessor {
  /**
   * Fetch and process data
   * This is ASYNC but callers may forget to await
   */
  async fetchAndProcess() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return [
      { id: 1, value: 'processed-1' },
      { id: 2, value: 'processed-2' },
      { id: 3, value: 'processed-3' },
    ];
  }

  /**
   * Process array of items
   * BUG: forEach doesn't work with async callbacks properly
   */
  async processAll(items) {
    const results = [];
    
    // BUG: forEach doesn't wait for async callbacks
    items.forEach(async (item) => {
      const processed = await this.processItem(item);
      results.push(processed);
    });
    
    // Returns before forEach callbacks complete
    return results;
  }

  async processItem(item) {
    await new Promise(resolve => setTimeout(resolve, 10));
    return { ...item, processed: true };
  }

  /**
   * Transform data with potential undefined access
   * BUG: Doesn't check for nested property existence
   */
  transformData(data) {
    // BUG: data.user.profile.settings may not exist
    const theme = data.user.profile.settings.theme;
    const fontSize = data.user.profile.settings.fontSize;
    
    return { theme, fontSize };
  }

  /**
   * Aggregate numbers
   * BUG: Doesn't handle empty arrays
   */
  aggregate(numbers) {
    // BUG: Divide by zero when array is empty
    const sum = numbers.reduce((a, b) => a + b, 0);
    const average = sum / numbers.length;
    
    return { sum, average, count: numbers.length };
  }
}
