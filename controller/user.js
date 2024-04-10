const { v4: uuidv4 } = require('uuid');
const User = require("../models/users");
const {setUser,getUser}=require("../service/auth")

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/login");
}
async function handleUserLogin(req, res) {
  const {email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  // //This is for the state full authentication
  // const sessionId=uuidv4();
  // setUser(sessionId,user);
  // res.cookie("uid",sessionId);


  const token=setUser(user);
  res.cookie("token",token);
 //common in state-less and state-full
  return res.redirect("/");

//This for when not use the cookies based authentication Then use the request based authentication
// return res.json({token})
}
module.exports = {
  handleUserSignup,
  handleUserLogin,
};
