function pokemonCardTemplate({ name, id, imgUrl, type, secType }) {
    return `
      <article onclick="openModal('${name}', ${id}, '${imgUrl}', '${type}', '${secType}')"  
               class="pokemon-card 
               type-${type}" 
               data-id="${id}" 
               data-name="${name}" 
               data-type="${type}" 
               data-secType="${secType}">
               
        <div class="type-bg">
          <img class="img-type" src="./assets/img/types/${type}-img.svg" alt="${type}" />
        </div>

        <img class="pokemon-img" src="${imgUrl}" alt="${name}" />

        <div class="pokemon-info">
          <span class="pokemon-id">#${String(id).padStart(3, "0")}</span>
          <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
        </div>
      </article>
    `;
  }
  
  function errorTemplate() {
    return `<p>⚠️ Fehler beim Laden der Pokémon!</p>`;
  }

  function isLoadingTemplate() {
    return `Lade Pokémon...`;
  }
  
  