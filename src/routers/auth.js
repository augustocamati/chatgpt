const { login, signup, auth, index } = require("../controllers/auth");

const router = require("express").Router();

router.get("/index", index)
router.post("/login", login)

router.post("/signup", signup)
router.delete("/auth/:id", auth)

module.exports = router;
