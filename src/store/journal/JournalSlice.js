import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    notaActiva: null,
    // notaActiva: {
    //   id: 'ABC123',
    //   title: '',
    //   body: '',
    //   date: 92819281982,
    //   imagesUrls: [],
    // }
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push( action.payload )
      state.isSaving = false
      state.imagesUrls = []
    },
    setActiveNote: (state, action) => {
      state.notaActiva = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action) => {
      state.notes = action.payload 
    },
    setSaving: (state) => {
      state.isSaving = true
      state.messageSaved = ''
    },
    updateNote: (state, action) => {
      state.isSaving = false
      state.notes = state.notes.map( note => note.id === action.payload.id ? action.payload : note)
      state.messageSaved = `${action.payload.title}`
    },
    deleteNoteById: (state, action) => {
      state.isSaving = false
      state.notes = state.notes.filter( note => note.id !== action.payload )
      state.notaActiva = null
    },
    setImagesUrlsNotaActiva: (state,action) => {
      state.notaActiva.imagesUrls = [...state.notaActiva.imagesUrls, ...action.payload ]
      state.isSaving = false
    },
    deleteImageUrlNotaActiva: (state,action) => {
      state.notaActiva.imagesUrls = state.notaActiva.imagesUrls.filter( img => img.indexOf(action.payload) === -1)
      state.isSaving = false
    },
    logoutJournal: (state) => {
      state.isSaving= false
      state.messageSaved= ''
      state.notes= []
      state.notaActiva= null
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setImagesUrlsNotaActiva,
  deleteNoteById,
  logoutJournal,
  deleteImageUrlNotaActiva,
} = journalSlice.actions