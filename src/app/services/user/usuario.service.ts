import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
constructor(private httpClient: HttpClient,
    @Inject(DOCUMENT) private document: Document,
            private router: Router) { }



  logar(usuario: any) {
    this.document.defaultView?.localStorage.setItem('usuario', usuario);
  }

  deslogar() {
    this.document.defaultView?.localStorage.clear();
      this.router.navigate(['login']);
  }

  get obterUsuarioLogado(): any {
    return this.document.defaultView?.localStorage?.getItem('usuario')
      ? this.document.defaultView?.localStorage?.getItem('usuario')
      : null;
  }
}