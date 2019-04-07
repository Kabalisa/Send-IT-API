const ondis = () => {
  const x = document.getElementsByTagName("input");
  for (i = 0; i < x.length; i++) {
    if (i === 1 || i === 8 || i === 9) {
      continue;
    }
    x[i].disabled = false;
  }
};

// const onenable = () =>{

// let parcel = [ , , [], [], []];
//    parcel[0] = document.getElementById('rt').value;

//    const u = document.getElementsByTagName('input');

//    parcel[1] = u[0].value;

//    let count1 = 0;

//    for(i = 2; i<6; i++){
//     parcel[2][count1] = u[i].value;
//     count1++;
//   }

//   let count2 = 0;

//    for(j = 6; j<10; j++){
//     parcel[3][count2] = u[j].value;
//     count2++;
//   }

//     let count3 = 0;

//    for(k = 10; k<13; k++){
//     parcel[4][count3] = u[k].value;
//     count3++;
//   }

//   let myJson = JSON.stringify(parcel);

//   if(Number.parseInt(parcel[0]) === 0){

//       alert('INVALID parcel: no 0 id')

//    }
//    else{
//     localStorage.setItem(parcel[0], myJson);
//    }

// for(i=0; i<13; i++){
//  u[i].disabled=true;
// }

//  return localStorage.getItem("4");
// //delete after
// }
