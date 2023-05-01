import { catchError, delay } from 'rxjs/operators';
import { API_CONFIG } from './../config/api.config';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chamado } from '../models/chamado';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(
    private http: HttpClient,
    private notifyService: NotificationService
    ) { }

  public buscarTodosChamados(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`).pipe(
        catchError(error => {
        this.notifyService.showError("Erro ao buscar dados de chamados.", "Erro :(");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public novoChamado(chamado: Chamado): Observable<Chamado> {
    const data = {
      titulo: chamado.titulo,
      descricao: chamado.descricao,
      idCliente: chamado.cliente.id
    }
    return this.http.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`, data).pipe(
      catchError(error => {
        this.notifyService.showError("Erro ao cadastrar novo chamado.", "Erro :(");
        console.error(error);
        return EMPTY;
      })
    );
  }
}
