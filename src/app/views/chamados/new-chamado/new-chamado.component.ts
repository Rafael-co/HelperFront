import { Router } from '@angular/router';
import { Chamado } from './../../../models/chamado';
import { ChamadoService } from './../../../services/chamado.service';
import { ClienteService } from './../../../services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-new-chamado',
  templateUrl: './new-chamado.component.html',
  styleUrls: ['./new-chamado.component.css']
})
export class NewChamadoComponent implements OnInit {

  public formChamado: FormGroup;

  public clientes: Cliente[] = [];

  constructor(
    formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private chamadoService: ChamadoService,
    private router: Router,
    private notifyService: NotificationService
  ) {
    this.formChamado = formBuilder.group({
      titulo: ["", [Validators.required]],
      descricao: ["", [Validators.required]],
      cliente: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.iniciarCamposCliente();
  }

  private iniciarCamposCliente(): void {
    this.clienteService.buscarTodosClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  public novoChamado(): void {
    if(this.formChamado.valid) {
      const chamado: Chamado = this.formChamado.value;
      this.chamadoService.novoChamado(chamado).subscribe(() => {
        this.notifyService.showSuccess("Chamado cadastrado.", "Sucesso :)");
        this.router.navigate(["/chamados"]);
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
