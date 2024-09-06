import { useCallback, useEffect, useState } from 'react'
import { Box, Modal } from '@mui/material'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Input } from '../../../shared/components'

import { Container, Form } from './styles'
import { api } from '../../../shared/services/apiClient'
import { useToast } from '../../../shared/hooks/toast/Toast'

import { ActionProps, PetsProps } from '../Pets'

type Props = {
  open: boolean
  handleClose: () => void
  action: ActionProps
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

export const HandlePet: React.FC<Props> = ({ open, handleClose, action }) => {
  const { addToast } = useToast()
  const [pet, setPet] = useState<PetsProps>({} as PetsProps)

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<PetsForm>({
    resolver: zodResolver(petsForm),
    defaultValues: pet,
  })

  const handleOnSubmit = useCallback(
    async (data: PetsForm) => {
      try {
        if (action.action === 'edit') {
          // alteração
          Object.assign(data, { id: action.id })
          await api.put(`/pets/${action.id}`, data)

          addToast({
            type: 'success',
            title: 'Pet alterado com sucesso !',
          })
        } else if (action.action === 'add') {
          // inclusao
          await api.post('/pets', data)

          addToast({
            type: 'success',
            title: 'Pet adicionado com sucesso !',
          })
        }

        reset()
        handleClose()
      } catch (error) {
        console.error(error)
      }
    },
    [reset, handleClose, addToast, action.action, action.id],
  )

  const getOnePet = useCallback(async () => {
    const { data } = await api.get(`/pets/${action.id}`)
    setPet(data)
  }, [action.id])

  useEffect(() => {
    if (action.id) getOnePet()
  }, [getOnePet, action.id])

  return (
    <Container>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Form onSubmit={handleSubmit(handleOnSubmit)}>
            <h1>
              {action.action === 'add' ? 'Novo Cadastro' : 'Detalhes do pet'}
            </h1>

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
