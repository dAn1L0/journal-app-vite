import { AttachFileOutlined, TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal'

export const SidebarItem = ({title='',body, id, date, imagesUrls=[] }) => {

  const dispatch = useDispatch()

  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0,17) + '...'
      : title
  },[title])

  const newBody = useMemo(() => {
    return body.length > 60
      ? body.substring(0,60) + ' ...'
      : body
  },[body])

  const handleClick = () => {
    dispatch( setActiveNote({title,body,id, date,imagesUrls}) )
  }

  return (
    <ListItem disablePadding onClick={ handleClick }>
      <ListItemButton>
        {/* <ListItemIcon> */}
          <TurnedInNot sx={{ marginRight: 1, color: '#c4c4c4' }} />
        {/* </ListItemIcon> */}
        <Grid container>
          <ListItemText primary={ newTitle } />
          {
            (imagesUrls.length > 0) && <AttachFileOutlined color='primary' fontSize='small' sx={{ opacity:'0.3' }}/>
          }
          <ListItemText secondary={ newBody } />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
