import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Container, Header, Content } from './styles'
import { Button, Input } from '../../shared/components'
import { useCallback } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MdAdd } from 'react-icons/md'

const searchForm = z.object({
  search: z.string({ message: 'E-mail é obrigatório' }),
})

type SearchForm = z.infer<typeof searchForm>

export const Pets: React.FC = () => {
  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 4, col1: 'MUI', col2: 'is Amazing' },
    { id: 5, col1: 'MUI', col2: 'is Amazing' },
    { id: 6, col1: 'MUI', col2: 'is Amazing' },
    { id: 7, col1: 'MUI', col2: 'is Amazing' },
    { id: 8, col1: 'MUI', col2: 'is Amazing' },
    { id: 9, col1: 'MUI', col2: 'is Amazing' },
    { id: 10, col1: 'MUI', col2: 'is Amazing' },
  ]

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ]

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SearchForm>({
    resolver: zodResolver(searchForm),
  })

  const handleOnSearch = useCallback((data: SearchForm) => {
    console.log(data)
  }, [])

  return (
    <Container>
      <Header>
        <form onSubmit={handleSubmit(handleOnSearch)}>
          <Input
            label="Consulta"
            placeholder="Faça sua pesquisa aqui"
            name="search"
            control={control}
          />

          <button type="submit" disabled={isSubmitting}>
            <FaSearch />
          </button>
        </form>

        <Button>
          <MdAdd />
          Novo
        </Button>
      </Header>

      <Content>
        <DataGrid rows={rows} columns={columns} />
      </Content>
    </Container>
  )
}
