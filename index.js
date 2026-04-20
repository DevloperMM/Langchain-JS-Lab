import openai from './openai.js'

const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    {
      role: 'user',
      content: 'Tell something about calculus?'
    }
  ]
})

console.log(response.choices[0].message.content)
