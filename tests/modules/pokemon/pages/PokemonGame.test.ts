import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue'
import { mount } from '@vue/test-utils'
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame'
import type { Mock } from 'vitest'
import { GameStatus } from '@/modules/pokemon/interfaces'
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue'

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}))

const pokemonOptions = [
  {
    name: 'bulbasaur',
    id: 1,
  },
  {
    name: 'ivysaur',
    id: 2,
  },
  {
    name: 'venusaur',
    id: 3,
  },
  {
    name: 'charmander',
    id: 4,
  },
]

describe('<PokemonGame />', () => {
  test('should initialize with default values', () => {
    ;(usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Playing,
      isLoading: true,
      randomPokemon: null,
      pokemonOptions: [],
      checkSelection: () => {},
      getNextRound: () => {},
    })
    const wrapper = mount(PokemonGame)

    expect(wrapper.get('h1').text()).toBe('Please wait')
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl', 'font-bold', 'mb-4'])
    expect(wrapper.get('h3').text()).toBe('Loading Pokémon...')
    expect(wrapper.get('h3').classes()).toEqual(['animate-pulse'])
  })

  test('should render <PokemonPicture /> and <PokemonOptions />', () => {
    ;(usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Playing,
      isLoading: false,
      randomPokemon: pokemonOptions.at(0),
      pokemonOptions: pokemonOptions,
      checkSelection: () => {},
      getNextRound: () => {},
    })
    const wrapper = mount(PokemonGame)

    const pokemonImageSrc =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'

    expect(wrapper.get('h1').text()).toBe('Who is this Pokémon?')
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl', 'font-bold', 'mb-4'])

    const pokemons = pokemonOptions.map((pokemon) => pokemon.name)

    expect(wrapper.findComponent(PokemonPicture)).toBeTruthy()
    expect(wrapper.get('img').attributes('src')).toBe(pokemonImageSrc)
    expect(wrapper.findComponent(PokemonOptions)).toBeTruthy()
    const buttons = wrapper.findAll('.disabled\\:bg-gray-100')
    expect(buttons).length(4)
    buttons.forEach((button) => {
      expect(pokemons).toContain(button.text())
    })
  })
})
