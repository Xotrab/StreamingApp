import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePlaylistDialogComponent } from './remove-playlist-dialog.component';

describe('RemovePlaylistDialogComponent', () => {
  let component: RemovePlaylistDialogComponent;
  let fixture: ComponentFixture<RemovePlaylistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovePlaylistDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePlaylistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
