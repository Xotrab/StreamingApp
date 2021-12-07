import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule
  ]
})
export class SharedModule { }
