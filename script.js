const API_URL = 'https://hp-api.onrender.com/api/characters';
const inputbusqueda = document.getElementById('inputbusqueda');
const boton_buscar = document.getElementById('boton_buscar');
const resultado = document.getElementById('resultado_busqueda');
const filtro_casa = document.getElementById('filtro_casa');

const DEFAULT_IMAGE = 'https://via.placeholder.com/200x250?text=No+Image';

async function fetchCharacters() {
  const response = await fetch(API_URL);
  return response.json();
}

function displayCharacters(characters) {
  resultado.innerHTML = '';

  if (characters.length === 0) {
    resultado.innerHTML = '<p>Personaje no encontrado</p>';
    return;
  }

  characters.sort((a, b) => a.name.localeCompare(b.name));

  characters.forEach(character => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${character.image || DEFAULT_IMAGE}" alt="${character.name}">
      <h3>${character.name}</h3>
      <p>Casa: ${character.house || 'Desconocida'}</p>
    `;

    resultado.appendChild(card);
  });
}

async function handleSearch() {
  const query = inputbusqueda.value.toLowerCase();
  const selectedHouse = filtro_casa.value;

  const characters = await fetchCharacters();

  const filtered = characters.filter(character =>
    character.name.toLowerCase().includes(query) &&
    (selectedHouse === '' || character.house === selectedHouse)
  );

  displayCharacters(filtered);
}

// Buscar con botón
boton_buscar.addEventListener('click', handleSearch);

// Buscar con Enter
inputbusqueda.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});
