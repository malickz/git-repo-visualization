webpackJsonp([1,5],{

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breakpoints_break_point_registry__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__match_media__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_add_alias__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaMonitor; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */





/**
 * MediaMonitor uses the MatchMedia service to observe mediaQuery changes (both activations and
 * deactivations). These changes are are published as MediaChange notifications.
 *
 * Note: all notifications will be performed within the
 * ng Zone to trigger change detections and component updates.
 *
 * It is the MediaMonitor that:
 *  - auto registers all known breakpoints
 *  - injects alias information into each raw MediaChange event
 *  - provides accessor to the currently active BreakPoint
 *  - publish list of overlapping BreakPoint(s); used by ResponsiveActivation
 */
var MediaMonitor = (function () {
    function MediaMonitor(_breakpoints, _matchMedia) {
        this._breakpoints = _breakpoints;
        this._matchMedia = _matchMedia;
        this._registerBreakpoints();
    }
    Object.defineProperty(MediaMonitor.prototype, "breakpoints", {
        /**
         * Read-only accessor to the list of breakpoints configured in the BreakPointRegistry provider
         */
        get: function () {
            return this._breakpoints.items.slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaMonitor.prototype, "activeOverlaps", {
        get: function () {
            var _this = this;
            var items = this._breakpoints.overlappings.reverse();
            return items.filter(function (bp) {
                return _this._matchMedia.isActive(bp.mediaQuery);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaMonitor.prototype, "active", {
        get: function () {
            var _this = this;
            var found = null, items = this.breakpoints.reverse();
            items.forEach(function (bp) {
                if (bp.alias !== '') {
                    if (!found && _this._matchMedia.isActive(bp.mediaQuery)) {
                        found = bp;
                    }
                }
            });
            var first = this.breakpoints[0];
            return found || (this._matchMedia.isActive(first.mediaQuery) ? first : null);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * For the specified mediaQuery alias, is the mediaQuery range active?
     */
    MediaMonitor.prototype.isActive = function (alias) {
        var bp = this._breakpoints.findByAlias(alias) || this._breakpoints.findByQuery(alias);
        return this._matchMedia.isActive(bp ? bp.mediaQuery : alias);
    };
    /**
     * External observers can watch for all (or a specific) mql changes.
     * If specific breakpoint is observed, only return *activated* events
     * otherwise return all events for BOTH activated + deactivated changes.
     */
    MediaMonitor.prototype.observe = function (alias) {
        var bp = this._breakpoints.findByAlias(alias) || this._breakpoints.findByQuery(alias);
        var hasAlias = function (change) { return (bp ? change.mqAlias !== "" : true); };
        // Note: the raw MediaChange events [from MatchMedia] do not contain important alias information
        return this._matchMedia
            .observe(bp ? bp.mediaQuery : alias)
            .map(function (change) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_add_alias__["a" /* mergeAlias */])(change, bp); })
            .filter(hasAlias);
    };
    /**
     * Immediate calls to matchMedia() to establish listeners
     * and prepare for immediate subscription notifications
     */
    MediaMonitor.prototype._registerBreakpoints = function () {
        var _this = this;
        this._breakpoints.items.forEach(function (bp) {
            _this._matchMedia.registerQuery(bp.mediaQuery);
        });
    };
    return MediaMonitor;
}());

MediaMonitor.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */] },
];
/** @nocollapse */
MediaMonitor.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__breakpoints_break_point_registry__["a" /* BreakPointRegistry */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__match_media__["a" /* MatchMedia */], },
]; };


/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseFxDirectiveAdapter; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Adapter to the BaseFxDirective abstract class so it can be used via composition.
 * @see BaseFxDirective
 */
var BaseFxDirectiveAdapter = (function (_super) {
    __extends(BaseFxDirectiveAdapter, _super);
    /**
     * BaseFxDirectiveAdapter constructor
     */
    function BaseFxDirectiveAdapter(_baseKey, // non-responsive @Input property name
        _mediaMonitor, _elementRef, _renderer) {
        var _this = _super.call(this, _mediaMonitor, _elementRef, _renderer) || this;
        _this._baseKey = _baseKey;
        _this._mediaMonitor = _mediaMonitor;
        _this._elementRef = _elementRef;
        _this._renderer = _renderer;
        return _this;
    }
    Object.defineProperty(BaseFxDirectiveAdapter.prototype, "activeKey", {
        /**
         * Accessor to determine which @Input property is "active"
         * e.g. which property value will be used.
         */
        get: function () {
            var mqa = this._mqActivation;
            var key = mqa ? mqa.activatedInputKey : this._baseKey;
            // Note: ClassDirective::SimpleChanges uses 'klazz' instead of 'class' as a key
            return (key === 'class') ? 'klazz' : key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFxDirectiveAdapter.prototype, "inputMap", {
        /** Hash map of all @Input keys/values defined/used */
        get: function () {
            return this._inputMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFxDirectiveAdapter.prototype, "mqActivation", {
        /**
         * @see BaseFxDirective._mqActivation
         */
        get: function () {
            return this._mqActivation;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @see BaseFxDirective._queryInput
     */
    BaseFxDirectiveAdapter.prototype.queryInput = function (key) {
        return key ? this._queryInput(key) : undefined;
    };
    /**
     *  Save the property value.
     */
    BaseFxDirectiveAdapter.prototype.cacheInput = function (key, source, cacheRaw) {
        if (cacheRaw === void 0) { cacheRaw = false; }
        if (cacheRaw) {
            this._cacheInputRaw(key, source);
        }
        else if (Array.isArray(source)) {
            this._cacheInputArray(key, source);
        }
        else if (typeof source === 'object') {
            this._cacheInputObject(key, source);
        }
        else if (typeof source === 'string') {
            this._cacheInputString(key, source);
        }
        else {
            throw new Error('Invalid class value provided. Did you want to cache the raw value?');
        }
    };
    /**
     * @see BaseFxDirective._listenForMediaQueryChanges
     */
    BaseFxDirectiveAdapter.prototype.listenForMediaQueryChanges = function (key, defaultValue, onMediaQueryChange) {
        return this._listenForMediaQueryChanges(key, defaultValue, onMediaQueryChange);
    };
    // ************************************************************
    // Protected Methods
    // ************************************************************
    /**
     * No implicit transforms of the source.
     * Required when caching values expected later for KeyValueDiffers
     */
    BaseFxDirectiveAdapter.prototype._cacheInputRaw = function (key, source) {
        this._inputMap[key] = source;
    };
    /**
     *  Save the property value for Array values.
     */
    BaseFxDirectiveAdapter.prototype._cacheInputArray = function (key, source) {
        this._inputMap[key] = source.join(' ');
    };
    /**
     *  Save the property value for key/value pair values.
     */
    BaseFxDirectiveAdapter.prototype._cacheInputObject = function (key, source) {
        var classes = [];
        for (var prop in source) {
            if (!!source[prop]) {
                classes.push(prop);
            }
        }
        this._inputMap[key] = classes.join(' ');
    };
    /**
     *  Save the property value for string values.
     */
    BaseFxDirectiveAdapter.prototype._cacheInputString = function (key, source) {
        this._inputMap[key] = source;
    };
    return BaseFxDirectiveAdapter;
}(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* BaseFxDirective */]));



/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__break_points_token__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_break_points__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_orientation_break_points__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_object_extend__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_breakpoint_tools__ = __webpack_require__(321);
/* unused harmony export buildMergedBreakPoints */
/* unused harmony export DEFAULT_BREAKPOINTS_PROVIDER_FACTORY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEFAULT_BREAKPOINTS_PROVIDER; });
/* harmony export (immutable) */ __webpack_exports__["b"] = CUSTOM_BREAKPOINTS_PROVIDER_FACTORY;





/**
 * Add new custom items to the default list or override existing default with custom overrides
 */
function buildMergedBreakPoints(_custom, options) {
    options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_object_extend__["a" /* extendObject */])({}, {
        defaults: true,
        orientation: false // exclude pre-configured, internal orientations breakpoints
    }, options || {});
    return function () {
        // Order so the defaults are loaded last; so ObservableMedia will report these last!
        var defaults = options.orientations ? __WEBPACK_IMPORTED_MODULE_2__data_orientation_break_points__["a" /* ORIENTATION_BREAKPOINTS */].concat(__WEBPACK_IMPORTED_MODULE_1__data_break_points__["a" /* DEFAULT_BREAKPOINTS */]) :
            __WEBPACK_IMPORTED_MODULE_1__data_break_points__["a" /* DEFAULT_BREAKPOINTS */];
        return options.defaults ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_breakpoint_tools__["a" /* mergeByAlias */])(defaults, _custom || []) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_breakpoint_tools__["a" /* mergeByAlias */])(_custom);
    };
}
/**
 *  Ensure that only a single global BreakPoint list is instantiated...
 */
function DEFAULT_BREAKPOINTS_PROVIDER_FACTORY() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_breakpoint_tools__["b" /* validateSuffixes */])(__WEBPACK_IMPORTED_MODULE_1__data_break_points__["a" /* DEFAULT_BREAKPOINTS */]);
}
/**
 * Default Provider that does not support external customization nor provide
 * the extra extended breakpoints:   "handset", "tablet", and "web"
 *
 *  NOTE: !! breakpoints are considered to have unique 'alias' properties,
 *        custom breakpoints matching existing breakpoints will override the properties
 *        of the existing (and not be added as an extra breakpoint entry).
 *        [xs, gt-xs, sm, gt-sm, md, gt-md, lg, gt-lg, xl]
 */
var DEFAULT_BREAKPOINTS_PROVIDER = {
    provide: __WEBPACK_IMPORTED_MODULE_0__break_points_token__["a" /* BREAKPOINTS */],
    useFactory: DEFAULT_BREAKPOINTS_PROVIDER_FACTORY
};
/**
 * Use with FlexLayoutModule.CUSTOM_BREAKPOINTS_PROVIDER_FACTORY!
 */
function CUSTOM_BREAKPOINTS_PROVIDER_FACTORY(_custom, options) {
    return {
        provide: __WEBPACK_IMPORTED_MODULE_0__break_points_token__["a" /* BREAKPOINTS */],
        useFactory: buildMergedBreakPoints(_custom, options)
    };
}


/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BREAKPOINTS; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 *  Injection token unique to the flex-layout library.
 *  Use this token when build a custom provider (see below).
 */
var BREAKPOINTS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* InjectionToken */]('Token (@angular/flex-layout) Breakpoints');


/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__breakpoints_break_point_registry__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__match_media__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__observable_media__ = __webpack_require__(318);
/* unused harmony export OBSERVABLE_MEDIA_PROVIDER_FACTORY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OBSERVABLE_MEDIA_PROVIDER; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */






/**
 * Ensure a single global ObservableMedia service provider
 */
function OBSERVABLE_MEDIA_PROVIDER_FACTORY(parentService, matchMedia, breakpoints) {
    return parentService || new __WEBPACK_IMPORTED_MODULE_5__observable_media__["a" /* MediaService */](matchMedia, breakpoints);
}
/**
 *  Provider to return global service for observable service for all MediaQuery activations
 */
var OBSERVABLE_MEDIA_PROVIDER = {
    provide: __WEBPACK_IMPORTED_MODULE_5__observable_media__["b" /* ObservableMedia */],
    deps: [
        [new __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Optional */](), new __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* SkipSelf */](), __WEBPACK_IMPORTED_MODULE_5__observable_media__["b" /* ObservableMedia */]],
        __WEBPACK_IMPORTED_MODULE_4__match_media__["a" /* MatchMedia */],
        __WEBPACK_IMPORTED_MODULE_3__breakpoints_break_point_registry__["a" /* BreakPointRegistry */]
    ],
    useFactory: OBSERVABLE_MEDIA_PROVIDER_FACTORY
};


/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object_extend__ = __webpack_require__(40);
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeAlias;

/**
 * For the specified MediaChange, make sure it contains the breakpoint alias
 * and suffix (if available).
 */
function mergeAlias(dest, source) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__object_extend__["a" /* extendObject */])(dest, source ? {
        mqAlias: source.alias,
        suffix: source.suffix
    } : {});
}


/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(31);
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

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_auto_prefixer__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_layout_validator__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__responsive_responsive_activation__ = __webpack_require__(312);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseFxDirective; });



/** Abstract base class for the Layout API styling directives. */
var BaseFxDirective = (function () {
    /**
     *
     */
    function BaseFxDirective(_mediaMonitor, _elementRef, _renderer) {
        this._mediaMonitor = _mediaMonitor;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         *  Dictionary of input keys with associated values
         */
        this._inputMap = {};
        this._display = this._getDisplayStyle();
    }
    Object.defineProperty(BaseFxDirective.prototype, "hasMediaQueryListener", {
        get: function () {
            return !!this._mqActivation;
        },
        enumerable: true,
        configurable: true
    });
    // *********************************************
    // Accessor Methods
    // *********************************************
    /**
     * Access the current value (if any) of the @Input property.
     */
    BaseFxDirective.prototype._queryInput = function (key) {
        return this._inputMap[key];
    };
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    BaseFxDirective.prototype.ngOnDestroy = function () {
        if (this._mqActivation) {
            this._mqActivation.destroy();
        }
        this._mediaMonitor = null;
    };
    // *********************************************
    // Protected Methods
    // *********************************************
    /**
     * Was the directive's default selector used ?
     * If not, use the fallback value!
     */
    BaseFxDirective.prototype._getDefaultVal = function (key, fallbackVal) {
        var val = this._queryInput(key);
        var hasDefaultVal = (val !== undefined && val !== null);
        return (hasDefaultVal && val !== '') ? val : fallbackVal;
    };
    /**
     * Quick accessor to the current HTMLElement's `display` style
     * Note: this allows use to preserve the original style
     * and optional restore it when the mediaQueries deactivate
     */
    BaseFxDirective.prototype._getDisplayStyle = function (source) {
        var element = source || this._elementRef.nativeElement;
        var value = element.style['display'] || getComputedStyle(element)['display'];
        return value.trim();
    };
    BaseFxDirective.prototype._getFlowDirection = function (target, addIfMissing) {
        if (addIfMissing === void 0) { addIfMissing = false; }
        var value = "";
        if (target) {
            var directionKeys_1 = Object.keys(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auto_prefixer__["a" /* applyCssPrefixes */])({ 'flex-direction': '' }));
            var findDirection = function (styles) { return directionKeys_1.reduce(function (direction, key) {
                return direction || styles[key];
            }, null); };
            var immediateValue = findDirection(target['style']);
            value = immediateValue || findDirection(getComputedStyle(target));
            if (!immediateValue && addIfMissing) {
                value = value || 'row';
                this._applyStyleToElements(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_layout_validator__["a" /* buildLayoutCSS */])(value), [target]);
            }
        }
        return value ? value.trim() : "row";
    };
    /**
     * Applies styles given via string pair or object map to the directive element.
     */
    BaseFxDirective.prototype._applyStyleToElement = function (style, value, nativeElement) {
        var _this = this;
        var styles = {};
        var element = nativeElement || this._elementRef.nativeElement;
        if (typeof style === 'string') {
            styles[style] = value;
            style = styles;
        }
        styles = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auto_prefixer__["a" /* applyCssPrefixes */])(style);
        // Iterate all properties in hashMap and set styles
        Object.keys(styles).forEach(function (key) {
            _this._renderer.setStyle(element, key, styles[key]);
        });
    };
    /**
     * Applies styles given via string pair or object map to the directive element.
     */
    BaseFxDirective.prototype._applyStyleToElements = function (style, elements) {
        var _this = this;
        var styles = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auto_prefixer__["a" /* applyCssPrefixes */])(style);
        Object.keys(styles).forEach(function (key) {
            elements.forEach(function (el) { return _this._renderer.setStyle(el, key, styles[key]); });
        });
    };
    /**
     *  Save the property value; which may be a complex object.
     *  Complex objects support property chains
     */
    BaseFxDirective.prototype._cacheInput = function (key, source) {
        if (typeof source === 'object') {
            for (var prop in source) {
                this._inputMap[prop] = source[prop];
            }
        }
        else {
            this._inputMap[key] = source;
        }
    };
    /**
     *  Build a ResponsiveActivation object used to manage subscriptions to mediaChange notifications
     *  and intelligent lookup of the directive's property value that corresponds to that mediaQuery
     *  (or closest match).
     */
    BaseFxDirective.prototype._listenForMediaQueryChanges = function (key, defaultValue, onMediaQueryChange) {
        if (!this._mqActivation) {
            var keyOptions = new __WEBPACK_IMPORTED_MODULE_2__responsive_responsive_activation__["a" /* KeyOptions */](key, defaultValue, this._inputMap);
            this._mqActivation = new __WEBPACK_IMPORTED_MODULE_2__responsive_responsive_activation__["b" /* ResponsiveActivation */](keyOptions, this._mediaMonitor, function (change) { return onMediaQueryChange(change); });
        }
        return this._mqActivation;
    };
    Object.defineProperty(BaseFxDirective.prototype, "childrenNodes", {
        /**
         * Special accessor to query for all child 'element' nodes regardless of type, class, etc.
         */
        get: function () {
            var obj = this._elementRef.nativeElement.childNodes;
            var buffer = [];
            // iterate backwards ensuring that length is an UInt32
            for (var i = obj.length; i--;) {
                buffer[i] = obj[i];
            }
            return buffer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Fast validator for presence of attribute on the host element
     */
    BaseFxDirective.prototype.hasKeyValue = function (key) {
        return this._mqActivation.hasKeyValue(key);
    };
    return BaseFxDirective;
}());



/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__media_query_media_monitor__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_layout_validator__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutWrapDirective; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */





/**
 * @deprecated
 * This functionality is now part of the `fxLayout` API
 *
 * 'layout-wrap' flexbox styling directive
 * Defines wrapping of child elements in layout container
 * Optional values: reverse, wrap-reverse, none, nowrap, wrap (default)]
 *
 *
 * @see https://css-tricks.com/almanac/properties/f/flex-wrap/
 */
var LayoutWrapDirective = (function (_super) {
    __extends(LayoutWrapDirective, _super);
    /* tslint:enable */
    function LayoutWrapDirective(monitor, elRef, renderer, container) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this._layout = 'row'; // default flex-direction
        if (container) {
            _this._layoutWatcher = container.layout$.subscribe(_this._onLayoutChange.bind(_this));
        }
        return _this;
    }
    Object.defineProperty(LayoutWrapDirective.prototype, "wrap", {
        /* tslint:disable */
        set: function (val) { this._cacheInput("wrap", val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapXs", {
        set: function (val) { this._cacheInput('wrapXs', val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapSm", {
        set: function (val) { this._cacheInput('wrapSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapMd", {
        set: function (val) { this._cacheInput('wrapMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapLg", {
        set: function (val) { this._cacheInput('wrapLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapXl", {
        set: function (val) { this._cacheInput('wrapXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapGtXs", {
        set: function (val) { this._cacheInput('wrapGtXs', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapGtSm", {
        set: function (val) { this._cacheInput('wrapGtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapGtMd", {
        set: function (val) { this._cacheInput('wrapGtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapGtLg", {
        set: function (val) { this._cacheInput('wrapGtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapLtSm", {
        set: function (val) { this._cacheInput('wrapLtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapLtMd", {
        set: function (val) { this._cacheInput('wrapLtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapLtLg", {
        set: function (val) { this._cacheInput('wrapLtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutWrapDirective.prototype, "wrapLtXl", {
        set: function (val) { this._cacheInput('wrapLtXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    LayoutWrapDirective.prototype.ngOnChanges = function (changes) {
        if (changes['wrap'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutWrapDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('wrap', 'wrap', function (changes) {
            _this._updateWithValue(changes.value);
        });
        this._updateWithValue();
    };
    LayoutWrapDirective.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this._layoutWatcher) {
            this._layoutWatcher.unsubscribe();
        }
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Cache the parent container 'flex-direction' and update the 'flex' styles
     */
    LayoutWrapDirective.prototype._onLayoutChange = function (direction) {
        var _this = this;
        this._layout = (direction || '').toLowerCase().replace('-reverse', '');
        if (!__WEBPACK_IMPORTED_MODULE_4__utils_layout_validator__["b" /* LAYOUT_VALUES */].find(function (x) { return x === _this._layout; })) {
            this._layout = 'row';
        }
        this._updateWithValue();
    };
    LayoutWrapDirective.prototype._updateWithValue = function (value) {
        value = value || this._queryInput("wrap");
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_layout_validator__["c" /* validateWrapValue */])(value || 'wrap');
        this._applyStyleToElement(this._buildCSS(value));
    };
    /**
     * Build the CSS that should be assigned to the element instance
     */
    LayoutWrapDirective.prototype._buildCSS = function (value) {
        return {
            'display': 'flex',
            'flex-wrap': value,
            'flex-direction': this.flowDirection
        };
    };
    Object.defineProperty(LayoutWrapDirective.prototype, "flowDirection", {
        get: function () {
            var _this = this;
            var computeFlowDirection = function () { return _this._getFlowDirection(_this._elementRef.nativeElement); };
            return this._layoutWatcher ? this._layout : computeFlowDirection();
        },
        enumerable: true,
        configurable: true
    });
    return LayoutWrapDirective;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* BaseFxDirective */]));

LayoutWrapDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Directive */], args: [{ selector: "\n  [fxLayoutWrap], [fxLayoutWrap.xs], [fxLayoutWrap.sm], [fxLayoutWrap.lg], [fxLayoutWrap.xl],\n  [fxLayoutWrap.gt-xs], [fxLayoutWrap.gt-sm], [fxLayoutWrap.gt-md], [fxLayoutWrap.gt-lg],\n  [fxLayoutWrap.lt-xs], [fxLayoutWrap.lt-sm], [fxLayoutWrap.lt-md], [fxLayoutWrap.lt-lg]\n" },] },
];
/** @nocollapse */
LayoutWrapDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_3__media_query_media_monitor__["a" /* MediaMonitor */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Renderer2 */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__layout__["a" /* LayoutDirective */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Optional */] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Self */] },] },
]; };
LayoutWrapDirective.propDecorators = {
    'wrap': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap',] },],
    'wrapXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap.xs',] },],
    'wrapSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap.sm',] },],
    'wrapMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap.md',] },],
    'wrapLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap.lg',] },],
    'wrapXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap.xl',] },],
    'wrapGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap.gt-xs',] },],
    'wrapGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap.gt-sm',] },],
    'wrapGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap.gt-md',] },],
    'wrapGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap.gt-lg',] },],
    'wrapLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap.lt-sm',] },],
    'wrapLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap.lt-md',] },],
    'wrapLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap.lt-lg',] },],
    'wrapLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutWrap.lt-xl',] },],
};


