const { createCompletionChatGTP } = require("../../chatGPT")
const knex = require("../database/connection")

module.exports = {
  async chat(req, res) {
    try {
      const user_id = req.params.id
      const { content } = req.body
      const role = "user"

      const user = await knex("users").select("id","username").where('id', user_id).first()
      if (!user)
        return res
          .status(400)
          .send({ success: false, message: "User doesn't exist" })

     await knex("chats").insert({ user_id, content, role })

      const { data } = await createCompletionChatGTP({
        message: req.body.content, 
      })

     await knex("chats").insert({
        user_id,
        content: data.choices[0]?.text,
        role: "chat",
      })
const msg = data.choices[0]?.text
      res.send({
        user,
        msg,
      })
    } catch (err) {
      res.status(400).send({ success: false, message: err.message })
    }
  },

  async getAllChats(req, res) {
    try {
      const user_id = req.params.id
     
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
