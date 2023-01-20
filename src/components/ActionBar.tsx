import React from 'react'
import styled from 'styled-components'
import theme from '../theme'
import Button from './atoms/Button'
import Input from './atoms/Input'

const ActionBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing(4)};
`

export const ActionBar = () => {
  return (
    <ActionBarWrapper>
      <Input placeholder={'Search tournament...'} type="text" />
      <Button>Create Tournament</Button>
    </ActionBarWrapper>
  )
}
