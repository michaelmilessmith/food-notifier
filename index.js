var express = require('express');
var multer = require('multer')
var request = require('request-promise');

var app = express();
var upload = multer();

app.get('/', (req, res) => {
  res.send('this is food-notifier');
});

app.post('/yum', upload.single('food'), (req, res, next) => {
  const options = {
    url: 'https://api.imgur.com/3/image',
    formData: {
      image: req.file.buffer
    },
    headers: {
      Authorization: 'Client-ID cc1a44534ad0b4e'
    },
    json: true
  };

  request.post(options)
    .then((response) => {
      const link = response.data.link;
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
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

