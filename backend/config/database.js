const mongoose = require("mongoose");
const connectdatabase = async() => {
  try {
  const {connection} =await mongoose.connect(process.env.DB_URI)
  console.log(`MongoDB is connected: ${connection.host}`);
  } catch (error) {
    console.log(error)
  }
};
module.exports = connectdatabase;