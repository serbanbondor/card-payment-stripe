const mongoose = require('mongoose');

// whenever we make any calls to connect, create or find from our db they return a promis so goona use async await
const connectDB = async () => {
  try {
    // connect to the db with the mongo uri from config.env
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      // object with some properties to stop some warning from mongodb(some mongodb bug)
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Connected successfully to the database via ${connect.connection.host}`
    );
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
