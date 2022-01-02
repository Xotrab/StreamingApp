import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowsComponent } from './user-follows.component';

describe('UserFollowsComponent', () => {
  let component: UserFollowsComponent;
  let fixture: ComponentFixture<UserFollowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFollowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
