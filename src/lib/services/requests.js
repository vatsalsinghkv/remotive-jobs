const requests = {
  /**
   * Returns the url to fetch all the jobs
   * @returns {String} - baseURL/
   */

  all(query = '') {
    if (query) return `/?search=${query}`;
    return `/`;
  },
  categories(category = '', query = '') {
    if (category)
      return `?category=${category}${query ? '&search=' + query : ''}`;
    return `/categories`;
  },
};

export default requests;
