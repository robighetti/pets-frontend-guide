import styled from 'styled-components'

export const Container = styled.aside`
  grid-area: AS;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-right: 2px solid ${({ theme }) => theme.light_gray};
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 8px 0;

  img {
    width: 70px;
  }
`

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;

  height: 100%;

  margin-top: 16px;
`

export const MenuItem = styled.li`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.primary};

  padding: 16px;
  cursor: pointer;

  svg {
    font-size: 24px;
    margin-right: 8px;
  }

  span {
    font-size: 18px;
    font-weight: 500;
  }

  transition: all 0.3s;

  &:hover {
    color: ${({ theme }) => theme.secondary};
    transform: scale(1.02);
  }
`

export const Footer = styled.button`
  margin: 0 auto;

  display: flex;
  align-items: center;

  padding: 16px;
  border: none;
  font-size: 24px;
  font-weight: 500;
  background: transparent;
  color: ${({ theme }) => theme.primary};

  transition: all 0.3s;

  &:hover {
    color: ${({ theme }) => theme.secondary};
    transform: scale(1.02);
  }

  svg {
    margin-right: 8px;
  }
`
