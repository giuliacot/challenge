import React, { useMemo } from 'react'
import { fetchTournaments } from '../../reducers/tournaments/tournaments'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { CardsGrid } from '../layout/CardsGrid'
import { ErrorMsg } from '../ErrorMsg'
import { TournamentCard } from './TournamentCard'
import { MainContent } from '../layout/MainContent'

export const Tournaments = () => {
  const dispatch = useAppDispatch()
  const { entities, status } = useAppSelector((state) => state.tournaments)

  useMemo(() => {
    dispatch<any>(fetchTournaments())
  }, [dispatch])

  return (
    <>
      {status === 'loading' && (
        <MainContent>Loading tournaments ...</MainContent>
      )}
      {status === 'rejected' && <ErrorMsg />}
      {status === 'idle' && entities.length === 0 && (
        <div>No tournaments found</div>
      )}
      <CardsGrid>
        {status === 'idle' &&
          entities &&
          entities.map((tournament, i) => (
            <TournamentCard key={i} tournament={tournament} />
          ))}
      </CardsGrid>
    </>
  )
}
