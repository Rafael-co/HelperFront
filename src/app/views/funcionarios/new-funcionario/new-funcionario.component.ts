import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Funcionario } from './../../../models/funcionario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, HostBinding, OnInit, Type } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-new-funcionario',
  templateUrl: './new-funcionario.component.html',
  styleUrls: ['./new-funcionario.component.css']
})
export class NewFuncionarioComponent implements OnInit {
  novoFunc: FormGroup;
  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    public notificationService: NotificationService,
    public Router: Router

  ) {
    this.novoFunc = fb.group({
      nome: ['', [Validators.maxLength(150), Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.required]],
      cpf: ['', [Validators.maxLength(11), Validators.required, Validators.minLength(11)]],
      senha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      foto: [''],
      idCargo: ['', [Validators.required]],



    })
  }
  public novoFuncionario() {
    if (this.novoFunc.valid) {
      const funcionarioNovo: Funcionario = this.novoFunc.value
      this.funcionarioService.novoFuncionario(funcionarioNovo).subscribe(
        resposta => {
          this.notificationService.showSuccess("Funcionario cadastrado com sucesso", "OK")
          this.Router.navigate(["/funcionarios"])

        }
      )

    } else {
      this.notificationService.showError("Dados inválidos.", "Erro :(");
    }
  }
  ngOnInit(): void {
  }

  @HostBinding('class')
  get themeMode() {
    return AppComponent.isDark ? 'theme-dark' : 'theme-light'
  }

  switchMode(isDarkMode: boolean) {
    AppComponent.isDark = isDarkMode;
  }

}
