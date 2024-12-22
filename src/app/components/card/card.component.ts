import { Component, Input } from '@angular/core';
import { Monster } from '../../models/monster.model';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() monster = Monster = new Monster();

}
