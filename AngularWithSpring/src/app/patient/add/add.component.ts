import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/service/doctor.service';
import { Patient } from 'src/app/service/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private patientService:PatientService,private fb:FormBuilder,private doctorService:DoctorService) { }
  patientForm!:FormGroup;
  doctorList!:any;
  patientFormValue!:Patient;

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      "name":['',[Validators.required]],
      "age":['',[Validators.required]],
      "visitedDoctor":['',[Validators.required]],
      "dataOfVist":['',[Validators.required]],
      "prescription":['',[Validators.required]],
    });
    this.listOfDoctor();
  }

  listOfDoctor()
  {
    this.doctorService.listDoctor().subscribe({
      next:(result)=>
      {
        this.doctorList = result;
      }
    })
  }

  get name()
  {
    return this.patientForm.get('name');
  }
  get age()
  {
    return this.patientForm.get('age');
  }
  get visitedDoctor()
  {
    return this.patientForm.get('visitedDoctor');
  }
  get dataOfVist()
  {
    return this.patientForm.get('dataOfVist');
  }
  get prescription()
  {
    return this.patientForm.get('prescription');
  }
  addPatient()
  {
    let date = this.patientForm.value.dataOfVist;
    console.log(this.patientForm.value.dataOfVist);
    console.log(new Date(date.year,date.month,date.day))

    this.patientFormValue = {
      "id": undefined,
      "name": this.patientForm.value.name,
      "age": this.patientForm.value.age,
      "visitedDoctor":this.patientForm.value.visitedDoctor,
      "dataOfVist": new Date(date.year,date.month,date.day),
      "prescription": this.patientForm.value.prescription
    }

    this.patientService.addPatient(this.patientFormValue).subscribe({
      next:(result)=>{
        alert(result.name+" Record Added Successfully");
        this.patientForm.reset();
      },
      error:(error)=>
      {
        alert(error.message);
      }
    })
  }

}
