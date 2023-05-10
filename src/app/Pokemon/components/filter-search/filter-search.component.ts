import { Component, EventEmitter, Output } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { Pokemones } from '../../interfaces/type.interface';
import { PokemonService } from '../../services/pokemon.service';


@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.css']
})
export class FilterSearchComponent {

  @Output() eventEmitter : EventEmitter<Pokemon[]> = new EventEmitter<Pokemon[]>();


  pokemons !: Pokemones[]; 
  pokemonList: Pokemon[] = [];
  types = ['All','normal','fighting','flying','poison','ground','rock','bug','ghost','steel','fire','water','grass','electric','psychic','ice','dragon','dark','fairy'];

  constructor(private pokeService : PokemonService){}

  searchPokemonsByType(type: string):void{

    if(type.toLowerCase() === 'all') {
      this.pokeService.isFilterEnable = false;
      this.pokeService.getPokemons().then(pokemons => {
        this.pokemonList = [];
        this.pokemonList = pokemons;
        this.pokeService.isPokemon = true;
  
  
        //Images and types from pokemon
  
        this.pokemonList.forEach((n, i) => {
          const url = this.pokemonList[i].url;
          this.pokeService.getPokeImages(url).then(pokemon => {
            this.pokemonList[i].img = pokemon.sprites.other?.['official-artwork'].front_default || 'No image found';
            this.pokemonList[i].type = pokemon.types[0].type.name;
            this.pokemonList[i].id = url.split('/').filter(e => e).slice(-1)[0];
          })
        })

        this.eventEmitter.emit(this.pokemonList);
  
      }).catch(error => {
        console.log(error);
        this.pokeService.isPokemon = false;
      });


    }else{
      this.pokeService.isFilterEnable = true;
      this.pokeService.getPokemonsByType(type)
      .then( resp => {
          this.pokemonList = [];
          this.pokemons = [];
          this.pokemons = resp;
          this.pokemons.forEach(pokemon => {
            const url = pokemon.pokemon.url;
            this.pokeService.getPokeImages(url)
          .then(result => {
            this.pokemonList.push({
              id: url.split('/').filter(e => e).slice(-1)[0],
              type : result.types[0].type.name,
              img : result.sprites.other?.['official-artwork'].front_default || 'No image found',
              name: result.name,
              url,
              pokemon: result,
            });
          });
        });
        this.eventEmitter.emit(this.pokemonList);
        this.pokeService.pokemonsByFilter = this.pokemonList;
      });
  
    }

    }




}
