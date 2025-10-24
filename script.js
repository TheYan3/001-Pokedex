async function fetchData() {
  try {
    const data = await (await fetch(`${BASE_URL}?limit=${pageSize}&offset=${offset}`)).json();
    const newResults = data.results.slice(renderedCount);

    for (const result of newResults) {
      const pokemon = await (await fetch(result.url)).json();
      const { id, name, types } = pokemon;
      const [type, secType] = [types[0].type.name, types[1]?.type.name || ""];
      const imgUrl = `${artworkBase}${id}.png`;

      renderPokemonCard({ id, name, imgUrl, type, secType });
    }
    renderedCount = data.results.length;
  } catch (e) {
    console.error("Fehler beim Laden:", e);
    pokemonContainer.innerHTML = errorTemplate();
  } finally {
    isLoading = false;
    statusMessage.hidden = true;
  }
  }

function renderPokemonCard(name, id, imgUrl, type, secType) {
  pokemonContainer.innerHTML += pokemonCardTemplate(name, id, imgUrl, type, secType);
  
  if (isSearching) {
    const last = pokemonContainer.lastElementChild;
    if (last && last.classList.contains('pokemon-card')) {
      last.classList.add('is-hidden');  
      applySearchFilter(currentSearch);  
    }
  } else {
    pokemonContainer.classList.remove('is-hidden');   
  }
  }

async function openModal(name, id, imgUrl, type, secType) {
    currentId = Number(id);
    pokemonModal.classList.add("is-open");
    pokemonModal.hidden = false;
    modalName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    modalId.textContent = `#${String(id).padStart(3, "0")}`;
    modalImg.src = imgUrl;
    modalTypes.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    modalSecTypes.textContent = secType.charAt(0).toUpperCase() + secType.slice(1);
    modalCard.classList.add(`bg-${type}`);

    [...modalCard.classList]
    .filter(c => c.startsWith("bg-"))
    .forEach(c => modalCard.classList.remove(c));
    modalCard.classList.add(`bg-${type}`);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon = await res.json();
  
      loadPanelBtn();
      currentPokemonData = pokemon;
      showAbout(pokemon)

      checkNavButtons();
  } catch (err) {
    console.error("Fehler beim Laden des Pokémon:", err);
  }
  }

function showNext() {
  const nextId = currentId + 1;
  const nextCard = document.querySelector(`article[data-id="${nextId}"]`);
  if (!nextCard) return; 
  openModalFromCard(nextCard);
  }

function showPrev() {
  let prevId = currentId - 1; 
  let prevCard = document.querySelector(`article[data-id="${prevId}"]`);
  openModalFromCard(prevCard);
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
  statusMessage.textContent = isLoadingTemplate();
  checkGenerations();
  }


pokemonModal.addEventListener("click", (event) => {
  if (event.target === pokemonModal || event.target.id === "modal-close") {
    closeModal();
  }
  });

document.addEventListener("DOMContentLoaded", fetchData);

function applySearchFilter(query) {
  const search = (query || "").trim().toLowerCase();
  const cards = pokemonContainer.querySelectorAll(".pokemon-card");
  
  pokemonContainer.querySelectorAll(".pokemon-card:not([data-id])").forEach(el => el.remove());

  if (!checkSearchLength(cards, search)) return;
  heandleSearchPokemon(cards, search);
  }

function handleSearchInput(event) {
  applySearchFilter(event.target.value);

  currentSearch = event.target.value;
  isSearching = currentSearch.length >= 3;

  }

if (typeof searchInput !== 'undefined' && searchInput) {
  searchInput.addEventListener('input', handleSearchInput);
  }
