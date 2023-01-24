import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { createStore, applyMiddleware, PreloadedState } from 'redux'
import { Provider } from 'react-redux'

import type { AppStore, RootState } from '../store/index'
import { rootReducer } from '../reducers'
import thunk from 'redux-thunk'
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},

    store = createStore(rootReducer, preloadedState, applyMiddleware(thunk)),

    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

/**
 * Fake Tournaments - test util
 */

export const fakeTournaments = [
  {
    id: 'tournament1',
    name: 'tournamentName1',
    game: 'tournamentGame1',
  },
  {
    id: 'tournament2',
    name: 'tournamentName2',
    game: 'tournamentGame2',
  },
]

export const fakeTournament = (name: string) => {
  return {
    id: 'tournament0',
    name,
    game: 'tournamentGame0',
  }
}
