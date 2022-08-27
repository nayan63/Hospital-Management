import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/service/doctor';
import { DoctorService } from 'src/app/service/doctor.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  doctors!:Doctor[];
  constructor(private docService:DoctorService) { }

  ngOnInit(): void {
    this.listDoctor();
  }

  listDoctor()
  {
    return this.docService.listDoctor().subscribe(
      {
        next:(value)=> {
          this.doctors=value;
        },
      }
    )
  }

  search(name:string)
  {
    return this.docService.doctorByName(name).subscribe({
      next:(value)=> {
        this.doctors=value;
      },
    })
  }

  deleteDoctor(id:number)
  {
    if(confirm("Are you sure to delete it?"))
    {
      console.log(id)
      this.docService.deleteDoctor(id).subscribe({
        next:(res)=>
        {
          this.listDoctor();
        }
      })
    }
  }
}
