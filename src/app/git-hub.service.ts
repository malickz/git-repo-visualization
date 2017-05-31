import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class GitHubService {

  private blocksSubject: BehaviorSubject<Array<number>> = new BehaviorSubject<Array<number>>(undefined);

  constructor(private http: Http) { }

  public getBlameData() {
    return this.http.get('/api/git')
      .map(res => res.json());
  }

  public createGitTree() {
    return this.http.get('/api2/createGitTree')
      .map(res => res.json());
  }

  public getTreeJson() {
    return this.http.get('/api/getTreeJSON')
      .map(res => res.json());
  }

  public singleFileHistory(fpath) {

    let bodyString = JSON.stringify({"path": fpath});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api2/singleFileHistory', bodyString, options).map(
      res => res.json()
    );
  }

  public getTreeSize() {
    return this.http.get('/api2/gitTreeSize')
      .map(res => res.json());
  }

  public getLineData(path: string) {
    let bodyString = JSON.stringify({"path": path});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api2/getLineData', bodyString, options).map(
      res => res.json()
    );
  }

  public getFunctionData(path: string) {
    let bodyString = JSON.stringify({"path": path});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api2/getFunctionData', bodyString, options).map(
      res => res.json()
    );
  }

  public saveFileLOC(block: Array<number>) {
    let bodyString = JSON.stringify({"start": block[0], "end": block[1]});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api2/saveFileLOC', bodyString, options).map(
      res => res.json()
    );
  }

  public getBlockSize(): Observable<Array<number>> {
    return this.blocksSubject;
  }

  public getBlameBlockData(block: Array<number>) {
    let bodyString = JSON.stringify({"start": block[0], "end": block[1]});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api2/blameData', bodyString, options).map(
      res => res.json()
    );
  }

  public getBlocksArray(gtree): Array<number> {
    let blockSize = 500;
    let gtLength = gtree;
    let gt500Blocks = gtLength/blockSize;

    let times = 0;

    if (gtLength > blockSize) {
      times = Math.ceil(gt500Blocks);
    } else {
      times = gt500Blocks;
    }

    let blocks = [];

    let tempSize = blockSize;

    for (let i =0; i < times; i++) {
      let blockItem = [];

      let newSize = 0;
      if(tempSize > gtLength) {
        newSize = gtLength;
      } else {
        newSize = tempSize;
      }

      blockItem.push(tempSize - blockSize);
      blockItem.push(newSize);

      blocks.push(blockItem);
      tempSize = tempSize + blockSize;

    }
    this.blocksSubject.next(blocks);
    return blocks;
  }


}
