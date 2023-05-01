import { NotificationService } from 'src/app/services/notification.service';
import { Funcionario } from './../models/funcionario';
import { catchError, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {

  constructor(private http: HttpClient,
    private notificationService:NotificationService) {
  }
  public buscarTodosFuncionarios(): Observable<Funcionario[]> {
    return this.http
      .get<Funcionario[]>(`${API_CONFIG.baseUrl}/funcionarios`)
      .pipe(
          catchError((error: any) => {
          this.notificationService.showError("Erro ao buscar funcionarios", "ERRO")
          console.error(error);
          return EMPTY;
        })
      );
  }

  public novoFuncionario(funcionario:Funcionario):Observable<Funcionario>{
    return  this.http.post<Funcionario>(`${API_CONFIG.baseUrl}/funcionarios`,funcionario).pipe(
      catchError(error =>{
        this.notificationService.showError("Erro ao cadastrar novo funcionario", "ERRO")
        console.error(error)
        return EMPTY
      })
    )
  }

}
