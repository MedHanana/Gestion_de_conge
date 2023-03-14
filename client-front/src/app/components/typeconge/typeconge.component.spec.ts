import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypecongeComponent } from './typeconge.component';

describe('TypecongeComponent', () => {
  let component: TypecongeComponent;
  let fixture: ComponentFixture<TypecongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypecongeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypecongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
