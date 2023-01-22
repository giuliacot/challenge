import '@testing-library/jest-dom'

import * as React from 'react'
import { screen } from '@testing-library/react'
import { Tournaments } from './Tournaments'
import { fakeTournaments, renderWithProviders } from '../../utils/test-utils'

describe('Tournaments component tests: ', () => {
  test('during the tournaments fetching, the app must render a loader', () => {
    renderWithProviders(<Tournaments />, {
      preloadedState: {
        tournaments: {
          entities: [],
          status: 'loading',
        },
      },
    })
    expect(screen.getByText(/Loading tournament/i)).toBeInTheDocument()
  })

  test('given an error while fetching tournaments, the app must render the error msg', () => {
    renderWithProviders(<Tournaments />, {
      preloadedState: {
        tournaments: {
          entities: [],
          status: 'rejected',
        },
      },
    })
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
  })

  test('given a succesfull tournaments fetching, the app must render each tournament', () => {
    renderWithProviders(<Tournaments />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    expect(screen.getAllByText(/tournamentName/i).length).toEqual(
      fakeTournaments.length
    )
  })

  test('given a succesfull tournaments fetching without results, the app must render an empty state', () => {
    renderWithProviders(<Tournaments />, {
      preloadedState: {
        tournaments: {
          entities: [],
          status: 'idle',
        },
      },
    })

    expect(screen.getByText(/No tournaments found/i)).toBeInTheDocument()
  })
})
