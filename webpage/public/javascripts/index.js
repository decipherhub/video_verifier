var hashedVideo = document.getElementById("hashedVideo"); 
var uploadedVideo = document.getElementById("uploadedVideo"); 

var last = 0;

function playPause() { 
	if (hashedVideo.paused) {
		hashedVideo.play(); 
		uploadedVideo.play(); 
	} else {
		hashedVideo.pause(); 
		uploadedVideo.pause(); 
	}
} 

var table = document.getElementById("videoList");
setInterval(function() {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'getVideoList', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onload = function () {
		let videos = JSON.parse(this.responseText);
		//console.log(videos);
		for (let i = 0; i < videos.length; i++) {
			table.deleteRow(5);
			var row = table.insertRow(1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = videos[i].time;
			cell2.innerHTML = videos[i].hash;
			row.addEventListener('click', function() {
				document.getElementById('hashedVideo').src = 'http://localhost:3000/videos/' + videos[i].video + '.mp4';	
			});
		}
	};
	xhr.send('last=' + last);
}, 2000);

function clickBtn(i) {
	console.log(i);
}

function fileUpload(e) {
	var selectedFile = e.target.files[0];
	var reader = new FileReader();

	reader.onload = function(e) {
		document.getElementById("uploadedVideo").src = e.target.result;
	};

	reader.readAsDataURL(selectedFile);
}

function getVideo() {
	document.getElementById('hashedVideo').src = 'http://localhost:3000/videos/' + document.getElementById('hashTimestamp').value + '.mp4';
}

function verify() {

	var hashedValue = Sha256.hash(document.getElementById('hashTimestamp').value + document.getElementById('uploadedVideo').src, 'string');
	var uploadedValue = Sha256.hash(document.getElementById('inputTimestamp').value + document.getElementById('uploadedVideo').src, 'string');

	console.log(hashedValue + '\n' + uploadedValue);
	let result = hashedValue == uploadedValue;
	
	document.getElementById('result').innerHTML = result;
}