/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_object_extend__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ResponsiveActivation; });



var KeyOptions = (function () {
    function KeyOptions(baseKey, defaultValue, inputKeys) {
        this.baseKey = baseKey;
        this.defaultValue = defaultValue;
        this.inputKeys = inputKeys;
    }
    return KeyOptions;
}());

/**
 * ResponsiveActivation acts as a proxy between the MonitorMedia service (which emits mediaQuery
 * changes) and the fx API directives. The MQA proxies mediaQuery change events and notifies the
 * directive via the specified callback.
 *
 * - The MQA also determines which directive property should be used to determine the
 *   current change 'value'... BEFORE the original `onMediaQueryChanges()` method is called.
 * - The `ngOnDestroy()` method is also head-hooked to enable auto-unsubscribe from the
 *   MediaQueryServices.
 *
 * NOTE: these interceptions enables the logic in the fx API directives to remain terse and clean.
 */
var ResponsiveActivation = (function () {
    /**
     * Constructor
     */
    function ResponsiveActivation(_options, _mediaMonitor, _onMediaChanges) {
        this._options = _options;
        this._mediaMonitor = _mediaMonitor;
        this._onMediaChanges = _onMediaChanges;
        this._subscribers = [];
        this._subscribers = this._configureChangeObservers();
    }
    Object.defineProperty(ResponsiveActivation.prototype, "mediaMonitor", {
        /**
         * Accessor to the DI'ed directive property
         * Each directive instance has a reference to the MediaMonitor which is
         * used HERE to subscribe to mediaQuery change notifications.
         */
        get: function () {
            return this._mediaMonitor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponsiveActivation.prototype, "activatedInputKey", {
        /**
         * Determine which directive @Input() property is currently active (for the viewport size):
         * The key must be defined (in use) or fallback to the 'closest' overlapping property key
         * that is defined; otherwise the default property key will be used.
         * e.g.
         *      if `<div fxHide fxHide.gt-sm="false">` is used but the current activated mediaQuery alias
         *      key is `.md` then `.gt-sm` should be used instead
         */
        get: function () {
            return this._activatedInputKey || this._options.baseKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponsiveActivation.prototype, "activatedInput", {
        /**
         * Get the currently activated @Input value or the fallback default @Input value
         */
        get: function () {
            var key = this.activatedInputKey;
            return this.hasKeyValue(key) ? this._lookupKeyValue(key) : this._options.defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Fast validator for presence of attribute on the host element
     */
    ResponsiveActivation.prototype.hasKeyValue = function (key) {
        var value = this._options.inputKeys[key];
        return typeof value !== 'undefined';
    };
    /**
     * Remove interceptors, restore original functions, and forward the onDestroy() call
     */
    ResponsiveActivation.prototype.destroy = function () {
        this._subscribers.forEach(function (link) {
            link.unsubscribe();
        });
        this._subscribers = [];
    };
    /**
     * For each *defined* API property, register a callback to `_onMonitorEvents( )`
     * Cache 1..n subscriptions for internal auto-unsubscribes when the the directive destructs
     */
    ResponsiveActivation.prototype._configureChangeObservers = function () {
        var _this = this;
        var subscriptions = [];
        this._buildRegistryMap().forEach(function (bp) {
            if (_this._keyInUse(bp.key)) {
                // Inject directive default property key name: to let onMediaChange() calls
                // know which property is being triggered...
                var buildChanges = function (change) {
                    change = change.clone();
                    change.property = _this._options.baseKey;
                    return change;
                };
                subscriptions.push(_this.mediaMonitor.observe(bp.alias)
                    .map(buildChanges)
                    .subscribe(function (change) {
                    _this._onMonitorEvents(change);
                }));
            }
        });
        return subscriptions;
    };
    /**
     * Build mediaQuery key-hashmap; only for the directive properties that are actually defined/used
     * in the HTML markup
     */
    ResponsiveActivation.prototype._buildRegistryMap = function () {
        var _this = this;
        return this.mediaMonitor.breakpoints
            .map(function (bp) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_object_extend__["a" /* extendObject */])({}, bp, {
                baseKey: _this._options.baseKey,
                key: _this._options.baseKey + bp.suffix // e.g.  layoutGtSm, layoutMd, layoutGtLg
            });
        })
            .filter(function (bp) { return _this._keyInUse(bp.key); });
    };
    /**
     * Synchronizes change notifications with the current mq-activated @Input and calculates the
     * mq-activated input value or the default value
     */
    ResponsiveActivation.prototype._onMonitorEvents = function (change) {
        if (change.property == this._options.baseKey) {
            change.value = this._calculateActivatedValue(change);
            this._onMediaChanges(change);
        }
    };
    /**
     * Has the key been specified in the HTML markup and thus is intended
     * to participate in activation processes.
     */
    ResponsiveActivation.prototype._keyInUse = function (key) {
        return this._lookupKeyValue(key) !== undefined;
    };
    /**
     *  Map input key associated with mediaQuery activation to closest defined input key
     *  then return the values associated with the targeted input property
     *
     *  !! change events may arrive out-of-order (activate before deactivate)
     *     so make sure the deactivate is used ONLY when the keys match
     *     (since a different activate may be in use)
     */
    ResponsiveActivation.prototype._calculateActivatedValue = function (current) {
        var currentKey = this._options.baseKey + current.suffix; // e.g. suffix == 'GtSm',
        var newKey = this._activatedInputKey; // e.g. newKey == hideGtSm
        newKey = current.matches ? currentKey : ((newKey == currentKey) ? null : newKey);
        this._activatedInputKey = this._validateInputKey(newKey);
        return this.activatedInput;
    };
    /**
     * For the specified input property key, validate it is defined (used in the markup)
     * If not see if a overlapping mediaQuery-related input key fallback has been defined
     *
     * NOTE: scans in the order defined by activeOverLaps (largest viewport ranges -> smallest ranges)
     */
    ResponsiveActivation.prototype._validateInputKey = function (inputKey) {
        var _this = this;
        var items = this.mediaMonitor.activeOverlaps;
        var isMissingKey = function (key) { return !_this._keyInUse(key); };
        if (isMissingKey(inputKey)) {
            items.some(function (bp) {
                var key = _this._options.baseKey + bp.suffix;
                if (!isMissingKey(key)) {
                    inputKey = key;
                    return true; // exit .some()
                }
                return false;
            });
        }
        return inputKey;
    };
    /**
     * Get the value (if any) for the directive instances @Input property (aka key)
     */
    ResponsiveActivation.prototype._lookupKeyValue = function (key) {
        return this._options.inputKeys[key];
    };
    return ResponsiveActivation;
}());



/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__match_media__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__media_monitor__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__observable_media_provider__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__breakpoints_break_points_provider__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__breakpoints_break_point_registry__ = __webpack_require__(46);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaQueriesModule; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */






/**
 * *****************************************************************
 * Define module for the MediaQuery API
 * *****************************************************************
 */
var MediaQueriesModule = (function () {
    function MediaQueriesModule() {
    }
    return MediaQueriesModule;
}());

MediaQueriesModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */], args: [{
                providers: [
                    __WEBPACK_IMPORTED_MODULE_4__breakpoints_break_points_provider__["a" /* DEFAULT_BREAKPOINTS_PROVIDER */],
                    __WEBPACK_IMPORTED_MODULE_5__breakpoints_break_point_registry__["a" /* BreakPointRegistry */],
                    __WEBPACK_IMPORTED_MODULE_1__match_media__["a" /* MatchMedia */],
                    __WEBPACK_IMPORTED_MODULE_2__media_monitor__["a" /* MediaMonitor */],
                    __WEBPACK_IMPORTED_MODULE_3__observable_media_provider__["a" /* OBSERVABLE_MEDIA_PROVIDER */] // easy subscription injectable `media$` matchMedia observable
                ]
            },] },
];
/** @nocollapse */
MediaQueriesModule.ctorParameters = function () { return []; };


/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RESPONSIVE_ALIASES */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEFAULT_BREAKPOINTS; });
var RESPONSIVE_ALIASES = [
    'xs', 'gt-xs', 'sm', 'gt-sm', 'md', 'gt-md', 'lg', 'gt-lg', 'xl'
];
var DEFAULT_BREAKPOINTS = [
    {
        alias: 'xs',
        mediaQuery: 'screen and (max-width: 599px)'
    },
    {
        alias: 'gt-xs',
        overlapping: true,
        mediaQuery: 'screen and (min-width: 600px)'
    },
    {
        alias: 'lt-sm',
        overlapping: true,
        mediaQuery: 'screen and (max-width: 599px)'
    },
    {
        alias: 'sm',
        mediaQuery: 'screen and (min-width: 600px) and (max-width: 959px)'
    },
    {
        alias: 'gt-sm',
        overlapping: true,
        mediaQuery: 'screen and (min-width: 960px)'
    },
    {
        alias: 'lt-md',
        overlapping: true,
        mediaQuery: 'screen and (max-width: 959px)'
    },
    {
        alias: 'md',
        mediaQuery: 'screen and (min-width: 960px) and (max-width: 1279px)'
    },
    {
        alias: 'gt-md',
        overlapping: true,
        mediaQuery: 'screen and (min-width: 1280px)'
    },
    {
        alias: 'lt-lg',
        overlapping: true,
        mediaQuery: 'screen and (max-width: 1279px)'
    },
    {
        alias: 'lg',
        mediaQuery: 'screen and (min-width: 1280px) and (max-width: 1919px)'
    },
    {
        alias: 'gt-lg',
        overlapping: true,
        mediaQuery: 'screen and (min-width: 1920px)'
    },
    {
        alias: 'lt-xl',
        overlapping: true,
        mediaQuery: 'screen and (max-width: 1920px)'
    },
    {
        alias: 'xl',
        mediaQuery: 'screen and (min-width: 1920px) and (max-width: 5000px)'
    }
];


/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ScreenTypes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ORIENTATION_BREAKPOINTS; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/* tslint:disable */
var HANDSET_PORTRAIT = '(orientations: portrait) and (max-width: 599px)';
var HANDSET_LANDSCAPE = '(orientations: landscape) and (max-width: 959px)';
var TABLET_LANDSCAPE = '(orientations: landscape) and (min-width: 960px) and (max-width: 1279px)';
var TABLET_PORTRAIT = '(orientations: portrait) and (min-width: 600px) and (max-width: 839px)';
var WEB_PORTRAIT = '(orientations: portrait) and (min-width: 840px)';
var WEB_LANDSCAPE = '(orientations: landscape) and (min-width: 1280px)';
var ScreenTypes = {
    'HANDSET': HANDSET_PORTRAIT + ", " + HANDSET_LANDSCAPE,
    'TABLET': TABLET_PORTRAIT + " , " + TABLET_LANDSCAPE,
    'WEB': WEB_PORTRAIT + ", " + WEB_LANDSCAPE + " ",
    'HANDSET_PORTRAIT': "" + HANDSET_PORTRAIT,
    'TABLET_PORTRAIT': TABLET_PORTRAIT + " ",
    'WEB_PORTRAIT': "" + WEB_PORTRAIT,
    'HANDSET_LANDSCAPE': HANDSET_LANDSCAPE + "]",
    'TABLET_LANDSCAPE': "" + TABLET_LANDSCAPE,
    'WEB_LANDSCAPE': "" + WEB_LANDSCAPE
};
/**
 * Extended Breakpoints for handset/tablets with landscape or portrait orientations
 */
var ORIENTATION_BREAKPOINTS = [
    { 'alias': 'handset', 'mediaQuery': ScreenTypes.HANDSET },
    { 'alias': 'handset.landscape', 'mediaQuery': ScreenTypes.HANDSET_LANDSCAPE },
    { 'alias': 'handset.portrait', 'mediaQuery': ScreenTypes.HANDSET_PORTRAIT },
    { 'alias': 'tablet', 'mediaQuery': ScreenTypes.TABLET },
    { 'alias': 'tablet.landscape', 'mediaQuery': ScreenTypes.TABLET },
    { 'alias': 'tablet.portrait', 'mediaQuery': ScreenTypes.TABLET_PORTRAIT },
    { 'alias': 'web', 'mediaQuery': ScreenTypes.WEB, overlapping: true },
    { 'alias': 'web.landscape', 'mediaQuery': ScreenTypes.WEB_LANDSCAPE, overlapping: true },
    { 'alias': 'web.portrait', 'mediaQuery': ScreenTypes.WEB_PORTRAIT, overlapping: true }
];


/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaChange; });
/**
 * Class instances emitted [to observers] for each mql notification
 */
var MediaChange = (function () {
    function MediaChange(matches, // Is the mq currently activated
        mediaQuery, // e.g.   (min-width: 600px) and (max-width: 959px)
        mqAlias, // e.g.   gt-sm, md, gt-lg
        suffix // e.g.   GtSM, Md, GtLg
    ) {
        if (matches === void 0) { matches = false; }
        if (mediaQuery === void 0) { mediaQuery = 'all'; }
        if (mqAlias === void 0) { mqAlias = ''; }
        if (suffix === void 0) { suffix = ''; } // e.g.   GtSM, Md, GtLg
        this.matches = matches;
        this.mediaQuery = mediaQuery;
        this.mqAlias = mqAlias;
        this.suffix = suffix; // e.g.   GtSM, Md, GtLg
    }
    MediaChange.prototype.clone = function () {
        return new MediaChange(this.matches, this.mediaQuery, this.mqAlias, this.suffix);
    };
    return MediaChange;
}());



/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__media_monitor__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__match_media__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__breakpoints_break_point_registry__ = __webpack_require__(46);
/* unused harmony export MEDIA_MONITOR_PROVIDER_FACTORY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MEDIA_MONITOR_PROVIDER; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




/**
 * Ensure a single global service provider
 */
function MEDIA_MONITOR_PROVIDER_FACTORY(parentMonitor, breakpoints, matchMedia) {
    return parentMonitor || new __WEBPACK_IMPORTED_MODULE_1__media_monitor__["a" /* MediaMonitor */](breakpoints, matchMedia);
}
/**
 * Export provider that uses a global service factory (above)
 */
var MEDIA_MONITOR_PROVIDER = {
    provide: __WEBPACK_IMPORTED_MODULE_1__media_monitor__["a" /* MediaMonitor */],
    deps: [
        [new __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Optional */](), new __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* SkipSelf */](), __WEBPACK_IMPORTED_MODULE_1__media_monitor__["a" /* MediaMonitor */]],
        __WEBPACK_IMPORTED_MODULE_3__breakpoints_break_point_registry__["a" /* BreakPointRegistry */],
        __WEBPACK_IMPORTED_MODULE_2__match_media__["a" /* MatchMedia */],
    ],
    useFactory: MEDIA_MONITOR_PROVIDER_FACTORY
};


/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__breakpoints_break_point_registry__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__match_media__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_add_alias__ = __webpack_require__(185);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ObservableMedia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaService; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */






/**
 * Base class for MediaService and pseudo-token for
 */
var ObservableMedia = (function () {
    function ObservableMedia() {
    }
    return ObservableMedia;
}());

/**
 * Class internalizes a MatchMedia service and exposes an Subscribable and Observable interface.

 * This an Observable with that exposes a feature to subscribe to mediaQuery
 * changes and a validator method (`isActive(<alias>)`) to test if a mediaQuery (or alias) is
 * currently active.
 *
 * !! Only mediaChange activations (not de-activations) are announced by the ObservableMedia
 *
 * This class uses the BreakPoint Registry to inject alias information into the raw MediaChange
 * notification. For custom mediaQuery notifications, alias information will not be injected and
 * those fields will be ''.
 *
 * !! This is not an actual Observable. It is a wrapper of an Observable used to publish additional
 * methods like `isActive(<alias>). To access the Observable and use RxJS operators, use
 * `.asObservable()` with syntax like media.asObservable().map(....).
 *
 *  @usage
 *
 *  // RxJS
 *  import 'rxjs/add/operator/filter';
 *  import { ObservableMedia } from '@angular/flex-layout';
 *
 *  @Component({ ... })
 *  export class AppComponent {
 *    status : string = '';
 *
 *    constructor(  media:ObservableMedia ) {
 *      let onChange = (change:MediaChange) => {
 *        this.status = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : "";
 *      };
 *
 *      // Subscribe directly or access observable to use filter/map operators
 *      // e.g.
 *      //      media.subscribe(onChange);
 *
 *      media.asObservable()
 *        .filter((change:MediaChange) => true)   // silly noop filter
 *        .subscribe(onChange);
 *    }
 *  }
 */
