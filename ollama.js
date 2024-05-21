import { Ollama } from 'ollama'

const ollama = new Ollama({ host: 'http://localhost:11434' })
const response = await ollama.chat({
  model: 'llama3',
  messages: [{ role: 'user', content: 'Give me romantic poetry to impress a girl. poetry should be between 10-15 words.' }],
})

console.log(response);