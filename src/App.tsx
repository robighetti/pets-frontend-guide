import { ThemeProvider } from 'styled-components'

import { SignIn } from './pages'
import defaultTheme from './styles/themes/defaultTheme'
import GlobalStyles from './styles/global'

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <SignIn />
    </ThemeProvider>
  )
}
