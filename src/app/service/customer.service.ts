import { Injectable } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms"
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  form:FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl(''),
    email : new FormControl(''),
    mobile :new FormControl(''),
    city : new FormControl(''),
    gender : new FormControl('1'),
    joinDate: new FormControl(''),
  })
}
