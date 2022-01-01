import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../dtos/api-response';
import { SearchDto } from '../dtos/search-dto';
import { SearchResultDto } from '../dtos/search-result-dto';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public search(searchDto: SearchDto): Observable<ApiResponse<SearchResultDto>> {
    const url = environment.appUrl + '/search';

    return this.http.post<ApiResponse<SearchResultDto>>(url, searchDto);
  }
}
