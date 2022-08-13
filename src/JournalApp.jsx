import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme'

import moment from 'moment'
import 'moment/dist/locale/es'
moment.locale('es')

export const JournalApp = () => {

  return (
    <BrowserRouter>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </BrowserRouter>
  )
}
