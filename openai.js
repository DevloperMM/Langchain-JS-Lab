import "dotenv/config"

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY,
  baseURL: process.env.AI_BASE_URL || 'https://models.github.ai/inference',
})
  
export default openai