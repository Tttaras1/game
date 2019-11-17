import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NAVIGATE } from './app.config';


const routes: Routes = [
	{ path: '', redirectTo: `/${NAVIGATE.HOME}`, pathMatch: 'full' },
	{
        path: NAVIGATE.HOME,
        loadChildren: './features/home/home.module#HomeModule',
	},
	{
        path: NAVIGATE.GAME,
        loadChildren: './features/game/game.module#GameModule',
    },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
