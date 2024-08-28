import { FiMail, FiEdit } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import logo from '../../assets/logo.svg'
import { Button, Input } from '../../shared/components'
import { phoneFormat } from '../../shared/utils'

import { Container, Content, Background } from './styles'

const signUpForm = z.object({
  name: z.string({ message: 'Nome é obrigatório' }),
  email: z
    .string({ message: 'Email válido é obrigatório' })
    .email('Formato de email inválido'),
  whatsapp: z.string({ message: 'Whatsapp é obrigatório' }),
})

export type SignUpForm = z.infer<typeof signUpForm>

export const SignUp: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })

  async function onSubmit(data: SignUpForm) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
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

        <a href="#">
          <FaArrowLeft />
          Retornar para login
        </a>
      </Content>
    </Container>
  )
}
