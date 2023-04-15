import { Component } from '@angular/core';
import { PokemonBasic, PokemonService } from 'src/app/services/pokemon.service';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { skipWhile, tap } from 'rxjs';

@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})
export class PokemonlistComponent {
 
  fetching = true; //to get the status

pokemonsdata$ = this.pokemon_service.pokemonsdata$.pipe(
 tap((x) => { this.fetching = false }),
 skipWhile((x) => x.length == 0)
 );

constructor(private pokemon_service: PokemonService) {}



 ngOnInit(): void {}



/*
* on scrolling
*/
 onScrolling(event: any) {
 if(!this.fetching){
 this.pokemon_service.getNextPokemonList();
 }
 }

}

