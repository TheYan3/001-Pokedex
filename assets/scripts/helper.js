function finishLoading() {
  isLoading = false;
  statusMessage.hidden = true;
  pokemonContainer.querySelectorAll('.pokemon-card').forEach(card => card.classList.remove('is-hidden'));
  }

function refreshCardsVisibility() {
  const cards = pokemonContainer.querySelectorAll('.pokemon-card');
  if (isSearching) {
    applySearchFilter(currentSearch);} 
    else {
    cards.forEach(card => card.classList.remove('is-hidden'));
    }
  }

function checkGenerations() {
  
    const nextLimit = generationLimits.find(limit => limit > pageSize);
    isLoading = true;
  
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

function getIdFromSpeciesUrl(url) {
    const match = url.match(/\/pokemon-species\/(\d+)\//);
    return match ? Number(match[1]) : null;
  }

function getTypeFromClass(card) {
    const clasRef = [...card.classList].find(c => c.startsWith('type-'));
    return clasRef ? clasRef.replace('type-', '') : '';
  }

function setModalBasics({ name, id, imgUrl, type, secType }) {
  currentId = Number(id);
  pokemonModal.classList.add("is-open");
  pokemonModal.hidden = false;
  modalName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
  modalId.textContent = `#${String(id).padStart(3, "0")}`;
  modalImg.src = imgUrl;
  modalTypes.textContent = type.charAt(0).toUpperCase() + type.slice(1);
  modalSecTypes.textContent = secType.charAt(0).toUpperCase() + secType.slice(1);
  modalCard.classList.add(`bg-${type}`);
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

function setModalBg(type) {
  [...modalCard.classList]
  .filter(c => c.startsWith("bg-"))
  .forEach(c => modalCard.classList.remove(c));
  modalCard.classList.add(`bg-${type}`);
  }  

function getNavCards() {
    const sel = isSearching ? '.pokemon-card:not(.is-hidden)' : '.pokemon-card';
    return Array.from(document.querySelectorAll(sel));
  }

function checkNavButtons() {
const cards = getNavCards();
const i = cards.findIndex(c => Number(c.dataset.id) === currentId);
const nextCard = i >= 0 ? cards[i + 1] : null;
const prevCard = i > 0 ? cards[i - 1] : null;
let nextBtn = document.getElementById('modal-next');
let prevBtn = document.getElementById('modal-prev');
nextBtn.disabled = !nextCard;
prevBtn.disabled = !prevCard;
  }

function setActiveTab(tabName) {
    document.querySelectorAll('.modal-tab')
      .forEach(btn => btn.classList.toggle('is-active', btn.dataset.tab === tabName));
  }

function showinfo(info) {
  if (info === noResultFound) {
   pokemonContainer.innerHTML += searchInfoTemplate(info);
   loadMoreBtn.classList.remove("is-hidden");
    return;
  }
  
  if (info === lessSearch) {
  pokemonContainer.innerHTML += searchInfoTemplate(info);
  loadMoreBtn.classList.add("is-hidden");	
  return;
  }
  }

function checkSearchLength(cards, search) {
  if (search.length === 0) {
    cards.forEach(card => card.classList.remove("is-hidden"));
    loadMoreBtn.classList.remove("is-hidden");
    return false;
  }

  if (search.length < 3) {
    cards.forEach(card => card.classList.add("is-hidden"));
    showinfo(lessSearch)
    return false;
  }
  matchCount = 0;
  return true;
  }

function heandleSearchPokemon(cards, search) {
  cards.forEach(card => {
    const name = (card.dataset.name || "").toLowerCase();
    if (name.includes(search)) {
      card.classList.remove("is-hidden");
      matchCount++;
    } else {
      card.classList.add("is-hidden");
    }
  });

  loadMoreBtn.classList.remove('is-hidden');
  
  if (search.length >= 3 && matchCount === 0) {
    showinfo(noResultFound);
  }
  }

function heandleError(error) {
  console.error("Fehler beim Laden:", error);
  pokemonContainer.innerHTML = errorTemplate();
  }