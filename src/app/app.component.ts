import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { Monster } from './models/monster.model';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';
import { MonsterService } from './services/monster/monster.service';

@Component({
  selector: 'app-root',
  imports: [ CardComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  monsterService = inject(MonsterService);

  monsters! : Monster[];
  count : number = 0;
  search = model<string>('');

  filteredMonsters = computed(() => {
    return this.monsters.filter(monster => monster.name.includes(this.search()));
  });
  
  constructor() {
    this.monsters = this.monsterService.getAll();
  }

  increaseCount() {
    this.count++;
  }

}
