//Set up globs
//Ze important information goes HERE!
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var waypointX;
var waypointY;
var shipHull=900;
var maxShipHull = 900;
var pirateX=1219;
var pirateY=619;
var pirWayX=1219;
var pirWayY=619;
//Set up images
bg=new Image();
bg.src="images/bg.png";
bg.addEventListener("load",init,false);
imgDesertPlanet=new Image();
imgDesertPlanet.src= "images/desertPlanet.png";
imgDesertPlanet.addEventListener("load", init, false);
imgRockPlanet=new Image();
imgRockPlanet.src="images/rockPlanet.png";
imgRockPlanet.addEventListener("load",init,false);
imgGreenPlanet=new Image();
imgGreenPlanet.src="images/greenPlanet.png";
imgGreenPlanet.addEventListener("load",init,false);
asteroidField= new Image();
asteroidField.src= "images/asteroid.png";
asteroidField.addEventListener("load",init,false);



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

pirUp= new Image();
pirUp.src="images/pirU.png";
pirUp.addEventListener("load",init,false);
pirDown= new Image();
pirDown.src="images/pirD.png";
pirDown.addEventListener("load",init,false);
pirLeft= new Image();
pirLeft.src="images/pirL.png";
pirLeft.addEventListener("load",init,false);
pirRight= new Image();
pirRight.src="images/pirR.png";
pirRight.addEventListener("load",init,false);

pirUpLeft= new Image();
pirUpLeft.src="images/pirUL.png";
pirUpLeft.addEventListener("load",init,false);
pirDownRight= new Image();
pirDownRight.src="images/pirDR.png";
pirDownRight.addEventListener("load",init,false);
pirDownLeft= new Image();
pirDownLeft.src="images/pirDL.png";
pirDownLeft.addEventListener("load",init,false);
pirUpRight= new Image();
pirUpRight.src="images/pirUR.png";
pirUpRight.addEventListener("load",init,false);




var shipIco;
var dir="U";
var pirIco;
var pirDir= "U";
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
var pirDistArr = new Array();

var planetXs=[100,250,632,853,443,954];
var planetYs=[200,506,232,467,500,130];
var pNames=["Yoni Bloch", "Kerensa Jennings", "Tetteh Kofi", "Bill Liao", "Katrina Roberts", "Sathya Smith"];
var asteroidXs=[getRandomInt(100,1300),getRandomInt(100,1300),getRandomInt(100,1300),getRandomInt(100,1300),getRandomInt(100,1300),getRandomInt(100,1300),getRandomInt(100,1300),getRandomInt(100,1300)];
var asteroidYs=[getRandomInt(100,600),getRandomInt(100,600),getRandomInt(100,600),getRandomInt(100,600),getRandomInt(100,600),getRandomInt(100,600),getRandomInt(100,600),getRandomInt(100,600)];
var planetIcos=[imgDesertPlanet,imgGreenPlanet,imgGreenPlanet,imgRockPlanet,imgRockPlanet,imgRockPlanet];
var origMods = [[1,1.2],[2,0.8],[0.2,1.4],[1.4,1.3],[2.2,1.4],[0.3333,1],[0.2,1.5],[2.5,0.31415],[0.7,1.1],[1,1.2]];
var mods=[[1,1.2],[2,0.8],[0.2,1.4],[1.4,1.3],[2.2,1.4],[0.3333,1],[0.2,1.5],[2.5,0.31415],[0.7,1.1],[1,1.2]];
var pirDist;

//banana banana banana
function init(){
	requestAnimFrame(update);
}

