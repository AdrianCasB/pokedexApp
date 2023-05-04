import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from 'src/app/Pokemon/interfaces/pokemon.interface';
import { PokemonService } from '../../../services/pokemon.service';
import { PageEvent } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';

@Component({
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  
  pokemons: Pokemon[] = [];
  hayPokemons: boolean = false;
  length = 1500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50];
  pokemonImages: Object[] = [];
  pageEvent!: PageEvent;
  

  constructor(private pokeService: PokemonService) { }

  ngOnInit(): void {

    this.pokeService.getPokemons().then(pokemons => {
      this.pokemons = pokemons;
      this.hayPokemons = true;
      this.pageSize = this.pokeService.limit;


      //Change the type color
      console.log();
      

      //Images and types from pokemon

      this.pokemons.forEach((n, i) => {
        const url = pokemons[i].url;
        this.pokeService.getPokeImages(url).then(pokemon => {
          this.pokemons[i].img = pokemon.sprites.other?.['official-artwork'].front_default || 'No image found';
          this.pokemons[i].type = pokemon.types[0].type.name;
          this.pokemons[i].id = url.split('/').filter(e => e).slice(-1)[0];
        })
      })

    }).catch(error => {
      console.log(error);
      this.hayPokemons = false;
    })


  }

  
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    const options = {
      params: new HttpParams()
        .set('limit', this.pageSize)
        .set('offset', this.pageSize * this.pageIndex)
    }
    this.pokeService.newOptions = options;

    this.pokeService.getPokemons().then(pokemons => {
      this.pokemons = pokemons;
      this.hayPokemons = true;
      this.pageSize = this.pokeService.limit;

      //Image and types from pokemon

      this.pokemons.forEach((n, i) => {
        const url = pokemons[i].url;
        this.pokeService.getPokeImages(url).then(pokemon => {
          pokemons[i].img = pokemon.sprites.other?.['official-artwork'].front_default || 'No image found';
          this.pokemons[i].type = pokemon.types[0].type.name;
          this.pokemons[i].id = url.split('/').filter(e => e).slice(-1)[0];
        })
      })


    }).catch(error => {
      console.log(error);
      this.hayPokemons = false;
    })
  }

  getPokemon(index: number) {
    console.log(index);
  }




}
