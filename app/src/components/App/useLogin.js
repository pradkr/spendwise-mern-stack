const HOST = ''
//'https://spendwise-mern-stack-server-client.onrender.com' 
//process.env.HOST_BE || 'http://localhost:5000'
export async function loginUser1(credentials) {
    return await fetch(`${HOST}/api/v1/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })
    .then( data => data.json())
    .catch(err => console.log('Error in login, ' + err) )
}

export async function loginUser(credentials) {
    return await fetch(`${HOST}/api/v1/user/login`, {
    	method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'Accept'     : 'application/json',
                 },
        body: JSON.stringify(credentials)
    })
    .then((response) => {
        //response.json()
        // 1. check response.ok
      if (response.ok) {
        //console.log('1. in response block=' + JSON.stringify(response));
        return response.json();
      }
      //console.log('1.1 in response block=' + JSON.stringify(response));
      return Promise.reject(response); 
    })
    .then((responseData) => {
        //console.log('2. in response block=' + responseData);
        return responseData;
    })
    .catch(error => {
            console.error(error)
            console.log( error.status, 'Error Text=' + error.statusText );
            // 3. get error messages, if any, from the api response
            error.json().then((json) => {
              console.log('Error Response = ' + JSON.stringify(json));
              return json;
            })
        }
    );
}
//pending
export async function registerUser(userData) {
    const response = await fetch(`${HOST}/api/v1/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                   'Accept'      : 'application/json',
                 },
        body:    JSON.stringify({ userData}),
    })

    const data = await response.json()

    if (data.status === 'ok') {
        console.log('registered successfully. navigating to /login page')
        //navigate('/login');
        const token = await loginUser({ userData });
        //setToken(token);
        console.log('token=' + JSON.stringify(token) )
    }
    else
    {
        console.log('Sign Up failed.')
        //setToken(null);
    }
}