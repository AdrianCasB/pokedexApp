import { Component, EventEmitter, Output } from '@angular/core';
import { Pokemon } from '../Pokemon/interfaces/pokemon.interface';
import { Pokemones } from '../Pokemon/interfaces/type.interface';
import { PokemonService } from '../Pokemon/services/pokemon.service';


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

    
    this.pokemonList = [];
    this.pokeService.getPokemonsByType(type)
      .then( resp => {
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
            pokemon: result
          });
        });
      });
    });

    this.eventEmitter.emit(this.pokemonList);
    this.pokeService.pokemonsByFilter = this.pokemonList;
  }
}
