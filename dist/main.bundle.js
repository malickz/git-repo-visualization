webpackJsonp([1,5],{

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PostsService = (function () {
    function PostsService(http) {
        this.http = http;
    }
    // Get all posts from the API
    PostsService.prototype.getAllPosts = function () {
        return this.http.get('/api/posts')
            .map(function (res) { return res.json(); });
    };
    return PostsService;
}());
PostsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], PostsService);

var _a;
//# sourceMappingURL=posts.service.js.map

/***/ }),

/***/ 298:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 298;


/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(321);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app component!';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(677),
        styles: [__webpack_require__(665)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_d3_ng2_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__test_d3_test_d3_component__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__drag_zoom_2_drag_zoom_2_component__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__posts_posts_component__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__posts_service__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__git_hub_git_hub_component__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__git_hub_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__git_blocks_git_blocks_component__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__create_git_tree_create_git_tree_component__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__d3_component_d3_component_component__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__d3_component_treemap_treemap_component__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__d3_component_sunburst_sunburst_component__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__tree_data_service__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__colored_lines_colored_lines_component__ = __webpack_require__(309);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















// Define the routes
var ROUTES = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
    },
    {
        path: 'posts',
        component: __WEBPACK_IMPORTED_MODULE_8__posts_posts_component__["a" /* PostsComponent */]
    },
    {
        path: 'git',
        component: __WEBPACK_IMPORTED_MODULE_11__git_hub_git_hub_component__["a" /* GitHubComponent */]
    },
    {
        path: 'gitBlock',
        component: __WEBPACK_IMPORTED_MODULE_13__git_blocks_git_blocks_component__["a" /* GitBlocksComponent */]
    },
    {
        path: 'createTree',
        component: __WEBPACK_IMPORTED_MODULE_14__create_git_tree_create_git_tree_component__["a" /* CreateGitTreeComponent */]
    },
    {
        path: 'treeMap',
        component: __WEBPACK_IMPORTED_MODULE_16__d3_component_treemap_treemap_component__["a" /* TreemapComponent */]
    },
    {
        path: 'drag',
        component: __WEBPACK_IMPORTED_MODULE_7__drag_zoom_2_drag_zoom_2_component__["a" /* DragZoom2Component */]
    },
    {
        path: 'lineGraph',
        component: __WEBPACK_IMPORTED_MODULE_19__colored_lines_colored_lines_component__["a" /* ColoredLinesComponent */]
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__test_d3_test_d3_component__["a" /* TestD3Component */],
            __WEBPACK_IMPORTED_MODULE_7__drag_zoom_2_drag_zoom_2_component__["a" /* DragZoom2Component */],
            __WEBPACK_IMPORTED_MODULE_8__posts_posts_component__["a" /* PostsComponent */],
            __WEBPACK_IMPORTED_MODULE_11__git_hub_git_hub_component__["a" /* GitHubComponent */],
            __WEBPACK_IMPORTED_MODULE_13__git_blocks_git_blocks_component__["a" /* GitBlocksComponent */],
            __WEBPACK_IMPORTED_MODULE_14__create_git_tree_create_git_tree_component__["a" /* CreateGitTreeComponent */],
            __WEBPACK_IMPORTED_MODULE_15__d3_component_d3_component_component__["a" /* D3ComponentComponent */],
            __WEBPACK_IMPORTED_MODULE_16__d3_component_treemap_treemap_component__["a" /* TreemapComponent */],
            __WEBPACK_IMPORTED_MODULE_17__d3_component_sunburst_sunburst_component__["a" /* SunburstComponent */],
            __WEBPACK_IMPORTED_MODULE_19__colored_lines_colored_lines_component__["a" /* ColoredLinesComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_9__angular_router__["a" /* RouterModule */].forRoot(ROUTES) // Add routes to the app
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5_d3_ng2_service__["a" /* D3Service */],
            __WEBPACK_IMPORTED_MODULE_10__posts_service__["a" /* PostsService */],
            __WEBPACK_IMPORTED_MODULE_12__git_hub_service__["a" /* GitHubService */],
            __WEBPACK_IMPORTED_MODULE_18__tree_data_service__["a" /* TreeDataService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__git_hub_service__ = __webpack_require__(41);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColoredLinesComponent; });
/* unused harmony export colors */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ColoredLinesComponent = (function () {
    function ColoredLinesComponent(_element, _d3Service, gitHubService) {
        this._element = _element;
        this._d3Service = _d3Service;
        this.gitHubService = gitHubService;
        this.width = 1000;
        this.height = 800;
        this.authorMap = new Map();
        this.onePage = true;
        this._d3 = this._d3Service.getD3();
        this._parentNativeElement = this._element.nativeElement;
    }
    ColoredLinesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gitHubService.getLineData().subscribe(function (data) {
            var d3 = _this._d3;
            var d3ParentElement;
            var d3G;
            var authorLookup = new Map();
            var authorLookupArray = [];
            var sortedDataByMaxAuthor = [];
            var path = data["path"];
            var authorCount = 0;
            data.lines.forEach(function (line) {
                if (!authorLookup.get(line.authormail)) {
                    data.lines.forEach(function (line2) {
                        if (line.authormail === line2.authormail) {
                            authorCount++;
                        }
                    });
                    authorLookup.set(line.authormail, authorCount);
                    authorLookupArray.push([line.authormail, authorCount]);
                    authorCount = 0;
                }
            });
            authorLookupArray.sort(function (a, b) {
                return b[1] > a[1] ? 1 : -1;
            }).forEach(function (a) {
                data.lines.forEach(function (line) {
                    if (a[0] === line.authormail) {
                        sortedDataByMaxAuthor.push(line);
                    }
                });
            });
            if (_this._parentNativeElement !== null) {
                d3ParentElement = d3.select(_this._parentNativeElement);
                _this._d3Svg = d3ParentElement.select('svg');
                d3G = _this._d3G = _this._d3Svg.append('g');
                if (_this.onePage) {
                    _this._d3Svg.attr('width', window.screen.width);
                    _this._d3Svg.attr('height', window.screen.height);
                    var widthLine_1 = window.screen.height / (Number(data["lines"][data["lines"].length - 1].finalline));
                    var widthSumY1_1 = 0;
                    var widthSumY2_1 = 0;
                    _this._d3G.selectAll('line')
                        .data(sortedDataByMaxAuthor)
                        .enter()
                        .append('line')
                        .attr("x1", function (d) {
                        return 0;
                    })
                        .attr("y1", function (d) {
                        widthSumY1_1 = widthSumY1_1 + widthLine_1;
                        return widthSumY1_1;
                    })
                        .attr("x2", function (d) {
                        return d.contentlength * 7;
                    })
                        .attr("y2", function (d) {
                        widthSumY2_1 = widthSumY2_1 + widthLine_1;
                        return widthSumY2_1;
                    })
                        .attr("stroke-width", widthLine_1)
                        .attr("stroke", function (d) {
                        return _this.getAuthorColor(d.authormail);
                    })
                        .append("title").text(function (d) {
                        return d.authormail;
                    });
                }
                else {
                    var screenHeight = (Number(data["lines-count"]) * 2) + 2;
                    _this._d3Svg.attr('width', _this.width);
                    _this._d3Svg.attr('height', screenHeight);
                    var lineStrokeWidth_1 = screenHeight / data["lines-count"];
                    var widthSumY1_2 = 0;
                    var widthSumY2_2 = 0;
                    _this._d3G.selectAll('line')
                        .data(sortedDataByMaxAuthor)
                        .enter()
                        .append('line')
                        .attr("x1", function (d) {
                        return 0;
                    })
                        .attr("y1", function (d) {
                        widthSumY1_2 = widthSumY1_2 + lineStrokeWidth_1;
                        return widthSumY1_2;
                    })
                        .attr("x2", function (d) {
                        return d.contentlength * 7;
                    })
                        .attr("y2", function (d) {
                        widthSumY2_2 = widthSumY2_2 + lineStrokeWidth_1;
                        return widthSumY2_2;
                    })
                        .attr("stroke-width", 1)
                        .attr("stroke", function (d) {
                        return _this.getAuthorColor(d.authormail);
                    })
                        .append("title").text(function (d) {
                        return d.authormail;
                    });
                }
            }
        });
    };
    ColoredLinesComponent.prototype.getAuthorColor = function (author) {
        if (this.authorMap.get(author)) {
            return this.authorMap.get(author);
        }
        else {
            var mapSize = this.authorMap.size;
            if (mapSize >= colors.length) {
                var rand = colors[Math.floor(Math.random() * colors.length)];
                var colorArr = rand.split(",");
                this.authorMap.set(author, this.hslToHex(colorArr[0], colorArr[1], colorArr[2]));
                return this.authorMap.get(author);
            }
            else {
                var colorArr = colors[mapSize].split(",");
                this.authorMap.set(author, this.hslToHex(colorArr[0], colorArr[1], colorArr[2]));
                return this.authorMap.get(author);
            }
        }
    };
    ColoredLinesComponent.prototype.hslToHex = function (h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        var r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        }
        else {
            var hue2rgb = function (p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        var toHex = function (x) {
            var hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return "#" + toHex(r) + toHex(g) + toHex(b);
    };
    return ColoredLinesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Number)
], ColoredLinesComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Number)
], ColoredLinesComponent.prototype, "height", void 0);
ColoredLinesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-colored-lines',
        template: __webpack_require__(678),
        styles: [__webpack_require__(666)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__git_hub_service__["a" /* GitHubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__git_hub_service__["a" /* GitHubService */]) === "function" && _c || Object])
], ColoredLinesComponent);

