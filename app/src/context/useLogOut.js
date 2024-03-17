import {useContext} from 'react'
import { useAuthContext } from './useAuthContext'
import { GlobalContext } from './GlobalState';

export const useLogOut = () => {
  const { dispatch } = useAuthContext()
  const { emptyTransactionsFromBrowser } = useContext(GlobalContext);

  const logout = async () => {
    emptyTransactionsFromBrowser() // browser flashes the list of transactions of previous user before showing the correct transactions of logged in user.
    localStorage.removeItem('user')
    dispatch({type: 'LOGOUT'})  // update the auth context
  }

  return { logout }
}