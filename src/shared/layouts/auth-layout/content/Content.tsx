import { Container } from './styles'

type Props = {
  children: React.ReactNode
}

export const Content: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>
}
