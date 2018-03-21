const exp = require('express');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const path = require('path');
const cowsay = require('cowsay');
const request = require('request');
const cheerio = require('cheerio');
const _ = require("lodash");

const app = exp();

//security
app.use(helmet());
// app.use(helmet.noCache());
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubdomains: true
}));

// static files
const p = './public';
const publicFolderPath = path.join(__dirname, p);

app.use(favicon(path.join(publicFolderPath, '/favicon.ico')));
app.use(exp.static(publicFolderPath));

// method
const breakText = (characterNum, breakline, text) => {
  const textChain = _.chain(text);
  const arr = [];
  let isDone = false;
  let index = 0;
  while (!isDone) {
    const cArr = textChain.drop(index * characterNum).take(characterNum).value();
    if (cArr.length == 0) {
      isDone = true;
      break;
    }
    const w = cArr.join('');
    arr.push(w);
    index += 1;
  }
  return arr.join(breakline);
}


// router
app.get('/', function (req, res) {

  var options = {
    method: 'GET',
    url: 'http://more.handlino.com/sentences.json'
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    const obj = JSON.parse(body);
    let txt = obj.sentences[0];
    txt = breakText(18, '\r', txt);

    const st = `
長官說：
${txt}
`;
    const responseText = setCowsaySentence(st);
    res.send(responseText);

  });
});

app.get('/:text', function (req, res) {
  let text = 'xxxxxxxx';
  try {
    text = req.params.text;
  } catch (e) { }
  const responseText = setCowsaySentence(text);
  res.send(responseText);
});

const setCowsaySentence = (text) => {
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="description" content="cowsay">
      <meta name="author" content="Bibby Chung">
      <link rel="icon" href="/favicon.ico">
  
      <title>Cow Say</title>
    </head>
  
    <body>
      <pre>
${cowsay.say({
      text,
      e: "oO"
    })}
          </pre>
      <br/><br/>
    </body>
  </html>

`;
}

const PORT = 8080;
app.listen(PORT, () => console.log(`=> 0.0.0.0:${PORT}`));
