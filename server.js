require("dotenv").config()

const express = require("express")
const cors = require("cors")
const authRouter = require("./src/routers/auth")
const chatRouter = require("./src/routers/chat")

const app = express()

app.use(cors())
app.use(express.json()) 
app.use(authRouter)
app.use(chatRouter)

// app.use("/auth", authRouter);
// app.use("/chatgpt", chatRouter);

app.listen(process.env.PORT || 3333, () => {
  console.log("Listeningserver on port : ", process.env.PORT || 3333)
})
