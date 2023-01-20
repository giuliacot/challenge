import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import GlobalStyle from './GlobalStyle'
import { store } from './store'

import { Tournaments } from './components/Tournament/Tournaments'
import { ActionBar } from './components/ActionBar'
import Container from './components/layout/Container'
import H4 from './components/atoms/H4'

const App = () => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <ActionBar />
      <Tournaments />
    </Container>
  )
}

const container = document.getElementById('root')
if (!container) {
  throw new Error('No container found')
}
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
)
