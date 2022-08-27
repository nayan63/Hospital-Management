import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Doctor } from './doctor';

import { DoctorService } from './doctor.service';

describe('DoctorService', () => {
  let service: DoctorService;
  let httpSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(DoctorService);

    httpSpy = jasmine.createSpyObj('HttpClient',['get','post']);
    service = new DoctorService(httpSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('List Doctor',()=>{
    let doctor:Doctor[] = [
      {
        "id":1,
        "name":"Dr Soumya Ranjan",
        "age":39,
        "gender":"Male",
        "specialist":"Ophthalmology"
      },
      {
        "id":2,
        "name":"Dr Sobita Dey",
        "age":45,
        "gender":"Female",
        "specialist":"Ophthalmology"
      }
    ];

    httpSpy.get.and.returnValue(of(doctor));
    service.listDoctor().subscribe({
      next:(res)=>{
        expect(res).toEqual(doctor);
      }
    })

  });

});
