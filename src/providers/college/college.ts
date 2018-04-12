import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class CollegeProvider {
  public collegeRef:firebase.database.Reference;
  constructor() {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.collegeRef = firebase.database().ref(`collegeDetails/`);
        
      }
    });
  }

  loadYears(): firebase.database.Reference {
    return firebase.database().ref(`collegeDetails/Years`)
  }

  loadDepartments(): firebase.database.Reference {
    return firebase.database().ref(`collegeDetails/Departments`);
  }

  loadCollegeCities(): firebase.database.Reference {
    return firebase.database().ref(`collegeDetails/cities`);
  }

  
}