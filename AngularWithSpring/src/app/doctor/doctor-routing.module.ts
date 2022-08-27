import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DoctorHomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '', component: DoctorHomeComponent, 
    children:
    [
      {path:'list', component:ListComponent},
      { path:'add', component:AddComponent},
      { path:'search', component:SearchComponent},
      {path:'update/:id',component:AddComponent}
        
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
