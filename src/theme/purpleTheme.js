import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'


export const purpleTheme = createTheme({
  palette:{
    primary:{
      main: '#262254'
    },
    secondary:{
      main: '#543884'
    },
    error:{
      main: red.A400
    }
  },
  typography: {
    "fontFamily": `"Montserrat", "Helvetica", "Arial", sans-serif`,
    "fontSize": 16,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
}) 