var iterator = 0;
//drawing the frame.Most game code goes here.
function update(){
	if (money <0){
	
	money= 0;
	}
	context.clearRect(0,0,canvas.width,canvas.height)
	
	requestAnimFrame(update);
	context.drawImage(bg,0,0,1300,740);
	
	for(i=0; i < planetIcos.length; i++){
		var dist=Math.sqrt(Math.pow((planetXs[i]-shipX + 32),2)+Math.pow((planetYs[i]-shipY + 32),2));
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
	
	if (prev) {
		el = document.getElementById("overlay");
		el.style.visibility = "hidden";
	}
	
	if (iterator % 5 == 0) {
		//move the ship
		dir="";
		if (!(waypointX==shipX && waypointY==shipY)){
		if (waypointX < shipX){shipX--;dir+="L";}
		if (waypointX > shipX){shipX++;dir+="R";}
		if (waypointY < shipY){shipY--;dir+="U";}
		if (waypointY > shipY){shipY++;dir+="D";}
		}
		console.log(dir);
		if(dir == "U"){shipIco=shipUp;}
		else if (dir == "LRD"){shipIco=shipDown;}
		else if (dir == "L"){shipIco=shipLeft;}
		else if (dir == "R"){shipIco=shipRight;}
		else if (dir == "RU"){shipIco=shipUpRight;}
		else if (dir == "LU"){shipIco=shipUpLeft;}
		else if (dir == "RD"){shipIco=shipDownRight;}
		else if (dir == "LD"){shipIco=shipDownLeft;}
		else {shipIco=shipUp;}
		
		pirDist=Math.sqrt(Math.pow((pirateX-shipX + 8),2)+Math.pow((pirateY-shipY + 8),2));
		pirDir="";
		if (pirDist < 150) {
			pirWayX = shipX;
			pirWayY = shipY;
		}
		if (pirateX==pirWayX && pirateY == pirWayY){
			var pirPrev = true;
			while (pirPrev) {
				pirWayX= getRandomInt(0,1235);
				pirWayY= getRandomInt(0, 635);
				
				for(i=0; i < planetIcos.length; i++){
					var pirDist=Math.sqrt(Math.pow((planetXs[i]-pirWayX + 32),2)+Math.pow((planetYs[i]-pirWayY + 32),2));
					if (pirDist <= 64)
					pirDistArr[i] = pirDist;
				}

				
				pirPrev = pirDistArr[0] > 120;
				for (var i = 1; i < pirDistArr.length; i++) {
					prev = prev && pirDistArr[i] > 120;
				}
			}
		}else{
			if (iterator % 10 == 0 && showStore) {
				if (pirWayX < pirateX){pirateX--;pirDir+="L";}
				if (pirWayX > pirateX){pirateX++;pirDir+="R";}
				if (pirWayY < pirateY){pirateY--;pirDir+="U";}
				if (pirWayY > pirateY){pirateY++;pirDir+="D";}
				}
				if (pirDir == "U"){pirIco=pirUp;}
				else if (pirDir == "D"){pirIco=pirDown;}
				else if (pirDir == "L"){pirIco=pirLeft;}
				else if (pirDir == "R"){pirIco=pirRight;}
				else if (pirDir == "RU"){pirIco=pirUpRight;}
				else if (pirDir == "LU"){pirIco=pirUpLeft;}
				else if (pirDir == "RD"){pirIco=pirDownRight;}
				else if (pirDir == "LD"){pirIco=pirDownLeft;}
				//else{pirIco=pirUp;}
			}
			if (pirDist <= 48) {
			//get damaged
			money-=5;
			}
	}
	
	
	//draw planets
	for (i = 0; i < planetIcos.length; i++){
	context.drawImage(planetIcos[i],planetXs[i],planetYs[i],64,64);
	}
	//draw the ship
	context.drawImage(shipIco,shipX,shipY,16,16);
	context.drawImage(pirIco,pirateX,pirateY,16,16);
	//draw the asteroid fields
	for (i = 0; i < asteroidXs.length; i++){
	context.drawImage(asteroidField,asteroidXs[i],asteroidYs[i],32,32);
	}
	
	
	for(i=0;i<asteroidXs.length;i++){
		var astDist=Math.sqrt(Math.pow((asteroidXs[i]-shipX + 16),2)+Math.pow((asteroidYs[i]-shipY + 16),2));
		if (astDist <= 32) {
			//get damaged
			shipHull--;
		}
		
	}
	if (money<=0 && (shipHold[0] + shipHold[1] + shipHold[2] + shipHold[3] + shipHold[4] + shipHold[5] + shipHold[6] + shipHold[7] + shipHold[8] + shipHold[9])==0){
	death();

	}
	if (shipHull<= 0){
		shipX=999999999;
		shipY=999999999;
		death();
	}
	
	
	var html = "Credits: " + money + "&nbsp&nbsp|&nbsp&nbsp";
	for (var i = 0; i < shipHold.length; i ++) {
		html = html + cNames[i] + ": " + shipHold[i] + "&nbsp&nbsp|&nbsp&nbsp";
	}
	html+="Hull Integrity: " +shipHull;
	document.getElementById("stats").innerHTML = html;
	
	iterator ++;
}

function overlay(pId, bool) {
	loadStore(pId);
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	showStore = bool;
	playbeep();
}

function death() {
	shipX=99999999999;
	shipY=99999999999;
	el = document.getElementById("death");
	el.style.visibility = "visible";
	document.getElementById("stats").style.visibility = "hidden";
	playbeep();
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
var cNames = ["Gold", "Uranium", "Grain", "Organisms", "Luxury Rations", "Sugar", "Metals", "Basic Rations", "Palladium", "Natural Gas"];
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
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
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

function repair() {
	var toRepair = maxShipHull - shipHull;
	if (money > toRepair) {
		shipHull = maxShipHull;
		money = money - toRepair;
	} else {
		shipHull = shipHull + money;
		money = 0;
	}
	playclang();
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
	var html = "<h2>" + pNames[pId] + "<br>Commerce Center</h2><table align='center' class='commerce'><tr><td>Resource</td><td>Buy</td><td>Sell</td></tr>";
	for (var i = 0; i < cNames.length; i ++) {
		html = html + "<tr><td>" + cNames[i] + "</td><td  class='imageContainer'><a href='#' onclick='buy(" + i + "," + pId + "," + "1)'>" + getPrice(i, pId, true) + 
			"</a></td><td class='imageContainer'><a href='#' onclick='sell(" + i + "," + pId + "," + "1)'>" + getPrice(i, pId, false) +"</a></td></tr>";
	}
	html = html + "<tr><td class='imageContainer'><a href='#' onclick='repair()'>Repair</a></td><td class='imageContainer'><a href='#' onclick='overlay()'>Close</a></td></tr></table>";
	document.getElementById("store").innerHTML = html;
}

for (var i = 0; i < cNames.length; i++) {
	for (var j = 0; j < pNames.length; j++) {
		origMods[i][j] = (Math.random() * 1.5) + 0.5;
	}
}
mods = origMods;

