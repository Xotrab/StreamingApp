import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAction } from 'src/app/helpers/dialog-action.enum';

@Component({
  selector: 'app-upload-song-dialog',
  templateUrl: './upload-song-dialog.component.html',
  styleUrls: ['./upload-song-dialog.component.scss']
})
export class UploadSongDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UploadSongDialogComponent>) { }

  public song: File;

  public ngOnInit(): void {
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
