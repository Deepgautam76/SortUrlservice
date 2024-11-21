//This middleware handle the Token based Authentication
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

//Function for the admin and other role
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