import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignUp = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (name, email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/v1/user/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, email, password, })
    })
    const json = await response.json()

    if ( !response.ok ) {
      let APIerror = (json.error) ? JSON.stringify(json.error) : ""
      if (json.errors) {
        //APIerror += 
        APIerror += json.errors.map((fieldValidationErrorObj) => fieldValidationErrorObj.msg).join(' ')
        console.log(APIerror)

        //JSON.stringify(json.errors.msg) : ''
      }
      //setError(json.error)
      setError(APIerror)
      setIsLoading(false)
    }
    
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      // update the auth context
      dispatch({type: 'LOGIN', payload: json})
      // update loading state in the end
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}