import React, { useMemo } from 'react'
import { fetchTournaments } from '../../reducers/tournaments/tournaments'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { CardsGrid } from '../_layout/CardsGrid'
import { ErrorMsg } from '../ErrorMsg/ErrorMsg'
import { TournamentCard } from './TournamentCard'
import { MainContent } from '../_layout/MainContent'

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
        <MainContent>No tournaments found</MainContent>
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