var MediaService = (function () {
    function MediaService(mediaWatcher, breakpoints) {
        this.mediaWatcher = mediaWatcher;
        this.breakpoints = breakpoints;
        /**
         * Should we announce gt-<xxx> breakpoint activations ?
         */
        this.filterOverlaps = true;
        this.observable$ = this._buildObservable();
        this._registerBreakPoints();
    }
    /**
     * Test if specified query/alias is active.
     */
    MediaService.prototype.isActive = function (alias) {
        var query = this._toMediaQuery(alias);
        return this.mediaWatcher.isActive(query);
    };
    ;
    /**
     * Proxy to the Observable subscribe method
     */
    MediaService.prototype.subscribe = function (next, error, complete) {
        return this.observable$.subscribe(next, error, complete);
    };
    ;
    /**
     * Access to observable for use with operators like
     * .filter(), .map(), etc.
     */
    MediaService.prototype.asObservable = function () {
        return this.observable$;
    };
    // ************************************************
    // Internal Methods
    // ************************************************
    /**
     * Register all the mediaQueries registered in the BreakPointRegistry
     * This is needed so subscribers can be auto-notified of all standard, registered
     * mediaQuery activations
     */
    MediaService.prototype._registerBreakPoints = function () {
        var _this = this;
        this.breakpoints.items.forEach(function (bp) {
            _this.mediaWatcher.registerQuery(bp.mediaQuery);
            return bp;
        });
    };
    /**
     * Prepare internal observable
     * NOTE: the raw MediaChange events [from MatchMedia] do not contain important alias information
     * these must be injected into the MediaChange
     */
    MediaService.prototype._buildObservable = function () {
        var _this = this;
        var self = this;
        // Only pass/announce activations (not de-activations)
        // Inject associated (if any) alias information into the MediaChange event
        // Exclude mediaQuery activations for overlapping mQs. List bounded mQ ranges only
        var activationsOnly = function (change) {
            return change.matches === true;
        };
        var addAliasInformation = function (change) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_add_alias__["a" /* mergeAlias */])(change, _this._findByQuery(change.mediaQuery));
        };
        var excludeOverlaps = function (change) {
            var bp = _this.breakpoints.findByQuery(change.mediaQuery);
            return !bp ? true : !(self.filterOverlaps && bp.overlapping);
        };
        return this.mediaWatcher.observe()
            .filter(activationsOnly)
            .map(addAliasInformation)
            .filter(excludeOverlaps);
    };
    /**
     * Breakpoint locator by alias
     */
    MediaService.prototype._findByAlias = function (alias) {
        return this.breakpoints.findByAlias(alias);
    };
    /**
     * Breakpoint locator by mediaQuery
     */
    MediaService.prototype._findByQuery = function (query) {
        return this.breakpoints.findByQuery(query);
    };
    ;
    /**
     * Find associated breakpoint (if any)
     */
    MediaService.prototype._toMediaQuery = function (query) {
        var bp = this._findByAlias(query) || this._findByQuery(query);
        return bp ? bp.mediaQuery : query;
    };
    ;
    return MediaService;
}());

MediaService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */] },
];
/** @nocollapse */
MediaService.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_4__match_media__["a" /* MatchMedia */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__breakpoints_break_point_registry__["a" /* BreakPointRegistry */], },
]; };


/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyCssPrefixes;
/* unused harmony export toAlignContentValue */
/* unused harmony export toBoxValue */
/* unused harmony export toBoxOrient */
/* unused harmony export toBoxDirection */
/* unused harmony export toBoxOrdinal */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Applies CSS prefixes to appropriate style keys.*/
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ function applyCssPrefixes(target) {
    for (var key in target) {
        var value = target[key];
        switch (key) {
            case 'display':
                target['display'] = value;
                // also need 'display : -webkit-box' and 'display : -ms-flexbox;'
                break;
            case 'flex':
                target['-ms-flex'] = value;
                target['-webkit-box-flex'] = value.split(" ")[0];
                break;
            case 'flex-direction':
                value = value || "row";
                target['flex-direction'] = value;
                target['-ms-flex-direction'] = value;
                target['-webkit-box-orient'] = toBoxOrient(value);
                target['-webkit-box-direction'] = toBoxDirection(value);
                break;
            case 'flex-wrap':
                target['-ms-flex-wrap'] = value;
                break;
            case 'order':
                if (isNaN(value)) {
                    value = "0";
                }
                target['order'] = value;
                target['-ms-flex-order'] = value;
                target['-webkit-box-ordinal-group'] = toBoxOrdinal(value);
                break;
            case 'justify-content':
                target['-ms-flex-pack'] = toBoxValue(value);
                target['-webkit-box-pack'] = toBoxValue(value);
                break;
            case 'align-items':
                target['-ms-flex-align'] = toBoxValue(value);
                target['-webkit-box-align'] = toBoxValue(value);
                break;
            case 'align-self':
                target['-ms-flex-item-align'] = toBoxValue(value);
                break;
            case 'align-content':
                target['-ms-align-content'] = toAlignContentValue(value);
                target['-ms-flex-line-pack'] = toAlignContentValue(value);
                break;
        }
    }
    return target;
}
function toAlignContentValue(value) {
    switch (value) {
        case "space-between":
            return "justify";
        case "space-around":
            return "distribute";
        default:
            return toBoxValue(value);
    }
}
/** Convert flex values flex-start, flex-end to start, end. */
function toBoxValue(value) {
    if (value === void 0) { value = ""; }
    return (value == 'flex-start') ? 'start' : ((value == 'flex-end') ? 'end' : value);
}
/** Convert flex Direction to Box orientations */
function toBoxOrient(flexDirection) {
    if (flexDirection === void 0) { flexDirection = 'row'; }
    return flexDirection.indexOf('column') === -1 ? 'horizontal' : 'vertical';
}
/** Convert flex Direction to Box direction type */
function toBoxDirection(flexDirection) {
    if (flexDirection === void 0) { flexDirection = 'row'; }
    return flexDirection.indexOf('reverse') !== -1 ? 'reverse' : 'normal';
}
/** Convert flex order to Box ordinal group */
function toBoxOrdinal(order) {
    if (order === void 0) { order = '0'; }
    var value = order ? parseInt(order) + 1 : 1;
    return isNaN(value) ? "0" : value.toString();
}


/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = validateBasis;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
* The flex API permits 3 or 1 parts of the value:
*    - `flex-grow flex-shrink flex-basis`, or
*    - `flex-basis`
*/
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ function validateBasis(basis, grow, shrink) {
    if (grow === void 0) { grow = "1"; }
    if (shrink === void 0) { shrink = "1"; }
    var parts = [grow, shrink, basis];
    var j = basis.indexOf('calc');
    if (j > 0) {
        parts[2] = _validateCalcValue(basis.substring(j).trim());
        var matches = basis.substr(0, j).trim().split(" ");
        if (matches.length == 2) {
            parts[0] = matches[0];
            parts[1] = matches[1];
        }
    }
    else if (j == 0) {
        parts[2] = _validateCalcValue(basis.trim());
    }
    else {
        var matches = basis.split(" ");
        parts = (matches.length === 3) ? matches : [
            grow, shrink, basis
        ];
    }
    return parts;
}
/**
 * Calc expressions require whitespace before & after any expression operators
 * This is a simple, crude whitespace padding solution.
 *   - "3 3 calc(15em + 20px)"
 *   - calc(100% / 7 * 2)
 *   - "calc(15em + 20px)"
 *   - "calc(15em+20px)"
 *   - "37px"
 *   = "43%"
 */
function _validateCalcValue(calc) {
    return calc.replace(/[\s]/g, "").replace(/[\/\*\+\-]/g, " $& ");
}


/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object_extend__ = __webpack_require__(40);
/* harmony export (immutable) */ __webpack_exports__["b"] = validateSuffixes;
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeByAlias;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var ALIAS_DELIMITERS = /(\.|-|_)/g;
function firstUpperCase(part) {
    var first = part.length > 0 ? part.charAt(0) : "";
    var remainder = (part.length > 1) ? part.slice(1) : "";
    return first.toUpperCase() + remainder;
}
/**
 * Converts snake-case to SnakeCase.
 * @param name Text to UpperCamelCase
 */
function camelCase(name) {
    return name
        .replace(ALIAS_DELIMITERS, "|")
        .split("|")
        .map(firstUpperCase)
        .join("");
}
/**
 * For each breakpoint, ensure that a Suffix is defined;
 * fallback to UpperCamelCase the unique Alias value
 */
function validateSuffixes(list) {
    list.forEach(function (bp) {
        if (!bp.suffix || bp.suffix === "") {
            bp.suffix = camelCase(bp.alias); // create Suffix value based on alias
            bp.overlapping = bp.overlapping || false; // ensure default value
        }
    });
    return list;
}
/**
 * Merge a custom breakpoint list with the default list based on unique alias values
 *  - Items are added if the alias is not in the default list
 *  - Items are merged with the custom override if the alias exists in the default list
 */
function mergeByAlias(defaults, custom) {
    if (custom === void 0) { custom = []; }
    var merged = defaults.map(function (bp) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__object_extend__["a" /* extendObject */])({}, bp); });
    var findByAlias = function (alias) { return merged.reduce(function (result, bp) {
        return result || ((bp.alias === alias) ? bp : null);
    }, null); };
    // Merge custom breakpoints
    custom.forEach(function (bp) {
        var target = findByAlias(bp.alias);
        if (target) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__object_extend__["a" /* extendObject */])(target, bp);
        }
        else {
            merged.push(bp);
        }
    });
    return validateSuffixes(merged);
}


/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NgStyleKeyValue */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ngStyleUtils; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * NgStyle allowed inputs
 */
var NgStyleKeyValue = (function () {
    function NgStyleKeyValue(key, value, noQuotes) {
        if (noQuotes === void 0) { noQuotes = true; }
        this.key = key;
        this.value = value;
        this.key = noQuotes ? key.replace(/['"]/g, "").trim() : key.trim();
        this.value = noQuotes ? value.replace(/['"]/g, "").trim() : value.trim();
        this.value = this.value.replace(/;/, "");
    }
    return NgStyleKeyValue;
}());

/**
 * Transform Operators for @angular/flex-layout NgStyle Directive
 */
var ngStyleUtils = {
    getType: getType,
    buildRawList: buildRawList,
    buildMapFromList: buildMapFromList,
    buildMapFromSet: buildMapFromSet
};
function getType(target) {
    var what = typeof target;
    if (what === 'object') {
        return (target.constructor === Array) ? 'array' :
            (target.constructor === Set) ? 'set' : 'object';
    }
    return what;
}
/**
 * Split string of key:value pairs into Array of k-v pairs
 * e.g.  'key:value; key:value; key:value;' -> ['key:value',...]
 */
function buildRawList(source, delimiter) {
    if (delimiter === void 0) { delimiter = ";"; }
    return String(source)
        .trim()
        .split(delimiter)
        .map(function (val) { return val.trim(); })
        .filter(function (val) { return val !== ""; });
}
/**
 * Convert array of key:value strings to a iterable map object
 */
function buildMapFromList(styles, sanitize) {
    var sanitizeValue = function (it) {
        if (sanitize) {
            it.value = sanitize(it.value);
        }
        return it;
    };
    return styles
        .map(stringToKeyValue)
        .filter(function (entry) { return !!entry; })
        .map(sanitizeValue)
        .reduce(keyValuesToMap, {});
}
;
/**
 * Convert Set<string> or raw Object to an iterable NgStyleMap
 */
function buildMapFromSet(source, sanitize) {
    var list = new Array();
    if (getType(source) == 'set') {
        source.forEach(function (entry) { return list.push(entry); });
    }
    else {
        Object.keys(source).forEach(function (key) {
            list.push(key + ":" + source[key]);
        });
    }
    return buildMapFromList(list, sanitize);
}
/**
 * Convert "key:value" -> [key, value]
 */
function stringToKeyValue(it) {
    var _a = it.split(":"), key = _a[0], val = _a[1];
    return val ? new NgStyleKeyValue(key, val) : null;
}
;
/**
 * Convert [ [key,value] ] -> { key : value }
 */
function keyValuesToMap(map, entry) {
    if (!!entry.key) {
        map[entry.key] = entry.value;
    }
    return map;
}


/***/ }),

/***/ 323:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 323;


/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(347);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(704),
        styles: [__webpack_require__(691)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_d3_ng2_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__test_d3_test_d3_component__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__drag_zoom_2_drag_zoom_2_component__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__posts_posts_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__posts_service__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__git_hub_git_hub_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__git_hub_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__git_blocks_git_blocks_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__create_git_tree_create_git_tree_component__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__d3_component_d3_component_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__d3_component_treemap_treemap_component__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__d3_component_sunburst_sunburst_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__tree_data_service__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__colored_lines_colored_lines_component__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__function_dominant_function_dominant_component__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__server_tmp_node_modules_angular_flex_layout__ = __webpack_require__(988);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__function_metric_function_metric_component__ = __webpack_require__(997);
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
    },
    {
        path: 'lineGraphFun',
        component: __WEBPACK_IMPORTED_MODULE_20__function_dominant_function_dominant_component__["a" /* FunctionDominantComponent */]
    },
    {
        path: 'functionDominance',
        component: __WEBPACK_IMPORTED_MODULE_22__function_metric_function_metric_component__["a" /* FunctionMetricComponent */]
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
            __WEBPACK_IMPORTED_MODULE_19__colored_lines_colored_lines_component__["a" /* ColoredLinesComponent */],
            __WEBPACK_IMPORTED_MODULE_20__function_dominant_function_dominant_component__["a" /* FunctionDominantComponent */],
            __WEBPACK_IMPORTED_MODULE_22__function_metric_function_metric_component__["a" /* FunctionMetricComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_21__server_tmp_node_modules_angular_flex_layout__["a" /* FlexLayoutModule */],
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

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__git_hub_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
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
        this.uniqueAuthors = [];
        this.onePage = true;
        this._innerHeight = window.innerHeight;
        this._d3 = this._d3Service.getD3();
        this._parentNativeElement = this._element.nativeElement;
    }
    ColoredLinesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gitHubService.getLineData("diff.c").subscribe(function (data) {
            var d3 = _this._d3;
            var d3ParentElement;
            var d3G;
            var authorLookup = new Map();
            var authorLookupArray = [];
            var sortedDataByMaxAuthor = [];
            var path = data["path"];
            var authorCount = 0;
            window.innerHeight;
            data.lines.forEach(function (line) {
                if (!authorLookup.get(line.personid)) {
                    data.lines.forEach(function (line2) {
                        if (line.personid === line2.personid) {
                            authorCount++;
                        }
                    });
                    authorLookup.set(line.personid, authorCount);
                    authorLookupArray.push([line.personid, authorCount]);
                    authorCount = 0;
                }
            });
            authorLookupArray.sort(function (a, b) {
                return b[1] > a[1] ? 1 : -1;
            }).forEach(function (a) {
                data.lines.forEach(function (line) {
                    if (a[0] === line.personid) {
                        sortedDataByMaxAuthor.push(line); // stack the lines as per sorted authors list, author with more lines comes at top and then the one with 2nd less lines
                    }
                });
            });
            _this.uniqueAuthors = sortedDataByMaxAuthor.map(function (auth) {
                return auth.personid;
            }).filter(function (elem, index, self) {
                return index == self.indexOf(elem);
            }).map(function (auth) {
                return { "personid": auth };
            });
            if (_this._parentNativeElement !== null) {
                d3ParentElement = d3.select(_this._parentNativeElement);
                _this._d3Svg = d3ParentElement.select('svg');
                d3G = _this._d3G = _this._d3Svg.append('g');
                if (_this.onePage) {
                    _this._d3Svg.attr('width', window.screen.width / 2);
                    _this._d3Svg.attr('height', window.innerHeight);
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
                        //return d.contentlength * 7;
                        return 600;
                    })
                        .attr("y2", function (d) {
                        widthSumY2_1 = widthSumY2_1 + widthLine_1;
                        return widthSumY2_1;
                    })
                        .attr("stroke-width", widthLine_1)
                        .attr("stroke", function (d) {
                        return _this.getAuthorColor(d.personid);
                    })
                        .append("title").text(function (d) {
                        return d.personid;
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
                        return 600;
                    })
                        .attr("y2", function (d) {
                        widthSumY2_2 = widthSumY2_2 + lineStrokeWidth_1;
                        return widthSumY2_2;
                    })
                        .attr("stroke-width", 1)
                        .attr("stroke", function (d) {
                        return _this.getAuthorColor(d.personid);
                    })
                        .append("title").text(function (d) {
                        return d.personid;
                    });
                }
            }
        });
    };
    ColoredLinesComponent.prototype.getLegend = function () {
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].of(this.uniqueAuthors);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-colored-lines',
        template: __webpack_require__(705),
        styles: [__webpack_require__(692)]
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

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-create-git-tree',
        template: __webpack_require__(706),
        styles: [__webpack_require__(693)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */]) === "function" && _a || Object])
], CreateGitTreeComponent);

var _a;
//# sourceMappingURL=create-git-tree.component.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-d3-component',
        template: __webpack_require__(707),
        styles: [__webpack_require__(694)]
    }),
    __metadata("design:paramtypes", [])
], D3ComponentComponent);

//# sourceMappingURL=d3-component.component.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-sunburst',
        template: __webpack_require__(708),
        styles: [__webpack_require__(695)]
    }),
    __metadata("design:paramtypes", [])
], SunburstComponent);

//# sourceMappingURL=sunburst.component.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-treemap',
        template: __webpack_require__(709),
        styles: [__webpack_require__(696)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */]) === "function" && _a || Object])
], TreemapComponent);

var _a;
//# sourceMappingURL=treemap.component.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_phyllotaxis__ = __webpack_require__(344);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-drag-zoom-2',
        template: '<svg></svg>'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */]) === "function" && _b || Object])
], DragZoom2Component);

var _a, _b;
//# sourceMappingURL=drag-zoom-2.component.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__git_hub_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FunctionDominantComponent; });
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




