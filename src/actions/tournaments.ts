import { ThunkAction } from 'redux-thunk'
import { API_TOURNAMENTS_URL } from '../constants/api'
import { TournamentsAction } from '../reducers/tournaments/types'
import { RootState } from '../store'

export const fetchTournaments =
  (): ThunkAction<void, RootState, unknown, TournamentsAction> =>
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
