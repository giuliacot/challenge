import '@testing-library/jest-dom'
import React from 'react'
import { fakeTournaments, renderWithProviders } from '../../utils/test-utils'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { App } from '../App'
import userEvent from '@testing-library/user-event'
import { DEBOUNCE_TIMEOUT } from '../../constants/debounce'

describe('ActionBar component tests: ', () => {
  beforeEach(() => {
    window.confirm = jest.fn().mockImplementation(() => true)
  })

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
    await user.type(screen.getByTestId('searchTournamentInput'), 'Load')
    expect(await screen.findByText(/Loading tournament/i)).toBeInTheDocument()
  }, 9000)

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
    await user.type(screen.getByTestId('searchTournamentInput'), 'fake')
    await screen.findByText(/Loading tournament/i)
    waitForElementToBeRemoved(() => screen.queryByText(/Loading tournament/i))
    expect(await screen.findByText(/No tournaments found/i)).toBeInTheDocument()
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
    await user.type(screen.getByTestId('searchTournamentInput'), 'Err')
    expect(await screen.findByText(/Something went wrong/i)).toBeInTheDocument()
  }, 5000)

  test('given a click on the create tournament button, the app must a window prompt to insert the new tournament', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    window.prompt = jest.fn().mockImplementation(() => true)

    await user.click(screen.getByTestId('createTournamentBtn'))
    expect(window.prompt).toHaveBeenCalled()
  })

  test('given a click on the create tournament button and added a valid tournament name, the app must shown the new tournament', async () => {
    const user = userEvent.setup()

    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    window.prompt = jest.fn().mockImplementation(() => 'fake new tounrnament')

    await user.click(screen.getByTestId('createTournamentBtn'))

    expect(await screen.findByText('fake new tounrnament')).toBeInTheDocument()
  })

  test('given a click on the create tournament button and clicking a "Cancel", the app must do nothing', async () => {
    const user = userEvent.setup()

    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    window.prompt = jest.fn().mockImplementation(() => null)

    await user.click(screen.getByTestId('createTournamentBtn'))
    expect(await screen.findAllByText(/tournamentName/i)).toHaveLength(2)
  })
})
