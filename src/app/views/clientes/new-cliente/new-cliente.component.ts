import { Router } from '@angular/router';
import { ClienteService } from './../../../services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-new-cliente',
  templateUrl: './new-cliente.component.html',
  styleUrls: ['./new-cliente.component.css']
})
export class NewClienteComponent implements OnInit {

  public formCliente: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private notifyService: NotificationService
  ) {
    this.formCliente = formBuilder.group({
      nome: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      cpf: ["", [Validators.required]],
      telefone: ["", [Validators.required]],
      senha: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  public criarNovoCliente(): void {
    console.log("Hello world")
    if (this.formCliente.valid) {
      const cliente: Cliente = this.formCliente.value;
      this.clienteService.novoCliente(cliente).subscribe(response => {
        this.notifyService.showSuccess("Cliente cadastrado com sucesso!", "Sucesso!");
        this.router.navigate(["/clientes"]);

      });
    }
    else {
      this.notifyService.showError("Dados inválidos.", "Inválido");
    }
  }

  @HostBinding('class')
  get themeMode() {
    return AppComponent.isDark ? 'theme-dark' : 'theme-light'
  }

  switchMode(isDarkMode: boolean) {
    AppComponent.isDark = isDarkMode;
  }
}
