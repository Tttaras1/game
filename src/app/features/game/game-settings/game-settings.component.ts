import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent implements OnInit {
	
	settings: FormGroup;

	ngOnInit() {
		this.settings = new FormGroup({
			'time': new FormControl('', [
				Validators.required,
				Validators.min(1),
				Validators.max(2000),
			])
		})
	}

	get timeControl (): FormControl {
		return this.settings.get('time') as FormControl;
	}
}
