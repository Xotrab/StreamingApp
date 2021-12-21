import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLibraryComponent } from './user-library/user-library.component';
import { SharedModule } from '../shared/shared.module';
import { UploadedSongsComponent } from './uploaded-songs/uploaded-songs.component';



@NgModule({
  declarations: [
    UserLibraryComponent,
    UploadedSongsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UserLibraryComponent,
    UploadedSongsComponent
  ]
})
export class LibraryModule { }
