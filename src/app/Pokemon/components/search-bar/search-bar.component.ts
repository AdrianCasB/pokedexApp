import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { UniquePokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  @Output() eventEmitter : EventEmitter<UniquePokemon> = new EventEmitter<UniquePokemon>();

  constructor(private pokeService : PokemonService){}

  buscarPokemon(event: any): void {
    const inputValue = event.target.value.toLowerCase();
    event.target.value = '';
    this.pokeService.getPokemonByName(inputValue)
    .then( pokemon => {
      this.pokeService.pokemonAvailable = true;
      this.eventEmitter.emit(pokemon);
    }).catch( () => {
      this.eventEmitter.emit(undefined);
      this.pokeService.isPokemon = false;
    })
  }

}
