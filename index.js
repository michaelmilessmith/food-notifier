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
      console.log('link ',link);
      res.status(200).send();

      const slackMessage = {
        "text": link,
        "attachments": [
        {
          "text": "grubs up :pizza:",
          "fallback": "You are unable to vote",
          "callback_id": "yay_nay",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
            {
              "name": "yayornay",
              "text": ":+1:",
              "type": "button",
              "value": "yay"
            },
            {
              "name": "yayornay",
              "text": ":-1:",
              "type": "button",
              "value": "nay"
            }
          ]
        }
      ]
      };

      const slackOptions = {
        url: 'https://hooks.slack.com/services/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',
        form: JSON.stringify(slackMessage)
      };

      // post message to slack
      request.post(slackOptions)
        .then((response) => {
          console.log('message posted!');
      }).catch((err) => {
        console.log(err);
        res.status(500).send();
      });

    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });


});

app.listen(process.env.PORT || 3000);
