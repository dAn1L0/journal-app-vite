import {Link as RouterLink} from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { startGoogleSignIn, startLogin } from '../../store/auth'
import { useMemo, useState } from 'react'


const formData = {
  email: 'danilo@chavez.com',
  password: '123456'
}

const formValidations = {
  email: [(value)=> value.includes('@'), 'El correo es obligatorio'],
  password: [(value)=> value.length >= 6, 'La contraseña es obligatoria'],
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [formSubmitted, setFormSubmitted] = useState(false)
  const isAuthentication = useMemo(() => status === 'checking', [status])

  const {
    email,
    password,
    emailValid,
    passwordValid,
    isFormValid,
    onInputChange,
    formState
  } = useForm(formData,formValidations)  


  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    
    if(!isFormValid) return;

    dispatch( startLogin(formState) )

  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch( startGoogleSignIn() )
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{mt:2}}>
            <TextField 
              label='Correo'
              type='email'
              placeholder='Correo'
              fullWidth
              autoComplete='off'
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{mt:2}}>
            <TextField 
              label='Contraseña'
              type='password'
              autoComplete='current-password'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container
            spacing={2}
            sx={{mb:2, mt:1}}
          >
            <Grid 
              item 
              xs={12} 
              display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>
                { errorMessage }
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6} sx={{mt:1}}>
              <Button
                disabled={isAuthentication}
                variant='contained' 
                fullWidth
                type='submit'
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} sx={{mt:1}}>
              <Button 
                disabled={isAuthentication}
                onClick={onGoogleSignIn} 
                variant='contained' 
                fullWidth
              >
                <Google />
                <Typography sx={{ ml:1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container 
            direction='row' 
            justifyContent={'end'}
          >
            <Link 
              component={RouterLink} 
              color='inherit' 
              to='/auth/register'
            >
              Inscribirse
            </Link>

          </Grid>
        </Grid>
      </form>
    </AuthLayout>

  )
}


