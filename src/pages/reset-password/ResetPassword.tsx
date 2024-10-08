import { FiMail } from 'react-icons/fi'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Container, Content, Background } from './styles'

import logo from '../../assets/logo.svg'
import { Button, Input } from '../../shared/components'
import { FaArrowLeft } from 'react-icons/fa'
import { api } from '../../shared/services/apiClient'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from '../../shared/hooks/toast/Toast'

const resetPasswordForm = z.object({
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(6, 'Mínimo de 6 caracteres'),
  password_confirmation: z
    .string({ message: 'Senha é obrigatória' })
    .min(6, 'Mínimo de 6 caracteres'),
})

export type ResetPasswordForm = z.infer<typeof resetPasswordForm>

export const ResetPassword: React.FC = () => {
  const { addToast } = useToast()
  const navigate = useNavigate()
  const { token = '' } = useParams<'token'>()

  if (!token) {
    navigate('/')
  }

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordForm),
  })

  async function onSubmit({ password }: ResetPasswordForm) {
    try {
      await api.patch(`/reset-password/${token}`, { password })

      addToast({
        type: 'success',
        title: 'Senha alterada com sucesso!',
        description: 'Sua senha foi alterada, você retornará a tela de login',
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
        title: 'Senha não alterada',
        description:
          'Sua senha não foi alterada, entre em contato com o suporte',
      })
    }
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="Pets" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Resetar Senha</h1>

          <Input
            name="password"
            label="Nova Senha"
            control={control}
            type="password"
            icon={FiMail}
            placeholder="Digite sua nova senha"
          />

          <Input
            name="password_confirmation"
            label="Confirme sua Nova Senha"
            control={control}
            type="password"
            icon={FiMail}
            placeholder="Confirme sua nova senha"
          />

          <Button disabled={isSubmitting} type="submit">
            Resetar senha
          </Button>
        </form>

        <a href="#">
          <FaArrowLeft />
          Retornar para login
        </a>
      </Content>

      <Background />
    </Container>
  )
}
