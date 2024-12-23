import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, output, Output, input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  searchValue = input<string>('initial....');
  searchBottonClicked = output();
  searchValueChange = output<string>();

  searchClique() {
    this.searchBottonClicked.emit();
  }

  updateSearch(event:string) {
    this.searchValueChange.emit(event);
  }

}
