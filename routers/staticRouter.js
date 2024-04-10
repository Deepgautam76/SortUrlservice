const express = require("express");
const URL = require("../models/url");
const {restrictTo}=require("../middlewares/auth1")

const router = express.Router();

//This is the route for only ADMIN
router.get("/admin/urls",restrictTo(["ADMIN"]), async (req, res) => {
  const allurls = await URL.find({ });
  return res.render("home", {
    urls: allurls,
  });
})

//After refectoring auth2 adding the =>restrictTo(["NORMAL"])
router.get("/",restrictTo(["NORMAL","ADMIN"]), async (req, res) => {
  // //This comment out when refectring the auth2 code
  // if(!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
