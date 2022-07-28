import {Link as RouterLink} from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'

export const RegisterPage = () => {
  return (
    <AuthLayout title='Inscribirse'>
      <form>
        <Grid container>
          <Grid item xs={12} sx={{mt:2}}>
            <TextField 
              label='Nombre'
              type='text'
              placeholder='Nombre'
              fullWidth
              autoComplete='off'
            />
          </Grid>
          <Grid item xs={12} sx={{mt:2}}>
            <TextField 
              label='Correo'
              type='email'
              placeholder='Correo'
              fullWidth
              autoComplete='off'
            />
          </Grid>
          <Grid item xs={12} sx={{mt:2}}>
            <TextField 
              label='Contraseña'
              type='password'
              autoComplete='current-password'
              fullWidth
            />
          </Grid>
          <Grid container
            spacing={2}
            sx={{mb:2, mt:1}}
          >
            <Grid item xs={12} sx={{mt:1}}>
              <Button variant='contained' fullWidth>
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



