import { useCallback } from 'react'
import {
  useLocation,
  useMatch,
  useNavigate,
  useResolvedPath,
} from 'react-router-dom'
// import { FaHome } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

import { useAuth } from '../../../hooks/auth'

import logo from '../../../../assets/logo.svg'

import { menuOptions, menuOptionsProps } from '../../../utils/menu'

import { Container, Header, Menu, MenuItem, Footer } from './styles'

export const Aside: React.FC = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const { pathname } = useLocation()
  const resolvedPath = useResolvedPath(pathname)

  const match = useMatch({
    path: resolvedPath.pathname,
    end: false,
  })

  console.log(match)

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
        {menuOptions.map((item: menuOptionsProps) => (
          <MenuItem key={item.path} onClick={() => handleNavigation(item.path)}>
            {item.icon}
            <span>{item.title}</span>
          </MenuItem>
        ))}
        {/* <MenuItem onClick={() => handleNavigation('/home')}>
          <FaHome />
          <span>Home</span>
        </MenuItem>

        <MenuItem onClick={() => handleNavigation('/pets')}>
          <MdPets /> <span>Pets</span>
        </MenuItem> */}
      </Menu>

      <Footer onClick={() => signOut()}>
        <MdLogout />
        Sair
      </Footer>
    </Container>
  )
}
