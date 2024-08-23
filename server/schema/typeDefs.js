const gql = String.raw;

const typeDefs = gql`
  type User {
    id: ID
    name: String
    age: Int
  }

  type Response {
    message: String
  }

  type Query {
    getUser: User
  }

  type Mutation {
    registerUser(username: String, email: String, password: String): User
    loginUser(email: String, password: String): User
  }
`;

module.exports = typeDefs;