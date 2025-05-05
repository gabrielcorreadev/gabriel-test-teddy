import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgFor, NgForOf } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalClienteComponent } from './modal-cliente/modal-cliente.component';
import { ModalExcluirComponent } from './modal-excluir/modal-excluir.component';

@Component({
  selector: 'app-clientes',
  imports: [NgbPaginationModule, NgxSpinnerModule, NgFor],
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
  
  loading:boolean = false;
  totalSize:number = 0;

  constructor(
    private _toastr: ToastrService,
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.loadData();
  }


  loadData()
  {
    this.loading = true;
    this.userService.getListData(this.params)
    .subscribe((result: any) => {
      console.log(result)
      this.users = result?.clients;
      this.totalSize = result?.totalPages
    },
    (err:any) => {
      this._toastr.error(err);
    });
}

pageChanged(page:any)
{
  console.log(page)
  this.params.page = page ;
  this.loadData();
}


openModal(id:number = 0) {
  const modalRef = this.modalService.open(ModalClienteComponent);
  modalRef.componentInstance.id = id;

  modalRef.result.then((data) => {
    this.loadData();
  });
}

openModalDelete(id:number = 0) {
  const modalRef = this.modalService.open(ModalExcluirComponent);
  modalRef.componentInstance.id = id;

  modalRef.result.then((data) => {
    this.loadData();
  });
}
}
