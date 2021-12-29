import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../dtos/api-response';
import { PlaylistBriefDto } from '../dtos/playlist-brief-dto';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

  public getUserPlaylistBriefs(): Observable<ApiResponse<PlaylistBriefDto[]>> {
    const url = environment.appUrl + '/playlists';

    return this.http.get<ApiResponse<PlaylistBriefDto[]>>(url);
  }
}
