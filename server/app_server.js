var express = require('express');
var morgan = require('morgan');
var compression = require('compression');

var getImagesList = require('./getimageslist');

var app = express();

app.use(morgan('combined'));
app.use(compression());

app.get('/imageslist', (req, res) => {
  getImagesList().then(result => {
    res.json(result);
  });
});

app.use(express.static(__dirname + '/../public'));

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
