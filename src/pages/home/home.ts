import { ProfileProvider } from './../../providers/profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public profileProvider:ProfileProvider) {
  }

  ionViewDidLoad() {
    this.profileProvider.getAllMyfriends('software').on('value',(snapshot)=>{
      console.log(snapshot)
      var sn = snapshot.val();
      console.log(snapshot.val());
      for(var i in sn){
        console.log(i);
      }
    })
    console.log('ionViewDidLoad HomePage');
  }

}
