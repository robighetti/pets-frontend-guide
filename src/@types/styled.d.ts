import 'styled-components'
import theme from '../styles/themes/defaultTheme'

type CustomTheme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
