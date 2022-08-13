import { DeleteForeverOutlined, SaveOutlined, UploadFileOutlined } from '@mui/icons-material'
import { 
  Button,
  Grid, 
  IconButton, 
  TextField, 
  Tooltip, 
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks'
import { ImageGallery } from '../components'
import moment from 'moment';
import { 
  setActiveNote, 
  startDeletingNote, 
  startSaveNote, 
  startUploadingFiles 
} from '../../store/journal'

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'


export const NoteView = () => {

  const dispatch = useDispatch()
  const {notaActiva, messageSaved, isSaving } = useSelector(state => state.journal)

  //  = notaActiva
  const { title, body, date, onInputChange, formState } = useForm(notaActiva)

  const dateString = useMemo(() => {
    const newDate = moment(date).utcOffset(-5, true)
    return newDate.format("dddd,DD MMMM YY")
  },[date])

  useEffect(() => {
    dispatch( setActiveNote(formState) )
  }, [formState])

  useEffect(() => {
    if(messageSaved.length > 1){
      Swal.fire({
        title: 'Nota actualizada',
        showClass: {
          popup: 'animate__animated animate__fadeInDown animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp animate__faster'
        },
        icon: 'success',
        text: `${messageSaved}`, 
        showConfirmButton: false,
        timer: 1500
      })
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch( startSaveNote() )
  }

  const onFileInputChange = ({target}) => {
    if( target.files === 0 ) return;
    dispatch( startUploadingFiles( target.files ) )
  }

  const fileInputRef = useRef()

  const onDelete = () => {
    dispatch( startDeletingNote() )
  }

  return (
    <Grid
      container
      direction={'row'}
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography
          fontSize={28}
          fontWeight='light'
        >
          {dateString}
        </Typography>
      </Grid>
      <Grid item>

        <input
          type='file'
          multiple
          onChange={onFileInputChange}
          style={{ display:'none' }}
          ref={fileInputRef}
        />
        <Tooltip title='Añadir imágenes'>
          <IconButton
            color='primary'
            disabled={isSaving}
            onClick={() => fileInputRef.current.click()}
          >
            <UploadFileOutlined />
          </IconButton>
        </Tooltip>

        <Tooltip title='Guardar la nota'>
          <Button
            disabled={isSaving}
            onClick={ onSaveNote } 
            color='primary' 
            sx={{ padding: 1  }}
          >
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
          </Button>
        </Tooltip>
      </Grid>
      <Grid container>
        <TextField 
          type={'text'}
          variant='filled'
          fullWidth
          placeholder='Algo que hacer'
          label='Título'
          sx={{ border: 'none', mb: 1, height:'100%' }}
          name='title'
          value={title}
          onChange={onInputChange}
          multiline={true}
        />
        <TextField 
          type={'text'}
          variant='filled'
          fullWidth
          multiline={true}
          placeholder='Describe la nota.'
          rows={10}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent='start'>
        <Tooltip title='Eliminar nota'>
          <IconButton
            color='error'
            disabled={isSaving}
            onClick={ onDelete }
          >
            <DeleteForeverOutlined />
          </IconButton>
        </Tooltip>
      </Grid>

      <ImageGallery 
        images={ notaActiva.imagesUrls }
      />

    </Grid>
  )
}
