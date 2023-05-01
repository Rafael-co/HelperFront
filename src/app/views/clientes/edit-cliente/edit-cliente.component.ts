import { ClienteService } from './../../../services/cliente.service';
import { Cliente } from './../../../models/cliente';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public cliente: Cliente = {
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    senha: ''
  };

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.iniciarCampos();
  }

  private iniciarCampos(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.clienteService.buscarClientePorId(id).subscribe(cliente => {
        this.cliente = cliente;
      });
    }
  }

  public editarCliente(formEdit: NgForm): void {
    if(formEdit.valid) {
      this.clienteService.editarCliente(this.cliente).subscribe(() => {
        this.notifyService.showSuccess("Cliente editado.", "Sucesso :)");
        this.router.navigate(["/clientes"]);
      });
    }
    else {
      this.notifyService.showError("Dados inválidos.", "Erro :(");
    }
  }

  @HostBinding('class')
  get themeMode() {
    return AppComponent.isDark? 'theme-dark' : 'theme-light'
  }

  switchMode(isDarkMode: boolean) {
    AppComponent.isDark = isDarkMode;
  }
}
