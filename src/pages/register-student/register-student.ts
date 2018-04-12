import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { CollegeProvider } from './../../providers/college/college';
import { ProfileProvider } from './../../providers/profile/profile';
import { Year } from '../../models/Year';

@IonicPage()
@Component({
  selector: 'page-register-student',
  templateUrl: 'register-student.html',
})
export class RegisterStudentPage {
  yearsArray:Year[] = [];
  departmentsArray = [];
  collegeCity = [];
  year:any;
  department:any;
  city: any;

  public backgroundImage = 'assets/img/background/background-5.jpg';
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public collegeProvider: CollegeProvider,
    public loadingCtrl: LoadingController,
    public profileProvider: ProfileProvider){

    }
  

  ionViewWillEnter(){
    this.loadCourses();
    
    //this.loadCollegeDetails();
  }

  ionViewDidLoad() {
    this.profileProvider.removeCourse();
    
    // console.log('ionViewDidLoad RegisterStudentPage');
    // this.profileProvider.getPorfile().subscribe(profile =>{
    //   this.profileProvider.getAlldepartmentsFriends(profile.department).subscribe(o=>{
    //     console.log(o);
    //   })
    // })
  }


  loadCourses(){
    this.profileProvider.getSpecificCourse().on('value',f=>{
      console.log(f.val());  
    })

  }
  loadCollegeDetails(){
  
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();
    

    this.collegeProvider.loadYears().on('value',years =>{
      var tempYears = years.val();

      this.yearsArray = years.val();
    
      console.log(this.yearsArray);
    });
    this.collegeProvider.loadYears().once('value').then(years=>{
      years.forEach(y => {
        console.log(y.key);
        console.log(y.val().year);
        
      });
    });

    this.collegeProvider.loadYears().on('value',years =>{
        console.log(years.val());
        years.forEach((y)=>{
          console.log(y.key);
          console.log(y.val().year);
          
          return false;
        });
        
      });
    this.collegeProvider.loadDepartments().once('value',departments =>{
    
      this.departmentsArray = departments.val();
      console.log(this.departmentsArray);
      
    });
    this.collegeProvider.loadCollegeCities().on('value',collegeCities =>{
      loader.dismiss();      
      
      this.collegeCity = collegeCities.val();
      // console.log(this.collegeCity);
      
      
    });
  }

  registerCollegeDetails(){
    this.profileProvider.UpdateCollegeDetails(this.department,this.year,this.city).then(()=>{
        this.navCtrl.setRoot('HomePage');
    })
    }
  }
