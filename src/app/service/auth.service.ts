import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable(); 

  newUser:any;
  constructor(
    private aAuth:AngularFireAuth,
    private db: AngularFirestore,
    private router:Router
    ) { }


    signUp(user){
      this.aAuth.createUserWithEmailAndPassword(user.email,user.password)
      .then(userCredential =>{
        this.newUser=user;
       
        userCredential.user.updateProfile({
          displayName: user.firstName+' '+user.lastName
        });
        this.insertUserData(userCredential)
        .then(()=>{
          this.router.navigate(['']);
        });
        
      }).catch(err =>{this.eventAuthError.next(err)})
    }

    insertUserData(userCredential: firebase.auth.UserCredential){
      
      
      return this.db.doc('Users/'+userCredential.user.uid).set({
        email:this.newUser.email,
        firstName: this.newUser.firstName,
        lastName:this.newUser.lastName
      })

    }

    login(user){
      return this.aAuth.signInWithEmailAndPassword(user.email,user.password)
      .then(()=>{
        this.router.navigate(['']);
      }).catch(err =>{
        return err.message
      })
    }

    logout(){
      
      let status= this.aAuth.signOut();
      this.router.navigate(['']);

    }

    authStatus(){
      
      return this.aAuth.authState
    }
  }
