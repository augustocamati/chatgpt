const { chat, getAllChats } = require("../controllers/chat")
const { checkApiKey } = require("../middlewares/apiKey")
const router = require("express").Router()

router.post("/chat/:apiKey", checkApiKey, chat)
router.get("/getchats/:apiKey", checkApiKey, getAllChats)

module.exports = router
