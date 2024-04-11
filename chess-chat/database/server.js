require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/connection");
const app = express();
const port = process.env.DB_PORT;

// import { ApolloServer } from "apollo-server-express";
// import responseCachePlugin from "apollo-server-plugin-response-cache";

const startServer = async () => {
  // Connect to the database
  connectDB();
  app.use(cors());

  // Set up Apollo Server
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [responseCachePlugin.default()],
//   });
//   await server.start();
//   server.applyMiddleware({ app, path: "/graphql" });

  app.listen(port, console.log(`Server running on port ${port}`.cyan));
};

startServer();