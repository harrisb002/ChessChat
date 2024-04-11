require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const app = express();
const path = require("path");
const schema = require("./schema/schema");
const { ApolloServer } = require("apollo-server-express");
const responseCachePlugin = require("apollo-server-plugin-response-cache");

const port = process.env.DB_PORT || 9000;
const connectDB = require("./config/connection");

const startServer = async () => {
  // Connect to the database
  connectDB();
  app.use(cors());

  // Set up Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [responseCachePlugin.default()],
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(port, console.log(`Server running on port ${port}`.cyan));
};

startServer();
