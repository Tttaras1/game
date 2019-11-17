import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { GameService } from './game.service';
import { takeWhile } from 'rxjs/operators';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
	private alive = true;
	private isGameActive = false;
	private fields = [];
	private isModalActive: boolean = false;
	private modalText: string;
	public currentField: number = 0;
	public lostFields: number[] = [];
	public wonFields: number[] = [];
	public isFirstIteration: boolean = true;
	public timerId;

	@ViewChild('boardRef', {static: false}) boardRef: ElementRef;

	constructor(
		private GameService: GameService,
	) { }

	ngOnInit() {
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
			this.fields.push(this.createField(i));
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
		let element = this.getField(this.currentField);
		if (this.wonFields.includes(this.currentField) ||
			this.lostFields.includes(this.currentField)) {
			element = this.getCurrentField();
		}

		return element;
	}

	getField(id) {
		return this.boardRef.nativeElement.children[id]
	}

	gameStart(): void {
		this.getField([this.currentField])
			.classList.remove('game-board__card-container--active')

		if (this.isGameEnded) {
			this.hanldeEndOfTheGame();
			return;
		}

		if (!this.wonFields.includes(this.currentField ) && !this.isFirstIteration) {
			this.handleLost(this.currentField )
		}

		const element = this.getCurrentField();

		element.classList.add('game-board__card-container--active');
		
		if (this.isFirstIteration) {
			this.isFirstIteration = false
		}
	}

	fieldClicked(id: number): void {
		if (id === this.currentField ) {
			this.handleWin(this.currentField );
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
		return Math.round((Math.random() * 99))
	}

	hanldeEndOfTheGame():void {
		if (this.wonFields.length === 10) {
			this.showModal('Congratulations! You are a winner!');
		} else { 
			this.showModal('Game over!');
		}
	}

	showModal(text: string): void {
		this.isModalActive = true;
		this.modalText = text;
	}

	closeModal(): void {
		this.isModalActive = false;
	}

	resetAllGameData(): void {
		clearTimeout(this.timerId)
		this.fields = [];
		this.isGameActive = false;
		this.isFirstIteration = true;
		this.wonFields = [];
		this.lostFields = [];
		this.closeModal();
	}

	get isGameEnded(): boolean {
		return this.wonFields.length === 10 || this.lostFields.length === 10;
	}
	
	ngOnDestroy(): void {
		this.alive = false
		this.resetAllGameData();
	}
}

