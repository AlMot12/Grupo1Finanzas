import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente.model';

const ELEMENT_DATA: Cliente[] = [
  {id: 1, name: 'Hydrogen', lastname: "aaa", email: 'H',password:"aaaa", DNI:11, Phone:1},]


@Component({
  selector: 'app-home3',
  templateUrl: './home3.component.html',
  styleUrls: ['./home3.component.scss']
})

export class Home3Component {
  displayedColumns: string[] = ['id', 'name', 'lastname', 'email','password','DNI'];
  dataSource = ELEMENT_DATA;
}
