import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './doctor/add/add.component';
import { ListComponent } from './doctor/list/list.component';
import { DoctorHomeComponent } from './doctor/home/home.component';
import { DoctorModule } from './doctor/doctor.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { PatientModule } from './patient/patient.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ListComponent,
    DoctorHomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DoctorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PatientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
