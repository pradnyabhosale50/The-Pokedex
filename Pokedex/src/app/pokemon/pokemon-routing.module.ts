import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonlistComponent } from './pokemonlist/pokemonlist.component';

const routes: Routes = [
  {
    path: "poke-list",
    component: PokemonlistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
