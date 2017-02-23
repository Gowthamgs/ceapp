/*
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function() {
    if (window.CKEDITOR && window.CKEDITOR.dom) return;
    window.CKEDITOR || (window.CKEDITOR = function() {
        var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,
            d = {
                timestamp: "H0CG",
                version: "4.6.2",
                revision: "20af917",
                rnd: Math.floor(900 * Math.random()) + 100,
                _: { pending: [], basePathSrcPattern: a },
                status: "unloaded",
                basePath: function() {
                    var b = window.CKEDITOR_BASEPATH || "";
                    if (!b)
                        for (var c = document.getElementsByTagName("script"), d = 0; d < c.length; d++) {
                            var h = c[d].src.match(a);
                            if (h) { b = h[1];
                                break } } - 1 == b.indexOf(":/") && "//" != b.slice(0, 2) && (b = 0 === b.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] +
                            b : location.href.match(/^[^\?]*\/(?:)/)[0] + b);
                    if (!b) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                    return b
                }(),
                getUrl: function(a) {-1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
                    this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "\x26" : "?") + "t\x3d" + this.timestamp);
                    return a },
                domReady: function() {
                    function a() {
                        try {
                            document.addEventListener ? (document.removeEventListener("DOMContentLoaded",
                                a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), b())
                        } catch (c) {}
                    }

                    function b() {
                        for (var a; a = c.shift();) a() }
                    var c = [];
                    return function(b) {
                        function d() {
                            try { document.documentElement.doScroll("left") } catch (f) { setTimeout(d, 1);
                                return }
                            a() }
                        c.push(b);
                        "complete" === document.readyState && setTimeout(a, 1);
                        if (1 == c.length)
                            if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1);
                            else if (document.attachEvent) {
                            document.attachEvent("onreadystatechange",
                                a);
                            window.attachEvent("onload", a);
                            b = !1;
                            try { b = !window.frameElement } catch (r) {}
                            document.documentElement.doScroll && b && d()
                        }
                    }
                }()
            },
            b = window.CKEDITOR_GETURL;
        if (b) {
            var c = d.getUrl;
            d.getUrl = function(a) {
                return b.call(d, a) || c.call(d, a) } }
        return d
    }());
    CKEDITOR.event || (CKEDITOR.event = function() {}, CKEDITOR.event.implementOn = function(a) {
        var d = CKEDITOR.event.prototype,
            b;
        for (b in d) null == a[b] && (a[b] = d[b]) }, CKEDITOR.event.prototype = function() {
        function a(a) {
            var e = d(this);
            return e[a] || (e[a] = new b(a)) }
        var d = function(a) { a = a.getPrivate && a.getPrivate() || a._ || (a._ = {});
                return a.events || (a.events = {}) },
            b = function(a) { this.name = a;
                this.listeners = [] };
        b.prototype = { getListenerIndex: function(a) {
                for (var b = 0, d = this.listeners; b < d.length; b++)
                    if (d[b].fn == a) return b;
                return -1 } };
        return {
            define: function(b, d) {
                var g = a.call(this, b);
                CKEDITOR.tools.extend(g, d, !0) },
            on: function(b, d, g, k, h) {
                function p(a, f, B, h) { a = { name: b, sender: this, editor: a, data: f, listenerData: k, stop: B, cancel: h, removeListener: r };
                    return !1 === d.call(g, a) ? !1 : a.data }

                function r() { B.removeListener(b, d) }
                var f = a.call(this, b);
                if (0 > f.getListenerIndex(d)) { f = f.listeners;
                    g || (g = this);
                    isNaN(h) && (h = 10);
                    var B = this;
                    p.fn = d;
                    p.priority = h;
                    for (var u = f.length - 1; 0 <= u; u--)
                        if (f[u].priority <= h) return f.splice(u + 1, 0, p), { removeListener: r };
                    f.unshift(p) }
                return { removeListener: r } },
            once: function() {
                var a = Array.prototype.slice.call(arguments),
                    b = a[1];
                a[1] = function(a) { a.removeListener();
                    return b.apply(this, arguments) };
                return this.on.apply(this, a) },
            capture: function() { CKEDITOR.event.useCapture = 1;
                var a = this.on.apply(this, arguments);
                CKEDITOR.event.useCapture = 0;
                return a },
            fire: function() {
                var a = 0,
                    b = function() { a = 1 },
                    g = 0,
                    k = function() { g = 1 };
                return function(h, p, r) {
                    var f = d(this)[h];
                    h = a;
                    var B = g;
                    a = g = 0;
                    if (f) {
                        var u = f.listeners;
                        if (u.length)
                            for (var u = u.slice(0), z, y = 0; y < u.length; y++) {
                                if (f.errorProof) try {
                                    z =
                                        u[y].call(this, r, p, b, k)
                                } catch (m) {} else z = u[y].call(this, r, p, b, k);
                                !1 === z ? g = 1 : "undefined" != typeof z && (p = z);
                                if (a || g) break
                            }
                    }
                    p = g ? !1 : "undefined" == typeof p ? !0 : p;
                    a = h;
                    g = B;
                    return p
                }
            }(),
            fireOnce: function(a, b, g) { b = this.fire(a, b, g);
                delete d(this)[a];
                return b },
            removeListener: function(a, b) {
                var g = d(this)[a];
                if (g) {
                    var k = g.getListenerIndex(b);
                    0 <= k && g.listeners.splice(k, 1) } },
            removeAllListeners: function() {
                var a = d(this),
                    b;
                for (b in a) delete a[b] },
            hasListeners: function(a) {
                return (a = d(this)[a]) && 0 < a.listeners.length }
        }
    }());
    CKEDITOR.editor || (CKEDITOR.editor = function() { CKEDITOR._.pending.push([this, arguments]);
        CKEDITOR.event.call(this) }, CKEDITOR.editor.prototype.fire = function(a, d) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0);
        return CKEDITOR.event.prototype.fire.call(this, a, d, this) }, CKEDITOR.editor.prototype.fireOnce = function(a, d) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0);
        return CKEDITOR.event.prototype.fireOnce.call(this, a, d, this) }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype));
    CKEDITOR.env || (CKEDITOR.env = function() {
        var a = navigator.userAgent.toLowerCase(),
            d = a.match(/edge[ \/](\d+.?\d*)/),
            b = -1 < a.indexOf("trident/"),
            b = !(!d && !b),
            b = {
                ie: b,
                edge: !!d,
                webkit: !b && -1 < a.indexOf(" applewebkit/"),
                air: -1 < a.indexOf(" adobeair/"),
                mac: -1 < a.indexOf("macintosh"),
                quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode),
                mobile: -1 < a.indexOf("mobile"),
                iOS: /(ipad|iphone|ipod)/.test(a),
                isCustomDomain: function() {
                    if (!this.ie) return !1;
                    var a = document.domain,
                        b = window.location.hostname;
                    return a != b && a != "[" + b + "]"
                },
                secure: "https:" == location.protocol
            };
        b.gecko = "Gecko" == navigator.product && !b.webkit && !b.ie;
        b.webkit && (-1 < a.indexOf("chrome") ? b.chrome = !0 : b.safari = !0);
        var c = 0;
        b.ie && (c = d ? parseFloat(d[1]) : b.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, b.ie9Compat = 9 == c, b.ie8Compat = 8 == c, b.ie7Compat = 7 == c, b.ie6Compat = 7 > c || b.quirks);
        b.gecko && (d = a.match(/rv:([\d\.]+)/)) && (d = d[1].split("."), c = 1E4 * d[0] + 100 * (d[1] || 0) + 1 * (d[2] || 0));
        b.air && (c = parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
        b.webkit && (c = parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));
        b.version = c;
        b.isCompatible = !(b.ie && 7 > c) && !(b.gecko && 4E4 > c) && !(b.webkit && 534 > c);
        b.hidpi = 2 <= window.devicePixelRatio;
        b.needsBrFiller = b.gecko || b.webkit || b.ie && 10 < c;
        b.needsNbspFiller = b.ie && 11 > c;
        b.cssClass = "cke_browser_" + (b.ie ? "ie" : b.gecko ? "gecko" : b.webkit ? "webkit" : "unknown");
        b.quirks && (b.cssClass += " cke_browser_quirks");
        b.ie && (b.cssClass += " cke_browser_ie" + (b.quirks ? "6 cke_browser_iequirks" : b.version));
        b.air && (b.cssClass += " cke_browser_air");
        b.iOS && (b.cssClass += " cke_browser_ios");
        b.hidpi && (b.cssClass += " cke_hidpi");
        return b
    }());
    "unloaded" == CKEDITOR.status && function() {
        CKEDITOR.event.implementOn(CKEDITOR);
        CKEDITOR.loadFullCore = function() {
            if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1;
            else { delete CKEDITOR.loadFullCore;
                var a = document.createElement("script");
                a.type = "text/javascript";
                a.src = CKEDITOR.basePath + "ckeditor.js";
                document.getElementsByTagName("head")[0].appendChild(a) } };
        CKEDITOR.loadFullCoreTimeout = 0;
        CKEDITOR.add = function(a) {
            (this._.pending || (this._.pending = [])).push(a) };
        (function() {
            CKEDITOR.domReady(function() {
                var a =
                    CKEDITOR.loadFullCore,
                    d = CKEDITOR.loadFullCoreTimeout;
                a && (CKEDITOR.status = "basic_ready", a && a._load ? a() : d && setTimeout(function() { CKEDITOR.loadFullCore && CKEDITOR.loadFullCore() }, 1E3 * d))
            })
        })();
        CKEDITOR.status = "basic_loaded"
    }();
    "use strict";
    CKEDITOR.VERBOSITY_WARN = 1;
    CKEDITOR.VERBOSITY_ERROR = 2;
    CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR;
    CKEDITOR.warn = function(a, d) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", { type: "warn", errorCode: a, additionalData: d }) };
    CKEDITOR.error = function(a, d) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log", { type: "error", errorCode: a, additionalData: d }) };
    CKEDITOR.on("log", function(a) {
        if (window.console && window.console.log) {
            var d = console[a.data.type] ? a.data.type : "log",
                b = a.data.errorCode;
            if (a = a.data.additionalData) console[d]("[CKEDITOR] Error code: " + b + ".", a);
            else console[d]("[CKEDITOR] Error code: " + b + ".");
            console[d]("[CKEDITOR] For more information about this error go to http://docs.ckeditor.com/#!/guide/dev_errors-section-" + b) } }, null, null, 999);
    CKEDITOR.dom = {};
    (function() {
        var a = [],
            d = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "",
            b = /&/g,
            c = />/g,
            e = /</g,
            g = /"/g,
            k = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,
            h = { lt: "\x3c", gt: "\x3e", amp: "\x26", quot: '"', nbsp: " ", shy: "­" },
            p = function(a, f) {
                return "#" == f[0] ? String.fromCharCode(parseInt(f.slice(1), 10)) : h[f] };
        CKEDITOR.on("reset", function() { a = [] });
        CKEDITOR.tools = {
            arrayCompare: function(a, f) {
                if (!a && !f) return !0;
                if (!a || !f || a.length != f.length) return !1;
                for (var b = 0; b < a.length; b++)
                    if (a[b] != f[b]) return !1;
                return !0
            },
            getIndex: function(a, f) {
                for (var b = 0; b < a.length; ++b)
                    if (f(a[b])) return b;
                return -1 },
            clone: function(a) {
                var f;
                if (a && a instanceof Array) { f = [];
                    for (var b = 0; b < a.length; b++) f[b] = CKEDITOR.tools.clone(a[b]);
                    return f }
                if (null === a || "object" != typeof a || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window === a) return a;
                f = new a.constructor;
                for (b in a) f[b] = CKEDITOR.tools.clone(a[b]);
                return f },
            capitalize: function(a, f) {
                return a.charAt(0).toUpperCase() +
                    (f ? a.slice(1) : a.slice(1).toLowerCase())
            },
            extend: function(a) {
                var f = arguments.length,
                    b, c; "boolean" == typeof(b = arguments[f - 1]) ? f-- : "boolean" == typeof(b = arguments[f - 2]) && (c = arguments[f - 1], f -= 2);
                for (var h = 1; h < f; h++) {
                    var d = arguments[h],
                        m;
                    for (m in d)
                        if (!0 === b || null == a[m])
                            if (!c || m in c) a[m] = d[m] }
                return a },
            prototypedCopy: function(a) {
                var f = function() {};
                f.prototype = a;
                return new f },
            copy: function(a) {
                var f = {},
                    b;
                for (b in a) f[b] = a[b];
                return f },
            isArray: function(a) {
                return "[object Array]" == Object.prototype.toString.call(a) },
            isEmpty: function(a) {
                for (var f in a)
                    if (a.hasOwnProperty(f)) return !1;
                return !0 },
            cssVendorPrefix: function(a, f, b) {
                if (b) return d + a + ":" + f + ";" + a + ":" + f;
                b = {};
                b[a] = f;
                b[d + a] = f;
                return b },
            cssStyleToDomStyle: function() {
                var a = document.createElement("div").style,
                    f = "undefined" != typeof a.cssFloat ? "cssFloat" : "undefined" != typeof a.styleFloat ? "styleFloat" : "float";
                return function(a) {
                    return "float" == a ? f : a.replace(/-./g, function(a) {
                        return a.substr(1).toUpperCase() }) } }(),
            buildStyleHtml: function(a) {
                a = [].concat(a);
                for (var f,
                        b = [], c = 0; c < a.length; c++)
                    if (f = a[c]) /@import|[{}]/.test(f) ? b.push("\x3cstyle\x3e" + f + "\x3c/style\x3e") : b.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + f + '"\x3e');
                return b.join("")
            },
            htmlEncode: function(a) {
                return void 0 === a || null === a ? "" : String(a).replace(b, "\x26amp;").replace(c, "\x26gt;").replace(e, "\x26lt;") },
            htmlDecode: function(a) {
                return a.replace(k, p) },
            htmlEncodeAttr: function(a) {
                return CKEDITOR.tools.htmlEncode(a).replace(g, "\x26quot;") },
            htmlDecodeAttr: function(a) {
                return CKEDITOR.tools.htmlDecode(a) },
            transformPlainTextToHtml: function(a, f) {
                var b = f == CKEDITOR.ENTER_BR,
                    c = this.htmlEncode(a.replace(/\r\n/g, "\n")),
                    c = c.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"),
                    h = f == CKEDITOR.ENTER_P ? "p" : "div";
                if (!b) {
                    var d = /\n{2}/g;
                    if (d.test(c)) var m = "\x3c" + h + "\x3e",
                        p = "\x3c/" + h + "\x3e",
                        c = m + c.replace(d, function() {
                            return p + m }) + p }
                c = c.replace(/\n/g, "\x3cbr\x3e");
                b || (c = c.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + h + "\x3e)"), function(a) {
                    return CKEDITOR.tools.repeat(a, 2) }));
                c = c.replace(/^ | $/g, "\x26nbsp;");
                return c = c.replace(/(>|\s) /g,
                    function(a, f) {
                        return f + "\x26nbsp;" }).replace(/ (?=<)/g, "\x26nbsp;")
            },
            getNextNumber: function() {
                var a = 0;
                return function() {
                    return ++a } }(),
            getNextId: function() {
                return "cke_" + this.getNextNumber() },
            getUniqueId: function() {
                for (var a = "e", f = 0; 8 > f; f++) a += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
                return a },
            override: function(a, f) {
                var b = f(a);
                b.prototype = a.prototype;
                return b },
            setTimeout: function(a, f, b, c, h) {
                h || (h = window);
                b || (b = h);
                return h.setTimeout(function() { c ? a.apply(b, [].concat(c)) : a.apply(b) },
                    f || 0)
            },
            trim: function() {
                var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                return function(f) {
                    return f.replace(a, "") } }(),
            ltrim: function() {
                var a = /^[ \t\n\r]+/g;
                return function(f) {
                    return f.replace(a, "") } }(),
            rtrim: function() {
                var a = /[ \t\n\r]+$/g;
                return function(f) {
                    return f.replace(a, "") } }(),
            indexOf: function(a, f) {
                if ("function" == typeof f)
                    for (var b = 0, c = a.length; b < c; b++) {
                        if (f(a[b])) return b } else {
                        if (a.indexOf) return a.indexOf(f);
                        b = 0;
                        for (c = a.length; b < c; b++)
                            if (a[b] === f) return b }
                return -1 },
            search: function(a, f) {
                var b = CKEDITOR.tools.indexOf(a,
                    f);
                return 0 <= b ? a[b] : null
            },
            bind: function(a, f) {
                return function() {
                    return a.apply(f, arguments) } },
            createClass: function(a) {
                var f = a.$,
                    b = a.base,
                    c = a.privates || a._,
                    h = a.proto;
                a = a.statics;
                !f && (f = function() { b && this.base.apply(this, arguments) });
                if (c) var d = f,
                    f = function() {
                        var a = this._ || (this._ = {}),
                            f;
                        for (f in c) {
                            var b = c[f];
                            a[f] = "function" == typeof b ? CKEDITOR.tools.bind(b, this) : b }
                        d.apply(this, arguments) };
                b && (f.prototype = this.prototypedCopy(b.prototype), f.prototype.constructor = f, f.base = b, f.baseProto = b.prototype, f.prototype.base =
                    function() { this.base = b.prototype.base;
                        b.apply(this, arguments);
                        this.base = arguments.callee });
                h && this.extend(f.prototype, h, !0);
                a && this.extend(f, a, !0);
                return f
            },
            addFunction: function(b, f) {
                return a.push(function() {
                    return b.apply(f || this, arguments) }) - 1 },
            removeFunction: function(b) { a[b] = null },
            callFunction: function(b) {
                var f = a[b];
                alert("hi")
                return f && f.apply(window, Array.prototype.slice.call(arguments, 1)) },
            cssLength: function() {
                var a = /^-?\d+\.?\d*px$/,
                    f;
                return function(b) {
                    f = CKEDITOR.tools.trim(b + "") + "px";
                    return a.test(f) ?
                        f : b || ""
                }
            }(),
            convertToPx: function() {
                var a;
                return function(f) { a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e', CKEDITOR.document), CKEDITOR.document.getBody().append(a));
                    return /%$/.test(f) ? f : (a.setStyle("width", f), a.$.clientWidth) } }(),
            repeat: function(a, f) {
                return Array(f + 1).join(a) },
            tryThese: function() {
                for (var a, f = 0, b = arguments.length; f < b; f++) {
                    var c = arguments[f];
                    try { a = c();
                        break } catch (h) {} }
                return a },
            genKey: function() {
                return Array.prototype.slice.call(arguments).join("-") },
            defer: function(a) {
                return function() {
                    var f = arguments,
                        b = this;
                    window.setTimeout(function() { a.apply(b, f) }, 0) } },
            normalizeCssText: function(a, f) {
                var b = [],
                    c, h = CKEDITOR.tools.parseCssText(a, !0, f);
                for (c in h) b.push(c + ":" + h[c]);
                b.sort();
                return b.length ? b.join(";") + ";" : "" },
            convertRgbToHex: function(a) {
                return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(a, b, c, h) {
                    a = [b, c, h];
                    for (b = 0; 3 > b; b++) a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2);
                    return "#" + a.join("")
                })
            },
            normalizeHex: function(a) {
                return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function(a, b, c, h) { a = b.toLowerCase();
                    3 == a.length && (a = a.split(""), a = [a[0], a[0], a[1], a[1], a[2], a[2]].join(""));
                    return "#" + a + h }) },
            parseCssText: function(a, f, b) {
                var c = {};
                b && (a = (new CKEDITOR.dom.element("span")).setAttribute("style", a).getAttribute("style") || "");
                a && (a = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a)));
                if (!a || ";" == a) return c;
                a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g,
                    function(a, b, h) { f && (b = b.toLowerCase(), "font-family" == b && (h = h.replace(/\s*,\s*/g, ",")), h = CKEDITOR.tools.trim(h));
                        c[b] = h });
                return c
            },
            writeCssText: function(a, b) {
                var c, h = [];
                for (c in a) h.push(c + ":" + a[c]);
                b && h.sort();
                return h.join("; ") },
            objectCompare: function(a, b, c) {
                var h;
                if (!a && !b) return !0;
                if (!a || !b) return !1;
                for (h in a)
                    if (a[h] != b[h]) return !1;
                if (!c)
                    for (h in b)
                        if (a[h] != b[h]) return !1;
                return !0 },
            objectKeys: function(a) {
                var b = [],
                    c;
                for (c in a) b.push(c);
                return b },
            convertArrayToObject: function(a, b) {
                var c = {};
                1 ==
                    arguments.length && (b = !0);
                for (var h = 0, d = a.length; h < d; ++h) c[a[h]] = b;
                return c
            },
            fixDomain: function() {
                for (var a;;) try { a = window.parent.document.domain;
                    break } catch (b) { a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain;
                    if (!a) break;
                    document.domain = a }
                return !!a },
            eventsBuffer: function(a, b, c) {
                function h() { p = (new Date).getTime();
                    d = !1;
                    c ? b.call(c) : b() }
                var d, p = 0;
                return { input: function() {
                        if (!d) {
                            var b = (new Date).getTime() - p;
                            b < a ? d = setTimeout(h, a - b) : h() } }, reset: function() { d && clearTimeout(d);
                        d = p = 0 } } },
            enableHtml5Elements: function(a,
                b) {
                for (var c = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "), h = c.length, d; h--;) d = a.createElement(c[h]), b && a.appendChild(d) },
            checkIfAnyArrayItemMatches: function(a, b) {
                for (var c = 0, h = a.length; c < h; ++c)
                    if (a[c].match(b)) return !0;
                return !1 },
            checkIfAnyObjectPropertyMatches: function(a, b) {
                for (var c in a)
                    if (c.match(b)) return !0;
                return !1 },
            keystrokeToString: function(a, b) {
                var c = b & 16711680,
                    h =
                    b & 65535,
                    d = CKEDITOR.env.mac,
                    p = [],
                    m = [];
                c & CKEDITOR.CTRL && (p.push(d ? "⌘" : a[17]), m.push(d ? a[224] : a[17]));
                c & CKEDITOR.ALT && (p.push(d ? "⌥" : a[18]), m.push(a[18]));
                c & CKEDITOR.SHIFT && (p.push(d ? "⇧" : a[16]), m.push(a[16]));
                h && (a[h] ? (p.push(a[h]), m.push(a[h])) : (p.push(String.fromCharCode(h)), m.push(String.fromCharCode(h))));
                return { display: p.join("+"), aria: m.join("+") }
            },
            transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",
            getCookie: function(a) {
                a = a.toLowerCase();
                for (var b = document.cookie.split(";"), c, h, d = 0; d < b.length; d++)
                    if (c = b[d].split("\x3d"), h = decodeURIComponent(CKEDITOR.tools.trim(c[0]).toLowerCase()), h === a) return decodeURIComponent(1 < c.length ? c[1] : "");
                return null
            },
            setCookie: function(a, b) { document.cookie = encodeURIComponent(a) + "\x3d" + encodeURIComponent(b) + ";path\x3d/" },
            getCsrfToken: function() {
                var a = CKEDITOR.tools.getCookie("ckCsrfToken");
                if (!a || 40 != a.length) {
                    var a = [],
                        b = "";
                    if (window.crypto && window.crypto.getRandomValues) a = new Uint8Array(40), window.crypto.getRandomValues(a);
                    else
                        for (var c = 0; 40 > c; c++) a.push(Math.floor(256 * Math.random()));
                    for (c = 0; c < a.length; c++) var h = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[c] % 36),
                        b = b + (.5 < Math.random() ? h.toUpperCase() : h);
                    a = b;
                    CKEDITOR.tools.setCookie("ckCsrfToken", a)
                }
                return a
            },
            escapeCss: function(a) {
                return a ? window.CSS && CSS.escape ? CSS.escape(a) : isNaN(parseInt(a.charAt(0), 10)) ? a : "\\3" + a.charAt(0) + " " + a.substring(1, a.length) : "" },
            style: {
                parse: {
                    _colors: {
                        aliceblue: "#F0F8FF",
                        antiquewhite: "#FAEBD7",
                        aqua: "#00FFFF",
                        aquamarine: "#7FFFD4",
                        azure: "#F0FFFF",
                        beige: "#F5F5DC",
                        bisque: "#FFE4C4",
                        black: "#000000",
                        blanchedalmond: "#FFEBCD",
                        blue: "#0000FF",
                        blueviolet: "#8A2BE2",
                        brown: "#A52A2A",
                        burlywood: "#DEB887",
                        cadetblue: "#5F9EA0",
                        chartreuse: "#7FFF00",
                        chocolate: "#D2691E",
                        coral: "#FF7F50",
                        cornflowerblue: "#6495ED",
                        cornsilk: "#FFF8DC",
                        crimson: "#DC143C",
                        cyan: "#00FFFF",
                        darkblue: "#00008B",
                        darkcyan: "#008B8B",
                        darkgoldenrod: "#B8860B",
                        darkgray: "#A9A9A9",
                        darkgreen: "#006400",
                        darkgrey: "#A9A9A9",
                        darkkhaki: "#BDB76B",
                        darkmagenta: "#8B008B",
                        darkolivegreen: "#556B2F",
                        darkorange: "#FF8C00",
                        darkorchid: "#9932CC",
                        darkred: "#8B0000",
                        darksalmon: "#E9967A",
                        darkseagreen: "#8FBC8F",
                        darkslateblue: "#483D8B",
                        darkslategray: "#2F4F4F",
                        darkslategrey: "#2F4F4F",
                        darkturquoise: "#00CED1",
                        darkviolet: "#9400D3",
                        deeppink: "#FF1493",
                        deepskyblue: "#00BFFF",
                        dimgray: "#696969",
                        dimgrey: "#696969",
                        dodgerblue: "#1E90FF",
                        firebrick: "#B22222",
                        floralwhite: "#FFFAF0",
                        forestgreen: "#228B22",
                        fuchsia: "#FF00FF",
                        gainsboro: "#DCDCDC",
                        ghostwhite: "#F8F8FF",
                        gold: "#FFD700",
                        goldenrod: "#DAA520",
                        gray: "#808080",
                        green: "#008000",
                        greenyellow: "#ADFF2F",
                        grey: "#808080",
                        honeydew: "#F0FFF0",
                        hotpink: "#FF69B4",
                        indianred: "#CD5C5C",
                        indigo: "#4B0082",
                        ivory: "#FFFFF0",
                        khaki: "#F0E68C",
                        lavender: "#E6E6FA",
                        lavenderblush: "#FFF0F5",
                        lawngreen: "#7CFC00",
                        lemonchiffon: "#FFFACD",
                        lightblue: "#ADD8E6",
                        lightcoral: "#F08080",
                        lightcyan: "#E0FFFF",
                        lightgoldenrodyellow: "#FAFAD2",
                        lightgray: "#D3D3D3",
                        lightgreen: "#90EE90",
                        lightgrey: "#D3D3D3",
                        lightpink: "#FFB6C1",
                        lightsalmon: "#FFA07A",
                        lightseagreen: "#20B2AA",
                        lightskyblue: "#87CEFA",
                        lightslategray: "#778899",
                        lightslategrey: "#778899",
                        lightsteelblue: "#B0C4DE",
                        lightyellow: "#FFFFE0",
                        lime: "#00FF00",
                        limegreen: "#32CD32",
                        linen: "#FAF0E6",
                        magenta: "#FF00FF",
                        maroon: "#800000",
                        mediumaquamarine: "#66CDAA",
                        mediumblue: "#0000CD",
                        mediumorchid: "#BA55D3",
                        mediumpurple: "#9370DB",
                        mediumseagreen: "#3CB371",
                        mediumslateblue: "#7B68EE",
                        mediumspringgreen: "#00FA9A",
                        mediumturquoise: "#48D1CC",
                        mediumvioletred: "#C71585",
                        midnightblue: "#191970",
                        mintcream: "#F5FFFA",
                        mistyrose: "#FFE4E1",
                        moccasin: "#FFE4B5",
                        navajowhite: "#FFDEAD",
                        navy: "#000080",
                        oldlace: "#FDF5E6",
                        olive: "#808000",
                        olivedrab: "#6B8E23",
                        orange: "#FFA500",
                        orangered: "#FF4500",
                        orchid: "#DA70D6",
                        palegoldenrod: "#EEE8AA",
                        palegreen: "#98FB98",
                        paleturquoise: "#AFEEEE",
                        palevioletred: "#DB7093",
                        papayawhip: "#FFEFD5",
                        peachpuff: "#FFDAB9",
                        peru: "#CD853F",
                        pink: "#FFC0CB",
                        plum: "#DDA0DD",
                        powderblue: "#B0E0E6",
                        purple: "#800080",
                        rebeccapurple: "#663399",
                        red: "#FF0000",
                        rosybrown: "#BC8F8F",
                        royalblue: "#4169E1",
                        saddlebrown: "#8B4513",
                        salmon: "#FA8072",
                        sandybrown: "#F4A460",
                        seagreen: "#2E8B57",
                        seashell: "#FFF5EE",
                        sienna: "#A0522D",
                        silver: "#C0C0C0",
                        skyblue: "#87CEEB",
                        slateblue: "#6A5ACD",
                        slategray: "#708090",
                        slategrey: "#708090",
                        snow: "#FFFAFA",
                        springgreen: "#00FF7F",
                        steelblue: "#4682B4",
                        tan: "#D2B48C",
                        teal: "#008080",
                        thistle: "#D8BFD8",
                        tomato: "#FF6347",
                        turquoise: "#40E0D0",
                        violet: "#EE82EE",
                        wheat: "#F5DEB3",
                        white: "#FFFFFF",
                        whitesmoke: "#F5F5F5",
                        yellow: "#FFFF00",
                        yellowgreen: "#9ACD32"
                    },
                    _rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi,
                    _hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi,
                    background: function(a) {
                        var b = [],
                            c = [],
                            c = this._findColor(a);
                        c.length && (b.color = c[0], CKEDITOR.tools.array.forEach(c, function(b) { a = a.replace(b, "") }));
                        if (a = CKEDITOR.tools.trim(a)) b.unprocessed = a;
                        return b
                    },
                    margin: function(a) {
                        function b(a) { c.top = h[a[0]];
                            c.right = h[a[1]];
                            c.bottom = h[a[2]];
                            c.left = h[a[3]] }
                        var c = {},
                            h = a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset)/g) || ["0px"];
                        switch (h.length) {
                            case 1:
                                b([0, 0, 0, 0]);
                                break;
                            case 2:
                                b([0, 1, 0, 1]);
                                break;
                            case 3:
                                b([0, 1, 2, 1]);
                                break;
                            case 4:
                                b([0, 1, 2, 3]) }
                        return c },
                    _findColor: function(a) {
                        var b = [],
                            c = CKEDITOR.tools.array,
                            b =
                            b.concat(a.match(this._rgbaRegExp) || []),
                            b = b.concat(a.match(this._hslaRegExp) || []);
                        return b = b.concat(c.filter(a.split(/\s+/), function(a) {
                            return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) ? !0 : a.toLowerCase() in CKEDITOR.tools.style.parse._colors }))
                    }
                }
            },
            array: {
                filter: function(a, b, c) {
                    var h = [];
                    this.forEach(a, function(d, p) { b.call(c, d, p, a) && h.push(d) });
                    return h },
                forEach: function(a, b, c) {
                    var h = a.length,
                        d;
                    for (d = 0; d < h; d++) b.call(c, a[d], d, a) },
                map: function(a, b, c) {
                    for (var h = [], d = 0; d < a.length; d++) h.push(b.call(c,
                        a[d], d, a));
                    return h
                },
                reduce: function(a, b, c, h) {
                    for (var d = 0; d < a.length; d++) c = b.call(h, c, a[d], d, a);
                    return c }
            }
        };
        CKEDITOR.tools.array.indexOf = CKEDITOR.tools.indexOf;
        CKEDITOR.tools.array.isArray = CKEDITOR.tools.isArray
    })();
    CKEDITOR.dtd = function() {
        var a = CKEDITOR.tools.extend,
            d = function(a, b) {
                for (var c = CKEDITOR.tools.clone(a), h = 1; h < arguments.length; h++) { b = arguments[h];
                    for (var d in b) delete c[d] }
                return c },
            b = {},
            c = {},
            e = { address: 1, article: 1, aside: 1, blockquote: 1, details: 1, div: 1, dl: 1, fieldset: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, hr: 1, main: 1, menu: 1, nav: 1, ol: 1, p: 1, pre: 1, section: 1, table: 1, ul: 1 },
            g = { command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1 },
            k = {},
            h = { "#": 1 },
            p = { center: 1, dir: 1, noframes: 1 };
        a(b, { a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, "var": 1, video: 1, wbr: 1 }, h, { acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1 });
        a(c, e, b, p);
        d = {
            a: d(b, { a: 1, button: 1 }),
            abbr: b,
            address: c,
            area: k,
            article: c,
            aside: c,
            audio: a({ source: 1, track: 1 }, c),
            b: b,
            base: k,
            bdi: b,
            bdo: b,
            blockquote: c,
            body: c,
            br: k,
            button: d(b, { a: 1, button: 1 }),
            canvas: b,
            caption: c,
            cite: b,
            code: b,
            col: k,
            colgroup: { col: 1 },
            command: k,
            datalist: a({ option: 1 }, b),
            dd: c,
            del: b,
            details: a({ summary: 1 }, c),
            dfn: b,
            div: c,
            dl: { dt: 1, dd: 1 },
            dt: c,
            em: b,
            embed: k,
            fieldset: a({ legend: 1 }, c),
            figcaption: c,
            figure: a({ figcaption: 1 }, c),
            footer: c,
            form: c,
            h1: b,
            h2: b,
            h3: b,
            h4: b,
            h5: b,
            h6: b,
            head: a({ title: 1, base: 1 }, g),
            header: c,
            hgroup: { h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 },
            hr: k,
            html: a({
                head: 1,
                body: 1
            }, c, g),
            i: b,
            iframe: h,
            img: k,
            input: k,
            ins: b,
            kbd: b,
            keygen: k,
            label: b,
            legend: b,
            li: c,
            link: k,
            main: c,
            map: c,
            mark: b,
            menu: a({ li: 1 }, c),
            meta: k,
            meter: d(b, { meter: 1 }),
            nav: c,
            noscript: a({ link: 1, meta: 1, style: 1 }, b),
            object: a({ param: 1 }, b),
            ol: { li: 1 },
            optgroup: { option: 1 },
            option: h,
            output: b,
            p: b,
            param: k,
            pre: b,
            progress: d(b, { progress: 1 }),
            q: b,
            rp: b,
            rt: b,
            ruby: a({ rp: 1, rt: 1 }, b),
            s: b,
            samp: b,
            script: h,
            section: c,
            select: { optgroup: 1, option: 1 },
            small: b,
            source: k,
            span: b,
            strong: b,
            style: h,
            sub: b,
            summary: a({ h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, b),
            sup: b,
            table: { caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1 },
            tbody: { tr: 1 },
            td: c,
            textarea: h,
            tfoot: { tr: 1 },
            th: c,
            thead: { tr: 1 },
            time: d(b, { time: 1 }),
            title: h,
            tr: { th: 1, td: 1 },
            track: k,
            u: b,
            ul: { li: 1 },
            "var": b,
            video: a({ source: 1, track: 1 }, c),
            wbr: k,
            acronym: b,
            applet: a({ param: 1 }, c),
            basefont: k,
            big: b,
            center: c,
            dialog: k,
            dir: { li: 1 },
            font: b,
            isindex: k,
            noframes: c,
            strike: b,
            tt: b
        };
        a(d, {
            $block: a({ audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1 }, e, p),
            $blockLimit: {
                article: 1,
                aside: 1,
                audio: 1,
                body: 1,
                caption: 1,
                details: 1,
                dir: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                figcaption: 1,
                figure: 1,
                footer: 1,
                form: 1,
                header: 1,
                hgroup: 1,
                main: 1,
                menu: 1,
                nav: 1,
                ol: 1,
                section: 1,
                table: 1,
                td: 1,
                th: 1,
                tr: 1,
                ul: 1,
                video: 1
            },
            $cdata: { script: 1, style: 1 },
            $editable: { address: 1, article: 1, aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, figcaption: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, main: 1, nav: 1, p: 1, pre: 1, section: 1 },
            $empty: {
                area: 1,
                base: 1,
                basefont: 1,
                br: 1,
                col: 1,
                command: 1,
                dialog: 1,
                embed: 1,
                hr: 1,
                img: 1,
                input: 1,
                isindex: 1,
                keygen: 1,
                link: 1,
                meta: 1,
                param: 1,
                source: 1,
                track: 1,
                wbr: 1
            },
            $inline: b,
            $list: { dl: 1, ol: 1, ul: 1 },
            $listItem: { dd: 1, dt: 1, li: 1 },
            $nonBodyContent: a({ body: 1, head: 1, html: 1 }, d.head),
            $nonEditable: { applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, param: 1, script: 1, textarea: 1, video: 1 },
            $object: { applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1 },
            $removeEmpty: {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdi: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                mark: 1,
                meter: 1,
                output: 1,
                q: 1,
                ruby: 1,
                s: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                time: 1,
                tt: 1,
                u: 1,
                "var": 1
            },
            $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 },
            $tableContent: { caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 },
            $transparent: { a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1 },
            $intermediate: { caption: 1, colgroup: 1, dd: 1, dt: 1, figcaption: 1, legend: 1, li: 1, optgroup: 1, option: 1, rp: 1, rt: 1, summary: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }
        });
        return d
    }();
    CKEDITOR.dom.event = function(a) { this.$ = a };
    CKEDITOR.dom.event.prototype = {
        getKey: function() {
            return this.$.keyCode || this.$.which },
        getKeystroke: function() {
            var a = this.getKey();
            if (this.$.ctrlKey || this.$.metaKey) a += CKEDITOR.CTRL;
            this.$.shiftKey && (a += CKEDITOR.SHIFT);
            this.$.altKey && (a += CKEDITOR.ALT);
            return a },
        preventDefault: function(a) {
            var d = this.$;
            d.preventDefault ? d.preventDefault() : d.returnValue = !1;
            a && this.stopPropagation() },
        stopPropagation: function() {
            var a = this.$;
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0 },
        getTarget: function() {
            var a =
                this.$.target || this.$.srcElement;
            return a ? new CKEDITOR.dom.node(a) : null
        },
        getPhase: function() {
            return this.$.eventPhase || 2 },
        getPageOffset: function() {
            var a = this.getTarget().getDocument().$;
            return { x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft), y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop) } }
    };
    CKEDITOR.CTRL = 1114112;
    CKEDITOR.SHIFT = 2228224;
    CKEDITOR.ALT = 4456448;
    CKEDITOR.EVENT_PHASE_CAPTURING = 1;
    CKEDITOR.EVENT_PHASE_AT_TARGET = 2;
    CKEDITOR.EVENT_PHASE_BUBBLING = 3;
    CKEDITOR.dom.domObject = function(a) { a && (this.$ = a) };
    CKEDITOR.dom.domObject.prototype = function() {
        var a = function(a, b) {
            return function(c) { "undefined" != typeof CKEDITOR && a.fire(b, new CKEDITOR.dom.event(c)) } };
        return {
            getPrivate: function() {
                var a;
                (a = this.getCustomData("_")) || this.setCustomData("_", a = {});
                return a },
            on: function(d) {
                var b = this.getCustomData("_cke_nativeListeners");
                b || (b = {}, this.setCustomData("_cke_nativeListeners", b));
                b[d] || (b = b[d] = a(this, d), this.$.addEventListener ? this.$.addEventListener(d, b, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" +
                    d, b));
                return CKEDITOR.event.prototype.on.apply(this, arguments)
            },
            removeListener: function(a) { CKEDITOR.event.prototype.removeListener.apply(this, arguments);
                if (!this.hasListeners(a)) {
                    var b = this.getCustomData("_cke_nativeListeners"),
                        c = b && b[a];
                    c && (this.$.removeEventListener ? this.$.removeEventListener(a, c, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, c), delete b[a]) } },
            removeAllListeners: function() {
                var a = this.getCustomData("_cke_nativeListeners"),
                    b;
                for (b in a) {
                    var c = a[b];
                    this.$.detachEvent ? this.$.detachEvent("on" +
                        b, c) : this.$.removeEventListener && this.$.removeEventListener(b, c, !1);
                    delete a[b]
                }
                CKEDITOR.event.prototype.removeAllListeners.call(this)
            }
        }
    }();
    (function(a) {
        var d = {};
        CKEDITOR.on("reset", function() { d = {} });
        a.equals = function(a) {
            try {
                return a && a.$ === this.$ } catch (c) {
                return !1 } };
        a.setCustomData = function(a, c) {
            var e = this.getUniqueId();
            (d[e] || (d[e] = {}))[a] = c;
            return this };
        a.getCustomData = function(a) {
            var c = this.$["data-cke-expando"];
            return (c = c && d[c]) && a in c ? c[a] : null };
        a.removeCustomData = function(a) {
            var c = this.$["data-cke-expando"],
                c = c && d[c],
                e, g;
            c && (e = c[a], g = a in c, delete c[a]);
            return g ? e : null };
        a.clearCustomData = function() {
            this.removeAllListeners();
            var a =
                this.$["data-cke-expando"];
            a && delete d[a]
        };
        a.getUniqueId = function() {
            return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber()) };
        CKEDITOR.event.implementOn(a)
    })(CKEDITOR.dom.domObject.prototype);
    CKEDITOR.dom.node = function(a) {
        return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this };
    CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.NODE_ELEMENT = 1;
    CKEDITOR.NODE_DOCUMENT = 9;
    CKEDITOR.NODE_TEXT = 3;
    CKEDITOR.NODE_COMMENT = 8;
    CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11;
    CKEDITOR.POSITION_IDENTICAL = 0;
    CKEDITOR.POSITION_DISCONNECTED = 1;
    CKEDITOR.POSITION_FOLLOWING = 2;
    CKEDITOR.POSITION_PRECEDING = 4;
    CKEDITOR.POSITION_IS_CONTAINED = 8;
    CKEDITOR.POSITION_CONTAINS = 16;
    CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
        appendTo: function(a, d) { a.append(this, d);
            return a },
        clone: function(a, d) {
            function b(c) { c["data-cke-expando"] && (c["data-cke-expando"] = !1);
                if (c.nodeType == CKEDITOR.NODE_ELEMENT || c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
                    if (d || c.nodeType != CKEDITOR.NODE_ELEMENT || c.removeAttribute("id", !1), a) { c = c.childNodes;
                        for (var e = 0; e < c.length; e++) b(c[e]) } }

            function c(b) {
                if (b.type == CKEDITOR.NODE_ELEMENT || b.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                    if (b.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var d =
                            b.getName();
                        ":" == d[0] && b.renameNode(d.substring(1))
                    }
                    if (a)
                        for (d = 0; d < b.getChildCount(); d++) c(b.getChild(d))
                }
            }
            var e = this.$.cloneNode(a);
            b(e);
            e = new CKEDITOR.dom.node(e);
            CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && c(e);
            return e
        },
        hasPrevious: function() {
            return !!this.$.previousSibling },
        hasNext: function() {
            return !!this.$.nextSibling },
        insertAfter: function(a) { a.$.parentNode.insertBefore(this.$, a.$.nextSibling);
            return a },
        insertBefore: function(a) {
            a.$.parentNode.insertBefore(this.$,
                a.$);
            return a
        },
        insertBeforeMe: function(a) { this.$.parentNode.insertBefore(a.$, this.$);
            return a },
        getAddress: function(a) {
            for (var d = [], b = this.getDocument().$.documentElement, c = this.$; c && c != b;) {
                var e = c.parentNode;
                e && d.unshift(this.getIndex.call({ $: c }, a));
                c = e }
            return d },
        getDocument: function() {
            return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument) },
        getIndex: function(a) {
            function d(a, c) {
                var p = c ? a.nextSibling : a.previousSibling;
                return p && p.nodeType == CKEDITOR.NODE_TEXT ? b(p) ? d(p,
                    c) : p : null
            }

            function b(a) {
                return !a.nodeValue || a.nodeValue == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE }
            var c = this.$,
                e = -1,
                g;
            if (!this.$.parentNode || a && c.nodeType == CKEDITOR.NODE_TEXT && b(c) && !d(c) && !d(c, !0)) return -1;
            do a && c != this.$ && c.nodeType == CKEDITOR.NODE_TEXT && (g || b(c)) || (e++, g = c.nodeType == CKEDITOR.NODE_TEXT); while (c = c.previousSibling);
            return e
        },
        getNextSourceNode: function(a, d, b) {
            if (b && !b.call) {
                var c = b;
                b = function(a) {
                    return !a.equals(c) } }
            a = !a && this.getFirst && this.getFirst();
            var e;
            if (!a) {
                if (this.type ==
                    CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null;
                a = this.getNext()
            }
            for (; !a && (e = (e || this).getParent());) {
                if (b && !1 === b(e, !0)) return null;
                a = e.getNext() }
            return !a || b && !1 === b(a) ? null : d && d != a.type ? a.getNextSourceNode(!1, d, b) : a
        },
        getPreviousSourceNode: function(a, d, b) {
            if (b && !b.call) {
                var c = b;
                b = function(a) {
                    return !a.equals(c) } }
            a = !a && this.getLast && this.getLast();
            var e;
            if (!a) {
                if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null;
                a = this.getPrevious() }
            for (; !a && (e = (e || this).getParent());) {
                if (b && !1 ===
                    b(e, !0)) return null;
                a = e.getPrevious()
            }
            return !a || b && !1 === b(a) ? null : d && a.type != d ? a.getPreviousSourceNode(!1, d, b) : a
        },
        getPrevious: function(a) {
            var d = this.$,
                b;
            do b = (d = d.previousSibling) && 10 != d.nodeType && new CKEDITOR.dom.node(d); while (b && a && !a(b));
            return b },
        getNext: function(a) {
            var d = this.$,
                b;
            do b = (d = d.nextSibling) && new CKEDITOR.dom.node(d); while (b && a && !a(b));
            return b },
        getParent: function(a) {
            var d = this.$.parentNode;
            return d && (d.nodeType == CKEDITOR.NODE_ELEMENT || a && d.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ?
                new CKEDITOR.dom.node(d) : null
        },
        getParents: function(a) {
            var d = this,
                b = [];
            do b[a ? "push" : "unshift"](d); while (d = d.getParent());
            return b },
        getCommonAncestor: function(a) {
            if (a.equals(this)) return this;
            if (a.contains && a.contains(this)) return a;
            var d = this.contains ? this : this.getParent();
            do
                if (d.contains(a)) return d;
            while (d = d.getParent());
            return null },
        getPosition: function(a) {
            var d = this.$,
                b = a.$;
            if (d.compareDocumentPosition) return d.compareDocumentPosition(b);
            if (d == b) return CKEDITOR.POSITION_IDENTICAL;
            if (this.type ==
                CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) {
                if (d.contains) {
                    if (d.contains(b)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
                    if (b.contains(d)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING }
                if ("sourceIndex" in d) return 0 > d.sourceIndex || 0 > b.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : d.sourceIndex < b.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING }
            d = this.getAddress();
            a = a.getAddress();
            for (var b = Math.min(d.length, a.length), c = 0; c < b; c++)
                if (d[c] !=
                    a[c]) return d[c] < a[c] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
            return d.length < a.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
        },
        getAscendant: function(a, d) {
            var b = this.$,
                c, e;
            d || (b = b.parentNode);
            "function" == typeof a ? (e = !0, c = a) : (e = !1, c = function(b) { b = "string" == typeof b.nodeName ? b.nodeName.toLowerCase() : "";
                return "string" == typeof a ? b == a : b in a });
            for (; b;) {
                if (c(e ? new CKEDITOR.dom.node(b) : b)) return new CKEDITOR.dom.node(b);
                try { b = b.parentNode } catch (g) { b = null }
            }
            return null
        },
        hasAscendant: function(a, d) {
            var b = this.$;
            d || (b = b.parentNode);
            for (; b;) {
                if (b.nodeName && b.nodeName.toLowerCase() == a) return !0;
                b = b.parentNode }
            return !1 },
        move: function(a, d) { a.append(this.remove(), d) },
        remove: function(a) {
            var d = this.$,
                b = d.parentNode;
            if (b) {
                if (a)
                    for (; a = d.firstChild;) b.insertBefore(d.removeChild(a), d);
                b.removeChild(d) }
            return this },
        replace: function(a) { this.insertBefore(a);
            a.remove() },
        trim: function() { this.ltrim();
            this.rtrim() },
        ltrim: function() {
            for (var a; this.getFirst &&
                (a = this.getFirst());) {
                if (a.type == CKEDITOR.NODE_TEXT) {
                    var d = CKEDITOR.tools.ltrim(a.getText()),
                        b = a.getLength();
                    if (d) d.length < b && (a.split(b - d.length), this.$.removeChild(this.$.firstChild));
                    else { a.remove();
                        continue } }
                break }
        },
        rtrim: function() {
            for (var a; this.getLast && (a = this.getLast());) {
                if (a.type == CKEDITOR.NODE_TEXT) {
                    var d = CKEDITOR.tools.rtrim(a.getText()),
                        b = a.getLength();
                    if (d) d.length < b && (a.split(d.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild));
                    else { a.remove();
                        continue } }
                break }
            CKEDITOR.env.needsBrFiller &&
                (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a)
        },
        isReadOnly: function(a) {
            var d = this;
            this.type != CKEDITOR.NODE_ELEMENT && (d = this.getParent());
            CKEDITOR.env.edge && d && d.is("textarea", "input") && (a = !0);
            if (!a && d && "undefined" != typeof d.$.isContentEditable) return !(d.$.isContentEditable || d.data("cke-editable"));
            for (; d;) {
                if (d.data("cke-editable")) return !1;
                if (d.hasAttribute("contenteditable")) return "false" == d.getAttribute("contenteditable");
                d = d.getParent() }
            return !0 }
    });
    CKEDITOR.dom.window = function(a) { CKEDITOR.dom.domObject.call(this, a) };
    CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
        focus: function() { this.$.focus() },
        getViewPaneSize: function() {
            var a = this.$.document,
                d = "CSS1Compat" == a.compatMode;
            return { width: (d ? a.documentElement.clientWidth : a.body.clientWidth) || 0, height: (d ? a.documentElement.clientHeight : a.body.clientHeight) || 0 } },
        getScrollPosition: function() {
            var a = this.$;
            if ("pageXOffset" in a) return { x: a.pageXOffset || 0, y: a.pageYOffset || 0 };
            a = a.document;
            return {
                x: a.documentElement.scrollLeft || a.body.scrollLeft || 0,
                y: a.documentElement.scrollTop ||
                    a.body.scrollTop || 0
            }
        },
        getFrame: function() {
            var a = this.$.frameElement;
            return a ? new CKEDITOR.dom.element.get(a) : null }
    });
    CKEDITOR.dom.document = function(a) { CKEDITOR.dom.domObject.call(this, a) };
    CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
        type: CKEDITOR.NODE_DOCUMENT,
        appendStyleSheet: function(a) {
            if (this.$.createStyleSheet) this.$.createStyleSheet(a);
            else {
                var d = new CKEDITOR.dom.element("link");
                d.setAttributes({ rel: "stylesheet", type: "text/css", href: a });
                this.getHead().append(d) } },
        appendStyleText: function(a) {
            if (this.$.createStyleSheet) {
                var d = this.$.createStyleSheet("");
                d.cssText = a } else {
                var b = new CKEDITOR.dom.element("style", this);
                b.append(new CKEDITOR.dom.text(a, this));
                this.getHead().append(b) }
            return d ||
                b.$.sheet
        },
        createElement: function(a, d) {
            var b = new CKEDITOR.dom.element(a, this);
            d && (d.attributes && b.setAttributes(d.attributes), d.styles && b.setStyles(d.styles));
            return b },
        createText: function(a) {
            return new CKEDITOR.dom.text(a, this) },
        focus: function() { this.getWindow().focus() },
        getActive: function() {
            var a;
            try { a = this.$.activeElement } catch (d) {
                return null }
            return new CKEDITOR.dom.element(a) },
        getById: function(a) {
            return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null },
        getByAddress: function(a, d) {
            for (var b =
                    this.$.documentElement, c = 0; b && c < a.length; c++) {
                var e = a[c];
                if (d)
                    for (var g = -1, k = 0; k < b.childNodes.length; k++) {
                        var h = b.childNodes[k];
                        if (!0 !== d || 3 != h.nodeType || !h.previousSibling || 3 != h.previousSibling.nodeType)
                            if (g++, g == e) { b = h;
                                break } } else b = b.childNodes[e] }
            return b ? new CKEDITOR.dom.node(b) : null
        },
        getElementsByTag: function(a, d) { CKEDITOR.env.ie && 8 >= document.documentMode || !d || (a = d + ":" + a);
            return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a)) },
        getHead: function() {
            var a = this.$.getElementsByTagName("head")[0];
            return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0)
        },
        getBody: function() {
            return new CKEDITOR.dom.element(this.$.body) },
        getDocumentElement: function() {
            return new CKEDITOR.dom.element(this.$.documentElement) },
        getWindow: function() {
            return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView) },
        write: function(a) {
            this.$.open("text/html", "replace");
            CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' +
                CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e"));
            this.$.write(a);
            this.$.close()
        },
        find: function(a) {
            return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a)) },
        findOne: function(a) {
            return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null },
        _getHtml5ShivFrag: function() {
            var a = this.getCustomData("html5ShivFrag");
            a || (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData("html5ShivFrag", a));
            return a }
    });
    CKEDITOR.dom.nodeList = function(a) { this.$ = a };
    CKEDITOR.dom.nodeList.prototype = { count: function() {
            return this.$.length }, getItem: function(a) {
            return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null } };
    CKEDITOR.dom.element = function(a, d) { "string" == typeof a && (a = (d ? d.$ : document).createElement(a));
        CKEDITOR.dom.domObject.call(this, a) };
    CKEDITOR.dom.element.get = function(a) {
        return (a = "string" == typeof a ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a)) };
    CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node;
    CKEDITOR.dom.element.createFromHtml = function(a, d) {
        var b = new CKEDITOR.dom.element("div", d);
        b.setHtml(a);
        return b.getFirst().remove() };
    CKEDITOR.dom.element.setMarker = function(a, d, b, c) {
        var e = d.getCustomData("list_marker_id") || d.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
            g = d.getCustomData("list_marker_names") || d.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
        a[e] = d;
        g[b] = 1;
        return d.setCustomData(b, c) };
    CKEDITOR.dom.element.clearAllMarkers = function(a) {
        for (var d in a) CKEDITOR.dom.element.clearMarkers(a, a[d], 1) };
    CKEDITOR.dom.element.clearMarkers = function(a, d, b) {
        var c = d.getCustomData("list_marker_names"),
            e = d.getCustomData("list_marker_id"),
            g;
        for (g in c) d.removeCustomData(g);
        d.removeCustomData("list_marker_names");
        b && (d.removeCustomData("list_marker_id"), delete a[e]) };
    (function() {
        function a(a, b) {
            return -1 < (" " + a + " ").replace(g, " ").indexOf(" " + b + " ") }

        function d(a) {
            var b = !0;
            a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), b = !1);
            return function() { b || a.removeAttribute("id") } }

        function b(a, b) {
            var c = CKEDITOR.tools.escapeCss(a.$.id);
            return "#" + c + " " + b.split(/,\s*/).join(", #" + c + " ") }

        function c(a) {
            for (var b = 0, c = 0, f = k[a].length; c < f; c++) b += parseFloat(this.getComputedStyle(k[a][c]) || 0, 10) || 0;
            return b }
        var e = document.createElement("_").classList,
            e = "undefined" !== typeof e &&
            null !== String(e.add).match(/\[Native code\]/gi),
            g = /[\n\t\r]/g;
        CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_ELEMENT,
            addClass: e ? function(a) { this.$.classList.add(a);
                return this } : function(b) {
                var c = this.$.className;
                c && (a(c, b) || (c += " " + b));
                this.$.className = c || b;
                return this },
            removeClass: e ? function(a) {
                var b = this.$;
                b.classList.remove(a);
                b.className || b.removeAttribute("class");
                return this } : function(b) {
                var c = this.getAttribute("class");
                c && a(c, b) && ((c = c.replace(new RegExp("(?:^|\\s+)" +
                    b + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", c) : this.removeAttribute("class"));
                return this
            },
            hasClass: function(b) {
                return a(this.$.className, b) },
            append: function(a, b) { "string" == typeof a && (a = this.getDocument().createElement(a));
                b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$);
                return a },
            appendHtml: function(a) {
                if (this.$.childNodes.length) {
                    var b = new CKEDITOR.dom.element("div", this.getDocument());
                    b.setHtml(a);
                    b.moveChildren(this) } else this.setHtml(a) },
            appendText: function(a) {
                null !=
                    this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? this.$.text += a : this.append(new CKEDITOR.dom.text(a))
            },
            appendBogus: function(a) {
                if (a || CKEDITOR.env.needsBrFiller) {
                    for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());) a = a.getPrevious();
                    a && a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a)) } },
            breakParent: function(a, b) {
                var c = new CKEDITOR.dom.range(this.getDocument());
                c.setStartAfter(this);
                c.setEndAfter(a);
                var f = c.extractContents(!1, b || !1),
                    d;
                c.insertNode(this.remove());
                if (CKEDITOR.env.ie && !CKEDITOR.env.edge) {
                    for (c = new CKEDITOR.dom.element("div"); d = f.getFirst();) d.$.style.backgroundColor && (d.$.style.backgroundColor = d.$.style.backgroundColor), c.append(d);
                    c.insertAfter(this);
                    c.remove(!0) } else f.insertAfterNode(this)
            },
            contains: document.compareDocumentPosition ? function(a) {
                return !!(this.$.compareDocumentPosition(a.$) & 16) } : function(a) {
                var b = this.$;
                return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) :
                    b != a.$ && b.contains(a.$)
            },
            focus: function() {
                function a() {
                    try { this.$.focus() } catch (b) {} }
                return function(b) { b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this) } }(),
            getHtml: function() {
                var a = this.$.innerHTML;
                return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a },
            getOuterHtml: function() {
                if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, "");
                var a = this.$.ownerDocument.createElement("div");
                a.appendChild(this.$.cloneNode(!0));
                return a.innerHTML },
            getClientRect: function() {
                var a = CKEDITOR.tools.extend({},
                    this.$.getBoundingClientRect());
                !a.width && (a.width = a.right - a.left);
                !a.height && (a.height = a.bottom - a.top);
                return a
            },
            setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function(a) {
                try {
                    var b = this.$;
                    if (this.getParent()) return b.innerHTML = a;
                    var c = this.getDocument()._getHtml5ShivFrag();
                    c.appendChild(b);
                    b.innerHTML = a;
                    c.removeChild(b);
                    return a } catch (f) { this.$.innerHTML = "";
                    b = new CKEDITOR.dom.element("body", this.getDocument());
                    b.$.innerHTML = a;
                    for (b = b.getChildren(); b.count();) this.append(b.getItem(0));
                    return a } } : function(a) {
                return this.$.innerHTML = a },
            setText: function() {
                var a = document.createElement("p");
                a.innerHTML = "x";
                a = a.textContent;
                return function(b) { this.$[a ? "textContent" : "innerText"] = b } }(),
            getAttribute: function() {
                var a = function(a) {
                    return this.$.getAttribute(a, 2) };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(a) {
                    switch (a) {
                        case "class":
                            a = "className";
                            break;
                        case "http-equiv":
                            a = "httpEquiv";
                            break;
                        case "name":
                            return this.$.name;
                        case "tabindex":
                            return a = this.$.getAttribute(a,
                                2), 0 !== a && 0 === this.$.tabIndex && (a = null), a;
                        case "checked":
                            return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null;
                        case "hspace":
                        case "value":
                            return this.$[a];
                        case "style":
                            return this.$.style.cssText;
                        case "contenteditable":
                        case "contentEditable":
                            return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                    }
                    return this.$.getAttribute(a, 2)
                } : a
            }(),
            getAttributes: function(a) {
                var b = {},
                    c = this.$.attributes,
                    f;
                a = CKEDITOR.tools.isArray(a) ?
                    a : [];
                for (f = 0; f < c.length; f++) - 1 === CKEDITOR.tools.indexOf(a, c[f].name) && (b[c[f].name] = c[f].value);
                return b
            },
            getChildren: function() {
                return new CKEDITOR.dom.nodeList(this.$.childNodes) },
            getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function(a) {
                var b = this.getWindow().$.getComputedStyle(this.$, null);
                return b ? b.getPropertyValue(a) : "" } : function(a) {
                return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)] },
            getDtd: function() {
                var a = CKEDITOR.dtd[this.getName()];
                this.getDtd =
                    function() {
                        return a };
                return a
            },
            getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
            getTabIndex: function() {
                var a = this.$.tabIndex;
                return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1 },
            getText: function() {
                return this.$.textContent || this.$.innerText || "" },
            getWindow: function() {
                return this.getDocument().getWindow() },
            getId: function() {
                return this.$.id || null },
            getNameAtt: function() {
                return this.$.name || null },
            getName: function() {
                var a = this.$.nodeName.toLowerCase();
                if (CKEDITOR.env.ie && 8 >= document.documentMode) {
                    var b = this.$.scopeName; "HTML" != b && (a = b.toLowerCase() + ":" + a) }
                this.getName = function() {
                    return a };
                return this.getName()
            },
            getValue: function() {
                return this.$.value },
            getFirst: function(a) {
                var b = this.$.firstChild;
                (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getNext(a));
                return b },
            getLast: function(a) {
                var b = this.$.lastChild;
                (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getPrevious(a));
                return b },
            getStyle: function(a) {
                return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] },
            is: function() {
                var a = this.getName();
                if ("object" == typeof arguments[0]) return !!arguments[0][a];
                for (var b = 0; b < arguments.length; b++)
                    if (arguments[b] == a) return !0;
                return !1 },
            isEditable: function(a) {
                var b = this.getName();
                return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[b] ||
                    CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
            },
            isIdentical: function(a) {
                var b = this.clone(0, 1);
                a = a.clone(0, 1);
                b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                if (b.$.isEqualNode) return b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$);
                b = b.getOuterHtml();
                a =
                    a.getOuterHtml();
                if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) {
                    var c = this.getParent();
                    c.type == CKEDITOR.NODE_ELEMENT && (c = c.clone(), c.setHtml(b), b = c.getHtml(), c.setHtml(a), a = c.getHtml()) }
                return b == a
            },
            isVisible: function() {
                var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"),
                    b, c;
                a && CKEDITOR.env.webkit && (b = this.getWindow(), !b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement) && (a = (new CKEDITOR.dom.element(c)).isVisible()));
                return !!a },
            isEmptyInlineRemoveable: function() {
                if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
                for (var a = this.getChildren(), b = 0, c = a.count(); b < c; b++) {
                    var f = a.getItem(b);
                    if (f.type != CKEDITOR.NODE_ELEMENT || !f.data("cke-bookmark"))
                        if (f.type == CKEDITOR.NODE_ELEMENT && !f.isEmptyInlineRemoveable() || f.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(f.getText())) return !1 }
                return !0
            },
            hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function() {
                for (var a = this.$.attributes, b = 0; b < a.length; b++) {
                    var c = a[b];
                    switch (c.nodeName) {
                        case "class":
                            if (this.getAttribute("class")) return !0;
                        case "data-cke-expando":
                            continue;
                        default:
                            if (c.specified) return !0
                    }
                }
                return !1
            } : function() {
                var a = this.$.attributes,
                    b = a.length,
                    c = { "data-cke-expando": 1, _moz_dirty: 1 };
                return 0 < b && (2 < b || !c[a[0].nodeName] || 2 == b && !c[a[1].nodeName]) },
            hasAttribute: function() {
                function a(b) {
                    var c = this.$.attributes.getNamedItem(b);
                    if ("input" == this.getName()) switch (b) {
                        case "class":
                            return 0 < this.$.className.length;
                        case "checked":
                            return !!this.$.checked;
                        case "value":
                            return b = this.getAttribute("type"), "checkbox" == b || "radio" == b ? "on" != this.$.value : !!this.$.value }
                    return c ?
                        c.specified : !1
                }
                return CKEDITOR.env.ie ? 8 > CKEDITOR.env.version ? function(b) {
                    return "name" == b ? !!this.$.name : a.call(this, b) } : a : function(a) {
                    return !!this.$.attributes.getNamedItem(a) }
            }(),
            hide: function() { this.setStyle("display", "none") },
            moveChildren: function(a, b) {
                var c = this.$;
                a = a.$;
                if (c != a) {
                    var f;
                    if (b)
                        for (; f = c.lastChild;) a.insertBefore(c.removeChild(f), a.firstChild);
                    else
                        for (; f = c.firstChild;) a.appendChild(c.removeChild(f)) } },
            mergeSiblings: function() {
                function a(b, c, f) {
                    if (c && c.type == CKEDITOR.NODE_ELEMENT) {
                        for (var d = []; c.data("cke-bookmark") || c.isEmptyInlineRemoveable();)
                            if (d.push(c), c = f ? c.getNext() : c.getPrevious(), !c || c.type != CKEDITOR.NODE_ELEMENT) return;
                        if (b.isIdentical(c)) {
                            for (var h = f ? b.getLast() : b.getFirst(); d.length;) d.shift().move(b, !f);
                            c.moveChildren(b, !f);
                            c.remove();
                            h && h.type == CKEDITOR.NODE_ELEMENT && h.mergeSiblings() }
                    }
                }
                return function(b) {
                    if (!1 === b || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) a(this, this.getNext(), !0), a(this, this.getPrevious()) }
            }(),
            show: function() {
                this.setStyles({
                    display: "",
                    visibility: ""
                })
            },
            setAttribute: function() {
                var a = function(a, b) { this.$.setAttribute(a, b);
                    return this };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(b, c) { "class" == b ? this.$.className = c : "style" == b ? this.$.style.cssText = c : "tabindex" == b ? this.$.tabIndex = c : "checked" == b ? this.$.checked = c : "contenteditable" == b ? a.call(this, "contentEditable", c) : a.apply(this, arguments);
                    return this } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function(b, c) {
                    if ("src" == b && c.match(/^http:\/\//)) try {
                        a.apply(this,
                            arguments)
                    } catch (f) {} else a.apply(this, arguments);
                    return this
                } : a
            }(),
            setAttributes: function(a) {
                for (var b in a) this.setAttribute(b, a[b]);
                return this },
            setValue: function(a) { this.$.value = a;
                return this },
            removeAttribute: function() {
                var a = function(a) { this.$.removeAttribute(a) };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(a) { "class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable");
                    this.$.removeAttribute(a) } : a }(),
            removeAttributes: function(a) {
                if (CKEDITOR.tools.isArray(a))
                    for (var b =
                            0; b < a.length; b++) this.removeAttribute(a[b]);
                else
                    for (b in a = a || this.getAttributes(), a) a.hasOwnProperty(b) && this.removeAttribute(b)
            },
            removeStyle: function(a) {
                var b = this.$.style;
                if (b.removeProperty || "border" != a && "margin" != a && "padding" != a) b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute("style");
                else {
                    var c = ["top", "left", "right", "bottom"],
                        f;
                    "border" == a && (f = ["color", "style", "width"]);
                    for (var b = [], d = 0; d < c.length; d++)
                        if (f)
                            for (var u =
                                    0; u < f.length; u++) b.push([a, c[d], f[u]].join("-"));
                        else b.push([a, c[d]].join("-"));
                    for (a = 0; a < b.length; a++) this.removeStyle(b[a])
                }
            },
            setStyle: function(a, b) { this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b;
                return this },
            setStyles: function(a) {
                for (var b in a) this.setStyle(b, a[b]);
                return this },
            setOpacity: function(a) { CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a) },
            unselectable: function() {
                this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
                    "none"));
                if (CKEDITOR.env.ie) { this.setAttribute("unselectable", "on");
                    for (var a, b = this.getElementsByTag("*"), c = 0, f = b.count(); c < f; c++) a = b.getItem(c), a.setAttribute("unselectable", "on") }
            },
            getPositionedAncestor: function() {
                for (var a = this;
                    "html" != a.getName();) {
                    if ("static" != a.getComputedStyle("position")) return a;
                    a = a.getParent() }
                return null },
            getDocumentPosition: function(a) {
                var b = 0,
                    c = 0,
                    f = this.getDocument(),
                    d = f.getBody(),
                    u = "BackCompat" == f.$.compatMode;
                if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ?
                        8 !== CKEDITOR.env.version : 1)) {
                    var e = this.$.getBoundingClientRect(),
                        g = f.$.documentElement,
                        m = g.clientTop || d.$.clientTop || 0,
                        x = g.clientLeft || d.$.clientLeft || 0,
                        k = !0;
                    CKEDITOR.env.ie && (k = f.getDocumentElement().contains(this), f = f.getBody().contains(this), k = u && f || !u && k);
                    k && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (b = d.$.scrollLeft || g.scrollLeft, c = d.$.scrollTop || g.scrollTop) : (c = u ? d.$ : g, b = c.scrollLeft, c = c.scrollTop), b = e.left + b - x, c = e.top + c - m) } else
                    for (m = this, x = null; m && "body" != m.getName() &&
                        "html" != m.getName();) { b += m.$.offsetLeft - m.$.scrollLeft;
                        c += m.$.offsetTop - m.$.scrollTop;
                        m.equals(this) || (b += m.$.clientLeft || 0, c += m.$.clientTop || 0);
                        for (; x && !x.equals(m);) b -= x.$.scrollLeft, c -= x.$.scrollTop, x = x.getParent();
                        x = m;
                        m = (e = m.$.offsetParent) ? new CKEDITOR.dom.element(e) : null }
                a && (e = this.getWindow(), m = a.getWindow(), !e.equals(m) && e.$.frameElement && (a = (new CKEDITOR.dom.element(e.$.frameElement)).getDocumentPosition(a), b += a.x, c += a.y));
                document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko ||
                    u || (b += this.$.clientLeft ? 1 : 0, c += this.$.clientTop ? 1 : 0);
                return { x: b, y: c }
            },
            scrollIntoView: function(a) {
                var b = this.getParent();
                if (b) { do
                        if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), b.is("html")) {
                            var c = b.getWindow();
                            try {
                                var f = c.$.frameElement;
                                f && (b = new CKEDITOR.dom.element(f)) } catch (d) {} }
                    while (b = b.getParent()) } },
            scrollIntoParent: function(a, b, c) {
                var f, d, e, z;

                function g(b, c) {
                    /body|html/.test(a.getName()) ?
                        a.getWindow().$.scrollBy(b, c) : (a.$.scrollLeft += b, a.$.scrollTop += c)
                }

                function m(a, b) {
                    var c = { x: 0, y: 0 };
                    if (!a.is(k ? "body" : "html")) {
                        var f = a.$.getBoundingClientRect();
                        c.x = f.left;
                        c.y = f.top }
                    f = a.getWindow();
                    f.equals(b) || (f = m(CKEDITOR.dom.element.get(f.$.frameElement), b), c.x += f.x, c.y += f.y);
                    return c }

                function x(a, b) {
                    return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0 }!a && (a = this.getWindow());
                e = a.getDocument();
                var k = "BackCompat" == e.$.compatMode;
                a instanceof CKEDITOR.dom.window && (a = k ? e.getBody() : e.getDocumentElement());
                CKEDITOR.env.webkit && (e = this.getEditor(!1)) && (e._.previousScrollTop = null);
                e = a.getWindow();
                d = m(this, e);
                var w = m(a, e),
                    F = this.$.offsetHeight;
                f = this.$.offsetWidth;
                var l = a.$.clientHeight,
                    q = a.$.clientWidth;
                e = d.x - x(this, "left") - w.x || 0;
                z = d.y - x(this, "top") - w.y || 0;
                f = d.x + f + x(this, "right") - (w.x + q) || 0;
                d = d.y + F + x(this, "bottom") - (w.y + l) || 0;
                (0 > z || 0 < d) && g(0, !0 === b ? z : !1 === b ? d : 0 > z ? z : d);
                c && (0 > e || 0 < f) && g(0 > e ? e : f, 0)
            },
            setState: function(a, b, c) {
                b = b || "cke";
                switch (a) {
                    case CKEDITOR.TRISTATE_ON:
                        this.addClass(b + "_on");
                        this.removeClass(b +
                            "_off");
                        this.removeClass(b + "_disabled");
                        c && this.setAttribute("aria-pressed", !0);
                        c && this.removeAttribute("aria-disabled");
                        break;
                    case CKEDITOR.TRISTATE_DISABLED:
                        this.addClass(b + "_disabled");
                        this.removeClass(b + "_off");
                        this.removeClass(b + "_on");
                        c && this.setAttribute("aria-disabled", !0);
                        c && this.removeAttribute("aria-pressed");
                        break;
                    default:
                        this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled")
                }
            },
            getFrameDocument: function() {
                var a = this.$;
                try { a.contentWindow.document } catch (b) { a.src = a.src }
                return a && new CKEDITOR.dom.document(a.contentWindow.document) },
            copyAttributes: function(a, b) {
                var c = this.$.attributes;
                b = b || {};
                for (var f = 0; f < c.length; f++) {
                    var d = c[f],
                        e = d.nodeName.toLowerCase(),
                        g;
                    if (!(e in b))
                        if ("checked" == e && (g = this.getAttribute(e))) a.setAttribute(e, g);
                        else if (!CKEDITOR.env.ie || this.hasAttribute(e)) g = this.getAttribute(e), null === g && (g = d.nodeValue), a.setAttribute(e, g) }
                "" !== this.$.style.cssText &&
                    (a.$.style.cssText = this.$.style.cssText)
            },
            renameNode: function(a) {
                if (this.getName() != a) {
                    var b = this.getDocument();
                    a = new CKEDITOR.dom.element(a, b);
                    this.copyAttributes(a);
                    this.moveChildren(a);
                    this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$);
                    a.$["data-cke-expando"] = this.$["data-cke-expando"];
                    this.$ = a.$;
                    delete this.getName } },
            getChild: function() {
                function a(b, c) {
                    var f = b.childNodes;
                    if (0 <= c && c < f.length) return f[c] }
                return function(b) {
                    var c = this.$;
                    if (b.slice)
                        for (b = b.slice(); 0 < b.length && c;) c = a(c,
                            b.shift());
                    else c = a(c, b);
                    return c ? new CKEDITOR.dom.node(c) : null
                }
            }(),
            getChildCount: function() {
                return this.$.childNodes.length },
            disableContextMenu: function() {
                function a(b) {
                    return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass("cke_enable_context_menu") }
                this.on("contextmenu", function(b) { b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault() }) },
            getDirection: function(a) {
                return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir ||
                    "ltr" : this.getStyle("direction") || this.getAttribute("dir")
            },
            data: function(a, b) { a = "data-" + a;
                if (void 0 === b) return this.getAttribute(a);!1 === b ? this.removeAttribute(a) : this.setAttribute(a, b);
                return null },
            getEditor: function(a) {
                var b = CKEDITOR.instances,
                    c, f, d;
                a = a || void 0 === a;
                for (c in b)
                    if (f = b[c], f.element.equals(this) && f.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !a && (d = f.editable()) && (d.equals(this) || d.contains(this))) return f;
                return null },
            find: function(a) {
                var c = d(this);
                a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this,
                    a)));
                c();
                return a
            },
            findOne: function(a) {
                var c = d(this);
                a = this.$.querySelector(b(this, a));
                c();
                return a ? new CKEDITOR.dom.element(a) : null },
            forEach: function(a, b, c) {
                if (!(c || b && this.type != b)) var f = a(this);
                if (!1 !== f) { c = this.getChildren();
                    for (var d = 0; d < c.count(); d++) f = c.getItem(d), f.type == CKEDITOR.NODE_ELEMENT ? f.forEach(a, b) : b && f.type != b || a(f) } }
        });
        var k = { width: ["border-left-width", "border-right-width", "padding-left", "padding-right"], height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"] };
        CKEDITOR.dom.element.prototype.setSize = function(a, b, d) { "number" == typeof b && (!d || CKEDITOR.env.ie && CKEDITOR.env.quirks || (b -= c.call(this, a)), this.setStyle(a, b + "px")) };
        CKEDITOR.dom.element.prototype.getSize = function(a, b) {
            var d = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
            b && (d -= c.call(this, a));
            return d }
    })();
    CKEDITOR.dom.documentFragment = function(a) { a = a || CKEDITOR.document;
        this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a };
    CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, { type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, insertAfterNode: function(a) { a = a.$;
            a.parentNode.insertBefore(this.$, a.nextSibling) }, getHtml: function() {
            var a = new CKEDITOR.dom.element("div");
            this.clone(1, 1).appendTo(a);
            return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, "") } }, !0, {
        append: 1,
        appendBogus: 1,
        clone: 1,
        getFirst: 1,
        getHtml: 1,
        getLast: 1,
        getParent: 1,
        getNext: 1,
        getPrevious: 1,
        appendTo: 1,
        moveChildren: 1,
        insertBefore: 1,
        insertAfterNode: 1,
        replace: 1,
        trim: 1,
        type: 1,
        ltrim: 1,
        rtrim: 1,
        getDocument: 1,
        getChildCount: 1,
        getChild: 1,
        getChildren: 1
    });
    (function() {
        function a(a, b) {
            var c = this.range;
            if (this._.end) return null;
            if (!this._.start) { this._.start = 1;
                if (c.collapsed) return this.end(), null;
                c.optimize() }
            var f, d = c.startContainer;
            f = c.endContainer;
            var e = c.startOffset,
                B = c.endOffset,
                g, l = this.guard,
                q = this.type,
                n = a ? "getPreviousSourceNode" : "getNextSourceNode";
            if (!a && !this._.guardLTR) {
                var t = f.type == CKEDITOR.NODE_ELEMENT ? f : f.getParent(),
                    A = f.type == CKEDITOR.NODE_ELEMENT ? f.getChild(B) : f.getNext();
                this._.guardLTR = function(a, b) {
                    return (!b || !t.equals(a)) && (!A ||
                        !a.equals(A)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root))
                }
            }
            if (a && !this._.guardRTL) {
                var C = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(),
                    h = d.type == CKEDITOR.NODE_ELEMENT ? e ? d.getChild(e - 1) : null : d.getPrevious();
                this._.guardRTL = function(a, b) {
                    return (!b || !C.equals(a)) && (!h || !a.equals(h)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root)) } }
            var k = a ? this._.guardRTL : this._.guardLTR;
            g = l ? function(a, b) {
                return !1 === k(a, b) ? !1 : l(a, b) } : k;
            this.current ? f = this.current[n](!1, q, g) : (a ? f.type == CKEDITOR.NODE_ELEMENT &&
                (f = 0 < B ? f.getChild(B - 1) : !1 === g(f, !0) ? null : f.getPreviousSourceNode(!0, q, g)) : (f = d, f.type == CKEDITOR.NODE_ELEMENT && ((f = f.getChild(e)) || (f = !1 === g(d, !0) ? null : d.getNextSourceNode(!0, q, g)))), f && !1 === g(f) && (f = null));
            for (; f && !this._.end;) { this.current = f;
                if (!this.evaluator || !1 !== this.evaluator(f)) {
                    if (!b) return f } else if (b && this.evaluator) return !1;
                f = f[n](!1, q, g) }
            this.end();
            return this.current = null
        }

        function d(b) {
            for (var c, f = null; c = a.call(this, b);) f = c;
            return f }
        CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
            $: function(a) {
                this.range =
                    a;
                this._ = {}
            },
            proto: { end: function() { this._.end = 1 }, next: function() {
                    return a.call(this) }, previous: function() {
                    return a.call(this, 1) }, checkForward: function() {
                    return !1 !== a.call(this, 0, 1) }, checkBackward: function() {
                    return !1 !== a.call(this, 1, 1) }, lastForward: function() {
                    return d.call(this) }, lastBackward: function() {
                    return d.call(this, 1) }, reset: function() { delete this.current;
                    this._ = {} } }
        });
        var b = {
                block: 1,
                "list-item": 1,
                table: 1,
                "table-row-group": 1,
                "table-header-group": 1,
                "table-footer-group": 1,
                "table-row": 1,
                "table-column-group": 1,
                "table-column": 1,
                "table-cell": 1,
                "table-caption": 1
            },
            c = { absolute: 1, fixed: 1 };
        CKEDITOR.dom.element.prototype.isBlockBoundary = function(a) {
            return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in c || !b[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0 };
        CKEDITOR.dom.walker.blockBoundary = function(a) {
            return function(b) {
                return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a)) } };
        CKEDITOR.dom.walker.listItemBoundary = function() {
            return this.blockBoundary({ br: 1 }) };
        CKEDITOR.dom.walker.bookmark = function(a, b) {
            function c(a) {
                return a && a.getName && "span" == a.getName() && a.data("cke-bookmark") }
            return function(f) {
                var d, e;
                d = f && f.type != CKEDITOR.NODE_ELEMENT && (e = f.getParent()) && c(e);
                d = a ? d : d || c(f);
                return !!(b ^ d) } };
        CKEDITOR.dom.walker.whitespaces = function(a) {
            return function(b) {
                var c;
                b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);
                return !!(a ^ c) } };
        CKEDITOR.dom.walker.invisible =
            function(a) {
                var b = CKEDITOR.dom.walker.whitespaces(),
                    c = CKEDITOR.env.webkit ? 1 : 0;
                return function(f) { b(f) ? f = 1 : (f.type == CKEDITOR.NODE_TEXT && (f = f.getParent()), f = f.$.offsetWidth <= c);
                    return !!(a ^ f) } };
        CKEDITOR.dom.walker.nodeType = function(a, b) {
            return function(c) {
                return !!(b ^ c.type == a) } };
        CKEDITOR.dom.walker.bogus = function(a) {
            function b(a) {
                return !g(a) && !k(a) }
            return function(c) {
                var f = CKEDITOR.env.needsBrFiller ? c.is && c.is("br") : c.getText && e.test(c.getText());
                f && (f = c.getParent(), c = c.getNext(b), f = f.isBlockBoundary() &&
                    (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary()));
                return !!(a ^ f)
            }
        };
        CKEDITOR.dom.walker.temp = function(a) {
            return function(b) { b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
                b = b && b.hasAttribute("data-cke-temp");
                return !!(a ^ b) } };
        var e = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
            g = CKEDITOR.dom.walker.whitespaces(),
            k = CKEDITOR.dom.walker.bookmark(),
            h = CKEDITOR.dom.walker.temp(),
            p = function(a) {
                return k(a) || g(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty) };
        CKEDITOR.dom.walker.ignored =
            function(a) {
                return function(b) { b = g(b) || k(b) || h(b);
                    return !!(a ^ b) } };
        var r = CKEDITOR.dom.walker.ignored();
        CKEDITOR.dom.walker.empty = function(a) {
            return function(b) {
                for (var c = 0, f = b.getChildCount(); c < f; ++c)
                    if (!r(b.getChild(c))) return !!a;
                return !a } };
        var f = CKEDITOR.dom.walker.empty(),
            B = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function(a) {
                var b = {},
                    c;
                for (c in a) CKEDITOR.dtd[c]["#"] && (b[c] = 1);
                return b }(CKEDITOR.dtd.$block), { caption: 1, td: 1, th: 1 });
        CKEDITOR.dom.walker.editable = function(a) {
            return function(b) {
                b =
                    r(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") || "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(B) && f(b)) ? !0 : !1;
                return !!(a ^ b)
            }
        };
        CKEDITOR.dom.element.prototype.getBogus = function() {
            var a = this;
            do a = a.getPreviousSourceNode(); while (p(a));
            return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && e.test(a.getText())) ? a : !1 }
    })();
    CKEDITOR.dom.range = function(a) { this.endOffset = this.endContainer = this.startOffset = this.startContainer = null;
        this.collapsed = !0;
        var d = a instanceof CKEDITOR.dom.document;
        this.document = d ? a : a.getDocument();
        this.root = d ? a.getBody() : a };
    (function() {
        function a(a) { a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset }

        function d(a, b, c, d, e) {
            function m(a, b, c, f) {
                var d = c ? a.getPrevious() : a.getNext();
                if (f && k) return d;
                l || f ? b.append(a.clone(!0, e), c) : (a.remove(), r && b.append(a));
                return d }

            function g() {
                var a, b, c, f = Math.min(P.length, v.length);
                for (a = 0; a < f; a++)
                    if (b = P[a], c = v[a], !b.equals(c)) return a;
                return a - 1 }

            function h() {
                var b = G - 1,
                    c = M && H && !q.equals(n);
                b < E - 1 || b < I - 1 || c ? (c ? a.moveToPosition(n,
                    CKEDITOR.POSITION_BEFORE_START) : I == b + 1 && D ? a.moveToPosition(v[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(v[b + 1], CKEDITOR.POSITION_BEFORE_START), d && (b = P[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (c = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), c.insertAfter(b), b.mergeSiblings(!1), a.moveToBookmark({ startNode: c }))) : a.collapse(!0)
            }
            a.optimizeBookmark();
            var k = 0 === b,
                r = 1 == b,
                l = 2 == b;
            b = l || r;
            var q = a.startContainer,
                n = a.endContainer,
                t = a.startOffset,
                A = a.endOffset,
                C, D, M, H, p, Q;
            if (l && n.type == CKEDITOR.NODE_TEXT && q.equals(n)) q = a.document.createText(q.substring(t, A)), c.append(q);
            else {
                n.type == CKEDITOR.NODE_TEXT ? l ? Q = !0 : n = n.split(A) : 0 < n.getChildCount() ? A >= n.getChildCount() ? (n = n.getChild(A - 1), D = !0) : n = n.getChild(A) : H = D = !0;
                q.type == CKEDITOR.NODE_TEXT ? l ? p = !0 : q.split(t) : 0 < q.getChildCount() ? 0 === t ? (q = q.getChild(t), C = !0) : q = q.getChild(t - 1) : M = C = !0;
                for (var P = q.getParents(), v = n.getParents(), G = g(), E = P.length - 1, I = v.length - 1, K = c, L, Z, X, fa = -1, S = G; S <= E; S++) {
                    Z =
                        P[S];
                    X = Z.getNext();
                    for (S != E || Z.equals(v[S]) && E < I ? b && (L = K.append(Z.clone(0, e))) : C ? m(Z, K, !1, M) : p && K.append(a.document.createText(Z.substring(t))); X;) {
                        if (X.equals(v[S])) { fa = S;
                            break }
                        X = m(X, K) }
                    K = L
                }
                K = c;
                for (S = G; S <= I; S++)
                    if (c = v[S], X = c.getPrevious(), c.equals(P[S])) b && (K = K.getChild(0));
                    else { S != I || c.equals(P[S]) && I < E ? b && (L = K.append(c.clone(0, e))) : D ? m(c, K, !1, H) : Q && K.append(a.document.createText(c.substring(0, A)));
                        if (S > fa)
                            for (; X;) X = m(X, K, !0);
                        K = L }
                l || h()
            }
        }

        function b() {
            var a = !1,
                b = CKEDITOR.dom.walker.whitespaces(),
                c = CKEDITOR.dom.walker.bookmark(!0),
                d = CKEDITOR.dom.walker.bogus();
            return function(e) {
                return c(e) || b(e) ? !0 : d(e) && !a ? a = !0 : e.type == CKEDITOR.NODE_TEXT && (e.hasAscendant("pre") || CKEDITOR.tools.trim(e.getText()).length) || e.type == CKEDITOR.NODE_ELEMENT && !e.is(g) ? !1 : !0 }
        }

        function c(a) {
            var b = CKEDITOR.dom.walker.whitespaces(),
                c = CKEDITOR.dom.walker.bookmark(1);
            return function(d) {
                return c(d) || b(d) ? !0 : !a && k(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty) } }

        function e(a) {
            return function() {
                var b;
                return this[a ?
                    "getPreviousNode" : "getNextNode"](function(a) {!b && r(a) && (b = a);
                    return p(a) && !(k(a) && a.equals(b)) })
            }
        }
        var g = { abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1 },
            k = CKEDITOR.dom.walker.bogus(),
            h = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
            p = CKEDITOR.dom.walker.editable(),
            r = CKEDITOR.dom.walker.ignored(!0);
        CKEDITOR.dom.range.prototype = {
            clone: function() {
                var a = new CKEDITOR.dom.range(this.root);
                a._setStartContainer(this.startContainer);
                a.startOffset = this.startOffset;
                a._setEndContainer(this.endContainer);
                a.endOffset = this.endOffset;
                a.collapsed = this.collapsed;
                return a
            },
            collapse: function(a) { a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer), this.startOffset = this.endOffset);
                this.collapsed = !0 },
            cloneContents: function(a) {
                var b = new CKEDITOR.dom.documentFragment(this.document);
                this.collapsed || d(this, 2, b, !1, "undefined" == typeof a ? !0 : a);
                return b },
            deleteContents: function(a) {
                this.collapsed ||
                    d(this, 0, null, a)
            },
            extractContents: function(a, b) {
                var c = new CKEDITOR.dom.documentFragment(this.document);
                this.collapsed || d(this, 1, c, a, "undefined" == typeof b ? !0 : b);
                return c },
            createBookmark: function(a) {
                var b, c, d, e, m = this.collapsed;
                b = this.document.createElement("span");
                b.data("cke-bookmark", 1);
                b.setStyle("display", "none");
                b.setHtml("\x26nbsp;");
                a && (d = "cke_bm_" + CKEDITOR.tools.getNextNumber(), b.setAttribute("id", d + (m ? "C" : "S")));
                m || (c = b.clone(), c.setHtml("\x26nbsp;"), a && c.setAttribute("id", d + "E"), e = this.clone(),
                    e.collapse(), e.insertNode(c));
                e = this.clone();
                e.collapse(!0);
                e.insertNode(b);
                c ? (this.setStartAfter(b), this.setEndBefore(c)) : this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
                return { startNode: a ? d + (m ? "C" : "S") : b, endNode: a ? d + "E" : c, serializable: a, collapsed: m }
            },
            createBookmark2: function() {
                function a(b) {
                    var f = b.container,
                        d = b.offset,
                        e;
                    e = f;
                    var g = d;
                    e = e.type != CKEDITOR.NODE_ELEMENT || 0 === g || g == e.getChildCount() ? 0 : e.getChild(g - 1).type == CKEDITOR.NODE_TEXT && e.getChild(g).type == CKEDITOR.NODE_TEXT;
                    e && (f = f.getChild(d -
                        1), d = f.getLength());
                    if (f.type == CKEDITOR.NODE_ELEMENT && 0 < d) { a: {
                            for (e = f; d--;)
                                if (g = e.getChild(d).getIndex(!0), 0 <= g) { d = g;
                                    break a }
                            d = -1 }
                        d += 1 }
                    if (f.type == CKEDITOR.NODE_TEXT) { e = f;
                        for (g = 0;
                            (e = e.getPrevious()) && e.type == CKEDITOR.NODE_TEXT;) g += e.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length;
                        e = g;
                        f.getText() ? d += e : (g = f.getPrevious(c), e ? (d = e, f = g ? g.getNext() : f.getParent().getFirst()) : (f = f.getParent(), d = g ? g.getIndex(!0) + 1 : 0)) }
                    b.container = f;
                    b.offset = d
                }

                function b(a, c) {
                    var f = c.getCustomData("cke-fillingChar");
                    if (f) {
                        var d = a.container;
                        f.equals(d) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= a.offset && (a.offset = d.getIndex(), a.container = d.getParent())) }
                }
                var c = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0);
                return function(c) {
                    var d = this.collapsed,
                        e = { container: this.startContainer, offset: this.startOffset },
                        g = { container: this.endContainer, offset: this.endOffset };
                    c && (a(e), b(e, this.root), d || (a(g), b(g, this.root)));
                    return {
                        start: e.container.getAddress(c),
                        end: d ? null : g.container.getAddress(c),
                        startOffset: e.offset,
                        endOffset: g.offset,
                        normalized: c,
                        collapsed: d,
                        is2: !0
                    }
                }
            }(),
            moveToBookmark: function(a) {
                if (a.is2) {
                    var b = this.document.getByAddress(a.start, a.normalized),
                        c = a.startOffset,
                        d = a.end && this.document.getByAddress(a.end, a.normalized);
                    a = a.endOffset;
                    this.setStart(b, c);
                    d ? this.setEnd(d, a) : this.collapse(!0) } else b = (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode, a = c ? this.document.getById(a.endNode) : a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) :
                    this.collapse(!0)
            },
            getBoundaryNodes: function() {
                var a = this.startContainer,
                    b = this.endContainer,
                    c = this.startOffset,
                    d = this.endOffset,
                    e;
                if (a.type == CKEDITOR.NODE_ELEMENT)
                    if (e = a.getChildCount(), e > c) a = a.getChild(c);
                    else if (1 > e) a = a.getPreviousSourceNode();
                else {
                    for (a = a.$; a.lastChild;) a = a.lastChild;
                    a = new CKEDITOR.dom.node(a);
                    a = a.getNextSourceNode() || a }
                if (b.type == CKEDITOR.NODE_ELEMENT)
                    if (e = b.getChildCount(), e > d) b = b.getChild(d).getPreviousSourceNode(!0);
                    else if (1 > e) b = b.getPreviousSourceNode();
                else {
                    for (b = b.$; b.lastChild;) b =
                        b.lastChild;
                    b = new CKEDITOR.dom.node(b)
                }
                a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
                return { startNode: a, endNode: b }
            },
            getCommonAncestor: function(a, b) {
                var c = this.startContainer,
                    d = this.endContainer,
                    c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(d);
                return b && !c.is ? c.getParent() : c },
            optimize: function() {
                var a = this.startContainer,
                    b = this.startOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) :
                    this.setStartBefore(a));
                a = this.endContainer;
                b = this.endOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
            },
            optimizeBookmark: function() {
                var a = this.startContainer,
                    b = this.endContainer;
                a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
                b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END) },
            trim: function(a, b) {
                var c = this.startContainer,
                    d = this.startOffset,
                    e = this.collapsed;
                if ((!a ||
                        e) && c && c.type == CKEDITOR.NODE_TEXT) {
                    if (d)
                        if (d >= c.getLength()) d = c.getIndex() + 1, c = c.getParent();
                        else {
                            var m = c.split(d),
                                d = c.getIndex() + 1,
                                c = c.getParent();
                            this.startContainer.equals(this.endContainer) ? this.setEnd(m, this.endOffset - this.startOffset) : c.equals(this.endContainer) && (this.endOffset += 1) }
                    else d = c.getIndex(), c = c.getParent();
                    this.setStart(c, d);
                    if (e) { this.collapse(!0);
                        return } }
                c = this.endContainer;
                d = this.endOffset;
                b || e || !c || c.type != CKEDITOR.NODE_TEXT || (d ? (d >= c.getLength() || c.split(d), d = c.getIndex() + 1) :
                    d = c.getIndex(), c = c.getParent(), this.setEnd(c, d))
            },
            enlarge: function(a, b) {
                function c(a) {
                    return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a }
                var d = new RegExp(/[^\s\ufeff]/);
                switch (a) {
                    case CKEDITOR.ENLARGE_INLINE:
                        var e = 1;
                    case CKEDITOR.ENLARGE_ELEMENT:
                        var m = function(a, b) {
                            var c = new CKEDITOR.dom.range(h);
                            c.setStart(a, b);
                            c.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);
                            var c = new CKEDITOR.dom.walker(c),
                                f;
                            for (c.guard = function(a) {
                                    return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) }; f =
                                c.next();) {
                                if (f.type != CKEDITOR.NODE_TEXT) return !1;
                                C = f != a ? f.getText() : f.substring(b);
                                if (d.test(C)) return !1 }
                            return !0
                        };
                        if (this.collapsed) break;
                        var g = this.getCommonAncestor(),
                            h = this.root,
                            k, r, l, q, n, t = !1,
                            A, C;
                        A = this.startContainer;
                        var D = this.startOffset;
                        A.type == CKEDITOR.NODE_TEXT ? (D && (A = !CKEDITOR.tools.trim(A.substring(0, D)).length && A, t = !!A), A && ((q = A.getPrevious()) || (l = A.getParent()))) : (D && (q = A.getChild(D - 1) || A.getLast()), q || (l = A));
                        for (l = c(l); l || q;) {
                            if (l && !q) {
                                !n && l.equals(g) && (n = !0);
                                if (e ? l.isBlockBoundary() :
                                    !h.contains(l)) break;
                                t && "inline" == l.getComputedStyle("display") || (t = !1, n ? k = l : this.setStartBefore(l));
                                q = l.getPrevious()
                            }
                            for (; q;)
                                if (A = !1, q.type == CKEDITOR.NODE_COMMENT) q = q.getPrevious();
                                else {
                                    if (q.type == CKEDITOR.NODE_TEXT) C = q.getText(), d.test(C) && (q = null), A = /[\s\ufeff]$/.test(C);
                                    else if ((q.$.offsetWidth > (CKEDITOR.env.webkit ? 1 : 0) || b && q.is("br")) && !q.data("cke-bookmark"))
                                        if (t && CKEDITOR.dtd.$removeEmpty[q.getName()]) {
                                            C = q.getText();
                                            if (d.test(C)) q = null;
                                            else
                                                for (var D = q.$.getElementsByTagName("*"), M = 0, H; H =
                                                    D[M++];)
                                                    if (!CKEDITOR.dtd.$removeEmpty[H.nodeName.toLowerCase()]) { q = null;
                                                        break }
                                            q && (A = !!C.length)
                                        } else q = null;
                                    A && (t ? n ? k = l : l && this.setStartBefore(l) : t = !0);
                                    if (q) { A = q.getPrevious();
                                        if (!l && !A) { l = q;
                                            q = null;
                                            break }
                                        q = A } else l = null
                                }
                            l && (l = c(l.getParent()))
                        }
                        A = this.endContainer;
                        D = this.endOffset;
                        l = q = null;
                        n = t = !1;
                        A.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(A.substring(D)).length ? t = !0 : (t = !A.getLength(), D == A.getLength() ? (q = A.getNext()) || (l = A.getParent()) : m(A, D) && (l = A.getParent())) : (q = A.getChild(D)) || (l = A);
                        for (; l ||
                            q;) {
                            if (l && !q) {!n && l.equals(g) && (n = !0);
                                if (e ? l.isBlockBoundary() : !h.contains(l)) break;
                                t && "inline" == l.getComputedStyle("display") || (t = !1, n ? r = l : l && this.setEndAfter(l));
                                q = l.getNext() }
                            for (; q;) {
                                A = !1;
                                if (q.type == CKEDITOR.NODE_TEXT) C = q.getText(), m(q, 0) || (q = null), A = /^[\s\ufeff]/.test(C);
                                else if (q.type == CKEDITOR.NODE_ELEMENT) {
                                    if ((0 < q.$.offsetWidth || b && q.is("br")) && !q.data("cke-bookmark"))
                                        if (t && CKEDITOR.dtd.$removeEmpty[q.getName()]) {
                                            C = q.getText();
                                            if (d.test(C)) q = null;
                                            else
                                                for (D = q.$.getElementsByTagName("*"), M =
                                                    0; H = D[M++];)
                                                    if (!CKEDITOR.dtd.$removeEmpty[H.nodeName.toLowerCase()]) { q = null;
                                                        break }
                                            q && (A = !!C.length)
                                        } else q = null
                                } else A = 1;
                                A && t && (n ? r = l : this.setEndAfter(l));
                                if (q) { A = q.getNext();
                                    if (!l && !A) { l = q;
                                        q = null;
                                        break }
                                    q = A } else l = null
                            }
                            l && (l = c(l.getParent()))
                        }
                        k && r && (g = k.contains(r) ? r : k, this.setStartBefore(g), this.setEndAfter(g));
                        break;
                    case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                    case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                        l = new CKEDITOR.dom.range(this.root);
                        h = this.root;
                        l.setStartAt(h, CKEDITOR.POSITION_AFTER_START);
                        l.setEnd(this.startContainer,
                            this.startOffset);
                        l = new CKEDITOR.dom.walker(l);
                        var p, Q, P = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? { br: 1 } : null),
                            v = null,
                            G = function(a) {
                                if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable"))
                                    if (v) {
                                        if (v.equals(a)) { v = null;
                                            return } } else v = a;
                                else if (v) return;
                                var b = P(a);
                                b || (p = a);
                                return b },
                            e = function(a) {
                                var b = G(a);!b && a.is && a.is("br") && (Q = a);
                                return b };
                        l.guard = G;
                        l = l.lastBackward();
                        p = p || h;
                        this.setStartAt(p, !p.is("br") && (!l && this.checkStartOfBlock() || l && p.contains(l)) ?
                            CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
                        if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) { l = this.clone();
                            l = new CKEDITOR.dom.walker(l);
                            var E = CKEDITOR.dom.walker.whitespaces(),
                                I = CKEDITOR.dom.walker.bookmark();
                            l.evaluator = function(a) {
                                return !E(a) && !I(a) };
                            if ((l = l.previous()) && l.type == CKEDITOR.NODE_ELEMENT && l.is("br")) break }
                        l = this.clone();
                        l.collapse();
                        l.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);
                        l = new CKEDITOR.dom.walker(l);
                        l.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? e : G;
                        p = v = Q = null;
                        l = l.lastForward();
                        p = p || h;
                        this.setEndAt(p, !l && this.checkEndOfBlock() || l && p.contains(l) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
                        Q && this.setEndAfter(Q)
                }
            },
            shrink: function(a, b, c) {
                if (!this.collapsed) {
                    a = a || CKEDITOR.SHRINK_TEXT;
                    var d = this.clone(),
                        e = this.startContainer,
                        m = this.endContainer,
                        g = this.startOffset,
                        h = this.endOffset,
                        k = 1,
                        r = 1;
                    e && e.type == CKEDITOR.NODE_TEXT && (g ? g >= e.getLength() ? d.setStartAfter(e) : (d.setStartBefore(e), k = 0) : d.setStartBefore(e));
                    m && m.type == CKEDITOR.NODE_TEXT && (h ? h >= m.getLength() ? d.setEndAfter(m) :
                        (d.setEndAfter(m), r = 0) : d.setEndBefore(m));
                    var d = new CKEDITOR.dom.walker(d),
                        l = CKEDITOR.dom.walker.bookmark();
                    d.evaluator = function(b) {
                        return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT) };
                    var q;
                    d.guard = function(b, d) {
                        if (l(b)) return !0;
                        if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || d && b.equals(q) || !1 === c && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return !1;
                        d || b.type != CKEDITOR.NODE_ELEMENT ||
                            (q = b);
                        return !0
                    };
                    k && (e = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(e, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
                    r && (d.reset(), (d = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(d, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END));
                    return !(!k && !r)
                }
            },
            insertNode: function(a) {
                this.optimizeBookmark();
                this.trim(!1, !0);
                var b = this.startContainer,
                    c = b.getChild(this.startOffset);
                c ? a.insertBefore(c) : b.append(a);
                a.getParent() && a.getParent().equals(this.endContainer) &&
                    this.endOffset++;
                this.setStartBefore(a)
            },
            moveToPosition: function(a, b) { this.setStartAt(a, b);
                this.collapse(!0) },
            moveToRange: function(a) { this.setStart(a.startContainer, a.startOffset);
                this.setEnd(a.endContainer, a.endOffset) },
            selectNodeContents: function(a) { this.setStart(a, 0);
                this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount()) },
            setStart: function(b, c) {
                b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex(), b = b.getParent());
                this._setStartContainer(b);
                this.startOffset =
                    c;
                this.endContainer || (this._setEndContainer(b), this.endOffset = c);
                a(this)
            },
            setEnd: function(b, c) { b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex() + 1, b = b.getParent());
                this._setEndContainer(b);
                this.endOffset = c;
                this.startContainer || (this._setStartContainer(b), this.startOffset = c);
                a(this) },
            setStartAfter: function(a) { this.setStart(a.getParent(), a.getIndex() + 1) },
            setStartBefore: function(a) { this.setStart(a.getParent(), a.getIndex()) },
            setEndAfter: function(a) {
                this.setEnd(a.getParent(),
                    a.getIndex() + 1)
            },
            setEndBefore: function(a) { this.setEnd(a.getParent(), a.getIndex()) },
            setStartAt: function(b, c) {
                switch (c) {
                    case CKEDITOR.POSITION_AFTER_START:
                        this.setStart(b, 0);
                        break;
                    case CKEDITOR.POSITION_BEFORE_END:
                        b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount());
                        break;
                    case CKEDITOR.POSITION_BEFORE_START:
                        this.setStartBefore(b);
                        break;
                    case CKEDITOR.POSITION_AFTER_END:
                        this.setStartAfter(b) }
                a(this) },
            setEndAt: function(b, c) {
                switch (c) {
                    case CKEDITOR.POSITION_AFTER_START:
                        this.setEnd(b,
                            0);
                        break;
                    case CKEDITOR.POSITION_BEFORE_END:
                        b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount());
                        break;
                    case CKEDITOR.POSITION_BEFORE_START:
                        this.setEndBefore(b);
                        break;
                    case CKEDITOR.POSITION_AFTER_END:
                        this.setEndAfter(b)
                }
                a(this)
            },
            fixBlock: function(a, b) {
                var c = this.createBookmark(),
                    d = this.document.createElement(b);
                this.collapse(a);
                this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                this.extractContents().appendTo(d);
                d.trim();
                this.insertNode(d);
                var e = d.getBogus();
                e && e.remove();
                d.appendBogus();
                this.moveToBookmark(c);
                return d
            },
            splitBlock: function(a, b) {
                var c = new CKEDITOR.dom.elementPath(this.startContainer, this.root),
                    d = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
                    e = c.block,
                    m = d.block,
                    g = null;
                if (!c.blockLimit.equals(d.blockLimit)) return null;
                "br" != a && (e || (e = this.fixBlock(!0, a), m = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), m || (m = this.fixBlock(!1, a)));
                c = e && this.checkStartOfBlock();
                d = m && this.checkEndOfBlock();
                this.deleteContents();
                e && e.equals(m) &&
                    (d ? (g = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(m, CKEDITOR.POSITION_AFTER_END), m = null) : c ? (g = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e = null) : (m = this.splitElement(e, b || !1), e.is("ul", "ol") || e.appendBogus()));
                return { previousBlock: e, nextBlock: m, wasStartOfBlock: c, wasEndOfBlock: d, elementPath: g }
            },
            splitElement: function(a, b) {
                if (!this.collapsed) return null;
                this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
                var c = this.extractContents(!1, b || !1),
                    d = a.clone(!1, b || !1);
                c.appendTo(d);
                d.insertAfter(a);
                this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
                return d
            },
            removeEmptyBlocksAtEnd: function() {
                function a(d) {
                    return function(a) {
                        return b(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() || d.is("table") && a.is("caption") ? !1 : !0 } }
                var b = CKEDITOR.dom.walker.whitespaces(),
                    c = CKEDITOR.dom.walker.bookmark(!1);
                return function(b) {
                    for (var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), e = d.block ||
                            d.blockLimit, g; e && !e.equals(d.root) && !e.getFirst(a(e));) g = e.getParent(), this[b ? "setEndAt" : "setStartAt"](e, CKEDITOR.POSITION_AFTER_END), e.remove(1), e = g;
                    this.moveToBookmark(c)
                }
            }(),
            startPath: function() {
                return new CKEDITOR.dom.elementPath(this.startContainer, this.root) },
            endPath: function() {
                return new CKEDITOR.dom.elementPath(this.endContainer, this.root) },
            checkBoundaryOfElement: function(a, b) {
                var d = b == CKEDITOR.START,
                    e = this.clone();
                e.collapse(d);
                e[d ? "setStartAt" : "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START :
                    CKEDITOR.POSITION_BEFORE_END);
                e = new CKEDITOR.dom.walker(e);
                e.evaluator = c(d);
                return e[d ? "checkBackward" : "checkForward"]()
            },
            checkStartOfBlock: function() {
                var a = this.startContainer,
                    c = this.startOffset;
                CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0, c)), h.test(a) && this.trim(0, 1));
                this.trim();
                a = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                c = this.clone();
                c.collapse(!0);
                c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START);
                a = new CKEDITOR.dom.walker(c);
                a.evaluator = b();
                return a.checkBackward()
            },
            checkEndOfBlock: function() {
                var a = this.endContainer,
                    c = this.endOffset;
                CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(c)), h.test(a) && this.trim(1, 0));
                this.trim();
                a = new CKEDITOR.dom.elementPath(this.endContainer, this.root);
                c = this.clone();
                c.collapse(!1);
                c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                a = new CKEDITOR.dom.walker(c);
                a.evaluator = b();
                return a.checkForward() },
            getPreviousNode: function(a, b, c) {
                var d = this.clone();
                d.collapse(1);
                d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START);
                c = new CKEDITOR.dom.walker(d);
                c.evaluator = a;
                c.guard = b;
                return c.previous()
            },
            getNextNode: function(a, b, c) {
                var d = this.clone();
                d.collapse();
                d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END);
                c = new CKEDITOR.dom.walker(d);
                c.evaluator = a;
                c.guard = b;
                return c.next() },
            checkReadOnly: function() {
                function a(b, c) {
                    for (; b;) {
                        if (b.type == CKEDITOR.NODE_ELEMENT) {
                            if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0;
                            if (b.is("html") ||
                                "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c))) break
                        }
                        b = b.getParent()
                    }
                    return 1
                }
                return function() {
                    var b = this.startContainer,
                        c = this.endContainer;
                    return !(a(b, c) && a(c, b)) }
            }(),
            moveToElementEditablePosition: function(a, b) {
                if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), !0;
                for (var c = 0; a;) {
                    if (a.type == CKEDITOR.NODE_TEXT) {
                        b && this.endContainer && this.checkEndOfBlock() && h.test(a.getText()) ? this.moveToPosition(a,
                            CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                        c = 1;
                        break
                    }
                    if (a.type == CKEDITOR.NODE_ELEMENT)
                        if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), c = 1;
                        else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
                    else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), this.setEndAfter(a), !0;
                    var d = a,
                        e = c,
                        m = void 0;
                    d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(!1) && (m = d[b ? "getLast" : "getFirst"](r));
                    e || m || (m = d[b ? "getPrevious" : "getNext"](r));
                    a = m
                }
                return !!c
            },
            moveToClosestEditablePosition: function(a, b) {
                var c, d = 0,
                    e, m, g = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START];
                a ? (c = new CKEDITOR.dom.range(this.root), c.moveToPosition(a, g[b ? 0 : 1])) : c = this.clone();
                if (a && !a.is(CKEDITOR.dtd.$block)) d = 1;
                else if (e = c[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) d = 1, (m = e.type == CKEDITOR.NODE_ELEMENT) &&
                    e.is(CKEDITOR.dtd.$block) && "false" == e.getAttribute("contenteditable") ? (c.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), c.setEndAt(e, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && m && e.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (c.setEnd(e, 0), c.collapse()) : c.moveToPosition(e, g[b ? 1 : 0]);
                d && this.moveToRange(c);
                return !!d
            },
            moveToElementEditStart: function(a) {
                return this.moveToElementEditablePosition(a) },
            moveToElementEditEnd: function(a) {
                return this.moveToElementEditablePosition(a, !0) },
            getEnclosedNode: function() {
                var a =
                    this.clone();
                a.optimize();
                if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null;
                var a = new CKEDITOR.dom.walker(a),
                    b = CKEDITOR.dom.walker.bookmark(!1, !0),
                    c = CKEDITOR.dom.walker.whitespaces(!0);
                a.evaluator = function(a) {
                    return c(a) && b(a) };
                var d = a.next();
                a.reset();
                return d && d.equals(a.previous()) ? d : null
            },
            getTouchedStartNode: function() {
                var a = this.startContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a },
            getTouchedEndNode: function() {
                var a =
                    this.endContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
            },
            getNextEditableNode: e(),
            getPreviousEditableNode: e(1),
            scrollIntoView: function() {
                var a = new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document),
                    b, c, d, e = this.clone();
                e.optimize();
                (d = e.startContainer.type == CKEDITOR.NODE_TEXT) ? (c = e.startContainer.getText(), b = e.startContainer.split(e.startOffset), a.insertAfter(e.startContainer)) : e.insertNode(a);
                a.scrollIntoView();
                d && (e.startContainer.setText(c), b.remove());
                a.remove()
            },
            _setStartContainer: function(a) { this.startContainer = a },
            _setEndContainer: function(a) { this.endContainer = a },
            _find: function(a, b) {
                var c = this.getCommonAncestor(),
                    d = this.getBoundaryNodes(),
                    e = [],
                    m, g, h, k;
                if (c && c.find)
                    for (g = c.find(a), m = 0; m < g.count(); m++)
                        if (c = g.getItem(m), b || !c.isReadOnly()) h = c.getPosition(d.startNode) & CKEDITOR.POSITION_FOLLOWING || d.startNode.equals(c), k = c.getPosition(d.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED,
                            h && k && e.push(c);
                return e
            }
        }
    })();
    CKEDITOR.POSITION_AFTER_START = 1;
    CKEDITOR.POSITION_BEFORE_END = 2;
    CKEDITOR.POSITION_BEFORE_START = 3;
    CKEDITOR.POSITION_AFTER_END = 4;
    CKEDITOR.ENLARGE_ELEMENT = 1;
    CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2;
    CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3;
    CKEDITOR.ENLARGE_INLINE = 4;
    CKEDITOR.START = 1;
    CKEDITOR.END = 2;
    CKEDITOR.SHRINK_ELEMENT = 1;
    CKEDITOR.SHRINK_TEXT = 2;
    "use strict";
    (function() {
        function a(a) { 1 > arguments.length || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {})) }

        function d(a) {
            var b = [];
            a.forEach(function(a) {
                if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0);
            return b }

        function b(a, c, e, g) {
            a: { null == g && (g = d(e));
                for (var h; h = g.shift();)
                    if (h.getDtd().p) { g = { element: h, remaining: g };
                        break a }
                g = null }
            if (!g) return 0;
            if ((h = CKEDITOR.filter.instances[g.element.data("cke-filter")]) && !h.check(c)) return b(a,
                c, e, g.remaining);c = new CKEDITOR.dom.range(g.element);c.selectNodeContents(g.element);c = c.createIterator();c.enlargeBr = a.enlargeBr;c.enforceRealBlocks = a.enforceRealBlocks;c.activeFilter = c.filter = h;a._.nestedEditable = { element: g.element, container: e, remaining: g.remaining, iterator: c };
            return 1
        }

        function c(a, b, c) {
            if (!b) return !1;
            a = a.clone();
            a.collapse(!c);
            return a.checkBoundaryOfElement(b, c ? CKEDITOR.START : CKEDITOR.END) }
        var e = /^[\r\n\t ]+$/,
            g = CKEDITOR.dom.walker.bookmark(!1, !0),
            k = CKEDITOR.dom.walker.whitespaces(!0),
            h = function(a) {
                return g(a) && k(a) },
            p = { dd: 1, dt: 1, li: 1 };
        a.prototype = {
            getNextParagraph: function(a) {
                var d, k, u, z, y;
                a = a || "p";
                if (this._.nestedEditable) {
                    if (d = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, d;
                    this.activeFilter = this.filter;
                    if (b(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a);
                    this._.nestedEditable =
                        null
                }
                if (!this.range.root.getDtd()[a]) return null;
                if (!this._.started) {
                    var m = this.range.clone();
                    k = m.startPath();
                    var x = m.endPath(),
                        J = !m.collapsed && c(m, k.block),
                        w = !m.collapsed && c(m, x.block, 1);
                    m.shrink(CKEDITOR.SHRINK_ELEMENT, !0);
                    J && m.setStartAt(k.block, CKEDITOR.POSITION_BEFORE_END);
                    w && m.setEndAt(x.block, CKEDITOR.POSITION_AFTER_START);
                    k = m.endContainer.hasAscendant("pre", !0) || m.startContainer.hasAscendant("pre", !0);
                    m.enlarge(this.forceBrBreak && !k || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                    m.collapsed || (k = new CKEDITOR.dom.walker(m.clone()), x = CKEDITOR.dom.walker.bookmark(!0, !0), k.evaluator = x, this._.nextNode = k.next(), k = new CKEDITOR.dom.walker(m.clone()), k.evaluator = x, k = k.previous(), this._.lastNode = k.getNextSourceNode(!0, null, m.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (x = this.range.clone(), x.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), x.checkEndOfBlock() &&
                        (x = new CKEDITOR.dom.elementPath(x.endContainer, x.root), this._.lastNode = (x.block || x.blockLimit).getNextSourceNode(!0))), this._.lastNode && m.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = m.document.createText(""), this._.lastNode.insertAfter(k)), m = null);
                    this._.started = 1;
                    k = m
                }
                x = this._.nextNode;
                m = this._.lastNode;
                for (this._.nextNode = null; x;) {
                    var J = 0,
                        w = x.hasAscendant("pre"),
                        F = x.type != CKEDITOR.NODE_ELEMENT,
                        l = 0;
                    if (F) x.type == CKEDITOR.NODE_TEXT && e.test(x.getText()) && (F = 0);
                    else {
                        var q = x.getName();
                        if (CKEDITOR.dtd.$block[q] && "false" == x.getAttribute("contenteditable")) { d = x;
                            b(this, a, d);
                            break } else if (x.isBlockBoundary(this.forceBrBreak && !w && { br: 1 })) {
                            if ("br" == q) F = 1;
                            else if (!k && !x.getChildCount() && "hr" != q) { d = x;
                                u = x.equals(m);
                                break }
                            k && (k.setEndAt(x, CKEDITOR.POSITION_BEFORE_START), "br" != q && (this._.nextNode = x));
                            J = 1 } else {
                            if (x.getFirst()) { k || (k = this.range.clone(), k.setStartAt(x, CKEDITOR.POSITION_BEFORE_START));
                                x = x.getFirst();
                                continue }
                            F = 1 }
                    }
                    F && !k && (k = this.range.clone(), k.setStartAt(x, CKEDITOR.POSITION_BEFORE_START));
                    u = (!J || F) && x.equals(m);
                    if (k && !J)
                        for (; !x.getNext(h) && !u;) { q = x.getParent();
                            if (q.isBlockBoundary(this.forceBrBreak && !w && { br: 1 })) { J = 1;
                                F = 0;
                                u || q.equals(m);
                                k.setEndAt(q, CKEDITOR.POSITION_BEFORE_END);
                                break }
                            x = q;
                            F = 1;
                            u = x.equals(m);
                            l = 1 }
                    F && k.setEndAt(x, CKEDITOR.POSITION_AFTER_END);
                    x = this._getNextSourceNode(x, l, m);
                    if ((u = !x) || J && k) break
                }
                if (!d) {
                    if (!k) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null;
                    d = new CKEDITOR.dom.elementPath(k.startContainer, k.root);
                    x = d.blockLimit;
                    J = { div: 1, th: 1, td: 1 };
                    d = d.block;
                    !d && x && !this.enforceRealBlocks && J[x.getName()] && k.checkStartOfBlock() && k.checkEndOfBlock() && !x.equals(k.root) ? d = x : !d || this.enforceRealBlocks && d.is(p) ? (d = this.range.document.createElement(a), k.extractContents().appendTo(d), d.trim(), k.insertNode(d), z = y = !0) : "li" != d.getName() ? k.checkStartOfBlock() && k.checkEndOfBlock() || (d = d.clone(!1), k.extractContents().appendTo(d), d.trim(), y = k.splitBlock(), z = !y.wasStartOfBlock, y = !y.wasEndOfBlock, k.insertNode(d)) : u || (this._.nextNode = d.equals(m) ? null : this._getNextSourceNode(k.getBoundaryNodes().endNode,
                        1, m))
                }
                z && (z = d.getPrevious()) && z.type == CKEDITOR.NODE_ELEMENT && ("br" == z.getName() ? z.remove() : z.getLast() && "br" == z.getLast().$.nodeName.toLowerCase() && z.getLast().remove());
                y && (z = d.getLast()) && z.type == CKEDITOR.NODE_ELEMENT && "br" == z.getName() && (!CKEDITOR.env.needsBrFiller || z.getPrevious(g) || z.getNext(g)) && z.remove();
                this._.nextNode || (this._.nextNode = u || d.equals(m) || !m ? null : this._getNextSourceNode(d, 1, m));
                return d
            },
            _getNextSourceNode: function(a, b, c) {
                function d(a) {
                    return !(a.equals(c) || a.equals(e)) }
                var e =
                    this.range.root;
                for (a = a.getNextSourceNode(b, null, d); !g(a);) a = a.getNextSourceNode(b, null, d);
                return a
            }
        };
        CKEDITOR.dom.range.prototype.createIterator = function() {
            return new a(this) }
    })();
    CKEDITOR.command = function(a, d) {
        this.uiItems = [];
        this.exec = function(b) {
            if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1;
            this.editorFocus && a.focus();
            return !1 === this.fire("exec") ? !0 : !1 !== d.exec.call(this, a, b) };
        this.refresh = function(a, b) {
            if (!this.readOnly && a.readOnly) return !0;
            if (this.context && !b.isContextFor(this.context) || !this.checkAllowed(!0)) return this.disable(), !0;
            this.startDisabled || this.enable();
            this.modes && !this.modes[a.mode] && this.disable();
            return !1 === this.fire("refresh", { editor: a, path: b }) ? !0 : d.refresh && !1 !== d.refresh.apply(this, arguments)
        };
        var b;
        this.checkAllowed = function(c) {
            return c || "boolean" != typeof b ? b = a.activeFilter.checkFeature(this) : b };
        CKEDITOR.tools.extend(this, d, { modes: { wysiwyg: 1 }, editorFocus: 1, contextSensitive: !!d.context, state: CKEDITOR.TRISTATE_DISABLED });
        CKEDITOR.event.call(this)
    };
    CKEDITOR.command.prototype = {
        enable: function() { this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF) },
        disable: function() { this.setState(CKEDITOR.TRISTATE_DISABLED) },
        setState: function(a) {
            if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1;
            this.previousState = this.state;
            this.state = a;
            this.fire("state");
            return !0 },
        toggleState: function() {
            this.state == CKEDITOR.TRISTATE_OFF ?
                this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
        }
    };
    CKEDITOR.event.implementOn(CKEDITOR.command.prototype);
    CKEDITOR.ENTER_P = 1;
    CKEDITOR.ENTER_BR = 2;
    CKEDITOR.ENTER_DIV = 3;
    CKEDITOR.config = { customConfig: "config.js", autoUpdateElement: !0, language: "", defaultLanguage: "en", contentsLangDirection: "", enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR, docType: "\x3c!DOCTYPE html\x3e", bodyId: "", bodyClass: "", fullPage: !1, height: 200, contentsCss: CKEDITOR.getUrl("contents.css"), extraPlugins: "", removePlugins: "", protectedSource: [], tabIndex: 0, width: "", baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85] };
    (function() {
        function a(a, b, c, d, l) {
            var e, q;
            a = [];
            for (e in b) {
                q = b[e];
                q = "boolean" == typeof q ? {} : "function" == typeof q ? { match: q } : M(q);
                "$" != e.charAt(0) && (q.elements = e);
                c && (q.featureName = c.toLowerCase());
                var n = q;
                n.elements = k(n.elements, /\s+/) || null;
                n.propertiesOnly = n.propertiesOnly || !0 === n.elements;
                var f = /\s*,\s*/,
                    t = void 0;
                for (t in Q) {
                    n[t] = k(n[t], f) || null;
                    var m = n,
                        g = P[t],
                        E = k(n[P[t]], f),
                        v = n[t],
                        A = [],
                        I = !0,
                        C = void 0;
                    E ? I = !1 : E = {};
                    for (C in v) "!" == C.charAt(0) && (C = C.slice(1), A.push(C), E[C] = !0, I = !1);
                    for (; C = A.pop();) v[C] =
                        v["!" + C], delete v["!" + C];
                    m[g] = (I ? !1 : E) || null
                }
                n.match = n.match || null;
                d.push(q);
                a.push(q)
            }
            b = l.elements;
            l = l.generic;
            var h;
            c = 0;
            for (d = a.length; c < d; ++c) {
                e = M(a[c]);
                q = !0 === e.classes || !0 === e.styles || !0 === e.attributes;
                n = e;
                t = g = f = void 0;
                for (f in Q) n[f] = J(n[f]);
                m = !0;
                for (t in P) { f = P[t];
                    g = n[f];
                    E = [];
                    v = void 0;
                    for (v in g) - 1 < v.indexOf("*") ? E.push(new RegExp("^" + v.replace(/\*/g, ".*") + "$")) : E.push(v);
                    g = E;
                    g.length && (n[f] = g, m = !1) }
                n.nothingRequired = m;
                n.noProperties = !(n.attributes || n.classes || n.styles);
                if (!0 === e.elements ||
                    null === e.elements) l[q ? "unshift" : "push"](e);
                else
                    for (h in n = e.elements, delete e.elements, n)
                        if (b[h]) b[h][q ? "unshift" : "push"](e);
                        else b[h] = [e]
            }
        }

        function d(a, c, d, l) {
            if (!a.match || a.match(c))
                if (l || h(a, c))
                    if (a.propertiesOnly || (d.valid = !0), d.allAttributes || (d.allAttributes = b(a.attributes, c.attributes, d.validAttributes)), d.allStyles || (d.allStyles = b(a.styles, c.styles, d.validStyles)), !d.allClasses) {
                        a = a.classes;
                        c = c.classes;
                        l = d.validClasses;
                        if (a)
                            if (!0 === a) a = !0;
                            else {
                                for (var e = 0, q = c.length, n; e < q; ++e) n = c[e], l[n] ||
                                    (l[n] = a(n));
                                a = !1
                            }
                        else a = !1;
                        d.allClasses = a
                    }
        }

        function b(a, b, c) {
            if (!a) return !1;
            if (!0 === a) return !0;
            for (var d in b) c[d] || (c[d] = a(d));
            return !1 }

        function c(a, b, c) {
            if (!a.match || a.match(b)) {
                if (a.noProperties) return !1;
                c.hadInvalidAttribute = e(a.attributes, b.attributes) || c.hadInvalidAttribute;
                c.hadInvalidStyle = e(a.styles, b.styles) || c.hadInvalidStyle;
                a = a.classes;
                b = b.classes;
                if (a) {
                    for (var d = !1, l = !0 === a, q = b.length; q--;)
                        if (l || a(b[q])) b.splice(q, 1), d = !0;
                    a = d } else a = !1;
                c.hadInvalidClass = a || c.hadInvalidClass } }

        function e(a,
            b) {
            if (!a) return !1;
            var c = !1,
                d = !0 === a,
                l;
            for (l in b)
                if (d || a(l)) delete b[l], c = !0;
            return c }

        function g(a, b, c) {
            if (a.disabled || a.customConfig && !c || !b) return !1;
            a._.cachedChecks = {};
            return !0 }

        function k(a, b) {
            if (!a) return !1;
            if (!0 === a) return a;
            if ("string" == typeof a) return a = H(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b));
            if (CKEDITOR.tools.isArray(a)) return a.length ? CKEDITOR.tools.convertArrayToObject(a) : !1;
            var c = {},
                d = 0,
                l;
            for (l in a) c[l] = a[l], d++;
            return d ? c : !1 }

        function h(a, b) {
            if (a.nothingRequired) return !0;
            var c, d, l, e;
            if (l = a.requiredClasses)
                for (e = b.classes, c = 0; c < l.length; ++c)
                    if (d = l[c], "string" == typeof d) {
                        if (-1 == CKEDITOR.tools.indexOf(e, d)) return !1 } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(e, d)) return !1;
            return p(b.styles, a.requiredStyles) && p(b.attributes, a.requiredAttributes)
        }

        function p(a, b) {
            if (!b) return !0;
            for (var c = 0, d; c < b.length; ++c)
                if (d = b[c], "string" == typeof d) {
                    if (!(d in a)) return !1 } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, d)) return !1;
            return !0 }

        function r(a) {
            if (!a) return {};
            a = a.split(/\s*,\s*/).sort();
            for (var b = {}; a.length;) b[a.shift()] = "cke-test";
            return b
        }

        function f(a) {
            var b, c, d, l, e = {},
                q = 1;
            for (a = H(a); b = a.match(v);)(c = b[2]) ? (d = B(c, "styles"), l = B(c, "attrs"), c = B(c, "classes")) : d = l = c = null, e["$" + q++] = { elements: b[1], classes: c, styles: d, attributes: l }, a = a.slice(b[0].length);
            return e }

        function B(a, b) {
            var c = a.match(G[b]);
            return c ? H(c[1]) : null }

        function u(a) {
            var b = a.styleBackup = a.attributes.style,
                c = a.classBackup = a.attributes["class"];
            a.styles || (a.styles = CKEDITOR.tools.parseCssText(b ||
                "", 1));
            a.classes || (a.classes = c ? c.split(/\s+/) : [])
        }

        function z(a, b, l, e) {
            var n = 0,
                f;
            e.toHtml && (b.name = b.name.replace(E, "$1"));
            if (e.doCallbacks && a.elementCallbacks) { a: { f = a.elementCallbacks;
                    for (var t = 0, g = f.length, v; t < g; ++t)
                        if (v = f[t](b)) { f = v;
                            break a }
                    f = void 0 }
                if (f) return f }
            if (e.doTransform && (f = a._.transformations[b.name])) { u(b);
                for (t = 0; t < f.length; ++t) q(a, b, f[t]);
                m(b) }
            if (e.doFilter) {
                a: {
                    t = b.name;g = a._;a = g.allowedRules.elements[t];f = g.allowedRules.generic;t = g.disallowedRules.elements[t];g = g.disallowedRules.generic;
                    v = e.skipRequired;
                    var A = { valid: !1, validAttributes: {}, validClasses: {}, validStyles: {}, allAttributes: !1, allClasses: !1, allStyles: !1, hadInvalidAttribute: !1, hadInvalidClass: !1, hadInvalidStyle: !1 },
                        k, C;
                    if (a || f) { u(b);
                        if (t)
                            for (k = 0, C = t.length; k < C; ++k)
                                if (!1 === c(t[k], b, A)) { a = null;
                                    break a }
                        if (g)
                            for (k = 0, C = g.length; k < C; ++k) c(g[k], b, A);
                        if (a)
                            for (k = 0, C = a.length; k < C; ++k) d(a[k], b, A, v);
                        if (f)
                            for (k = 0, C = f.length; k < C; ++k) d(f[k], b, A, v);
                        a = A } else a = null
                }
                if (!a || !a.valid) return l.push(b), 1;C = a.validAttributes;
                var h = a.validStyles;
                f = a.validClasses;
                var t = b.attributes,
                    M = b.styles,
                    g = b.classes;v = b.classBackup;
                var K = b.styleBackup,
                    G, D, p = [],
                    A = [],
                    H = /^data-cke-/;k = !1;delete t.style;delete t["class"];delete b.classBackup;delete b.styleBackup;
                if (!a.allAttributes)
                    for (G in t) C[G] || (H.test(G) ? G == (D = G.replace(/^data-cke-saved-/, "")) || C[D] || (delete t[G], k = !0) : (delete t[G], k = !0));
                if (!a.allStyles || a.hadInvalidStyle) {
                    for (G in M) a.allStyles || h[G] ? p.push(G + ":" + M[G]) : k = !0;
                    p.length && (t.style = p.sort().join("; ")) } else K && (t.style = K);
                if (!a.allClasses ||
                    a.hadInvalidClass) {
                    for (G = 0; G < g.length; ++G)(a.allClasses || f[g[G]]) && A.push(g[G]);
                    A.length && (t["class"] = A.sort().join(" "));
                    v && A.length < v.split(/\s+/).length && (k = !0) } else v && (t["class"] = v);k && (n = 1);
                if (!e.skipFinalValidation && !x(b)) return l.push(b), 1
            }
            e.toHtml && (b.name = b.name.replace(I, "cke:$1"));
            return n
        }

        function y(a) {
            var b = [],
                c;
            for (c in a) - 1 < c.indexOf("*") && b.push(c.replace(/\*/g, ".*"));
            return b.length ? new RegExp("^(?:" + b.join("|") + ")$") : null }

        function m(a) {
            var b = a.attributes,
                c;
            delete b.style;
            delete b["class"];
            if (c = CKEDITOR.tools.writeCssText(a.styles, !0)) b.style = c;
            a.classes.length && (b["class"] = a.classes.sort().join(" "))
        }

        function x(a) {
            switch (a.name) {
                case "a":
                    if (!(a.children.length || a.attributes.name || a.attributes.id)) return !1;
                    break;
                case "img":
                    if (!a.attributes.src) return !1 }
            return !0 }

        function J(a) {
            if (!a) return !1;
            if (!0 === a) return !0;
            var b = y(a);
            return function(c) {
                return c in a || b && c.match(b) } }

        function w() {
            return new CKEDITOR.htmlParser.element("br") }

        function F(a) {
            return a.type == CKEDITOR.NODE_ELEMENT && ("br" ==
                a.name || D.$block[a.name])
        }

        function l(a, b, c) {
            var d = a.name;
            if (D.$empty[d] || !a.children.length) "hr" == d && "br" == b ? a.replaceWith(w()) : (a.parent && c.push({ check: "it", el: a.parent }), a.remove());
            else if (D.$block[d] || "tr" == d)
                if ("br" == b) a.previous && !F(a.previous) && (b = w(), b.insertBefore(a)), a.next && !F(a.next) && (b = w(), b.insertAfter(a)), a.replaceWithChildren();
                else {
                    var d = a.children,
                        l;
                    b: { l = D[b];
                        for (var e = 0, q = d.length, n; e < q; ++e)
                            if (n = d[e], n.type == CKEDITOR.NODE_ELEMENT && !l[n.name]) { l = !1;
                                break b }
                        l = !0 }
                    if (l) a.name = b, a.attributes = {}, c.push({ check: "parent-down", el: a });
                    else { l = a.parent;
                        for (var e = l.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == l.name, t, f, q = d.length; 0 < q;) n = d[--q], e && (n.type == CKEDITOR.NODE_TEXT || n.type == CKEDITOR.NODE_ELEMENT && D.$inline[n.name]) ? (t || (t = new CKEDITOR.htmlParser.element(b), t.insertAfter(a), c.push({ check: "parent-down", el: t })), t.add(n, 0)) : (t = null, f = D[l.name] || D.span, n.insertAfter(a), l.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n.type != CKEDITOR.NODE_ELEMENT || f[n.name] || c.push({ check: "el-up", el: n }));
                        a.remove() }
                }
            else d in { style: 1, script: 1 } ? a.remove() : (a.parent && c.push({ check: "it", el: a.parent }), a.replaceWithChildren())
        }

        function q(a, b, c) {
            var d, l;
            for (d = 0; d < c.length; ++d)
                if (l = c[d], !(l.check && !a.check(l.check, !1) || l.left && !l.left(b))) { l.right(b, K);
                    break } }

        function n(a, b) {
            var c = b.getDefinition(),
                d = c.attributes,
                l = c.styles,
                e, q, n, t;
            if (a.name != c.element) return !1;
            for (e in d)
                if ("class" == e)
                    for (c = d[e].split(/\s+/), n = a.classes.join("|"); t = c.pop();) {
                        if (-1 == n.indexOf(t)) return !1 } else if (a.attributes[e] != d[e]) return !1;
            for (q in l)
                if (a.styles[q] !=
                    l[q]) return !1;
            return !0
        }

        function t(a, b) {
            var c, d; "string" == typeof a ? c = a : a instanceof CKEDITOR.style ? d = a : (c = a[0], d = a[1]);
            return [{ element: c, left: d, right: function(a, c) { c.transform(a, b) } }] }

        function A(a) {
            return function(b) {
                return n(b, a) } }

        function C(a) {
            return function(b, c) { c[a](b) } }
        var D = CKEDITOR.dtd,
            M = CKEDITOR.tools.copy,
            H = CKEDITOR.tools.trim,
            R = ["", "p", "br", "div"];
        CKEDITOR.FILTER_SKIP_TREE = 2;
        CKEDITOR.filter = function(a) {
            this.allowedContent = [];
            this.disallowedContent = [];
            this.elementCallbacks = null;
            this.disabled = !1;
            this.editor = null;
            this.id = CKEDITOR.tools.getNextNumber();
            this._ = { allowedRules: { elements: {}, generic: [] }, disallowedRules: { elements: {}, generic: [] }, transformations: {}, cachedTests: {} };
            CKEDITOR.filter.instances[this.id] = this;
            if (a instanceof CKEDITOR.editor) {
                a = this.editor = a;
                this.customConfig = !0;
                var b = a.config.allowedContent;
                !0 === b ? this.disabled = !0 : (b || (this.customConfig = !1), this.allow(b, "config", 1), this.allow(a.config.extraAllowedContent, "extra", 1), this.allow(R[a.enterMode] + " " + R[a.shiftEnterMode], "default",
                    1), this.disallow(a.config.disallowedContent))
            } else this.customConfig = !1, this.allow(a, "default", 1)
        };
        CKEDITOR.filter.instances = {};
        CKEDITOR.filter.prototype = {
            allow: function(b, c, d) {
                if (!g(this, b, d)) return !1;
                var l, e;
                if ("string" == typeof b) b = f(b);
                else if (b instanceof CKEDITOR.style) {
                    if (b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor), c, d);
                    l = b.getDefinition();
                    b = {};
                    d = l.attributes;
                    b[l.element] = l = { styles: l.styles, requiredStyles: l.styles && CKEDITOR.tools.objectKeys(l.styles) };
                    d && (d =
                        M(d), l.classes = d["class"] ? d["class"].split(/\s+/) : null, l.requiredClasses = l.classes, delete d["class"], l.attributes = d, l.requiredAttributes = d && CKEDITOR.tools.objectKeys(d))
                } else if (CKEDITOR.tools.isArray(b)) {
                    for (l = 0; l < b.length; ++l) e = this.allow(b[l], c, d);
                    return e }
                a(this, b, c, this.allowedContent, this._.allowedRules);
                return !0
            },
            applyTo: function(a, b, c, d) {
                if (this.disabled) return !1;
                var e = this,
                    q = [],
                    n = this.editor && this.editor.config.protectedSource,
                    t, f = !1,
                    g = { doFilter: !c, doTransform: !0, doCallbacks: !0, toHtml: b };
                a.forEach(function(a) {
                    if (a.type == CKEDITOR.NODE_ELEMENT) {
                        if ("off" == a.attributes["data-cke-filter"]) return !1;
                        if (!b || "span" != a.name || !~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))
                            if (t = z(e, a, q, g), t & 1) f = !0;
                            else if (t & 2) return !1 } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                        var c;
                        a: {
                            var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ""));c = [];
                            var l, m, E;
                            if (n)
                                for (m = 0; m < n.length; ++m)
                                    if ((E = d.match(n[m])) && E[0].length == d.length) {
                                        c = !0;
                                        break a
                                    }
                            d = CKEDITOR.htmlParser.fragment.fromHtml(d);1 == d.children.length && (l = d.children[0]).type == CKEDITOR.NODE_ELEMENT && z(e, l, c, g);c = !c.length
                        }
                        c || q.push(a)
                    }
                }, null, !0);
                q.length && (f = !0);
                var m;
                a = [];
                d = R[d || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)];
                for (var E; c = q.pop();) c.type == CKEDITOR.NODE_ELEMENT ? l(c, d, a) : c.remove();
                for (; m = a.pop();)
                    if (c = m.el, c.parent) switch (E = D[c.parent.name] || D.span, m.check) {
                        case "it":
                            D.$removeEmpty[c.name] && !c.children.length ? l(c, d, a) : x(c) || l(c, d, a);
                            break;
                        case "el-up":
                            c.parent.type ==
                                CKEDITOR.NODE_DOCUMENT_FRAGMENT || E[c.name] || l(c, d, a);
                            break;
                        case "parent-down":
                            c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || E[c.name] || l(c.parent, d, a)
                    }
                    return f
            },
            checkFeature: function(a) {
                if (this.disabled || !a) return !0;
                a.toFeature && (a = a.toFeature(this.editor));
                return !a.requiredContent || this.check(a.requiredContent) },
            disable: function() { this.disabled = !0 },
            disallow: function(b) {
                if (!g(this, b, !0)) return !1; "string" == typeof b && (b = f(b));
                a(this, b, null, this.disallowedContent, this._.disallowedRules);
                return !0 },
            addContentForms: function(a) {
                if (!this.disabled && a) {
                    var b, c, d = [],
                        l;
                    for (b = 0; b < a.length && !l; ++b) c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (l = c);
                    if (l) {
                        for (b = 0; b < a.length; ++b) d.push(t(a[b], l));
                        this.addTransformations(d) } } },
            addElementCallback: function(a) { this.elementCallbacks || (this.elementCallbacks = []);
                this.elementCallbacks.push(a) },
            addFeature: function(a) {
                if (this.disabled || !a) return !0;
                a.toFeature && (a = a.toFeature(this.editor));
                this.allow(a.allowedContent, a.name);
                this.addTransformations(a.contentTransformations);
                this.addContentForms(a.contentForms);
                return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
            },
            addTransformations: function(a) {
                var b, c;
                if (!this.disabled && a) {
                    var d = this._.transformations,
                        l;
                    for (l = 0; l < a.length; ++l) {
                        b = a[l];
                        var e = void 0,
                            q = void 0,
                            n = void 0,
                            t = void 0,
                            f = void 0,
                            g = void 0;
                        c = [];
                        for (q = 0; q < b.length; ++q) n = b[q], "string" == typeof n ? (n = n.split(/\s*:\s*/), t = n[0], f = null, g = n[1]) : (t = n.check, f = n.left, g = n.right), e || (e = n, e = e.element ? e.element : t ? t.match(/^([a-z0-9]+)/i)[0] :
                            e.left.getDefinition().element), f instanceof CKEDITOR.style && (f = A(f)), c.push({ check: t == e ? null : t, left: f, right: "string" == typeof g ? C(g) : g });
                        b = e;
                        d[b] || (d[b] = []);
                        d[b].push(c)
                    }
                }
            },
            check: function(a, b, c) {
                if (this.disabled) return !0;
                if (CKEDITOR.tools.isArray(a)) {
                    for (var d = a.length; d--;)
                        if (this.check(a[d], b, c)) return !0;
                    return !1 }
                var l, e;
                if ("string" == typeof a) {
                    e = a + "\x3c" + (!1 === b ? "0" : "1") + (c ? "1" : "0") + "\x3e";
                    if (e in this._.cachedChecks) return this._.cachedChecks[e];
                    d = f(a).$1;
                    l = d.styles;
                    var n = d.classes;
                    d.name = d.elements;
                    d.classes = n = n ? n.split(/\s*,\s*/) : [];
                    d.styles = r(l);
                    d.attributes = r(d.attributes);
                    d.children = [];
                    n.length && (d.attributes["class"] = n.join(" "));
                    l && (d.attributes.style = CKEDITOR.tools.writeCssText(d.styles));
                    l = d
                } else d = a.getDefinition(), l = d.styles, n = d.attributes || {}, l && !CKEDITOR.tools.isEmpty(l) ? (l = M(l), n.style = CKEDITOR.tools.writeCssText(l, !0)) : l = {}, l = { name: d.element, attributes: n, classes: n["class"] ? n["class"].split(/\s+/) : [], styles: l, children: [] };
                var n = CKEDITOR.tools.clone(l),
                    t = [],
                    g;
                if (!1 !== b && (g = this._.transformations[l.name])) {
                    for (d =
                        0; d < g.length; ++d) q(this, l, g[d]);
                    m(l)
                }
                z(this, n, t, { doFilter: !0, doTransform: !1 !== b, skipRequired: !c, skipFinalValidation: !c });
                b = 0 < t.length ? !1 : CKEDITOR.tools.objectCompare(l.attributes, n.attributes, !0) ? !0 : !1;
                "string" == typeof a && (this._.cachedChecks[e] = b);
                return b
            },
            getAllowedEnterMode: function() {
                var a = ["p", "div", "br"],
                    b = { p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR };
                return function(c, d) {
                    var l = a.slice(),
                        e;
                    if (this.check(R[c])) return c;
                    for (d || (l = l.reverse()); e = l.pop();)
                        if (this.check(e)) return b[e];
                    return CKEDITOR.ENTER_BR
                }
            }(),
            destroy: function() { delete CKEDITOR.filter.instances[this.id];
                delete this._;
                delete this.allowedContent;
                delete this.disallowedContent }
        };
        var Q = { styles: 1, attributes: 1, classes: 1 },
            P = { styles: "requiredStyles", attributes: "requiredAttributes", classes: "requiredClasses" },
            v = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
            G = { styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/ },
            E = /^cke:(object|embed|param)$/,
            I = /^(object|embed|param)$/,
            K;
        K = CKEDITOR.filter.transformationsTools = {
            sizeToStyle: function(a) { this.lengthToStyle(a, "width");
                this.lengthToStyle(a, "height") },
            sizeToAttribute: function(a) { this.lengthToAttribute(a, "width");
                this.lengthToAttribute(a, "height") },
            lengthToStyle: function(a, b, c) { c = c || b;
                if (!(c in a.styles)) {
                    var d = a.attributes[b];
                    d && (/^\d+$/.test(d) && (d += "px"), a.styles[c] = d) }
                delete a.attributes[b] },
            lengthToAttribute: function(a, b, c) {
                c = c || b;
                if (!(c in a.attributes)) {
                    var d = a.styles[b],
                        l = d && d.match(/^(\d+)(?:\.\d*)?px$/);
                    l ? a.attributes[c] = l[1] : "cke-test" == d && (a.attributes[c] = "cke-test")
                }
                delete a.styles[b]
            },
            alignmentToStyle: function(a) {
                if (!("float" in a.styles)) {
                    var b = a.attributes.align;
                    if ("left" == b || "right" == b) a.styles["float"] = b }
                delete a.attributes.align },
            alignmentToAttribute: function(a) {
                if (!("align" in a.attributes)) {
                    var b = a.styles["float"];
                    if ("left" == b || "right" == b) a.attributes.align = b }
                delete a.styles["float"] },
            splitBorderShorthand: function(a) {
                function b(d) {
                    a.styles["border-top-width"] = c[d[0]];
                    a.styles["border-right-width"] =
                        c[d[1]];
                    a.styles["border-bottom-width"] = c[d[2]];
                    a.styles["border-left-width"] = c[d[3]]
                }
                if (a.styles.border) {
                    var c = a.styles.border.match(/([\.\d]+\w+)/g) || ["0px"];
                    switch (c.length) {
                        case 1:
                            a.styles["border-width"] = c[0];
                            break;
                        case 2:
                            b([0, 1, 0, 1]);
                            break;
                        case 3:
                            b([0, 1, 2, 1]);
                            break;
                        case 4:
                            b([0, 1, 2, 3]) }
                    a.styles["border-style"] = a.styles["border-style"] || (a.styles.border.match(/(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|initial|inherit)/) || [])[0];
                    a.styles["border-style"] || delete a.styles["border-style"];
                    delete a.styles.border
                }
            },
            listTypeToStyle: function(a) {
                if (a.attributes.type) switch (a.attributes.type) {
                    case "a":
                        a.styles["list-style-type"] = "lower-alpha";
                        break;
                    case "A":
                        a.styles["list-style-type"] = "upper-alpha";
                        break;
                    case "i":
                        a.styles["list-style-type"] = "lower-roman";
                        break;
                    case "I":
                        a.styles["list-style-type"] = "upper-roman";
                        break;
                    case "1":
                        a.styles["list-style-type"] = "decimal";
                        break;
                    default:
                        a.styles["list-style-type"] = a.attributes.type } },
            splitMarginShorthand: function(a) {
                function b(d) {
                    a.styles["margin-top"] =
                        c[d[0]];
                    a.styles["margin-right"] = c[d[1]];
                    a.styles["margin-bottom"] = c[d[2]];
                    a.styles["margin-left"] = c[d[3]]
                }
                if (a.styles.margin) {
                    var c = a.styles.margin.match(/(\-?[\.\d]+\w+)/g) || ["0px"];
                    switch (c.length) {
                        case 1:
                            a.styles.margin = c[0];
                            break;
                        case 2:
                            b([0, 1, 0, 1]);
                            break;
                        case 3:
                            b([0, 1, 2, 1]);
                            break;
                        case 4:
                            b([0, 1, 2, 3]) }
                    delete a.styles.margin }
            },
            matchesStyle: n,
            transform: function(a, b) {
                if ("string" == typeof b) a.name = b;
                else {
                    var c = b.getDefinition(),
                        d = c.styles,
                        l = c.attributes,
                        e, q, n, t;
                    a.name = c.element;
                    for (e in l)
                        if ("class" ==
                            e)
                            for (c = a.classes.join("|"), n = l[e].split(/\s+/); t = n.pop();) - 1 == c.indexOf(t) && a.classes.push(t);
                        else a.attributes[e] = l[e];
                    for (q in d) a.styles[q] = d[q]
                }
            }
        }
    })();
    (function() {
        CKEDITOR.focusManager = function(a) {
            if (a.focusManager) return a.focusManager;
            this.hasFocus = !1;
            this.currentActive = null;
            this._ = { editor: a };
            return this };
        CKEDITOR.focusManager._ = { blurDelay: 200 };
        CKEDITOR.focusManager.prototype = {
            focus: function(a) { this._.timer && clearTimeout(this._.timer);
                a && (this.currentActive = a);
                this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus")) },
            lock: function() {
                this._.locked =
                    1
            },
            unlock: function() { delete this._.locked },
            blur: function(a) {
                function d() {
                    var a = this._.editor;
                    this.hasFocus && (this.hasFocus = !1, CKEDITOR.env.chrome && a.editable().isInline() && a.window.$.getSelection().removeAllRanges(), (a = this._.editor.container) && a.removeClass("cke_focus"), this._.editor.fire("blur")) }
                if (!this._.locked) {
                    this._.timer && clearTimeout(this._.timer);
                    var b = CKEDITOR.focusManager._.blurDelay;
                    a || !b ? d.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function() { delete this._.timer;
                            d.call(this) },
                        b, this)
                }
            },
            add: function(a, d) {
                var b = a.getCustomData("focusmanager");
                if (!b || b != this) { b && b.remove(a);
                    var b = "focus",
                        c = "blur";
                    d && (CKEDITOR.env.ie ? (b = "focusin", c = "focusout") : CKEDITOR.event.useCapture = 1);
                    var e = { blur: function() { a.equals(this.currentActive) && this.blur() }, focus: function() { this.focus(a) } };
                    a.on(b, e.focus, this);
                    a.on(c, e.blur, this);
                    d && (CKEDITOR.event.useCapture = 0);
                    a.setCustomData("focusmanager", this);
                    a.setCustomData("focusmanager_handlers", e) } },
            remove: function(a) {
                a.removeCustomData("focusmanager");
                var d = a.removeCustomData("focusmanager_handlers");
                a.removeListener("blur", d.blur);
                a.removeListener("focus", d.focus)
            }
        }
    })();
    CKEDITOR.keystrokeHandler = function(a) {
        if (a.keystrokeHandler) return a.keystrokeHandler;
        this.keystrokes = {};
        this.blockedKeystrokes = {};
        this._ = { editor: a };
        return this };
    (function() {
        var a, d = function(b) { b = b.data;
                var d = b.getKeystroke(),
                    g = this.keystrokes[d],
                    k = this._.editor;
                a = !1 === k.fire("key", { keyCode: d, domEvent: b });
                a || (g && (a = !1 !== k.execCommand(g, { from: "keystrokeHandler" })), a || (a = !!this.blockedKeystrokes[d]));
                a && b.preventDefault(!0);
                return !a },
            b = function(b) { a && (a = !1, b.data.preventDefault(!0)) };
        CKEDITOR.keystrokeHandler.prototype = { attach: function(a) { a.on("keydown", d, this);
                if (CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", b, this) } } })();
    (function() {
        CKEDITOR.lang = {
            languages: { af: 1, ar: 1, az: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, en: 1, eo: 1, es: 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, "fr-ca": 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, "pt-br": 1, pt: 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, "sr-latn": 1, sr: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, "zh-cn": 1, zh: 1 },
            rtl: { ar: 1, fa: 1, he: 1, ku: 1, ug: 1 },
            load: function(a, d, b) {
                a && CKEDITOR.lang.languages[a] ||
                    (a = this.detect(d, a));
                var c = this;
                d = function() { c[a].dir = c.rtl[a] ? "rtl" : "ltr";
                    b(a, c[a]) };
                this[a] ? d() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), d, this)
            },
            detect: function(a, d) {
                var b = this.languages;
                d = d || navigator.userLanguage || navigator.language || a;
                var c = d.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
                    e = c[1],
                    c = c[2];
                b[e + "-" + c] ? e = e + "-" + c : b[e] || (e = null);
                CKEDITOR.lang.detect = e ? function() {
                    return e } : function(a) {
                    return a };
                return e || a }
        }
    })();
    CKEDITOR.scriptLoader = function() {
        var a = {},
            d = {};
        return {
            load: function(b, c, e, g) {
                var k = "string" == typeof b;
                k && (b = [b]);
                e || (e = CKEDITOR);
                var h = b.length,
                    p = [],
                    r = [],
                    f = function(a) { c && (k ? c.call(e, a) : c.call(e, p, r)) };
                if (0 === h) f(!0);
                else {
                    var B = function(a, b) {
                            (b ? p : r).push(a);
                            0 >= --h && (g && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), f(b)) },
                        u = function(b, c) { a[b] = 1;
                            var e = d[b];
                            delete d[b];
                            for (var f = 0; f < e.length; f++) e[f](b, c) },
                        z = function(b) {
                            if (a[b]) B(b, !0);
                            else {
                                var e = d[b] || (d[b] = []);
                                e.push(B);
                                if (!(1 < e.length)) {
                                    var f =
                                        new CKEDITOR.dom.element("script");
                                    f.setAttributes({ type: "text/javascript", src: b });
                                    c && (CKEDITOR.env.ie && (8 >= CKEDITOR.env.version || CKEDITOR.env.ie9Compat) ? f.$.onreadystatechange = function() {
                                        if ("loaded" == f.$.readyState || "complete" == f.$.readyState) f.$.onreadystatechange = null, u(b, !0) } : (f.$.onload = function() { setTimeout(function() { u(b, !0) }, 0) }, f.$.onerror = function() { u(b, !1) }));
                                    f.appendTo(CKEDITOR.document.getHead())
                                }
                            }
                        };
                    g && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                    for (var y = 0; y < h; y++) z(b[y])
                }
            },
            queue: function() {
                function a() {
                    var b;
                    (b = c[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0) }
                var c = [];
                return function(d, g) {
                    var k = this;
                    c.push({ scriptUrl: d, callback: function() { g && g.apply(this, arguments);
                            c.shift();
                            a.call(k) } });
                    1 == c.length && a.call(this) } }()
        }
    }();
    CKEDITOR.resourceManager = function(a, d) { this.basePath = a;
        this.fileName = d;
        this.registered = {};
        this.loaded = {};
        this.externals = {};
        this._ = { waitingList: {} } };
    CKEDITOR.resourceManager.prototype = {
        add: function(a, d) {
            if (this.registered[a]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.');
            var b = this.registered[a] = d || {};
            b.name = a;
            b.path = this.getPath(a);
            CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", b);
            return this.get(a) },
        get: function(a) {
            return this.registered[a] || null },
        getPath: function(a) {
            var d = this.externals[a];
            return CKEDITOR.getUrl(d && d.dir || this.basePath + a + "/") },
        getFilePath: function(a) {
            var d = this.externals[a];
            return CKEDITOR.getUrl(this.getPath(a) + (d ? d.file : this.fileName + ".js"))
        },
        addExternal: function(a, d, b) { a = a.split(",");
            for (var c = 0; c < a.length; c++) {
                var e = a[c];
                b || (d = d.replace(/[^\/]+$/, function(a) { b = a;
                    return "" }));
                this.externals[e] = { dir: d, file: b || this.fileName + ".js" } } },
        load: function(a, d, b) {
            CKEDITOR.tools.isArray(a) || (a = a ? [a] : []);
            for (var c = this.loaded, e = this.registered, g = [], k = {}, h = {}, p = 0; p < a.length; p++) {
                var r = a[p];
                if (r)
                    if (c[r] || e[r]) h[r] = this.get(r);
                    else {
                        var f = this.getFilePath(r);
                        g.push(f);
                        f in k || (k[f] = []);
                        k[f].push(r)
                    }
            }
            CKEDITOR.scriptLoader.load(g, function(a, e) {
                if (e.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' + k[e[0]].join(",") + '" was not found at "' + e[0] + '".');
                for (var f = 0; f < a.length; f++)
                    for (var g = k[a[f]], m = 0; m < g.length; m++) {
                        var x = g[m];
                        h[x] = this.get(x);
                        c[x] = 1 }
                d.call(b, h) }, this)
        }
    };
    CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin");
    CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(a) {
        var d = {};
        return function(b, c, e) {
            var g = {},
                k = function(b) {
                    a.call(this, b, function(a) {
                        CKEDITOR.tools.extend(g, a);
                        var b = [],
                            f;
                        for (f in a) {
                            var h = a[f],
                                u = h && h.requires;
                            if (!d[f]) {
                                if (h.icons)
                                    for (var z = h.icons.split(","), y = z.length; y--;) CKEDITOR.skin.addIcon(z[y], h.path + "icons/" + (CKEDITOR.env.hidpi && h.hidpi ? "hidpi/" : "") + z[y] + ".png");
                                d[f] = 1 }
                            if (u)
                                for (u.split && (u = u.split(",")), h = 0; h < u.length; h++) g[u[h]] || b.push(u[h]) }
                        if (b.length) k.call(this,
                            b);
                        else {
                            for (f in g) h = g[f], h.onLoad && !h.onLoad._called && (!1 === h.onLoad() && delete g[f], h.onLoad._called = 1);
                            c && c.call(e || window, g) }
                    }, this)
                };
            k.call(this, b)
        }
    });
    CKEDITOR.plugins.setLang = function(a, d, b) {
        var c = this.get(a);
        a = c.langEntries || (c.langEntries = {});
        c = c.lang || (c.lang = []);
        c.split && (c = c.split(",")); - 1 == CKEDITOR.tools.indexOf(c, d) && c.push(d);
        a[d] = b };
    CKEDITOR.ui = function(a) {
        if (a.ui) return a.ui;
        this.items = {};
        this.instances = {};
        this.editor = a;
        this._ = { handlers: {} };
        return this };
    CKEDITOR.ui.prototype = {
        add: function(a, d, b) { b.name = a.toLowerCase();
            var c = this.items[a] = { type: d, command: b.command || null, args: Array.prototype.slice.call(arguments, 2) };
            CKEDITOR.tools.extend(c, b) },
        get: function(a) {
            return this.instances[a] },
        create: function(a) {
            var d = this.items[a],
                b = d && this._.handlers[d.type],
                c = d && d.command && this.editor.getCommand(d.command),
                b = b && b.create.apply(this, d.args);
            this.instances[a] = b;
            c && c.uiItems.push(b);
            b && !b.type && (b.type = d.type);
            return b },
        addHandler: function(a, d) {
            this._.handlers[a] =
                d
        },
        space: function(a) {
            return CKEDITOR.document.getById(this.spaceId(a)) },
        spaceId: function(a) {
            return this.editor.id + "_" + a }
    };
    CKEDITOR.event.implementOn(CKEDITOR.ui);
    (function() {
        function a(a, e, f) {
            CKEDITOR.event.call(this);
            a = a && CKEDITOR.tools.clone(a);
            if (void 0 !== e) {
                if (!(e instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element.");
                if (!f) throw Error("One of the element modes must be specified.");
                if (CKEDITOR.env.ie && CKEDITOR.env.quirks && f == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
                if (!b(e, f)) throw Error('The specified element mode is not supported on element: "' + e.getName() + '".');
                this.element = e;
                this.elementMode = f;
                this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (e.getId() || e.getNameAtt())
            } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
            this._ = {};
            this.commands = {};
            this.templates = {};
            this.name = this.name || d();
            this.id = CKEDITOR.tools.getNextId();
            this.status = "unloaded";
            this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
            this.ui = new CKEDITOR.ui(this);
            this.focusManager = new CKEDITOR.focusManager(this);
            this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
            this.on("readOnly",
                c);
            this.on("selectionChange", function(a) { g(this, a.data.path) });
            this.on("activeFilterChange", function() { g(this, this.elementPath(), !0) });
            this.on("mode", c);
            this.on("instanceReady", function() { this.config.startupFocus && this.focus() });
            CKEDITOR.fire("instanceCreated", null, this);
            CKEDITOR.add(this);
            CKEDITOR.tools.setTimeout(function() { "destroyed" !== this.status ? h(this, a) : CKEDITOR.warn("editor-incorrect-destroy") }, 0, this)
        }

        function d() { do var a = "editor" + ++z; while (CKEDITOR.instances[a]);
            return a }

        function b(a,
            b) {
            return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1 }

        function c() {
            var a = this.commands,
                b;
            for (b in a) e(this, a[b]) }

        function e(a, b) { b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]() }

        function g(a, b, c) {
            if (b) {
                var d, e, l = a.commands;
                for (e in l) d = l[e], (c || d.contextSensitive) && d.refresh(a, b) } }

        function k(a) {
            var b = a.config.customConfig;
            if (!b) return !1;
            var b =
                CKEDITOR.getUrl(b),
                c = y[b] || (y[b] = {});
            c.fn ? (c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && k(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function() { c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function() {};
                k(a) });
            return !0
        }

        function h(a, b) {
            a.on("customConfigLoaded", function() {
                if (b) {
                    if (b.on)
                        for (var c in b.on) a.on(c, b.on[c]);
                    CKEDITOR.tools.extend(a.config, b, !0);
                    delete a.config.on }
                c = a.config;
                a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ?
                    a.element.is("textarea") ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1;
                a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : !1;
                a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0;
                a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode;
                a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode;
                c.skin && (CKEDITOR.skinName = c.skin);
                a.fireOnce("configLoaded");
                a.dataProcessor = new CKEDITOR.htmlDataProcessor(a);
                a.filter = a.activeFilter = new CKEDITOR.filter(a);
                p(a)
            });
            b && null != b.customConfig && (a.config.customConfig = b.customConfig);
            k(a) || a.fireOnce("customConfigLoaded")
        }

        function p(a) { CKEDITOR.skin.loadPart("editor", function() { r(a) }) }

        function r(a) {
            CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function(b,
                c) {
                var d = a.config.title;
                a.langCode = b;
                a.lang = CKEDITOR.tools.prototypedCopy(c);
                a.title = "string" == typeof d || !1 === d ? d : [a.lang.editor, a.name].join(", ");
                a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir);
                a.fire("langLoaded");
                f(a) })
        }

        function f(a) { a.getStylesSet(function(b) { a.once("loaded", function() { a.fire("stylesSet", { styles: b }) }, null, null, 1);
                B(a) }) }

        function B(a) {
            var b = a.config,
                c = b.plugins,
                d = b.extraPlugins,
                e =
                b.removePlugins;
            if (d) var l = new RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"),
                c = c.replace(l, ""),
                c = c + ("," + d);
            if (e) var q = new RegExp("(?:^|,)(?:" + e.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"),
                c = c.replace(q, "");
            CKEDITOR.env.air && (c += ",adobeair");
            CKEDITOR.plugins.load(c.split(","), function(c) {
                var d = [],
                    l = [],
                    e = [];
                a.plugins = c;
                for (var f in c) {
                    var g = c[f],
                        k = g.lang,
                        h = null,
                        p = g.requires,
                        r;
                    CKEDITOR.tools.isArray(p) && (p = p.join(","));
                    if (p && (r = p.match(q)))
                        for (; p = r.pop();) CKEDITOR.error("editor-plugin-required", { plugin: p.replace(",", ""), requiredBy: f });
                    k && !a.lang[f] && (k.split && (k = k.split(",")), 0 <= CKEDITOR.tools.indexOf(k, a.langCode) ? h = a.langCode : (h = a.langCode.replace(/-.*/, ""), h = h != a.langCode && 0 <= CKEDITOR.tools.indexOf(k, h) ? h : 0 <= CKEDITOR.tools.indexOf(k, "en") ? "en" : k[0]), g.langEntries && g.langEntries[h] ? (a.lang[f] = g.langEntries[h], h = null) : e.push(CKEDITOR.getUrl(g.path + "lang/" + h + ".js")));
                    l.push(h);
                    d.push(g)
                }
                CKEDITOR.scriptLoader.load(e, function() {
                    for (var c = ["beforeInit", "init", "afterInit"], e = 0; e < c.length; e++)
                        for (var q =
                                0; q < d.length; q++) {
                            var n = d[q];
                            0 === e && l[q] && n.lang && n.langEntries && (a.lang[n.name] = n.langEntries[l[q]]);
                            if (n[c[e]]) n[c[e]](a) }
                    a.fireOnce("pluginsLoaded");
                    b.keystrokes && a.setKeystroke(a.config.keystrokes);
                    for (q = 0; q < a.config.blockedKeystrokes.length; q++) a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[q]] = 1;
                    a.status = "loaded";
                    a.fireOnce("loaded");
                    CKEDITOR.fire("instanceLoaded", null, a)
                })
            })
        }

        function u() {
            var a = this.element;
            if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                var b = this.getData();
                this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
                a.is("textarea") ? a.setValue(b) : a.setHtml(b);
                return !0
            }
            return !1
        }
        a.prototype = CKEDITOR.editor.prototype;
        CKEDITOR.editor = a;
        var z = 0,
            y = {};
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            addCommand: function(a, b) { b.name = a.toLowerCase();
                var c = new CKEDITOR.command(this, b);
                this.mode && e(this, c);
                return this.commands[a] = c },
            _attachToForm: function() {
                function a(b) { c.updateElement();
                    c._.required && !d.getValue() && !1 === c.fire("required") && b.data.preventDefault() }

                function b(a) {
                    return !!(a && a.call && a.apply) }
                var c = this,
                    d = c.element,
                    e = new CKEDITOR.dom.element(d.$.form);
                d.is("textarea") && e && (e.on("submit", a), b(e.$.submit) && (e.$.submit = CKEDITOR.tools.override(e.$.submit, function(b) {
                    return function() { a();
                        b.apply ? b.apply(this) : b() } })), c.on("destroy", function() { e.removeListener("submit", a) }))
            },
            destroy: function(a) {
                this.fire("beforeDestroy");
                !a && u.call(this);
                this.editable(null);
                this.filter && (this.filter.destroy(), delete this.filter);
                delete this.activeFilter;
                this.status =
                    "destroyed";
                this.fire("destroy");
                this.removeAllListeners();
                CKEDITOR.remove(this);
                CKEDITOR.fire("instanceDestroyed", null, this)
            },
            elementPath: function(a) {
                if (!a) { a = this.getSelection();
                    if (!a) return null;
                    a = a.getStartElement() }
                return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null },
            createRange: function() {
                var a = this.editable();
                return a ? new CKEDITOR.dom.range(a) : null },
            execCommand: function(a, b) {
                var c = this.getCommand(a),
                    d = { name: a, commandData: b, command: c };
                return c && c.state != CKEDITOR.TRISTATE_DISABLED &&
                    !1 !== this.fire("beforeCommandExec", d) && (d.returnValue = c.exec(d.commandData), !c.async && !1 !== this.fire("afterCommandExec", d)) ? d.returnValue : !1
            },
            getCommand: function(a) {
                return this.commands[a] },
            getData: function(a) {!a && this.fire("beforeGetData");
                var b = this._.data; "string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : "");
                b = { dataValue: b };!a && this.fire("getData", b);
                return b.dataValue },
            getSnapshot: function() {
                var a = this.fire("getSnapshot");
                "string" != typeof a && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : "");
                return a
            },
            loadSnapshot: function(a) { this.fire("loadSnapshot", a) },
            setData: function(a, b, c) {
                var d = !0,
                    e = b;
                b && "object" == typeof b && (c = b.internal, e = b.callback, d = !b.noSnapshot);
                !c && d && this.fire("saveSnapshot");
                if (e || !c) this.once("dataReady", function(a) {!c && d && this.fire("saveSnapshot");
                    e && e.call(a.editor) });
                a = { dataValue: a };
                !c && this.fire("setData", a);
                this._.data = a.dataValue;
                !c && this.fire("afterSetData", a)
            },
            setReadOnly: function(a) { a = null == a || a;
                this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly")) },
            insertHtml: function(a, b, c) { this.fire("insertHtml", { dataValue: a, mode: b, range: c }) },
            insertText: function(a) { this.fire("insertText", a) },
            insertElement: function(a) { this.fire("insertElement", a) },
            getSelectedHtml: function(a) {
                var b = this.editable(),
                    c = this.getSelection(),
                    c = c && c.getRanges();
                if (!b || !c || 0 === c.length) return null;
                for (var d = new CKEDITOR.dom.documentFragment, e, l, q, n = 0; n < c.length; n++) {
                    var f = c[n],
                        g = f.startContainer;
                    g.getName && "tr" == g.getName() ? (e || (e = g.getAscendant("table").clone(), e.append(g.getAscendant("tbody").clone()), d.append(e), e = e.findOne("tbody")), l && l.equals(g) || (l = g, q = g.clone(), e.append(q)), q.append(f.cloneContents())) : d.append(f.cloneContents()) }
                b = e ? d : b.getHtmlFromRange(c[0]);
                return a ? b.getHtml() : b
            },
            extractSelectedHtml: function(a, b) {
                var c = this.editable(),
                    d = this.getSelection().getRanges();
                if (!c || 0 ===
                    d.length) return null;
                d = d[0];
                c = c.extractHtmlFromRange(d, b);
                b || this.getSelection().selectRanges([d]);
                return a ? c.getHtml() : c
            },
            focus: function() { this.fire("beforeFocus") },
            checkDirty: function() {
                return "ready" == this.status && this._.previousValue !== this.getSnapshot() },
            resetDirty: function() { this._.previousValue = this.getSnapshot() },
            updateElement: function() {
                return u.call(this) },
            setKeystroke: function() {
                for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [
                        [].slice.call(arguments,
                            0)
                    ], c, d, e = b.length; e--;) c = b[e], d = 0, CKEDITOR.tools.isArray(c) && (d = c[1], c = c[0]), d ? a[c] = d : delete a[c]
            },
            getCommandKeystroke: function(a) {
                var b = a.name,
                    c = this.keystrokeHandler.keystrokes,
                    d;
                if (a.fakeKeystroke) return a.fakeKeystroke;
                for (d in c)
                    if (c.hasOwnProperty(d) && c[d] == b) return d;
                return null },
            addFeature: function(a) {
                return this.filter.addFeature(a) },
            setActiveFilter: function(a) {
                a || (a = this.filter);
                this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), a === this.filter ? this.setActiveEnterMode(null,
                    null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0)))
            },
            setActiveEnterMode: function(a, b) { a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode;
                b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode;
                if (this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange") },
            showNotification: function(a) { alert(a) }
        })
    })();
    CKEDITOR.ELEMENT_MODE_NONE = 0;
    CKEDITOR.ELEMENT_MODE_REPLACE = 1;
    CKEDITOR.ELEMENT_MODE_APPENDTO = 2;
    CKEDITOR.ELEMENT_MODE_INLINE = 3;
    CKEDITOR.htmlParser = function() { this._ = { htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g } };
    (function() {
        var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
            d = { checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1 };
        CKEDITOR.htmlParser.prototype = {
            onTagOpen: function() {},
            onTagClose: function() {},
            onText: function() {},
            onCDATA: function() {},
            onComment: function() {},
            parse: function(b) {
                for (var c, e, g = 0, k; c = this._.htmlPartsRegex.exec(b);) {
                    e = c.index;
                    if (e > g)
                        if (g = b.substring(g, e), k) k.push(g);
                        else this.onText(g);
                    g = this._.htmlPartsRegex.lastIndex;
                    if (e = c[1])
                        if (e = e.toLowerCase(), k && CKEDITOR.dtd.$cdata[e] && (this.onCDATA(k.join("")), k = null), !k) { this.onTagClose(e);
                            continue }
                    if (k) k.push(c[0]);
                    else if (e = c[3]) {
                        if (e = e.toLowerCase(), !/="/.test(e)) {
                            var h = {},
                                p, r = c[4];
                            c = !!c[5];
                            if (r)
                                for (; p = a.exec(r);) {
                                    var f = p[1].toLowerCase();
                                    p = p[2] || p[3] || p[4] || "";
                                    h[f] = !p && d[f] ? f : CKEDITOR.tools.htmlDecodeAttr(p) }
                            this.onTagOpen(e, h, c);!k && CKEDITOR.dtd.$cdata[e] && (k = []) } } else if (e = c[2]) this.onComment(e)
                }
                if (b.length > g) this.onText(b.substring(g,
                    b.length))
            }
        }
    })();
    CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
        $: function() { this._ = { output: [] } },
        proto: {
            openTag: function(a) { this._.output.push("\x3c", a) },
            openTagClose: function(a, d) { d ? this._.output.push(" /\x3e") : this._.output.push("\x3e") },
            attribute: function(a, d) { "string" == typeof d && (d = CKEDITOR.tools.htmlEncodeAttr(d));
                this._.output.push(" ", a, '\x3d"', d, '"') },
            closeTag: function(a) { this._.output.push("\x3c/", a, "\x3e") },
            text: function(a) { this._.output.push(a) },
            comment: function(a) {
                this._.output.push("\x3c!--", a,
                    "--\x3e")
            },
            write: function(a) { this._.output.push(a) },
            reset: function() { this._.output = [];
                this._.indent = !1 },
            getHtml: function(a) {
                var d = this._.output.join("");
                a && this.reset();
                return d }
        }
    });
    "use strict";
    (function() {
        CKEDITOR.htmlParser.node = function() {};
        CKEDITOR.htmlParser.node.prototype = {
            remove: function() {
                var a = this.parent.children,
                    d = CKEDITOR.tools.indexOf(a, this),
                    b = this.previous,
                    c = this.next;
                b && (b.next = c);
                c && (c.previous = b);
                a.splice(d, 1);
                this.parent = null },
            replaceWith: function(a) {
                var d = this.parent.children,
                    b = CKEDITOR.tools.indexOf(d, this),
                    c = a.previous = this.previous,
                    e = a.next = this.next;
                c && (c.next = a);
                e && (e.previous = a);
                d[b] = a;
                a.parent = this.parent;
                this.parent = null },
            insertAfter: function(a) {
                var d = a.parent.children,
                    b = CKEDITOR.tools.indexOf(d, a),
                    c = a.next;
                d.splice(b + 1, 0, this);
                this.next = a.next;
                this.previous = a;
                a.next = this;
                c && (c.previous = this);
                this.parent = a.parent
            },
            insertBefore: function(a) {
                var d = a.parent.children,
                    b = CKEDITOR.tools.indexOf(d, a);
                d.splice(b, 0, this);
                this.next = a;
                (this.previous = a.previous) && (a.previous.next = this);
                a.previous = this;
                this.parent = a.parent },
            getAscendant: function(a) {
                var d = "function" == typeof a ? a : "string" == typeof a ? function(b) {
                        return b.name == a } : function(b) {
                        return b.name in a },
                    b = this.parent;
                for (; b &&
                    b.type == CKEDITOR.NODE_ELEMENT;) {
                    if (d(b)) return b;
                    b = b.parent }
                return null
            },
            wrapWith: function(a) { this.replaceWith(a);
                a.add(this);
                return a },
            getIndex: function() {
                return CKEDITOR.tools.indexOf(this.parent.children, this) },
            getFilterContext: function(a) {
                return a || {} }
        }
    })();
    "use strict";
    CKEDITOR.htmlParser.comment = function(a) { this.value = a;
        this._ = { isBlockLike: !1 } };
    CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_COMMENT, filter: function(a, d) {
            var b = this.value;
            if (!(b = a.onComment(d, b, this))) return this.remove(), !1;
            if ("string" != typeof b) return this.replaceWith(b), !1;
            this.value = b;
            return !0 }, writeHtml: function(a, d) { d && this.filter(d);
            a.comment(this.value) } });
    "use strict";
    (function() { CKEDITOR.htmlParser.text = function(a) { this.value = a;
            this._ = { isBlockLike: !1 } };
        CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function(a, d) {
                if (!(this.value = a.onText(d, this.value, this))) return this.remove(), !1 }, writeHtml: function(a, d) { d && this.filter(d);
                a.text(this.value) } }) })();
    "use strict";
    (function() { CKEDITOR.htmlParser.cdata = function(a) { this.value = a };
        CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function() {}, writeHtml: function(a) { a.write(this.value) } }) })();
    "use strict";
    CKEDITOR.htmlParser.fragment = function() { this.children = [];
        this.parent = null;
        this._ = { isBlockLike: !0, hasInlineStarted: !1 } };
    (function() {
        function a(a) {
            return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name] }
        var d = CKEDITOR.tools.extend({ table: 1, ul: 1, ol: 1, dl: 1 }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl),
            b = { ol: 1, ul: 1 },
            c = CKEDITOR.tools.extend({}, { html: 1 }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, { style: 1, script: 1 }),
            e = { ul: "li", ol: "li", dl: "dd", table: "tbody", tbody: "tr", thead: "tr", tfoot: "tr", tr: "td" };
        CKEDITOR.htmlParser.fragment.fromHtml =
            function(g, k, h) {
                function p(a) {
                    var b;
                    if (0 < x.length)
                        for (var c = 0; c < x.length; c++) {
                            var d = x[c],
                                l = d.name,
                                e = CKEDITOR.dtd[l],
                                f = w.name && CKEDITOR.dtd[w.name];
                            f && !f[l] || a && e && !e[a] && CKEDITOR.dtd[a] ? l == w.name && (B(w, w.parent, 1), c--) : (b || (r(), b = 1), d = d.clone(), d.parent = w, w = d, x.splice(c, 1), c--) } }

                function r() {
                    for (; J.length;) B(J.shift(), w) }

                function f(a) {
                    if (a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
                        var b = a.children.length,
                            c = a.children[b - 1],
                            d;
                        c && c.type == CKEDITOR.NODE_TEXT && ((d = CKEDITOR.tools.rtrim(c.value)) ?
                            c.value = d : a.children.length = b - 1)
                    }
                }

                function B(b, c, d) { c = c || w || m;
                    var e = w;
                    void 0 === b.previous && (u(c, b) && (w = c, y.onTagOpen(h, {}), b.returnPoint = c = w), f(b), a(b) && !b.children.length || c.add(b), "pre" == b.name && (l = !1), "textarea" == b.name && (F = !1));
                    b.returnPoint ? (w = b.returnPoint, delete b.returnPoint) : w = d ? c : e }

                function u(a, b) {
                    if ((a == m || "body" == a.name) && h && (!a.name || CKEDITOR.dtd[a.name][h])) {
                        var c, d;
                        return (c = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ? d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) &&
                            !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                    }
                }

                function z(a, b) {
                    return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1 }
                var y = new CKEDITOR.htmlParser,
                    m = k instanceof CKEDITOR.htmlParser.element ? k : "string" == typeof k ? new CKEDITOR.htmlParser.element(k) : new CKEDITOR.htmlParser.fragment,
                    x = [],
                    J = [],
                    w = m,
                    F = "textarea" == m.name,
                    l = "pre" == m.name;
                y.onTagOpen = function(e, n, f, g) {
                    n = new CKEDITOR.htmlParser.element(e, n);
                    n.isUnknown && f && (n.isEmpty = !0);
                    n.isOptionalClose = g;
                    if (a(n)) x.push(n);
                    else {
                        if ("pre" == e) l = !0;
                        else {
                            if ("br" == e && l) { w.add(new CKEDITOR.htmlParser.text("\n"));
                                return } "textarea" == e && (F = !0) }
                        if ("br" == e) J.push(n);
                        else {
                            for (; !(g = (f = w.name) ? CKEDITOR.dtd[f] || (w._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c, n.isUnknown || w.isUnknown || g[e]);)
                                if (w.isOptionalClose) y.onTagClose(f);
                                else if (e in b && f in b) f = w.children, (f = f[f.length - 1]) && "li" == f.name || B(f = new CKEDITOR.htmlParser.element("li"), w), !n.returnPoint && (n.returnPoint = w), w = f;
                            else if (e in CKEDITOR.dtd.$listItem &&
                                !z(e, f)) y.onTagOpen("li" == e ? "ul" : "dl", {}, 0, 1);
                            else if (f in d && !z(e, f)) !n.returnPoint && (n.returnPoint = w), w = w.parent;
                            else if (f in CKEDITOR.dtd.$inline && x.unshift(w), w.parent) B(w, w.parent, 1);
                            else { n.isOrphan = 1;
                                break }
                            p(e);
                            r();
                            n.parent = w;
                            n.isEmpty ? B(n) : w = n
                        }
                    }
                };
                y.onTagClose = function(a) {
                    for (var b = x.length - 1; 0 <= b; b--)
                        if (a == x[b].name) { x.splice(b, 1);
                            return }
                    for (var c = [], d = [], l = w; l != m && l.name != a;) l._.isBlockLike || d.unshift(l), c.push(l), l = l.returnPoint || l.parent;
                    if (l != m) {
                        for (b = 0; b < c.length; b++) {
                            var e = c[b];
                            B(e, e.parent) }
                        w =
                            l;
                        l._.isBlockLike && r();
                        B(l, l.parent);
                        l == w && (w = w.parent);
                        x = x.concat(d)
                    }
                    "body" == a && (h = !1)
                };
                y.onText = function(a) {
                    if (!(w._.hasInlineStarted && !J.length || l || F) && (a = CKEDITOR.tools.ltrim(a), 0 === a.length)) return;
                    var b = w.name,
                        f = b ? CKEDITOR.dtd[b] || (w._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c;
                    if (!F && !f["#"] && b in d) y.onTagOpen(e[b] || ""), y.onText(a);
                    else { r();
                        p();
                        l || F || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
                        a = new CKEDITOR.htmlParser.text(a);
                        if (u(w, a)) this.onTagOpen(h, {}, 0, 1);
                        w.add(a) } };
                y.onCDATA =
                    function(a) { w.add(new CKEDITOR.htmlParser.cdata(a)) };
                y.onComment = function(a) { r();
                    p();
                    w.add(new CKEDITOR.htmlParser.comment(a)) };
                y.parse(g);
                for (r(); w != m;) B(w, w.parent, 1);
                f(m);
                return m
            };
        CKEDITOR.htmlParser.fragment.prototype = {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
            add: function(a, b) {
                isNaN(b) && (b = this.children.length);
                var c = 0 < b ? this.children[b - 1] : null;
                if (c) {
                    if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value), 0 === c.value.length)) { this.children.pop();
                        this.add(a);
                        return }
                    c.next =
                        a
                }
                a.previous = c;
                a.parent = this;
                this.children.splice(b, 0, a);
                this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
            },
            filter: function(a, b) { b = this.getFilterContext(b);
                a.onRoot(b, this);
                this.filterChildren(a, !1, b) },
            filterChildren: function(a, b, c) {
                if (this.childrenFilteredBy != a.id) {
                    c = this.getFilterContext(c);
                    if (b && !this.parent) a.onRoot(c, this);
                    this.childrenFilteredBy = a.id;
                    for (b = 0; b < this.children.length; b++) !1 === this.children[b].filter(a,
                        c) && b--
                }
            },
            writeHtml: function(a, b) { b && this.filter(b);
                this.writeChildrenHtml(a) },
            writeChildrenHtml: function(a, b, c) {
                var d = this.getFilterContext();
                if (c && !this.parent && b) b.onRoot(d, this);
                b && this.filterChildren(b, !1, d);
                b = 0;
                c = this.children;
                for (d = c.length; b < d; b++) c[b].writeHtml(a) },
            forEach: function(a, b, c) {
                if (!(c || b && this.type != b)) var d = a(this);
                if (!1 !== d) { c = this.children;
                    for (var e = 0; e < c.length; e++) d = c[e], d.type == CKEDITOR.NODE_ELEMENT ? d.forEach(a, b) : b && d.type != b || a(d) } },
            getFilterContext: function(a) {
                return a || {}
            }
        }
    })();
    "use strict";
    (function() {
        function a() { this.rules = [] }

        function d(b, c, d, g) {
            var k, h;
            for (k in c)(h = b[k]) || (h = b[k] = new a), h.add(c[k], d, g) }
        CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
            $: function(b) { this.id = CKEDITOR.tools.getNextNumber();
                this.elementNameRules = new a;
                this.attributeNameRules = new a;
                this.elementsRules = {};
                this.attributesRules = {};
                this.textRules = new a;
                this.commentRules = new a;
                this.rootRules = new a;
                b && this.addRules(b, 10) },
            proto: {
                addRules: function(a, c) {
                    var e;
                    "number" == typeof c ? e = c : c && "priority" in c && (e =
                        c.priority);
                    "number" != typeof e && (e = 10);
                    "object" != typeof c && (c = {});
                    a.elementNames && this.elementNameRules.addMany(a.elementNames, e, c);
                    a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, e, c);
                    a.elements && d(this.elementsRules, a.elements, e, c);
                    a.attributes && d(this.attributesRules, a.attributes, e, c);
                    a.text && this.textRules.add(a.text, e, c);
                    a.comment && this.commentRules.add(a.comment, e, c);
                    a.root && this.rootRules.add(a.root, e, c)
                },
                applyTo: function(a) { a.filter(this) },
                onElementName: function(a, c) {
                    return this.elementNameRules.execOnName(a,
                        c)
                },
                onAttributeName: function(a, c) {
                    return this.attributeNameRules.execOnName(a, c) },
                onText: function(a, c, d) {
                    return this.textRules.exec(a, c, d) },
                onComment: function(a, c, d) {
                    return this.commentRules.exec(a, c, d) },
                onRoot: function(a, c) {
                    return this.rootRules.exec(a, c) },
                onElement: function(a, c) {
                    for (var d = [this.elementsRules["^"], this.elementsRules[c.name], this.elementsRules.$], g, k = 0; 3 > k; k++)
                        if (g = d[k]) { g = g.exec(a, c, this);
                            if (!1 === g) return null;
                            if (g && g != c) return this.onNode(a, g);
                            if (c.parent && !c.name) break }
                    return c },
                onNode: function(a, c) {
                    var d = c.type;
                    return d == CKEDITOR.NODE_ELEMENT ? this.onElement(a, c) : d == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, c.value)) : d == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, c.value)) : null },
                onAttribute: function(a, c, d, g) {
                    return (d = this.attributesRules[d]) ? d.exec(a, g, c, this) : g }
            }
        });
        CKEDITOR.htmlParser.filterRulesGroup = a;
        a.prototype = {
            add: function(a, c, d) { this.rules.splice(this.findIndex(c), 0, { value: a, priority: c, options: d }) },
            addMany: function(a,
                c, d) {
                for (var g = [this.findIndex(c), 0], k = 0, h = a.length; k < h; k++) g.push({ value: a[k], priority: c, options: d });
                this.rules.splice.apply(this.rules, g) },
            findIndex: function(a) {
                for (var c = this.rules, d = c.length - 1; 0 <= d && a < c[d].priority;) d--;
                return d + 1 },
            exec: function(a, c) {
                var d = c instanceof CKEDITOR.htmlParser.node || c instanceof CKEDITOR.htmlParser.fragment,
                    g = Array.prototype.slice.call(arguments, 1),
                    k = this.rules,
                    h = k.length,
                    p, r, f, B;
                for (B = 0; B < h; B++)
                    if (d && (p = c.type, r = c.name), f = k[B], !(a.nonEditable && !f.options.applyToAll ||
                            a.nestedEditable && f.options.excludeNestedEditable)) { f = f.value.apply(null, g);
                        if (!1 === f || d && f && (f.name != r || f.type != p)) return f;
                        null != f && (g[0] = c = f) }
                return c
            },
            execOnName: function(a, c) {
                for (var d = 0, g = this.rules, k = g.length, h; c && d < k; d++) h = g[d], a.nonEditable && !h.options.applyToAll || a.nestedEditable && h.options.excludeNestedEditable || (c = c.replace(h.value[0], h.value[1]));
                return c }
        }
    })();
    (function() {
        function a(a, d) {
            function f(a) {
                return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", { "data-cke-bogus": 1 }) }

            function n(a, d) {
                return function(l) {
                    if (l.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var e = [],
                            n = b(l),
                            t, E;
                        if (n)
                            for (q(n, 1) && e.push(n); n;) g(n) && (t = c(n)) && q(t) && ((E = c(t)) && !g(E) ? e.push(t) : (f(v).insertAfter(t), t.remove())), n = n.previous;
                        for (n = 0; n < e.length; n++) e[n].remove();
                        if (e = !a || !1 !== ("function" == typeof d ? d(l) : d)) v || CKEDITOR.env.needsBrFiller ||
                            l.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ? v || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || l.name in CKEDITOR.dtd.tr || l.name in CKEDITOR.dtd.$listItem) ? (e = b(l), e = !e || "form" == l.name && "input" == e.name) : e = !1 : e = !1;
                        e && l.add(f(a))
                    }
                }
            }

            function q(a, b) {
                if ((!v || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0;
                var c;
                return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(x)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a),
                    a.value = c[0]), !CKEDITOR.env.needsBrFiller && v && (!b || a.parent.name in h) || !v && ((c = a.previous) && "br" == c.name || !c || g(c))) ? !0 : !1
            }
            var t = { elements: {} },
                v = "html" == d,
                h = CKEDITOR.tools.extend({}, l),
                A;
            for (A in h) "#" in w[A] || delete h[A];
            for (A in h) t.elements[A] = n(v, a.config.fillEmptyBlocks);
            t.root = n(v, !1);
            t.elements.br = function(a) {
                return function(b) {
                    if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var d = b.attributes;
                        if ("data-cke-bogus" in d || "data-cke-eol" in d) delete d["data-cke-bogus"];
                        else {
                            for (d = b.next; d && e(d);) d =
                                d.next;
                            var l = c(b);
                            !d && g(b.parent) ? k(b.parent, f(a)) : g(d) && l && !g(l) && f(a).insertBefore(d)
                        }
                    }
                }
            }(v);
            return t
        }

        function d(a, b) {
            return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 }

        function b(a) {
            for (a = a.children[a.children.length - 1]; a && e(a);) a = a.previous;
            return a }

        function c(a) {
            for (a = a.previous; a && e(a);) a = a.previous;
            return a }

        function e(a) {
            return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"] }

        function g(a) {
            return a &&
                (a.type == CKEDITOR.NODE_ELEMENT && a.name in l || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
        }

        function k(a, b) {
            var c = a.children[a.children.length - 1];
            a.children.push(b);
            b.parent = a;
            c && (c.next = b, b.previous = c) }

        function h(a) { a = a.attributes; "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
            a.contenteditable = "false" }

        function p(a) { a = a.attributes;
            switch (a["data-cke-editable"]) {
                case "true":
                    a.contenteditable = "true";
                    break;
                case "1":
                    delete a.contenteditable } }

        function r(a) {
            return a.replace(C,
                function(a, b, c) {
                    return "\x3c" + b + c.replace(D, function(a, b) {
                        return M.test(b) && -1 == c.indexOf("data-cke-saved-" + b) ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a }) + "\x3e" })
        }

        function f(a, b) {
            return a.replace(b, function(a, b, c) { 0 === a.indexOf("\x3ctextarea") && (a = b + z(c).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") + "\x3c/textarea\x3e");
                return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e" }) }

        function B(a) {
            return a.replace(Q, function(a, b) {
                return decodeURIComponent(b) }) }

        function u(a) {
            return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
                function(a) {
                    return "\x3c!--" + J + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e" })
        }

        function z(a) {
            return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function(a, b) {
                return decodeURIComponent(b) }) }

        function y(a, b) {
            var c = b._.dataStore;
            return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function(a, b) {
                return decodeURIComponent(b) }).replace(/\{cke_protected_(\d+)\}/g, function(a, b) {
                return c && c[b] || "" }) }

        function m(a, b) {
            var c = [],
                d = b.config.protectedSource,
                l = b._.dataStore || (b._.dataStore = { id: 1 }),
                e = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g,
                d = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(d);
            a = a.replace(/\x3c!--[\s\S]*?--\x3e/g, function(a) {
                return "\x3c!--{cke_tempcomment}" + (c.push(a) - 1) + "--\x3e" });
            for (var f = 0; f < d.length; f++) a = a.replace(d[f], function(a) { a = a.replace(e, function(a, b, d) {
                    return c[d] });
                return /cke_temp(comment)?/.test(a) ? a : "\x3c!--{cke_temp}" + (c.push(a) - 1) + "--\x3e" });
            a = a.replace(e, function(a, b, d) {
                return "\x3c!--" + J + (b ? "{C}" :
                    "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\x3e"
            });
            a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function(a) {
                return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function(a, b) { l[l.id] = decodeURIComponent(b);
                    return "{cke_protected_" + l.id++ + "}" }) });
            return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function(a, c, d, l) {
                return "\x3c" + c + d + "\x3e" + y(z(l), b) + "\x3c/" + c + "\x3e" })
        }
        CKEDITOR.htmlDataProcessor = function(b) {
            var c,
                l, e = this;
            this.editor = b;
            this.dataFilter = c = new CKEDITOR.htmlParser.filter;
            this.htmlFilter = l = new CKEDITOR.htmlParser.filter;
            this.writer = new CKEDITOR.htmlParser.basicWriter;
            c.addRules(q);
            c.addRules(n, { applyToAll: !0 });
            c.addRules(a(b, "data"), { applyToAll: !0 });
            l.addRules(t);
            l.addRules(A, { applyToAll: !0 });
            l.addRules(a(b, "html"), { applyToAll: !0 });
            b.on("toHtml", function(a) {
                a = a.data;
                var c = a.dataValue,
                    l, c = m(c, b),
                    c = f(c, R),
                    c = r(c),
                    c = f(c, H),
                    c = c.replace(P, "$1cke:$2"),
                    c = c.replace(G, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),
                    c = c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"),
                    c = c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2");
                l = a.context || b.editable().getName();
                var e;
                CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" == l && (l = "div", c = "\x3cpre\x3e" + c + "\x3c/pre\x3e", e = 1);
                l = b.document.createElement(l);
                l.setHtml("a" + c);
                c = l.getHtml().substr(1);
                c = c.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), "");
                e && (c = c.replace(/^<pre>|<\/pre>$/gi, ""));
                c = c.replace(v, "$1$2");
                c = B(c);
                c = z(c);
                l = !1 === a.fixForBody ? !1 :
                    d(a.enterMode, b.config.autoParagraph);
                c = CKEDITOR.htmlParser.fragment.fromHtml(c, a.context, l);
                l && (e = c, !e.children.length && CKEDITOR.dtd[e.name][l] && (l = new CKEDITOR.htmlParser.element(l), e.add(l)));
                a.dataValue = c
            }, null, null, 5);
            b.on("toHtml", function(a) { a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered") }, null, null, 6);
            b.on("toHtml", function(a) { a.data.dataValue.filterChildren(e.dataFilter, !0) }, null, null, 10);
            b.on("toHtml", function(a) {
                a = a.data;
                var b = a.dataValue,
                    c = new CKEDITOR.htmlParser.basicWriter;
                b.writeChildrenHtml(c);
                b = c.getHtml(!0);
                a.dataValue = u(b)
            }, null, null, 15);
            b.on("toDataFormat", function(a) {
                var c = a.data.dataValue;
                a.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, ""));
                a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, d(a.data.enterMode, b.config.autoParagraph)) }, null, null, 5);
            b.on("toDataFormat", function(a) { a.data.dataValue.filterChildren(e.htmlFilter, !0) }, null, null, 10);
            b.on("toDataFormat", function(a) {
                a.data.filter.applyTo(a.data.dataValue, !1, !0)
            }, null, null, 11);
            b.on("toDataFormat", function(a) {
                var c = a.data.dataValue,
                    d = e.writer;
                d.reset();
                c.writeChildrenHtml(d);
                c = d.getHtml(!0);
                c = z(c);
                c = y(c, b);
                a.data.dataValue = c }, null, null, 15)
        };
        CKEDITOR.htmlDataProcessor.prototype = {
            toHtml: function(a, b, c, d) {
                var l = this.editor,
                    e, f, n, q;
                b && "object" == typeof b ? (e = b.context, c = b.fixForBody, d = b.dontFilter, f = b.filter, n = b.enterMode, q = b.protectedWhitespaces) : e = b;
                e || null === e || (e = l.editable().getName());
                return l.fire("toHtml", {
                    dataValue: a,
                    context: e,
                    fixForBody: c,
                    dontFilter: d,
                    filter: f || l.filter,
                    enterMode: n || l.enterMode,
                    protectedWhitespaces: q
                }).dataValue
            },
            toDataFormat: function(a, b) {
                var c, d, l;
                b && (c = b.context, d = b.filter, l = b.enterMode);
                c || null === c || (c = this.editor.editable().getName());
                return this.editor.fire("toDataFormat", { dataValue: a, filter: d || this.editor.filter, context: c, enterMode: l || this.editor.enterMode }).dataValue }
        };
        var x = /(?:&nbsp;|\xa0)$/,
            J = "{cke_protected}",
            w = CKEDITOR.dtd,
            F = "caption colgroup col thead tfoot tbody".split(" "),
            l = CKEDITOR.tools.extend({}, w.$blockLimit,
                w.$block),
            q = { elements: { input: h, textarea: h } },
            n = { attributeNames: [
                    [/^on/, "data-cke-pa-on"],
                    [/^data-cke-expando$/, ""]
                ] },
            t = { elements: { embed: function(a) {
                        var b = a.parent;
                        if (b && "object" == b.name) {
                            var c = b.attributes.width,
                                b = b.attributes.height;
                            c && (a.attributes.width = c);
                            b && (a.attributes.height = b) } }, a: function(a) {
                        var b = a.attributes;
                        if (!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"])) return !1 } } },
            A = {
                elementNames: [
                    [/^cke:/, ""],
                    [/^\?xml:namespace$/, ""]
                ],
                attributeNames: [
                    [/^data-cke-(saved|pa)-/,
                        ""
                    ],
                    [/^data-cke-.*/, ""],
                    ["hidefocus", ""]
                ],
                elements: {
                    $: function(a) {
                        var b = a.attributes;
                        if (b) {
                            if (b["data-cke-temp"]) return !1;
                            for (var c = ["name", "href", "src"], d, l = 0; l < c.length; l++) d = "data-cke-saved-" + c[l], d in b && delete b[c[l]] }
                        return a },
                    table: function(a) {
                        a.children.slice(0).sort(function(a, b) {
                            var c, d;
                            a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(F, a.name), d = CKEDITOR.tools.indexOf(F, b.name)); - 1 < c && -1 < d && c != d || (c = a.parent ? a.getIndex() : -1, d = b.parent ? b.getIndex() : -1);
                            return c > d ?
                                1 : -1
                        })
                    },
                    param: function(a) { a.children = [];
                        a.isEmpty = !0;
                        return a },
                    span: function(a) { "Apple-style-span" == a.attributes["class"] && delete a.name },
                    html: function(a) { delete a.attributes.contenteditable;
                        delete a.attributes["class"] },
                    body: function(a) { delete a.attributes.spellcheck;
                        delete a.attributes.contenteditable },
                    style: function(a) {
                        var b = a.children[0];
                        b && b.value && (b.value = CKEDITOR.tools.trim(b.value));
                        a.attributes.type || (a.attributes.type = "text/css") },
                    title: function(a) {
                        var b = a.children[0];
                        !b && k(a, b = new CKEDITOR.htmlParser.text);
                        b.value = a.attributes["data-cke-title"] || ""
                    },
                    input: p,
                    textarea: p
                },
                attributes: { "class": function(a) {
                        return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1 } }
            };
        CKEDITOR.env.ie && (A.attributes.style = function(a) {
            return a.replace(/(^|;)([^\:]+)/g, function(a) {
                return a.toLowerCase() }) });
        var C = /<(a|area|img|input|source)\b([^>]*)>/gi,
            D = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,
            M = /^(href|src|name)$/i,
            H = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
            R = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,
            Q = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
            P = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
            v = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,
            G = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
    })();
    "use strict";
    CKEDITOR.htmlParser.element = function(a, d) { this.name = a;
        this.attributes = d || {};
        this.children = [];
        var b = a || "",
            c = b.match(/^cke:(.*)/);
        c && (b = c[1]);
        b = !!(CKEDITOR.dtd.$nonBodyContent[b] || CKEDITOR.dtd.$block[b] || CKEDITOR.dtd.$listItem[b] || CKEDITOR.dtd.$tableContent[b] || CKEDITOR.dtd.$nonEditable[b] || "br" == b);
        this.isEmpty = !!CKEDITOR.dtd.$empty[a];
        this.isUnknown = !CKEDITOR.dtd[a];
        this._ = { isBlockLike: b, hasInlineStarted: this.isEmpty || !b } };
    CKEDITOR.htmlParser.cssStyle = function(a) {
        var d = {};
        ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, c, e) { "font-family" == c && (e = e.replace(/["']/g, ""));
            d[c.toLowerCase()] = e });
        return {
            rules: d,
            populate: function(a) {
                var c = this.toString();
                c && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", c) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = c : a.style = c) },
            toString: function() {
                var a = [],
                    c;
                for (c in d) d[c] && a.push(c, ":", d[c], ";");
                return a.join("")
            }
        }
    };
    (function() {
        function a(a) {
            return function(b) {
                return b.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? b.name == a : b.name in a) } }
        var d = function(a, b) { a = a[0];
                b = b[0];
                return a < b ? -1 : a > b ? 1 : 0 },
            b = CKEDITOR.htmlParser.fragment.prototype;
        CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_ELEMENT,
            add: b.add,
            clone: function() {
                return new CKEDITOR.htmlParser.element(this.name, this.attributes) },
            filter: function(a, b) {
                var d = this,
                    k, h;
                b = d.getFilterContext(b);
                if (b.off) return !0;
                if (!d.parent) a.onRoot(b, d);
                for (;;) { k = d.name;
                    if (!(h = a.onElementName(b, k))) return this.remove(), !1;
                    d.name = h;
                    if (!(d = a.onElement(b, d))) return this.remove(), !1;
                    if (d !== this) return this.replaceWith(d), !1;
                    if (d.name == k) break;
                    if (d.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(d), !1;
                    if (!d.name) return this.replaceWithChildren(), !1 }
                k = d.attributes;
                var p, r;
                for (p in k) {
                    for (h = k[p];;)
                        if (r = a.onAttributeName(b, p))
                            if (r != p) delete k[p], p = r;
                            else break;
                    else { delete k[p];
                        break }
                    r && (!1 === (h = a.onAttribute(b, d, r, h)) ? delete k[r] :
                        k[r] = h)
                }
                d.isEmpty || this.filterChildren(a, !1, b);
                return !0
            },
            filterChildren: b.filterChildren,
            writeHtml: function(a, b) { b && this.filter(b);
                var g = this.name,
                    k = [],
                    h = this.attributes,
                    p, r;
                a.openTag(g, h);
                for (p in h) k.push([p, h[p]]);
                a.sortAttributes && k.sort(d);
                p = 0;
                for (r = k.length; p < r; p++) h = k[p], a.attribute(h[0], h[1]);
                a.openTagClose(g, this.isEmpty);
                this.writeChildrenHtml(a);
                this.isEmpty || a.closeTag(g) },
            writeChildrenHtml: b.writeChildrenHtml,
            replaceWithChildren: function() {
                for (var a = this.children, b = a.length; b;) a[--b].insertAfter(this);
                this.remove()
            },
            forEach: b.forEach,
            getFirst: function(b) {
                if (!b) return this.children.length ? this.children[0] : null; "function" != typeof b && (b = a(b));
                for (var d = 0, g = this.children.length; d < g; ++d)
                    if (b(this.children[d])) return this.children[d];
                return null },
            getHtml: function() {
                var a = new CKEDITOR.htmlParser.basicWriter;
                this.writeChildrenHtml(a);
                return a.getHtml() },
            setHtml: function(a) { a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children;
                for (var b = 0, d = a.length; b < d; ++b) a[b].parent = this },
            getOuterHtml: function() {
                var a =
                    new CKEDITOR.htmlParser.basicWriter;
                this.writeHtml(a);
                return a.getHtml()
            },
            split: function(a) {
                for (var b = this.children.splice(a, this.children.length - a), d = this.clone(), k = 0; k < b.length; ++k) b[k].parent = d;
                d.children = b;
                b[0] && (b[0].previous = null);
                0 < a && (this.children[a - 1].next = null);
                this.parent.add(d, this.getIndex() + 1);
                return d },
            find: function(a, b) {
                void 0 === b && (b = !1);
                var d = [],
                    k;
                for (k = 0; k < this.children.length; k++) {
                    var h = this.children[k];
                    "function" == typeof a && a(h) ? d.push(h) : "string" == typeof a && h.name === a && d.push(h);
                    b && h.find && (d = d.concat(h.find(a, b)))
                }
                return d
            },
            addClass: function(a) {
                if (!this.hasClass(a)) {
                    var b = this.attributes["class"] || "";
                    this.attributes["class"] = b + (b ? " " : "") + a } },
            removeClass: function(a) {
                var b = this.attributes["class"];
                b && ((b = CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"]) },
            hasClass: function(a) {
                var b = this.attributes["class"];
                return b ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(b) : !1 },
            getFilterContext: function(a) {
                var b = [];
                a || (a = { off: !1, nonEditable: !1, nestedEditable: !1 });
                a.off || "off" != this.attributes["data-cke-processor"] || b.push("off", !0);
                a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable && !a.nestedEditable && "true" == this.attributes.contenteditable && b.push("nestedEditable", !0) : b.push("nonEditable", !0);
                if (b.length) { a = CKEDITOR.tools.copy(a);
                    for (var d = 0; d < b.length; d += 2) a[b[d]] = b[d + 1] }
                return a
            }
        }, !0)
    })();
    (function() {
        var a = {},
            d = /{([^}]+)}/g,
            b = /([\\'])/g,
            c = /\n/g,
            e = /\r/g;
        CKEDITOR.template = function(g) {
            if (a[g]) this.output = a[g];
            else {
                var k = g.replace(b, "\\$1").replace(c, "\\n").replace(e, "\\r").replace(d, function(a, b) {
                    return "',data['" + b + "']\x3d\x3dundefined?'{" + b + "}':data['" + b + "'],'" });
                this.output = a[g] = Function("data", "buffer", "return buffer?buffer.push('" + k + "'):['" + k + "'].join('');") } } })();
    delete CKEDITOR.loadFullCore;
    CKEDITOR.instances = {};
    CKEDITOR.document = new CKEDITOR.dom.document(document);
    CKEDITOR.add = function(a) { CKEDITOR.instances[a.name] = a;
        a.on("focus", function() { CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance = a, CKEDITOR.fire("currentInstance")) });
        a.on("blur", function() { CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance")) });
        CKEDITOR.fire("instance", null, a) };
    CKEDITOR.remove = function(a) { delete CKEDITOR.instances[a.name] };
    (function() {
        var a = {};
        CKEDITOR.addTemplate = function(d, b) {
            var c = a[d];
            if (c) return c;
            c = { name: d, source: b };
            CKEDITOR.fire("template", c);
            return a[d] = new CKEDITOR.template(c.source) };
        CKEDITOR.getTemplate = function(d) {
            return a[d] } })();
    (function() {
        var a = [];
        CKEDITOR.addCss = function(d) { a.push(d) };
        CKEDITOR.getCss = function() {
            return a.join("\n") } })();
    CKEDITOR.on("instanceDestroyed", function() { CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset") });
    CKEDITOR.TRISTATE_ON = 1;
    CKEDITOR.TRISTATE_OFF = 2;
    CKEDITOR.TRISTATE_DISABLED = 0;
    (function() {
        CKEDITOR.inline = function(a, d) {
            if (!CKEDITOR.env.isCompatible) return null;
            a = CKEDITOR.dom.element.get(a);
            if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
            var b = new CKEDITOR.editor(d, a, CKEDITOR.ELEMENT_MODE_INLINE),
                c = a.is("textarea") ? a : null;
            c ? (b.setData(c.getValue(), null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' + !!b.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + c.getValue() + "\x3c/div\x3e", CKEDITOR.document),
                a.insertAfter(c), c.hide(), c.$.form && b._attachToForm()) : b.setData(a.getHtml(), null, !0);
            b.on("loaded", function() { b.fire("uiReady");
                b.editable(a);
                b.container = a;
                b.ui.contentsElement = a;
                b.setData(b.getData(1));
                b.resetDirty();
                b.fire("contentDom");
                b.mode = "wysiwyg";
                b.fire("mode");
                b.status = "ready";
                b.fireOnce("instanceReady");
                CKEDITOR.fire("instanceReady", null, b) }, null, null, 1E4);
            b.on("destroy", function() { c && (b.container.clearCustomData(), b.container.remove(), c.show());
                b.element.clearCustomData();
                delete b.element });
            return b
        };
        CKEDITOR.inlineAll = function() {
            var a, d, b;
            for (b in CKEDITOR.dtd.$editable)
                for (var c = CKEDITOR.document.getElementsByTag(b), e = 0, g = c.count(); e < g; e++) a = c.getItem(e), "true" == a.getAttribute("contenteditable") && (d = { element: a, config: {} }, !1 !== CKEDITOR.fire("inline", d) && CKEDITOR.inline(a, d.config)) };
        CKEDITOR.domReady(function() {!CKEDITOR.disableAutoInline && CKEDITOR.inlineAll() })
    })();
    CKEDITOR.replaceClass = "ckeditor";
    (function() {
        function a(a, e, g, k) {
            if (!CKEDITOR.env.isCompatible) return null;
            a = CKEDITOR.dom.element.get(a);
            if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
            var h = new CKEDITOR.editor(e, a, k);
            k == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), h._.required = a.hasAttribute("required"), a.removeAttribute("required"));
            g && h.setData(g, null, !0);
            h.on("loaded", function() {
                b(h);
                k == CKEDITOR.ELEMENT_MODE_REPLACE && h.config.autoUpdateElement &&
                    a.$.form && h._attachToForm();
                h.setMode(h.config.startupMode, function() { h.resetDirty();
                    h.status = "ready";
                    h.fireOnce("instanceReady");
                    CKEDITOR.fire("instanceReady", null, h) })
            });
            h.on("destroy", d);
            return h
        }

        function d() {
            var a = this.container,
                b = this.element;
            a && (a.clearCustomData(), a.remove());
            b && (b.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (b.show(), this._.required && b.setAttribute("required", "required")), delete this.element) }

        function b(a) {
            var b = a.name,
                d = a.element,
                k = a.elementMode,
                h =
                a.fire("uiSpace", { space: "top", html: "" }).html,
                p = a.fire("uiSpace", { space: "bottom", html: "" }).html,
                r = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : "") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
                b = CKEDITOR.dom.element.createFromHtml(r.output({ id: a.id, name: b, langDir: a.lang.dir, langCode: a.langCode, voiceLabel: a.title, topHtml: h ? '\x3cspan id\x3d"' + a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + h + "\x3c/span\x3e" : "", contentId: a.ui.spaceId("contents"), bottomHtml: p ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + p + "\x3c/span\x3e" : "", outerEl: CKEDITOR.env.ie ? "span" : "div" }));
            k == CKEDITOR.ELEMENT_MODE_REPLACE ?
                (d.hide(), b.insertAfter(d)) : d.append(b);
            a.container = b;
            a.ui.contentsElement = a.ui.space("contents");
            h && a.ui.space("top").unselectable();
            p && a.ui.space("bottom").unselectable();
            d = a.config.width;
            k = a.config.height;
            d && b.setStyle("width", CKEDITOR.tools.cssLength(d));
            k && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(k));
            b.disableContextMenu();
            CKEDITOR.env.webkit && b.on("focus", function() { a.focus() });
            a.fireOnce("uiReady")
        }
        CKEDITOR.replace = function(b, d) {
            return a(b, d, null, CKEDITOR.ELEMENT_MODE_REPLACE) };
        CKEDITOR.appendTo = function(b, d, g) {
            return a(b, d, g, CKEDITOR.ELEMENT_MODE_APPENDTO) };
        CKEDITOR.replaceAll = function() {
            for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) {
                var d = null,
                    k = a[b];
                if (k.name || k.id) {
                    if ("string" == typeof arguments[0]) {
                        if (!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(k.className)) continue } else if ("function" == typeof arguments[0] && (d = {}, !1 === arguments[0](k, d))) continue;
                    this.replace(k, d) } } };
        CKEDITOR.editor.prototype.addMode = function(a, b) {
            (this._.modes || (this._.modes = {}))[a] = b
        };
        CKEDITOR.editor.prototype.setMode = function(a, b) {
            var d = this,
                k = this._.modes;
            if (a != d.mode && k && k[a]) {
                d.fire("beforeSetMode", a);
                if (d.mode) {
                    var h = d.checkDirty(),
                        k = d._.previousModeData,
                        p, r = 0;
                    d.fire("beforeModeUnload");
                    d.editable(0);
                    d._.previousMode = d.mode;
                    d._.previousModeData = p = d.getData(1); "source" == d.mode && k == p && (d.fire("lockSnapshot", { forceUpdate: !0 }), r = 1);
                    d.ui.space("contents").setHtml("");
                    d.mode = "" } else d._.previousModeData = d.getData(1);
                this._.modes[a](function() {
                    d.mode = a;
                    void 0 !== h && !h &&
                        d.resetDirty();
                    r ? d.fire("unlockSnapshot") : "wysiwyg" == a && d.fire("saveSnapshot");
                    setTimeout(function() { d.fire("mode");
                        b && b.call(d) }, 0)
                })
            }
        };
        CKEDITOR.editor.prototype.resize = function(a, b, d, k) {
            var h = this.container,
                p = this.ui.space("contents"),
                r = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement;
            k = k ? this.container.getFirst(function(a) {
                return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }) : h;
            k.setSize("width", a, !0);
            r && (r.style.width = "1%");
            var f = (k.$.offsetHeight || 0) - (p.$.clientHeight ||
                    0),
                h = Math.max(b - (d ? 0 : f), 0);
            b = d ? b + f : b;
            p.setStyle("height", h + "px");
            r && (r.style.width = "100%");
            this.fire("resize", { outerHeight: b, contentsHeight: h, outerWidth: a || k.getSize("width") })
        };
        CKEDITOR.editor.prototype.getResizable = function(a) {
            return a ? this.ui.space("contents") : this.container };
        CKEDITOR.domReady(function() { CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass) })
    })();
    CKEDITOR.config.startupMode = "wysiwyg";
    (function() {
        function a(a) {
            var b = a.editor,
                e = a.data.path,
                f = e.blockLimit,
                g = a.data.selection,
                h = g.getRanges()[0],
                D;
            if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller)
                if (g = d(g, e)) g.appendBogus(), D = CKEDITOR.env.ie;
            k(b, e.block, f) && h.collapsed && !h.getCommonAncestor().isReadOnly() && (e = h.clone(), e.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), f = new CKEDITOR.dom.walker(e), f.guard = function(a) {
                    return !c(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly() }, !f.checkForward() || e.checkStartOfBlock() && e.checkEndOfBlock()) &&
                (b = h.fixBlock(!0, b.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller || (b = b.getFirst(c)) && b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/) && b.remove(), D = 1, a.cancel());
            D && h.select()
        }

        function d(a, b) {
            if (a.isFake) return 0;
            var d = b.block || b.blockLimit,
                e = d && d.getLast(c);
            if (!(!d || !d.isBlockBoundary() || e && e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary() || d.is("pre") || d.getBogus())) return d }

        function b(a) {
            var b = a.data.getTarget();
            b.is("input") &&
                (b = b.getAttribute("type"), "submit" != b && "reset" != b || a.data.preventDefault())
        }

        function c(a) {
            return f(a) && B(a) }

        function e(a, b) {
            return function(c) {
                var d = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget;
                (d = d && d.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(d) : null) && (b.equals(d) || b.contains(d)) || a.call(this, c) } }

        function g(a) {
            function b(a) {
                return function(b, l) { l && b.type == CKEDITOR.NODE_ELEMENT && b.is(f) && (d = b);
                    if (!(l || !c(b) || a && z(b))) return !1 } }
            var d, e = a.getRanges()[0];
            a = a.root;
            var f = { table: 1, ul: 1, ol: 1, dl: 1 };
            if (e.startPath().contains(f)) {
                var g = e.clone();
                g.collapse(1);
                g.setStartAt(a, CKEDITOR.POSITION_AFTER_START);
                a = new CKEDITOR.dom.walker(g);
                a.guard = b();
                a.checkBackward();
                if (d) return g = e.clone(), g.collapse(), g.setEndAt(d, CKEDITOR.POSITION_AFTER_END), a = new CKEDITOR.dom.walker(g), a.guard = b(!0), d = !1, a.checkForward(), d }
            return null
        }

        function k(a, b, c) {
            return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && "true" == b.getAttribute("contenteditable")) }

        function h(a) {
            return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ? a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 }

        function p(a) {
            var b = a.editor;
            b.getSelection().scrollIntoView();
            setTimeout(function() { b.fire("saveSnapshot") }, 0) }

        function r(a, b, c) {
            var d = a.getCommonAncestor(b);
            for (b = a = c ? b : a;
                (a = a.getParent()) && !d.equals(a) && 1 == a.getChildCount();) b = a;
            b.remove() }
        var f, B, u, z, y, m, x, J, w, F;
        CKEDITOR.editable = CKEDITOR.tools.createClass({
            base: CKEDITOR.dom.element,
            $: function(a, b) {
                this.base(b.$ ||
                    b);
                this.editor = a;
                this.status = "unloaded";
                this.hasFocus = !1;
                this.setup()
            },
            proto: {
                focus: function() {
                    var a;
                    if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) { a.focus();
                        return }
                    CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop);
                    try {
                        !CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document) ?
                            this.$.focus() : this.$.setActive()
                    } catch (b) {
                        if (!CKEDITOR.env.ie) throw b; }
                    CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
                },
                on: function(a, b) {
                    var c = Array.prototype.slice.call(arguments, 0);
                    CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", b = e(b, this), c[0] = a, c[1] = b);
                    return CKEDITOR.dom.element.prototype.on.apply(this, c) },
                attachListener: function(a) {
                    !this._.listeners && (this._.listeners = []);
                    var b =
                        Array.prototype.slice.call(arguments, 1),
                        b = a.on.apply(a, b);
                    this._.listeners.push(b);
                    return b
                },
                clearListeners: function() {
                    var a = this._.listeners;
                    try {
                        for (; a.length;) a.pop().removeListener() } catch (b) {} },
                restoreAttrs: function() {
                    var a = this._.attrChanges,
                        b, c;
                    for (c in a) a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c, b) : this.removeAttribute(c)) },
                attachClass: function(a) {
                    var b = this.getCustomData("classes");
                    this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes", b), this.addClass(a)) },
                changeAttr: function(a,
                    b) {
                    var c = this.getAttribute(a);
                    b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), this.setAttribute(a, b)) },
                insertText: function(a) { this.editor.focus();
                    this.insertHtml(this.transformPlainTextToHtml(a), "text") },
                transformPlainTextToHtml: function(a) {
                    var b = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode;
                    return CKEDITOR.tools.transformPlainTextToHtml(a, b) },
                insertHtml: function(a, b, c) {
                    var d =
                        this.editor;
                    d.focus();
                    d.fire("saveSnapshot");
                    c || (c = d.getSelection().getRanges()[0]);
                    m(this, b || "html", a, c);
                    c.select();
                    p(this);
                    this.editor.fire("afterInsertHtml", {})
                },
                insertHtmlIntoRange: function(a, b, c) { m(this, c || "html", a, b);
                    this.editor.fire("afterInsertHtml", { intoRange: b }) },
                insertElement: function(a, b) {
                    var d = this.editor;
                    d.focus();
                    d.fire("saveSnapshot");
                    var e = d.activeEnterMode,
                        d = d.getSelection(),
                        f = a.getName(),
                        f = CKEDITOR.dtd.$block[f];
                    b || (b = d.getRanges()[0]);
                    this.insertElementIntoRange(a, b) && (b.moveToPosition(a,
                        CKEDITOR.POSITION_AFTER_END), f && ((f = a.getNext(function(a) {
                        return c(a) && !z(a) })) && f.type == CKEDITOR.NODE_ELEMENT && f.is(CKEDITOR.dtd.$block) ? f.getDtd()["#"] ? b.moveToElementEditStart(f) : b.moveToElementEditEnd(a) : f || e == CKEDITOR.ENTER_BR || (f = b.fixBlock(!0, e == CKEDITOR.ENTER_DIV ? "div" : "p"), b.moveToElementEditStart(f))));
                    d.selectRanges([b]);
                    p(this)
                },
                insertElementIntoSelection: function(a) { this.insertElement(a) },
                insertElementIntoRange: function(a, b) {
                    var c = this.editor,
                        d = c.config.enterMode,
                        e = a.getName(),
                        f = CKEDITOR.dtd.$block[e];
                    if (b.checkReadOnly()) return !1;
                    b.deleteContents(1);
                    b.startContainer.type == CKEDITOR.NODE_ELEMENT && (b.startContainer.is({ tr: 1, table: 1, tbody: 1, thead: 1, tfoot: 1 }) ? x(b) : b.startContainer.is(CKEDITOR.dtd.$list) && J(b));
                    var g, k;
                    if (f)
                        for (;
                            (g = b.getCommonAncestor(0, 1)) && (k = CKEDITOR.dtd[g.getName()]) && (!k || !k[e]);) g.getName() in CKEDITOR.dtd.span ? b.splitElement(g) : b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(g), b.collapse(!0), g.remove()) : b.splitBlock(d == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
                    b.insertNode(a);
                    return !0
                },
                setData: function(a, b) { b || (a = this.editor.dataProcessor.toHtml(a));
                    this.setHtml(a);
                    this.fixInitialSelection(); "unloaded" == this.status && (this.status = "ready");
                    this.editor.fire("dataReady") },
                getData: function(a) {
                    var b = this.getHtml();
                    a || (b = this.editor.dataProcessor.toDataFormat(b));
                    return b },
                setReadOnly: function(a) { this.setAttribute("contenteditable", !a) },
                detach: function() {
                    this.removeClass("cke_editable");
                    this.status = "detached";
                    var a = this.editor;
                    this._.detach();
                    delete a.document;
                    delete a.window
                },
                isInline: function() {
                    return this.getDocument().equals(CKEDITOR.document) },
                fixInitialSelection: function() {
                    function a() {
                        var b = c.getDocument().$,
                            d = b.getSelection(),
                            l;
                        a: if (d.anchorNode && d.anchorNode == c.$) l = !0;
                            else {
                                if (CKEDITOR.env.webkit && (l = c.getDocument().getActive()) && l.equals(c) && !d.anchorNode) { l = !0;
                                    break a }
                                l = void 0 }
                        l && (l = new CKEDITOR.dom.range(c), l.moveToElementEditStart(c), b = b.createRange(), b.setStart(l.startContainer.$, l.startOffset), b.collapse(!0), d.removeAllRanges(), d.addRange(b)) }

                    function b() {
                        var a = c.getDocument().$,
                            d = a.selection,
                            l = c.getDocument().getActive(); "None" == d.type && l.equals(c) && (d = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), d.moveToElementEditStart(c), d = d.startContainer, d.type != CKEDITOR.NODE_ELEMENT && (d = d.getParent()), a.moveToElementText(d.$), a.collapse(!0), a.select()) }
                    var c = this;
                    if (CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks)) this.hasFocus && (this.focus(), b());
                    else if (this.hasFocus) this.focus(), a();
                    else this.once("focus", function() { a() },
                        null, null, -999)
                },
                getHtmlFromRange: function(a) {
                    if (a.collapsed) return new CKEDITOR.dom.documentFragment(a.document);
                    a = { doc: this.getDocument(), range: a.clone() };
                    w.eol.detect(a, this);
                    w.bogus.exclude(a);
                    w.cell.shrink(a);
                    a.fragment = a.range.cloneContents();
                    w.tree.rebuild(a, this);
                    w.eol.fix(a, this);
                    return new CKEDITOR.dom.documentFragment(a.fragment.$) },
                extractHtmlFromRange: function(a, b) {
                    var c = F,
                        d = { range: a, doc: a.document },
                        e = this.getHtmlFromRange(a);
                    if (a.collapsed) return a.optimize(), e;
                    a.enlarge(CKEDITOR.ENLARGE_INLINE,
                        1);
                    c.table.detectPurge(d);
                    d.bookmark = a.createBookmark();
                    delete d.range;
                    var f = this.editor.createRange();
                    f.moveToPosition(d.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START);
                    d.targetBookmark = f.createBookmark();
                    c.list.detectMerge(d, this);
                    c.table.detectRanges(d, this);
                    c.block.detectMerge(d, this);
                    d.tableContentsRanges ? (c.table.deleteRanges(d), a.moveToBookmark(d.bookmark), d.range = a) : (a.moveToBookmark(d.bookmark), d.range = a, a.extractContents(c.detectExtractMerge(d)));
                    a.moveToBookmark(d.targetBookmark);
                    a.optimize();
                    c.fixUneditableRangePosition(a);
                    c.list.merge(d, this);
                    c.table.purge(d, this);
                    c.block.merge(d, this);
                    if (b) { c = a.startPath();
                        if (d = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) { a: {
                                var d = c.block.getElementsByTag("span"),
                                    f = 0,
                                    g;
                                if (d)
                                    for (; g = d.getItem(f++);)
                                        if (!B(g)) { d = !0;
                                            break a }
                                d = !1 }
                            d = !d }
                        d && (a.moveToPosition(c.block, CKEDITOR.POSITION_BEFORE_START), c.block.remove()) } else c.autoParagraph(this.editor, a), u(a.startContainer) && a.startContainer.appendBogus();
                    a.startContainer.mergeSiblings();
                    return e
                },
                setup: function() {
                    var a = this.editor;
                    this.attachListener(a, "beforeGetData", function() {
                        var b = this.getData();
                        this.is("textarea") || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(y, function(a, b) {
                            return b }));
                        a.setData(b, null, 1) }, this);
                    this.attachListener(a, "getSnapshot", function(a) { a.data = this.getData(1) }, this);
                    this.attachListener(a, "afterSetData", function() { this.setData(a.getData(1)) }, this);
                    this.attachListener(a, "loadSnapshot", function(a) { this.setData(a.data, 1) }, this);
                    this.attachListener(a,
                        "beforeFocus",
                        function() {
                            var b = a.getSelection();
                            (b = b && b.getNative()) && "Control" == b.type || this.focus() }, this);
                    this.attachListener(a, "insertHtml", function(a) { this.insertHtml(a.data.dataValue, a.data.mode, a.data.range) }, this);
                    this.attachListener(a, "insertElement", function(a) { this.insertElement(a.data) }, this);
                    this.attachListener(a, "insertText", function(a) { this.insertText(a.data) }, this);
                    this.setReadOnly(a.readOnly);
                    this.attachClass("cke_editable");
                    a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") :
                        a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || this.attachClass("cke_editable_themed");
                    this.attachClass("cke_contents_" + a.config.contentsLangDirection);
                    a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly;
                    a.keystrokeHandler.attach(this);
                    this.on("blur", function() { this.hasFocus = !1 }, null, null, -1);
                    this.on("focus", function() { this.hasFocus = !0 }, null, null, -1);
                    if (CKEDITOR.env.webkit) this.on("scroll", function() { a._.previousScrollTop = a.editable().$.scrollTop }, null,
                        null, -1);
                    if (CKEDITOR.env.edge && 14 < CKEDITOR.env.version) {
                        var d = function() {
                            var b = a.editable();
                            null != a._.previousScrollTop && b.getDocument().equals(CKEDITOR.document) && (b.$.scrollTop = a._.previousScrollTop, a._.previousScrollTop = null, this.removeListener("scroll", d)) };
                        this.on("scroll", d) }
                    a.focusManager.add(this);
                    this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, a.once("contentDom", function() { a.focusManager.focus(this) }, this));
                    this.isInline() && this.changeAttr("tabindex", a.tabIndex);
                    if (!this.is("textarea")) {
                        a.document =
                            this.getDocument();
                        a.window = this.getWindow();
                        var e = a.document;
                        this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker);
                        var t = a.config.contentsLangDirection;
                        this.getDirection(1) != t && this.changeAttr("dir", t);
                        var k = CKEDITOR.getCss();
                        if (k) {
                            var t = e.getHead(),
                                h = t.getCustomData("stylesheet");
                            h ? k != h.getText() && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? h.$.styleSheet.cssText = k : h.setText(k)) : (k = e.appendStyleText(k), k = new CKEDITOR.dom.element(k.ownerNode || k.owningElement), t.setCustomData("stylesheet",
                                k), k.data("cke-temp", 1))
                        }
                        t = e.getCustomData("stylesheet_ref") || 0;
                        e.setCustomData("stylesheet_ref", t + 1);
                        this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling);
                        this.attachListener(this, "click", function(a) { a = a.data;
                            var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a");
                            b && 2 != a.$.button && b.isReadOnly() && a.preventDefault() });
                        var D = { 8: 1, 46: 1 };
                        this.attachListener(a, "key", function(b) {
                            if (a.readOnly) return !0;
                            var c = b.data.domEvent.getKey(),
                                d;
                            if (c in D) {
                                b = a.getSelection();
                                var e,
                                    n = b.getRanges()[0],
                                    q = n.startPath(),
                                    t, k, h, c = 8 == c;
                                CKEDITOR.env.ie && 11 > CKEDITOR.env.version && (e = b.getSelectedElement()) || (e = g(b)) ? (a.fire("saveSnapshot"), n.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e.remove(), n.select(), a.fire("saveSnapshot"), d = 1) : n.collapsed && ((t = q.block) && (h = t[c ? "getPrevious" : "getNext"](f)) && h.type == CKEDITOR.NODE_ELEMENT && h.is("table") && n[c ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (a.fire("saveSnapshot"), n[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && t.remove(), n["moveToElementEdit" +
                                    (c ? "End" : "Start")](h), n.select(), a.fire("saveSnapshot"), d = 1) : q.blockLimit && q.blockLimit.is("td") && (k = q.blockLimit.getAscendant("table")) && n.checkBoundaryOfElement(k, c ? CKEDITOR.START : CKEDITOR.END) && (h = k[c ? "getPrevious" : "getNext"](f)) ? (a.fire("saveSnapshot"), n["moveToElementEdit" + (c ? "End" : "Start")](h), n.checkStartOfBlock() && n.checkEndOfBlock() ? h.remove() : n.select(), a.fire("saveSnapshot"), d = 1) : (k = q.contains(["td", "th", "caption"])) && n.checkBoundaryOfElement(k, c ? CKEDITOR.START : CKEDITOR.END) && (d = 1))
                            }
                            return !d
                        });
                        a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function(b) { b.data.getKeystroke() in D && !this.getFirst(c) && (this.appendBogus(), b = a.createRange(), b.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), b.select()) });
                        this.attachListener(this, "dblclick", function(b) {
                            if (a.readOnly) return !1;
                            b = { element: b.data.getTarget() };
                            a.fire("doubleclick", b) });
                        CKEDITOR.env.ie && this.attachListener(this, "click", b);
                        CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown",
                            function(b) {
                                var c = b.data.getTarget();
                                c.is("img", "hr", "input", "textarea", "select") && !c.isReadOnly() && (a.getSelection().selectElement(c), c.is("input", "textarea", "select") && b.data.preventDefault()) });
                        CKEDITOR.env.edge && this.attachListener(this, "mouseup", function(b) {
                            (b = b.data.getTarget()) && b.is("img") && a.getSelection().selectElement(b) });
                        CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(b) {
                            if (2 == b.data.$.button && (b = b.data.getTarget(), !b.getOuterHtml().replace(y, ""))) {
                                var c = a.createRange();
                                c.moveToElementEditStart(b);
                                c.select(!0)
                            }
                        });
                        CKEDITOR.env.webkit && (this.attachListener(this, "click", function(a) { a.data.getTarget().is("input", "select") && a.data.preventDefault() }), this.attachListener(this, "mouseup", function(a) { a.data.getTarget().is("input", "textarea") && a.data.preventDefault() }));
                        CKEDITOR.env.webkit && this.attachListener(a, "key", function(b) {
                            if (a.readOnly) return !0;
                            b = b.data.domEvent.getKey();
                            if (b in D) {
                                var c = 8 == b,
                                    d = a.getSelection().getRanges()[0];
                                b = d.startPath();
                                if (d.collapsed) a: {
                                    var e =
                                        b.block;
                                    if (e && d[c ? "checkStartOfBlock" : "checkEndOfBlock"]() && d.moveToClosestEditablePosition(e, !c) && d.collapsed) {
                                        if (d.startContainer.type == CKEDITOR.NODE_ELEMENT) {
                                            var f = d.startContainer.getChild(d.startOffset - (c ? 1 : 0));
                                            if (f && f.type == CKEDITOR.NODE_ELEMENT && f.is("hr")) { a.fire("saveSnapshot");
                                                f.remove();
                                                b = !0;
                                                break a } }
                                        d = d.startPath().block;
                                        if (!d || d && d.contains(e)) b = void 0;
                                        else {
                                            a.fire("saveSnapshot");
                                            var n;
                                            (n = (c ? d : e).getBogus()) && n.remove();
                                            n = a.getSelection();
                                            f = n.createBookmarks();
                                            (c ? e : d).moveChildren(c ?
                                                d : e, !1);
                                            b.lastElement.mergeSiblings();
                                            r(e, d, !c);
                                            n.selectBookmarks(f);
                                            b = !0
                                        }
                                    } else b = !1
                                }
                                else c = d, n = b.block, d = c.endPath().block, n && d && !n.equals(d) ? (a.fire("saveSnapshot"), (e = n.getBogus()) && e.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), d.getParent() && (d.moveChildren(n, !1), b.lastElement.mergeSiblings(), r(n, d, !0)), c = a.getSelection().getRanges()[0], c.collapse(1), c.optimize(), "" === c.startContainer.getHtml() && c.startContainer.appendBogus(), c.select(), b = !0) : b = !1;
                                if (!b) return;
                                a.getSelection().scrollIntoView();
                                a.fire("saveSnapshot");
                                return !1
                            }
                        }, this, null, 100)
                    }
                }
            },
            _: {
                detach: function() {
                    this.editor.setData(this.editor.getData(), 0, 1);
                    this.clearListeners();
                    this.restoreAttrs();
                    var a;
                    if (a = this.removeCustomData("classes"))
                        for (; a.length;) this.removeClass(a.pop());
                    if (!this.is("textarea")) { a = this.getDocument();
                        var b = a.getHead();
                        if (b.getCustomData("stylesheet")) {
                            var c = a.getCustomData("stylesheet_ref");--c ? a.setCustomData("stylesheet_ref", c) : (a.removeCustomData("stylesheet_ref"), b.removeCustomData("stylesheet").remove()) } }
                    this.editor.fire("contentDomUnload");
                    delete this.editor
                }
            }
        });
        CKEDITOR.editor.prototype.editable = function(a) {
            var b = this._.editable;
            if (b && a) return 0;
            arguments.length && (b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null));
            return b };
        CKEDITOR.on("instanceLoaded", function(b) {
            var c = b.editor;
            c.on("insertElement", function(a) {
                a = a.data;
                a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ?
                    "true" : "1"), a.setAttribute("contentEditable", !1))
            });
            c.on("selectionChange", function(b) {
                if (!c.readOnly) {
                    var d = c.getSelection();
                    d && !d.isLocked && (d = c.checkDirty(), c.fire("lockSnapshot"), a(b), c.fire("unlockSnapshot"), !d && c.resetDirty()) } })
        });
        CKEDITOR.on("instanceCreated", function(a) {
            var b = a.editor;
            b.on("mode", function() {
                var a = b.editable();
                if (a && a.isInline()) {
                    var c = b.title;
                    a.changeAttr("role", "textbox");
                    a.changeAttr("aria-label", c);
                    c && a.changeAttr("title", c);
                    var d = b.fire("ariaEditorHelpLabel", {}).label;
                    if (d && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) {
                        var e = CKEDITOR.tools.getNextId(),
                            d = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + e + '" class\x3d"cke_voice_label"\x3e' + d + "\x3c/span\x3e");
                        c.append(d);
                        a.changeAttr("aria-describedby", e) }
                }
            })
        });
        CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
        f = CKEDITOR.dom.walker.whitespaces(!0);
        B = CKEDITOR.dom.walker.bookmark(!1, !0);
        u = CKEDITOR.dom.walker.empty();
        z = CKEDITOR.dom.walker.bogus();
        y = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi;
        m = function() {
            function a(b) {
                return b.type == CKEDITOR.NODE_ELEMENT }

            function b(c, d) {
                var e, f, n, t, g = [],
                    k = d.range.startContainer;
                e = d.range.startPath();
                for (var k = p[k.getName()], h = 0, C = c.getChildren(), A = C.count(), D = -1, m = -1, r = 0, H = e.contains(p.$list); h < A; ++h) e = C.getItem(h), a(e) ? (n = e.getName(), H && n in CKEDITOR.dtd.$list ? g = g.concat(b(e, d)) : (t = !!k[n],
                    "br" != n || !e.data("cke-eol") || h && h != A - 1 || (r = (f = h ? g[h - 1].node : C.getItem(h + 1)) && (!a(f) || !f.is("br")), f = f && a(f) && p.$block[f.getName()]), -1 != D || t || (D = h), t || (m = h), g.push({ isElement: 1, isLineBreak: r, isBlock: e.isBlockBoundary(), hasBlockSibling: f, node: e, name: n, allowed: t }), f = r = 0)) : g.push({ isElement: 0, node: e, allowed: 1 }); - 1 < D && (g[D].firstNotAllowed = 1); - 1 < m && (g[m].lastNotAllowed = 1);
                return g
            }

            function d(b, c) {
                var e = [],
                    f = b.getChildren(),
                    q = f.count(),
                    g, t = 0,
                    k = p[c],
                    h = !b.is(p.$inline) || b.is("br");
                for (h && e.push(" "); t < q; t++) g =
                    f.getItem(t), a(g) && !g.is(k) ? e = e.concat(d(g, c)) : e.push(g);
                h && e.push(" ");
                return e
            }

            function e(b) {
                return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1) }

            function f(b) {
                return b && a(b) && (b.is(p.$removeEmpty) || b.is("a") && !b.isBlockBoundary()) }

            function g(b, c, d, e) {
                var f = b.clone(),
                    n, q;
                f.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
                (n = (new CKEDITOR.dom.walker(f)).next()) && a(n) && m[n.getName()] && (q = n.getPrevious()) && a(q) && !q.getParent().equals(b.startContainer) && d.contains(q) && e.contains(n) && n.isIdentical(q) &&
                    (n.moveChildren(q), n.remove(), g(b, c, d, e))
            }

            function D(b, c) {
                function d(b, c) {
                    if (c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br")) return b.remove(), 1 }
                var e = c.endContainer.getChild(c.endOffset),
                    f = c.endContainer.getChild(c.endOffset - 1);
                e && d(e, b[b.length - 1]);
                f && d(f, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse()) }
            var p = CKEDITOR.dtd,
                m = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1 },
                r = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 },
                x = CKEDITOR.tools.extend({},
                    p.$inline);
            delete x.br;
            return function(m, v, G, E) {
                var I = m.editor,
                    K = !1;
                "unfiltered_html" == v && (v = "html", K = !0);
                if (!E.checkReadOnly()) {
                    var L = (new CKEDITOR.dom.elementPath(E.startContainer, E.root)).blockLimit || E.root;
                    m = { type: v, dontFilter: K, editable: m, editor: I, range: E, blockLimit: L, mergeCandidates: [], zombies: [] };
                    v = m.range;
                    E = m.mergeCandidates;
                    var H, u;
                    "text" == m.type && v.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (H = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", v.document), v.insertNode(H),
                        v.setStartAfter(H));
                    K = new CKEDITOR.dom.elementPath(v.startContainer);
                    m.endPath = L = new CKEDITOR.dom.elementPath(v.endContainer);
                    if (!v.collapsed) {
                        var I = L.block || L.blockLimit,
                            B = v.getCommonAncestor();
                        I && !I.equals(B) && !I.contains(B) && v.checkEndOfBlock() && m.zombies.push(I);
                        v.deleteContents() }
                    for (;
                        (u = e(v)) && a(u) && u.isBlockBoundary() && K.contains(u);) v.moveToPosition(u, CKEDITOR.POSITION_BEFORE_END);
                    g(v, m.blockLimit, K, L);
                    H && (v.setEndBefore(H), v.collapse(), H.remove());
                    H = v.startPath();
                    if (I = H.contains(f, !1, 1)) v.splitElement(I),
                        m.inlineStylesRoot = I, m.inlineStylesPeak = H.lastElement;
                    H = v.createBookmark();
                    (I = H.startNode.getPrevious(c)) && a(I) && f(I) && E.push(I);
                    (I = H.startNode.getNext(c)) && a(I) && f(I) && E.push(I);
                    for (I = H.startNode;
                        (I = I.getParent()) && f(I);) E.push(I);
                    v.moveToBookmark(H);
                    if (H = G) {
                        H = m.range;
                        if ("text" == m.type && m.inlineStylesRoot) { u = m.inlineStylesPeak;
                            v = u.getDocument().createText("{cke-peak}");
                            for (E = m.inlineStylesRoot.getParent(); !u.equals(E);) v = v.appendTo(u.clone()), u = u.getParent();
                            G = v.getOuterHtml().split("{cke-peak}").join(G) }
                        u =
                            m.blockLimit.getName();
                        if (/^\s+|\s+$/.test(G) && "span" in CKEDITOR.dtd[u]) {
                            var z = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e';
                            G = z + G + z }
                        G = m.editor.dataProcessor.toHtml(G, { context: null, fixForBody: !1, protectedWhitespaces: !!z, dontFilter: m.dontFilter, filter: m.editor.activeFilter, enterMode: m.editor.activeEnterMode });
                        u = H.document.createElement("body");
                        u.setHtml(G);
                        z && (u.getFirst().remove(), u.getLast().remove());
                        if ((z = H.startPath().block) && (1 != z.getChildCount() || !z.getBogus())) a: {
                            var w;
                            if (1 ==
                                u.getChildCount() && a(w = u.getFirst()) && w.is(r) && !w.hasAttribute("contenteditable")) { z = w.getElementsByTag("*");
                                H = 0;
                                for (E = z.count(); H < E; H++)
                                    if (v = z.getItem(H), !v.is(x)) break a;
                                w.moveChildren(w.getParent(1));
                                w.remove() }
                        }
                        m.dataWrapper = u;
                        H = G
                    }
                    if (H) {
                        w = m.range;
                        H = w.document;
                        var y;
                        u = m.blockLimit;
                        E = 0;
                        var O, z = [],
                            N, V;
                        G = I = 0;
                        var F, J;
                        v = w.startContainer;
                        var K = m.endPath.elements[0],
                            Y, L = K.getPosition(v),
                            B = !!K.getCommonAncestor(v) && L != CKEDITOR.POSITION_IDENTICAL && !(L & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
                        v = b(m.dataWrapper, m);
                        for (D(v, w); E < v.length; E++) {
                            L = v[E];
                            if (y = L.isLineBreak) { y = w;
                                F = u;
                                var U = void 0,
                                    aa = void 0;
                                L.hasBlockSibling ? y = 1 : (U = y.startContainer.getAscendant(p.$block, 1)) && U.is({ div: 1, p: 1 }) ? (aa = U.getPosition(F), aa == CKEDITOR.POSITION_IDENTICAL || aa == CKEDITOR.POSITION_CONTAINS ? y = 0 : (F = y.splitElement(U), y.moveToPosition(F, CKEDITOR.POSITION_AFTER_START), y = 1)) : y = 0 }
                            if (y) G = 0 < E;
                            else {
                                y = w.startPath();
                                !L.isBlock && k(m.editor, y.block, y.blockLimit) && (V = h(m.editor)) && (V = H.createElement(V), V.appendBogus(), w.insertNode(V),
                                    CKEDITOR.env.needsBrFiller && (O = V.getBogus()) && O.remove(), w.moveToPosition(V, CKEDITOR.POSITION_BEFORE_END));
                                if ((y = w.startPath().block) && !y.equals(N)) {
                                    if (O = y.getBogus()) O.remove(), z.push(y);
                                    N = y }
                                L.firstNotAllowed && (I = 1);
                                if (I && L.isElement) {
                                    y = w.startContainer;
                                    for (F = null; y && !p[y.getName()][L.name];) {
                                        if (y.equals(u)) { y = null;
                                            break }
                                        F = y;
                                        y = y.getParent() }
                                    if (y) F && (J = w.splitElement(F), m.zombies.push(J), m.zombies.push(F));
                                    else {
                                        F = u.getName();
                                        Y = !E;
                                        y = E == v.length - 1;
                                        F = d(L.node, F);
                                        for (var U = [], aa = F.length, ba = 0, da = void 0,
                                                ea = 0, W = -1; ba < aa; ba++) da = F[ba], " " == da ? (ea || Y && !ba || (U.push(new CKEDITOR.dom.text(" ")), W = U.length), ea = 1) : (U.push(da), ea = 0);
                                        y && W == U.length && U.pop();
                                        Y = U
                                    }
                                }
                                if (Y) {
                                    for (; y = Y.pop();) w.insertNode(y);
                                    Y = 0 } else w.insertNode(L.node);
                                L.lastNotAllowed && E < v.length - 1 && ((J = B ? K : J) && w.setEndAt(J, CKEDITOR.POSITION_AFTER_START), I = 0);
                                w.collapse()
                            }
                        }
                        1 != v.length ? O = !1 : (O = v[0], O = O.isElement && "false" == O.node.getAttribute("contenteditable"));
                        O && (G = !0, y = v[0].node, w.setStartAt(y, CKEDITOR.POSITION_BEFORE_START), w.setEndAt(y, CKEDITOR.POSITION_AFTER_END));
                        m.dontMoveCaret = G;
                        m.bogusNeededBlocks = z
                    }
                    O = m.range;
                    var T;
                    J = m.bogusNeededBlocks;
                    for (Y = O.createBookmark(); N = m.zombies.pop();) N.getParent() && (V = O.clone(), V.moveToElementEditStart(N), V.removeEmptyBlocksAtEnd());
                    if (J)
                        for (; N = J.pop();) CKEDITOR.env.needsBrFiller ? N.appendBogus() : N.append(O.document.createText(" "));
                    for (; N = m.mergeCandidates.pop();) N.mergeSiblings();
                    O.moveToBookmark(Y);
                    if (!m.dontMoveCaret) {
                        for (N = e(O); N && a(N) && !N.is(p.$empty);) {
                            if (N.isBlockBoundary()) O.moveToPosition(N, CKEDITOR.POSITION_BEFORE_END);
                            else {
                                if (f(N) && N.getHtml().match(/(\s|&nbsp;)$/g)) { T = null;
                                    break }
                                T = O.clone();
                                T.moveToPosition(N, CKEDITOR.POSITION_BEFORE_END) }
                            N = N.getLast(c)
                        }
                        T && O.moveToRange(T)
                    }
                }
            }
        }();
        x = function() {
            function a(b) { b = new CKEDITOR.dom.walker(b);
                b.guard = function(a, b) {
                    if (b) return !1;
                    if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent) };
                b.evaluator = function(a) {
                    return a.type == CKEDITOR.NODE_ELEMENT };
                return b }

            function b(a, c, d) { c = a.getDocument().createElement(c);
                a.append(c, d);
                return c }

            function c(a) {
                var b = a.count(),
                    d;
                for (b; 0 < b--;) d = a.getItem(b), CKEDITOR.tools.trim(d.getHtml()) || (d.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && d.getChildCount() && d.getFirst().remove())
            }
            return function(d) {
                var e = d.startContainer,
                    f = e.getAscendant("table", 1),
                    g = !1;
                c(f.getElementsByTag("td"));
                c(f.getElementsByTag("th"));
                f = d.clone();
                f.setStart(e, 0);
                f = a(f).lastBackward();
                f || (f = d.clone(), f.setEndAt(e, CKEDITOR.POSITION_BEFORE_END), f = a(f).lastForward(), g = !0);
                f || (f = e);
                f.is("table") ? (d.setStartAt(f, CKEDITOR.POSITION_BEFORE_START),
                    d.collapse(!0), f.remove()) : (f.is({ tbody: 1, thead: 1, tfoot: 1 }) && (f = b(f, "tr", g)), f.is("tr") && (f = b(f, f.getParent().is("thead") ? "th" : "td", g)), (e = f.getBogus()) && e.remove(), d.moveToPosition(f, g ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
            }
        }();
        J = function() {
            function a(b) {
                b = new CKEDITOR.dom.walker(b);
                b.guard = function(a, b) {
                    if (b) return !1;
                    if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$list) || a.is(CKEDITOR.dtd.$listItem) };
                b.evaluator = function(a) {
                    return a.type == CKEDITOR.NODE_ELEMENT &&
                        a.is(CKEDITOR.dtd.$listItem)
                };
                return b
            }
            return function(b) {
                var c = b.startContainer,
                    d = !1,
                    e;
                e = b.clone();
                e.setStart(c, 0);
                e = a(e).lastBackward();
                e || (e = b.clone(), e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), e = a(e).lastForward(), d = !0);
                e || (e = c);
                e.is(CKEDITOR.dtd.$list) ? (b.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), e.remove()) : ((c = e.getBogus()) && c.remove(), b.moveToPosition(e, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), b.select()) }
        }();
        w = {
            eol: {
                detect: function(a, b) {
                    var c = a.range,
                        d = c.clone(),
                        e = c.clone(),
                        f = new CKEDITOR.dom.elementPath(c.startContainer, b),
                        g = new CKEDITOR.dom.elementPath(c.endContainer, b);
                    d.collapse(1);
                    e.collapse();
                    f.block && d.checkBoundaryOfElement(f.block, CKEDITOR.END) && (c.setStartAfter(f.block), a.prependEolBr = 1);
                    g.block && e.checkBoundaryOfElement(g.block, CKEDITOR.START) && (c.setEndBefore(g.block), a.appendEolBr = 1)
                },
                fix: function(a, b) {
                    var c = b.getDocument(),
                        d;
                    a.appendEolBr && (d = this.createEolBr(c), a.fragment.append(d));
                    !a.prependEolBr || d && !d.getPrevious() || a.fragment.append(this.createEolBr(c),
                        1)
                },
                createEolBr: function(a) {
                    return a.createElement("br", { attributes: { "data-cke-eol": 1 } }) }
            },
            bogus: { exclude: function(a) {
                    var b = a.range.getBoundaryNodes(),
                        c = b.startNode,
                        b = b.endNode;!b || !z(b) || c && c.equals(b) || a.range.setEndBefore(b) } },
            tree: {
                rebuild: function(a, b) {
                    var c = a.range,
                        d = c.getCommonAncestor(),
                        e = new CKEDITOR.dom.elementPath(d, b),
                        f = new CKEDITOR.dom.elementPath(c.startContainer, b),
                        c = new CKEDITOR.dom.elementPath(c.endContainer, b),
                        g;
                    d.type == CKEDITOR.NODE_TEXT && (d = d.getParent());
                    if (e.blockLimit.is({
                            tr: 1,
                            table: 1
                        })) {
                        var k = e.contains("table").getParent();
                        g = function(a) {
                            return !a.equals(k) } } else if (e.block && e.block.is(CKEDITOR.dtd.$listItem) && (f = f.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !f.equals(c))) {
                        var h = e.contains(CKEDITOR.dtd.$list).getParent();
                        g = function(a) {
                            return !a.equals(h) } }
                    g || (g = function(a) {
                        return !a.equals(e.block) && !a.equals(e.blockLimit) });
                    this.rebuildFragment(a, b, d, g)
                },
                rebuildFragment: function(a, b, c, d) {
                    for (var e; c && !c.equals(b) && d(c);) e = c.clone(0, 1), a.fragment.appendTo(e),
                        a.fragment = e, c = c.getParent()
                }
            },
            cell: { shrink: function(a) { a = a.range;
                    var b = a.startContainer,
                        c = a.endContainer,
                        d = a.startOffset,
                        e = a.endOffset;
                    b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is("tr") && ++d == e && a.shrink(CKEDITOR.SHRINK_TEXT) } }
        };
        F = function() {
            function a(b, c) {
                var d = b.getParent();
                if (d.is(CKEDITOR.dtd.$inline)) b[c ? "insertBefore" : "insertAfter"](d) }

            function b(c, d, e) { a(d);
                a(e, 1);
                for (var f; f = e.getNext();) f.insertAfter(d), d = f;
                u(c) && c.remove() }

            function c(a, b) {
                var d = new CKEDITOR.dom.range(a);
                d.setStartAfter(b.startNode);
                d.setEndBefore(b.endNode);
                return d
            }
            return {
                list: {
                    detectMerge: function(a, b) {
                        var d = c(b, a.bookmark),
                            e = d.startPath(),
                            f = d.endPath(),
                            l = e.contains(CKEDITOR.dtd.$list),
                            g = f.contains(CKEDITOR.dtd.$list);
                        a.mergeList = l && g && l.getParent().equals(g.getParent()) && !l.equals(g);
                        a.mergeListItems = e.block && f.block && e.block.is(CKEDITOR.dtd.$listItem) && f.block.is(CKEDITOR.dtd.$listItem);
                        if (a.mergeList || a.mergeListItems) d = d.clone(), d.setStartBefore(a.bookmark.startNode), d.setEndAfter(a.bookmark.endNode), a.mergeListBookmark =
                            d.createBookmark()
                    },
                    merge: function(a, c) {
                        if (a.mergeListBookmark) {
                            var d = a.mergeListBookmark.startNode,
                                e = a.mergeListBookmark.endNode,
                                f = new CKEDITOR.dom.elementPath(d, c),
                                l = new CKEDITOR.dom.elementPath(e, c);
                            if (a.mergeList) {
                                var g = f.contains(CKEDITOR.dtd.$list),
                                    n = l.contains(CKEDITOR.dtd.$list);
                                g.equals(n) || (n.moveChildren(g), n.remove()) }
                            a.mergeListItems && (f = f.contains(CKEDITOR.dtd.$listItem), l = l.contains(CKEDITOR.dtd.$listItem), f.equals(l) || b(l, d, e));
                            d.remove();
                            e.remove() } }
                },
                block: {
                    detectMerge: function(a,
                        b) {
                        if (!a.tableContentsRanges && !a.mergeListBookmark) {
                            var c = new CKEDITOR.dom.range(b);
                            c.setStartBefore(a.bookmark.startNode);
                            c.setEndAfter(a.bookmark.endNode);
                            a.mergeBlockBookmark = c.createBookmark() } },
                    merge: function(a, c) {
                        if (a.mergeBlockBookmark && !a.purgeTableBookmark) {
                            var d = a.mergeBlockBookmark.startNode,
                                e = a.mergeBlockBookmark.endNode,
                                f = new CKEDITOR.dom.elementPath(d, c),
                                l = new CKEDITOR.dom.elementPath(e, c),
                                f = f.block,
                                l = l.block;
                            f && l && !f.equals(l) && b(l, d, e);
                            d.remove();
                            e.remove() } }
                },
                table: function() {
                    function a(c) {
                        var e = [],
                            f, l = new CKEDITOR.dom.walker(c),
                            g = c.startPath().contains(d),
                            n = c.endPath().contains(d),
                            k = {};
                        l.guard = function(a, l) {
                            if (a.type == CKEDITOR.NODE_ELEMENT) {
                                var h = "visited_" + (l ? "out" : "in");
                                if (a.getCustomData(h)) return;
                                CKEDITOR.dom.element.setMarker(k, a, h, 1) }
                            if (l && g && a.equals(g)) f = c.clone(), f.setEndAt(g, CKEDITOR.POSITION_BEFORE_END), e.push(f);
                            else if (!l && n && a.equals(n)) f = c.clone(), f.setStartAt(n, CKEDITOR.POSITION_AFTER_START), e.push(f);
                            else {
                                if (h = !l) h = a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && (!g || b(a, g)) && (!n ||
                                    b(a, n));
                                h && (f = c.clone(), f.selectNodeContents(a), e.push(f))
                            }
                        };
                        l.lastForward();
                        CKEDITOR.dom.element.clearAllMarkers(k);
                        return e
                    }

                    function b(a, c) {
                        var d = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED,
                            e = a.getPosition(c);
                        return e === CKEDITOR.POSITION_IDENTICAL ? !1 : 0 === (e & d) }
                    var d = { td: 1, th: 1, caption: 1 };
                    return {
                        detectPurge: function(a) {
                            var b = a.range,
                                c = b.clone();
                            c.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                            var c = new CKEDITOR.dom.walker(c),
                                e = 0;
                            c.evaluator = function(a) { a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && ++e };
                            c.checkForward();
                            if (1 < e) {
                                var c = b.startPath().contains("table"),
                                    f = b.endPath().contains("table");
                                c && f && b.checkBoundaryOfElement(c, CKEDITOR.START) && b.checkBoundaryOfElement(f, CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c), b.setEndAfter(f), a.purgeTableBookmark = b.createBookmark()) }
                        },
                        detectRanges: function(e, f) {
                            var l = c(f, e.bookmark),
                                g = l.clone(),
                                k, h, v = l.getCommonAncestor();
                            v.is(CKEDITOR.dtd.$tableContent) && !v.is(d) && (v = v.getAscendant("table", !0));
                            h = v;
                            v = new CKEDITOR.dom.elementPath(l.startContainer,
                                h);
                            h = new CKEDITOR.dom.elementPath(l.endContainer, h);
                            v = v.contains("table");
                            h = h.contains("table");
                            if (v || h) v && h && b(v, h) ? (e.tableSurroundingRange = g, g.setStartAt(v, CKEDITOR.POSITION_AFTER_END), g.setEndAt(h, CKEDITOR.POSITION_BEFORE_START), g = l.clone(), g.setEndAt(v, CKEDITOR.POSITION_AFTER_END), k = l.clone(), k.setStartAt(h, CKEDITOR.POSITION_BEFORE_START), k = a(g).concat(a(k))) : v ? h || (e.tableSurroundingRange = g, g.setStartAt(v, CKEDITOR.POSITION_AFTER_END), l.setEndAt(v, CKEDITOR.POSITION_AFTER_END)) : (e.tableSurroundingRange =
                                g, g.setEndAt(h, CKEDITOR.POSITION_BEFORE_START), l.setStartAt(h, CKEDITOR.POSITION_AFTER_START)), e.tableContentsRanges = k ? k : a(l)
                        },
                        deleteRanges: function(a) {
                            for (var b; b = a.tableContentsRanges.pop();) b.extractContents(), u(b.startContainer) && b.startContainer.appendBogus();
                            a.tableSurroundingRange && a.tableSurroundingRange.extractContents() },
                        purge: function(a) {
                            if (a.purgeTableBookmark) {
                                var b = a.doc,
                                    c = a.range.clone(),
                                    b = b.createElement("p");
                                b.insertBefore(a.purgeTableBookmark.startNode);
                                c.moveToBookmark(a.purgeTableBookmark);
                                c.deleteContents();
                                a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START)
                            }
                        }
                    }
                }(),
                detectExtractMerge: function(a) {
                    return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) && a.range.endPath().contains(CKEDITOR.dtd.$listItem)) },
                fixUneditableRangePosition: function(a) { a.startContainer.getDtd()["#"] || a.moveToClosestEditablePosition(null, !0) },
                autoParagraph: function(a, b) {
                    var c = b.startPath(),
                        d;
                    k(a, c.block, c.blockLimit) && (d = h(a)) && (d = b.document.createElement(d), d.appendBogus(), b.insertNode(d), b.moveToPosition(d,
                        CKEDITOR.POSITION_AFTER_START))
                }
            }
        }()
    })();
    (function() {
        function a() {
            var a = this._.fakeSelection,
                b;
            a && (b = this.getSelection(1), b && b.isHidden() || (a.reset(), a = 0));
            if (!a && (a = b || this.getSelection(1), !a || a.getType() == CKEDITOR.SELECTION_NONE)) return;
            this.fire("selectionCheck", a);
            b = this.elementPath();
            if (!b.compare(this._.selectionPreviousPath)) {
                var c = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(b.blockLimit);
                CKEDITOR.env.webkit && !c && (this._.previousActive = this.document.getActive());
                this._.selectionPreviousPath = b;
                this.fire("selectionChange", { selection: a, path: b })
            }
        }

        function d() { x = !0;
            m || (b.call(this), m = CKEDITOR.tools.setTimeout(b, 200, this)) }

        function b() { m = null;
            x && (CKEDITOR.tools.setTimeout(a, 0, this), x = !1) }

        function c(a) {
            return J(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1 }

        function e(a) {
            function b(c, d) {
                return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c) : !1 }
            if (!(a.root instanceof CKEDITOR.editable)) return !1;
            var d = a.startContainer,
                e = a.getPreviousNode(c, null, d),
                f = a.getNextNode(c, null,
                    d);
            return b(e) || b(f, 1) || !(e || f || d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary() && d.getBogus()) ? !0 : !1
        }

        function g(a) { k(a, !1);
            var b = a.getDocument().createText(z);
            a.setCustomData("cke-fillingChar", b);
            return b }

        function k(a, b) {
            var c = a && a.removeCustomData("cke-fillingChar");
            if (c) {
                if (!1 !== b) {
                    var d = a.getDocument().getSelection().getNative(),
                        e = d && "None" != d.type && d.getRangeAt(0),
                        f = z.length;
                    if (c.getLength() > f && e && e.intersectsNode(c.$)) {
                        var g = [{ node: d.anchorNode, offset: d.anchorOffset }, { node: d.focusNode, offset: d.focusOffset }];
                        d.anchorNode == c.$ && d.anchorOffset > f && (g[0].offset -= f);
                        d.focusNode == c.$ && d.focusOffset > f && (g[1].offset -= f)
                    }
                }
                c.setText(h(c.getText(), 1));
                g && (c = a.getDocument().$, d = c.getSelection(), c = c.createRange(), c.setStart(g[0].node, g[0].offset), c.collapse(!0), d.removeAllRanges(), d.addRange(c), d.extend(g[1].node, g[1].offset))
            }
        }

        function h(a, b) {
            return b ? a.replace(y, function(a, b) {
                return b ? " " : "" }) : a.replace(z, "") }

        function p(a, b) {
            var c = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' +
                (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px") + '"\x3e' + (b || "\x26nbsp;") + "\x3c/div\x3e", a.document);
            a.fire("lockSnapshot");
            a.editable().append(c);
            var d = a.getSelection(1),
                e = a.createRange(),
                f = d.root.on("selectionchange", function(a) { a.cancel() }, null, null, 0);
            e.setStartAt(c, CKEDITOR.POSITION_AFTER_START);
            e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
            d.selectRanges([e]);
            f.removeListener();
            a.fire("unlockSnapshot");
            a._.hiddenSelectionContainer = c
        }

        function r(a) {
            var b = { 37: 1, 39: 1, 8: 1, 46: 1 };
            return function(c) {
                var d = c.data.getKeystroke();
                if (b[d]) {
                    var e = a.getSelection().getRanges(),
                        f = e[0];
                    1 == e.length && f.collapsed && (d = f[38 > d ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && "false" == d.getAttribute("contenteditable") && (a.getSelection().fake(d), c.data.preventDefault(), c.cancel()) } }
        }

        function f(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                c.getCommonAncestor().isReadOnly() && a.splice(b, 1);
                if (!c.collapsed) {
                    if (c.startContainer.isReadOnly())
                        for (var d =
                                c.startContainer, e; d && !((e = d.type == CKEDITOR.NODE_ELEMENT) && d.is("body") || !d.isReadOnly());) e && "false" == d.getAttribute("contentEditable") && c.setStartAfter(d), d = d.getParent();
                    d = c.startContainer;
                    e = c.endContainer;
                    var f = c.startOffset,
                        g = c.endOffset,
                        h = c.clone();
                    d && d.type == CKEDITOR.NODE_TEXT && (f >= d.getLength() ? h.setStartAfter(d) : h.setStartBefore(d));
                    e && e.type == CKEDITOR.NODE_TEXT && (g ? h.setEndAfter(e) : h.setEndBefore(e));
                    d = new CKEDITOR.dom.walker(h);
                    d.evaluator = function(d) {
                        if (d.type == CKEDITOR.NODE_ELEMENT &&
                            d.isReadOnly()) {
                            var e = c.clone();
                            c.setEndBefore(d);
                            c.collapsed && a.splice(b--, 1);
                            d.getPosition(h.endContainer) & CKEDITOR.POSITION_CONTAINS || (e.setStartAfter(d), e.collapsed || a.splice(b + 1, 0, e));
                            return !0 }
                        return !1
                    };
                    d.next()
                }
            }
            return a
        }
        var B = "function" != typeof window.getSelection,
            u = 1,
            z = CKEDITOR.tools.repeat("​", 7),
            y = new RegExp(z + "( )?", "g"),
            m, x, J = CKEDITOR.dom.walker.invisible(1),
            w = function() {
                function a(b) {
                    return function(a) {
                        var c = a.editor.createRange();
                        c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
                        return !1
                    }
                }

                function b(a) {
                    return function(b) {
                        var c = b.editor,
                            d = c.createRange(),
                            e;
                        (e = d.moveToClosestEditablePosition(b.selected, a)) || (e = d.moveToClosestEditablePosition(b.selected, !a));
                        e && c.getSelection().selectRanges([d]);
                        c.fire("saveSnapshot");
                        b.selected.remove();
                        e || (d.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([d]));
                        c.fire("saveSnapshot");
                        return !1 } }
                var c = a(),
                    d = a(1);
                return { 37: c, 38: c, 39: d, 40: d, 8: b(), 46: b(1) }
            }();
        CKEDITOR.on("instanceCreated", function(b) {
            function c() {
                var a =
                    e.getSelection();
                a && a.removeAllRanges()
            }
            var e = b.editor;
            e.on("contentDom", function() {
                function b() { v = new CKEDITOR.dom.selection(e.getSelection());
                    v.lock() }

                function c() { l.removeListener("mouseup", c);
                    q.removeListener("mouseup", c);
                    var a = CKEDITOR.document.$.selection,
                        b = a.createRange(); "None" != a.type && b.parentElement().ownerDocument == f.$ && b.select() }
                var f = e.document,
                    l = CKEDITOR.document,
                    g = e.editable(),
                    h = f.getBody(),
                    q = f.getDocumentElement(),
                    m = g.isInline(),
                    p, v;
                CKEDITOR.env.gecko && g.attachListener(g, "focus",
                    function(a) { a.removeListener();
                        0 !== p && (a = e.getSelection().getNative()) && a.isCollapsed && a.anchorNode == g.$ && (a = e.createRange(), a.moveToElementEditStart(g), a.select()) }, null, null, -2);
                g.attachListener(g, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() { p && CKEDITOR.env.webkit && (p = e._.previousActive && e._.previousActive.equals(f.getActive())) && null != e._.previousScrollTop && e._.previousScrollTop != g.$.scrollTop && (g.$.scrollTop = e._.previousScrollTop);
                    e.unlockSelection(p);
                    p = 0 }, null, null, -1);
                g.attachListener(g,
                    "mousedown",
                    function() { p = 0 });
                if (CKEDITOR.env.ie || m) B ? g.attachListener(g, "beforedeactivate", b, null, null, -1) : g.attachListener(e, "selectionCheck", b, null, null, -1), g.attachListener(g, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function() { e.lockSelection(v);
                    p = 1 }, null, null, -1), g.attachListener(g, "mousedown", function() { p = 0 });
                if (CKEDITOR.env.ie && !m) {
                    var G;
                    g.attachListener(g, "mousedown", function(a) { 2 == a.data.$.button && ((a = e.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (G = e.window.getScrollPosition())) });
                    g.attachListener(g, "mouseup", function(a) { 2 == a.data.$.button && G && (e.document.$.documentElement.scrollLeft = G.x, e.document.$.documentElement.scrollTop = G.y);
                        G = null });
                    if ("BackCompat" != f.$.compatMode) {
                        if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) {
                            var E, I;
                            q.on("mousedown", function(a) {
                                function b(a) { a = a.data.$;
                                    if (E) {
                                        var c = h.$.createTextRange();
                                        try { c.moveToPoint(a.clientX, a.clientY) } catch (d) {}
                                        E.setEndPoint(0 > I.compareEndPoints("StartToStart", c) ? "EndToEnd" : "StartToStart", c);
                                        E.select() } }

                                function c() {
                                    q.removeListener("mousemove",
                                        b);
                                    l.removeListener("mouseup", c);
                                    q.removeListener("mouseup", c);
                                    E.select()
                                }
                                a = a.data;
                                if (a.getTarget().is("html") && a.$.y < q.$.clientHeight && a.$.x < q.$.clientWidth) { E = h.$.createTextRange();
                                    try { E.moveToPoint(a.$.clientX, a.$.clientY) } catch (d) {}
                                    I = E.duplicate();
                                    q.on("mousemove", b);
                                    l.on("mouseup", c);
                                    q.on("mouseup", c) }
                            })
                        }
                        if (7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version) q.on("mousedown", function(a) { a.data.getTarget().is("html") && (l.on("mouseup", c), q.on("mouseup", c)) })
                    }
                }
                g.attachListener(g, "selectionchange", a,
                    e);
                g.attachListener(g, "keyup", d, e);
                g.attachListener(g, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() { e.forceNextSelectionCheck();
                    e.selectionChange(1) });
                if (m && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
                    var K;
                    g.attachListener(g, "mousedown", function() { K = 1 });
                    g.attachListener(f.getDocumentElement(), "mouseup", function() { K && d.call(e);
                        K = 0 }) } else g.attachListener(CKEDITOR.env.ie ? g : f.getDocumentElement(), "mouseup", d, e);
                CKEDITOR.env.webkit && g.attachListener(f, "keydown", function(a) {
                        switch (a.data.getKey()) {
                            case 13:
                            case 33:
                            case 34:
                            case 35:
                            case 36:
                            case 37:
                            case 39:
                            case 8:
                            case 45:
                            case 46:
                                k(g) } },
                    null, null, -1);
                g.attachListener(g, "keydown", r(e), null, null, -1)
            });
            e.on("setData", function() { e.unlockSelection();
                CKEDITOR.env.webkit && c() });
            e.on("contentDomUnload", function() { e.unlockSelection() });
            if (CKEDITOR.env.ie9Compat) e.on("beforeDestroy", c, null, null, 9);
            e.on("dataReady", function() { delete e._.fakeSelection;
                delete e._.hiddenSelectionContainer;
                e.selectionChange(1) });
            e.on("loadSnapshot", function() {
                var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),
                    b = e.editable().getLast(a);
                b && b.hasAttribute("data-cke-hidden-sel") &&
                    (b.remove(), CKEDITOR.env.gecko && (a = e.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove())
            }, null, null, 100);
            e.on("key", function(a) {
                if ("wysiwyg" == e.mode) {
                    var b = e.getSelection();
                    if (b.isFake) {
                        var c = w[a.data.keyCode];
                        if (c) return c({ editor: e, selected: b.getSelectedElement(), selection: b, keyEvent: a }) } } })
        });
        if (CKEDITOR.env.webkit) CKEDITOR.on("instanceReady", function(a) {
            var b = a.editor;
            b.on("selectionChange", function() {
                var a = b.editable(),
                    c = a.getCustomData("cke-fillingChar");
                c && (c.getCustomData("ready") ? k(a) : c.setCustomData("ready", 1))
            }, null, null, -1);
            b.on("beforeSetMode", function() { k(b.editable()) }, null, null, -1);
            b.on("getSnapshot", function(a) { a.data && (a.data = h(a.data)) }, b, null, 20);
            b.on("toDataFormat", function(a) { a.data.dataValue = h(a.data.dataValue) }, null, null, 0)
        });
        CKEDITOR.editor.prototype.selectionChange = function(b) {
            (b ? a : d).call(this) };
        CKEDITOR.editor.prototype.getSelection = function(a) {
            return !this._.savedSelection && !this._.fakeSelection || a ? (a = this.editable()) && "wysiwyg" ==
                this.mode ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection
        };
        CKEDITOR.editor.prototype.lockSelection = function(a) { a = a || this.getSelection(1);
            return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1 };
        CKEDITOR.editor.prototype.unlockSelection = function(a) {
            var b = this._.savedSelection;
            return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1 };
        CKEDITOR.editor.prototype.forceNextSelectionCheck = function() { delete this._.selectionPreviousPath };
        CKEDITOR.dom.document.prototype.getSelection = function() {
            return new CKEDITOR.dom.selection(this) };
        CKEDITOR.dom.range.prototype.select = function() {
            var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
            a.selectRanges([this]);
            return a };
        CKEDITOR.SELECTION_NONE = 1;
        CKEDITOR.SELECTION_TEXT = 2;
        CKEDITOR.SELECTION_ELEMENT = 3;
        CKEDITOR.dom.selection = function(a) {
            if (a instanceof CKEDITOR.dom.selection) {
                var b = a;
                a = a.root }
            var c = a instanceof CKEDITOR.dom.element;
            this.rev = b ? b.rev : u++;
            this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
            this.root = c ? a : this.document.getBody();
            this.isLocked = 0;
            this._ = { cache: {} };
            if (b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this;
            a = this.getNative();
            var d, e;
            if (a)
                if (a.getRangeAt) d = (e = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(e.commonAncestorContainer);
                else {
                    try { e = a.createRange() } catch (f) {}
                    d = e && CKEDITOR.dom.element.get(e.item && e.item(0) || e.parentElement()) }
            if (!d ||
                d.type != CKEDITOR.NODE_ELEMENT && d.type != CKEDITOR.NODE_TEXT || !this.root.equals(d) && !this.root.contains(d)) this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList;
            return this
        };
        var F = { img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1 };
        CKEDITOR.tools.extend(CKEDITOR.dom.selection, {
            _removeFillingCharSequenceString: h,
            _createFillingCharSequenceNode: g,
            FILLING_CHAR_SEQUENCE: z
        });
        CKEDITOR.dom.selection.prototype = {
            getNative: function() {
                return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = B ? this.document.$.selection : this.document.getWindow().$.getSelection() },
            getType: B ? function() {
                var a = this._.cache;
                if (a.type) return a.type;
                var b = CKEDITOR.SELECTION_NONE;
                try {
                    var c = this.getNative(),
                        d = c.type;
                    "Text" == d && (b = CKEDITOR.SELECTION_TEXT);
                    "Control" == d && (b = CKEDITOR.SELECTION_ELEMENT);
                    c.createRange().parentElement() &&
                        (b = CKEDITOR.SELECTION_TEXT)
                } catch (e) {}
                return a.type = b
            } : function() {
                var a = this._.cache;
                if (a.type) return a.type;
                var b = CKEDITOR.SELECTION_TEXT,
                    c = this.getNative();
                if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE;
                else if (1 == c.rangeCount) {
                    var c = c.getRangeAt(0),
                        d = c.startContainer;
                    d == c.endContainer && 1 == d.nodeType && 1 == c.endOffset - c.startOffset && F[d.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT) }
                return a.type = b },
            getRanges: function() {
                var a = B ? function() {
                    function a(b) {
                        return (new CKEDITOR.dom.node(b)).getIndex() }
                    var b = function(b, c) {
                        b = b.duplicate();
                        b.collapse(c);
                        var d = b.parentElement();
                        if (!d.hasChildNodes()) return { container: d, offset: 0 };
                        for (var e = d.children, f, l, g = b.duplicate(), h = 0, k = e.length - 1, v = -1, n, m; h <= k;)
                            if (v = Math.floor((h + k) / 2), f = e[v], g.moveToElementText(f), n = g.compareEndPoints("StartToStart", b), 0 < n) k = v - 1;
                            else if (0 > n) h = v + 1;
                        else return { container: d, offset: a(f) };
                        if (-1 == v || v == e.length - 1 && 0 > n) {
                            g.moveToElementText(d);
                            g.setEndPoint("StartToStart", b);
                            g = g.text.replace(/(\r\n|\r)/g, "\n").length;
                            e = d.childNodes;
                            if (!g) return f =
                                e[e.length - 1], f.nodeType != CKEDITOR.NODE_TEXT ? { container: d, offset: e.length } : { container: f, offset: f.nodeValue.length };
                            for (d = e.length; 0 < g && 0 < d;) l = e[--d], l.nodeType == CKEDITOR.NODE_TEXT && (m = l, g -= l.nodeValue.length);
                            return { container: m, offset: -g }
                        }
                        g.collapse(0 < n ? !0 : !1);
                        g.setEndPoint(0 < n ? "StartToStart" : "EndToStart", b);
                        g = g.text.replace(/(\r\n|\r)/g, "\n").length;
                        if (!g) return { container: d, offset: a(f) + (0 < n ? 0 : 1) };
                        for (; 0 < g;) try {
                            l = f[0 < n ? "previousSibling" : "nextSibling"], l.nodeType == CKEDITOR.NODE_TEXT && (g -= l.nodeValue.length,
                                m = l), f = l
                        } catch (p) {
                            return { container: d, offset: a(f) } }
                        return { container: m, offset: 0 < n ? -g : m.nodeValue.length + g }
                    };
                    return function() {
                        var a = this.getNative(),
                            c = a && a.createRange(),
                            d = this.getType();
                        if (!a) return [];
                        if (d == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root), d = b(c, !0), a.setStart(new CKEDITOR.dom.node(d.container), d.offset), d = b(c), a.setEnd(new CKEDITOR.dom.node(d.container), d.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() &&
                            a.collapse(), [a];
                        if (d == CKEDITOR.SELECTION_ELEMENT) {
                            for (var d = [], e = 0; e < c.length; e++) {
                                for (var f = c.item(e), g = f.parentNode, l = 0, a = new CKEDITOR.dom.range(this.root); l < g.childNodes.length && g.childNodes[l] != f; l++);
                                a.setStart(new CKEDITOR.dom.node(g), l);
                                a.setEnd(new CKEDITOR.dom.node(g), l + 1);
                                d.push(a) }
                            return d }
                        return []
                    }
                }() : function() {
                    var a = [],
                        b, c = this.getNative();
                    if (!c) return a;
                    for (var d = 0; d < c.rangeCount; d++) {
                        var e = c.getRangeAt(d);
                        b = new CKEDITOR.dom.range(this.root);
                        b.setStart(new CKEDITOR.dom.node(e.startContainer),
                            e.startOffset);
                        b.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset);
                        a.push(b)
                    }
                    return a
                };
                return function(b) {
                    var c = this._.cache,
                        d = c.ranges;
                    d || (c.ranges = d = new CKEDITOR.dom.rangeList(a.call(this)));
                    return b ? f(new CKEDITOR.dom.rangeList(d.slice())) : d }
            }(),
            getStartElement: function() {
                var a = this._.cache;
                if (void 0 !== a.startElement) return a.startElement;
                var b;
                switch (this.getType()) {
                    case CKEDITOR.SELECTION_ELEMENT:
                        return this.getSelectedElement();
                    case CKEDITOR.SELECTION_TEXT:
                        var c = this.getRanges()[0];
                        if (c) {
                            if (c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
                            else {
                                for (c.optimize(); b = c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary();) c.setStartAfter(b);
                                b = c.startContainer;
                                if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent();
                                if ((b = b.getChild(c.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT)
                                    for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;) b = c, c = c.getFirst();
                                else b = c.startContainer }
                            b = b.$ }
                }
                return a.startElement = b ?
                    new CKEDITOR.dom.element(b) : null
            },
            getSelectedElement: function() {
                var a = this._.cache;
                if (void 0 !== a.selectedElement) return a.selectedElement;
                var b = this,
                    c = CKEDITOR.tools.tryThese(function() {
                        return b.getNative().createRange().item(0) }, function() {
                        for (var a = b.getRanges()[0].clone(), c, d, e = 2; e && !((c = a.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && F[c.getName()] && (d = c)); e--) a.shrink(CKEDITOR.SHRINK_ELEMENT);
                        return d && d.$ });
                return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null },
            getSelectedText: function() {
                var a =
                    this._.cache;
                if (void 0 !== a.selectedText) return a.selectedText;
                var b = this.getNative(),
                    b = B ? "Control" == b.type ? "" : b.createRange().text : b.toString();
                return a.selectedText = b
            },
            lock: function() { this.getRanges();
                this.getStartElement();
                this.getSelectedElement();
                this.getSelectedText();
                this._.cache.nativeSel = null;
                this.isLocked = 1 },
            unlock: function(a) {
                if (this.isLocked) {
                    if (a) var b = this.getSelectedElement(),
                        c = !b && this.getRanges(),
                        d = this.isFake;
                    this.isLocked = 0;
                    this.reset();
                    a && (a = b || c[0] && c[0].getCommonAncestor()) &&
                        a.getAscendant("body", 1) && (d ? this.fake(b) : b ? this.selectElement(b) : this.selectRanges(c))
                }
            },
            reset: function() { this._.cache = {};
                this.isFake = 0;
                var a = this.root.editor;
                if (a && a._.fakeSelection)
                    if (this.rev == a._.fakeSelection.rev) { delete a._.fakeSelection;
                        var b = a._.hiddenSelectionContainer;
                        if (b) {
                            var c = a.checkDirty();
                            a.fire("lockSnapshot");
                            b.remove();
                            a.fire("unlockSnapshot");!c && a.resetDirty() }
                        delete a._.hiddenSelectionContainer } else CKEDITOR.warn("selection-fake-reset");
                this.rev = u++ },
            selectElement: function(a) {
                var b =
                    new CKEDITOR.dom.range(this.root);
                b.setStartBefore(a);
                b.setEndAfter(a);
                this.selectRanges([b])
            },
            selectRanges: function(a) {
                var b = this.root.editor,
                    b = b && b._.hiddenSelectionContainer;
                this.reset();
                if (b)
                    for (var b = this.root, c, d = 0; d < a.length; ++d) c = a[d], c.endContainer.equals(b) && (c.endOffset = Math.min(c.endOffset, b.getChildCount()));
                if (a.length)
                    if (this.isLocked) {
                        var f = CKEDITOR.document.getActive();
                        this.unlock();
                        this.selectRanges(a);
                        this.lock();
                        f && !f.equals(this.root) && f.focus() } else {
                        var h;
                        a: {
                            var m, p;
                            if (1 == a.length &&
                                !(p = a[0]).collapsed && (h = p.getEnclosedNode()) && h.type == CKEDITOR.NODE_ELEMENT && (p = p.clone(), p.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (m = p.getEnclosedNode()) && m.type == CKEDITOR.NODE_ELEMENT && (h = m), "false" == h.getAttribute("contenteditable"))) break a;h = void 0
                        }
                        if (h) this.fake(h);
                        else {
                            if (B) {
                                p = CKEDITOR.dom.walker.whitespaces(!0);
                                m = /\ufeff|\u00a0/;
                                b = { table: 1, tbody: 1, tr: 1 };
                                1 < a.length && (h = a[a.length - 1], a[0].setEnd(h.endContainer, h.endOffset));
                                h = a[0];
                                a = h.collapsed;
                                var r, u, y;
                                if ((c = h.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT &&
                                    c.getName() in F && (!c.is("a") || !c.getText())) try { y = c.$.createControlRange();
                                    y.addElement(c.$);
                                    y.select();
                                    return } catch (w) {}
                                if (h.startContainer.type == CKEDITOR.NODE_ELEMENT && h.startContainer.getName() in b || h.endContainer.type == CKEDITOR.NODE_ELEMENT && h.endContainer.getName() in b) h.shrink(CKEDITOR.NODE_ELEMENT, !0), a = h.collapsed;
                                y = h.createBookmark();
                                b = y.startNode;
                                a || (f = y.endNode);
                                y = h.document.$.body.createTextRange();
                                y.moveToElementText(b.$);
                                y.moveStart("character", 1);
                                f ? (m = h.document.$.body.createTextRange(),
                                    m.moveToElementText(f.$), y.setEndPoint("EndToEnd", m), y.moveEnd("character", -1)) : (r = b.getNext(p), u = b.hasAscendant("pre"), r = !(r && r.getText && r.getText().match(m)) && (u || !b.hasPrevious() || b.getPrevious().is && b.getPrevious().is("br")), u = h.document.createElement("span"), u.setHtml("\x26#65279;"), u.insertBefore(b), r && h.document.createText("﻿").insertBefore(b));
                                h.setStartBefore(b);
                                b.remove();
                                a ? (r ? (y.moveStart("character", -1), y.select(), h.document.$.selection.clear()) : y.select(), h.moveToPosition(u, CKEDITOR.POSITION_BEFORE_START),
                                    u.remove()) : (h.setEndBefore(f), f.remove(), y.select())
                            } else {
                                f = this.getNative();
                                if (!f) return;
                                this.removeAllRanges();
                                for (y = 0; y < a.length; y++) {
                                    if (y < a.length - 1 && (r = a[y], u = a[y + 1], m = r.clone(), m.setStart(r.endContainer, r.endOffset), m.setEnd(u.startContainer, u.startOffset), !m.collapsed && (m.shrink(CKEDITOR.NODE_ELEMENT, !0), h = m.getCommonAncestor(), m = m.getEnclosedNode(), h.isReadOnly() || m && m.isReadOnly()))) { u.setStart(r.startContainer, r.startOffset);
                                        a.splice(y--, 1);
                                        continue }
                                    h = a[y];
                                    u = this.document.$.createRange();
                                    h.collapsed && CKEDITOR.env.webkit && e(h) && (m = g(this.root), h.insertNode(m), (r = m.getNext()) && !m.getPrevious() && r.type == CKEDITOR.NODE_ELEMENT && "br" == r.getName() ? (k(this.root), h.moveToPosition(r, CKEDITOR.POSITION_BEFORE_START)) : h.moveToPosition(m, CKEDITOR.POSITION_AFTER_END));
                                    u.setStart(h.startContainer.$, h.startOffset);
                                    try { u.setEnd(h.endContainer.$, h.endOffset) } catch (v) {
                                        if (0 <= v.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")) h.collapse(1), u.setEnd(h.endContainer.$, h.endOffset);
                                        else throw v; }
                                    f.addRange(u)
                                }
                            }
                            this.reset();
                            this.root.fire("selectionchange")
                        }
                    }
            },
            fake: function(a, b) {
                var c = this.root.editor;
                void 0 === b && a.hasAttribute("aria-label") && (b = a.getAttribute("aria-label"));
                this.reset();
                p(c, b);
                var d = this._.cache,
                    e = new CKEDITOR.dom.range(this.root);
                e.setStartBefore(a);
                e.setEndAfter(a);
                d.ranges = new CKEDITOR.dom.rangeList(e);
                d.selectedElement = d.startElement = a;
                d.type = CKEDITOR.SELECTION_ELEMENT;
                d.selectedText = d.nativeSel = null;
                this.isFake = 1;
                this.rev = u++;
                c._.fakeSelection = this;
                this.root.fire("selectionchange") },
            isHidden: function() {
                var a =
                    this.getCommonAncestor();
                a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent());
                return !(!a || !a.data("cke-hidden-sel"))
            },
            createBookmarks: function(a) { a = this.getRanges().createBookmarks(a);
                this.isFake && (a.isFake = 1);
                return a },
            createBookmarks2: function(a) { a = this.getRanges().createBookmarks2(a);
                this.isFake && (a.isFake = 1);
                return a },
            selectBookmarks: function(a) {
                for (var b = [], c, d = 0; d < a.length; d++) {
                    var e = new CKEDITOR.dom.range(this.root);
                    e.moveToBookmark(a[d]);
                    b.push(e) }
                a.isFake && (c = b[0].getEnclosedNode(), c && c.type ==
                    CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), a.isFake = 0));
                a.isFake ? this.fake(c) : this.selectRanges(b);
                return this
            },
            getCommonAncestor: function() {
                var a = this.getRanges();
                return a.length ? a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) : null },
            scrollIntoView: function() { this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView() },
            removeAllRanges: function() {
                if (this.getType() != CKEDITOR.SELECTION_NONE) {
                    var a = this.getNative();
                    try { a && a[B ? "empty" : "removeAllRanges"]() } catch (b) {}
                    this.reset() } }
        }
    })();
    "use strict";
    CKEDITOR.STYLE_BLOCK = 1;
    CKEDITOR.STYLE_INLINE = 2;
    CKEDITOR.STYLE_OBJECT = 3;
    (function() {
        function a(a, b) {
            for (var c, d;
                (a = a.getParent()) && !a.equals(b);)
                if (a.getAttribute("data-nostyle")) c = a;
                else if (!d) {
                var e = a.getAttribute("contentEditable"); "false" == e ? c = a : "true" == e && (d = 1) }
            return c }

        function d(a, b, c, d) {
            return (a.getPosition(b) | d) == d && (!c.childRule || c.childRule(a)) }

        function b(c) {
            var f = c.document;
            if (c.collapsed) f = J(this, f), c.insertNode(f), c.moveToPosition(f, CKEDITOR.POSITION_BEFORE_END);
            else {
                var g = this.element,
                    h = this._.definition,
                    l, k = h.ignoreReadonly,
                    m = k || h.includeReadonly;
                null ==
                    m && (m = c.root.getCustomData("cke_includeReadonly"));
                var n = CKEDITOR.dtd[g];
                n || (l = !0, n = CKEDITOR.dtd.span);
                c.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                c.trim();
                var p = c.createBookmark(),
                    q = p.startNode,
                    r = p.endNode,
                    u = q,
                    t;
                if (!k) {
                    var w = c.getCommonAncestor(),
                        k = a(q, w),
                        w = a(r, w);
                    k && (u = k.getNextSourceNode(!0));
                    w && (r = w) }
                for (u.getPosition(r) == CKEDITOR.POSITION_FOLLOWING && (u = 0); u;) {
                    k = !1;
                    if (u.equals(r)) u = null, k = !0;
                    else {
                        var z = u.type == CKEDITOR.NODE_ELEMENT ? u.getName() : null,
                            w = z && "false" == u.getAttribute("contentEditable"),
                            x = z &&
                            u.getAttribute("data-nostyle");
                        if (z && u.data("cke-bookmark")) { u = u.getNextSourceNode(!0);
                            continue }
                        if (w && m && CKEDITOR.dtd.$block[z])
                            for (var B = u, A = e(B), C = void 0, D = A.length, F = 0, B = D && new CKEDITOR.dom.range(B.getDocument()); F < D; ++F) {
                                var C = A[F],
                                    M = CKEDITOR.filter.instances[C.data("cke-filter")];
                                if (M ? M.check(this) : 1) B.selectNodeContents(C), b.call(this, B) }
                        A = z ? !n[z] || x ? 0 : w && !m ? 0 : d(u, r, h, Q) : 1;
                        if (A)
                            if (C = u.getParent(), A = h, D = g, F = l, !C || !(C.getDtd() || CKEDITOR.dtd.span)[D] && !F || A.parentRule && !A.parentRule(C)) k = !0;
                            else {
                                if (t ||
                                    z && CKEDITOR.dtd.$removeEmpty[z] && (u.getPosition(r) | Q) != Q || (t = c.clone(), t.setStartBefore(u)), z = u.type, z == CKEDITOR.NODE_TEXT || w || z == CKEDITOR.NODE_ELEMENT && !u.getChildCount()) {
                                    for (var z = u, R;
                                        (k = !z.getNext(H)) && (R = z.getParent(), n[R.getName()]) && d(R, q, h, P);) z = R;
                                    t.setEndAfter(z) }
                            }
                        else k = !0;
                        u = u.getNextSourceNode(x || w)
                    }
                    if (k && t && !t.collapsed) {
                        for (var k = J(this, f), w = k.hasAttributes(), x = t.getCommonAncestor(), z = {}, A = {}, C = {}, D = {}, W, T, ca; k && x;) {
                            if (x.getName() == g) {
                                for (W in h.attributes) !D[W] && (ca = x.getAttribute(T)) &&
                                    (k.getAttribute(W) == ca ? A[W] = 1 : D[W] = 1);
                                for (T in h.styles) !C[T] && (ca = x.getStyle(T)) && (k.getStyle(T) == ca ? z[T] = 1 : C[T] = 1)
                            }
                            x = x.getParent()
                        }
                        for (W in A) k.removeAttribute(W);
                        for (T in z) k.removeStyle(T);
                        w && !k.hasAttributes() && (k = null);
                        k ? (t.extractContents().appendTo(k), t.insertNode(k), y.call(this, k), k.mergeSiblings(), CKEDITOR.env.ie || k.$.normalize()) : (k = new CKEDITOR.dom.element("span"), t.extractContents().appendTo(k), t.insertNode(k), y.call(this, k), k.remove(!0));
                        t = null
                    }
                }
                c.moveToBookmark(p);
                c.shrink(CKEDITOR.SHRINK_TEXT);
                c.shrink(CKEDITOR.NODE_ELEMENT, !0)
            }
        }

        function c(a) {
            function b() {
                for (var a = new CKEDITOR.dom.elementPath(d.getParent()), c = new CKEDITOR.dom.elementPath(n.getParent()), e = null, f = null, g = 0; g < a.elements.length; g++) {
                    var h = a.elements[g];
                    if (h == a.block || h == a.blockLimit) break;
                    p.checkElementRemovable(h, !0) && (e = h) }
                for (g = 0; g < c.elements.length; g++) { h = c.elements[g];
                    if (h == c.block || h == c.blockLimit) break;
                    p.checkElementRemovable(h, !0) && (f = h) }
                f && n.breakParent(f);
                e && d.breakParent(e) }
            a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
            var c =
                a.createBookmark(),
                d = c.startNode;
            if (a.collapsed) {
                for (var e = new CKEDITOR.dom.elementPath(d.getParent(), a.root), f, g = 0, h; g < e.elements.length && (h = e.elements[g]) && h != e.block && h != e.blockLimit; g++)
                    if (this.checkElementRemovable(h)) {
                        var k;
                        a.collapsed && (a.checkBoundaryOfElement(h, CKEDITOR.END) || (k = a.checkBoundaryOfElement(h, CKEDITOR.START))) ? (f = h, f.match = k ? "start" : "end") : (h.mergeSiblings(), h.is(this.element) ? z.call(this, h) : m(h, l(this)[h.getName()])) }
                if (f) {
                    h = d;
                    for (g = 0;; g++) {
                        k = e.elements[g];
                        if (k.equals(f)) break;
                        else if (k.match) continue;
                        else k = k.clone();
                        k.append(h);
                        h = k
                    }
                    h["start" == f.match ? "insertBefore" : "insertAfter"](f)
                }
            } else {
                var n = c.endNode,
                    p = this;
                b();
                for (e = d; !e.equals(n);) f = e.getNextSourceNode(), e.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(e) && (e.getName() == this.element ? z.call(this, e) : m(e, l(this)[e.getName()]), f.type == CKEDITOR.NODE_ELEMENT && f.contains(d) && (b(), f = d.getNext())), e = f }
            a.moveToBookmark(c);
            a.shrink(CKEDITOR.NODE_ELEMENT, !0)
        }

        function e(a) {
            var b = [];
            a.forEach(function(a) {
                if ("true" ==
                    a.getAttribute("contenteditable")) return b.push(a), !1
            }, CKEDITOR.NODE_ELEMENT, !0);
            return b
        }

        function g(a) {
            var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0);
            (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && w(a, this) }

        function k(a) {
            var b = a.getCommonAncestor(!0, !0);
            if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                var b = this._.definition,
                    c = b.attributes;
                if (c)
                    for (var d in c) a.removeAttribute(d, c[d]);
                if (b.styles)
                    for (var e in b.styles) b.styles.hasOwnProperty(e) &&
                        a.removeStyle(e)
            }
        }

        function h(a) {
            var b = a.createBookmark(!0),
                c = a.createIterator();
            c.enforceRealBlocks = !0;
            this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR);
            for (var d, e = a.document, f; d = c.getNextParagraph();) !d.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (f = J(this, e, d), r(d, f));
            a.moveToBookmark(b) }

        function p(a) {
            var b = a.createBookmark(1),
                c = a.createIterator();
            c.enforceRealBlocks = !0;
            c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
            for (var d, e; d = c.getNextParagraph();) this.checkElementRemovable(d) &&
                (d.is("pre") ? ((e = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && d.copyAttributes(e), r(d, e)) : z.call(this, d));
            a.moveToBookmark(b)
        }

        function r(a, b) {
            var c = !b;
            c && (b = a.getDocument().createElement("div"), a.copyAttributes(b));
            var d = b && b.is("pre"),
                e = a.is("pre"),
                g = !d && e;
            if (d && !e) {
                e = b;
                (g = a.getBogus()) && g.remove();
                g = a.getHtml();
                g = B(g, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
                g = g.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
                g = g.replace(/([ \t\n\r]+|&nbsp;)/g,
                    " ");
                g = g.replace(/<br\b[^>]*>/gi, "\n");
                if (CKEDITOR.env.ie) {
                    var h = a.getDocument().createElement("div");
                    h.append(e);
                    e.$.outerHTML = "\x3cpre\x3e" + g + "\x3c/pre\x3e";
                    e.copyAttributes(h.getFirst());
                    e = h.getFirst().remove() } else e.setHtml(g);
                b = e
            } else g ? b = u(c ? [a.getHtml()] : f(a), b) : a.moveChildren(b);
            b.replace(a);
            if (d) {
                var c = b,
                    k;
                (k = c.getPrevious(R)) && k.type == CKEDITOR.NODE_ELEMENT && k.is("pre") && (d = B(k.getHtml(), /\n$/, "") + "\n\n" + B(c.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? c.$.outerHTML = "\x3cpre\x3e" + d + "\x3c/pre\x3e" :
                    c.setHtml(d), k.remove())
            } else c && x(b)
        }

        function f(a) {
            var b = [];
            B(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(a, b, c) {
                return b + "\x3c/pre\x3e" + c + "\x3cpre\x3e" }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(a, c) { b.push(c) });
            return b }

        function B(a, b, c) {
            var d = "",
                e = "";
            a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(a, b, c) { b && (d = b);
                c && (e = c);
                return "" });
            return d + a.replace(b, c) + e }

        function u(a, b) {
            var c;
            1 < a.length && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
            for (var d = 0; d < a.length; d++) {
                var e = a[d],
                    e = e.replace(/(\r\n|\r)/g, "\n"),
                    e = B(e, /^[ \t]*\n/, ""),
                    e = B(e, /\n$/, ""),
                    e = B(e, /^[ \t]+|[ \t]+$/g, function(a, b) {
                        return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }),
                    e = e.replace(/\n/g, "\x3cbr\x3e"),
                    e = e.replace(/[ \t]{2,}/g, function(a) {
                        return CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " });
                if (c) {
                    var f = b.clone();
                    f.setHtml(e);
                    c.append(f)
                } else b.setHtml(e)
            }
            return c || b
        }

        function z(a, b) {
            var c = this._.definition,
                d = c.attributes,
                c = c.styles,
                e = l(this)[a.getName()],
                f = CKEDITOR.tools.isEmpty(d) && CKEDITOR.tools.isEmpty(c),
                g;
            for (g in d)
                if ("class" != g && !this._.definition.fullMatch || a.getAttribute(g) == q(g, d[g])) b && "data-" == g.slice(0, 5) || (f = a.hasAttribute(g), a.removeAttribute(g));
            for (var h in c) this._.definition.fullMatch && a.getStyle(h) != q(h, c[h], !0) || (f = f || !!a.getStyle(h), a.removeStyle(h));
            m(a, e, A[a.getName()]);
            f && (this._.definition.alwaysRemoveElement ?
                x(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? x(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
        }

        function y(a) {
            for (var b = l(this), c = a.getElementsByTag(this.element), d, e = c.count(); 0 <= --e;) d = c.getItem(e), d.isReadOnly() || z.call(this, d, !0);
            for (var f in b)
                if (f != this.element)
                    for (c = a.getElementsByTag(f), e = c.count() - 1; 0 <= e; e--) d = c.getItem(e), d.isReadOnly() || m(d, b[f]) }

        function m(a, b, c) {
            if (b = b && b.attributes)
                for (var d = 0; d < b.length; d++) {
                    var e = b[d][0],
                        f;
                    if (f = a.getAttribute(e)) {
                        var g = b[d][1];
                        (null === g || g.test && g.test(f) || "string" == typeof g && f == g) && a.removeAttribute(e) }
                }
            c || x(a)
        }

        function x(a, b) {
            if (!a.hasAttributes() || b)
                if (CKEDITOR.dtd.$block[a.getName()]) {
                    var c = a.getPrevious(R),
                        d = a.getNext(R);!c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({ br: 1 }) || a.append("br", 1);!d || d.type != CKEDITOR.NODE_TEXT && d.isBlockBoundary({ br: 1 }) || a.append("br");
                    a.remove(!0) } else c = a.getFirst(), d = a.getLast(), a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(),
                    d && !c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings())
        }

        function J(a, b, c) {
            var d;
            d = a.element; "*" == d && (d = "span");
            d = new CKEDITOR.dom.element(d, b);
            c && c.copyAttributes(d);
            d = w(d, a);
            b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1);
            return d }

        function w(a, b) {
            var c = b._.definition,
                d = c.attributes,
                c = CKEDITOR.style.getStyleText(c);
            if (d)
                for (var e in d) a.setAttribute(e, d[e]);
            c && a.setAttribute("style", c);
            return a }

        function F(a,
            b) {
            for (var c in a) a[c] = a[c].replace(M, function(a, c) {
                return b[c] }) }

        function l(a) {
            if (a._.overrides) return a._.overrides;
            var b = a._.overrides = {},
                c = a._.definition.overrides;
            if (c) { CKEDITOR.tools.isArray(c) || (c = [c]);
                for (var d = 0; d < c.length; d++) {
                    var e = c[d],
                        f, g; "string" == typeof e ? f = e.toLowerCase() : (f = e.element ? e.element.toLowerCase() : a.element, g = e.attributes);
                    e = b[f] || (b[f] = {});
                    if (g) {
                        var e = e.attributes = e.attributes || [],
                            h;
                        for (h in g) e.push([h.toLowerCase(), g[h]]) } } }
            return b }

        function q(a, b, c) {
            var d = new CKEDITOR.dom.element("span");
            d[c ? "setStyle" : "setAttribute"](a, b);
            return d[c ? "getStyle" : "getAttribute"](a)
        }

        function n(a, b) {
            function c(a, b) {
                return "font-family" == b.toLowerCase() ? a.replace(/["']/g, "") : a } "string" == typeof a && (a = CKEDITOR.tools.parseCssText(a)); "string" == typeof b && (b = CKEDITOR.tools.parseCssText(b, !0));
            for (var d in a)
                if (!(d in b) || c(b[d], d) != c(a[d], d) && "inherit" != a[d] && "inherit" != b[d]) return !1;
            return !0 }

        function t(a, b, c) {
            var d = a.document,
                e = a.getRanges();
            b = b ? this.removeFromRange : this.applyToRange;
            for (var f, g = e.createIterator(); f =
                g.getNextRange();) b.call(this, f, c);
            a.selectRanges(e);
            d.removeCustomData("doc_processing_style")
        }
        var A = { address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1 },
            C = { a: 1, blockquote: 1, embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1, audio: 1, video: 1 },
            D = /\s*(?:;\s*|$)/,
            M = /#\((.+?)\)/g,
            H = CKEDITOR.dom.walker.bookmark(0,
                1),
            R = CKEDITOR.dom.walker.whitespaces(1);
        CKEDITOR.style = function(a, b) {
            if ("string" == typeof a.type) return new CKEDITOR.style.customHandlers[a.type](a);
            var c = a.attributes;
            c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style);
            b && (a = CKEDITOR.tools.clone(a), F(a.attributes, b), F(a.styles, b));
            c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() : a.element : "*";
            this.type = a.type || (A[c] ? CKEDITOR.STYLE_BLOCK : C[c] ? CKEDITOR.STYLE_OBJECT :
                CKEDITOR.STYLE_INLINE);
            "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT);
            this._ = { definition: a }
        };
        CKEDITOR.style.prototype = {
            apply: function(a) {
                if (a instanceof CKEDITOR.dom.document) return t.call(this, a.getSelection());
                if (this.checkApplicable(a.elementPath(), a)) {
                    var b = this._.enterMode;
                    b || (this._.enterMode = a.activeEnterMode);
                    t.call(this, a.getSelection(), 0, a);
                    this._.enterMode = b } },
            remove: function(a) {
                if (a instanceof CKEDITOR.dom.document) return t.call(this, a.getSelection(), 1);
                if (this.checkApplicable(a.elementPath(),
                        a)) {
                    var b = this._.enterMode;
                    b || (this._.enterMode = a.activeEnterMode);
                    t.call(this, a.getSelection(), 1, a);
                    this._.enterMode = b }
            },
            applyToRange: function(a) { this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? h : this.type == CKEDITOR.STYLE_OBJECT ? g : null;
                return this.applyToRange(a) },
            removeFromRange: function(a) { this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? p : this.type == CKEDITOR.STYLE_OBJECT ? k : null;
                return this.removeFromRange(a) },
            applyToObject: function(a) {
                w(a,
                    this)
            },
            checkActive: function(a, b) {
                switch (this.type) {
                    case CKEDITOR.STYLE_BLOCK:
                        return this.checkElementRemovable(a.block || a.blockLimit, !0, b);
                    case CKEDITOR.STYLE_OBJECT:
                    case CKEDITOR.STYLE_INLINE:
                        for (var c = a.elements, d = 0, e; d < c.length; d++)
                            if (e = c[d], this.type != CKEDITOR.STYLE_INLINE || e != a.block && e != a.blockLimit) {
                                if (this.type == CKEDITOR.STYLE_OBJECT) {
                                    var f = e.getName();
                                    if (!("string" == typeof this.element ? f == this.element : f in this.element)) continue }
                                if (this.checkElementRemovable(e, !0, b)) return !0 } }
                return !1 },
            checkApplicable: function(a,
                b, c) { b && b instanceof CKEDITOR.filter && (c = b);
                if (c && !c.check(this)) return !1;
                switch (this.type) {
                    case CKEDITOR.STYLE_OBJECT:
                        return !!a.contains(this.element);
                    case CKEDITOR.STYLE_BLOCK:
                        return !!a.blockLimit.getDtd()[this.element] }
                return !0 },
            checkElementMatch: function(a, b) {
                var c = this._.definition;
                if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1;
                var d = a.getName();
                if ("string" == typeof this.element ? d == this.element : d in this.element) {
                    if (!b && !a.hasAttributes()) return !0;
                    if (d = c._AC) c = d;
                    else {
                        var d = {},
                            e = 0,
                            f = c.attributes;
                        if (f)
                            for (var g in f) e++, d[g] = f[g];
                        if (g = CKEDITOR.style.getStyleText(c)) d.style || e++, d.style = g;
                        d._length = e;
                        c = c._AC = d
                    }
                    if (c._length) {
                        for (var h in c)
                            if ("_length" != h)
                                if (d = a.getAttribute(h) || "", "style" == h ? n(c[h], d) : c[h] == d) {
                                    if (!b) return !0 } else if (b) return !1;
                        if (b) return !0 } else return !0
                }
                return !1
            },
            checkElementRemovable: function(a, b, c) {
                if (this.checkElementMatch(a, b, c)) return !0;
                if (b = l(this)[a.getName()]) {
                    var d;
                    if (!(b = b.attributes)) return !0;
                    for (c = 0; c < b.length; c++)
                        if (d = b[c][0], d = a.getAttribute(d)) {
                            var e = b[c][1];
                            if (null === e) return !0;
                            if ("string" == typeof e) {
                                if (d == e) return !0 } else if (e.test(d)) return !0
                        }
                }
                return !1
            },
            buildPreview: function(a) {
                var b = this._.definition,
                    c = [],
                    d = b.element; "bdo" == d && (d = "span");
                var c = ["\x3c", d],
                    e = b.attributes;
                if (e)
                    for (var f in e) c.push(" ", f, '\x3d"', e[f], '"');
                (e = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', e, '"');
                c.push("\x3e", a || b.name, "\x3c/", d, "\x3e");
                return c.join("") },
            getDefinition: function() {
                return this._.definition }
        };
        CKEDITOR.style.getStyleText = function(a) {
            var b = a._ST;
            if (b) return b;
            var b = a.styles,
                c = a.attributes && a.attributes.style || "",
                d = "";
            c.length && (c = c.replace(D, ";"));
            for (var e in b) {
                var f = b[e],
                    g = (e + ":" + f).replace(D, ";"); "inherit" == f ? d += g : c += g }
            c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0));
            return a._ST = c + d
        };
        CKEDITOR.style.customHandlers = {};
        CKEDITOR.style.addCustomHandler = function(a) {
            var b = function(a) { this._ = { definition: a };
                this.setup && this.setup(a) };
            b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), { assignedTo: CKEDITOR.STYLE_OBJECT },
                a, !0);
            return this.customHandlers[a.type] = b
        };
        var Q = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED,
            P = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
    })();
    CKEDITOR.styleCommand = function(a, d) { this.requiredContent = this.allowedContent = this.style = a;
        CKEDITOR.tools.extend(this, d, !0) };
    CKEDITOR.styleCommand.prototype.exec = function(a) { a.focus();
        this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style) };
    CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet");
    CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet);
    CKEDITOR.loadStylesSet = function(a, d, b) { CKEDITOR.stylesSet.addExternal(a, d, "");
        CKEDITOR.stylesSet.load(a, b) };
    CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        attachStyleStateChange: function(a, d) {
            var b = this._.styleStateChangeCallbacks;
            b || (b = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function(a) {
                for (var d = 0; d < b.length; d++) {
                    var g = b[d],
                        k = g.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                    g.fn.call(this, k) } }));
            b.push({ style: a, fn: d }) },
        applyStyle: function(a) { a.apply(this) },
        removeStyle: function(a) { a.remove(this) },
        getStylesSet: function(a) {
            if (this._.stylesDefinitions) a(this._.stylesDefinitions);
            else {
                var d = this,
                    b = d.config.stylesCombo_stylesSet || d.config.stylesSet;
                if (!1 === b) a(null);
                else if (b instanceof Array) d._.stylesDefinitions = b, a(b);
                else { b || (b = "default");
                    var b = b.split(":"),
                        c = b[0];
                    CKEDITOR.stylesSet.addExternal(c, b[1] ? b.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
                    CKEDITOR.stylesSet.load(c, function(b) { d._.stylesDefinitions = b[c];
                        a(d._.stylesDefinitions) }) } }
        }
    });
    CKEDITOR.dom.comment = function(a, d) { "string" == typeof a && (a = (d ? d.$ : document).createComment(a));
        CKEDITOR.dom.domObject.call(this, a) };
    CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node;
    CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, { type: CKEDITOR.NODE_COMMENT, getOuterHtml: function() {
            return "\x3c!--" + this.$.nodeValue + "--\x3e" } });
    "use strict";
    (function() {
        var a = {},
            d = {},
            b;
        for (b in CKEDITOR.dtd.$blockLimit) b in CKEDITOR.dtd.$list || (a[b] = 1);
        for (b in CKEDITOR.dtd.$block) b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (d[b] = 1);
        CKEDITOR.dom.elementPath = function(b, e) {
            var g = null,
                k = null,
                h = [],
                p = b,
                r;
            e = e || b.getDocument().getBody();
            do
                if (p.type == CKEDITOR.NODE_ELEMENT) {
                    h.push(p);
                    if (!this.lastElement && (this.lastElement = p, p.is(CKEDITOR.dtd.$object) || "false" == p.getAttribute("contenteditable"))) continue;
                    if (p.equals(e)) break;
                    if (!k && (r = p.getName(),
                            "true" == p.getAttribute("contenteditable") ? k = p : !g && d[r] && (g = p), a[r])) {
                        if (r = !g && "div" == r) { a: { r = p.getChildren();
                                for (var f = 0, B = r.count(); f < B; f++) {
                                    var u = r.getItem(f);
                                    if (u.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[u.getName()]) { r = !0;
                                        break a } }
                                r = !1 }
                            r = !r }
                        r ? g = p : k = p }
                }
            while (p = p.getParent());
            k || (k = e);
            this.block = g;
            this.blockLimit = k;
            this.root = e;
            this.elements = h
        }
    })();
    CKEDITOR.dom.elementPath.prototype = {
        compare: function(a) {
            var d = this.elements;
            a = a && a.elements;
            if (!a || d.length != a.length) return !1;
            for (var b = 0; b < d.length; b++)
                if (!d[b].equals(a[b])) return !1;
            return !0 },
        contains: function(a, d, b) {
            var c;
            "string" == typeof a && (c = function(b) {
                return b.getName() == a });
            a instanceof CKEDITOR.dom.element ? c = function(b) {
                return b.equals(a) } : CKEDITOR.tools.isArray(a) ? c = function(b) {
                return -1 < CKEDITOR.tools.indexOf(a, b.getName()) } : "function" == typeof a ? c = a : "object" == typeof a && (c = function(b) {
                return b.getName() in
                    a
            });
            var e = this.elements,
                g = e.length;
            d && g--;
            b && (e = Array.prototype.slice.call(e, 0), e.reverse());
            for (d = 0; d < g; d++)
                if (c(e[d])) return e[d];
            return null
        },
        isContextFor: function(a) {
            var d;
            return a in CKEDITOR.dtd.$block ? (d = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!d.getDtd()[a]) : !0 },
        direction: function() {
            return (this.block || this.blockLimit || this.root).getDirection(1) }
    };
    CKEDITOR.dom.text = function(a, d) { "string" == typeof a && (a = (d ? d.$ : document).createTextNode(a));
        this.$ = a };
    CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node;
    CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
        type: CKEDITOR.NODE_TEXT,
        getLength: function() {
            return this.$.nodeValue.length },
        getText: function() {
            return this.$.nodeValue },
        setText: function(a) { this.$.nodeValue = a },
        split: function(a) {
            var d = this.$.parentNode,
                b = d.childNodes.length,
                c = this.getLength(),
                e = this.getDocument(),
                g = new CKEDITOR.dom.text(this.$.splitText(a), e);
            d.childNodes.length == b && (a >= c ? (g = e.createText(""), g.insertAfter(this)) : (a = e.createText(""), a.insertAfter(g), a.remove()));
            return g },
        substring: function(a,
            d) {
            return "number" != typeof d ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, d) }
    });
    (function() {
        function a(a, c, d) {
            var g = a.serializable,
                k = c[d ? "endContainer" : "startContainer"],
                h = d ? "endOffset" : "startOffset",
                p = g ? c.document.getById(a.startNode) : a.startNode;
            a = g ? c.document.getById(a.endNode) : a.endNode;
            k.equals(p.getPrevious()) ? (c.startOffset = c.startOffset - k.getLength() - a.getPrevious().getLength(), k = a.getNext()) : k.equals(a.getPrevious()) && (c.startOffset -= k.getLength(), k = a.getNext());
            k.equals(p.getParent()) && c[h]++;
            k.equals(a.getParent()) && c[h]++;
            c[d ? "endContainer" : "startContainer"] = k;
            return c }
        CKEDITOR.dom.rangeList = function(a) {
            if (a instanceof CKEDITOR.dom.rangeList) return a;
            a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = [];
            return CKEDITOR.tools.extend(a, d) };
        var d = {
            createIterator: function() {
                var a = this,
                    c = CKEDITOR.dom.walker.bookmark(),
                    d = [],
                    g;
                return {
                    getNextRange: function(k) {
                        g = void 0 === g ? 0 : g + 1;
                        var h = a[g];
                        if (h && 1 < a.length) {
                            if (!g)
                                for (var p = a.length - 1; 0 <= p; p--) d.unshift(a[p].createBookmark(!0));
                            if (k)
                                for (var r = 0; a[g + r + 1];) {
                                    var f = h.document;
                                    k = 0;
                                    p = f.getById(d[r].endNode);
                                    for (f = f.getById(d[r + 1].startNode);;) {
                                        p =
                                            p.getNextSourceNode(!1);
                                        if (f.equals(p)) k = 1;
                                        else if (c(p) || p.type == CKEDITOR.NODE_ELEMENT && p.isBlockBoundary()) continue;
                                        break
                                    }
                                    if (!k) break;
                                    r++
                                }
                            for (h.moveToBookmark(d.shift()); r--;) p = a[++g], p.moveToBookmark(d.shift()), h.setEnd(p.endContainer, p.endOffset)
                        }
                        return h
                    }
                }
            },
            createBookmarks: function(b) {
                for (var c = [], d, g = 0; g < this.length; g++) { c.push(d = this[g].createBookmark(b, !0));
                    for (var k = g + 1; k < this.length; k++) this[k] = a(d, this[k]), this[k] = a(d, this[k], !0) }
                return c },
            createBookmarks2: function(a) {
                for (var c = [], d = 0; d <
                    this.length; d++) c.push(this[d].createBookmark2(a));
                return c
            },
            moveToBookmarks: function(a) {
                for (var c = 0; c < this.length; c++) this[c].moveToBookmark(a[c]) }
        }
    })();
    (function() {
        function a() {
            return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/") }

        function d(b) {
            var c = CKEDITOR.skin["ua_" + b],
                d = CKEDITOR.env;
            if (c)
                for (var c = c.split(",").sort(function(a, b) {
                        return a > b ? -1 : 1 }), e = 0, g; e < c.length; e++)
                    if (g = c[e], d.ie && (g.replace(/^ie/, "") == d.version || d.quirks && "iequirks" == g) && (g = "ie"), d[g]) { b += "_" + c[e];
                        break }
            return CKEDITOR.getUrl(a() + b + ".css") }

        function b(a, b) { g[a] || (CKEDITOR.document.appendStyleSheet(d(a)), g[a] = 1);
            b && b() }

        function c(a) {
            var b =
                a.getById(k);
            b || (b = a.getHead().append("style"), b.setAttribute("id", k), b.setAttribute("type", "text/css"));
            return b
        }

        function e(a, b, c) {
            var d, e, g;
            if (CKEDITOR.env.webkit)
                for (b = b.split("}").slice(0, -1), e = 0; e < b.length; e++) b[e] = b[e].split("{");
            for (var h = 0; h < a.length; h++)
                if (CKEDITOR.env.webkit)
                    for (e = 0; e < b.length; e++) { g = b[e][1];
                        for (d = 0; d < c.length; d++) g = g.replace(c[d][0], c[d][1]);
                        a[h].$.sheet.addRule(b[e][0], g) } else {
                        g = b;
                        for (d = 0; d < c.length; d++) g = g.replace(c[d][0], c[d][1]);
                        CKEDITOR.env.ie && 11 > CKEDITOR.env.version ?
                            a[h].$.styleSheet.cssText += g : a[h].$.innerHTML += g
                    }
        }
        var g = {};
        CKEDITOR.skin = {
            path: a,
            loadPart: function(c, d) { CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function() { b(c, d) }) : b(c, d) },
            getPath: function(a) {
                return CKEDITOR.getUrl(d(a)) },
            icons: {},
            addIcon: function(a, b, c, d) { a = a.toLowerCase();
                this.icons[a] || (this.icons[a] = { path: b, offset: c || 0, bgsize: d || "16px" }) },
            getIconStyle: function(a, b, c, d, e) {
                var g;
                a && (a = a.toLowerCase(), b && (g = this.icons[a + "-rtl"]),
                    g || (g = this.icons[a]));
                a = c || g && g.path || "";
                d = d || g && g.offset;
                e = e || g && g.bgsize || "16px";
                a && (a = a.replace(/'/g, "\\'"));
                return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + d + "px;background-size:" + e + ";"
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            getUiColor: function() {
                return this.uiColor },
            setUiColor: function(a) {
                var b = c(CKEDITOR.document);
                return (this.setUiColor = function(a) {
                    this.uiColor = a;
                    var c = CKEDITOR.skin.chameleon,
                        d = "",
                        g = "";
                    "function" == typeof c && (d = c(this, "editor"), g =
                        c(this, "panel"));
                    a = [
                        [p, a]
                    ];
                    e([b], d, a);
                    e(h, g, a)
                }).call(this, a)
            }
        });
        var k = "cke_ui_color",
            h = [],
            p = /\$color/g;
        CKEDITOR.on("instanceLoaded", function(a) {
            if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                var b = a.editor;
                a = function(a) { a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
                    if (!a.getById("cke_ui_color")) { a = c(a);
                        h.push(a);
                        var d = b.getUiColor();
                        d && e([a], CKEDITOR.skin.chameleon(b, "panel"), [
                            [p, d]
                        ]) } };
                b.on("panelShow", a);
                b.on("menuShow", a);
                b.config.uiColor && b.setUiColor(b.config.uiColor) } })
    })();
    (function() {
        if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1;
        else {
            var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e', CKEDITOR.document);
            a.appendTo(CKEDITOR.document.getHead());
            try {
                var d = a.getComputedStyle("border-top-color"),
                    b = a.getComputedStyle("border-right-color");
                CKEDITOR.env.hc = !(!d || d != b) } catch (c) { CKEDITOR.env.hc = !1 }
            a.remove() }
        CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc");
        CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
        CKEDITOR.status = "loaded";
        CKEDITOR.fireOnce("loaded");
        if (a = CKEDITOR._.pending)
            for (delete CKEDITOR._.pending, d = 0; d < a.length; d++) CKEDITOR.editor.prototype.constructor.apply(a[d][0], a[d][1]), CKEDITOR.add(a[d][0])
    })();
    /*
     Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
     For licensing, see LICENSE.md or http://ckeditor.com/license
    */
    CKEDITOR.skin.name = "moono-lisa";
    CKEDITOR.skin.ua_editor = "ie,iequirks,ie8,gecko";
    CKEDITOR.skin.ua_dialog = "ie,iequirks,ie8";
    CKEDITOR.skin.chameleon = function() {
        var b = function() {
                return function(b, d) {
                    for (var a = b.match(/[^#]./g), e = 0; 3 > e; e++) {
                        var f = e,
                            c;
                        c = parseInt(a[e], 16);
                        c = ("0" + (0 > d ? 0 | c * (1 + d) : 0 | c + (255 - c) * d).toString(16)).slice(-2);
                        a[f] = c }
                    return "#" + a.join("") } }(),
            f = { editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "), panel: new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ") };
        return function(g, d) {
            var a = b(g.uiColor, .4),
                a = { id: "." + g.id, defaultBorder: b(a, -.2), toolbarElementsBorder: b(a, -.25), defaultBackground: a, lightBackground: b(a, .8), darkBackground: b(a, -.15), ckeButtonOn: b(a, .4), ckeResizer: b(a, -.4), ckeColorauto: b(a, .8), dialogBody: b(a, .7), dialogTab: b(a, .65), dialogTabSelected: "#FFF", dialogTabSelectedBorder: "#FFF", elementsPathColor: b(a, -.6), menubuttonHover: b(a, .1), menubuttonIcon: b(a, .5), menubuttonIconHover: b(a, .3) };
            return f[d].output(a).replace(/\[/g, "{").replace(/\]/g, "}") }
    }();
    CKEDITOR.plugins.add("dialogui", {
        onLoad: function() {
            var h = function(b) { this._ || (this._ = {});
                    this._["default"] = this._.initValue = b["default"] || "";
                    this._.required = b.required || !1;
                    for (var a = [this._], d = 1; d < arguments.length; d++) a.push(arguments[d]);
                    a.push(!0);
                    CKEDITOR.tools.extend.apply(CKEDITOR.tools, a);
                    return this._ },
                v = { build: function(b, a, d) {
                        return new CKEDITOR.ui.dialog.textInput(b, a, d) } },
                n = { build: function(b, a, d) {
                        return new CKEDITOR.ui.dialog[a.type](b, a, d) } },
                q = {
                    isChanged: function() {
                        return this.getValue() !=
                            this.getInitValue()
                    },
                    reset: function(b) { this.setValue(this.getInitValue(), b) },
                    setInitValue: function() { this._.initValue = this.getValue() },
                    resetInitValue: function() { this._.initValue = this._["default"] },
                    getInitValue: function() {
                        return this._.initValue }
                },
                r = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onChange: function(b, a) {
                        this._.domOnChangeRegistered || (b.on("load", function() {
                            this.getInputElement().on("change", function() { b.parts.dialog.isVisible() && this.fire("change", { value: this.getValue() }) },
                                this)
                        }, this), this._.domOnChangeRegistered = !0);
                        this.on("change", a)
                    }
                }, !0),
                x = /^on([A-Z]\w+)/,
                t = function(b) {
                    for (var a in b)(x.test(a) || "title" == a || "type" == a) && delete b[a];
                    return b },
                w = function(b) { b = b.data.getKeystroke();
                    b == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : b == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl") };
            CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                labeledElement: function(b, a, d, f) {
                    if (!(4 > arguments.length)) {
                        var c = h.call(this, a);
                        c.labelId = CKEDITOR.tools.getNextId() +
                            "_label";
                        this._.children = [];
                        var e = { role: a.role || "presentation" };
                        a.includeLabel && (e["aria-labelledby"] = c.labelId);
                        CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "div", null, e, function() {
                            var e = [],
                                g = a.required ? " cke_required" : "";
                            "horizontal" != a.labelLayout ? e.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" ', ' id\x3d"' + c.labelId + '"', c.inputId ? ' for\x3d"' + c.inputId + '"' : "", (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e", a.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
                                a.controlStyle ? ' style\x3d"' + a.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', f.call(this, b, a), "\x3c/div\x3e") : (g = {
                                type: "hbox",
                                widths: a.widths,
                                padding: 0,
                                children: [{ type: "html", html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" id\x3d"' + c.labelId + '" for\x3d"' + c.inputId + '"' + (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(a.label) + "\x3c/label\x3e" }, {
                                    type: "html",
                                    html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' + (a.controlStyle ? ' style\x3d"' + a.controlStyle +
                                        '"' : "") + "\x3e" + f.call(this, b, a) + "\x3c/span\x3e"
                                }]
                            }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, g, e));
                            return e.join("")
                        })
                    }
                },
                textInput: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a);
                        var f = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput",
                            c = { "class": "cke_dialog_ui_input_" + a.type, id: f, type: a.type };
                        a.validate && (this.validate = a.validate);
                        a.maxLength && (c.maxlength = a.maxLength);
                        a.size && (c.size = a.size);
                        a.inputStyle && (c.style = a.inputStyle);
                        var e = this,
                            m = !1;
                        b.on("load", function() {
                            e.getInputElement().on("keydown",
                                function(a) { 13 == a.data.getKeystroke() && (m = !0) });
                            e.getInputElement().on("keyup", function(a) { 13 == a.data.getKeystroke() && m && (b.getButton("ok") && setTimeout(function() { b.getButton("ok").click() }, 0), m = !1);
                                e.bidi && w.call(e, a) }, null, null, 1E3)
                        });
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                            var b = ['\x3cdiv class\x3d"cke_dialog_ui_input_', a.type, '" role\x3d"presentation"'];
                            a.width && b.push('style\x3d"width:' + a.width + '" ');
                            b.push("\x3e\x3cinput ");
                            c["aria-labelledby"] = this._.labelId;
                            this._.required &&
                                (c["aria-required"] = this._.required);
                            for (var e in c) b.push(e + '\x3d"' + c[e] + '" ');
                            b.push(" /\x3e\x3c/div\x3e");
                            return b.join("")
                        })
                    }
                },
                textarea: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a);
                        var f = this,
                            c = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea",
                            e = {};
                        a.validate && (this.validate = a.validate);
                        e.rows = a.rows || 5;
                        e.cols = a.cols || 20;
                        e["class"] = "cke_dialog_ui_input_textarea " + (a["class"] || "");
                        "undefined" != typeof a.inputStyle && (e.style = a.inputStyle);
                        a.dir && (e.dir = a.dir);
                        if (f.bidi) b.on("load",
                            function() { f.getInputElement().on("keyup", w) }, f);
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() { e["aria-labelledby"] = this._.labelId;
                            this._.required && (e["aria-required"] = this._.required);
                            var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', c, '" '],
                                b;
                            for (b in e) a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(e[b]) + '" ');
                            a.push("\x3e", CKEDITOR.tools.htmlEncode(f._["default"]), "\x3c/textarea\x3e\x3c/div\x3e");
                            return a.join("") })
                    }
                },
                checkbox: function(b,
                    a, d) {
                    if (!(3 > arguments.length)) {
                        var f = h.call(this, a, { "default": !!a["default"] });
                        a.validate && (this.validate = a.validate);
                        CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "span", null, null, function() {
                            var c = CKEDITOR.tools.extend({}, a, { id: a.id ? a.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox" }, !0),
                                e = [],
                                d = CKEDITOR.tools.getNextId() + "_label",
                                g = { "class": "cke_dialog_ui_checkbox_input", type: "checkbox", "aria-labelledby": d };
                            t(c);
                            a["default"] && (g.checked = "checked");
                            "undefined" != typeof c.inputStyle && (c.style = c.inputStyle);
                            f.checkbox = new CKEDITOR.ui.dialog.uiElement(b, c, e, "input", null, g);
                            e.push(' \x3clabel id\x3d"', d, '" for\x3d"', g.id, '"' + (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(a.label), "\x3c/label\x3e");
                            return e.join("")
                        })
                    }
                },
                radio: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a);
                        this._["default"] || (this._["default"] = this._.initValue = a.items[0][1]);
                        a.validate && (this.validate = a.validate);
                        var f = [],
                            c = this;
                        a.role = "radiogroup";
                        a.includeLabel = !0;
                        CKEDITOR.ui.dialog.labeledElement.call(this,
                            b, a, d,
                            function() {
                                for (var e = [], d = [], g = (a.id ? a.id : CKEDITOR.tools.getNextId()) + "_radio", k = 0; k < a.items.length; k++) {
                                    var l = a.items[k],
                                        h = void 0 !== l[2] ? l[2] : l[0],
                                        n = void 0 !== l[1] ? l[1] : l[0],
                                        p = CKEDITOR.tools.getNextId() + "_radio_input",
                                        q = p + "_label",
                                        p = CKEDITOR.tools.extend({}, a, { id: p, title: null, type: null }, !0),
                                        h = CKEDITOR.tools.extend({}, p, { title: h }, !0),
                                        r = { type: "radio", "class": "cke_dialog_ui_radio_input", name: g, value: n, "aria-labelledby": q },
                                        u = [];
                                    c._["default"] == n && (r.checked = "checked");
                                    t(p);
                                    t(h);
                                    "undefined" != typeof p.inputStyle &&
                                        (p.style = p.inputStyle);
                                    p.keyboardFocusable = !0;
                                    f.push(new CKEDITOR.ui.dialog.uiElement(b, p, u, "input", null, r));
                                    u.push(" ");
                                    new CKEDITOR.ui.dialog.uiElement(b, h, u, "label", null, { id: q, "for": r.id }, l[0]);
                                    e.push(u.join(""))
                                }
                                new CKEDITOR.ui.dialog.hbox(b, f, e, d);
                                return d.join("")
                            });
                        this._.children = f
                    }
                },
                button: function(b, a, d) {
                    if (arguments.length) {
                        "function" == typeof a && (a = a(b.getParentEditor()));
                        h.call(this, a, { disabled: a.disabled || !1 });
                        CKEDITOR.event.implementOn(this);
                        var f = this;
                        b.on("load", function() {
                            var a = this.getElement();
                            (function() { a.on("click", function(a) { f.click();
                                    a.data.preventDefault() });
                                a.on("keydown", function(a) { a.data.getKeystroke() in { 32: 1 } && (f.click(), a.data.preventDefault()) }) })();
                            a.unselectable()
                        }, this);
                        var c = CKEDITOR.tools.extend({}, a);
                        delete c.style;
                        var e = CKEDITOR.tools.getNextId() + "_label";
                        CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "a", null, { style: a.style, href: "javascript:void(0)", title: a.label, hidefocus: "true", "class": a["class"], role: "button", "aria-labelledby": e }, '\x3cspan id\x3d"' + e + '" class\x3d"cke_dialog_ui_button"\x3e' +
                            CKEDITOR.tools.htmlEncode(a.label) + "\x3c/span\x3e")
                    }
                },
                select: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        var f = h.call(this, a);
                        a.validate && (this.validate = a.validate);
                        f.inputId = CKEDITOR.tools.getNextId() + "_select";
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                            var c = CKEDITOR.tools.extend({}, a, { id: a.id ? a.id + "_select" : CKEDITOR.tools.getNextId() + "_select" }, !0),
                                e = [],
                                d = [],
                                g = { id: f.inputId, "class": "cke_dialog_ui_input_select", "aria-labelledby": this._.labelId };
                            e.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
                                a.type, '" role\x3d"presentation"');
                            a.width && e.push('style\x3d"width:' + a.width + '" ');
                            e.push("\x3e");
                            void 0 !== a.size && (g.size = a.size);
                            void 0 !== a.multiple && (g.multiple = a.multiple);
                            t(c);
                            for (var k = 0, l; k < a.items.length && (l = a.items[k]); k++) d.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== l[1] ? l[1] : l[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(l[0]));
                            "undefined" != typeof c.inputStyle && (c.style = c.inputStyle);
                            f.select = new CKEDITOR.ui.dialog.uiElement(b, c, e, "select", null,
                                g, d.join(""));
                            e.push("\x3c/div\x3e");
                            return e.join("")
                        })
                    }
                },
                file: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        void 0 === a["default"] && (a["default"] = "");
                        var f = CKEDITOR.tools.extend(h.call(this, a), { definition: a, buttons: [] });
                        a.validate && (this.validate = a.validate);
                        b.on("load", function() { CKEDITOR.document.getById(f.frameId).getParent().addClass("cke_dialog_ui_input_file") });
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                            f.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                            var b = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
                                f.frameId, '" title\x3d"', a.label, '" src\x3d"javascript:void('
                            ];
                            b.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0");
                            b.push(')"\x3e\x3c/iframe\x3e');
                            return b.join("")
                        })
                    }
                },
                fileButton: function(b, a, d) {
                    var f = this;
                    if (!(3 > arguments.length)) {
                        h.call(this, a);
                        a.validate && (this.validate = a.validate);
                        var c = CKEDITOR.tools.extend({}, a),
                            e = c.onClick;
                        c.className = (c.className ? c.className + " " : "") + "cke_dialog_ui_button";
                        c.onClick = function(c) {
                            var d =
                                a["for"];
                            e && !1 === e.call(this, c) || (b.getContentElement(d[0], d[1]).submit(), this.disable())
                        };
                        b.on("load", function() { b.getContentElement(a["for"][0], a["for"][1])._.buttons.push(f) });
                        CKEDITOR.ui.dialog.button.call(this, b, c, d)
                    }
                },
                html: function() {
                    var b = /^\s*<[\w:]+\s+([^>]*)?>/,
                        a = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
                        d = /\/$/;
                    return function(f, c, e) {
                        if (!(3 > arguments.length)) {
                            var m = [],
                                g = c.html;
                            "\x3c" != g.charAt(0) && (g = "\x3cspan\x3e" + g + "\x3c/span\x3e");
                            var k = c.focus;
                            if (k) {
                                var l = this.focus;
                                this.focus = function() {
                                    ("function" ==
                                        typeof k ? k : l).call(this);
                                    this.fire("focus")
                                };
                                c.isFocusable && (this.isFocusable = this.isFocusable);
                                this.keyboardFocusable = !0
                            }
                            CKEDITOR.ui.dialog.uiElement.call(this, f, c, m, "span", null, null, "");
                            m = m.join("").match(b);
                            g = g.match(a) || ["", "", ""];
                            d.test(g[1]) && (g[1] = g[1].slice(0, -1), g[2] = "/" + g[2]);
                            e.push([g[1], " ", m[1] || "", g[2]].join(""))
                        }
                    }
                }(),
                fieldset: function(b, a, d, f, c) {
                    var e = c.label;
                    this._ = { children: a };
                    CKEDITOR.ui.dialog.uiElement.call(this, b, c, f, "fieldset", null, null, function() {
                        var a = [];
                        e && a.push("\x3clegend" +
                            (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e" + e + "\x3c/legend\x3e");
                        for (var b = 0; b < d.length; b++) a.push(d[b]);
                        return a.join("")
                    })
                }
            }, !0);
            CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement;
            CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setLabel: function(b) {
                    var a = CKEDITOR.document.getById(this._.labelId);
                    1 > a.getChildCount() ? (new CKEDITOR.dom.text(b, CKEDITOR.document)).appendTo(a) : a.getChild(0).$.nodeValue = b;
                    return this },
                getLabel: function() {
                    var b =
                        CKEDITOR.document.getById(this._.labelId);
                    return !b || 1 > b.getChildCount() ? "" : b.getChild(0).getText()
                },
                eventProcessors: r
            }, !0);
            CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                click: function() {
                    return this._.disabled ? !1 : this.fire("click", { dialog: this._.dialog }) },
                enable: function() { this._.disabled = !1;
                    var b = this.getElement();
                    b && b.removeClass("cke_disabled") },
                disable: function() { this._.disabled = !0;
                    this.getElement().addClass("cke_disabled") },
                isVisible: function() {
                    return this.getElement().getFirst().isVisible() },
                isEnabled: function() {
                    return !this._.disabled },
                eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, { onClick: function(b, a) { this.on("click", function() { a.apply(this, arguments) }) } }, !0),
                accessKeyUp: function() { this.click() },
                accessKeyDown: function() { this.focus() },
                keyboardFocusable: !0
            }, !0);
            CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function() {
                    return CKEDITOR.document.getById(this._.inputId) },
                focus: function() {
                    var b = this.selectParentTab();
                    setTimeout(function() {
                        var a = b.getInputElement();
                        a && a.$.focus() }, 0) },
                select: function() {
                    var b = this.selectParentTab();
                    setTimeout(function() {
                        var a = b.getInputElement();
                        a && (a.$.focus(), a.$.select()) }, 0) },
                accessKeyUp: function() { this.select() },
                setValue: function(b) {
                    if (this.bidi) {
                        var a = b && b.charAt(0);
                        (a = "‪" == a ? "ltr" : "‫" == a ? "rtl" : null) && (b = b.slice(1));
                        this.setDirectionMarker(a) }
                    b || (b = "");
                    return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments) },
                getValue: function() {
                    var b = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);
                    if (this.bidi && b) {
                        var a = this.getDirectionMarker();
                        a && (b = ("ltr" == a ? "‪" : "‫") + b) }
                    return b },
                setDirectionMarker: function(b) {
                    var a = this.getInputElement();
                    b ? a.setAttributes({ dir: b, "data-cke-dir-marker": b }) : this.getDirectionMarker() && a.removeAttributes(["dir", "data-cke-dir-marker"]) },
                getDirectionMarker: function() {
                    return this.getInputElement().data("cke-dir-marker") },
                keyboardFocusable: !0
            }, q, !0);
            CKEDITOR.ui.dialog.textarea.prototype =
                new CKEDITOR.ui.dialog.textInput;
            CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function() {
                    return this._.select.getElement() },
                add: function(b, a, d) {
                    var f = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
                        c = this.getInputElement().$;
                    f.$.text = b;
                    f.$.value = void 0 === a || null === a ? b : a;
                    void 0 === d || null === d ? CKEDITOR.env.ie ? c.add(f.$) : c.add(f.$, null) : c.add(f.$, d);
                    return this },
                remove: function(b) {
                    this.getInputElement().$.remove(b);
                    return this
                },
                clear: function() {
                    for (var b = this.getInputElement().$; 0 < b.length;) b.remove(0);
                    return this },
                keyboardFocusable: !0
            }, q, !0);
            CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                getInputElement: function() {
                    return this._.checkbox.getElement() },
                setValue: function(b, a) { this.getInputElement().$.checked = b;!a && this.fire("change", { value: b }) },
                getValue: function() {
                    return this.getInputElement().$.checked },
                accessKeyUp: function() { this.setValue(!this.getValue()) },
                eventProcessors: {
                    onChange: function(b,
                        a) {
                        if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return r.onChange.apply(this, arguments);
                        b.on("load", function() {
                            var a = this._.checkbox.getElement();
                            a.on("propertychange", function(b) { b = b.data.$; "checked" == b.propertyName && this.fire("change", { value: a.$.checked }) }, this) }, this);
                        this.on("change", a);
                        return null }
                },
                keyboardFocusable: !0
            }, q, !0);
            CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setValue: function(b, a) {
                    for (var d = this._.children, f, c = 0; c < d.length && (f = d[c]); c++) f.getElement().$.checked =
                        f.getValue() == b;
                    !a && this.fire("change", { value: b })
                },
                getValue: function() {
                    for (var b = this._.children, a = 0; a < b.length; a++)
                        if (b[a].getElement().$.checked) return b[a].getValue();
                    return null },
                accessKeyUp: function() {
                    var b = this._.children,
                        a;
                    for (a = 0; a < b.length; a++)
                        if (b[a].getElement().$.checked) { b[a].getElement().focus();
                            return }
                    b[0].getElement().focus() },
                eventProcessors: {
                    onChange: function(b, a) {
                        if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return r.onChange.apply(this, arguments);
                        b.on("load", function() {
                            for (var a =
                                    this._.children, b = this, c = 0; c < a.length; c++) a[c].getElement().on("propertychange", function(a) { a = a.data.$; "checked" == a.propertyName && this.$.checked && b.fire("change", { value: this.getAttribute("value") }) })
                        }, this);
                        this.on("change", a);
                        return null
                    }
                }
            }, q, !0);
            CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, q, {
                getInputElement: function() {
                    var b = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
                    return 0 < b.$.forms.length ? new CKEDITOR.dom.element(b.$.forms[0].elements[0]) :
                        this.getElement()
                },
                submit: function() { this.getInputElement().getParent().$.submit();
                    return this },
                getAction: function() {
                    return this.getInputElement().getParent().$.action },
                registerEvents: function(b) {
                    var a = /^on([A-Z]\w+)/,
                        d, f = function(a, b, c, d) { a.on("formLoaded", function() { a.getInputElement().on(c, d, a) }) },
                        c;
                    for (c in b)
                        if (d = c.match(a)) this.eventProcessors[c] ? this.eventProcessors[c].call(this, this._.dialog, b[c]) : f(this, this._.dialog, d[1].toLowerCase(), b[c]);
                    return this },
                reset: function() {
                    function b() {
                        d.$.open();
                        var b = "";
                        f.size && (b = f.size - (CKEDITOR.env.ie ? 7 : 0));
                        var h = a.frameId + "_input";
                        d.$.write(['\x3chtml dir\x3d"' + g + '" lang\x3d"' + k + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e', '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + g + '" lang\x3d"' + k + '" action\x3d"', CKEDITOR.tools.htmlEncode(f.action), '"\x3e\x3clabel id\x3d"', a.labelId, '" for\x3d"', h, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(f.label),
                            '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', h, '" aria-labelledby\x3d"', a.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(f.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < b ? b : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + e + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + m + ")}", "\x3c/script\x3e"
                        ].join(""));
                        d.$.close();
                        for (b = 0; b < c.length; b++) c[b].enable()
                    }
                    var a = this._,
                        d = CKEDITOR.document.getById(a.frameId).getFrameDocument(),
                        f = a.definition,
                        c = a.buttons,
                        e = this.formLoadedNumber,
                        m = this.formUnloadNumber,
                        g = a.dialog._.editor.lang.dir,
                        k = a.dialog._.editor.langCode;
                    e || (e = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() { this.fire("formLoaded") }, this), m = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() { this.getInputElement().clearCustomData() }, this), this.getDialog()._.editor.on("destroy", function() {
                        CKEDITOR.tools.removeFunction(e);
                        CKEDITOR.tools.removeFunction(m)
                    }));
                    CKEDITOR.env.gecko ? setTimeout(b, 500) : b()
                },
                getValue: function() {
                    return this.getInputElement().$.value || "" },
                setInitValue: function() { this._.initValue = "" },
                eventProcessors: { onChange: function(b, a) { this._.domOnChangeRegistered || (this.on("formLoaded", function() { this.getInputElement().on("change", function() { this.fire("change", { value: this.getValue() }) }, this) }, this), this._.domOnChangeRegistered = !0);
                        this.on("change", a) } },
                keyboardFocusable: !0
            }, !0);
            CKEDITOR.ui.dialog.fileButton.prototype =
                new CKEDITOR.ui.dialog.button;
            CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
            CKEDITOR.dialog.addUIElement("text", v);
            CKEDITOR.dialog.addUIElement("password", v);
            CKEDITOR.dialog.addUIElement("textarea", n);
            CKEDITOR.dialog.addUIElement("checkbox", n);
            CKEDITOR.dialog.addUIElement("radio", n);
            CKEDITOR.dialog.addUIElement("button", n);
            CKEDITOR.dialog.addUIElement("select", n);
            CKEDITOR.dialog.addUIElement("file", n);
            CKEDITOR.dialog.addUIElement("fileButton", n);
            CKEDITOR.dialog.addUIElement("html",
                n);
            CKEDITOR.dialog.addUIElement("fieldset", { build: function(b, a, d) {
                    for (var f = a.children, c, e = [], h = [], g = 0; g < f.length && (c = f[g]); g++) {
                        var k = [];
                        e.push(k);
                        h.push(CKEDITOR.dialog._.uiElementBuilders[c.type].build(b, c, k)) }
                    return new CKEDITOR.ui.dialog[a.type](b, h, e, d, a) } })
        }
    });
    CKEDITOR.DIALOG_RESIZE_NONE = 0;
    CKEDITOR.DIALOG_RESIZE_WIDTH = 1;
    CKEDITOR.DIALOG_RESIZE_HEIGHT = 2;
    CKEDITOR.DIALOG_RESIZE_BOTH = 3;
    CKEDITOR.DIALOG_STATE_IDLE = 1;
    CKEDITOR.DIALOG_STATE_BUSY = 2;
    (function() {
        function x() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)
                if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
            return null }

        function A() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)
                if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
            return null }

        function K(a, b) {
            for (var c = a.$.getElementsByTagName("input"),
                    e = 0, d = c.length; e < d; e++) {
                var f = new CKEDITOR.dom.element(c[e]); "text" == f.getAttribute("type").toLowerCase() && (b ? (f.setAttribute("value", f.getCustomData("fake_value") || ""), f.removeCustomData("fake_value")) : (f.setCustomData("fake_value", f.getAttribute("value")), f.setAttribute("value", ""))) }
        }

        function T(a, b) {
            var c = this.getInputElement();
            c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0));
            a || (this.select ? this.select() : this.focus());
            b && alert(b);
            this.fire("validated", { valid: a, msg: b }) }

        function U() {
            var a = this.getInputElement();
            a && a.removeAttribute("aria-invalid") }

        function V(a) {
            var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", W).output({ id: CKEDITOR.tools.getNextNumber(), editorId: a.id, langDir: a.lang.dir, langCode: a.langCode, editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog", closeTitle: a.lang.common.close, hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : "" })),
                c = b.getChild([0, 0, 0, 0, 0]),
                e = c.getChild(0),
                d = c.getChild(1);
            a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c);
            !CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent()));
            e.unselectable();
            d.unselectable();
            return {
                element: b,
                parts: {
                    dialog: b.getChild(0),
                    title: e,
                    close: d,
                    tabs: c.getChild(2),
                    contents: c.getChild([3, 0, 0, 0]),
                    footer: c.getChild([3, 0, 1, 0])
                }
            }
        }

        function L(a, b, c) { this.element = b;
            this.focusIndex = c;
            this.tabIndex = 0;
            this.isFocusable = function() {
                return !b.getAttribute("disabled") && b.isVisible() };
            this.focus = function() { a._.currentFocusIndex = this.focusIndex;
                this.element.focus() };
            b.on("keydown", function(a) { a.data.getKeystroke() in { 32: 1, 13: 1 } && this.fire("click") });
            b.on("focus", function() { this.fire("mouseover") });
            b.on("blur", function() { this.fire("mouseout") }) }

        function X(a) {
            function b() { a.layout() }
            var c = CKEDITOR.document.getWindow();
            c.on("resize", b);
            a.on("hide", function() { c.removeListener("resize", b) })
        }

        function M(a, b) { this._ = { dialog: a };
            CKEDITOR.tools.extend(this, b) }

        function Y(a) {
            function b(b) {
                var c = a.getSize(),
                    k = CKEDITOR.document.getWindow().getViewPaneSize(),
                    q = b.data.$.screenX,
                    n = b.data.$.screenY,
                    r = q - e.x,
                    l = n - e.y;
                e = { x: q, y: n };
                d.x += r;
                d.y += l;
                a.move(d.x + h[3] < g ? -h[3] : d.x - h[1] > k.width - c.width - g ? k.width - c.width + ("rtl" == f.lang.dir ? 0 : h[1]) : d.x, d.y + h[0] < g ? -h[0] : d.y - h[2] > k.height - c.height - g ? k.height - c.height + h[2] : d.y, 1);
                b.data.preventDefault() }

            function c() { CKEDITOR.document.removeListener("mousemove", b);
                CKEDITOR.document.removeListener("mouseup", c);
                if (CKEDITOR.env.ie6Compat) {
                    var a = u.getChild(0).getFrameDocument();
                    a.removeListener("mousemove", b);
                    a.removeListener("mouseup", c) } }
            var e = null,
                d = null,
                f = a.getParentEditor(),
                g = f.config.dialog_magnetDistance,
                h = CKEDITOR.skin.margins || [0, 0, 0, 0];
            "undefined" == typeof g && (g = 20);
            a.parts.title.on("mousedown", function(g) {
                e = { x: g.data.$.screenX, y: g.data.$.screenY };
                CKEDITOR.document.on("mousemove", b);
                CKEDITOR.document.on("mouseup",
                    c);
                d = a.getPosition();
                if (CKEDITOR.env.ie6Compat) {
                    var f = u.getChild(0).getFrameDocument();
                    f.on("mousemove", b);
                    f.on("mouseup", c) }
                g.data.preventDefault()
            }, a)
        }

        function Z(a) {
            function b(b) {
                var c = "rtl" == f.lang.dir,
                    n = k.width,
                    q = k.height,
                    G = n + (b.data.$.screenX - m.x) * (c ? -1 : 1) * (a._.moved ? 1 : 2),
                    H = q + (b.data.$.screenY - m.y) * (a._.moved ? 1 : 2),
                    B = a._.element.getFirst(),
                    B = c && B.getComputedStyle("right"),
                    C = a.getPosition();
                C.y + H > p.height && (H = p.height - C.y);
                (c ? B : C.x) + G > p.width && (G = p.width - (c ? B : C.x));
                if (d == CKEDITOR.DIALOG_RESIZE_WIDTH ||
                    d == CKEDITOR.DIALOG_RESIZE_BOTH) n = Math.max(e.minWidth || 0, G - g);
                if (d == CKEDITOR.DIALOG_RESIZE_HEIGHT || d == CKEDITOR.DIALOG_RESIZE_BOTH) q = Math.max(e.minHeight || 0, H - h);
                a.resize(n, q);
                a._.moved || a.layout();
                b.data.preventDefault()
            }

            function c() { CKEDITOR.document.removeListener("mouseup", c);
                CKEDITOR.document.removeListener("mousemove", b);
                q && (q.remove(), q = null);
                if (CKEDITOR.env.ie6Compat) {
                    var a = u.getChild(0).getFrameDocument();
                    a.removeListener("mouseup", c);
                    a.removeListener("mousemove", b) } }
            var e = a.definition,
                d = e.resizable;
            if (d != CKEDITOR.DIALOG_RESIZE_NONE) {
                var f = a.getParentEditor(),
                    g, h, p, m, k, q, n = CKEDITOR.tools.addFunction(function(d) {
                        k = a.getSize();
                        var e = a.parts.contents;
                        e.$.getElementsByTagName("iframe").length && (q = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'), e.append(q));
                        h = k.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks));
                        g = k.width - a.parts.contents.getSize("width",
                            1);
                        m = { x: d.screenX, y: d.screenY };
                        p = CKEDITOR.document.getWindow().getViewPaneSize();
                        CKEDITOR.document.on("mousemove", b);
                        CKEDITOR.document.on("mouseup", c);
                        CKEDITOR.env.ie6Compat && (e = u.getChild(0).getFrameDocument(), e.on("mousemove", b), e.on("mouseup", c));
                        d.preventDefault && d.preventDefault()
                    });
                a.on("load", function() {
                    var b = "";
                    d == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : d == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
                    b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' +
                        b + " cke_resizer_" + f.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(f.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event )"\x3e' + ("ltr" == f.lang.dir ? "◢" : "◣") + "\x3c/div\x3e");
                    a.parts.footer.append(b, 1)
                });
                f.on("destroy", function() { CKEDITOR.tools.removeFunction(n) })
            }
        }

        function I(a) { a.data.preventDefault(1) }

        function N(a) {
            var b = CKEDITOR.document.getWindow(),
                c = a.config,
                e = CKEDITOR.skinName || a.config.skin,
                d = c.dialog_backgroundCoverColor || ("moono-lisa" == e ? "black" : "white"),
                e = c.dialog_backgroundCoverOpacity,
                f = c.baseFloatZIndex,
                c = CKEDITOR.tools.genKey(d, e, f),
                g = z[c];
            g ? g.show() : (f = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", f, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + d, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (d = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" + d + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", f.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'),
                    f.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + d + "' );document.close();") + "})())"), f.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')), f.push("\x3c/div\x3e"), g = CKEDITOR.dom.element.createFromHtml(f.join("")), g.setOpacity(void 0 !== e ? e : .5), g.on("keydown", I), g.on("keypress", I), g.on("keyup", I), g.appendTo(CKEDITOR.document.getBody()),
                z[c] = g);
            a.focusManager.add(g);
            u = g;
            a = function() {
                var a = b.getViewPaneSize();
                g.setStyles({ width: a.width + "px", height: a.height + "px" }) };
            var h = function() {
                var a = b.getScrollPosition(),
                    c = CKEDITOR.dialog._.currentTop;
                g.setStyles({ left: a.x + "px", top: a.y + "px" });
                if (c) { do a = c.getPosition(), c.move(a.x, a.y); while (c = c._.parentDialog) } };
            J = a;
            b.on("resize", a);
            a();
            CKEDITOR.env.mac && CKEDITOR.env.webkit || g.focus();
            if (CKEDITOR.env.ie6Compat) {
                var p = function() { h();
                    arguments.callee.prevScrollHandler.apply(this, arguments) };
                b.$.setTimeout(function() {
                    p.prevScrollHandler =
                        window.onscroll || function() {};
                    window.onscroll = p
                }, 0);
                h()
            }
        }

        function O(a) { u && (a.focusManager.remove(u), a = CKEDITOR.document.getWindow(), u.hide(), a.removeListener("resize", J), CKEDITOR.env.ie6Compat && a.$.setTimeout(function() { window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null }, 0), J = null) }
        var v = CKEDITOR.tools.cssLength,
            W = '\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' +
            CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
        CKEDITOR.dialog = function(a, b) {
            function c() {
                var a = l._.focusList;
                a.sort(function(a, b) {
                    return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex });
                for (var b = a.length, c = 0; c < b; c++) a[c].focusIndex = c }

            function e(a) {
                var b = l._.focusList;
                a = a || 0;
                if (!(1 > b.length)) {
                    var c = l._.currentFocusIndex;
                    l._.tabBarMode && 0 > a && (c = 0);
                    try { b[c].getInputElement().$.blur() } catch (d) {}
                    var e = c,
                        g = 1 < l._.pageCount;
                    do {
                        e += a;
                        if (g && !l._.tabBarMode && (e == b.length || -1 == e)) {
                            l._.tabBarMode = !0;
                            l._.tabs[l._.currentTabId][0].focus();
                            l._.currentFocusIndex = -1;
                            return
                        }
                        e = (e + b.length) % b.length;
                        if (e == c) break
                    } while (a && !b[e].isFocusable());
                    b[e].focus();
                    "text" == b[e].type && b[e].select()
                }
            }

            function d(b) {
                if (l == CKEDITOR.dialog._.currentTop) {
                    var c = b.data.getKeystroke(),
                        d = "rtl" == a.lang.dir,
                        g = [37, 38, 39, 40];
                    q = n = 0;
                    if (9 == c || c == CKEDITOR.SHIFT + 9) e(c == CKEDITOR.SHIFT + 9 ? -1 : 1), q = 1;
                    else if (c == CKEDITOR.ALT + 121 && !l._.tabBarMode && 1 < l.getPageCount()) l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus(), l._.currentFocusIndex = -1, q = 1;
                    else if (-1 != CKEDITOR.tools.indexOf(g,
                            c) && l._.tabBarMode) c = -1 != CKEDITOR.tools.indexOf([d ? 39 : 37, 38], c) ? x.call(l) : A.call(l), l.selectPage(c), l._.tabs[c][0].focus(), q = 1;
                    else if (13 != c && 32 != c || !l._.tabBarMode)
                        if (13 == c) c = b.data.getTarget(), c.is("a", "button", "select", "textarea") || c.is("input") && "button" == c.$.type || ((c = this.getButton("ok")) && CKEDITOR.tools.setTimeout(c.click, 0, c), q = 1), n = 1;
                        else if (27 == c)(c = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(c.click, 0, c) : !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(), n = 1;
                    else return;
                    else this.selectPage(this._.currentTabId),
                        this._.tabBarMode = !1, this._.currentFocusIndex = -1, e(1), q = 1;
                    f(b)
                }
            }

            function f(a) { q ? a.data.preventDefault(1) : n && a.data.stopPropagation() }
            var g = CKEDITOR.dialog._.dialogDefinitions[b],
                h = CKEDITOR.tools.clone(aa),
                p = a.config.dialog_buttonsOrder || "OS",
                m = a.lang.dir,
                k = {},
                q, n;
            ("OS" == p && CKEDITOR.env.mac || "rtl" == p && "ltr" == m || "ltr" == p && "rtl" == m) && h.buttons.reverse();
            g = CKEDITOR.tools.extend(g(a), h);
            g = CKEDITOR.tools.clone(g);
            g = new P(this, g);
            h = V(a);
            this._ = {
                editor: a,
                element: h.element,
                name: b,
                contentSize: { width: 0, height: 0 },
                size: { width: 0, height: 0 },
                contents: {},
                buttons: {},
                accessKeyMap: {},
                tabs: {},
                tabIdList: [],
                currentTabId: null,
                currentTabIndex: null,
                pageCount: 0,
                lastTab: null,
                tabBarMode: !1,
                focusList: [],
                currentFocusIndex: 0,
                hasFocus: !1
            };
            this.parts = h.parts;
            CKEDITOR.tools.setTimeout(function() { a.fire("ariaWidget", this.parts.contents) }, 0, this);
            h = { position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed", top: 0, visibility: "hidden" };
            h["rtl" == m ? "right" : "left"] = 0;
            this.parts.dialog.setStyles(h);
            CKEDITOR.event.call(this);
            this.definition = g = CKEDITOR.fire("dialogDefinition", { name: b, definition: g }, a).definition;
            if (!("removeDialogTabs" in a._) && a.config.removeDialogTabs) { h = a.config.removeDialogTabs.split(";");
                for (m = 0; m < h.length; m++)
                    if (p = h[m].split(":"), 2 == p.length) {
                        var r = p[0];
                        k[r] || (k[r] = []);
                        k[r].push(p[1]) }
                a._.removeDialogTabs = k }
            if (a._.removeDialogTabs && (k = a._.removeDialogTabs[b]))
                for (m = 0; m < k.length; m++) g.removeContents(k[m]);
            if (g.onLoad) this.on("load", g.onLoad);
            if (g.onShow) this.on("show", g.onShow);
            if (g.onHide) this.on("hide", g.onHide);
            if (g.onOk) this.on("ok", function(b) {
                a.fire("saveSnapshot");
                setTimeout(function() { a.fire("saveSnapshot") }, 0);
                !1 === g.onOk.call(this, b) && (b.data.hide = !1)
            });
            this.state = CKEDITOR.DIALOG_STATE_IDLE;
            if (g.onCancel) this.on("cancel", function(a) {!1 === g.onCancel.call(this, a) && (a.data.hide = !1) });
            var l = this,
                t = function(a) {
                    var b = l._.contents,
                        c = !1,
                        d;
                    for (d in b)
                        for (var e in b[d])
                            if (c = a.call(this, b[d][e])) return };
            this.on("ok", function(a) {
                t(function(b) {
                    if (b.validate) {
                        var c = b.validate(this),
                            d = "string" == typeof c || !1 === c;
                        d && (a.data.hide = !1, a.stop());
                        T.call(b, !d, "string" == typeof c ?
                            c : void 0);
                        return d
                    }
                })
            }, this, null, 0);
            this.on("cancel", function(b) { t(function(c) {
                    if (c.isChanged()) return a.config.dialog_noConfirmCancel || confirm(a.lang.common.confirmCancel) || (b.data.hide = !1), !0 }) }, this, null, 0);
            this.parts.close.on("click", function(a) {!1 !== this.fire("cancel", { hide: !0 }).hide && this.hide();
                a.data.preventDefault() }, this);
            this.changeFocus = e;
            var y = this._.element;
            a.focusManager.add(y, 1);
            this.on("show", function() { y.on("keydown", d, this);
                if (CKEDITOR.env.gecko) y.on("keypress", f, this) });
            this.on("hide",
                function() { y.removeListener("keydown", d);
                    CKEDITOR.env.gecko && y.removeListener("keypress", f);
                    t(function(a) { U.apply(a) }) });
            this.on("iframeAdded", function(a) {
                (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", d, this, null, 0) });
            this.on("show", function() {
                c();
                var b = 1 < l._.pageCount;
                a.config.dialog_startupFocusTab && b ? (l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus(), l._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = b ? -1 : this._.focusList.length - 1, g.onFocus ?
                    (b = g.onFocus.call(this)) && b.focus() : e(1))
            }, this, null, 4294967295);
            if (CKEDITOR.env.ie6Compat) this.on("load", function() {
                var a = this.getElement(),
                    b = a.getFirst();
                b.remove();
                b.appendTo(a) }, this);
            Y(this);
            Z(this);
            (new CKEDITOR.dom.text(g.title, CKEDITOR.document)).appendTo(this.parts.title);
            for (m = 0; m < g.contents.length; m++)(k = g.contents[m]) && this.addPage(k);
            this.parts.tabs.on("click", function(a) {
                var b = a.data.getTarget();
                b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))),
                    this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, e(1)), a.data.preventDefault())
            }, this);
            m = [];
            k = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, { type: "hbox", className: "cke_dialog_footer_buttons", widths: [], children: g.buttons }, m).getChild();
            this.parts.footer.setHtml(m.join(""));
            for (m = 0; m < k.length; m++) this._.buttons[k[m].id] = k[m]
        };
        CKEDITOR.dialog.prototype = {
            destroy: function() { this.hide();
                this._.element.remove() },
            resize: function() {
                return function(a, b) {
                    this._.contentSize && this._.contentSize.width ==
                        a && this._.contentSize.height == b || (CKEDITOR.dialog.fire("resize", { dialog: this, width: a, height: b }, this._.editor), this.fire("resize", { width: a, height: b }, this._.editor), this.parts.contents.setStyles({ width: a + "px", height: b + "px" }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = { width: a, height: b })
                }
            }(),
            getSize: function() {
                var a = this._.element.getFirst();
                return { width: a.$.offsetWidth || 0, height: a.$.offsetHeight || 0 }
            },
            move: function(a, b, c) {
                var e = this._.element.getFirst(),
                    d = "rtl" == this._.editor.lang.dir,
                    f = "fixed" == e.getComputedStyle("position");
                CKEDITOR.env.ie && e.setStyle("zoom", "100%");
                f && this._.position && this._.position.x == a && this._.position.y == b || (this._.position = { x: a, y: b }, f || (f = CKEDITOR.document.getWindow().getScrollPosition(), a += f.x, b += f.y), d && (f = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - f.width - a), b = { top: (0 < b ? b : 0) + "px" },
                    b[d ? "right" : "left"] = (0 < a ? a : 0) + "px", e.setStyles(b), c && (this._.moved = 1))
            },
            getPosition: function() {
                return CKEDITOR.tools.extend({}, this._.position) },
            show: function() {
                var a = this._.element,
                    b = this.definition;
                a.getParent() && a.getParent().equals(CKEDITOR.document.getBody()) ? a.setStyle("display", "block") : a.appendTo(CKEDITOR.document.getBody());
                this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight);
                this.reset();
                this.selectPage(this.definition.contents[0].id);
                null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex);
                this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10);
                null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, N(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2), CKEDITOR.dialog._.currentTop = this);
                a.on("keydown", Q);
                a.on("keyup", R);
                this._.hasFocus = !1;
                for (var c in b.contents)
                    if (b.contents[c]) {
                        var a = b.contents[c],
                            e = this._.tabs[a.id],
                            d = a.requiredContent,
                            f = 0;
                        if (e) {
                            for (var g in this._.contents[a.id]) {
                                var h = this._.contents[a.id][g]; "hbox" != h.type && "vbox" != h.type && h.getInputElement() && (h.requiredContent && !this._.editor.activeFilter.check(h.requiredContent) ? h.disable() : (h.enable(), f++)) }!f || d && !this._.editor.activeFilter.check(d) ? e[0].addClass("cke_dialog_tab_disabled") : e[0].removeClass("cke_dialog_tab_disabled") } }
                CKEDITOR.tools.setTimeout(function() {
                    this.layout();
                    X(this);
                    this.parts.dialog.setStyle("visibility", "");
                    this.fireOnce("load", {});
                    CKEDITOR.ui.fire("ready", this);
                    this.fire("show", {});
                    this._.editor.fire("dialogShow", this);
                    this._.parentDialog || this._.editor.focusManager.lock();
                    this.foreach(function(a) { a.setInitValue && a.setInitValue() })
                }, 100, this)
            },
            layout: function() {
                var a = this.parts.dialog,
                    b = this.getSize(),
                    c = CKEDITOR.document.getWindow().getViewPaneSize(),
                    e = (c.width - b.width) / 2,
                    d = (c.height - b.height) / 2;
                CKEDITOR.env.ie6Compat || (b.height + (0 < d ? d : 0) > c.height ||
                    b.width + (0 < e ? e : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed"));
                this.move(this._.moved ? this._.position.x : e, this._.moved ? this._.position.y : d)
            },
            foreach: function(a) {
                for (var b in this._.contents)
                    for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]);
                return this },
            reset: function() {
                var a = function(a) { a.reset && a.reset(1) };
                return function() { this.foreach(a);
                    return this } }(),
            setupContent: function() {
                var a = arguments;
                this.foreach(function(b) { b.setup && b.setup.apply(b, a) }) },
            commitContent: function() {
                var a = arguments;
                this.foreach(function(b) { CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
                    b.commit && b.commit.apply(b, a) }) },
            hide: function() {
                if (this.parts.dialog.isVisible()) {
                    this.fire("hide", {});
                    this._.editor.fire("dialogHide", this);
                    this.selectPage(this._.tabIdList[0]);
                    var a = this._.element;
                    a.setStyle("display", "none");
                    this.parts.dialog.setStyle("visibility", "hidden");
                    for (ba(this); CKEDITOR.dialog._.currentTop != this;) CKEDITOR.dialog._.currentTop.hide();
                    if (this._.parentDialog) {
                        var b = this._.parentDialog.getElement().getFirst();
                        b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2)) } else O(this._.editor);
                    if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10;
                    else { CKEDITOR.dialog._.currentZIndex = null;
                        a.removeListener("keydown", Q);
                        a.removeListener("keyup", R);
                        var c = this._.editor;
                        c.focus();
                        setTimeout(function() { c.focusManager.unlock();
                            CKEDITOR.env.iOS && c.window.focus() }, 0) }
                    delete this._.parentDialog;
                    this.foreach(function(a) { a.resetInitValue && a.resetInitValue() });
                    this.setState(CKEDITOR.DIALOG_STATE_IDLE)
                }
            },
            addPage: function(a) {
                if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                    for (var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", e = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, { type: "vbox", className: "cke_dialog_page_contents", children: a.elements, expand: !!a.expand, padding: a.padding, style: a.style || "width: 100%;" }, b), d = this._.contents[a.id] = {}, f = e.getChild(),
                            g = 0; e = f.shift();) e.notAllowed || "hbox" == e.type || "vbox" == e.type || g++, d[e.id] = e, "function" == typeof e.getChild && f.push.apply(f, e.getChild());
                    g || (a.hidden = !0);
                    b = CKEDITOR.dom.element.createFromHtml(b.join(""));
                    b.setAttribute("role", "tabpanel");
                    e = CKEDITOR.env;
                    d = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber();
                    c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', d, '"', e.gecko && !e.hc ? "" : ' href\x3d"javascript:void(0)"',
                        ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"
                    ].join(""));
                    b.setAttribute("aria-labelledby", d);
                    this._.tabs[a.id] = [c, b];
                    this._.tabIdList.push(a.id);
                    !a.hidden && this._.pageCount++;
                    this._.lastTab = c;
                    this.updateStyle();
                    b.setAttribute("name", a.id);
                    b.appendTo(this.parts.contents);
                    c.unselectable();
                    this.parts.tabs.append(c);
                    a.accessKey && (S(this, this, "CTRL+" + a.accessKey, ca, da), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
                }
            },
            selectPage: function(a) {
                if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") &&
                    !1 !== this.fire("selectPage", { page: a, currentPage: this._.currentTabId })) {
                    for (var b in this._.tabs) {
                        var c = this._.tabs[b][0],
                            e = this._.tabs[b][1];
                        b != a && (c.removeClass("cke_dialog_tab_selected"), e.hide());
                        e.setAttribute("aria-hidden", b != a) }
                    var d = this._.tabs[a];
                    d[0].addClass("cke_dialog_tab_selected");
                    CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (K(d[1]), d[1].show(), setTimeout(function() { K(d[1], 1) }, 0)) : d[1].show();
                    this._.currentTabId = a;
                    this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a) }
            },
            updateStyle: function() { this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page") },
            hidePage: function(a) {
                var b = this._.tabs[a] && this._.tabs[a][0];
                b && 1 != this._.pageCount && b.isVisible() && (a == this._.currentTabId && this.selectPage(x.call(this)), b.hide(), this._.pageCount--, this.updateStyle()) },
            showPage: function(a) {
                if (a = this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle() },
            getElement: function() {
                return this._.element },
            getName: function() {
                return this._.name },
            getContentElement: function(a, b) {
                var c = this._.contents[a];
                return c && c[b] },
            getValueOf: function(a, b) {
                return this.getContentElement(a, b).getValue() },
            setValueOf: function(a, b, c) {
                return this.getContentElement(a, b).setValue(c) },
            getButton: function(a) {
                return this._.buttons[a] },
            click: function(a) {
                return this._.buttons[a].click() },
            disableButton: function(a) {
                return this._.buttons[a].disable() },
            enableButton: function(a) {
                return this._.buttons[a].enable() },
            getPageCount: function() {
                return this._.pageCount },
            getParentEditor: function() {
                return this._.editor },
            getSelectedElement: function() {
                return this.getParentEditor().getSelection().getSelectedElement() },
            addFocusable: function(a, b) {
                if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new L(this, a, b));
                else { this._.focusList.splice(b, 0, new L(this, a, b));
                    for (var c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++ } },
            setState: function(a) {
                if (this.state != a) {
                    this.state = a;
                    if (a == CKEDITOR.DIALOG_STATE_BUSY) {
                        if (!this.parts.spinner) {
                            var b = this.getParentEditor().lang.dir,
                                c = {
                                    attributes: { "class": "cke_dialog_spinner" },
                                    styles: { "float": "rtl" == b ? "right" : "left" }
                                };
                            c.styles["margin-" + ("rtl" == b ? "left" : "right")] = "8px";
                            this.parts.spinner = CKEDITOR.document.createElement("div", c);
                            this.parts.spinner.setHtml("\x26#8987;");
                            this.parts.spinner.appendTo(this.parts.title, 1)
                        }
                        this.parts.spinner.show();
                        this.getButton("ok").disable()
                    } else a == CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable());
                    this.fire("state", a)
                }
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.dialog, {
            add: function(a, b) {
                this._.dialogDefinitions[a] &&
                    "function" != typeof b || (this._.dialogDefinitions[a] = b)
            },
            exists: function(a) {
                return !!this._.dialogDefinitions[a] },
            getCurrent: function() {
                return CKEDITOR.dialog._.currentTop },
            isTabEnabled: function(a, b, c) { a = a.config.removeDialogTabs;
                return !(a && a.match(new RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i"))) },
            okButton: function() {
                var a = function(a, c) {
                    c = c || {};
                    return CKEDITOR.tools.extend({
                        id: "ok",
                        type: "button",
                        label: a.lang.common.ok,
                        "class": "cke_dialog_ui_button_ok",
                        onClick: function(a) {
                            a = a.data.dialog;
                            !1 !== a.fire("ok", { hide: !0 }).hide && a.hide()
                        }
                    }, c, !0)
                };
                a.type = "button";
                a.override = function(b) {
                    return CKEDITOR.tools.extend(function(c) {
                        return a(c, b) }, { type: "button" }, !0) };
                return a
            }(),
            cancelButton: function() {
                var a = function(a, c) { c = c || {};
                    return CKEDITOR.tools.extend({ id: "cancel", type: "button", label: a.lang.common.cancel, "class": "cke_dialog_ui_button_cancel", onClick: function(a) { a = a.data.dialog;!1 !== a.fire("cancel", { hide: !0 }).hide && a.hide() } }, c, !0) };
                a.type = "button";
                a.override = function(b) {
                    return CKEDITOR.tools.extend(function(c) {
                        return a(c,
                            b)
                    }, { type: "button" }, !0)
                };
                return a
            }(),
            addUIElement: function(a, b) { this._.uiElementBuilders[a] = b }
        });
        CKEDITOR.dialog._ = { uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null };
        CKEDITOR.event.implementOn(CKEDITOR.dialog);
        CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
        var aa = { resizable: CKEDITOR.DIALOG_RESIZE_BOTH, minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton] },
            D = function(a, b, c) {
                for (var e = 0, d; d = a[e]; e++)
                    if (d.id == b || c && d[c] && (d = D(d[c],
                            b, c))) return d;
                return null
            },
            E = function(a, b, c, e, d) {
                if (c) {
                    for (var f = 0, g; g = a[f]; f++) {
                        if (g.id == c) return a.splice(f, 0, b), b;
                        if (e && g[e] && (g = E(g[e], b, c, e, !0))) return g }
                    if (d) return null }
                a.push(b);
                return b },
            F = function(a, b, c) {
                for (var e = 0, d; d = a[e]; e++) {
                    if (d.id == b) return a.splice(e, 1);
                    if (c && d[c] && (d = F(d[c], b, c))) return d }
                return null },
            P = function(a, b) { this.dialog = a;
                for (var c = b.contents, e = 0, d; d = c[e]; e++) c[e] = d && new M(a, d);
                CKEDITOR.tools.extend(this, b) };
        P.prototype = {
            getContents: function(a) {
                return D(this.contents,
                    a)
            },
            getButton: function(a) {
                return D(this.buttons, a) },
            addContents: function(a, b) {
                return E(this.contents, a, b) },
            addButton: function(a, b) {
                return E(this.buttons, a, b) },
            removeContents: function(a) { F(this.contents, a) },
            removeButton: function(a) { F(this.buttons, a) }
        };
        M.prototype = { get: function(a) {
                return D(this.elements, a, "children") }, add: function(a, b) {
                return E(this.elements, a, b, "children") }, remove: function(a) { F(this.elements, a, "children") } };
        var J, z = {},
            u, w = {},
            Q = function(a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey,
                    c =
                    a.data.$.altKey,
                    e = a.data.$.shiftKey,
                    d = String.fromCharCode(a.data.$.keyCode);
                (b = w[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + d]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
            },
            R = function(a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey,
                    c = a.data.$.altKey,
                    e = a.data.$.shiftKey,
                    d = String.fromCharCode(a.data.$.keyCode);
                (b = w[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + d]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key),
                    a.data.preventDefault()))
            },
            S = function(a, b, c, e, d) {
                (w[c] || (w[c] = [])).push({ uiElement: a, dialog: b, key: c, keyup: d || a.accessKeyUp, keydown: e || a.accessKeyDown }) },
            ba = function(a) {
                for (var b in w) {
                    for (var c = w[b], e = c.length - 1; 0 <= e; e--) c[e].dialog != a && c[e].uiElement != a || c.splice(e, 1);
                    0 === c.length && delete w[b] } },
            da = function(a, b) { a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]) },
            ca = function() {};
        (function() {
            CKEDITOR.ui.dialog = {
                uiElement: function(a, b, c, e, d, f, g) {
                    if (!(4 > arguments.length)) {
                        var h = (e.call ? e(b) : e) ||
                            "div",
                            p = ["\x3c", h, " "],
                            m = (d && d.call ? d(b) : d) || {},
                            k = (f && f.call ? f(b) : f) || {},
                            q = (g && g.call ? g.call(this, a, b) : g) || "",
                            n = this.domId = k.id || CKEDITOR.tools.getNextId() + "_uiElement";
                        b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (m.display = "none", this.notAllowed = !0);
                        k.id = n;
                        var r = {};
                        b.type && (r["cke_dialog_ui_" + b.type] = 1);
                        b.className && (r[b.className] = 1);
                        b.disabled && (r.cke_disabled = 1);
                        for (var l = k["class"] && k["class"].split ? k["class"].split(" ") : [], n = 0; n < l.length; n++) l[n] && (r[l[n]] = 1);
                        l = [];
                        for (n in r) l.push(n);
                        k["class"] = l.join(" ");
                        b.title && (k.title = b.title);
                        r = (b.style || "").split(";");
                        b.align && (l = b.align, m["margin-left"] = "left" == l ? 0 : "auto", m["margin-right"] = "right" == l ? 0 : "auto");
                        for (n in m) r.push(n + ":" + m[n]);
                        b.hidden && r.push("display:none");
                        for (n = r.length - 1; 0 <= n; n--) "" === r[n] && r.splice(n, 1);
                        0 < r.length && (k.style = (k.style ? k.style + "; " : "") + r.join("; "));
                        for (n in k) p.push(n + '\x3d"' + CKEDITOR.tools.htmlEncode(k[n]) + '" ');
                        p.push("\x3e", q, "\x3c/", h, "\x3e");
                        c.push(p.join(""));
                        (this._ || (this._ = {})).dialog = a;
                        "boolean" == typeof b.isChanged && (this.isChanged = function() {
                            return b.isChanged });
                        "function" == typeof b.isChanged && (this.isChanged = b.isChanged);
                        "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function(a) {
                            return function(c) { a.call(this, b.setValue.call(this, c)) } }));
                        "function" == typeof b.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function(a) {
                            return function() {
                                return b.getValue.call(this, a.call(this)) } }));
                        CKEDITOR.event.implementOn(this);
                        this.registerEvents(b);
                        this.accessKeyUp && this.accessKeyDown && b.accessKey && S(this, a, "CTRL+" + b.accessKey);
                        var t = this;
                        a.on("load", function() {
                            var b = t.getInputElement();
                            if (b) {
                                var c = t.type in { checkbox: 1, ratio: 1 } && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : "";
                                b.on("focus", function() { a._.tabBarMode = !1;
                                    a._.hasFocus = !0;
                                    t.fire("focus");
                                    c && this.addClass(c) });
                                b.on("blur", function() { t.fire("blur");
                                    c && this.removeClass(c) }) } });
                        CKEDITOR.tools.extend(this, b);
                        this.keyboardFocusable && (this.tabIndex =
                            b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function() { a._.currentFocusIndex = t.focusIndex }))
                    }
                },
                hbox: function(a, b, c, e, d) {
                    if (!(4 > arguments.length)) {
                        this._ || (this._ = {});
                        var f = this._.children = b,
                            g = d && d.widths || null,
                            h = d && d.height || null,
                            p, m = { role: "presentation" };
                        d && d.align && (m.align = d.align);
                        CKEDITOR.ui.dialog.uiElement.call(this, a, d || { type: "hbox" }, e, "table", {}, m, function() {
                            var a = ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e'];
                            for (p = 0; p < c.length; p++) {
                                var b = "cke_dialog_ui_hbox_child",
                                    e = [];
                                0 === p && (b = "cke_dialog_ui_hbox_first");
                                p == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
                                a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" ');
                                g ? g[p] && e.push("width:" + v(g[p])) : e.push("width:" + Math.floor(100 / c.length) + "%");
                                h && e.push("height:" + v(h));
                                d && void 0 !== d.padding && e.push("padding:" + v(d.padding));
                                CKEDITOR.env.ie && CKEDITOR.env.quirks && f[p].align && e.push("text-align:" + f[p].align);
                                0 < e.length && a.push('style\x3d"' + e.join("; ") + '" ');
                                a.push("\x3e", c[p], "\x3c/td\x3e")
                            }
                            a.push("\x3c/tr\x3e\x3c/tbody\x3e");
                            return a.join("")
                        })
                    }
                },
                vbox: function(a, b, c, e, d) {
                    if (!(3 > arguments.length)) {
                        this._ || (this._ = {});
                        var f = this._.children = b,
                            g = d && d.width || null,
                            h = d && d.heights || null;
                        CKEDITOR.ui.dialog.uiElement.call(this, a, d || { type: "vbox" }, e, "div", null, { role: "presentation" }, function() {
                            var b = ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];
                            b.push('style\x3d"');
                            d && d.expand && b.push("height:100%;");
                            b.push("width:" + v(g || "100%"), ";");
                            CKEDITOR.env.webkit && b.push("float:none;");
                            b.push('"');
                            b.push('align\x3d"',
                                CKEDITOR.tools.htmlEncode(d && d.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" ');
                            b.push("\x3e\x3ctbody\x3e");
                            for (var e = 0; e < c.length; e++) {
                                var k = [];
                                b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" ');
                                g && k.push("width:" + v(g || "100%"));
                                h ? k.push("height:" + v(h[e])) : d && d.expand && k.push("height:" + Math.floor(100 / c.length) + "%");
                                d && void 0 !== d.padding && k.push("padding:" + v(d.padding));
                                CKEDITOR.env.ie && CKEDITOR.env.quirks && f[e].align && k.push("text-align:" + f[e].align);
                                0 < k.length && b.push('style\x3d"',
                                    k.join("; "), '" ');
                                b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', c[e], "\x3c/td\x3e\x3c/tr\x3e")
                            }
                            b.push("\x3c/tbody\x3e\x3c/table\x3e");
                            return b.join("")
                        })
                    }
                }
            }
        })();
        CKEDITOR.ui.dialog.uiElement.prototype = {
            getElement: function() {
                return CKEDITOR.document.getById(this.domId) },
            getInputElement: function() {
                return this.getElement() },
            getDialog: function() {
                return this._.dialog },
            setValue: function(a, b) { this.getInputElement().setValue(a);!b && this.fire("change", { value: a });
                return this },
            getValue: function() {
                return this.getInputElement().getValue() },
            isChanged: function() {
                return !1 },
            selectParentTab: function() {
                for (var a = this.getInputElement();
                    (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents"););
                if (!a) return this;
                a = a.getAttribute("name");
                this._.dialog._.currentTabId != a && this._.dialog.selectPage(a);
                return this },
            focus: function() { this.selectParentTab().getInputElement().focus();
                return this },
            registerEvents: function(a) {
                var b = /^on([A-Z]\w+)/,
                    c, e = function(a, b, c, d) { b.on("load", function() { a.getInputElement().on(c, d, a) }) },
                    d;
                for (d in a)
                    if (c =
                        d.match(b)) this.eventProcessors[d] ? this.eventProcessors[d].call(this, this._.dialog, a[d]) : e(this, this._.dialog, c[1].toLowerCase(), a[d]);
                return this
            },
            eventProcessors: { onLoad: function(a, b) { a.on("load", b, this) }, onShow: function(a, b) { a.on("show", b, this) }, onHide: function(a, b) { a.on("hide", b, this) } },
            accessKeyDown: function() { this.focus() },
            accessKeyUp: function() {},
            disable: function() {
                var a = this.getElement();
                this.getInputElement().setAttribute("disabled", "true");
                a.addClass("cke_disabled") },
            enable: function() {
                var a =
                    this.getElement();
                this.getInputElement().removeAttribute("disabled");
                a.removeClass("cke_disabled")
            },
            isEnabled: function() {
                return !this.getElement().hasClass("cke_disabled") },
            isVisible: function() {
                return this.getInputElement().isVisible() },
            isFocusable: function() {
                return this.isEnabled() && this.isVisible() ? !0 : !1 }
        };
        CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
            getChild: function(a) {
                if (1 > arguments.length) return this._.children.concat();
                a.splice || (a = [a]);
                return 2 >
                    a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
            }
        }, !0);
        CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox;
        (function() {
            var a = { build: function(a, c, e) {
                    for (var d = c.children, f, g = [], h = [], p = 0; p < d.length && (f = d[p]); p++) {
                        var m = [];
                        g.push(m);
                        h.push(CKEDITOR.dialog._.uiElementBuilders[f.type].build(a, f, m)) }
                    return new CKEDITOR.ui.dialog[c.type](a, h, g, e, c) } };
            CKEDITOR.dialog.addUIElement("hbox", a);
            CKEDITOR.dialog.addUIElement("vbox",
                a)
        })();
        CKEDITOR.dialogCommand = function(a, b) { this.dialogName = a;
            CKEDITOR.tools.extend(this, b, !0) };
        CKEDITOR.dialogCommand.prototype = { exec: function(a) { a.openDialog(this.dialogName) }, canUndo: !1, editorFocus: 1 };
        (function() {
            var a = /^([a]|[^a])+$/,
                b = /^\d*$/,
                c = /^\d*(?:\.\d+)?$/,
                e = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
                d = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                f = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
            CKEDITOR.VALIDATE_OR = 1;
            CKEDITOR.VALIDATE_AND = 2;
            CKEDITOR.dialog.validate = {
                functions: function() {
                    var a =
                        arguments;
                    return function() {
                        var b = this && this.getValue ? this.getValue() : a[0],
                            c, d = CKEDITOR.VALIDATE_AND,
                            e = [],
                            f;
                        for (f = 0; f < a.length; f++)
                            if ("function" == typeof a[f]) e.push(a[f]);
                            else break;
                        f < a.length && "string" == typeof a[f] && (c = a[f], f++);
                        f < a.length && "number" == typeof a[f] && (d = a[f]);
                        var n = d == CKEDITOR.VALIDATE_AND ? !0 : !1;
                        for (f = 0; f < e.length; f++) n = d == CKEDITOR.VALIDATE_AND ? n && e[f](b) : n || e[f](b);
                        return n ? !0 : c }
                },
                regex: function(a, b) {
                    return function(c) { c = this && this.getValue ? this.getValue() : c;
                        return a.test(c) ? !0 : b } },
                notEmpty: function(b) {
                    return this.regex(a, b) },
                integer: function(a) {
                    return this.regex(b, a) },
                number: function(a) {
                    return this.regex(c, a) },
                cssLength: function(a) {
                    return this.functions(function(a) {
                        return d.test(CKEDITOR.tools.trim(a)) }, a) },
                htmlLength: function(a) {
                    return this.functions(function(a) {
                        return e.test(CKEDITOR.tools.trim(a)) }, a) },
                inlineStyle: function(a) {
                    return this.functions(function(a) {
                        return f.test(CKEDITOR.tools.trim(a)) }, a) },
                equals: function(a, b) {
                    return this.functions(function(b) {
                        return b == a }, b) },
                notEqual: function(a, b) {
                    return this.functions(function(b) {
                        return b != a }, b) }
            };
            CKEDITOR.on("instanceDestroyed", function(a) {
                if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                    for (var b; b = CKEDITOR.dialog._.currentTop;) b.hide();
                    for (var c in z) z[c].remove();
                    z = {} }
                a = a.editor._.storedDialogs;
                for (var d in a) a[d].destroy() })
        })();
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            openDialog: function(a, b) {
                var c = null,
                    e = CKEDITOR.dialog._.dialogDefinitions[a];
                null === CKEDITOR.dialog._.currentTop && N(this);
                if ("function" == typeof e) c =
                    this._.storedDialogs || (this._.storedDialogs = {}), c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c, c), c.show();
                else {
                    if ("failed" == e) throw O(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.'); "string" == typeof e && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e), function() { "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
                        this.openDialog(a, b) }, this, 0, 1) }
                CKEDITOR.skin.loadPart("dialog");
                return c
            }
        })
    })();
    CKEDITOR.plugins.add("dialog", { requires: "dialogui", init: function(x) { x.on("doubleclick", function(A) { A.data.dialog && x.openDialog(A.data.dialog) }, null, null, 999) } });
    CKEDITOR.plugins.add("about", { requires: "dialog", init: function(a) {
            var b = a.addCommand("about", new CKEDITOR.dialogCommand("about"));
            b.modes = { wysiwyg: 1, source: 1 };
            b.canUndo = !1;
            b.readOnly = 1;
            a.ui.addButton && a.ui.addButton("About", { label: a.lang.about.title, command: "about", toolbar: "about" });
            CKEDITOR.dialog.add("about", this.path + "dialogs/about.js") } });
    (function() {
        CKEDITOR.plugins.add("a11yhelp", {
            requires: "dialog",
            availableLangs: { af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-gb": 1, eo: 1, es: 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, fr: 1, "fr-ca": 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1 },
            init: function(b) {
                var c = this;
                b.addCommand("a11yHelp", {
                    exec: function() {
                        var a = b.langCode,
                            a = c.availableLangs[a] ? a : c.availableLangs[a.replace(/-.*/, "")] ? a.replace(/-.*/, "") : "en";
                        CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c.path + "dialogs/lang/" + a + ".js"), function() { b.lang.a11yhelp = c.langEntries[a];
                            b.openDialog("a11yHelp") })
                    },
                    modes: { wysiwyg: 1, source: 1 },
                    readOnly: 1,
                    canUndo: !1
                });
                b.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp");
                CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js");
                b.on("ariaEditorHelpLabel", function(a) { a.data.label = b.lang.common.editorHelp })
            }
        })
    })();
    (function() {
        function f(c) {
            var a = this.att;
            c = c && c.hasAttribute(a) && c.getAttribute(a) || "";
            void 0 !== c && this.setValue(c) }

        function g() {
            for (var c, a = 0; a < arguments.length; a++)
                if (arguments[a] instanceof CKEDITOR.dom.element) { c = arguments[a];
                    break }
            if (c) {
                var a = this.att,
                    b = this.getValue();
                b ? c.setAttribute(a, b) : c.removeAttribute(a, b) } }
        var k = { id: 1, dir: 1, classes: 1, styles: 1 };
        CKEDITOR.plugins.add("dialogadvtab", {
            requires: "dialog",
            allowedContent: function(c) {
                c || (c = k);
                var a = [];
                c.id && a.push("id");
                c.dir && a.push("dir");
                var b =
                    "";
                a.length && (b += "[" + a.join(",") + "]");
                c.classes && (b += "(*)");
                c.styles && (b += "{*}");
                return b
            },
            createAdvancedTab: function(c, a, b) {
                a || (a = k);
                var d = c.lang.common,
                    h = { id: "advanced", label: d.advancedTab, title: d.advancedTab, elements: [{ type: "vbox", padding: 1, children: [] }] },
                    e = [];
                if (a.id || a.dir) a.id && e.push({ id: "advId", att: "id", type: "text", requiredContent: b ? b + "[id]" : null, label: d.id, setup: f, commit: g }), a.dir && e.push({
                    id: "advLangDir",
                    att: "dir",
                    type: "select",
                    requiredContent: b ? b + "[dir]" : null,
                    label: d.langDir,
                    "default": "",
                    style: "width:100%",
                    items: [
                        [d.notSet, ""],
                        [d.langDirLTR, "ltr"],
                        [d.langDirRTL, "rtl"]
                    ],
                    setup: f,
                    commit: g
                }), h.elements[0].children.push({ type: "hbox", widths: ["50%", "50%"], children: [].concat(e) });
                if (a.styles || a.classes) e = [], a.styles && e.push({
                    id: "advStyles",
                    att: "style",
                    type: "text",
                    requiredContent: b ? b + "{cke-xyz}" : null,
                    label: d.styles,
                    "default": "",
                    validate: CKEDITOR.dialog.validate.inlineStyle(d.invalidInlineStyle),
                    onChange: function() {},
                    getStyle: function(a, c) {
                        var b = this.getValue().match(new RegExp("(?:^|;)\\s*" +
                            a + "\\s*:\\s*([^;]*)", "i"));
                        return b ? b[1] : c
                    },
                    updateStyle: function(a, b) {
                        var d = this.getValue(),
                            e = c.document.createElement("span");
                        e.setAttribute("style", d);
                        e.setStyle(a, b);
                        d = CKEDITOR.tools.normalizeCssText(e.getAttribute("style"));
                        this.setValue(d, 1) },
                    setup: f,
                    commit: g
                }), a.classes && e.push({ type: "hbox", widths: ["45%", "55%"], children: [{ id: "advCSSClasses", att: "class", type: "text", requiredContent: b ? b + "(cke-xyz)" : null, label: d.cssClasses, "default": "", setup: f, commit: g }] }), h.elements[0].children.push({
                    type: "hbox",
                    widths: ["50%", "50%"],
                    children: [].concat(e)
                });
                return h
            }
        })
    })();
    CKEDITOR.plugins.add("basicstyles", {
        init: function(c) {
            var e = 0,
                d = function(g, d, b, a) {
                    if (a) { a = new CKEDITOR.style(a);
                        var f = h[b];
                        f.unshift(a);
                        c.attachStyleStateChange(a, function(a) {!c.readOnly && c.getCommand(b).setState(a) });
                        c.addCommand(b, new CKEDITOR.styleCommand(a, { contentForms: f }));
                        c.ui.addButton && c.ui.addButton(g, { label: d, command: b, toolbar: "basicstyles," + (e += 10) }) } },
                h = {
                    bold: ["strong", "b", ["span", function(a) { a = a.styles["font-weight"];
                        return "bold" == a || 700 <= +a }]],
                    italic: ["em", "i", ["span", function(a) {
                        return "italic" ==
                            a.styles["font-style"]
                    }]],
                    underline: ["u", ["span", function(a) {
                        return "underline" == a.styles["text-decoration"] }]],
                    strike: ["s", "strike", ["span", function(a) {
                        return "line-through" == a.styles["text-decoration"] }]],
                    subscript: ["sub"],
                    superscript: ["sup"]
                },
                b = c.config,
                a = c.lang.basicstyles;
            d("Bold", a.bold, "bold", b.coreStyles_bold);
            d("Italic", a.italic, "italic", b.coreStyles_italic);
            d("Underline", a.underline, "underline", b.coreStyles_underline);
            d("Strike", a.strike, "strike", b.coreStyles_strike);
            d("Subscript", a.subscript,
                "subscript", b.coreStyles_subscript);
            d("Superscript", a.superscript, "superscript", b.coreStyles_superscript);
            c.setKeystroke([
                [CKEDITOR.CTRL + 66, "bold"],
                [CKEDITOR.CTRL + 73, "italic"],
                [CKEDITOR.CTRL + 85, "underline"]
            ])
        }
    });
    CKEDITOR.config.coreStyles_bold = { element: "strong", overrides: "b" };
    CKEDITOR.config.coreStyles_italic = { element: "em", overrides: "i" };
    CKEDITOR.config.coreStyles_underline = { element: "u" };
    CKEDITOR.config.coreStyles_strike = { element: "s", overrides: "strike" };
    CKEDITOR.config.coreStyles_subscript = { element: "sub" };
    CKEDITOR.config.coreStyles_superscript = { element: "sup" };
    (function() {
        function q(a, f, d, b) {
            if (!a.isReadOnly() && !a.equals(d.editable())) {
                CKEDITOR.dom.element.setMarker(b, a, "bidi_processed", 1);
                b = a;
                for (var c = d.editable();
                    (b = b.getParent()) && !b.equals(c);)
                    if (b.getCustomData("bidi_processed")) { a.removeStyle("direction");
                        a.removeAttribute("dir");
                        return }
                b = "useComputedState" in d.config ? d.config.useComputedState : 1;
                (b ? a.getComputedStyle("direction") : a.getStyle("direction") || a.hasAttribute("dir")) != f && (a.removeStyle("direction"), b ? (a.removeAttribute("dir"), f != a.getComputedStyle("direction") &&
                    a.setAttribute("dir", f)) : a.setAttribute("dir", f), d.forceNextSelectionCheck())
            }
        }

        function v(a, f, d) {
            var b = a.getCommonAncestor(!1, !0);
            a = a.clone();
            a.enlarge(d == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
            if (a.checkBoundaryOfElement(b, CKEDITOR.START) && a.checkBoundaryOfElement(b, CKEDITOR.END)) {
                for (var c; b && b.type == CKEDITOR.NODE_ELEMENT && (c = b.getParent()) && 1 == c.getChildCount() && !(b.getName() in f);) b = c;
                return b.type == CKEDITOR.NODE_ELEMENT && b.getName() in f && b } }

        function p(a) {
            return {
                context: "p",
                allowedContent: { "h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td": { propertiesOnly: !0, attributes: "dir" } },
                requiredContent: "p[dir]",
                refresh: function(a, d) {
                    var b = a.config.useComputedState,
                        c, b = void 0 === b || b;
                    if (!b) { c = d.lastElement;
                        for (var h = a.editable(); c && !(c.getName() in u || c.equals(h));) {
                            var e = c.getParent();
                            if (!e) break;
                            c = e } }
                    c = c || d.block || d.blockLimit;
                    c.equals(a.editable()) && (h = a.getSelection().getRanges()[0].getEnclosedNode()) && h.type == CKEDITOR.NODE_ELEMENT && (c = h);
                    c && (b = b ? c.getComputedStyle("direction") :
                        c.getStyle("direction") || c.getAttribute("dir"), a.getCommand("bidirtl").setState("rtl" == b ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF), a.getCommand("bidiltr").setState("ltr" == b ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF));
                    b = (d.block || d.blockLimit || a.editable()).getDirection(1);
                    b != (a._.selDir || a.lang.dir) && (a._.selDir = b, a.fire("contentDirChanged", b))
                },
                exec: function(f) {
                    var d = f.getSelection(),
                        b = f.config.enterMode,
                        c = d.getRanges();
                    if (c && c.length) {
                        for (var h = {}, e = d.createBookmarks(), c = c.createIterator(), g,
                                l = 0; g = c.getNextRange(1);) {
                            var k = g.getEnclosedNode();
                            k && (!k || k.type == CKEDITOR.NODE_ELEMENT && k.getName() in r) || (k = v(g, t, b));
                            k && q(k, a, f, h);
                            var m = new CKEDITOR.dom.walker(g),
                                n = e[l].startNode,
                                p = e[l++].endNode;
                            m.evaluator = function(a) {
                                var c = b == CKEDITOR.ENTER_P ? "p" : "div",
                                    d;
                                if (d = (a ? a.type == CKEDITOR.NODE_ELEMENT : !1) && a.getName() in t) {
                                    if (c = a.is(c)) c = (c = a.getParent()) ? c.type == CKEDITOR.NODE_ELEMENT : !1;
                                    d = !(c && a.getParent().is("blockquote")) }
                                return !!(d && a.getPosition(n) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(p) &
                                    CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING)
                            };
                            for (; k = m.next();) q(k, a, f, h);
                            g = g.createIterator();
                            for (g.enlargeBr = b != CKEDITOR.ENTER_BR; k = g.getNextParagraph(b == CKEDITOR.ENTER_P ? "p" : "div");) q(k, a, f, h)
                        }
                        CKEDITOR.dom.element.clearAllMarkers(h);
                        f.forceNextSelectionCheck();
                        d.selectBookmarks(e);
                        f.focus()
                    }
                }
            }
        }

        function w(a) {
            var f = a == l.setAttribute,
                d = a == l.removeAttribute,
                b = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/;
            return function(c, h) {
                if (!this.isReadOnly()) {
                    var e;
                    if (e = c == (f || d ?
                            "dir" : "direction") || "style" == c && (d || b.test(h))) { a: { e = this;
                            for (var g = e.getDocument().getBody().getParent(); e;) {
                                if (e.equals(g)) { e = !1;
                                    break a }
                                e = e.getParent() }
                            e = !0 }
                        e = !e }
                    if (e && (e = this.getDirection(1), g = a.apply(this, arguments), e != this.getDirection(1))) return this.getDocument().fire("dirChanged", this), g
                }
                return a.apply(this, arguments)
            }
        }
        var t = { table: 1, ul: 1, ol: 1, blockquote: 1, div: 1 },
            r = {},
            u = {};
        CKEDITOR.tools.extend(r, t, { tr: 1, p: 1, div: 1, li: 1 });
        CKEDITOR.tools.extend(u, r, { td: 1 });
        CKEDITOR.plugins.add("bidi", {
            init: function(a) {
                function f(b,
                    c, d, e, f) { a.addCommand(d, new CKEDITOR.command(a, e));
                    a.ui.addButton && a.ui.addButton(b, { label: c, command: d, toolbar: "bidi," + f }) }
                if (!a.blockless) {
                    var d = a.lang.bidi;
                    f("BidiLtr", d.ltr, "bidiltr", p("ltr"), 10);
                    f("BidiRtl", d.rtl, "bidirtl", p("rtl"), 20);
                    a.on("contentDom", function() { a.document.on("dirChanged", function(b) { a.fire("dirChanged", { node: b.data, dir: b.data.getDirection(1) }) }) });
                    a.on("contentDirChanged", function(b) { b = (a.lang.dir != b.data ? "add" : "remove") + "Class";
                        var c = a.ui.space(a.config.toolbarLocation);
                        if (c) c[b]("cke_mixed_dir_content") }) }
            }
        });
        for (var l = CKEDITOR.dom.element.prototype, n = ["setStyle", "removeStyle", "setAttribute", "removeAttribute"], m = 0; m < n.length; m++) l[n[m]] = CKEDITOR.tools.override(l[n[m]], w)
    })();
    (function() {
        var m = {
            exec: function(g) {
                var a = g.getCommand("blockquote").state,
                    k = g.getSelection(),
                    c = k && k.getRanges()[0];
                if (c) {
                    var h = k.createBookmarks();
                    if (CKEDITOR.env.ie) {
                        var e = h[0].startNode,
                            b = h[0].endNode,
                            d;
                        if (e && "blockquote" == e.getParent().getName())
                            for (d = e; d = d.getNext();)
                                if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) { e.move(d, !0);
                                    break }
                        if (b && "blockquote" == b.getParent().getName())
                            for (d = b; d = d.getPrevious();)
                                if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) { b.move(d);
                                    break } }
                    var f = c.createIterator();
                    f.enlargeBr = g.config.enterMode != CKEDITOR.ENTER_BR;
                    if (a == CKEDITOR.TRISTATE_OFF) {
                        for (e = []; a = f.getNextParagraph();) e.push(a);
                        1 > e.length && (a = g.document.createElement(g.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), b = h.shift(), c.insertNode(a), a.append(new CKEDITOR.dom.text("﻿", g.document)), c.moveToBookmark(b), c.selectNodeContents(a), c.collapse(!0), b = c.createBookmark(), e.push(a), h.unshift(b));
                        d = e[0].getParent();
                        c = [];
                        for (b = 0; b < e.length; b++) a = e[b], d = d.getCommonAncestor(a.getParent());
                        for (a = {
                                table: 1,
                                tbody: 1,
                                tr: 1,
                                ol: 1,
                                ul: 1
                            }; a[d.getName()];) d = d.getParent();
                        for (b = null; 0 < e.length;) {
                            for (a = e.shift(); !a.getParent().equals(d);) a = a.getParent();
                            a.equals(b) || c.push(a);
                            b = a }
                        for (; 0 < c.length;)
                            if (a = c.shift(), "blockquote" == a.getName()) {
                                for (b = new CKEDITOR.dom.documentFragment(g.document); a.getFirst();) b.append(a.getFirst().remove()), e.push(b.getLast());
                                b.replace(a) } else e.push(a);
                        c = g.document.createElement("blockquote");
                        for (c.insertBefore(e[0]); 0 < e.length;) a = e.shift(), c.append(a)
                    } else if (a == CKEDITOR.TRISTATE_ON) {
                        b = [];
                        for (d = {}; a = f.getNextParagraph();) {
                            for (e = c = null; a.getParent();) {
                                if ("blockquote" == a.getParent().getName()) { c = a.getParent();
                                    e = a;
                                    break }
                                a = a.getParent() }
                            c && e && !e.getCustomData("blockquote_moveout") && (b.push(e), CKEDITOR.dom.element.setMarker(d, e, "blockquote_moveout", !0)) }
                        CKEDITOR.dom.element.clearAllMarkers(d);
                        a = [];
                        e = [];
                        for (d = {}; 0 < b.length;) f = b.shift(), c = f.getParent(), f.getPrevious() ? f.getNext() ? (f.breakParent(f.getParent()), e.push(f.getNext())) : f.remove().insertAfter(c) : f.remove().insertBefore(c), c.getCustomData("blockquote_processed") ||
                            (e.push(c), CKEDITOR.dom.element.setMarker(d, c, "blockquote_processed", !0)), a.push(f);
                        CKEDITOR.dom.element.clearAllMarkers(d);
                        for (b = e.length - 1; 0 <= b; b--) { c = e[b];
                            a: { d = c;
                                for (var f = 0, m = d.getChildCount(), l = void 0; f < m && (l = d.getChild(f)); f++)
                                    if (l.type == CKEDITOR.NODE_ELEMENT && l.isBlockBoundary()) { d = !1;
                                        break a }
                                d = !0 }
                            d && c.remove() }
                        if (g.config.enterMode == CKEDITOR.ENTER_BR)
                            for (c = !0; a.length;)
                                if (f = a.shift(), "div" == f.getName()) {
                                    b = new CKEDITOR.dom.documentFragment(g.document);
                                    !c || !f.getPrevious() || f.getPrevious().type ==
                                        CKEDITOR.NODE_ELEMENT && f.getPrevious().isBlockBoundary() || b.append(g.document.createElement("br"));
                                    for (c = f.getNext() && !(f.getNext().type == CKEDITOR.NODE_ELEMENT && f.getNext().isBlockBoundary()); f.getFirst();) f.getFirst().remove().appendTo(b);
                                    c && b.append(g.document.createElement("br"));
                                    b.replace(f);
                                    c = !1
                                }
                    }
                    k.selectBookmarks(h);
                    g.focus()
                }
            },
            refresh: function(g, a) { this.setState(g.elementPath(a.block || a.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) },
            context: "blockquote",
            allowedContent: "blockquote",
            requiredContent: "blockquote"
        };
        CKEDITOR.plugins.add("blockquote", { init: function(g) { g.blockless || (g.addCommand("blockquote", m), g.ui.addButton && g.ui.addButton("Blockquote", { label: g.lang.blockquote.toolbar, command: "blockquote", toolbar: "blocks,10" })) } })
    })();
    (function() {
        function q(b, a, c) { a.type || (a.type = "auto");
            if (c && !1 === b.fire("beforePaste", a) || !a.dataValue && a.dataTransfer.isEmpty()) return !1;
            a.dataValue || (a.dataValue = "");
            if (CKEDITOR.env.gecko && "drop" == a.method && b.toolbox) b.once("afterPaste", function() { b.toolbox.focus() });
            return b.fire("paste", a) }

        function z(b) {
            function a() {
                var a = b.editable();
                if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) {
                    var c = function(a) { b.readOnly && "cut" == a.name || m.initPasteDataTransfer(a, b);
                        a.data.preventDefault() };
                    a.on("copy",
                        c);
                    a.on("cut", c);
                    a.on("cut", function() { b.readOnly || b.extractSelectedHtml() }, null, null, 999)
                }
                a.on(m.mainPasteEvent, function(b) { "beforepaste" == m.mainPasteEvent && p || u(b) });
                "beforepaste" == m.mainPasteEvent && (a.on("paste", function(a) { v || (f(), a.data.preventDefault(), u(a), d("paste") || b.openDialog("paste")) }), a.on("contextmenu", g, null, null, 0), a.on("beforepaste", function(b) {!b.data || b.data.$.ctrlKey || b.data.$.shiftKey || g() }, null, null, 0));
                a.on("beforecut", function() {!p && h(b) });
                var e;
                a.attachListener(CKEDITOR.env.ie ?
                    a : b.document.getDocumentElement(), "mouseup",
                    function() { e = setTimeout(function() { r() }, 0) });
                b.on("destroy", function() { clearTimeout(e) });
                a.on("keyup", r)
            }

            function c(a) {
                return { type: a, canUndo: "cut" == a, startDisabled: !0, fakeKeystroke: "cut" == a ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67, exec: function() { "cut" == this.type && h();
                        var a;
                        var c = this.type;
                        if (CKEDITOR.env.ie) a = d(c);
                        else try { a = b.document.$.execCommand(c, !1, null) } catch (g) { a = !1 }
                        a || b.showNotification(b.lang.clipboard[this.type + "Error"]);
                        return a } } }

            function e() {
                return {
                    canUndo: !1,
                    async: !0,
                    fakeKeystroke: CKEDITOR.CTRL + 86,
                    exec: function(b, a) {
                        var c = this,
                            d = function(a, d) { a && q(b, a, !!d);
                                b.fire("afterCommandExec", { name: "paste", command: c, returnValue: !!a }) }; "string" == typeof a ? d({ dataValue: a, method: "paste", dataTransfer: m.initPasteDataTransfer() }, 1) : b.getClipboardData(d) }
                }
            }

            function f() { v = 1;
                setTimeout(function() { v = 0 }, 100) }

            function g() { p = 1;
                setTimeout(function() { p = 0 }, 10) }

            function d(a) {
                var c = b.document,
                    d = c.getBody(),
                    g = !1,
                    e = function() { g = !0 };
                d.on(a, e);
                7 < CKEDITOR.env.version ? c.$.execCommand(a) :
                    c.$.selection.createRange().execCommand(a);
                d.removeListener(a, e);
                return g
            }

            function h() {
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                    var a = b.getSelection(),
                        c, d, g;
                    a.getType() == CKEDITOR.SELECTION_ELEMENT && (c = a.getSelectedElement()) && (d = a.getRanges()[0], g = b.document.createText(""), g.insertBefore(c), d.setStartBefore(g), d.setEndAfter(c), a.selectRanges([d]), setTimeout(function() { c.getParent() && (g.remove(), a.selectElement(c)) }, 0)) } }

            function n(a, c) {
                var d = b.document,
                    g = b.editable(),
                    e = function(b) { b.cancel() },
                    h;
                if (!d.getById("cke_pastebin")) {
                    var k = b.getSelection(),
                        u = k.createBookmarks();
                    CKEDITOR.env.ie && k.root.fire("selectionchange");
                    var l = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !g.is("body") || CKEDITOR.env.ie ? "div" : "body", d);
                    l.setAttributes({ id: "cke_pastebin", "data-cke-temp": "1" });
                    var f = 0,
                        d = d.getWindow();
                    CKEDITOR.env.webkit ? (g.append(l), l.addClass("cke_editable"), g.is("body") || (f = "static" != g.getComputedStyle("position") ? g : CKEDITOR.dom.element.get(g.$.offsetParent), f = f.getDocumentPosition().y)) : g.getAscendant(CKEDITOR.env.ie ?
                        "body" : "html", 1).append(l);
                    l.setStyles({ position: "absolute", top: d.getScrollPosition().y - f + 10 + "px", width: "1px", height: Math.max(1, d.getViewPaneSize().height - 20) + "px", overflow: "hidden", margin: 0, padding: 0 });
                    CKEDITOR.env.safari && l.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text"));
                    (f = l.getParent().isReadOnly()) ? (l.setOpacity(0), l.setAttribute("contenteditable", !0)) : l.setStyle("ltr" == b.config.contentsLangDirection ? "left" : "right", "-10000px");
                    b.on("selectionChange", e, null, null, 0);
                    if (CKEDITOR.env.webkit ||
                        CKEDITOR.env.gecko) h = g.once("blur", e, null, null, -100);
                    f && l.focus();
                    f = new CKEDITOR.dom.range(l);
                    f.selectNodeContents(l);
                    var n = f.select();
                    CKEDITOR.env.ie && (h = g.once("blur", function() { b.lockSelection(n) }));
                    var r = CKEDITOR.document.getWindow().getScrollPosition().y;
                    setTimeout(function() {
                        CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = r);
                        h && h.removeListener();
                        CKEDITOR.env.ie && g.focus();
                        k.selectBookmarks(u);
                        l.remove();
                        var a;
                        CKEDITOR.env.webkit && (a = l.getFirst()) && a.is && a.hasClass("Apple-style-span") &&
                            (l = a);
                        b.removeListener("selectionChange", e);
                        c(l.getHtml())
                    }, 0)
                }
            }

            function w() {
                if ("paste" == m.mainPasteEvent) return b.fire("beforePaste", { type: "auto", method: "paste" }), !1;
                b.focus();
                f();
                var a = b.focusManager;
                a.lock();
                if (b.editable().fire(m.mainPasteEvent) && !d("paste")) return a.unlock(), !1;
                a.unlock();
                return !0 }

            function k(a) {
                if ("wysiwyg" == b.mode) switch (a.data.keyCode) {
                    case CKEDITOR.CTRL + 86:
                    case CKEDITOR.SHIFT + 45:
                        a = b.editable();
                        f();
                        "paste" == m.mainPasteEvent && a.fire("beforepaste");
                        break;
                    case CKEDITOR.CTRL + 88:
                    case CKEDITOR.SHIFT +
                    46:
                        b.fire("saveSnapshot"), setTimeout(function() { b.fire("saveSnapshot") }, 50)
                }
            }

            function u(a) {
                var c = { type: "auto", method: "paste", dataTransfer: m.initPasteDataTransfer(a) };
                c.dataTransfer.cacheData();
                var d = !1 !== b.fire("beforePaste", c);
                d && m.canClipboardApiBeTrusted(c.dataTransfer, b) ? (a.data.preventDefault(), setTimeout(function() { q(b, c) }, 0)) : n(a, function(a) { c.dataValue = a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, "");
                    d && q(b, c) }) }

            function r() {
                if ("wysiwyg" == b.mode) {
                    var a = t("paste");
                    b.getCommand("cut").setState(t("cut"));
                    b.getCommand("copy").setState(t("copy"));
                    b.getCommand("paste").setState(a);
                    b.fire("pasteState", a)
                }
            }

            function t(a) {
                if (x && a in { paste: 1, cut: 1 }) return CKEDITOR.TRISTATE_DISABLED;
                if ("paste" == a) return CKEDITOR.TRISTATE_OFF;
                a = b.getSelection();
                var c = a.getRanges();
                return a.getType() == CKEDITOR.SELECTION_NONE || 1 == c.length && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF }
            var m = CKEDITOR.plugins.clipboard,
                p = 0,
                v = 0,
                x = 0;
            (function() {
                b.on("key", k);
                b.on("contentDom", a);
                b.on("selectionChange", function(b) {
                    x =
                        b.data.selection.getRanges()[0].checkReadOnly();
                    r()
                });
                b.contextMenu && b.contextMenu.addListener(function(b, a) { x = a.getRanges()[0].checkReadOnly();
                    return { cut: t("cut"), copy: t("copy"), paste: t("paste") } })
            })();
            (function() {
                function a(c, d, g, e, h) {
                    var k = b.lang.clipboard[d];
                    b.addCommand(d, g);
                    b.ui.addButton && b.ui.addButton(c, { label: k, command: d, toolbar: "clipboard," + e });
                    b.addMenuItems && b.addMenuItem(d, { label: k, command: d, group: "clipboard", order: h }) }
                a("Cut", "cut", c("cut"), 10, 1);
                a("Copy", "copy", c("copy"), 20, 4);
                a("Paste",
                    "paste", e(), 30, 8)
            })();
            b.getClipboardData = function(a, c) {
                function d(a) { a.removeListener();
                    a.cancel();
                    c(a.data) }

                function g(a) { a.removeListener();
                    a.cancel();
                    f = !0;
                    c({ type: k, dataValue: a.data.dataValue, dataTransfer: a.data.dataTransfer, method: "paste" }) }

                function e() { this.customTitle = a && a.title }
                var h = !1,
                    k = "auto",
                    f = !1;
                c || (c = a, a = null);
                b.on("paste", d, null, null, 0);
                b.on("beforePaste", function(a) { a.removeListener();
                    h = !0;
                    k = a.data.type }, null, null, 1E3);
                !1 === w() && (b.removeListener("paste", d), h && b.fire("pasteDialog",
                    e) ? (b.on("pasteDialogCommit", g), b.on("dialogHide", function(a) { a.removeListener();
                    a.data.removeListener("pasteDialogCommit", g);
                    setTimeout(function() { f || c(null) }, 10) })) : c(null))
            }
        }

        function A(b) {
            if (CKEDITOR.env.webkit) {
                if (!b.match(/^[^<]*$/g) && !b.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html" } else if (CKEDITOR.env.ie) {
                if (!b.match(/^([^<]|<br( ?\/)?>)*$/gi) && !b.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html" } else if (CKEDITOR.env.gecko) {
                if (!b.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html" } else return "html";
            return "htmlifiedtext"
        }

        function B(b, a) {
            function c(a) {
                return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e", ~~(a / 2)) + (1 == a % 2 ? "\x3cbr\x3e" : "") }
            a = a.replace(/\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi, "\x3cbr\x3e");
            a = a.replace(/<\/?[A-Z]+>/g, function(a) {
                return a.toLowerCase() });
            if (a.match(/^[^<]$/)) return a;
            CKEDITOR.env.webkit && -1 < a.indexOf("\x3cdiv\x3e") && (a = a.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"),
                a.match(/<div>(<br>|)<\/div>/) && (a = "\x3cp\x3e" + a.replace(/(<div>(<br>|)<\/div>)+/g, function(a) {
                    return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length + 1) }) + "\x3c/p\x3e"), a = a.replace(/<\/div><div>/g, "\x3cbr\x3e"), a = a.replace(/<\/?div>/g, ""));
            CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (a = a.replace(/^<br><br>$/, "\x3cbr\x3e")), -1 < a.indexOf("\x3cbr\x3e\x3cbr\x3e") && (a = "\x3cp\x3e" + a.replace(/(<br>){2,}/g, function(a) {
                return c(a.length / 4) }) + "\x3c/p\x3e"));
            return C(b, a)
        }

        function D() {
            function b() {
                var a = {},
                    b;
                for (b in CKEDITOR.dtd) "$" != b.charAt(0) && "div" != b && "span" != b && (a[b] = 1);
                return a
            }
            var a = {};
            return { get: function(c) {
                    return "plain-text" == c ? a.plainText || (a.plainText = new CKEDITOR.filter("br")) : "semantic-content" == c ? ((c = a.semanticContent) || (c = new CKEDITOR.filter, c.allow({ $1: { elements: b(), attributes: !0, styles: !1, classes: !1 } }), c = a.semanticContent = c), c) : c ? new CKEDITOR.filter(c) : null } }
        }

        function y(b, a, c) {
            a = CKEDITOR.htmlParser.fragment.fromHtml(a);
            var e = new CKEDITOR.htmlParser.basicWriter;
            c.applyTo(a, !0, !1,
                b.activeEnterMode);
            a.writeHtml(e);
            return e.getHtml()
        }

        function C(b, a) { b.enterMode == CKEDITOR.ENTER_BR ? a = a.replace(/(<\/p><p>)+/g, function(a) {
                return CKEDITOR.tools.repeat("\x3cbr\x3e", a.length / 7 * 2) }).replace(/<\/?p>/g, "") : b.enterMode == CKEDITOR.ENTER_DIV && (a = a.replace(/<(\/)?p>/g, "\x3c$1div\x3e"));
            return a }

        function E(b) { b.data.preventDefault();
            b.data.$.dataTransfer.dropEffect = "none" }

        function F(b) {
            var a = CKEDITOR.plugins.clipboard;
            b.on("contentDom", function() {
                function c(a, c, d) {
                    c.select();
                    q(b, {
                        dataTransfer: d,
                        method: "drop"
                    }, 1);
                    d.sourceEditor.fire("saveSnapshot");
                    d.sourceEditor.editable().extractHtmlFromRange(a);
                    d.sourceEditor.getSelection().selectRanges([a]);
                    d.sourceEditor.fire("saveSnapshot")
                }

                function e(d, c) { d.select();
                    q(b, { dataTransfer: c, method: "drop" }, 1);
                    a.resetDragDataTransfer() }

                function f(a, d, c) {
                    var g = { $: a.data.$, target: a.data.getTarget() };
                    d && (g.dragRange = d);
                    c && (g.dropRange = c);!1 === b.fire(a.name, g) && a.data.preventDefault() }

                function g(a) { a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent());
                    return a.getChildCount() }
                var d = b.editable(),
                    h = CKEDITOR.plugins.clipboard.getDropTarget(b),
                    n = b.ui.space("top"),
                    w = b.ui.space("bottom");
                a.preventDefaultDropOnElement(n);
                a.preventDefaultDropOnElement(w);
                d.attachListener(h, "dragstart", f);
                d.attachListener(b, "dragstart", a.resetDragDataTransfer, a, null, 1);
                d.attachListener(b, "dragstart", function(d) { a.initDragDataTransfer(d, b) }, null, null, 2);
                d.attachListener(b, "dragstart", function() {
                    var d = a.dragRange = b.getSelection().getRanges()[0];
                    CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (a.dragStartContainerChildCount =
                        d ? g(d.startContainer) : null, a.dragEndContainerChildCount = d ? g(d.endContainer) : null)
                }, null, null, 100);
                d.attachListener(h, "dragend", f);
                d.attachListener(b, "dragend", a.initDragDataTransfer, a, null, 1);
                d.attachListener(b, "dragend", a.resetDragDataTransfer, a, null, 100);
                d.attachListener(h, "dragover", function(a) {
                    var b = a.data.getTarget();
                    b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files") && a.data.preventDefault() });
                d.attachListener(h, "drop", function(d) {
                    if (!d.data.$.defaultPrevented) { d.data.preventDefault();
                        var c = d.data.getTarget();
                        if (!c.isReadOnly() || c.type == CKEDITOR.NODE_ELEMENT && c.is("html")) {
                            var c = a.getRangeAtDropPosition(d, b),
                                g = a.dragRange;
                            c && f(d, g, c) } } }, null, null, 9999);
                d.attachListener(b, "drop", a.initDragDataTransfer, a, null, 1);
                d.attachListener(b, "drop", function(d) {
                    if (d = d.data) {
                        var g = d.dropRange,
                            h = d.dragRange,
                            f = d.dataTransfer;
                        f.getTransferType(b) == CKEDITOR.DATA_TRANSFER_INTERNAL ? setTimeout(function() {
                            a.internalDrop(h,
                                g, f, b)
                        }, 0) : f.getTransferType(b) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? c(h, g, f) : e(g, f)
                    }
                }, null, null, 9999)
            })
        }
        CKEDITOR.plugins.add("clipboard", {
            requires: "dialog",
            init: function(b) {
                var a, c = D();
                b.config.forcePasteAsPlainText ? a = "plain-text" : b.config.pasteFilter ? a = b.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in b.config || (a = "semantic-content");
                b.pasteFilter = c.get(a);
                z(b);
                F(b);
                CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js"));
                if (CKEDITOR.env.gecko) {
                    var e = ["image/png", "image/jpeg",
                            "image/gif"
                        ],
                        f;
                    b.on("paste", function(a) {
                        var d = a.data,
                            c = d.dataTransfer;
                        if (!d.dataValue && "paste" == d.method && c && 1 == c.getFilesCount() && f != c.id && (c = c.getFile(0), -1 != CKEDITOR.tools.indexOf(e, c.type))) {
                            var n = new FileReader;
                            n.addEventListener("load", function() { a.data.dataValue = '\x3cimg src\x3d"' + n.result + '" /\x3e';
                                b.fire("paste", a.data) }, !1);
                            n.addEventListener("abort", function() { b.fire("paste", a.data) }, !1);
                            n.addEventListener("error", function() { b.fire("paste", a.data) }, !1);
                            n.readAsDataURL(c);
                            f = d.dataTransfer.id;
                            a.stop()
                        }
                    }, null, null, 1)
                }
                b.on("paste", function(a) { a.data.dataTransfer || (a.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer);
                    if (!a.data.dataValue) {
                        var d = a.data.dataTransfer,
                            c = d.getData("text/html");
                        if (c) a.data.dataValue = c, a.data.type = "html";
                        else if (c = d.getData("text/plain")) a.data.dataValue = b.editable().transformPlainTextToHtml(c), a.data.type = "text" } }, null, null, 1);
                b.on("paste", function(a) {
                        var b = a.data.dataValue,
                            c = CKEDITOR.dtd.$block; - 1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi,
                            " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(a, b) {
                            return b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;") })), -1 < b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1"));
                        if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
                            var e, f, k = new CKEDITOR.dom.element("div");
                            for (k.setHtml(b); 1 == k.getChildCount() &&
                                (e = k.getFirst()) && e.type == CKEDITOR.NODE_ELEMENT && (e.hasClass("cke_editable") || e.hasClass("cke_contents"));) k = f = e;
                            f && (b = f.getHtml().replace(/<br>$/i, ""))
                        }
                        CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(b, d) {
                            return d.toLowerCase() in c ? (a.data.preSniffing = "html", "\x3c" + d) : b }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function(b, d) {
                            return d in c ? (a.data.endsWithEOL = 1, "\x3c/" + d + "\x3e") : b }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1"));
                        a.data.dataValue = b
                    }, null,
                    null, 3);
                b.on("paste", function(a) {
                    a = a.data;
                    var d = a.type,
                        e = a.dataValue,
                        f, p = b.config.clipboard_defaultContentType || "html",
                        k = a.dataTransfer.getTransferType(b);
                    f = "html" == d || "html" == a.preSniffing ? "html" : A(e);
                    "htmlifiedtext" == f && (e = B(b.config, e));
                    "text" == d && "html" == f ? e = y(b, e, c.get("plain-text")) : k == CKEDITOR.DATA_TRANSFER_EXTERNAL && b.pasteFilter && !a.dontFilter && (e = y(b, e, b.pasteFilter));
                    a.startsWithEOL && (e = '\x3cbr data-cke-eol\x3d"1"\x3e' + e);
                    a.endsWithEOL && (e += '\x3cbr data-cke-eol\x3d"1"\x3e');
                    "auto" == d &&
                        (d = "html" == f || "html" == p ? "html" : "text");
                    a.type = d;
                    a.dataValue = e;
                    delete a.preSniffing;
                    delete a.startsWithEOL;
                    delete a.endsWithEOL
                }, null, null, 6);
                b.on("paste", function(a) { a = a.data;
                    a.dataValue && (b.insertHtml(a.dataValue, a.type, a.range), setTimeout(function() { b.fire("afterPaste") }, 0)) }, null, null, 1E3);
                b.on("pasteDialog", function(a) { setTimeout(function() { b.openDialog("paste", a.data) }, 0) })
            }
        });
        CKEDITOR.plugins.clipboard = {
            isCustomCopyCutSupported: !CKEDITOR.env.ie && !CKEDITOR.env.iOS,
            isCustomDataTypesSupported: !CKEDITOR.env.ie,
            isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version,
            mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste",
            canClipboardApiBeTrusted: function(b, a) {
                return b.getTransferType(a) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !b.isEmpty() || CKEDITOR.env.gecko && (b.getData("text/html") || b.getFilesCount()) ? !0 : !1 },
            getDropTarget: function(b) {
                var a = b.editable();
                return CKEDITOR.env.ie && 9 > CKEDITOR.env.version || a.isInline() ? a : b.document },
            fixSplitNodesAfterDrop: function(b, a, c, e) {
                function f(b,
                    c, e) {
                    var f = b;
                    f.type == CKEDITOR.NODE_TEXT && (f = b.getParent());
                    if (f.equals(c) && e != c.getChildCount()) return b = a.startContainer.getChild(a.startOffset - 1), c = a.startContainer.getChild(a.startOffset), b && b.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (e = b.getLength(), b.setText(b.getText() + c.getText()), c.remove(), a.setStart(b, e), a.collapse(!0)), !0 }
                var g = a.startContainer;
                "number" == typeof e && "number" == typeof c && g.type == CKEDITOR.NODE_ELEMENT && (f(b.startContainer, g, c) || f(b.endContainer, g, e))
            },
            isDropRangeAffectedByDragRange: function(b,
                a) {
                var c = a.startContainer,
                    e = a.endOffset;
                return b.endContainer.equals(c) && b.endOffset <= e || b.startContainer.getParent().equals(c) && b.startContainer.getIndex() < e || b.endContainer.getParent().equals(c) && b.endContainer.getIndex() < e ? !0 : !1 },
            internalDrop: function(b, a, c, e) {
                var f = CKEDITOR.plugins.clipboard,
                    g = e.editable(),
                    d, h;
                e.fire("saveSnapshot");
                e.fire("lockSnapshot", { dontUpdate: 1 });
                CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(b, a, f.dragStartContainerChildCount, f.dragEndContainerChildCount);
                (h = this.isDropRangeAffectedByDragRange(b, a)) || (d = b.createBookmark(!1));
                f = a.clone().createBookmark(!1);
                h && (d = b.createBookmark(!1));
                b = d.startNode;
                a = d.endNode;
                h = f.startNode;
                a && b.getPosition(h) & CKEDITOR.POSITION_PRECEDING && a.getPosition(h) & CKEDITOR.POSITION_FOLLOWING && h.insertBefore(b);
                b = e.createRange();
                b.moveToBookmark(d);
                g.extractHtmlFromRange(b, 1);
                a = e.createRange();
                a.moveToBookmark(f);
                q(e, { dataTransfer: c, method: "drop", range: a }, 1);
                e.fire("unlockSnapshot")
            },
            getRangeAtDropPosition: function(b, a) {
                var c =
                    b.data.$,
                    e = c.clientX,
                    f = c.clientY,
                    g = a.getSelection(!0).getRanges()[0],
                    d = a.createRange();
                if (b.data.testRange) return b.data.testRange;
                if (document.caretRangeFromPoint) c = a.document.$.caretRangeFromPoint(e, f), d.setStart(CKEDITOR.dom.node(c.startContainer), c.startOffset), d.collapse(!0);
                else if (c.rangeParent) d.setStart(CKEDITOR.dom.node(c.rangeParent), c.rangeOffset), d.collapse(!0);
                else {
                    if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && g && a.editable().hasFocus) return g;
                    if (document.body.createTextRange) {
                        a.focus();
                        c = a.document.getBody().$.createTextRange();
                        try {
                            for (var h = !1, n = 0; 20 > n && !h; n++) {
                                if (!h) try { c.moveToPoint(e, f - n), h = !0 } catch (p) {}
                                if (!h) try { c.moveToPoint(e, f + n), h = !0 } catch (k) {} }
                            if (h) {
                                var u = "cke-temp-" + (new Date).getTime();
                                c.pasteHTML('\x3cspan id\x3d"' + u + '"\x3e​\x3c/span\x3e');
                                var r = a.document.getById(u);
                                d.moveToPosition(r, CKEDITOR.POSITION_BEFORE_START);
                                r.remove() } else {
                                var t = a.document.$.elementFromPoint(e, f),
                                    m = new CKEDITOR.dom.element(t),
                                    q;
                                if (m.equals(a.editable()) || "html" == m.getName()) return g && g.startContainer &&
                                    !g.startContainer.equals(a.editable()) ? g : null;
                                q = m.getClientRect();
                                e < q.left ? d.setStartAt(m, CKEDITOR.POSITION_AFTER_START) : d.setStartAt(m, CKEDITOR.POSITION_BEFORE_END);
                                d.collapse(!0)
                            }
                        } catch (v) {
                            return null }
                    } else return null
                }
                return d
            },
            initDragDataTransfer: function(b, a) {
                var c = b.data.$ ? b.data.$.dataTransfer : null,
                    e = new this.dataTransfer(c, a);
                c ? this.dragData && e.id == this.dragData.id ? e = this.dragData : this.dragData = e : this.dragData ? e = this.dragData : this.dragData = e;
                b.data.dataTransfer = e },
            resetDragDataTransfer: function() {
                this.dragData =
                    null
            },
            initPasteDataTransfer: function(b, a) {
                if (this.isCustomCopyCutSupported) {
                    if (b && b.data && b.data.$) {
                        var c = new this.dataTransfer(b.data.$.clipboardData, a);
                        this.copyCutData && c.id == this.copyCutData.id ? (c = this.copyCutData, c.$ = b.data.$.clipboardData) : this.copyCutData = c;
                        return c }
                    return new this.dataTransfer(null, a) }
                return new this.dataTransfer(CKEDITOR.env.edge && b && b.data.$ && b.data.$.clipboardData || null, a) },
            preventDefaultDropOnElement: function(b) { b && b.on("dragover", E) }
        };
        var p = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ?
            "cke/id" : "Text";
        CKEDITOR.plugins.clipboard.dataTransfer = function(b, a) {
            b && (this.$ = b);
            this._ = { metaRegExp: /^<meta.*?>/i, bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i, fragmentRegExp: /\x3c!--(?:Start|End)Fragment--\x3e/g, data: {}, files: [], normalizeType: function(a) { a = a.toLowerCase();
                    return "text" == a || "text/plain" == a ? "Text" : "url" == a ? "URL" : a } };
            this.id = this.getData(p);
            this.id || (this.id = "Text" == p ? "" : "cke-" + CKEDITOR.tools.getUniqueId());
            if ("Text" != p) try { this.$.setData(p, this.id) } catch (c) {}
            a && (this.sourceEditor =
                a, this.setData("text/html", a.getSelectedHtml(1)), "Text" == p || this.getData("text/plain") || this.setData("text/plain", a.getSelection().getSelectedText()))
        };
        CKEDITOR.DATA_TRANSFER_INTERNAL = 1;
        CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2;
        CKEDITOR.DATA_TRANSFER_EXTERNAL = 3;
        CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
            getData: function(b) {
                b = this._.normalizeType(b);
                var a = this._.data[b];
                if (void 0 === a || null === a || "" === a) try { a = this.$.getData(b) } catch (c) {}
                if (void 0 === a || null === a || "" === a) a = "";
                "text/html" == b ? (a = a.replace(this._.metaRegExp,
                    ""), (b = this._.bodyRegExp.exec(a)) && b.length && (a = b[1], a = a.replace(this._.fragmentRegExp, ""))) : "Text" == b && CKEDITOR.env.gecko && this.getFilesCount() && "file://" == a.substring(0, 7) && (a = "");
                return a
            },
            setData: function(b, a) { b = this._.normalizeType(b);
                this._.data[b] = a;
                if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == b || "Text" == b) { "Text" == p && "Text" == b && (this.id = a);
                    try { this.$.setData(b, a) } catch (c) {} } },
            getTransferType: function(b) {
                return this.sourceEditor ? this.sourceEditor == b ? CKEDITOR.DATA_TRANSFER_INTERNAL :
                    CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL
            },
            cacheData: function() {
                function b(b) { b = a._.normalizeType(b);
                    var c = a.getData(b);
                    c && (a._.data[b] = c) }
                if (this.$) {
                    var a = this,
                        c, e;
                    if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                        if (this.$.types)
                            for (c = 0; c < this.$.types.length; c++) b(this.$.types[c]) } else b("Text"), b("URL");
                    e = this._getImageFromClipboard();
                    if (this.$ && this.$.files || e) {
                        this._.files = [];
                        if (this.$.files && this.$.files.length)
                            for (c = 0; c < this.$.files.length; c++) this._.files.push(this.$.files[c]);
                        0 === this._.files.length && e && this._.files.push(e)
                    }
                }
            },
            getFilesCount: function() {
                return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0 },
            getFile: function(b) {
                return this._.files.length ? this._.files[b] : this.$ && this.$.files && this.$.files.length ? this.$.files[b] : 0 === b ? this._getImageFromClipboard() : void 0 },
            isEmpty: function() {
                var b = {},
                    a;
                if (this.getFilesCount()) return !1;
                for (a in this._.data) b[a] = 1;
                if (this.$)
                    if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                        if (this.$.types)
                            for (var c =
                                    0; c < this.$.types.length; c++) b[this.$.types[c]] = 1
                    } else b.Text = 1, b.URL = 1;
                    "Text" != p && (b[p] = 0);
                for (a in b)
                    if (b[a] && "" !== this.getData(a)) return !1;
                return !0
            },
            _getImageFromClipboard: function() {
                var b;
                if (this.$ && this.$.items && this.$.items[0]) try {
                    if ((b = this.$.items[0].getAsFile()) && b.type) return b } catch (a) {} }
        }
    })();
    (function() {
        var c = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"';
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (c += ' onkeypress\x3d"return false;"');
        CKEDITOR.env.gecko && (c +=
            ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
        var c = c + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"'),
            c = c + '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e',
            t = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"),
            u = CKEDITOR.addTemplate("button", c);
        CKEDITOR.plugins.add("button", { beforeInit: function(a) { a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler) } });
        CKEDITOR.UI_BUTTON = "button";
        CKEDITOR.ui.button = function(a) { CKEDITOR.tools.extend(this, a, { title: a.label, click: a.click || function(b) { b.execCommand(a.command) } });
            this._ = {} };
        CKEDITOR.ui.button.handler = { create: function(a) {
                return new CKEDITOR.ui.button(a) } };
        CKEDITOR.ui.button.prototype = {
            render: function(a, b) {
                function c() {
                    var f = a.mode;
                    f && (f = this.modes[f] ? void 0 !== m[f] ? m[f] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, f = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : f, this.setState(f), this.refresh && this.refresh()) }
                var n = CKEDITOR.env,
                    p = this._.id = CKEDITOR.tools.getNextId(),
                    g = "",
                    d = this.command,
                    q, k, h;
                this._.editor = a;
                var e = { id: p, button: this, editor: a, focus: function() { CKEDITOR.document.getById(p).focus() }, execute: function() { this.button.click(a) }, attach: function(a) { this.button.attach(a) } },
                    v = CKEDITOR.tools.addFunction(function(a) {
                        if (e.onkey) return a = new CKEDITOR.dom.event(a), !1 !== e.onkey(e, a.getKeystroke()) }),
                    w = CKEDITOR.tools.addFunction(function(a) {
                        var b;
                        e.onfocus && (b = !1 !== e.onfocus(e, new CKEDITOR.dom.event(a)));
                        return b }),
                    r = 0;
                e.clickFn = q = CKEDITOR.tools.addFunction(function() { r && (a.unlockSelection(1), r = 0);
                    e.execute();
                    n.iOS && a.focus() });
                if (this.modes) {
                    var m = {};
                    a.on("beforeModeUnload", function() { a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (m[a.mode] = this._.state) }, this);
                    a.on("activeFilterChange",
                        c, this);
                    a.on("mode", c, this);
                    !this.readOnly && a.on("readOnly", c, this)
                } else d && (d = a.getCommand(d)) && (d.on("state", function() { this.setState(d.state) }, this), g += d.state == CKEDITOR.TRISTATE_ON ? "on" : d.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off");
                if (this.directional) a.on("contentDirChanged", function(b) {
                    var c = CKEDITOR.document.getById(this._.id),
                        d = c.getFirst();
                    b = b.data;
                    b != a.lang.dir ? c.addClass("cke_" + b) : c.removeClass("cke_ltr").removeClass("cke_rtl");
                    d.setAttribute("style", CKEDITOR.skin.getIconStyle(l,
                        "rtl" == b, this.icon, this.iconOffset))
                }, this);
                d ? (k = a.getCommandKeystroke(d)) && (h = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard, k)) : g += "off";
                var l = k = this.name || this.command;
                this.icon && !/\./.test(this.icon) && (l = this.icon, this.icon = null);
                g = {
                    id: p,
                    name: k,
                    iconName: l,
                    label: this.label,
                    cls: this.className || "",
                    state: g,
                    ariaDisabled: "disabled" == g ? "true" : "false",
                    title: this.title + (h ? " (" + h.display + ")" : ""),
                    ariaShortcut: h ? a.lang.common.keyboardShortcut + " " + h.aria : "",
                    titleJs: n.gecko && !n.hc ? "" : (this.title ||
                        "").replace("'", ""),
                    hasArrow: this.hasArrow ? "true" : "false",
                    keydownFn: v,
                    focusFn: w,
                    clickFn: q,
                    style: CKEDITOR.skin.getIconStyle(l, "rtl" == a.lang.dir, this.icon, this.iconOffset),
                    arrowHtml: this.hasArrow ? t.output() : ""
                };
                u.output(g, b);
                if (this.onRender) this.onRender();
                return e
            },
            setState: function(a) {
                if (this._.state == a) return !1;
                this._.state = a;
                var b = CKEDITOR.document.getById(this._.id);
                return b ? (b.setState(a, "cke_button"), a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"),
                    this.hasArrow ? (a = a == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label, CKEDITOR.document.getById(this._.id + "_label").setText(a)) : a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
            },
            getState: function() {
                return this._.state },
            toFeature: function(a) {
                if (this._.feature) return this._.feature;
                var b = this;
                this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b);
                return this._.feature =
                    b
            }
        };
        CKEDITOR.ui.prototype.addButton = function(a, b) { this.add(a, CKEDITOR.UI_BUTTON, b) }
    })();
    CKEDITOR.plugins.add("panelbutton", {
        requires: "button",
        onLoad: function() {
            function e(c) {
                var a = this._;
                a.state != CKEDITOR.TRISTATE_DISABLED && (this.createPanel(c), a.on ? a.panel.hide() : a.panel.showBlock(this._.id, this.document.getById(this._.id), 4)) }
            CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.button,
                $: function(c) {
                    var a = c.panel || {};
                    delete c.panel;
                    this.base(c);
                    this.document = a.parent && a.parent.getDocument() || CKEDITOR.document;
                    a.block = { attributes: a.attributes };
                    this.hasArrow = a.toolbarRelated = !0;
                    this.click = e;
                    this._ = { panelDefinition: a }
                },
                statics: { handler: { create: function(c) {
                            return new CKEDITOR.ui.panelButton(c) } } },
                proto: {
                    createPanel: function(c) {
                        var a = this._;
                        if (!a.panel) {
                            var f = this._.panelDefinition,
                                e = this._.panelDefinition.block,
                                g = f.parent || CKEDITOR.document.getBody(),
                                d = this._.panel = new CKEDITOR.ui.floatPanel(c, g, f),
                                f = d.addBlock(a.id, e),
                                b = this;
                            d.onShow = function() { b.className && this.element.addClass(b.className + "_panel");
                                b.setState(CKEDITOR.TRISTATE_ON);
                                a.on = 1;
                                b.editorFocus && c.focus();
                                if (b.onOpen) b.onOpen() };
                            d.onHide = function(d) { b.className && this.element.getFirst().removeClass(b.className + "_panel");
                                b.setState(b.modes && b.modes[c.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                                a.on = 0;
                                if (!d && b.onClose) b.onClose() };
                            d.onEscape = function() { d.hide(1);
                                b.document.getById(a.id).focus() };
                            if (this.onBlock) this.onBlock(d, f);
                            f.onHide = function() { a.on = 0;
                                b.setState(CKEDITOR.TRISTATE_OFF) }
                        }
                    }
                }
            })
        },
        beforeInit: function(e) { e.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler) }
    });
    CKEDITOR.UI_PANELBUTTON = "panelbutton";
    (function() {
        CKEDITOR.plugins.add("panel", { beforeInit: function(a) { a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler) } });
        CKEDITOR.UI_PANEL = "panel";
        CKEDITOR.ui.panel = function(a, b) { b && CKEDITOR.tools.extend(this, b);
            CKEDITOR.tools.extend(this, { className: "", css: [] });
            this.id = CKEDITOR.tools.getNextId();
            this.document = a;
            this.isFramed = this.forceIFrame || this.css.length;
            this._ = { blocks: {} } };
        CKEDITOR.ui.panel.handler = { create: function(a) {
                return new CKEDITOR.ui.panel(a) } };
        var f = CKEDITOR.addTemplate("panel",
                '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'),
            g = CKEDITOR.addTemplate("panel-frame", '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'),
            h = CKEDITOR.addTemplate("panel-frame-inner", '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e');
        CKEDITOR.ui.panel.prototype = {
            render: function(a, b) {
                this.getHolderElement = function() {
                    var a = this._.holder;
                    if (!a) {
                        if (this.isFramed) {
                            var a = this.document.getById(this.id + "_frame"),
                                b = a.getParent(),
                                a = a.getFrameDocument();
                            CKEDITOR.env.iOS && b.setStyles({ overflow: "scroll", "-webkit-overflow-scrolling": "touch" });
                            b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function() { this.isLoaded = !0;
                                if (this.onLoad) this.onLoad() }, this));
                            a.write(h.output(CKEDITOR.tools.extend({
                                css: CKEDITOR.tools.buildStyleHtml(this.css),
                                onload: "window.parent.CKEDITOR.tools.callFunction(" +
                                    b + ");"
                            }, d)));
                            a.getWindow().$.CKEDITOR = CKEDITOR;
                            a.on("keydown", function(a) {
                                var b = a.data.getKeystroke(),
                                    c = this.document.getById(this.id).getAttribute("dir");
                                this._.onKeyDown && !1 === this._.onKeyDown(b) ? a.data.preventDefault() : (27 == b || b == ("rtl" == c ? 39 : 37)) && this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault() }, this);
                            a = a.getBody();
                            a.unselectable();
                            CKEDITOR.env.air && CKEDITOR.tools.callFunction(b)
                        } else a = this.document.getById(this.id);
                        this._.holder = a
                    }
                    return a
                };
                var d = {
                    editorId: a.id,
                    id: this.id,
                    langCode: a.langCode,
                    dir: a.lang.dir,
                    cls: this.className,
                    frame: "",
                    env: CKEDITOR.env.cssClass,
                    "z-index": a.config.baseFloatZIndex + 1
                };
                if (this.isFramed) {
                    var e = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : "";
                    d.frame = g.output({ id: this.id + "_frame", src: e }) }
                e = f.output(d);
                b && b.push(e);
                return e
            },
            addBlock: function(a, b) {
                b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(),
                    b);
                this._.currentBlock || this.showBlock(a);
                return b
            },
            getBlock: function(a) {
                return this._.blocks[a] },
            showBlock: function(a) { a = this._.blocks[a];
                var b = this._.currentBlock,
                    d = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
                b && b.hide();
                this._.currentBlock = a;
                CKEDITOR.fire("ariaWidget", d);
                a._.focusIndex = -1;
                this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a);
                a.show();
                return a },
            destroy: function() { this.element && this.element.remove() }
        };
        CKEDITOR.ui.panel.block =
            CKEDITOR.tools.createClass({
                $: function(a, b) { this.element = a.append(a.getDocument().createElement("div", { attributes: { tabindex: -1, "class": "cke_panel_block" }, styles: { display: "none" } }));
                    b && CKEDITOR.tools.extend(this, b);
                    this.element.setAttributes({ role: this.attributes.role || "presentation", "aria-label": this.attributes["aria-label"], title: this.attributes.title || this.attributes["aria-label"] });
                    this.keys = {};
                    this._.focusIndex = -1;
                    this.element.disableContextMenu() },
                _: {
                    markItem: function(a) {
                        -1 != a && (a = this.element.getElementsByTag("a").getItem(this._.focusIndex =
                            a), CKEDITOR.env.webkit && a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a))
                    }
                },
                proto: {
                    show: function() { this.element.setStyle("display", "") },
                    hide: function() { this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none") },
                    onKeyDown: function(a, b) {
                        var d = this.keys[a];
                        switch (d) {
                            case "next":
                                for (var e = this._.focusIndex, d = this.element.getElementsByTag("a"), c; c = d.getItem(++e);)
                                    if (c.getAttribute("_cke_focus") && c.$.offsetWidth) { this._.focusIndex = e;
                                        c.focus();
                                        break }
                                return c ||
                                    b ? !1 : (this._.focusIndex = -1, this.onKeyDown(a, 1));
                            case "prev":
                                e = this._.focusIndex;
                                for (d = this.element.getElementsByTag("a"); 0 < e && (c = d.getItem(--e));) {
                                    if (c.getAttribute("_cke_focus") && c.$.offsetWidth) { this._.focusIndex = e;
                                        c.focus();
                                        break }
                                    c = null }
                                return c || b ? !1 : (this._.focusIndex = d.count(), this.onKeyDown(a, 1));
                            case "click":
                            case "mouseup":
                                return e = this._.focusIndex, (c = 0 <= e && this.element.getElementsByTag("a").getItem(e)) && (c.$[d] ? c.$[d]() : c.$["on" + d]()), !1
                        }
                        return !0
                    }
                }
            })
    })();
    CKEDITOR.plugins.add("floatpanel", { requires: "panel" });
    (function() {
        function v(a, b, c, l, h) { h = CKEDITOR.tools.genKey(b.getUniqueId(), c.getUniqueId(), a.lang.dir, a.uiColor || "", l.css || "", h || "");
            var g = f[h];
            g || (g = f[h] = new CKEDITOR.ui.panel(b, l), g.element = c.append(CKEDITOR.dom.element.createFromHtml(g.render(a), b)), g.element.setStyles({ display: "none", position: "absolute" }));
            return g }
        var f = {};
        CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
            $: function(a, b, c, l) {
                function h() { e.hide() }
                c.forceIFrame = 1;
                c.toolbarRelated && a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE &&
                    (b = CKEDITOR.document.getById("cke_" + a.name));
                var g = b.getDocument();
                l = v(a, g, b, c, l || 0);
                var m = l.element,
                    p = m.getFirst(),
                    e = this;
                m.disableContextMenu();
                this.element = m;
                this._ = { editor: a, panel: l, parentElement: b, definition: c, document: g, iframe: p, children: [], dir: a.lang.dir, showBlockParams: null };
                a.on("mode", h);
                a.on("resize", h);
                g.getWindow().on("resize", function() { this.reposition() }, this)
            },
            proto: {
                addBlock: function(a, b) {
                    return this._.panel.addBlock(a, b) },
                addListBlock: function(a, b) {
                    return this._.panel.addListBlock(a,
                        b)
                },
                getBlock: function(a) {
                    return this._.panel.getBlock(a) },
                showBlock: function(a, b, c, l, h, g) {
                    var m = this._.panel,
                        p = m.showBlock(a);
                    this._.showBlockParams = [].slice.call(arguments);
                    this.allowBlur(!1);
                    var e = this._.editor.editable();
                    this._.returnFocus = e.hasFocus ? e : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
                    this._.hideTimeout = 0;
                    var k = this.element,
                        e = this._.iframe,
                        e = CKEDITOR.env.ie && !CKEDITOR.env.edge ? e : new CKEDITOR.dom.window(e.$.contentWindow),
                        f = k.getDocument(),
                        r = this._.parentElement.getPositionedAncestor(),
                        t = b.getDocumentPosition(f),
                        f = r ? r.getDocumentPosition(f) : { x: 0, y: 0 },
                        q = "rtl" == this._.dir,
                        d = t.x + (l || 0) - f.x,
                        n = t.y + (h || 0) - f.y;
                    !q || 1 != c && 4 != c ? q || 2 != c && 3 != c || (d += b.$.offsetWidth - 1) : d += b.$.offsetWidth;
                    if (3 == c || 4 == c) n += b.$.offsetHeight - 1;
                    this._.panel._.offsetParentId = b.getId();
                    k.setStyles({ top: n + "px", left: 0, display: "" });
                    k.setOpacity(0);
                    k.getFirst().removeStyle("width");
                    this._.editor.focusManager.add(e);
                    this._.blurSet || (CKEDITOR.event.useCapture = !0, e.on("blur", function(a) {
                            function u() {
                                delete this._.returnFocus;
                                this.hide()
                            }
                            this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(u, 0, this)) : u.call(this))
                        }, this), e.on("focus", function() { this._.focused = !0;
                            this.hideChild();
                            this.allowBlur(!0) }, this), CKEDITOR.env.iOS && (e.on("touchstart", function() { clearTimeout(this._.hideTimeout) }, this), e.on("touchend", function() { this._.hideTimeout = 0;
                            this.focus() }, this)), CKEDITOR.event.useCapture = !1,
                        this._.blurSet = 1);
                    m.onEscape = CKEDITOR.tools.bind(function(a) {
                        if (this.onEscape && !1 === this.onEscape(a)) return !1 }, this);
                    CKEDITOR.tools.setTimeout(function() {
                        var a = CKEDITOR.tools.bind(function() {
                            var a = k;
                            a.removeStyle("width");
                            if (p.autoSize) {
                                var b = p.element.getDocument(),
                                    b = (CKEDITOR.env.webkit || CKEDITOR.env.edge ? p.element : b.getBody()).$.scrollWidth;
                                CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetWidth || 0) - (a.$.clientWidth || 0) + 3);
                                a.setStyle("width", b + 10 + "px");
                                b = p.element.$.scrollHeight;
                                CKEDITOR.env.ie &&
                                    CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight || 0) + 3);
                                a.setStyle("height", b + "px");
                                m._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                            } else a.removeStyle("height");
                            q && (d -= k.$.offsetWidth);
                            k.setStyle("left", d + "px");
                            var b = m.element.getWindow(),
                                a = k.$.getBoundingClientRect(),
                                b = b.getViewPaneSize(),
                                c = a.width || a.right - a.left,
                                e = a.height || a.bottom - a.top,
                                l = q ? a.right : b.width - a.left,
                                h = q ? b.width - a.right : a.left;
                            q ? l < c && (d = h > c ? d + c : b.width > c ? d - a.left : d - a.right + b.width) :
                                l < c && (d = h > c ? d - c : b.width > c ? d - a.right + b.width : d - a.left);
                            c = a.top;
                            b.height - a.top < e && (n = c > e ? n - e : b.height > e ? n - a.bottom + b.height : n - a.top);
                            CKEDITOR.env.ie && (b = a = new CKEDITOR.dom.element(k.$.offsetParent), "html" == b.getName() && (b = b.getDocument().getBody()), "rtl" == b.getComputedStyle("direction") && (d = CKEDITOR.env.ie8Compat ? d - 2 * k.getDocument().getDocumentElement().$.scrollLeft : d - (a.$.scrollWidth - a.$.clientWidth)));
                            var a = k.getFirst(),
                                f;
                            (f = a.getCustomData("activePanel")) && f.onHide && f.onHide.call(this, 1);
                            a.setCustomData("activePanel",
                                this);
                            k.setStyles({ top: n + "px", left: d + "px" });
                            k.setOpacity(1);
                            g && g()
                        }, this);
                        m.isLoaded ? a() : m.onLoad = a;
                        CKEDITOR.tools.setTimeout(function() {
                            var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y;
                            this.focus();
                            p.element.focus();
                            CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a);
                            this.allowBlur(!0);
                            this._.editor.fire("panelShow", this) }, 0, this)
                    }, CKEDITOR.env.air ? 200 : 0, this);
                    this.visible = 1;
                    this.onShow && this.onShow.call(this)
                },
                reposition: function() {
                    var a = this._.showBlockParams;
                    this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, a))
                },
                focus: function() {
                    if (CKEDITOR.env.webkit) {
                        var a = CKEDITOR.document.getActive();
                        a && !a.equals(this._.iframe) && a.$.blur() }(this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus() },
                blur: function() {
                    var a = this._.iframe.getFrameDocument().getActive();
                    a && a.is("a") && (this._.lastFocused = a) },
                hide: function(a) {
                    if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
                        this.hideChild();
                        CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur();
                        this.element.setStyle("display", "none");
                        this.visible = 0;
                        this.element.getFirst().removeCustomData("activePanel");
                        if (a = a && this._.returnFocus) CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(), a.focus();
                        delete this._.lastFocused;
                        this._.showBlockParams = null;
                        this._.editor.fire("panelHide", this)
                    }
                },
                allowBlur: function(a) {
                    var b = this._.panel;
                    void 0 !== a && (b.allowBlur = a);
                    return b.allowBlur },
                showAsChild: function(a, b, c, f, h, g) {
                    if (this._.activeChild != a || a._.panel._.offsetParentId != c.getId()) this.hideChild(), a.onHide =
                        CKEDITOR.tools.bind(function() { CKEDITOR.tools.setTimeout(function() { this._.focused || this.hide() }, 0, this) }, this), this._.activeChild = a, this._.focused = !1, a.showBlock(b, c, f, h, g), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function() { a.element.getChild(0).$.style.cssText += "" }, 100)
                },
                hideChild: function(a) {
                    var b = this._.activeChild;
                    b && (delete b.onHide, delete this._.activeChild, b.hide(), a && this.focus()) }
            }
        });
        CKEDITOR.on("instanceDestroyed", function() {
            var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances),
                b;
            for (b in f) {
                var c = f[b];
                a ? c.destroy() : c.element.hide() }
            a && (f = {})
        })
    })();
    CKEDITOR.plugins.add("colorbutton", {
        requires: "panelbutton,floatpanel",
        init: function(e) {
            function t(a, c, f, g, l) {
                var m = new CKEDITOR.style(k["colorButton_" + c + "Style"]),
                    n = CKEDITOR.tools.getNextId() + "_colorBox";
                l = l || {};
                e.ui.add(a, CKEDITOR.UI_PANELBUTTON, {
                    label: f,
                    title: f,
                    modes: { wysiwyg: 1 },
                    editorFocus: 0,
                    toolbar: "colors," + g,
                    allowedContent: m,
                    requiredContent: m,
                    contentTransformations: l.contentTransformations,
                    panel: { css: CKEDITOR.skin.getPath("editor"), attributes: { role: "listbox", "aria-label": h.panelTitle } },
                    onBlock: function(a,
                        b) { b.autoSize = !0;
                        b.element.addClass("cke_colorblock");
                        b.element.setHtml(x(a, c, n));
                        b.element.getDocument().getBody().setStyle("overflow", "hidden");
                        CKEDITOR.ui.fire("ready", this);
                        var d = b.keys,
                            f = "rtl" == e.lang.dir;
                        d[f ? 37 : 39] = "next";
                        d[40] = "next";
                        d[9] = "next";
                        d[f ? 39 : 37] = "prev";
                        d[38] = "prev";
                        d[CKEDITOR.SHIFT + 9] = "prev";
                        d[32] = "click" },
                    refresh: function() { e.activeFilter.check(m) || this.setState(CKEDITOR.TRISTATE_DISABLED) },
                    onOpen: function() {
                        var a = e.getSelection(),
                            a = a && a.getStartElement(),
                            a = e.elementPath(a),
                            b;
                        if (a) {
                            a =
                                a.block || a.blockLimit || e.document.getBody();
                            do b = a && a.getComputedStyle("back" == c ? "background-color" : "color") || "transparent"; while ("back" == c && "transparent" == b && a && (a = a.getParent()));
                            b && "transparent" != b || (b = "#ffffff");
                            !1 !== k.colorButton_enableAutomatic && this._.panel._.iframe.getFrameDocument().getById(n).setStyle("background-color", b);
                            return b
                        }
                    }
                })
            }

            function x(a, c, f) {
                var g = [],
                    l = k.colorButton_colors.split(","),
                    m = k.colorButton_colorsPerRow || 6,
                    n = e.plugins.colordialog && !1 !== k.colorButton_enableMore,
                    p = l.length +
                    (n ? 2 : 1),
                    b = CKEDITOR.tools.addFunction(function(b, c) {
                        function d(a) { this.removeListener("ok", d);
                            this.removeListener("cancel", d); "ok" == a.name && f(this.getContentElement("picker", "selectedColor").getValue(), c) }
                        var f = arguments.callee;
                        if ("?" == b) e.openDialog("colordialog", function() { this.on("ok", d);
                            this.on("cancel", d) });
                        else {
                            e.focus();
                            a.hide();
                            e.fire("saveSnapshot");
                            e.removeStyle(new CKEDITOR.style(k["colorButton_" + c + "Style"], { color: "inherit" }));
                            if (b) {
                                var g = k["colorButton_" + c + "Style"];
                                g.childRule = "back" ==
                                    c ? function(a) {
                                        return u(a) } : function(a) {
                                        return !(a.is("a") || a.getElementsByTag("a").count()) || u(a) };
                                e.applyStyle(new CKEDITOR.style(g, { color: b }))
                            }
                            e.fire("saveSnapshot")
                        }
                    });
                !1 !== k.colorButton_enableAutomatic && g.push('\x3ca class\x3d"cke_colorauto" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', h.auto, '" onclick\x3d"CKEDITOR.tools.callFunction(', b, ",null,'", c, "');return false;\" href\x3d\"javascript:void('", h.auto, '\')" role\x3d"option" aria-posinset\x3d"1" aria-setsize\x3d"', p, '"\x3e\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e\x3ctr\x3e\x3ctd colspan\x3d"' +
                    m + '" align\x3d"center"\x3e\x3cspan class\x3d"cke_colorbox" id\x3d"', f, '"\x3e\x3c/span\x3e', h.auto, "\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/a\x3e");
                g.push('\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e');
                for (f = 0; f < l.length; f++) {
                    0 === f % m && g.push("\x3c/tr\x3e\x3ctr\x3e");
                    var d = l[f].split("/"),
                        q = d[0],
                        r = d[1] || q;
                    d[1] || (q = "#" + q.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3"));
                    d = e.lang.colorbutton.colors[r] || r;
                    g.push('\x3ctd\x3e\x3ca class\x3d"cke_colorbox" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"',
                        d, '" onclick\x3d"CKEDITOR.tools.callFunction(', b, ",'", q, "','", c, "'); return false;\" href\x3d\"javascript:void('", d, '\')" role\x3d"option" aria-posinset\x3d"', f + 2, '" aria-setsize\x3d"', p, '"\x3e\x3cspan class\x3d"cke_colorbox" style\x3d"background-color:#', r, '"\x3e\x3c/span\x3e\x3c/a\x3e\x3c/td\x3e')
                }
                n && g.push('\x3c/tr\x3e\x3ctr\x3e\x3ctd colspan\x3d"' + m + '" align\x3d"center"\x3e\x3ca class\x3d"cke_colormore" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', h.more, '" onclick\x3d"CKEDITOR.tools.callFunction(',
                    b, ",'?','", c, "');return false;\" href\x3d\"javascript:void('", h.more, "')\"", ' role\x3d"option" aria-posinset\x3d"', p, '" aria-setsize\x3d"', p, '"\x3e', h.more, "\x3c/a\x3e\x3c/td\x3e");
                g.push("\x3c/tr\x3e\x3c/table\x3e");
                return g.join("")
            }

            function u(a) {
                return "false" == a.getAttribute("contentEditable") || a.getAttribute("data-nostyle") }
            var k = e.config,
                h = e.lang.colorbutton;
            if (!CKEDITOR.env.hc) {
                t("TextColor", "fore", h.textColorTitle, 10, {
                    contentTransformations: [
                        [{
                            element: "font",
                            check: "span{color}",
                            left: function(a) {
                                return !!a.attributes.color },
                            right: function(a) { a.name = "span";
                                a.attributes.color && (a.styles.color = a.attributes.color);
                                delete a.attributes.color }
                        }]
                    ]
                });
                var v = {},
                    w = e.config.colorButton_normalizeBackground;
                if (void 0 === w || w) v.contentTransformations = [
                    [{
                        element: "span",
                        left: function(a) {
                            var c = CKEDITOR.tools;
                            if ("span" != a.name || !a.styles || !a.styles.background) return !1;
                            a = c.style.parse.background(a.styles.background);
                            return a.color && 1 === c.objectKeys(a).length },
                        right: function(a) {
                            var c = (new CKEDITOR.style(e.config.colorButton_backStyle, { color: a.styles.background })).getDefinition();
                            a.name = c.element;
                            a.styles = c.styles;
                            a.attributes = c.attributes || {};
                            return a
                        }
                    }]
                ];
                t("BGColor", "back", h.bgColorTitle, 20, v)
            }
        }
    });
    CKEDITOR.config.colorButton_colors = "1ABC9C,2ECC71,3498DB,9B59B6,4E5F70,F1C40F,16A085,27AE60,2980B9,8E44AD,2C3E50,F39C12,E67E22,E74C3C,ECF0F1,95A5A6,DDD,FFF,D35400,C0392B,BDC3C7,7F8C8D,999,000";
    CKEDITOR.config.colorButton_foreStyle = { element: "span", styles: { color: "#(color)" }, overrides: [{ element: "font", attributes: { color: null } }] };
    CKEDITOR.config.colorButton_backStyle = { element: "span", styles: { "background-color": "#(color)" } };
    CKEDITOR.plugins.colordialog = {
        requires: "dialog",
        init: function(b) {
            var c = new CKEDITOR.dialogCommand("colordialog");
            c.editorFocus = !1;
            b.addCommand("colordialog", c);
            CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js");
            b.getColorFromDialog = function(c, f) {
                var d = function(a) { this.removeListener("ok", d);
                        this.removeListener("cancel", d);
                        a = "ok" == a.name ? this.getValueOf("picker", "selectedColor") : null;
                        c.call(f, a) },
                    e = function(a) { a.on("ok", d);
                        a.on("cancel", d) };
                b.execCommand("colordialog");
                if (b._.storedDialogs &&
                    b._.storedDialogs.colordialog) e(b._.storedDialogs.colordialog);
                else CKEDITOR.on("dialogDefinition", function(a) {
                    if ("colordialog" == a.data.name) {
                        var b = a.data.definition;
                        a.removeListener();
                        b.onLoad = CKEDITOR.tools.override(b.onLoad, function(a) {
                            return function() { e(this);
                                b.onLoad = a; "function" == typeof a && a.call(this) } }) } })
            }
        }
    };
    CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog);
    (function() {
        CKEDITOR.plugins.add("templates", { requires: "dialog", init: function(a) { CKEDITOR.dialog.add("templates", CKEDITOR.getUrl(this.path + "dialogs/templates.js"));
                a.addCommand("templates", new CKEDITOR.dialogCommand("templates"));
                a.ui.addButton && a.ui.addButton("Templates", { label: a.lang.templates.button, command: "templates", toolbar: "doctools,10" }) } });
        var c = {},
            f = {};
        CKEDITOR.addTemplates = function(a, d) { c[a] = d };
        CKEDITOR.getTemplates = function(a) {
            return c[a] };
        CKEDITOR.loadTemplates = function(a, d) {
            for (var e = [], b = 0, c = a.length; b < c; b++) f[a[b]] || (e.push(a[b]), f[a[b]] = 1);
            e.length ? CKEDITOR.scriptLoader.load(e, d) : setTimeout(d, 0)
        }
    })();
    CKEDITOR.config.templates_files = [CKEDITOR.getUrl("plugins/templates/templates/default.js")];
    CKEDITOR.config.templates_replaceContent = !0;
    CKEDITOR.plugins.add("menu", { requires: "floatpanel", beforeInit: function(l) {
            for (var h = l.config.menu_groups.split(","), r = l._.menuGroups = {}, t = l._.menuItems = {}, n = 0; n < h.length; n++) r[h[n]] = n + 1;
            l.addMenuGroup = function(a, b) { r[a] = b || 100 };
            l.addMenuItem = function(a, b) { r[b.group] && (t[a] = new CKEDITOR.menuItem(this, a, b)) };
            l.addMenuItems = function(a) {
                for (var b in a) this.addMenuItem(b, a[b]) };
            l.getMenuItem = function(a) {
                return t[a] };
            l.removeMenuItem = function(a) { delete t[a] } } });
    (function() {
        function l(a) { a.sort(function(a, d) {
                return a.group < d.group ? -1 : a.group > d.group ? 1 : a.order < d.order ? -1 : a.order > d.order ? 1 : 0 }) }
        var h = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{label}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"';
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (h += ' onkeypress\x3d"return false;"');
        CKEDITOR.env.gecko && (h += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"');
        var h = h + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e'),
            r = CKEDITOR.addTemplate("menuItem",
                h + '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e'),
            t = CKEDITOR.addTemplate("menuArrow", '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'),
            n = CKEDITOR.addTemplate("menuShortcut", '\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e');
        CKEDITOR.menu = CKEDITOR.tools.createClass({
            $: function(a, b) {
                b = this._.definition = b || {};
                this.id = CKEDITOR.tools.getNextId();
                this.editor = a;
                this.items = [];
                this._.listeners = [];
                this._.level = b.level || 1;
                var d = CKEDITOR.tools.extend({}, b.panel, { css: [CKEDITOR.skin.getPath("editor")], level: this._.level - 1, block: {} }),
                    m = d.block.attributes = d.attributes || {};
                !m.role && (m.role = "menu");
                this._.panelDefinition =
                    d
            },
            _: {
                onShow: function() {
                    var a = this.editor.getSelection(),
                        b = a && a.getStartElement(),
                        d = this.editor.elementPath(),
                        m = this._.listeners;
                    this.removeAll();
                    for (var g = 0; g < m.length; g++) {
                        var k = m[g](b, a, d);
                        if (k)
                            for (var e in k) {
                                var f = this.editor.getMenuItem(e);!f || f.command && !this.editor.getCommand(f.command).state || (f.state = k[e], this.add(f)) } } },
                onClick: function(a) { this.hide();
                    if (a.onClick) a.onClick();
                    else a.command && this.editor.execCommand(a.command) },
                onEscape: function(a) {
                    var b = this.parent;
                    b ? b._.panel.hideChild(1) :
                        27 == a && this.hide(1);
                    return !1
                },
                onHide: function() { this.onHide && this.onHide() },
                showSubMenu: function(a) {
                    var b = this._.subMenu,
                        d = this.items[a];
                    if (d = d.getItems && d.getItems()) {
                        b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, { level: this._.level + 1 }, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this));
                        for (var m in d) {
                            var g = this.editor.getMenuItem(m);
                            g && (g.state = d[m], b.add(g)) }
                        var k = this._.panel.getBlock(this.id).element.getDocument().getById(this.id +
                            String(a));
                        setTimeout(function() { b.show(k, 2) }, 0)
                    } else this._.panel.hideChild(1)
                }
            },
            proto: {
                add: function(a) { a.order || (a.order = this.items.length);
                    this.items.push(a) },
                removeAll: function() { this.items = [] },
                show: function(a, b, d, m) {
                    if (!this.parent && (this._.onShow(), !this.items.length)) return;
                    b = b || ("rtl" == this.editor.lang.dir ? 2 : 1);
                    var g = this.items,
                        k = this.editor,
                        e = this._.panel,
                        f = this._.element;
                    if (!e) {
                        e = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
                        e.onEscape = CKEDITOR.tools.bind(function(a) {
                            if (!1 === this._.onEscape(a)) return !1 }, this);
                        e.onShow = function() { e._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all") };
                        e.onHide = CKEDITOR.tools.bind(function() { this._.onHide && this._.onHide() }, this);
                        f = e.addBlock(this.id, this._.panelDefinition.block);
                        f.autoSize = !0;
                        var c = f.keys;
                        c[40] = "next";
                        c[9] = "next";
                        c[38] = "prev";
                        c[CKEDITOR.SHIFT + 9] = "prev";
                        c["rtl" == k.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click";
                        c[32] = CKEDITOR.env.ie ? "mouseup" :
                            "click";
                        CKEDITOR.env.ie && (c[13] = "mouseup");
                        f = this._.element = f.element;
                        c = f.getDocument();
                        c.getBody().setStyle("overflow", "hidden");
                        c.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden");
                        this._.itemOverFn = CKEDITOR.tools.addFunction(function(a) { clearTimeout(this._.showSubTimeout);
                            this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, k.config.menu_subMenuDelay || 400, this, [a]) }, this);
                        this._.itemOutFn = CKEDITOR.tools.addFunction(function() { clearTimeout(this._.showSubTimeout) }, this);
                        this._.itemClickFn = CKEDITOR.tools.addFunction(function(a) {
                            var b = this.items[a];
                            if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1);
                            else if (b.getItems) this._.showSubMenu(a);
                            else this._.onClick(b) }, this)
                    }
                    l(g);
                    for (var c = k.elementPath(), c = ['\x3cdiv class\x3d"cke_menu' + (c && c.direction() != k.lang.dir ? " cke_mixed_dir_content" : "") + '" role\x3d"presentation"\x3e'], h = g.length, n = h && g[0].group, q = 0; q < h; q++) {
                        var p = g[q];
                        n != p.group && (c.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'),
                            n = p.group);
                        p.render(this, q, c)
                    }
                    c.push("\x3c/div\x3e");
                    f.setHtml(c.join(""));
                    CKEDITOR.ui.fire("ready", this);
                    this.parent ? this.parent._.panel.showAsChild(e, this.id, a, b, d, m) : e.showBlock(this.id, a, b, d, m);
                    k.fire("menuShow", [e])
                },
                addListener: function(a) { this._.listeners.push(a) },
                hide: function(a) { this._.onHide && this._.onHide();
                    this._.panel && this._.panel.hide(a) }
            }
        });
        CKEDITOR.menuItem = CKEDITOR.tools.createClass({
            $: function(a, b, d) {
                CKEDITOR.tools.extend(this, d, { order: 0, className: "cke_menubutton__" + b });
                this.group =
                    a._.menuGroups[this.group];
                this.editor = a;
                this.name = b
            },
            proto: {
                render: function(a, b, d) {
                    var h = a.id + String(b),
                        g = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state,
                        k = "",
                        e = this.editor,
                        f, c, l = g == CKEDITOR.TRISTATE_ON ? "on" : g == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off";
                    this.role in { menuitemcheckbox: 1, menuitemradio: 1 } && (k = ' aria-checked\x3d"' + (g == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"');
                    var u = this.getItems,
                        q = "\x26#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";",
                        p = this.name;
                    this.icon && !/\./.test(this.icon) &&
                        (p = this.icon);
                    this.command && (f = e.getCommand(this.command), (f = e.getCommandKeystroke(f)) && (c = CKEDITOR.tools.keystrokeToString(e.lang.common.keyboard, f)));
                    a = {
                        id: h,
                        name: this.name,
                        iconName: p,
                        label: this.label,
                        cls: this.className || "",
                        state: l,
                        hasPopup: u ? "true" : "false",
                        disabled: g == CKEDITOR.TRISTATE_DISABLED,
                        title: this.label + (c ? " (" + c.display + ")" : ""),
                        ariaShortcut: c ? e.lang.common.keyboardShortcut + " " + c.aria : "",
                        href: "javascript:void('" + (this.label || "").replace("'") + "')",
                        hoverFn: a._.itemOverFn,
                        moveOutFn: a._.itemOutFn,
                        clickFn: a._.itemClickFn,
                        index: b,
                        iconStyle: CKEDITOR.skin.getIconStyle(p, "rtl" == this.editor.lang.dir, p == this.icon ? null : this.icon, this.iconOffset),
                        shortcutHtml: c ? n.output({ shortcut: c.display }) : "",
                        arrowHtml: u ? t.output({ label: q }) : "",
                        role: this.role ? this.role : "menuitem",
                        ariaChecked: k
                    };
                    r.output(a, d)
                }
            }
        })
    })();
    CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div";
    CKEDITOR.plugins.add("contextmenu", {
        requires: "menu",
        onLoad: function() {
            CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                base: CKEDITOR.menu,
                $: function(a) { this.base.call(this, a, { panel: { className: "cke_menu_panel", attributes: { "aria-label": a.lang.contextmenu.options } } }) },
                proto: {
                    addTarget: function(a, e) {
                        a.on("contextmenu", function(a) {
                            a = a.data;
                            var c = CKEDITOR.env.webkit ? f : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey;
                            if (!e || !c) {
                                a.preventDefault();
                                if (CKEDITOR.env.mac && CKEDITOR.env.webkit) {
                                    var c = this.editor,
                                        b = (new CKEDITOR.dom.elementPath(a.getTarget(), c.editable())).contains(function(a) {
                                            return a.hasAttribute("contenteditable") }, !0);
                                    b && "false" == b.getAttribute("contenteditable") && c.getSelection().fake(b)
                                }
                                var b = a.getTarget().getDocument(),
                                    d = a.getTarget().getDocument().getDocumentElement(),
                                    c = !b.equals(CKEDITOR.document),
                                    b = b.getWindow().getScrollPosition(),
                                    g = c ? a.$.clientX : a.$.pageX || b.x + a.$.clientX,
                                    h = c ? a.$.clientY : a.$.pageY || b.y + a.$.clientY;
                                CKEDITOR.tools.setTimeout(function() { this.open(d, null, g, h) }, CKEDITOR.env.ie ?
                                    200 : 0, this)
                            }
                        }, this);
                        if (CKEDITOR.env.webkit) {
                            var f, d = function() { f = 0 };
                            a.on("keydown", function(a) { f = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey });
                            a.on("keyup", d);
                            a.on("contextmenu", d) }
                    },
                    open: function(a, e, f, d) { this.editor.focus();
                        a = a || CKEDITOR.document.getDocumentElement();
                        this.editor.selectionChange(1);
                        this.show(a, e, f, d) }
                }
            })
        },
        beforeInit: function(a) {
            var e = a.contextMenu = new CKEDITOR.plugins.contextMenu(a);
            a.on("contentDom", function() { e.addTarget(a.editable(), !1 !== a.config.browserContextMenuOnCtrl) });
            a.addCommand("contextMenu", { exec: function() { a.contextMenu.open(a.document.getBody()) } });
            a.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu");
            a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
        }
    });
    (function() {
        function r(a) {
            var b = (a = a.data) && a.$;
            return a && b ? CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? 1 === b.button : 0 === b.button : !1 }

        function k(a, b, e, d) {
            var c = new CKEDITOR.dom.walker(a);
            if (a = a.startContainer.getAscendant(b, !0) || a.endContainer.getAscendant(b, !0))
                if (e(a), d) return;
            for (; a = c.next();)
                if (a = a.getAscendant(b, !0))
                    if (e(a), d) break }

        function u(a, b) {
            var e = { ul: "ol", ol: "ul" };
            return -1 !== l(b, function(b) {
                return b.element === a || b.element === e[a] }) }

        function q(a) {
            this.styles = null;
            this.sticky = !1;
            this.editor = a;
            this.filter = new CKEDITOR.filter(a.config.copyFormatting_allowRules);
            !0 === a.config.copyFormatting_allowRules && (this.filter.disabled = !0);
            a.config.copyFormatting_disallowRules && this.filter.disallow(a.config.copyFormatting_disallowRules)
        }
        var l = CKEDITOR.tools.indexOf,
            t = !1;
        CKEDITOR.plugins.add("copyformatting", {
            lang: "en",
            icons: "copyformatting",
            hidpi: !0,
            init: function(a) {
                var b = CKEDITOR.plugins.copyformatting;
                b._addScreenReaderContainer();
                t || (CKEDITOR.document.appendStyleSheet(this.path + "styles/copyformatting.css"),
                    t = !0);
                a.addContentsCss && a.addContentsCss(this.path + "styles/copyformatting.css");
                a.copyFormatting = new b.state(a);
                a.addCommand("copyFormatting", b.commands.copyFormatting);
                a.addCommand("applyFormatting", b.commands.applyFormatting);
                a.ui.addButton("CopyFormatting", { label: a.lang.copyformatting.label, command: "copyFormatting", toolbar: "cleanup,0" });
                a.on("contentDom", function() {
                    var e = a.editable(),
                        b = e.isInline() ? e : a.document,
                        c = a.ui.get("CopyFormatting");
                    e.attachListener(b, "mouseup", function(b) { r(b) && a.execCommand("applyFormatting") });
                    e.attachListener(CKEDITOR.document, "mouseup", function(b) {
                        var d = a.getCommand("copyFormatting");
                        r(b) && d.state === CKEDITOR.TRISTATE_ON && !e.contains(b.data.getTarget()) && a.execCommand("copyFormatting") });
                    c && (b = CKEDITOR.document.getById(c._.id), e.attachListener(b, "dblclick", function() { a.execCommand("copyFormatting", { sticky: !0 }) }), e.attachListener(b, "mouseup", function(a) { a.data.stopPropagation() }))
                });
                a.config.copyFormatting_keystrokeCopy && a.setKeystroke(a.config.copyFormatting_keystrokeCopy, "copyFormatting");
                a.config.copyFormatting_keystrokePaste && a.setKeystroke(a.config.copyFormatting_keystrokePaste, "applyFormatting");
                a.on("key", function(b) {
                    var d = a.getCommand("copyFormatting");
                    b = b.data.domEvent;
                    b.getKeystroke && 27 === b.getKeystroke() && d.state === CKEDITOR.TRISTATE_ON && a.execCommand("copyFormatting") });
                a.copyFormatting.on("extractFormatting", function(e) {
                    var d = e.data.element;
                    if (d.contains(a.editable()) || d.equals(a.editable())) return e.cancel();
                    d = b._convertElementToStyleDef(d);
                    if (!a.copyFormatting.filter.check(new CKEDITOR.style(d), !0, !0)) return e.cancel();
                    e.data.styleDef = d
                });
                a.copyFormatting.on("applyFormatting", function(e) {
                    if (!e.data.preventFormatStripping) {
                        var d = e.data.range,
                            c = b._extractStylesFromRange(a, d),
                            f = b._determineContext(d),
                            g, h;
                        if (a.copyFormatting._isContextAllowed(f))
                            for (h = 0; h < c.length; h++) f = c[h], g = d.createBookmark(), -1 === l(b.preservedElements, f.element) ? CKEDITOR.env.webkit && !CKEDITOR.env.chrome ? c[h].removeFromRange(e.data.range, e.editor) : c[h].remove(e.editor) : u(f.element, e.data.styles) && b._removeStylesFromElementInRange(d,
                                f.element), d.moveToBookmark(g)
                    }
                });
                a.copyFormatting.on("applyFormatting", function(b) {
                        var d = CKEDITOR.plugins.copyformatting,
                            c = d._determineContext(b.data.range); "list" === c && a.copyFormatting._isContextAllowed("list") ? d._applyStylesToListContext(b.editor, b.data.range, b.data.styles) : "table" === c && a.copyFormatting._isContextAllowed("table") ? d._applyStylesToTableContext(b.editor, b.data.range, b.data.styles) : a.copyFormatting._isContextAllowed("text") && d._applyStylesToTextContext(b.editor, b.data.range, b.data.styles) },
                    null, null, 999)
            }
        });
        q.prototype._isContextAllowed = function(a) {
            var b = this.editor.config.copyFormatting_allowedContexts;
            return !0 === b || -1 !== l(b, a) };
        CKEDITOR.event.implementOn(q.prototype);
        CKEDITOR.plugins.copyformatting = {
            state: q,
            inlineBoundary: "h1 h2 h3 h4 h5 h6 p div".split(" "),
            excludedAttributes: ["id", "style", "href", "data-cke-saved-href", "dir"],
            elementsForInlineTransform: ["li"],
            excludedElementsFromInlineTransform: ["table", "thead", "tbody", "ul", "ol"],
            excludedAttributesFromInlineTransform: ["value", "type"],
            preservedElements: "ul ol li td th tr thead tbody table".split(" "),
            breakOnElements: ["ul", "ol", "table"],
            commands: {
                copyFormatting: {
                    exec: function(a, b) {
                        var e = CKEDITOR.plugins.copyformatting,
                            d = a.copyFormatting,
                            c = b ? "keystrokeHandler" == b.from : !1,
                            f = b ? b.sticky || c : !1,
                            g = e._getCursorContainer(a),
                            h = CKEDITOR.document.getDocumentElement();
                        if (this.state === CKEDITOR.TRISTATE_ON) return d.styles = null, d.sticky = !1, g.removeClass("cke_copyformatting_active"), h.removeClass("cke_copyformatting_disabled"), h.removeClass("cke_copyformatting_tableresize_cursor"),
                            e._putScreenReaderMessage(a, "canceled"), this.setState(CKEDITOR.TRISTATE_OFF);
                        d.styles = e._extractStylesFromElement(a, a.elementPath().lastElement);
                        this.setState(CKEDITOR.TRISTATE_ON);
                        c || (g.addClass("cke_copyformatting_active"), h.addClass("cke_copyformatting_tableresize_cursor"), a.config.copyFormatting_outerCursor && h.addClass("cke_copyformatting_disabled"));
                        d.sticky = f;
                        e._putScreenReaderMessage(a, "copied")
                    }
                },
                applyFormatting: {
                    exec: function(a, b) {
                        var e = a.getCommand("copyFormatting"),
                            d = b ? "keystrokeHandler" ==
                            b.from : !1,
                            c = CKEDITOR.plugins.copyformatting,
                            f = a.copyFormatting,
                            g = c._getCursorContainer(a),
                            h = CKEDITOR.document.getDocumentElement();
                        if (d || e.state === CKEDITOR.TRISTATE_ON) {
                            if (d && !f.styles) return c._putScreenReaderMessage(a, "failed");
                            d = c._applyFormat(a, f.styles);
                            f.sticky || (f.styles = null, g.removeClass("cke_copyformatting_active"), h.removeClass("cke_copyformatting_disabled"), h.removeClass("cke_copyformatting_tableresize_cursor"), e.setState(CKEDITOR.TRISTATE_OFF));
                            c._putScreenReaderMessage(a, d ? "applied" :
                                "canceled")
                        }
                    }
                }
            },
            _getCursorContainer: function(a) {
                return a.elementMode === CKEDITOR.ELEMENT_MODE_INLINE ? a.editable() : a.editable().getParent() },
            _convertElementToStyleDef: function(a) {
                var b = CKEDITOR.tools,
                    e = a.getAttributes(CKEDITOR.plugins.copyformatting.excludedAttributes),
                    b = b.parseCssText(a.getAttribute("style"), !0, !0);
                return { element: a.getName(), type: CKEDITOR.STYLE_INLINE, attributes: e, styles: b } },
            _extractStylesFromElement: function(a, b) {
                var e = {},
                    d = [];
                do
                    if (b.type === CKEDITOR.NODE_ELEMENT && !b.hasAttribute("data-cke-bookmark") &&
                        (e.element = b, a.copyFormatting.fire("extractFormatting", e, a) && e.styleDef && d.push(new CKEDITOR.style(e.styleDef)), b.getName && -1 !== l(CKEDITOR.plugins.copyformatting.breakOnElements, b.getName()))) break;
                while ((b = b.getParent()) && b.type === CKEDITOR.NODE_ELEMENT);
                return d
            },
            _extractStylesFromRange: function(a, b) {
                for (var e = [], d = new CKEDITOR.dom.walker(b), c; c = d.next();) e = e.concat(CKEDITOR.plugins.copyformatting._extractStylesFromElement(a, c));
                return e },
            _removeStylesFromElementInRange: function(a, b) {
                for (var e = -1 !==
                        l(["ol", "ul", "table"], b), d = new CKEDITOR.dom.walker(a), c; c = d.next();)
                    if (c = c.getAscendant(b, !0))
                        if (c.removeAttributes(c.getAttributes()), e) break
            },
            _getSelectedWordOffset: function(a) {
                function b(a, b) {
                    return a[b ? "getPrevious" : "getNext"](function(a) {
                        return a.type !== CKEDITOR.NODE_COMMENT }) }

                function e(a) {
                    return a.type == CKEDITOR.NODE_ELEMENT ? (a = a.getHtml().replace(/<span.*?>&nbsp;<\/span>/g, ""), a.replace(/<.*?>/g, "")) : a.getText() }

                function d(a, c) {
                    var f = a,
                        g = /\s/g,
                        h = "p br ol ul li td th div caption body".split(" "),
                        m = !1,
                        k = !1,
                        p, n;
                    do {
                        for (p = b(f, c); !p && f.getParent();) { f = f.getParent();
                            if (-1 !== l(h, f.getName())) { k = m = !0;
                                break }
                            p = b(f, c) }
                        if (p && p.getName && -1 !== l(h, p.getName())) { m = !0;
                            break }
                        f = p } while (f && f.getStyle && ("none" == f.getStyle("display") || !f.getText()));
                    for (f || (f = a); f.type !== CKEDITOR.NODE_TEXT;) f = !m || c || k ? f.getChild(0) : f.getChild(f.getChildCount() - 1);
                    for (h = e(f); null != (k = g.exec(h)) && (n = k.index, c););
                    if ("number" !== typeof n && !m) return d(f, c);
                    if (m) c ? n = 0 : (g = /([\.\b]*$)/, n = (k = g.exec(h)) ? k.index : h.length);
                    else if (c && (n +=
                            1, n > h.length)) return d(f);
                    return { node: f, offset: n }
                }
                var c = /\b\w+\b/ig,
                    f, g, h, m, k;
                h = m = k = a.startContainer;
                for (f = e(h); null != (g = c.exec(f));)
                    if (g.index + g[0].length >= a.startOffset) return a = g.index, c = g.index + g[0].length, 0 === g.index && (g = d(h, !0), m = g.node, a = g.offset), c >= f.length && (f = d(h), k = f.node, c = f.offset), { startNode: m, startOffset: a, endNode: k, endOffset: c };
                return null
            },
            _filterStyles: function(a) {
                var b = CKEDITOR.tools.isEmpty,
                    e = [],
                    d, c;
                for (c = 0; c < a.length; c++) d = a[c]._.definition, -1 !== CKEDITOR.tools.indexOf(CKEDITOR.plugins.copyformatting.inlineBoundary,
                    d.element) && (d.element = a[c].element = "span"), "span" === d.element && b(d.attributes) && b(d.styles) || e.push(a[c]);
                return e
            },
            _determineContext: function(a) {
                function b(b) {
                    var d = new CKEDITOR.dom.walker(a),
                        c;
                    if (a.startContainer.getAscendant(b, !0) || a.endContainer.getAscendant(b, !0)) return !0;
                    for (; c = d.next();)
                        if (c.getAscendant(b, !0)) return !0 }
                return b({ ul: 1, ol: 1 }) ? "list" : b("table") ? "table" : "text" },
            _applyStylesToTextContext: function(a, b, e) {
                var d = CKEDITOR.plugins.copyformatting,
                    c = d.excludedAttributesFromInlineTransform,
                    f, g;
                CKEDITOR.env.webkit && !CKEDITOR.env.chrome && a.getSelection().selectRanges([b]);
                for (f = 0; f < e.length; f++)
                    if (b = e[f], -1 === l(d.excludedElementsFromInlineTransform, b.element)) {
                        if (-1 !== l(d.elementsForInlineTransform, b.element))
                            for (b.element = b._.definition.element = "span", g = 0; g < c.length; g++) b._.definition.attributes[c[g]] && delete b._.definition.attributes[c[g]];
                        b.apply(a) }
            },
            _applyStylesToListContext: function(a, b, e) {
                var d, c, f;
                for (f = 0; f < e.length; f++) d = e[f], c = b.createBookmark(), "ol" === d.element || "ul" === d.element ?
                    k(b, { ul: 1, ol: 1 }, function(a) {
                        var b = d;
                        a.getName() !== b.element && a.renameNode(b.element);
                        b.applyToObject(a) }, !0) : "li" === d.element ? k(b, "li", function(a) { d.applyToObject(a) }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(a, b, [d]), b.moveToBookmark(c)
            },
            _applyStylesToTableContext: function(a, b, e) {
                function d(a, b) { a.getName() !== b.element && (b = b.getDefinition(), b.element = a.getName(), b = new CKEDITOR.style(b));
                    b.applyToObject(a) }
                var c, f, g;
                for (g = 0; g < e.length; g++) c = e[g], f = b.createBookmark(), -1 !== l(["table",
                    "tr"
                ], c.element) ? k(b, c.element, function(a) { c.applyToObject(a) }) : -1 !== l(["td", "th"], c.element) ? k(b, { td: 1, th: 1 }, function(a) { d(a, c) }) : -1 !== l(["thead", "tbody"], c.element) ? k(b, { thead: 1, tbody: 1 }, function(a) { d(a, c) }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(a, b, [c]), b.moveToBookmark(f)
            },
            _applyFormat: function(a, b) {
                var e = a.getSelection().getRanges()[0],
                    d = CKEDITOR.plugins.copyformatting,
                    c, f;
                if (!e) return !1;
                if (e.collapsed) {
                    f = a.getSelection().createBookmarks();
                    if (!(c = d._getSelectedWordOffset(e))) return;
                    e = a.createRange();
                    e.setStart(c.startNode, c.startOffset);
                    e.setEnd(c.endNode, c.endOffset);
                    e.select()
                }
                b = d._filterStyles(b);
                if (!a.copyFormatting.fire("applyFormatting", { styles: b, range: e, preventFormatStripping: !1 }, a)) return !1;
                f && a.getSelection().selectBookmarks(f);
                return !0
            },
            _putScreenReaderMessage: function(a, b) {
                var e = this._getScreenReaderContainer();
                e && e.setText(a.lang.copyformatting.notification[b]) },
            _addScreenReaderContainer: function() {
                if (this._getScreenReaderContainer()) return this._getScreenReaderContainer();
                if (!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_screen_reader_only cke_copyformatting_notification"\x3e\x3cdiv aria-live\x3d"polite"\x3e\x3c/div\x3e\x3c/div\x3e')).getChild(0)
            },
            _getScreenReaderContainer: function() {
                if (!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().findOne(".cke_copyformatting_notification div[aria-live]") }
        };
        CKEDITOR.config.copyFormatting_outerCursor = !0;
        CKEDITOR.config.copyFormatting_allowRules = "b s u i em strong span p div td th ol ul li(*)[*]{*}";
        CKEDITOR.config.copyFormatting_disallowRules = "*[data-cke-widget*,data-widget*,data-cke-realelement](cke_widget*)";
        CKEDITOR.config.copyFormatting_allowedContexts = !0;
        CKEDITOR.config.copyFormatting_keystrokeCopy = CKEDITOR.CTRL + CKEDITOR.SHIFT + 67;
        CKEDITOR.config.copyFormatting_keystrokePaste = CKEDITOR.CTRL + CKEDITOR.SHIFT + 86
    })();
    (function() {
        CKEDITOR.plugins.add("div", {
            requires: "dialog",
            init: function(a) {
                if (!a.blockless) {
                    var c = a.lang.div,
                        b = "div(*)";
                    CKEDITOR.dialog.isTabEnabled(a, "editdiv", "advanced") && (b += ";div[dir,id,lang,title]{*}");
                    a.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", {
                        allowedContent: b,
                        requiredContent: "div",
                        contextSensitive: !0,
                        contentTransformations: [
                            ["div: alignmentToStyle"]
                        ],
                        refresh: function(a, c) {
                            this.setState("div" in (a.config.div_wrapTable ? c.root : c.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF :
                                CKEDITOR.TRISTATE_DISABLED)
                        }
                    }));
                    a.addCommand("editdiv", new CKEDITOR.dialogCommand("editdiv", { requiredContent: "div" }));
                    a.addCommand("removediv", {
                        requiredContent: "div",
                        exec: function(a) {
                            function c(b) {
                                (b = CKEDITOR.plugins.div.getSurroundDiv(a, b)) && !b.data("cke-div-added") && (f.push(b), b.data("cke-div-added")) }
                            for (var b = a.getSelection(), g = b && b.getRanges(), e, h = b.createBookmarks(), f = [], d = 0; d < g.length; d++) e = g[d], e.collapsed ? c(b.getStartElement()) : (e = new CKEDITOR.dom.walker(e), e.evaluator = c, e.lastForward());
                            for (d = 0; d < f.length; d++) f[d].remove(!0);
                            b.selectBookmarks(h)
                        }
                    });
                    a.ui.addButton && a.ui.addButton("CreateDiv", { label: c.toolbar, command: "creatediv", toolbar: "blocks,50" });
                    a.addMenuItems && (a.addMenuItems({ editdiv: { label: c.edit, command: "editdiv", group: "div", order: 1 }, removediv: { label: c.remove, command: "removediv", group: "div", order: 5 } }), a.contextMenu && a.contextMenu.addListener(function(b) {
                        return !b || b.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(a) ? { editdiv: CKEDITOR.TRISTATE_OFF, removediv: CKEDITOR.TRISTATE_OFF } :
                            null
                    }));
                    CKEDITOR.dialog.add("creatediv", this.path + "dialogs/div.js");
                    CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js")
                }
            }
        });
        CKEDITOR.plugins.div = { getSurroundDiv: function(a, c) {
                var b = a.elementPath(c);
                return a.elementPath(b.blockLimit).contains(function(a) {
                    return a.is("div") && !a.isReadOnly() }, 1) } }
    })();
    CKEDITOR.plugins.add("resize", {
        init: function(b) {
            function f(d) {
                var e = c.width,
                    m = c.height,
                    f = e + (d.data.$.screenX - n.x) * ("rtl" == g ? -1 : 1);
                d = m + (d.data.$.screenY - n.y);
                h && (e = Math.max(a.resize_minWidth, Math.min(f, a.resize_maxWidth)));
                p && (m = Math.max(a.resize_minHeight, Math.min(d, a.resize_maxHeight)));
                b.resize(h ? e : null, m) }

            function k() {
                CKEDITOR.document.removeListener("mousemove", f);
                CKEDITOR.document.removeListener("mouseup", k);
                b.document && (b.document.removeListener("mousemove", f), b.document.removeListener("mouseup",
                    k))
            }
            var a = b.config,
                r = b.ui.spaceId("resizer"),
                g = b.element ? b.element.getDirection(1) : "ltr";
            !a.resize_dir && (a.resize_dir = "vertical");
            void 0 === a.resize_maxWidth && (a.resize_maxWidth = 3E3);
            void 0 === a.resize_maxHeight && (a.resize_maxHeight = 3E3);
            void 0 === a.resize_minWidth && (a.resize_minWidth = 750);
            void 0 === a.resize_minHeight && (a.resize_minHeight = 250);
            if (!1 !== a.resize_enabled) {
                var l = null,
                    n, c, h = ("both" == a.resize_dir || "horizontal" == a.resize_dir) && a.resize_minWidth != a.resize_maxWidth,
                    p = ("both" == a.resize_dir || "vertical" ==
                        a.resize_dir) && a.resize_minHeight != a.resize_maxHeight,
                    q = CKEDITOR.tools.addFunction(function(d) { l || (l = b.getResizable());
                        c = { width: l.$.offsetWidth || 0, height: l.$.offsetHeight || 0 };
                        n = { x: d.screenX, y: d.screenY };
                        a.resize_minWidth > c.width && (a.resize_minWidth = c.width);
                        a.resize_minHeight > c.height && (a.resize_minHeight = c.height);
                        CKEDITOR.document.on("mousemove", f);
                        CKEDITOR.document.on("mouseup", k);
                        b.document && (b.document.on("mousemove", f), b.document.on("mouseup", k));
                        d.preventDefault && d.preventDefault() });
                b.on("destroy",
                    function() { CKEDITOR.tools.removeFunction(q) });
                b.on("uiSpace", function(a) {
                    if ("bottom" == a.data.space) {
                        var e = "";
                        h && !p && (e = " cke_resizer_horizontal");!h && p && (e = " cke_resizer_vertical");
                        var c = '\x3cspan id\x3d"' + r + '" class\x3d"cke_resizer' + e + " cke_resizer_" + g + '" title\x3d"' + CKEDITOR.tools.htmlEncode(b.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + q + ', event)"\x3e' + ("ltr" == g ? "◢" : "◣") + "\x3c/span\x3e"; "ltr" == g && "ltr" == e ? a.data.html += c : a.data.html = c + a.data.html } }, b, null, 100);
                b.on("maximize",
                    function(a) { b.ui.space("resizer")[a.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]() })
            }
        }
    });
    (function() {
        function D(a) {
            function d() {
                for (var b = g(), e = CKEDITOR.tools.clone(a.config.toolbarGroups) || v(a), f = 0; f < e.length; f++) {
                    var m = e[f];
                    if ("/" != m) { "string" == typeof m && (m = e[f] = { name: m });
                        var l, d = m.groups;
                        if (d)
                            for (var h = 0; h < d.length; h++) l = d[h], (l = b[l]) && c(m, l);
                        (l = b[m.name]) && c(m, l) } }
                return e }

            function g() {
                var b = {},
                    c, f, e;
                for (c in a.ui.items) f = a.ui.items[c], e = f.toolbar || "others", e = e.split(","), f = e[0], e = parseInt(e[1] || -1, 10), b[f] || (b[f] = []), b[f].push({ name: c, order: e });
                for (f in b) b[f] = b[f].sort(function(b,
                    a) {
                    return b.order == a.order ? 0 : 0 > a.order ? -1 : 0 > b.order ? 1 : b.order < a.order ? -1 : 1 });
                return b
            }

            function c(c, e) {
                if (e.length) { c.items ? c.items.push(a.ui.create("-")) : c.items = [];
                    for (var f; f = e.shift();) f = "string" == typeof f ? f : f.name, b && -1 != CKEDITOR.tools.indexOf(b, f) || (f = a.ui.create(f)) && a.addFeature(f) && c.items.push(f) } }

            function h(b) {
                var a = [],
                    e, d, h;
                for (e = 0; e < b.length; ++e) d = b[e], h = {}, "/" == d ? a.push(d) : CKEDITOR.tools.isArray(d) ? (c(h, CKEDITOR.tools.clone(d)), a.push(h)) : d.items && (c(h, CKEDITOR.tools.clone(d.items)),
                    h.name = d.name, a.push(h));
                return a
            }
            var b = a.config.removeButtons,
                b = b && b.split(","),
                e = a.config.toolbar;
            "string" == typeof e && (e = a.config["toolbar_" + e]);
            return a.toolbar = e ? h(e) : d()
        }

        function v(a) {
            return a._.toolbarGroups || (a._.toolbarGroups = [{ name: "document", groups: ["mode", "document", "doctools"] }, { name: "clipboard", groups: ["clipboard", "undo"] }, { name: "editing", groups: ["find", "selection", "spellchecker"] }, { name: "forms" }, "/", { name: "basicstyles", groups: ["basicstyles", "cleanup"] }, {
                name: "paragraph",
                groups: ["list",
                    "indent", "blocks", "align", "bidi"
                ]
            }, { name: "links" }, { name: "insert" }, "/", { name: "styles" }, { name: "colors" }, { name: "tools" }, { name: "others" }, { name: "about" }])
        }
        var z = function() { this.toolbars = [];
            this.focusCommandExecuted = !1 };
        z.prototype.focus = function() {
            for (var a = 0, d; d = this.toolbars[a++];)
                for (var g = 0, c; c = d.items[g++];)
                    if (c.focus) { c.focus();
                        return } };
        var E = {
            modes: { wysiwyg: 1, source: 1 },
            readOnly: 1,
            exec: function(a) {
                a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function() { a.toolbox.focus() },
                    100) : a.toolbox.focus())
            }
        };
        CKEDITOR.plugins.add("toolbar", {
            requires: "button",
            init: function(a) {
                var d, g = function(c, h) {
                    var b, e = "rtl" == a.lang.dir,
                        k = a.config.toolbarGroupCycling,
                        q = e ? 37 : 39,
                        e = e ? 39 : 37,
                        k = void 0 === k || k;
                    switch (h) {
                        case 9:
                        case CKEDITOR.SHIFT + 9:
                            for (; !b || !b.items.length;)
                                if (b = 9 == h ? (b ? b.next : c.toolbar.next) || a.toolbox.toolbars[0] : (b ? b.previous : c.toolbar.previous) || a.toolbox.toolbars[a.toolbox.toolbars.length - 1], b.items.length)
                                    for (c = b.items[d ? b.items.length - 1 : 0]; c && !c.focus;)(c = d ? c.previous : c.next) ||
                                        (b = 0);
                            c && c.focus();
                            return !1;
                        case q:
                            b = c;
                            do b = b.next, !b && k && (b = c.toolbar.items[0]); while (b && !b.focus);
                            b ? b.focus() : g(c, 9);
                            return !1;
                        case 40:
                            return c.button && c.button.hasArrow ? (a.once("panelShow", function(b) { b.data._.panel._.currentBlock.onKeyDown(40) }), c.execute()) : g(c, 40 == h ? q : e), !1;
                        case e:
                        case 38:
                            b = c;
                            do b = b.previous, !b && k && (b = c.toolbar.items[c.toolbar.items.length - 1]); while (b && !b.focus);
                            b ? b.focus() : (d = 1, g(c, CKEDITOR.SHIFT + 9), d = 0);
                            return !1;
                        case 27:
                            return a.focus(), !1;
                        case 13:
                        case 32:
                            return c.execute(), !1
                    }
                    return !0
                };
                a.on("uiSpace", function(c) {
                    if (c.data.space == a.config.toolbarLocation) {
                        c.removeListener();
                        a.toolbox = new z;
                        var d = CKEDITOR.tools.getNextId(),
                            b = ['\x3cspan id\x3d"', d, '" class\x3d"cke_voice_label"\x3e', a.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + a.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', d, '" onmousedown\x3d"return false;"\x3e'],
                            d = !1 !== a.config.toolbarStartupExpanded,
                            e, k;
                        a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE &&
                            b.push('\x3cspan class\x3d"cke_toolbox_main"' + (d ? "\x3e" : ' style\x3d"display:none"\x3e'));
                        for (var q = a.toolbox.toolbars, f = D(a), m = f.length, l = 0; l < m; l++) {
                            var r, n = 0,
                                w, p = f[l],
                                v = "/" !== p && ("/" === f[l + 1] || l == m - 1),
                                x;
                            if (p)
                                if (e && (b.push("\x3c/span\x3e"), k = e = 0), "/" === p) b.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e');
                                else {
                                    x = p.items || p;
                                    for (var y = 0; y < x.length; y++) {
                                        var t = x[y],
                                            A;
                                        if (t) {
                                            var B = function(c) {
                                                c = c.render(a, b);
                                                u = n.items.push(c) - 1;
                                                0 < u && (c.previous = n.items[u - 1], c.previous.next = c);
                                                c.toolbar = n;
                                                c.onkey =
                                                    g;
                                                c.onfocus = function() { a.toolbox.focusCommandExecuted || a.focus() }
                                            };
                                            if (t.type == CKEDITOR.UI_SEPARATOR) k = e && t;
                                            else {
                                                A = !1 !== t.canGroup;
                                                if (!n) {
                                                    r = CKEDITOR.tools.getNextId();
                                                    n = { id: r, items: [] };
                                                    w = p.name && (a.lang.toolbar.toolbarGroups[p.name] || p.name);
                                                    b.push('\x3cspan id\x3d"', r, '" class\x3d"cke_toolbar' + (v ? ' cke_toolbar_last"' : '"'), w ? ' aria-labelledby\x3d"' + r + '_label"' : "", ' role\x3d"toolbar"\x3e');
                                                    w && b.push('\x3cspan id\x3d"', r, '_label" class\x3d"cke_voice_label"\x3e', w, "\x3c/span\x3e");
                                                    b.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e');
                                                    var u = q.push(n) - 1;
                                                    0 < u && (n.previous = q[u - 1], n.previous.next = n)
                                                }
                                                A ? e || (b.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), e = 1) : e && (b.push("\x3c/span\x3e"), e = 0);
                                                k && (B(k), k = 0);
                                                B(t)
                                            }
                                        }
                                    }
                                    e && (b.push("\x3c/span\x3e"), k = e = 0);
                                    n && b.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
                                }
                        }
                        a.config.toolbarCanCollapse && b.push("\x3c/span\x3e");
                        if (a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var C = CKEDITOR.tools.addFunction(function() { a.execCommand("toolbarCollapse") });
                            a.on("destroy", function() { CKEDITOR.tools.removeFunction(C) });
                            a.addCommand("toolbarCollapse", {
                                readOnly: 1,
                                exec: function(b) {
                                    var a = b.ui.space("toolbar_collapser"),
                                        c = a.getPrevious(),
                                        e = b.ui.space("contents"),
                                        d = c.getParent(),
                                        f = parseInt(e.$.style.height, 10),
                                        h = d.$.offsetHeight,
                                        g = a.hasClass("cke_toolbox_collapser_min");
                                    g ? (c.show(), a.removeClass("cke_toolbox_collapser_min"), a.setAttribute("title", b.lang.toolbar.toolbarCollapse)) : (c.hide(), a.addClass("cke_toolbox_collapser_min"), a.setAttribute("title", b.lang.toolbar.toolbarExpand));
                                    a.getFirst().setText(g ? "▲" : "◀");
                                    e.setStyle("height", f - (d.$.offsetHeight - h) + "px");
                                    b.fire("resize", { outerHeight: b.container.$.offsetHeight, contentsHeight: e.$.offsetHeight, outerWidth: b.container.$.offsetWidth })
                                },
                                modes: { wysiwyg: 1, source: 1 }
                            });
                            a.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
                            b.push('\x3ca title\x3d"' + (d ? a.lang.toolbar.toolbarCollapse : a.lang.toolbar.toolbarExpand) + '" id\x3d"' + a.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');
                            d || b.push(" cke_toolbox_collapser_min");
                            b.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + C + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', "\x3c/a\x3e")
                        }
                        b.push("\x3c/span\x3e");
                        c.data.html += b.join("")
                    }
                });
                a.on("destroy", function() {
                    if (this.toolbox) {
                        var a, d = 0,
                            b, e, g;
                        for (a = this.toolbox.toolbars; d < a.length; d++)
                            for (e = a[d].items, b = 0; b < e.length; b++) g = e[b], g.clickFn && CKEDITOR.tools.removeFunction(g.clickFn), g.keyDownFn && CKEDITOR.tools.removeFunction(g.keyDownFn) } });
                a.on("uiReady", function() {
                    var c =
                        a.ui.space("toolbox");
                    c && a.focusManager.add(c, 1)
                });
                a.addCommand("toolbarFocus", E);
                a.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus");
                a.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
                a.ui.addHandler(CKEDITOR.UI_SEPARATOR, { create: function() {
                        return { render: function(a, d) { d.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e');
                                return {} } } } })
            }
        });
        CKEDITOR.ui.prototype.addToolbarGroup = function(a, d, g) {
            var c = v(this.editor),
                h = 0 === d,
                b = { name: a };
            if (g) {
                if (g = CKEDITOR.tools.search(c, function(a) {
                        return a.name ==
                            g
                    })) {!g.groups && (g.groups = []);
                    if (d && (d = CKEDITOR.tools.indexOf(g.groups, d), 0 <= d)) { g.groups.splice(d + 1, 0, a);
                        return }
                    h ? g.groups.splice(0, 0, a) : g.groups.push(a);
                    return }
                d = null
            }
            d && (d = CKEDITOR.tools.indexOf(c, function(a) {
                return a.name == d }));
            h ? c.splice(0, 0, a) : "number" == typeof d ? c.splice(d + 1, 0, b) : c.push(a)
        }
    })();
    CKEDITOR.UI_SEPARATOR = "separator";
    CKEDITOR.config.toolbarLocation = "top";
    (function() {
        function q(a, e) {
            function l(c) { c = k.list[c];
                var d;
                c.equals(a.editable()) || "true" == c.getAttribute("contenteditable") ? (d = a.createRange(), d.selectNodeContents(c), d = d.select()) : (d = a.getSelection(), d.selectElement(c));
                CKEDITOR.env.ie && a.fire("selectionChange", { selection: d, path: new CKEDITOR.dom.elementPath(c) });
                a.focus() }

            function m() { n && n.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
                delete k.list }
            var p = a.ui.spaceId("path"),
                n, k = a._.elementsPath,
                q = k.idBase;
            e.html += '\x3cspan id\x3d"' +
                p + '_label" class\x3d"cke_voice_label"\x3e' + a.lang.elementspath.eleLabel + '\x3c/span\x3e\x3cspan id\x3d"' + p + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' + p + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e';
            a.on("uiReady", function() {
                var c = a.ui.space("path");
                c && a.focusManager.add(c, 1) });
            k.onClick = l;
            var v = CKEDITOR.tools.addFunction(l),
                w = CKEDITOR.tools.addFunction(function(c, d) {
                    var g = k.idBase,
                        b;
                    d = new CKEDITOR.dom.event(d);
                    b = "rtl" == a.lang.dir;
                    switch (d.getKeystroke()) {
                        case b ?
                        39:
                            37:
                                case 9:
                            return (b = CKEDITOR.document.getById(g + (c + 1))) || (b = CKEDITOR.document.getById(g + "0")), b.focus(), !1;
                        case b ? 37:
                            39:
                                case CKEDITOR.SHIFT + 9:
                            return (b = CKEDITOR.document.getById(g + (c - 1))) || (b = CKEDITOR.document.getById(g + (k.list.length - 1))), b.focus(), !1;
                        case 27:
                            return a.focus(), !1;
                        case 13:
                        case 32:
                            return l(c), !1
                    }
                    return !0
                });
            a.on("selectionChange", function() {
                for (var c = [], d = k.list = [], g = [], b = k.filters, e = !0, l = a.elementPath().elements, f, u = l.length; u--;) {
                    var h = l[u],
                        r = 0;
                    f = h.data("cke-display-name") ? h.data("cke-display-name") :
                        h.data("cke-real-element-type") ? h.data("cke-real-element-type") : h.getName();
                    (e = h.hasAttribute("contenteditable") ? "true" == h.getAttribute("contenteditable") : e) || h.hasAttribute("contenteditable") || (r = 1);
                    for (var t = 0; t < b.length; t++) {
                        var m = b[t](h, f);
                        if (!1 === m) { r = 1;
                            break }
                        f = m || f }
                    r || (d.unshift(h), g.unshift(f))
                }
                d = d.length;
                for (b = 0; b < d; b++) f = g[b], e = a.lang.elementspath.eleTitle.replace(/%1/, f), f = x.output({ id: q + b, label: e, text: f, jsTitle: "javascript:void('" + f + "')", index: b, keyDownFn: w, clickFn: v }), c.unshift(f);
                n ||
                    (n = CKEDITOR.document.getById(p));
                g = n;
                g.setHtml(c.join("") + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
                a.fire("elementsPathUpdate", { space: g })
            });
            a.on("readOnly", m);
            a.on("contentDomUnload", m);
            a.addCommand("elementsPathFocus", y.toolbarFocus);
            a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
        }
        var y = { toolbarFocus: { editorFocus: !1, readOnly: 1, exec: function(a) {
                        (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air) } } },
            e = "";
        CKEDITOR.env.gecko &&
            CKEDITOR.env.mac && (e += ' onkeypress\x3d"return false;"');
        CKEDITOR.env.gecko && (e += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
        var x = CKEDITOR.addTemplate("pathItem", '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' + e + ' hidefocus\x3d"true"  onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e');
        CKEDITOR.plugins.add("elementspath", { init: function(a) { a._.elementsPath = { idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_", filters: [] };
                a.on("uiSpace", function(e) { "bottom" == e.data.space && q(a, e.data) }) } })
    })();
    (function() {
        function q(b, d, a) { a = b.config.forceEnterMode || a; "wysiwyg" == b.mode && (d || (d = b.activeEnterMode), b.elementPath().isContextFor("p") || (d = CKEDITOR.ENTER_BR, a = 1), b.fire("saveSnapshot"), d == CKEDITOR.ENTER_BR ? t(b, d, null, a) : u(b, d, null, a), b.fire("saveSnapshot")) }

        function v(b) { b = b.getSelection().getRanges(!0);
            for (var d = b.length - 1; 0 < d; d--) b[d].deleteContents();
            return b[0] }

        function y(b) {
            var d = b.startContainer.getAscendant(function(a) {
                return a.type == CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable") }, !0);
            if (b.root.equals(d)) return b;
            d = new CKEDITOR.dom.range(d);
            d.moveToRange(b);
            return d
        }
        CKEDITOR.plugins.add("enterkey", { init: function(b) { b.addCommand("enter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function(b) { q(b) } });
                b.addCommand("shiftEnter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function(b) { q(b, b.activeShiftEnterMode, 1) } });
                b.setKeystroke([
                    [13, "enter"],
                    [CKEDITOR.SHIFT + 13, "shiftEnter"]
                ]) } });
        var z = CKEDITOR.dom.walker.whitespaces(),
            A = CKEDITOR.dom.walker.bookmark();
        CKEDITOR.plugins.enterkey = {
            enterBlock: function(b,
                d, a, h) {
                if (a = a || v(b)) {
                    a = y(a);
                    var f = a.document,
                        k = a.checkStartOfBlock(),
                        m = a.checkEndOfBlock(),
                        l = b.elementPath(a.startContainer),
                        c = l.block,
                        n = d == CKEDITOR.ENTER_DIV ? "div" : "p",
                        e;
                    if (k && m) {
                        if (c && (c.is("li") || c.getParent().is("li"))) {
                            c.is("li") || (c = c.getParent());
                            a = c.getParent();
                            e = a.getParent();
                            h = !c.hasPrevious();
                            var p = !c.hasNext(),
                                n = b.getSelection(),
                                g = n.createBookmarks(),
                                k = c.getDirection(1),
                                m = c.getAttribute("class"),
                                r = c.getAttribute("style"),
                                q = e.getDirection(1) != k;
                            b = b.enterMode != CKEDITOR.ENTER_BR || q || r || m;
                            if (e.is("li")) h || p ? (h && p && a.remove(), c[p ? "insertAfter" : "insertBefore"](e)) : c.breakParent(e);
                            else {
                                if (b)
                                    if (l.block.is("li") ? (e = f.createElement(d == CKEDITOR.ENTER_P ? "p" : "div"), q && e.setAttribute("dir", k), r && e.setAttribute("style", r), m && e.setAttribute("class", m), c.moveChildren(e)) : e = l.block, h || p) e[h ? "insertBefore" : "insertAfter"](a);
                                    else c.breakParent(a), e.insertAfter(a);
                                else if (c.appendBogus(!0), h || p)
                                    for (; f = c[h ? "getFirst" : "getLast"]();) f[h ? "insertBefore" : "insertAfter"](a);
                                else
                                    for (c.breakParent(a); f = c.getLast();) f.insertAfter(a);
                                c.remove()
                            }
                            n.selectBookmarks(g);
                            return
                        }
                        if (c && c.getParent().is("blockquote")) { c.breakParent(c.getParent());
                            c.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getPrevious().remove();
                            c.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getNext().remove();
                            a.moveToElementEditStart(c);
                            a.select();
                            return }
                    } else if (c && c.is("pre") && !m) { t(b, d, a, h);
                        return }
                    if (k = a.splitBlock(n)) {
                        d = k.previousBlock;
                        c = k.nextBlock;
                        l = k.wasStartOfBlock;
                        b = k.wasEndOfBlock;
                        c ? (g = c.getParent(), g.is("li") && (c.breakParent(g),
                            c.move(c.getNext(), 1))) : d && (g = d.getParent()) && g.is("li") && (d.breakParent(g), g = d.getNext(), a.moveToElementEditStart(g), d.move(d.getPrevious()));
                        if (l || b) {
                            if (d) {
                                if (d.is("li") || !w.test(d.getName()) && !d.is("pre")) e = d.clone() } else c && (e = c.clone());
                            e ? h && !e.is("li") && e.renameNode(n) : g && g.is("li") ? e = g : (e = f.createElement(n), d && (p = d.getDirection()) && e.setAttribute("dir", p));
                            if (f = k.elementPath)
                                for (h = 0, n = f.elements.length; h < n; h++) {
                                    g = f.elements[h];
                                    if (g.equals(f.block) || g.equals(f.blockLimit)) break;
                                    CKEDITOR.dtd.$removeEmpty[g.getName()] &&
                                        (g = g.clone(), e.moveChildren(g), e.append(g))
                                }
                            e.appendBogus();
                            e.getParent() || a.insertNode(e);
                            e.is("li") && e.removeAttribute("value");
                            !CKEDITOR.env.ie || !l || b && d.getChildCount() || (a.moveToElementEditStart(b ? d : e), a.select());
                            a.moveToElementEditStart(l && !b ? c : e)
                        } else c.is("li") && (e = a.clone(), e.selectNodeContents(c), e = new CKEDITOR.dom.walker(e), e.evaluator = function(a) {
                                return !(A(a) || z(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty)) }, (g = e.next()) &&
                            g.type == CKEDITOR.NODE_ELEMENT && g.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? f.createElement("br") : f.createText(" ")).insertBefore(g)), c && a.moveToElementEditStart(c);
                        a.select();
                        a.scrollIntoView()
                    }
                }
            },
            enterBr: function(b, d, a, h) {
                if (a = a || v(b)) {
                    var f = a.document,
                        k = a.checkEndOfBlock(),
                        m = new CKEDITOR.dom.elementPath(b.getSelection().getStartElement()),
                        l = m.block,
                        c = l && m.block.getName();
                    h || "li" != c ? (!h && k && w.test(c) ? (k = l.getDirection()) ? (f = f.createElement("div"), f.setAttribute("dir", k), f.insertAfter(l), a.setStart(f,
                        0)) : (f.createElement("br").insertAfter(l), CKEDITOR.env.gecko && f.createText("").insertAfter(l), a.setStartAt(l.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (b = "pre" == c && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? f.createText("\r") : f.createElement("br"), a.deleteContents(), a.insertNode(b), CKEDITOR.env.needsBrFiller ? (f.createText("﻿").insertAfter(b), k && (l || m.blockLimit).appendBogus(), b.getNext().$.nodeValue = "", a.setStartAt(b.getNext(), CKEDITOR.POSITION_AFTER_START)) :
                        a.setStartAt(b, CKEDITOR.POSITION_AFTER_END)), a.collapse(!0), a.select(), a.scrollIntoView()) : u(b, d, a, h)
                }
            }
        };
        var x = CKEDITOR.plugins.enterkey,
            t = x.enterBr,
            u = x.enterBlock,
            w = /^h[1-6]$/
    })();
    (function() {
        function k(b, f) {
            var g = {},
                c = [],
                e = { nbsp: " ", shy: "­", gt: "\x3e", lt: "\x3c", amp: "\x26", apos: "'", quot: '"' };
            b = b.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(b, a) {
                var d = f ? "\x26" + a + ";" : e[a];
                g[d] = f ? e[a] : "\x26" + a + ";";
                c.push(d);
                return "" });
            if (!f && b) { b = b.split(",");
                var a = document.createElement("div"),
                    d;
                a.innerHTML = "\x26" + b.join(";\x26") + ";";
                d = a.innerHTML;
                a = null;
                for (a = 0; a < d.length; a++) {
                    var h = d.charAt(a);
                    g[h] = "\x26" + b[a] + ";";
                    c.push(h) } }
            g.regex = c.join(f ? "|" : "");
            return g }
        CKEDITOR.plugins.add("entities", {
            afterInit: function(b) {
                function f(a) {
                    return h[a] }

                function g(b) {
                    return "force" != c.entities_processNumerical && a[b] ? a[b] : "\x26#" + b.charCodeAt(0) + ";" }
                var c = b.config;
                if (b = (b = b.dataProcessor) && b.htmlFilter) {
                    var e = [];
                    !1 !== c.basicEntities && e.push("nbsp,gt,lt,amp");
                    c.entities && (e.length && e.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
                        c.entities_latin && e.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), c.entities_greek && e.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
                        c.entities_additional && e.push(c.entities_additional));
                    var a = k(e.join(",")),
                        d = a.regex ? "[" + a.regex + "]" : "a^";
                    delete a.regex;
                    c.entities && c.entities_processNumerical && (d = "[^ -~]|" + d);
                    var d = new RegExp(d, "g"),
                        h = k("nbsp,gt,lt,amp,shy", !0),
                        l = new RegExp(h.regex, "g");
                    b.addRules({ text: function(a) {
                            return a.replace(l, f).replace(d, g) } }, { applyToAll: !0, excludeNestedEditable: !0 })
                }
            }
        })
    })();
    CKEDITOR.config.basicEntities = !0;
    CKEDITOR.config.entities = !0;
    CKEDITOR.config.entities_latin = !0;
    CKEDITOR.config.entities_greek = !0;
    CKEDITOR.config.entities_additional = "#39";
    CKEDITOR.plugins.add("popup");
    CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        popup: function(e, a, b, d) {
            a = a || "80%";
            b = b || "70%";
            "string" == typeof a && 1 < a.length && "%" == a.substr(a.length - 1, 1) && (a = parseInt(window.screen.width * parseInt(a, 10) / 100, 10));
            "string" == typeof b && 1 < b.length && "%" == b.substr(b.length - 1, 1) && (b = parseInt(window.screen.height * parseInt(b, 10) / 100, 10));
            640 > a && (a = 640);
            420 > b && (b = 420);
            var f = parseInt((window.screen.height - b) / 2, 10),
                g = parseInt((window.screen.width - a) / 2, 10);
            d = (d || "location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes") + ",width\x3d" +
                a + ",height\x3d" + b + ",top\x3d" + f + ",left\x3d" + g;
            var c = window.open("", null, d, !0);
            if (!c) return !1;
            try {-1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (c.moveTo(g, f), c.resizeTo(a, b)), c.focus(), c.location.href = e } catch (h) { window.open(e, null, d, !0) }
            return !0
        }
    });
    (function() {
        function g(a, c) {
            var d = [];
            if (c)
                for (var b in c) d.push(b + "\x3d" + encodeURIComponent(c[b]));
            else return a;
            return a + (-1 != a.indexOf("?") ? "\x26" : "?") + d.join("\x26") }

        function k(a) { a += "";
            return a.charAt(0).toUpperCase() + a.substr(1) }

        function m() {
            var a = this.getDialog(),
                c = a.getParentEditor();
            c._.filebrowserSe = this;
            var d = c.config["filebrowser" + k(a.getName()) + "WindowWidth"] || c.config.filebrowserWindowWidth || "80%",
                a = c.config["filebrowser" + k(a.getName()) + "WindowHeight"] || c.config.filebrowserWindowHeight ||
                "70%",
                b = this.filebrowser.params || {};
            b.CKEditor = c.name;
            b.CKEditorFuncNum = c._.filebrowserFn;
            b.langCode || (b.langCode = c.langCode);
            b = g(this.filebrowser.url, b);
            c.popup(b, d, a, c.config.filebrowserWindowFeatures || c.config.fileBrowserWindowFeatures)
        }

        function n() {
            var a = this.getDialog();
            a.getParentEditor()._.filebrowserSe = this;
            return a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value && a.getContentElement(this["for"][0], this["for"][1]).getAction() ? !0 : !1 }

        function p(a, c, d) {
            var b = d.params || {};
            b.CKEditor = a.name;
            b.CKEditorFuncNum = a._.filebrowserFn;
            b.langCode || (b.langCode = a.langCode);
            c.action = g(d.url, b);
            c.filebrowser = d
        }

        function l(a, c, d, b) {
            if (b && b.length)
                for (var e, g = b.length; g--;)
                    if (e = b[g], "hbox" != e.type && "vbox" != e.type && "fieldset" != e.type || l(a, c, d, e.children), e.filebrowser)
                        if ("string" == typeof e.filebrowser && (e.filebrowser = { action: "fileButton" == e.type ? "QuickUpload" : "Browse", target: e.filebrowser }), "Browse" == e.filebrowser.action) {
                            var f = e.filebrowser.url;
                            void 0 === f && (f = a.config["filebrowser" +
                                k(c) + "BrowseUrl"], void 0 === f && (f = a.config.filebrowserBrowseUrl));
                            f && (e.onClick = m, e.filebrowser.url = f, e.hidden = !1)
                        } else if ("QuickUpload" == e.filebrowser.action && e["for"] && (f = e.filebrowser.url, void 0 === f && (f = a.config["filebrowser" + k(c) + "UploadUrl"], void 0 === f && (f = a.config.filebrowserUploadUrl)), f)) {
                var h = e.onClick;
                e.onClick = function(a) {
                    var b = a.sender;
                    if (h && !1 === h.call(b, a)) return !1;
                    if (n.call(b, a)) {
                        a = b.getDialog().getContentElement(this["for"][0], this["for"][1]).getInputElement();
                        if (b = new CKEDITOR.dom.element(a.$.form))(a =
                            b.$.elements.ckCsrfToken) ? a = new CKEDITOR.dom.element(a) : (a = new CKEDITOR.dom.element("input"), a.setAttributes({ name: "ckCsrfToken", type: "hidden" }), b.append(a)), a.setAttribute("value", CKEDITOR.tools.getCsrfToken());
                        return !0
                    }
                    return !1
                };
                e.filebrowser.url = f;
                e.hidden = !1;
                p(a, d.getContents(e["for"][0]).get(e["for"][1]), e.filebrowser)
            }
        }

        function h(a, c, d) {
            if (-1 !== d.indexOf(";")) { d = d.split(";");
                for (var b = 0; b < d.length; b++)
                    if (h(a, c, d[b])) return !0;
                return !1 }
            return (a = a.getContents(c).get(d).filebrowser) && a.url }

        function q(a,
            c) {
            var d = this._.filebrowserSe.getDialog(),
                b = this._.filebrowserSe["for"],
                e = this._.filebrowserSe.filebrowser.onSelect;
            b && d.getContentElement(b[0], b[1]).reset();
            if ("function" != typeof c || !1 !== c.call(this._.filebrowserSe))
                if (!e || !1 !== e.call(this._.filebrowserSe, a, c))
                    if ("string" == typeof c && c && alert(c), a && (b = this._.filebrowserSe, d = b.getDialog(), b = b.filebrowser.target || null))
                        if (b = b.split(":"), e = d.getContentElement(b[0], b[1])) e.setValue(a), d.selectPage(b[0]) }
        CKEDITOR.plugins.add("filebrowser", {
            requires: "popup",
            init: function(a) { a._.filebrowserFn = CKEDITOR.tools.addFunction(q, a);
                a.on("destroy", function() { CKEDITOR.tools.removeFunction(this._.filebrowserFn) }) }
        });
        CKEDITOR.on("dialogDefinition", function(a) {
            if (a.editor.plugins.filebrowser)
                for (var c = a.data.definition, d, b = 0; b < c.contents.length; ++b)
                    if (d = c.contents[b]) l(a.editor, a.data.name, c, d.elements), d.hidden && d.filebrowser && (d.hidden = !h(c, d.id, d.filebrowser)) })
    })();
    CKEDITOR.plugins.add("find", {
        requires: "dialog",
        init: function(a) {
            var b = a.addCommand("find", new CKEDITOR.dialogCommand("find"));
            b.canUndo = !1;
            b.readOnly = 1;
            a.addCommand("replace", new CKEDITOR.dialogCommand("replace")).canUndo = !1;
            a.ui.addButton && (a.ui.addButton("Find", { label: a.lang.find.find, command: "find", toolbar: "find,10" }), a.ui.addButton("Replace", { label: a.lang.find.replace, command: "replace", toolbar: "find,20" }));
            CKEDITOR.dialog.add("find", this.path + "dialogs/find.js");
            CKEDITOR.dialog.add("replace", this.path +
                "dialogs/find.js")
        }
    });
    CKEDITOR.config.find_highlight = { element: "span", styles: { "background-color": "#004", color: "#fff" } };
    (function() {
        function g(a, b) {
            var c = l.exec(a),
                d = l.exec(b);
            if (c) {
                if (!c[2] && "px" == d[2]) return d[1];
                if ("px" == c[2] && !d[2]) return d[1] + "px" }
            return b }
        var k = CKEDITOR.htmlParser.cssStyle,
            h = CKEDITOR.tools.cssLength,
            l = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,
            m = {
                elements: {
                    $: function(a) {
                        var b = a.attributes;
                        if ((b = (b = (b = b && b["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(b))) && b.children[0]) && a.attributes["data-cke-resizable"]) {
                            var c = (new k(a)).rules;
                            a = b.attributes;
                            var d = c.width,
                                c = c.height;
                            d && (a.width = g(a.width, d));
                            c && (a.height = g(a.height, c))
                        }
                        return b
                    }
                }
            };
        CKEDITOR.plugins.add("fakeobjects", { init: function(a) { a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects") }, afterInit: function(a) {
                (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(m, { applyToAll: !0 }) } });
        CKEDITOR.editor.prototype.createFakeElement = function(a, b, c, d) {
            var e = this.lang.fakeobjects,
                e = e[c] || e.unknown;
            b = {
                "class": b,
                "data-cke-realelement": encodeURIComponent(a.getOuterHtml()),
                "data-cke-real-node-type": a.type,
                alt: e,
                title: e,
                align: a.getAttribute("align") || ""
            };
            CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData);
            c && (b["data-cke-real-element-type"] = c);
            d && (b["data-cke-resizable"] = d, c = new k, d = a.getAttribute("width"), a = a.getAttribute("height"), d && (c.rules.width = h(d)), a && (c.rules.height = h(a)), c.populate(b));
            return this.document.createElement("img", { attributes: b })
        };
        CKEDITOR.editor.prototype.createFakeParserElement = function(a, b, c, d) {
            var e = this.lang.fakeobjects,
                e = e[c] || e.unknown,
                f;
            f = new CKEDITOR.htmlParser.basicWriter;
            a.writeHtml(f);
            f = f.getHtml();
            b = { "class": b, "data-cke-realelement": encodeURIComponent(f), "data-cke-real-node-type": a.type, alt: e, title: e, align: a.attributes.align || "" };
            CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData);
            c && (b["data-cke-real-element-type"] = c);
            d && (b["data-cke-resizable"] = d, d = a.attributes, a = new k, c = d.width, d = d.height, void 0 !== c && (a.rules.width = h(c)), void 0 !== d && (a.rules.height = h(d)), a.populate(b));
            return new CKEDITOR.htmlParser.element("img", b)
        };
        CKEDITOR.editor.prototype.restoreRealElement =
            function(a) {
                if (a.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null;
                var b = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data("cke-realelement")), this.document);
                if (a.data("cke-resizable")) {
                    var c = a.getStyle("width");
                    a = a.getStyle("height");
                    c && b.setAttribute("width", g(b.getAttribute("width"), c));
                    a && b.setAttribute("height", g(b.getAttribute("height"), a)) }
                return b }
    })();
    (function() {
        function d(a) { a = a.attributes;
            return "application/x-shockwave-flash" == a.type || f.test(a.src || "") }

        function e(a, b) {
            return a.createFakeParserElement(b, "cke_flash", "flash", !0) }
        var f = /\.swf(?:$|\?)/i;
        CKEDITOR.plugins.add("flash", {
            requires: "dialog,fakeobjects",
            onLoad: function() { CKEDITOR.addCss("img.cke_flash{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}") },
            init: function(a) {
                var b = "object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]";
                CKEDITOR.dialog.isTabEnabled(a, "flash", "properties") && (b += ";object[align]; embed[allowscriptaccess,quality,scale,wmode]");
                CKEDITOR.dialog.isTabEnabled(a, "flash", "advanced") && (b += ";object[id]{*}; embed[bgcolor]{*}(*)");
                a.addCommand("flash", new CKEDITOR.dialogCommand("flash", { allowedContent: b, requiredContent: "embed" }));
                a.ui.addButton && a.ui.addButton("Flash", { label: a.lang.common.flash, command: "flash", toolbar: "insert,20" });
                CKEDITOR.dialog.add("flash", this.path + "dialogs/flash.js");
                a.addMenuItems && a.addMenuItems({ flash: { label: a.lang.flash.properties, command: "flash", group: "flash" } });
                a.on("doubleclick", function(a) {
                    var b = a.data.element;
                    b.is("img") && "flash" == b.data("cke-real-element-type") && (a.data.dialog = "flash") });
                a.contextMenu && a.contextMenu.addListener(function(a) {
                    if (a && a.is("img") && !a.isReadOnly() && "flash" == a.data("cke-real-element-type")) return { flash: CKEDITOR.TRISTATE_OFF } })
            },
            afterInit: function(a) {
                var b = a.dataProcessor;
                (b = b && b.dataFilter) && b.addRules({ elements: { "cke:object": function(b) {
                            var c = b.attributes;
                            if (!(c.classid && String(c.classid).toLowerCase() || d(b))) {
                                for (c = 0; c < b.children.length; c++)
                                    if ("cke:embed" == b.children[c].name) {
                                        if (!d(b.children[c])) break;
                                        return e(a, b) }
                                return null }
                            return e(a, b) }, "cke:embed": function(b) {
                            return d(b) ? e(a, b) : null } } }, 5) }
        })
    })();
    CKEDITOR.tools.extend(CKEDITOR.config, { flashEmbedTagOnly: !1, flashAddEmbedTag: !0, flashConvertOnEdit: !1 });
    (function() {
        function k(a) {
            var l = a.config,
                p = a.fire("uiSpace", { space: "top", html: "" }).html,
                t = function() {
                    function f(a, c, e) { b.setStyle(c, w(e));
                        b.setStyle("position", a) }

                    function e(a) {
                        var b = k.getDocumentPosition();
                        switch (a) {
                            case "top":
                                f("absolute", "top", b.y - q - r);
                                break;
                            case "pin":
                                f("fixed", "top", x);
                                break;
                            case "bottom":
                                f("absolute", "top", b.y + (c.height || c.bottom - c.top) + r) }
                        m = a }
                    var m, k, n, c, h, q, v, p = l.floatSpaceDockedOffsetX || 0,
                        r = l.floatSpaceDockedOffsetY || 0,
                        u = l.floatSpacePinnedOffsetX || 0,
                        x = l.floatSpacePinnedOffsetY ||
                        0;
                    return function(d) {
                        if (k = a.editable()) {
                            var f = d && "focus" == d.name;
                            f && b.show();
                            a.fire("floatingSpaceLayout", { show: f });
                            b.removeStyle("left");
                            b.removeStyle("right");
                            n = b.getClientRect();
                            c = k.getClientRect();
                            h = g.getViewPaneSize();
                            q = n.height;
                            v = "pageXOffset" in g.$ ? g.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft;
                            m ? (q + r <= c.top ? e("top") : q + r > h.height - c.bottom ? e("pin") : e("bottom"), d = h.width / 2, d = l.floatSpacePreferRight ? "right" : 0 < c.left && c.right < h.width && c.width > n.width ? "rtl" == l.contentsLangDirection ?
                                "right" : "left" : d - c.left > c.right - d ? "left" : "right", n.width > h.width ? (d = "left", f = 0) : (f = "left" == d ? 0 < c.left ? c.left : 0 : c.right < h.width ? h.width - c.right : 0, f + n.width > h.width && (d = "left" == d ? "right" : "left", f = 0)), b.setStyle(d, w(("pin" == m ? u : p) + f + ("pin" == m ? 0 : "left" == d ? v : -v)))) : (m = "pin", e("pin"), t(d))
                        }
                    }
                }();
            if (p) {
                var k = new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko ?
                        " " : "") + '" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : " ") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : " ") + '\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'),
                    b = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(k.output({
                        content: p,
                        id: a.id,
                        langDir: a.lang.dir,
                        langCode: a.langCode,
                        name: a.name,
                        style: "display:none;z-index:" + (l.baseFloatZIndex - 1),
                        topId: a.ui.spaceId("top"),
                        voiceLabel: a.title
                    }))),
                    u = CKEDITOR.tools.eventsBuffer(500, t),
                    e = CKEDITOR.tools.eventsBuffer(100, t);
                b.unselectable();
                b.on("mousedown", function(a) { a = a.data;
                    a.getTarget().hasAscendant("a", 1) || a.preventDefault() });
                a.on("focus", function(b) { t(b);
                    a.on("change", u.input);
                    g.on("scroll", e.input);
                    g.on("resize", e.input) });
                a.on("blur", function() {
                    b.hide();
                    a.removeListener("change", u.input);
                    g.removeListener("scroll",
                        e.input);
                    g.removeListener("resize", e.input)
                });
                a.on("destroy", function() { g.removeListener("scroll", e.input);
                    g.removeListener("resize", e.input);
                    b.clearCustomData();
                    b.remove() });
                a.focusManager.hasFocus && b.show();
                a.focusManager.add(b, 1)
            }
        }
        var g = CKEDITOR.document.getWindow(),
            w = CKEDITOR.tools.cssLength;
        CKEDITOR.plugins.add("floatingspace", { init: function(a) { a.on("loaded", function() { k(this) }, null, null, 20) } })
    })();
    CKEDITOR.plugins.add("listblock", {
        requires: "panel",
        onLoad: function() {
            var f = CKEDITOR.addTemplate("panel-list", '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'),
                g = CKEDITOR.addTemplate("panel-list-item", '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" href\x3d"javascript:void(\'{val}\')"  {onclick}\x3d"CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),
                h = CKEDITOR.addTemplate("panel-list-group", '\x3ch1 id\x3d"{id}" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'),
                k = /\'/g;
            CKEDITOR.ui.panel.prototype.addListBlock = function(a, b) {
                return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b)) };
            CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.panel.block,
                $: function(a, b) {
                    b = b || {};
                    var c = b.attributes || (b.attributes = {});
                    (this.multiSelect = !!b.multiSelect) && (c["aria-multiselectable"] = !0);
                    !c.role &&
                        (c.role = "listbox");
                    this.base.apply(this, arguments);
                    this.element.setAttribute("role", c.role);
                    c = this.keys;
                    c[40] = "next";
                    c[9] = "next";
                    c[38] = "prev";
                    c[CKEDITOR.SHIFT + 9] = "prev";
                    c[32] = CKEDITOR.env.ie ? "mouseup" : "click";
                    CKEDITOR.env.ie && (c[13] = "mouseup");
                    this._.pendingHtml = [];
                    this._.pendingList = [];
                    this._.items = {};
                    this._.groups = {}
                },
                _: {
                    close: function() {
                        if (this._.started) {
                            var a = f.output({ items: this._.pendingList.join("") });
                            this._.pendingList = [];
                            this._.pendingHtml.push(a);
                            delete this._.started } },
                    getClick: function() {
                        this._.click ||
                            (this._.click = CKEDITOR.tools.addFunction(function(a) {
                                var b = this.toggle(a);
                                if (this.onClick) this.onClick(a, b) }, this));
                        return this._.click
                    }
                },
                proto: {
                    add: function(a, b, c) {
                        var d = CKEDITOR.tools.getNextId();
                        this._.started || (this._.started = 1, this._.size = this._.size || 0);
                        this._.items[a] = d;
                        var e;
                        e = CKEDITOR.tools.htmlEncodeAttr(a).replace(k, "\\'");
                        a = { id: d, val: e, onclick: CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick", clickFn: this._.getClick(), title: CKEDITOR.tools.htmlEncodeAttr(c || a), text: b || a };
                        this._.pendingList.push(g.output(a))
                    },
                    startGroup: function(a) { this._.close();
                        var b = CKEDITOR.tools.getNextId();
                        this._.groups[a] = b;
                        this._.pendingHtml.push(h.output({ id: b, label: a })) },
                    commit: function() { this._.close();
                        this.element.appendHtml(this._.pendingHtml.join(""));
                        delete this._.size;
                        this._.pendingHtml = [] },
                    toggle: function(a) {
                        var b = this.isMarked(a);
                        b ? this.unmark(a) : this.mark(a);
                        return !b },
                    hideGroup: function(a) {
                        var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext();
                        a && (a.setStyle("display",
                            "none"), b && "ul" == b.getName() && b.setStyle("display", "none"))
                    },
                    hideItem: function(a) { this.element.getDocument().getById(this._.items[a]).setStyle("display", "none") },
                    showAll: function() {
                        var a = this._.items,
                            b = this._.groups,
                            c = this.element.getDocument(),
                            d;
                        for (d in a) c.getById(a[d]).setStyle("display", "");
                        for (var e in b) a = c.getById(b[e]), d = a.getNext(), a.setStyle("display", ""), d && "ul" == d.getName() && d.setStyle("display", "") },
                    mark: function(a) {
                        this.multiSelect || this.unmarkAll();
                        a = this._.items[a];
                        var b = this.element.getDocument().getById(a);
                        b.addClass("cke_selected");
                        this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0);
                        this.onMark && this.onMark(b)
                    },
                    unmark: function(a) {
                        var b = this.element.getDocument();
                        a = this._.items[a];
                        var c = b.getById(a);
                        c.removeClass("cke_selected");
                        b.getById(a + "_option").removeAttribute("aria-selected");
                        this.onUnmark && this.onUnmark(c) },
                    unmarkAll: function() {
                        var a = this._.items,
                            b = this.element.getDocument(),
                            c;
                        for (c in a) {
                            var d = a[c];
                            b.getById(d).removeClass("cke_selected");
                            b.getById(d + "_option").removeAttribute("aria-selected") }
                        this.onUnmark &&
                            this.onUnmark()
                    },
                    isMarked: function(a) {
                        return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected") },
                    focus: function(a) { this._.focusIndex = -1;
                        var b = this.element.getElementsByTag("a"),
                            c, d = -1;
                        if (a)
                            for (c = this.element.getDocument().getById(this._.items[a]).getFirst(); a = b.getItem(++d);) {
                                if (a.equals(c)) { this._.focusIndex = d;
                                    break } } else this.element.focus();
                        c && setTimeout(function() { c.focus() }, 0) }
                }
            })
        }
    });
    CKEDITOR.plugins.add("richcombo", { requires: "floatpanel,listblock,button", beforeInit: function(d) { d.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler) } });
    (function() {
        var d = '\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"true"';
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (d += ' onkeypress\x3d"return false;"');
        CKEDITOR.env.gecko && (d += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
        var d = d + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e' +
                (CKEDITOR.env.hc ? "\x26#9660;" : CKEDITOR.env.air ? "\x26nbsp;" : "") + "\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"),
            k = CKEDITOR.addTemplate("combo", d);
        CKEDITOR.UI_RICHCOMBO = "richcombo";
        CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
            $: function(a) {
                CKEDITOR.tools.extend(this, a, { canGroup: !1, title: a.label, modes: { wysiwyg: 1 }, editorFocus: 1 });
                a = this.panel || {};
                delete this.panel;
                this.id = CKEDITOR.tools.getNextNumber();
                this.document = a.parent && a.parent.getDocument() || CKEDITOR.document;
                a.className = "cke_combopanel";
                a.block = { multiSelect: a.multiSelect, attributes: a.attributes };
                a.toolbarRelated = !0;
                this._ = { panelDefinition: a, items: {} }
            },
            proto: {
                renderHtml: function(a) {
                    var b = [];
                    this.render(a, b);
                    return b.join("") },
                render: function(a, b) {
                    function g() {
                        if (this.getState() != CKEDITOR.TRISTATE_ON) {
                            var c = this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                            a.readOnly && !this.readOnly && (c = CKEDITOR.TRISTATE_DISABLED);
                            this.setState(c);
                            this.setValue("");
                            c != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh() } }
                    var d =
                        CKEDITOR.env,
                        h = "cke_" + this.id,
                        e = CKEDITOR.tools.addFunction(function(b) { l && (a.unlockSelection(1), l = 0);
                            c.execute(b) }, this),
                        f = this,
                        c = { id: h, combo: this, focus: function() { CKEDITOR.document.getById(h).getChild(1).focus() }, execute: function(c) {
                                var b = f._;
                                if (b.state != CKEDITOR.TRISTATE_DISABLED)
                                    if (f.createPanel(a), b.on) b.panel.hide();
                                    else { f.commit();
                                        var d = f.getValue();
                                        d ? b.list.mark(d) : b.list.unmarkAll();
                                        b.panel.showBlock(f.id, new CKEDITOR.dom.element(c), 4) } }, clickFn: e };
                    a.on("activeFilterChange", g, this);
                    a.on("mode",
                        g, this);
                    a.on("selectionChange", g, this);
                    !this.readOnly && a.on("readOnly", g, this);
                    var m = CKEDITOR.tools.addFunction(function(b, d) { b = new CKEDITOR.dom.event(b);
                            var g = b.getKeystroke();
                            if (40 == g) a.once("panelShow", function(a) { a.data._.panel._.currentBlock.onKeyDown(40) });
                            switch (g) {
                                case 13:
                                case 32:
                                case 40:
                                    CKEDITOR.tools.callFunction(e, d);
                                    break;
                                default:
                                    c.onkey(c, g) }
                            b.preventDefault() }),
                        n = CKEDITOR.tools.addFunction(function() { c.onfocus && c.onfocus() }),
                        l = 0;
                    c.keyDownFn = m;
                    d = {
                        id: h,
                        name: this.name || this.command,
                        label: this.label,
                        title: this.title,
                        cls: this.className || "",
                        titleJs: d.gecko && !d.hc ? "" : (this.title || "").replace("'", ""),
                        keydownFn: m,
                        focusFn: n,
                        clickFn: e
                    };
                    k.output(d, b);
                    if (this.onRender) this.onRender();
                    return c
                },
                createPanel: function(a) {
                    if (!this._.panel) {
                        var b = this._.panelDefinition,
                            d = this._.panelDefinition.block,
                            k = b.parent || CKEDITOR.document.getBody(),
                            h = "cke_combopanel__" + this.name,
                            e = new CKEDITOR.ui.floatPanel(a, k, b),
                            f = e.addListBlock(this.id, d),
                            c = this;
                        e.onShow = function() {
                            this.element.addClass(h);
                            c.setState(CKEDITOR.TRISTATE_ON);
                            c._.on = 1;
                            c.editorFocus && !a.focusManager.hasFocus && a.focus();
                            if (c.onOpen) c.onOpen();
                            a.once("panelShow", function() { f.focus(!f.multiSelect && c.getValue()) })
                        };
                        e.onHide = function(b) { this.element.removeClass(h);
                            c.setState(c.modes && c.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                            c._.on = 0;
                            if (!b && c.onClose) c.onClose() };
                        e.onEscape = function() { e.hide(1) };
                        f.onClick = function(a, b) { c.onClick && c.onClick.call(c, a, b);
                            e.hide() };
                        this._.panel = e;
                        this._.list = f;
                        e.getBlock(this.id).onHide = function() {
                            c._.on =
                                0;
                            c.setState(CKEDITOR.TRISTATE_OFF)
                        };
                        this.init && this.init()
                    }
                },
                setValue: function(a, b) { this._.value = a;
                    var d = this.document.getById("cke_" + this.id + "_text");
                    d && (a || b ? d.removeClass("cke_combo_inlinelabel") : (b = this.label, d.addClass("cke_combo_inlinelabel")), d.setText("undefined" != typeof b ? b : a)) },
                getValue: function() {
                    return this._.value || "" },
                unmarkAll: function() { this._.list.unmarkAll() },
                mark: function(a) { this._.list.mark(a) },
                hideItem: function(a) { this._.list.hideItem(a) },
                hideGroup: function(a) { this._.list.hideGroup(a) },
                showAll: function() { this._.list.showAll() },
                add: function(a, b, d) { this._.items[a] = d || a;
                    this._.list.add(a, b, d) },
                startGroup: function(a) { this._.list.startGroup(a) },
                commit: function() { this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this));
                    this._.committed = 1 },
                setState: function(a) {
                    if (this._.state != a) {
                        var b = this.document.getById("cke_" + this.id);
                        b.setState(a, "cke_combo");
                        a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled");
                        this._.state =
                            a
                    }
                },
                getState: function() {
                    return this._.state },
                enable: function() { this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState) },
                disable: function() { this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED)) }
            },
            statics: { handler: { create: function(a) {
                        return new CKEDITOR.ui.richCombo(a) } } }
        });
        CKEDITOR.ui.prototype.addRichCombo = function(a, b) { this.add(a, CKEDITOR.UI_RICHCOMBO, b) }
    })();
    (function() {
        function n(a, c, h, e, q, n, u, w) {
            var x = a.config,
                r = new CKEDITOR.style(u),
                g = q.split(";");
            q = [];
            for (var m = {}, d = 0; d < g.length; d++) {
                var l = g[d];
                if (l) {
                    var l = l.split("/"),
                        v = {},
                        p = g[d] = l[0];
                    v[h] = q[d] = l[1] || p;
                    m[p] = new CKEDITOR.style(u, v);
                    m[p]._.definition.name = p } else g.splice(d--, 1) }
            a.ui.addRichCombo(c, {
                label: e.label,
                title: e.panelTitle,
                toolbar: "styles," + w,
                allowedContent: r,
                requiredContent: r,
                contentTransformations: [
                    [{
                        element: "font",
                        check: "span",
                        left: function(b) {
                            return !!b.attributes.size || !!b.attributes.align ||
                                !!b.attributes.face
                        },
                        right: function(b) {
                            var a = " x-small small medium large x-large xx-large 48px".split(" ");
                            b.name = "span";
                            b.attributes.size && (b.styles["font-size"] = a[b.attributes.size], delete b.attributes.size);
                            b.attributes.align && (b.styles["text-align"] = b.attributes.align, delete b.attributes.align);
                            b.attributes.face && (b.styles["font-family"] = b.attributes.face, delete b.attributes.face) }
                    }]
                ],
                panel: { css: [CKEDITOR.skin.getPath("editor")].concat(x.contentsCss), multiSelect: !1, attributes: { "aria-label": e.panelTitle } },
                init: function() { this.startGroup(e.panelTitle);
                    for (var b = 0; b < g.length; b++) {
                        var a = g[b];
                        this.add(a, m[a].buildPreview(), a) } },
                onClick: function(b) {
                    a.focus();
                    a.fire("saveSnapshot");
                    var c = this.getValue(),
                        h = m[b];
                    if (c && b != c) {
                        var e = m[c],
                            f = a.getSelection().getRanges()[0];
                        if (f.collapsed) {
                            var g = a.elementPath(),
                                k = g.contains(function(a) {
                                    return e.checkElementRemovable(a) });
                            if (k) {
                                var d = f.checkBoundaryOfElement(k, CKEDITOR.START),
                                    l = f.checkBoundaryOfElement(k, CKEDITOR.END);
                                if (d && l) {
                                    for (d = f.createBookmark(); g = k.getFirst();) g.insertBefore(k);
                                    k.remove();
                                    f.moveToBookmark(d)
                                } else d || l ? f.moveToPosition(k, d ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_END) : (f.splitElement(k), f.moveToPosition(k, CKEDITOR.POSITION_AFTER_END)), t(f, g.elements.slice(), k);
                                a.getSelection().selectRanges([f])
                            }
                        } else a.removeStyle(e)
                    }
                    a[c == b ? "removeStyle" : "applyStyle"](h);
                    a.fire("saveSnapshot")
                },
                onRender: function() {
                    a.on("selectionChange", function(b) {
                        var c = this.getValue();
                        b = b.data.path.elements;
                        for (var d = 0, e; d < b.length; d++) {
                            e = b[d];
                            for (var f in m)
                                if (m[f].checkElementMatch(e, !0, a)) { f != c && this.setValue(f);
                                    return }
                        }
                        this.setValue("", n)
                    }, this)
                },
                refresh: function() { a.activeFilter.check(r) || this.setState(CKEDITOR.TRISTATE_DISABLED) }
            })
        }

        function t(a, c, h) {
            var e = c.pop();
            if (e) {
                if (h) return t(a, c, e.equals(h) ? null : h);
                h = e.clone();
                a.insertNode(h);
                a.moveToPosition(h, CKEDITOR.POSITION_AFTER_START);
                t(a, c) } }
        CKEDITOR.plugins.add("font", {
            requires: "richcombo",
            init: function(a) {
                var c = a.config;
                n(a, "Font", "family", a.lang.font, c.font_names, c.font_defaultLabel, c.font_style, 30);
                n(a, "FontSize", "size",
                    a.lang.font.fontSize, c.fontSize_sizes, c.fontSize_defaultLabel, c.fontSize_style, 40)
            }
        })
    })();
    CKEDITOR.config.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif";
    CKEDITOR.config.font_defaultLabel = "";
    CKEDITOR.config.font_style = { element: "span", styles: { "font-family": "#(family)" }, overrides: [{ element: "font", attributes: { face: null } }] };
    CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px";
    CKEDITOR.config.fontSize_defaultLabel = "";
    CKEDITOR.config.fontSize_style = { element: "span", styles: { "font-size": "#(size)" }, overrides: [{ element: "font", attributes: { size: null } }] };
    CKEDITOR.plugins.add("forms", {
        requires: "dialog,fakeobjects",
        onLoad: function() { CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n");
            CKEDITOR.addCss("img.cke_hidden{background-image: url(" + CKEDITOR.getUrl(this.path + "images/hiddenfield.gif") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}") },
        init: function(a) {
            var b = a.lang,
                g = 0,
                h = { email: 1, password: 1, search: 1, tel: 1, text: 1, url: 1 },
                l = {
                    checkbox: "input[type,name,checked,required]",
                    radio: "input[type,name,checked,required]",
                    textfield: "input[type,name,value,size,maxlength,required]",
                    textarea: "textarea[cols,rows,name,required]",
                    select: "select[name,size,multiple,required]; option[value,selected]",
                    button: "input[type,name,value]",
                    form: "form[action,name,id,enctype,target,method]",
                    hiddenfield: "input[type,name,value]",
                    imagebutton: "input[type,alt,src]{width,height,border,border-width,border-style,margin,float}"
                },
                m = {
                    checkbox: "input",
                    radio: "input",
                    textfield: "input",
                    textarea: "textarea",
                    select: "select",
                    button: "input",
                    form: "form",
                    hiddenfield: "input",
                    imagebutton: "input"
                },
                e = function(d, c, e) {
                    var h = { allowedContent: l[c], requiredContent: m[c] }; "form" == c && (h.context = "form");
                    a.addCommand(c, new CKEDITOR.dialogCommand(c, h));
                    a.ui.addButton && a.ui.addButton(d, { label: b.common[d.charAt(0).toLowerCase() + d.slice(1)], command: c, toolbar: "forms," + (g += 10) });
                    CKEDITOR.dialog.add(c, e) },
                f = this.path + "dialogs/";
            !a.blockless && e("Form", "form", f + "form.js");
            e("Checkbox", "checkbox", f + "checkbox.js");
            e("Radio", "radio",
                f + "radio.js");
            e("TextField", "textfield", f + "textfield.js");
            e("Textarea", "textarea", f + "textarea.js");
            e("Select", "select", f + "select.js");
            e("Button", "button", f + "button.js");
            var k = a.plugins.image;
            k && !a.plugins.image2 && e("ImageButton", "imagebutton", CKEDITOR.plugins.getPath("image") + "dialogs/image.js");
            e("HiddenField", "hiddenfield", f + "hiddenfield.js");
            a.addMenuItems && (e = {
                    checkbox: { label: b.forms.checkboxAndRadio.checkboxTitle, command: "checkbox", group: "checkbox" },
                    radio: {
                        label: b.forms.checkboxAndRadio.radioTitle,
                        command: "radio",
                        group: "radio"
                    },
                    textfield: { label: b.forms.textfield.title, command: "textfield", group: "textfield" },
                    hiddenfield: { label: b.forms.hidden.title, command: "hiddenfield", group: "hiddenfield" },
                    button: { label: b.forms.button.title, command: "button", group: "button" },
                    select: { label: b.forms.select.title, command: "select", group: "select" },
                    textarea: { label: b.forms.textarea.title, command: "textarea", group: "textarea" }
                }, k && (e.imagebutton = { label: b.image.titleButton, command: "imagebutton", group: "imagebutton" }), !a.blockless &&
                (e.form = { label: b.forms.form.menu, command: "form", group: "form" }), a.addMenuItems(e));
            a.contextMenu && (!a.blockless && a.contextMenu.addListener(function(d, c, a) {
                if ((d = a.contains("form", 1)) && !d.isReadOnly()) return { form: CKEDITOR.TRISTATE_OFF } }), a.contextMenu.addListener(function(d) {
                if (d && !d.isReadOnly()) {
                    var c = d.getName();
                    if ("select" == c) return { select: CKEDITOR.TRISTATE_OFF };
                    if ("textarea" == c) return { textarea: CKEDITOR.TRISTATE_OFF };
                    if ("input" == c) {
                        var a = d.getAttribute("type") || "text";
                        switch (a) {
                            case "button":
                            case "submit":
                            case "reset":
                                return { button: CKEDITOR.TRISTATE_OFF };
                            case "checkbox":
                                return { checkbox: CKEDITOR.TRISTATE_OFF };
                            case "radio":
                                return { radio: CKEDITOR.TRISTATE_OFF };
                            case "image":
                                return k ? { imagebutton: CKEDITOR.TRISTATE_OFF } : null
                        }
                        if (h[a]) return { textfield: CKEDITOR.TRISTATE_OFF }
                    }
                    if ("img" == c && "hiddenfield" == d.data("cke-real-element-type")) return { hiddenfield: CKEDITOR.TRISTATE_OFF }
                }
            }));
            a.on("doubleclick", function(d) {
                var c = d.data.element;
                if (!a.blockless && c.is("form")) d.data.dialog = "form";
                else if (c.is("select")) d.data.dialog = "select";
                else if (c.is("textarea")) d.data.dialog =
                    "textarea";
                else if (c.is("img") && "hiddenfield" == c.data("cke-real-element-type")) d.data.dialog = "hiddenfield";
                else if (c.is("input")) { c = c.getAttribute("type") || "text";
                    switch (c) {
                        case "button":
                        case "submit":
                        case "reset":
                            d.data.dialog = "button";
                            break;
                        case "checkbox":
                            d.data.dialog = "checkbox";
                            break;
                        case "radio":
                            d.data.dialog = "radio";
                            break;
                        case "image":
                            d.data.dialog = "imagebutton" }
                    h[c] && (d.data.dialog = "textfield") }
            })
        },
        afterInit: function(a) {
            var b = a.dataProcessor,
                g = b && b.htmlFilter,
                b = b && b.dataFilter;
            CKEDITOR.env.ie &&
                g && g.addRules({ elements: { input: function(a) { a = a.attributes;
                            var b = a.type;
                            b || (a.type = "text"); "checkbox" != b && "radio" != b || "on" != a.value || delete a.value } } }, { applyToAll: !0 });
            b && b.addRules({ elements: { input: function(b) {
                        if ("hidden" == b.attributes.type) return a.createFakeParserElement(b, "cke_hidden", "hiddenfield") } } }, { applyToAll: !0 })
        }
    });
    CKEDITOR.plugins.add("format", {
        requires: "richcombo",
        init: function(a) {
            if (!a.blockless) {
                for (var f = a.config, c = a.lang.format, l = f.format_tags.split(";"), d = {}, m = 0, n = [], g = 0; g < l.length; g++) {
                    var h = l[g],
                        k = new CKEDITOR.style(f["format_" + h]);
                    if (!a.filter.customConfig || a.filter.check(k)) m++, d[h] = k, d[h]._.enterMode = a.config.enterMode, n.push(k) }
                0 !== m && a.ui.addRichCombo("Format", {
                    label: c.label,
                    title: c.panelTitle,
                    toolbar: "styles,20",
                    allowedContent: n,
                    panel: {
                        css: [CKEDITOR.skin.getPath("editor")].concat(f.contentsCss),
                        multiSelect: !1,
                        attributes: { "aria-label": c.panelTitle }
                    },
                    init: function() { this.startGroup(c.panelTitle);
                        for (var a in d) {
                            var e = c["tag_" + a];
                            this.add(a, d[a].buildPreview(e), e) } },
                    onClick: function(b) { a.focus();
                        a.fire("saveSnapshot");
                        b = d[b];
                        var e = a.elementPath();
                        a[b.checkActive(e, a) ? "removeStyle" : "applyStyle"](b);
                        setTimeout(function() { a.fire("saveSnapshot") }, 0) },
                    onRender: function() {
                        a.on("selectionChange", function(b) {
                            var e = this.getValue();
                            b = b.data.path;
                            this.refresh();
                            for (var c in d)
                                if (d[c].checkActive(b, a)) {
                                    c !=
                                        e && this.setValue(c, a.lang.format["tag_" + c]);
                                    return
                                }
                            this.setValue("")
                        }, this)
                    },
                    onOpen: function() { this.showAll();
                        for (var b in d) a.activeFilter.check(d[b]) || this.hideItem(b) },
                    refresh: function() {
                        var b = a.elementPath();
                        if (b) {
                            if (b.isContextFor("p"))
                                for (var c in d)
                                    if (a.activeFilter.check(d[c])) return;
                            this.setState(CKEDITOR.TRISTATE_DISABLED) } }
                })
            }
        }
    });
    CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div";
    CKEDITOR.config.format_p = { element: "p" };
    CKEDITOR.config.format_div = { element: "div" };
    CKEDITOR.config.format_pre = { element: "pre" };
    CKEDITOR.config.format_address = { element: "address" };
    CKEDITOR.config.format_h1 = { element: "h1" };
    CKEDITOR.config.format_h2 = { element: "h2" };
    CKEDITOR.config.format_h3 = { element: "h3" };
    CKEDITOR.config.format_h4 = { element: "h4" };
    CKEDITOR.config.format_h5 = { element: "h5" };
    CKEDITOR.config.format_h6 = { element: "h6" };
    (function() {
        var b = { canUndo: !1, exec: function(a) {
                var b = a.document.createElement("hr");
                a.insertElement(b) }, allowedContent: "hr", requiredContent: "hr" };
        CKEDITOR.plugins.add("horizontalrule", { init: function(a) { a.blockless || (a.addCommand("horizontalrule", b), a.ui.addButton && a.ui.addButton("HorizontalRule", { label: a.lang.horizontalrule.toolbar, command: "horizontalrule", toolbar: "insert,40" })) } }) })();
    CKEDITOR.plugins.add("htmlwriter", { init: function(b) {
            var a = new CKEDITOR.htmlWriter;
            a.forceSimpleAmpersand = b.config.forceSimpleAmpersand;
            a.indentationChars = b.config.dataIndentationChars || "\t";
            b.dataProcessor.writer = a } });
    CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
        base: CKEDITOR.htmlParser.basicWriter,
        $: function() {
            this.base();
            this.indentationChars = "\t";
            this.selfClosingEnd = " /\x3e";
            this.lineBreakChars = "\n";
            this.sortAttributes = 1;
            this._.indent = 0;
            this._.indentation = "";
            this._.inPre = 0;
            this._.rules = {};
            var b = CKEDITOR.dtd,
                a;
            for (a in CKEDITOR.tools.extend({}, b.$nonBodyContent, b.$block, b.$listItem, b.$tableContent)) this.setRules(a, {
                indent: !b[a]["#"],
                breakBeforeOpen: 1,
                breakBeforeClose: !b[a]["#"],
                breakAfterClose: 1,
                needsSpace: a in
                    b.$block && !(a in { li: 1, dt: 1, dd: 1 })
            });
            this.setRules("br", { breakAfterOpen: 1 });
            this.setRules("title", { indent: 0, breakAfterOpen: 0 });
            this.setRules("style", { indent: 0, breakBeforeClose: 1 });
            this.setRules("pre", { breakAfterOpen: 1, indent: 0 })
        },
        proto: {
            openTag: function(b) {
                var a = this._.rules[b];
                this._.afterCloser && a && a.needsSpace && this._.needsSpace && this._.output.push("\n");
                this._.indent ? this.indentation() : a && a.breakBeforeOpen && (this.lineBreak(), this.indentation());
                this._.output.push("\x3c", b);
                this._.afterCloser = 0 },
            openTagClose: function(b, a) {
                var c = this._.rules[b];
                a ? (this._.output.push(this.selfClosingEnd), c && c.breakAfterClose && (this._.needsSpace = c.needsSpace)) : (this._.output.push("\x3e"), c && c.indent && (this._.indentation += this.indentationChars));
                c && c.breakAfterOpen && this.lineBreak(); "pre" == b && (this._.inPre = 1) },
            attribute: function(b, a) { "string" == typeof a && (this.forceSimpleAmpersand && (a = a.replace(/&amp;/g, "\x26")), a = CKEDITOR.tools.htmlEncodeAttr(a));
                this._.output.push(" ", b, '\x3d"', a, '"') },
            closeTag: function(b) {
                var a =
                    this._.rules[b];
                a && a.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length));
                this._.indent ? this.indentation() : a && a.breakBeforeClose && (this.lineBreak(), this.indentation());
                this._.output.push("\x3c/", b, "\x3e");
                "pre" == b && (this._.inPre = 0);
                a && a.breakAfterClose && (this.lineBreak(), this._.needsSpace = a.needsSpace);
                this._.afterCloser = 1
            },
            text: function(b) { this._.indent && (this.indentation(), !this._.inPre && (b = CKEDITOR.tools.ltrim(b)));
                this._.output.push(b) },
            comment: function(b) {
                this._.indent &&
                    this.indentation();
                this._.output.push("\x3c!--", b, "--\x3e")
            },
            lineBreak: function() {!this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars);
                this._.indent = 1 },
            indentation: function() {!this._.inPre && this._.indentation && this._.output.push(this._.indentation);
                this._.indent = 0 },
            reset: function() { this._.output = [];
                this._.indent = 0;
                this._.indentation = "";
                this._.afterCloser = 0;
                this._.inPre = 0;
                this._.needsSpace = 0 },
            setRules: function(b, a) {
                var c = this._.rules[b];
                c ? CKEDITOR.tools.extend(c, a, !0) : this._.rules[b] =
                    a
            }
        }
    });
    (function() {
        CKEDITOR.plugins.add("iframe", {
            requires: "dialog,fakeobjects",
            onLoad: function() { CKEDITOR.addCss("img.cke_iframe{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}") },
            init: function(a) {
                var b = a.lang.iframe,
                    c = "iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]";
                a.plugins.dialogadvtab && (c += ";iframe" + a.plugins.dialogadvtab.allowedContent({
                    id: 1,
                    classes: 1,
                    styles: 1
                }));
                CKEDITOR.dialog.add("iframe", this.path + "dialogs/iframe.js");
                a.addCommand("iframe", new CKEDITOR.dialogCommand("iframe", { allowedContent: c, requiredContent: "iframe" }));
                a.ui.addButton && a.ui.addButton("Iframe", { label: b.toolbar, command: "iframe", toolbar: "insert,80" });
                a.on("doubleclick", function(a) {
                    var b = a.data.element;
                    b.is("img") && "iframe" == b.data("cke-real-element-type") && (a.data.dialog = "iframe") });
                a.addMenuItems && a.addMenuItems({ iframe: { label: b.title, command: "iframe", group: "image" } });
                a.contextMenu && a.contextMenu.addListener(function(a) {
                    if (a && a.is("img") && "iframe" == a.data("cke-real-element-type")) return { iframe: CKEDITOR.TRISTATE_OFF } })
            },
            afterInit: function(a) {
                var b = a.dataProcessor;
                (b = b && b.dataFilter) && b.addRules({ elements: { iframe: function(b) {
                            return a.createFakeParserElement(b, "cke_iframe", "iframe", !0) } } }) }
        })
    })();
    (function() {
        function m(a) {
            function f(a) {
                var b = !1;
                g.attachListener(g, "keydown", function() {
                    var d = c.getBody().getElementsByTag(a);
                    if (!b) {
                        for (var e = 0; e < d.count(); e++) d.getItem(e).setCustomData("retain", !0);
                        b = !0 } }, null, null, 1);
                g.attachListener(g, "keyup", function() {
                    var d = c.getElementsByTag(a);
                    b && (1 != d.count() || d.getItem(0).getCustomData("retain") || d.getItem(0).hasAttribute("data-cke-temp") || d.getItem(0).remove(1), b = !1) }) }
            var b = this.editor,
                c = a.document,
                d = c.body,
                e = c.getElementById("cke_actscrpt");
            e && e.parentNode.removeChild(e);
            (e = c.getElementById("cke_shimscrpt")) && e.parentNode.removeChild(e);
            (e = c.getElementById("cke_basetagscrpt")) && e.parentNode.removeChild(e);
            d.contentEditable = !0;
            CKEDITOR.env.ie && (d.hideFocus = !0, d.disabled = !0, d.removeAttribute("disabled"));
            delete this._.isLoadingData;
            this.$ = d;
            c = new CKEDITOR.dom.document(c);
            this.setup();
            this.fixInitialSelection();
            var g = this;
            CKEDITOR.env.ie && !CKEDITOR.env.edge && c.getDocumentElement().addClass(c.$.compatMode);
            CKEDITOR.env.ie && !CKEDITOR.env.edge && b.enterMode != CKEDITOR.ENTER_P ?
                f("p") : CKEDITOR.env.edge && b.enterMode != CKEDITOR.ENTER_DIV && f("div");
            if (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) c.getDocumentElement().on("mousedown", function(a) { a.data.getTarget().is("html") && setTimeout(function() { b.editable().focus() }) });
            n(b);
            try { b.document.$.execCommand("2D-position", !1, !0) } catch (h) {}(CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == b.document.$.compatMode) && this.attachListener(this, "keydown", function(a) {
                var c = a.data.getKeystroke();
                if (33 == c || 34 == c)
                    if (CKEDITOR.env.ie) setTimeout(function() { b.getSelection().scrollIntoView() },
                        0);
                    else if (b.window.$.innerHeight > this.$.offsetHeight) {
                    var d = b.createRange();
                    d[33 == c ? "moveToElementEditStart" : "moveToElementEditEnd"](this);
                    d.select();
                    a.data.preventDefault() }
            });
            CKEDITOR.env.ie && this.attachListener(c, "blur", function() {
                try { c.$.selection.empty() } catch (a) {} });
            CKEDITOR.env.iOS && this.attachListener(c, "touchend", function() { a.focus() });
            d = b.document.getElementsByTag("title").getItem(0);
            d.data("cke-title", d.getText());
            CKEDITOR.env.ie && (b.document.$.title = this._.docTitle);
            CKEDITOR.tools.setTimeout(function() {
                "unloaded" ==
                this.status && (this.status = "ready");
                b.fire("contentDom");
                this._.isPendingFocus && (b.focus(), this._.isPendingFocus = !1);
                setTimeout(function() { b.fire("dataReady") }, 0)
            }, 0, this)
        }

        function n(a) {
            function f() {
                var c;
                a.editable().attachListener(a, "selectionChange", function() {
                    var d = a.getSelection().getSelectedElement();
                    d && (c && (c.detachEvent("onresizestart", b), c = null), d.$.attachEvent("onresizestart", b), c = d.$) }) }

            function b(a) { a.returnValue = !1 }
            if (CKEDITOR.env.gecko) try {
                var c = a.document.$;
                c.execCommand("enableObjectResizing", !1, !a.config.disableObjectResizing);
                c.execCommand("enableInlineTableEditing", !1, !a.config.disableNativeTableHandles)
            } catch (d) {} else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && a.config.disableObjectResizing && f(a)
        }

        function p() {
            var a = [];
            if (8 <= CKEDITOR.document.$.documentMode) { a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}");
                var f = [],
                    b;
                for (b in CKEDITOR.dtd.$removeEmpty) f.push("html.CSS1Compat " + b + "[contenteditable\x3dfalse]");
                a.push(f.join(",") + "{display:inline-block}") } else CKEDITOR.env.gecko &&
                (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
            a.push("html{cursor:text;*cursor:auto}");
            a.push("img,input,textarea{cursor:default}");
            return a.join("\n")
        }
        var l;
        CKEDITOR.plugins.add("wysiwygarea", {
            init: function(a) {
                a.config.fullPage && a.addFeature({ allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]", requiredContent: "body" });
                a.addMode("wysiwyg", function(f) {
                    function b(b) {
                        b && b.removeListener();
                        a.editable(new l(a, d.$.contentWindow.document.body));
                        a.setData(a.getData(1), f)
                    }
                    var c = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();",
                        c = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent(c) + "}())" : "",
                        d = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' + c + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e');
                    d.setStyles({ width: "100%", height: "100%" });
                    d.addClass("cke_wysiwyg_frame").addClass("cke_reset");
                    c = a.ui.space("contents");
                    c.append(d);
                    var e = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko;
                    if (e) d.on("load", b);
                    var g = a.title,
                        h = a.fire("ariaEditorHelpLabel", {}).label;
                    g && (CKEDITOR.env.ie && h && (g += ", " + h), d.setAttribute("title", g));
                    if (h) {
                        var g = CKEDITOR.tools.getNextId(),
                            k = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + h + "\x3c/span\x3e");
                        c.append(k, 1);
                        d.setAttribute("aria-describedby", g) }
                    a.on("beforeModeUnload", function(a) { a.removeListener();
                        k && k.remove() });
                    d.setAttributes({ tabIndex: a.tabIndex, allowTransparency: "true" });
                    !e && b();
                    a.fire("ariaWidget", d)
                })
            }
        });
        CKEDITOR.editor.prototype.addContentsCss = function(a) {
            var f = this.config,
                b = f.contentsCss;
            CKEDITOR.tools.isArray(b) || (f.contentsCss = b ? [b] : []);
            f.contentsCss.push(a) };
        l = CKEDITOR.tools.createClass({
            $: function() { this.base.apply(this, arguments);
                this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function(a) { CKEDITOR.tools.setTimeout(m, 0, this, a) }, this);
                this._.docTitle = this.getWindow().getFrame().getAttribute("title") },
            base: CKEDITOR.editable,
            proto: {
                setData: function(a, f) {
                    var b = this.editor;
                    if (f) this.setHtml(a), this.fixInitialSelection(), b.fire("dataReady");
                    else {
                        this._.isLoadingData = !0;
                        b._.dataStore = { id: 1 };
                        var c = b.config,
                            d = c.fullPage,
                            e = c.docType,
                            g = CKEDITOR.tools.buildStyleHtml(p()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e');
                        d || (g += CKEDITOR.tools.buildStyleHtml(b.config.contentsCss));
                        var h = c.baseHref ? '\x3cbase href\x3d"' + c.baseHref + '" data-cke-temp\x3d"1" /\x3e' : "";
                        d && (a = a.replace(/<!DOCTYPE[^>]*>/i, function(a) {
                            b.docType =
                                e = a;
                            return ""
                        }).replace(/<\?xml\s[^\?]*\?>/i, function(a) { b.xmlDeclaration = a;
                            return "" }));
                        a = b.dataProcessor.toHtml(a);
                        d ? (/<body[\s|>]/.test(a) || (a = "\x3cbody\x3e" + a), /<html[\s|>]/.test(a) || (a = "\x3chtml\x3e" + a + "\x3c/html\x3e"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$\x26\x3ctitle\x3e\x3c/title\x3e")) : a = a.replace(/<html[^>]*>/, "$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"), h && (a = a.replace(/<head[^>]*?>/, "$\x26" + h)), a = a.replace(/<\/head\s*>/, g + "$\x26"), a =
                            e + a) : a = c.docType + '\x3chtml dir\x3d"' + c.contentsLangDirection + '" lang\x3d"' + (c.contentsLanguage || b.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' + this._.docTitle + "\x3c/title\x3e" + h + g + "\x3c/head\x3e\x3cbody" + (c.bodyId ? ' id\x3d"' + c.bodyId + '"' : "") + (c.bodyClass ? ' class\x3d"' + c.bodyClass + '"' : "") + "\x3e" + a + "\x3c/body\x3e\x3c/html\x3e";
                        CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4 > CKEDITOR.env.version && (a = a.replace(/<body[^>]*>/, "$\x26\x3c!-- cke-content-start --\x3e")));
                        c = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ? ' defer\x3d"defer" ' : "") + "\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded\x3d1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "\x3c/script\x3e";
                        CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (c += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');
                        h && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (c += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e');
                        a = a.replace(/(?=\s*<\/(:?head)>)/, c);
                        this.clearCustomData();
                        this.clearListeners();
                        b.fire("contentDomUnload");
                        var k = this.getDocument();
                        try { k.write(a) } catch (l) { setTimeout(function() { k.write(a) }, 0) }
                    }
                },
                getData: function(a) {
                    if (a) return this.getHtml();
                    a = this.editor;
                    var f = a.config,
                        b = f.fullPage,
                        c = b && a.docType,
                        d = b && a.xmlDeclaration,
                        e = this.getDocument(),
                        b = b ? e.getDocumentElement().getOuterHtml() : e.getBody().getHtml();
                    CKEDITOR.env.gecko && f.enterMode != CKEDITOR.ENTER_BR && (b = b.replace(/<br>(?=\s*(:?$|<\/body>))/, ""));
                    b = a.dataProcessor.toDataFormat(b);
                    d && (b = d + "\n" + b);
                    c && (b = c + "\n" + b);
                    return b
                },
                focus: function() { this._.isLoadingData ? this._.isPendingFocus = !0 : l.baseProto.focus.call(this) },
                detach: function() {
                    var a = this.editor,
                        f = a.document,
                        b;
                    try { b = a.window.getFrame() } catch (c) {}
                    l.baseProto.detach.call(this);
                    this.clearCustomData();
                    f.getDocumentElement().clearCustomData();
                    CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
                    b && b.getParent() ? (b.clearCustomData(), (a = b.removeCustomData("onResize")) && a.removeListener(), b.remove()) : CKEDITOR.warn("editor-destroy-iframe")
                }
            }
        })
    })();
    CKEDITOR.config.disableObjectResizing = !1;
    CKEDITOR.config.disableNativeTableHandles = !0;
    CKEDITOR.config.disableNativeSpellChecker = !0;
    (function() {
        function e(b, a) { a || (a = b.getSelection().getSelectedElement());
            if (a && a.is("img") && !a.data("cke-realelement") && !a.isReadOnly()) return a }

        function f(b) {
            var a = b.getStyle("float");
            if ("inherit" == a || "none" == a) a = 0;
            a || (a = b.getAttribute("align"));
            return a }
        CKEDITOR.plugins.add("image", {
            requires: "dialog",
            init: function(b) {
                if (!b.plugins.image2) {
                    CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
                    var a = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
                    CKEDITOR.dialog.isTabEnabled(b, "image", "advanced") && (a = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");
                    b.addCommand("image", new CKEDITOR.dialogCommand("image", { allowedContent: a, requiredContent: "img[alt,src]", contentTransformations: [
                            ["img{width}: sizeToStyle", "img[width]: sizeToAttribute"],
                            ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]
                        ] }));
                    b.ui.addButton && b.ui.addButton("Image", { label: b.lang.common.image, command: "image", toolbar: "insert,10" });
                    b.on("doubleclick", function(b) {
                        var a =
                            b.data.element;
                        !a.is("img") || a.data("cke-realelement") || a.isReadOnly() || (b.data.dialog = "image")
                    });
                    b.addMenuItems && b.addMenuItems({ image: { label: b.lang.image.menu, command: "image", group: "image" } });
                    b.contextMenu && b.contextMenu.addListener(function(a) {
                        if (e(b, a)) return { image: CKEDITOR.TRISTATE_OFF } })
                }
            },
            afterInit: function(b) {
                function a(a) {
                    var d = b.getCommand("justify" + a);
                    if (d) {
                        if ("left" == a || "right" == a) d.on("exec", function(d) {
                            var c = e(b),
                                g;
                            c && (g = f(c), g == a ? (c.removeStyle("float"), a == f(c) && c.removeAttribute("align")) :
                                c.setStyle("float", a), d.cancel())
                        });
                        d.on("refresh", function(d) {
                            var c = e(b);
                            c && (c = f(c), this.setState(c == a ? CKEDITOR.TRISTATE_ON : "right" == a || "left" == a ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), d.cancel()) })
                    }
                }
                b.plugins.image2 || (a("left"), a("right"), a("center"), a("block"))
            }
        })
    })();
    CKEDITOR.config.image_removeLinkByEmptyURL = !0;
    (function() {
        function m(a, b) {
            var e, f;
            b.on("refresh", function(a) {
                var b = [k],
                    c;
                for (c in a.data.states) b.push(a.data.states[c]);
                this.setState(CKEDITOR.tools.search(b, p) ? p : k) }, b, null, 100);
            b.on("exec", function(b) { e = a.getSelection();
                f = e.createBookmarks(1);
                b.data || (b.data = {});
                b.data.done = !1 }, b, null, 0);
            b.on("exec", function() { a.forceNextSelectionCheck();
                e.selectBookmarks(f) }, b, null, 100) }
        var k = CKEDITOR.TRISTATE_DISABLED,
            p = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indent", {
            init: function(a) {
                var b = CKEDITOR.plugins.indent.genericDefinition;
                m(a, a.addCommand("indent", new b(!0)));
                m(a, a.addCommand("outdent", new b));
                a.ui.addButton && (a.ui.addButton("Indent", { label: a.lang.indent.indent, command: "indent", directional: !0, toolbar: "indent,20" }), a.ui.addButton("Outdent", { label: a.lang.indent.outdent, command: "outdent", directional: !0, toolbar: "indent,10" }));
                a.on("dirChanged", function(b) {
                    var f = a.createRange(),
                        l = b.data.node;
                    f.setStartBefore(l);
                    f.setEndAfter(l);
                    for (var n = new CKEDITOR.dom.walker(f), c; c = n.next();)
                        if (c.type == CKEDITOR.NODE_ELEMENT)
                            if (!c.equals(l) &&
                                c.getDirection()) f.setStartAfter(c), n = new CKEDITOR.dom.walker(f);
                            else {
                                var d = a.config.indentClasses;
                                if (d)
                                    for (var g = "ltr" == b.data.dir ? ["_rtl", ""] : ["", "_rtl"], h = 0; h < d.length; h++) c.hasClass(d[h] + g[0]) && (c.removeClass(d[h] + g[0]), c.addClass(d[h] + g[1]));
                                d = c.getStyle("margin-right");
                                g = c.getStyle("margin-left");
                                d ? c.setStyle("margin-left", d) : c.removeStyle("margin-left");
                                g ? c.setStyle("margin-right", g) : c.removeStyle("margin-right") }
                })
            }
        });
        CKEDITOR.plugins.indent = {
            genericDefinition: function(a) {
                this.isIndent = !!a;
                this.startDisabled = !this.isIndent
            },
            specificDefinition: function(a, b, e) { this.name = b;
                this.editor = a;
                this.jobs = {};
                this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR;
                this.isIndent = !!e;
                this.relatedGlobal = e ? "indent" : "outdent";
                this.indentKey = e ? 9 : CKEDITOR.SHIFT + 9;
                this.database = {} },
            registerCommands: function(a, b) {
                a.on("pluginsLoaded", function() {
                    for (var a in b)(function(a, b) {
                        var e = a.getCommand(b.relatedGlobal),
                            c;
                        for (c in b.jobs) e.on("exec", function(d) {
                            d.data.done || (a.fire("lockSnapshot"), b.execJob(a, c) && (d.data.done = !0), a.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(b.database))
                        }, this, null, c), e.on("refresh", function(d) { d.data.states || (d.data.states = {});
                            d.data.states[b.name + "@" + c] = b.refreshJob(a, c, d.data.path) }, this, null, c);
                        a.addFeature(b)
                    })(this, b[a])
                })
            }
        };
        CKEDITOR.plugins.indent.genericDefinition.prototype = { context: "p", exec: function() {} };
        CKEDITOR.plugins.indent.specificDefinition.prototype = {
            execJob: function(a, b) {
                var e = this.jobs[b];
                if (e.state != k) return e.exec.call(this, a) },
            refreshJob: function(a,
                b, e) { b = this.jobs[b];
                a.activeFilter.checkFeature(this) ? b.state = b.refresh.call(this, a, e) : b.state = k;
                return b.state },
            getContext: function(a) {
                return a.contains(this.context) }
        }
    })();
    (function() {
        function f(b, c, a) {
            if (!b.getCustomData("indent_processed")) {
                var d = this.editor,
                    l = this.isIndent;
                if (c) { d = b.$.className.match(this.classNameRegex);
                    a = 0;
                    d && (d = d[1], a = CKEDITOR.tools.indexOf(c, d) + 1);
                    if (0 > (a += l ? 1 : -1)) return;
                    a = Math.min(a, c.length);
                    a = Math.max(a, 0);
                    b.$.className = CKEDITOR.tools.ltrim(b.$.className.replace(this.classNameRegex, ""));
                    0 < a && b.addClass(c[a - 1]) } else {
                    c = m(b, a);
                    a = parseInt(b.getStyle(c), 10);
                    var g = d.config.indentOffset || 40;
                    isNaN(a) && (a = 0);
                    a += (l ? 1 : -1) * g;
                    if (0 > a) return;
                    a = Math.max(a,
                        0);
                    a = Math.ceil(a / g) * g;
                    b.setStyle(c, a ? a + (d.config.indentUnit || "px") : "");
                    "" === b.getAttribute("style") && b.removeAttribute("style")
                }
                CKEDITOR.dom.element.setMarker(this.database, b, "indent_processed", 1)
            }
        }

        function m(b, c) {
            return "ltr" == (c || b.getComputedStyle("direction")) ? "margin-left" : "margin-right" }
        var h = CKEDITOR.dtd.$listItem,
            p = CKEDITOR.dtd.$list,
            k = CKEDITOR.TRISTATE_DISABLED,
            n = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indentblock", {
            requires: "indent",
            init: function(b) {
                function c() {
                    a.specificDefinition.apply(this,
                        arguments);
                    this.allowedContent = { "div h1 h2 h3 h4 h5 h6 ol p pre ul": { propertiesOnly: !0, styles: d ? null : "margin-left,margin-right", classes: d || null } };
                    this.contentTransformations = [
                        ["div: splitMarginShorthand"],
                        ["h1: splitMarginShorthand"],
                        ["h2: splitMarginShorthand"],
                        ["h3: splitMarginShorthand"],
                        ["h4: splitMarginShorthand"],
                        ["h5: splitMarginShorthand"],
                        ["h6: splitMarginShorthand"],
                        ["ol: splitMarginShorthand"],
                        ["p: splitMarginShorthand"],
                        ["pre: splitMarginShorthand"],
                        ["ul: splitMarginShorthand"]
                    ];
                    this.enterBr &&
                        (this.allowedContent.div = !0);
                    this.requiredContent = (this.enterBr ? "div" : "p") + (d ? "(" + d.join(",") + ")" : "{margin-left}");
                    this.jobs = {
                        20: {
                            refresh: function(a, b) {
                                var e = b.block || b.blockLimit;
                                if (!e.is(h)) var c = e.getAscendant(h),
                                    e = c && b.contains(c) || e;
                                e.is(h) && (e = e.getParent());
                                if (this.enterBr || this.getContext(b)) {
                                    if (d) {
                                        var c = d,
                                            e = e.$.className.match(this.classNameRegex),
                                            f = this.isIndent,
                                            c = e ? f ? e[1] != c.slice(-1) : !0 : f;
                                        return c ? n : k }
                                    return this.isIndent ? n : e ? CKEDITOR[0 >= (parseInt(e.getStyle(m(e)), 10) || 0) ? "TRISTATE_DISABLED" :
                                        "TRISTATE_OFF"] : k
                                }
                                return k
                            },
                            exec: function(a) {
                                var b = a.getSelection(),
                                    b = b && b.getRanges()[0],
                                    c;
                                if (c = a.elementPath().contains(p)) f.call(this, c, d);
                                else
                                    for (b = b.createIterator(), a = a.config.enterMode, b.enforceRealBlocks = !0, b.enlargeBr = a != CKEDITOR.ENTER_BR; c = b.getNextParagraph(a == CKEDITOR.ENTER_P ? "p" : "div");) c.isReadOnly() || f.call(this, c, d);
                                return !0 }
                        }
                    }
                }
                var a = CKEDITOR.plugins.indent,
                    d = b.config.indentClasses;
                a.registerCommands(b, { indentblock: new c(b, "indentblock", !0), outdentblock: new c(b, "outdentblock") });
                CKEDITOR.tools.extend(c.prototype, a.specificDefinition.prototype, { context: { div: 1, dl: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, p: 1, pre: 1, table: 1 }, classNameRegex: d ? new RegExp("(?:^|\\s+)(" + d.join("|") + ")(?\x3d$|\\s)") : null })
            }
        })
    })();
    (function() {
        function w(c) {
            function f(b) {
                for (var e = d.startContainer, a = d.endContainer; e && !e.getParent().equals(b);) e = e.getParent();
                for (; a && !a.getParent().equals(b);) a = a.getParent();
                if (!e || !a) return !1;
                for (var g = e, e = [], k = !1; !k;) g.equals(a) && (k = !0), e.push(g), g = g.getNext();
                if (1 > e.length) return !1;
                g = b.getParents(!0);
                for (a = 0; a < g.length; a++)
                    if (g[a].getName && p[g[a].getName()]) { b = g[a];
                        break }
                for (var g = l.isIndent ? 1 : -1, a = e[0], e = e[e.length - 1], k = CKEDITOR.plugins.list.listToArray(b, q), n = k[e.getCustomData("listarray_index")].indent,
                        a = a.getCustomData("listarray_index"); a <= e.getCustomData("listarray_index"); a++)
                    if (k[a].indent += g, 0 < g) {
                        var h = k[a].parent;
                        k[a].parent = new CKEDITOR.dom.element(h.getName(), h.getDocument()) }
                for (a = e.getCustomData("listarray_index") + 1; a < k.length && k[a].indent > n; a++) k[a].indent += g;
                e = CKEDITOR.plugins.list.arrayToList(k, q, null, c.config.enterMode, b.getDirection());
                if (!l.isIndent) {
                    var f;
                    if ((f = b.getParent()) && f.is("li"))
                        for (var g = e.listNode.getChildren(), r = [], m, a = g.count() - 1; 0 <= a; a--)(m = g.getItem(a)) && m.is && m.is("li") &&
                            r.push(m)
                }
                e && e.listNode.replace(b);
                if (r && r.length)
                    for (a = 0; a < r.length; a++) {
                        for (m = b = r[a];
                            (m = m.getNext()) && m.is && m.getName() in p;) CKEDITOR.env.needsNbspFiller && !b.getFirst(x) && b.append(d.document.createText(" ")), b.append(m);
                        b.insertAfter(f) }
                e && c.fire("contentDomInvalidated");
                return !0
            }
            for (var l = this, q = this.database, p = this.context, n = c.getSelection(), n = (n && n.getRanges()).createIterator(), d; d = n.getNextRange();) {
                for (var b = d.getCommonAncestor(); b && (b.type != CKEDITOR.NODE_ELEMENT || !p[b.getName()]);) {
                    if (c.editable().equals(b)) {
                        b = !1;
                        break
                    }
                    b = b.getParent()
                }
                b || (b = d.startPath().contains(p)) && d.setEndAt(b, CKEDITOR.POSITION_BEFORE_END);
                if (!b) {
                    var h = d.getEnclosedNode();
                    h && h.type == CKEDITOR.NODE_ELEMENT && h.getName() in p && (d.setStartAt(h, CKEDITOR.POSITION_AFTER_START), d.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), b = h) }
                b && d.startContainer.type == CKEDITOR.NODE_ELEMENT && d.startContainer.getName() in p && (h = new CKEDITOR.dom.walker(d), h.evaluator = t, d.startContainer = h.next());
                b && d.endContainer.type == CKEDITOR.NODE_ELEMENT && d.endContainer.getName() in
                    p && (h = new CKEDITOR.dom.walker(d), h.evaluator = t, d.endContainer = h.previous());
                if (b) return f(b)
            }
            return 0
        }

        function t(c) {
            return c.type == CKEDITOR.NODE_ELEMENT && c.is("li") }

        function x(c) {
            return y(c) && z(c) }
        var y = CKEDITOR.dom.walker.whitespaces(!0),
            z = CKEDITOR.dom.walker.bookmark(!1, !0),
            u = CKEDITOR.TRISTATE_DISABLED,
            v = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indentlist", {
            requires: "indent",
            init: function(c) {
                function f(c) {
                    l.specificDefinition.apply(this, arguments);
                    this.requiredContent = ["ul", "ol"];
                    c.on("key",
                        function(f) {
                            if ("wysiwyg" == c.mode && f.data.keyCode == this.indentKey) {
                                var n = this.getContext(c.elementPath());!n || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, c.elementPath(), n) || (c.execCommand(this.relatedGlobal), f.cancel()) } }, this);
                    this.jobs[this.isIndent ? 10 : 30] = {
                        refresh: this.isIndent ? function(c, f) {
                            var d = this.getContext(f),
                                b = CKEDITOR.plugins.indentList.firstItemInPath(this.context, f, d);
                            return d && this.isIndent && !b ? v : u } : function(c, f) {
                            return !this.getContext(f) || this.isIndent ?
                                u : v
                        },
                        exec: CKEDITOR.tools.bind(w, this)
                    }
                }
                var l = CKEDITOR.plugins.indent;
                l.registerCommands(c, { indentlist: new f(c, "indentlist", !0), outdentlist: new f(c, "outdentlist") });
                CKEDITOR.tools.extend(f.prototype, l.specificDefinition.prototype, { context: { ol: 1, ul: 1 } })
            }
        });
        CKEDITOR.plugins.indentList = {};
        CKEDITOR.plugins.indentList.firstItemInPath = function(c, f, l) {
            var q = f.contains(t);
            l || (l = f.contains(c));
            return l && q && q.equals(l.getFirst(t)) }
    })();
    CKEDITOR.plugins.add("smiley", { requires: "dialog", init: function(a) { a.config.smiley_path = a.config.smiley_path || this.path + "images/";
            a.addCommand("smiley", new CKEDITOR.dialogCommand("smiley", { allowedContent: "img[alt,height,!src,title,width]", requiredContent: "img" }));
            a.ui.addButton && a.ui.addButton("Smiley", { label: a.lang.smiley.toolbar, command: "smiley", toolbar: "insert,50" });
            CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js") } });
    CKEDITOR.config.smiley_images = "regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png".split(" ");
    CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";");
    (function() {
        function n(a, c) { c = void 0 === c || c;
            var b;
            if (c) b = a.getComputedStyle("text-align");
            else {
                for (; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align");) { b = a.getParent();
                    if (!b) break;
                    a = b }
                b = a.getStyle("text-align") || a.getAttribute("align") || "" }
            b && (b = b.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, ""));!b && c && (b = "rtl" == a.getComputedStyle("direction") ? "right" : "left");
            return b }

        function g(a, c, b) {
            this.editor = a;
            this.name = c;
            this.value = b;
            this.context = "p";
            c = a.config.justifyClasses;
            var h = a.config.enterMode ==
                CKEDITOR.ENTER_P ? "p" : "div";
            if (c) {
                switch (b) {
                    case "left":
                        this.cssClassName = c[0];
                        break;
                    case "center":
                        this.cssClassName = c[1];
                        break;
                    case "right":
                        this.cssClassName = c[2];
                        break;
                    case "justify":
                        this.cssClassName = c[3] }
                this.cssClassRegex = new RegExp("(?:^|\\s+)(?:" + c.join("|") + ")(?\x3d$|\\s)");
                this.requiredContent = h + "(" + this.cssClassName + ")" } else this.requiredContent = h + "{text-align}";
            this.allowedContent = {
                "caption div h1 h2 h3 h4 h5 h6 p pre td th li": {
                    propertiesOnly: !0,
                    styles: this.cssClassName ? null : "text-align",
                    classes: this.cssClassName || null
                }
            };
            a.config.enterMode == CKEDITOR.ENTER_BR && (this.allowedContent.div = !0)
        }

        function l(a) {
            var c = a.editor,
                b = c.createRange();
            b.setStartBefore(a.data.node);
            b.setEndAfter(a.data.node);
            for (var h = new CKEDITOR.dom.walker(b), d; d = h.next();)
                if (d.type == CKEDITOR.NODE_ELEMENT)
                    if (!d.equals(a.data.node) && d.getDirection()) b.setStartAfter(d), h = new CKEDITOR.dom.walker(b);
                    else {
                        var e = c.config.justifyClasses;
                        e && (d.hasClass(e[0]) ? (d.removeClass(e[0]), d.addClass(e[2])) : d.hasClass(e[2]) && (d.removeClass(e[2]),
                            d.addClass(e[0])));
                        e = d.getStyle("text-align");
                        "left" == e ? d.setStyle("text-align", "right") : "right" == e && d.setStyle("text-align", "left")
                    }
        }
        g.prototype = {
            exec: function(a) {
                var c = a.getSelection(),
                    b = a.config.enterMode;
                if (c) {
                    for (var h = c.createBookmarks(), d = c.getRanges(), e = this.cssClassName, g, f, k = a.config.useComputedState, k = void 0 === k || k, m = d.length - 1; 0 <= m; m--)
                        for (g = d[m].createIterator(), g.enlargeBr = b != CKEDITOR.ENTER_BR; f = g.getNextParagraph(b == CKEDITOR.ENTER_P ? "p" : "div");)
                            if (!f.isReadOnly()) {
                                f.removeAttribute("align");
                                f.removeStyle("text-align");
                                var l = e && (f.$.className = CKEDITOR.tools.ltrim(f.$.className.replace(this.cssClassRegex, ""))),
                                    p = this.state == CKEDITOR.TRISTATE_OFF && (!k || n(f, !0) != this.value);
                                e ? p ? f.addClass(e) : l || f.removeAttribute("class") : p && f.setStyle("text-align", this.value)
                            }
                    a.focus();
                    a.forceNextSelectionCheck();
                    c.selectBookmarks(h)
                }
            },
            refresh: function(a, c) {
                var b = c.block || c.blockLimit;
                this.setState("body" != b.getName() && n(b, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }
        };
        CKEDITOR.plugins.add("justify", {
            init: function(a) {
                if (!a.blockless) {
                    var c = new g(a, "justifyleft", "left"),
                        b = new g(a, "justifycenter", "center"),
                        h = new g(a, "justifyright", "right"),
                        d = new g(a, "justifyblock", "justify");
                    a.addCommand("justifyleft", c);
                    a.addCommand("justifycenter", b);
                    a.addCommand("justifyright", h);
                    a.addCommand("justifyblock", d);
                    a.ui.addButton && (a.ui.addButton("JustifyLeft", { label: a.lang.justify.left, command: "justifyleft", toolbar: "align,10" }), a.ui.addButton("JustifyCenter", {
                        label: a.lang.justify.center,
                        command: "justifycenter",
                        toolbar: "align,20"
                    }), a.ui.addButton("JustifyRight", { label: a.lang.justify.right, command: "justifyright", toolbar: "align,30" }), a.ui.addButton("JustifyBlock", { label: a.lang.justify.block, command: "justifyblock", toolbar: "align,40" }));
                    a.on("dirChanged", l)
                }
            }
        })
    })();
    CKEDITOR.plugins.add("menubutton", {
        requires: "button,menu",
        onLoad: function() {
            var d = function(c) {
                var a = this._,
                    b = a.menu;
                a.state !== CKEDITOR.TRISTATE_DISABLED && (a.on && b ? b.hide() : (a.previousState = a.state, b || (b = a.menu = new CKEDITOR.menu(c, { panel: { className: "cke_menu_panel", attributes: { "aria-label": c.lang.common.options } } }), b.onHide = CKEDITOR.tools.bind(function() {
                        var b = this.command ? c.getCommand(this.command).modes : this.modes;
                        this.setState(!b || b[c.mode] ? a.previousState : CKEDITOR.TRISTATE_DISABLED);
                        a.on = 0 }, this),
                    this.onMenu && b.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), a.on = 1, setTimeout(function() { b.show(CKEDITOR.document.getById(a.id), 4) }, 0)))
            };
            CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({ base: CKEDITOR.ui.button, $: function(c) { delete c.panel;
                    this.base(c);
                    this.hasArrow = !0;
                    this.click = d }, statics: { handler: { create: function(c) {
                            return new CKEDITOR.ui.menuButton(c) } } } })
        },
        beforeInit: function(d) { d.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler) }
    });
    CKEDITOR.UI_MENUBUTTON = "menubutton";
    (function() {
        CKEDITOR.plugins.add("language", {
            requires: "menubutton",
            init: function(a) {
                var b = a.config.language_list || ["ar:Arabic:rtl", "fr:French", "es:Spanish"],
                    c = this,
                    d = a.lang.language,
                    e = {},
                    g, h, k, f;
                a.addCommand("language", {
                    allowedContent: "span[!lang,!dir]",
                    requiredContent: "span[lang,dir]",
                    contextSensitive: !0,
                    exec: function(a, b) {
                        var c = e["language_" + b];
                        if (c) a[c.style.checkActive(a.elementPath(), a) ? "removeStyle" : "applyStyle"](c.style) },
                    refresh: function(a) {
                        this.setState(c.getCurrentLangElement(a) ? CKEDITOR.TRISTATE_ON :
                            CKEDITOR.TRISTATE_OFF)
                    }
                });
                for (f = 0; f < b.length; f++) g = b[f].split(":"), h = g[0], k = "language_" + h, e[k] = { label: g[1], langId: h, group: "language", order: f, ltr: "rtl" != ("" + g[2]).toLowerCase(), onClick: function() { a.execCommand("language", this.langId) }, role: "menuitemcheckbox" }, e[k].style = new CKEDITOR.style({ element: "span", attributes: { lang: h, dir: e[k].ltr ? "ltr" : "rtl" } });
                e.language_remove = {
                    label: d.remove,
                    group: "language_remove",
                    state: CKEDITOR.TRISTATE_DISABLED,
                    order: e.length,
                    onClick: function() {
                        var b = c.getCurrentLangElement(a);
                        b && a.execCommand("language", b.getAttribute("lang"))
                    }
                };
                a.addMenuGroup("language", 1);
                a.addMenuGroup("language_remove");
                a.addMenuItems(e);
                a.ui.add("Language", CKEDITOR.UI_MENUBUTTON, {
                    label: d.button,
                    allowedContent: "span[!lang,!dir]",
                    requiredContent: "span[lang,dir]",
                    toolbar: "bidi,30",
                    command: "language",
                    onMenu: function() {
                        var b = {},
                            d = c.getCurrentLangElement(a),
                            f;
                        for (f in e) b[f] = CKEDITOR.TRISTATE_OFF;
                        b.language_remove = d ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                        d && (b["language_" + d.getAttribute("lang")] =
                            CKEDITOR.TRISTATE_ON);
                        return b
                    }
                })
            },
            getCurrentLangElement: function(a) {
                var b = a.elementPath();
                a = b && b.elements;
                var c;
                if (b)
                    for (var d = 0; d < a.length; d++) b = a[d], !c && "span" == b.getName() && b.hasAttribute("dir") && b.hasAttribute("lang") && (c = b);
                return c }
        })
    })();
    (function() {
        function p(c) {
            return c.replace(/'/g, "\\$\x26") }

        function q(c) {
            for (var b, a = c.length, f = [], e = 0; e < a; e++) b = c.charCodeAt(e), f.push(b);
            return "String.fromCharCode(" + f.join(",") + ")" }

        function r(c, b) {
            var a = c.plugins.link,
                f = a.compiledProtectionFunction.params,
                e, d;
            d = [a.compiledProtectionFunction.name, "("];
            for (var g = 0; g < f.length; g++) a = f[g].toLowerCase(), e = b[a], 0 < g && d.push(","), d.push("'", e ? p(encodeURIComponent(b[a])) : "", "'");
            d.push(")");
            return d.join("") }

        function n(c) {
            c = c.config.emailProtection || "";
            var b;
            c && "encode" != c && (b = {}, c.replace(/^([^(]+)\(([^)]+)\)$/, function(a, c, e) { b.name = c;
                b.params = [];
                e.replace(/[^,\s]+/g, function(a) { b.params.push(a) }) }));
            return b
        }
        CKEDITOR.plugins.add("link", {
            requires: "dialog,fakeobjects",
            onLoad: function() {
                function c(b) {
                    return a.replace(/%1/g, "rtl" == b ? "right" : "left").replace(/%2/g, "cke_contents_" + b) }
                var b = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",
                    a = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + b + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";
                CKEDITOR.addCss(c("ltr") + c("rtl"))
            },
            init: function(c) {
                var b = "a[!href]";
                CKEDITOR.dialog.isTabEnabled(c, "link", "advanced") && (b = b.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)"));
                CKEDITOR.dialog.isTabEnabled(c, "link", "target") &&
                    (b = b.replace("]", ",target,onclick]"));
                c.addCommand("link", new CKEDITOR.dialogCommand("link", { allowedContent: b, requiredContent: "a[href]" }));
                c.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", { allowedContent: "a[!name,id]", requiredContent: "a[name]" }));
                c.addCommand("unlink", new CKEDITOR.unlinkCommand);
                c.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
                c.setKeystroke(CKEDITOR.CTRL + 76, "link");
                c.ui.addButton && (c.ui.addButton("Link", { label: c.lang.link.toolbar, command: "link", toolbar: "links,10" }),
                    c.ui.addButton("Unlink", { label: c.lang.link.unlink, command: "unlink", toolbar: "links,20" }), c.ui.addButton("Anchor", { label: c.lang.link.anchor.toolbar, command: "anchor", toolbar: "links,30" }));
                CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
                CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js");
                c.on("doubleclick", function(a) {
                    var b = CKEDITOR.plugins.link.getSelectedLink(c) || a.data.element;
                    b.isReadOnly() || (b.is("a") ? (a.data.dialog = !b.getAttribute("name") || b.getAttribute("href") && b.getChildCount() ?
                        "link" : "anchor", a.data.link = b) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, b) && (a.data.dialog = "anchor"))
                }, null, null, 0);
                c.on("doubleclick", function(a) { a.data.dialog in { link: 1, anchor: 1 } && a.data.link && c.getSelection().selectElement(a.data.link) }, null, null, 20);
                c.addMenuItems && c.addMenuItems({
                    anchor: { label: c.lang.link.anchor.menu, command: "anchor", group: "anchor", order: 1 },
                    removeAnchor: { label: c.lang.link.anchor.remove, command: "removeAnchor", group: "anchor", order: 5 },
                    link: {
                        label: c.lang.link.menu,
                        command: "link",
                        group: "link",
                        order: 1
                    },
                    unlink: { label: c.lang.link.unlink, command: "unlink", group: "link", order: 5 }
                });
                c.contextMenu && c.contextMenu.addListener(function(a) {
                    if (!a || a.isReadOnly()) return null;
                    a = CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, a);
                    if (!a && !(a = CKEDITOR.plugins.link.getSelectedLink(c))) return null;
                    var b = {};
                    a.getAttribute("href") && a.getChildCount() && (b = { link: CKEDITOR.TRISTATE_OFF, unlink: CKEDITOR.TRISTATE_OFF });
                    a && a.hasAttribute("name") && (b.anchor = b.removeAnchor = CKEDITOR.TRISTATE_OFF);
                    return b });
                this.compiledProtectionFunction =
                    n(c)
            },
            afterInit: function(c) { c.dataProcessor.dataFilter.addRules({ elements: { a: function(a) {
                            return a.attributes.name ? a.children.length ? null : c.createFakeParserElement(a, "cke_anchor", "anchor") : null } } });
                var b = c._.elementsPath && c._.elementsPath.filters;
                b && b.push(function(a, b) {
                    if ("a" == b && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, a) || a.getAttribute("name") && (!a.getAttribute("href") || !a.getChildCount()))) return "anchor" }) }
        });
        var t = /^javascript:/,
            u = /^mailto:([^?]+)(?:\?(.+))?$/,
            v = /subject=([^;?:@&=$,\/]*)/i,
            w = /body=([^;?:@&=$,\/]*)/i,
            x = /^#(.*)$/,
            y = /^((?:http|https|ftp|news):\/\/)?(.*)$/,
            z = /^(_(?:self|top|parent|blank))$/,
            A = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,
            B = /^javascript:([^(]+)\(([^)]+)\)$/,
            C = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,
            D = /(?:^|,)([^=]+)=(\d+|yes|no)/gi,
            m = {
                id: "advId",
                dir: "advLangDir",
                accessKey: "advAccessKey",
                name: "advName",
                lang: "advLangCode",
                tabindex: "advTabIndex",
                title: "advTitle",
                type: "advContentType",
                "class": "advCSSClasses",
                charset: "advCharset",
                style: "advStyles",
                rel: "advRel"
            };
        CKEDITOR.plugins.link = {
            getSelectedLink: function(c) {
                var b = c.getSelection(),
                    a = b.getSelectedElement();
                return a && a.is("a") ? a : (b = b.getRanges()[0]) ? (b.shrink(CKEDITOR.SHRINK_TEXT), c.elementPath(b.getCommonAncestor()).contains("a", 1)) : null },
            getEditorAnchors: function(c) {
                for (var b = c.editable(), a = b.isInline() && !c.plugins.divarea ? c.document : b, b = a.getElementsByTag("a"), a = a.getElementsByTag("img"),
                        f = [], e = 0, d; d = b.getItem(e++);)(d.data("cke-saved-name") || d.hasAttribute("name")) && f.push({ name: d.data("cke-saved-name") || d.getAttribute("name"), id: d.getAttribute("id") });
                for (e = 0; d = a.getItem(e++);)(d = this.tryRestoreFakeAnchor(c, d)) && f.push({ name: d.getAttribute("name"), id: d.getAttribute("id") });
                return f
            },
            fakeAnchor: !0,
            tryRestoreFakeAnchor: function(c, b) {
                if (b && b.data("cke-real-element-type") && "anchor" == b.data("cke-real-element-type")) {
                    var a = c.restoreRealElement(b);
                    if (a.data("cke-saved-name")) return a } },
            parseLinkAttributes: function(c, b) {
                var a = b && (b.data("cke-saved-href") || b.getAttribute("href")) || "",
                    f = c.plugins.link.compiledProtectionFunction,
                    e = c.config.emailProtection,
                    d, g = {};
                a.match(t) && ("encode" == e ? a = a.replace(A, function(a, b, c) { c = c || "";
                    return "mailto:" + String.fromCharCode.apply(String, b.split(",")) + c.replace(/\\'/g, "'") }) : e && a.replace(B, function(a, b, c) {
                    if (b == f.name) {
                        g.type = "email";
                        a = g.email = {};
                        b = /(^')|('$)/g;
                        c = c.match(/[^,\s]+/g);
                        for (var d = c.length, e, h, k = 0; k < d; k++) e = decodeURIComponent, h = c[k].replace(b,
                            "").replace(/\\'/g, "'"), h = e(h), e = f.params[k].toLowerCase(), a[e] = h;
                        a.address = [a.name, a.domain].join("@")
                    }
                }));
                if (!g.type)
                    if (e = a.match(x)) g.type = "anchor", g.anchor = {}, g.anchor.name = g.anchor.id = e[1];
                    else if (e = a.match(u)) { d = a.match(v);
                    a = a.match(w);
                    g.type = "email";
                    var k = g.email = {};
                    k.address = e[1];
                    d && (k.subject = decodeURIComponent(d[1]));
                    a && (k.body = decodeURIComponent(a[1])) } else a && (d = a.match(y)) && (g.type = "url", g.url = {}, g.url.protocol = d[1], g.url.url = d[2]);
                if (b) {
                    if (a = b.getAttribute("target")) g.target = {
                        type: a.match(z) ?
                            a : "frame",
                        name: a
                    };
                    else if (a = (a = b.data("cke-pa-onclick") || b.getAttribute("onclick")) && a.match(C))
                        for (g.target = { type: "popup", name: a[1] }; e = D.exec(a[2]);) "yes" != e[2] && "1" != e[2] || e[1] in { height: 1, width: 1, top: 1, left: 1 } ? isFinite(e[2]) && (g.target[e[1]] = e[2]) : g.target[e[1]] = !0;
                    null !== b.getAttribute("download") && (g.download = !0);
                    var a = {},
                        h;
                    for (h in m)(e = b.getAttribute(h)) && (a[m[h]] = e);
                    if (h = b.data("cke-saved-name") || a.advName) a.advName = h;
                    CKEDITOR.tools.isEmpty(a) || (g.advanced = a)
                }
                return g
            },
            getLinkAttributes: function(c,
                b) {
                var a = c.config.emailProtection || "",
                    f = {};
                switch (b.type) {
                    case "url":
                        var a = b.url && void 0 !== b.url.protocol ? b.url.protocol : "http://",
                            e = b.url && CKEDITOR.tools.trim(b.url.url) || "";
                        f["data-cke-saved-href"] = 0 === e.indexOf("/") ? e : a + e;
                        break;
                    case "anchor":
                        a = b.anchor && b.anchor.id;
                        f["data-cke-saved-href"] = "#" + (b.anchor && b.anchor.name || a || "");
                        break;
                    case "email":
                        var d = b.email,
                            e = d.address;
                        switch (a) {
                            case "":
                            case "encode":
                                var g = encodeURIComponent(d.subject || ""),
                                    k = encodeURIComponent(d.body || ""),
                                    d = [];
                                g && d.push("subject\x3d" +
                                    g);
                                k && d.push("body\x3d" + k);
                                d = d.length ? "?" + d.join("\x26") : "";
                                "encode" == a ? (a = ["javascript:void(location.href\x3d'mailto:'+", q(e)], d && a.push("+'", p(d), "'"), a.push(")")) : a = ["mailto:", e, d];
                                break;
                            default:
                                a = e.split("@", 2), d.name = a[0], d.domain = a[1], a = ["javascript:", r(c, d)]
                        }
                        f["data-cke-saved-href"] = a.join("")
                }
                if (b.target)
                    if ("popup" == b.target.type) {
                        for (var a = ["window.open(this.href, '", b.target.name || "", "', '"], h = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "), e = h.length,
                                g = function(a) { b.target[a] && h.push(a + "\x3d" + b.target[a]) }, d = 0; d < e; d++) h[d] += b.target[h[d]] ? "\x3dyes" : "\x3dno";
                        g("width");
                        g("left");
                        g("height");
                        g("top");
                        a.push(h.join(","), "'); return false;");
                        f["data-cke-pa-onclick"] = a.join("")
                    } else "notSet" != b.target.type && b.target.name && (f.target = b.target.name);
                b.download && (f.download = "");
                if (b.advanced) {
                    for (var l in m)(a = b.advanced[m[l]]) && (f[l] = a);
                    f.name && (f["data-cke-saved-name"] = f.name) }
                f["data-cke-saved-href"] && (f.href = f["data-cke-saved-href"]);
                l = {
                    target: 1,
                    onclick: 1,
                    "data-cke-pa-onclick": 1,
                    "data-cke-saved-name": 1,
                    download: 1
                };
                b.advanced && CKEDITOR.tools.extend(l, m);
                for (var n in f) delete l[n];
                return { set: f, removed: CKEDITOR.tools.objectKeys(l) }
            },
            showDisplayTextForElement: function(c, b) {
                var a = { img: 1, table: 1, tbody: 1, thead: 1, tfoot: 1, input: 1, select: 1, textarea: 1 };
                return b.widgets && b.widgets.focused ? !1 : !c || !c.getName || !c.is(a) }
        };
        CKEDITOR.unlinkCommand = function() {};
        CKEDITOR.unlinkCommand.prototype = {
            exec: function(c) {
                var b = new CKEDITOR.style({
                    element: "a",
                    type: CKEDITOR.STYLE_INLINE,
                    alwaysRemoveElement: 1
                });
                c.removeStyle(b)
            },
            refresh: function(c, b) {
                var a = b.lastElement && b.lastElement.getAscendant("a", !0);
                a && "a" == a.getName() && a.getAttribute("href") && a.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED) },
            contextSensitive: 1,
            startDisabled: 1,
            requiredContent: "a[href]"
        };
        CKEDITOR.removeAnchorCommand = function() {};
        CKEDITOR.removeAnchorCommand.prototype = {
            exec: function(c) {
                var b = c.getSelection(),
                    a = b.createBookmarks(),
                    f;
                if (b && (f = b.getSelectedElement()) &&
                    (f.getChildCount() ? f.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, f))) f.remove(1);
                else if (f = CKEDITOR.plugins.link.getSelectedLink(c)) f.hasAttribute("href") ? (f.removeAttributes({ name: 1, "data-cke-saved-name": 1 }), f.removeClass("cke_anchor")) : f.remove(1);
                b.selectBookmarks(a)
            },
            requiredContent: "a[name]"
        };
        CKEDITOR.tools.extend(CKEDITOR.config, { linkShowAdvancedTab: !0, linkShowTargetTab: !0 })
    })();
    (function() {
        function I(b, m, e) {
            function c(c) {
                if (!(!(a = d[c ? "getFirst" : "getLast"]()) || a.is && a.isBlockBoundary() || !(p = m.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || p.is && p.isBlockBoundary({ br: 1 }))) b.document.createElement("br")[c ? "insertBefore" : "insertAfter"](a) }
            for (var f = CKEDITOR.plugins.list.listToArray(m.root, e), g = [], k = 0; k < m.contents.length; k++) {
                var h = m.contents[k];
                (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (g.push(h), CKEDITOR.dom.element.setMarker(e,
                    h, "list_item_processed", !0))
            }
            h = null;
            for (k = 0; k < g.length; k++) h = g[k].getCustomData("listarray_index"), f[h].indent = -1;
            for (k = h + 1; k < f.length; k++)
                if (f[k].indent > f[k - 1].indent + 1) { g = f[k - 1].indent + 1 - f[k].indent;
                    for (h = f[k].indent; f[k] && f[k].indent >= h;) f[k].indent += g, k++;
                    k-- }
            var d = CKEDITOR.plugins.list.arrayToList(f, e, null, b.config.enterMode, m.root.getAttribute("dir")).listNode,
                a, p;
            c(!0);
            c();
            d.replace(m.root);
            b.fire("contentDomInvalidated")
        }

        function B(b, m) {
            this.name = b;
            this.context = this.type = m;
            this.allowedContent =
                m + " li";
            this.requiredContent = m
        }

        function E(b, m, e, c) {
            for (var f, g; f = b[c ? "getLast" : "getFirst"](J);)(g = f.getDirection(1)) !== m.getDirection(1) && f.setAttribute("dir", g), f.remove(), e ? f[c ? "insertBefore" : "insertAfter"](e) : m.append(f, c) }

        function F(b) {
            function m(e) {
                var c = b[e ? "getPrevious" : "getNext"](u);
                c && c.type == CKEDITOR.NODE_ELEMENT && c.is(b.getName()) && (E(b, c, null, !e), b.remove(), b = c) }
            m();
            m(1) }

        function G(b) {
            return b.type == CKEDITOR.NODE_ELEMENT && (b.getName() in CKEDITOR.dtd.$block || b.getName() in CKEDITOR.dtd.$listItem) &&
                CKEDITOR.dtd[b.getName()]["#"]
        }

        function C(b, m, e) {
            b.fire("saveSnapshot");
            e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
            var c = e.extractContents();
            m.trim(!1, !0);
            var f = m.createBookmark(),
                g = new CKEDITOR.dom.elementPath(m.startContainer),
                k = g.block,
                g = g.lastElement.getAscendant("li", 1) || k,
                h = new CKEDITOR.dom.elementPath(e.startContainer),
                d = h.contains(CKEDITOR.dtd.$listItem),
                h = h.contains(CKEDITOR.dtd.$list);
            k ? (k = k.getBogus()) && k.remove() : h && (k = h.getPrevious(u)) && z(k) && k.remove();
            (k = c.getLast()) && k.type == CKEDITOR.NODE_ELEMENT &&
                k.is("br") && k.remove();
            (k = m.startContainer.getChild(m.startOffset)) ? c.insertBefore(k): m.startContainer.append(c);
            d && (c = A(d)) && (g.contains(d) ? (E(c, d.getParent(), d), c.remove()) : g.append(c));
            for (; e.checkStartOfBlock() && e.checkEndOfBlock();) { h = e.startPath();
                c = h.block;
                if (!c) break;
                c.is("li") && (g = c.getParent(), c.equals(g.getLast(u)) && c.equals(g.getFirst(u)) && (c = g));
                e.moveToPosition(c, CKEDITOR.POSITION_BEFORE_START);
                c.remove() }
            e = e.clone();
            c = b.editable();
            e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
            e = new CKEDITOR.dom.walker(e);
            e.evaluator = function(a) {
                return u(a) && !z(a) };
            (e = e.next()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$list && F(e);
            m.moveToBookmark(f);
            m.select();
            b.fire("saveSnapshot")
        }

        function A(b) {
            return (b = b.getLast(u)) && b.type == CKEDITOR.NODE_ELEMENT && b.getName() in v ? b : null }
        var v = { ol: 1, ul: 1 },
            K = CKEDITOR.dom.walker.whitespaces(),
            H = CKEDITOR.dom.walker.bookmark(),
            u = function(b) {
                return !(K(b) || H(b)) },
            z = CKEDITOR.dom.walker.bogus();
        CKEDITOR.plugins.list = {
            listToArray: function(b, m, e, c, f) {
                if (!v[b.getName()]) return [];
                c || (c = 0);
                e || (e = []);
                for (var g = 0, k = b.getChildCount(); g < k; g++) {
                    var h = b.getChild(g);
                    h.type == CKEDITOR.NODE_ELEMENT && h.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(h, m, e, c + 1);
                    if ("li" == h.$.nodeName.toLowerCase()) {
                        var d = { parent: b, indent: c, element: h, contents: [] };
                        f ? d.grandparent = f : (d.grandparent = b.getParent(), d.grandparent && "li" == d.grandparent.$.nodeName.toLowerCase() && (d.grandparent = d.grandparent.getParent()));
                        m && CKEDITOR.dom.element.setMarker(m, h, "listarray_index", e.length);
                        e.push(d);
                        for (var a = 0, p = h.getChildCount(), l; a < p; a++) l = h.getChild(a), l.type == CKEDITOR.NODE_ELEMENT && v[l.getName()] ? CKEDITOR.plugins.list.listToArray(l, m, e, c + 1, d.grandparent) : d.contents.push(l)
                    }
                }
                return e
            },
            arrayToList: function(b, m, e, c, f) {
                e || (e = 0);
                if (!b || b.length < e + 1) return null;
                for (var g, k = b[e].parent.getDocument(), h = new CKEDITOR.dom.documentFragment(k), d = null, a = e, p = Math.max(b[e].indent, 0), l = null, q, n, t = c == CKEDITOR.ENTER_P ? "p" : "div";;) {
                    var r = b[a];
                    g = r.grandparent;
                    q = r.element.getDirection(1);
                    if (r.indent == p) {
                        d && b[a].parent.getName() ==
                            d.getName() || (d = b[a].parent.clone(!1, 1), f && d.setAttribute("dir", f), h.append(d));
                        l = d.append(r.element.clone(0, 1));
                        q != d.getDirection(1) && l.setAttribute("dir", q);
                        for (g = 0; g < r.contents.length; g++) l.append(r.contents[g].clone(1, 1));
                        a++
                    } else if (r.indent == Math.max(p, 0) + 1) r = b[a - 1].element.getDirection(1), a = CKEDITOR.plugins.list.arrayToList(b, null, a, c, r != q ? q : null), !l.getChildCount() && CKEDITOR.env.needsNbspFiller && 7 >= k.$.documentMode && l.append(k.createText(" ")), l.append(a.listNode), a = a.nextIndex;
                    else if (-1 ==
                        r.indent && !e && g) {
                        v[g.getName()] ? (l = r.element.clone(!1, !0), q != g.getDirection(1) && l.setAttribute("dir", q)) : l = new CKEDITOR.dom.documentFragment(k);
                        var d = g.getDirection(1) != q,
                            y = r.element,
                            D = y.getAttribute("class"),
                            z = y.getAttribute("style"),
                            A = l.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (c != CKEDITOR.ENTER_BR || d || z || D),
                            w, B = r.contents.length,
                            x;
                        for (g = 0; g < B; g++)
                            if (w = r.contents[g], H(w) && 1 < B) A ? x = w.clone(1, 1) : l.append(w.clone(1, 1));
                            else if (w.type == CKEDITOR.NODE_ELEMENT && w.isBlockBoundary()) {
                            d && !w.getDirection() &&
                                w.setAttribute("dir", q);
                            n = w;
                            var C = y.getAttribute("style");
                            C && n.setAttribute("style", C.replace(/([^;])$/, "$1;") + (n.getAttribute("style") || ""));
                            D && w.addClass(D);
                            n = null;
                            x && (l.append(x), x = null);
                            l.append(w.clone(1, 1))
                        } else A ? (n || (n = k.createElement(t), l.append(n), d && n.setAttribute("dir", q)), z && n.setAttribute("style", z), D && n.setAttribute("class", D), x && (n.append(x), x = null), n.append(w.clone(1, 1))) : l.append(w.clone(1, 1));
                        x && ((n || l).append(x), x = null);
                        l.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && a != b.length - 1 && (CKEDITOR.env.needsBrFiller &&
                            (q = l.getLast()) && q.type == CKEDITOR.NODE_ELEMENT && q.is("br") && q.remove(), (q = l.getLast(u)) && q.type == CKEDITOR.NODE_ELEMENT && q.is(CKEDITOR.dtd.$block) || l.append(k.createElement("br")));
                        q = l.$.nodeName.toLowerCase();
                        "div" != q && "p" != q || l.appendBogus();
                        h.append(l);
                        d = null;
                        a++
                    } else return null;
                    n = null;
                    if (b.length <= a || Math.max(b[a].indent, 0) < p) break
                }
                if (m)
                    for (b = h.getFirst(); b;) {
                        if (b.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(m, b), b.getName() in CKEDITOR.dtd.$listItem && (e = b, k = f = c = void 0, c = e.getDirection()))) {
                            for (f =
                                e.getParent(); f && !(k = f.getDirection());) f = f.getParent();
                            c == k && e.removeAttribute("dir")
                        }
                        b = b.getNextSourceNode()
                    }
                return { listNode: h, nextIndex: a }
            }
        };
        var L = /^h[1-6]$/,
            J = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
        B.prototype = {
            exec: function(b) {
                this.refresh(b, b.elementPath());
                var m = b.config,
                    e = b.getSelection(),
                    c = e && e.getRanges();
                if (this.state == CKEDITOR.TRISTATE_OFF) {
                    var f = b.editable();
                    if (f.getFirst(u)) {
                        var g = 1 == c.length && c[0];
                        (m = g && g.getEnclosedNode()) && m.is && this.type == m.getName() && this.setState(CKEDITOR.TRISTATE_ON) } else m.enterMode ==
                        CKEDITOR.ENTER_BR ? f.appendBogus() : c[0].fixBlock(1, m.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), e.selectRanges(c)
                }
                for (var m = e.createBookmarks(!0), f = [], k = {}, c = c.createIterator(), h = 0;
                    (g = c.getNextRange()) && ++h;) {
                    var d = g.getBoundaryNodes(),
                        a = d.startNode,
                        p = d.endNode;
                    a.type == CKEDITOR.NODE_ELEMENT && "td" == a.getName() && g.setStartAt(d.startNode, CKEDITOR.POSITION_AFTER_START);
                    p.type == CKEDITOR.NODE_ELEMENT && "td" == p.getName() && g.setEndAt(d.endNode, CKEDITOR.POSITION_BEFORE_END);
                    g = g.createIterator();
                    for (g.forceBrBreak =
                        this.state == CKEDITOR.TRISTATE_OFF; d = g.getNextParagraph();)
                        if (!d.getCustomData("list_block")) {
                            CKEDITOR.dom.element.setMarker(k, d, "list_block", 1);
                            for (var l = b.elementPath(d), a = l.elements, p = 0, l = l.blockLimit, q, n = a.length - 1; 0 <= n && (q = a[n]); n--)
                                if (v[q.getName()] && l.contains(q)) { l.removeCustomData("list_group_object_" + h);
                                    (a = q.getCustomData("list_group_object")) ? a.contents.push(d): (a = { root: q, contents: [d] }, f.push(a), CKEDITOR.dom.element.setMarker(k, q, "list_group_object", a));
                                    p = 1;
                                    break }
                            p || (p = l, p.getCustomData("list_group_object_" +
                                h) ? p.getCustomData("list_group_object_" + h).contents.push(d) : (a = { root: p, contents: [d] }, CKEDITOR.dom.element.setMarker(k, p, "list_group_object_" + h, a), f.push(a)))
                        }
                }
                for (q = []; 0 < f.length;)
                    if (a = f.shift(), this.state == CKEDITOR.TRISTATE_OFF)
                        if (v[a.root.getName()]) {
                            c = b;
                            h = a;
                            a = k;
                            g = q;
                            p = CKEDITOR.plugins.list.listToArray(h.root, a);
                            l = [];
                            for (d = 0; d < h.contents.length; d++) n = h.contents[d], (n = n.getAscendant("li", !0)) && !n.getCustomData("list_item_processed") && (l.push(n), CKEDITOR.dom.element.setMarker(a, n, "list_item_processed", !0));
                            for (var n = h.root.getDocument(), t = void 0, r = void 0, d = 0; d < l.length; d++) {
                                var y = l[d].getCustomData("listarray_index"),
                                    t = p[y].parent;
                                t.is(this.type) || (r = n.createElement(this.type), t.copyAttributes(r, { start: 1, type: 1 }), r.removeStyle("list-style-type"), p[y].parent = r) }
                            a = CKEDITOR.plugins.list.arrayToList(p, a, null, c.config.enterMode);
                            p = void 0;
                            l = a.listNode.getChildCount();
                            for (d = 0; d < l && (p = a.listNode.getChild(d)); d++) p.getName() == this.type && g.push(p);
                            a.listNode.replace(h.root);
                            c.fire("contentDomInvalidated")
                        } else {
                            p =
                                b;
                            g = a;
                            d = q;
                            l = g.contents;
                            c = g.root.getDocument();
                            h = [];
                            1 == l.length && l[0].equals(g.root) && (a = c.createElement("div"), l[0].moveChildren && l[0].moveChildren(a), l[0].append(a), l[0] = a);
                            g = g.contents[0].getParent();
                            for (n = 0; n < l.length; n++) g = g.getCommonAncestor(l[n].getParent());
                            t = p.config.useComputedState;
                            p = a = void 0;
                            t = void 0 === t || t;
                            for (n = 0; n < l.length; n++)
                                for (r = l[n]; y = r.getParent();) {
                                    if (y.equals(g)) { h.push(r);!p && r.getDirection() && (p = 1);
                                        r = r.getDirection(t);
                                        null !== a && (a = a && a != r ? null : r);
                                        break }
                                    r = y }
                            if (!(1 > h.length)) {
                                l =
                                    h[h.length - 1].getNext();
                                n = c.createElement(this.type);
                                d.push(n);
                                for (t = d = void 0; h.length;) d = h.shift(), t = c.createElement("li"), r = d, r.is("pre") || L.test(r.getName()) || "false" == r.getAttribute("contenteditable") ? d.appendTo(t) : (d.copyAttributes(t), a && d.getDirection() && (t.removeStyle("direction"), t.removeAttribute("dir")), d.moveChildren(t), d.remove()), t.appendTo(n);
                                a && p && n.setAttribute("dir", a);
                                l ? n.insertBefore(l) : n.appendTo(g)
                            }
                        }
                else this.state == CKEDITOR.TRISTATE_ON && v[a.root.getName()] && I.call(this, b, a, k);
                for (n = 0; n < q.length; n++) F(q[n]);
                CKEDITOR.dom.element.clearAllMarkers(k);
                e.selectBookmarks(m);
                b.focus()
            },
            refresh: function(b, m) {
                var e = m.contains(v, 1),
                    c = m.blockLimit || m.root;
                e && c.contains(e) ? this.setState(e.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF) }
        };
        CKEDITOR.plugins.add("list", {
            requires: "indentlist",
            init: function(b) {
                b.blockless || (b.addCommand("numberedlist", new B("numberedlist", "ol")), b.addCommand("bulletedlist", new B("bulletedlist", "ul")), b.ui.addButton &&
                    (b.ui.addButton("NumberedList", { label: b.lang.list.numberedlist, command: "numberedlist", directional: !0, toolbar: "list,10" }), b.ui.addButton("BulletedList", { label: b.lang.list.bulletedlist, command: "bulletedlist", directional: !0, toolbar: "list,20" })), b.on("key", function(m) {
                        var e = m.data.domEvent.getKey(),
                            c;
                        if ("wysiwyg" == b.mode && e in { 8: 1, 46: 1 }) {
                            var f = b.getSelection().getRanges()[0],
                                g = f && f.startPath();
                            if (f && f.collapsed) {
                                var k = 8 == e,
                                    h = b.editable(),
                                    d = new CKEDITOR.dom.walker(f.clone());
                                d.evaluator = function(a) {
                                    return u(a) &&
                                        !z(a)
                                };
                                d.guard = function(a, b) {
                                    return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) };
                                e = f.clone();
                                if (k) {
                                    var a;
                                    (a = g.contains(v)) && f.checkBoundaryOfElement(a, CKEDITOR.START) && (a = a.getParent()) && a.is("li") && (a = A(a)) ? (c = a, a = a.getPrevious(u), e.moveToPosition(a && z(a) ? a : c, CKEDITOR.POSITION_BEFORE_START)) : (d.range.setStartAt(h, CKEDITOR.POSITION_AFTER_START), d.range.setEnd(f.startContainer, f.startOffset), (a = d.previous()) && a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in v || a.is("li")) && (a.is("li") || (d.range.selectNodeContents(a),
                                        d.reset(), d.evaluator = G, a = d.previous()), c = a, e.moveToElementEditEnd(c), e.moveToPosition(e.endPath().block, CKEDITOR.POSITION_BEFORE_END)));
                                    if (c) C(b, e, f), m.cancel();
                                    else {
                                        var p = g.contains(v);
                                        p && f.checkBoundaryOfElement(p, CKEDITOR.START) && (c = p.getFirst(u), f.checkBoundaryOfElement(c, CKEDITOR.START) && (a = p.getPrevious(u), A(c) ? a && (f.moveToElementEditEnd(a), f.select()) : b.execCommand("outdent"), m.cancel())) }
                                } else if (c = g.contains("li")) {
                                    if (d.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), k = (h = c.getLast(u)) &&
                                        G(h) ? h : c, g = 0, (a = d.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in v && a.equals(h) ? (g = 1, a = d.next()) : f.checkBoundaryOfElement(k, CKEDITOR.END) && (g = 2), g && a) {
                                        f = f.clone();
                                        f.moveToElementEditStart(a);
                                        if (1 == g && (e.optimize(), !e.startContainer.equals(c))) {
                                            for (c = e.startContainer; c.is(CKEDITOR.dtd.$inline);) p = c, c = c.getParent();
                                            p && e.moveToPosition(p, CKEDITOR.POSITION_AFTER_END) }
                                        2 == g && (e.moveToPosition(e.endPath().block, CKEDITOR.POSITION_BEFORE_END), f.endPath().block && f.moveToPosition(f.endPath().block, CKEDITOR.POSITION_AFTER_START));
                                        C(b, e, f);
                                        m.cancel()
                                    }
                                } else d.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), (a = d.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.is(v) && (a = a.getFirst(u), g.block && f.checkStartOfBlock() && f.checkEndOfBlock() ? (g.block.remove(), f.moveToElementEditStart(a), f.select()) : A(a) ? (f.moveToElementEditStart(a), f.select()) : (f = f.clone(), f.moveToElementEditStart(a), C(b, e, f)), m.cancel());
                                setTimeout(function() { b.selectionChange(1) })
                            }
                        }
                    }))
            }
        })
    })();
    (function() {
        CKEDITOR.plugins.liststyle = {
            requires: "dialog,contextmenu",
            init: function(a) {
                if (!a.blockless) {
                    var b;
                    b = new CKEDITOR.dialogCommand("numberedListStyle", { requiredContent: "ol", allowedContent: "ol{list-style-type}[start]; li{list-style-type}[value]", contentTransformations: [
                            ["ol: listTypeToStyle"]
                        ] });
                    b = a.addCommand("numberedListStyle", b);
                    a.addFeature(b);
                    CKEDITOR.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js");
                    b = new CKEDITOR.dialogCommand("bulletedListStyle", {
                        requiredContent: "ul",
                        allowedContent: "ul{list-style-type}",
                        contentTransformations: [
                            ["ul: listTypeToStyle"]
                        ]
                    });
                    b = a.addCommand("bulletedListStyle", b);
                    a.addFeature(b);
                    CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js");
                    a.addMenuGroup("list", 108);
                    a.addMenuItems({ numberedlist: { label: a.lang.liststyle.numberedTitle, group: "list", command: "numberedListStyle" }, bulletedlist: { label: a.lang.liststyle.bulletedTitle, group: "list", command: "bulletedListStyle" } });
                    a.contextMenu.addListener(function(a) {
                        if (!a || a.isReadOnly()) return null;
                        for (; a;) {
                            var b = a.getName();
                            if ("ol" == b) return { numberedlist: CKEDITOR.TRISTATE_OFF };
                            if ("ul" == b) return { bulletedlist: CKEDITOR.TRISTATE_OFF };
                            a = a.getParent() }
                        return null
                    })
                }
            }
        };
        CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle)
    })();
    (function() {
        function V(a, c, d) {
            return n(c) && n(d) && d.equals(c.getNext(function(a) {
                return !(E(a) || F(a) || u(a)) })) }

        function z(a) { this.upper = a[0];
            this.lower = a[1];
            this.set.apply(this, a.slice(2)) }

        function O(a) {
            var c = a.element;
            if (c && n(c) && (c = c.getAscendant(a.triggers, !0)) && a.editable.contains(c)) {
                var d = P(c);
                if ("true" == d.getAttribute("contenteditable")) return c;
                if (d.is(a.triggers)) return d }
            return null }

        function ka(a, c, d) { r(a, c);
            r(a, d);
            a = c.size.bottom;
            d = d.size.top;
            return a && d ? 0 | (a + d) / 2 : a || d }

        function w(a, c, d) {
            return c =
                c[d ? "getPrevious" : "getNext"](function(b) {
                    return b && b.type == CKEDITOR.NODE_TEXT && !E(b) || n(b) && !u(b) && !A(a, b) })
        }

        function q(a, c, d) {
            return a > c && a < d }

        function P(a, c) {
            if (a.data("cke-editable")) return null;
            for (c || (a = a.getParent()); a && !a.data("cke-editable");) {
                if (a.hasAttribute("contenteditable")) return a;
                a = a.getParent() }
            return null }

        function la(a) {
            var c = a.doc,
                d = G('\x3cspan contenteditable\x3d"false" style\x3d"' + Q + "position:absolute;border-top:1px dashed " + a.boxColor + '"\x3e\x3c/span\x3e', c),
                b = CKEDITOR.getUrl(this.path +
                    "images/" + (t.hidpi ? "hidpi/" : "") + "icon" + (a.rtl ? "-rtl" : "") + ".png");
            v(d, {
                attach: function() { this.wrap.getParent() || this.wrap.appendTo(a.editable, !0);
                    return this },
                lineChildren: [v(G('\x3cspan title\x3d"' + a.editor.lang.magicline.title + '" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e', c), {
                    base: Q + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + b + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (t.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" :
                        "") + (t.hidpi ? "background-size: 9px 10px;" : ""),
                    looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;", "top:-1px; border-radius: 0px 0px 2px 2px;"]
                }), v(G(W, c), { base: X + "left:0px;border-left-color:" + a.boxColor + ";", looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"] }), v(G(W, c), {
                    base: X + "right:0px;border-right-color:" + a.boxColor + ";",
                    looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px",
                        "border-width:0 8px 8px 0;top:0px"
                    ]
                })],
                detach: function() { this.wrap.getParent() && this.wrap.remove();
                    return this },
                mouseNear: function() { r(a, this);
                    var b = a.holdDistance,
                        c = this.size;
                    return c && q(a.mouse.y, c.top - b, c.bottom + b) && q(a.mouse.x, c.left - b, c.right + b) ? !0 : !1 },
                place: function() {
                    var b = a.view,
                        c = a.editable,
                        d = a.trigger,
                        h = d.upper,
                        g = d.lower,
                        l = h || g,
                        p = l.getParent(),
                        m = {};
                    this.trigger = d;
                    h && r(a, h, !0);
                    g && r(a, g, !0);
                    r(a, p, !0);
                    a.inInlineMode && H(a, !0);
                    p.equals(c) ? (m.left = b.scroll.x, m.right = -b.scroll.x, m.width = "") : (m.left =
                        l.size.left - l.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0), m.width = l.size.outerWidth + l.size.margin.left + l.size.margin.right + b.scroll.x, m.right = "");
                    h && g ? m.top = h.size.margin.bottom === g.size.margin.top ? 0 | h.size.bottom + h.size.margin.bottom / 2 : h.size.margin.bottom < g.size.margin.top ? h.size.bottom + h.size.margin.bottom : h.size.bottom + h.size.margin.bottom - g.size.margin.top : h ? g || (m.top = h.size.bottom + h.size.margin.bottom) : m.top = g.size.top - g.size.margin.top;
                    d.is(C) || q(m.top,
                        b.scroll.y - 15, b.scroll.y + 5) ? (m.top = a.inInlineMode ? 0 : b.scroll.y, this.look(C)) : d.is(D) || q(m.top, b.pane.bottom - 5, b.pane.bottom + 15) ? (m.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1, this.look(D)) : (a.inInlineMode && (m.top -= b.editable.top + b.editable.border.top), this.look(x));
                    a.inInlineMode && (m.top--, m.top += b.editable.scroll.top, m.left += b.editable.scroll.left);
                    for (var n in m) m[n] = CKEDITOR.tools.cssLength(m[n]);
                    this.setStyles(m)
                },
                look: function(a) {
                    if (this.oldLook !=
                        a) {
                        for (var b = this.lineChildren.length, c; b--;)(c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]);
                        this.oldLook = a }
                },
                wrap: new R("span", a.doc)
            });
            for (c = d.lineChildren.length; c--;) d.lineChildren[c].appendTo(d);
            d.look(x);
            d.appendTo(d.wrap);
            d.unselectable();
            d.lineChildren[0].on("mouseup", function(b) {
                d.detach();
                S(a, function(b) {
                    var c = a.line.trigger;
                    b[c.is(I) ? "insertBefore" : "insertAfter"](c.is(I) ? c.lower : c.upper) }, !0);
                a.editor.focus();
                t.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView();
                b.data.preventDefault(!0)
            });
            d.on("mousedown", function(a) { a.data.preventDefault(!0) });
            a.line = d
        }

        function S(a, c, d) {
            var b = new CKEDITOR.dom.range(a.doc),
                e = a.editor,
                f;
            t.ie && a.enterMode == CKEDITOR.ENTER_BR ? f = a.doc.createText(J) : (f = (f = P(a.element, !0)) && f.data("cke-enter-mode") || a.enterMode, f = new R(K[f], a.doc), f.is("br") || a.doc.createText(J).appendTo(f));
            d && e.fire("saveSnapshot");
            c(f);
            b.moveToPosition(f, CKEDITOR.POSITION_AFTER_START);
            e.getSelection().selectRanges([b]);
            a.hotNode = f;
            d && e.fire("saveSnapshot") }

        function Y(a, c) {
            return {
                canUndo: !0,
                modes: { wysiwyg: 1 },
                exec: function() {
                    function d(b) {
                        var d = t.ie && 9 > t.version ? " " : J,
                            f = a.hotNode && a.hotNode.getText() == d && a.element.equals(a.hotNode) && a.lastCmdDirection === !!c;
                        S(a, function(d) { f && a.hotNode && a.hotNode.remove();
                            d[c ? "insertAfter" : "insertBefore"](b);
                            d.setAttributes({ "data-cke-magicline-hot": 1, "data-cke-magicline-dir": !!c });
                            a.lastCmdDirection = !!c });
                        t.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView();
                        a.line.detach() }
                    return function(b) {
                        b = b.getSelection().getStartElement();
                        var e;
                        b = b.getAscendant(Z, 1);
                        if (!aa(a, b) && b && !b.equals(a.editable) && !b.contains(a.editable)) {
                            (e = P(b)) && "false" == e.getAttribute("contenteditable") && (b = e);
                            a.element = b;
                            e = w(a, b, !c);
                            var f;
                            n(e) && e.is(a.triggers) && e.is(ma) && (!w(a, e, !c) || (f = w(a, e, !c)) && n(f) && f.is(a.triggers)) ? d(e) : (f = O(a, b), n(f) && (w(a, f, !c) ? (b = w(a, f, !c)) && n(b) && b.is(a.triggers) && d(f) : d(f))) }
                    }
                }()
            }
        }

        function A(a, c) {
            if (!c || c.type != CKEDITOR.NODE_ELEMENT || !c.$) return !1;
            var d = a.line;
            return d.wrap.equals(c) || d.wrap.contains(c) }

        function n(a) {
            return a &&
                a.type == CKEDITOR.NODE_ELEMENT && a.$
        }

        function u(a) {
            if (!n(a)) return !1;
            var c;
            (c = ba(a)) || (n(a) ? (c = { left: 1, right: 1, center: 1 }, c = !(!c[a.getComputedStyle("float")] && !c[a.getAttribute("align")])) : c = !1);
            return c }

        function ba(a) {
            return !!{ absolute: 1, fixed: 1 }[a.getComputedStyle("position")] }

        function L(a, c) {
            return n(c) ? c.is(a.triggers) : null }

        function aa(a, c) {
            if (!c) return !1;
            for (var d = c.getParents(1), b = d.length; b--;)
                for (var e = a.tabuList.length; e--;)
                    if (d[b].hasAttribute(a.tabuList[e])) return !0;
            return !1 }

        function na(a,
            c, d) { c = c[d ? "getLast" : "getFirst"](function(b) {
                return a.isRelevant(b) && !b.is(oa) });
            if (!c) return !1;
            r(a, c);
            return d ? c.size.top > a.mouse.y : c.size.bottom < a.mouse.y }

        function ca(a) {
            var c = a.editable,
                d = a.mouse,
                b = a.view,
                e = a.triggerOffset;
            H(a);
            var f = d.y > (a.inInlineMode ? b.editable.top + b.editable.height / 2 : Math.min(b.editable.height, b.pane.height) / 2),
                c = c[f ? "getLast" : "getFirst"](function(a) {
                    return !(E(a) || F(a)) });
            if (!c) return null;
            A(a, c) && (c = a.line.wrap[f ? "getPrevious" : "getNext"](function(a) {
                return !(E(a) || F(a)) }));
            if (!n(c) || u(c) || !L(a, c)) return null;
            r(a, c);
            return !f && 0 <= c.size.top && q(d.y, 0, c.size.top + e) ? (a = a.inInlineMode || 0 === b.scroll.y ? C : x, new z([null, c, I, M, a])) : f && c.size.bottom <= b.pane.height && q(d.y, c.size.bottom - e, b.pane.height) ? (a = a.inInlineMode || q(c.size.bottom, b.pane.height - e, b.pane.height) ? D : x, new z([c, null, da, M, a])) : null
        }

        function ea(a) {
            var c = a.mouse,
                d = a.view,
                b = a.triggerOffset,
                e = O(a);
            if (!e) return null;
            r(a, e);
            var b = Math.min(b, 0 | e.size.outerHeight / 2),
                f = [],
                k, h;
            if (q(c.y, e.size.top - 1, e.size.top + b)) h = !1;
            else if (q(c.y,
                    e.size.bottom - b, e.size.bottom + 1)) h = !0;
            else return null;
            if (u(e) || na(a, e, h) || e.getParent().is(fa)) return null;
            var g = w(a, e, !h);
            if (g) {
                if (g && g.type == CKEDITOR.NODE_TEXT) return null;
                if (n(g)) {
                    if (u(g) || !L(a, g) || g.getParent().is(fa)) return null;
                    f = [g, e][h ? "reverse" : "concat"]().concat([T, M]) } } else e.equals(a.editable[h ? "getLast" : "getFirst"](a.isRelevant)) ? (H(a), h && q(c.y, e.size.bottom - b, d.pane.height) && q(e.size.bottom, d.pane.height - b, d.pane.height) ? k = D : q(c.y, 0, e.size.top + b) && (k = C)) : k = x, f = [null, e][h ? "reverse" :
                "concat"
            ]().concat([h ? da : I, M, k, e.equals(a.editable[h ? "getLast" : "getFirst"](a.isRelevant)) ? h ? D : C : x]);
            return 0 in f ? new z(f) : null
        }

        function U(a, c, d, b) {
            for (var e = c.getDocumentPosition(), f = {}, k = {}, h = {}, g = {}, l = y.length; l--;) f[y[l]] = parseInt(c.getComputedStyle.call(c, "border-" + y[l] + "-width"), 10) || 0, h[y[l]] = parseInt(c.getComputedStyle.call(c, "padding-" + y[l]), 10) || 0, k[y[l]] = parseInt(c.getComputedStyle.call(c, "margin-" + y[l]), 10) || 0;
            d && !b || N(a, b);
            g.top = e.y - (d ? 0 : a.view.scroll.y);
            g.left = e.x - (d ? 0 : a.view.scroll.x);
            g.outerWidth = c.$.offsetWidth;
            g.outerHeight = c.$.offsetHeight;
            g.height = g.outerHeight - (h.top + h.bottom + f.top + f.bottom);
            g.width = g.outerWidth - (h.left + h.right + f.left + f.right);
            g.bottom = g.top + g.outerHeight;
            g.right = g.left + g.outerWidth;
            a.inInlineMode && (g.scroll = { top: c.$.scrollTop, left: c.$.scrollLeft });
            return v({ border: f, padding: h, margin: k, ignoreScroll: d }, g, !0)
        }

        function r(a, c, d) {
            if (!n(c)) return c.size = null;
            if (!c.size) c.size = {};
            else if (c.size.ignoreScroll == d && c.size.date > new Date - ga) return null;
            return v(c.size,
                U(a, c, d), { date: +new Date }, !0)
        }

        function H(a, c) { a.view.editable = U(a, a.editable, c, !0) }

        function N(a, c) { a.view || (a.view = {});
            var d = a.view;
            if (!(!c && d && d.date > new Date - ga)) {
                var b = a.win,
                    d = b.getScrollPosition(),
                    b = b.getViewPaneSize();
                v(a.view, { scroll: { x: d.x, y: d.y, width: a.doc.$.documentElement.scrollWidth - b.width, height: a.doc.$.documentElement.scrollHeight - b.height }, pane: { width: b.width, height: b.height, bottom: b.height + d.y }, date: +new Date }, !0) } }

        function pa(a, c, d, b) {
            for (var e = b, f = b, k = 0, h = !1, g = !1, l = a.view.pane.height,
                    p = a.mouse; p.y + k < l && 0 < p.y - k;) { h || (h = c(e, b));
                g || (g = c(f, b));!h && 0 < p.y - k && (e = d(a, { x: p.x, y: p.y - k }));!g && p.y + k < l && (f = d(a, { x: p.x, y: p.y + k }));
                if (h && g) break;
                k += 2 }
            return new z([e, f, null, null])
        }
        CKEDITOR.plugins.add("magicline", {
            init: function(a) {
                var c = a.config,
                    d = c.magicline_triggerOffset || 30,
                    b = {
                        editor: a,
                        enterMode: c.enterMode,
                        triggerOffset: d,
                        holdDistance: 0 | d * (c.magicline_holdDistance || .5),
                        boxColor: c.magicline_color || "#ff0000",
                        rtl: "rtl" == c.contentsLangDirection,
                        tabuList: ["data-cke-hidden-sel"].concat(c.magicline_tabuList || []),
                        triggers: c.magicline_everywhere ? Z : { table: 1, hr: 1, div: 1, ul: 1, ol: 1, dl: 1, form: 1, blockquote: 1 }
                    },
                    e, f, k;
                b.isRelevant = function(a) {
                    return n(a) && !A(b, a) && !u(a) };
                a.on("contentDom", function() {
                    var d = a.editable(),
                        g = a.document,
                        l = a.window;
                    v(b, { editable: d, inInlineMode: d.isInline(), doc: g, win: l, hotNode: null }, !0);
                    b.boundary = b.inInlineMode ? b.editable : b.doc.getDocumentElement();
                    d.is(B.$inline) || (b.inInlineMode && !ba(d) && d.setStyles({ position: "relative", top: null, left: null }), la.call(this, b), N(b), d.attachListener(a, "beforeUndoImage",
                        function() { b.line.detach() }), d.attachListener(a, "beforeGetData", function() { b.line.wrap.getParent() && (b.line.detach(), a.once("getData", function() { b.line.attach() }, null, null, 1E3)) }, null, null, 0), d.attachListener(b.inInlineMode ? g : g.getWindow().getFrame(), "mouseout", function(c) {
                        if ("wysiwyg" == a.mode)
                            if (b.inInlineMode) {
                                var d = c.data.$.clientX;
                                c = c.data.$.clientY;
                                N(b);
                                H(b, !0);
                                var e = b.view.editable,
                                    f = b.view.scroll;
                                d > e.left - f.x && d < e.right - f.x && c > e.top - f.y && c < e.bottom - f.y || (clearTimeout(k), k = null, b.line.detach()) } else clearTimeout(k),
                                k = null, b.line.detach()
                    }), d.attachListener(d, "keyup", function() { b.hiddenMode = 0 }), d.attachListener(d, "keydown", function(c) {
                        if ("wysiwyg" == a.mode) switch (c.data.getKeystroke()) {
                            case 2228240:
                            case 16:
                                b.hiddenMode = 1, b.line.detach() } }), d.attachListener(b.inInlineMode ? d : g, "mousemove", function(c) {
                        f = !0;
                        if ("wysiwyg" == a.mode && !a.readOnly && !k) {
                            var d = { x: c.data.$.clientX, y: c.data.$.clientY };
                            k = setTimeout(function() {
                                b.mouse = d;
                                k = b.trigger = null;
                                N(b);
                                f && !b.hiddenMode && a.focusManager.hasFocus && !b.line.mouseNear() && (b.element =
                                    ha(b, !0)) && ((b.trigger = ca(b) || ea(b) || ia(b)) && !aa(b, b.trigger.upper || b.trigger.lower) ? b.line.attach().place() : (b.trigger = null, b.line.detach()), f = !1)
                            }, 30)
                        }
                    }), d.attachListener(l, "scroll", function() { "wysiwyg" == a.mode && (b.line.detach(), t.webkit && (b.hiddenMode = 1, clearTimeout(e), e = setTimeout(function() { b.mouseDown || (b.hiddenMode = 0) }, 50))) }), d.attachListener(ja ? g : l, "mousedown", function() { "wysiwyg" == a.mode && (b.line.detach(), b.hiddenMode = 1, b.mouseDown = 1) }), d.attachListener(ja ? g : l, "mouseup", function() {
                        b.hiddenMode =
                            0;
                        b.mouseDown = 0
                    }), a.addCommand("accessPreviousSpace", Y(b)), a.addCommand("accessNextSpace", Y(b, !0)), a.setKeystroke([
                        [c.magicline_keystrokePrevious, "accessPreviousSpace"],
                        [c.magicline_keystrokeNext, "accessNextSpace"]
                    ]), a.on("loadSnapshot", function() {
                        var c, d, e, f;
                        for (f in { p: 1, br: 1, div: 1 })
                            for (c = a.document.getElementsByTag(f), e = c.count(); e--;)
                                if ((d = c.getItem(e)).data("cke-magicline-hot")) { b.hotNode = d;
                                    b.lastCmdDirection = "true" === d.data("cke-magicline-dir") ? !0 : !1;
                                    return } }), this.backdoor = {
                        accessFocusSpace: S,
                        boxTrigger: z,
                        isLine: A,
                        getAscendantTrigger: O,
                        getNonEmptyNeighbour: w,
                        getSize: U,
                        that: b,
                        triggerEdge: ea,
                        triggerEditable: ca,
                        triggerExpand: ia
                    })
                }, this)
            }
        });
        var v = CKEDITOR.tools.extend,
            R = CKEDITOR.dom.element,
            G = R.createFromHtml,
            t = CKEDITOR.env,
            ja = CKEDITOR.env.ie && 9 > CKEDITOR.env.version,
            B = CKEDITOR.dtd,
            K = {},
            I = 128,
            da = 64,
            T = 32,
            M = 16,
            C = 4,
            D = 2,
            x = 1,
            J = " ",
            fa = B.$listItem,
            oa = B.$tableContent,
            ma = v({}, B.$nonEditable, B.$empty),
            Z = B.$block,
            ga = 100,
            Q = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",
            X = Q + "border-color:transparent;display:block;border-style:solid;",
            W = "\x3cspan\x3e" + J + "\x3c/span\x3e";
        K[CKEDITOR.ENTER_BR] = "br";
        K[CKEDITOR.ENTER_P] = "p";
        K[CKEDITOR.ENTER_DIV] = "div";
        z.prototype = { set: function(a, c, d) { this.properties = a + c + (d || x);
                return this }, is: function(a) {
                return (this.properties & a) == a } };
        var ha = function() {
                function a(a, d) {
                    var b = a.$.elementFromPoint(d.x, d.y);
                    return b && b.nodeType ? new CKEDITOR.dom.element(b) : null }
                return function(c, d, b) {
                    if (!c.mouse) return null;
                    var e = c.doc,
                        f = c.line.wrap;
                    b = b || c.mouse;
                    var k = a(e, b);
                    d && A(c, k) && (f.hide(), k = a(e, b), f.show());
                    return !k || k.type != CKEDITOR.NODE_ELEMENT || !k.$ || t.ie && 9 > t.version && !c.boundary.equals(k) && !c.boundary.contains(k) ? null : k
                }
            }(),
            E = CKEDITOR.dom.walker.whitespaces(),
            F = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),
            ia = function() {
                function a(a) {
                    var b = a.element,
                        e, f, k;
                    if (!n(b) || b.contains(a.editable) || b.isReadOnly()) return null;
                    k = pa(a, function(a, b) {
                        return !b.equals(a) }, function(a, b) {
                        return ha(a, !0, b) }, b);
                    e = k.upper;
                    f = k.lower;
                    if (V(a, e, f)) return k.set(T,
                        8);
                    if (e && b.contains(e))
                        for (; !e.getParent().equals(b);) e = e.getParent();
                    else e = b.getFirst(function(b) {
                        return c(a, b) });
                    if (f && b.contains(f))
                        for (; !f.getParent().equals(b);) f = f.getParent();
                    else f = b.getLast(function(b) {
                        return c(a, b) });
                    if (!e || !f) return null;
                    r(a, e);
                    r(a, f);
                    if (!q(a.mouse.y, e.size.top, f.size.bottom)) return null;
                    for (var b = Number.MAX_VALUE, h, g, l, p; f && !f.equals(e) && (g = e.getNext(a.isRelevant));) h = Math.abs(ka(a, e, g) - a.mouse.y), h < b && (b = h, l = e, p = g), e = g, r(a, e);
                    if (!l || !p || !q(a.mouse.y, l.size.top, p.size.bottom)) return null;
                    k.upper = l;
                    k.lower = p;
                    return k.set(T, 8)
                }

                function c(a, b) {
                    return !(b && b.type == CKEDITOR.NODE_TEXT || F(b) || u(b) || A(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br")) }
                return function(c) {
                    var b = a(c),
                        e;
                    if (e = b) { e = b.upper;
                        var f = b.lower;
                        e = !e || !f || u(f) || u(e) || f.equals(e) || e.equals(f) || f.contains(e) || e.contains(f) ? !1 : L(c, e) && L(c, f) && V(c, e, f) ? !0 : !1 }
                    return e ? b : null }
            }(),
            y = ["top", "left", "right", "bottom"]
    })();
    CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51;
    CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52;
    (function() {
        function n(a) {
            if (!a || a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName()) return [];
            for (var e = [], f = ["style", "className"], b = 0; b < f.length; b++) {
                var c = a.$.elements.namedItem(f[b]);
                c && (c = new CKEDITOR.dom.element(c), e.push([c, c.nextSibling]), c.remove()) }
            return e }

        function t(a, e) {
            if (a && a.type == CKEDITOR.NODE_ELEMENT && "form" == a.getName() && 0 < e.length)
                for (var f = e.length - 1; 0 <= f; f--) {
                    var b = e[f][0],
                        c = e[f][1];
                    c ? b.insertBefore(c) : b.appendTo(a) } }

        function r(a, e) {
            var f = n(a),
                b = {},
                c = a.$;
            e || (b["class"] = c.className ||
                "", c.className = "");
            b.inline = c.style.cssText || "";
            e || (c.style.cssText = "position: static; overflow: visible");
            t(f);
            return b
        }

        function u(a, e) {
            var f = n(a),
                b = a.$; "class" in e && (b.className = e["class"]); "inline" in e && (b.style.cssText = e.inline);
            t(f) }

        function v(a) {
            if (!a.editable().isInline()) {
                var e = CKEDITOR.instances,
                    f;
                for (f in e) {
                    var b = e[f]; "wysiwyg" != b.mode || b.readOnly || (b = b.document.getBody(), b.setAttribute("contentEditable", !1), b.setAttribute("contentEditable", !0)) }
                a.editable().hasFocus && (a.toolbox.focus(),
                    a.focus())
            }
        }
        CKEDITOR.plugins.add("maximize", {
            init: function(a) {
                function e() {
                    var b = c.getViewPaneSize();
                    a.resize(b.width, b.height, null, !0) }
                if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var f = a.lang,
                        b = CKEDITOR.document,
                        c = b.getWindow(),
                        l, m, p, n = CKEDITOR.TRISTATE_OFF;
                    a.addCommand("maximize", {
                        modes: { wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS },
                        readOnly: 1,
                        editorFocus: !1,
                        exec: function() {
                            var h = a.container.getFirst(function(a) {
                                    return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }),
                                g = a.ui.space("contents");
                            if ("wysiwyg" == a.mode) {
                                var d = a.getSelection();
                                l = d && d.getRanges();
                                m = c.getScrollPosition() } else {
                                var k = a.editable().$;
                                l = !CKEDITOR.env.ie && [k.selectionStart, k.selectionEnd];
                                m = [k.scrollLeft, k.scrollTop] }
                            if (this.state == CKEDITOR.TRISTATE_OFF) {
                                c.on("resize", e);
                                p = c.getScrollPosition();
                                for (d = a.container; d = d.getParent();) d.setCustomData("maximize_saved_styles", r(d)), d.setStyle("z-index", a.config.baseFloatZIndex - 5);
                                g.setCustomData("maximize_saved_styles", r(g, !0));
                                h.setCustomData("maximize_saved_styles", r(h, !0));
                                g = { overflow: CKEDITOR.env.webkit ? "" : "hidden", width: 0, height: 0 };
                                b.getDocumentElement().setStyles(g);
                                !CKEDITOR.env.gecko && b.getDocumentElement().setStyle("position", "fixed");
                                CKEDITOR.env.gecko && CKEDITOR.env.quirks || b.getBody().setStyles(g);
                                CKEDITOR.env.ie ? setTimeout(function() { c.$.scrollTo(0, 0) }, 0) : c.$.scrollTo(0, 0);
                                h.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute");
                                h.$.offsetLeft;
                                h.setStyles({ "z-index": a.config.baseFloatZIndex - 5, left: "0px", top: "0px" });
                                h.addClass("cke_maximized");
                                e();
                                g = h.getDocumentPosition();
                                h.setStyles({ left: -1 * g.x + "px", top: -1 * g.y + "px" });
                                CKEDITOR.env.gecko && v(a)
                            } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                c.removeListener("resize", e);
                                for (var d = [g, h], q = 0; q < d.length; q++) u(d[q], d[q].getCustomData("maximize_saved_styles")), d[q].removeCustomData("maximize_saved_styles");
                                for (d = a.container; d = d.getParent();) u(d, d.getCustomData("maximize_saved_styles")), d.removeCustomData("maximize_saved_styles");
                                CKEDITOR.env.ie ? setTimeout(function() { c.$.scrollTo(p.x, p.y) }, 0) : c.$.scrollTo(p.x,
                                    p.y);
                                h.removeClass("cke_maximized");
                                CKEDITOR.env.webkit && (h.setStyle("display", "inline"), setTimeout(function() { h.setStyle("display", "block") }, 0));
                                a.fire("resize", { outerHeight: a.container.$.offsetHeight, contentsHeight: g.$.offsetHeight, outerWidth: a.container.$.offsetWidth })
                            }
                            this.toggleState();
                            if (d = this.uiItems[0]) g = this.state == CKEDITOR.TRISTATE_OFF ? f.maximize.maximize : f.maximize.minimize, d = CKEDITOR.document.getById(d._.id), d.getChild(1).setHtml(g), d.setAttribute("title", g), d.setAttribute("href", 'javascript:void("' +
                                g + '");');
                            "wysiwyg" == a.mode ? l ? (CKEDITOR.env.gecko && v(a), a.getSelection().selectRanges(l), (k = a.getSelection().getStartElement()) && k.scrollIntoView(!0)) : c.$.scrollTo(m.x, m.y) : (l && (k.selectionStart = l[0], k.selectionEnd = l[1]), k.scrollLeft = m[0], k.scrollTop = m[1]);
                            l = m = null;
                            n = this.state;
                            a.fire("maximize", this.state)
                        },
                        canUndo: !1
                    });
                    a.ui.addButton && a.ui.addButton("Maximize", { label: f.maximize.maximize, command: "maximize", toolbar: "tools,10" });
                    a.on("mode", function() {
                        var b = a.getCommand("maximize");
                        b.setState(b.state ==
                            CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : n)
                    }, null, null, 100)
                }
            }
        })
    })();
    CKEDITOR.plugins.add("newpage", { init: function(a) { a.addCommand("newpage", { modes: { wysiwyg: 1, source: 1 }, exec: function(b) {
                    var a = this;
                    b.setData(b.config.newpage_html || "", function() { b.focus();
                        setTimeout(function() { b.fire("afterCommandExec", { name: "newpage", command: a });
                            b.selectionChange() }, 200) }) }, async: !0 });
            a.ui.addButton && a.ui.addButton("NewPage", { label: a.lang.newpage.toolbar, command: "newpage", toolbar: "document,20" }) } });
    (function() {
        function e(a) {
            return { "aria-label": a, "class": "cke_pagebreak", contenteditable: "false", "data-cke-display-name": "pagebreak", "data-cke-pagebreak": 1, style: "page-break-after: always", title: a } }
        CKEDITOR.plugins.add("pagebreak", {
            requires: "fakeobjects",
            onLoad: function() {
                var a = ("background:url(" + CKEDITOR.getUrl(this.path + "images/pagebreak.gif") + ") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:7px;cursor:default;").replace(/;/g,
                    " !important;");
                CKEDITOR.addCss("div.cke_pagebreak{" + a + "}")
            },
            init: function(a) { a.blockless || (a.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd), a.ui.addButton && a.ui.addButton("PageBreak", { label: a.lang.pagebreak.toolbar, command: "pagebreak", toolbar: "insert,70" }), CKEDITOR.env.webkit && a.on("contentDom", function() { a.document.on("click", function(b) { b = b.data.getTarget();
                        b.is("div") && b.hasClass("cke_pagebreak") && a.getSelection().selectElement(b) }) })) },
            afterInit: function(a) {
                function b(f) {
                    CKEDITOR.tools.extend(f.attributes,
                        e(a.lang.pagebreak.alt), !0);
                    f.children.length = 0
                }
                var c = a.dataProcessor,
                    g = c && c.dataFilter,
                    c = c && c.htmlFilter,
                    h = /page-break-after\s*:\s*always/i,
                    k = /display\s*:\s*none/i;
                c && c.addRules({ attributes: { "class": function(a, b) {
                            var c = a.replace("cke_pagebreak", "");
                            if (c != a) {
                                var d = CKEDITOR.htmlParser.fragment.fromHtml('\x3cspan style\x3d"display: none;"\x3e\x26nbsp;\x3c/span\x3e').children[0];
                                b.children.length = 0;
                                b.add(d);
                                d = b.attributes;
                                delete d["aria-label"];
                                delete d.contenteditable;
                                delete d.title }
                            return c } } }, {
                    applyToAll: !0,
                    priority: 5
                });
                g && g.addRules({ elements: { div: function(a) {
                            if (a.attributes["data-cke-pagebreak"]) b(a);
                            else if (h.test(a.attributes.style)) {
                                var c = a.children[0];
                                c && "span" == c.name && k.test(c.attributes.style) && b(a) } } } })
            }
        });
        CKEDITOR.plugins.pagebreakCmd = {
            exec: function(a) {
                var b = a.document.createElement("div", { attributes: e(a.lang.pagebreak.alt) });
                a.insertElement(b) },
            context: "div",
            allowedContent: {
                div: { styles: "!page-break-after" },
                span: {
                    match: function(a) {
                        return (a = a.parent) && "div" == a.name && a.styles && a.styles["page-break-after"] },
                    styles: "display"
                }
            },
            requiredContent: "div{page-break-after}"
        }
    })();
    (function() {
        var c = { canUndo: !1, async: !0, exec: function(a) { a.getClipboardData({ title: a.lang.pastetext.title }, function(b) { b && a.fire("paste", { type: "text", dataValue: b.dataValue, method: "paste", dataTransfer: CKEDITOR.plugins.clipboard.initPasteDataTransfer() });
                    a.fire("afterCommandExec", { name: "pastetext", command: c, returnValue: !!b }) }) } };
        CKEDITOR.plugins.add("pastetext", {
            requires: "clipboard",
            init: function(a) {
                a.addCommand("pastetext", c);
                a.ui.addButton && a.ui.addButton("PasteText", {
                    label: a.lang.pastetext.button,
                    command: "pastetext",
                    toolbar: "clipboard,40"
                });
                if (a.config.forcePasteAsPlainText) a.on("beforePaste", function(a) { "html" != a.data.type && (a.data.type = "text") });
                a.on("pasteState", function(b) { a.getCommand("pastetext").setState(b.data) })
            }
        })
    })();
    (function() {
        function l(a, b, f) {
            var d = CKEDITOR.cleanWord;
            d ? f() : (a = CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile || b + "filter/default.js"), CKEDITOR.scriptLoader.load(a, f, null, !0));
            return !d }

        function g(a) { a.data.type = "html" }
        CKEDITOR.plugins.add("pastefromword", {
            requires: "clipboard",
            init: function(a) {
                var b = 0,
                    f = this.path;
                a.addCommand("pastefromword", {
                    canUndo: !1,
                    async: !0,
                    exec: function(a) {
                        var c = this;
                        b = 1;
                        a.once("beforePaste", g);
                        a.getClipboardData({ title: a.lang.pastefromword.title }, function(b) {
                            b && a.fire("paste", { type: "html", dataValue: b.dataValue, method: "paste", dataTransfer: CKEDITOR.plugins.clipboard.initPasteDataTransfer() });
                            a.fire("afterCommandExec", { name: "pastefromword", command: c, returnValue: !!b })
                        })
                    }
                });
                a.ui.addButton && a.ui.addButton("PasteFromWord", { label: a.lang.pastefromword.toolbar, command: "pastefromword", toolbar: "clipboard,50" });
                a.on("pasteState", function(b) { a.getCommand("pastefromword").setState(b.data) });
                a.on("paste", function(d) {
                    var c = d.data,
                        h = c.dataValue,
                        g = /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/,
                        e = { dataValue: h };
                    if (h && (b || g.test(h)) && (!1 !== a.fire("pasteFromWord", e) || b)) { c.dontFilter = !0;
                        var k = l(a, f, function() {
                            if (k) a.fire("paste", c);
                            else if (!a.config.pasteFromWordPromptCleanup || b || confirm(a.lang.pastefromword.confirmCleanup)) e.dataValue = CKEDITOR.cleanWord(e.dataValue, a), a.fire("afterPasteFromWord", e), c.dataValue = e.dataValue;
                            b = 0 });
                        k && d.cancel() }
                }, null, null, 3)
            }
        })
    })();
    (function() {
        var h, k = {
            modes: { wysiwyg: 1, source: 1 },
            canUndo: !1,
            readOnly: 1,
            exec: function(a) {
                var g, b = a.config,
                    f = b.baseHref ? '\x3cbase href\x3d"' + b.baseHref + '"/\x3e' : "";
                if (b.fullPage) g = a.getData().replace(/<head>/, "$\x26" + f).replace(/[^>]*(?=<\/title>)/, "$\x26 \x26mdash; " + a.lang.preview.preview);
                else {
                    var b = "\x3cbody ",
                        d = a.document && a.document.getBody();
                    d && (d.getAttribute("id") && (b += 'id\x3d"' + d.getAttribute("id") + '" '), d.getAttribute("class") && (b += 'class\x3d"' + d.getAttribute("class") + '" '));
                    b += "\x3e";
                    g = a.config.docType +
                        '\x3chtml dir\x3d"' + a.config.contentsLangDirection + '"\x3e\x3chead\x3e' + f + "\x3ctitle\x3e" + a.lang.preview.preview + "\x3c/title\x3e" + CKEDITOR.tools.buildStyleHtml(a.config.contentsCss) + "\x3c/head\x3e" + b + a.getData() + "\x3c/body\x3e\x3c/html\x3e"
                }
                f = 640;
                b = 420;
                d = 80;
                try {
                    var c = window.screen,
                        f = Math.round(.8 * c.width),
                        b = Math.round(.7 * c.height),
                        d = Math.round(.1 * c.width) } catch (k) {}
                if (!1 === a.fire("contentPreview", a = { dataValue: g })) return !1;
                var c = "",
                    e;
                CKEDITOR.env.ie && (window._cke_htmlToLoad = a.dataValue, e = "javascript:void( (function(){document.open();" +
                    ("(" + CKEDITOR.tools.fixDomain + ")();").replace(/\/\/.*?\n/g, "").replace(/parent\./g, "window.opener.") + "document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad \x3d null;})() )", c = "");
                CKEDITOR.env.gecko && (window._cke_htmlToLoad = a.dataValue, c = CKEDITOR.getUrl(h + "preview.html"));
                c = window.open(c, null, "toolbar\x3dyes,location\x3dno,status\x3dyes,menubar\x3dyes,scrollbars\x3dyes,resizable\x3dyes,width\x3d" + f + ",height\x3d" + b + ",left\x3d" + d);
                CKEDITOR.env.ie && c && (c.location =
                    e);
                CKEDITOR.env.ie || CKEDITOR.env.gecko || (e = c.document, e.open(), e.write(a.dataValue), e.close());
                return !0
            }
        };
        CKEDITOR.plugins.add("preview", { init: function(a) { a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (h = this.path, a.addCommand("preview", k), a.ui.addButton && a.ui.addButton("Preview", { label: a.lang.preview.preview, command: "preview", toolbar: "document,40" })) } })
    })();
    CKEDITOR.plugins.add("print", { init: function(a) { a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (a.addCommand("print", CKEDITOR.plugins.print), a.ui.addButton && a.ui.addButton("Print", { label: a.lang.print.toolbar, command: "print", toolbar: "document,50" })) } });
    CKEDITOR.plugins.print = { exec: function(a) { CKEDITOR.env.gecko ? a.window.$.print() : a.document.$.execCommand("Print") }, canUndo: !1, readOnly: 1, modes: { wysiwyg: 1 } };
    CKEDITOR.plugins.add("removeformat", { init: function(a) { a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat);
            a.ui.addButton && a.ui.addButton("RemoveFormat", { label: a.lang.removeformat.toolbar, command: "removeFormat", toolbar: "cleanup,10" }) } });
    CKEDITOR.plugins.removeformat = {
        commands: {
            removeformat: {
                exec: function(a) {
                    for (var h = a._.removeFormatRegex || (a._.removeFormatRegex = new RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), e = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), f = CKEDITOR.plugins.removeformat.filter, m = a.getSelection().getRanges(), n = m.createIterator(), p = function(a) {
                            return a.type == CKEDITOR.NODE_ELEMENT }, c; c = n.getNextRange();) {
                        c.collapsed || c.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                        var l = c.createBookmark(),
                            b = l.startNode,
                            d = l.endNode,
                            k = function(b) {
                                for (var c = a.elementPath(b), e = c.elements, d = 1, g;
                                    (g = e[d]) && !g.equals(c.block) && !g.equals(c.blockLimit); d++) h.test(g.getName()) && f(a, g) && b.breakParent(g) };
                        k(b);
                        if (d)
                            for (k(d), b = b.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); b && !b.equals(d);)
                                if (b.isReadOnly()) {
                                    if (b.getPosition(d) & CKEDITOR.POSITION_CONTAINS) break;
                                    b = b.getNext(p) } else k = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), "img" == b.getName() && b.data("cke-realelement") || !f(a, b) || (h.test(b.getName()) ?
                                    b.remove(1) : (b.removeAttributes(e), a.fire("removeFormatCleanup", b))), b = k;
                        c.moveToBookmark(l)
                    }
                    a.forceNextSelectionCheck();
                    a.getSelection().selectRanges(m)
                }
            }
        },
        filter: function(a, h) {
            for (var e = a._.removeFormatFilters || [], f = 0; f < e.length; f++)
                if (!1 === e[f](h)) return !1;
            return !0 }
    };
    CKEDITOR.editor.prototype.addRemoveFormatFilter = function(a) { this._.removeFormatFilters || (this._.removeFormatFilters = []);
        this._.removeFormatFilters.push(a) };
    CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var";
    CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign";
    (function() {
        var b = { readOnly: 1, exec: function(a) {
                if (a.fire("save") && (a = a.element.$.form)) try { a.submit() } catch (b) { a.submit.click && a.submit.click() } } };
        CKEDITOR.plugins.add("save", { init: function(a) { a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (a.addCommand("save", b).modes = { wysiwyg: !!a.element.$.form }, a.ui.addButton && a.ui.addButton("Save", { label: a.lang.save.toolbar, command: "save", toolbar: "document,10" })) } }) })();
    (function() {
        CKEDITOR.plugins.add("selectall", {
            init: function(b) {
                b.addCommand("selectAll", { modes: { wysiwyg: 1, source: 1 }, exec: function(a) {
                        var b = a.editable();
                        if (b.is("textarea")) a = b.$, CKEDITOR.env.ie ? a.createTextRange().execCommand("SelectAll") : (a.selectionStart = 0, a.selectionEnd = a.value.length), a.focus();
                        else {
                            if (b.is("body")) a.document.$.execCommand("SelectAll", !1, null);
                            else {
                                var c = a.createRange();
                                c.selectNodeContents(b);
                                c.select() }
                            a.forceNextSelectionCheck();
                            a.selectionChange() } }, canUndo: !1 });
                b.ui.addButton &&
                    b.ui.addButton("SelectAll", { label: b.lang.selectall.toolbar, command: "selectAll", toolbar: "selection,10" })
            }
        })
    })();
    (function() {
        var k = { readOnly: 1, preserveState: !0, editorFocus: !1, exec: function(a) { this.toggleState();
                this.refresh(a) }, refresh: function(a) {
                if (a.document) {
                    var c = this.state != CKEDITOR.TRISTATE_ON || a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !a.focusManager.hasFocus ? "removeClass" : "attachClass";
                    a.editable()[c]("cke_show_blocks") } } };
        CKEDITOR.plugins.add("showblocks", {
            onLoad: function() {
                var a = "p div pre address blockquote h1 h2 h3 h4 h5 h6".split(" "),
                    c, b, e, f, k = CKEDITOR.getUrl(this.path),
                    l = !(CKEDITOR.env.ie &&
                        9 > CKEDITOR.env.version),
                    g = l ? ":not([contenteditable\x3dfalse]):not(.cke_show_blocks_off)" : "",
                    d, h;
                for (c = b = e = f = ""; d = a.pop();) h = a.length ? "," : "", c += ".cke_show_blocks " + d + g + h, e += ".cke_show_blocks.cke_contents_ltr " + d + g + h, f += ".cke_show_blocks.cke_contents_rtl " + d + g + h, b += ".cke_show_blocks " + d + g + "{background-image:url(" + CKEDITOR.getUrl(k + "images/block_" + d + ".png") + ")}";
                CKEDITOR.addCss((c + "{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(b, e + "{background-position:top left;padding-left:8px}",
                    f + "{background-position:top right;padding-right:8px}"));
                l || CKEDITOR.addCss(".cke_show_blocks [contenteditable\x3dfalse],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}")
            },
            init: function(a) {
                function c() { b.refresh(a) }
                if (!a.blockless) {
                    var b = a.addCommand("showblocks", k);
                    b.canUndo = !1;
                    a.config.startupOutlineBlocks && b.setState(CKEDITOR.TRISTATE_ON);
                    a.ui.addButton && a.ui.addButton("ShowBlocks", { label: a.lang.showblocks.toolbar, command: "showblocks", toolbar: "tools,20" });
                    a.on("mode", function() { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) });
                    a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (a.on("focus", c), a.on("blur", c));
                    a.on("contentDom", function() { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) }) }
            }
        })
    })();
    (function() {
        var f = { preserveState: !0, editorFocus: !1, readOnly: 1, exec: function(a) { this.toggleState();
                this.refresh(a) }, refresh: function(a) {
                if (a.document) {
                    var b = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass";
                    a.editable()[b]("cke_show_borders") } } };
        CKEDITOR.plugins.add("showborders", {
            modes: { wysiwyg: 1 },
            onLoad: function() {
                var a;
                a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
                    "cke_show_border").replace(/%1/g, "cke_show_borders ");
                CKEDITOR.addCss(a)
            },
            init: function(a) {
                var b = a.addCommand("showborders", f);
                b.canUndo = !1;
                !1 !== a.config.startupShowBorders && b.setState(CKEDITOR.TRISTATE_ON);
                a.on("mode", function() { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) }, null, null, 100);
                a.on("contentDom", function() { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) });
                a.on("removeFormatCleanup", function(d) {
                    d = d.data;
                    a.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && d.is("table") && (!d.hasAttribute("border") ||
                        0 >= parseInt(d.getAttribute("border"), 10)) && d.addClass("cke_show_border")
                })
            },
            afterInit: function(a) {
                var b = a.dataProcessor;
                a = b && b.dataFilter;
                b = b && b.htmlFilter;
                a && a.addRules({ elements: { table: function(a) { a = a.attributes;
                            var b = a["class"],
                                c = parseInt(a.border, 10);
                            c && !(0 >= c) || b && -1 != b.indexOf("cke_show_border") || (a["class"] = (b || "") + " cke_show_border") } } });
                b && b.addRules({
                    elements: {
                        table: function(a) {
                            a = a.attributes;
                            var b = a["class"];
                            b && (a["class"] = b.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/,
                                ""))
                        }
                    }
                })
            }
        });
        CKEDITOR.on("dialogDefinition", function(a) {
            var b = a.data.name;
            if ("table" == b || "tableProperties" == b)
                if (a = a.data.definition, b = a.getContents("info").get("txtBorder"), b.commit = CKEDITOR.tools.override(b.commit, function(a) {
                        return function(b, c) { a.apply(this, arguments);
                            var e = parseInt(this.getValue(), 10);
                            c[!e || 0 >= e ? "addClass" : "removeClass"]("cke_show_border") } }), a = (a = a.getContents("advanced")) && a.get("advCSSClasses")) a.setup = CKEDITOR.tools.override(a.setup, function(a) {
                    return function() {
                        a.apply(this,
                            arguments);
                        this.setValue(this.getValue().replace(/cke_show_border/, ""))
                    }
                }), a.commit = CKEDITOR.tools.override(a.commit, function(a) {
                    return function(b, c) { a.apply(this, arguments);
                        parseInt(c.getAttribute("border"), 10) || c.addClass("cke_show_border") } })
        })
    })();
    (function() {
        CKEDITOR.plugins.add("sourcearea", {
            init: function(a) {
                function d() {
                    var a = e && this.equals(CKEDITOR.document.getActive());
                    this.hide();
                    this.setStyle("height", this.getParent().$.clientHeight + "px");
                    this.setStyle("width", this.getParent().$.clientWidth + "px");
                    this.show();
                    a && this.focus() }
                if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var f = CKEDITOR.plugins.sourcearea;
                    a.addMode("source", function(e) {
                        var b = a.ui.space("contents").getDocument().createElement("textarea");
                        b.setStyles(CKEDITOR.tools.extend({
                            width: CKEDITOR.env.ie7Compat ?
                                "99%" : "100%",
                            height: "100%",
                            resize: "none",
                            outline: "none",
                            "text-align": "left"
                        }, CKEDITOR.tools.cssVendorPrefix("tab-size", a.config.sourceAreaTabSize || 4)));
                        b.setAttribute("dir", "ltr");
                        b.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu");
                        a.ui.space("contents").append(b);
                        b = a.editable(new c(a, b));
                        b.setData(a.getData(1));
                        CKEDITOR.env.ie && (b.attachListener(a, "resize", d, b), b.attachListener(CKEDITOR.document.getWindow(), "resize", d, b), CKEDITOR.tools.setTimeout(d, 0, b));
                        a.fire("ariaWidget",
                            this);
                        e()
                    });
                    a.addCommand("source", f.commands.source);
                    a.ui.addButton && a.ui.addButton("Source", { label: a.lang.sourcearea.toolbar, command: "source", toolbar: "mode,10" });
                    a.on("mode", function() { a.getCommand("source").setState("source" == a.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) });
                    var e = CKEDITOR.env.ie && 9 == CKEDITOR.env.version
                }
            }
        });
        var c = CKEDITOR.tools.createClass({
            base: CKEDITOR.editable,
            proto: {
                setData: function(a) { this.setValue(a);
                    this.status = "ready";
                    this.editor.fire("dataReady") },
                getData: function() {
                    return this.getValue() },
                insertHtml: function() {},
                insertElement: function() {},
                insertText: function() {},
                setReadOnly: function(a) { this[(a ? "set" : "remove") + "Attribute"]("readOnly", "readonly") },
                detach: function() { c.baseProto.detach.call(this);
                    this.clearCustomData();
                    this.remove() }
            }
        })
    })();
    CKEDITOR.plugins.sourcearea = { commands: { source: { modes: { wysiwyg: 1, source: 1 }, editorFocus: !1, readOnly: 1, exec: function(c) { "wysiwyg" == c.mode && c.fire("saveSnapshot");
                    c.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);
                    c.setMode("source" == c.mode ? "wysiwyg" : "source") }, canUndo: !1 } } };
    CKEDITOR.plugins.add("specialchar", {
        availableLangs: { af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-gb": 1, eo: 1, es: 1, et: 1, eu: 1, fa: 1, fi: 1, fr: 1, "fr-ca": 1, gl: 1, he: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1 },
        requires: "dialog",
        init: function(a) {
            var c = this;
            CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js");
            a.addCommand("specialchar", {
                exec: function() {
                    var b =
                        a.langCode,
                        b = c.availableLangs[b] ? b : c.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
                    CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c.path + "dialogs/lang/" + b + ".js"), function() { CKEDITOR.tools.extend(a.lang.specialchar, c.langEntries[b]);
                        a.openDialog("specialchar") })
                },
                modes: { wysiwyg: 1 },
                canUndo: !1
            });
            a.ui.addButton && a.ui.addButton("SpecialChar", { label: a.lang.specialchar.toolbar, command: "specialchar", toolbar: "insert,50" })
        }
    });
    CKEDITOR.config.specialChars = "! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" ");
    CKEDITOR.plugins.add("scayt", {
        requires: "menubutton,dialog",
        tabToOpen: null,
        dialogName: "scaytDialog",
        onLoad: function(a) { CKEDITOR.plugins.scayt.onLoadTimestamp = (new Date).getTime(); "moono-lisa" == (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(this.path + "skins/" + CKEDITOR.skin.name + "/scayt.css") },
        init: function(a) {
            var c = this,
                d = CKEDITOR.plugins.scayt;
            this.bindEvents(a);
            this.parseConfig(a);
            this.addRule(a);
            CKEDITOR.dialog.add(this.dialogName, CKEDITOR.getUrl(this.path + "dialogs/options.js"));
            this.addMenuItems(a);
            var b = a.lang.scayt,
                e = CKEDITOR.env;
            a.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                label: b.text_title,
                title: a.plugins.wsc ? a.lang.wsc.title : b.text_title,
                modes: { wysiwyg: !(e.ie && (8 > e.version || e.quirks)) },
                toolbar: "spellchecker,20",
                refresh: function() {
                    var b = a.ui.instances.Scayt.getState();
                    a.scayt && (b = d.state.scayt[a.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
                    a.fire("scaytButtonState", b) },
                onRender: function() {
                    var b = this;
                    a.on("scaytButtonState", function(a) { void 0 !== typeof a.data && b.setState(a.data) }) },
                onMenu: function() {
                    var b = a.scayt;
                    a.getMenuItem("scaytToggle").label = a.lang.scayt[b && d.state.scayt[a.name] ? "btn_disable" : "btn_enable"];
                    b = { scaytToggle: CKEDITOR.TRISTATE_OFF, scaytOptions: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytLangs: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytDict: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytAbout: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, WSC: a.plugins.wsc ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED };
                    a.config.scayt_uiTabs[0] ||
                        delete b.scaytOptions;
                    a.config.scayt_uiTabs[1] || delete b.scaytLangs;
                    a.config.scayt_uiTabs[2] || delete b.scaytDict;
                    return b
                }
            });
            a.contextMenu && a.addMenuItems && (a.contextMenu.addListener(function(b, d) {
                var h = a.scayt,
                    k, e;
                h && (e = h.getSelectionNode()) && (k = c.menuGenerator(a, e), h.showBanner("." + a.contextMenu._.definition.panel.className.split(" ").join(" .")));
                return k }), a.contextMenu._.onHide = CKEDITOR.tools.override(a.contextMenu._.onHide, function(b) {
                return function() {
                    var d = a.scayt;
                    d && d.hideBanner();
                    return b.apply(this) } }))
        },
        addMenuItems: function(a) {
            var c = this,
                d = CKEDITOR.plugins.scayt;
            a.addMenuGroup("scaytButton");
            for (var b = a.config.scayt_contextMenuItemsOrder.split("|"), e = 0; e < b.length; e++) b[e] = "scayt_" + b[e];
            if ((b = ["grayt_description", "grayt_suggest", "grayt_control"].concat(b)) && b.length)
                for (e = 0; e < b.length; e++) a.addMenuGroup(b[e], e - 10);
            a.addCommand("scaytToggle", { exec: function(a) {
                    var b = a.scayt;
                    d.state.scayt[a.name] = !d.state.scayt[a.name];!0 === d.state.scayt[a.name] ? b || d.createScayt(a) : b && d.destroy(a) } });
            a.addCommand("scaytAbout", { exec: function(a) { a.scayt.tabToOpen = "about";
                    a.lockSelection();
                    a.openDialog(c.dialogName) } });
            a.addCommand("scaytOptions", { exec: function(a) { a.scayt.tabToOpen = "options";
                    a.lockSelection();
                    a.openDialog(c.dialogName) } });
            a.addCommand("scaytLangs", { exec: function(a) { a.scayt.tabToOpen = "langs";
                    a.lockSelection();
                    a.openDialog(c.dialogName) } });
            a.addCommand("scaytDict", { exec: function(a) { a.scayt.tabToOpen = "dictionaries";
                    a.lockSelection();
                    a.openDialog(c.dialogName) } });
            b = {
                scaytToggle: {
                    label: a.lang.scayt.btn_enable,
                    group: "scaytButton",
                    command: "scaytToggle"
                },
                scaytAbout: { label: a.lang.scayt.btn_about, group: "scaytButton", command: "scaytAbout" },
                scaytOptions: { label: a.lang.scayt.btn_options, group: "scaytButton", command: "scaytOptions" },
                scaytLangs: { label: a.lang.scayt.btn_langs, group: "scaytButton", command: "scaytLangs" },
                scaytDict: { label: a.lang.scayt.btn_dictionaries, group: "scaytButton", command: "scaytDict" }
            };
            a.plugins.wsc && (b.WSC = {
                label: a.lang.wsc.toolbar,
                group: "scaytButton",
                onClick: function() {
                    var b = CKEDITOR.plugins.scayt,
                        d = a.scayt,
                        c = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText();
                    (c = c.replace(/\s/g, "")) ? (d && b.state.scayt[a.name] && d.setMarkupPaused && d.setMarkupPaused(!0), a.lockSelection(), a.execCommand("checkspell")) : alert("Nothing to check!")
                }
            });
            a.addMenuItems(b)
        },
        bindEvents: function(a) {
            var c = CKEDITOR.plugins.scayt,
                d = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE,
                b = function() { c.destroy(a) },
                e = function() {!c.state.scayt[a.name] || a.readOnly || a.scayt || c.createScayt(a) },
                f = function() {
                    var b =
                        a.editable();
                    b.attachListener(b, "focus", function(b) { CKEDITOR.plugins.scayt && !a.scayt && setTimeout(e, 0);
                        b = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[a.name] && a.scayt;
                        var c, h;
                        if ((d || b) && a._.savedSelection) { b = a._.savedSelection.getSelectedElement();
                            b = !b && a._.savedSelection.getRanges();
                            for (var f = 0; f < b.length; f++) h = b[f], "string" === typeof h.startContainer.$.nodeValue && (c = h.startContainer.getText().length, (c < h.startOffset || c < h.endOffset) && a.unlockSelection(!1)) } }, this, null, -10)
                },
                g = function() {
                    d ?
                        a.config.scayt_inlineModeImmediateMarkup ? e() : (a.on("blur", function() { setTimeout(b, 0) }), a.on("focus", e), a.focusManager.hasFocus && e()) : e();
                    f();
                    var c = a.editable();
                    c.attachListener(c, "mousedown", function(b) { b = b.data.getTarget();
                        var d = a.widgets && a.widgets.getByElement(b);
                        d && (d.wrapper = b.getAscendant(function(a) {
                            return a.hasAttribute("data-cke-widget-wrapper") }, !0)) }, this, null, -10)
                };
            a.on("contentDom", g);
            a.on("beforeCommandExec", function(b) {
                var d = a.scayt,
                    e = null,
                    f = !1,
                    g = !0;
                b.data.name in c.options.disablingCommandExec &&
                    "wysiwyg" == a.mode ? d && (c.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)) : "bold" !== b.data.name && "italic" !== b.data.name && "underline" !== b.data.name && "strike" !== b.data.name && "subscript" !== b.data.name && "superscript" !== b.data.name && "enter" !== b.data.name && "cut" !== b.data.name && "language" !== b.data.name || !d || ("cut" === b.data.name && (g = !1, f = !0), "language" === b.data.name && (e = (e = a.plugins.language.getCurrentLangElement(a)) && e.$, f = !0), a.fire("reloadMarkupScayt", {
                        removeOptions: {
                            removeInside: g,
                            forceBookmark: f,
                            selectionNode: e
                        },
                        timeout: 0
                    }))
            });
            a.on("beforeSetMode", function(b) {
                if ("source" == b.data) {
                    if (b = a.scayt) c.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED);
                    a.document && a.document.getBody().removeAttribute("_jquid") } });
            a.on("afterCommandExec", function(b) { "wysiwyg" != a.mode || "undo" != b.data.name && "redo" != b.data.name || setTimeout(function() { c.reloadMarkup(a.scayt) }, 250) });
            a.on("readOnly", function(b) {
                var d;
                b && (d = a.scayt, !0 === b.editor.readOnly ? d && d.fire("removeMarkupInDocument", {}) : d ? c.reloadMarkup(d) :
                    "wysiwyg" == b.editor.mode && !0 === c.state.scayt[b.editor.name] && (c.createScayt(a), b.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON)))
            });
            a.on("beforeDestroy", b);
            a.on("setData", function() { b();
                (a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE || a.plugins.divarea) && g() }, this, null, 50);
            a.on("reloadMarkupScayt", function(b) {
                var d = b.data && b.data.removeOptions;
                b = b.data && b.data.timeout;
                var e = a.scayt;
                e && setTimeout(function() { e.removeMarkupInSelectionNode(d);
                    c.reloadMarkup(e) }, b || 0) });
            a.on("insertElement", function() {
                a.fire("reloadMarkupScayt", { removeOptions: { forceBookmark: !0 } })
            }, this, null, 50);
            a.on("insertHtml", function() { a.fire("reloadMarkupScayt") }, this, null, 50);
            a.on("insertText", function() { a.fire("reloadMarkupScayt") }, this, null, 50);
            a.on("scaytDialogShown", function(b) { b.data.selectPage(a.scayt.tabToOpen) })
        },
        parseConfig: function(a) {
            var c = CKEDITOR.plugins.scayt;
            c.replaceOldOptionsNames(a.config);
            "boolean" !== typeof a.config.scayt_autoStartup && (a.config.scayt_autoStartup = !1);
            c.state.scayt[a.name] = a.config.scayt_autoStartup;
            "boolean" !== typeof a.config.grayt_autoStartup &&
                (a.config.grayt_autoStartup = !1);
            "boolean" !== typeof a.config.scayt_inlineModeImmediateMarkup && (a.config.scayt_inlineModeImmediateMarkup = !1);
            c.state.grayt[a.name] = a.config.grayt_autoStartup;
            a.config.scayt_contextCommands || (a.config.scayt_contextCommands = "ignore|ignoreall|add");
            a.config.scayt_contextMenuItemsOrder || (a.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control");
            a.config.scayt_sLang || (a.config.scayt_sLang = "en_US");
            if (void 0 === a.config.scayt_maxSuggestions || "number" != typeof a.config.scayt_maxSuggestions ||
                0 > a.config.scayt_maxSuggestions) a.config.scayt_maxSuggestions = 5;
            if (void 0 === a.config.scayt_minWordLength || "number" != typeof a.config.scayt_minWordLength || 1 > a.config.scayt_minWordLength) a.config.scayt_minWordLength = 4;
            if (void 0 === a.config.scayt_customDictionaryIds || "string" !== typeof a.config.scayt_customDictionaryIds) a.config.scayt_customDictionaryIds = "";
            if (void 0 === a.config.scayt_userDictionaryName || "string" !== typeof a.config.scayt_userDictionaryName) a.config.scayt_userDictionaryName = null;
            if ("string" ===
                typeof a.config.scayt_uiTabs && 3 === a.config.scayt_uiTabs.split(",").length) {
                var d = [],
                    b = [];
                a.config.scayt_uiTabs = a.config.scayt_uiTabs.split(",");
                CKEDITOR.tools.search(a.config.scayt_uiTabs, function(a) { 1 === Number(a) || 0 === Number(a) ? (b.push(!0), d.push(Number(a))) : b.push(!1) });
                null === CKEDITOR.tools.search(b, !1) ? a.config.scayt_uiTabs = d : a.config.scayt_uiTabs = [1, 1, 1] } else a.config.scayt_uiTabs = [1, 1, 1];
            "string" != typeof a.config.scayt_serviceProtocol && (a.config.scayt_serviceProtocol = null);
            "string" != typeof a.config.scayt_serviceHost &&
                (a.config.scayt_serviceHost = null);
            "string" != typeof a.config.scayt_servicePort && (a.config.scayt_servicePort = null);
            "string" != typeof a.config.scayt_servicePath && (a.config.scayt_servicePath = null);
            a.config.scayt_moreSuggestions || (a.config.scayt_moreSuggestions = "on");
            "string" !== typeof a.config.scayt_customerId && (a.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2");
            "string" !== typeof a.config.scayt_srcUrl && (c = document.location.protocol, c = -1 != c.search(/https?:/) ?
                c : "http:", a.config.scayt_srcUrl = c + "//svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/ckscayt.js");
            "boolean" !== typeof CKEDITOR.config.scayt_handleCheckDirty && (CKEDITOR.config.scayt_handleCheckDirty = !0);
            "boolean" !== typeof CKEDITOR.config.scayt_handleUndoRedo && (CKEDITOR.config.scayt_handleUndoRedo = !0);
            CKEDITOR.config.scayt_handleUndoRedo = CKEDITOR.plugins.undo ? CKEDITOR.config.scayt_handleUndoRedo : !1;
            "boolean" !== typeof a.config.scayt_multiLanguageMode && (a.config.scayt_multiLanguageMode = !1);
            "object" !==
            typeof a.config.scayt_multiLanguageStyles && (a.config.scayt_multiLanguageStyles = {});
            a.config.scayt_ignoreAllCapsWords && "boolean" !== typeof a.config.scayt_ignoreAllCapsWords && (a.config.scayt_ignoreAllCapsWords = !1);
            a.config.scayt_ignoreDomainNames && "boolean" !== typeof a.config.scayt_ignoreDomainNames && (a.config.scayt_ignoreDomainNames = !1);
            a.config.scayt_ignoreWordsWithMixedCases && "boolean" !== typeof a.config.scayt_ignoreWordsWithMixedCases && (a.config.scayt_ignoreWordsWithMixedCases = !1);
            a.config.scayt_ignoreWordsWithNumbers &&
                "boolean" !== typeof a.config.scayt_ignoreWordsWithNumbers && (a.config.scayt_ignoreWordsWithNumbers = !1);
            if (a.config.scayt_disableOptionsStorage) {
                var c = CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage) ? a.config.scayt_disableOptionsStorage : "string" === typeof a.config.scayt_disableOptionsStorage ? [a.config.scayt_disableOptionsStorage] : void 0,
                    e = "all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "),
                    f = ["lang", "ignore-all-caps-words",
                        "ignore-domain-names", "ignore-words-with-mixed-cases", "ignore-words-with-numbers"
                    ],
                    g = CKEDITOR.tools.search,
                    h = CKEDITOR.tools.indexOf;
                a.config.scayt_disableOptionsStorage = function(a) {
                    for (var b = [], d = 0; d < a.length; d++) {
                        var c = a[d],
                            m = !!g(a, "options");
                        if (!g(e, c) || m && g(f, function(a) {
                                if ("lang" === a) return !1 })) return;
                        g(f, c) && f.splice(h(f, c), 1);
                        if ("all" === c || m && g(a, "lang")) return []; "options" === c && (f = ["lang"]) }
                    return b = b.concat(f) }(c)
            }
        },
        addRule: function(a) {
            var c = CKEDITOR.plugins.scayt,
                d = a.dataProcessor,
                b = d && d.htmlFilter,
                e = a._.elementsPath && a._.elementsPath.filters,
                d = d && d.dataFilter,
                f = a.addRemoveFormatFilter,
                g = function(b) {
                    if (a.scayt && (b.hasAttribute(c.options.data_attribute_name) || b.hasAttribute(c.options.problem_grammar_data_attribute))) return !1 },
                h = function(b) {
                    var d = !0;
                    a.scayt && (b.hasAttribute(c.options.data_attribute_name) || b.hasAttribute(c.options.problem_grammar_data_attribute)) && (d = !1);
                    return d };
            e && e.push(g);
            d && d.addRules({
                elements: {
                    span: function(a) {
                        var b = a.hasClass(c.options.misspelled_word_class) && a.attributes[c.options.data_attribute_name],
                            d = a.hasClass(c.options.problem_grammar_class) && a.attributes[c.options.problem_grammar_data_attribute];
                        c && (b || d) && delete a.name;
                        return a
                    }
                }
            });
            b && b.addRules({ elements: { span: function(a) {
                        var b = a.hasClass(c.options.misspelled_word_class) && a.attributes[c.options.data_attribute_name],
                            d = a.hasClass(c.options.problem_grammar_class) && a.attributes[c.options.problem_grammar_data_attribute];
                        c && (b || d) && delete a.name;
                        return a } } });
            f && f.call(a, h)
        },
        scaytMenuDefinition: function(a) {
            var c = this;
            a = a.scayt;
            return {
                scayt: {
                    scayt_ignore: {
                        label: a.getLocal("btn_ignore"),
                        group: "scayt_control",
                        order: 1,
                        exec: function(a) { a.scayt.ignoreWord() }
                    },
                    scayt_ignoreall: { label: a.getLocal("btn_ignoreAll"), group: "scayt_control", order: 2, exec: function(a) { a.scayt.ignoreAllWords() } },
                    scayt_add: { label: a.getLocal("btn_addWord"), group: "scayt_control", order: 3, exec: function(a) {
                            var b = a.scayt;
                            setTimeout(function() { b.addWordToUserDictionary() }, 10) } },
                    scayt_option: {
                        label: a.getLocal("btn_options"),
                        group: "scayt_control",
                        order: 4,
                        exec: function(a) { a.scayt.tabToOpen = "options";
                            a.lockSelection();
                            a.openDialog(c.dialogName) },
                        verification: function(a) {
                            return 1 == a.config.scayt_uiTabs[0] ? !0 : !1 }
                    },
                    scayt_language: { label: a.getLocal("btn_langs"), group: "scayt_control", order: 5, exec: function(a) { a.scayt.tabToOpen = "langs";
                            a.lockSelection();
                            a.openDialog(c.dialogName) }, verification: function(a) {
                            return 1 == a.config.scayt_uiTabs[1] ? !0 : !1 } },
                    scayt_dictionary: {
                        label: a.getLocal("btn_dictionaries"),
                        group: "scayt_control",
                        order: 6,
                        exec: function(a) { a.scayt.tabToOpen = "dictionaries";
                            a.lockSelection();
                            a.openDialog(c.dialogName) },
                        verification: function(a) {
                            return 1 ==
                                a.config.scayt_uiTabs[2] ? !0 : !1
                        }
                    },
                    scayt_about: { label: a.getLocal("btn_about"), group: "scayt_control", order: 7, exec: function(a) { a.scayt.tabToOpen = "about";
                            a.lockSelection();
                            a.openDialog(c.dialogName) } }
                },
                grayt: { grayt_problemdescription: { label: "Grammar problem description", group: "grayt_description", order: 1, state: CKEDITOR.TRISTATE_DISABLED, exec: function(a) {} }, grayt_ignore: { label: a.getLocal("btn_ignore"), group: "grayt_control", order: 2, exec: function(a) { a.scayt.ignorePhrase() } } }
            }
        },
        buildSuggestionMenuItems: function(a,
            c, d) {
            var b = {},
                e = {},
                f = d ? "word" : "phrase",
                g = d ? "startGrammarCheck" : "startSpellCheck",
                h = a.scayt;
            if (0 < c.length && "no_any_suggestions" !== c[0])
                if (d)
                    for (d = 0; d < c.length; d++) {
                        var k = "scayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[d].replace(" ", "_");
                        a.addCommand(k, this.createCommand(CKEDITOR.plugins.scayt.suggestions[d], f, g));
                        d < a.config.scayt_maxSuggestions ? (a.addMenuItem(k, { label: c[d], command: k, group: "scayt_suggest", order: d + 1 }), b[k] = CKEDITOR.TRISTATE_OFF) : (a.addMenuItem(k, {
                            label: c[d],
                            command: k,
                            group: "scayt_moresuggest",
                            order: d + 1
                        }), e[k] = CKEDITOR.TRISTATE_OFF, "on" === a.config.scayt_moreSuggestions && (a.addMenuItem("scayt_moresuggest", { label: h.getLocal("btn_moreSuggestions"), group: "scayt_moresuggest", order: 10, getItems: function() {
                                return e } }), b.scayt_moresuggest = CKEDITOR.TRISTATE_OFF))
                    } else
                        for (d = 0; d < c.length; d++) k = "grayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[d].replace(" ", "_"), a.addCommand(k, this.createCommand(CKEDITOR.plugins.scayt.suggestions[d], f, g)), a.addMenuItem(k, {
                            label: c[d],
                            command: k,
                            group: "grayt_suggest",
                            order: d + 1
                        }), b[k] = CKEDITOR.TRISTATE_OFF;
                else b.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, a.addCommand("no_scayt_suggest", { exec: function() {} }), a.addMenuItem("no_scayt_suggest", { label: h.getLocal("btn_noSuggestions") || "no_scayt_suggest", command: "no_scayt_suggest", group: "scayt_suggest", order: 0 });
            return b
        },
        menuGenerator: function(a, c) {
            var d = a.scayt,
                b = this.scaytMenuDefinition(a),
                e = {},
                f = a.config.scayt_contextCommands.split("|"),
                g = c.getAttribute(d.getLangAttribute()) || d.getLang(),
                h, k;
            h = d.isScaytNode(c);
            k =
                d.isGraytNode(c);
            h ? (b = b.scayt, e = c.getAttribute(d.getScaytNodeAttributeName()), d.fire("getSuggestionsList", { lang: g, word: e }), e = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, h)) : k && (b = b.grayt, e = c.getAttribute(d.getGraytNodeAttributeName()), k = d.getProblemDescriptionText(e, g), b.grayt_problemdescription && k && (b.grayt_problemdescription.label = k), d.fire("getGrammarSuggestionsList", { lang: g, phrase: e }), e = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, h));
            if (h && "off" ==
                a.config.scayt_contextCommands) return e;
            for (var l in b) h && -1 == CKEDITOR.tools.indexOf(f, l.replace("scayt_", "")) && "all" != a.config.scayt_contextCommands || (e[l] = "undefined" != typeof b[l].state ? b[l].state : CKEDITOR.TRISTATE_OFF, "function" !== typeof b[l].verification || b[l].verification(a) || delete e[l], a.addCommand(l, { exec: b[l].exec }), a.addMenuItem(l, { label: a.lang.scayt[b[l].label] || b[l].label, command: l, group: b[l].group, order: b[l].order }));
            return e
        },
        createCommand: function(a, c, d) {
            return {
                exec: function(b) {
                    b = b.scayt;
                    var e = {};
                    e[c] = a;
                    b.replaceSelectionNode(e);
                    "startGrammarCheck" === d && b.removeMarkupInSelectionNode({ grammarOnly: !0 });
                    b.fire(d)
                }
            }
        }
    });
    CKEDITOR.plugins.scayt = {
        charsToObserve: [{ charName: "cke-fillingChar", charCode: function() {
                var a = CKEDITOR.version.match(/^\d(\.\d*)*/),
                    a = a && a[0],
                    c;
                if (a) { c = "4.5.7";
                    var d, a = a.replace(/\./g, "");
                    c = c.replace(/\./g, "");
                    d = a.length - c.length;
                    d = 0 <= d ? d : 0;
                    c = parseInt(a) >= parseInt(c) * Math.pow(10, d) }
                return c ? Array(7).join(String.fromCharCode(8203)) : String.fromCharCode(8203) }() }],
        onLoadTimestamp: "",
        state: { scayt: {}, grayt: {} },
        warningCounter: 0,
        suggestions: [],
        options: {
            disablingCommandExec: { source: !0, newpage: !0, templates: !0 },
            data_attribute_name: "data-scayt-word",
            misspelled_word_class: "scayt-misspell-word",
            problem_grammar_data_attribute: "data-grayt-phrase",
            problem_grammar_class: "gramm-problem"
        },
        backCompatibilityMap: { scayt_service_protocol: "scayt_serviceProtocol", scayt_service_host: "scayt_serviceHost", scayt_service_port: "scayt_servicePort", scayt_service_path: "scayt_servicePath", scayt_customerid: "scayt_customerId" },
        alarmCompatibilityMessage: function() {
            5 > this.warningCounter && (console.warn("Note: You are using latest version of SCAYT plug-in. It is recommended to upgrade WebSpellChecker.net application to version v4.8.3.Contact us by e-mail at support@webspellchecker.net."),
                this.warningCounter += 1)
        },
        reloadMarkup: function(a) {
            var c;
            a && (c = a.getScaytLangList(), a.reloadMarkup ? a.reloadMarkup() : (this.alarmCompatibilityMessage(), c && c.ltr && c.rtl && a.fire("startSpellCheck, startGrammarCheck"))) },
        replaceOldOptionsNames: function(a) {
            for (var c in a) c in this.backCompatibilityMap && (a[this.backCompatibilityMap[c]] = a[c], delete a[c]) },
        createScayt: function(a) {
            var c = this,
                d = CKEDITOR.plugins.scayt;
            this.loadScaytLibrary(a, function(a) {
                function e(a) {
                    return new SCAYT.CKSCAYT(a, function() {}, function() {}) }
                var f = a.window && a.window.getFrame() || a.editable();
                if (f) {
                    f = {
                        lang: a.config.scayt_sLang,
                        container: f.$,
                        customDictionary: a.config.scayt_customDictionaryIds,
                        userDictionaryName: a.config.scayt_userDictionaryName,
                        localization: a.langCode,
                        customer_id: a.config.scayt_customerId,
                        debug: a.config.scayt_debug,
                        data_attribute_name: c.options.data_attribute_name,
                        misspelled_word_class: c.options.misspelled_word_class,
                        problem_grammar_data_attribute: c.options.problem_grammar_data_attribute,
                        problem_grammar_class: c.options.problem_grammar_class,
                        "options-to-restore": a.config.scayt_disableOptionsStorage,
                        focused: a.editable().hasFocus,
                        ignoreElementsRegex: a.config.scayt_elementsToIgnore,
                        minWordLength: a.config.scayt_minWordLength,
                        multiLanguageMode: a.config.scayt_multiLanguageMode,
                        multiLanguageStyles: a.config.scayt_multiLanguageStyles,
                        graytAutoStartup: d.state.grayt[a.name],
                        charsToObserve: d.charsToObserve
                    };
                    a.config.scayt_serviceProtocol && (f.service_protocol = a.config.scayt_serviceProtocol);
                    a.config.scayt_serviceHost && (f.service_host = a.config.scayt_serviceHost);
                    a.config.scayt_servicePort && (f.service_port = a.config.scayt_servicePort);
                    a.config.scayt_servicePath && (f.service_path = a.config.scayt_servicePath);
                    "boolean" === typeof a.config.scayt_ignoreAllCapsWords && (f["ignore-all-caps-words"] = a.config.scayt_ignoreAllCapsWords);
                    "boolean" === typeof a.config.scayt_ignoreDomainNames && (f["ignore-domain-names"] = a.config.scayt_ignoreDomainNames);
                    "boolean" === typeof a.config.scayt_ignoreWordsWithMixedCases && (f["ignore-words-with-mixed-cases"] = a.config.scayt_ignoreWordsWithMixedCases);
                    "boolean" === typeof a.config.scayt_ignoreWordsWithNumbers && (f["ignore-words-with-numbers"] = a.config.scayt_ignoreWordsWithNumbers);
                    var g;
                    try { g = e(f) } catch (h) { c.alarmCompatibilityMessage(), delete f.charsToObserve, g = e(f) }
                    g.subscribe("suggestionListSend", function(a) {
                        for (var b = {}, d = [], c = 0; c < a.suggestionList.length; c++) b["word_" + a.suggestionList[c]] || (b["word_" + a.suggestionList[c]] = a.suggestionList[c], d.push(a.suggestionList[c]));
                        CKEDITOR.plugins.scayt.suggestions = d });
                    g.subscribe("selectionIsChanged", function(d) {
                        a.getSelection().isLocked &&
                            a.lockSelection()
                    });
                    g.subscribe("graytStateChanged", function(c) { d.state.grayt[a.name] = c.state });
                    g.addMarkupHandler && g.addMarkupHandler(function(c) {
                        var d = a.editable(),
                            e = d.getCustomData(c.charName);
                        e && (e.$ = c.node, d.setCustomData(c.charName, e)) });
                    a.scayt = g;
                    a.fire("scaytButtonState", a.readOnly ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_ON)
                } else d.state.scayt[a.name] = !1
            })
        },
        destroy: function(a) { a.scayt && a.scayt.destroy();
            delete a.scayt;
            a.fire("scaytButtonState", CKEDITOR.TRISTATE_OFF) },
        loadScaytLibrary: function(a,
            c) {
            var d, b = function() { CKEDITOR.fireOnce("scaytReady");
                a.scayt || "function" === typeof c && c(a) }; "undefined" === typeof window.SCAYT || "function" !== typeof window.SCAYT.CKSCAYT ? (d = a.config.scayt_srcUrl + "?" + this.onLoadTimestamp, CKEDITOR.scriptLoader.load(d, function(a) { a && b() })) : window.SCAYT && "function" === typeof window.SCAYT.CKSCAYT && b() }
    };
    CKEDITOR.on("dialogDefinition", function(a) {
        var c = a.data.name;
        a = a.data.definition.dialog;
        if ("scaytDialog" === c) a.on("cancel", function(a) {
            return !1 }, this, null, -1);
        if ("checkspell" === c) a.on("cancel", function(a) { a = a.sender && a.sender.getParentEditor();
            var b = CKEDITOR.plugins.scayt,
                c = a.scayt;
            c && b.state.scayt[a.name] && c.setMarkupPaused && c.setMarkupPaused(!1);
            a.unlockSelection() }, this, null, -2);
        if ("link" === c) a.on("ok", function(a) {
            var b = a.sender && a.sender.getParentEditor();
            b && setTimeout(function() {
                b.fire("reloadMarkupScayt", { removeOptions: { removeInside: !0, forceBookmark: !0 }, timeout: 0 })
            }, 0)
        })
    });
    CKEDITOR.on("scaytReady", function() {
        if (!0 === CKEDITOR.config.scayt_handleCheckDirty) {
            var a = CKEDITOR.editor.prototype;
            a.checkDirty = CKEDITOR.tools.override(a.checkDirty, function(a) {
                return function() {
                    var b = null,
                        c = this.scayt;
                    if (CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt) {
                        if (b = "ready" == this.status) var f = c.removeMarkupFromString(this.getSnapshot()),
                            c = c.removeMarkupFromString(this._.previousValue),
                            b = b && c !== f } else b = a.call(this);
                    return b } });
            a.resetDirty = CKEDITOR.tools.override(a.resetDirty,
                function(a) {
                    return function() {
                        var b = this.scayt;
                        CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt ? this._.previousValue = b.removeMarkupFromString(this.getSnapshot()) : a.call(this) } })
        }
        if (!0 === CKEDITOR.config.scayt_handleUndoRedo) {
            var a = CKEDITOR.plugins.undo.Image.prototype,
                c = "function" == typeof a.equalsContent ? "equalsContent" : "equals";
            a[c] = CKEDITOR.tools.override(a[c], function(a) {
                return function(b) {
                    var c = b.editor.scayt,
                        f = this.contents,
                        g = b.contents,
                        h = null;
                    CKEDITOR.plugins.scayt &&
                        CKEDITOR.plugins.scayt.state.scayt[b.editor.name] && b.editor.scayt && (this.contents = c.removeMarkupFromString(f) || "", b.contents = c.removeMarkupFromString(g) || "");
                    h = a.apply(this, arguments);
                    this.contents = f;
                    b.contents = g;
                    return h
                }
            })
        }
    });
    (function() {
        CKEDITOR.plugins.add("stylescombo", {
            requires: "richcombo",
            init: function(c) {
                var l = c.config,
                    g = c.lang.stylescombo,
                    f = {},
                    k = [],
                    m = [];
                c.on("stylesSet", function(b) {
                    if (b = b.data.styles) {
                        for (var a, h, d, e = 0, n = b.length; e < n; e++)(a = b[e], c.blockless && a.element in CKEDITOR.dtd.$block || "string" == typeof a.type && !CKEDITOR.style.customHandlers[a.type] || (h = a.name, a = new CKEDITOR.style(a), c.filter.customConfig && !c.filter.check(a))) || (a._name = h, a._.enterMode = l.enterMode, a._.type = d = a.assignedTo || a.type, a._.weight =
                            e + 1E3 * (d == CKEDITOR.STYLE_OBJECT ? 1 : d == CKEDITOR.STYLE_BLOCK ? 2 : 3), f[h] = a, k.push(a), m.push(a));
                        k.sort(function(a, b) {
                            return a._.weight - b._.weight })
                    }
                });
                c.ui.addRichCombo("Styles", {
                    label: g.label,
                    title: g.panelTitle,
                    toolbar: "styles,10",
                    allowedContent: m,
                    panel: { css: [CKEDITOR.skin.getPath("editor")].concat(l.contentsCss), multiSelect: !0, attributes: { "aria-label": g.panelTitle } },
                    init: function() {
                        var b, a, c, d, e, f;
                        e = 0;
                        for (f = k.length; e < f; e++) b = k[e], a = b._name, d = b._.type, d != c && (this.startGroup(g["panelTitle" + String(d)]),
                            c = d), this.add(a, b.type == CKEDITOR.STYLE_OBJECT ? a : b.buildPreview(), a);
                        this.commit()
                    },
                    onClick: function(b) { c.focus();
                        c.fire("saveSnapshot");
                        b = f[b];
                        var a = c.elementPath();
                        if (b.group && b.removeStylesFromSameGroup(c)) c.applyStyle(b);
                        else c[b.checkActive(a, c) ? "removeStyle" : "applyStyle"](b);
                        c.fire("saveSnapshot") },
                    onRender: function() {
                        c.on("selectionChange", function(b) {
                            var a = this.getValue();
                            b = b.data.path.elements;
                            for (var h = 0, d = b.length, e; h < d; h++) {
                                e = b[h];
                                for (var g in f)
                                    if (f[g].checkElementRemovable(e, !0, c)) {
                                        g !=
                                            a && this.setValue(g);
                                        return
                                    }
                            }
                            this.setValue("")
                        }, this)
                    },
                    onOpen: function() {
                        var b = c.getSelection().getSelectedElement(),
                            b = c.elementPath(b),
                            a = [0, 0, 0, 0];
                        this.showAll();
                        this.unmarkAll();
                        for (var h in f) {
                            var d = f[h],
                                e = d._.type;
                            d.checkApplicable(b, c, c.activeFilter) ? a[e]++ : this.hideItem(h);
                            d.checkActive(b, c) && this.mark(h) }
                        a[CKEDITOR.STYLE_BLOCK] || this.hideGroup(g["panelTitle" + String(CKEDITOR.STYLE_BLOCK)]);
                        a[CKEDITOR.STYLE_INLINE] || this.hideGroup(g["panelTitle" + String(CKEDITOR.STYLE_INLINE)]);
                        a[CKEDITOR.STYLE_OBJECT] ||
                            this.hideGroup(g["panelTitle" + String(CKEDITOR.STYLE_OBJECT)])
                    },
                    refresh: function() {
                        var b = c.elementPath();
                        if (b) {
                            for (var a in f)
                                if (f[a].checkApplicable(b, c, c.activeFilter)) return;
                            this.setState(CKEDITOR.TRISTATE_DISABLED) } },
                    reset: function() { f = {};
                        k = [] }
                })
            }
        })
    })();
    (function() {
        function k(c) {
            return {
                editorFocus: !1,
                canUndo: !1,
                modes: { wysiwyg: 1 },
                exec: function(d) {
                    if (d.editable().hasFocus) {
                        var e = d.getSelection(),
                            b;
                        if (b = (new CKEDITOR.dom.elementPath(e.getCommonAncestor(), e.root)).contains({ td: 1, th: 1 }, 1)) {
                            var e = d.createRange(),
                                a = CKEDITOR.tools.tryThese(function() {
                                    var a = b.getParent().$.cells[b.$.cellIndex + (c ? -1 : 1)];
                                    a.parentNode.parentNode;
                                    return a }, function() {
                                    var a = b.getParent(),
                                        a = a.getAscendant("table").$.rows[a.$.rowIndex + (c ? -1 : 1)];
                                    return a.cells[c ? a.cells.length - 1 :
                                        0]
                                });
                            if (a || c)
                                if (a) a = new CKEDITOR.dom.element(a), e.moveToElementEditStart(a), e.checkStartOfBlock() && e.checkEndOfBlock() || e.selectNodeContents(a);
                                else return !0;
                            else {
                                for (var f = b.getAscendant("table").$, a = b.getParent().$.cells, f = new CKEDITOR.dom.element(f.insertRow(-1), d.document), g = 0, h = a.length; g < h; g++) f.append((new CKEDITOR.dom.element(a[g], d.document)).clone(!1, !1)).appendBogus();
                                e.moveToElementEditStart(f) }
                            e.select(!0);
                            return !0
                        }
                    }
                    return !1
                }
            }
        }
        var h = { editorFocus: !1, modes: { wysiwyg: 1, source: 1 } },
            g = {
                exec: function(c) {
                    c.container.focusNext(!0,
                        c.tabIndex)
                }
            },
            f = { exec: function(c) { c.container.focusPrevious(!0, c.tabIndex) } };
        CKEDITOR.plugins.add("tab", {
            init: function(c) {
                for (var d = !1 !== c.config.enableTabKeyTools, e = c.config.tabSpaces || 0, b = ""; e--;) b += " ";
                if (b) c.on("key", function(a) { 9 == a.data.keyCode && (c.insertText(b), a.cancel()) });
                if (d) c.on("key", function(a) {
                    (9 == a.data.keyCode && c.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && c.execCommand("selectPreviousCell")) && a.cancel() });
                c.addCommand("blur", CKEDITOR.tools.extend(g, h));
                c.addCommand("blurBack",
                    CKEDITOR.tools.extend(f, h));
                c.addCommand("selectNextCell", k());
                c.addCommand("selectPreviousCell", k(!0))
            }
        })
    })();
    CKEDITOR.dom.element.prototype.focusNext = function(k, h) {
        var g = void 0 === h ? this.getTabIndex() : h,
            f, c, d, e, b, a;
        if (0 >= g)
            for (b = this.getNextSourceNode(k, CKEDITOR.NODE_ELEMENT); b;) {
                if (b.isVisible() && 0 === b.getTabIndex()) { d = b;
                    break }
                b = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT) } else
                for (b = this.getDocument().getBody().getFirst(); b = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
                    if (!f)
                        if (!c && b.equals(this)) {
                            if (c = !0, k) {
                                if (!(b = b.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
                                f = 1 } } else c && !this.contains(b) &&
                            (f = 1);
                    if (b.isVisible() && !(0 > (a = b.getTabIndex()))) {
                        if (f && a == g) { d = b;
                            break }
                        a > g && (!d || !e || a < e) ? (d = b, e = a) : d || 0 !== a || (d = b, e = a) }
                }
        d && d.focus()
    };
    CKEDITOR.dom.element.prototype.focusPrevious = function(k, h) {
        for (var g = void 0 === h ? this.getTabIndex() : h, f, c, d, e = 0, b, a = this.getDocument().getBody().getLast(); a = a.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
            if (!f)
                if (!c && a.equals(this)) {
                    if (c = !0, k) {
                        if (!(a = a.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
                        f = 1 } } else c && !this.contains(a) && (f = 1);
            if (a.isVisible() && !(0 > (b = a.getTabIndex())))
                if (0 >= g) {
                    if (f && 0 === b) { d = a;
                        break }
                    b > e && (d = a, e = b) } else {
                    if (f && b == g) { d = a;
                        break }
                    b < g && (!d || b > e) && (d = a, e = b) } }
        d && d.focus() };
    CKEDITOR.plugins.add("table", {
        requires: "dialog",
        init: function(a) {
            function e(b) {
                return CKEDITOR.tools.extend(b || {}, { contextSensitive: 1, refresh: function(b, a) { this.setState(a.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) }
            if (!a.blockless) {
                var c = a.lang.table;
                a.addCommand("table", new CKEDITOR.dialogCommand("table", {
                    context: "table",
                    allowedContent: "table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" + (a.plugins.dialogadvtab ?
                        "table" + a.plugins.dialogadvtab.allowedContent() : ""),
                    requiredContent: "table",
                    contentTransformations: [
                        ["table{width}: sizeToStyle", "table[width]: sizeToAttribute"],
                        ["td: splitBorderShorthand"],
                        [{ element: "table", right: function(b) { b.styles && (b.styles.border && b.styles.border.match(/solid/) && (b.attributes.border = 1), "collapse" == b.styles["border-collapse"] && (b.attributes.cellspacing = 0)) } }]
                    ]
                }));
                a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", e()));
                a.addCommand("tableDelete", e({
                    exec: function(b) {
                        var a =
                            b.elementPath().contains("table", 1);
                        if (a) {
                            var d = a.getParent(),
                                c = b.editable();
                            1 != d.getChildCount() || d.is("td", "th") || d.equals(c) || (a = d);
                            b = b.createRange();
                            b.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
                            a.remove();
                            b.select() }
                    }
                }));
                a.ui.addButton && a.ui.addButton("Table", { label: c.toolbar, command: "table", toolbar: "insert,30" });
                CKEDITOR.dialog.add("table", this.path + "dialogs/table.js");
                CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js");
                a.addMenuItems && a.addMenuItems({
                    table: {
                        label: c.menu,
                        command: "tableProperties",
                        group: "table",
                        order: 5
                    },
                    tabledelete: { label: c.deleteTable, command: "tableDelete", group: "table", order: 1 }
                });
                a.on("doubleclick", function(a) { a.data.element.is("table") && (a.data.dialog = "tableProperties") });
                a.contextMenu && a.contextMenu.addListener(function() {
                    return { tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF } })
            }
        }
    });
    (function() {
        function t(e) {
            function d(a) { 0 < b.length || a.type != CKEDITOR.NODE_ELEMENT || !C.test(a.getName()) || a.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(c, a, "selected_cell", !0), b.push(a)) }
            e = e.getRanges();
            for (var b = [], c = {}, a = 0; a < e.length; a++) {
                var f = e[a];
                if (f.collapsed) f = f.getCommonAncestor(), (f = f.getAscendant("td", !0) || f.getAscendant("th", !0)) && b.push(f);
                else {
                    var f = new CKEDITOR.dom.walker(f),
                        g;
                    for (f.guard = d; g = f.next();) g.type == CKEDITOR.NODE_ELEMENT && g.is(CKEDITOR.dtd.table) || (g = g.getAscendant("td", !0) || g.getAscendant("th", !0)) && !g.getCustomData("selected_cell") && (CKEDITOR.dom.element.setMarker(c, g, "selected_cell", !0), b.push(g))
                }
            }
            CKEDITOR.dom.element.clearAllMarkers(c);
            return b
        }

        function p(e, d) {
            for (var b = t(e), c = b[0], a = c.getAscendant("table"), c = c.getDocument(), f = b[0].getParent(), g = f.$.rowIndex, b = b[b.length - 1], h = b.getParent().$.rowIndex + b.$.rowSpan - 1, b = new CKEDITOR.dom.element(a.$.rows[h]), g = d ? g : h, f = d ? f : b, b = CKEDITOR.tools.buildTableMap(a), a = b[g], g = d ? b[g - 1] : b[g + 1], b = b[0].length, c = c.createElement("tr"),
                    h = 0; a[h] && h < b; h++) {
                var k;
                1 < a[h].rowSpan && g && a[h] == g[h] ? (k = a[h], k.rowSpan += 1) : (k = (new CKEDITOR.dom.element(a[h])).clone(), k.removeAttribute("rowSpan"), k.appendBogus(), c.append(k), k = k.$);
                h += k.colSpan - 1 }
            d ? c.insertBefore(f) : c.insertAfter(f)
        }

        function u(e) {
            if (e instanceof CKEDITOR.dom.selection) {
                var d = t(e),
                    b = d[0].getAscendant("table"),
                    c = CKEDITOR.tools.buildTableMap(b);
                e = d[0].getParent().$.rowIndex;
                for (var d = d[d.length - 1], a = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = [], f = e; f <= a; f++) {
                    for (var g = c[f], h = new CKEDITOR.dom.element(b.$.rows[f]),
                            k = 0; k < g.length; k++) {
                        var l = new CKEDITOR.dom.element(g[k]),
                            n = l.getParent().$.rowIndex;
                        1 == l.$.rowSpan ? l.remove() : (--l.$.rowSpan, n == f && (n = c[f + 1], n[k - 1] ? l.insertAfter(new CKEDITOR.dom.element(n[k - 1])) : (new CKEDITOR.dom.element(b.$.rows[f + 1])).append(l, 1)));
                        k += l.$.colSpan - 1 }
                    d.push(h)
                }
                c = b.$.rows;
                b = new CKEDITOR.dom.element(c[a + 1] || (0 < e ? c[e - 1] : null) || b.$.parentNode);
                for (f = d.length; 0 <= f; f--) u(d[f]);
                return b
            }
            e instanceof CKEDITOR.dom.element && (b = e.getAscendant("table"), 1 == b.$.rows.length ? b.remove() : e.remove());
            return null
        }

        function v(e, d) {
            for (var b = d ? Infinity : 0, c = 0; c < e.length; c++) {
                var a;
                a = e[c];
                for (var f = d, g = a.getParent().$.cells, h = 0, k = 0; k < g.length; k++) {
                    var l = g[k],
                        h = h + (f ? 1 : l.colSpan);
                    if (l == a.$) break }
                a = h - 1;
                if (d ? a < b : a > b) b = a }
            return b }

        function m(e, d) {
            for (var b = t(e), c = b[0].getAscendant("table"), a = v(b, 1), b = v(b), a = d ? a : b, f = CKEDITOR.tools.buildTableMap(c), c = [], b = [], g = f.length, h = 0; h < g; h++) c.push(f[h][a]), b.push(d ? f[h][a - 1] : f[h][a + 1]);
            for (h = 0; h < g; h++) c[h] && (1 < c[h].colSpan && b[h] == c[h] ? (a = c[h], a.colSpan += 1) : (a = (new CKEDITOR.dom.element(c[h])).clone(),
                a.removeAttribute("colSpan"), a.appendBogus(), a[d ? "insertBefore" : "insertAfter"].call(a, new CKEDITOR.dom.element(c[h])), a = a.$), h += a.rowSpan - 1)
        }

        function y(e, d) {
            var b = e.getStartElement();
            if (b = b.getAscendant("td", 1) || b.getAscendant("th", 1)) {
                var c = b.clone();
                c.appendBogus();
                d ? c.insertBefore(b) : c.insertAfter(b) } }

        function x(e) {
            if (e instanceof CKEDITOR.dom.selection) {
                e = t(e);
                var d = e[0] && e[0].getAscendant("table"),
                    b;
                a: {
                    var c = 0;b = e.length - 1;
                    for (var a = {}, f, g; f = e[c++];) CKEDITOR.dom.element.setMarker(a, f, "delete_cell", !0);
                    for (c = 0; f = e[c++];)
                        if ((g = f.getPrevious()) && !g.getCustomData("delete_cell") || (g = f.getNext()) && !g.getCustomData("delete_cell")) { CKEDITOR.dom.element.clearAllMarkers(a);
                            b = g;
                            break a }
                    CKEDITOR.dom.element.clearAllMarkers(a);g = e[0].getParent();
                    (g = g.getPrevious()) ? b = g.getLast() : (g = e[b].getParent(), b = (g = g.getNext()) ? g.getChild(0) : null)
                }
                for (g = e.length - 1; 0 <= g; g--) x(e[g]);
                b ? q(b, !0) : d && d.remove()
            } else e instanceof CKEDITOR.dom.element && (d = e.getParent(), 1 == d.getChildCount() ? d.remove() : e.remove())
        }

        function q(e,
            d) {
            var b = e.getDocument(),
                c = CKEDITOR.document;
            CKEDITOR.env.ie && 10 == CKEDITOR.env.version && (c.focus(), b.focus());
            b = new CKEDITOR.dom.range(b);
            b["moveToElementEdit" + (d ? "End" : "Start")](e) || (b.selectNodeContents(e), b.collapse(d ? !1 : !0));
            b.select(!0) }

        function z(e, d, b) { e = e[d];
            if ("undefined" == typeof b) return e;
            for (d = 0; e && d < e.length; d++) {
                if (b.is && e[d] == b.$) return d;
                if (d == b) return new CKEDITOR.dom.element(e[d]) }
            return b.is ? -1 : null }

        function w(e, d, b) {
            var c = t(e),
                a;
            if ((d ? 1 != c.length : 2 > c.length) || (a = e.getCommonAncestor()) &&
                a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) return !1;
            var f;
            e = c[0];
            a = e.getAscendant("table");
            var g = CKEDITOR.tools.buildTableMap(a),
                h = g.length,
                k = g[0].length,
                l = e.getParent().$.rowIndex,
                n = z(g, l, e);
            if (d) {
                var r;
                try {
                    var q = parseInt(e.getAttribute("rowspan"), 10) || 1;
                    f = parseInt(e.getAttribute("colspan"), 10) || 1;
                    r = g["up" == d ? l - q : "down" == d ? l + q : l]["left" == d ? n - f : "right" == d ? n + f : n] } catch (D) {
                    return !1 }
                if (!r || e.$ == r) return !1;
                c["up" == d || "left" == d ? "unshift" : "push"](new CKEDITOR.dom.element(r)) }
            d = e.getDocument();
            var p = l,
                q = r = 0,
                u = !b && new CKEDITOR.dom.documentFragment(d),
                w = 0;
            for (d = 0; d < c.length; d++) { f = c[d];
                var m = f.getParent(),
                    x = f.getFirst(),
                    v = f.$.colSpan,
                    y = f.$.rowSpan,
                    m = m.$.rowIndex,
                    A = z(g, m, f),
                    w = w + v * y,
                    q = Math.max(q, A - n + v);
                r = Math.max(r, m - l + y);
                b || (v = f, (y = v.getBogus()) && y.remove(), v.trim(), f.getChildren().count() && (m == p || !x || x.isBlockBoundary && x.isBlockBoundary({ br: 1 }) || (p = u.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !p || p.is && p.is("br") || u.append("br")), f.moveChildren(u)), d ? f.remove() : f.setHtml(""));
                p = m }
            if (b) return r *
                q == w;
            u.moveChildren(e);
            e.appendBogus();
            q >= k ? e.removeAttribute("rowSpan") : e.$.rowSpan = r;
            r >= h ? e.removeAttribute("colSpan") : e.$.colSpan = q;
            b = new CKEDITOR.dom.nodeList(a.$.rows);
            c = b.count();
            for (d = c - 1; 0 <= d; d--) a = b.getItem(d), a.$.cells.length || (a.remove(), c++);
            return e
        }

        function A(e, d) {
            var b = t(e);
            if (1 < b.length) return !1;
            if (d) return !0;
            var b = b[0],
                c = b.getParent(),
                a = c.getAscendant("table"),
                f = CKEDITOR.tools.buildTableMap(a),
                g = c.$.rowIndex,
                h = z(f, g, b),
                k = b.$.rowSpan,
                l;
            if (1 < k) {
                l = Math.ceil(k / 2);
                for (var k = Math.floor(k /
                        2), c = g + l, a = new CKEDITOR.dom.element(a.$.rows[c]), f = z(f, c), n, c = b.clone(), g = 0; g < f.length; g++)
                    if (n = f[g], n.parentNode == a.$ && g > h) { c.insertBefore(new CKEDITOR.dom.element(n));
                        break } else n = null;
                n || a.append(c)
            } else
                for (k = l = 1, a = c.clone(), a.insertAfter(c), a.append(c = b.clone()), n = z(f, g), h = 0; h < n.length; h++) n[h].rowSpan++;
            c.appendBogus();
            b.$.rowSpan = l;
            c.$.rowSpan = k;
            1 == l && b.removeAttribute("rowSpan");
            1 == k && c.removeAttribute("rowSpan");
            return c
        }

        function B(e, d) {
            var b = t(e);
            if (1 < b.length) return !1;
            if (d) return !0;
            var b =
                b[0],
                c = b.getParent(),
                a = c.getAscendant("table"),
                a = CKEDITOR.tools.buildTableMap(a),
                f = z(a, c.$.rowIndex, b),
                g = b.$.colSpan;
            if (1 < g) c = Math.ceil(g / 2), g = Math.floor(g / 2);
            else {
                for (var g = c = 1, h = [], k = 0; k < a.length; k++) {
                    var l = a[k];
                    h.push(l[f]);
                    1 < l[f].rowSpan && (k += l[f].rowSpan - 1) }
                for (a = 0; a < h.length; a++) h[a].colSpan++ }
            a = b.clone();
            a.insertAfter(b);
            a.appendBogus();
            b.$.colSpan = c;
            a.$.colSpan = g;
            1 == c && b.removeAttribute("colSpan");
            1 == g && a.removeAttribute("colSpan");
            return a
        }
        var C = /^(?:td|th)$/;
        CKEDITOR.plugins.tabletools = {
            requires: "table,dialog,contextmenu",
            init: function(e) {
                function d(a) {
                    return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function(a, b) { this.setState(b.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) }

                function b(a, b) {
                    var c = e.addCommand(a, b);
                    e.addFeature(c) }
                var c = e.lang.table;
                b("cellProperties", new CKEDITOR.dialogCommand("cellProperties", d({
                    allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",
                    requiredContent: "table",
                    contentTransformations: [
                        [{ element: "td", left: function(a) {
                                return a.styles.background && a.styles.background.match(/^(#[a-fA-F0-9]{3,6}|rgb\([\d, ]+\)|\w+)$/) }, right: function(a) { a.styles["background-color"] = a.styles.background } }]
                    ]
                })));
                CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js");
                b("rowDelete", d({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                        q(u(a)) } }));
                b("rowInsertBefore", d({
                    requiredContent: "table",
                    exec: function(a) {
                        a = a.getSelection();
                        p(a, !0)
                    }
                }));
                b("rowInsertAfter", d({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                        p(a) } }));
                b("columnDelete", d({
                    requiredContent: "table",
                    exec: function(a) {
                        a = a.getSelection();
                        a = t(a);
                        var b = a[0],
                            c = a[a.length - 1];
                        a = b.getAscendant("table");
                        for (var d = CKEDITOR.tools.buildTableMap(a), e, l, n = [], r = 0, p = d.length; r < p; r++)
                            for (var m = 0, u = d[r].length; m < u; m++) d[r][m] == b.$ && (e = m), d[r][m] == c.$ && (l = m);
                        for (r = e; r <= l; r++)
                            for (m = 0; m < d.length; m++) c = d[m], b = new CKEDITOR.dom.element(a.$.rows[m]), c = new CKEDITOR.dom.element(c[r]),
                                c.$ && (1 == c.$.colSpan ? c.remove() : --c.$.colSpan, m += c.$.rowSpan - 1, b.$.cells.length || n.push(b));
                        l = a.$.rows[0] && a.$.rows[0].cells;
                        e = new CKEDITOR.dom.element(l[e] || (e ? l[e - 1] : a.$.parentNode));
                        n.length == p && a.remove();
                        e && q(e, !0)
                    }
                }));
                b("columnInsertBefore", d({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                        m(a, !0) } }));
                b("columnInsertAfter", d({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                        m(a) } }));
                b("cellDelete", d({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                        x(a) } }));
                b("cellMerge", d({ allowedContent: "td[colspan,rowspan]", requiredContent: "td[colspan,rowspan]", exec: function(a) { q(w(a.getSelection()), !0) } }));
                b("cellMergeRight", d({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function(a) { q(w(a.getSelection(), "right"), !0) } }));
                b("cellMergeDown", d({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function(a) { q(w(a.getSelection(), "down"), !0) } }));
                b("cellVerticalSplit", d({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function(a) { q(B(a.getSelection())) } }));
                b("cellHorizontalSplit", d({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function(a) { q(A(a.getSelection())) } }));
                b("cellInsertBefore", d({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                        y(a, !0) } }));
                b("cellInsertAfter", d({ requiredContent: "table", exec: function(a) { a = a.getSelection();
                        y(a) } }));
                e.addMenuItems && e.addMenuItems({
                    tablecell: {
                        label: c.cell.menu,
                        group: "tablecell",
                        order: 1,
                        getItems: function() {
                            var a = e.getSelection(),
                                b = t(a);
                            return {
                                tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
                                tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablecell_delete: CKEDITOR.TRISTATE_OFF,
                                tablecell_merge: w(a, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_merge_right: w(a, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_merge_down: w(a, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_split_vertical: B(a, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_split_horizontal: A(a, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_properties: 0 <
                                    b.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                            }
                        }
                    },
                    tablecell_insertBefore: { label: c.cell.insertBefore, group: "tablecell", command: "cellInsertBefore", order: 5 },
                    tablecell_insertAfter: { label: c.cell.insertAfter, group: "tablecell", command: "cellInsertAfter", order: 10 },
                    tablecell_delete: { label: c.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15 },
                    tablecell_merge: { label: c.cell.merge, group: "tablecell", command: "cellMerge", order: 16 },
                    tablecell_merge_right: {
                        label: c.cell.mergeRight,
                        group: "tablecell",
                        command: "cellMergeRight",
                        order: 17
                    },
                    tablecell_merge_down: { label: c.cell.mergeDown, group: "tablecell", command: "cellMergeDown", order: 18 },
                    tablecell_split_horizontal: { label: c.cell.splitHorizontal, group: "tablecell", command: "cellHorizontalSplit", order: 19 },
                    tablecell_split_vertical: { label: c.cell.splitVertical, group: "tablecell", command: "cellVerticalSplit", order: 20 },
                    tablecell_properties: { label: c.cell.title, group: "tablecellproperties", command: "cellProperties", order: 21 },
                    tablerow: {
                        label: c.row.menu,
                        group: "tablerow",
                        order: 1,
                        getItems: function() {
                            return { tablerow_insertBefore: CKEDITOR.TRISTATE_OFF, tablerow_insertAfter: CKEDITOR.TRISTATE_OFF, tablerow_delete: CKEDITOR.TRISTATE_OFF } }
                    },
                    tablerow_insertBefore: { label: c.row.insertBefore, group: "tablerow", command: "rowInsertBefore", order: 5 },
                    tablerow_insertAfter: { label: c.row.insertAfter, group: "tablerow", command: "rowInsertAfter", order: 10 },
                    tablerow_delete: { label: c.row.deleteRow, group: "tablerow", command: "rowDelete", order: 15 },
                    tablecolumn: {
                        label: c.column.menu,
                        group: "tablecolumn",
                        order: 1,
                        getItems: function() {
                            return { tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF, tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF, tablecolumn_delete: CKEDITOR.TRISTATE_OFF } }
                    },
                    tablecolumn_insertBefore: { label: c.column.insertBefore, group: "tablecolumn", command: "columnInsertBefore", order: 5 },
                    tablecolumn_insertAfter: { label: c.column.insertAfter, group: "tablecolumn", command: "columnInsertAfter", order: 10 },
                    tablecolumn_delete: { label: c.column.deleteColumn, group: "tablecolumn", command: "columnDelete", order: 15 }
                });
                e.contextMenu &&
                    e.contextMenu.addListener(function(a, b, c) {
                        return (a = c.contains({ td: 1, th: 1 }, 1)) && !a.isReadOnly() ? { tablecell: CKEDITOR.TRISTATE_OFF, tablerow: CKEDITOR.TRISTATE_OFF, tablecolumn: CKEDITOR.TRISTATE_OFF } : null })
            },
            getSelectedCells: t
        };
        CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
    })();
    CKEDITOR.tools.buildTableMap = function(t) { t = t.$.rows;
        for (var p = -1, u = [], v = 0; v < t.length; v++) { p++;!u[p] && (u[p] = []);
            for (var m = -1, y = 0; y < t[v].cells.length; y++) {
                var x = t[v].cells[y];
                for (m++; u[p][m];) m++;
                for (var q = isNaN(x.colSpan) ? 1 : x.colSpan, x = isNaN(x.rowSpan) ? 1 : x.rowSpan, z = 0; z < x; z++) { u[p + z] || (u[p + z] = []);
                    for (var w = 0; w < q; w++) u[p + z][m + w] = t[v].cells[y] }
                m += q - 1 } }
        return u };
    (function() {
        var g = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90],
            n = { 8: 1, 46: 1 };
        CKEDITOR.plugins.add("undo", {
            init: function(a) {
                function b(a) { d.enabled && !1 !== a.data.command.canUndo && d.save() }

                function c() { d.enabled = a.readOnly ? !1 : "wysiwyg" == a.mode;
                    d.onChange() }
                var d = a.undoManager = new e(a),
                    l = d.editingHandler = new k(d),
                    f = a.addCommand("undo", { exec: function() { d.undo() && (a.selectionChange(), this.fire("afterUndo")) }, startDisabled: !0, canUndo: !1 }),
                    h = a.addCommand("redo", {
                        exec: function() {
                            d.redo() &&
                                (a.selectionChange(), this.fire("afterRedo"))
                        },
                        startDisabled: !0,
                        canUndo: !1
                    });
                a.setKeystroke([
                    [g[0], "undo"],
                    [g[1], "redo"],
                    [g[2], "redo"]
                ]);
                d.onChange = function() { f.setState(d.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                    h.setState(d.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) };
                a.on("beforeCommandExec", b);
                a.on("afterCommandExec", b);
                a.on("saveSnapshot", function(a) { d.save(a.data && a.data.contentOnly) });
                a.on("contentDom", l.attachListeners, l);
                a.on("instanceReady", function() { a.fire("saveSnapshot") });
                a.on("beforeModeUnload", function() { "wysiwyg" == a.mode && d.save(!0) });
                a.on("mode", c);
                a.on("readOnly", c);
                a.ui.addButton && (a.ui.addButton("Undo", { label: a.lang.undo.undo, command: "undo", toolbar: "undo,10" }), a.ui.addButton("Redo", { label: a.lang.undo.redo, command: "redo", toolbar: "undo,20" }));
                a.resetUndo = function() { d.reset();
                    a.fire("saveSnapshot") };
                a.on("updateSnapshot", function() { d.currentImage && d.update() });
                a.on("lockSnapshot", function(a) { a = a.data;
                    d.lock(a && a.dontUpdate, a && a.forceUpdate) });
                a.on("unlockSnapshot",
                    d.unlock, d)
            }
        });
        CKEDITOR.plugins.undo = {};
        var e = CKEDITOR.plugins.undo.UndoManager = function(a) { this.strokesRecorded = [0, 0];
            this.locked = null;
            this.previousKeyGroup = -1;
            this.limit = a.config.undoStackSize || 20;
            this.strokesLimit = 25;
            this.editor = a;
            this.reset() };
        e.prototype = {
            type: function(a, b) {
                var c = e.getKeyGroup(a),
                    d = this.strokesRecorded[c] + 1;
                b = b || d >= this.strokesLimit;
                this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange());
                b ? (d = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change");
                this.strokesRecorded[c] =
                    d;
                this.previousKeyGroup = c
            },
            keyGroupChanged: function(a) {
                return e.getKeyGroup(a) != this.previousKeyGroup },
            reset: function() { this.snapshots = [];
                this.index = -1;
                this.currentImage = null;
                this.hasRedo = this.hasUndo = !1;
                this.locked = null;
                this.resetType() },
            resetType: function() { this.strokesRecorded = [0, 0];
                this.typing = !1;
                this.previousKeyGroup = -1 },
            refreshState: function() { this.hasUndo = !!this.getNextImage(!0);
                this.hasRedo = !!this.getNextImage(!1);
                this.resetType();
                this.onChange() },
            save: function(a, b, c) {
                var d = this.editor;
                if (this.locked ||
                    "ready" != d.status || "wysiwyg" != d.mode) return !1;
                var e = d.editable();
                if (!e || "ready" != e.status) return !1;
                e = this.snapshots;
                b || (b = new f(d));
                if (!1 === b.contents) return !1;
                if (this.currentImage)
                    if (b.equalsContent(this.currentImage)) {
                        if (a || b.equalsSelection(this.currentImage)) return !1 } else !1 !== c && d.fire("change");
                e.splice(this.index + 1, e.length - this.index - 1);
                e.length == this.limit && e.shift();
                this.index = e.push(b) - 1;
                this.currentImage = b;
                !1 !== c && this.refreshState();
                return !0
            },
            restoreImage: function(a) {
                var b = this.editor,
                    c;
                a.bookmarks && (b.focus(), c = b.getSelection());
                this.locked = { level: 999 };
                this.editor.loadSnapshot(a.contents);
                a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select());
                this.locked = null;
                this.index = a.index;
                this.currentImage = this.snapshots[this.index];
                this.update();
                this.refreshState();
                b.fire("change")
            },
            getNextImage: function(a) {
                var b = this.snapshots,
                    c = this.currentImage,
                    d;
                if (c)
                    if (a)
                        for (d = this.index - 1; 0 <= d; d--) {
                            if (a = b[d], !c.equalsContent(a)) return a.index =
                                d, a
                        } else
                            for (d = this.index + 1; d < b.length; d++)
                                if (a = b[d], !c.equalsContent(a)) return a.index = d, a;
                return null
            },
            redoable: function() {
                return this.enabled && this.hasRedo },
            undoable: function() {
                return this.enabled && this.hasUndo },
            undo: function() {
                if (this.undoable()) { this.save(!0);
                    var a = this.getNextImage(!0);
                    if (a) return this.restoreImage(a), !0 }
                return !1 },
            redo: function() {
                if (this.redoable() && (this.save(!0), this.redoable())) {
                    var a = this.getNextImage(!1);
                    if (a) return this.restoreImage(a), !0 }
                return !1 },
            update: function(a) {
                if (!this.locked) {
                    a ||
                        (a = new f(this.editor));
                    for (var b = this.index, c = this.snapshots; 0 < b && this.currentImage.equalsContent(c[b - 1]);) --b;
                    c.splice(b, this.index - b + 1, a);
                    this.index = b;
                    this.currentImage = a
                }
            },
            updateSelection: function(a) {
                if (!this.snapshots.length) return !1;
                var b = this.snapshots,
                    c = b[b.length - 1];
                return c.equalsContent(a) && !c.equalsSelection(a) ? (this.currentImage = b[b.length - 1] = a, !0) : !1 },
            lock: function(a, b) {
                if (this.locked) this.locked.level++;
                else if (a) this.locked = { level: 1 };
                else {
                    var c = null;
                    if (b) c = !0;
                    else {
                        var d = new f(this.editor, !0);
                        this.currentImage && this.currentImage.equalsContent(d) && (c = d)
                    }
                    this.locked = { update: c, level: 1 }
                }
            },
            unlock: function() {
                if (this.locked && !--this.locked.level) {
                    var a = this.locked.update;
                    this.locked = null;
                    if (!0 === a) this.update();
                    else if (a) {
                        var b = new f(this.editor, !0);
                        a.equalsContent(b) || this.update() } } }
        };
        e.navigationKeyCodes = { 37: 1, 38: 1, 39: 1, 40: 1, 36: 1, 35: 1, 33: 1, 34: 1 };
        e.keyGroups = { PRINTABLE: 0, FUNCTIONAL: 1 };
        e.isNavigationKey = function(a) {
            return !!e.navigationKeyCodes[a] };
        e.getKeyGroup = function(a) {
            var b = e.keyGroups;
            return n[a] ? b.FUNCTIONAL : b.PRINTABLE
        };
        e.getOppositeKeyGroup = function(a) {
            var b = e.keyGroups;
            return a == b.FUNCTIONAL ? b.PRINTABLE : b.FUNCTIONAL };
        e.ieFunctionalKeysBug = function(a) {
            return CKEDITOR.env.ie && e.getKeyGroup(a) == e.keyGroups.FUNCTIONAL };
        var f = CKEDITOR.plugins.undo.Image = function(a, b) { this.editor = a;
                a.fire("beforeUndoImage");
                var c = a.getSnapshot();
                CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, ""));
                this.contents = c;
                b || (this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(!0));
                a.fire("afterUndoImage") },
            h = /\b(?:href|src|name)="[^"]*?"/gi;
        f.prototype = {
            equalsContent: function(a) {
                var b = this.contents;
                a = a.contents;
                CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(h, ""), a = a.replace(h, ""));
                return b != a ? !1 : !0 },
            equalsSelection: function(a) {
                var b = this.bookmarks;
                a = a.bookmarks;
                if (b || a) {
                    if (!b || !a || b.length != a.length) return !1;
                    for (var c = 0; c < b.length; c++) {
                        var d = b[c],
                            e = a[c];
                        if (d.startOffset != e.startOffset || d.endOffset != e.endOffset || !CKEDITOR.tools.arrayCompare(d.start, e.start) || !CKEDITOR.tools.arrayCompare(d.end,
                                e.end)) return !1
                    }
                }
                return !0
            }
        };
        var k = CKEDITOR.plugins.undo.NativeEditingHandler = function(a) { this.undoManager = a;
            this.ignoreInputEvent = !1;
            this.keyEventsStack = new m;
            this.lastKeydownImage = null };
        k.prototype = {
            onKeydown: function(a) {
                var b = a.data.getKey();
                if (229 !== b)
                    if (-1 < CKEDITOR.tools.indexOf(g, a.data.getKeystroke())) a.data.preventDefault();
                    else if (this.keyEventsStack.cleanUp(a), a = this.undoManager, this.keyEventsStack.getLast(b) || this.keyEventsStack.push(b), this.lastKeydownImage = new f(a.editor), e.isNavigationKey(b) ||
                    this.undoManager.keyGroupChanged(b))
                    if (a.strokesRecorded[0] || a.strokesRecorded[1]) a.save(!1, this.lastKeydownImage, !1), a.resetType()
            },
            onInput: function() {
                if (this.ignoreInputEvent) this.ignoreInputEvent = !1;
                else {
                    var a = this.keyEventsStack.getLast();
                    a || (a = this.keyEventsStack.push(0));
                    this.keyEventsStack.increment(a.keyCode);
                    this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs()) } },
            onKeyup: function(a) {
                var b = this.undoManager;
                a = a.data.getKey();
                var c = this.keyEventsStack.getTotalInputs();
                this.keyEventsStack.remove(a);
                if (!(e.ieFunctionalKeysBug(a) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new f(b.editor, !0))))
                    if (0 < c) b.type(a);
                    else if (e.isNavigationKey(a)) this.onNavigationKey(!0)
            },
            onNavigationKey: function(a) {
                var b = this.undoManager;!a && b.save(!0, null, !1) || b.updateSelection(new f(b.editor));
                b.resetType() },
            ignoreInputEventListener: function() { this.ignoreInputEvent = !0 },
            attachListeners: function() {
                var a = this.undoManager.editor,
                    b = a.editable(),
                    c = this;
                b.attachListener(b, "keydown", function(a) { c.onKeydown(a);
                    if (e.ieFunctionalKeysBug(a.data.getKey())) c.onInput() }, null, null, 999);
                b.attachListener(b, CKEDITOR.env.ie ? "keypress" : "input", c.onInput, c, null, 999);
                b.attachListener(b, "keyup", c.onKeyup, c, null, 999);
                b.attachListener(b, "paste", c.ignoreInputEventListener, c, null, 999);
                b.attachListener(b, "drop", c.ignoreInputEventListener, c, null, 999);
                b.attachListener(b.isInline() ? b : a.document.getDocumentElement(), "click", function() { c.onNavigationKey() },
                    null, null, 999);
                b.attachListener(this.undoManager.editor, "blur", function() { c.keyEventsStack.remove(9) }, null, null, 999)
            }
        };
        var m = CKEDITOR.plugins.undo.KeyEventsStack = function() { this.stack = [] };
        m.prototype = {
            push: function(a) { a = this.stack.push({ keyCode: a, inputs: 0 });
                return this.stack[a - 1] },
            getLastIndex: function(a) {
                if ("number" != typeof a) return this.stack.length - 1;
                for (var b = this.stack.length; b--;)
                    if (this.stack[b].keyCode == a) return b;
                return -1 },
            getLast: function(a) {
                a = this.getLastIndex(a);
                return -1 != a ? this.stack[a] :
                    null
            },
            increment: function(a) { this.getLast(a).inputs++ },
            remove: function(a) { a = this.getLastIndex(a); - 1 != a && this.stack.splice(a, 1) },
            resetInputs: function(a) {
                if ("number" == typeof a) this.getLast(a).inputs = 0;
                else
                    for (a = this.stack.length; a--;) this.stack[a].inputs = 0 },
            getTotalInputs: function() {
                for (var a = this.stack.length, b = 0; a--;) b += this.stack[a].inputs;
                return b },
            cleanUp: function(a) { a = a.data.$;
                a.ctrlKey || a.metaKey || this.remove(17);
                a.shiftKey || this.remove(16);
                a.altKey || this.remove(18) }
        }
    })();
    CKEDITOR.plugins.add("wsc", {
        requires: "dialog",
        parseApi: function(a) { a.config.wsc_onFinish = "function" === typeof a.config.wsc_onFinish ? a.config.wsc_onFinish : function() {};
            a.config.wsc_onClose = "function" === typeof a.config.wsc_onClose ? a.config.wsc_onClose : function() {} },
        parseConfig: function(a) {
            a.config.wsc_customerId = a.config.wsc_customerId || CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";
            a.config.wsc_customDictionaryIds = a.config.wsc_customDictionaryIds ||
                CKEDITOR.config.wsc_customDictionaryIds || "";
            a.config.wsc_userDictionaryName = a.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || "";
            a.config.wsc_customLoaderScript = a.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript;
            a.config.wsc_interfaceLang = a.config.wsc_interfaceLang;
            CKEDITOR.config.wsc_cmd = a.config.wsc_cmd || CKEDITOR.config.wsc_cmd || "spell";
            CKEDITOR.config.wsc_version = "v4.3.0-master-d769233";
            CKEDITOR.config.wsc_removeGlobalVariable = !0
        },
        onLoad: function(a) {
            "moono-lisa" ==
            (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(this.path + "skins/" + CKEDITOR.skin.name + "/wsc.css")
        },
        init: function(a) {
            var b = CKEDITOR.env;
            this.parseConfig(a);
            this.parseApi(a);
            a.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = { wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname && !(b.ie && (8 > b.version || b.quirks)) };
            "undefined" == typeof a.plugins.scayt && a.ui.addButton && a.ui.addButton("SpellChecker", {
                label: a.lang.wsc.toolbar,
                click: function(a) {
                    var b = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText();
                    (b = b.replace(/\s/g, "")) ? a.execCommand("checkspell"): alert("Nothing to check!") },
                toolbar: "spellchecker,10"
            });
            CKEDITOR.dialog.add("checkspell", this.path + (CKEDITOR.env.ie && 7 >= CKEDITOR.env.version ? "dialogs/wsc_ie.js" : window.postMessage ? "dialogs/wsc.js" : "dialogs/wsc_ie.js"))
        }
    });
    CKEDITOR.config.plugins = 'dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,copyformatting,div,resize,toolbar,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,undo,wsc';
    CKEDITOR.config.skin = 'moono-lisa';
    (function() {
        var setIcons = function(icons, strip) {
            var path = CKEDITOR.getUrl('plugins/' + strip);
            icons = icons.split(',');
            for (var i = 0; i < icons.length; i++) CKEDITOR.skin.icons[icons[i]] = { path: path, offset: -icons[++i], bgsize: icons[++i] }; };
        if (CKEDITOR.env.hidpi) setIcons('about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,bgcolor,384,,textcolor,408,,templates-rtl,432,,templates,456,,copyformatting,480,,creatediv,504,,find-rtl,528,,find,552,,replace,576,,flash,600,,button,624,,checkbox,648,,form,672,,hiddenfield,696,,imagebutton,720,,radio,744,,select-rtl,768,,select,792,,textarea-rtl,816,,textarea,840,,textfield-rtl,864,,textfield,888,,horizontalrule,912,,iframe,936,,image,960,,indent-rtl,984,,indent,1008,,outdent-rtl,1032,,outdent,1056,,smiley,1080,,justifyblock,1104,,justifycenter,1128,,justifyleft,1152,,justifyright,1176,,language,1200,,anchor-rtl,1224,,anchor,1248,,link,1272,,unlink,1296,,bulletedlist-rtl,1320,,bulletedlist,1344,,numberedlist-rtl,1368,,numberedlist,1392,,maximize,1416,,newpage-rtl,1440,,newpage,1464,,pagebreak-rtl,1488,,pagebreak,1512,,pastetext-rtl,1536,,pastetext,1560,,pastefromword-rtl,1584,,pastefromword,1608,,preview-rtl,1632,,preview,1656,,print,1680,,removeformat,1704,,save,1728,,selectall,1752,,showblocks-rtl,1776,,showblocks,1800,,source-rtl,1824,,source,1848,,specialchar,1872,,scayt,1896,,table,1920,,redo-rtl,1944,,redo,1968,,undo-rtl,1992,,undo,2016,,spellchecker,2040,', 'icons_hidpi.png');
        else setIcons('about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,bgcolor,384,auto,textcolor,408,auto,templates-rtl,432,auto,templates,456,auto,copyformatting,480,auto,creatediv,504,auto,find-rtl,528,auto,find,552,auto,replace,576,auto,flash,600,auto,button,624,auto,checkbox,648,auto,form,672,auto,hiddenfield,696,auto,imagebutton,720,auto,radio,744,auto,select-rtl,768,auto,select,792,auto,textarea-rtl,816,auto,textarea,840,auto,textfield-rtl,864,auto,textfield,888,auto,horizontalrule,912,auto,iframe,936,auto,image,960,auto,indent-rtl,984,auto,indent,1008,auto,outdent-rtl,1032,auto,outdent,1056,auto,smiley,1080,auto,justifyblock,1104,auto,justifycenter,1128,auto,justifyleft,1152,auto,justifyright,1176,auto,language,1200,auto,anchor-rtl,1224,auto,anchor,1248,auto,link,1272,auto,unlink,1296,auto,bulletedlist-rtl,1320,auto,bulletedlist,1344,auto,numberedlist-rtl,1368,auto,numberedlist,1392,auto,maximize,1416,auto,newpage-rtl,1440,auto,newpage,1464,auto,pagebreak-rtl,1488,auto,pagebreak,1512,auto,pastetext-rtl,1536,auto,pastetext,1560,auto,pastefromword-rtl,1584,auto,pastefromword,1608,auto,preview-rtl,1632,auto,preview,1656,auto,print,1680,auto,removeformat,1704,auto,save,1728,auto,selectall,1752,auto,showblocks-rtl,1776,auto,showblocks,1800,auto,source-rtl,1824,auto,source,1848,auto,specialchar,1872,auto,scayt,1896,auto,table,1920,auto,redo-rtl,1944,auto,redo,1968,auto,undo-rtl,1992,auto,undo,2016,auto,spellchecker,2040,auto', 'icons.png'); })();
    CKEDITOR.lang.languages = { "af": 1, "sq": 1, "ar": 1, "az": 1, "eu": 1, "bn": 1, "bs": 1, "bg": 1, "ca": 1, "zh-cn": 1, "zh": 1, "hr": 1, "cs": 1, "da": 1, "nl": 1, "en": 1, "en-au": 1, "en-ca": 1, "en-gb": 1, "eo": 1, "et": 1, "fo": 1, "fi": 1, "fr": 1, "fr-ca": 1, "gl": 1, "ka": 1, "de": 1, "de-ch": 1, "el": 1, "gu": 1, "he": 1, "hi": 1, "hu": 1, "is": 1, "id": 1, "it": 1, "ja": 1, "km": 1, "ko": 1, "ku": 1, "lv": 1, "lt": 1, "mk": 1, "ms": 1, "mn": 1, "no": 1, "nb": 1, "oc": 1, "fa": 1, "pl": 1, "pt-br": 1, "pt": 1, "ro": 1, "ru": 1, "sr": 1, "sr-latn": 1, "si": 1, "sk": 1, "sl": 1, "es": 1, "sv": 1, "tt": 1, "th": 1, "tr": 1, "ug": 1, "uk": 1, "vi": 1, "cy": 1 };
}());