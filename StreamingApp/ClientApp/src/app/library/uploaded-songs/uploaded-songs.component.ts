import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistDto } from 'src/app/api/dtos/playlist-dto';
import { UploadSongDialogComponent } from '../upload-song-dialog/upload-song-dialog.component';

@Component({
  selector: 'app-uploaded-songs',
  templateUrl: './uploaded-songs.component.html',
  styleUrls: ['./uploaded-songs.component.scss']
})
export class UploadedSongsComponent implements OnInit {

  public playlist: PlaylistDto = {
    id: 1,
    name: "sampleName",
    songs: [
      {
        id: 1,
        name: "Wielka piwinica",
        genre: 0,
        url: "",
        playbacks: 0,
        likes: 0,
        addedOn: new Date(Date.now()),
        author: {
          id: 11,
          email: "b.kaluza99@gmail.com",
          userName: "Xotrab"
        }
      },
      {
        id: 2,
        name: "drill 2",
        genre: 1,
        url: "",
        playbacks: 2137,
        likes: 34,
        addedOn: new Date(Date.now()),
        author: {
          id: 11,
          email: "b.kaluza99@gmail.com",
          userName: "Xotrab"
        }
      },
      {
        id: 3,
        name: "love sosa",
        genre: 1,
        url: "",
        playbacks: 1337,
        likes: 2500,
        addedOn: new Date(Date.now()),
        author: {
          id: 11,
          email: "b.kaluza99@gmail.com",
          userName: "Keef"
        }
      },
    ],
    playbacks: 0,
    likes: 0,
    author: {
      id: 11,
      email: "b.kaluza99@gmail.com",
      userName: "Xotrab"
    }
  };

  constructor(private dialog: MatDialog) { }

  public ngOnInit(): void {

  }

  public openUploadDialog(): void {
    this.dialog.open(UploadSongDialogComponent, { disableClose: true, scrollStrategy: new NoopScrollStrategy() });
  }

}
