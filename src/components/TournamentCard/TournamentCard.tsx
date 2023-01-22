import React from 'react'
import styled from 'styled-components'
import { deleteTournament, patchTournament } from '../../actions/tournament'
import { useAppDispatch } from '../../common/hooks'

import { isTournament, Tournament } from '../../reducers/tournaments/types'
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

export const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  const dispatch = useAppDispatch()

  if (isTournament(tournament)) {
    const { id, name, organizer, game, participants, startDate } = tournament

    const handleEdit = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      name: string,
      id: string
    ) => {
      // TODO add error msg if check is not passed
      const editedName = window.prompt('New tournament name:', name)

      if (editedName && checkTournamentNameOnlyAllowedChars.test(editedName)) {
        dispatch(patchTournament({ id, editedName }))
        dispatch({
          type: 'tournament/edit',
          payload: { entities: [{ id, name: editedName }] },
        })
      }
    }
    // TODO: removes useless name
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
        dispatch({
          type: 'tournament/delete',
          payload: { entities: [{ id, name }] },
        })
      }
    }

    return (
      <Card key={id}>
        <H6>{name}</H6>
        <CardInfo>
          <CardText>Organizer: {organizer}</CardText>
          <CardText>Game: {game}</CardText>
          <CardText>
            Partecipants: {participants?.current}/{participants?.max}
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
        <Button onClick={(e) => handleEdit(e, name, id)}>Edit</Button>
        <Button onClick={(e) => handleDelete(e, name, id)}>Delete</Button>
      </Card>
    )
  }
  return null
}
