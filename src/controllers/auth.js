const { compareSync, hash } = require("bcrypt")

const knex = require("../database/connection")

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body

      const findUser = await knex("users").select("*").where({ email }).first()

      if (!findUser) {
        return res
          .status(401)
          .send({ success: false, message: "User doesn't exist" })
      }
      const passwordMatch = compareSync(password, findUser.password)
      if (!passwordMatch) {
        return res
          .status(401)
          .send({ success: false, message: "Wrong password" })
      }
      findUser.password = undefined
      res.send({ findUser })
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  },

  async signup(req, res) {
    try {
      const { username, email } = req.body
      const pass = req.body.password
      const password = await hash(pass, 10)

      const findUser = await knex("users").select("*").where({ email }).first()
      console.log("findUser", findUser)
      if (findUser) {
        console.log("exists", findUser)
        return res
          .status(401)
          .send({ success: false, message: "User already exists" })
      }

      const id = await knex("users").insert({
        username,
        email,
        password,
      })
     

      res.status(201).send({ id })
    } catch (err) {
      res.status(400).send({ success: false, message: err.message })
    }
  },

  async index(req, res) {
    try {
      const user = await knex("users").select("id", "username", "email")

      if (!user)
        return res
          .status(401)
          .send({ success: false, message: "Users no founded" })

      res.status(201).send({ user })
    } catch (err) {
      res.status(400).send({ success: false, message: err.message })
    }
  },

  async auth(req, res) {
    try {
      const { id } = req.params

      const findUser = await knex("users").del().where({ id })

      if (!findUser)
        return res
          .status(401)
          .send({ success: false, message: "fail to delete user" })

      res.status(201).send({ success: true })
    } catch (err) {
      res.status(400).send({ success: false, message: err.message })
    }
  },
}
