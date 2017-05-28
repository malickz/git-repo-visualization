import { Component, OnInit } from '@angular/core';
import {GitHubService} from "../git-hub.service";

@Component({
  selector: 'app-create-git-tree',
  templateUrl: './create-git-tree.component.html',
  styleUrls: ['./create-git-tree.component.css']
})
export class CreateGitTreeComponent implements OnInit {

  constructor(private gitHubService: GitHubService) { }

  ngOnInit() {
    this.gitHubService.createGitTree().subscribe((resp)=> {
      console.log(resp)
    });
  }

}
