import styled, { css } from 'styled-components'

export const Container = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  font-size: 14px;
  font-weight: 500;

  & + label {
    margin-top: 8px;
  }
`

interface ContentProps {
  isFocused: boolean
  isFilled: boolean
}

export const Content = styled.div<ContentProps>`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.primary_light};
  border-radius: 6px;
  padding: 8px;

  ${({ theme, isFocused }) => css`
    background: ${theme.primary_light};
    border: 2px solid ${isFocused ? theme.primary : theme.primary_light};
    //alterar a cor para a cor do placeholder
    color: ${isFocused ? theme.primary : theme.light_gray};
  `}

  ${({ theme, isFilled }) =>
    isFilled &&
    css`
      color: ${theme.primary};
    `}

  input {
    flex: 1;

    color: ${({ theme }) => theme.text};

    padding: 8px;
    background: none;
    border: 0;

    &::placeholder {
      color: ${({ theme }) => theme.light_gray};
    }
  }
`
export const Error = styled.span`
  color: ${({ theme }) => theme.error_title};
  font-size: 12px;
  font-weight: 500;
`
