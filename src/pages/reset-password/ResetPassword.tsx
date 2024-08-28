import { FiMail } from 'react-icons/fi'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Container, Content, Background } from './styles'

import logo from '../../assets/logo.svg'
import { Button, Input } from '../../shared/components'
import { FaArrowLeft } from 'react-icons/fa'

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
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordForm),
  })

  async function onSubmit(data: ResetPasswordForm) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="Pets" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Recuperar Senha</h1>

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
