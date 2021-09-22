// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
var useragent = require('express-useragent');
var os = require("os");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/* References: 
IP: https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
Language: https://stackoverflow.com/questions/11845471/how-can-i-get-the-browser-language-in-node-js-express-js/33722955
Software: https://www.npmjs.com/package/express-useragent
*/
app.use(useragent.express());
app.get("/api/whoami", function (req, res) {
  let ip = Object.values(require("os").networkInterfaces())
    .flat()
    .filter((item) => !item.internal && item.family === "IPv4")
    .find(Boolean).address;
  let language = req.headers["accept-language"];
  let software = req.useragent.source;
  console.log(ip);
  let data = {
    "ipaddress": ip,
    "language": language,
    "software": software
  };
  res.json(data);
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
