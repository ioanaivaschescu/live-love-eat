const mongoose = require("mongoose");

require("dotenv").config();

var mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on("connected", () => {
  console.log(`MongoDB Connection Successfull`);
});

db.on("error", () => {
  console.log(`MongoDB Connection Failed`);
});

module.exports = mongoose;
