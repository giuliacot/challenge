import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../common/hooks'
import { CardsGrid } from '../_layout/CardsGrid'
import { ErrorMsg } from '../ErrorMsg/ErrorMsg'
import { TournamentCard } from '../TournamentCard/TournamentCard'
import { MainContent } from '../_layout/MainContent'
import { fetchTournaments } from '../../actions/tournaments'

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
