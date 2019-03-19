// use onload on createorder and others to display logged in user name on menu bar not only kabalisa. send name, store in localstorage and retrice it in name()...
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

function placeOrder(){
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

function getAll(){
    let TOKEN = JSON.parse(localStorage.getItem('authantic'));
    let fetchData = {
    	method : 'GET',
    	headers : {
    		'Accept' : 'application/json',
    		'Content-Type' : 'application/json',
    		'x-access-token' : TOKEN 
    	}
    };

    fetch('http://localhost:3000/api/v1/users/parcels', fetchData)
    .then((resp) => {
    	let { status }  = resp;
      	STATUS = status;
    	return resp.json();
    })
    .then((response) => {
    	let historyTable = document.getElementById('delivered');
    	let currentTable = document.getElementById('toro');
    	let { rows } = response;

    	if(STATUS === 200){
            rows.map((parcel) => {
            console.log(parcel);
    		if(parcel.status === 'pending'){
    			currentTable.insertAdjacentHTML('beforeend', `<tr>
    				<td>${parcel.id}</td>
    				<td>${parcel.pickup}</td>
    				<td>${parcel.destination}</td>
    				<td>${parcel.status}</td>
    				<td><a href="#" class="view" onclick='viewEdit("${parcel.id}")'>View/Edit</a></td>
    				</tr>`)
    		}
    		if(parcel.status === 'delivered'){
    			historyTable.insertAdjacentHTML('beforeend', `<tr>
    				<td>${parcel.id}</td>
    				<td>${parcel.pickup}</td>
    				<td>${parcel.destination}</td>
    				<td>${parcel.status}</td>
    				<td><a href="#" class="view" onclick='view("${parcel.id}")'>View</a></td>
    				</tr>`)
    		}
    	});
    	}

    	if(STATUS === 400){
    		let noParcel = document.getElementById('noParcel');
    		noParcel.style.color = 'green';
    		noParcel.innerHTML = 'You have no parcels. Click on createorder to create some.';
    	}
    })
    .catch((error) => {
    	console.log(error);
    })
}

function viewEdit(id){
	let myjson = JSON.stringify(id);
	localStorage.setItem('id', myjson);
	window.location.assign('../html/order-detail.html');
};

function view(id){
	let myjson = JSON.stringify(id);
	localStorage.setItem('id', myjson);
	window.location.assign('../html/order-detail.html');
};

function getOne(){
	let id = JSON.parse(localStorage.getItem('id'));
	let TOKEN = JSON.parse(localStorage.getItem('authantic'));
	document.getElementById('parcelNo').innerHTML = `Parcel NO. ${id}`;
	let inputs = document.getElementsByTagName('input');
    let fetchData = {
    	method : 'GET',
    	headers : {
    		'Accept' : 'application/json',
    		'Content-Type' : 'application/json',
    		'x-access-token' : TOKEN 
    	}
    };

    fetch(`http://localhost:3000/api/v1/parcels/${id}`, fetchData)
    .then((resp) => {
    	let { status } = resp;
    	let STATUS = status;
       	return resp.json();
    })
    .then((response) => {
    	inputs[0].value = response.weight;
    	inputs[1].value = response.price;
    	inputs[2].value = response.pickup_stno;
    	inputs[3].value = response.pickup;
    	inputs[4].value = response.destination_stno;
    	inputs[5].value = response.destination;
    	inputs[6].value = response.receiver;
    	inputs[7].value = response.receiver_phone;
    	inputs[8].value = response.status;
    	inputs[9].value = response.presentlocation;

    	if(response.status === 'delivered'){
    		inputs[10].style.display = 'none';
    		inputs[11].style.display = 'none';
    		inputs[12].style.display = 'none';
    	}

    	console.log(response);
    })
    .catch((error) => {
    	console.log(error);
    })     
};

function updateOrder(){
    let TOKEN = JSON.parse(localStorage.getItem('authantic'));
    let id = JSON.parse(localStorage.getItem('id'));
    let EMAIL = JSON.parse(localStorage.getItem('authantice'));
    let inputs = document.getElementsByTagName('input');
    let STATUS;

    let data = {
    	weight : inputs[0].value,
    	price : inputs[0].value * 1000,
    	pickup  : inputs[3].value,
    	pickup_StNo : inputs[2].value,
    	destination : inputs[5].value,
    	destination_StNo : inputs[4].value,
    	email : EMAIL,
    	receiver : inputs[6].value,
    	receiver_phone : inputs[7].value,
    	presentlocation : inputs[3].value 
    };

    let fetchData = {
    	method : 'PUT',
    	headers : {
    		'Accept' : 'application/json',
    		'Content-Type' : 'application/json',
    		'x-access-token' : TOKEN
    	},
    	body : JSON.stringify(data)
    };

    fetch(`http://localhost:3000/api/v1/parcels/${id}/update`, fetchData)
    .then((resp) => {
        let { status } = resp;
        STATUS = status;
        console.log(STATUS);
    	return resp.json();
    })
    .then((response) => {

    	if(STATUS === 200){
    		document.getElementById('parcelNo').style.color = 'green'; 
    		document.getElementById('parcelNo').innerHTML = `Parcel NO. ${id} is updated`;

    		for(let i = 0; i<10; i++){ inputs[i].disabled = true };
    	}
      
      console.log(response);
    })
    .catch((error) => {
    	console.log(error);
    })
};