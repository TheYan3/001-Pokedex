function showAbout(pokemon) {
    switchPanel('main'); 
    panelRef.innerHTML = `
    <section
        class="modal-panel is-active"
       id="modal-panel-about"
        role="tabpanel"
       data-tab-panel="about">
     <div class="about-list" id="modal-about">
         <div class="about-item">
            <span>Größe</span><span>${pokemon.height / 10} m</span>
         </div>
        <div class="about-item">
          <span>Gewicht</span><span>${pokemon.weight / 10} kg</span>
        </div>
      </div>
    </section> 
    `;
    setActiveTab('about');
  }
  
  function showStats(pokemon) {
    switchPanel('main');
    if (!pokemon || !pokemon.stats) return; 
    panelRef.innerHTML = pokemon.stats.map(stat => `
      <section
        class="modal-panel  is-active"
        id="modal-panel-stats"
        role="tabpanel"
        data-tab-panel="stats">
        <div class="stats-list" id="modal-stats">
        <div class="stat-row">
          <span>${stat.stat.name.toUpperCase()}</span>
          <div class="stat-bar">
          <div class="stat-bar-fill" style="width:${Math.min(100, stat.base_stat / 2)}%;"></div>
          </div>
          <span>${stat.base_stat}</span>
      </div>
        </div>
      </section>
      
    `).join("");
    setActiveTab('stats');
  }
  
  function showShiny(pokemon) {
    switchPanel('shiny');
    panelRef.innerHTML = `
    <section
     class="modal-panel  is-active"
     id="modal-panel-shiny"
     role="tabpanel"
     data-tab-panel="shiny">
     <div class="shiny-viewer" id="modal-shiny">
      <img src="${artworkBase}${pokemon.id}.png" alt="${pokemon.name} normal" class="shiny-image" loading="lazy">
      <img src="${artworkBase}/shiny/${pokemon.id}.png" alt="${pokemon.name} shiny" class="shiny-image" loading="lazy">
     </div>
    </section>
    `;
    setActiveTab('shiny');
  }

  