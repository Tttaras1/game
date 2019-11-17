import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from './game.service';
import { takeWhile } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
	private alive: boolean = true;
	private isGameActive: boolean = false;
	private gameBoard: FormGroup;
	private fields: Object[] = [];
	public currentField: number = 0;
	public lostFields: number[] = [];
	public wonFields: number[] = [];
	public isFirstIteration: boolean = true;
	public timerId;

	@ViewChild('boardRef', {static: false}) boardRef: ElementRef;

	constructor(
		private GameService: GameService,
        private fb: FormBuilder,
	) { }

	ngOnInit() {
		this.gameBoard = this.fb.group({
			radioArray: this.fb.array([]),
		})
		this.initSubscriptions()
	}

	initSubscriptions() {
		this.GameService.gameStarted
		.pipe(takeWhile(() => this.alive))
		.subscribe((status) => {
			if (this.isGameActive && status) {
				return;
			}
			this.isGameActive = status;
			this.initBoard();
		})
	}

	initBoard() {
		for (let i = 0; i < 100; i++) {
			const control = this.fb.control(false)
			this.fields.push(this.createField(i));
			this.radioArr.push(control);
		}
		
		this.timerId = setInterval(() => this.gameStart(), this.GameService.time)
	}

	createField(id: number) {
		return {
			id: id,
		}
	}

	getCurrentField():HTMLElement {
		this.currentField = this.getRandomNumber();
		let element = this.getField([this.currentField]);
		
		if (element.tagName === "INPUT") {
			element = this.getField([--this.currentField]);
		}

		if (this.wonFields.includes(this.currentField) ||
			this.lostFields.includes(this.currentField)) {
			element = this.getCurrentField();
		}

		return element;
	}

	getField(id) {
		return this.boardRef.nativeElement.children[id]
	}

	ngOnDestroy(): void {
		this.alive = false
	}

	gameStart(): void {
		
		this.getField([this.currentField])
			.classList.remove('game-board__card-container--active')

		if (this.isGameEnded) {
			this.hanldeEndOfTheGame();
			return;
		}

		if (!this.wonFields.includes(this.currentField / 2) && !this.isFirstIteration) {
			this.handleLost(this.currentField / 2)
		}

		const element = this.getCurrentField();

		element.classList.add('game-board__card-container--active');
		
		if (this.isFirstIteration) {
			this.isFirstIteration = false
		}
	}

	fieldClicked(id: number): void {
		if (id === this.currentField / 2) {
			this.handleWin(this.currentField / 2);
		}
	}

	handleLost(id: number) {
		this.getField([this.currentField])
			.classList.add('game-board__card-container--lost');
		this.lostFields.push(this.currentField)
	}

	handleWin(id: number) {
		if (this.wonFields.includes(id)) {
			return;
		}
		this.wonFields.push(id);
		this.getField(this.currentField).classList.add('game-board__card-container--win');
	}

	getRandomNumber(): number {
		return Math.round((Math.random() * 199))
	}

	hanldeEndOfTheGame():void {
		clearTimeout(this.timerId)
		if (this.wonFields.length === 10) {
			alert('Congrats')
		} else { 
			alert('You loose')
		}
	}

	get radioArr() {
		return this.gameBoard.get('radioArray') as FormArray;
	}

	get isGameEnded(): boolean {
		return this.wonFields.length === 10 || this.lostFields.length === 10;
	}
	
}