var FunctionDominantComponent = (function () {
    function FunctionDominantComponent(_element, _d3Service, gitHubService) {
        this._element = _element;
        this._d3Service = _d3Service;
        this.gitHubService = gitHubService;
        this.width = 700;
        this.height = 800;
        this.authorMap = new Map();
        this.sortedDataByMaxFunctions = [];
        this.uniqueAuthors = [];
        this._innerHeight = window.innerHeight;
        this._d3 = this._d3Service.getD3();
        this._parentNativeElement = this._element.nativeElement;
    }
    FunctionDominantComponent.prototype.ngOnInit = function () {
        this.renderChart("diff.c");
    };
    FunctionDominantComponent.prototype.renderChart = function (value) {
        var _this = this;
        if (value)
            this.gitHubService.getFunctionData(value, true).subscribe(function (dataArr) {
                var funData = dataArr[0];
                var data = dataArr[1];
                var d3 = _this._d3;
                var d3ParentElement;
                var d3G;
                var authorLookup = new Map();
                var path = data["path"];
                var authorCount = 0;
                var authorLeaderBoard = [];
                var sortedDataByMaxFunctions = [];
                funData.forEach(function (fun) {
                    data.lines.forEach(function (line) {
                        if (parseInt(line.finalline) === parseInt(fun[2])) {
                            fun.push(line.personid);
                        }
                    });
                });
                funData.forEach(function (line) {
                    if (!authorLookup.get(line[line.length - 1])) {
                        funData.forEach(function (line2) {
                            if (line[line.length - 1] === line2[line2.length - 1]) {
                                authorCount++;
                            }
                        });
                        authorLookup.set(line[line.length - 1], authorCount);
                        authorLeaderBoard.push([line[line.length - 1], authorCount, line]);
                        authorCount = 0;
                    }
                });
                authorLeaderBoard.sort(function (a, b) {
                    return b[1] > a[1] ? 1 : -1;
                }).forEach(function (author) {
                    data.lines.forEach(function (line) {
                        if (author[0] === line.personid) {
                            line["functionName"] = author[2][4];
                            sortedDataByMaxFunctions.push(line); // stack the lines as per sorted authors list, author with more function comes at top and then the one with 2nd less lines
                        }
                    });
                });
                data.lines.forEach(function (line) {
                    if (!authorLookup.get(line.personid)) {
                        sortedDataByMaxFunctions.push(line);
                    }
                });
                _this.uniqueAuthors = sortedDataByMaxFunctions.map(function (auth) {
                    return auth.personid;
                }).filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                }).map(function (auth) {
                    return { "personid": auth };
                });
                if (_this._parentNativeElement !== null) {
                    d3ParentElement = d3.select(_this._parentNativeElement);
                    _this._d3Svg = d3ParentElement.select('svg');
                    _this._d3Svg.selectAll('g').remove();
                    d3G = _this._d3G = _this._d3Svg.append('g');
                    var screenHeight = (Number(data["lines-count"]) * 1.5) + 2;
                    _this._d3Svg.attr('width', window.screen.width / 2);
                    _this._d3Svg.attr('height', window.innerHeight);
                    var lineStrokeWidth_1 = window.innerHeight / data["lines-count"];
                    var widthSumY1_1 = 0;
                    var widthSumY2_1 = 0;
                    _this._d3G.selectAll('line')
                        .data(sortedDataByMaxFunctions)
                        .enter()
                        .append('line')
                        .attr("x1", function (d) {
                        return 0;
                    })
                        .attr("y1", function (d) {
                        widthSumY1_1 = widthSumY1_1 + lineStrokeWidth_1;
                        return widthSumY1_1;
                    })
                        .attr("x2", function (d) {
                        return 600;
                    })
                        .attr("y2", function (d) {
                        widthSumY2_1 = widthSumY2_1 + lineStrokeWidth_1;
                        return widthSumY2_1;
                    })
                        .attr("stroke-width", 1)
                        .attr("stroke", function (d) {
                        return _this.getAuthorColor(d.personid);
                    })
                        .append("title").text(function (d) {
                        return d.personid + " *** " + d.functionName;
                    });
                }
            });
    };
    FunctionDominantComponent.prototype.getAuthorColor = function (author) {
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
    FunctionDominantComponent.prototype.getLegend = function () {
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].of(this.uniqueAuthors);
    };
    FunctionDominantComponent.prototype.hslToHex = function (h, s, l) {
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
    return FunctionDominantComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Number)
], FunctionDominantComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Number)
], FunctionDominantComponent.prototype, "height", void 0);
FunctionDominantComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-function-dominant',
        template: __webpack_require__(710),
        styles: [__webpack_require__(697)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__git_hub_service__["a" /* GitHubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__git_hub_service__["a" /* GitHubService */]) === "function" && _c || Object])
], FunctionDominantComponent);

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
//# sourceMappingURL=function-dominant.component.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-git-blocks',
        template: __webpack_require__(711),
        styles: [__webpack_require__(698)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */]) === "function" && _a || Object])
], GitBlocksComponent);

var _a;
//# sourceMappingURL=git-blocks.component.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__git_hub_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(107);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-git-hub',
        template: __webpack_require__(712),
        styles: [__webpack_require__(699)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__git_hub_service__["a" /* GitHubService */]) === "function" && _a || Object])
], GitHubComponent);

var _a;
//# sourceMappingURL=git-hub.component.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__posts_service__ = __webpack_require__(186);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-posts',
        template: __webpack_require__(713),
        styles: [__webpack_require__(700)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__posts_service__["a" /* PostsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__posts_service__["a" /* PostsService */]) === "function" && _a || Object])
], PostsComponent);

var _a;
//# sourceMappingURL=posts.component.js.map

/***/ }),

/***/ 344:
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

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__ = __webpack_require__(70);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-test-d3',
        template: __webpack_require__(714),
        styles: [__webpack_require__(701)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */]) === "function" && _b || Object])
], TestD3Component);

var _a, _b;
//# sourceMappingURL=test-d3.component.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(85);
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

/***/ 347:
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

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extendObject;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Extends an object with the *enumerable* and *own* properties of one or more source objects,
 * similar to Object.assign.
 *
 * @param dest The object which will have properties copied to it.
 * @param sources The source objects from which properties will be copied.
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ function extendObject(dest) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (dest == null) {
        throw TypeError('Cannot convert undefined or null to object');
    }
    for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
        var source = sources_1[_a];
        if (source != null) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    dest[key] = source[key];
                }
            }
        }
    }
    return dest;
}


/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(107);
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
    GitHubService.prototype.getLineData = function (path) {
        var bodyString = JSON.stringify({ "path": path });
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post('/api2/getLineData', bodyString, options).map(function (res) { return res.json(); });
    };
    GitHubService.prototype.getFunctionData = function (path, lineData) {
        var bodyString = JSON.stringify({ "path": path, "lineData": lineData });
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post('/api2/getFunctionData', bodyString, options).map(function (res) { return res.json(); });
    };
    GitHubService.prototype.getFunctionMetric = function (path) {
        var bodyString = JSON.stringify({ "path": path });
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post('/api2/getFunctionMetric', bodyString, options).map(function (res) { return res.json(); });
    };
    GitHubService.prototype.getDominantAuthor = function (block, path) {
        var bodyString = JSON.stringify({ "path": path, "start": block[2], "end": block[5] });
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post('/api2/getDominantAuthor', bodyString, options).map(function (res) { return res.json(); });
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

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__break_points_token__ = __webpack_require__(183);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreakPointRegistry; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * Registry of 1..n MediaQuery breakpoint ranges
 * This is published as a provider and may be overriden from custom, application-specific ranges
 *
 */
var BreakPointRegistry = (function () {
    function BreakPointRegistry(_registry) {
        this._registry = _registry;
    }
    Object.defineProperty(BreakPointRegistry.prototype, "items", {
        /**
         * Accessor to raw list
         */
        get: function () {
            return this._registry.slice();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Search breakpoints by alias (e.g. gt-xs)
     */
    BreakPointRegistry.prototype.findByAlias = function (alias) {
        return this._registry.find(function (bp) { return bp.alias == alias; });
    };
    BreakPointRegistry.prototype.findByQuery = function (query) {
        return this._registry.find(function (bp) { return bp.mediaQuery == query; });
    };
    Object.defineProperty(BreakPointRegistry.prototype, "overlappings", {
        /**
         * Get all the breakpoints whose ranges could overlapping `normal` ranges;
         * e.g. gt-sm overlaps md, lg, and xl
         */
        get: function () {
            return this._registry.filter(function (it) { return it.overlapping == true; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BreakPointRegistry.prototype, "aliases", {
        /**
         * Get list of all registered (non-empty) breakpoint aliases
         */
        get: function () {
            return this._registry.map(function (it) { return it.alias; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BreakPointRegistry.prototype, "suffixes", {
        /**
         * Aliases are mapped to properties using suffixes
         * e.g.  'gt-sm' for property 'layout'  uses suffix 'GtSm'
         * for property layoutGtSM.
         */
        get: function () {
            return this._registry.map(function (it) { return it.suffix; });
        },
        enumerable: true,
        configurable: true
    });
    return BreakPointRegistry;
}());

BreakPointRegistry.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */] },
];
/** @nocollapse */
BreakPointRegistry.ctorParameters = function () { return [
    { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Inject */], args: [__WEBPACK_IMPORTED_MODULE_1__break_points_token__["a" /* BREAKPOINTS */],] },] },
]; };


/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__media_query_media_monitor__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_layout_validator__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutDirective; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */





/**
 * 'layout' flexbox styling directive
 * Defines the positioning flow direction for the child elements: row or column
 * Optional values: column or row (default)
 * @see https://css-tricks.com/almanac/properties/f/flex-direction/
 *
 */
var LayoutDirective = (function (_super) {
    __extends(LayoutDirective, _super);
    /* tslint:enable */
    /**
     *
     */
    function LayoutDirective(monitor, elRef, renderer) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this._announcer = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]("row");
        _this.layout$ = _this._announcer.asObservable();
        return _this;
    }
    Object.defineProperty(LayoutDirective.prototype, "layout", {
        /* tslint:disable */
        set: function (val) { this._cacheInput("layout", val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutXs", {
        set: function (val) { this._cacheInput('layoutXs', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutSm", {
        set: function (val) { this._cacheInput('layoutSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutMd", {
        set: function (val) { this._cacheInput('layoutMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutLg", {
        set: function (val) { this._cacheInput('layoutLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutXl", {
        set: function (val) { this._cacheInput('layoutXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutGtXs", {
        set: function (val) { this._cacheInput('layoutGtXs', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutGtSm", {
        set: function (val) { this._cacheInput('layoutGtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutGtMd", {
        set: function (val) { this._cacheInput('layoutGtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutGtLg", {
        set: function (val) { this._cacheInput('layoutGtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutLtSm", {
        set: function (val) { this._cacheInput('layoutLtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutLtMd", {
        set: function (val) { this._cacheInput('layoutLtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutLtLg", {
        set: function (val) { this._cacheInput('layoutLtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutDirective.prototype, "layoutLtXl", {
        set: function (val) { this._cacheInput('layoutLtXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fxLayout')
     * Then conditionally override with the mq-activated Input's current value
     */
    LayoutDirective.prototype.ngOnChanges = function (changes) {
        if (changes['layout'] != null || this._mqActivation) {
            this._updateWithDirection();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('layout', 'row', function (changes) {
            _this._updateWithDirection(changes.value);
        });
        this._updateWithDirection();
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Validate the direction value and then update the host's inline flexbox styles
     */
    LayoutDirective.prototype._updateWithDirection = function (value) {
        value = value || this._queryInput("layout") || 'row';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        // Update styles and announce to subscribers the *new* direction
        var css = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_layout_validator__["a" /* buildLayoutCSS */])(value);
        this._applyStyleToElement(css);
        this._announcer.next(css['flex-direction']);
    };
    return LayoutDirective;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* BaseFxDirective */]));

LayoutDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Directive */], args: [{ selector: "\n  [fxLayout],\n  [fxLayout.xs], [fxLayout.sm], [fxLayout.md], [fxLayout.lg], [fxLayout.xl],\n  [fxLayout.lt-sm], [fxLayout.lt-md], [fxLayout.lt-lg], [fxLayout.lt-xl],\n  [fxLayout.gt-xs], [fxLayout.gt-sm], [fxLayout.gt-md], [fxLayout.gt-lg]\n" },] },
];
/** @nocollapse */
LayoutDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_3__media_query_media_monitor__["a" /* MediaMonitor */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Renderer2 */], },
]; };
LayoutDirective.propDecorators = {
    'layout': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout',] },],
    'layoutXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout.xs',] },],
    'layoutSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout.sm',] },],
    'layoutMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout.md',] },],
    'layoutLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout.lg',] },],
    'layoutXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout.xl',] },],
    'layoutGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout.gt-xs',] },],
    'layoutGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout.gt-sm',] },],
    'layoutGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout.gt-md',] },],
    'layoutGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout.gt-lg',] },],
    'layoutLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout.lt-sm',] },],
    'layoutLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout.lt-md',] },],
    'layoutLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout.lt-lg',] },],
    'layoutLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayout.lt-xl',] },],
};


/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__media_change__ = __webpack_require__(316);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchMedia; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


// RxJS Operators used by the classes...



/**
 * MediaMonitor configures listeners to mediaQuery changes and publishes an Observable facade to
 * convert mediaQuery change callbacks to subscriber notifications. These notifications will be
 * performed within the ng Zone to trigger change detections and component updates.
 *
 * NOTE: both mediaQuery activations and de-activations are announced in notifications
 */
var MatchMedia = (function () {
    function MatchMedia(_zone) {
        this._zone = _zone;
        this._registry = new Map();
        this._source = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](new __WEBPACK_IMPORTED_MODULE_4__media_change__["a" /* MediaChange */](true));
        this._observable$ = this._source.asObservable();
    }
    /**
     * For the specified mediaQuery?
     */
    MatchMedia.prototype.isActive = function (mediaQuery) {
        if (this._registry.has(mediaQuery)) {
            var mql = this._registry.get(mediaQuery);
            return mql.matches;
        }
        return false;
    };
    /**
     * External observers can watch for all (or a specific) mql changes.
     * Typically used by the MediaQueryAdaptor; optionally available to components
     * who wish to use the MediaMonitor as mediaMonitor$ observable service.
     *
     * NOTE: if a mediaQuery is not specified, then ALL mediaQuery activations will
     *       be announced.
     */
    MatchMedia.prototype.observe = function (mediaQuery) {
        this.registerQuery(mediaQuery);
        return this._observable$.filter(function (change) {
            return mediaQuery ? (change.mediaQuery === mediaQuery) : true;
        });
    };
    /**
     * Based on the BreakPointRegistry provider, register internal listeners for each unique
     * mediaQuery. Each listener emits specific MediaChange data to observers
     */
    MatchMedia.prototype.registerQuery = function (mediaQuery) {
        var _this = this;
        if (mediaQuery) {
            var mql = this._registry.get(mediaQuery);
            var onMQLEvent = function (e) {
                _this._zone.run(function () {
                    var change = new __WEBPACK_IMPORTED_MODULE_4__media_change__["a" /* MediaChange */](e.matches, mediaQuery);
                    _this._source.next(change);
                });
            };
            if (!mql) {
                mql = this._buildMQL(mediaQuery);
                mql.addListener(onMQLEvent);
                this._registry.set(mediaQuery, mql);
            }
            if (mql.matches) {
                onMQLEvent(mql); // Announce activate range for initial subscribers
            }
        }
    };
    /**
     * Call window.matchMedia() to build a MediaQueryList; which
     * supports 0..n listeners for activation/deactivation
     */
    MatchMedia.prototype._buildMQL = function (query) {
        prepareQueryCSS(query);
        var canListen = !!window.matchMedia('all').addListener;
        return canListen ? window.matchMedia(query) : {
            matches: query === 'all' || query === '',
            media: query,
            addListener: function () {
            },
            removeListener: function () {
            }
        };
    };
    return MatchMedia;
}());

MatchMedia.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */] },
];
/** @nocollapse */
MatchMedia.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* NgZone */], },
]; };
/**
 * Private global registry for all dynamically-created, injected style tags
 * @see prepare(query)
 */
var ALL_STYLES = {};
/**
 * For Webkit engines that only trigger the MediaQueryListListener
 * when there is at least one CSS selector for the respective media query.
 *
 * @param query string The mediaQuery used to create a faux CSS selector
 *
 */
function prepareQueryCSS(query) {
    if (!ALL_STYLES[query]) {
        try {
            var style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            if (!style['styleSheet']) {
                var cssText = "@media " + query + " {.fx-query-test{ }}";
                style.appendChild(document.createTextNode(cssText));
            }
            document.getElementsByTagName('head')[0].appendChild(style);
            // Store in private global registry
            ALL_STYLES[query] = style;
        }
        catch (e) {
            console.error(e);
        }
    }
}


/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LAYOUT_VALUES; });
/* harmony export (immutable) */ __webpack_exports__["a"] = buildLayoutCSS;
/* harmony export (immutable) */ __webpack_exports__["c"] = validateWrapValue;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ var LAYOUT_VALUES = ['row', 'column', 'row-reverse', 'column-reverse'];
/**
 * Validate the direction|"direction wrap" value and then update the host's inline flexbox styles
 */
function buildLayoutCSS(value) {
    var _a = validateValue(value), direction = _a[0], wrap = _a[1];
    return buildCSS(direction, wrap);
}
/**
  * Validate the value to be one of the acceptable value options
  * Use default fallback of "row"
  */
function validateValue(value) {
    value = value ? value.toLowerCase() : '';
    var _a = value.split(" "), direction = _a[0], wrap = _a[1];
    if (!LAYOUT_VALUES.find(function (x) { return x === direction; })) {
        direction = LAYOUT_VALUES[0];
    }
    return [direction, validateWrapValue(wrap)];
}
/**
 * Convert layout-wrap="<value>" to expected flex-wrap style
 */
function validateWrapValue(value) {
    if (!!value) {
        switch (value.toLowerCase()) {
            case 'reverse':
            case 'wrap-reverse':
            case 'reverse-wrap':
                value = 'wrap-reverse';
                break;
            case 'no':
            case 'none':
            case 'nowrap':
                value = 'nowrap';
                break;
            // All other values fallback to "wrap"
            default:
                value = 'wrap';
                break;
        }
    }
    return value;
}
/**
 * Build the CSS that should be assigned to the element instance
 * BUG:
 *   1) min-height on a column flex container won’t apply to its flex item children in IE 10-11.
 *      Use height instead if possible; height : <xxx>vh;
 *
 *  This way any padding or border specified on the child elements are
 *  laid out and drawn inside that element's specified width and height.
 */
function buildCSS(direction, wrap) {
    if (wrap === void 0) { wrap = null; }
    return {
        'display': 'flex',
        'box-sizing': 'border-box',
        'flex-direction': direction,
        'flex-wrap': !!wrap ? wrap : null
    };
}


/***/ }),

