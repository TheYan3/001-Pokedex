async function fetchData() {
  try {
    const data = await (await fetch(`${BASE_URL}?limit=${pageSize}`)).json();
    const newResults = data.results.slice(renderedCount);
    for (const result of newResults) {
      const { id, name, imgUrl, type, secType } = await getPokemonData(result);
      renderPokemonCard({ id, name, imgUrl, type, secType });
    }
    renderedCount = data.results.length;
  } catch (error) {
    handleError(error);
  } finally {
    finishLoading();
    refreshCardsVisibility();
  }
  }

async function getPokemonData(result) {
    const pokemon = await (await fetch(result.url)).json();
    const { id, name, types } = pokemon;
    const [type, secType] = [types[0].type.name, types[1]?.type.name || ""];
    const imgUrl = `${artworkBase}${id}.png`;
    return { id, name, imgUrl, type, secType };
  }

function renderPokemonCard({ name, id, imgUrl, type, secType }) {
    pokemonContainer.innerHTML += pokemonCardTemplate({ name, id, imgUrl, type, secType });
  
  if (isSearching) {
    applySearchFilter(currentSearch);
  }
  if (isLoading) {
    const last = pokemonContainer.lastElementChild;
    if (last && last.classList.contains('pokemon-card')) {
    last.classList.add('is-hidden');
    }
  }
  }

async function openModal(name, id, imgUrl, type, secType) { 
    setModalBasics({ name, id, imgUrl, type, secType });
    setModalBg(type)

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon = await res.json();
  
      modalNav.innerHTML = loadPanelBtn();
      currentPokemonData = pokemon;
      showAbout(pokemon)
      checkNavButtons();
  } catch (error) {
    handleError(error);
  }
  }

function showNext() {
    const cards = getNavCards();
    const i = cards.findIndex(c => Number(c.dataset.id) === currentId);
    const next = i >= 0 ? cards[i + 1] : null;
    if (!next) return;
    openModalFromCard(next);
  }

function showPrev() {
      const cards = getNavCards();
      const i = cards.findIndex(c => Number(c.dataset.id) === currentId);
      const prev = i > 0 ? cards[i - 1] : null;
      if (!prev) return;
      openModalFromCard(prev);
  }

document.getElementById("modal-next").addEventListener("click", showNext);
document.getElementById("modal-prev").addEventListener("click", showPrev);

function closeModal() {
  pokemonModal.classList.remove("is-open");
  pokemonModal.hidden = true; 
  modalHero.classList.remove(modalHero.classList[1]);
  }

function loadMore() {
  if (isLoading) return;
  isLoading = true;

  statusMessage.hidden = false;
  statusMessage.innerHTML = isLoadingTemplate();
  pokemonContainer.querySelectorAll('.pokemon-card').forEach(card => card.classList.add('is-hidden'));
  checkGenerations();
  }

pokemonModal.addEventListener("click", (event) => {
  if (event.target === pokemonModal || event.target.id === "modal-close") {
    closeModal();
  }
  });

document.addEventListener("DOMContentLoaded", fetchData);

function applySearchFilter(query) {
  if (isLoading) return;

  const search = (query || "").trim().toLowerCase();
  const cards = pokemonContainer.querySelectorAll(".pokemon-card");
  
  pokemonContainer.querySelectorAll(".pokemon-card:not([data-id])").forEach(el => el.remove());

  if (!checkSearchLength(cards, search)) return;
  handleSearchPokemon(cards, search);
  }

function handleSearchInput(event) {
  applySearchFilter(event.target.value);

  currentSearch = event.target.value;
  isSearching = currentSearch.length >= 3;

  }

if (typeof searchInput !== 'undefined' && searchInput) {
  searchInput.addEventListener('input', handleSearchInput);
  }
