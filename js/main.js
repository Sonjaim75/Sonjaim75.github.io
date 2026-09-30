// ===== SONJAIM - JavaScript principal =====

// Datos de películas (placeholder)
const peliculas = [
  {
    id: "merrily",
    titulo: "Merrily We Roll Along",
    anio: 2025,
    director: "Maria Friedman",
    generos: ["Drama", "Comedia", "Coming of age"],
    descripcion: "Narra la turbulenta relación entre el compositor Franklin Shepard y sus dos amigos de toda la vida, la escritora Mary y el letrista y dramaturgo Charley, a lo largo de tres décadas. Producida originalmente en Broadway en 1981.",
    pagina: "pelicula-merrily.html"
  },
  {
    id: "company",
    titulo: "Company",
    anio: 2006,
    director: "Lonny Price",
    generos: ["Comedia", "Conceptual"],
    descripcion: "Centrada en Bobby, un soltero confirmado que celebra su 35 cumpleaños con sus 10 amigos más cercanos (que también son cinco parejas), “Company” culmina con la transformación de Bobby de swinger soltero a monogamista tentativo.",
    pagina: "pelicula-company.html"
  },
  {
    id: "woods",
    titulo: "Into the Woods",
    anio: 1991,
    director: "James Lapine",
    generos: ["Drama", "Fantasía"],
    descripcion: "En este musical ganador del premio Tony de Stephen Sondheim, varios personajes de cuentos de hadas aprenden por las malas que el 'Happy Ever After' que buscaban no es necesariamente tan feliz después de todo.",
    pagina: "pelicula-woods.html"
  },
  {
    id: "sweeney",
    titulo: "Sweeney Todd",
    anio: 1982,
    director: "Terry Hughes",
    generos: ["Drama", "Terror", "Thriller"],
    descripcion: "El barbero Sweeney Todd regresa a Londres para descubrir el pasado, en el camino conociendo a la dueña de la tienda de tartas, la señora Nellie Lovett, y comienza a comenzar su vida de crimen.",
    pagina: "pelicula-sweeney.html"
  }
];

// ===== Búsqueda overlay =====
const searchBtn = document.getElementById("searchBtn");
const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");
const searchClose = document.getElementById("searchClose");

if (searchBtn && searchOverlay) {
  searchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("active");
    searchInput.focus();
  });

  searchClose?.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
  });

  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchOverlay.classList.remove("active");
    }
  });

  // Buscar al enviar
  const searchForm = document.getElementById("searchForm");
  searchForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      window.location.href = `peliculas.html?q=${encodeURIComponent(query)}`;
    }
  });
}

// ===== Filtros en página de películas =====
function initFilters() {
  const grid = document.getElementById("movieGrid");
  if (!grid) return;

  const yearSelect = document.getElementById("filterYear");
  const genreSelect = document.getElementById("filterGenre");
  const searchField = document.getElementById("filterSearch");
  const resetBtn = document.getElementById("resetFilters");

  // Rellenar años únicos
  if (yearSelect) {
    const years = [...new Set(peliculas.map(p => p.anio))].sort((a, b) => b - a);
    years.forEach(y => {
      const opt = document.createElement("option");
      opt.value = y;
      opt.textContent = y;
      yearSelect.appendChild(opt);
    });
  }

  // Rellenar géneros únicos
  if (genreSelect) {
    const allGenres = [...new Set(peliculas.flatMap(p => p.generos))].sort();
    allGenres.forEach(g => {
      const opt = document.createElement("option");
      opt.value = g;
      opt.textContent = g;
      genreSelect.appendChild(opt);
    });
  }

  // Leer query param de búsqueda
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get("q") || "";
  if (searchField && initialQuery) {
    searchField.value = initialQuery;
  }

  function renderMovies(list) {
    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <h3>No se encontraron películas</h3>
          <p>Prueba cambiando los filtros o el término de búsqueda.</p>
        </div>`;
      return;
    }

    list.forEach(p => {
      const card = document.createElement("a");
      card.href = p.pagina;
      card.className = "movie-card";
      card.innerHTML = `
        <div class="movie-poster">
          <span>${p.titulo.charAt(0)}</span>
          <div class="year-badge">${p.anio}</div>
        </div>
        <div class="movie-info">
          <h3>${p.titulo}</h3>
          <div class="movie-meta">
            ${p.generos.map(g => `<span class="tag">${g}</span>`).join("")}
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function applyFilters() {
    let filtered = [...peliculas];

    const year = yearSelect?.value;
    const genre = genreSelect?.value;
    const query = (searchField?.value || "").trim().toLowerCase();

    if (year) {
      filtered = filtered.filter(p => p.anio === parseInt(year));
    }
    if (genre) {
      filtered = filtered.filter(p => p.generos.includes(genre));
    }
    if (query) {
      filtered = filtered.filter(p =>
        p.titulo.toLowerCase().includes(query) ||
        p.director.toLowerCase().includes(query) ||
        p.generos.some(g => g.toLowerCase().includes(query))
      );
    }

    renderMovies(filtered);
  }

  yearSelect?.addEventListener("change", applyFilters);
  genreSelect?.addEventListener("change", applyFilters);
  searchField?.addEventListener("input", applyFilters);

  resetBtn?.addEventListener("click", () => {
    if (yearSelect) yearSelect.value = "";
    if (genreSelect) genreSelect.value = "";
    if (searchField) searchField.value = "";
    // Limpiar URL
    window.history.replaceState({}, "", "peliculas.html");
    applyFilters();
  });

  // Render inicial
  applyFilters();
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  initFilters();
});
