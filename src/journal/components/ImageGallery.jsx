import { DeleteForeverRounded } from '@mui/icons-material'
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
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
        <ImageListItem key={image}>
          <img
            src={`${image}?w=150&h=150&fit=crop&auto=format`}
            srcSet={`${image}?w=150&h=150&fit=crop&auto=format&dpr=2 2x`}
            alt='Imagen de la nota'
            loading="lazy"
          />
          <ImageListItemBar
            actionIcon={
              <IconButton
                size='small'
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                onClick={() => deleteImg(image)}
              >
                <DeleteForeverRounded />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
