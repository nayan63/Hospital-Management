import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Doctor } from 'src/app/service/doctor';
import { DoctorService } from 'src/app/service/doctor.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private docService:DoctorService,private fb:FormBuilder,private router:Router,private activatedRoute:ActivatedRoute) { }
  getDoctor!:Doctor;
  editId!:number;
  doctorForm!:FormGroup;

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      "name": [null,[Validators.required,Validators.pattern('^[a-zA-Z ]*')]],
      "age": [null,[Validators.required,Validators.pattern('^[0-9]*')]],
      "gender":[null,[Validators.required]],
      "specialist":[null,[Validators.required]]
    });

    this.editId = this.activatedRoute.snapshot.params.id;

    if(this.router.url=="/doctor/update/"+this.editId)
    {
      this.editId = this.activatedRoute.snapshot.params.id;
      this.docService.doctorById(this.editId).subscribe({
        next:(value)=>{
          this.editDoctor(value);
        },
        error:(err)=>
        {
          alert(err.error.message);
          this.router.navigate(['/doctor/list']);
        }
      });
    }
  }
  editDoctor(value:Doctor)
  {
    this.doctorForm.setValue({
      "name": value.name,
      "age": value.age,
      "gender": value.gender,
      "specialist": value.specialist,
    })
  }

  get name()
  {
    return this.doctorForm.get('name');
  }
  get age()
  {
    return this.doctorForm.get("age");
  }
  get gender()
  {
    return this.doctorForm.get("gender");
  }
  get specialist()
  {
    return this.doctorForm.get("specialist");
  }

  addDoctor()
  {
    if(this.doctorForm.valid && this.router.url=="/doctor/add")
    {
      this.docService.addDoctor(this.doctorForm.value).subscribe({
        next:(result)=>
        {
          alert(result.name+" Record Added Successfully");
          this.doctorForm.reset();
        },
        error:(err)=> {
            alert(err.error.message)
            this.router.navigate(['/doctor/list']);
        },
      });
    }
    else
    {
      this.docService.updateDoctor(this.editId,this.doctorForm.value).subscribe({
        next:(result)=>
        {
          alert(result.name+" Record Updated Successfully");
          this.router.navigate(['/doctor/list']);
        },
        error:(error)=> {
            alert(error.error.message)
            this.router.navigate(['/doctor/list']);
        },
      });
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
