var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

imgShip = new Image();
imgShip.src = "images/protoShip.png";
imgShip.addEventListener("load", init, false);

var requestAnimFrame=
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
	window.setTimeout(callback,1000/60);
	};
var shipX = 65;
var shipY = 65;
function init(){
	requestAnimFrame(update);
}

function update(){
	context.drawImage(imgShip,shipX,shipY,100,77);
	requestAnimFrame(update);
}