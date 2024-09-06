import { jwtDecode, JwtPayload } from 'jwt-decode'

import { OpenRoutes } from './OpenRoutes'
import { PrivateRoutes } from './PrivateRoutes'

import { useAuth } from '../shared/hooks/auth'
import { environments } from '../shared/environments'

export const AppRoutes: React.FC = () => {
  const { user, token } = useAuth()

  if (token) {
    const decoded = jwtDecode<JwtPayload>(token)

    if (user && decoded.exp && decoded.exp >= new Date().getTime() / 1000) {
      return <PrivateRoutes />
    }
    localStorage.removeItem(environments.APP_NAME)
  }

  return <OpenRoutes />
}
