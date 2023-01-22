import React from 'react'
import styled from 'styled-components'
import { fetchTournaments } from '../../actions/tournaments'
import { useAppDispatch } from '../../common/hooks'
import { Button } from '../_atoms/Button'
import { MainContent } from '../_layout/MainContent'

const ErrorMsgWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ErrorMsg = () => {
  const dispatch = useAppDispatch()

  function handleRetry() {
    dispatch<any>(fetchTournaments())
  }

  return (
    <ErrorMsgWrapper>
      <MainContent>Something went wrong</MainContent>
      <Button onClick={handleRetry}>Retry</Button>
    </ErrorMsgWrapper>
  )
}
