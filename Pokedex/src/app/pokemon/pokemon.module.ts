import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonlistComponent } from './pokemonlist/pokemonlist.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
@NgModule({
  declarations: [
    PokemonlistComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    PokemonRoutingModule,
    MatSnackBarModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule
  ]
})
export class PokemonModule { }
