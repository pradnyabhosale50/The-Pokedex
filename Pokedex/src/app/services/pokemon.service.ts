import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import {BreakpointObserver,
 Breakpoints,
 BreakpointState,
} from '@angular/cdk/layout';


export interface PokemonBasic {
 id: number;
 name: string;
 sprites: PokeImage;
 stats: PokeState[];
 types: PokeType[];
}

export interface State {
  name: string;
 url: string;
 }
 
 
 
 
 export interface PokeState {
  state: State;
 }
 
 
 
 
 export interface PokeType2 {
  name: string;
  url: string;
 }
 
 
 
 
 export interface PokeType {
  type: PokeType2;
 }
 
 
 
 
 
 export interface PokeImage {
  front_shiny: string;
 }
 
 export interface PokemonApiResponse {
  count: number;
  next: string;
  previous?: any;
  results: PokemonApiResponseResult[];
 
 }
 
 export interface PokemonApiResponseResult {
  name: string;
  url: string;
 
 }
 
 export interface ParsedPokemonApiResponse {
  id: string;
  name: string;
  url: string;
 }
 

@Injectable({
 providedIn: 'root'

})

export class PokemonService {

  //extract the base url from environment file
  baseUrl = environment.config.API_URL;

  //setting default limit
  defaultLimit =10;

  //global varible declaration
  api_url : any;
  count = 0;

  //obervable declartion
 pokemonsdata$ = new BehaviorSubject<PokemonBasic[]>([]);


 constructor(
 private httpclient: HttpClient,
 private breakpoints: BreakpointObserver //react to screen-size changes.
 ) {
    this.breakpoints.observe([  Breakpoints.Large, Breakpoints.XLarge, Breakpoints.TabletPortrait, Breakpoints.Handset]).pipe(take(1))
    .subscribe((x) => {
    this.defaultLimit = this.setLimit(x);
    this.api_url = `${this.baseUrl}/v2/pokemon?offset=0&limit=${this.defaultLimit}`;
    this.getNextPokemonList(); //next slot calling
    });

 }



/*
* setting limit for scroll
*/
setLimit(state: BreakpointState) {
if (state.breakpoints[Breakpoints.XLarge]) return 100;
 if (state.breakpoints[Breakpoints.Large]) return 100;
 if (!(state.breakpoints[Breakpoints.Handset] ||state.breakpoints[Breakpoints.TabletPortrait]))
      return 20;
    return 10;
 }



/*
* fetch pokemon list using ternary
*/
getPokemons() {
 return this.api_url ? this.httpclient.get<PokemonApiResponse>(this.api_url).pipe(
 tap((pokemon) => {
 this.api_url = pokemon.next;
 this.count = pokemon.count;
 }),switchMap((x) => this.getPokemonDetail(x.results))): of([]);

 }


/*
* next on scroll
*/

 getNextPokemonList(): void {
 this.getPokemons().subscribe((pokemon) =>
 this.pokemonsdata$.next(this.pokemonsdata$.value.concat(pokemon))
 );
 }

/*
* get pokemon type using previous Url
*/
getPokemonDetail(
 pokemons: PokemonApiResponseResult[]
 ): Observable<PokemonBasic[]> {
 return combineLatest(
 pokemons.map((x) => this.httpclient.get<PokemonBasic>(x.url))
 );
 }
}

