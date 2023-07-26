const { createCompletionChatGTP } = require("../../chatGPT")
const knex = require("../database/connection")

module.exports = {
  async chat(req, res) {
    try {
      const user_id = req.params.id
      const UserContent = req.body.content
      const UserRole = "user"

      const user = await knex("users").select("id","username").where('id', user_id).first()
      if (!user)
        return res
          .status(400)
          .send({ success: false, message: "User doesn't exist" })

     await knex("chats").insert({
       user_id,
       content: UserContent,
       role: UserRole,
     })

      const  {content,role}  = await createCompletionChatGTP({
        message: req.body.content, 
      })
 console.log("chat:", content,
        role)
     await knex("chats").insert({
       user_id,
       content: content,
       role: role,
     })

     res.send({
       user: role,
       msg: content,
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
