import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.userService.logout();
  }

  sessionLogout() {
    const that = this;

    this.userService.sessionLogout().subscribe(res => {
      that.router.navigateByUrl('/welcome');
    });
  }

}
