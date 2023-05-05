import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pokemon, UniquePokemon } from 'src/app/Pokemon/interfaces/pokemon.interface';
import { PokemonService } from '../../../services/pokemon.service';
import { PageEvent } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';

@Component({
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  
  constructor(private pokeService: PokemonService) { }
  
  pokemons: Pokemon[] = [];
  length = 1500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50];
  pokemonImages: Object[] = [];
  pageEvent!: PageEvent;
  isPokemon = false;
  


  ngOnInit(): void {

    this.pokeService.getPokemons().then(pokemons => {
        this.pokemons = pokemons;
        this.pokeService.isPokemon = true;
        this.pageSize = this.pokeService.limit;
  
  
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
        this.pokeService.isPokemon = false;
      })
  
    
    

  }

  
  handlePageEvent(e: PageEvent) : void {

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
        this.pokeService.isPokemon = true;
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
        this.pokeService.isPokemon = false;
      })
    
  }


  eventReceiver(pokemon: UniquePokemon) : void{

    if(pokemon === undefined){
      
        this.pokeService.getPokemons().then(pokemons => {
        this.pokemons = pokemons;
        this.isPokemon = false;
        this.pageSize = this.pokeService.limit;
  
  
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
        this.pokeService.isPokemon = false;
      })

    
    }else{
      this.isPokemon = true;
      this.pokemons.splice(1,this.pokemons.length-1);
      this.pokemons[0].id = pokemon.id.toString();
      this.pokemons[0].name = pokemon.name;
      this.pokemons[0].type = pokemon.types[0].type.name;
      this.pokemons[0].img = pokemon.sprites.other?.['official-artwork'].front_default || 'No image found';
  
    }
  }

  getPokemon(index: number): void {
    console.log(index);
  }




}
