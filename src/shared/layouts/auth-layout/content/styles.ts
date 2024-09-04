import styled from 'styled-components'

export const Container = styled.div`
  grid-area: CT;

  background: ${({ theme }) => theme.white};
  border-top: 2px solid ${({ theme }) => theme.light_gray};
`
