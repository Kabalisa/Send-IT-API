
const order = () =>{

const element = document.getElementById("toro");
const a = 100;

for (let i = 1; i <= a; i++) {
	let obj = JSON.parse(localStorage.getItem(i.toString()));

	if(obj !== null){

      var row = document.createElement("tr");
      
      for(let j = 0; j<5; j++){

        if(j === 0){
         var one = document.createElement("td");
         var textOne = document.createTextNode(obj[0].toString());
         one.appendChild(textOne);
         row.appendChild(one);
        } 
        
        if(j === 1){
         var two = document.createElement("td");
         var textTwo = document.createTextNode(obj[2][2].toString());
         two.appendChild(textTwo);
         row.appendChild(two);
        }
         
         if(j === 2){
         var three = document.createElement("td");
         var textThree = document.createTextNode(obj[3][2].toString());
         three.appendChild(textThree);
         row.appendChild(three);
         }

         if(j === 3){
         var four = document.createElement("td");
         var textFour = document.createTextNode("Pending");
         four.appendChild(textFour);
         row.appendChild(four);
         }

         if(j === 4){
         var five = document.createElement("td");
         var fivel = document.createElement("a");
         fivel.setAttribute("href","order-detail.html");
         fivel.setAttribute("class","view");
         var textFive = document.createTextNode("View/edit");
         fivel.appendChild(textFive);
         five.appendChild(fivel);
         row.appendChild(five);
         }

      }
       element.appendChild(row);
	}

}

return localStorage.getItem("1");

}


