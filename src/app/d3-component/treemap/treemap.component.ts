import { Component, OnInit } from '@angular/core';
import {TreeDataService} from "../../tree-data.service";
import {GitHubService} from "../../git-hub.service";

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.css']
})
export class TreemapComponent implements OnInit {

  constructor(private gitHubService: GitHubService) { }

  ngOnInit() {
    this.gitHubService.getTreeJson().subscribe((json) => {
      console.log(json);
    });
  }
}
