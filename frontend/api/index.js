import request from 'superagent';

export default {
	fetchData({ date }) {
		return new Promise(function(resolve, reject) {
			request
				.get('/imageslist')
				.query({
					date
				})
				.end((error, response) => {
					if (error) {
						reject(error);
					} else if (response && response.body) {
						resolve(response.body);
					} else {
						reject('Couldn\'t fetch data');
					}
				});
		});
	}
};
