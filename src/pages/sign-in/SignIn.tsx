import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Container, Content, Background } from './styles'

import logo from '../../assets/logo.svg'
import { Button, Input } from '../../shared/components'

const signInForm = z.object({
  email: z
    .string({ message: 'E-mail é obrigatório' })
    .email('Digite um email válido'),
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(6, 'Mínimo de 6 caracteres'),
})

export type SignInForm = z.infer<typeof signInForm>

export const SignIn: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  async function onSubmit(data: SignInForm) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="Pets" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Faça seu logon</h1>

          <Input
            name="email"
            label="Email"
            control={control}
            type="text"
            icon={FiMail}
            placeholder="Seu email"
          />

          <Input
            name="password"
            label="Password"
            control={control}
            icon={FiLock}
            type="password"
            placeholder="Digite sua senha"
          />

          <Button disabled={isSubmitting} type="submit">
            Entrar
          </Button>

          <a href="#">Esqueci minha senha</a>
        </form>

        <a href="#">
          <FiLogIn />
          Cadastre-se
        </a>
      </Content>

      <Background />
    </Container>
  )
}
