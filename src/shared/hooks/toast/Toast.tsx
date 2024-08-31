import { createContext, useCallback, useContext, ReactNode, FC } from 'react'
import { v4 as uuid } from 'uuid'
import {
  FiXCircle,
  FiCheckCircle,
  FiAlertTriangle,
  FiInfo,
} from 'react-icons/fi'

import { toast, ToastContainer } from 'react-toastify'

import { Container } from './styles'

import './styles.css'

interface IProps {
  children: ReactNode
}

interface IMessage {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
}

interface IToastContextProps {
  addToast(message: IMessage): void
}

const ToastContext = createContext<IToastContextProps>({} as IToastContextProps)

const ToastProvider: FC<IProps> = ({ children }) => {
  const addToast = useCallback((message: IMessage) => {
    const { type, title, description } = message

    const Message = () => (
      <Container>
        <strong>{title}</strong>
        {description && <span>{description}</span>}
      </Container>
    )

    const icons = {
      error: <FiXCircle color="#c53030" />,
      success: <FiCheckCircle color="#2e656a" />,
      warning: <FiAlertTriangle color="#FFD700" />,
      info: <FiInfo color="#3172b7" />,
    }

    toast[type](<Message />, {
      toastId: uuid(),
      icon: icons[type],
      position: 'top-right',
    })
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer autoClose={3000} />
    </ToastContext.Provider>
  )
}

function useToast(): IToastContextProps {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export { ToastProvider, useToast }
