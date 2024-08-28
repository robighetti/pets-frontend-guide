import styled, { css } from 'styled-components'
import { shade } from 'polished'

export const Container = styled.button`
  height: 56px;
  border-radius: 8px;
  border: 0;
  padding: 0 16px;
  width: 100%;

  ${({ theme }) => css`
    background: ${theme.primary};
    color: ${theme.white};
  `}

  margin-top: 16px;
  font-weight: 500;

  transition: background-color 0.2s;

  &:hover {
    ${({ theme }) => css`
      background: ${shade(0.2, theme.primary)};
    `}
  }
`
