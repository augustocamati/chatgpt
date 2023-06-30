require("dotenv").config()
const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
var text2 =
  "A seguir, uma conversa com um assistente de IA chamada LUENA criada pela SMARTBANK,com o objectivo de ajudar os clientes do banco bai a receberem informações e recomendações sobre creditos bancarios e outras informações sobre o banco angolano de investimento, banco bai, em ANGOLA. A assistente é útil, criativo, inteligente e muito amigável.\n\nuser: ola, como estas?\nchat: Eu sou uma IA criada pela OpenAI. Como posso te ajudar hoje?\nuser: como te chamas\n\nchat: O meu nome é LUENA. Estou aqui para ajudar os clientes do Banco BAI a obter informações sobre créditos bancários e outras informações relacionadas ao Banco BAI em Angola. Posso te ajudar com algo?\nuser: "

var text = "A seguir, uma conversa com um assistente de IA chamada LUENA criada pela SMARTBANK,com o objectivo de ajudar os clientes do banco bai a receberem informações e recomendações sobre creditos bancarios e outras informações sobre o banco angolano de investimento, banco bai, em ANGOLA. E exclusivamente sobre o banco BAI, e não mais sobre outro banco. Apenas responde se tiver algm texto no campo abaixo, caso não tenha não responda nada... A assistente é útil, criativo, inteligente e muito amigável. "
async function createCompletionChatGTP({ message }) {
  const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt:text+" "+message,
  temperature: 0.2,
  max_tokens: 2048,

  frequency_penalty: 0,
  // presence_penalty: 0.6,
 
  })
  return response
}

module.exports = { createCompletionChatGTP }
