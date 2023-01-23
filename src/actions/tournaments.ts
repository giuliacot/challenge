import { ThunkAction } from 'redux-thunk'
import { API_TOURNAMENTS_URL } from '../constants/api'
import { Tournament, TournamentsAction } from '../reducers/types'
import { RootState } from '../store'

export const loadingTournaments: () => TournamentsAction = () => {
  return {
    type: 'tournaments/loading',
    payload: { entities: [], status: 'loading' },
  }
}

export const errorTournaments: () => TournamentsAction = () => {
  return {
    type: 'tournaments/error',
    payload: { entities: [], status: 'rejected' },
  }
}

const fetchTournamentsSuccess: (fetched: Tournament[]) => TournamentsAction = (
  fetched
) => {
  return {
    type: 'tournaments/fetch/success',
    payload: { entities: fetched, status: 'idle' },
  }
}

const searchedTournamentsSuccess: (
  searchedResult: Tournament[]
) => TournamentsAction = (searchedResult) => {
  return {
    type: 'tournament/searched/loaded',
    payload: { entities: searchedResult, status: 'idle' },
  }
}

export const fetchTournaments =
  (): ThunkAction<void, RootState, unknown, TournamentsAction> =>
  async (dispatch) => {
    const response = await fetch(API_TOURNAMENTS_URL)
    const tournamentsFetched = (await response.json()) as Tournament[]

    if (response.ok) {
      dispatch(fetchTournamentsSuccess(tournamentsFetched))
    } else {
      dispatch(errorTournaments())
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
    const searchedResult = (await response.json()) as Tournament[]

    if (response.ok) {
      dispatch(searchedTournamentsSuccess(searchedResult))
    } else {
      dispatch(errorTournaments())
    }
  }
