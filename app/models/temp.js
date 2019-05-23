
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'Temperature');

var schema = new mongoose.Schema({
	temp: Number,
	day:  String,
});
var temp = db.model('temp', schema);

module.exports = temp;