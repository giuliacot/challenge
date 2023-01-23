import React from 'react'
import styled from 'styled-components'
import {
  deleteTournament,
  removeLocalTournament,
  editLocalTournament,
  patchTournament,
} from '../../actions/tournament'
import { useAppDispatch } from '../../common/hooks'

import { isTournament, Tournament } from '../../reducers/types'
import { Button } from '../_atoms/Button'
import { Card } from '../_atoms/Card'
import { H6 } from '../_atoms/H6'
import theme from '../../common/theme'
import { options } from '../../utils/dateFormatOption'
import { checkTournamentNameOnlyAllowedChars } from '../../utils/inputValidation'
import { fadeIn } from '../../common/animation'

const CardText = styled.p`
  margin: 0;
`
const CardInfo = styled.div`
  margin-bottom: ${theme.spacing(2)};
`

const CardAnimation = styled(Card)<{ nCard: number }>`
  display: inline-grid;
  align-content: space-between;
  animation: ${fadeIn} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: ${(props) => props.nCard * 0.15}s;
`

export const TournamentCard = ({
  tournament,
  numberOfTournament,
}: {
  tournament: Tournament
  numberOfTournament: number
}) => {
  const dispatch = useAppDispatch()

  if (isTournament(tournament)) {
    const { id, name, organizer, game, participants, startDate } = tournament

    const handleEdit = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      id: string,
      name?: string
    ) => {
      // TO IMPROVE: notifing the user if the check is not passed
      const editedName = window.prompt('New tournament name:', name)

      if (editedName && checkTournamentNameOnlyAllowedChars.test(editedName)) {
        dispatch(editLocalTournament({ id, name: editedName }))
        dispatch(patchTournament({ id, editedName }))
      }
    }

    const handleDelete = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      id: string,
      name?: string
    ) => {
      const userReply = window.confirm(
        'Do you really want to delete this tournament?'
      )
      if (userReply) {
        dispatch(deleteTournament({ id }))
        dispatch(removeLocalTournament({ id }))
      }
    }

    return (
      <CardAnimation nCard={numberOfTournament}>
        <H6>{name ?? '-'}</H6>
        <CardInfo>
          <CardText>Organizer: {organizer ?? '-'}</CardText>
          <CardText>Game: {game ?? '-'}</CardText>

          <CardText>
            Partecipants: {participants?.current ?? '-'}/
            {participants?.max ?? '-'}
          </CardText>

          {startDate && (
            <CardText>
              Start:{' '}
              {Intl.DateTimeFormat('en-GB', options).format(
                new Date(startDate)
              )}
            </CardText>
          )}
        </CardInfo>
        <div>
          <Button
            tabIndex={0}
            data-testid={`editTournamentBtn-${id}`}
            onClick={(e) => handleEdit(e, id, name)}
          >
            Edit
          </Button>
          <Button
            tabIndex={0}
            data-testid={`deleteTournamentBtn-${id}`}
            onClick={(e) => handleDelete(e, id, name)}
          >
            Delete
          </Button>
        </div>
      </CardAnimation>
    )
  }
  return null
}
