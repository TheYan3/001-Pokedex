async function fetchData() {
  if (isLoading) return;
  isLoading = true;
  statusMessage.hidden = false;
  statusMessage.textContent = isLoadingTemplate();

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
  pokemonContainer.innerHTML += pokemonCardTemplate(name, id, imgUrl, type, secType)
  }

function openModal(name, id, imgUrl, type, secType) {
    currentId = Number(id);
    pokemonModal.classList.add("is-open");
    pokemonModal.hidden = false;
    modalName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    modalId.textContent = `#${String(id).padStart(3, "0")}`;
    modalImg.src = imgUrl;
    modalTypes.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    modalHero.classList.add(`type-${type}`);
    modalSecTypes.textContent = secType.charAt(0).toUpperCase() + secType.slice(1);

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(pokemon => {
      showAbout(pokemon);
      showStats(pokemon); 
    });

    checkNavButtons();
  }

function closeModal() {
  pokemonModal.classList.remove("is-open");
  pokemonModal.hidden = true; 
  modalHero.classList.remove(modalHero.classList[1]);
}

function getTypeFromClass(element) {
  let classes = element.className.split(" "); 
  for (let i = 0; i < classes.length; i++) {
    if (classes[i].startsWith("type-")) { 
      return classes[i].replace("type-", ""); 
  }
  return ""; 
}
}

function openModalFromCard(card) {
  if (!card) return;

  let id = Number(card.dataset.id);
  let name = card.dataset.name;
  let imgUrl = card.querySelector(".pokemon-img").src;
  let type = getTypeFromClass(card);
  let secType = card.dataset.sectype || "";

  openModal(name, id, imgUrl, type, secType);
}

function showNext() {
  let nextId = currentId + 1; 
  let nextCard = document.querySelector(`article[data-id="${nextId}"]`);
  openModalFromCard(nextCard);
}

function showPrev() {
  let prevId = currentId - 1; 
  let prevCard = document.querySelector(`article[data-id="${prevId}"]`);
  openModalFromCard(prevCard);
}

function checkNavButtons() {
  let nextCard = document.querySelector(`article[data-id="${currentId + 1}"]`);
  let prevCard = document.querySelector(`article[data-id="${currentId - 1}"]`);

  let nextBtn = document.getElementById("modal-next");
  let prevBtn = document.getElementById("modal-prev");

  
  nextBtn.disabled = !nextCard;
  prevBtn.disabled = !prevCard;
}

document.getElementById("modal-next").addEventListener("click", showNext);
document.getElementById("modal-prev").addEventListener("click", showPrev);

function loadMore() {
  const nextLimit = generationLimits.find(limit => limit > pageSize);

  if (nextLimit && pageSize + step < nextLimit) {
    pageSize += step;
  } 
  else if (nextLimit && pageSize < nextLimit) {
    pageSize = nextLimit;
  } 
  else {
    alert("Alle Generationen sind geladen!");
    return;
  }

  return fetchData();
}

pokemonModal.addEventListener("click", (event) => {
  if (event.target === pokemonModal || event.target.id === "modal-close") {
    closeModal();
  }
});

document.addEventListener("DOMContentLoaded", fetchData);

function applySearchFilter(query) {
  const search = (query || "").trim().toLowerCase();
  const cards = pokemonContainer.querySelectorAll('.pokemon-card');

  if (search.length < 3) {
    cards.forEach(card => card.classList.remove('is-hidden'));
    return;
  }

  cards.forEach(card => {
    const name = (card.dataset.name || '').toLowerCase();
    if (name.includes(search)) {
      card.classList.remove('is-hidden');
    } else {
      card.classList.add('is-hidden');
    }
  });
}

function handleSearchInput(e) {
  applySearchFilter(e.target.value);
}

if (typeof searchInput !== 'undefined' && searchInput) {
  searchInput.addEventListener('input', handleSearchInput);
}
