'use strict'
const configPath = process.env.NODE_ENV === 'production' ?
	'webpack.config.prod' : 'webpack.config.dev';
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const webpack = require('webpack');
const config = require('../' + configPath);
const path = require('path');
const defauldPort = 3000;

const getImagesList = require('./getimageslist');

const app = express();
let start = null;
const timeSpan = 60000 * 5;

const data = {};

function updateData(date) {
	return new Promise(function(resolve, reject) {
		getImagesList(date).then(result => {
			result.todayImages.sort((a, b) => {
				return b.ctime - a.ctime;
			});
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
		Object.assign(obj, {
			startTime: (reqTime - start) % timeSpan
		});
	}
}

function getData(date, cache) {
	if (typeof cache === 'undefined') {
		cache = true;
	}
	const reqTime = Date.now();

	return new Promise(function(resolve, reject) {
		if (data[date] && cache) {
			setReqTime(data[date], reqTime);
			resolve(getCahedData(date, reqTime));
		} else {
			updateData(date, reqTime)
				.then((result) => {
					setReqTime(result, reqTime);
					resolve(result);
				});
		}
	});
}

function updateToday() {
	getData(new Date().toDateString(), false).then(() => {
		start = Date.now();
	});
	setTimeout(updateToday, timeSpan);
}

updateData(new Date(start).toDateString(), start).then(() => {

	if (process.env.NODE_ENV === 'production') {
		app.use(morgan('combined'));
	} else {
		const compiler = webpack(config);

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
	app.use(express.static(path.join(__dirname, '/../public')));

	app.get('/imageslist', (req, res) => {
		const errorStateCode = 500;

		if (!req.query.date) {
			res.status(errorStateCode).send('Please send the date');
		}
		getData(req.query.date).then(result => {
			res.json(result);
		});
	});

	app.get('/snap/*', (req, res) => {
		res.sendFile(path.resolve(path.join(__dirname, '/../public/index.html')));
	});

	app.listen(process.env.PORT || defauldPort, () => {
		console.log('Listening on http://localhost:' + (process.env.PORT || defauldPort));
	});

	start = Date.now();
	setTimeout(updateToday, timeSpan);

});
