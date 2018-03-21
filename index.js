const express = require('express');
const cowsay = require("cowsay");
const request = require("request");
const cheerio = require("cheerio");

// Constants
const PORT = 8080;

// App
const app = express();

app.get("/", function (req, res) {

  var options = {
    method: 'GET',
    url: 'http://www.wisdomofchopra.com/iframe.php'
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    var $ = cheerio.load(body);
    const st = $('h2', '#quote').text().replace(/\"/g, '').replace(/\_/g, '')
    const w = `
Deepak Chopra Quote:

" ${st}"

    `;
    const responseText = setCowsaySentence(w);
    res.send(responseText);

  });
});

app.get("/:text", function (req, res) {
  let text = "Hi Awesome People!";
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

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
