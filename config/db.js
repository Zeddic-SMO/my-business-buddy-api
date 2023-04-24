const mongoose = require("mongoose");

const DATABASE_URI = process.env.MONGO_URL || "mongodb://localhost:27017"

async function DbConnect () {
  try{
     return await mongoose.connect(DATABASE_URI);
  } catch(err) {
    throw Error(err)
  } 
}

module.exports = {
  DbConnect
}