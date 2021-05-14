import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import firebase from 'firebase/app';
import 'firebase/firestore';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  
  db=firebase.firestore();
user:User
isAdmin:boolean=false
currentUser=firebase.auth().currentUser

  constructor() { }


  
  ngOnInit(): void {
    this.checkAdmin()
    
  }

  get(){
    console.log(this.currentUser)
    this.db.collection("Users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // let user:User;
        // user.email=doc.data().email;
        // user.firstName=doc.data().firstName;
        // user.lastName = doc.data().lastName;
        // user.uid = doc.data().uid;
        // this.userList.push(user)
          console.log(`${doc.data().firstName}`);
      });
  });

  }
  update(){
    this.db.collection("users").add({
      first: "Ada",
      last: "Lovelace",
      born: 1815
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
  this.get()
  }

  profile(){
    var docRef = this.db.collection("Users").doc(this.currentUser.uid);
console.log(this.currentUser.uid)
docRef.get().then((doc) => {
    if (doc.exists) {
      
      let a=doc.data().lastName;
      let u:User = new User()
      u.lastName=a
        console.log("Document data:", doc.data(),a,u.lastName);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
  }



  checkAdmin(){
    console.log(this.currentUser.uid)
    if(this.currentUser.uid=="CXjhIfsvVJgqO85Mjy8Zo7lYtLq1")
      this.isAdmin=true
  }

}
