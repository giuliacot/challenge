import styled from 'styled-components'
import theme from '../../theme'

export const Card = styled.li`
  background: ${theme.palette.background.alt1};
  padding: ${theme.spacing(2)};
  border: none;
  border-radius: ${theme.borderRadius};
  color: ${theme.palette.text.primary};
  list-style-type: none;
`
