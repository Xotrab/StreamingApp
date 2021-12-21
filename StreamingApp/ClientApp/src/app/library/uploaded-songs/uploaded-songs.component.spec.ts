import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedSongsComponent } from './uploaded-songs.component';

describe('UploadedSongsComponent', () => {
  let component: UploadedSongsComponent;
  let fixture: ComponentFixture<UploadedSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedSongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
