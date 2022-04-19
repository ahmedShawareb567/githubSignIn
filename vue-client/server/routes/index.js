const { Router } = require("express");
const router = Router();

// register auth routes
router.use("/auth", require("./auth"));
module.exports = router;
