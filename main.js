const baseURL = "https://pokeapi.co/api/v2/pokemon/"
const pokemon = document.getElementById("pokeName")
const buttonSearch = document.getElementById("searchPokemon")
const buttonremove = document.getElementById("borrarPokemon")
const appNode = document.getElementById("app")



buttonSearch.addEventListener("click", insertarPokemon )
buttonremove.addEventListener("click", borrarPokemon )

function insertarPokemon(){
    window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`)
    .then(response =>{
        if(response.status === 404){
            alert("Este pokemon no esta disponible")
        }else{
            return response.json()
            // .then((json) => console.log(json));
        }
    })
    .then(responseJSON =>{
        const allItems = []
        const result = []

        for(let pokemonInfo in responseJSON){
           result.push([pokemonInfo, responseJSON[pokemonInfo]]) 
        }
        console.table(result)

        const pokeImagen = document.createElement('img')
        pokeImagen.src = result[14][1].front_default

        const pokeImagenDos = document.createElement('img')
        pokeImagenDos.src = result[14][1].back_shiny

        const pokemonName = document.createElement('h2')
        pokemonName.innerText = `Nombre: ${result[10][1]}   id: ${result[6][1]}`

        const pokemonType = document.createElement('h3')
        pokemonType.innerText = `Tipo: ${result[16][1][0].type.name}`

        const pokemonAbilities = document.createElement('h4')
        pokemonAbilities.innerText = `Habilidades:   ${result[0][1][0].ability.name}  │ ${result[0][1][1].ability.name}  `

        const pokemonExperience = document.createElement('h4')
        pokemonExperience.innerText = `Experiencia: ${result[1][1]}`


        const contenedor = document.createElement('section')
        contenedor.append(pokeImagen, pokeImagenDos, pokemonName, pokemonType, pokemonAbilities, pokemonExperience)

        allItems.push (contenedor)
        appNode.append(...allItems)
    })
}

function borrarPokemon(){
    let allPokemons = appNode.childNodes
    allPokemons = Array.from(allPokemons)

    allPokemons.forEach(pokemon => {
        pokemon.remove(pokemon)
    })
}
