let pokemonList = [
  { name: "balbasure", type: ["grass", "poison"], height: "7" },
  { name: "eve", type: ["water", "speed"], height: "2" },
  { name: "charzard", type: ["fire", "flying"], height: "8" },
];

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height < 8 && pokemonList[i].height > 4) {
    document.write("<p>", pokemonList[i].name + " is a medium sized pokemon.");
  } else if (pokemonList[i].height < 5) {
    document.write("<p>", pokemonList[i].name + " is a small pokemon.");
  } else {
    document.write("<p>", pokemonList[i].name + " is a big pokemon!");
  }
  document.write(pokemonList[i].height);
}
