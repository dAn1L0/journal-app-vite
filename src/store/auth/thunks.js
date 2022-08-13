import { loginUserWithEmailAndPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase'
import { logoutJournal } from '../journal'
import { checkingCredentials, login, logout } from './authSlice'


// export const checkingAuthentication = (email,password) => {
//   return async(dispatch) => {
//     dispatch( checkingCredentials() )
//   }
// }

export const startGoogleSignIn = () => {
  return async(dispatch) => {
    dispatch( checkingCredentials() )
    const result = await signInWithGoogle()
    if (!result.ok) return dispatch( logout(result.errorMessage) )
    dispatch( login(result) )
  }
}


export const startRegister = ({ email,password,displayName }) => {
  return async(dispatch) => {
    dispatch( checkingCredentials())
    const resp = await registerUserWithEmailPassword({email,password,displayName})
    if (!resp.ok) {
      const {errorMessage} = resp
      return dispatch( logout({errorMessage}) )
    }
    dispatch( login(resp) )
  }
}

export const startLogin = ({email, password}) => {
  return async(dispatch) => {
    dispatch( checkingCredentials())
    const resp = await loginUserWithEmailAndPassword({email,password})
    if (!resp.ok) {
      const {errorMessage} = resp
      return dispatch( logout({errorMessage}) )
    }
    dispatch( login(resp) )
  }
}

export const startLogout = () => {
  return async(dispatch) => {
    await logoutFirebase()
    dispatch ( logout() )
  }
}