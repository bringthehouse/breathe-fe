import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

import * as $ from 'jquery';

@Injectable()
export class BreatheService {

  baseUrl = 'http://localhost:8000';
  headers: HttpHeaders = null;

  constructor() {
    const token = localStorage.getItem('user');
    const csrftoken = this.getCookie('csrftoken');

    if (location.host === 'localhost:4200') {
      this.headers = new HttpHeaders({'content-type': 'application/json', 'Authorization': 'Token ' + token});
    } else if (location.host === 'localhost:8000') {
      this.baseUrl = location.origin;
      this.headers = new HttpHeaders({'content-type': 'application/json', 'X-CSRFToken': csrftoken});
    } else {
      this.baseUrl = location.origin;
      this.headers = new HttpHeaders({'content-type': 'application/json', 'X-CSRFToken': csrftoken});
    }
   }

   fullPath(path) {
     return this.baseUrl + path;
   }

   getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  getHeaders() {
    return this.headers;
  }
}
