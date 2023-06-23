const { createCompletionChatGTP } = require("../../chatGPT")
const knex = require("../database/connection")

module.exports = {
  async chat(req, res) {
    try {
      const user_id = req.params
      const { content } = req.body
      const role = "user"

      const user = knex("users").select("*").where(id, user_id).first()
      if (!user)
        return res
          .status(400)
          .send({ success: false, message: "User doesn't exist" })

      knex("chats").insert({ user_id, content, role })

      const { data } = await createCompletionChatGTP({
        message: req.body.content,
      })

      const chats = knex("chats").insert({
        user_id,
        content: data.choices[0]?.text,
        role: "chat",
      })

      res.send({
        user,
        chats,
      })
    } catch (err) {
      res.status(400).send({ success: false, message: err.message })
    }
  },

  async getAllChats(req, res) {
    try {
      const user_id = req.params.id
      console.log("req.body", req.params.id)
      const chats = await knex("chats").select("*").where({ user_id })
   
      if (!chats)
        return res
          .status(401)
          .send({ success: false, message: "chats doesn't exist" })
      res.send({ chats })
    } catch (err) {
      res.status(400).send({ success: false, message: err.message })
    }
  },
}
