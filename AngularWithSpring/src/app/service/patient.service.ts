import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patientForm!:FormGroup;
  constructor(private http:HttpClient) { }
  baseUrl = "http://localhost:9003/patient";

  addPatient(patient:Patient):Observable<Patient>
  {
    return this.http.post<Patient>(this.baseUrl,patient);
  }

  listPatient():Observable<Patient[]>
  {
    return this.http.get<Patient[]>(this.baseUrl+"/with-doctor");
  }

  searchById(id:number):Observable<Patient[]>
  {
    return this.http.get<Patient[]>(this.baseUrl+"/search?id="+id);
  }
}
