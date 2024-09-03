import { Aside } from './aside/Aside'
import { MainHeader } from './main-header/MainHeader'
import { Content } from './content/Content'

import { GridContainer } from './styles'

type Props = {
  children: React.ReactNode
}

export const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <GridContainer>
      <Aside />
      <MainHeader />
      <Content>{children}</Content>
    </GridContainer>
  )
}
