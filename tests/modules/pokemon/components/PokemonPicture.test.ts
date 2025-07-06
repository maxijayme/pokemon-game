import { GameStatus } from '@/modules/pokemon/interfaces'
import PokemonPicture from '@pokemon/components/PokemonPicture.vue'
import { mount } from "@vue/test-utils"

describe('<PokemonPicture/>', () => {
  const pokemonId = 1
  const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`

  test('Should render the hidden image when showPokemon prop is "playing"', () => {
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId,
        showPokemon: GameStatus.Playing
      }
    })
    const image = wrapper.find('[data-vtest="pokemon-picture-image"]')
    expect(image.exists()).toBeTruthy()
    expect(image.attributes('src')).toContain(imageSrc)
    expect(image.attributes()).toEqual(
      expect.objectContaining({
        class: 'w-64 h-64 object-contain fade-in brightness-0',
        src: imageSrc
      })
    )
  })

  test('Should render the color image when showPokemon prop is "won"', () => {
     const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId,
        showPokemon: GameStatus.Won
      }
    })
    const image = wrapper.find('[data-vtest="pokemon-picture-image"]')
    expect(image.exists()).toBeTruthy()
    expect(image.attributes('src')).toContain(imageSrc)
    expect(image.attributes()).toEqual(
      expect.objectContaining({
        class: 'w-64 h-64 object-contain fade-in',
        src: imageSrc
      })
    )
  })

  test('Should render the grayscale image when showPokemon prop is "lost"', () => {
     const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId,
        showPokemon: GameStatus.Lost
      }
    })
    const image = wrapper.find('[data-vtest="pokemon-picture-image"]')
    expect(image.classes().includes('grayscale')).toBeTruthy()
    expect(image.attributes()).toEqual(
      expect.objectContaining({
        class: 'w-64 h-64 object-contain fade-in grayscale',
        src: imageSrc
      })
    )
  })
})
