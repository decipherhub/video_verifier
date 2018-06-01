var myVideo = document.getElementById("video1"); 

function playPause() { 
	if (myVideo.paused) 
		myVideo.play(); 
	else 
		myVideo.pause(); 
} 

function makeBig() { 
	myVideo.width = 560; 
} 

function makeSmall() { 
	myVideo.width = 320; 
} 

function makeNormal() { 
	myVideo.width = 420; 
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
