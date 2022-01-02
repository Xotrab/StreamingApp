import { Component, OnInit } from '@angular/core';
import { ApplicationUserDto } from 'src/app/api/dtos/application-user-dto';
import { UserService } from 'src/app/api/services/user.service';

@Component({
  selector: 'app-user-follows',
  templateUrl: './user-follows.component.html',
  styleUrls: ['./user-follows.component.scss']
})
export class UserFollowsComponent implements OnInit {

  public followedUsers: Array<ApplicationUserDto>;

  constructor(private userService: UserService) { }

  public ngOnInit(): void {
    this.userService.getUserFollows().subscribe(result => this.followedUsers = result.data);
  }

  public removeUser($event): void {
    this.followedUsers = this.followedUsers.filter(user => user.id !== $event);
  }
}
