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

}
