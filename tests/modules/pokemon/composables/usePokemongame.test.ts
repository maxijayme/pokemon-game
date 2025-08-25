import { GameStatus } from '@/modules/pokemon/interfaces'
import MockAdapter from 'axios-mock-adapter'
import withSetup from '../utils/withSetup'
import { usePokemonGame } from '@pokemon/composables/usePokemonGame'
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi'
import { pokemonListFake } from '../../../data/fake-pokemons'
import { flushPromises } from '@vue/test-utils'
import confetti from 'canvas-confetti'

const mockPokemonApi = new MockAdapter(pokemonApi)

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonListFake,
})

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}))

describe('usePokemonGame', () => {
  test('should initialize with correct deafult pokemon values', async () => {
    const [results] = withSetup(usePokemonGame)

    const { gameStatus, isLoading, pokemonOptions, randomPokemon } = results

    expect(gameStatus.value).toBe(GameStatus.Playing)
    expect(isLoading.value).toBe(true)
    expect(pokemonOptions.value).toEqual([])
    expect(randomPokemon.value).toEqual(undefined)

    await flushPromises()

    expect(isLoading.value).toBe(false)
    expect(pokemonOptions.value.length).toBe(4)
    expect(randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    })
  })

  test('should correctly handle getNextRound', async () => {
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    results.gameStatus.value = GameStatus.Lost
    results.getNextRound(5)

    expect(results.gameStatus.value).toBe(GameStatus.Playing)
    expect(results.pokemonOptions.value).toHaveLength(5)
  })

  test('should change pokemon options on getNextRound', async () => {
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    const firstPokemonOptions = results.pokemonOptions.value
    results.getNextRound()
    const nextPokemonOptions = results.pokemonOptions.value
    expect(firstPokemonOptions[0]).not.toMatchObject(nextPokemonOptions[0])
  })

  test('should handle correctly incorrect answer', async () => {
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    const { gameStatus, checkSelection, randomPokemon } = results
    expect(gameStatus.value).toBe(GameStatus.Playing)
    checkSelection(randomPokemon.value.id + 1)
    expect(gameStatus.value).toBe(GameStatus.Lost)
  })

  test('should handle correctly correct answer', async () => {
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    const { gameStatus, checkSelection, randomPokemon } = results
    expect(gameStatus.value).toBe(GameStatus.Playing)
    checkSelection(randomPokemon.value.id)
    expect(confetti).toBeCalled()
    expect(confetti).toBeCalledWith({
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star'],
    })
    expect(gameStatus.value).toBe(GameStatus.Won)
  })
})
