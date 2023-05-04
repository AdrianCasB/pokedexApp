import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-type-card',
  templateUrl: './type-card.component.html',
  styleUrls: ['./type-card.component.css']
})
export class TypeCardComponent {

  @Input() type = '';
  icon = '';

 ngOnChanges(changes: SimpleChanges): void {
    if(changes['type'].currentValue){
      switch (changes['type'].currentValue.toLowerCase()) {
        case 'fire':
          this.icon = 'local_fire_department'
          break;
          
        case 'bug':
          this.icon = 'bug_report'
          break;
          
        case 'normal':
          this.icon = 'star'
          break;
          
        case 'poison':
          this.icon = 'scatter_plot'
          break;
          
        case 'fairy':
          this.icon = 'spa'
          break;
          
        case 'ground':
          this.icon = 'grain'
          break;
          
        case 'rock':
          this.icon = 'terrain'
          break;
          
        case 'psychic':
          this.icon = 'gesture'
          break;
          
        case 'ghost':
          this.icon = 'radio_button_unchecked'
          break;
          
        case 'dragon':
          this.icon = 'cyclone'
          break;
          
        case 'ice':
          this.icon = 'ac_unit'
          break;
          
        case 'fighting':
          this.icon = 'sports_mma'
          break;
          
        case 'dark':
          this.icon = 'dark_mode'
          break;
          
        case 'steel':
          this.icon = 'settings'
          break;
          
        case 'electric':
          this.icon = 'bolt'
          break;
        
          default:
          this.icon = this.type
          break;
      }
    }
    

  
  }

}
