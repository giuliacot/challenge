import '@testing-library/jest-dom'
import React from 'react'
import { fakeTournaments, renderWithProviders } from '../../utils/test-utils'
import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { App } from '../../App'

describe('ActionBar component tests: ', () => {
  test('given a search string, the app must show a loading state', async () => {
    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    // simulate onchange on input
    fireEvent.change(screen.getByTestId('searchTournament'), {
      target: { value: 'ab' },
    })

    waitForElementToBeRemoved(() => screen.queryByText(/tournamentName1/i))

    expect(await screen.findByText(/Loading tournament/i)).toBeInTheDocument()
  })

  test("given a search string, if the search doesn't had result, show empty state", async () => {
    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    // simulate onchange on search input
    fireEvent.change(screen.getByTestId('searchTournament'), {
      target: { value: 'fakeSearch' },
    })

    await screen.findByText(/Loading tournament/i)

    waitForElementToBeRemoved(() =>
      screen.queryByText(/Loading tournament/i)
    ).then(() => {
      console.log('Loading ended.')
    })

    expect(await screen.findByText(/No tournaments found/i)).toBeInTheDocument()
  })

  test('given an invalid search string, dispatch must not be called', async () => {
    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    // simulate onchange on search input
    fireEvent.change(screen.getByTestId('searchTournament'), {
      target: { value: '$|@' },
    })

    expect(screen.queryByText(/Loading tournament/i)).toBeNull()
  })

  test('given a search string, the app must show an error if fetching is failing', async () => {
    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    // simulate onchange on search input
    fireEvent.change(screen.getByTestId('searchTournament'), {
      target: { value: 'Error' },
    })

    expect(await screen.findByText(/Something went wrong/i)).toBeInTheDocument()
  })
})
