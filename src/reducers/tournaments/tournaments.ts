import { ThunkAction } from 'redux-thunk'
import { API_TOURNAMENTS_URL } from '../../constants/api'
import { RootState } from '../../store'

export type Tournament = {
  id: string
  name: string
  organizer?: string
  game?: string
  participants?: {
    current: number
    max: number
  }
  startDate?: string
}

export function isTournament(
  tournament: Tournament | {}
): tournament is Tournament {
  return (
    (tournament as Tournament).id !== undefined &&
    (tournament as Tournament).name !== undefined
  )
}

interface InitialState {
  entities: Tournament[]
  status?: 'loading' | 'idle' | 'rejected'
}

const initialState: InitialState = {
  entities: [],
  status: 'loading',
}

interface TournamentsAction {
  type:
    | 'tournaments/loaded'
    | 'tournaments/error'
    | 'tournaments/loading'
    | 'tournament/edit'
    | 'tournament/edit/loaded'
    | 'tournament/delete'
    | 'tournament/delete/loaded'
    | 'tournament/searched/loaded'
    | 'tournament/creation'
  payload: InitialState
}

const updatesTournamentName = (
  state: InitialState,
  id: string,
  name: string
) => {
  return state.entities.map((t) => {
    if (t.id === id) {
      return { ...t, name }
    }
    return t
  })
}

export const checkTournamentNameOnlyAllowedChars = new RegExp(/[a-zA-Z0-9\s]+$/)

const removeTournament = (state: InitialState, id: string) => {
  return state.entities.filter((t) => t.id !== id)
}

export const tournamentsReducer = (
  state = initialState,
  action: TournamentsAction
) => {
  switch (action.type) {
    case 'tournaments/loading': {
      console.log(3)
      return {
        entities: action.payload.entities,
        status: action.payload.status,
      }
    }
    case 'tournaments/loaded': {
      return { ...action.payload }
    }
    case 'tournaments/error': {
      return { ...action.payload }
    }
    case 'tournament/edit': {
      const toUpdateId = action.payload.entities[0].id
      const editedName = action.payload.entities[0].name

      const updatedTournament = updatesTournamentName(
        state,
        toUpdateId,
        editedName
      )
      return { ...state, entities: updatedTournament }
    }
    case 'tournament/edit/loaded': {
      return { ...action.payload }
    }
    case 'tournament/delete': {
      const toDeleteId = action.payload.entities[0].id
      return {
        ...state,
        entities: removeTournament(state, toDeleteId),
      }
    }
    case 'tournament/delete/loaded': {
      return { ...action.payload }
    }
    case 'tournament/searched/loaded': {
      console.log(4)
      return {
        ...state,
        entities: action.payload.entities,
        status: action.payload.status,
      }
    }

    case 'tournament/creation': {
      return {
        ...state,
        entities: action.payload.entities,
        status: action.payload.status,
      }
    }
    default:
      return state
  }
}

/**
 * Thunk functions
 */

export const fetchTournaments =
  (): ThunkAction<void, InitialState, unknown, TournamentsAction> =>
  async (dispatch) => {
    const response = await fetch(API_TOURNAMENTS_URL)
    const result = await response.json()

    if (response.status >= 200 && response.status <= 299) {
      dispatch({
        type: 'tournaments/loaded',
        payload: { entities: result, status: 'idle' },
      })
    }
    if (response.status >= 400 && response.status <= 599) {
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

export const searchTournaments =
  ({
    searched,
  }: {
    searched: string
  }): ThunkAction<void, RootState, null, TournamentsAction> =>
  async (dispatch) => {
    const response = await fetch(`${API_TOURNAMENTS_URL}?q=${searched}`)
    const searchResult = await response.json()

    if (response.status >= 200 && response.status <= 299) {
      dispatch({
        type: 'tournament/searched/loaded',
        payload: { entities: searchResult, status: 'idle' },
      })
    } else {
      dispatch({
        type: 'tournaments/error',
        payload: { entities: [], status: 'rejected' },
      })
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