/***/ 691:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 692:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".container-graph {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n.lines-container {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 70%;\n          flex: 1 1 70%;\n}\n.legend-container {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 30%;\n          flex: 1 1 30%;\n  overflow: auto;\n}\n.lines {\n  padding-left: 0px;\n}\n.legend {\n  padding-left: 0px;\n}\n.legend ul{\n  margin: 0px;\n  list-style: none;\n}\n.legend ul li:before {\n  content: \"\\2022\";\n  font-size: 170%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 693:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 694:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 696:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 697:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".container-graph {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n.lines-container {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 70%;\n          flex: 1 1 70%;\n}\n.legend-container {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 30%;\n          flex: 1 1 30%;\n  overflow: auto;\n}\n.lines {\n  padding-left: 0px;\n}\n.legend {\n  padding-left: 0px;\n}\n.legend ul{\n  margin: 0px;\n  list-style: none;\n}\n.legend ul li:before {\n  content: \"\\2022\";\n  font-size: 170%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 698:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 699:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 700:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 701:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 704:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ 705:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-graph\">\n  <div class=\"lines-container\">\n    <svg class=\"lines\"></svg>\n  </div>\n  <div class=\"legend-container\" [ngStyle]=\"{'height':_innerHeight+'px'}\">\n    <div class=\"legend\">\n      <h3>Legend:</h3>\n      <ul>\n        <li [style.color]=\"getAuthorColor(d.personid)\"\n            *ngFor=\"let d of getLegend() | async\">\n          {{ d.personid }}\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 706:
/***/ (function(module, exports) {

module.exports = "<p>\n  create-git-tree works!\n</p>\n"

/***/ }),

/***/ 707:
/***/ (function(module, exports) {

module.exports = "<p>\n  d3-component works!\n</p>\n"

/***/ }),

/***/ 708:
/***/ (function(module, exports) {

module.exports = "<p>\n  sunburst works!\n</p>\n"

/***/ }),

/***/ 709:
/***/ (function(module, exports) {

module.exports = "<p>\n  treemap works!\n</p>\n"

/***/ }),

/***/ 710:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-graph\">\n  <div class=\"lines-container\">\n    <svg class=\"lines\"></svg>\n  </div>\n  <div class=\"legend-container\" [ngStyle]=\"{'height':_innerHeight+'px'}\">\n    <div class=\"legend\">\n      <input #path >\n      <button (click)=\"renderChart(path.value)\">Submit</button>\n      <h3>Legend:</h3>\n      <ul>\n        <li [style.color]=\"getAuthorColor(d.personid)\"\n            *ngFor=\"let d of getLegend() | async\">\n          {{ d.personid }}\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 711:
/***/ (function(module, exports) {

module.exports = "<p>\n  git-blocks works!\n</p>\n"

/***/ }),

/***/ 712:
/***/ (function(module, exports) {

module.exports = "<p>\n  git-hub works!\n</p>\n"

/***/ }),

/***/ 713:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\" *ngFor=\"let post of posts\">\n    <div class=\"card card-block\">\n      <h4 class=\"card-title\">{{ post.title }}</h4>\n      <p class=\"card-text\">{{post.body}}</p>\n      <a href=\"#\" class=\"card-link\">Card link</a>\n      <a href=\"#\" class=\"card-link\">Another link</a>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 714:
/***/ (function(module, exports) {

module.exports = "<p>\n  test-d3 works!\n</p>\n"

/***/ }),

/***/ 976:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_filter__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__media_query_module__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__media_query_breakpoints_break_points_provider__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__media_query_media_monitor_provider__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__media_query_observable_media_provider__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_flex__ = __webpack_require__(982);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__api_layout__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__api_show_hide__ = __webpack_require__(985);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__api_flex_align__ = __webpack_require__(978);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__api_flex_fill__ = __webpack_require__(979);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__api_flex_offset__ = __webpack_require__(980);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__api_flex_order__ = __webpack_require__(981);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__api_layout_align__ = __webpack_require__(983);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__api_layout_wrap__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__api_layout_gap__ = __webpack_require__(984);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__api_class__ = __webpack_require__(977);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__api_style__ = __webpack_require__(986);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlexLayoutModule; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



















/**
 * Since the equivalent results are easily achieved with a css class attached to each
 * layout child, these have been deprecated and removed from the API.
 *
 *  import {LayoutPaddingDirective} from './api/layout-padding';
 *  import {LayoutMarginDirective} from './api/layout-margin';
 */
var ALL_DIRECTIVES = [
    __WEBPACK_IMPORTED_MODULE_8__api_layout__["a" /* LayoutDirective */],
    __WEBPACK_IMPORTED_MODULE_15__api_layout_wrap__["a" /* LayoutWrapDirective */],
    __WEBPACK_IMPORTED_MODULE_16__api_layout_gap__["a" /* LayoutGapDirective */],
    __WEBPACK_IMPORTED_MODULE_14__api_layout_align__["a" /* LayoutAlignDirective */],
    __WEBPACK_IMPORTED_MODULE_7__api_flex__["a" /* FlexDirective */],
    __WEBPACK_IMPORTED_MODULE_13__api_flex_order__["a" /* FlexOrderDirective */],
    __WEBPACK_IMPORTED_MODULE_12__api_flex_offset__["a" /* FlexOffsetDirective */],
    __WEBPACK_IMPORTED_MODULE_11__api_flex_fill__["a" /* FlexFillDirective */],
    __WEBPACK_IMPORTED_MODULE_10__api_flex_align__["a" /* FlexAlignDirective */],
    __WEBPACK_IMPORTED_MODULE_9__api_show_hide__["a" /* ShowHideDirective */],
    __WEBPACK_IMPORTED_MODULE_17__api_class__["a" /* ClassDirective */],
    __WEBPACK_IMPORTED_MODULE_18__api_style__["a" /* StyleDirective */],
];
/**
 *
 */
var FlexLayoutModule = (function () {
    function FlexLayoutModule() {
    }
    /**
     * External uses can easily add custom breakpoints AND include internal orientations
     * breakpoints; which are not available by default.
     *
     * !! Selector aliases are not auto-configured. Developers must subclass
     * the API directives to support extra selectors for the orientations breakpoints !!
     */
    FlexLayoutModule.provideBreakPoints = function (breakpoints, options) {
        return {
            ngModule: FlexLayoutModule,
            providers: [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__media_query_breakpoints_break_points_provider__["b" /* CUSTOM_BREAKPOINTS_PROVIDER_FACTORY */])(breakpoints, options || { orientations: false })
            ]
        };
    };
    return FlexLayoutModule;
}());

FlexLayoutModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["b" /* NgModule */], args: [{
                declarations: ALL_DIRECTIVES,
                imports: [__WEBPACK_IMPORTED_MODULE_3__media_query_module__["a" /* MediaQueriesModule */]],
                exports: [__WEBPACK_IMPORTED_MODULE_3__media_query_module__["a" /* MediaQueriesModule */]].concat(ALL_DIRECTIVES),
                providers: [
                    __WEBPACK_IMPORTED_MODULE_5__media_query_media_monitor_provider__["a" /* MEDIA_MONITOR_PROVIDER */],
                    __WEBPACK_IMPORTED_MODULE_4__media_query_breakpoints_break_points_provider__["a" /* DEFAULT_BREAKPOINTS_PROVIDER */],
                    __WEBPACK_IMPORTED_MODULE_6__media_query_observable_media_provider__["a" /* OBSERVABLE_MEDIA_PROVIDER */]
                ]
            },] },
];
/** @nocollapse */
FlexLayoutModule.ctorParameters = function () { return []; };


/***/ }),

/***/ 977:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_adapter__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__media_query_media_monitor__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClassDirective; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




/**
 * Directive to add responsive support for ngClass.
 */
var ClassDirective = (function (_super) {
    __extends(ClassDirective, _super);
    /* tslint:enable */
    function ClassDirective(monitor, _iterableDiffers, _keyValueDiffers, _ngEl, _oldRenderer, _renderer) {
        var _this = 
        // TODO: this should use Renderer2 as well, but NgClass hasn't switched over yet.
        _super.call(this, _iterableDiffers, _keyValueDiffers, _ngEl, _oldRenderer) || this;
        _this.monitor = monitor;
        _this._classAdapter = new __WEBPACK_IMPORTED_MODULE_2__base_adapter__["a" /* BaseFxDirectiveAdapter */]('class', monitor, _ngEl, _renderer);
        _this._ngClassAdapter = new __WEBPACK_IMPORTED_MODULE_2__base_adapter__["a" /* BaseFxDirectiveAdapter */]('ngClass', monitor, _ngEl, _renderer);
        return _this;
    }
    Object.defineProperty(ClassDirective.prototype, "ngClassBase", {
        /**
         * Intercept ngClass assignments so we cache the default classes
         * which are merged with activated styles or used as fallbacks.
         * Note: Base ngClass values are applied during ngDoCheck()
         */
        set: function (val) {
            this._ngClassAdapter.cacheInput('ngClass', val, true);
            this.ngClass = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassXs", {
        /* tslint:disable */
        set: function (val) { this._ngClassAdapter.cacheInput('ngClassXs', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassSm", {
        set: function (val) { this._ngClassAdapter.cacheInput('ngClassSm', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassMd", {
        set: function (val) { this._ngClassAdapter.cacheInput('ngClassMd', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassLg", {
        set: function (val) { this._ngClassAdapter.cacheInput('ngClassLg', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassXl", {
        set: function (val) { this._ngClassAdapter.cacheInput('ngClassXl', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassLtSm", {
        set: function (val) { this._ngClassAdapter.cacheInput('ngClassLtSm', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassLtMd", {
        set: function (val) { this._ngClassAdapter.cacheInput('ngClassLtMd', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassLtLg", {
        set: function (val) { this._ngClassAdapter.cacheInput('ngClassLtLg', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassLtXl", {
        set: function (val) { this._ngClassAdapter.cacheInput('ngClassLtXl', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassGtXs", {
        set: function (val) { this._ngClassAdapter.cacheInput('ngClassGtXs', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassGtSm", {
        set: function (val) { this._ngClassAdapter.cacheInput('ngClassGtSm', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassGtMd", {
        set: function (val) { this._ngClassAdapter.cacheInput('ngClassGtMd', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "ngClassGtLg", {
        set: function (val) { this._ngClassAdapter.cacheInput('ngClassGtLg', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classBase", {
        /** Deprecated selectors */
        /**
         * Base class selector values get applied immediately and are considered destructive overwrites to
         * all previous class assignments
         *
         * Delegate to NgClass:klass setter and cache value for base fallback from responsive APIs.
         */
        set: function (val) {
            this._classAdapter.cacheInput('_rawClass', val, true);
            this.klass = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classXs", {
        set: function (val) { this._classAdapter.cacheInput('classXs', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classSm", {
        set: function (val) { this._classAdapter.cacheInput('classSm', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classMd", {
        set: function (val) { this._classAdapter.cacheInput('classMd', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classLg", {
        set: function (val) { this._classAdapter.cacheInput('classLg', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classXl", {
        set: function (val) { this._classAdapter.cacheInput('classXl', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classLtSm", {
        set: function (val) { this._classAdapter.cacheInput('classLtSm', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classLtMd", {
        set: function (val) { this._classAdapter.cacheInput('classLtMd', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classLtLg", {
        set: function (val) { this._classAdapter.cacheInput('classLtLg', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classLtXl", {
        set: function (val) { this._classAdapter.cacheInput('classLtXl', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classGtXs", {
        set: function (val) { this._classAdapter.cacheInput('classGtXs', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classGtSm", {
        set: function (val) { this._classAdapter.cacheInput('classGtSm', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classGtMd", {
        set: function (val) { this._classAdapter.cacheInput('classGtMd', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "classGtLg", {
        set: function (val) { this._classAdapter.cacheInput('classGtLg', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDirective.prototype, "initialClasses", {
        /**
         * Initial value of the `class` attribute; used as
         * fallback and will be merged with nay `ngClass` values
         */
        get: function () {
            return this._classAdapter.queryInput('_rawClass') || "";
        },
        enumerable: true,
        configurable: true
    });
    // ******************************************************************
    // Lifecycle Hooks
    // ******************************************************************
    /**
     * For @Input changes on the current mq activation property
     */
    ClassDirective.prototype.ngOnChanges = function (changes) {
        if (this._classAdapter.activeKey in changes) {
            this._updateKlass();
        }
        if (this._ngClassAdapter.activeKey in changes) {
            this._updateNgClass();
        }
    };
    /**
     * For ChangeDetectionStrategy.onPush and ngOnChanges() updates
     */
    ClassDirective.prototype.ngDoCheck = function () {
        if (!this._classAdapter.hasMediaQueryListener) {
            this._configureMQListener();
        }
        _super.prototype.ngDoCheck.call(this);
    };
    ClassDirective.prototype.ngOnDestroy = function () {
        this._classAdapter.ngOnDestroy();
        this._ngClassAdapter.ngOnDestroy();
    };
    // ******************************************************************
    // Internal Methods
    // ******************************************************************
    /**
     * Build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    ClassDirective.prototype._configureMQListener = function () {
        var _this = this;
        this._classAdapter.listenForMediaQueryChanges('class', '', function (changes) {
            _this._updateKlass(changes.value);
        });
        this._ngClassAdapter.listenForMediaQueryChanges('ngClass', '', function (changes) {
            _this._updateNgClass(changes.value);
            _super.prototype.ngDoCheck.call(_this); // trigger NgClass::_applyIterableChanges()
        });
    };
    /**
     *  Apply updates directly to the NgClass:klass property
     *  ::ngDoCheck() is not needed
     */
    ClassDirective.prototype._updateKlass = function (value) {
        var klass = value || this._classAdapter.queryInput('class') || '';
        if (this._classAdapter.mqActivation) {
            klass = this._classAdapter.mqActivation.activatedInput;
        }
        this.klass = klass || this.initialClasses;
    };
    /**
     *  Identify the activated input value and update the ngClass iterables...
     *  needs ngDoCheck() to actually apply the values to the element
     */
    ClassDirective.prototype._updateNgClass = function (value) {
        if (this._ngClassAdapter.mqActivation) {
            value = this._ngClassAdapter.mqActivation.activatedInput;
        }
        this.ngClass = value || ''; // Delegate subsequent activity to the NgClass logic
    };
    return ClassDirective;
}(__WEBPACK_IMPORTED_MODULE_1__angular_common__["k" /* NgClass */]));

ClassDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Directive */], args: [{
                selector: "\n    [class], [class.xs], [class.sm], [class.md], [class.lg], [class.xl],\n    [class.lt-sm], [class.lt-md], [class.lt-lg], [class.lt-xl],\n    [class.gt-xs], [class.gt-sm], [class.gt-md], [class.gt-lg],\n\n    [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],\n    [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],\n    [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]\n  "
            },] },
];
/** @nocollapse */
ClassDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_3__media_query_media_monitor__["a" /* MediaMonitor */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* IterableDiffers */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* KeyValueDiffers */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Renderer */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Renderer2 */], },
]; };
ClassDirective.propDecorators = {
    'ngClassBase': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass',] },],
    'ngClassXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass.xs',] },],
    'ngClassSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass.sm',] },],
    'ngClassMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass.md',] },],
    'ngClassLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass.lg',] },],
    'ngClassXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass.xl',] },],
    'ngClassLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass.lt-sm',] },],
    'ngClassLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass.lt-md',] },],
    'ngClassLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass.lt-lg',] },],
    'ngClassLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass.lt-xl',] },],
    'ngClassGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass.gt-xs',] },],
    'ngClassGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass.gt-sm',] },],
    'ngClassGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass.gt-md',] },],
    'ngClassGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngClass.gt-lg',] },],
    'classBase': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class',] },],
    'classXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class.xs',] },],
    'classSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class.sm',] },],
    'classMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class.md',] },],
    'classLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class.lg',] },],
    'classXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class.xl',] },],
    'classLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class.lt-sm',] },],
    'classLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class.lt-md',] },],
    'classLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class.lt-lg',] },],
    'classLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class.lt-xl',] },],
    'classGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class.gt-xs',] },],
    'classGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class.gt-sm',] },],
    'classGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class.gt-md',] },],
    'classGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['class.gt-lg',] },],
};


/***/ }),

/***/ 978:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__media_query_media_monitor__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlexAlignDirective; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



/**
 * 'flex-align' flexbox styling directive
 * Allows element-specific overrides for cross-axis alignments in a layout container
 * @see https://css-tricks.com/almanac/properties/a/align-self/
 */
var FlexAlignDirective = (function (_super) {
    __extends(FlexAlignDirective, _super);
    /* tslint:enable */
    function FlexAlignDirective(monitor, elRef, renderer) {
        return _super.call(this, monitor, elRef, renderer) || this;
    }
    Object.defineProperty(FlexAlignDirective.prototype, "align", {
        /* tslint:disable */
        set: function (val) { this._cacheInput('align', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignXs", {
        set: function (val) { this._cacheInput('alignXs', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignSm", {
        set: function (val) { this._cacheInput('alignSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignMd", {
        set: function (val) { this._cacheInput('alignMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignLg", {
        set: function (val) { this._cacheInput('alignLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignXl", {
        set: function (val) { this._cacheInput('alignXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignLtSm", {
        set: function (val) { this._cacheInput('alignLtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignLtMd", {
        set: function (val) { this._cacheInput('alignLtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignLtLg", {
        set: function (val) { this._cacheInput('alignLtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignLtXl", {
        set: function (val) { this._cacheInput('alignLtXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignGtXs", {
        set: function (val) { this._cacheInput('alignGtXs', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignGtSm", {
        set: function (val) { this._cacheInput('alignGtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignGtMd", {
        set: function (val) { this._cacheInput('alignGtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexAlignDirective.prototype, "alignGtLg", {
        set: function (val) { this._cacheInput('alignGtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * For @Input changes on the current mq activation property, see onMediaQueryChanges()
     */
    FlexAlignDirective.prototype.ngOnChanges = function (changes) {
        if (changes['align'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexAlignDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('align', 'stretch', function (changes) {
            _this._updateWithValue(changes.value);
        });
        this._updateWithValue();
    };
    // *********************************************
    // Protected methods
    // *********************************************
    FlexAlignDirective.prototype._updateWithValue = function (value) {
        value = value || this._queryInput("align") || 'stretch';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._applyStyleToElement(this._buildCSS(value));
    };
    FlexAlignDirective.prototype._buildCSS = function (align) {
        var css = {};
        // Cross-axis
        switch (align) {
            case 'start':
                css['align-self'] = 'flex-start';
                break;
            case 'end':
                css['align-self'] = 'flex-end';
                break;
            default:
                css['align-self'] = align;
                break;
        }
        return css;
    };
    return FlexAlignDirective;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* BaseFxDirective */]));

FlexAlignDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Directive */], args: [{
                selector: "\n  [fxFlexAlign],\n  [fxFlexAlign.xs], [fxFlexAlign.sm], [fxFlexAlign.md], [fxFlexAlign.lg], [fxFlexAlign.xl],\n  [fxFlexAlign.lt-sm], [fxFlexAlign.lt-md], [fxFlexAlign.lt-lg], [fxFlexAlign.lt-xl],\n  [fxFlexAlign.gt-xs], [fxFlexAlign.gt-sm], [fxFlexAlign.gt-md], [fxFlexAlign.gt-lg]\n"
            },] },
];
/** @nocollapse */
FlexAlignDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__media_query_media_monitor__["a" /* MediaMonitor */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Renderer2 */], },
]; };
FlexAlignDirective.propDecorators = {
    'align': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign',] },],
    'alignXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign.xs',] },],
    'alignSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign.sm',] },],
    'alignMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign.md',] },],
    'alignLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign.lg',] },],
    'alignXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign.xl',] },],
    'alignLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign.lt-sm',] },],
    'alignLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign.lt-md',] },],
    'alignLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign.lt-lg',] },],
    'alignLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign.lt-xl',] },],
    'alignGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign.gt-xs',] },],
    'alignGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign.gt-sm',] },],
    'alignGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign.gt-md',] },],
    'alignGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexAlign.gt-lg',] },],
};


/***/ }),

/***/ 979:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__media_query_media_monitor__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlexFillDirective; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



