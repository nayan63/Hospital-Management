import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { Doctor } from 'src/app/service/doctor';
import { DoctorService } from 'src/app/service/doctor.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  doctors:any;
  singleDoctor!:any;
  errorMessage!:string;
  constructor(private apiService:DoctorService) { }

  ngOnInit(): void {
    this.getAllDoctor();
  }

  getAllDoctor()
  {
    this.apiService.listDoctor().subscribe({
      next:(result)=>
      {
        this.doctors=result;
      },
      error:(error)=>
      {
        this.errorMessage=error;
      }
    });
  }

  viewDoctor(docId:any)
  {
    this.apiService.doctorById(docId).subscribe({
      next:(result)=>
      {
        this.singleDoctor=result;
        console.log(result)
      },
      error:(error)=>
      {
        this.errorMessage=error.error.message;
      }
    });
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
