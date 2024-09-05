import styled from 'styled-components'

export const Container = styled.div``

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 8px 8px 16px;

  form {
    width: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    input {
      width: 350px;
    }

    button {
      margin-top: 20px;
      margin-left: 8px;
      background: transparent;
      border: none;

      transition: all 0.3s;

      svg {
        font-size: 32px;
        color: ${({ theme }) => theme.primary};
      }

      &:hover {
        transform: scale(1.02);
      }
    }
  }
  > button {
    width: 120px;
    font-weight: 500;

    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      font-size: 20px;
    }
  }
`

export const Content = styled.div`
  margin: 8px;
`

export const ActionsButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background: transparent;
    border: 0;

    transition: all 0.3s;
    &:hover {
      transform: scale(1.1);
    }

    svg {
      font-size: 24px;
      color: ${({ theme }) => theme.primary};
    }
  }
`
