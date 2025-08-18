import { GameStatus } from '@/modules/pokemon/interfaces'
import MockAdapter from 'axios-mock-adapter'
import withSetup from '../utils/withSetup'
import { usePokemonGame } from '@pokemon/composables/usePokemonGame'
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi'
import { pokemonListFake } from '../../../data/fake-pokemons'
import { flushPromises } from '@vue/test-utils'

const mockPokemonApi = new MockAdapter(pokemonApi)

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonListFake,
})

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
})
