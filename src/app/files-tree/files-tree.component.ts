import {Component, ElementRef, OnInit} from "@angular/core";
import {GitHubService} from "../git-hub.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-files-tree',
  templateUrl: './files-tree.component.html',
  styleUrls: ['./files-tree.component.css']
})
export class FilesTreeComponent implements OnInit {
  public nodes = [
    {
      id: 1,
      name: 'root',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    }
  ];

  public options = {
    useVirtualScroll: true,
    nodeHeight: 22
  };

  public fileName: string = "";


  constructor(private gitHubService: GitHubService,
              private _element: ElementRef,
              private router: Router) {
  }

  ngOnInit() {
    $(".loading").show();

    this.gitHubService.getTreeJson().subscribe((json) => {
      this.nodes = json;
      setTimeout(() => {
        $(".toggle-children-wrapper :first").click();
        $(".loading").hide();
      }, 700);
    });
  }
  public onClick(event: any) {
    this.fileName = event.node.data.name;
  }

}
