import {Component, ElementRef, Input, OnInit} from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import {GitHubService} from "../git-hub.service";
import {Observable} from "rxjs/Rx";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-colored-lines',
  templateUrl: './colored-lines.component.html',
  styleUrls: ['./colored-lines.component.css']
})
export class ColoredLinesComponent implements OnInit {

  @Input() width: number = 1000;
  @Input() height: number = 800;

  private _d3: D3;
  private _parentNativeElement: any;
  private _d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  private _d3G: Selection<SVGGElement, any, null, undefined>;
  private authorMap: Map<string, string> = new Map<string, string>();
  private uniqueAuthors: Array<any> = [];
  private onePage: boolean = true;
  private _innerHeight = window.innerHeight;
  public id: string;
  private sub: any;

  constructor(private _element: ElementRef,
              private _d3Service: D3Service,
              private gitHubService: GitHubService,
              private route: ActivatedRoute) {
    this._d3 = this._d3Service.getD3();
    this._parentNativeElement = this._element.nativeElement;
  }

  ngOnInit() {
    $(".loading").show();
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      let fileName: string = this.id ? this.id : "README.md";

      this.gitHubService.getLineData(fileName).subscribe((data: any) => {
        let d3 = this._d3;
        let d3ParentElement: Selection<HTMLElement, any, any, any>;
        let d3G: Selection<SVGGElement, any, null, undefined>;
        let authorLookup: Map<string, number> = new Map<string, number>();
        let authorLookupArray: Array<any> = [];
        let sortedDataByMaxAuthor: Array<any> = [];
        let path: string = data["path"];
        let authorCount: number = 0;

        window.innerHeight;

        data.lines.forEach(line => {
          if (!authorLookup.get(line.personid)) {
            data.lines.forEach(line2 => {
              if(line.personid === line2.personid) {
                authorCount++;
              }
            });
            authorLookup.set(line.personid, authorCount);
            authorLookupArray.push([line.personid, authorCount]);
            authorCount = 0;
          }
        });

        authorLookupArray.sort((a, b) => { // returns me sorted list of authors according to their LOC in ascending order
          return b[1] > a[1] ? 1 : -1;
        }).forEach(a => {
          data.lines.forEach(line => {
            if(a[0] === line.personid) {
              sortedDataByMaxAuthor.push(line); // stack the lines as per sorted authors list, author with more lines comes at top and then the one with 2nd less lines
            }
          });
        });
        //
        // this.uniqueAuthors = sortedDataByMaxAuthor.map(auth=> {
        //   return auth.personid
        // }).filter((elem, index, self) => {
        //   return index == self.indexOf(elem);
        // }).map((auth) => {
        //   return {"personid": auth}
        // });

        this.uniqueAuthors = authorLookupArray;

        if (this._parentNativeElement !== null) {

          d3ParentElement = d3.select(this._parentNativeElement);

          this._d3Svg = d3ParentElement.select<SVGSVGElement>('svg');


          d3G = this._d3G = this._d3Svg.append<SVGGElement>('g');

          if (this.onePage) {
            this._d3Svg.attr('width', window.screen.width/2);
            this._d3Svg.attr('height', window.innerHeight);

            let widthLine: number = window.innerHeight/(Number(data["lines"][data["lines"].length-1].finalline));

            let widthSumY1: number = 0;
            let widthSumY2: number = 0;

            this._d3G.selectAll<SVGLineElement, any>('line')
              .data(sortedDataByMaxAuthor)
              .enter()
              .append<SVGCircleElement>('line')
              .attr("x1", (d: any) => {
                return 0;
              })
              .attr("y1", (d: any) => {
                widthSumY1 = widthSumY1 + widthLine;
                return widthSumY1;
              })
              .attr("x2", (d: any) => {
                //return d.contentlength * 7;
                return 600;
              })
              .attr("y2", (d: any) => {
                widthSumY2 = widthSumY2 + widthLine;
                return widthSumY2;
              })
              .attr("stroke-width", widthLine)
              .attr("stroke", (d: any) => {
                return this.getAuthorColor(d.personid);
              })
              .append("title").text((d: any) => {
              return d.personid;
            });
            $(".loading").hide();
          } else {

            let screenHeight: number =  (Number(data["lines-count"]) * 2) + 2;

            this._d3Svg.attr('width', this.width);
            this._d3Svg.attr('height', screenHeight);

            let lineStrokeWidth: number = screenHeight/data["lines-count"];

            let widthSumY1: number = 0;
            let widthSumY2: number = 0;

            this._d3G.selectAll<SVGLineElement, any>('line')
              .data(sortedDataByMaxAuthor)
              .enter()
              .append<SVGCircleElement>('line')
              .attr("x1", (d: any) => {
                return 0;
              })
              .attr("y1", (d: any) => {
                widthSumY1 = widthSumY1 + lineStrokeWidth;
                return widthSumY1;
              })
              .attr("x2", (d: any) => {
                return 600;
              })
              .attr("y2", (d: any) => {
                widthSumY2 = widthSumY2 + lineStrokeWidth;
                return widthSumY2;
              })
              .attr("stroke-width", 1)
              .attr("stroke", (d: any) => {
                return this.getAuthorColor(d.personid);
              })
              .append("title").text((d: any) => {
              return d.personid;
            });
          }
        }
      });
    });
  }

  public getLegend(): Observable<any> {
    return Observable.of(this.uniqueAuthors);
  }

  public getAuthorColor(author: string) {
    if (this.authorMap.get(author)) {
      return this.authorMap.get(author);
    } else {
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
  "017, 097, 044",
  "000, 000, 000",
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
