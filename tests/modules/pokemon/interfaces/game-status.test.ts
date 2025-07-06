import {GameStatus} from '@pokemon/interfaces/game-status.enum'

describe('GameStatus enum', ()=> {
  test('Shoul have "playing" value', ()=> {
    expect(GameStatus.Playing).toBe('playing')
  })

  test('Shoul have "won" value', ()=> {
    expect(GameStatus.Won).toBe('won')
  })

  test('Shoul have "lost" value', ()=> {
    expect(GameStatus.Lost).toBe('lost')
  })
})
