import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddComponent } from './doctor/add/add.component';
import { DoctorHomeComponent } from './doctor/home/home.component';
import { ListComponent } from './doctor/list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './patient/home/home.component';

const routes: Routes = [
  { path: 'patient', loadChildren:() => import('./patient/patient.module').then(m=>m.PatientModule) },
  { path: '', component:AppComponent},
  { path: 'doctor', loadChildren: () => import('./doctor/doctor-routing.module').then(m => m.DoctorRoutingModule)},
  { path: '**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
