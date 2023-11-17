import { Component } from '@angular/core';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.scss']
})
export class Home1Component {

  

  fechaactual(){
    const fecha = new Date();
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return fecha.toLocaleDateString(undefined, opciones);
  }
}
