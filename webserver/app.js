var express = require('express')
	, fs = require('fs')
	, path = require('path')
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


var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});