import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../dtos/api-response';
import { SongDto } from '../dtos/song-dto';
import { UploadSongDto } from '../dtos/upload-song-dto';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  public uploadSong(uploadSongDto: UploadSongDto): Observable<ApiResponse<number>> {
    const url = environment.appUrl + '/songs';

    const formData = new FormData();
    formData.append("File", uploadSongDto.file);
    formData.append("Genre", uploadSongDto.genre.toString());

    return this.http.post<ApiResponse<number>>(url, formData);
  }

  public getUploaded(): Observable<ApiResponse<SongDto[]>> {
    const url = environment.appUrl + '/uploads';

    return this.http.get<ApiResponse<SongDto[]>>(url);
  }

  public getLiked(): Observable<ApiResponse<SongDto[]>> {
    const url = environment.appUrl + '/likes';

    return this.http.get<ApiResponse<SongDto[]>>(url);
  }

  public likeSong(songId: number): Observable<ApiResponse<any>> {
    const url = environment.appUrl + '/songs/' + songId + '/likes';

    return this.http.post<ApiResponse<any>>(url, null);
  }
}
