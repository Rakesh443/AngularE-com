import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  courseForm:FormGroup
  db=firebase.firestore();
  
  currentUser=firebase.auth().currentUser


  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.courseForm=this.fb.group({
      courseName:['',Validators.required],
      courseDescription:['',Validators.required]
    })
    console.log(this.courseForm.value.courseName)
  }

  addCourse(){
    console.log(this.courseForm.value.courseName)
    this.db.collection("courses").add({
      courseName: this.courseForm.value.courseName,
      courseDescription: this.courseForm.value.courseDescription,
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      this.courseForm.reset()
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });

  }

}
