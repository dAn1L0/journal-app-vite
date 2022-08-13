import { AddOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'

export const JournalPage = () => {

  const {isSaving, notaActiva } = useSelector(state => state.journal)
  const dispatch = useDispatch()

  const onClickNewNote = () => {
    dispatch( startNewNote() )
  }

  return (
    <JournalLayout>

      {
        (!!notaActiva)
          ? <NoteView />
          : <NothingSelectedView /> 
      }
      <Tooltip title='Agregar una nota'>
        <IconButton
          disabled={isSaving}
          onClick={onClickNewNote}
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
      </Tooltip>
      
    </JournalLayout>
  )
}
