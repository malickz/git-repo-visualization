import { Component, OnInit } from '@angular/core';
import {GitHubService} from "../git-hub.service";
import {Observable} from "rxjs";
import * as _ from 'underscore';

@Component({
  selector: 'app-git-hub',
  templateUrl: './git-hub.component.html',
  styleUrls: ['./git-hub.component.css']
})
export class GitHubComponent implements OnInit {

  private getBlame: boolean = false;
  private getLoc: boolean = false; // Loc is line of code ;)

  constructor(private gitHubService: GitHubService) {

  }

  public ngOnInit() {
    this.gitHubService.getTreeSize().subscribe((blocks: Array<number[]>) => {

      if (this.getBlame) {
        Observable.from(blocks)
          .concatMap(block => this.callBlockData(block))
          .delay(400)
          .subscribe(val => console.log(val));
      } else if(this.getLoc) {
        Observable.from(blocks)
          .concatMap(block =>  this.gitHubService.saveFileLOC(block))
          .delay(100)
          .subscribe(val => console.log(val));
      } else {
        return;
      }
    });
  }

  private callBlockData(block: Array<number>) {
    return this.gitHubService.getBlameBlockData(block);
  }

}
