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
  templateUrl: './modal-excluir.component.html',
  styleUrl: './modal-excluir.component.scss',
  providers: [UserService],
})
export class ModalExcluirComponent implements OnInit {
    activeModal = inject(NgbActiveModal);
    
    @Input() id: any = 0;

  constructor(
    private spinner: NgxSpinnerService,
    private _toastr: ToastrService,
    private userService: UserService) {

  }

  ngOnInit(): void {
  }

deleteUser()
{
  this.spinner.show();
  this.userService.deleteUser(this.id)
  .subscribe((result: any) => {
      this._toastr.success('Item excluido com sucesso');
      this.activeModal.close();
  },
  (response:any) => {
    this._toastr.error(response.message);
  }).add(() => {
    this.spinner.hide();
});
}

submitItem()
{
    this.deleteUser();
}
}
