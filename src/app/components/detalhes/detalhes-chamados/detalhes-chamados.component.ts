import { Chamado } from './../../../models/chamado';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalhes-chamados',
  templateUrl: './detalhes-chamados.component.html',
  styleUrls: ['./detalhes-chamados.component.css']
})
export class DetalhesChamadosComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public chamado: Chamado) { }

  ngOnInit(): void {
  }

}
