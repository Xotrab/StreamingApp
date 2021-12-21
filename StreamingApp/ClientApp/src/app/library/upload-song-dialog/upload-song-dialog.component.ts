import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadSongDto } from 'src/app/api/dtos/upload-song-dto';
import { SongService } from 'src/app/api/services/song.service';
import { DialogAction } from 'src/app/helpers/dialog-action.enum';
import { Genre } from 'src/app/helpers/genre.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-song-dialog',
  templateUrl: './upload-song-dialog.component.html',
  styleUrls: ['./upload-song-dialog.component.scss']
})
export class UploadSongDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UploadSongDialogComponent>,
    private snackBar: MatSnackBar,
    private songService: SongService)
    { }

  public song: File;
  public genreEnum = Genre;
  public genre: Genre;

  public showSpinner: boolean = false;

  public ngOnInit(): void {
  }

  public submit(): void {
    if (!this.song || this.genre === undefined) {
      this.snackBar.open(
        "Please drop the audio file and select the genre first!", 'Ok', {
          duration: environment.snackbarDuration
        }
      );
      
      return;
    }
    
    const uploadSongDto: UploadSongDto = {
      file: this.song,
      genre: this.genre
    };

    this.showSpinner = true;

    this.songService.uploadSong(uploadSongDto).subscribe(result => {
      this.showSpinner = false;

      this.snackBar.open(
        "Uploaded successfully", 'Ok', {
          duration: environment.snackbarDuration
        }
      );
      
      this.dialogRef.close({ event: DialogAction.Submit, data: result.data });
    }, _ => this.showSpinner = false);
  }

  public close(): void {
    this.dialogRef.close({ event: DialogAction.Cancel, data: null });
  }

  public onFileDrop(event): void {
    this.song = event.addedFiles[0];
  }

  public onFileRemove(): void {
    this.song = null;
  }
}
