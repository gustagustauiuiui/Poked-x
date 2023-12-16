const pokemons = [];

async function getPokemon(name) {
    const results = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);

    return results.json();
}

async function getPokemons(limit){
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0.`);

    return result.json();
}

function storePokemon(name){

    getPokemon(name).then(pokemon => {
        pokemons.push({
            id: pokemon.id,
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            sprite: pokemon.sprites.other['official-artwork'].front_default,
            abilities: pokemon.abilities.map(a => {
                return {ability: {name:  a.ability.name}}
            }),
            types: pokemon.types.map((t) => {
                return {type: t.type.name};
            }),
        });
        
    }).catch((error) => console.log(error));
}

function consultPokemons(qtd){

    getPokemons(qtd).then(pokemons => {
        const resultados = pokemons.results;
        
        for(let p of resultados){
            storePokemon(p.name)
        }
    }).catch((error) => console.log("erro: "+error));
    
    console.log(pokemons);
}

consultPokemons(3);