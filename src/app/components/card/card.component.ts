import { Component, computed, input } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterTypeProperties } from '../../utils/monster.utils';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent{
  
  	monster = input<Monster>(new Monster());
	monsterTypeIcon = computed(() => {
 		return MonsterTypeProperties[this.monster().type].imageUrl;
 	});
 	backgroundColor = computed(() => {
 		return MonsterTypeProperties[this.monster().type].color;
 	});

}
