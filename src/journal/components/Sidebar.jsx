import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { 
  Divider, 
  IconButton, 
  List, 
  Toolbar, 
  Tooltip, 
  Typography, 
  useTheme
} from '@mui/material'
import { useSelector } from 'react-redux'
import { SidebarItem } from './'


export const Sidebar = ({handleDrawerClose}) => {

  const theme = useTheme();
  const {displayName} = useSelector(state => state.auth)
  const {notes} = useSelector(state => state.journal)

  return (
    <>
      <Toolbar>
        <Tooltip title={`Hola, ${displayName}`}>
        <Typography
          sx={{ paddingRight: 21 }}
          variant='h6'
          noWrap
          component='div'
        >
          {displayName}
        </Typography>
        </Tooltip>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
      <Divider />

      <List>
        {
          notes.map(note => (
            <SidebarItem key={note.id} {...note} />
          ))
        }
      </List> 
    </>
  )
}
