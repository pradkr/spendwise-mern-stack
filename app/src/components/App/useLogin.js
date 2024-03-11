
const HOST = ''
//'https://spendwise-mern-stack-server-client.onrender.com' 
//process.env.HOST_BE || 'http://localhost:5000'

export async function loginUser(credentials) {
    return await fetch(`${HOST}/api/v1/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })
    .then( data => data.json())
    .catch(err => console.log('Error in login'+err) )
}

export async function loginUser1(credentials) {
    return await fetch(`${HOST}/api/v1/user/login`, {
    	method: 'POST',
        headers: { 'Content-Type': 'application/json',
                },
        body: JSON.stringify(credentials)
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log('Login API resp='+responseData);
      return responseData;
    })
    .catch(error => console.error(error));
}
  
//getvals().then(response => console.log(response));