import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../dtos/api-response';
import { PlaylistBriefDto } from '../dtos/playlist-brief-dto';
import { PlaylistDto } from '../dtos/playlist-dto';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

  public getUserPlaylistBriefs(): Observable<ApiResponse<PlaylistBriefDto[]>> {
    const url = environment.appUrl + '/playlists';

    return this.http.get<ApiResponse<PlaylistBriefDto[]>>(url);
  }

  public createPlaylist(playlistName: string): Observable<ApiResponse<number>> {
    const url = environment.appUrl + '/playlists';

    const formData = new FormData();
    formData.append("playlistName", playlistName);

    return this.http.post<ApiResponse<number>>(url, formData);
  }

  public getPlaylistBrief(playlistId: number): Observable<ApiResponse<PlaylistBriefDto>> {
    const url = environment.appUrl + '/playlists/' + playlistId + '/brief';

    return this.http.get<ApiResponse<PlaylistBriefDto>>(url);
  }

  public getPlaylist(playlistId: number): Observable<ApiResponse<PlaylistDto>> {
    const url = environment.appUrl + '/playlists/' + playlistId;

    return this.http.get<ApiResponse<PlaylistDto>>(url);
  }

  public removePlaylist(playlistId: number): Observable<ApiResponse<void>> {
    const url = environment.appUrl + '/playlists/' + playlistId;

    return this.http.delete<ApiResponse<void>>(url);
  }

  public likePlaylist(playlistId: number): Observable<ApiResponse<void>> {
    const url = environment.appUrl + '/playlists/' + playlistId + '/likes';

    return this.http.post<ApiResponse<void>>(url, null);
  }

  public dislikePlaylist(playlistId: number): Observable<ApiResponse<void>> {
    const url = environment.appUrl + '/playlists/' + playlistId + '/likes';

    return this.http.delete<ApiResponse<void>>(url);
  }

  public addSong(playlistId: number, songId: number): Observable<ApiResponse<boolean>> {
    const url = environment.appUrl + '/playlists/' + playlistId + '/songs';

    const formData = new FormData();
    formData.append("songId", songId.toString());

    return this.http.post<ApiResponse<boolean>>(url, formData);
  }
}
