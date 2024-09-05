import { FiMail } from 'react-icons/fi'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Container, Content, Background } from './styles'

import logo from '../../assets/logo.svg'
import { Button, Input } from '../../shared/components'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { api } from '../../shared/services/apiClient'
import { useToast } from '../../shared/hooks/toast/Toast'

const forgotPasswordForm = z.object({
  email: z
    .string({ message: 'E-mail é obrigatório' })
    .email('Digite um email válido'),
})

export type ForgotPasswordForm = z.infer<typeof forgotPasswordForm>

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate()
  const { addToast } = useToast()

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordForm),
  })

  async function onSubmit(data: ForgotPasswordForm) {
    try {
      await api.post('/forgot-password', { email: data.email })

      addToast({
        type: 'success',
        title: 'Reset de senha enviado com sucesso',
        description: 'Verifique seu email pars resetar sua senha',
      })

      reset()

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(navigate('/sign-in'))
        }, 2000),
      )
    } catch (error) {
      console.error(error)

      addToast({
        type: 'error',
        title: 'Email não enviado',
        description: 'Email não enviado entre em contato com o suporte',
      })
    }
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="Pets" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Recuperar Senha</h1>

          <Input
            name="email"
            label="Email"
            control={control}
            type="text"
            icon={FiMail}
            placeholder="Digite seu email, enviaremos um link para reset"
          />

          <Button disabled={isSubmitting} type="submit">
            Enviar reset de senha
          </Button>
        </form>

        <a onClick={() => navigate('/sign-in')}>
          <FaArrowLeft />
          Retornar para login
        </a>
      </Content>

      <Background />
    </Container>
  )
}
