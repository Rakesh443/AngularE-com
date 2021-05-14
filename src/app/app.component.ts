import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'firebase/firestore';
import { AuthService } from './service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Web Store';
  
  
router:Router
  user:any
  
  constructor(private auth:AuthService){

  }
  ngOnInit(): void {
   
   this.auth.authStatus().subscribe(user=>{
     this.user=user
   })
  
  }
  logout()
{
  this.auth.logout()
  
}   

}
