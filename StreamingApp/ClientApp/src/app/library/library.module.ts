import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLibraryComponent } from './user-library/user-library.component';
import { SharedModule } from '../shared/shared.module';
import { UploadedSongsComponent } from './uploaded-songs/uploaded-songs.component';
import { UploadSongDialogComponent } from './upload-song-dialog/upload-song-dialog.component';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [
    UserLibraryComponent,
    UploadedSongsComponent,
    UploadSongDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxDropzoneModule
  ],
  exports: [
    UserLibraryComponent,
    UploadedSongsComponent,
    UploadSongDialogComponent,
    NgxDropzoneModule
  ]
})
export class LibraryModule { }
