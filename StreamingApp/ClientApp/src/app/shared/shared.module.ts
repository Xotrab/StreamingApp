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

@NgModule({
  declarations: [
    PlaylistBriefCardComponent,
    ArtistBriefCardComponent,
    SliderComponent,
    EnumToArrayPipe
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
    MatSelectModule
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
    MatSelectModule
  ]
})
export class SharedModule { }
