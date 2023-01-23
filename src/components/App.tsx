import React from 'react'
import { H4 } from './_atoms/H4'
import { ActionBar } from './ActionBar/ActionBar'
import { Container } from './_layout/Container'
import { Tournaments } from './Tournaments/Tournaments'
import styled from 'styled-components'
import { slideLeft, slideRight } from '../common/animation'
import theme from '../common/theme'

const TitleRight = styled(H4)`
  display: inline-block;
  animation: ${slideLeft} 1s cubic-bezier(0.6, -0.28, 0.735, 0.045) both;
`
const TitleLeft = styled(H4)`
  display: inline-block;
  animation: ${slideRight} 1s cubic-bezier(0.6, -0.28, 0.735, 0.045) both;
  margin-left: ${theme.spacing(2)};
`

export const App = () => {
  return (
    <Container>
      <TitleRight>FACEIT</TitleRight>
      <TitleLeft>Tournaments</TitleLeft>
      <ActionBar />
      <Tournaments />
    </Container>
  )
}
