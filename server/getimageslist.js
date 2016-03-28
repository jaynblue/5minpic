var fs = require('fs');

const path = __dirname + '/../public/images/'

module.exports = () => {
    return new Promise(function(resolve, reject) {
        fs.readdir(path, (err, files) => {
            if (err) reject(err);
            var result = [];
            files.forEach(filename => {
                var filePath = path + filename;
                stat = fs.statSync(filePath);
                if(stat.isFile()) {
                    var createDate = new Date(stat['ctime']);
                    result.push({
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
