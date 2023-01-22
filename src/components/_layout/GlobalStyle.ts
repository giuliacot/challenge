import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'
import theme from '../../common/theme'

export const GlobalStyle = createGlobalStyle`
  ${normalize};

  body {
    font-family: 'Play';
    background: ${theme.palette.background.body};
    color: ${theme.palette.text.primary};
    ${theme.typography.body};
  }
`
