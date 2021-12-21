import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLibraryComponent } from './user-library/user-library.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserLibraryComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UserLibraryComponent
  ]
})
export class LibraryModule { }
