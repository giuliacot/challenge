import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import theme from '../theme'
import Button from './atoms/Button'
import Input from './atoms/Input'

import { useDebouncedCallback } from 'use-debounce'
import { useAppDispatch, useAppSelector } from '../hooks'
import { searchTournaments } from '../reducers/tournaments/tournaments'

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
  }, 300)

  useEffect(() => {
    if (typeof searched === 'string') {
      dispatch({
        type: 'tournaments/loading',
        payload: { entities: [], status: 'loading' },
      })
      dispatch<any>(searchTournaments({ searched }))
    }
  }, [searched, dispatch])

  return (
    <ActionBarWrapper>
      <Input
        placeholder={'Search tournament...'}
        type="text"
        onChange={(e) => debouncedSearch(e.target.value)}
        disabled={status === 'loading'}
      />
      <Button>Create Tournament</Button>
    </ActionBarWrapper>
  )
}
