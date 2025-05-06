import { Component, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
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
  
  totalSize:number = 0;

  constructor(
    private spinner: NgxSpinnerService,
    private _toastr: ToastrService,
    private _formBuilder: FormBuilder, 
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.buildForm();
    if(this.id)
    {
      this.loadData();
    }
  }

  loadData()
  {
    this.spinner.show();
    this.userService.getById(this.id)
    .subscribe((result: any) => {
     this.form.patchValue(result);
    },
    (err:any) => {
      this._toastr.error(err);
    }).add(() => {
      this.spinner.hide();
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
    this.spinner.show();
    this.userService.saveUser(data)
    .subscribe((result: any) => {
        this._toastr.success('Item salvo com sucesso');
        this.activeModal.close();
    },
    (err:any) => {
      this._toastr.error(err.error.message);
    }).add(() => {
      this.spinner.hide();
 });
}

updateUser()
{
  let data = this.form.getRawValue();
  this.spinner.show();
  this.userService.updateUser(this.id, data)
  .subscribe((result: any) => {
      this._toastr.success('Item atualizado com sucesso');
      this.activeModal.close();
  },
  (err:any) => {
    console.log(err)
    this._toastr.error(err.error.message);
  }).add(() => {
    this.spinner.hide();
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
