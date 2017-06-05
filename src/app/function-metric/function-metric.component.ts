import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {D3Service, D3, Selection } from 'd3-ng2-service';
import {GitHubService} from "../git-hub.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-function-metric',
  templateUrl: './function-metric.component.html',
  styleUrls: ['./function-metric.component.css']
})
export class FunctionMetricComponent implements OnInit {

  @Input() width: number = 700;
  @Input() height: number = 800;

  private _d3: D3;
  private _parentNativeElement: any;
  private _d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  private _d3G: Selection<SVGGElement, any, null, undefined>;
  private authorMap: Map<string, string> = new Map<string, string>();
  private uniqueAuthors: Array<any> = ["others"];
  private funData: Array<any> = [];

  constructor(private _element: ElementRef,
              private _d3Service: D3Service,
              private gitHubService: GitHubService) {
    this._d3 = this._d3Service.getD3();
    this._parentNativeElement = this._element.nativeElement;
  }

  ngOnInit() {
    this.renderChart("attr.c");
  }

  public renderChart(value: string) {
    if (value)
      this.gitHubService.getFunctionMetric(value).subscribe((dataArr: any) => {
        this.funData = dataArr[0];
        let data = dataArr[1];

        let d3 = this._d3;
        let d3ParentElement: Selection<HTMLElement, any, any, any>;
        let d3G: Selection<SVGGElement, any, null, undefined>;
        let path: string = data["path"];

        if (this._parentNativeElement !== null) {

          d3ParentElement = d3.select(this._parentNativeElement);

          this._d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

          this._d3Svg.selectAll('g').remove();

          d3G = this._d3G = this._d3Svg.append<SVGGElement>('g');

          let screenHeight: number =  (Number(data["lines-count"]) * 1.5) + 2;

          this._d3Svg.attr('width', this.width);
          this._d3Svg.attr('height', screenHeight);

          let lineStrokeWidth: number = screenHeight/data["lines-count"];

          let widthSumY1: number = 0;
          let widthSumY2: number = 0;

          this._d3G.selectAll<SVGLineElement, any>('line')
            .data(data.lines)
            .enter()
            .append<SVGLineElement>('line')
            .attr("x1", (d: any) => { // start point of line
              return 0;
            })
            .attr("y1", (d: any) => { // y/ vertical postion of line on left
              widthSumY1 = widthSumY1 + lineStrokeWidth;
              return widthSumY1;
            })
            .attr("x2", (d: any) => { // length of line
              return d.contentlength * 5;
            })
            .attr("y2", (d: any) => { // y/ vertical position of line on right
              widthSumY2 = widthSumY2 + lineStrokeWidth;
              return widthSumY2;
            })
            .attr("stroke-width", 1)
            .attr("stroke", (d: any) => {
              let functionCheck = this.isLinePartOfFunction(d);
              if(functionCheck[0]) {
                return this.getAuthorColor(functionCheck[1][6][0]);
              } else {
                return this.getAuthorColor("others");
              }
            })
            .append("title")
            .text((d: any) => {
              let functionCheck = this.isLinePartOfFunction(d);
              if(functionCheck[0]) {
                return functionCheck[1][6][0] + " --- " + functionCheck[1][4];
              } else {
                return "others";
              }
            });
        }
      });
  }

  private isLinePartOfFunction(d: any): Array<any> {
    let flag: Array<any> = [];
    flag[0] = false;
    this.funData.forEach(fd => {
      if (d.finalline >= Number(fd[2]) && d.finalline <= Number(fd[5])) {
        flag[0] = true;
        flag[1] = fd;
      }
    });
    return flag;
  }

  public getAuthorColor(author: string) {
    if (author == "others") {
      this.authorMap.set(author,  this.hslToHex(0, 0, 75));
    }
    if (this.authorMap.get(author)) {
      return this.authorMap.get(author);
    } else {
      this.uniqueAuthors.push(author);
      let mapSize: number = this.authorMap.size;
      if (mapSize >= colors.length) {
        let rand = colors[Math.floor(Math.random() * colors.length)];
        let colorArr = rand.split(",");
        this.authorMap.set(author, this.hslToHex(colorArr[0], colorArr[1], colorArr[2]));
        return this.authorMap.get(author);
      } else {
        let colorArr = colors[mapSize].split(",");
        this.authorMap.set(author,  this.hslToHex(colorArr[0], colorArr[1], colorArr[2]));
        return this.authorMap.get(author);
      }
    }
  }

  public getLegend(): Observable<any> {
    return Observable.of(this.uniqueAuthors);
  }

  private hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

}

export const colors: Array<string> = [
  "000, 000, 000",
  "017, 097, 044",
  "208, 068, 052",
  "316, 056, 025",
  "104, 044, 045",
  "329, 089, 037",
  "247, 087, 031",
  "182, 082, 033",
  "312, 092, 028",
  "034, 094, 053",
  "156, 096, 032",
  "351, 031, 051",
  "338, 078, 051",
  "169, 049, 031",
  "273, 073, 050",
  "021, 061, 036",
  "173, 093, 047",
  "091, 091, 047",
  "073, 033, 025",
  "342, 042, 041",
  "238, 098, 052",
  "190, 090, 026",
  "099, 099, 027",
  "277, 037, 029",
  "117, 077, 029",
  "234, 054, 025",
  "143, 063, 046",
  "108, 088, 037",
  "177, 057, 035",
  "095, 055, 033",
  "286, 026, 028",
  "086, 066, 037",
  "039, 039, 026",
  "325, 045, 032",
  "260, 040, 025",
  "047, 047, 051",
  "290, 070, 040",
  "121, 041, 035",
  "043, 083, 040",
  "008, 028, 041",
  "164, 024, 031",
  "147, 027, 047",
  "199, 079, 038",
  "355, 075, 025",
  "303, 023, 047",
  "186, 046, 047",
  "004, 064, 041",
  "056, 036, 050",
  "026, 086, 039",
  "212, 032, 044",
  "065, 025, 045",
  "134, 074, 042",
  "299, 059, 039",
  "160, 060, 026",
  "125, 085, 025",
  "013, 053, 050",
  "030, 050, 040",
  "195, 035, 030",
  "112, 052, 031",
  "151, 071, 039",
  "078, 058, 049",
  "225, 065, 028",
  "264, 084, 044",
  "221, 021, 041",
  "138, 038, 052",
  "251, 051, 036",
  "082, 022, 032)"
];
