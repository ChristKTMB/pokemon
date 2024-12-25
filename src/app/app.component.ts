import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { Monster } from './models/monster.model';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MonsterType } from './utils/monster.utils';

@Component({
  selector: 'app-root',
  imports: [CardComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  monsters! : Monster[];
  count : number = 0;
  search: string = '';
  selectedMonsterIndex = signal(0);

	selectedMonster = computed(() => {
 		return this.monsters[this.selectedMonsterIndex()];
 	});

  constructor() {
    effect(() => {
      console.log('Monster changed', this.selectedMonster());
    });

    this.monsters = [];

    const monster1 = new Monster();
    monster1.name = 'Godzilla';
    monster1.hp = 100;
    monster1.figureCaption = 'No002 Gozilla';
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.name = 'King Kong';
    monster2.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGiM7hg62xiEIRLeqg_Tr3T0SY4WzZCsYsOw&s";
    monster2.type = MonsterType.DRAGON;
    monster2.hp = 90;
    monster2.figureCaption = 'No003 King Kong';
    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.name = 'Mothra';
    monster3.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPwRKia8ypCppi_FghhnODBjDsoRxxBQuOfw&s";
    monster3.type = MonsterType.ELECTRIC;
    monster3.hp = 80;
    monster3.figureCaption = 'No004 Mothra';
    this.monsters.push(monster3);
  }

  increaseCount() {
    this.count++;
  }

  toggleMonster() {
    this.selectedMonsterIndex.set((this.selectedMonsterIndex() + 1) % this.monsters.length);
  }

}
