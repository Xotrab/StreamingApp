import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistBriefDto } from 'src/app/api/dtos/playlist-brief-dto';
import { PlaylistService } from 'src/app/api/services/playlist.service';
import { DialogAction } from 'src/app/helpers/dialog-action.enum';
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
    const dialogRef = this.dialog.open(CreatePlaylistDialogComponent, { disableClose: true, scrollStrategy: new NoopScrollStrategy() });

    dialogRef.afterClosed().subscribe(result =>{
      if (result.event === DialogAction.Submit) {
        this.playlistService.getPlaylistBrief(result.data).subscribe(result => this.playlistBriefs.push(result.data));
      }
    });
  }

}
