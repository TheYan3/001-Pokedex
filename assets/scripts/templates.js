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
          <div class="pokemon-types">
          </div>
        </div>
      </article>
    `;
  }


function searchCardTemplate(searchInfo) {
    return `
      <article class="pokemon-card"      
        <div class="type-bg">
        </div>

        <img class="pokemon-img" src="./assets/img/pngegg.png" alt="Pokemon not Found" />

        <div class="pokemon-info">
          <h2>${searchInfo}</h2>
          <div class="pokemon-types">
          </div>
        </div>
      </article>
    `;
  }
  
  function errorTemplate() {
    return `<p>⚠️ Error loading Pokémon!</p>`;
  }

  function isLoadingTemplate() {
    return `Load Pokémon...`;
  }
  
  function loadPanelBtn() {
    modalNav.innerHTML = `
    <button
                  onclick="showAbout(currentPokemonData)"
                  class="modal-tab is-active"
                  data-tab="about"
                  role="tab"
                  aria-controls="modal-panel-about">
                  About
               </button>
               <button
                  onclick="showStats(currentPokemonData)"
                  class="modal-tab"
                  data-tab="stats"
                  role="tab"
                  aria-controls="modal-panel-stats">
                  Base Stats
               </button>
               <button
                  onclick="showShiny(currentPokemonData)"
                  class="modal-tab"
                  data-tab="shiny"
                  role="tab"
                  aria-controls="modal-panel-shiny">
                  Shiny
               </button>
    `;
  }