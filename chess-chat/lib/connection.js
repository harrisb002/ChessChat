const mongoose = require("mongoose");

const db = async () => {
  if (!global.mongoConnection) { // Check if the global connection is not already set
    try {
      global.mongoConnection = await mongoose.connect(process.env.DATABASE_URL + "ChessDB");
      console.log(
        `MongoDB Connected: ${global.mongoConnection.connection.host}`.cyan.underline.bold
      );
    } catch (error) {
      console.log(`Error connecting to MongoDB: ${error}`.red);
      global.mongoConnection = null; // Reset the connection on error
    }
  }
  return global.mongoConnection; // Return the existing or new connection
};

module.exports = db;
