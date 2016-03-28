var colorPalette = require("colors-palette");

function testPicture(pathToPicture) {
    return new Promise ((resolve,reject) => {
        colorPalette(pathToPicture, 32, (err, colors) => {
            if(err) {
                console.error('Error when testing colors: ' + err);
                reject(err);
                return false;
            } else {
                colors = colors.result;
                var isGoodPicture = colors.length >= 2 && (colors[0].percentage + colors[1].percentage < 0.4);
                resolve(isGoodPicture);
            }
        });
    });
}

module.exports = testPicture;
