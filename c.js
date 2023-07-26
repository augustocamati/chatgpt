const { Configuration, OpenAIApi } = require("openai")
require("dotenv").config()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

async function cc() {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant. colled luna" },
      { role: "user", content: "Hello who are you" },
    ],
  })
  console.log(completion.data.choices[0].message)
}
cc()