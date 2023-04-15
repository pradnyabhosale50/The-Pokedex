import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


  const routes: Routes = [
    {
      path: '',
      redirectTo: 'pokemon/poke-list',
      pathMatch: 'full',
    },
    {
      path: "pokemon",
      loadChildren: () =>
        import("./pokemon/pokemon.module").then((m) => m.PokemonModule),
    },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }