const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3333;

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

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log('Express server running on port', PORT);
      console.log('GraphQL ready at /graphql');
    });
  });
}

startServer();