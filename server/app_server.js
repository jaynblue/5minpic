var express = require('express');
var morgan = require('morgan');
var compression = require('compression');

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
    app.use(morgan('combined'));
    app.use(compression());

    app.get('/imageslist', (req, res) => {
        getData(req.query.date).then(result => {res.json(result)})
    });

    app.use(express.static(__dirname + '/../public'));

    app.listen(process.env.PORT || 3000, () => {
        console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
    })

    start = Date.now();
    setTimeout(updateToday, timeSpan);

})
