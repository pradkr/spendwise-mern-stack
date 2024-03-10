const mongoose = require('mongoose');

const connectDB = async () => {
  try {
      const conn = await mongoose.connect(process.env.REACT_APP_MONGODB_URL, {});
      console.log(`Success: Connected to MongoDB host ${conn.connection.host}`);
  } catch(err) {
      console.log(`Error: ${err.message}`, "Exiting the process.");
      process.exit(1);
  }
} 

module.exports = connectDB