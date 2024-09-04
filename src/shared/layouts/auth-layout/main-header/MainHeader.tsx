import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { menuOptions, menuOptionsProps } from '../../../utils/menu'

import { Container } from './styles'

export const MainHeader: React.FC = () => {
  const { pathname } = useLocation()

  const title = useMemo(() => {
    let titleName: any
    menuOptions.forEach((item: menuOptionsProps) => {
      if (item.path === pathname) titleName = item.description
    })

    return titleName || 'Bem Vindo'
  }, [pathname])

  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  )
}
