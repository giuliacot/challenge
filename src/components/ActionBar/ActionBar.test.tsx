import '@testing-library/jest-dom'
import React from 'react'
import { fakeTournaments, renderWithProviders } from '../../utils/test-utils'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { App } from '../../App'
import userEvent from '@testing-library/user-event'
import { DEBOUNCE_TIMEOUT } from './ActionBar'

describe('ActionBar component tests: ', () => {
  test('given a search string, the app must show a loading state', async () => {
    const user = userEvent.setup({ delay: DEBOUNCE_TIMEOUT })
    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })
    await user.type(screen.getByTestId('searchTournament'), 'Load')
    expect(await screen.findByText(/Loading tournament/i)).toBeInTheDocument()
  }, 10000)

  test("given a search string, if the search doesn't had result, show empty state", async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    // simulate onchange on search input
    await user.type(screen.getByTestId('searchTournament'), 'fake')
    await screen.findByText(/Loading tournament/i)
    waitForElementToBeRemoved(() => screen.queryByText(/Loading tournament/i))
    expect(await screen.findByText(/No tournaments found/i)).toBeInTheDocument()
  })

  test('given an invalid search string, dispatch must not be called', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    await user.type(screen.getByTestId('searchTournament'), '$|@')
    expect(screen.queryByText(/Loading tournament/i)).toBeNull()
  })

  test('given a search string, the app must show an error if fetching is failing', async () => {
    const user = userEvent.setup({ delay: DEBOUNCE_TIMEOUT })
    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    // simulate onchange on search input
    await user.type(screen.getByTestId('searchTournament'), 'Err')
    expect(await screen.findByText(/Something went wrong/i)).toBeInTheDocument()
  }, 5000)
})
