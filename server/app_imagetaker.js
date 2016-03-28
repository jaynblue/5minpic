var getScreenshot = require('./getscreenshot');

// get screenshot every 5 minutes

(function imagetaker() {
    getScreenshot();
    setTimeout(imagetaker, 300000);
})();
