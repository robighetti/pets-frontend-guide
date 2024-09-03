import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'

import defaultTheme from './styles/themes/defaultTheme'
import GlobalStyles from './styles/global'

// import { AuthProvider } from './shared/hooks/auth'
// import { ToastProvider } from './shared/hooks/toast/Toast'
import { AppProvider } from './shared/hooks'
import { AppRoutes } from './routes'

/**
 * Fazer a explicação do AuthContext onde o contexto está sendo
 * compartilhado por toda a aplicação, ou seja, o nome pode ser acessado
 * em qualquer componente que esteja dentro do provider
 *
 * Fazer o exemplo no Login com o uso do useContext
 *
 * <AuthContext.Provider value={{ name: 'Rodrigo' }}>
 *  ... Componentes
 * </AuthContext.Provider>
 */

export const App: React.FC = () => {
  return (
    <>
      {/* <ToastProvider>
        <AuthProvider>
          <ThemeProvider theme={defaultTheme}>
            <GlobalStyles />

            <RouterProvider router={router} />
          </ThemeProvider>
        </AuthProvider>
      </ToastProvider> */}

      <AppProvider>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyles />

          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </AppProvider>
    </>
  )
}
