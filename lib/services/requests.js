const requests = {
  categories(category) {
    return `categories/${category}`;
  },
  search(query) {
    return `search/${query}`;
  },
  companyName(company) {
    return `company_name/${company}`;
  },
};

export default requests;
