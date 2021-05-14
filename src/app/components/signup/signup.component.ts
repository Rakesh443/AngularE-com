import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router:Router, private fb:FormBuilder,private auth:AuthService) { }
  authError
  
  signupForm : FormGroup
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName:['', Validators.required],
      lastName : ['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      password2:['',Validators.required]
    })
    this.auth.authStatus().subscribe(user=>{
      if(user.displayName!==null){
        this.router.navigate(['']);
      }
      
        
      this.auth.eventAuthError$.subscribe(data =>{
        this.authError = data
      })      
      
    })
    
    
  }

  signup(){
   
    this.auth.signUp(this.signupForm.value)
  }

  

}
