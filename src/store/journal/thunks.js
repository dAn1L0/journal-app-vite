import { arrayRemove, collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase'
import { deleteImage, fileUpload, loadNotes } from '../../helpers'
import { addNewEmptyNote, deleteImageUrlNotaActiva, deleteNoteById, savingNewNote, setActiveNote, setImagesUrlsNotaActiva, setNotes, setSaving, updateNote } from './JournalSlice'

export const startNewNote = () => {
  return async(dispatch, getState) => {

    dispatch( savingNewNote() )

    const { uid } = getState().auth

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imagesUrls: [],
    }

    const newDoc = doc( collection(FirebaseDB, `${uid}/journal/notes`) )
    await setDoc( newDoc, newNote )

    newNote.id = newDoc.id

    //! dispatches
    dispatch( addNewEmptyNote(newNote) )
    dispatch( setActiveNote( newNote ) )
  
  }
}


export const startLoadingNotes = () => {
  return async( dispatch, getState ) => {
    
    const { uid } = getState().auth
    if(!uid) throw new Error('El identificador del usuario no existe')

    const notas = await loadNotes(uid)
    dispatch(setNotes( notas ))
  }
}

export const startSaveNote = () => {
  return async(dispatch, getState) => {

    dispatch( setSaving() )
    
    const { uid } = getState().auth
    const { notaActiva } = getState().journal
    
    const noteToFirestore = {...notaActiva}
    delete noteToFirestore.id

    const docRef = doc(FirebaseDB,`${uid}/journal/notes/${notaActiva.id}`)
    await setDoc( docRef, noteToFirestore, { merge: true })

    noteToFirestore.id = notaActiva.id
    noteToFirestore.imagesUrls = [...notaActiva.imagesUrls ]

    dispatch( updateNote(noteToFirestore) )

  }
}

export const startUploadingFiles = ( imgs=[] ) => {
  return async(dispatch) => {

    dispatch( setSaving() )
    // dispatch( startSaveNote() )
    const fileUploadPromises = []

    for (const img of imgs) {
      fileUploadPromises.push( fileUpload(img) )
    }

    const imagesUrls = await Promise.all( fileUploadPromises )
    
    dispatch( setImagesUrlsNotaActiva(imagesUrls) )

    dispatch( startSaveNote() )

  }
}

export const startDeletingNote = () => {
  return async(dispatch, getState) => {

    dispatch( setSaving() )
    
    const { uid } = getState().auth
    const { notaActiva } = getState().journal

    const docRef = doc(FirebaseDB,`${uid}/journal/notes/${notaActiva.id}`)
    await deleteDoc(docRef)
    
    if ( notaActiva.imagesUrls.length > 0 ) {

      const deletePromises = []

      for (const img of notaActiva.imagesUrls) {
        deletePromises.push( deleteImage(img) )
        localStorage.removeItem('imgToDelete')
      }

      await Promise.all( deletePromises )
    }


    dispatch( deleteNoteById(notaActiva.id) )

  }
}

export const startDeletingImageOfNote = () => {
  return async(dispatch, getState) => {

    dispatch( setSaving() )
    
    const { uid } = getState().auth
    const { notaActiva } = getState().journal
    const { imageUrl, imgId } = JSON.parse(localStorage.getItem('imgToDelete'))

    const docRef = doc(FirebaseDB,`${uid}/journal/notes/${notaActiva.id}`)
    
    await updateDoc(docRef, {
      imagesUrls: arrayRemove(imageUrl)
    });
    
    dispatch( deleteImageUrlNotaActiva(imgId) )
    dispatch( startSaveNote() )
  }
}

