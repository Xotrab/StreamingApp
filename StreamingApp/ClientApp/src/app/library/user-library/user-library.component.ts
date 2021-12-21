import { Component, OnInit } from '@angular/core';
import { LibraryTab } from 'src/app/helpers/library-tab.enum';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.scss']
})
export class UserLibraryComponent implements OnInit {

  public libraryTab = LibraryTab;
	public selectedTab: LibraryTab = this.libraryTab.Uploaded;

  constructor() { }

  public ngOnInit(): void {
  }

  public navigateToTab(tab: LibraryTab): void {
		this.selectedTab = tab;
	}
}
