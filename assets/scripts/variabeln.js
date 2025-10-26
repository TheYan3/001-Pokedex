const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const artworkBase = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

const generationLimits = [151, 251, 386, 493, 649, 721, 809, 905, 1025];
let pageSize = 24;
let step = 24;
let renderedCount = 0;

let isLoading = false;

let currentId = null;
currentPokemonData = null;

let matchCount = 0;
let isSearching = false;
let currentSearch = '';
const lessSearch = 'Enter at least 3 characters so we can search for your Pokémon.'
const noResultFound = 'No Pokémon found. Please try another name or Load more Pokémon.'


const pokemonContainer = document.getElementById("pokemon-container");
const statusMessage = document.getElementById("status-message");
const pokemonModal = document.getElementById("pokemon-modal");
const modalName = document.getElementById("modal-name");
const modalId = document.getElementById("modal-id");
const modalImg = document.getElementById("modal-image");
const modalTypes = document.getElementById("modal-types");
const modalHero = document.getElementById("modal-hero");
const searchInput = document.getElementById("search-input");
const loadMoreBtn = document.getElementById("load-more");
const modalSecTypes = document.getElementById("modal-secTypes");
const modalNav = document.getElementById("modal-nav-btns");
const panelRef  = document.getElementById("modal-panel");
const modalCard = document.getElementById("modal-card");


