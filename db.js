
const mongoose = require("mongoose");
require('dotenv').config()
const DB= process.env.DB

mongoose.connect(DB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("connected", function () {
  console.log("mongoose default connection done");
});
db.on("error", function (err) {
  console.log("mongoose default connection error:" + err);
});