//This middleware handle the Cookies based Authentication
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

