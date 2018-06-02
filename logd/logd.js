var Web3 = require('web3');
var net = require('net');

/*
if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	// set the provider you want from Web3.providers
	// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	web3 = new Web3(new Web3.providers.IpcProvider('/Users/jaeykim/Develops/video_verifier/logd/private_chain/geth.ipc', net));
}
*/
//var web3 = new Web3(new Web3.providers.IpcProvider('/Users/jaeykim/Develops/video_verifier/logd/private_chain/geth.ipc', net));

var web3 = new Web3('http://localhost:8545');
//var web3 = new Web3('/Users/jaeykim/Develops/video_verifier/logd/private_chain/geth.ipc', net);

var coinbase = web3.eth.getCoinbase().then(console.log);
