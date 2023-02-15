const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const question = process.argv[2]

async function runCompletion () {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 1000,  // Maksimum token yang dihasilkan
    // temperature: 0.7,  // Tingkat kreativitas / ketebalan
    // stop: ["\n", "Answer:"],  // Batas untuk mengakhiri teks yang dihasilkan
    // n: 1,  // Jumlah respons yang diinginkan
    // timeout: 10000, // Waktu tunggu (ms) untuk respons dari API
    // presence_penalty: 0.6, // Meningkatkan atau mengurangi kemungkinan respons yang mengandung informasi yang bertentangan dengan yang sudah ada
    // frequency_penalty: 0.6, // Meningkatkan atau mengurangi kemungkinan respons yang mengandung kata-kata yang sudah terlalu sering digunakan dalam data latih
  });
  console.log(completion.data)
  console.log(completion.data.choices[0].text);
}

runCompletion();