

const mongoose = require("mongoose")


const messageobjectSchema = mongoose.Schema({
  mess:String,
  id:String,
  reviced:Boolean
},{
   timestamps: true 
})




const chatSchema = mongoose.Schema({
  userid:String,
  message:{
    type: [messageobjectSchema],
   
  }
})


const userSchema = mongoose.Schema({
  

    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 6,
      },
      profilePicture: {
        type: String,
        default: "",
      },
      coverPicture: {
        type: String,
        default: "",
      },
      followers: {
        type: Array,
        default: [],
      },
      followings: {
        type: Array,
        default: [],
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      desc: {
        type: String,
        max: 50,
      },
      BlockedTime:{
        type:Number
      },
      chat:{
        // type: [chatSchema],
        // required: true,
        type: Array,
        default: [],
        

      }
    

},
{ timestamps: true }
)

const User = mongoose.model("user", userSchema)
module.exports = {
    User
}


// {
//     "lastName": "gpaa",
//     "firstName": "gpaa",
//     "password": "gpaa",
//     "email": "gpaa@gmial.com",
//     "avatar": "ass",
//     "coverimg": "ass",
//     "post": [
//         {
//             "post_image": "ass",
//             "description": "dsa",
//             "like": 1,
//             "all_comment": [
//                 {
//                     "userId": "ass",
//                     "comment": "good"
//                 }
//             ]
//         }
//     ]
// }