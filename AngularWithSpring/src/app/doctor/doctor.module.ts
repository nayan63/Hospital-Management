import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http"
import { DoctorRoutingModule } from './doctor-routing.module';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    HttpClientModule
  ]
})
export class DoctorModule { }
