require("dotenv").config();
const { createCompletionChatGTP } = require("./chatGTP");
const express = require("express");
const cors = require("cors");
const authRouter = require("./src/routers/auth");
const chatRouter = require("./src/routers/chat");



const app = express();
app.use(authRouter)
app.use(chatRouter)
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/chatgpt", chatRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log("Listeningserver on port : ", process.env.PORT || 8000);
});
