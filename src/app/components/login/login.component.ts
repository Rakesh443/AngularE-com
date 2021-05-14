import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  signinForm : FormGroup
  loading = false;
  submitted = false;
  message : string =""
  get f() { return this.signinForm.controls; }
  constructor(private router:Router, private service:AuthService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.check()
    this.signinForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required]
    })
    
  }
  check(){
    this.service.authStatus().subscribe(user=>{
      if(user.displayName!==null){ 
        this.router.navigate(['']);
      }
    })
  }
login(){
  this.submitted = true;

        // reset alerts on submit
        
        // stop here if form is invalid
        if (this.signinForm.invalid) {
            return;
        }

        this.loading = true;
  this.service.login(this.signinForm.value).then(msg =>{
    this.submitted = false;
    this.loading = false
    console.log(msg)
      this.message=msg;
  })
}
  
}
