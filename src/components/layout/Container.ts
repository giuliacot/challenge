import styled from 'styled-components'
import theme from '../../theme'

const Container = styled.div`
  max-width: 960px;
  margin-top: ${theme.spacing(6)};
  margin-left: auto;
  margin-right: auto;

  @media all and (max-width: ${theme.breakpoints.s}) {
    margin-left: ${theme.spacing(4)};
    margin-right: ${theme.spacing(4)};
  }
`

export default Container
