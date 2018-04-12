import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';  //'rxjs/Rx'

import firebase from 'firebase';

import "rxjs/add/Operator/take";  // for .take(1); to return complete object

@Injectable()
export class ProfileProvider {
  public userProfile:firebase.database.Reference;
  public customer:firebase.database.Reference;
  public currentUser:firebase.User;
  public friendsRef: firebase.database.Reference;
  public user: any;
  public phone: number;
  public drivers: any;
  public CustomerOwnPropertyRef: firebase.database.Reference;
  public driver: any;
  public userOtherProfile: any;
  public paymentType: any;
  public card: any;
  public email: any;
  public cvc: any;
  public year: any;
  public month: any;
  public id: any;
  public userId:any;
  public uid: any;
  public profileObservable: Observable<any>;
  
  constructor(private db: AngularFireDatabase) {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        console.log(user)
        this.user = user;
        console.log(this.user)
        this.userId = this.user.uid
        this.userProfile = firebase.database().ref(`profiles/${user.uid}`);

        // this.getUserOtherProfile().on('value', userProfileSnapshot => {
        //   this.driver = userProfileSnapshot.val()
        //  })

      

        // this.getUserProfile().on('value', userProfileSnapshot => {
        //   // this.userProfile = userProfileSnapshot.val();
        //  this.phone = userProfileSnapshot.val().phoneNumber;
        //  this.paymentType = userProfileSnapshot.val().payWith;
        //  this.card = userProfileSnapshot.val().Card_Number;
        //  this.email = userProfileSnapshot.val().Card_email;
        //  this.cvc = userProfileSnapshot.val().Card_Cvc;
        //  this.year = userProfileSnapshot.val().Card_Year;
        //  this.month = userProfileSnapshot.val().Card_month;
        //  console.log(this.phone)
        // })
      }
    });
  }

  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }

  getUserOtherProfile(): firebase.database.Reference {
    return this.userOtherProfile;
  }


  getUserAsClientInfo(): firebase.database.Reference {
    return this.customer;
  }

  getAllDrivers(): firebase.database.Reference {
    return this.drivers;
  }

  updateName(firstName: string, lastName: string): firebase.Promise<void> {
    return this.userProfile.update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  UpdateCollegeDetails(department:string,year:string,city: string): firebase.Promise<any> {
    return this.userProfile.update({
      department: department,
      year:year,
      city:city
    });
  }

  getAllMyfriends(departement){
   return firebase.database().ref(`users`).orderByChild('department')
   .equalTo(departement);
  }
  getUserFavourite(){
    return firebase.database().ref(`usersFavouriteCourses/${this.userId}`).child('course_key1');
    
  }

  getAlldepartmentsFriends(department){
     department ='software';
      //const queryResult = this.database.list('/profiles'); // return all the profiles
      const queryResult = this.db.list(`/users`, {  
        query: {
          orderByChild: 'department',
          equalTo: department
        }
      })
      return queryResult.take(1);
    
  }

  RateDriver(id: any, value: boolean): firebase.Promise<any> {
    return firebase.database().ref(`Customer/${id}/client`).update({
      Client_HasRated: value
    });
  }

  ApprovePickup(value: boolean, id: any): firebase.Promise<any> {
    return firebase.database().ref(`Customer/${id}/client`).update({
      Client_PickedUp: value,
    });
  }

  ApproveDrop(value: boolean, id: any): firebase.Promise<any> {
    return firebase.database().ref(`Customer/${id}/client`).update({
      Client_Dropped: value,
    });
  }

  SendMessage(value: string, id: any): firebase.Promise<any> {
    return firebase.database().ref(`Customer/${id}/client`).update({
      Client_Message: value,
    });
  }

  CanCharge(value: boolean, id: any): firebase.Promise<any> {
    return firebase.database().ref(`Customer/${id}/client`).update({
      Client_CanChargeCard: value,
    });
  }


  UpdatePaymentType(
    number: number): firebase.Promise<any> {
    return this.userProfile.update({
      payWith: number,
    });
  }
  getPorfile() {
    console.log(this.userId);
    this.profileObservable = this.db.object(`/profiles/${this.userId}`);
    return this.profileObservable;
   
 }
 removeCourse(){
  return firebase.database().ref(`usersFavouriteCourses/${this.userId}`).child('course_key1').remove();
  
 }
 getSpecificCourse(){
  return firebase.database().ref(`CoursesRelated`).orderByChild('cs').equalTo(2);
    

 }
  
}