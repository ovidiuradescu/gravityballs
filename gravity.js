var opacity = 1;
var AU_PX = 160;

function au2Px(au){
	return au * AU_PX;
}

function em2kg(em){
	//earthMass2kg
	return em * 5.97219 *  Math.pow(10, 24);
}

var Color = function(red, green, blue, alpha){
	this.red = red;
	this.green = green;
	this.blue = blue;
	this.alpha = alpha;
};

function getRandomColor() {
	var rr= Math.floor((Math.random()*253)+1);
	var rg= Math.floor((Math.random()*253)+1);
	var rb= Math.floor((Math.random()*253)+1);
	
	return new Color(rr, rg, rb, opacity);
}

var CelestianBody = function(name, x, y, ax, ay, mass, radius, color) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.ax = ax;
	this.ay = ay;
	this.m = mass;
	this.r = radius;
	this.color = color;
	this.markdelete = false;
	this.armed = [];
	this.isRocket = false;
};

function getRandomName(){
	var cons = "qwrtypsdfghjklzxcvbnm";
	var voul = "euioa";
	var rndC = Math.floor(Math.random() * 20) + 1;
	var rndC1 = Math.floor(Math.random() * 20) + 1;
	var rndC2 = Math.floor(Math.random() * 4) + 1;
	var rndV = Math.floor(Math.random() * 4) + 1;
	
	var l1 = cons.substr(rndC, 1);
	var l2 = voul.substr(rndV, 1);
	var l3 = cons.substr(rndC1, 1);
	var l4 = voul.substr(rndC2, 1);
	
	return l1+l2+l3+l4;
	
}

var Cannon = function (name, acc, size, angle){
	this.name = name;
	this.acc = acc;
	this.size = size;
	this.angle = angle;
}

function renderGunControl(planet, gun){
	var valueId = planet.name + "_" + gun.name;
	var html = '<div>'+
		'<span>gun angle: </span><input class="aimImput" type="text" id="'+valueId+'" value="'+gun.angle+'">'+
		'<img src="images/aim.gif" alt="aim" id="aimImg"/>'+
	'</div>'+
	//'<div><span class="btn" onclick="aimGun('+planet.name+'_'+gun.name+')">Aim</span></div>';
	'<div><span class="btn" onclick="aimGun(\''+valueId+'\')">Aim</span></div>'+
	'<div><span class="btn" onclick="lounchRocket(\''+valueId+'\')">Lounch rocket</span></div>';
	
	$('#gunControl').html(html);
}

function armPlanet(){
	var selectedPlanet = $("#selectedPlanet").text();
	var planet = $.grep(circles , function (value) {
        return value.name == selectedPlanet;
	});
	planet = planet[0];
	console.log(planet);
	planet.armed[0] = (new Cannon("g1", 2, 2.5, 90));
	
	renderGunControl(planet, planet.armed[0]);
}
function avgColor(color1, color2){
	return new Color((color1.red+color2.red)/2, (color1.green+color2.green)/2, (color1.blue+color2.blue)/2, (color1.alpha+color2.alpha)/2);
}
function getAlpha(CelestianBody1, CelestianBody2){
	return Math.atan2(CelestianBody2.y - CelestianBody1.y, CelestianBody2.x - CelestianBody1.x);
	
}
function getGa(force, mass){
	return force/mass;
}
function getGForce(CelestianBody1, CelestianBody2){
	//G*m1*m2/squ(r)
	var rr = getDistance(CelestianBody1, CelestianBody2);
	//rr = rr/AU_PX;
	
	return (G_Constant * CelestianBody1.m * CelestianBody2.m) / (rr * rr);
}
function getDistance(CelestianBody1, CelestianBody2){
	return Math.sqrt((AU*CelestianBody1.x/AU_PX - AU*CelestianBody2.x/AU_PX) * (AU*CelestianBody1.x/AU_PX - AU*CelestianBody2.x/AU_PX) + (AU*CelestianBody1.y/AU_PX - AU*CelestianBody2.y/AU_PX) * (AU*CelestianBody1.y/AU_PX - AU*CelestianBody2.y/AU_PX));
}
function getDistancePx(CelestianBody1, CelestianBody2){
	return Math.sqrt((CelestianBody1.x -CelestianBody2.x) * (CelestianBody1.x - CelestianBody2.x) + (CelestianBody1.y -CelestianBody2.y) * (CelestianBody1.y - CelestianBody2.y));
}

function getColorString(color) {
	return "rgba("+color.red+", "+color.green+", "+color.blue+", "+color.alpha+")";
} 

function getRandomX() {
	var c_canvas = document.getElementById("c");
	var cw = c_canvas.width;
	var rnd = Math.floor(((Math.random())) * cw);
	return rnd;
}
function getRandomY() {
	var c_canvas = document.getElementById("c");
	var ch = c_canvas.height;
	var rnd = Math.floor(((Math.random())) * ch);
	return rnd;
}
function getRandomRadius() {

}

function transalteCoord(coor){
	var x = coor.x - 20;
	var y = (-1)*( coor.y -20);
	return {x: x, y: y};
}

