import styled from 'styled-components'

export const Container = styled.div``

export const Form = styled.form`
  h1 {
    margin-bottom: 16px;
  }

  form {
    & + input {
      margin-bottom: 4px;
    }
  }
`
