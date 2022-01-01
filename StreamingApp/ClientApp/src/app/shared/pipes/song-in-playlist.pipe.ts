import { Pipe, PipeTransform } from '@angular/core';
import { SongDto } from 'src/app/api/dtos/song-dto';

@Pipe({
  name: 'songInPlaylist'
})
export class SongInPlaylistPipe implements PipeTransform {

  transform(songId: number, songs: Array<SongDto>): boolean {
    return songs.some(song => song.id === songId);
  }
}
