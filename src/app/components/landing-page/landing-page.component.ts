import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';
import { BreatheService } from '../../services/breathe/breathe.service';


const api_url:string = "http://localhost:8000/";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit {

  production = true;
  persist_credentials:boolean = false;
  headers:HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });


  constructor(private http:HttpClient, private router:Router, config:NgbCarouselConfig, public breatheService: BreatheService) {
    config.keyboard = false;

    if(location.host == 'localhost:4200') {
      this.production = false;
    }

  }

  ngOnInit() {
    var that = this;

    // If we are in production, see if we can get our information from the session.
    if(this.production) {
      this.http.get(that.breatheService.fullPath('/api/users/me/')).subscribe(res => {
        console.log('we here???');
        this.router.navigateByUrl('/main');
      }, err => {
        // Do nothing and let them log in.
      });
    } else {
      // Check if user is already logged in
      let user = localStorage.getItem('user');
      if (user == null){
        user = sessionStorage.getItem('user');
      }

      if (user != null){
          this.router.navigateByUrl('/main');
      }
    }

  }

  googleLogin() {
    var url = location.origin + '/google/oauth2/?device=browser';
    location.href = url;
  }

  login(username:string, password:string){
    this.http.post(
      api_url + "rest-auth/login/",
      {"username":username, "password":password},
      {headers: this.headers}
    ).subscribe(
      results => {
        let user_key:string = results["key"];
        if (this.persist_credentials){
          localStorage.removeItem('user');
          localStorage.setItem('user', user_key);
        }else{
          sessionStorage.removeItem('user');
          sessionStorage.setItem('user', user_key);
        }
        // Navigate to new page
        this.router.navigateByUrl('/main');
      },
      // Check for errors
      err => {
        console.log(err.body);
      }
    );
  }
}