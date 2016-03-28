var request = require('request');
var fs = require('fs');

const apiUrl = 'https://www.googleapis.com/youtube/v3';
const apiKey = 'AIzaSyBMXm0dbpoIrcc4og2IGPq-QCL0uH6HlsM';

function readLines(input) {
    var remaining = '';
    var result = [];

    return new Promise((resolve, reject) => {
        input.on('data', data => {
            remaining += data;
            var index = remaining.indexOf('\n');
            var last  = 0;
            while (index > -1) {
                var line = remaining.substring(last, index);
                last = index + 1;
                result.push(line);
                index = remaining.indexOf('\n', last);
            }
            remaining = remaining.substring(last);
        });

        input.on('end', () => {
            if (remaining.length > 0) {
                result.push(remaining);
                resolve(result);
            }
        });
    });
};

function getByUrl(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var res = JSON.parse(body);
                res.error ? reject(res.error.message) : resolve(res);
            } else if (error) {
                reject(error);
            } else {
                var res = JSON.parse(body);
                console.log(res.error.message);
                reject(res.error.message);
            }
        });
    });
}

function searchVideoByPhrase(phrase) {
    return getByUrl(`${apiUrl}/search?part=snippet&order=viewCount&
        maxResults=50&q=${phrase}&type=video&key=${apiKey}`);
};

function getVideoDuration(id) {
    return getByUrl(`${apiUrl}/videos?id=${id}&key=${apiKey}&part=snippet
        ,contentDetails,statistics,status`)
    .then((data) => {
        return Promise.resolve(
            data.items.filter(
                (el) => el.id == id
            )[0].contentDetails.duration
        );
    });
}

function getRandomElement(data) {
    var randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
};

function getVideosData(wordList) {
    return new Promise((resolve, reject) => {
        (function generateAndSearch() {
            var randomString = getRandomElement(wordList);
            console.log('Fetching videos with request:', randomString);
            searchVideoByPhrase(randomString).then((videos) => {
                if (videos.items.length > 0) {
                    videos.word = randomString;
                    resolve(videos);
                } else {
                    console.log(`There is no videos for the word: ${randomString}`);
                    console.log(`Let's try again..`);
                    generateAndSearch();
                }
            });
        })();
    });
};

module.exports = () => new Promise((resolve, reject) => {
    var video;
    readLines(fs.createReadStream(`${__dirname}/data/words.txt`))
    .then(words => {
        return getVideosData(words);
    })
    .then(videos => {
         video = getRandomElement(videos.items);
         video.word = videos.word;
         return getVideoDuration(video.id.videoId)
    })
    .then(duration => {
       resolve({
           id : video.id.videoId,
           duration : duration,
           word: video.word
       });
    })
    .catch(error => {
        console.log('Failed ', error);
        reject(error);
    });
});
