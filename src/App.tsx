import { ThemeProvider } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'

import { SignIn } from './pages'
import defaultTheme from './styles/themes/defaultTheme'
import GlobalStyles from './styles/global'

import { AuthProvider } from './shared/hooks/auth'
import { ToastProvider } from './shared/hooks/toast/Toast'

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
      <ToastProvider>
        <AuthProvider>
          <ThemeProvider theme={defaultTheme}>
            <GlobalStyles />

            <SignIn />
          </ThemeProvider>
        </AuthProvider>
      </ToastProvider>
    </>
  )
}
