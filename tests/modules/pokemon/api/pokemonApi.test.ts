import {pokemonApi} from '@pokemon/api/pokemonApi'

describe('API configuration', () => {
  test('should have pokemon api base url', () => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon'
    expect(pokemonApi.defaults.baseURL).toBe(baseUrl)
  })
})
