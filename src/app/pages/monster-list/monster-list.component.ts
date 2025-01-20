import { Component, computed, inject, model, signal } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { CardComponent } from '../../components/card/card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-monster-list',
  imports: [ CardComponent, SearchBarComponent ],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {

  private monsterService = inject(MonsterService);
  private router = inject(Router);

  monsters = signal<Monster[]>([]);
  count : number = 0;
  search = model<string>('');

  filteredMonsters = computed(() => {
    return this.monsters().filter(monster => monster.name.includes(this.search()));
  });
  
  constructor() {
    this.monsters.set(this.monsterService.getAll());
  }

  increaseCount() {
    this.count++;
  }

  addMonster() {
    this.router.navigate(['/monster']);
  }

  openMonster(monster: Monster) {
    this.router.navigate(['/monster', monster.id]);
  }
}
