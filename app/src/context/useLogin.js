import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError]         = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch}                = useAuthContext()

  const login = async ({email, password}) => {
    setIsLoading(true)
    setError(null)
    const response = await fetch('/api/v1/user/login', {
      method: 'POST',
      headers: {'Content-Type'  : 'application/json', 
                'Accept'        : 'application/json',},
      body: JSON.stringify( { email, password } )
    })

    const json = await response.json()
    if ( !response.ok ) {
      let APIerror = (json.error) ? JSON.stringify(json.error) : ""
      if (json.errors) {
        //APIerror += 
        APIerror += json.errors.map((fieldValidationErrorObj) => fieldValidationErrorObj.msg).join(' ')
        console.log(APIerror)
      }
      //setError(json.error)
      setError(APIerror)
      setIsLoading(false)
    }
    
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json)) // save the user to local storage for persistence however it is not secure
      dispatch({type: 'LOGIN', payload: json}) // update the auth context
      setIsLoading(false)
    }
  }

  // const login1 = async (credentials) => {
  //     return await fetch(`/api/v1/user/login`, {
  //       method: 'POST',
  //         headers: { 'Content-Type': 'application/json',
  //                     'Accept'     : 'application/json', },
  //         body: JSON.stringify({credentials})
  //     })
  //     .then((response) => {
  //         //response.json()
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       return Promise.reject(response); 
  //     })
  //     .then((responseData) => {
  //         return responseData;
  //     })
  //     .catch(error => {
  //             console.error(error)
  //             console.log( error.status, 'Error Text=' + error.statusText );
  //             // 3. get error messages, if any, from the api response
  //             error.json().then((json) => {
  //               console.log('Error Response = ' + JSON.stringify(json));
  //               return json;
  //             })
  //         }
  //     );
  // }

  return { login, 
    //login1, 
    isLoading, error }
}