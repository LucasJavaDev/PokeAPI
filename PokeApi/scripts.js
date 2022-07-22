const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector("#pokemon");
const form = document.querySelector(".form");
const input = document.querySelector(".input-search");
const buttonNext = document.querySelector(".btn-next");
const buttonPrev = document.querySelector(".btn-prev");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (apiResponse.status == 200) {
    const data = await apiResponse.json();
    return data;
  }
};
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";
  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"][
        "front_default"
      ];
    searchPokemon = data.id;
    input.value = "";
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Não encontrado";
    pokemonNumber.innerHTML = "";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  renderPokemon(input.value.toLowerCase());
});
buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  } else {
  }
});
buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});
renderPokemon(searchPokemon);
