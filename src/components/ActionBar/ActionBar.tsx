import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import theme from '../../theme'
import Button from '../atoms/Button'
import Input from '../atoms/Input'

import { useDebouncedCallback } from 'use-debounce'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  checkTournamentNameOnlyAllowedChars,
  createTournament,
  searchTournaments,
} from '../../reducers/tournaments/tournaments'

const ActionBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing(4)};
`
export const DEBOUNCE_TIMEOUT = 800

export const ActionBar = () => {
  const [searched, setSearchTournament] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.tournaments)

  const debouncedSearch = useDebouncedCallback((value) => {
    setSearchTournament(value)
  }, DEBOUNCE_TIMEOUT)

  useEffect(() => {
    if (
      typeof searched === 'string' &&
      checkTournamentNameOnlyAllowedChars.test(searched)
    ) {
      dispatch({
        type: 'tournaments/loading',
        payload: { entities: [], status: 'loading' },
      })
      dispatch<any>(searchTournaments({ searched }))
    }
  }, [searched, dispatch])

  const handleCreationTournament = () => {
    const newTournament = window.prompt('Tournament name:')

    if (
      newTournament &&
      checkTournamentNameOnlyAllowedChars.test(newTournament)
    ) {
      dispatch<any>(createTournament({ newTournament }))
    }
  }

  return (
    <ActionBarWrapper>
      <Input
        data-testid="searchTournament"
        placeholder={'Search tournament...'}
        type="text"
        onChange={(e) => debouncedSearch(e.target.value)}
        disabled={status === 'loading'}
      />
      <Button onClick={() => handleCreationTournament()}>
        Create Tournament
      </Button>
    </ActionBarWrapper>
  )
}
