import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

import { environments } from '../environments'
import { api } from '../services/apiClient'

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  user: object
  signIn(credentials: SignInCredentials): Promise<void>
  signOut: () => void
}

type AuthProviderData = {
  children: ReactNode
}

type AuthPayload = {
  token: string
  user: object
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC<AuthProviderData> = ({ children }) => {
  const [data, setData] = useState<AuthPayload>(() => {
    const payload = localStorage.getItem(environments.APP_NAME)
    if (payload) {
      return JSON.parse(payload)
    }

    return {} as AuthPayload
  }) // {} as AuthPayload

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const { data } = await api.post('/login', {
      email,
      password,
    })

    const payload = {
      token: data.token,
      user: data.user,
    }

    localStorage.setItem(environments.APP_NAME, JSON.stringify(payload))
    setData(payload)

    // console.log(data)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(environments.APP_NAME)
    setData({} as AuthPayload)
  }, [])
  return (
    <AuthContext.Provider value={{ signIn, user: data.user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Use Auth must be used within an AuthProvider')
  }

  return context
}

export { AuthContext, AuthProvider, useAuth }
