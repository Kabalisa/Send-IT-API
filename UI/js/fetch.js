let TOKEN;

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
     	 let { token } = response;
     	 TOKEN = token;
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
