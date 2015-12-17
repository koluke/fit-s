var Promise = require('promise');

var pr = new Promise(function(resolve, reject) {
	setTimeout(function() {
		if (Math.random() < 0.5) {
			resolve(new Date());
		}
		else {
			reject('error');
		}
	}, 2000);	

});

pr.then(function(data) {
	console.log('promise is resolved', data);
});

pr.catch(function(err) {
	console.log('promise is rejected', err);
});

console.log('waiting for promise',(new Date()), JSON.stringify(pr));