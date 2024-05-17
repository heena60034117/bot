import { AutoModelForSeq2SeqLM, AutoTokenizer } from '@xenova/transformers';

let tokenizer = await AutoTokenizer.from_pretrained('Xenova/t5-small');
let model = await AutoModelForSeq2SeqLM.from_pretrained('Xenova/t5-small');

let { input_ids } = await tokenizer('translate English to German: I love transformers!');
let outputs = await model.generate(input_ids);
let decoded = tokenizer.decode(outputs[0], { skip_special_tokens: true });
// 'Ich liebe Transformatoren!'
console.log(decoded);
