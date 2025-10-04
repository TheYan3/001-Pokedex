const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const artworkBase = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

const generationLimits = [151, 251, 386, 493, 649, 721, 809, 905, 1025];
let pageSize = 24;
let offset = 0;
let step = 24;
let renderedCount = 0;

let isLoading = false;

const pokemonContainer = document.getElementById("pokemon-container");