var FLEX_FILL_CSS = {
    'margin': 0,
    'width': '100%',
    'height': '100%',
    'min-width': '100%',
    'min-height': '100%'
};
/**
 * 'fxFill' flexbox styling directive
 *  Maximizes width and height of element in a layout container
 *
 *  NOTE: fxFill is NOT responsive API!!
 */
var FlexFillDirective = (function (_super) {
    __extends(FlexFillDirective, _super);
    function FlexFillDirective(monitor, elRef, renderer) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this.elRef = elRef;
        _this.renderer = renderer;
        _this._applyStyleToElement(FLEX_FILL_CSS);
        return _this;
    }
    return FlexFillDirective;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* BaseFxDirective */]));

FlexFillDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Directive */], args: [{ selector: "\n  [fxFill],\n  [fxFlexFill]\n" },] },
];
/** @nocollapse */
FlexFillDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__media_query_media_monitor__["a" /* MediaMonitor */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Renderer2 */], },
]; };


/***/ }),

/***/ 980:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__media_query_media_monitor__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlexOffsetDirective; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



/**
 * 'flex-offset' flexbox styling directive
 * Configures the 'margin-left' of the element in a layout container
 */
var FlexOffsetDirective = (function (_super) {
    __extends(FlexOffsetDirective, _super);
    /* tslint:enable */
    function FlexOffsetDirective(monitor, elRef, renderer) {
        return _super.call(this, monitor, elRef, renderer) || this;
    }
    Object.defineProperty(FlexOffsetDirective.prototype, "offset", {
        /* tslint:disable */
        set: function (val) { this._cacheInput('offset', val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetXs", {
        set: function (val) { this._cacheInput('offsetXs', val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetSm", {
        set: function (val) { this._cacheInput('offsetSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetMd", {
        set: function (val) { this._cacheInput('offsetMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetLg", {
        set: function (val) { this._cacheInput('offsetLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetXl", {
        set: function (val) { this._cacheInput('offsetXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetLtSm", {
        set: function (val) { this._cacheInput('offsetLtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetLtMd", {
        set: function (val) { this._cacheInput('offsetLtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetLtLg", {
        set: function (val) { this._cacheInput('offsetLtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetLtXl", {
        set: function (val) { this._cacheInput('offsetLtXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetGtXs", {
        set: function (val) { this._cacheInput('offsetGtXs', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetGtSm", {
        set: function (val) { this._cacheInput('offsetGtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetGtMd", {
        set: function (val) { this._cacheInput('offsetGtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOffsetDirective.prototype, "offsetGtLg", {
        set: function (val) { this._cacheInput('offsetGtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * For @Input changes on the current mq activation property, see onMediaQueryChanges()
     */
    FlexOffsetDirective.prototype.ngOnChanges = function (changes) {
        if (changes['offset'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexOffsetDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('offset', 0, function (changes) {
            _this._updateWithValue(changes.value);
        });
    };
    // *********************************************
    // Protected methods
    // *********************************************
    FlexOffsetDirective.prototype._updateWithValue = function (value) {
        value = value || this._queryInput("offset") || 0;
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._applyStyleToElement(this._buildCSS(value));
    };
    FlexOffsetDirective.prototype._buildCSS = function (offset) {
        var isPercent = String(offset).indexOf('%') > -1;
        var isPx = String(offset).indexOf('px') > -1;
        if (!isPx && !isPercent && !isNaN(offset)) {
            offset = offset + '%';
        }
        return { 'margin-left': "" + offset };
    };
    return FlexOffsetDirective;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* BaseFxDirective */]));

FlexOffsetDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Directive */], args: [{ selector: "\n  [fxFlexOffset],\n  [fxFlexOffset.xs], [fxFlexOffset.sm], [fxFlexOffset.md], [fxFlexOffset.lg], [fxFlexOffset.xl],\n  [fxFlexOffset.lt-sm], [fxFlexOffset.lt-md], [fxFlexOffset.lt-lg], [fxFlexOffset.lt-xl],\n  [fxFlexOffset.gt-xs], [fxFlexOffset.gt-sm], [fxFlexOffset.gt-md], [fxFlexOffset.gt-lg]\n" },] },
];
/** @nocollapse */
FlexOffsetDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__media_query_media_monitor__["a" /* MediaMonitor */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Renderer2 */], },
]; };
FlexOffsetDirective.propDecorators = {
    'offset': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset',] },],
    'offsetXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset.xs',] },],
    'offsetSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset.sm',] },],
    'offsetMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset.md',] },],
    'offsetLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset.lg',] },],
    'offsetXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset.xl',] },],
    'offsetLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset.lt-sm',] },],
    'offsetLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset.lt-md',] },],
    'offsetLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset.lt-lg',] },],
    'offsetLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset.lt-xl',] },],
    'offsetGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset.gt-xs',] },],
    'offsetGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset.gt-sm',] },],
    'offsetGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset.gt-md',] },],
    'offsetGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOffset.gt-lg',] },],
};


/***/ }),

/***/ 981:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__media_query_media_monitor__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlexOrderDirective; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



/**
 * 'flex-order' flexbox styling directive
 * Configures the positional ordering of the element in a sorted layout container
 * @see https://css-tricks.com/almanac/properties/o/order/
 */
var FlexOrderDirective = (function (_super) {
    __extends(FlexOrderDirective, _super);
    /* tslint:enable */
    function FlexOrderDirective(monitor, elRef, renderer) {
        return _super.call(this, monitor, elRef, renderer) || this;
    }
    Object.defineProperty(FlexOrderDirective.prototype, "order", {
        /* tslint:disable */
        set: function (val) { this._cacheInput('order', val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexOrderDirective.prototype, "orderXs", {
        set: function (val) { this._cacheInput('orderXs', val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexOrderDirective.prototype, "orderSm", {
        set: function (val) { this._cacheInput('orderSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderMd", {
        set: function (val) { this._cacheInput('orderMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderLg", {
        set: function (val) { this._cacheInput('orderLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderXl", {
        set: function (val) { this._cacheInput('orderXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderGtXs", {
        set: function (val) { this._cacheInput('orderGtXs', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderGtSm", {
        set: function (val) { this._cacheInput('orderGtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderGtMd", {
        set: function (val) { this._cacheInput('orderGtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderGtLg", {
        set: function (val) { this._cacheInput('orderGtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderLtSm", {
        set: function (val) { this._cacheInput('orderLtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderLtMd", {
        set: function (val) { this._cacheInput('orderLtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderLtLg", {
        set: function (val) { this._cacheInput('orderLtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexOrderDirective.prototype, "orderLtXl", {
        set: function (val) { this._cacheInput('orderLtXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * For @Input changes on the current mq activation property, see onMediaQueryChanges()
     */
    FlexOrderDirective.prototype.ngOnChanges = function (changes) {
        if (changes['order'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexOrderDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('order', '0', function (changes) {
            _this._updateWithValue(changes.value);
        });
        this._updateWithValue();
    };
    // *********************************************
    // Protected methods
    // *********************************************
    FlexOrderDirective.prototype._updateWithValue = function (value) {
        value = value || this._queryInput("order") || '0';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._applyStyleToElement(this._buildCSS(value));
    };
    FlexOrderDirective.prototype._buildCSS = function (value) {
        value = parseInt(value, 10);
        return { order: isNaN(value) ? 0 : value };
    };
    return FlexOrderDirective;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* BaseFxDirective */]));

FlexOrderDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Directive */], args: [{ selector: "\n  [fxFlexOrder],\n  [fxFlexOrder.xs], [fxFlexOrder.sm], [fxFlexOrder.md], [fxFlexOrder.lg], [fxFlexOrder.xl],\n  [fxFlexOrder.lt-sm], [fxFlexOrder.lt-md], [fxFlexOrder.lt-lg], [fxFlexOrder.lt-xl],\n  [fxFlexOrder.gt-xs], [fxFlexOrder.gt-sm], [fxFlexOrder.gt-md], [fxFlexOrder.gt-lg]\n" },] },
];
/** @nocollapse */
FlexOrderDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__media_query_media_monitor__["a" /* MediaMonitor */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Renderer2 */], },
]; };
FlexOrderDirective.propDecorators = {
    'order': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder',] },],
    'orderXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder.xs',] },],
    'orderSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder.sm',] },],
    'orderMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder.md',] },],
    'orderLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder.lg',] },],
    'orderXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder.xl',] },],
    'orderGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder.gt-xs',] },],
    'orderGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder.gt-sm',] },],
    'orderGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder.gt-md',] },],
    'orderGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder.gt-lg',] },],
    'orderLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder.lt-sm',] },],
    'orderLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder.lt-md',] },],
    'orderLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder.lt-lg',] },],
    'orderLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlexOrder.lt-xl',] },],
};


/***/ }),

/***/ 982:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_object_extend__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__media_query_media_monitor__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__layout__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__layout_wrap__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_basis_validator__ = __webpack_require__(320);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlexDirective; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */







/**
 * Directive to control the size of a flex item using flex-basis, flex-grow, and flex-shrink.
 * Corresponds to the css `flex` shorthand property.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
var FlexDirective = (function (_super) {
    __extends(FlexDirective, _super);
    /* tslint:enable */
    // Explicitly @SkipSelf on LayoutDirective and LayoutWrapDirective because we want the
    // parent flex container for this flex item.
    function FlexDirective(monitor, elRef, renderer, _container, _wrap) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this._container = _container;
        _this._wrap = _wrap;
        /** The flex-direction of this element's flex container. Defaults to 'row'. */
        _this._layout = 'row';
        _this._cacheInput("flex", "");
        _this._cacheInput("shrink", 1);
        _this._cacheInput("grow", 1);
        if (_container) {
            // If this flex item is inside of a flex container marked with
            // Subscribe to layout immediate parent direction changes
            _this._layoutWatcher = _container.layout$.subscribe(function (direction) {
                // `direction` === null if parent container does not have a `fxLayout`
                _this._onLayoutChange(direction);
            });
        }
        return _this;
    }
    Object.defineProperty(FlexDirective.prototype, "shrink", {
        /* tslint:disable */
        set: function (val) { this._cacheInput("shrink", val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "grow", {
        set: function (val) { this._cacheInput("grow", val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flex", {
        set: function (val) { this._cacheInput("flex", val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexXs", {
        set: function (val) { this._cacheInput('flexXs', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexSm", {
        set: function (val) { this._cacheInput('flexSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexMd", {
        set: function (val) { this._cacheInput('flexMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexLg", {
        set: function (val) { this._cacheInput('flexLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexXl", {
        set: function (val) { this._cacheInput('flexXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexGtXs", {
        set: function (val) { this._cacheInput('flexGtXs', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexGtSm", {
        set: function (val) { this._cacheInput('flexGtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexGtMd", {
        set: function (val) { this._cacheInput('flexGtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexGtLg", {
        set: function (val) { this._cacheInput('flexGtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexLtSm", {
        set: function (val) { this._cacheInput('flexLtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexLtMd", {
        set: function (val) { this._cacheInput('flexLtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexLtLg", {
        set: function (val) { this._cacheInput('flexLtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(FlexDirective.prototype, "flexLtXl", {
        set: function (val) { this._cacheInput('flexLtXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * For @Input changes on the current mq activation property, see onMediaQueryChanges()
     */
    FlexDirective.prototype.ngOnChanges = function (changes) {
        if (changes['flex'] != null || this._mqActivation) {
            this._updateStyle();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('flex', '', function (changes) {
            _this._updateStyle(changes.value);
        });
        this._updateStyle();
    };
    FlexDirective.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this._layoutWatcher) {
            this._layoutWatcher.unsubscribe();
        }
    };
    /**
     * Caches the parent container's 'flex-direction' and updates the element's style.
     * Used as a handler for layout change events from the parent flex container.
     */
    FlexDirective.prototype._onLayoutChange = function (direction) {
        this._layout = direction || this._layout || "row";
        this._updateStyle();
    };
    FlexDirective.prototype._updateStyle = function (value) {
        var flexBasis = value || this._queryInput("flex") || '';
        if (this._mqActivation) {
            flexBasis = this._mqActivation.activatedInput;
        }
        var basis = String(flexBasis).replace(";", "");
        var parts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_basis_validator__["a" /* validateBasis */])(basis, this._queryInput("grow"), this._queryInput("shrink"));
        this._applyStyleToElement(this._validateValue.apply(this, parts));
    };
    /**
     * Validate the value to be one of the acceptable value options
     * Use default fallback of "row"
     */
    FlexDirective.prototype._validateValue = function (grow, shrink, basis) {
        // The flex-direction of this element's flex container. Defaults to 'row'.
        var layout = this._getFlowDirection(this.parentElement, true);
        var direction = (layout.indexOf('column') > -1) ? 'column' : 'row';
        var css, isValue;
        grow = (grow == "0") ? 0 : grow;
        shrink = (shrink == "0") ? 0 : shrink;
        // flex-basis allows you to specify the initial/starting main-axis size of the element,
        // before anything else is computed. It can either be a percentage or an absolute value.
        // It is, however, not the breaking point for flex-grow/shrink properties
        //
        // flex-grow can be seen as this:
        //   0: Do not stretch. Either size to element's content width, or obey 'flex-basis'.
        //   1: (Default value). Stretch; will be the same size to all other flex items on
        //       the same row since they have a default value of 1.
        //   ≥2 (integer n): Stretch. Will be n times the size of other elements
        //      with 'flex-grow: 1' on the same row.
        // Use `null` to clear existing styles.
        var clearStyles = {
            'max-width': null,
            'max-height': null,
            'min-width': null,
            'min-height': null
        };
        switch (basis || '') {
            case '':
                css = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_object_extend__["a" /* extendObject */])(clearStyles, { 'flex': '1 1 0.000000001px' });
                break;
            case 'initial': // default
            case 'nogrow':
                grow = 0;
                css = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_object_extend__["a" /* extendObject */])(clearStyles, { 'flex': '0 1 auto' });
                break;
            case 'grow':
                css = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_object_extend__["a" /* extendObject */])(clearStyles, { 'flex': '1 1 100%' });
                break;
            case 'noshrink':
                shrink = 0;
                css = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_object_extend__["a" /* extendObject */])(clearStyles, { 'flex': '1 0 auto' });
                break;
            case 'auto':
                css = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_object_extend__["a" /* extendObject */])(clearStyles, { 'flex': grow + " " + shrink + " auto" });
                break;
            case 'none':
                grow = 0;
                shrink = 0;
                css = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_object_extend__["a" /* extendObject */])(clearStyles, { 'flex': '0 0 auto' });
                break;
            default:
                var hasCalc = String(basis).indexOf('calc') > -1;
                var isPercent = String(basis).indexOf('%') > -1 && !hasCalc;
                isValue = hasCalc ||
                    String(basis).indexOf('px') > -1 ||
                    String(basis).indexOf('em') > -1 ||
                    String(basis).indexOf('vw') > -1 ||
                    String(basis).indexOf('vh') > -1;
                // Defaults to percentage sizing unless `px` is explicitly set
                if (!isValue && !isPercent && !isNaN(basis)) {
                    basis = basis + '%';
                }
                if (basis === '0px') {
                    basis = '0%';
                }
                // Set max-width = basis if using layout-wrap
                // tslint:disable-next-line:max-line-length
                // @see https://github.com/philipwalton/flexbugs#11-min-and-max-size-declarations-are-ignored-when-wrappifl-flex-items
                css = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_object_extend__["a" /* extendObject */])(clearStyles, {
                    'flex': grow + " " + shrink + " " + ((isValue || this._wrap) ? basis : '100%'),
                });
                break;
        }
        var max = (direction === 'row') ? 'max-width' : 'max-height';
        var min = (direction === 'row') ? 'min-width' : 'min-height';
        var usingCalc = (String(basis).indexOf('calc') > -1) || (basis == 'auto');
        var isPx = String(basis).indexOf('px') > -1 || usingCalc;
        // make box inflexible when shrink and grow are both zero
        // should not set a min when the grow is zero
        // should not set a max when the shrink is zero
        var isFixed = !grow && !shrink;
        css[min] = (basis == '0%') ? 0 : isFixed || (isPx && grow) ? basis : null;
        css[max] = (basis == '0%') ? 0 : isFixed || (!usingCalc && shrink) ? basis : null;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_object_extend__["a" /* extendObject */])(css, { 'box-sizing': 'border-box' });
    };
    Object.defineProperty(FlexDirective.prototype, "parentElement", {
        get: function () {
            return this._elementRef.nativeElement.parentNode;
        },
        enumerable: true,
        configurable: true
    });
    return FlexDirective;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* BaseFxDirective */]));

FlexDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Directive */], args: [{ selector: "\n  [fxFlex],\n  [fxFlex.xs], [fxFlex.sm], [fxFlex.md], [fxFlex.lg], [fxFlex.xl],\n  [fxFlex.lt-sm], [fxFlex.lt-md], [fxFlex.lt-lg], [fxFlex.lt-xl],\n  [fxFlex.gt-xs], [fxFlex.gt-sm], [fxFlex.gt-md], [fxFlex.gt-lg],\n"
            },] },
];
/** @nocollapse */
FlexDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_3__media_query_media_monitor__["a" /* MediaMonitor */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Renderer2 */], },
    { type: __WEBPACK_IMPORTED_MODULE_4__layout__["a" /* LayoutDirective */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Optional */] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* SkipSelf */] },] },
    { type: __WEBPACK_IMPORTED_MODULE_5__layout_wrap__["a" /* LayoutWrapDirective */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Optional */] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* SkipSelf */] },] },
]; };
FlexDirective.propDecorators = {
    'shrink': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShrink',] },],
    'grow': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxGrow',] },],
    'flex': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex',] },],
    'flexXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex.xs',] },],
    'flexSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex.sm',] },],
    'flexMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex.md',] },],
    'flexLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex.lg',] },],
    'flexXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex.xl',] },],
    'flexGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex.gt-xs',] },],
    'flexGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex.gt-sm',] },],
    'flexGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex.gt-md',] },],
    'flexGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex.gt-lg',] },],
    'flexLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex.lt-sm',] },],
    'flexLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex.lt-md',] },],
    'flexLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex.lt-lg',] },],
    'flexLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxFlex.lt-xl',] },],
};


/***/ }),

/***/ 983:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_object_extend__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__media_query_media_monitor__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__layout__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_layout_validator__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutAlignDirective; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */






/**
 * 'layout-align' flexbox styling directive
 *  Defines positioning of child elements along main and cross axis in a layout container
 *  Optional values: {main-axis} values or {main-axis cross-axis} value pairs
 *
 *  @see https://css-tricks.com/almanac/properties/j/justify-content/
 *  @see https://css-tricks.com/almanac/properties/a/align-items/
 *  @see https://css-tricks.com/almanac/properties/a/align-content/
 */
