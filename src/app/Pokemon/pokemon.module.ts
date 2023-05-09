import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokeCardComponent } from './components/poke-card/poke-card.component';
import { PokedexComponent } from './pages/Pokedex/pokedex/pokedex.component';
import { MaterialModule } from '../material/material.module';
import { TypeCardComponent } from './components/type-card/type-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PokemonInfoComponent } from './pages/pokemon-info/pokemon-info.component';
import { FilterSearchComponent } from '../filter-search/filter-search.component';



@NgModule({
  declarations: [
    PokeCardComponent,
    PokedexComponent,
    TypeCardComponent,
    SearchBarComponent,
    PokemonInfoComponent,
    FilterSearchComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    MaterialModule
  ]
})
export class PokemonModule { }
