const mongoose = require("mongoose");

//User Schema For Authentication
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role:{
      type:String,
      require:true,
      default:"NORMAL",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User=mongoose.model("user",userSchema)

module.exports=User;