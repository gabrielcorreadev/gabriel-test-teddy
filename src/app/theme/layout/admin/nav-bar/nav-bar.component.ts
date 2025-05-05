import { Component, inject, Input } from '@angular/core';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-offcanvas-content',
	standalone: true,
	template: `
		<div class="offcanvas-header">
			<h5 class="offcanvas-title"></h5>
			<button
				type="button"
				class="btn-close text-reset"
				aria-label="Close"
				(click)="activeOffcanvas.dismiss('Cross click')"
			></button>
		</div>
		<div class="offcanvas-body">
	<ul class="nav flex-column">
  <li class="nav-item">
    <a class="nav-link" href="#"><i class="bi bi-house m-r-5"></i> Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="#"><i class="bi bi-people m-r-5"></i> Clientes</a>
  </li>
    <li class="nav-item">
    <a class="nav-link" href="#"><i class="bi bi-bag-plus m-r-5"></i> Produtos</a>
  </li>
</ul>
		</div>
	`,
	styles: `
		/* Opening offcanvas as a component requires this style in order to scroll */
		:host {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	`,
})

export class NgbdOffcanvasContent {
	activeOffcanvas = inject(NgbActiveOffcanvas);
	@Input() name: string;
}

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
	private offcanvasService = inject(NgbOffcanvas);

	open() {
		const offcanvasRef = this.offcanvasService.open(NgbdOffcanvasContent);
	}
}
