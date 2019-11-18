import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from 'src/app/shared/error-message/error-message.component';
import { GameService } from './game.service';
import { GameServiceStub } from 'src/app/shared/testing-mocks/gameService.stub';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let gameService: GameService;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent, GameSettingsComponent, ModalComponent, ErrorMessageComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [ {
        provide: GameService, useClass: GameServiceStub
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    gameService = TestBed.get(GameService);
    fixture.detectChanges();
    
    element = document.createElement('div');
    spyOn(component, 'getField').and.returnValue(element);
    spyOn(component, 'getCurrentField').and.returnValue(element);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call initSubscriptions', () => {
      const spy = spyOn(component, 'initSubscriptions');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    })
  })

  describe('initSubscriptions', () => {
    it('should subscribe to gameService.gameStarted',() => {
      spyOn(component, 'initBoard').and.callFake(()=>{});
      component.initSubscriptions();
      gameService.gameStarted.next(true);
      expect(component.isGameActive).toBeTruthy()
    })
  })

  describe('gameStart', () => {
    it('should start the game', () => {
      component.isFirstIteration = true;
      component.gameStart();
      expect(component.isFirstIteration).toBeFalsy();
    })

    it('should end the game', () => {
      spyOnProperty(component, 'isGameEnded', 'get').and.returnValue(true);
      const spy = spyOn(component, 'hanldeEndOfTheGame');

      component.gameStart();

      expect(spy).toHaveBeenCalled();
    })

    it('should call handlelost func', () => {
      component.wonFields = [];
      component.currentField = 1;
      component.isFirstIteration = false;

      const spy = spyOn(component, 'handleLost');
      component.gameStart();

      expect(spy).toHaveBeenCalled();
    })
  })

  describe('createField', () => {
    it('should return object with id', () => {
      const result = component.createField(1);

      expect(result).toEqual({id:1})
    })

    it('should return object with id', () => {
      const result = component.createField(2);

      expect(result).toEqual({id:2})
    })
  })

  // describe('gameStart', () => {
  //   it('should ', () => {

  //   })
  // })

  describe('fieldClicked', () => {
    it('should call handle win if id === this.currentField', () => {
      const spy = spyOn(component, 'handleWin');
      component.currentField = 1;
      component.fieldClicked(1);

      expect(spy).toHaveBeenCalled();
    })

    it('should NOT call handle win if id != this.currentField', () => {
      const spy = spyOn(component, 'handleWin');
      component.currentField = 2;
      component.fieldClicked(1);

      expect(spy).not.toHaveBeenCalled();
    })
  })

  describe('handleLost', () => {
    it('should add lost field to the array', () => {
      component.currentField = 55;
      component.handleLost();

      expect(component.lostFields.includes(55));
    })
  })

  describe('handleWin', () => {
    it('should add lost field to the array', () => {
      component.currentField = 55;
      component.handleWin(55);

      expect(component.wonFields.includes(55));
    })
  })

  describe('getRandomNumber', () => {
    it('should return number', () => {
      expect(typeof component.getRandomNumber()).toBe('number')
    })
  })

  describe('hanldeEndOfTheGame', () => {
    it('hanldeEndOfTheGame', () => {
      const spy = spyOn(component, 'showModal');
      component.hanldeEndOfTheGame();

      expect(spy).toHaveBeenCalled();
    })
  })

  describe('showModal', () => {
    it('should configure modal', () => {
      component.showModal('text');

      expect(component.isModalActive).toBeTruthy();
      expect(component.modalText).toBe('text');
    })
  })

  describe('closeModal', () => {
    it('should set isModalActive to false', () => {
      component.isModalActive = true;
      component.closeModal();
      expect(component.isModalActive).toBeFalsy();
    })
  })

  describe('resetAllGameData', () => {
    it('should set default parametrs', () => {
      const spy = spyOn(component, 'closeModal');
      component.resetAllGameData();
      expect(component.fields.length).toBe(0);
      expect(component.isGameActive).toBeFalsy();
      expect(component.isFirstIteration).toBeTruthy();
      expect(component.wonFields.length).toBe(0);
      expect(component.lostFields.length).toBe(0);
      expect(spy).toHaveBeenCalled();
    })
  })

  describe('ngondestroy', () => {
    it('should set alive as false and reset data', () => {
      const spy = spyOn(component, 'resetAllGameData');
      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
      expect(component.alive).toBeFalsy();
    })
  })
});
