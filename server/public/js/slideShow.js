var slideIndex=1;
showPic(slideIndex);

function clickedbtn(n){

 showPic(slideIndex +=n);
}


function showPic(n){

var el =document.getElementsByClassName('sliding');
if(n > el.length)
   slideIndex = 1;

if (n<1) {
	slideIndex = el.length;
}

for (var i = 0; i < el.length; i++) {
	el[i].style.display = "none";
}

el[slideIndex - 1].style.display = "block"




}