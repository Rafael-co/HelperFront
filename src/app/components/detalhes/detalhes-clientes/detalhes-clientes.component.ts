import { Cliente } from 'src/app/models/cliente';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalhes-clientes',
  templateUrl: './detalhes-clientes.component.html',
  styleUrls: ['./detalhes-clientes.component.css']
})
export class DetalhesClientesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public cliente: Cliente) { }

  ngOnInit(): void {
  }

}
