//THIS IS STATE LESS AUTHENTICTION OR (JWT:-JSON WEB TOKEN)

const jwt=require("jsonwebtoken");
const secretKey="@kamal@234@45#$%";

function setUser(user){
  return jwt.sign({
    _id:user._id,
    email:user.email,
    role:user.role,
  },
  secretKey);
}

function getUser(token){
  if(!token) return null;
  try{
    return jwt.verify(token,secretKey);
  }catch(error){
     return null;
  }
}



module.exports = {
  setUser,
  getUser,
};
