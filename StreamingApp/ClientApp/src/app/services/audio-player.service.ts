import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlaylistDto } from '../api/dtos/playlist-dto';
import { SongDto } from '../api/dtos/song-dto';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

  private playlist: PlaylistDto;
  private currentSongId: number;

  //Audio player component will subscribe to this observable to get the song
  private currentSong: BehaviorSubject<SongDto> = new BehaviorSubject<SongDto>(null);
	get currentSong$() {
		return this.currentSong.asObservable();
	}

  //Used by the playlist table component to determine the selected song
  private songId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
	get songId$() {
		return this.songId.asObservable();
	}

  //Used by the playlist table component to determine the selected song
  private playlistId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
	get playlistId$() {
		return this.playlistId.asObservable();
	}
  
  private isPlaying: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	get isPlaying$() {
		return this.isPlaying.asObservable();
	}

  constructor() {
    const tempPlaylist: PlaylistDto = {
      id: -2,
      name: "Liked Songs",
      playbacks: 0,
      likes: 0,
      author: null,
      songs: [
        {
          "id":3,
          "name":"Riot",
          "url":"https://xotrab-gewc1.streaming.media.azure.net/8fe88093-fb12-4f4c-850b-d8458dd2e0b5/Riot.ism/manifest(format=m3u8-aapl)",
          "genre":4,
          "playbacks":0,
          "addedOn":null,
          "likes":0,
          "likedByUser": false,
          "author":{
            "id":11,
            "email":"b.kaluza99@gmail.com",
            "userName":"Gigachad"
          }
        },
        {
          "id":4,
          "name":"Solo",
          "url":"https://xotrab-gewc1.streaming.media.azure.net/f1832712-af9d-4f95-9924-cb71e62fbe95/Solo.ism/manifest(format=m3u8-aapl)",
          "genre":4,
          "playbacks":0,
          "addedOn": null,
          "likes":0,
          "likedByUser": false,
          "author":{
            "id":11,
            "email":"b.kaluza99@gmail.com",
            "userName":"Gigachad"
          }
        },
        {
          "id":5,
          "name":"Get Back",
          "url":"https://xotrab-gewc1.streaming.media.azure.net/12d4c734-1a4b-47fb-9ac8-2de201ea5f31/Get%20Back.ism/manifest(format=m3u8-aapl)",
          "genre":4,
          "playbacks":0,
          "addedOn": null,
          "likes":0,
          "likedByUser": false,
          "author":{
            "id":11,
            "email":"b.kaluza99@gmail.com",
            "userName":"Gigachad"
          }
        },
        {
          "id":4,
          "name":"Solo 2",
          "url":"https://xotrab-gewc1.streaming.media.azure.net/f1832712-af9d-4f95-9924-cb71e62fbe95/Solo.ism/manifest(format=m3u8-aapl)",
          "genre":4,
          "playbacks":0,
          "addedOn": null,
          "likes":0,
          "likedByUser": false,
          "author":{
            "id":11,
            "email":"b.kaluza99@gmail.com",
            "userName":"Gigachad"
          }
        },
      ]
    };

    this.playPlaylist(tempPlaylist, 3, true);
   }

  //Methods called by both

  public togglePlay(isPlaying: boolean): void {
    this.isPlaying.next(isPlaying);
  }

  //Methods called by other components

  public playPlaylist(playlist: PlaylistDto, songId: number, init: boolean=false): void {
    if (this.playlist?.id !== playlist.id) {
      this.playlist = playlist;
      this.playlistId.next(this.playlist.id);
    }

    if (this.currentSongId !== songId) {
      this.currentSongId = songId;
      this.currentSong.next(this.playlist.songs[this.currentSongId]);
      this.songId.next(this.currentSongId);
    }
    
    if (!init) {
      this.isPlaying.next(true);
    }
  }



  //Methods called by the AudioPlayerComponent

  public previous(): void {
    if (this.currentSongId !== 0)
      this.currentSongId -= 1;
    
    this.currentSong.next(this.playlist.songs[this.currentSongId]);
    this.songId.next(this.currentSongId);
  }

  public next(): void {
    //if the current song is the last one then simply play the first song in the playlist, otherwise increment the currentSongId and emit the new song
    this.currentSongId = this.currentSongId === this.playlist.songs.length - 1 ? 0 : this.currentSongId += 1;
    this.currentSong.next(this.playlist.songs[this.currentSongId]);
    this.songId.next(this.currentSongId);
  }
}
