var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Video Validator' });
});


var num, timestamp, hash, video;
router.post('/receiveVideo', function (req, res, next) {
	console.log('receiveVideo');
	console.log(req.body);
	timestamp = req.body.timestamp;
	hash = req.body.hash;
	video = req.body.video;
	pool.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			return console.error (err.message);
		}
		let query = "select id from video";
		connection.query (query, function (err, rows, fields) {
			connection.release();
			if (err) return console.error (err.message);
			num = rows.length;
			next();
		});
	});
}, function (req, res, next) {
	console.log("next");
	pool.getConnection(function (err, connection) {
		if (err) {
			connection.release();
			return console.error (err.message);
		}
		console.log('timestamp: ' + timestamp + ', hash: ' + hash + ', video: ' + video);
		let query = "insert into video values (" + num + ", \'" + timestamp + "\', \'" + hash + "\', \'" + video + "\')";
		connection.query (query, function (err, rows, fields) {
			connection.release();
			if (err) return console.error (err.message);	
		});
	});
	res.send(true);
});

router.post('/getVideoList', function (req, res, next) {
	console.log('getVideoList');
	let last = req.body.last;

	pool.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			return console.error (err.message);
		}

		let startNum = num;
		if ((num - last) > 5) startNum = num - 5;
		else startNum = last;

		let query = "select * from video where id > " + startNum;
		connection.query (query, function (err, rows, fields) {
			connection.release();
			if (err) return console.error (err.message);
			res.send(rows);
		});
	});
});

router.post('/getHash', function (req, res, next) {
	const { spawn } = require('child_process');
	const pyProg = spawn('python',['./getHash.py', req.body.name]);

	pyProg.stdout.on('data', function(data) {
		console.log(data.toString());
		//res.write(data);
		res.send(data);
	});
});

module.exports = router;
