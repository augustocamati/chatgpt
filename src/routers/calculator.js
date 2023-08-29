const { calculator } = require("../controllers/calculator")

const router = require("express").Router()

router.post("/calc", calculator)


module.exports = router
