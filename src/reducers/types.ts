export type Tournament = {
  id: string
  name?: string
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
  return (tournament as Tournament).id !== undefined
}

export interface TournamentsState {
  entities: Tournament[]
  status?: 'loading' | 'idle' | 'rejected'
}

export type TournamentActionType =
  | 'tournaments/fetch/success'
  | 'tournaments/error'
  | 'tournaments/loading'
  | 'tournament/edit'
  | 'tournament/edit/loaded'
  | 'tournament/delete'
  | 'tournament/delete/loaded'
  | 'tournament/searched/loaded'
  | 'tournament/creation'

export interface TournamentsAction {
  type: TournamentActionType
  payload: TournamentsState
}
