import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'

export interface menuOptionsProps {
  title: string
  description: string
  path: string
  icon: any
}

export const menuOptions = [
  {
    title: 'Home',
    description: 'Sua página principal',
    path: '/home',
    icon: <FaIcons.FaHome />,
  },
  {
    title: 'Pets',
    description: 'Controle dos Pets',
    path: '/pets',
    icon: <MdIcons.MdPets />,
  },
] as menuOptionsProps[]
