import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-visual-selection',
  templateUrl: './visual-selection.component.html',
  styleUrls: ['./visual-selection.component.css']
})
export class VisualSelectionComponent implements OnInit {

  @Input() public fileName: string = "README.md";

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  public redirect(type: graphType) {
    if (this.fileName)
      switch (type) {
        case graphType.line:
          this.router.navigate(['./lineGraph', this.fileName]);
          break;
        case graphType.functionDominance:
          this.router.navigate(['./lineGraphFun', this.fileName]);
          break;
        case graphType.functionLineCount:
          this.router.navigate(['./functionDominance', this.fileName]);
          break;
        case graphType.functionLineCountDifferentColorBody:
          this.router.navigate(['./functionDominanceBody', this.fileName]);
          break;
      }

  }

}

export enum graphType {
  line = <any>"line",
  functionDominance = <any>"functionDominance",
  functionLineCount = <any>"functionLineCount",
  functionLineCountDifferentColorBody = <any>"functionLineCountDifferentColorBody"
}
