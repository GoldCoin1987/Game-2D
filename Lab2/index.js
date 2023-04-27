// Allow access to express, pokemon, and random numbers
const express = require("express");
const pokemon = require("pokemon");
const random = require("random-numbers");

// Create an instance
const app = express();

// show the process.env (environment)
console.log(process.env);

// port 3000
const port = process.env.PORT || 3000;

// create the pokedex array
let pokedex = {};

// fill the pokedex array
for (let i = 0; i < 50; i++) {
  pokedex[i] = {
    Name: pokemon.random(),
    Attack: random.create(50, 100),
    Defense: random.create(0, 100),
  };
}

// localhost: 3000 is the root route
app.get("/", (req, res) => res.send("I am the Pokemon root route."));

// responds with a random pokemon
app.get("/pokemon", (req, res) => res.send(pokemon.random()));

// respond with five pokemon names
app.get("/dex", (req, res) =>
  res.send(
    `${pokedex[0].Name}<br/>
     ${pokedex[1].Name}<br/>
     ${pokedex[2].Name}<br/>
     ${pokedex[3].Name}<br/>
     ${pokedex[4].Name}`
  )
);

// respond with five pokemon and their stats
app.get("/pokemon/dex", (req, res) => {
  let string = "";
  for (let i = 0; i < 5; i++) {
    string += `Pokemon ${pokedex[i].Name} 
    has an attack of ${pokedex[i].Attack} 
    and a defense of ${pokedex[i].Defense} <br/>`;
  }
  res.send(string);
});

// respond with the victor of a pokemon battle
app.get("/battle", (req, res) => {
  // pick two random pokemon from the array
  let index1 = random.create(0, 24);
  let index2 = random.create(25, 49);
  // get total power by adding attack and defense
  let poke1 = pokedex[index1].Defense + pokedex[index1].Attack;
  let poke2 = pokedex[index2].Defense + pokedex[index2].Attack;
  // if pokemon 1 had a greater total power
  if (poke1 > poke2) {
    res.send(
      `${pokedex[index1].Name}, with an attack of ${pokedex[index1].Attack} and a defense of ${pokedex[index1].Defense} (Total Power = ${poke1}) <br/>
      beat <br/>
      ${pokedex[index2].Name}, with an attack of ${pokedex[index2].Attack} and a defense of ${pokedex[index2].Defense} (Total Power = ${poke2})`
    );
  }
  // if pokemon 2 had a greater total power
  if (poke2 > poke1) {
    res.send(
      `${pokedex[index2].Name}, with an attack of ${pokedex[index2].Attack} and a defense of ${pokedex[index2].Defense} (Total Power = ${poke2}) <br/>
      beat <br/>
      ${pokedex[index1].Name}, with an attack of ${pokedex[index1].Attack} and a defense of ${pokedex[index1].Defense} (Total Power = ${poke1})`
    );
  }
  // if pokemon total powers were equal
  if (poke1 == poke2) {
    res.send(
      `${pokedex[index2].Name}, with an attack of ${pokedex[index2].Attack} and a defense of ${pokedex[index2].Defense} (Total Power = ${poke2})<br/>
      tied <br/>
      ${pokedex[index1].Name}, with an attack of ${pokedex[index1].Attack} and a defense of ${pokedex[index1].Defense} (Total Power = ${poke1}) `
    );
  }
});

// Listener
app.listen(port, () => console.log(`Basic Server on port ${port}`));
