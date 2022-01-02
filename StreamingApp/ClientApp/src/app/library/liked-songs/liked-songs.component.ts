import { Component, OnInit } from '@angular/core';
import { SongDto } from 'src/app/api/dtos/song-dto';
import { SongService } from 'src/app/api/services/song.service';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
  styleUrls: ['./liked-songs.component.scss']
})
export class LikedSongsComponent implements OnInit {

  public likedSongs: Array<SongDto>;

  constructor(private songService: SongService) { }

  public ngOnInit(): void {
    this.songService.getLiked().subscribe(result => this.likedSongs = result.data);
  }

  public removeSong($event): void {
    this.likedSongs = this.likedSongs.filter(song => song.id !== $event);
  }
}
