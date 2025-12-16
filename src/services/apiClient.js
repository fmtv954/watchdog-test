/**
 * API Client
 * Contains error handling and promise bugs
 */

export class ApiClient {
  /**
   * Fetch from external URL
   * BUG: No error handling for failed requests
   */
  async fetchExternal(url) {
    // BUG: No validation of URL
    // BUG: No try/catch, throws on any failure
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  /**
   * Batch fetch multiple URLs
   * BUG: Promise.all fails if any request fails
   */
  async batchFetch(urls) {
    // BUG: Should use Promise.allSettled for partial success
    const results = await Promise.all(
      urls.map(url => this.fetchExternal(url))
    );
    return results;
  }

  /**
   * Fetch with retry
   * BUG: Infinite recursion if always failing
   */
  async fetchWithRetry(url, retries = 3) {
    try {
      return await this.fetchExternal(url);
    } catch (error) {
      // BUG: Retries forever even when retries = 0
      return this.fetchWithRetry(url, retries - 1);
    }
  }

  /**
   * Cache fetch result
   * BUG: Race condition with concurrent calls
   */
  async cachedFetch(url) {
    if (!this.cache) {
      this.cache = {};
    }

    if (this.cache[url]) {
      return this.cache[url];
    }

    // BUG: Multiple concurrent calls will all fetch
    const data = await this.fetchExternal(url);
    this.cache[url] = data;
    return data;
  }
}
