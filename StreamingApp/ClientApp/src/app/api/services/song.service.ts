import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../dtos/api-response';
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
}
