const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const app = express();
const PORT = process.env.PORT || 3333;

function generateId() {
  let min = 1000000000000000; // 10^15
  let max = 9999999999999999; // 10^16 - 1
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const user = {
  name: 'JD',
  age: 44,
  password: 'some secret'
}

const users = [
  {
    id: 1,
    name: 'JD',
    age: 44,
    password: 'some secret'
  },
  {
    id: 2,
    name: 'Bob',
    age: 99,
    password: 'some secret'
  },
  {
    id: 3,
    name: 'Sarah',
    age: 40,
    password: 'some secret'
  }
]

const typeDefs = `
  type User {
    id: ID
    name: String
    age: Int!
  }

  type Response {
    message: String
  }

  type Query {
    getUser: User
    getUserById(user_id: ID): User
    getAllUsers: [User]
  }

  type Mutation {
    createUser(name: String, age: Int, password: String): Response
  }
`;

const resolvers = {
  Query: {
    getUser() {
      return user;
    },
    getUserById(_, args) {
      const user = users.find((userObj) => userObj.id == args.user_id);

      return user;
    },
    getAllUsers() {
      return users;
    }
  },

  Mutation: {
    createUser(_, userObj) {
      userObj.id = generateId();

      users.push(userObj);

      return {
        message: 'User created successfully!'
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();

  app.use(
    '/graphql',
    // cors(), 
    express.json(),
    expressMiddleware(server)
  );

  app.listen(PORT, () => {
    console.log('Express server running on port', PORT);
    console.log('GraphQL ready at /graphql');
  })
}

startServer();