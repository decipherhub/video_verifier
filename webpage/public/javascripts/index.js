var hashedVideo = document.getElementById("hashedVideo"); 
var uploadedVideo = document.getElementById("uploadedVideo"); 

function playPause() { 
	if (hashedVideo.paused) {
		hashedVideo.play(); 
		uploadedVideo.play(); 
	} else {
		hashedVideo.pause(); 
		uploadedVideo.pause(); 
	}
} 


setInterval(function() {
	var table = document.getElementById("videoList");
			table.deleteRow(5);
	    var row = table.insertRow(1);
	    var cell1 = row.insertCell(0);
	    var cell2 = row.insertCell(1);
			let now = new Date();
			let tz = now.getTime() + (9 * 3600000);
			now.setTime(tz);
	    cell1.innerHTML = now.toISOString().slice(0,19).replace("T", " ");
	    cell2.innerHTML = "NEW CELL2";
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

