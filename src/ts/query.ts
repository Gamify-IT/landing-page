/**
 * Read query parameters from the URL.
 */
export class QueryParams {
  /**
   * Get the value of a query parameter.
   * @param name The name of the query parameter.
   */
  static get(name: string): string | null {
    // parse query parameters
    const props = window.location.search
      .slice(1)
      .split('&')
      .map((e) => e.split('='));

    // find and return the query parameter with the given name
    for (const prop of props) {
      if (prop[0] === name) {
        return prop[1];
      }
    }

    // query parameter not found
    return null;
  }
}
