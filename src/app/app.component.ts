import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { Monster } from './models/monster.model';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  imports: [CardComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  monster1! : Monster;
  count : number = 0;
  search: string = '';

  constructor() {
    this.monster1 = new Monster();
    this.monster1.name = 'Godzilla';
    this.monster1.hp = 100;
    this.monster1.figureCaption = 'No002 Gozilla';
  }

  increaseCount() {
    this.count++;
  }

}
