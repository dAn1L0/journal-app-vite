import { DeleteForeverRounded } from '@mui/icons-material'
import { IconButton, ImageList, ImageListItem, ImageListItemBar, Tooltip } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteImage } from '../../helpers'
import { startDeletingImageOfNote } from '../../store/journal'

export const ImageGallery = ({images=[]}) => {

  const dispatch = useDispatch()
  
  const deleteImg = async(image) => {
    const resp = await deleteImage(image)
    if(!resp) throw new Error('Error al eliminar la imagen seleccionada')
    dispatch(startDeletingImageOfNote())
    localStorage.removeItem('imgToDelete')
  }

  return (
    <ImageList sx={{ width: '100%', height: 360 }} cols={4} rowHeight={150}>
      {images.map((image) => (
        <ImageListItem key={image} >
          <img
            src={`${image}?w=150&h=150&fit=crop&auto=format`}
            srcSet={`${image}?w=150&h=150&fit=crop&auto=format&dpr=2 2x`}
            alt='Imagen de la nota'
            loading="lazy"
          />
          <ImageListItemBar
            sx={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            }}
            position="top"
            actionIcon={
              <IconButton
                sx={{ color: 'white' }}
                onClick={()=> deleteImg(image)}
              >
                <Tooltip title='Borrar imagen de la nota'>
                  <DeleteForeverRounded />
                </Tooltip>
              </IconButton>
            }
            actionPosition="right"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
