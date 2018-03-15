import { Injectable } from '@angular/core';

@Injectable()
export class BreatheService {

  baseUrl = 'http://localhost:8000';

  constructor() {
    if (location.host !== 'localhost:4200') {
      this.baseUrl = location.origin;
    }
   }

   fullPath(path) {
     return this.baseUrl + path;
   }

   getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
}
