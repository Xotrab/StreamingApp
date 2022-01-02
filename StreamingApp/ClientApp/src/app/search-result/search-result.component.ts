import { Component, Input, OnInit } from '@angular/core';
import { SearchResultDto } from '../api/dtos/search-result-dto';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  @Input() searchResult: SearchResultDto;

  constructor() { }

  public ngOnInit(): void {
  }

}
