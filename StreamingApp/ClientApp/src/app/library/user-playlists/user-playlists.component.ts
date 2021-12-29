import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistBriefDto } from 'src/app/api/dtos/playlist-brief-dto';
import { PlaylistService } from 'src/app/api/services/playlist.service';
import { CreatePlaylistDialogComponent } from '../create-playlist-dialog/create-playlist-dialog.component';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.component.html',
  styleUrls: ['./user-playlists.component.scss']
})
export class UserPlaylistsComponent implements OnInit {

  public playlistBriefs: Array<PlaylistBriefDto>;

  constructor(private playlistService: PlaylistService, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.playlistService.getUserPlaylistBriefs().subscribe(result => this.playlistBriefs = result.data);
  }

  public openCreatePlaylistDialog(): void {
    this.dialog.open(CreatePlaylistDialogComponent, { disableClose: true, scrollStrategy: new NoopScrollStrategy() });
  }

}
