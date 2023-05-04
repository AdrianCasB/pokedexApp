import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pages/Pokedex/pokedex/pokedex.component';
import { PokeCardComponent } from './components/poke-card/poke-card.component';

const routes: Routes = [
  {
    path: '',
    children: [
  { path: 'pokedex', component: PokedexComponent },
  { path: 'pokemon/:id', component: PokeCardComponent  },
  { path: '**', redirectTo : 'pokedex' },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
