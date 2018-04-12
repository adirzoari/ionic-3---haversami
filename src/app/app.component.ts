import { ProfileProvider } from './../providers/profile/profile';
import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//providers
import { AuthProvider } from './../providers/auth/auth';
import firebase from 'firebase';

// plugins
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';
  loader: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private authProvider: AuthProvider,
    private profileProvider: ProfileProvider) {
    platform.ready().then(() => {


      this.presentLoading();

      this.storage.get('WelcomeShown').then((result) => {
        if (result) {
          firebase.auth().onAuthStateChanged((user: firebase.User) => {
            console.log('user changed:', user);
            if (user) {
              this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
                let department = userProfileSnapshot.val().department;
                let year = userProfileSnapshot.val().year;
                if (year == null || department == null) {
                  this.rootPage = 'RegisterStudentPage';
                }
                else
                  this.rootPage = 'MenuPage';
              })
              statusBar.styleDefault();
              splashScreen.hide();
            } else {
              this.rootPage = 'LoginPage';
            }
          })

        } else {
          console.log("I'm here");
          //this.rootPage = 'WelcomePage'; //  to change to welcome page -slider page
          this.rootPage = 'LoginPage';
          this.storage.set('WelcomeShown', true);
        }
        this.loader.dismiss();
      });


    });
  }
  presentLoading() {
    this.storage.set('welcomeShown', false);
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }
}

