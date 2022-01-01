import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlaylistBriefCardComponent } from './playlist-brief-card/playlist-brief-card.component';
import { SliderComponent } from './slider/slider.component';
import { ArtistBriefCardComponent } from './artist-brief-card/artist-brief-card.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { PlaylistTableComponent } from './playlist-table/playlist-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { RemovePlaylistDialogComponent } from './remove-playlist-dialog/remove-playlist-dialog.component';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { FormsModule } from '@angular/forms';
import { SongBriefCardComponent } from './song-brief-card/song-brief-card.component';
import { SongInPlaylistPipe } from './pipes/song-in-playlist.pipe';

@NgModule({
  declarations: [
    PlaylistBriefCardComponent,
    ArtistBriefCardComponent,
    SliderComponent,
    EnumToArrayPipe,
    PlaylistTableComponent,
    RemovePlaylistDialogComponent,
    PlaylistViewComponent,
    SongBriefCardComponent,
    SongInPlaylistPipe
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatMenuModule,
    FormsModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    PlaylistBriefCardComponent,
    SliderComponent,
    ArtistBriefCardComponent,
    EnumToArrayPipe,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    PlaylistTableComponent,
    MatTableModule,
    MatMenuModule,
    RemovePlaylistDialogComponent,
    PlaylistViewComponent,
    SongBriefCardComponent,
    SongInPlaylistPipe
  ],
  providers: [
    EnumToArrayPipe
  ]
})
export class SharedModule { }
