import { MatTableDataSource } from '@angular/material/table';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Funcionario } from './../../../models/funcionario';
import { Component, HostBinding, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

const ELEMENT_DATA: Funcionario[] = [];

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css'],
})
export class FuncionariosComponent implements OnInit {
  constructor(private funcionarioService: FuncionarioService) { }
  displayedColumns: string[] = [
    'id',
    'foto',
    'nome',
    'cpf',
    'email',
    'cargo',
    'editar',
    'detalhes',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA)

  ngOnInit(): void {
    this.inicializarTabela();
  }


  public inicializarTabela(): void {
    this.funcionarioService.buscarTodosFuncionarios().subscribe(funcionarios => {
      this.dataSource = new MatTableDataSource(funcionarios);
    })
  }
  AplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @HostBinding('class')
  get themeMode() {
    return AppComponent.isDark ? 'theme-dark' : 'theme-light'
  }

  switchMode(isDarkMode: boolean) {
    AppComponent.isDark = isDarkMode;
  }
}
