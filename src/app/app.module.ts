import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { GameShellComponent, DialogColor } from './game/containers/game-shell/game-shell.component';
import { CardComponent } from './game/components/card/card.component';
import { GameBoardComponent } from './game/components/game-board/game-board.component';
import { NewGameComponent } from './new-game/new-game.component';
import { CoreModule } from './core/core.module';
import { EndGameComponent } from './end-game/end-game.component';
import { RulesComponent } from './rules/rules.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    GameShellComponent,
    CardComponent,
    GameBoardComponent,
    NewGameComponent,
    DialogColor,
    EndGameComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogColor]
})
export class AppModule { }
