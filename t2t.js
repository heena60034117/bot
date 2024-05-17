// npm i @xenova/transformers
import { pipeline } from '@xenova/transformers';

// Allocate pipeline
const generator = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-783M');
const output = await generator('Write a love poetry. Output should be between 5 - 10 words.', {
  max_new_tokens: 100,
});
console.log(output[0].generated_text);