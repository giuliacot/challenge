import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../_atoms/Button'
import { Input } from '../_atoms/Input'
import theme from '../../common/theme'

import { useDebouncedCallback } from 'use-debounce'
import { useAppDispatch, useAppSelector } from '../../common/hooks'

import { DEBOUNCE_TIMEOUT } from '../../constants/debounce'
import { searchTournaments } from '../../actions/tournaments'
import { createTournament } from '../../actions/tournament'
import { checkTournamentNameOnlyAllowedChars } from '../../utils/inputValidation'

const ActionBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing(4)};
`

export const ActionBar = () => {
  const [searched, setSearchTournament] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.tournaments)

  const debouncedSearch = useDebouncedCallback((value) => {
    setSearchTournament(value)
  }, DEBOUNCE_TIMEOUT)

  useEffect(() => {
    if (typeof searched === 'string') {
      dispatch({
        type: 'tournaments/loading',
        payload: { entities: [], status: 'loading' },
      })
      dispatch(searchTournaments({ searched }))
    }
  }, [searched, dispatch])

  const handleCreationTournament = () => {
    const newTournament = window.prompt('Tournament name:')

    if (
      newTournament &&
      checkTournamentNameOnlyAllowedChars.test(newTournament)
    ) {
      dispatch(createTournament({ newTournament }))
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
