import { describe, expect, it } from 'vitest'
import { start } from '../src/start'

describe('add', () => {
  
  it('expect 1 + 1 = 2', async () => {
    await start(['CHANGELOG.md'], [
      'words'
    ])
    expect(1 + 1).toEqual(2)
  })
})
