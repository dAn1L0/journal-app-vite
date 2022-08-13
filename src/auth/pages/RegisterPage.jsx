import {Link as RouterLink} from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useMemo, useState } from 'react'
import { startRegister } from '../../store/auth'
import { useDispatch, useSelector } from 'react-redux'

const formData = {
  displayName: 'Danilo Chávez',
  email: 'danilo@chavez.com',
  password: '123456'
}

const formValidations = {
  email: [(value)=> value.includes('@'), 'El correo no es válido'],
  password: [(value)=> value.length >= 6, 'La contraseña debe contener más de 6 caracteres'],
  displayName: [(value)=> value.trim().length >= 1, 'El nombre es obligatorio']
}


export const RegisterPage = () => {

  const dispatch = useDispatch()
  const {status, errorMessage} = useSelector(state => state.auth)

  const [formSubmitted, setFormSubmitted] = useState(false)
  const isCheckAuthentication = useMemo(() => {
    status === 'checking'
  }, [status])

  const {
    formState,
    isFormValid,
    displayName,
    displayNameValid, 
    email,
    emailValid, 
    password,
    passwordValid, 
    onInputChange, 
  } = useForm(formData, formValidations)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    
    if (!isFormValid) return;
    
    dispatch(startRegister(formState))

  }

  return (
    <AuthLayout title='Inscribirse'>
      <form onSubmit={onSubmit} >
        <Grid container>
          <Grid item xs={12} sx={{mt:2}}>
            <TextField 
              label='Nombre'
              type='text'
              placeholder='Nombre'
              fullWidth
              autoComplete='off'
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
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
            <Grid item xs={12} sx={{mt:1}}>
              <Button
                disabled={isCheckAuthentication} 
                type='submit'
                variant='contained' 
                fullWidth
              >
                Aceptar
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
              to='/auth/login'
            >
              Iniciar sesión
            </Link>

          </Grid>
        </Grid>
      </form>
    </AuthLayout>

  )
}



