var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var waypointX;
var waypointY;

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
	context.clearRect(0,0,canvas.width,canvas.height)
	context.drawImage(imgShip,shipX,shipY);
	requestAnimFrame(update);
	console.log(waypointX+","+waypointY);
	if (waypointX != shipX || waypointY != shipY){
	if (waypointX < shipX){shipX--;}
	if (waypointX > shipX){shipX++;}
	if (waypointY < shipY){shipY--;}
	if (waypointX > shipX){shipY++;}
	}
	
}

canvas.onmousedown = function(e){

    waypointX=getMousePos(canvas,e).x;
    waypointY=getMousePos(canvas,e).y;

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}