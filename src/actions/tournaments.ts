import { ThunkAction } from 'redux-thunk'
import { API_TOURNAMENTS_URL } from '../constants/api'
import { TournamentsAction } from '../reducers/tournaments/types'
import { RootState } from '../store'

export const loadingTournaments: () => TournamentsAction = () => {
  return {
    type: 'tournaments/loading',
    payload: { entities: [], status: 'loading' },
  }
}

export const errorTournament: () => TournamentsAction = () => {
  return {
    type: 'tournaments/error',
    payload: { entities: [], status: 'rejected' },
  }
}

export const fetchTournaments =
  (): ThunkAction<void, RootState, unknown, TournamentsAction> =>
  async (dispatch) => {
    const response = await fetch(API_TOURNAMENTS_URL)
    const result = await response.json()

    if (response.ok) {
      dispatch({
        type: 'tournaments/fetch/success',
        payload: { entities: result, status: 'idle' },
      })
    } else {
      dispatch(errorTournament())
    }
  }

export const searchTournaments =
  ({
    searched,
  }: {
    searched: string
  }): ThunkAction<void, RootState, null, TournamentsAction> =>
  async (dispatch) => {
    dispatch(loadingTournaments())
    const response = await fetch(`${API_TOURNAMENTS_URL}?q=${searched}`)
    const searchResult = await response.json()
    if (response.ok) {
      dispatch({
        type: 'tournament/searched/loaded',
        payload: { entities: searchResult, status: 'idle' },
      })
    } else {
      dispatch(errorTournament())
    }
  }
