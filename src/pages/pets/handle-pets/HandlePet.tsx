import { useCallback, useEffect } from 'react'
import { Box, Modal } from '@mui/material'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Input } from '../../../shared/components'

import { Container, Form } from './styles'
import { api } from '../../../shared/services/apiClient'

type Props = {
  open: boolean
  handleClose: () => void
  petId?: string
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '1px solid #333',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
}

const petsForm = z.object({
  name: z.string({ message: 'Nome do pet é obrigatório' }),
  race: z.string({ message: 'A raça é obrigatória' }),
  age: z.coerce.number({ message: 'O numero é obrigatório' }),
})

type PetsForm = z.infer<typeof petsForm>

export const HandlePet: React.FC<Props> = ({ open, handleClose, petId }) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<PetsForm>({
    resolver: zodResolver(petsForm),
  })

  const handleOnSubmit = useCallback(
    async (data: PetsForm) => {
      console.log(data)
      if (petId) {
        // alteração
      } else {
        // inclusao
        const result = await api.post('/pets', data)

        console.log(result)
      }
    },
    [petId],
  )

  const getOnePet = useCallback(async () => {
    const result = await api.get(`/pets/${petId}`)

    console.log(result)
  }, [petId])

  useEffect(() => {
    if (petId) getOnePet()
  }, [getOnePet, petId])

  return (
    <Container>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Form onSubmit={handleSubmit(handleOnSubmit)}>
            <h1>Novo Cadastro</h1>

            <Input
              name="name"
              label="Nome do pet"
              placeholder="Qual o nome do pet"
              control={control}
            />

            <Input
              name="race"
              label="Raça do pet"
              placeholder="Qual a raça do pet"
              control={control}
            />

            <Input
              name="age"
              label="Idade do pet"
              placeholder="Qual a idade do pet"
              control={control}
              type="number"
            />

            <Button disabled={isSubmitting} type="submit">
              Salvar
            </Button>
          </Form>
        </Box>
      </Modal>
    </Container>
  )
}
