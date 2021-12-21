import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-uploaded-songs',
  templateUrl: './uploaded-songs.component.html',
  styleUrls: ['./uploaded-songs.component.scss']
})
export class UploadedSongsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  public ngOnInit(): void {

  }

  public openUploadDialog(): void {
    
  }

}
