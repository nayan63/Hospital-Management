import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { Patient } from 'src/app/service/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private patientService:PatientService) { }

  errorMessage!:string;
  patients:Patient[]=[];

  ngOnInit(): void {
    this.listPatient();
  }

  listPatient()
  {
    console.log(PatientService)
    return this.patientService.listPatient().subscribe({
        next:(result)=>{
          this.patients=result;
        },
        error:(err)=>
        {
          this.errorMessage = '';
        }
      })
  }

  search(id:any)
  {
    if(id!='')
    {
      this.patientService.searchById(id).subscribe({
        next:(res)=>{
          this.patients=res;
        },
        error:(err)=>
        {
          this.errorMessage=err.error.message;
        }
      })
    }
    else
    {
      this.errorMessage = '';
      this.listPatient();
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errors="";
    if (error.status === 0) {
      errors= error.error;
    } else {
      errors= error.error;
    }
    return throwError(() => new Error(errors));
  }
}
