import { TournamentsState, TournamentsAction } from './types'

const initialState: TournamentsState = {
  entities: [],
  status: 'loading',
}

const updatesTournamentName = (
  state: TournamentsState,
  id: string,
  name: string
) => {
  return state.entities.map((t) => (t.id === id ? { ...t, name } : t))
}

const removeTournament = (state: TournamentsState, id: string) => {
  return state.entities.filter((t) => t.id !== id)
}

export const tournamentsReducer = (
  state = initialState,
  action: TournamentsAction
) => {
  switch (action.type) {
    case 'tournaments/fetch/success': {
      return { ...state, ...action.payload }
    }
    case 'tournaments/loading': {
      return {
        entities: action.payload.entities,
        status: action.payload.status,
      }
    }
    case 'tournaments/error': {
      return { ...state, ...action.payload }
    }
    case 'tournament/edit': {
      // TODO: improve with only one tournament to load not the entire array
      const toUpdateId = action.payload.entities[0].id
      const editedName = action.payload.entities[0].name

      return {
        ...state,
        entities: updatesTournamentName(state, toUpdateId, editedName),
      }
    }
    case 'tournament/edit/loaded': {
      return { ...state, ...action.payload }
    }
    case 'tournament/delete': {
      const toDeleteId = action.payload.entities[0].id
      return {
        ...state,
        entities: removeTournament(state, toDeleteId),
      }
    }
    case 'tournament/delete/loaded': {
      return { ...state, ...action.payload }
    }
    case 'tournament/searched/loaded': {
      return {
        ...state,
        ...action.payload,
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
