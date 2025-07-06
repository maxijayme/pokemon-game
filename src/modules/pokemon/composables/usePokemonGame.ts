import { computed, onMounted, ref } from "vue"
import { GameStatus, type PokemonListResponse, type Pokemon } from "../interfaces"
import { pokemonApi } from "@/modules/pokemon/api/pokemonApi"
import confetti from 'canvas-confetti';


export const usePokemonGame = () => {

  const gameStatus = ref<GameStatus>(GameStatus.Playing)

  const pokemons = ref<Pokemon[]>([])
  const pokemonOptions = ref<Pokemon[]>([])
  const randomPokemon = computed(()=> {
    const randomPokemonNumber = Math.floor(Math.random()*pokemonOptions.value.length)
    const pokemonToGuess = pokemonOptions.value[randomPokemonNumber]
    return pokemonToGuess
  })
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

  const getNextRound = ( howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing
    pokemonOptions.value = pokemons.value.slice(0, howMany)
    pokemons.value = pokemons.value.slice(howMany)
  }

  const checkSelection = (id: number) => {
    const hasWon = randomPokemon.value.id === id
    if (hasWon) {
      gameStatus.value = GameStatus.Won
      confetti({
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star']
      });
      return
    }
    gameStatus.value = GameStatus.Lost
  }


  onMounted(
    async () => {
      await new Promise( resolve => setTimeout(resolve, 1000) )
      pokemons.value = await getPokemons()
      getNextRound()
    }
  )

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,

    //Methods
    getNextRound,
    getPokemons,
    checkSelection,
  }
}
