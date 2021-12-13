import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistBriefCardComponent } from './artist-brief-card.component';

describe('ArtistBriefCardComponent', () => {
  let component: ArtistBriefCardComponent;
  let fixture: ComponentFixture<ArtistBriefCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistBriefCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistBriefCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
