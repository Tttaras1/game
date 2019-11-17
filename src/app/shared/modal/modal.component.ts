import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() text: string;
  @Output() onConfirmClicked: EventEmitter<any> = new EventEmitter();

  confirmClicked(): void {
    this.onConfirmClicked.emit(null);
  }
}
