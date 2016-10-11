"use strict";
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const moment = require('moment');
const im = require('imagemagick');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

const getVideoId = require('./getvideoid.js');
const testPicture = require('./testpicture.js');

function addMinToName(str) {
	return str.slice(0, str.length - 4) + '_min' + str.slice(-4);
}

module.exports = function getScreenshot() {
	let screenShotPath = null;
	let video = null;

	getVideoId().then(videoById => {
		video = videoById;

		return new Promise((resolve, reject) => {
			const url = `http://www.youtube.com/watch?v=${video.id}`;
			const durationSeconds = moment.duration(video.duration).asSeconds();
			const shotTime = Math.ceil(durationSeconds / 2);
			const screenShot = {
				count: 1,
				timemarks: [ shotTime ],
				folder: `${__dirname}/../public/images/`,
				filename: `${video.word}_${video.id}_${shotTime}.png`
			};

			console.log(`Taking screenshot of video ${video.id} at ${shotTime}s ..`);
			ffmpeg({ source: url }).screenshots(screenShot)
				.on('error', (e) => {
					reject(e);
				})
				.on('end', () => {
					console.log('Screenshot  was taken');
					screenShotPath = screenShot.folder + screenShot.filename;
					resolve();
				});
		});

	}).then(() => {
		return testPicture(screenShotPath);

	}).then((isGood) => {
		if (isGood) {
			console.log(`5 minute word: ${video.word}`);
			console.log('Saved.');

			return imagemin([ screenShotPath ], screenShotPath, {
				plugins: [
					imageminPngquant({ quality: '65-80' })
				]
			});
		} else {
			throw('Seems to be a bad one. Need to take one more..');
		}

	}).then(files => {
		console.log(`Optimized ${screenShotPath}`);
		im.crop({
			srcPath: screenShotPath,
			dstPath: addMinToName(screenShotPath),
			width: 300,
			height: 300,
			quality: 1,
			gravity: 'Center'
		},
		(err, stdout, stderr) => {
			if (err) {
				throw(err);
			}
			console.log(`Cropped ${screenShotPath}`);
		});

	}).catch(error => {
		let counter = 2;
		function tryAgain(force) {
			counter--;
			if (counter === 0 || force) {
				console.log('Let\'s try again..');
				getScreenshot();
			}
		}

		if (screenShotPath) {
			// delete screenShot
			fs.access(screenShotPath, fs.F_OK, function(err) {
				if (err) {
					tryAgain();
				} else {
					fs.unlink(screenShotPath, (err) => {
						if (err) {
							console.log(`No file ${screenShotPath}`);
							tryAgain();
						}
						console.log(`Successfully deleted ${screenShotPath}`);
						tryAgain();
					});
				}
			});

			// delete min screenShot
			const minScreenShotPath = addMinToName(screenShotPath);
			fs.access(minScreenShotPath, fs.F_OK, function(err) {
				if (err) {
					tryAgain();
				} else {
					fs.unlink(minScreenShotPath, (err) => {
						if (err) {
							console.log(`No file ${minScreenShotPath}`);
							tryAgain();
						}
						console.log(`Successfully deleted ${minScreenShotPath}`);
						tryAgain();
					});
				}
			});

		} else {
			tryAgain(true);
		}

	});
};
