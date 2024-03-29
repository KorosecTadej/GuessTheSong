import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GameSettingsComponent } from './components/game-settings/game-settings.component';
import { GameComponent } from './components/game/game.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ScoreBoardComponent } from './components/score-board/score-board.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { UnauthGuard } from './guards/auth/unauth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UnauthGuard],
  },
  { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: '', component: AppComponent, canActivate: [AuthGuard] },
  {
    path: 'home-page/game-settings',
    component: GameSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home-page/game-settings/game',
    component: GameComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home-page/game-settings/game/score-board',
    component: ScoreBoardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
