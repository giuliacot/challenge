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

export interface TournamentsState {
  entities: Tournament[]
  status?: 'loading' | 'idle' | 'rejected'
}

export interface TournamentsAction {
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
  payload: TournamentsState
}
