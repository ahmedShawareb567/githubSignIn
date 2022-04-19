const { loadNuxt, build } = require("nuxt");
const express = require("express");
const consola = require("consola");
const Passport = require("passport");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const isDev = process.env.NODE_ENV !== "production";

const app = express();

app.use(cookieParser());

const authStarts = require("./auth");
Passport.use(authStarts.github);
app.use(Passport.initialize());
app.use(Passport.session());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "GithubAuthentication",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(require("./routes"));

async function start() {
  try {
    // We get Nuxt instance
    const nuxt = await loadNuxt(isDev ? "dev" : "start");

    const { host, port } = nuxt.options.server;

    // Render every route with Nuxt
    app.use(nuxt.render);

    // Build only in dev mode with hot-reloading

    if (isDev) {
      build(nuxt);
    } else {
      await nuxt.ready();
    }

    // Listen the server
    app.listen(port, host);

    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true,
    });
  } catch (e) {
    console.log(e);
  }
}

start();
