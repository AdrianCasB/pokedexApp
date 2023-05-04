import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';
import { Pokemon, Pokemons, UniquePokemon } from '../interfaces/pokemon.interface';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokeImages: string[] = [];
  baseUrl: string = environment.apiUrl;
  param: string = 'pokemon';
  limit: number = 0;
  options = {
    params: new HttpParams()
      .set('limit', 10)
      .set('offset', 0)
  }

  constructor(private httpClient: HttpClient) { }


  set newOptions(options: { params: HttpParams }) {
    this.options = options;
  }



  async getPokemons(): Promise<Pokemon[]> {

    try {
      const { results } = await lastValueFrom(this.httpClient.get<Pokemons>(this.baseUrl + this.param, this.options));
      this.limit = +this.options.params.get('limit')!;
      return results;
    } catch (error) {
      throw new Error('No Pokemons found')
    }

  }


  async getPokeImages(url: string): Promise<UniquePokemon> {

    try {
      const result = await lastValueFrom(this.httpClient.get<UniquePokemon>(url))
      return result;
    } catch (error) {
      console.error('Error on image reception')
      throw new Error('No images found')
    }


  }
}
