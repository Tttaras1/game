import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent implements OnInit {
	
	constructor(private gameService: GameService) {}

	public settings: FormGroup;

	ngOnInit() {
		this.settings = new FormGroup({
			'time': new FormControl('', [
				Validators.required,
				Validators.min(1),
				Validators.max(2000),
			])
		})
		if (this.gameService.time) {
			const time = this.gameService.time;
			this.timeControl.patchValue(time);
		}
	}

	startGame(): void {
		if (this.settings.invalid) {
			this.timeControl.markAsTouched();
			return;
		}

		this.gameService.setTime(this.timeControl.value)
		this.gameService.gameStarted.next(true);
	}

	get timeControl (): FormControl {
		return this.settings.get('time') as FormControl;
	}
}
