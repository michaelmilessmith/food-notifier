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

      // assemble message
      const slackMessage = {
        "text": "Food is ready! " + link
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
