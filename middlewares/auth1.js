//This middleware handle the Cookies based Authentication
//After refactore the code remove the repition
const { getUser } = require("../service/auth");

function checkForauthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();
  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

//Function for the admine and other role
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
  };
}

module.exports = {
  checkForauthentication,
  restrictTo,
};



//Before refctoring the code
// const { getUser } = require("../service/auth");

// async function restrictTOLoggedinUserOnly(req, res, next) {
//   const userUid = req.cookies?.token;

//   if (!userUid) return res.redirect("/login");
//   const user = getUser(userUid);
//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   const userUid = req.cookies?.uid
//   const user = getUser(userUid);

//   req.user = user;
//   next();
// }
// module.exports = {
//   restrictTOLoggedinUserOnly,
//   checkAuth,
// };
