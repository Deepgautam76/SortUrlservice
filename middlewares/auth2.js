//This middleware handle the Token based Authentication
//After refactore the code remove the repition
const { getUser } = require("../service/auth");

function checkForauthentication(req, res, next) {
  const authorizationHeaderValue = req.headers["Authorization"];
  req.user = null;
  if (
    !authorizationHeaderValue ||
    !authorizationHeaderValue.startWith("Bearer")
  ) {
    return next();
  }
  const token = authorizationHeaderValue.split("Bearer ")[1];
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

// //Before refectring
// //This middleware handle the Token based Authentication

// const { getUser } = require("../service/auth");

// async function restrictTOLoggedinUserOnly(req, res, next) {
//   //Authorisation is the Build in header
//   const userUid = req.headers["Authorization"];
//   if (!userUid) return res.redirect("/login");
//   //This is for the graving the request base auth token
//   const token = userUid.split("Bearer ")[1]; //"Bearer [2345ejfakjn]"
//   const user = getUser(token);
//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   const userUid = req.headers["authorization"];
//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);
//   req.user = user;
//   next();
// }
// module.exports = {
//   restrictTOLoggedinUserOnly,
//   checkAuth,
// };
