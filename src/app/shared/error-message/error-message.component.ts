import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ERROR_MESSAGES } from 'src/app/app.config';
import { ErrorMessages } from '../models/errors';

@Component({
	selector: 'app-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent{
	@Input() control: AbstractControl;
	@Input() form: AbstractControl;
    errorMessage: ErrorMessages = ERROR_MESSAGES;

	get errors():string[] {
		return Object.keys(this.control.errors);
	}
}
