// const mongoose = require("mongoose")
// require("dotenv").config()

// const connection = mongoose.connect(process.env.mongoURL);

// module.exports={
//     connection
// }



const mongoose = require("mongoose");
require("dotenv").config();


const mongoURL = process.env.mongoURL;
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

const connection = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(mongoURL,connectionParams);
  console.log("MongoDB connected");
};

module.exports = connection;