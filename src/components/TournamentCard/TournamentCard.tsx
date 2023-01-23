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

const CardText = styled.p`
  margin: 0;
`
const CardInfo = styled.div`
  margin-bottom: ${theme.spacing(2)};
`

const CardAnimation = styled(Card)`
  display: inline-grid;
  align-content: space-between;
  animation: fade-in 0.8s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

export const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  const dispatch = useAppDispatch()

  if (isTournament(tournament)) {
    const { id, name, organizer, game, participants, startDate } = tournament

    const handleEdit = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      name: string,
      id: string
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
      name: string,
      id: string
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
      <CardAnimation>
        <H6>{name}</H6>
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
            onClick={(e) => handleEdit(e, name, id)}
          >
            Edit
          </Button>
          <Button
            tabIndex={0}
            data-testid={`deleteTournamentBtn-${id}`}
            onClick={(e) => handleDelete(e, name, id)}
          >
            Delete
          </Button>
        </div>
      </CardAnimation>
    )
  }
  return null
}