var LayoutAlignDirective = (function (_super) {
    __extends(LayoutAlignDirective, _super);
    /* tslint:enable */
    function LayoutAlignDirective(monitor, elRef, renderer, container) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this._layout = 'row'; // default flex-direction
        if (container) {
            _this._layoutWatcher = container.layout$.subscribe(_this._onLayoutChange.bind(_this));
        }
        return _this;
    }
    Object.defineProperty(LayoutAlignDirective.prototype, "align", {
        /* tslint:disable */
        set: function (val) { this._cacheInput('align', val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutAlignDirective.prototype, "alignXs", {
        set: function (val) { this._cacheInput('alignXs', val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutAlignDirective.prototype, "alignSm", {
        set: function (val) { this._cacheInput('alignSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignMd", {
        set: function (val) { this._cacheInput('alignMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignLg", {
        set: function (val) { this._cacheInput('alignLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignXl", {
        set: function (val) { this._cacheInput('alignXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignGtXs", {
        set: function (val) { this._cacheInput('alignGtXs', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignGtSm", {
        set: function (val) { this._cacheInput('alignGtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignGtMd", {
        set: function (val) { this._cacheInput('alignGtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignGtLg", {
        set: function (val) { this._cacheInput('alignGtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignLtSm", {
        set: function (val) { this._cacheInput('alignLtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignLtMd", {
        set: function (val) { this._cacheInput('alignLtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignLtLg", {
        set: function (val) { this._cacheInput('alignLtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutAlignDirective.prototype, "alignLtXl", {
        set: function (val) { this._cacheInput('alignLtXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    LayoutAlignDirective.prototype.ngOnChanges = function (changes) {
        if (changes['align'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutAlignDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._listenForMediaQueryChanges('align', 'start stretch', function (changes) {
            _this._updateWithValue(changes.value);
        });
        this._updateWithValue();
    };
    LayoutAlignDirective.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this._layoutWatcher) {
            this._layoutWatcher.unsubscribe();
        }
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     *
     */
    LayoutAlignDirective.prototype._updateWithValue = function (value) {
        value = value || this._queryInput("align") || 'start stretch';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._applyStyleToElement(this._buildCSS(value));
        this._allowStretching(value, !this._layout ? "row" : this._layout);
    };
    /**
     * Cache the parent container 'flex-direction' and update the 'flex' styles
     */
    LayoutAlignDirective.prototype._onLayoutChange = function (direction) {
        var _this = this;
        this._layout = (direction || '').toLowerCase();
        if (!__WEBPACK_IMPORTED_MODULE_5__utils_layout_validator__["b" /* LAYOUT_VALUES */].find(function (x) { return x === _this._layout; })) {
            this._layout = 'row';
        }
        var value = this._queryInput("align") || 'start stretch';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        this._allowStretching(value, this._layout || "row");
    };
    LayoutAlignDirective.prototype._buildCSS = function (align) {
        var css = {}, _a = align.split(' '), main_axis = _a[0], cross_axis = _a[1]; // tslint:disable-line:variable-name
        // Main axis
        switch (main_axis) {
            case 'center':
                css['justify-content'] = 'center';
                break;
            case 'space-around':
                css['justify-content'] = 'space-around';
                break;
            case 'space-between':
                css['justify-content'] = 'space-between';
                break;
            case 'end':
            case 'flex-end':
                css['justify-content'] = 'flex-end';
                break;
            case 'start':
            case 'flex-start':
            default:
                css['justify-content'] = 'flex-start'; // default main axis
                break;
        }
        // Cross-axis
        switch (cross_axis) {
            case 'start':
            case 'flex-start':
                css['align-items'] = css['align-content'] = 'flex-start';
                break;
            case 'baseline':
                css['align-items'] = 'baseline';
                break;
            case 'center':
                css['align-items'] = css['align-content'] = 'center';
                break;
            case 'end':
            case 'flex-end':
                css['align-items'] = css['align-content'] = 'flex-end';
                break;
            case 'stretch':
            default:
                css['align-items'] = css['align-content'] = 'stretch'; // default cross axis
                break;
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_object_extend__["a" /* extendObject */])(css, {
            'display': 'flex',
            'flex-direction': this._layout || "row",
            'box-sizing': 'border-box'
        });
    };
    /**
     * Update container element to 'stretch' as needed...
     * NOTE: this is only done if the crossAxis is explicitly set to 'stretch'
     */
    LayoutAlignDirective.prototype._allowStretching = function (align, layout) {
        var _a = align.split(' '), cross_axis = _a[1]; // tslint:disable-line:variable-name
        if (cross_axis == 'stretch') {
            // Use `null` values to remove style
            this._applyStyleToElement({
                'box-sizing': 'border-box',
                'max-width': (layout === 'column') ? '100%' : null,
                'max-height': (layout === 'row') ? '100%' : null
            });
        }
    };
    return LayoutAlignDirective;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* BaseFxDirective */]));

LayoutAlignDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Directive */], args: [{ selector: "\n  [fxLayoutAlign],\n  [fxLayoutAlign.xs], [fxLayoutAlign.sm], [fxLayoutAlign.md], [fxLayoutAlign.lg],[fxLayoutAlign.xl],\n  [fxLayoutAlign.lt-sm], [fxLayoutAlign.lt-md], [fxLayoutAlign.lt-lg], [fxLayoutAlign.lt-xl],\n  [fxLayoutAlign.gt-xs], [fxLayoutAlign.gt-sm], [fxLayoutAlign.gt-md], [fxLayoutAlign.gt-lg]\n" },] },
];
/** @nocollapse */
LayoutAlignDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_3__media_query_media_monitor__["a" /* MediaMonitor */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Renderer2 */], },
    { type: __WEBPACK_IMPORTED_MODULE_4__layout__["a" /* LayoutDirective */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Optional */] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Self */] },] },
]; };
LayoutAlignDirective.propDecorators = {
    'align': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign',] },],
    'alignXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign.xs',] },],
    'alignSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign.sm',] },],
    'alignMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign.md',] },],
    'alignLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign.lg',] },],
    'alignXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign.xl',] },],
    'alignGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign.gt-xs',] },],
    'alignGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign.gt-sm',] },],
    'alignGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign.gt-md',] },],
    'alignGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign.gt-lg',] },],
    'alignLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign.lt-sm',] },],
    'alignLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign.lt-md',] },],
    'alignLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign.lt-lg',] },],
    'alignLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutAlign.lt-xl',] },],
};


/***/ }),

/***/ 984:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__media_query_media_monitor__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_layout_validator__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutGapDirective; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */





/**
 * 'layout-padding' styling directive
 *  Defines padding of child elements in a layout container
 */
var LayoutGapDirective = (function (_super) {
    __extends(LayoutGapDirective, _super);
    /* tslint:enable */
    function LayoutGapDirective(monitor, elRef, renderer, container) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this._layout = 'row'; // default flex-direction
        if (container) {
            _this._layoutWatcher = container.layout$.subscribe(_this._onLayoutChange.bind(_this));
        }
        return _this;
    }
    Object.defineProperty(LayoutGapDirective.prototype, "gap", {
        /* tslint:disable */
        set: function (val) { this._cacheInput('gap', val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutGapDirective.prototype, "gapXs", {
        set: function (val) { this._cacheInput('gapXs', val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutGapDirective.prototype, "gapSm", {
        set: function (val) { this._cacheInput('gapSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapMd", {
        set: function (val) { this._cacheInput('gapMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapLg", {
        set: function (val) { this._cacheInput('gapLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapXl", {
        set: function (val) { this._cacheInput('gapXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapGtXs", {
        set: function (val) { this._cacheInput('gapGtXs', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapGtSm", {
        set: function (val) { this._cacheInput('gapGtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapGtMd", {
        set: function (val) { this._cacheInput('gapGtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapGtLg", {
        set: function (val) { this._cacheInput('gapGtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapLtSm", {
        set: function (val) { this._cacheInput('gapLtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapLtMd", {
        set: function (val) { this._cacheInput('gapLtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapLtLg", {
        set: function (val) { this._cacheInput('gapLtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LayoutGapDirective.prototype, "gapLtXl", {
        set: function (val) { this._cacheInput('gapLtXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    LayoutGapDirective.prototype.ngOnChanges = function (changes) {
        if (changes['gap'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutGapDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._watchContentChanges();
        this._listenForMediaQueryChanges('gap', '0', function (changes) {
            _this._updateWithValue(changes.value);
        });
        this._updateWithValue();
    };
    LayoutGapDirective.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this._layoutWatcher) {
            this._layoutWatcher.unsubscribe();
        }
        if (this._observer) {
            this._observer.disconnect();
        }
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Watch for child nodes to be added... and apply the layout gap styles to each.
     * NOTE: this does NOT! differentiate between viewChildren and contentChildren
     */
    LayoutGapDirective.prototype._watchContentChanges = function () {
        var _this = this;
        var onMutationCallback = function (mutations) {
            var validatedChanges = function (it) {
                return (it.addedNodes && it.addedNodes.length) ||
                    (it.removedNodes && it.removedNodes.length);
            };
            // update gap styles only for child 'added' or 'removed' events
            if (mutations.filter(validatedChanges).length) {
                _this._updateWithValue();
            }
        };
        this._observer = new MutationObserver(onMutationCallback);
        this._observer.observe(this._elementRef.nativeElement, { childList: true });
    };
    /**
     * Cache the parent container 'flex-direction' and update the 'margin' styles
     */
    LayoutGapDirective.prototype._onLayoutChange = function (direction) {
        var _this = this;
        this._layout = (direction || '').toLowerCase();
        if (!__WEBPACK_IMPORTED_MODULE_4__utils_layout_validator__["b" /* LAYOUT_VALUES */].find(function (x) { return x === _this._layout; })) {
            this._layout = 'row';
        }
        this._updateWithValue();
    };
    /**
     *
     */
    LayoutGapDirective.prototype._updateWithValue = function (value) {
        var _this = this;
        value = value || this._queryInput("gap") || '0';
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        // Gather all non-hidden Element nodes
        var items = this.childrenNodes
            .filter(function (el) { return el.nodeType === 1 && _this._getDisplayStyle(el) != "none"; });
        var numItems = items.length;
        if (numItems > 1) {
            var lastItem = items[numItems - 1];
            // For each `element` children EXCEPT the last,
            // set the margin right/bottom styles...
            items = items.filter(function (el, j) { return j < numItems - 1; });
            this._applyStyleToElements(this._buildCSS(value), items);
            // Clear all gaps for all visible elements
            this._applyStyleToElements(this._buildCSS(), [lastItem]);
        }
    };
    /**
     * Prepare margin CSS, remove any previous explicitly
     * assigned margin assignments
     */
    LayoutGapDirective.prototype._buildCSS = function (value) {
        if (value === void 0) { value = null; }
        var key, margins = {
            'margin-left': null,
            'margin-right': null,
            'margin-top': null,
            'margin-bottom': null
        };
        switch (this._layout) {
            case 'column':
            case 'column-reverse':
                key = 'margin-bottom';
                break;
            case "row":
            case 'row-reverse':
            default:
                key = 'margin-right';
                break;
        }
        margins[key] = value;
        return margins;
    };
    return LayoutGapDirective;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* BaseFxDirective */]));

LayoutGapDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Directive */], args: [{ selector: "\n  [fxLayoutGap],\n  [fxLayoutGap.xs], [fxLayoutGap.sm], [fxLayoutGap.md], [fxLayoutGap.lg], [fxLayoutGap.xl],\n  [fxLayoutGap.lt-sm], [fxLayoutGap.lt-md], [fxLayoutGap.lt-lg], [fxLayoutGap.lt-xl],\n  [fxLayoutGap.gt-xs], [fxLayoutGap.gt-sm], [fxLayoutGap.gt-md], [fxLayoutGap.gt-lg]\n"
            },] },
];
/** @nocollapse */
LayoutGapDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_3__media_query_media_monitor__["a" /* MediaMonitor */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Renderer2 */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__layout__["a" /* LayoutDirective */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Optional */] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Self */] },] },
]; };
LayoutGapDirective.propDecorators = {
    'gap': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap',] },],
    'gapXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap.xs',] },],
    'gapSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap.sm',] },],
    'gapMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap.md',] },],
    'gapLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap.lg',] },],
    'gapXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap.xl',] },],
    'gapGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap.gt-xs',] },],
    'gapGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap.gt-sm',] },],
    'gapGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap.gt-md',] },],
    'gapGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap.gt-lg',] },],
    'gapLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap.lt-sm',] },],
    'gapLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap.lt-md',] },],
    'gapLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap.lt-lg',] },],
    'gapLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxLayoutGap.lt-xl',] },],
};


/***/ }),

/***/ 985:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__media_query_media_monitor__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__layout__ = __webpack_require__(55);
/* unused harmony export negativeOf */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowHideDirective; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




var FALSY = ['false', false, 0];
/**
 * For fxHide selectors, we invert the 'value'
 * and assign to the equivalent fxShow selector cache
 *  - When 'hide' === '' === true, do NOT show the element
 *  - When 'hide' === false or 0... we WILL show the element
 */
function negativeOf(hide) {
    return (hide === "") ? false :
        ((hide === "false") || (hide === 0)) ? true : !hide;
}
/**
 * 'show' Layout API directive
 *
 */
var ShowHideDirective = (function (_super) {
    __extends(ShowHideDirective, _super);
    /* tslint:enable */
    /**
     *
     */
    function ShowHideDirective(monitor, _layout, elRef, renderer) {
        var _this = _super.call(this, monitor, elRef, renderer) || this;
        _this._layout = _layout;
        _this.elRef = elRef;
        _this.renderer = renderer;
        _this._display = _this._getDisplayStyle(); // re-invoke override to use `this._layout`
        if (_layout) {
            /**
             * The Layout can set the display:flex (and incorrectly affect the Hide/Show directives.
             * Whenever Layout [on the same element] resets its CSS, then update the Hide/Show CSS
             */
            _this._layoutWatcher = _layout.layout$.subscribe(function () { return _this._updateWithValue(); });
        }
        return _this;
    }
    Object.defineProperty(ShowHideDirective.prototype, "show", {
        /* tslint:disable */
        set: function (val) { this._cacheInput("show", val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowHideDirective.prototype, "showXs", {
        set: function (val) { this._cacheInput('showXs', val); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowHideDirective.prototype, "showSm", {
        set: function (val) { this._cacheInput('showSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showMd", {
        set: function (val) { this._cacheInput('showMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showLg", {
        set: function (val) { this._cacheInput('showLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showXl", {
        set: function (val) { this._cacheInput('showXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showLtSm", {
        set: function (val) { this._cacheInput('showLtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showLtMd", {
        set: function (val) { this._cacheInput('showLtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showLtLg", {
        set: function (val) { this._cacheInput('showLtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showLtXl", {
        set: function (val) { this._cacheInput('showLtXl', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showGtXs", {
        set: function (val) { this._cacheInput('showGtXs', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showGtSm", {
        set: function (val) { this._cacheInput('showGtSm', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showGtMd", {
        set: function (val) { this._cacheInput('showGtMd', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "showGtLg", {
        set: function (val) { this._cacheInput('showGtLg', val); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hide", {
        set: function (val) { this._cacheInput("show", negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowHideDirective.prototype, "hideXs", {
        set: function (val) { this._cacheInput("showXs", negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowHideDirective.prototype, "hideSm", {
        set: function (val) { this._cacheInput('showSm', negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideMd", {
        set: function (val) { this._cacheInput('showMd', negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideLg", {
        set: function (val) { this._cacheInput('showLg', negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideXl", {
        set: function (val) { this._cacheInput('showXl', negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideLtSm", {
        set: function (val) { this._cacheInput('showLtSm', negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideLtMd", {
        set: function (val) { this._cacheInput('showLtMd', negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideLtLg", {
        set: function (val) { this._cacheInput('showLtLg', negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideLtXl", {
        set: function (val) { this._cacheInput('showLtXl', negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideGtXs", {
        set: function (val) { this._cacheInput('showGtXs', negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideGtSm", {
        set: function (val) { this._cacheInput('showGtSm', negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideGtMd", {
        set: function (val) { this._cacheInput('showGtMd', negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ShowHideDirective.prototype, "hideGtLg", {
        set: function (val) { this._cacheInput('showGtLg', negativeOf(val)); },
        enumerable: true,
        configurable: true
    });
    ;
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * Override accessor to the current HTMLElement's `display` style
     * Note: Show/Hide will not change the display to 'flex' but will set it to 'block'
     * unless it was already explicitly defined.
     */
    ShowHideDirective.prototype._getDisplayStyle = function () {
        return this._layout ? "flex" : _super.prototype._getDisplayStyle.call(this);
    };
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fxShow')
     * Then conditionally override with the mq-activated Input's current value
     */
    ShowHideDirective.prototype.ngOnChanges = function (changes) {
        if (changes['show'] != null || this._mqActivation) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    ShowHideDirective.prototype.ngOnInit = function () {
        var _this = this;
        var value = this._getDefaultVal("show", true);
        // Build _mqActivation controller
        this._listenForMediaQueryChanges('show', value, function (changes) {
            _this._updateWithValue(changes.value);
        });
        this._updateWithValue();
    };
    ShowHideDirective.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this._layoutWatcher) {
            this._layoutWatcher.unsubscribe();
        }
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /** Validate the visibility value and then update the host's inline display style */
    ShowHideDirective.prototype._updateWithValue = function (value) {
        value = value || this._getDefaultVal("show", true);
        if (this._mqActivation) {
            value = this._mqActivation.activatedInput;
        }
        var shouldShow = this._validateTruthy(value);
        this._applyStyleToElement(this._buildCSS(shouldShow));
    };
    /** Build the CSS that should be assigned to the element instance */
    ShowHideDirective.prototype._buildCSS = function (show) {
        return { 'display': show ? this._display : 'none' };
    };
    /**  Validate the to be not FALSY */
    ShowHideDirective.prototype._validateTruthy = function (show) {
        return (FALSY.indexOf(show) == -1);
    };
    return ShowHideDirective;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* BaseFxDirective */]));

ShowHideDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Directive */], args: [{
                selector: "\n  [fxShow],\n  [fxShow.xs], [fxShow.sm], [fxShow.md], [fxShow.lg], [fxShow.xl],\n  [fxShow.lt-sm], [fxShow.lt-md], [fxShow.lt-lg], [fxShow.lt-xl],\n  [fxShow.gt-xs], [fxShow.gt-sm], [fxShow.gt-md], [fxShow.gt-lg],\n  [fxHide],\n  [fxHide.xs], [fxHide.sm], [fxHide.md], [fxHide.lg], [fxHide.xl],\n  [fxHide.lt-sm], [fxHide.lt-md], [fxHide.lt-lg], [fxHide.lt-xl],\n  [fxHide.gt-xs], [fxHide.gt-sm], [fxHide.gt-md], [fxHide.gt-lg]\n"
            },] },
];
/** @nocollapse */
ShowHideDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__media_query_media_monitor__["a" /* MediaMonitor */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__layout__["a" /* LayoutDirective */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Optional */] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Self */] },] },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Renderer2 */], },
]; };
ShowHideDirective.propDecorators = {
    'show': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow',] },],
    'showXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow.xs',] },],
    'showSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow.sm',] },],
    'showMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow.md',] },],
    'showLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow.lg',] },],
    'showXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow.xl',] },],
    'showLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow.lt-sm',] },],
    'showLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow.lt-md',] },],
    'showLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow.lt-lg',] },],
    'showLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow.lt-xl',] },],
    'showGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow.gt-xs',] },],
    'showGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow.gt-sm',] },],
    'showGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow.gt-md',] },],
    'showGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxShow.gt-lg',] },],
    'hide': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide',] },],
    'hideXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide.xs',] },],
    'hideSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide.sm',] },],
    'hideMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide.md',] },],
    'hideLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide.lg',] },],
    'hideXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide.xl',] },],
    'hideLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide.lt-sm',] },],
    'hideLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide.lt-md',] },],
    'hideLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide.lt-lg',] },],
    'hideLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide.lt-xl',] },],
    'hideGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide.gt-xs',] },],
    'hideGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide.gt-sm',] },],
    'hideGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide.gt-md',] },],
    'hideGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['fxHide.gt-lg',] },],
};


