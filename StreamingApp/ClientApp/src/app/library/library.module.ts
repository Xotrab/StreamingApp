import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLibraryComponent } from './user-library/user-library.component';
import { SharedModule } from '../shared/shared.module';
import { UploadedSongsComponent } from './uploaded-songs/uploaded-songs.component';
import { UploadSongDialogComponent } from './upload-song-dialog/upload-song-dialog.component';



@NgModule({
  declarations: [
    UserLibraryComponent,
    UploadedSongsComponent,
    UploadSongDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UserLibraryComponent,
    UploadedSongsComponent,
    UploadSongDialogComponent
  ]
})
export class LibraryModule { }
