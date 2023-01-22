import React from 'react'
import { ActionBar } from './components/ActionBar/ActionBar'
import { H4 } from './components/_atoms/H4'
import { Container } from './components/_layout/Container'
import { Tournaments } from './components/Tournaments/Tournaments'

export const App = () => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <ActionBar />
      <Tournaments />
    </Container>
  )
}
