const { chat, getAllChats } = require("../controllers/chat")

const router = require("express").Router()

router.post("/chat/:id", chat)
router.get("/getchats/:id", getAllChats)

module.exports = router
