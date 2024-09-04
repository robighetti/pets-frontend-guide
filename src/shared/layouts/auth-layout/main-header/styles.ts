import styled from 'styled-components'

export const Container = styled.header`
  grid-area: MH;

  background: ${({ theme }) => theme.background};

  h1 {
    margin-top: 28px;
    margin-left: 8px;

    font-size: 24px;
  }
`