var colors = [
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
var _a, _b, _c;
//# sourceMappingURL=colored-lines.component.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__git_hub_service__ = __webpack_require__(41);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateGitTreeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CreateGitTreeComponent = (function () {
    function CreateGitTreeComponent(gitHubService) {
        this.gitHubService = gitHubService;
    }
    CreateGitTreeComponent.prototype.ngOnInit = function () {
        this.gitHubService.createGitTree().subscribe(function (resp) {
            console.log(resp);
        });
    };
    return CreateGitTreeComponent;
}());
CreateGitTreeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-create-git-tree',
        template: __webpack_require__(679),
        styles: [__webpack_require__(667)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */]) === "function" && _a || Object])
], CreateGitTreeComponent);

var _a;
//# sourceMappingURL=create-git-tree.component.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return D3ComponentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var D3ComponentComponent = (function () {
    function D3ComponentComponent() {
    }
    D3ComponentComponent.prototype.ngOnInit = function () {
    };
    return D3ComponentComponent;
}());
D3ComponentComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-d3-component',
        template: __webpack_require__(680),
        styles: [__webpack_require__(668)]
    }),
    __metadata("design:paramtypes", [])
], D3ComponentComponent);

//# sourceMappingURL=d3-component.component.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SunburstComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SunburstComponent = (function () {
    function SunburstComponent() {
    }
    SunburstComponent.prototype.ngOnInit = function () {
    };
    return SunburstComponent;
}());
SunburstComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-sunburst',
        template: __webpack_require__(681),
        styles: [__webpack_require__(669)]
    }),
    __metadata("design:paramtypes", [])
], SunburstComponent);

