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

  // webhook url
  // https://hooks.slack.com/services/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

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