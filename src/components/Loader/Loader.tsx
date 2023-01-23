import React from 'react'
import styled from 'styled-components'
import { blink } from '../../common/animation'
import theme from '../../common/theme'
import { MainContent } from '../_layout/MainContent'

const LoaderWrap = styled(MainContent)`
  animation: ${blink} 1.9s ease-in-out infinite both;
`

export const Loader = () => {
  return <LoaderWrap>Loading tournaments ...</LoaderWrap>
}
