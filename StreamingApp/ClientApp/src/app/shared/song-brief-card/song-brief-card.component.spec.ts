import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongBriefCardComponent } from './song-brief-card.component';

describe('SongBriefCardComponent', () => {
  let component: SongBriefCardComponent;
  let fixture: ComponentFixture<SongBriefCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongBriefCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongBriefCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
