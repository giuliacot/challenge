import React from 'react'
import { ActionBar } from './ActionBar/ActionBar'
import { H4 } from './_atoms/H4'
import { Container } from './_layout/Container'
import { Tournaments } from './Tournaments/Tournaments'

export const App = () => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <ActionBar />
      <Tournaments />
    </Container>
  )
}
