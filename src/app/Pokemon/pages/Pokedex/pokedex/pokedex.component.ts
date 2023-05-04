import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/Pokemon/interfaces/pokemon.interface';
import { PokemonService } from '../../../services/pokemon.service';
import { PageEvent } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';

@Component({
  templateUrl: './pokedex.component.html',
  styles: [
    `
    mat-paginator{
    margin-left: 400px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    width: 1000px
    }
    `
  ]
})
export class PokedexComponent implements OnInit {

  pokemons: Pokemon[] = [];
  hayPokemons: boolean = false;
  length = 1500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50];
  pokemonImages: Object [] = [];
  pageEvent!: PageEvent;

  constructor(private pokeService: PokemonService) { }
  
  ngOnInit(): void {
    
    this.pokeService.getPokemons().then(pokemons => {
      this.pokemons = pokemons;
      this.hayPokemons = true;
      this.pageSize = this.pokeService.limit;
      
      //Obtengo la imagen del pokemon
      
    this.pokemons.forEach((n,i)=> {
        const url = pokemons[i].url;
        this.pokeService.getPokeImages(url).then(pokemon => {
        pokemons[i].img =  pokemon.sprites.other?.['official-artwork'].front_default || 'No image found';
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
        .set('limit',this.pageSize)
        .set('offset',this.pageSize * this.pageIndex)
    }
    this.pokeService.newOptions = options;

    this.pokeService.getPokemons().then(pokemons => {
      this.pokemons = pokemons;
      this.hayPokemons = true;
      this.pageSize = this.pokeService.limit;

      //Obtengo la imagen del pokemon
      
      this.pokemons.forEach((n,i)=> {
        const url = pokemons[i].url;
        this.pokeService.getPokeImages(url).then(pokemon => {
        pokemons[i].img =  pokemon.sprites.other?.['official-artwork'].front_default || 'No image found';
        })
      })

      
    }).catch(error => {
      console.log(error);
      this.hayPokemons = false;
    })
  }

  getPokemon(index : number){
    console.log(index);
  }
  

  

}
