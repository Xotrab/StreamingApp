import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PlaylistDto } from 'src/app/api/dtos/playlist-dto';
import { SearchDto } from 'src/app/api/dtos/search-dto';
import { SongDto } from 'src/app/api/dtos/song-dto';
import { SearchService } from 'src/app/api/services/search.service';
import { JwtTokenService } from 'src/app/services/jwt-token.service';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss']
})
export class PlaylistViewComponent implements OnInit {

  @Input() playlist: PlaylistDto;

  public searchFilter: string;
  public foundSongs: Array<SongDto>;

  public pluralMap = {
    '=0': '0 songs',
    '=1': '1 song',
    'other': '# songs'
  };

  public isPlaylistOwner: boolean = false;

  constructor(
    private searchService: SearchService,
    private cdRef: ChangeDetectorRef,
    private jwtTokenService: JwtTokenService
  ) { }

  public ngOnInit(): void {
    this.isPlaylistOwner = this.jwtTokenService.decodedUser?.id === this.playlist.author.id;
  }

  public clearInput(): void {
    this.searchFilter = null;
  }

  public clearResults(): void {
    this.foundSongs = null;
    this.clearInput();
  }

  public search(): void {
    if (!this.searchFilter) {
      return;
    }

    const searchDto: SearchDto = {
      filter: this.searchFilter,
      onlySongs: true
    };

    this.searchService.search(searchDto).subscribe(result => this.foundSongs = result.data.songs);
  }

  public addSongToPlaylist($event): void {
    this.playlist.songs = this.playlist.songs.concat($event);
    this.cdRef.detectChanges();
  }

}
