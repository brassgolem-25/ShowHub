import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModuleComponent } from './material-module.component';

describe('MaterialModuleComponent', () => {
  let component: MaterialModuleComponent;
  let fixture: ComponentFixture<MaterialModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
