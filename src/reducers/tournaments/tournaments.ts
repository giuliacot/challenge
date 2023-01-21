/**
 * react toolkit way
 */
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// export const fetchTournaments = createAsyncThunk<
//   Tournament[],
//   undefined,
//   {
//     rejectValue: Error
//   }
// >('/tournaments', async (_, thunkApi) => {
//   const response = await fetch(API_TOURNAMENTS_URL)
//   try {
//     if (response.status >= 200 && response.status <= 299) {
//       return (await response.json()) as Tournament[]
//     }
//     if (response.status >= 400) {
//       return thunkApi.rejectWithValue(
//         new Error(`Error: ${response.body} with status: ${response.status}`)
//       )
//     }
//     return (await response.json()) as Tournament[]
//   } catch (error) {
//     return thunkApi.rejectWithValue(new Error(`Error: ${error}`))
//   }
// })

// export const tournamentsSlice = createSlice({
//   name: 'tournaments',
//   initialState,
//   reducers: { showAllTournaments(state) {} },
//   extraReducers: (builder) => {
//     builder.addCase(fetchTournaments.pending, (state, _) => {
//       state.status = 'loading'
//     })
//     builder.addCase(fetchTournaments.rejected, (state) => {
//       state.status = 'rejected'
//     })
//     builder.addCase(fetchTournaments.fulfilled, (state, action) => {
//       state.entities = action.payload.map((result: Tournament) => result)
//       state.status = 'idle'
//     })
//   },
// })

// export const { showAllTournaments } = tournamentsSlice.actions
// export const tournamentReducer = tournamentsSlice.reducer

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

export const tournamentsReducer = (
  state = initialState,
  action: TournamentsAction
) => {
  switch (action.type) {
    case 'tournaments/loading': {
      return state
    }
    case 'tournaments/loaded': {
      return { ...state, ...action.payload }
    }
    case 'tournaments/error': {
      return { ...state, ...action.payload }
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
    default:
      return state
  }
}

/**
 * Thunk functions
 */
export const fetchTournaments =
  (): ThunkAction<void, RootState, unknown, TournamentsAction> =>
  async (dispatch) => {
    const response = await fetch(API_TOURNAMENTS_URL)
    const result = await response.json()

    dispatch({
      type: 'tournaments/loading',
      payload: { entities: [], status: 'loading' },
    })

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
