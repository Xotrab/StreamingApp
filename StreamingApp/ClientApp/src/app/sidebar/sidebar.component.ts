import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SidebarOption } from '../helpers/sidebar-option.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() isLoggedIn: boolean;
  @Output() selectedOptionEvent = new EventEmitter<SidebarOption>();

  public sidebarOption = SidebarOption;
	public selectedOption: SidebarOption = this.sidebarOption.Home;

  constructor() { }

  public ngOnInit(): void {
  }

  public changeOption(option: SidebarOption): void {
	  this.selectedOption = option;
    this.selectedOptionEvent.emit(this.selectedOption);
	}
}
