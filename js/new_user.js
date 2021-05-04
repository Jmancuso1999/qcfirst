/*
var mongoose=require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");

//Create data schema
const userSchema = mongoose.Schema({
  userName: String,
  fullName: String,
  email: String,
  password: String,
  birthday: Date,
  userType: String
});

userSchema.plugin(passportlocalmongoose);

const user = mongoose.model("user", userSchema);

mongoose.exports = user;
*/