import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Menu } from 'ionic-angular';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  @ViewChild('content') content: Nav;
  @ViewChild('menu') menu: Menu;

  // private activePage = new Subject();
  private menuRoot = 'HomePage';
  private topMenu = [
    { title: 'home', component:'HomePage', active: true, icon: 'home' },
 
  ];

  private underMenu = [
    { title: 'Login', component: 'LoginPage', active: false },
   
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page) {
    this.content.setRoot(page.component);
  }

}
