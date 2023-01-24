import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { DEBOUNCE_TIMEOUT } from '../../constants/debounce'
import { renderWithProviders, fakeTournaments } from '../../utils/test-utils'
import { screen } from '@testing-library/react'
import { App } from '../App'

describe('TournamentCard Component tests: ', () => {
  test('given a tournament, when the user clicks the "Edit" button, the app must show a window prompt', async () => {
    window.prompt = jest.fn().mockImplementation(() => null)
    window.confirm = jest.fn().mockImplementation(() => true)

    const user = userEvent.setup({ delay: DEBOUNCE_TIMEOUT })
    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    await user.click(
      screen.getByTestId(`editTournamentBtn-${fakeTournaments[0].id}`)
    )
    expect(window.prompt).toHaveBeenCalled()
  })

  test('given a tournament, when the user clicks the "Edit" button and types a valid new tournament name, the app must show the edited tournament name', async () => {
    window.prompt = jest.fn().mockImplementation(() => 'edited tournament name')
    window.confirm = jest.fn().mockImplementation(() => true)

    const user = userEvent.setup({ delay: DEBOUNCE_TIMEOUT })
    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    await user.click(
      screen.getByTestId(`editTournamentBtn-${fakeTournaments[0].id}`)
    )
    expect(
      await screen.findByText(/edited tournament name/i)
    ).toBeInTheDocument()
  })

  test('given a tournament, when the user clicks the "Delete", the app must show a window confirm and must remove the tournament from the view', async () => {
    window.confirm = jest.fn().mockImplementation(() => true)

    const user = userEvent.setup({ delay: DEBOUNCE_TIMEOUT })
    renderWithProviders(<App />, {
      preloadedState: {
        tournaments: {
          entities: fakeTournaments,
          status: 'idle',
        },
      },
    })

    await user.click(
      screen.getByTestId(`deleteTournamentBtn-${fakeTournaments[0].id}`)
    )

    const tournamentShown = await screen.findAllByText(/tournamentName/i)

    expect(tournamentShown.length).toEqual(1)
  })
})
