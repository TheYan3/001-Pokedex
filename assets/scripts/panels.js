function showAbout(pokemon) {
    const aboutRef = document.getElementById("modal-about");
    aboutRef.innerHTML = `
      
      <div class="about-item">
        <span>Größe</span><span>${pokemon.height / 10} m</span>
      </div>
      <div class="about-item">
        <span>Gewicht</span><span>${pokemon.weight / 10} kg</span>
      </div>
    `;
  }
  
  function showStats(pokemon) {
    const statsRef = document.getElementById("modal-stats");
    statsRef.innerHTML = pokemon.stats.map(stat => `
      <div class="stat-row">
        <span>${stat.stat.name.toUpperCase()}</span>
        <div class="stat-bar">
          <div class="stat-bar-fill" style="width:${stat.base_stat / 2}%;"></div>
        </div>
        <span>${stat.base_stat}</span>
      </div>
    `).join("");
  }
  
