import styled from 'styled-components'
import theme from '../../common/theme'

export const CardsGrid = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  margin: 0;
  padding: 0;
  grid-row-gap: ${theme.spacing(6)};
  grid-column-gap: ${theme.spacing(6)};

  @media all and (max-width: ${theme.breakpoints.m}) {
    grid-template-columns: 1fr 1fr;
  }

  @media all and (max-width: ${theme.breakpoints.s}) {
    grid-template-columns: 1fr;
  }
`
