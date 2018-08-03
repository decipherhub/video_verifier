var Web3 = require('web3');
var net = require('net');
const fs = require('fs');
var mysql = require('mysql');
var db_config = require('./db_config');
var pool = mysql.createPool(db_config);


const addr = "0x9e3482492112f8e388ac84dc35b53e655a0dbc97";
const pwd = "1234";
const remote_addr = 'http://192.168.0.12:8888';
//var web3 = new Web3(new Web3.providers.HttpProvider(remote_addr));
var web3 = new Web3(remote_addr);
console.log("Connection to : " + remote_addr);
var abi = undefined;
const abi_file = './Validator.json'


fs.readFile(abi_file, 'utf-8', function(err,data) {
	if(err){
		console.log(err);
	} else {
		abi = JSON.parse(data)['abi'];
		contract_addr = "0x6fb78d36dbbd52de15824e816f95febc388bce61";
		var myContract = new web3.eth.Contract(abi, contract_addr);
		// var myContract = _myContract.at(contract_addr);

		web3.eth.personal.unlockAccount(addr, pwd);

		var _timestamp = 10;
		var _hashed = 9;

		var result = myContract.methods.validateHash(addr, _timestamp, _hashed).call().then(console.log);
	}
})


setInterval(function() {
	console.log("get data from Ethereum private net");
	/*
	pool.getConnection(function (err, connection) {
		if (err) {
			//connection.release();
			return console.error (err.message);
		}
		let query = "select count(id) from video";
		connection.query (query, function (err, rows, fields) {
			connection.release();
			if (err) return console.error (err.message);
			num = rows.length;
			next();
		});
	});
	*/
}, 10000);

