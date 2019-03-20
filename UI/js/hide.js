
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
for(i=0; i<7; i++){	
	if(i === 5 || i === 6){ continue; }
 x[i].disabled=false;
}
}
