import type { Pokemon } from '@pokemon/interfaces/pokemon.interface'

describe('Pokemon interface', () => {
  const pokemon: Pokemon = {
    id: 1,
    name: 'Pikachu'
  }
  test('Should have an id type Number', () => {
    expect(pokemon.id).toEqual(expect.any(Number))
  })
  test('Should have a name type String', () => {
    expect(pokemon.name).toEqual(expect.any(String))
  })
})
