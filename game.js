//Set up globs
//Ze important information goes HERE!
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var waypointX;
var waypointY;



//Set up images
//Note the Accent: We are limited on space, only the 1200 x 600 rect
imgShip = new Image();
imgShip.src = "images/protoShip.png";
imgShip.addEventListener("load", init, false);
imgProtoPlanet= new Image();
imgProtoPlanet.src= "images/protoPlanet.png";
imgProtoPlanet.addEventListener("load", init, false);


//banana banana banana
var requestAnimFrame=
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
	window.setTimeout(callback,1000/60);
	};
	
//important information on the ship	
var shipX = 65;
var shipY = 65;
var showStore=true;

var distArr = new Array();

var planetXs=[100,250];
var planetYs=[200,506];
var planetIcos=[imgProtoPlanet,imgProtoPlanet];
var mods=[[1,1.2],[2,0.8],[0.2,1.4],[1.4,1.3],[2.2,1.4],[0.3333,1],[0.2,1.5],[2.5,0.31415],[0.7,1.1],[1,1.2]];
//banana banana banana
function init(){
	requestAnimFrame(update);
}
//drawing the frame.Most game code goes here.
function update(){
	context.clearRect(0,0,canvas.width,canvas.height)
	
	requestAnimFrame(update);
	//move the ship
	if (waypointX != shipX || waypointY != shipY){
	if (waypointX < shipX){shipX--;}
	if (waypointX > shipX){shipX++;}
	if (waypointY < shipY){shipY--;}
	if (waypointY > shipY){shipY++;}
	}
	for (i = 0; i < planetIcos.length; i++){
	context.drawImage(planetIcos[i],planetXs[i],planetYs[i]);
	}
	//draw the ship
	context.drawImage(imgShip,shipX,shipY);
	
	for(i=0; i < planetIcos.length; i++){
		var dist=Math.sqrt(Math.pow((planetXs[i]-shipX + 64),2)+Math.pow((planetYs[i]-shipY + 64),2));
		if (dist <= 100 && showStore) {
		//blah, dock,things.
			overlay(i, false);
		}
		distArr[i] = dist;
	}
	
	var prev = distArr[0] > 100;
	for (var i = 1; i < distArr.length; i++) {
		prev = prev && distArr[i] > 100;
	}
	showStore = prev;
}

function arrBool(foo, bar) {
	return foo && bar;
}

function overlay(pId, bool) {
	loadStore(pId);
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	showStore = bool;
}

//getting info n mouse

canvas.onmousedown = function(e){

    waypointX=getMousePos(canvas,e).x;
    waypointY=getMousePos(canvas,e).y;

}
//moar info on mouse
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
/*
	price system
*/

var maxHold=100;
var money = 1000;
var shipHold=[0,0,0,0,0,0,0,0,0,0];
var cNames = ["Gold", "Oil", "Corn", "Cattle", "Coffee", "Sugar", "Copper", "Rice", "Palladium", "Natural Gas"];
var cData = "Not Set yet";

function loadData() {
	getCommodityData();
}

function getPrice(cId, pId, isBuy) {
	loadData();
	var price = 0;
	price += cData[cId];
	price = price * mods[cId][pId]
	if (!isBuy) {price = price * 0.8}
	price = Math.round(price);
	return price;
}

function buy(cId, pId, amount) {
	var price = getPrice(cId, pId, true);
	if (maxHold - (shipHold[0] + shipHold[1] + shipHold[3] + shipHold[4] + shipHold[5] + shipHold[6] + shipHold[7] + shipHold[8] + shipHold[9] + shipHold[10]) >= amount) {
		if (money >= price) {
			shipHold[cId] + amount;
			money - price;
		} else {
			alert("Not enough money");
		}
	} else {
		alert("Not enough inventory");
	}
}

function sell(cId, pId, amount) {
	if (shipHold[cId] >= amount) {
		shipHold[cId] - amount;
		money += getPrice(cId, pId, false);
	} else {
		alert("Not enough of resource");
	}
}

function loadStore(pId) {
	var html = "<h1>Commerce Center</h1><table><tr><td>Resource</td><td>Buy</td><td>Sell</td></tr>";
	for (var i = 0; i < cNames.length; i ++) {
		html = html + "<tr><td>" + cNames[i] + "</td><td><a href='#' onclick='buy(" + i + "," + pId + "," + "1)'>" + getPrice(i, pId, true) + 
			"</a></td><td><a href='#' onclick='sell(" + i + "," + pId + "," + "1)'>" + getPrice(i, pId, false) +"</a></td></tr>";
	}
	html = html + "</table>[<a href='#' onclick='overlay()'>Close</a>]";
	document.getElementById("store").innerHTML = html;
}
