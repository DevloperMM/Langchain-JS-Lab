import openai from './openai.js'
import readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const newMessage = async (history, message, optionalParams = {}) => {
  const results = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // model to use
    messages: [...history, message], // history of messages
    temperature: 0.7, // randomness or creativity of the model
    max_tokens: 1000, // max tokens to generate (context window)
    ...optionalParams
  })

  return results.choices[0].message
}

const formatMessage = (message) => {
  return {
    role: 'user',
    content: message
  }
}

const chat = () => {
  const history = [
    {
      role: 'system',
      content: 'You are a helpful AI assistant. Answer questions or else!'
    }
  ]

  const start = async () => {
    rl.question('[YOU]: ', async (message) => {
      if (message.toLowerCase() === 'exit') {
        rl.close()
        return
      }

      const userMsg = formatMessage(message)
      const response = await newMessage(history, userMsg)

      history.push(userMsg, response)
      console.log(`[AI]: ${response.content}`)
      start()
    })
  }

  start()
}

console.log('Welcome to the AI chat! Type "exit" to end the chat.')
chat()
