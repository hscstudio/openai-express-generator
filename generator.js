const configs = require("./configs.json")
const fs = require('fs');
const path = require('path');

const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
async function askChatGPT (question) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 1000,
    });
    return completion.data.choices[0].text
}

// GENERATE API
const apis = configs['route-api']
let apiContentFiles = []
apiContentFiles.push(`const express = require('express');
const router = express.Router();`)
var [promise] = Object.keys(apis).map(async key => {
    console.log([key], apis[key])
    const apiObj = apis[key]
    const respons = await askChatGPT(apiObj['content'])
    // GENERATE ROUTE
    apiContentFiles.push(
`router.get('${key}', (req, res) => {
    res.json(
        ${respons}
    )
});`)
})

promise.then(
    _ => {
        apiContentFiles.push(
`module.exports = router;
`)
        const apiContentFile = apiContentFiles.join("\n")
        console.log(apiContentFile)
        
        fs.writeFileSync('./routes/api.js', apiContentFile);
    }
);


// GENERATE WEB
const webs = configs['route-web']
let webContentFiles = []
webContentFiles.push(`const express = require('express');
const router = express.Router();`)
var [promise] = Object.keys(webs).map(async key => {
    const webObj = webs[key]
    const path = require('path');
    const filename = path.parse(webObj['filename']).name;
    // GENERATE ROUTE
    webContentFiles.push(
`router.get("${key}", (req, res) => {
    res.render('${filename}', { title: 'ExpressJS', layout: 'layout' });
});`)
    // GENERATE CONTENT
    const respons = await askChatGPT(webObj['content'])
    console.log(respons)
    fs.writeFileSync(webObj['filename'], respons);
})

promise.then(
    _ => {
        webContentFiles.push(
`module.exports = router;
`)
        const webContentFile = webContentFiles.join("\n")
        console.log(webContentFile)
        
        fs.writeFileSync('./routes/web.js', webContentFile);
    }
);