//# sourceMappingURL=sunburst.component.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__git_hub_service__ = __webpack_require__(41);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreemapComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TreemapComponent = (function () {
    function TreemapComponent(gitHubService) {
        this.gitHubService = gitHubService;
    }
    TreemapComponent.prototype.ngOnInit = function () {
        this.gitHubService.getTreeJson().subscribe(function (json) {
            console.log(json);
        });
    };
    return TreemapComponent;
}());
TreemapComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-treemap',
        template: __webpack_require__(682),
        styles: [__webpack_require__(670)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */]) === "function" && _a || Object])
], TreemapComponent);

var _a;
//# sourceMappingURL=treemap.component.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_phyllotaxis__ = __webpack_require__(318);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DragZoom2Component; });
/**
 * This component is an adaptation of the "Drag & Zoom II" Example provided by
 * Mike Bostock at https://bl.ocks.org/mbostock/3127661b6f13f9316be745e77fdfb084
 *
 * The implementation has been modified to illustrate the use of inputs to control
 * the layout of the D3 visualization.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DragZoom2Component = (function () {
    function DragZoom2Component(element, d3Service) {
        this.width = 400;
        this.height = 400;
        this.phylloRadius = 7;
        this.pointRadius = 2;
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
    }
    DragZoom2Component.prototype.ngOnChanges = function (changes) {
        if ((changes['width'] && !changes['width'].isFirstChange()) ||
            (changes['height'] && !changes['height'].isFirstChange()) ||
            (changes['phylloRadius'] && !changes['phylloRadius'].isFirstChange()) ||
            (changes['pointRadius'] && !changes['pointRadius'].isFirstChange())) {
            if (this.d3Svg.empty && !this.d3Svg.empty()) {
                this.changeLayout();
            }
        }
    };
    DragZoom2Component.prototype.ngOnDestroy = function () {
        if (this.d3Svg.empty && !this.d3Svg.empty()) {
            this.d3Svg.selectAll('*').remove();
        }
    };
    DragZoom2Component.prototype.ngOnInit = function () {
        var d3 = this.d3;
        var d3ParentElement;
        var d3G;
        function zoomed() {
            var e = d3.event;
            d3G.attr('transform', e.transform.toString());
        }
        function dragged(d) {
            var e = d3.event;
            d3.select(this).attr('cx', d.x = e.x).attr('cy', d.y = e.y);
        }
        if (this.parentNativeElement !== null) {
            d3ParentElement = d3.select(this.parentNativeElement);
            this.d3Svg = d3ParentElement.select('svg');
            this.d3Svg.attr('width', this.width);
            this.d3Svg.attr('height', this.height);
            this.points = d3.range(2000).map(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__shared_phyllotaxis__["a" /* phyllotaxis */])(this.width, this.height, this.phylloRadius));
            d3G = this.d3G = this.d3Svg.append('g');
            this.d3G.selectAll('circle')
                .data(this.points)
                .enter().append('circle')
                .attr('cx', function (d) { return d.x; })
                .attr('cy', function (d) { return d.y; })
                .attr('r', this.pointRadius)
                .call(d3.drag().on('drag', dragged));
            this.d3Svg.call(d3.zoom()
                .scaleExtent([1 / 2, 8])
                .on('zoom', zoomed));
        }
    };
    DragZoom2Component.prototype.changeLayout = function () {
        this.d3Svg
            .attr('width', this.width)
            .attr('height', this.height);
        this.points = this.d3.range(2000).map(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__shared_phyllotaxis__["a" /* phyllotaxis */])(this.width, this.height, this.phylloRadius));
        this.d3G.selectAll('circle')
            .data(this.points)
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; })
            .attr('r', this.pointRadius);
    };
    return DragZoom2Component;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Number)
], DragZoom2Component.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Number)
], DragZoom2Component.prototype, "height", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Number)
], DragZoom2Component.prototype, "phylloRadius", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Number)
], DragZoom2Component.prototype, "pointRadius", void 0);
DragZoom2Component = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-drag-zoom-2',
        template: '<svg></svg>'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */]) === "function" && _b || Object])
], DragZoom2Component);

