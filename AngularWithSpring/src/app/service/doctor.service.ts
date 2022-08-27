import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }
  base_url = "http://localhost:9004/doctor";
  addDoctor(doc:any):Observable<any>
  {
    return this.http.post<any>(this.base_url,doc);;
  }

  listDoctor():Observable<Doctor[]>
  {
    return this.http.get<Doctor[]>(this.base_url);
  }

  doctorByName(name:string):Observable<Doctor[]>
  {
    return this.http.get<Doctor[]>(this.base_url+"/search?name="+name);
  }

  deleteDoctor(id:number): Observable<Doctor>
  {
    return this.http.delete<Doctor>(this.base_url+"/delete/"+id);
  }

  doctorById(id:number):Observable<any>
  {
    return this.http.get<any>(this.base_url+"/search-by-id/"+id);
  }

  updateDoctor(id:number,doc:Doctor):Observable<Doctor>
  {
    return this.http.put<Doctor>(this.base_url+"/update/"+id,doc)
  }

}
