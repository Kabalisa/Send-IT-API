function go(){
	document.getElementById("hi").style.display = "none";
}

function show(){
	var x = document.getElementById("hi");
	if(x.style.display === "none"){
		x.style.display = "flex";
	}
	else{
      x.style.display = "none";
	}
}

function ondis(){
var x = document.getElementsByTagName('input');
for(i=0; i<10; i++){	
 x[i].disabled=false;
}
}

function onenable(){
var x = document.getElementsByTagName('input');
for(i=0; i<10; i++){	
 x[i].disabled=true;
}
}