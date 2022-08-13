import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { Grid, IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth'
import { logoutJournal } from '../../store/journal'


export const Navbar = ({ open, handleDrawerOpen }) => {

  const dispatch = useDispatch()

  const onClick = () => {
    dispatch( startLogout() )
    dispatch( logoutJournal() )
  }

  return (
    <Toolbar>
      <IconButton
        color='inherit'
        onClick={handleDrawerOpen}
        edge='start'
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
      >
        <MenuOutlined/>
      </IconButton> 

      <Grid container 
        direction='row' 
        justifyContent='space-between'
        alignItems={'center'}
      >
        <Typography 
          variant='h6' 
          noWrap 
          component='div'
        >
          JournalApp
        </Typography>
        <Tooltip title='Salir'>
          <IconButton
            onClick={onClick}
            color='error'
          >
            <LogoutOutlined />
          </IconButton>
        </Tooltip>
      </Grid>
    </Toolbar>
  )
}
