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

export const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.primary_light};
  border-radius: 6px;
  padding: 8px;

  ${({ theme }) => css`
    background: ${theme.primary_light};
    border: 1px solid ${theme.primary};
    //alterar a cor para a cor do placeholder
    color: ${theme.light_gray};
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
