import { ModalOptions } from './../../models/modal-options';
import { ModalService } from './modal.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef;
  public options: ModalOptions;

  constructor(
    private modalService: ModalService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.styleModal();
  }

  private styleModal = () => {
    this.options.style.forEach((st) =>
      this.renderer.setStyle(
        this.container.nativeElement,
        Object.keys(st)[0],
        st[Object.keys(st)[0]]
      )
    );
  };

  public closeModal = (): void =>
    this.modalService.closeModal(this.el.nativeElement.getAttribute('modalid'));
}
