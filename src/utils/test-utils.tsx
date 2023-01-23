import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import type { AppStore, RootState } from '../store/index'
import { tournamentsReducer } from '../reducers/tournaments/tournaments'
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},

    store = configureStore({
      reducer: {
        tournaments: tournamentsReducer,
      },
      preloadedState,
    }),
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
