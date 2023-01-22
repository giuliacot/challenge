import styled from 'styled-components'
import theme from '../../common/theme'

export const Container = styled.div`
  max-width: 960px;
  margin-top: ${theme.spacing(6)};
  margin-left: auto;
  margin-right: auto;

  @media all and (max-width: ${theme.breakpoints.l}) {
    margin-left: ${theme.spacing(4)};
    margin-right: ${theme.spacing(4)};
  }
`
