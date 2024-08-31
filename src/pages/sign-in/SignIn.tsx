import { useCallback, useContext } from 'react'

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Container, Content, Background } from './styles'

import logo from '../../assets/logo.svg'
import { Button, Input } from '../../shared/components'

/**
 * Fazer a importação do useContext para explicar o uso da variavel
 * name que está vindo do contexto
 */

// import { AuthContext } from '../../shared/hooks/auth'
import { useAuth } from '../../shared/hooks/auth'
import { useToast } from '../../shared/hooks/toast/Toast'

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
  const { signIn } = useAuth()
  const { addToast } = useToast()
  // const { signIn } = useContext(AuthContext)

  // const auth = useContext(AuthContext)
  // mostrar o compartilhamento do estado
  // mostrar como fazer o armazenamento do usuario logado
  // console.log(auth)

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  const onSubmit = useCallback(
    async ({ email, password }: SignInForm) => {
      await signIn({ email, password })

      // console.log(data)
      // await new Promise((resolve) => setTimeout(resolve, 2000))
      addToast({
        type: 'success',
        title: 'Bem vindo ao Pets',
        description: 'Aproveite a aplicação !',
      })
    },
    [signIn, addToast],
  )

  // Substituido pela função useCallback
  // async function onSubmit(data: SignInForm) {
  //   console.log(data)
  //   await new Promise((resolve) => setTimeout(resolve, 2000))
  // }

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