/***/ }),

/***/ 986:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_adapter__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__media_query_breakpoints_break_point_registry__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__media_query_media_monitor__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_object_extend__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_style_transforms__ = __webpack_require__(322);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StyleDirective; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */








/**
 * Directive to add responsive support for ngStyle.
 *
 */
var StyleDirective = (function (_super) {
    __extends(StyleDirective, _super);
    /* tslint:enable */
    /**
     *  Constructor for the ngStyle subclass; which adds selectors and
     *  a MediaQuery Activation Adapter
     */
    function StyleDirective(monitor, _bpRegistry, _sanitizer, _differs, _ngEl, _oldRenderer, _renderer) {
        var _this = 
        // TODO: this should use Renderer2 when the NgStyle signature is switched over to it.
        _super.call(this, _differs, _ngEl, _oldRenderer) || this;
        _this.monitor = monitor;
        _this._bpRegistry = _bpRegistry;
        _this._sanitizer = _sanitizer;
        // Build adapter, `cacheInput()` interceptor, and get current inline style if any
        _this._buildAdapter(monitor, _ngEl, _renderer);
        _this._base.cacheInput('style', _ngEl.nativeElement.getAttribute("style"), true);
        return _this;
    }
    Object.defineProperty(StyleDirective.prototype, "styleBase", {
        /**
         * Intercept ngStyle assignments so we cache the default styles
         * which are merged with activated styles or used as fallbacks.
         */
        set: function (val) {
            this._base.cacheInput('style', val, true);
            this.ngStyle = this._base.inputMap['style'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StyleDirective.prototype, "ngStyleXs", {
        /* tslint:disable */
        set: function (val) { this._base.cacheInput('styleXs', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StyleDirective.prototype, "ngStyleSm", {
        set: function (val) { this._base.cacheInput('styleSm', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleMd", {
        set: function (val) { this._base.cacheInput('styleMd', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleLg", {
        set: function (val) { this._base.cacheInput('styleLg', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleXl", {
        set: function (val) { this._base.cacheInput('styleXl', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleLtSm", {
        set: function (val) { this._base.cacheInput('styleLtSm', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleLtMd", {
        set: function (val) { this._base.cacheInput('styleLtMd', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleLtLg", {
        set: function (val) { this._base.cacheInput('styleLtLg', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleLtXl", {
        set: function (val) { this._base.cacheInput('styleLtXl', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleGtXs", {
        set: function (val) { this._base.cacheInput('styleGtXs', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleGtSm", {
        set: function (val) { this._base.cacheInput('styleGtSm', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleGtMd", {
        set: function (val) { this._base.cacheInput('styleGtMd', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "ngStyleGtLg", {
        set: function (val) { this._base.cacheInput('styleGtLg', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleXs", {
        /** Deprecated selectors */
        set: function (val) { this._base.cacheInput('styleXs', val, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StyleDirective.prototype, "styleSm", {
        set: function (val) { this._base.cacheInput('styleSm', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleMd", {
        set: function (val) { this._base.cacheInput('styleMd', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleLg", {
        set: function (val) { this._base.cacheInput('styleLg', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleXl", {
        set: function (val) { this._base.cacheInput('styleXl', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleLtSm", {
        set: function (val) { this._base.cacheInput('styleLtSm', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleLtMd", {
        set: function (val) { this._base.cacheInput('styleLtMd', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleLtLg", {
        set: function (val) { this._base.cacheInput('styleLtLg', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleLtXl", {
        set: function (val) { this._base.cacheInput('styleLtXl', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleGtXs", {
        set: function (val) { this._base.cacheInput('styleGtXs', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleGtSm", {
        set: function (val) { this._base.cacheInput('styleGtSm', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleGtMd", {
        set: function (val) { this._base.cacheInput('styleGtMd', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(StyleDirective.prototype, "styleGtLg", {
        set: function (val) { this._base.cacheInput('styleGtLg', val, true); },
        enumerable: true,
        configurable: true
    });
    ;
    // ******************************************************************
    // Lifecycle Hookks
    // ******************************************************************
    /**
     * For @Input changes on the current mq activation property
     */
    StyleDirective.prototype.ngOnChanges = function (changes) {
        if (this._base.activeKey in changes) {
            this._updateStyle();
        }
    };
    /**
     * For ChangeDetectionStrategy.onPush and ngOnChanges() updates
     */
    StyleDirective.prototype.ngDoCheck = function () {
        if (!this._base.hasMediaQueryListener) {
            this._configureMQListener();
        }
        _super.prototype.ngDoCheck.call(this);
    };
    StyleDirective.prototype.ngOnDestroy = function () {
        this._base.ngOnDestroy();
    };
    // ******************************************************************
    // Internal Methods
    // ******************************************************************
    /**
       * Build an mqActivation object that bridges
       * mql change events to onMediaQueryChange handlers
       */
    StyleDirective.prototype._configureMQListener = function () {
        var _this = this;
        this._base.listenForMediaQueryChanges('style', '', function (changes) {
            _this._updateStyle(changes.value);
            // trigger NgClass::_applyIterableChanges()
            _super.prototype.ngDoCheck.call(_this);
        });
    };
    // ************************************************************************
    // Private Internal Methods
    // ************************************************************************
    /**
     * Use the currently activated input property and assign to
     * `ngStyle` which does the style injections...
     */
    StyleDirective.prototype._updateStyle = function (value) {
        var style = value || this._base.queryInput("style") || '';
        if (this._base.mqActivation) {
            style = this._base.mqActivation.activatedInput;
        }
        // Delegate subsequent activity to the NgStyle logic
        this.ngStyle = style;
    };
    /**
     * Build MediaQuery Activation Adapter
     * This adapter manages listening to mediaQuery change events and identifying
     * which property value should be used for the style update
     */
    StyleDirective.prototype._buildAdapter = function (monitor, _ngEl, _renderer) {
        this._base = new __WEBPACK_IMPORTED_MODULE_2__base_adapter__["a" /* BaseFxDirectiveAdapter */]('style', monitor, _ngEl, _renderer);
        this._buildCacheInterceptor();
    };
    /**
     * Build intercept to convert raw strings to ngStyleMap
     */
    StyleDirective.prototype._buildCacheInterceptor = function () {
        var _this = this;
        var cacheInput = this._base.cacheInput.bind(this._base);
        this._base.cacheInput = function (key, source, cacheRaw, merge) {
            if (cacheRaw === void 0) { cacheRaw = false; }
            if (merge === void 0) { merge = true; }
            var styles = _this._buildStyleMap(source);
            if (merge) {
                styles = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_object_extend__["a" /* extendObject */])({}, _this._base.inputMap['style'], styles);
            }
            cacheInput(key, styles, cacheRaw);
        };
    };
    /**
     * Convert raw strings to ngStyleMap; which is required by ngStyle
     * NOTE: Raw string key-value pairs MUST be delimited by `;`
     *       Comma-delimiters are not supported due to complexities of
     *       possible style values such as `rgba(x,x,x,x)` and others
     */
    StyleDirective.prototype._buildStyleMap = function (styles) {
        var _this = this;
        var sanitizer = function (val) {
            // Always safe-guard (aka sanitize) style property values
            return _this._sanitizer.sanitize(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* SecurityContext */].STYLE, val);
        };
        if (styles) {
            switch (__WEBPACK_IMPORTED_MODULE_7__utils_style_transforms__["a" /* ngStyleUtils */].getType(styles)) {
                case 'string': return __WEBPACK_IMPORTED_MODULE_7__utils_style_transforms__["a" /* ngStyleUtils */].buildMapFromList(__WEBPACK_IMPORTED_MODULE_7__utils_style_transforms__["a" /* ngStyleUtils */].buildRawList(styles), sanitizer);
                case 'array': return __WEBPACK_IMPORTED_MODULE_7__utils_style_transforms__["a" /* ngStyleUtils */].buildMapFromList(styles, sanitizer);
                case 'set': return __WEBPACK_IMPORTED_MODULE_7__utils_style_transforms__["a" /* ngStyleUtils */].buildMapFromSet(styles, sanitizer);
                default: return __WEBPACK_IMPORTED_MODULE_7__utils_style_transforms__["a" /* ngStyleUtils */].buildMapFromSet(styles, sanitizer);
            }
        }
        return styles;
    };
    return StyleDirective;
}(__WEBPACK_IMPORTED_MODULE_1__angular_common__["j" /* NgStyle */]));

StyleDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* Directive */], args: [{
                selector: "\n    [style.xs], [style.sm], [style.md], [style.lg], [style.xl],\n    [style.lt-sm], [style.lt-md], [style.lt-lg], [style.lt-xl],\n    [style.gt-xs], [style.gt-sm], [style.gt-md], [style.gt-lg],\n    [ngStyle],\n    [ngStyle.xs], [ngStyle.sm], [ngStyle.lg], [ngStyle.xl],\n    [ngStyle.lt-sm], [ngStyle.lt-md], [ngStyle.lt-lg], [ngStyle.lt-xl],\n    [ngStyle.gt-xs], [ngStyle.gt-sm], [ngStyle.gt-md], [ngStyle.gt-lg]\n  "
            },] },
];
/** @nocollapse */
StyleDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_4__media_query_media_monitor__["a" /* MediaMonitor */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__media_query_breakpoints_break_point_registry__["a" /* BreakPointRegistry */], },
    { type: __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* KeyValueDiffers */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* Renderer */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* Renderer2 */], },
]; };
StyleDirective.propDecorators = {
    'styleBase': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle',] },],
    'ngStyleXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle.xs',] },],
    'ngStyleSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle.sm',] },],
    'ngStyleMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle.md',] },],
    'ngStyleLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle.lg',] },],
    'ngStyleXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle.xl',] },],
    'ngStyleLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle.lt-sm',] },],
    'ngStyleLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle.lt-md',] },],
    'ngStyleLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle.lt-lg',] },],
    'ngStyleLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle.lt-xl',] },],
    'ngStyleGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle.gt-xs',] },],
    'ngStyleGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle.gt-sm',] },],
    'ngStyleGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle.gt-md',] },],
    'ngStyleGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['ngStyle.gt-lg',] },],
    'styleXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['style.xs',] },],
    'styleSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['style.sm',] },],
    'styleMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['style.md',] },],
    'styleLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['style.lg',] },],
    'styleXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['style.xl',] },],
    'styleLtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['style.lt-sm',] },],
    'styleLtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['style.lt-md',] },],
    'styleLtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['style.lt-lg',] },],
    'styleLtXl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['style.lt-xl',] },],
    'styleGtXs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['style.gt-xs',] },],
    'styleGtSm': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['style.gt-sm',] },],
    'styleGtMd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['style.gt-md',] },],
    'styleGtLg': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */], args: ['style.gt-lg',] },],
};


/***/ }),

/***/ 987:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_base__ = __webpack_require__(20);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_base_adapter__ = __webpack_require__(181);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__responsive_responsive_activation__ = __webpack_require__(312);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__module__ = __webpack_require__(976);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__module__["a"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */






/***/ }),

/***/ 988:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flexbox_index__ = __webpack_require__(987);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__flexbox_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__media_query_index__ = __webpack_require__(989);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_index__ = __webpack_require__(990);
/* unused harmony namespace reexport */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */





/***/ }),

/***/ 989:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__breakpoints_data_break_points__ = __webpack_require__(314);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breakpoints_data_orientation_break_points__ = __webpack_require__(315);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__breakpoints_break_points_token__ = __webpack_require__(183);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__breakpoints_break_point_registry__ = __webpack_require__(46);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__observable_media__ = __webpack_require__(318);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__match_media__ = __webpack_require__(56);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__media_change__ = __webpack_require__(316);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__media_monitor__ = __webpack_require__(15);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__breakpoints_break_points_provider__ = __webpack_require__(182);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__observable_media_provider__ = __webpack_require__(184);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__media_monitor_provider__ = __webpack_require__(317);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__module__ = __webpack_require__(313);
/* unused harmony namespace reexport */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */














/***/ }),

/***/ 990:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add_alias__ = __webpack_require__(185);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auto_prefixer__ = __webpack_require__(319);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__basis_validator__ = __webpack_require__(320);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__layout_validator__ = __webpack_require__(57);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__breakpoint_tools__ = __webpack_require__(321);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__object_extend__ = __webpack_require__(40);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_transforms__ = __webpack_require__(322);
/* unused harmony namespace reexport */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */









/***/ }),

/***/ 993:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(324);


/***/ }),

/***/ 997:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__git_hub_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FunctionMetricComponent; });
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




var FunctionMetricComponent = (function () {
    function FunctionMetricComponent(_element, _d3Service, gitHubService) {
        this._element = _element;
        this._d3Service = _d3Service;
        this.gitHubService = gitHubService;
        this.width = 700;
        this.height = 800;
        this.authorMap = new Map();
        this.uniqueAuthors = ["others"];
        this.funData = [];
        this._d3 = this._d3Service.getD3();
        this._parentNativeElement = this._element.nativeElement;
    }
    FunctionMetricComponent.prototype.ngOnInit = function () {
        this.renderChart("attr.c");
    };
    FunctionMetricComponent.prototype.renderChart = function (value) {
        var _this = this;
        if (value)
            this.gitHubService.getFunctionMetric(value).subscribe(function (dataArr) {
                _this.funData = dataArr[0];
                var data = dataArr[1];
                _this.funData.forEach(function (f, fInd) {
                    data.lines.forEach(function (d, dInd, lines) {
                        if (d.finalline == f[5]) {
                            lines.splice(dInd + 1, 0, {
                                "break": true
                            });
                        }
                    });
                });
                var d3 = _this._d3;
                var d3ParentElement;
                var d3G;
                var path = data["path"];
                if (_this._parentNativeElement !== null) {
                    d3ParentElement = d3.select(_this._parentNativeElement);
                    _this._d3Svg = d3ParentElement.select('svg');
                    _this._d3Svg.selectAll('g').remove();
                    d3G = _this._d3G = _this._d3Svg.append('g');
                    var screenHeight = (Number(data["lines-count"]) * 1.5) + 2;
                    _this._d3Svg.attr('width', _this.width);
                    _this._d3Svg.attr('height', screenHeight);
                    var lineStrokeWidth_1 = screenHeight / data["lines-count"];
                    var widthSumY1_1 = 0;
                    var widthSumY2_1 = 0;
                    _this._d3G.selectAll('line')
                        .data(data.lines)
                        .enter()
                        .append('line')
                        .attr("x1", function (d) {
                        return 0;
                    })
                        .attr("y1", function (d) {
                        if (!d.hasOwnProperty("break")) {
                            widthSumY1_1 = widthSumY1_1 + lineStrokeWidth_1;
                            return widthSumY1_1;
                        }
                        else {
                            return widthSumY1_1 + lineStrokeWidth_1;
                        }
                    })
                        .attr("x2", function (d) {
                        if (!d.hasOwnProperty("break")) {
                            return d.contentlength * 5;
                        }
                        else {
                            return 600;
                        }
                    })
                        .attr("y2", function (d) {
                        if (!d.hasOwnProperty("break")) {
                            widthSumY2_1 = widthSumY2_1 + lineStrokeWidth_1;
                            return widthSumY2_1;
                        }
                        else {
                            return widthSumY2_1 + lineStrokeWidth_1;
                        }
                    })
                        .attr("stroke-width", function (d) {
                        if (!d.hasOwnProperty("break")) {
                            return 1;
                        }
                        else {
                            return 2;
                        }
                    })
                        .attr("stroke", function (d) {
                        if (!d.hasOwnProperty("break")) {
                            var functionCheck = _this.isLinePartOfFunction(d);
                            if (functionCheck[0]) {
                                return _this.getAuthorColor(functionCheck[1][6][0]);
                            }
                            else {
                                return _this.getAuthorColor("others");
                            }
                        }
                        else {
                            return "black";
                        }
                    })
                        .append("title")
                        .text(function (d) {
                        if (!d.hasOwnProperty("break")) {
                            var functionCheck = _this.isLinePartOfFunction(d);
                            if (functionCheck[0]) {
                                return functionCheck[1][6][0] + " --- " + functionCheck[1][4];
                            }
                            else {
                                return "others";
                            }
                        }
                    });
                }
            });
    };
    FunctionMetricComponent.prototype.isLinePartOfFunction = function (d) {
        var flag = [];
        flag[0] = false;
        this.funData.forEach(function (fd) {
            if (d.finalline >= Number(fd[2]) && d.finalline <= Number(fd[5])) {
                flag[0] = true;
                flag[1] = fd;
            }
        });
        return flag;
    };
    FunctionMetricComponent.prototype.getAuthorColor = function (author) {
        if (author == "others") {
            this.authorMap.set(author, this.hslToHex(0, 0, 75));
        }
        if (this.authorMap.get(author)) {
            return this.authorMap.get(author);
        }
        else {
            this.uniqueAuthors.push(author);
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
    FunctionMetricComponent.prototype.getLegend = function () {
        return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].of(this.uniqueAuthors);
    };
    FunctionMetricComponent.prototype.hslToHex = function (h, s, l) {
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
    return FunctionMetricComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Number)
], FunctionMetricComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Number)
], FunctionMetricComponent.prototype, "height", void 0);
FunctionMetricComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-function-metric',
        template: __webpack_require__(999),
        styles: [__webpack_require__(998)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_d3_ng2_service__["a" /* D3Service */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__git_hub_service__["a" /* GitHubService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__git_hub_service__["a" /* GitHubService */]) === "function" && _c || Object])
], FunctionMetricComponent);

var colors = [
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
var _a, _b, _c;
//# sourceMappingURL=function-metric.component.js.map

/***/ }),

/***/ 998:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, ".container-graph {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n.lines-container {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 70%;\n          flex: 1 1 70%;\n}\n.legend-container {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 30%;\n          flex: 1 1 30%;\n}\n.lines {\n  padding-left: 0px;\n}\n.legend {\n  padding-left: 0px;\n}\n.legend ul{\n  margin: 0px;\n  list-style: none;\n}\n.legend ul li:before {\n  content: \"\\2022\";\n  font-size: 170%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 999:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-graph\">\n  <div class=\"lines-container\">\n    <svg class=\"lines\"></svg>\n  </div>\n  <div class=\"legend-container\">\n    <div class=\"legend\">\n      <input #path >\n      <button (click)=\"renderChart(path.value)\">Submit</button>\n      <h3>Legend: Person Id</h3>\n      <ul>\n        <li [style.color]=\"getAuthorColor(d)\"\n            *ngFor=\"let d of getLegend() | async\">\n          {{ d }}\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n"

/***/ })

},[993]);
//# sourceMappingURL=main.bundle.js.map