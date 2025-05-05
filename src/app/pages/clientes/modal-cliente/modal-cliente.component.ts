import { Component, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgFor, NgForOf } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-modal-cliente',
  imports: [NgxSpinnerModule, ReactiveFormsModule, NgxCurrencyDirective],
  templateUrl: './modal-cliente.component.html',
  styleUrl: './modal-cliente.component.scss',
  providers: [UserService],
})
export class ModalClienteComponent implements OnInit {
    activeModal = inject(NgbActiveModal);
    
    @Input() id: any = 0;
    form: FormGroup;
  
  loading:boolean = false;
  totalSize:number = 0;

  constructor(
    private _toastr: ToastrService,
    private _formBuilder: FormBuilder, 
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.buildForm();
    this.loadData();
  }

  loadData()
  {
    this.loading = true;
    this.userService.getById(this.id)
    .subscribe((result: any) => {
     this.form.patchValue(result);
    },
    (err:any) => {
      this._toastr.error(err);
    });
}

  buildForm() {
    this.form = this._formBuilder.group({
    name: ['', [Validators.required]],
    salary: ['', [Validators.required]],
    companyValuation: ['', [Validators.required]],
    });
  }

  saveUser()
  {
    let data = this.form.getRawValue();
    this.loading = true;
    this.userService.saveUser(data)
    .subscribe((result: any) => {
        this._toastr.success('Item salvo com sucesso');
        this.activeModal.close();
    },
    (err:any) => {
      this._toastr.error(err);
    });
}

updateUser()
{
  let data = this.form.getRawValue();
  this.loading = true;
  this.userService.updateUser(this.id, data)
  .subscribe((result: any) => {
      this._toastr.success('Item atualizado com sucesso');
      this.activeModal.close();
  },
  (err:any) => {
    this._toastr.error(err);
  });
}

submitItem()
{
    if(this.id)
    {
        this.updateUser();
    }
    else{
        this.saveUser();
    }
}
}
