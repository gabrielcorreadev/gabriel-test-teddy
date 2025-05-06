import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CurrencyPipe, DecimalPipe, NgFor, NgForOf } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalClienteComponent } from './modal-cliente/modal-cliente.component';
import { ModalExcluirComponent } from './modal-excluir/modal-excluir.component';

@Component({
  selector: 'app-clientes',
  imports: [NgbPaginationModule, NgxSpinnerModule, NgFor, DecimalPipe, CurrencyPipe],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
  providers: [UserService],
})
export class ClientesComponent implements OnInit {
  private modalService = inject(NgbModal);
  
  users:any[] = [];

  params = {
    page: 1,
    limit: 2,
  }

  totalSize:number = 0;

  constructor(
    private spinner: NgxSpinnerService,
    private _toastr: ToastrService,
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.loadData();
  }


  loadData()
  {
    this.spinner.show();
    this.userService.getListData(this.params)
    .subscribe((result: any) => {
      console.log(result)
      this.users = result?.clients;
      this.totalSize = result?.totalPages
    },
    (err:any) => {
      this._toastr.error(err);
    }).add(() => {
      this.spinner.hide();
 });
}

pageChanged(page:any)
{
  console.log(page)
  this.params.page = page ;
  this.loadData();
}

resetPagination()
{
  this.params = {
    page: 1,
    limit: 2,
  };
}

changed(e:any){
  console.log(e)
  // event comes as parameter, you'll have to find selectedData manually
  this.params.limit = e.target.value;
  this.loadData();
}

openModal(id:number = 0) {
  const modalRef = this.modalService.open(ModalClienteComponent);
  modalRef.componentInstance.id = id;

  modalRef.result.then((data) => {
    this.resetPagination();
    this.loadData();
  });
}

openModalDelete(id:number = 0) {
  const modalRef = this.modalService.open(ModalExcluirComponent);
  modalRef.componentInstance.id = id;

  modalRef.result.then((data) => {
    this.resetPagination();
    this.loadData();
  });
}
}
