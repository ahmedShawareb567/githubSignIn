const { Router } = require("express");
const Passport = require("passport");
const { authCallback } = require("../handlers/social");
const router = Router();

router.get("/github", Passport.authenticate("github"));

router.get(
  "/github/callback",
  Passport.authenticate("github", {
    session: false,
    failureRedirect: "/?Fail=true",
  }),
  authCallback
);

module.exports = router;
