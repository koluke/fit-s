var express = require('express')
	, fs = require('fs')
	, path = require('path')
	, Promise = require('promise')
	;

var app = express();

app.get('/user/:id', function(req, res) {
/* 
	1. Create a file named id in the tmp directory
	   under the current path
	2. Write the current time on that file
	3. Return '<p>{{current path}}</p><p>{{contents of the file}}</p>'
*/
	console.log('request triggered at %s', req.params.id);
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
	fs.writeFile(path.resolve(__dirname,'tmp/',req.params.id), 
		(new Date()).toString(), 'utf8', 
		function(err) {
			if (err) {
				res.send(err);
				return;
			}

			fs.readFile(path.resolve(__dirname,'tmp/',req.params.id),
				function(err, data) {
					if (err) {
						res.send(err);
						return;
					}
					res.send('<p>'+__dirname + '</p>'+
						'<p>'+data+'</p>'
					);
				}
			);
		});
	});

});


var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});