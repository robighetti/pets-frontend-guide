import { AuthProvider } from './auth'
import { ToastProvider } from './toast/Toast'

type Props = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: Props) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
)
