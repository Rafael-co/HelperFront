import { MatDialog } from '@angular/material/dialog';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from './../../../services/cliente.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { AppComponent } from 'src/app/app.component';
import { DetalhesClientesComponent } from 'src/app/components/detalhes/detalhes-clientes/detalhes-clientes.component';

const ELEMENT_DATA: Cliente[] = [];

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'cpf',
    'email',
    'telefone',
    'editar',
    'excluir',
    'detalhes'
  ];
  // dataSource: Cliente[] = [];
  dataSource = new MatTableDataSource(ELEMENT_DATA)

  constructor(
    private clienteService: ClienteService,
    private notifyService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.iniciarTabelaCliente();
  }

  private iniciarTabelaCliente(): void {
    this.clienteService.buscarTodosClientes().subscribe((clientes) => {
      this.dataSource = new MatTableDataSource(clientes);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public delete(id: number): void {
    let ok = confirm('Tem certeza que deseja excluir?');
    if (ok) {
      this.clienteService.deletarcliente(id).subscribe(() => {
        this.notifyService.showSuccess('Cliente excluido.', 'Sucesso :)');
        this.iniciarTabelaCliente();
      });
    }
  }

  @HostBinding('class')
  get themeMode() {
    return AppComponent.isDark? 'theme-dark' : 'theme-light'
  }

  switchMode(isDarkMode: boolean) {
    AppComponent.isDark = isDarkMode;
  }

  public openDetails(chamado: Cliente): void{
    this.dialog.open(DetalhesClientesComponent, {
      width: "400px",
      data: chamado
    });
  }

}
