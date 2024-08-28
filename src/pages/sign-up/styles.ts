import styled, { css } from 'styled-components'

import { shade } from 'polished'

import signUpBackground from '../../assets/background-signUp.png'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
  //faz com que os itens que estejam dentro desse
  //container vao ter o tamanho total do container
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  img {
    width: 100px;
  }

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: ${({ theme }) => theme.text};
      margin-top: 24px;
      display: block;
      text-decoration: none;

      transition: color 0.2s;

      &:hover {
        ${({ theme }) => css`
          color: ${shade(0.2, theme.content)};
        `}
      }
    }
  }

  > a {
    color: ${({ theme }) => theme.primary};
    margin-top: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
    }

    transition: color 0.2s;

    &:hover {
      ${({ theme }) => css`
        color: ${shade(0.2, theme.primary)};
      `}
    }
  }
`

export const Background = styled.div`
  flex: 1;

  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`
