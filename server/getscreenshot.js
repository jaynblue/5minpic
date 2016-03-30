var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var moment = require('moment');
var im = require('imagemagick');

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

        function addMinToName(str) {
            return str.slice(0, str.length-4) +'_min'+ str.slice(-4);
        }

        console.log(`Taking screenshot of video ${video.id} at ${shotTime}s ..`);
        ffmpeg({source: url}).screenshots(screenShot).on('end', () => {
            console.log(`Screenshot  was taken`);
            var screenShotPath = screenShot.folder + screenShot.filename;
            testPicture(screenShotPath).then((isGood) => {
                if (isGood) {
                    console.log(`5 minute word: ${video.word}`);
                    console.log(`Saved.`);
                    im.crop({
                        srcPath: screenShotPath,
                        dstPath: addMinToName(screenShotPath),
                        width: 190,
                        height: 100,
                        quality: 1,
                        gravity: 'Center'
                    }, function(err, stdout, stderr){
                        if (err) throw err;
                        console.log(`Cropped ${screenShotPath}`);
                    });
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
