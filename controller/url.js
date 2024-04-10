const shortid = require("shortid");

const URL = require("../models/url");

//Genrate New shortId of any url
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url){
    // return res.status(400).json({ error: "url is required" });
    return res.status(400).render("Url Notfound");
  }
  const shortID = shortid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy:req.user._id,
  });
  // return res.json({id:shortId})
  return res.render("home", {
    id: shortID,
  });
}

//Update the click of url and return the Original url by sortId
async function handleRedirectUserByShortId(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.redirectURL);
}

//Analytics of the clicks and sortId
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleRedirectUserByShortId,
  handleGetAnalytics,
};
