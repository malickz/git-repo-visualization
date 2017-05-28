import { Component, OnInit } from '@angular/core';
import {GitHubService} from "../git-hub.service";

@Component({
  selector: 'app-git-blocks',
  templateUrl: './git-blocks.component.html',
  styleUrls: ['./git-blocks.component.css']
})
export class GitBlocksComponent implements OnInit {

  constructor(private gitHubService: GitHubService) { }

  ngOnInit() {
    this.gitHubService.singleFileHistory("Documentation/00-INDEX").subscribe(a => console.log(a));

  }

}
