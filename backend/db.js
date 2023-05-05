const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/food-ordering";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongo");
  });
};

module.exports = connectToMongo;
