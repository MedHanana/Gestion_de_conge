import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidCongeComponent } from './valid.conge.component';

describe('ValidCongeComponent', () => {
  let component: ValidCongeComponent;
  let fixture: ComponentFixture<ValidCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidCongeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
