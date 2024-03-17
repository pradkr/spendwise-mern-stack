const mongoose = require('mongoose');

const connectDB = async (dbURL) => {
  try {
      (process.env.DEBUG) && console.log('DB URL=' + dbURL)
      const conn = await mongoose.connect(dbURL, {});
      console.log(`Success: Connected to MongoDB host ${conn.connection.host}`);
  } catch(err) {
      console.log(`Error: ${err.message}`, "Exiting the process.");
      process.exit(1);
  }
} 

module.exports = connectDB