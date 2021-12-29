import { Component, OnInit } from '@angular/core';
import { PlaylistBriefDto } from 'src/app/api/dtos/playlist-brief-dto';
import { PlaylistService } from 'src/app/api/services/playlist.service';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.component.html',
  styleUrls: ['./user-playlists.component.scss']
})
export class UserPlaylistsComponent implements OnInit {

  public playlistBriefs: Array<PlaylistBriefDto>;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.playlistService.getUserPlaylistBriefs().subscribe(result => this.playlistBriefs = result.data);
  }

}
