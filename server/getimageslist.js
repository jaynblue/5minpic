/* eslint-disable */
"use strict";
process.env.TZ = 'Asia/Ho_Chi_Minh';

const fs = require('fs');
const path = require('path');
const imagesPath = path.join(__dirname, '/../public/images/');

function getDay(date, offset, h , m, s) {
	var offset = typeof offset !== 'undefined' ?  offset : 0;
    var h = typeof h !== 'undefined' ?  h : 0;
    var m = typeof m !== 'undefined' ?  m : 0;
    var s = typeof s !== 'undefined' ?  s : 0;
    var d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + offset, h, m, s);
}

function dateInRange(date, rangeDate) {
	const midnight = getDay(rangeDate);
	const nextMidnight = getDay(rangeDate, 1);

	return (midnight <= date) && (date < nextMidnight);
}

function addMinToPath(path) {
	return path.slice(0, path.length-4) +'_min'+ path.slice(-4);
}

module.exports = (requestDate) => {
	const result = {
		availableDates: {},
		todayImages: []
	};

	if(requestDate) {
		return new Promise((resolve, reject) => {
			fs.readdir(imagesPath, (err, files) => {
				if (err) {
					reject(err);
				}

				files.forEach(filename => {
					const filePath = imagesPath + filename;
					const fileData = fs.statSync(filePath);

					if (fileData.isFile() && !~filename.indexOf('min')) {
						const createDate = new Date(fileData['ctime']);
						const createDay = String(getDay(createDate, 0, 12, 0, 0));
						result.availableDates[createDay] = createDate;

						if (dateInRange(createDate, requestDate)) {
							result.todayImages.push({
								path: filePath.split('public')[1],
								min_path: addMinToPath(filePath.split('public')[1]),
								ctime: createDate.getTime(),
								word: filename.split('_')[0]
							});
						}
					}
				});
				resolve(result);
			})
		});
	}
	return false;
};
