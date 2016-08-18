var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var webpack = require('webpack');
var config = require('../webpack.config.dev');

var getImagesList = require('./getimageslist');

var app = express();
var start = null;
var timeSpan = 60000 * 5;

var data = {};

function updateData(date) {
    return new Promise(function(resolve, reject) {
        getImagesList(date).then(result => {
            data[date] = result;
            resolve(data[date]);
        });
    });
}

function getCahedData(date) {
    return data[date];
}

function setReqTime(obj, reqTime) {
    if (obj.startTime) {
        obj.startTime = (reqTime - start) % timeSpan;
    } else {
        Object.assign(
            obj,
            {
                startTime: (reqTime - start) % timeSpan
            }
        );
    }
}

function getData(date, cache) {
    if (typeof(cache) === 'undefined') cache = true;
    var reqTime = Date.now();
    return new Promise(function(resolve, reject) {
        if (data[date] && cache) {
            setReqTime(data[date], reqTime);
            resolve(getCahedData(date, reqTime))
        } else {
            updateData(date, reqTime)
                .then((result) => {
                    setReqTime(result, reqTime);
                    resolve(result)
                })
        }
    })
}

function updateToday() {
    getData(new Date().toDateString(), false).then(() => {
        start = Date.now();
    });
    setTimeout(updateToday, timeSpan)
}

updateData(new Date(start).toDateString(), start).then(() => {

    if (process.env.NODE_ENV == 'production') {
        app.use(morgan('combined'));
    } else {
        var compiler = webpack(config);

        app.use(require('webpack-dev-middleware')(compiler, {
          noInfo: true,
          quiet: true,
          publicPath: config.output.publicPath
        }));

        app.use(require('webpack-hot-middleware')(compiler, {
          log: () => {}
        }));
    }

    app.use(compression());
    app.use(express.static(__dirname + '/../public'));

    app.get('/imageslist', (req, res) => {
        if (!req.query.date) {
            res.status(500).send('Please send the date');
        }
        getData(req.query.date).then(result => {res.json(result)})
    });

    app.listen(process.env.PORT || 3000, () => {
        console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
    })

    start = Date.now();
    setTimeout(updateToday, timeSpan);

})
