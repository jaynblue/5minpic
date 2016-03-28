var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var moment = require('moment');

var getVideoId = require('./getvideoid.js');
var testPicture = require('./testpicture.js');

module.exports = function getScreenshot() {

    getVideoId().then(video => {
        var url = `http://www.youtube.com/watch?v=${video.id}`;
        var durationSeconds = moment.duration(video.duration).asSeconds();
        var shotTime = Math.ceil(durationSeconds/2);
        var screenShot = {
                count: 1,
                timemarks: [shotTime],
                folder: `${__dirname}/../public/images/`,
                filename: `${video.word}_${video.id}_${shotTime}.png`
            };

        console.log(`Taking screenshot of video ${video.id} at ${shotTime}s ..`);
        ffmpeg({source: url}).screenshots(screenShot).on('end', () => {
            console.log(`Screenshot  was taken`);
            var screenShotPath = screenShot.folder + screenShot.filename;
            testPicture(screenShotPath).then((isGood) => {
                if (isGood) {
                    console.log(`5 minute word: ${video.word}`);
                    console.log(`Saved.`);
                } else {
                    console.log('Seems to be a bad one. Need to take one more..');
                    fs.unlink(screenShotPath, (err) => {
                      if (err) throw err;
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
