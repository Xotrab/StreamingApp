import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaylistBriefDto } from 'src/app/api/dtos/playlist-brief-dto';
import { PlaylistService } from 'src/app/api/services/playlist.service';
import { DialogAction } from 'src/app/helpers/dialog-action.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-remove-playlist-dialog',
  templateUrl: './remove-playlist-dialog.component.html',
  styleUrls: ['./remove-playlist-dialog.component.scss']
})
export class RemovePlaylistDialogComponent implements OnInit {

  public showSpinner: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RemovePlaylistDialogComponent>,
    private snackBar: MatSnackBar,
    private playlistService: PlaylistService,
    @Inject(MAT_DIALOG_DATA) public playlistBrief: PlaylistBriefDto
  ) { }

  public ngOnInit(): void {
  }

  public submit(): void {
    this.showSpinner = true;

    this.playlistService.removePlaylist(this.playlistBrief.id).subscribe(result => {
      this.showSpinner = false;

      this.snackBar.open(
        "Playlist removed successfully", 'Ok', {
          duration: environment.snackbarDuration
        }
      );
      
      this.dialogRef.close({ event: DialogAction.Submit, data: this.playlistBrief.id });
    }, _ => this.showSpinner = false);
  }

  public close(): void {
    this.dialogRef.close({ event: DialogAction.Cancel, data: null });
  }

}
