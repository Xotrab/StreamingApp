import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistBriefCardComponent } from './playlist-brief-card.component';

describe('PlaylistBriefCardComponent', () => {
  let component: PlaylistBriefCardComponent;
  let fixture: ComponentFixture<PlaylistBriefCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistBriefCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistBriefCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
