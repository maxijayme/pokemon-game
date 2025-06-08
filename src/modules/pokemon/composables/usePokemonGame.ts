import { computed, onMounted, ref } from "vue"
import { GameStatus, type PokemonListResponse, type Pokemon } from "../interfaces"
import { pokemonApi } from "@/api/pokemonApi"

export const usePokemonGame = () => {

  const gameStatus = ref<GameStatus>(GameStatus.Playing)

  const pokemons = ref<Pokemon[]>([])
  const pokemonOptions = ref<Pokemon[]>([])

  const isLoading = computed(() => pokemons.value.length === 0)

  const getPokemons = async(): Promise<Pokemon[]> => {

    const response = await pokemonApi.get<PokemonListResponse>('?limit=151')

    const pokemonList = response.data.results.map(pokemon => {
      const urlParts = pokemon.url.split('/')
      const id = urlParts.at(-2) ?? '0'
      return {
        id: parseInt(id, 10),
        name: pokemon.name
      }
    })

    const suffledPokemonList = pokemonList.sort(() => Math.random() - 0.5)
    return suffledPokemonList
  }

  const getNextOPtions = ( howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing
    pokemonOptions.value = pokemons.value.slice(0, howMany)
    pokemons.value = pokemons.value.slice(howMany)
  }


  onMounted(
    async () => {
      await new Promise( resolve => setTimeout(resolve, 1000) )
      pokemons.value = await getPokemons()
      getNextOPtions()
    }
  )

  return {
    gameStatus,
    isLoading,
    pokemonOptions,

    //Methods
    getNextOPtions,
    getPokemons,
  }
}
