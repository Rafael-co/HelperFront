import { TokenDecodificado } from './../models/token-decodificado';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import  {  JwtHelperService  }  from  "@auth0/angular-jwt"

@Injectable({
  providedIn: 'root'
})
export class LimitadorClienteGuard implements CanActivateChild {
  constructor(private router:Router,
    
   
  ){

  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const jwtService = new JwtHelperService();
      const tokenLogado:string = localStorage.getItem("token") as string
      const decodedToken:TokenDecodificado = jwtService.decodeToken(tokenLogado);
      if(decodedToken.perfil == "ROLE_FUNCIONARIO" || decodedToken.perfil == "ROLE_ADMIN"){
        return true
      }else{
        alert("Não autoriado para clientes")
        this.router.navigate(["/home"])
        return false
      }
      


      ;
  }
  
}
