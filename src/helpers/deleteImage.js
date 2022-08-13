import {sha256} from 'js-sha256'


const generateSignature = (publicId, timestamp) => {
  const params = `public_id=${publicId}&timestamp=${timestamp}${import.meta.env.VITE_CLOUDINARY_API_SECRET}`
  return sha256.hex(params)
}

export const deleteImage = async(imageUrl) => {

  const segments = imageUrl.split('/')
  const imgId = segments[segments.length -1].split('.')[0]
    
  if( imageUrl.indexOf(imgId) >= 0 ) {

    const cloudUrl = import.meta.env.VITE_CLOUDINARY_URL_DESTROY
    const timestamp = Math.round((new Date()).getTime() / 1000)
    const formData = new FormData()

    const imgToDelete = {
      imageUrl,
      imgId
    }
    localStorage.setItem('imgToDelete', JSON.stringify(imgToDelete))
    
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY  )
    formData.append('public_id', 'journal/'+imgId )
    formData.append('timestamp', timestamp )
    formData.append('signature', generateSignature('journal/'+imgId, timestamp) )
    
    try {

      const resp = await fetch(cloudUrl,{
        method: 'POST',
        body: formData
      })
      
      if( !resp.ok ) throw new Error("No se pudo eliminar la imagen")
  
      return  resp.ok
      
    } catch (error) {
      console.log(error)
      throw new Error( error.message )
    }
  } 
  return false
}