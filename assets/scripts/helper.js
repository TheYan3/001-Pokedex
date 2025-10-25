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

function openModalFromCard(card) {
    if (!card) return;
    
    let id = Number(card.dataset.id);
    let name = card.dataset.name;
    let imgUrl = card.querySelector(".pokemon-img").src;
    let type = getTypeFromClass(card);
    let secType = card.dataset.sectype || "";
    
    openModal(name, id, imgUrl, type, secType);
  }

function checkNavButtons() {
    let nextCard = document.querySelector(`article[data-id="${currentId + 1}"]`);
    let prevCard = document.querySelector(`article[data-id="${currentId - 1}"]`);
    
    let nextBtn = document.getElementById("modal-next");
    let prevBtn = document.getElementById("modal-prev");
    
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

  if (search.length >= 3 && matchCount === 0) {
    showinfo(noResultFound);
  }
  }
