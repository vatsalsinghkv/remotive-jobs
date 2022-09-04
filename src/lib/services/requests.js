const requests = {
  /**
   * Returns the url to fetch all the jobs
   * @returns {String} - baseURL/
   */

  all(limit) {
    if (limit) return `?limit=10`;
    return `/`;
  },
  categories(category = '') {
    if (category) return `?category=${category}`;
    return `/categories`;
  },
  search(query) {
    return `search/${query}`;
  },
  companyName(company) {
    return `company_name/${company}`;
  },
};

export default requests;
