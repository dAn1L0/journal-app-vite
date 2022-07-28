import { AddOutlined } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'

export const JournalPage = () => {
  return (
    <JournalLayout>

      {/* <Typography>
        Ipsum velit et nisi laborum velit. Elit commodo cillum reprehenderit voluptate duis commodo consectetur est dolore pariatur. Duis sunt eiusmod ipsum nulla irure ut dolore est anim cillum quis. Esse magna ex magna eu. Irure consectetur duis culpa labore do. Elit consequat quis anim irure in aliqua ad. Occaecat laborum mollit proident sunt pariatur sit voluptate anim veniam.
      </Typography> */}
      <NoteView />
      {/* <NothingSelectedView /> */}


      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          opacity: 0.6,
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>
      
    </JournalLayout>
  )
}
