import { NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/user/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

    formLogin: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private router: Router,
                private usuarioService: UsuarioService) { }
    ngOnInit(): void {
      this.criarForm();
    }

    criarForm(){
        this.formLogin = this.formBuilder.group({
          nome: ['', [Validators.required]]
        });
      }
      logar(){
        if(this.formLogin.invalid) return;
        var usuario = this.formLogin.getRawValue().nome;
        this.usuarioService.logar(usuario);
        this.router.navigate(['']);
      }
}
