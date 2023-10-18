class PokemonHandler {
    //handles a list of pokemon and will be able to filter and other functions.

    static create(filters){
        //set of all possible ids
        //should go up to something like 1005
        var filterSet = new Set()
        for (var i = 1; i < 10; i++){
            filterSet.add(i)
        }
        //non implemented way to filter id. Crudely remove unwanted ones.
        if (filters){
        filters.prototype.forEach(f => {
            if (!filters[f]){

            }
        })
        }   
        //Make a list of pokemon. Might be worth only generating the upcoming 10 or so.
        var pokeList = []
        for (const id of filterSet){
            pokeList.push(Pokemon.create(id))
        }
        
        Promise.all(pokeList)
        return new PokemonHandler(filterSet, pokeList)
    }
    constructor(filterSet, pokeList) {
        this.idList = filterSet
        this.pokeList = pokeList
    }
    
    static async getRandom(remove=true){

    }
}

class Pokemon {
    //simply stores useful information about pokemon. Add properties as needed. Should be able to be used on match and in chat.
    static async create(name){
        //var pokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(p => {p.json()})
        var species = fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then(s => {s.json()})
        //const data = {pokemon: pokemon,species: species}

        return new Pokemon(species)
    }
    
    constructor(data) {
        //this.img = data['sprites']['other']['official-artwork']['front_default']
        this.name = data['name']
        this.id = data['id']
        //this.desc = data[]
        //this.lvl = random
    }
}
export {PokemonHandler, Pokemon};