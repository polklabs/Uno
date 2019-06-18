import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameShellComponent } from './game/containers/game-shell/game-shell.component';
import { NewGameComponent } from './new-game/new-game.component';
import { EndGameComponent } from './end-game/end-game.component';
import { RulesComponent } from './rules/rules.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'newGame', component: NewGameComponent},
  {path: 'game', component: GameShellComponent},
  {path: 'end', component: EndGameComponent},
  {path: 'rules', component: RulesComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
