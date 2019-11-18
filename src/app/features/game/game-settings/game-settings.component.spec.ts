import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSettingsComponent } from './game-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from 'src/app/shared/error-message/error-message.component';
import { GameService } from '../game.service';
import { GameServiceStub } from 'src/app/shared/testing-mocks/gameService.stub';

describe('GameSettingsComponent', () => {
  let component: GameSettingsComponent;
  let fixture: ComponentFixture<GameSettingsComponent>;
  let service: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSettingsComponent, ErrorMessageComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [ {
        provide: GameService, useClass: GameServiceStub
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSettingsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(GameService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form builded', () => {
    component.ngOnInit();

    expect(component.timeControl).toBeTruthy();
  })

  it('set time if time already exist', () => {
    service.gameTime = 500;

    component.ngOnInit();

    expect(component.timeControl.value).toBe(500)

  })

  it('should set control as touched', () => {
    component.timeControl.patchValue(100);
    component.startGame();

    expect(component.timeControl.touched).toBeTruthy();
  }) 

  it('control should be invalid', () => {
    component.timeControl.patchValue(100);
    component.startGame();

    expect(component.timeControl.invalid).toBeTruthy();
  }) 

  it('should set time', () => {
    component.timeControl.patchValue(500);
    component.startGame();
    
    spyOnProperty(service, 'time').and.callThrough();

    expect(service.time).toBe(500);
  })

  it('should pass varriable to an observable', () => {
    component.timeControl.patchValue(500);
    service.gameStarted.subscribe((i) => {
      expect(i).toBeTruthy();
    })
    component.startGame();
  })
});
