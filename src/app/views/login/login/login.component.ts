import { Credenciais } from './../../../models/credenciais';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notifyService: NotificationService
  ) {
    this.formLogin = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public entrar(): void {
    if (this.formLogin.valid) {
      // PROCESSO DE AUTENTICAR
      const credenciais: Credenciais = this.formLogin.value;
      this.authService. identificador(credenciais).subscribe(response => {
        this.notifyService.showSuccess("Bem-Vindo(a)!", "Logado com Sucesso :)")
        this.router.navigate(["/home"]);
      });
    }
    else {
      this.notifyService.showError("Dados inválidos.", "Erro :(");
    }
  }
}
