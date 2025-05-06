import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/user/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioNaoAutenticadoGuard implements CanActivate{
    constructor(
      private usuarioService: UsuarioService,
      private router: Router) { }
    canActivate(){
      if (this.usuarioService.obterUsuarioLogado) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
}