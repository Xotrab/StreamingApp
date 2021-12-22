import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistDto } from 'src/app/api/dtos/playlist-dto';
import { SongDto } from 'src/app/api/dtos/song-dto';
import { SongService } from 'src/app/api/services/song.service';
import { UploadSongDialogComponent } from '../upload-song-dialog/upload-song-dialog.component';

@Component({
  selector: 'app-uploaded-songs',
  templateUrl: './uploaded-songs.component.html',
  styleUrls: ['./uploaded-songs.component.scss']
})
export class UploadedSongsComponent implements OnInit {

  public uploadedSongs: Array<SongDto>;
  
  constructor(private dialog: MatDialog, private songService: SongService) { }

  public ngOnInit(): void {
    this.songService.getUploaded().subscribe(result => this.uploadedSongs = result.data);
  }

  public openUploadDialog(): void {
    this.dialog.open(UploadSongDialogComponent, { disableClose: true, scrollStrategy: new NoopScrollStrategy() });
  }

}
