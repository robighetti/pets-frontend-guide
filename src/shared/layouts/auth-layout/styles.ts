import styled from 'styled-components'

export const GridContainer = styled.div`
  display: grid;

  grid-template-columns: 250px auto;
  grid-template-rows: 90px auto;

  grid-template-areas:
    'AS MH'
    'AS CT';

  height: 100vh;
`
