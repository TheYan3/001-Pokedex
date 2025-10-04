function pokemonCardTemplate({ name, id, imgUrl, type }) {
    return `
      <article class="pokemon-card type-${type}" data-id="${id}" data-name="${name}">
        <span class="pokemon-id">#${String(id).padStart(3, "0")}</span>
        <div>
          <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
        </div>
        <img src="${imgUrl}" alt="${name}" />
      </article>
    `;
  }
  
  function errorTemplate() {
    return `<p>⚠️ Fehler beim Laden der Pokémon!</p>`;
  }