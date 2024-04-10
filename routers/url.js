const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirectUserByShortId,
  handleGetAnalytics,
} = require("../controller/url");

const router = express.Router();
router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleRedirectUserByShortId);
router.get('/analytics/:shortId',handleGetAnalytics)

module.exports = router;
