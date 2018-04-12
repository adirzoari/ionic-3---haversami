
import { Component } from '@angular/core';
import {
  Loading,
  Platform,
  LoadingController, 
  NavController,
  AlertController, MenuController } from 'ionic-angular';

import { User } from './../../models/User';

// providers
import { AuthProvider } from './../../providers/auth/auth'
import { ProfileProvider } from './../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public backgroundImage = 'assets/img/background/background-5.jpg';
  
  credentials = {} as User;
  loading: Loading;
  constructor(public navCtrl: NavController,  public platform: Platform,public menu: MenuController, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, public authProvider: AuthProvider,public profileProvider: ProfileProvider) {
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signInWithFacebook() {
    // this.authservice.login(this.credentials).then((res: any) => {
    //   if (!res.code)
    //     this.navCtrl.setRoot('TabsPage');
    //   else
    //     alert(res);
    // })

    this.authProvider.signInWithFacebook()
    .then( authData => {
      
      this.loading.dismiss();
        // this.profileProvider.getUserProfile().on('value',userProfileSnapshot =>{
        //   let department = userProfileSnapshot.val().department;
        //   let year = userProfileSnapshot.val().year;
        //   if(year == null || department == null){
        //     this.navCtrl.setRoot('RegisterStudentPage');
        //   }
        //   else
        //     this.navCtrl.setRoot('HomePage');
        // })
     
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  signInWithGmail() {
    // this.authservice.login(this.credentials).then((res: any) => {
    //   if (!res.code)
    //     this.navCtrl.setRoot('TabsPage');
    //   else
    //     alert(res);
    // })

    this.authProvider.signInWithGmail()
    .then( authData => {
      console.log(authData);
      this.loading.dismiss().then( () => {
        // if (this.ph.phone == null)
        // this.navCtrl.push('StartupPage');
        // else
        // this.navCtrl.setRoot('HomePage');
      });
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

 

}
