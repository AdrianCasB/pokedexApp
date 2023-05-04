import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokeCardComponent } from './components/poke-card/poke-card.component';
import { PokedexComponent } from './pages/Pokedex/pokedex/pokedex.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    PokeCardComponent,
    PokedexComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    MaterialModule
  ]
})
export class PokemonModule { }
