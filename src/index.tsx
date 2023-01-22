import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from './components/App'
import { GlobalStyle } from './components/_layout/GlobalStyle'
import { store } from './store'

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
