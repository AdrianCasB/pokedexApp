import { Component, OnInit } from '@angular/core';
import { UniquePokemon } from '../../interfaces/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './poke-card.component.html',
  styleUrls : ['./poke-card.component.css']
})
export class PokeCardComponent implements OnInit{

  pokemon !: UniquePokemon;

  constructor(private pokeService : PokemonService, private router : Router){}

  ngOnInit(): void {
    const id = this.router.url.split('/').filter(e => e).slice(-1)[0];
    this.getPokemon(id);
  }

  async getPokemon(id: string){
    this.pokemon = await this.pokeService.getPokemonByName(id);
    console.log(this.pokemon)
  }



}
