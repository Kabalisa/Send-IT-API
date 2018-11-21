 function idStore(){
  var collection = ["0"];
  this.has = function(val){
    return(collection.indexOf(val) !== -1);
  };

  this.add = function(val){
      collection.push(val);
  };

  this.remove = function(val){
    if(this.has(val)){
      index = collection.indexOf(val);
      collection.splice(index,1);
      return true;
    }
    return false;
  };

}

 var ids = new idStore(); //set to store parcel ids


 const addi = () =>{

   let parcel = [ , , [], [], []];
   parcel[0] = document.getElementById('pid').value;
   
  
   const u = document.getElementsByTagName('input'); 

   parcel[1] = u[0].value;

   let count1 = 0;

   for(i = 1; i<5; i++){
    parcel[2][count1] = u[i].value;
    count1++;
  }

  let count2 = 0;

   for(j = 5; j<9; j++){
    parcel[3][count2] = u[j].value;
    count2++;
  }
  
    let count3 = 0;

   for(k = 9; k<12; k++){
    parcel[4][count3] = u[k].value;
    count3++;
  }

  let myJson = JSON.stringify(parcel);

  if(ids.has(parcel[0])){
   	
   	if(Number.parseInt(parcel[0]) === 0){
       alert('INVALID parcel: no 0 id')
   	}else{
    alert('parcel with id ' +Number.parseInt(parcel[0])+ ' already exist'); // add cancel  order function
   	}

   }
   else if(JSON.parse(localStorage.getItem(parcel[0])) !== null){
   	alert('parcel with id ' +Number.parseInt(parcel[0])+ ' already exist in storage');
   }
   else{
    localStorage.setItem(parcel[0], myJson);
   	ids.add(parcel[0]);
   } 

 	return localStorage.getItem("3");
//delete after
}

    
 const ucl = () =>{

 	const v = document.getElementsByTagName('input');

    document.getElementById('pid').value = "0";

 	for(l = 0; l<12; l++){
     v[l].value = " ";
    }
 }   

 // const ucl = () =>{
 // 	return localStorage.getItem("1");
 // }