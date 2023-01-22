import { ThunkAction } from 'redux-thunk'
import { API_TOURNAMENTS_URL } from '../constants/api'
import { TournamentsAction } from '../reducers/tournaments/types'
import { RootState } from '../store'

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

    if (response.status >= 200 && response.status <= 299) {
      dispatch({
        type: 'tournament/creation',
        payload: {
          entities: [...tournaments.entities, result],
          status: 'idle',
        },
      })
    } else {
      dispatch({
        type: 'tournaments/error',
        payload: { entities: [], status: 'rejected' },
      })
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

    if (response.status >= 200 && response.status <= 299) {
      dispatch({
        type: 'tournament/delete/loaded',
        payload: {
          entities: tournaments.entities,
          status: tournaments.status,
        },
      })
    } else {
      dispatch({
        type: 'tournaments/error',
        payload: { entities: [], status: 'rejected' },
      })
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
    const state = getState()

    // TODO: When confirming, the tournament name will be updated immediately using an optimistic update in the UI and a fetch call on the fake REST API. => if we have some error how to notify that to the user?
    // Not the best approach: we should create a popup msg to the user that the updates didn't work

    if (response.status >= 200 && response.status <= 299) {
      dispatch({
        type: 'tournament/edit/loaded',
        payload: { entities: state.tournaments.entities, status: 'idle' },
      })
    } else {
      dispatch({
        type: 'tournaments/error',
        payload: { entities: [], status: 'rejected' },
      })
    }
  }
