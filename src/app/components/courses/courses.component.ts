import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Course } from 'src/app/models/course.model';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {



  constructor(private http:HttpClient) { }

  db=firebase.firestore();
  cos:any=[]
  courses1=[]

  ngOnInit(): void {
    this. getCourse()
    // this.http.get('http://localhost:9000/courses').subscribe((data)=>{
    //   this.cos=data as Course
    // })
  }



  getCourse(){
    // console.log(this.courseForm.value.courseName)
    this.db.collection("courses").get().then((data) => {
      data.forEach((doc)=> {
        this.courses1.push(doc.data())
        console.log(doc.data())
      })
    })

  }

  courses=[
    {'id':1, 'name':'Angular','desc':'rb hwbchwc jhcw cjhbcw cbc ccwb cjh','image':'assets/OIP (3).jpg'},
    {'id':2, 'name':'React','desc':'rb hwbchwc jhcw cjhbcw cbc ccwb cjh','image':'assets/OIP (3).jpg'},
    {'id':3, 'name':'Viw','desc':'rb hwbchwc jhcw cjhbcw cbc ccwb cjh','image':'assets/OIP (3).jpg'},
    {'id':4, 'name':'Django','desc':'rb hwbchwc jhcw cjhbcw cbc ccwb cjh','image':'assets/OIP (3).jpg'}

  ]
}
