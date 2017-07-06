var express = require('express');
var multer = require('multer')

var app = express();
var upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.send('this is food-notifier');
});

app.post('/yum', upload.single('food'), (req, res, next) => {
  console.log(req.file);
  res.status(200).send();
});

app.listen(3000);


var slackMessage = {
  "text": "Food is ready! http://imgur.com/cxjXN8o",
  "attachments" : [{"text": "Today in the canteen:"}],
  "icon_emoji" : ":hamburger:"
};

var slackMenu = {
  "text": "Today's menu: ",
  "attachments" : [{"text": "test"}],
  "icon_emoji" : ":clipboard:"
};


// Slack stuff

// https://hooks.slack.com/services/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

// chat.postMessage - This method posts a message to a public channel, private channel, or direct message/IM channel
// https://api.slack.com/methods/chat.postMessage


// https://slack.com/api/chat.postMessage

// Arguments
// token xxxx-xxxxxxxxx-xxxx
// channel	C1234567890
// text	Hello world
// attachments	[{"pretext": "pre-hello", "text": "text-world"}]
// icon_emoji	:hamburger:

