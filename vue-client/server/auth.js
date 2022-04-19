var GitHubStrategy = require("passport-github").Strategy;
const { socialMutation } = require("./graphql/auth");

const githubConfig = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CLIENT_CALLBACK,
};

module.exports = {
  github: new GitHubStrategy(githubConfig, function (
    accessToken,
    refreshToken,
    profile,
    cb
  ) {
    let props = {
      providerId: profile.id,
      provider: "GITHUB",
      userName: profile.username,
      profilePicture: profile._json.avatar_url,
    };

    props.email =
      new Date().getTime().toString(20) +
      Math.random().toString(36).slice(2) +
      "@test.com";

    let email = profile._json.email;

    if (email) {
      props.email = email;
    }
    return cb(null, props);
  }),
};