var _a, _b;
//# sourceMappingURL=drag-zoom-2.component.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__git_hub_service__ = __webpack_require__(41);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GitBlocksComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GitBlocksComponent = (function () {
    function GitBlocksComponent(gitHubService) {
        this.gitHubService = gitHubService;
    }
    GitBlocksComponent.prototype.ngOnInit = function () {
        this.gitHubService.singleFileHistory("Documentation/00-INDEX").subscribe(function (a) { return console.log(a); });
    };
    return GitBlocksComponent;
}());
GitBlocksComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-git-blocks',
        template: __webpack_require__(683),
        styles: [__webpack_require__(671)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */]) === "function" && _a || Object])
], GitBlocksComponent);

var _a;
//# sourceMappingURL=git-blocks.component.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__git_hub_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GitHubComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GitHubComponent = (function () {
    function GitHubComponent(gitHubService) {
        this.gitHubService = gitHubService;
        this.getBlame = false;
        this.getLoc = false; // Loc is line of code ;)
    }
    GitHubComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gitHubService.getTreeSize().subscribe(function (blocks) {
            if (_this.getBlame) {
                __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].from(blocks)
                    .concatMap(function (block) { return _this.callBlockData(block); })
                    .delay(400)
                    .subscribe(function (val) { return console.log(val); });
            }
            else if (_this.getLoc) {
                __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].from(blocks)
                    .concatMap(function (block) { return _this.gitHubService.saveFileLOC(block); })
                    .delay(100)
                    .subscribe(function (val) { return console.log(val); });
            }
            else {
                return;
            }
        });
    };
    GitHubComponent.prototype.callBlockData = function (block) {
        return this.gitHubService.getBlameBlockData(block);
    };
    return GitHubComponent;
}());
GitHubComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-git-hub',
        template: __webpack_require__(684),
        styles: [__webpack_require__(672)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */]) === "function" && _a || Object])
], GitHubComponent);

