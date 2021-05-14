import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private dbpath='Users';
userRef:AngularFirestoreCollection<User>;
  constructor(private db:AngularFirestore) {
    this.userRef=db.collection(this.dbpath)
   }
   getAll(): AngularFirestoreCollection<User> {
    return this.userRef;
  }
}
