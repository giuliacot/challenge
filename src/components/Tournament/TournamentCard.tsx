import React from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../hooks'
import {
  checkTournamentNameOnlyAllowedChars,
  deleteTournament,
  isTournament,
  patchTournament,
  Tournament,
} from '../../reducers/tournaments/tournaments'
import theme from '../../theme'
import Button from '../atoms/Button'
import { Card } from '../atoms/Card'
import H6 from '../atoms/H6'

// TODO: moves to utils class
const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}

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
      // add error msg if check is not passed

      const editedName = window.prompt('New tournament name:', name)

      if (editedName && checkTournamentNameOnlyAllowedChars.test(editedName)) {
        dispatch<any>(patchTournament({ id, editedName }))
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
        dispatch<any>(deleteTournament({ id }))
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
