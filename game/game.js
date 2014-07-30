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
shipUp=new Image();
shipUp.src= "images/shipFullU.png";
shipUp.addEventListener("load",init,false);
shipDown=new Image();
shipDown.src= "images/shipFullD.png";
shipDown.addEventListener("load",init,false);
shipLeft=new Image();
shipLeft.src= "images/shipFullL.png";
shipLeft.addEventListener("load",init,false);
shipRight=new Image();
shipRight.src= "images/shipFullR.png";
shipRight.addEventListener("load",init,false);

//diagonals

shipUpLeft=new Image();
shipUpLeft.src= "images/shipFullLU.png";
shipUpLeft.addEventListener("load",init,false);
shipDownLeft=new Image();
shipDownLeft.src= "images/shipFullLD.png";
shipDownLeft.addEventListener("load",init,false);
shipUpRight=new Image();
shipUpRight.src= "images/shipFullRU.png";
shipUpRight.addEventListener("load",init,false);
shipDownRight=new Image();
shipDownRight.src= "images/shipFullRD.png";
shipDownRight.addEventListener("load",init,false);


var shipIco;
var dir="U";

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
var origMods = [[1,1.2],[2,0.8],[0.2,1.4],[1.4,1.3],[2.2,1.4],[0.3333,1],[0.2,1.5],[2.5,0.31415],[0.7,1.1],[1,1.2]];
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
	dir="";
	if (waypointX != shipX || waypointY != shipY){
	if (waypointX < shipX){shipX--;dir+="L";}
	if (waypointX > shipX){shipX++;dir+="R";}
	if (waypointY < shipY){shipY--;dir+="U";}
	if (waypointY > shipY){shipY++;dir+="D";}
	}
	//console.log(dir);
	if (dir == "U"){shipIco=shipUp;}
	else if (dir == "D"){shipIco=shipDown;}
	else if (dir == "L"){shipIco=shipLeft;}
	else if (dir == "R"){shipIco=shipRight;}
	else if (dir == "RU"){shipIco=shipUpRight;}
	else if (dir == "LU"){shipIco=shipUpLeft;}
	else if (dir == "RD"){shipIco=shipDownRight;}
	else if (dir == "LD"){shipIco=shipDownLeft;}
	for (i = 0; i < planetIcos.length; i++){
	context.drawImage(planetIcos[i],planetXs[i],planetYs[i]);
	}
	//draw the ship
	context.drawImage(shipIco,shipX,shipY,16,16);
	
	for(i=0; i < planetIcos.length; i++){
		var dist=Math.sqrt(Math.pow((planetXs[i]-shipX + 64),2)+Math.pow((planetYs[i]-shipY + 64),2));
		if (dist <= 64 && showStore) {
		//blah, dock,things.
			overlay(i, false);
		}
		distArr[i] = dist;
	}
	
	var prev = distArr[0] > 64;
	for (var i = 1; i < distArr.length; i++) {
		prev = prev && distArr[i] > 64;
	}
	showStore = prev;
	
	var html = "Credits: " + money + "    Ship's Hold: ";
	for (var i = 0; i < shipHold.length; i ++) {
		html = html + cNames[i] + ": " + shipHold[i] + " ";
	}
	document.getElementById("stats").innerHTML = html;
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
	var totalHold = 0;
	for (var i = 0; i < shipHold.length; i++) {
		totalHold += shipHold[i];
	}
	if (price <= money) {
		if (amount <= maxHold - totalHold) {
			shipHold[cId] += amount;
			money = money - price;
			mods[cId][pId] = mods[cId][pId] * 1.01;
		} else {
			alert("Not enough space in the hold!");
		}
	} else {
		alert("Not enough money!");
	}
	loadStore(pId);
}

function sell(cId, pId, amount) {
	if (shipHold[cId] >= amount) {
		shipHold[cId] = shipHold[cId] - amount;
		money += getPrice(cId, pId, false);
		mods[cId][pId] = mods[cId][pId] * 0.99;
	} else {
		alert("Not enough of resource");
	}
	loadStore(pId);
}



window.setInterval(function() {
	for (var j = 0; j < mods.length; j ++) {
		for (var k = 0; k < mods[j].length; k ++) {
			if (mods[j][k] > origMods[j][k]) {
				mods[j][k] = mods[j][k] * 0.99;
			} else if (mods[j][k] < origMods[j][k]) {
				mods[j][k] = mods[j][k] * 1.01;
			}
		}
	}
}, 90000);

function loadStore(pId) {
	var html = "<h1>Commerce Center</h1><table><tr><td>Resource</td><td>Buy</td><td>Sell</td></tr>";
	for (var i = 0; i < cNames.length; i ++) {
		html = html + "<tr><td>" + cNames[i] + "</td><td><button onclick='buy(" + i + "," + pId + "," + "1)'>" + getPrice(i, pId, true) + 
			"</a></td><td><button onclick='sell(" + i + "," + pId + "," + "1)'>" + getPrice(i, pId, false) +"</a></td></tr>";
	}
	html = html + "</table>[<a href='#' onclick='overlay()'>Close</a>]";
	document.getElementById("store").innerHTML = html;
}
