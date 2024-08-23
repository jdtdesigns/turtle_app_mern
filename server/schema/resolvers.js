const resolvers = {
  Query: {
    getUser() {
      return {
        name: 'JD',
        age: 44
      };
    }
  }
};

module.exports = resolvers;