import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { fakeTournaments } from '../utils/test-utils'

const handlers = [
  rest.get('http://localhost:4000/tournaments', (req, res, ctx) => {
    const searchedValue = req.url.searchParams.get('q')
    if (searchedValue === 'Error') {
      return res(ctx.status(500), ctx.json('🥸 Error'))
    }

    if (searchedValue) {
      return res(
        ctx.json(fakeTournaments.filter((t) => t.name.includes(searchedValue)))
      )
    }

    return res(ctx.json(fakeTournaments))
  }),
]

export const server = setupServer(...handlers)
