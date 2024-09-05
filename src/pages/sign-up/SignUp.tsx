import { FiMail, FiEdit } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import logo from '../../assets/logo.svg'
import { Button, Input } from '../../shared/components'
import { phoneFormat } from '../../shared/utils'
import { useToast } from '../../shared/hooks/toast/Toast'

import { Container, Content, Background } from './styles'
import { useNavigate } from 'react-router-dom'
import { api } from '../../shared/services/apiClient'

const signUpForm = z.object({
  name: z.string({ message: 'Nome é obrigatório' }),
  email: z
    .string({ message: 'Email válido é obrigatório' })
    .email('Formato de email inválido'),
  whatsapp: z.string({ message: 'Whatsapp é obrigatório' }),
})

export type SignUpForm = z.infer<typeof signUpForm>

export const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const { addToast } = useToast()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })

  async function onSubmit(data: SignUpForm) {
    try {
      await api.post('/users', data)

      addToast({
        type: 'success',
        title: 'Cadastro Realizado',
        description:
          'Cadastro realizado com sucesso, você será direcionado para a tela de login !',
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
        title: 'Erro ao Cadastrar',
        description:
          'Não foi possível realizar o cadastro, procure nosso suporte!',
      })
    }
  }

  return (
    <Container>
      <Background />

      <Content>
        <img src={logo} alt="Pets" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Faça seu Cadastro</h1>

          <Input
            label="Nome"
            name="name"
            placeholder="Digite aqui seu nome"
            icon={FiEdit}
            control={control}
          />

          <Input
            label="E-mail"
            icon={FiMail}
            placeholder="Digite aqui seu e-mail"
            name="email"
            control={control}
          />

          <Input
            label="Whatsapp"
            icon={FaWhatsapp}
            placeholder="Digite aqui seu whatsapp"
            name="whatsapp"
            mask={phoneFormat}
            control={control}
            maxLength={15}
          />

          <Button disabled={isSubmitting} type="submit">
            Cadastrar
          </Button>
        </form>

        <a onClick={() => navigate('/sign-in')}>
          <FaArrowLeft />
          Retornar para login
        </a>
      </Content>
    </Container>
  )
}
