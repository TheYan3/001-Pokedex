async function fetchData() {
  if (isLoading) return;
  isLoading = true;
  statusMessage.hidden = false;
  statusMessage.textContent = isLoadingTemplate();

  try {
    const response = await fetch(`${BASE_URL}?limit=${pageSize}&offset=${offset}`);
    const data = await response.json();
    const newResults = data.results.slice(renderedCount);

    // Für jedes Pokémon Detaildaten abrufen
    for (const result of newResults) {
      const pokeResponse = await fetch(result.url);
      const pokemon = await pokeResponse.json();

  
      const id = pokemon.id;
      const imgUrl = `${artworkBase}${id}.png`;
      const type = pokemon.types[0].type.name;

      // Karte in HTML einfügen
      pokemonContainer.innerHTML += pokemonCardTemplate({
         name: pokemon.name,
         id: id,
         imgUrl: imgUrl,
         type: type
      });
      
      renderedCount = data.results.length;
    }
  } catch (error) {
    console.error("Fehler beim Laden der API-Daten:", error);
    pokemonContainer.innerHTML = errorTemplate(); 
  } finally {
    isLoading = false;
    statusMessage.hidden = true;
  }
}

function openModal(name, id, imgUrl, type) {
  pokemonModal.classList.add("is-open");
  pokemonModal.hidden = false;

  modalName.textContent = name;
  modalId.textContent = `#${String(id).padStart(3, "0")}`;
  modalImg.src = imgUrl;
  modalTypes.textContent = type;
  modalHero.classList.add(`type-${type}`);

}

function closeModal() {
  pokemonModal.classList.remove("is-open");
  pokemonModal.hidden = true; 
}

pokemonModal.addEventListener("click", (event) => {
  if (event.target === pokemonModal || event.target.id === "modal-close") {
    closeModal();
  }
});

document.addEventListener("DOMContentLoaded", fetchData);
