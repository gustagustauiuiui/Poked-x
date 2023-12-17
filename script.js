const pokemons = [];
const pokemonsLista = [];

async function getPokemon(nameOrID) {
    const results = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrID}/`);

    return await results.json();
}

async function getPokemons(limit) {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0.`);

    return await result.json();
}

async function storePokemon(nameOrID) {

    await getPokemon(nameOrID).then(pokemon => {
        let pokemonTratado = {
            id: pokemon.id,
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            sprite: pokemon.sprites.other['official-artwork'].front_default,
            abilities: pokemon.abilities.map(a => {
                return { ability: { name: a.ability.name } }
            }),
            types: pokemon.types.map((t) => {
                return { type: t.type.name };
            })
        };

        pokemons.push(pokemonTratado);
        exibir(pokemonTratado);

    }).catch((error) => console.log(error));
}

async function consultPokemons(qtd) {

    await getPokemons(qtd).then(pokemons => {
        const resultados = pokemons.results;

        for (let p of resultados) {
            storePokemon(p.name)
        }
    }).catch((error) => console.log("erro: " + error));
    
}

async function exibir(pokemon){
    pokemonsLista.push(pokemon);
    
    let main = document.getElementById("main-card");

    let card = document.createElement("div");
    card.className = "card-pokemon";

    let img = document.createElement("img");
    img.src = pokemon.sprite;

    let infos = document.createElement("div");
    infos.className = "infos";
    
    let p = document.createElement("p");
    p.innerHTML = "N° "+pokemon.id;
    
    let h1 = document.createElement("h1");
    h1.innerHTML = pokemon.name;
    
    let types = document.createElement("div");
    types.className = "types";

    for(let t of pokemon.types){
        let span = document.createElement("span");
        span.className = "type-name"
        span.innerHTML = t.type;
        types.appendChild(span);
    }

    infos.appendChild(p);
    infos.appendChild(h1);
    infos.appendChild(types);

    card.appendChild(img)
    card.appendChild(infos);

    main.appendChild(card);
}

