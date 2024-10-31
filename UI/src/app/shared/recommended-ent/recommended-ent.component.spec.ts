import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedEntComponent } from './recommended-ent.component';

describe('RecommendedEntComponent', () => {
  let component: RecommendedEntComponent;
  let fixture: ComponentFixture<RecommendedEntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedEntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