var _a;
//# sourceMappingURL=git-hub.component.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__posts_service__ = __webpack_require__(172);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PostsComponent = (function () {
    function PostsComponent(postsService) {
        this.postsService = postsService;
        this.posts = [];
    }
    PostsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Retrieve posts from the API
        this.postsService.getAllPosts().subscribe(function (posts) {
            _this.posts = posts;
        });
    };
    return PostsComponent;
}());
PostsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-posts',
        template: __webpack_require__(685),
        styles: [__webpack_require__(673)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__posts_service__["a" /* PostsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__posts_service__["a" /* PostsService */]) === "function" && _a || Object])
], PostsComponent);

var _a;
//# sourceMappingURL=posts.component.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = phyllotaxis;
/**
 * Created by SMalik on 2017-03-28.
 */
/**
 * A helper function to obtain a generator for a phyllotaxis layout of points
 */
function phyllotaxis(width, height, radius) {
    var theta = Math.PI * (3 - Math.sqrt(5));
    return function (i) {
        var r = radius * Math.sqrt(i), a = theta * i;
        return {
            x: width / 2 + r * Math.cos(a),
            y: height / 2 + r * Math.sin(a)
        };
    };
}
//# sourceMappingURL=phyllotaxis.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__ = __webpack_require__(85);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestD3Component; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TestD3Component = (function () {
    function TestD3Component(element, d3Service) {
        this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
        this.parentNativeElement = element.nativeElement;
    }
    TestD3Component.prototype.ngOnInit = function () {
        var d3 = this.d3; // <-- for convenience use a block scope variable
        var d3ParentElement; // <-- Use the Selection interface (very basic here for illustration only)
        // ...
        if (this.parentNativeElement !== null) {
            d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method
            // Do more D3 things
        }
    };
    return TestD3Component;
}());
TestD3Component = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-test-d3',
        template: __webpack_require__(686),
        styles: [__webpack_require__(674)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */]) === "function" && _b || Object])
], TestD3Component);

var _a, _b;
//# sourceMappingURL=test-d3.component.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(73);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeDataService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TreeDataService = (function () {
    function TreeDataService(http) {
        this.http = http;
    }
    TreeDataService.prototype.getJson = function () {
        return this.http.get('/api/getTreeJSON')
            .map(function (res) { return res.json(); });
    };
    return TreeDataService;
}());
TreeDataService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], TreeDataService);

