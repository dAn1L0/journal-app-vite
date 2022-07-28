import { TurnedInNot } from '@mui/icons-material'
import { 
  Box, 
  Divider, 
  Drawer, 
  Grid, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography 
} from '@mui/material'


export const Sidebar = ({ drawerWidth = 240 }) => {
  return (
    <Box
      component={'nav'}
      sx={{ width:{sm: drawerWidth }, flexShrink:{ sm: 0 } }}
    >
      <Drawer
        variant='permanent'
        open
        sx={{ 
          width: { xs: 'block'},
          '& .MuiDrawer-paper':{ boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
          >
            Danilo Chávez
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {
            ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo'].map(text => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={ text } />
                    <ListItemText secondary={ 'Deserunt cupidatat minim ipsum pariatur. ' } />
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      
      </Drawer>
    </Box>
  )
}
