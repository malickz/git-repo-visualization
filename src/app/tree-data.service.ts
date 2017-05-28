import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class TreeDataService {

  constructor(private http: Http) { }

  public getJson() {
    return this.http.get('/api/getTreeJSON')
      .map(res => res.json());
  }
}
