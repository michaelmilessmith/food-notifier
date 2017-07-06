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

// https://hooks.slack.com/services/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