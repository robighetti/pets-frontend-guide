import logo from '../../../../assets/logo.svg'
import { FaHome } from 'react-icons/fa'
import { MdPets, MdLogout } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { Container, Header, Menu, MenuItem, Footer } from './styles'
import { useCallback } from 'react'

export const Aside: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path)
    },
    [navigate],
  )

  return (
    <Container>
      <Header>
        <img src={logo} alt="Pets" />
      </Header>
      <Menu>
        <MenuItem onClick={() => handleNavigation('/home')}>
          <FaHome />
          <span>Home</span>
        </MenuItem>

        <MenuItem onClick={() => handleNavigation('/pets')}>
          <MdPets /> <span>Pets</span>
        </MenuItem>
      </Menu>

      <Footer>
        <MdLogout />
        Sair
      </Footer>
    </Container>
  )
}
