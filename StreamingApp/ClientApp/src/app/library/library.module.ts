import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLibraryComponent } from './user-library/user-library.component';
import { SharedModule } from '../shared/shared.module';
import { UploadedSongsComponent } from './uploaded-songs/uploaded-songs.component';
import { UploadSongDialogComponent } from './upload-song-dialog/upload-song-dialog.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';
import { LikedSongsComponent } from './liked-songs/liked-songs.component';
import { UserPlaylistsComponent } from './user-playlists/user-playlists.component';
import { CreatePlaylistDialogComponent } from './create-playlist-dialog/create-playlist-dialog.component';
import { UserFollowsComponent } from './user-follows/user-follows.component';



@NgModule({
  declarations: [
    UserLibraryComponent,
    UploadedSongsComponent,
    UploadSongDialogComponent,
    LikedSongsComponent,
    UserPlaylistsComponent,
    CreatePlaylistDialogComponent,
    UserFollowsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxDropzoneModule,
    FormsModule
  ],
  exports: [
    UserLibraryComponent,
    UploadedSongsComponent,
    UploadSongDialogComponent,
    NgxDropzoneModule
  ]
})
export class LibraryModule { }
