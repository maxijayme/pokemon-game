import { mount } from "@vue/test-utils"
import PokemonOptions from "@/modules/pokemon/components/PokemonOptions.vue"
import type { Pokemon } from "@/modules/pokemon/interfaces"

describe('<PokemonOptions/>', () => {
  const Pokemons = <Pokemon[]> [
    {
      name: 'BulbaSaur',
      id: 1
    },
    {
      name: 'Pikachu',
      id: 2
    },
  ]
  test('Get pokemon id on click pokemon options buttons', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options: Pokemons,
        disableButtons: false,
        correctOption: 2
      }
    })
    const optionsButtons = wrapper.findAll('button')
    const pokemons = wrapper.props().options
    optionsButtons.forEach(async (button, index) => {
      await button.trigger('click')
      expect(wrapper.emitted().selectedPokemonId).toBeTruthy()
      const emitted = wrapper.emitted().selectedPokemonId as Array<[number]>
      expect(emitted[index][0]).toBe(pokemons[index].id)
    });
  })

  test('All buttons have disabled class', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options: Pokemons,
        disableButtons: true,
        correctOption: 2
      }
    })
    const optionsButtons = wrapper.findAll('button')
    optionsButtons.forEach( button => {
      const attributes = Object.keys(button.attributes())
      expect(attributes).toContain('disabled')
    });
  })

  test('Correct or incorrect option', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options: Pokemons,
        disableButtons: true,
        correctOption: 2
      }
    })
    const optionsButtons = wrapper.findAll('button')
    const props = wrapper.props()
    optionsButtons.forEach((button, index) => {
      if (props.options[index].id === props.correctOption)
        expect(button.classes()).toContain('correct');
      else
        expect(button.classes()).toContain('incorrect')
    });
  })

})
