var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('./db_config');

var pool = mysql.createPool(db_config);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/receiveMovie', function (req, res, next) {
	let query = "";
	pool.getConnection(function (err, conn) {
		if (err) {
			conn.release();
			return console.error (err.message);
		}

		conn.query (query, function (err, result) {
			conn.release();
			if (err) return console.error (err.message);
			res.send(true);
		});
	});
});

module.exports = router;
