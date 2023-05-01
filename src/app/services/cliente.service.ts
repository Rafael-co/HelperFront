import { catchError, delay } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient,
    private notifyService: NotificationService
    ) { }

  public buscarTodosClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`).pipe(
        catchError(error => {
        this.notifyService.showError("Erro ao buscar dados de clientes", "Erro :(");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public buscarClientePorId(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`).pipe(
      catchError(error => {
        this.notifyService.showError("Erro ao buscar dados de cliente", "Erro :(");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public novoCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/clientes`, cliente).pipe(
      catchError(error => {
        this.notifyService.showError("Erro ao criar novo cliente.","Erro :(");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public deletarcliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`).pipe(
      catchError(error => {
        this.notifyService.showError("Erro ao excluir cliente.", "Erro :(");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public editarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/clientes/${cliente.id}`, cliente).pipe(
      catchError(error => {
        this.notifyService.showError("Erro ao editar cliente.", "Erro :(");
        console.error(error);
        return EMPTY;
      })
    );
  }
}
