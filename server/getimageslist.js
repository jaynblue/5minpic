var fs = require('fs');

const path = __dirname + '/../public/images/'

function getDay(date, offset) {
    var offset = typeof offset !== 'undefined' ?  offset : 0;

    var d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + offset, 0, 0, 0);
}

function dateInRange(date, rangeDate) {
    var midnight = getDay(rangeDate);
    var nextMidnight = getDay(rangeDate, 1);

    return (midnight <= date) && (date <= nextMidnight);
}

module.exports = (requestDate) => {
    if(!requestDate) return false;
    return new Promise(function(resolve, reject) {
        fs.readdir(path, (err, files) => {
            if (err) reject(err);
            var result = {
                availibleDates: {},
                todayImages: []
            };
            files.forEach(filename => {
                var filePath = path + filename;
                stat = fs.statSync(filePath);
                if(stat.isFile()) {
                    var createDate = new Date(stat['ctime']);
                    var createDay = getDay(createDate)+'';
                    result.availibleDates[createDay] = createDate;
                    dateInRange(createDate, requestDate) && result.todayImages.push({
                        path: filePath.split('public')[1],
                        ctime: createDate.getTime(),
                        word: filename.split('_')[0]
                    });
                }
            });
            resolve(result);
        })
    });
};
