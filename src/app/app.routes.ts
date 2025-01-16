import { Routes } from '@angular/router';
import { MonsterListComponent } from './pages/monster-list/monster-list.component';
import { MonsterComponent } from './pages/monster/monster.component';

export const routes: Routes = [{
    path: "",
    redirectTo: 'home',
    pathMatch: "full"
},{
    path: "home",
    component: MonsterListComponent
},{
    path: "monster",
    component: MonsterComponent
}];
