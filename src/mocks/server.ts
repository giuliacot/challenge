import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { fakeTournament, fakeTournaments } from '../utils/test-utils'
const FAKE_DELAY = 500

const handlers = [
  rest.get('http://localhost:4000/tournaments', (req, res, ctx) => {
    const searchedValue = req.url.searchParams.get('q')

    switch (searchedValue) {
      case 'Err':
        return res(ctx.status(500), ctx.json('🥸 Error'))
      case 'Load':
        return res(ctx.delay(FAKE_DELAY), ctx.json([]))
      default:
        if (searchedValue) {
          const resultToShow = fakeTournaments.filter((t) =>
            t.name.includes(searchedValue)
          )
          return res(ctx.json(resultToShow))
        } else {
          return res(ctx.json(fakeTournaments))
        }
    }
  }),

  rest.post('http://localhost:4000/tournaments', async (req, res, ctx) => {
    const body = await req.json()
    return res(ctx.delay(FAKE_DELAY), ctx.json(fakeTournament(body.name)))
  }),

  rest.patch('http://localhost:4000/tournaments/:id', async (req, res, ctx) => {
    const body = await req.json()
    return res(ctx.delay(FAKE_DELAY), ctx.json(fakeTournament(body.name)))
  }),

  rest.delete(
    'http://localhost:4000/tournaments/:id',
    async (req, res, ctx) => {
      return res(ctx.delay(FAKE_DELAY), ctx.json({}))
    }
  ),
]

export const server = setupServer(...handlers)
