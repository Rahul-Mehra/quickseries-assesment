var Temp = require('./models/temp');
module.exports = function(app) {

	app.get('/api/logs', function(req, res) {

        Temp.find(function(err, logs) {

			if (err)
				res.send(err)

			res.json(logs);
		});
	});

	app.post('/api/addTemp', function(req, res) {

		var today = new Date();
		var date = today.toDateString();
        Temp.create({
			temp : req.body.text,
			day : date
		}, function(err, logs) {
			if (err)
				res.send(err);

            Temp.find(function(err, logs) {
				if (err)
					res.send(err)
				res.json(logs);
			});
		});

	});


	app.delete('/api/logs/:log_id', function(req, res) {
        Temp.remove({
			_id : req.params.log_id
		}, function(err, logs) {
			if (err)
				res.send(err);

            Temp.find(function(err, logs) {
				if (err)
					res.send(err)
				res.json(logs);
			});
		});
	});


	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};