function signup(){
     let STATUS;
     let inputs = document.getElementsByTagName('input');

     if(inputs[6].value !== inputs[7].value && inputs[8].value !== inputs[9].value){
     	document.getElementById('pop').style.color = '#CA1E21';
     	return document.getElementById('pop').innerHTML = 'COMFIRM SAME EMAIL AND PASSWORD PLEASE';
     }

     if(inputs[6].value !== inputs[7].value){
     	document.getElementById('pop').style.color = '#CA1E21';
     	return document.getElementById('pop').innerHTML = 'COMFIRM SAME EMAILS PLEASE';
     }

     if(inputs[8].value !== inputs[9].value){
     	document.getElementById('pop').style.color = '#CA1E21';
     	return document.getElementById('pop').innerHTML = 'COMFIRM SAME PASSWORD PLEASE';
     }

     let data = {
     	email : inputs[6].value,
     	first_name : inputs[1].value,
        last_name : inputs[2].value,
        town : inputs[4].value,
        street_number : inputs[3].value,
        phone_number : inputs[5].value,
        password : inputs[8].value
     };

     let fetchData = {
     	method : 'POST',
     	headers : {
     		'Accept' : 'application/json',
     		'Content-Type' : 'application/json'
     	},
     	body : JSON.stringify(data)
     };

     fetch('http://localhost:3000/auth/signup', fetchData)
     .then((resp) => {
     	let {status} = resp;
     	STATUS = status;
     	console.log(STATUS);
     	return resp.json();
     })
     .then((response) => {

     	if(STATUS === 201){
     		// let { result } = response;
     	 //    let EMAIL = result.email;
     	 //    let myJson3 = JSON.stringify(EMAIL);
     	 //    let myJson4 = JSON.stringify(response.token);
     	 //    localStorage.setItem('authantic', myJson3);
     	 //    localStorage.setItem('authantice', myJson4);
     		window.location.assign('../html/signin.html');
     	}

     	if(STATUS === 400){
     		document.getElementById('pop').style.color = '#CA1E21';
      		document.getElementById('pop').innerHTML = `${response.message}`;
     	}
     })
     .catch((error) => {
     	console.log(error);
     })
};

function erase2(id){
	document.getElementById(id).innerHTML = ' ';
};

function signin(){
	
	let emails;
	let passwords;
	let STATUS;

     emails = document.getElementById('emm').value.trim();
     passwords = document.getElementById('pas').value.trim();

     let data = {
     	email : emails,
     	password : passwords
     };

     let fetchData = {
     	method : 'POST',
     	headers : {
     		'Accept' : 'application/json',
     		"Content-Type" : "application/json",
     	},
     	body : JSON.stringify(data)
     };

     fetch('http://localhost:3000/auth/signin', fetchData)
     .then((resp) => {
     	let { status } = resp;
     	STATUS = status;
        console.log(resp);
     	return resp.json();
     })
     .then((response) => {
     	 let myJson1 = JSON.stringify(response.token);
     	 let myJson2 = JSON.stringify(response.user);

     	 localStorage.setItem('authantic', myJson1);
     	 localStorage.setItem('authantice', myJson2);
         console.log(response);

         if(STATUS === 200){
            window.location.assign('../html/createorder.html');

         	// let attr = document.getElementById('sig');
         	// attr.setAttribute('href', 'createorder.html'); 
         }

         if(STATUS === 400){
         	let attr = document.getElementById('invalid');
         	attr.innerHTML = `${response.message}`;
         }
     })
     .catch(function(error){
     	console.log(error);
     })
};

function erase(){
	document.getElementById('invalid').innerHTML = ' ';
};

function placeOrder(){
   // replace the select tag with the validation messages. and parcel create message.// on signin endpoint return email then use it here.
   let inputs = document.getElementsByTagName('input');
   let TOKEN = JSON.parse(localStorage.getItem('authantic'));
   let EMAIL = JSON.parse(localStorage.getItem('authantice'));
   let STATUS;

   let data = {
        weight : inputs[0].value,
        price : inputs[0].value * 1000,
        pickup : inputs[3].value,
        pickup_StNo : inputs[2].value,
        destination : inputs[5].value,
        destination_StNo : inputs[4].value,
        email : EMAIL,
        receiver : inputs[6].value,
        receiver_phone : inputs[7].value,
        status : 'pending',
        presentLocation : inputs[3].value
      };

      let fetchData = {
      	method : 'POST',
      	headers : {
      		'Accept' : 'application/json',
      		'Content-Type' : 'application/json',
      		'x-access-token': TOKEN
      	},
      	body : JSON.stringify(data)
      };

      fetch('http://localhost:3000/api/v1/parcels', fetchData)
      .then((resp) => {

      	let { status }  = resp;
      	STATUS = status;
      	console.log(STATUS);
      	return resp.json();

      })
      .then((response) => {

      	if(STATUS === 201){
      		document.getElementById('msge').style.color = 'green';
      		document.getElementById('msge').innerHTML = 'PARCEL CREATED. CLEAR AND CREATE ANOTHER';
      	}

      	if(STATUS === 400){
      		document.getElementById('msge').style.color = '#CA1E21';
      		document.getElementById('msge').innerHTML = `${response.message}`;
      	}
      	console.log(response);
      })
      .catch((error) => {
      	console.log(error);
      })
};

function erase1(){
    document.getElementById('msge').innerHTML = ' ';
};

function price(){
    let weight = document.getElementById('wgt').value;


    if(weight.toLowerCase() === weight.toUpperCase()){
       let WEIGHT = Number.parseInt(weight);
       let price  = WEIGHT * 1000;
       document.getElementById('price').value = `${price}`;

       if(!weight){
    	document.getElementById('price').value = ' ';
    }

   }

}