var _a;
//# sourceMappingURL=tree-data.service.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GitHubService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GitHubService = (function () {
    function GitHubService(http) {
        this.http = http;
        this.blocksSubject = new __WEBPACK_IMPORTED_MODULE_3_rxjs__["BehaviorSubject"](undefined);
    }
    GitHubService.prototype.getBlameData = function () {
        return this.http.get('/api/git')
            .map(function (res) { return res.json(); });
    };
    GitHubService.prototype.createGitTree = function () {
        return this.http.get('/api2/createGitTree')
            .map(function (res) { return res.json(); });
    };
    GitHubService.prototype.getTreeJson = function () {
        return this.http.get('/api/getTreeJSON')
            .map(function (res) { return res.json(); });
    };
    GitHubService.prototype.singleFileHistory = function (fpath) {
        var bodyString = JSON.stringify({ "path": fpath });
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post('/api2/singleFileHistory', bodyString, options).map(function (res) { return res.json(); });
    };
    GitHubService.prototype.getTreeSize = function () {
        return this.http.get('/api2/gitTreeSize')
            .map(function (res) { return res.json(); });
    };
    GitHubService.prototype.getLineData = function () {
        return this.http.get('/api2/getLineData')
            .map(function (res) { return res.json(); });
    };
    GitHubService.prototype.saveFileLOC = function (block) {
        var bodyString = JSON.stringify({ "start": block[0], "end": block[1] });
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post('/api2/saveFileLOC', bodyString, options).map(function (res) { return res.json(); });
    };
    GitHubService.prototype.getBlockSize = function () {
        return this.blocksSubject;
    };
    GitHubService.prototype.getBlameBlockData = function (block) {
        var bodyString = JSON.stringify({ "start": block[0], "end": block[1] });
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post('/api2/blameData', bodyString, options).map(function (res) { return res.json(); });
    };
    GitHubService.prototype.getBlocksArray = function (gtree) {
        var blockSize = 500;
        var gtLength = gtree;
        var gt500Blocks = gtLength / blockSize;
        var times = 0;
        if (gtLength > blockSize) {
            times = Math.ceil(gt500Blocks);
        }
        else {
            times = gt500Blocks;
        }
        var blocks = [];
        var tempSize = blockSize;
        for (var i = 0; i < times; i++) {
            var blockItem = [];
            var newSize = 0;
            if (tempSize > gtLength) {
                newSize = gtLength;
            }
            else {
                newSize = tempSize;
            }
            blockItem.push(tempSize - blockSize);
            blockItem.push(newSize);
            blocks.push(blockItem);
            tempSize = tempSize + blockSize;
        }
        this.blocksSubject.next(blocks);
        return blocks;
    };
    return GitHubService;
}());
GitHubService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], GitHubService);

var _a;
//# sourceMappingURL=git-hub.service.js.map

/***/ }),

/***/ 665:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 666:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 667:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 668:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 669:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 670:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 671:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 672:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 673:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 674:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 677:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ 678:
/***/ (function(module, exports) {

module.exports = "<svg style=\"padding-left: 10px;\"></svg>\n"

/***/ }),

/***/ 679:
/***/ (function(module, exports) {

module.exports = "<p>\n  create-git-tree works!\n</p>\n"

/***/ }),

/***/ 680:
/***/ (function(module, exports) {

module.exports = "<p>\n  d3-component works!\n</p>\n"

/***/ }),

/***/ 681:
/***/ (function(module, exports) {

module.exports = "<p>\n  sunburst works!\n</p>\n"

/***/ }),

/***/ 682:
/***/ (function(module, exports) {

module.exports = "<p>\n  treemap works!\n</p>\n"

/***/ }),

/***/ 683:
/***/ (function(module, exports) {

module.exports = "<p>\n  git-blocks works!\n</p>\n"

/***/ }),

/***/ 684:
/***/ (function(module, exports) {

module.exports = "<p>\n  git-hub works!\n</p>\n"

/***/ }),

/***/ 685:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\" *ngFor=\"let post of posts\">\n    <div class=\"card card-block\">\n      <h4 class=\"card-title\">{{ post.title }}</h4>\n      <p class=\"card-text\">{{post.body}}</p>\n      <a href=\"#\" class=\"card-link\">Card link</a>\n      <a href=\"#\" class=\"card-link\">Another link</a>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 686:
/***/ (function(module, exports) {

module.exports = "<p>\n  test-d3 works!\n</p>\n"

/***/ }),

/***/ 951:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(299);


/***/ })

},[951]);
//# sourceMappingURL=main.bundle.js.map