function generateNewCircle(name, isdebrie){
	var nc = new CelestianBody(name,550,800,0,-0.001,15000000,10,getRandomColor());
	var rrr = Math.floor((Math.random() * 10) + 1);
	//console.log(rrr);
	nc.name = getRandomName();
	var xxx = 5;
	/*
	if(rrr%5 <= 2){
		xxx = 4;
	}
	else if(rrr%5 == 4){
		xxx = 0;
	}
	*/
	
	if(rrr%4 == 1){
		nc.x = sun.x - au2Px(Math.random()) * xxx;
		nc.y = sun.y - au2Px(Math.random()) * xxx;
	}
	else if(rrr%4 == 2){
		nc.x = sun.x - au2Px(Math.random()) * xxx;
		nc.y = sun.y + au2Px(Math.random()) * xxx;
	}
	else if(rrr%4 == 3){
		nc.x = sun.x + au2Px(Math.random()) * xxx;
		nc.y = sun.y - au2Px(Math.random()) * xxx;
	}
	else{
		nc.x = sun.x + au2Px(Math.random()) * xxx;
		nc.y = sun.y + au2Px(Math.random()) * xxx;
	}

	var acc = Math.random()*3;
	var alpha = getAlpha(nc, sun) + 90 * TO_RADIANS;
	nc.ay = acc * Math.sin(alpha);
	nc.ax = acc * Math.cos(alpha);
	
	
	nc.m = em2kg(Math.random())/100000000000;
	nc.r = 2 * Math.random();
	
	return nc;
}

function aimGun(valueElement){
	//console.log(valueElement);
	var angleVal = $('#'+valueElement+'').val();
	var usIdx = valueElement.indexOf("_");
	var pname = valueElement.substring(0, usIdx);
	var gname = valueElement.substring(usIdx + 1);
	//console.log(pname + " " + gname);
	
	var planet = $.grep(circles , function (value) {
        return value.name == pname;
	});
	planet = planet[0];
	var gun = $.grep(planet.armed , function (value) {
        return value.name == gname;
	});
	gun = gun[0];
	gun.angle = angleVal;
	//gun.angle = -45;
	//alert($(valueElement).val());
}


						//		x	,y		,ax	,ay			,mass		,radius	,color
var sun = new CelestianBody("",	800	,800	,0	,0			,1200000000	,20		, getRandomColor());
	sun.name= "Sun";
	sun.x = au2Px(5);
	sun.y = au2Px(5);
	//sun.m = em2kg(330000);
	sun.m = em2kg(330000);
	//sun.r = 30;
	sun.r = 10;
var earth = new CelestianBody("",	550	,800	,0	,-0.001		,15000000		,10		,getRandomColor());
	earth.name = "Earth";
	earth.x = sun.x - au2Px(1);
	earth.y = sun.y;
	earth.m = em2kg(1);
	earth.r = 10;
	earth.ay = 0.97;
var mercur = new CelestianBody("",	1200	,800	,0	,0.001		,14000000		,8		,getRandomColor());
	mercur.name = "Mercury";
	mercur.x = sun.x - au2Px(0.4);
	mercur.y = sun.y;
	mercur.m = em2kg(0.055);
	mercur.r = 4;
	mercur.ay = 1.533;
var venus = new CelestianBody("",	1200	,800	,0	,0.001		,14000000		,8		,getRandomColor());
	venus.name = "Venus";
	venus.x = sun.x - au2Px(0.7);
	venus.y = sun.y;
	venus.m = em2kg(0.815);
	venus.r = 8;
	venus.ay = 1.153;
var mars = new CelestianBody("",	1150	,800	,0	,0.0008	,5000000		,5		,getRandomColor());
	mars.name = "Mars";
	mars.x = sun.x - au2Px(1.5);
	mars.y = sun.y;
	mars.m = em2kg(0.107);
	mars.r = 5;
	mars.ay = 0.795;
var jupiter = new CelestianBody("",	1150	,800	,0	,0.0008	,5000000		,5		,getRandomColor());
	jupiter.name = "Jupiter";
	jupiter.x = sun.x - au2Px(4.8);
	jupiter.y = sun.y;
	jupiter.m = em2kg(318);
	jupiter.r = 15;
	jupiter.ay = 0.443;
	
var moon = new CelestianBody("",	535	,800	,0	,-0.0015	,50		,3		,getRandomColor());
	moon.name = "Moon";
	moon.x = jupiter.x - au2Px(0.15);
	moon.y = sun.y;
	moon.m = em2kg(1/81);
	moon.r = 3;
	moon.ay = 0.520;
	
	
function lounchRocket(valueElement){
	
	var usIdx = valueElement.indexOf("_");
	var pname = valueElement.substring(0, usIdx);
	var gname = valueElement.substring(usIdx + 1);
	
	var planet = $.grep(circles , function (value) {
        return value.name == pname;
	});
	planet = planet[0];
	var gun = $.grep(planet.armed , function (value) {
        return value.name == gname;
	});
	gun = gun[0];
	
	var acc = 2;
	
	var rockx = Math.cos((gun.angle) * TO_RADIANS) * planet.r * gun.size + planet.x;
	var rocky = planet.y - Math.sin((gun.angle) * TO_RADIANS) * planet.r * gun.size;
	
	//var rockx = parseFloat(planet.x) + parseFloat(earth.r * 2);
	//var rocky = parseFloat(earth.y) + parseFloat(earth.r * 2);
	var rockax = acc * Math.cos((gun.angle)*TO_RADIANS);// $('#rax').val();
	var rockay = acc * Math.sin((gun.angle- 180)*TO_RADIANS); //$('#ray').val();
	console.log(sun.x);
	console.log(rockx + " " +  rocky + " " + rockax + " " + rockay);
	console.log(rockx + " " +  rocky );
	var rock = new CelestianBody("R1",	parseFloat(rockx)	,parseFloat(rocky)	, parseFloat(rockax) , parseFloat(rockay) ,em2kg(0.0000000001)	, 2	, new Color(254, 254, 254, opacity));
	rock.isRocket = true;
	circles.push(rock);
	//console.log(circles);
}