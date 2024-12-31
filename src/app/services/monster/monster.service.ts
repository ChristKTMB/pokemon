import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterType } from '../../utils/monster.utils';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  monsters: Monster[] = [];
  currentIndex: number = 1; 

  constructor() {
    this.load();
  }

  /**
   * Vérifie si le stockage local est disponible et fonctionnel.
   * 
   * Cette méthode tente de définir et de supprimer un élément dans le stockage local 
   * pour déterminer si le stockage local est accessible et opérationnel. Si une erreur 
   * se produit pendant ce processus, elle conclut que le stockage local n'est pas disponible.
   * 
   * @returns {boolean} `true` si le stockage local est disponible, sinon `false`.
   */
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }
  
  private save() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('monsters', JSON.stringify(this.monsters));
    }
  }
  
  private load() {
    if (this.isLocalStorageAvailable()) {
      const monsterData = localStorage.getItem('monsters');
      
      if (monsterData) {
        this.monsters = JSON.parse(monsterData).map((monsterJSON: any) => 
          Object.assign(new Monster(), monsterJSON)
        );
        this.currentIndex = Math.max(...this.monsters.map(monster => monster.id));
      } else {
        this.init();
        this.save();
      }
    } else {
      this.init(); // Charger des données par défaut si localStorage n'est pas disponible
    }
  }
  
  private init() {

    this.monsters = [];

    const monster1 = new Monster();
    monster1.id = this.currentIndex++;
    monster1.name = 'Godzilla';
    monster1.hp = 100;
    monster1.figureCaption = 'No002 Gozilla';
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.id = this.currentIndex++;
    monster2.name = 'King Kong';
    monster2.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGiM7hg62xiEIRLeqg_Tr3T0SY4WzZCsYsOw&s";
    monster2.type = MonsterType.DRAGON;
    monster2.hp = 90;
    monster2.figureCaption = 'No003 King Kong';
    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.id = this.currentIndex++;
    monster3.name = 'Mothra';
    monster3.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPwRKia8ypCppi_FghhnODBjDsoRxxBQuOfw&s";
    monster3.type = MonsterType.ELECTRIC;
    monster3.hp = 80;
    monster3.figureCaption = 'No004 Mothra';
    this.monsters.push(monster3);

    const monster4 = new Monster();
    monster4.id = this.currentIndex++;
    monster4.name = 'Gamera';
    monster4.image = "https://images.app.goo.gl/pzhEsRqUJZRLFGGV7";
    monster4.type = MonsterType.FIRE;
    monster4.hp = 70;
    monster4.figureCaption = 'No005 Gamera';
    this.monsters.push(monster4);
  }

  getAll(): Monster[] {
    return this.monsters.map(monster => monster.copy());
  }

  getById(id: number): Monster | undefined{
    const monster = this.monsters.find(monster => monster.id === id);
    return monster ? monster.copy() : undefined;
  }

  add(monster: Monster): Monster {
    const monsterCopy = monster.copy();

    monsterCopy.id = this.currentIndex;
    this.monsters.push(monsterCopy.copy());
    this.currentIndex++;
    this.save();

    return monsterCopy;
  }

  update(monster: Monster): Monster{
    const monsterCopy = monster.copy();
    
    const monsterIndex = this.monsters.findIndex(originalMonster => originalMonster.id === monster.id);
    if (monsterIndex != -1 ) {
      this.monsters[monsterIndex] = monsterCopy.copy();
      this.save();
    }

    return monsterCopy;
  }

  delete (id: number) {
    const monsterIndex =  this.monsters.findIndex(originalMonster => originalMonster.id === id);
    if (monsterIndex != -1) {
      this.monsters.splice(monsterIndex, 1)
      this.save();
    }
  }
}
