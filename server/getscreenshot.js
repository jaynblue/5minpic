"use strict";
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const moment = require('moment');
const im = require('imagemagick');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

const getVideoId = require('./getvideoid.js');
const testPicture = require('./testpicture.js');

module.exports = function getScreenshot() {

	getVideoId().then(video => {
		const url = `http://www.youtube.com/watch?v=${video.id}`;
		const durationSeconds = moment.duration(video.duration).asSeconds();
		const shotTime = Math.ceil(durationSeconds / 2);
		const screenShot = {
			count: 1,
			timemarks: [ shotTime ],
			folder: `${__dirname}/../public/images/`,
			filename: `${video.word}_${video.id}_${shotTime}.png`
		};

		function addMinToName(str) {
			return str.slice(0, str.length - 4) + '_min' + str.slice(-4);
		}

		console.log(`Taking screenshot of video ${video.id} at ${shotTime}s ..`);

		ffmpeg({ source: url }).screenshots(screenShot).on('end', () => {
			console.log('Screenshot  was taken');
			const screenShotPath = screenShot.folder + screenShot.filename;

			testPicture(screenShotPath).then((isGood) => {
				if (isGood) {
					console.log(`5 minute word: ${video.word}`);
					console.log('Saved.');
					imagemin([ screenShotPath ], screenShotPath, {
						plugins: [
							imageminPngquant({ quality: '65-80' })
						]
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
						function(err, stdout, stderr) {
							if (err) {
								throw err;
							}
							console.log(`Cropped ${screenShotPath}`);
						});
					}).catch(err => console.log('Imagemin error: ', err));
				} else {
					console.log('Seems to be a bad one. Need to take one more..');
					fs.unlink(screenShotPath, (err) => {
						if (err) {
							throw err;
						}
						console.log(`Successfully deleted ${screenShotPath}`);
						getScreenshot();
					});
				}
			});
		}).on('error', (err, stdout, stderr) => {
			console.log(err.message.trim());
			console.log('Let\'s try again..');
			getScreenshot();
		});

	});

};
