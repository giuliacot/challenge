import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { fakeTournaments } from '../utils/test-utils'

const handlers = [
  rest.get('http://localhost:4000/tournaments', (req, res, ctx) => {
    const searchedValue = req.url.searchParams.get('q')
    const FAKE_DELAY = 500
    if (searchedValue === 'Err') {
      return res(ctx.status(500), ctx.json('🥸 Error'))
    }

    if (searchedValue === 'Load') {
      return res(ctx.delay(FAKE_DELAY), ctx.json([]))
    }

    if (searchedValue) {
      const resultToShow = fakeTournaments.filter((t) =>
        t.name.includes(searchedValue)
      )
      return res(ctx.json(resultToShow))
    }

    return res(ctx.json(fakeTournaments))
  }),
]

export const server = setupServer(...handlers)
