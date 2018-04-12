import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase from 'firebase';
import { Platform } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class AuthProvider {
  public fireAuth: firebase.auth.Auth;
  public userProfileRef: firebase.database.Reference;
  private currentUser: firebase.User;

  authState: Observable<firebase.User>; // check if user change state:  log in\log out
  user: firebase.User;

  constructor(public platform: Platform, public afAuth: AngularFireAuth) {
    this.userProfileRef = firebase.database().ref('/profiles');

    firebase.auth().onAuthStateChanged((user: firebase.User) => this.currentUser = user);

  }


  signInWithFacebook(): firebase.Promise<any> {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((success) => {
        var facebookDetails = success;
        console.log("facebook login");
        console.log(success);
        this.afAuth.auth.currentUser.updateProfile({
          displayName: facebookDetails.user.displayName,
          photoURL: facebookDetails.user.photoURL
        }).then(() => {
          this.userProfileRef.child(facebookDetails.user.uid).update({
            uid: facebookDetails.user.uid,
            name: facebookDetails.user.displayName,
            email: facebookDetails.user.email,
            photoURL: facebookDetails.user.photoURL,
            gender: facebookDetails.additionalUserInfo.profile.gender
          }).then(() => {
            resolve({ success: true })
          }).catch((err) => { reject(err) })
        }).catch((err) => { reject(err) })
      }).catch((err) => { reject(err) });

    })
    return promise;

  }


  signInWithGmail(): firebase.Promise<any> {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((success) => {
        var details = success;
        console.log("facebook login");
        console.log(success);
        this.afAuth.auth.currentUser.updateProfile({
          displayName: details.user.displayName,
          photoURL: details.user.photoURL
        }).then(() => {
          let obj ={
            uid: details.user.uid,
            name: details.user.displayName,
            email: details.user.email,
            photoURL: details.user.photoURL,
            gender: details.additionalUserInfo.profile.gender
          }
          this.userProfileRef.child(details.user.uid).set(
            obj
          
          ).then(() => {
            resolve({ success: true })
          }).catch((err) => { reject(err) })
        }).catch((err) => { reject(err) })
      }).catch((err) => { reject(err) });

    })
    return promise;

  }



  signOut(): void {
    this.afAuth.auth.signOut();
  }




}
