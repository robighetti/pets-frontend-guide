import { MouseEvent, useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

import { FaSearch } from 'react-icons/fa'
import { MdAdd } from 'react-icons/md'

import { Button, Input } from '../../shared/components'
import { HandlePet } from './handle-pets/HandlePet'

import './styles.css'
import { Container, Header, Content } from './styles'
import { api } from '../../shared/services/apiClient'

const searchForm = z.object({
  search: z.string({ message: 'E-mail é obrigatório' }),
})

type SearchForm = z.infer<typeof searchForm>

export type PetsProps = {
  id?: string
  name: string
  race: string
  age: number
}

export type ActionProps = {
  action: string
  id: string | undefined
}

export const Pets: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const [selectedRow, setSelectedRow] = useState<PetsProps>({} as PetsProps)
  const [rows, setRows] = useState<PetsProps[]>([])
  const [actions, setActions] = useState<ActionProps>({} as ActionProps)

  const [openModal, setOpenModal] = useState(false)

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleModal = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SearchForm>({
    resolver: zodResolver(searchForm),
  })

  const handleOnSearch = useCallback((_: SearchForm) => {
    alert('Pesquisar')
  }, [])

  const getAllPets = useCallback(async () => {
    const { data } = await api.get('/pets')

    setRows(data)
  }, [])

  const handleEdit = useCallback(() => {
    setActions({
      action: 'edit',
      id: selectedRow.id,
    })
    handleModal()
  }, [selectedRow.id, handleModal])

  const handleView = useCallback(() => {
    setActions({
      action: 'view',
      id: selectedRow.id,
    })
    handleModal()
  }, [selectedRow.id, handleModal])

  const handleNew = useCallback(() => {
    setActions({
      action: 'add',
      id: undefined,
    })
    handleModal()
  }, [handleModal])

  useEffect(() => {
    getAllPets()
  }, [getAllPets, openModal])

  return (
    <Container>
      {openModal && (
        <HandlePet
          open={openModal}
          handleClose={handleModal}
          action={actions}
        />
      )}
      <Header>
        <form onSubmit={handleSubmit(handleOnSearch)}>
          {/* <Input
            label="Consulta"
            placeholder="Faça sua pesquisa aqui"
            name="search"
            control={control}
          />

          <button type="submit" disabled={isSubmitting}>
            <FaSearch />
          </button> */}
        </form>

        <Button onClick={() => handleNew()}>
          <MdAdd />
          Novo
        </Button>
      </Header>

      <Content>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">Raça</TableCell>
                <TableCell align="right">Idade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">
                    <Box>
                      <IconButton
                        key={row.name}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(event) => {
                          handleOpenMenu(event)
                          setSelectedRow(row)
                        }}
                      >
                        <Icon>more_horiz</Icon>
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <MenuItem onClick={() => handleEdit()}>
                          <IconButton>
                            <Icon>edit</Icon>
                          </IconButton>
                          Editar
                        </MenuItem>
                        <MenuItem onClick={() => handleView()}>
                          <IconButton>
                            <Icon>visibility</Icon>
                          </IconButton>
                          Visualizar
                        </MenuItem>
                        <MenuItem onClick={() => alert('excluir')}>
                          <IconButton>
                            <Icon>delete</Icon>
                          </IconButton>
                          Excluir
                        </MenuItem>
                      </Menu>
                    </Box>
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.race}</TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Content>
    </Container>
  )
}
