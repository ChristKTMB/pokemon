import { Component, input, Input, InputSignal } from '@angular/core';
import { Monster } from '../../models/monster.model';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  monster : InputSignal<Monster> = input(new Monster()) ;

}
