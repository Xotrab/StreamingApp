import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaylistService } from 'src/app/api/services/playlist.service';
import { DialogAction } from 'src/app/helpers/dialog-action.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-playlist-dialog',
  templateUrl: './create-playlist-dialog.component.html',
  styleUrls: ['./create-playlist-dialog.component.scss']
})
export class CreatePlaylistDialogComponent implements OnInit {

  public showSpinner: boolean = false;
  public playlistName: string;

  constructor(
    public dialogRef: MatDialogRef<CreatePlaylistDialogComponent>,
    private snackBar: MatSnackBar,
    private playlistService: PlaylistService
    ) { }

  public ngOnInit(): void {
  }

  public submit(): void {
    if (!this.playlistName) {
      this.snackBar.open(
        "Please input the playlist name first!", 'Ok', {
          duration: environment.snackbarDuration
        }
      );
      
      return;
    }
    
    this.showSpinner = true;

    this.playlistService.createPlaylist(this.playlistName).subscribe(result => {
      this.showSpinner = false;

      this.snackBar.open(
        "Created playlist successfully", 'Ok', {
          duration: environment.snackbarDuration
        }
      );
      
      this.dialogRef.close({ event: DialogAction.Submit, data: result.data });
    }, _ => this.showSpinner = false);
  }

  public close(): void {
    this.dialogRef.close({ event: DialogAction.Cancel, data: null });
  }
}
