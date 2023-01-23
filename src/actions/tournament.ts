import { ThunkAction } from 'redux-thunk'
import { API_TOURNAMENTS_URL } from '../constants/api'
import {
  Tournament,
  TournamentsAction,
  TournamentsState,
} from '../reducers/tournaments/types'
import { RootState } from '../store'
import { errorTournaments } from './tournaments'

export const editLocalTournament: (toEdit: Tournament) => TournamentsAction = (
  toEdit
) => {
  return {
    type: 'tournament/edit',
    payload: { entities: [toEdit], status: 'idle' },
  }
}

export const deleteTournamentAction: (
  state: TournamentsState
) => TournamentsAction = (state) => {
  return {
    type: 'tournament/delete/loaded',
    payload: {
      entities: state.entities,
    },
  }
}

export const editTournament: (edited: Tournament[]) => TournamentsAction = (
  edited
) => {
  return {
    type: 'tournament/edit/loaded',
    payload: { entities: edited, status: 'idle' },
  }
}

export const addTournament: (
  newTournament: Tournament,
  tournaments: Tournament[]
) => TournamentsAction = (newTournament, tournaments) => {
  return {
    type: 'tournament/creation',
    payload: { entities: [...tournaments, newTournament], status: 'idle' },
  }
}

export const createTournament =
  ({
    newTournament,
  }: {
    newTournament: string
  }): ThunkAction<void, RootState, null, TournamentsAction> =>
  async (dispatch, getState) => {
    const response = await fetch(`${API_TOURNAMENTS_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTournament }),
    })
    const result = await response.json()
    const { tournaments } = getState()

    if (response.ok) {
      dispatch(addTournament(result, tournaments.entities))
    } else {
      dispatch(errorTournaments())
    }
  }

export const deleteTournament =
  ({
    id,
  }: {
    id: string
  }): ThunkAction<void, RootState, null, TournamentsAction> =>
  async (dispatch, getState) => {
    const response = await fetch(`${API_TOURNAMENTS_URL}/${id}`, {
      method: 'DELETE',
    })
    await response.json()
    const { tournaments } = getState()

    if (response.ok) {
      dispatch(deleteTournamentAction(tournaments))
    } else {
      dispatch(errorTournaments())
    }
  }

export const patchTournament =
  ({
    id,
    editedName,
  }: {
    id: string
    editedName: string
  }): ThunkAction<void, RootState, null, TournamentsAction> =>
  async (dispatch, getState) => {
    const response = await fetch(`${API_TOURNAMENTS_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: editedName }),
    })
    await response.json()
    const { tournaments } = getState()

    // TODO: When confirming, the tournament name will be updated immediately using an optimistic update in the UI and a fetch call on the fake REST API. => if we have some error how to notify that to the user?
    // Not the best approach: we should create a popup msg to the user that the updates didn't work

    if (response.ok) {
      dispatch(editTournament(tournaments.entities))
    } else {
      dispatch(errorTournaments())
    }
  }
