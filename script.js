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

// Daten beim Laden der Seite abrufen
document.addEventListener("DOMContentLoaded", fetchData);
