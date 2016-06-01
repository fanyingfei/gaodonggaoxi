/*! zybuluo */
(function() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W = [].slice,
        X = {}.hasOwnProperty,
        Y = function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) X.call(b, d) && (a[d] = b[d]);
            return c.prototype = b.prototype,
                a.prototype = new c,
                a.__super__ = b.prototype,
                a
        },
        Z = [].indexOf ||
            function(a) {
                for (var b = 0,
                         c = this.length; c > b; b++) if (b in this && this[b] === a) return b;
                return - 1
            };
    for (t = {
        catchupTime: 500,
        initialRate: .03,
        minTime: 500,
        ghostTime: 500,
        maxProgressPerFrame: 10,
        easeFactor: 1.25,
        startOnPageLoad: !0,
        restartOnPushState: !0,
        restartOnRequestAfter: 500,
        target: "body",
        elements: {
            checkInterval: 100,
            selectors: ["body"]
        },
        eventLag: {
            minSamples: 10,
            sampleCount: 3,
            lagThreshold: 3
        },
        ajax: {
            trackMethods: ["GET"],
            trackWebSockets: !0,
            ignoreURLs: []
        }
    },
             B = function() {
                 var a;
                 return null != (a = "undefined" != typeof performance && null !== performance ? "function" == typeof performance.now ? performance.now() : void 0 : void 0) ? a: +new Date
             },
             D = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, s = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == D && (D = function(a) {
        return setTimeout(a, 50)
    },
        s = function(a) {
            return clearTimeout(a)
        }), F = function(a) {
        var b, c;
        return b = B(),
            (c = function() {
                var d;
                return d = B() - b,
                    d >= 33 ? (b = B(), a(d,
                        function() {
                            return D(c)
                        })) : setTimeout(c, 33 - d)
            })()
    },
             E = function() {
                 var a, b, c;
                 return c = arguments[0],
                     b = arguments[1],
                     a = 3 <= arguments.length ? W.call(arguments, 2) : [],
                     "function" == typeof c[b] ? c[b].apply(c, a) : c[b]
             },
             u = function() {
                 var a, b, c, d, e, f, g;
                 for (b = arguments[0], d = 2 <= arguments.length ? W.call(arguments, 1) : [], f = 0, g = d.length; g > f; f++) if (c = d[f]) for (a in c) X.call(c, a) && (e = c[a], null != b[a] && "object" == typeof b[a] && null != e && "object" == typeof e ? u(b[a], e) : b[a] = e);
                 return b
             },
             p = function(a) {
                 var b, c, d, e, f;
                 for (c = b = 0, e = 0, f = a.length; f > e; e++) d = a[e],
                     c += Math.abs(d),
                     b++;
                 return c / b
             },
             w = function(a, b) {
                 var c, d, e;
                 if (null == a && (a = "options"), null == b && (b = !0), e = document.querySelector("[data-pace-" + a + "]")) {
                     if (c = e.getAttribute("data-pace-" + a), !b) return c;
                     try {
                         return JSON.parse(c)
                     } catch(f) {
                         return d = f,
                             "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", d) : void 0
                     }
                 }
             },
             g = function() {
                 function a() {}
                 return a.prototype.on = function(a, b, c, d) {
                     var e;
                     return null == d && (d = !1),
                     null == this.bindings && (this.bindings = {}),
                     null == (e = this.bindings)[a] && (e[a] = []),
                         this.bindings[a].push({
                             handler: b,
                             ctx: c,
                             once: d
                         })
                 },
                     a.prototype.once = function(a, b, c) {
                         return this.on(a, b, c, !0)
                     },
                     a.prototype.off = function(a, b) {
                         var c, d, e;
                         if (null != (null != (d = this.bindings) ? d[a] : void 0)) {
                             if (null == b) return delete this.bindings[a];
                             for (c = 0, e = []; c < this.bindings[a].length;) e.push(this.bindings[a][c].handler === b ? this.bindings[a].splice(c, 1) : c++);
                             return e
                         }
                     },
                     a.prototype.trigger = function() {
                         var a, b, c, d, e, f, g, h, i;
                         if (c = arguments[0], a = 2 <= arguments.length ? W.call(arguments, 1) : [], null != (g = this.bindings) ? g[c] : void 0) {
                             for (e = 0, i = []; e < this.bindings[c].length;) h = this.bindings[c][e],
                                 d = h.handler,
                                 b = h.ctx,
                                 f = h.once,
                                 d.apply(null != b ? b: this, a),
                                 i.push(f ? this.bindings[c].splice(e, 1) : e++);
                             return i
                         }
                     },
                     a
             } (), null == window.Pace && (window.Pace = {}), u(Pace, g.prototype), C = Pace.options = u({},
        t, window.paceOptions, w()), T = ["ajax", "document", "eventLag", "elements"], P = 0, R = T.length; R > P; P++) J = T[P],
    C[J] === !0 && (C[J] = t[J]);
    i = function(a) {
        function b() {
            return U = b.__super__.constructor.apply(this, arguments)
        }
        return Y(b, a),
            b
    } (Error),
        b = function() {
            function a() {
                this.progress = 0
            }
            return a.prototype.getElement = function() {
                var a;
                if (null == this.el) {
                    if (a = document.querySelector(C.target), !a) throw new i;
                    this.el = document.createElement("div"),
                        this.el.className = "pace pace-active",
                        document.body.className = document.body.className.replace(/pace-done/g, ""),
                        document.body.className += " pace-running",
                        this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',
                        null != a.firstChild ? a.insertBefore(this.el, a.firstChild) : a.appendChild(this.el)
                }
                return this.el
            },
                a.prototype.finish = function() {
                    var a;
                    return a = this.getElement(),
                        a.className = a.className.replace("pace-active", ""),
                        a.className += " pace-inactive",
                        document.body.className = document.body.className.replace("pace-running", ""),
                        document.body.className += " pace-done"
                },
                a.prototype.update = function(a) {
                    return this.progress = a,
                        this.render()
                },
                a.prototype.destroy = function() {
                    try {
                        this.getElement().parentNode.removeChild(this.getElement())
                    } catch(a) {
                        i = a
                    }
                    return this.el = void 0
                },
                a.prototype.render = function() {
                    var a, b;
                    return null == document.querySelector(C.target) ? !1 : (a = this.getElement(), a.children[0].style.width = "" + this.progress + "%", (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (a.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? b = "99": (b = this.progress < 10 ? "0": "", b += 0 | this.progress), a.children[0].setAttribute("data-progress", "" + b)), this.lastRenderedProgress = this.progress)
                },
                a.prototype.done = function() {
                    return this.progress >= 100
                },
                a
        } (),
        h = function() {
            function a() {
                this.bindings = {}
            }
            return a.prototype.trigger = function(a, b) {
                var c, d, e, f, g;
                if (null != this.bindings[a]) {
                    for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++) c = f[d],
                        g.push(c.call(this, b));
                    return g
                }
            },
                a.prototype.on = function(a, b) {
                    var c;
                    return null == (c = this.bindings)[a] && (c[a] = []),
                        this.bindings[a].push(b)
                },
                a
        } (),
        O = window.XMLHttpRequest,
        N = window.XDomainRequest,
        M = window.WebSocket,
        v = function(a, b) {
            var c, d, e, f;
            f = [];
            for (d in b.prototype) try {
                e = b.prototype[d],
                    f.push(null == a[d] && "function" != typeof e ? a[d] = e: void 0)
            } catch(g) {
                c = g
            }
            return f
        },
        z = [],
        Pace.ignore = function() {
            var a, b, c;
            return b = arguments[0],
                a = 2 <= arguments.length ? W.call(arguments, 1) : [],
                z.unshift("ignore"),
                c = b.apply(null, a),
                z.shift(),
                c
        },
        Pace.track = function() {
            var a, b, c;
            return b = arguments[0],
                a = 2 <= arguments.length ? W.call(arguments, 1) : [],
                z.unshift("track"),
                c = b.apply(null, a),
                z.shift(),
                c
        },
        I = function(a) {
            var b;
            if (null == a && (a = "GET"), "track" === z[0]) return "force";
            if (!z.length && C.ajax) {
                if ("socket" === a && C.ajax.trackWebSockets) return ! 0;
                if (b = a.toUpperCase(), Z.call(C.ajax.trackMethods, b) >= 0) return ! 0
            }
            return ! 1
        },
        j = function(a) {
            function b() {
                var a, c = this;
                b.__super__.constructor.apply(this, arguments),
                    a = function(a) {
                        var b;
                        return b = a.open,
                            a.open = function(d, e) {
                                return I(d) && c.trigger("request", {
                                    type: d,
                                    url: e,
                                    request: a
                                }),
                                    b.apply(a, arguments)
                            }
                    },
                    window.XMLHttpRequest = function(b) {
                        var c;
                        return c = new O(b),
                            a(c),
                            c
                    };
                try {
                    v(window.XMLHttpRequest, O)
                } catch(d) {}
                if (null != N) {
                    window.XDomainRequest = function() {
                        var b;
                        return b = new N,
                            a(b),
                            b
                    };
                    try {
                        v(window.XDomainRequest, N)
                    } catch(d) {}
                }
                if (null != M && C.ajax.trackWebSockets) {
                    window.WebSocket = function(a, b) {
                        var d;
                        return d = null != b ? new M(a, b) : new M(a),
                        I("socket") && c.trigger("request", {
                            type: "socket",
                            url: a,
                            protocols: b,
                            request: d
                        }),
                            d
                    };
                    try {
                        v(window.WebSocket, M)
                    } catch(d) {}
                }
            }
            return Y(b, a),
                b
        } (h),
        Q = null,
        x = function() {
            return null == Q && (Q = new j),
                Q
        },
        H = function(a) {
            var b, c, d, e;
            for (e = C.ajax.ignoreURLs, c = 0, d = e.length; d > c; c++) if (b = e[c], "string" == typeof b) {
                if ( - 1 !== a.indexOf(b)) return ! 0
            } else if (b.test(a)) return ! 0;
            return ! 1
        },
        x().on("request",
            function(b) {
                var c, d, e, f, g;
                return f = b.type,
                    e = b.request,
                    g = b.url,
                    H(g) ? void 0 : Pace.running || C.restartOnRequestAfter === !1 && "force" !== I(f) ? void 0 : (d = arguments, c = C.restartOnRequestAfter || 0, "boolean" == typeof c && (c = 0), setTimeout(function() {
                            var b, c, g, h, i, j;
                            if (b = "socket" === f ? e.readyState < 2 : 0 < (h = e.readyState) && 4 > h) {
                                for (Pace.restart(), i = Pace.sources, j = [], c = 0, g = i.length; g > c; c++) {
                                    if (J = i[c], J instanceof a) {
                                        J.watch.apply(J, d);
                                        break
                                    }
                                    j.push(void 0)
                                }
                                return j
                            }
                        },
                        c))
            }),
        a = function() {
            function a() {
                var a = this;
                this.elements = [],
                    x().on("request",
                        function() {
                            return a.watch.apply(a, arguments)
                        })
            }
            return a.prototype.watch = function(a) {
                var b, c, d, e;
                return d = a.type,
                    b = a.request,
                    e = a.url,
                    H(e) ? void 0 : (c = "socket" === d ? new m(b) : new n(b), this.elements.push(c))
            },
                a
        } (),
        n = function() {
            function a(a) {
                var b, c, d, e, f, g, h = this;
                if (this.progress = 0, null != window.ProgressEvent) for (c = null, a.addEventListener("progress",
                    function(a) {
                        return h.progress = a.lengthComputable ? 100 * a.loaded / a.total: h.progress + (100 - h.progress) / 2
                    }), g = ["load", "abort", "timeout", "error"], d = 0, e = g.length; e > d; d++) b = g[d],
                    a.addEventListener(b,
                        function() {
                            return h.progress = 100
                        });
                else f = a.onreadystatechange,
                    a.onreadystatechange = function() {
                        var b;
                        return 0 === (b = a.readyState) || 4 === b ? h.progress = 100 : 3 === a.readyState && (h.progress = 50),
                            "function" == typeof f ? f.apply(null, arguments) : void 0
                    }
            }
            return a
        } (),
        m = function() {
            function a(a) {
                var b, c, d, e, f = this;
                for (this.progress = 0, e = ["error", "open"], c = 0, d = e.length; d > c; c++) b = e[c],
                    a.addEventListener(b,
                        function() {
                            return f.progress = 100
                        })
            }
            return a
        } (),
        d = function() {
            function a(a) {
                var b, c, d, f;
                for (null == a && (a = {}), this.elements = [], null == a.selectors && (a.selectors = []), f = a.selectors, c = 0, d = f.length; d > c; c++) b = f[c],
                    this.elements.push(new e(b))
            }
            return a
        } (),
        e = function() {
            function a(a) {
                this.selector = a,
                    this.progress = 0,
                    this.check()
            }
            return a.prototype.check = function() {
                var a = this;
                return document.querySelector(this.selector) ? this.done() : setTimeout(function() {
                        return a.check()
                    },
                    C.elements.checkInterval)
            },
                a.prototype.done = function() {
                    return this.progress = 100
                },
                a
        } (),
        c = function() {
            function a() {
                var a, b, c = this;
                this.progress = null != (b = this.states[document.readyState]) ? b: 100,
                    a = document.onreadystatechange,
                    document.onreadystatechange = function() {
                        return null != c.states[document.readyState] && (c.progress = c.states[document.readyState]),
                            "function" == typeof a ? a.apply(null, arguments) : void 0
                    }
            }
            return a.prototype.states = {
                loading: 0,
                interactive: 50,
                complete: 100
            },
                a
        } (),
        f = function() {
            function a() {
                var a, b, c, d, e, f = this;
                this.progress = 0,
                    a = 0,
                    e = [],
                    d = 0,
                    c = B(),
                    b = setInterval(function() {
                            var g;
                            return g = B() - c - 50,
                                c = B(),
                                e.push(g),
                            e.length > C.eventLag.sampleCount && e.shift(),
                                a = p(e),
                                ++d >= C.eventLag.minSamples && a < C.eventLag.lagThreshold ? (f.progress = 100, clearInterval(b)) : f.progress = 100 * (3 / (a + 3))
                        },
                        50)
            }
            return a
        } (),
        l = function() {
            function a(a) {
                this.source = a,
                    this.last = this.sinceLastUpdate = 0,
                    this.rate = C.initialRate,
                    this.catchup = 0,
                    this.progress = this.lastProgress = 0,
                null != this.source && (this.progress = E(this.source, "progress"))
            }
            return a.prototype.tick = function(a, b) {
                var c;
                return null == b && (b = E(this.source, "progress")),
                b >= 100 && (this.done = !0),
                    b === this.last ? this.sinceLastUpdate += a: (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / C.catchupTime, this.sinceLastUpdate = 0, this.last = b),
                b > this.progress && (this.progress += this.catchup * a),
                    c = 1 - Math.pow(this.progress / 100, C.easeFactor),
                    this.progress += c * this.rate * a,
                    this.progress = Math.min(this.lastProgress + C.maxProgressPerFrame, this.progress),
                    this.progress = Math.max(0, this.progress),
                    this.progress = Math.min(100, this.progress),
                    this.lastProgress = this.progress,
                    this.progress
            },
                a
        } (),
        K = null,
        G = null,
        q = null,
        L = null,
        o = null,
        r = null,
        Pace.running = !1,
        y = function() {
            return C.restartOnPushState ? Pace.restart() : void 0
        },
    null != window.history.pushState && (S = window.history.pushState, window.history.pushState = function() {
        return y(),
            S.apply(window.history, arguments)
    }),
    null != window.history.replaceState && (V = window.history.replaceState, window.history.replaceState = function() {
        return y(),
            V.apply(window.history, arguments)
    }),
        k = {
            ajax: a,
            elements: d,
            document: c,
            eventLag: f
        },
        (A = function() {
            var a, c, d, e, f, g, h, i;
            for (Pace.sources = K = [], g = ["ajax", "elements", "document", "eventLag"], c = 0, e = g.length; e > c; c++) a = g[c],
            C[a] !== !1 && K.push(new k[a](C[a]));
            for (i = null != (h = C.extraSources) ? h: [], d = 0, f = i.length; f > d; d++) J = i[d],
                K.push(new J(C));
            return Pace.bar = q = new b,
                G = [],
                L = new l
        })(),
        Pace.stop = function() {
            return Pace.trigger("stop"),
                Pace.running = !1,
                q.destroy(),
                r = !0,
            null != o && ("function" == typeof s && s(o), o = null),
                A()
        },
        Pace.restart = function() {
            return Pace.trigger("restart"),
                Pace.stop(),
                Pace.start()
        },
        Pace.go = function() {
            var a;
            return Pace.running = !0,
                q.render(),
                a = B(),
                r = !1,
                o = F(function(b, c) {
                    var d, e, f, g, h, i, j, k, m, n, o, p, s, t, u, v;
                    for (k = 100 - q.progress, e = o = 0, f = !0, i = p = 0, t = K.length; t > p; i = ++p) for (J = K[i], n = null != G[i] ? G[i] : G[i] = [], h = null != (v = J.elements) ? v: [J], j = s = 0, u = h.length; u > s; j = ++s) g = h[j],
                        m = null != n[j] ? n[j] : n[j] = new l(g),
                        f &= m.done,
                    m.done || (e++, o += m.tick(b));
                    return d = o / e,
                        q.update(L.tick(b, d)),
                        q.done() || f || r ? (q.update(100), Pace.trigger("done"), setTimeout(function() {
                                return q.finish(),
                                    Pace.running = !1,
                                    Pace.trigger("hide")
                            },
                            Math.max(C.ghostTime, Math.max(C.minTime - (B() - a), 0)))) : c()
                })
        },
        Pace.start = function(a) {
            u(C, a),
                Pace.running = !0;
            try {
                q.render()
            } catch(b) {
                i = b
            }
            return document.querySelector(".pace") ? (Pace.trigger("start"), Pace.go()) : setTimeout(Pace.start, 50)
        },
        "function" == typeof define && define.amd ? define(function() {
            return Pace
        }) : "object" == typeof exports ? module.exports = Pace: C.startOnPageLoad && Pace.start()
}).call(this),
    function(a, b) {
        function c(a, b, c) {
            var d = l[b.type] || {};
            return null == a ? c || !b.def ? null: b.def: (a = d.floor ? ~~a: parseFloat(a), isNaN(a) ? b.def: d.mod ? (a + d.mod) % d.mod: 0 > a ? 0 : d.max < a ? d.max: a)
        }
        function d(b) {
            var c = j(),
                d = c._rgba = [];
            return b = b.toLowerCase(),
                o(i,
                    function(a, e) {
                        var f, g = e.re.exec(b),
                            h = g && e.parse(g),
                            i = e.space || "rgba";
                        return h ? (f = c[i](h), c[k[i].cache] = f[k[i].cache], d = c._rgba = f._rgba, !1) : void 0
                    }),
                d.length ? ("0,0,0,0" === d.join() && a.extend(d, f.transparent), c) : f[b]
        }
        function e(a, b, c) {
            return c = (c + 1) % 1,
                1 > 6 * c ? a + (b - a) * c * 6 : 1 > 2 * c ? b: 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a
        }
        var f, g = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
            h = /^([\-+])=\s*(\d+\.?\d*)/,
            i = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(a) {
                    return [a[1], a[2], a[3], a[4]]
                }
            },
                {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(a) {
                        return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
                    }
                },
                {
                    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                    parse: function(a) {
                        return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
                    }
                },
                {
                    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                    parse: function(a) {
                        return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
                    }
                },
                {
                    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    space: "hsla",
                    parse: function(a) {
                        return [a[1], a[2] / 100, a[3] / 100, a[4]]
                    }
                }],
            j = a.Color = function(b, c, d, e) {
                return new a.Color.fn.parse(b, c, d, e)
            },
            k = {
                rgba: {
                    props: {
                        red: {
                            idx: 0,
                            type: "byte"
                        },
                        green: {
                            idx: 1,
                            type: "byte"
                        },
                        blue: {
                            idx: 2,
                            type: "byte"
                        }
                    }
                },
                hsla: {
                    props: {
                        hue: {
                            idx: 0,
                            type: "degrees"
                        },
                        saturation: {
                            idx: 1,
                            type: "percent"
                        },
                        lightness: {
                            idx: 2,
                            type: "percent"
                        }
                    }
                }
            },
            l = {
                "byte": {
                    floor: !0,
                    max: 255
                },
                percent: {
                    max: 1
                },
                degrees: {
                    mod: 360,
                    floor: !0
                }
            },
            m = j.support = {},
            n = a("<p>")[0],
            o = a.each;
        n.style.cssText = "background-color:rgba(1,1,1,.5)",
            m.rgba = n.style.backgroundColor.indexOf("rgba") > -1,
            o(k,
                function(a, b) {
                    b.cache = "_" + a,
                        b.props.alpha = {
                            idx: 3,
                            type: "percent",
                            def: 1
                        }
                }),
            j.fn = a.extend(j.prototype, {
                parse: function(e, g, h, i) {
                    if (e === b) return this._rgba = [null, null, null, null],
                        this; (e.jquery || e.nodeType) && (e = a(e).css(g), g = b);
                    var l = this,
                        m = a.type(e),
                        n = this._rgba = [];
                    return g !== b && (e = [e, g, h, i], m = "array"),
                        "string" === m ? this.parse(d(e) || f._default) : "array" === m ? (o(k.rgba.props,
                            function(a, b) {
                                n[b.idx] = c(e[b.idx], b)
                            }), this) : "object" === m ? (e instanceof j ? o(k,
                            function(a, b) {
                                e[b.cache] && (l[b.cache] = e[b.cache].slice())
                            }) : o(k,
                            function(b, d) {
                                var f = d.cache;
                                o(d.props,
                                    function(a, b) {
                                        if (!l[f] && d.to) {
                                            if ("alpha" === a || null == e[a]) return;
                                            l[f] = d.to(l._rgba)
                                        }
                                        l[f][b.idx] = c(e[a], b, !0)
                                    }),
                                l[f] && a.inArray(null, l[f].slice(0, 3)) < 0 && (l[f][3] = 1, d.from && (l._rgba = d.from(l[f])))
                            }), this) : void 0
                },
                is: function(a) {
                    var b = j(a),
                        c = !0,
                        d = this;
                    return o(k,
                        function(a, e) {
                            var f, g = b[e.cache];
                            return g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], o(e.props,
                                function(a, b) {
                                    return null != g[b.idx] ? c = g[b.idx] === f[b.idx] : void 0
                                })),
                                c
                        }),
                        c
                },
                _space: function() {
                    var a = [],
                        b = this;
                    return o(k,
                        function(c, d) {
                            b[d.cache] && a.push(c)
                        }),
                        a.pop()
                },
                transition: function(a, b) {
                    var d = j(a),
                        e = d._space(),
                        f = k[e],
                        g = 0 === this.alpha() ? j("transparent") : this,
                        h = g[f.cache] || f.to(g._rgba),
                        i = h.slice();
                    return d = d[f.cache],
                        o(f.props,
                            function(a, e) {
                                var f = e.idx,
                                    g = h[f],
                                    j = d[f],
                                    k = l[e.type] || {};
                                null !== j && (null === g ? i[f] = j: (k.mod && (j - g > k.mod / 2 ? g += k.mod: g - j > k.mod / 2 && (g -= k.mod)), i[f] = c((j - g) * b + g, e)))
                            }),
                        this[e](i)
                },
                blend: function(b) {
                    if (1 === this._rgba[3]) return this;
                    var c = this._rgba.slice(),
                        d = c.pop(),
                        e = j(b)._rgba;
                    return j(a.map(c,
                        function(a, b) {
                            return (1 - d) * e[b] + d * a
                        }))
                },
                toRgbaString: function() {
                    var b = "rgba(",
                        c = a.map(this._rgba,
                            function(a, b) {
                                return null == a ? b > 2 ? 1 : 0 : a
                            });
                    return 1 === c[3] && (c.pop(), b = "rgb("),
                    b + c.join() + ")"
                },
                toHslaString: function() {
                    var b = "hsla(",
                        c = a.map(this.hsla(),
                            function(a, b) {
                                return null == a && (a = b > 2 ? 1 : 0),
                                b && 3 > b && (a = Math.round(100 * a) + "%"),
                                    a
                            });
                    return 1 === c[3] && (c.pop(), b = "hsl("),
                    b + c.join() + ")"
                },
                toHexString: function(b) {
                    var c = this._rgba.slice(),
                        d = c.pop();
                    return b && c.push(~~ (255 * d)),
                    "#" + a.map(c,
                        function(a) {
                            return a = (a || 0).toString(16),
                                1 === a.length ? "0" + a: a
                        }).join("")
                },
                toString: function() {
                    return 0 === this._rgba[3] ? "transparent": this.toRgbaString()
                }
            }),
            j.fn.parse.prototype = j.fn,
            k.hsla.to = function(a) {
                if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
                var b, c, d = a[0] / 255,
                    e = a[1] / 255,
                    f = a[2] / 255,
                    g = a[3],
                    h = Math.max(d, e, f),
                    i = Math.min(d, e, f),
                    j = h - i,
                    k = h + i,
                    l = .5 * k;
                return b = i === h ? 0 : d === h ? 60 * (e - f) / j + 360 : e === h ? 60 * (f - d) / j + 120 : 60 * (d - e) / j + 240,
                    c = 0 === j ? 0 : .5 >= l ? j / k: j / (2 - k),
                    [Math.round(b) % 360, c, l, null == g ? 1 : g]
            },
            k.hsla.from = function(a) {
                if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
                var b = a[0] / 360,
                    c = a[1],
                    d = a[2],
                    f = a[3],
                    g = .5 >= d ? d * (1 + c) : d + c - d * c,
                    h = 2 * d - g;
                return [Math.round(255 * e(h, g, b + 1 / 3)), Math.round(255 * e(h, g, b)), Math.round(255 * e(h, g, b - 1 / 3)), f]
            },
            o(k,
                function(d, e) {
                    var f = e.props,
                        g = e.cache,
                        i = e.to,
                        k = e.from;
                    j.fn[d] = function(d) {
                        if (i && !this[g] && (this[g] = i(this._rgba)), d === b) return this[g].slice();
                        var e, h = a.type(d),
                            l = "array" === h || "object" === h ? d: arguments,
                            m = this[g].slice();
                        return o(f,
                            function(a, b) {
                                var d = l["object" === h ? a: b.idx];
                                null == d && (d = m[b.idx]),
                                    m[b.idx] = c(d, b)
                            }),
                            k ? (e = j(k(m)), e[g] = m, e) : j(m)
                    },
                        o(f,
                            function(b, c) {
                                j.fn[b] || (j.fn[b] = function(e) {
                                    var f, g = a.type(e),
                                        i = "alpha" === b ? this._hsla ? "hsla": "rgba": d,
                                        j = this[i](),
                                        k = j[c.idx];
                                    return "undefined" === g ? k: ("function" === g && (e = e.call(this, k), g = a.type(e)), null == e && c.empty ? this: ("string" === g && (f = h.exec(e), f && (e = k + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), j[c.idx] = e, this[i](j)))
                                })
                            })
                }),
            j.hook = function(b) {
                var c = b.split(" ");
                o(c,
                    function(b, c) {
                        a.cssHooks[c] = {
                            set: function(b, e) {
                                var f, g, h = "";
                                if ("transparent" !== e && ("string" !== a.type(e) || (f = d(e)))) {
                                    if (e = j(f || e), !m.rgba && 1 !== e._rgba[3]) {
                                        for (g = "backgroundColor" === c ? b.parentNode: b; ("" === h || "transparent" === h) && g && g.style;) try {
                                            h = a.css(g, "backgroundColor"),
                                                g = g.parentNode
                                        } catch(i) {}
                                        e = e.blend(h && "transparent" !== h ? h: "_default")
                                    }
                                    e = e.toRgbaString()
                                }
                                try {
                                    b.style[c] = e
                                } catch(i) {}
                            }
                        },
                            a.fx.step[c] = function(b) {
                                b.colorInit || (b.start = j(b.elem, c), b.end = j(b.end), b.colorInit = !0),
                                    a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos))
                            }
                    })
            },
            j.hook(g),
            a.cssHooks.borderColor = {
                expand: function(a) {
                    var b = {};
                    return o(["Top", "Right", "Bottom", "Left"],
                        function(c, d) {
                            b["border" + d + "Color"] = a
                        }),
                        b
                }
            },
            f = a.Color.names = {
                aqua: "#00ffff",
                black: "#000000",
                blue: "#0000ff",
                fuchsia: "#ff00ff",
                gray: "#808080",
                green: "#008000",
                lime: "#00ff00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                purple: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                teal: "#008080",
                white: "#ffffff",
                yellow: "#ffff00",
                transparent: [null, null, null, 0],
                _default: "#ffffff"
            }
    } (jQuery),
    function(a) {
        var b = "waitForImages";
        a.waitForImages = {
            hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage"]
        },
            a.expr[":"].uncached = function(b) {
                if (!a(b).is('img[src!=""]')) return ! 1;
                var c = new Image;
                return c.src = b.src,
                    !c.complete
            },
            a.fn.waitForImages = function(c, d, e) {
                var f = 0,
                    g = 0;
                if (a.isPlainObject(arguments[0]) && (e = arguments[0].waitForAll, d = arguments[0].each, c = arguments[0].finished), c = c || a.noop, d = d || a.noop, e = !!e, !a.isFunction(c) || !a.isFunction(d)) throw new TypeError("An invalid callback was supplied.");
                return this.each(function() {
                    var h = a(this),
                        i = [],
                        j = a.waitForImages.hasImageProperties || [],
                        k = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
                    e ? h.find("*").andSelf().each(function() {
                        var b = a(this);
                        b.is("img:uncached") && i.push({
                            src: b.attr("src"),
                            element: b[0]
                        }),
                            a.each(j,
                                function(a, c) {
                                    var d, e = b.css(c);
                                    if (!e) return ! 0;
                                    for (; d = k.exec(e);) i.push({
                                        src: d[2],
                                        element: b[0]
                                    })
                                })
                    }) : h.find("img:uncached").each(function() {
                        i.push({
                            src: this.src,
                            element: this
                        })
                    }),
                        f = i.length,
                        g = 0,
                    0 === f && c.call(h[0]),
                        a.each(i,
                            function(e, i) {
                                var j = new Image;
                                a(j).bind("load." + b + " error." + b,
                                    function(a) {
                                        return g++,
                                            d.call(i.element, g, f, "load" == a.type),
                                            g == f ? (c.call(h[0]), !1) : void 0
                                    }),
                                    j.src = i.src
                            })
                })
            }
    } (jQuery),
    function(a) {
        a.fn.caret = function(a) {
            var b = this[0],
                c = "true" === b.contentEditable;
            if (0 == arguments.length) {
                if (window.getSelection) {
                    if (c) {
                        b.focus();
                        var d = window.getSelection().getRangeAt(0),
                            e = d.cloneRange();
                        return e.selectNodeContents(b),
                            e.setEnd(d.endContainer, d.endOffset),
                            e.toString().length
                    }
                    return b.selectionStart
                }
                if (document.selection) {
                    if (b.focus(), c) {
                        var d = document.selection.createRange(),
                            e = document.body.createTextRange();
                        return e.moveToElementText(b),
                            e.setEndPoint("EndToEnd", d),
                            e.text.length
                    }
                    var a = 0,
                        f = b.createTextRange(),
                        e = document.selection.createRange().duplicate(),
                        g = e.getBookmark();
                    for (f.moveToBookmark(g); 0 !== f.moveStart("character", -1);) a++;
                    return a
                }
                return b.selectionStart ? b.selectionStart: 0
            }
            if ( - 1 == a && (a = this[c ? "text": "val"]().length), window.getSelection) c ? (b.focus(), window.getSelection().collapse(b.firstChild, a)) : b.setSelectionRange(a, a);
            else if (document.body.createTextRange) if (c) {
                var f = document.body.createTextRange();
                f.moveToElementText(b),
                    f.moveStart("character", a),
                    f.collapse(!0),
                    f.select()
            } else {
                var f = b.createTextRange();
                f.move("character", a),
                    f.select()
            }
            return c || b.focus(),
                a
        }
    } (jQuery);
var saveAs = saveAs ||
    function(a) {
        "use strict";
        if ("undefined" == typeof navigator || !/MSIE [1-9]\./.test(navigator.userAgent)) {
            var b = a.document,
                c = function() {
                    return a.URL || a.webkitURL || a
                },
                d = b.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                e = "download" in d,
                f = function(a) {
                    var b = new MouseEvent("click");
                    a.dispatchEvent(b)
                },
                g = a.webkitRequestFileSystem,
                h = a.requestFileSystem || g || a.mozRequestFileSystem,
                i = function(b) { (a.setImmediate || a.setTimeout)(function() {
                        throw b
                    },
                    0)
                },
                j = "application/octet-stream",
                k = 0,
                l = 500,
                m = function(b) {
                    var d = function() {
                        "string" == typeof b ? c().revokeObjectURL(b) : b.remove()
                    };
                    a.chrome ? d() : setTimeout(d, l)
                },
                n = function(a, b, c) {
                    b = [].concat(b);
                    for (var d = b.length; d--;) {
                        var e = a["on" + b[d]];
                        if ("function" == typeof e) try {
                            e.call(a, c || a)
                        } catch(f) {
                            i(f)
                        }
                    }
                },
                o = function(a) {
                    return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["﻿", a], {
                        type: a.type
                    }) : a
                },
                p = function(b, i, l) {
                    l || (b = o(b));
                    var p, q, r, s = this,
                        t = b.type,
                        u = !1,
                        v = function() {
                            n(s, "writestart progress write writeend".split(" "))
                        },
                        w = function() {
                            if ((u || !p) && (p = c().createObjectURL(b)), q) q.location.href = p;
                            else {
                                var d = a.open(p, "_blank");
                                void 0 == d && "undefined" != typeof safari && (a.location.href = p)
                            }
                            s.readyState = s.DONE,
                                v(),
                                m(p)
                        },
                        x = function(a) {
                            return function() {
                                return s.readyState !== s.DONE ? a.apply(this, arguments) : void 0
                            }
                        },
                        y = {
                            create: !0,
                            exclusive: !1
                        };
                    return s.readyState = s.INIT,
                    i || (i = "download"),
                        e ? (p = c().createObjectURL(b), d.href = p, d.download = i, void setTimeout(function() {
                            f(d),
                                v(),
                                m(p),
                                s.readyState = s.DONE
                        })) : (a.chrome && t && t !== j && (r = b.slice || b.webkitSlice, b = r.call(b, 0, b.size, j), u = !0), g && "download" !== i && (i += ".download"), (t === j || g) && (q = a), h ? (k += b.size, void h(a.TEMPORARY, k, x(function(a) {
                            a.root.getDirectory("saved", y, x(function(a) {
                                var c = function() {
                                    a.getFile(i, y, x(function(a) {
                                        a.createWriter(x(function(c) {
                                            c.onwriteend = function(b) {
                                                q.location.href = a.toURL(),
                                                    s.readyState = s.DONE,
                                                    n(s, "writeend", b),
                                                    m(a)
                                            },
                                                c.onerror = function() {
                                                    var a = c.error;
                                                    a.code !== a.ABORT_ERR && w()
                                                },
                                                "writestart progress write abort".split(" ").forEach(function(a) {
                                                    c["on" + a] = s["on" + a]
                                                }),
                                                c.write(b),
                                                s.abort = function() {
                                                    c.abort(),
                                                        s.readyState = s.DONE
                                                },
                                                s.readyState = s.WRITING
                                        }), w)
                                    }), w)
                                };
                                a.getFile(i, {
                                        create: !1
                                    },
                                    x(function(a) {
                                        a.remove(),
                                            c()
                                    }), x(function(a) {
                                        a.code === a.NOT_FOUND_ERR ? c() : w()
                                    }))
                            }), w)
                        }), w)) : void w())
                },
                q = p.prototype,
                r = function(a, b, c) {
                    return new p(a, b, c)
                };
            return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ?
                function(a, b, c) {
                    return c || (a = o(a)),
                        navigator.msSaveOrOpenBlob(a, b || "download")
                }: (q.abort = function() {
                var a = this;
                a.readyState = a.DONE,
                    n(a, "abort")
            },
                q.readyState = q.INIT = 0, q.WRITING = 1, q.DONE = 2, q.error = q.onwritestart = q.onprogress = q.onwrite = q.onabort = q.onerror = q.onwriteend = null, r)
        }
    } ("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
"undefined" != typeof module && module.exports ? module.exports.saveAs = saveAs: "undefined" != typeof define && null !== define && null != define.amd && define([],
    function() {
        return saveAs
    }),
    function() {
        var a = this,
            b = a._,
            c = {},
            d = Array.prototype,
            e = Object.prototype,
            f = Function.prototype,
            g = d.push,
            h = d.slice,
            i = d.concat,
            j = e.toString,
            k = e.hasOwnProperty,
            l = d.forEach,
            m = d.map,
            n = d.reduce,
            o = d.reduceRight,
            p = d.filter,
            q = d.every,
            r = d.some,
            s = d.indexOf,
            t = d.lastIndexOf,
            u = Array.isArray,
            v = Object.keys,
            w = f.bind,
            x = function(a) {
                return a instanceof x ? a: this instanceof x ? void(this._wrapped = a) : new x(a)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), exports._ = x) : a._ = x,
            x.VERSION = "1.4.4";
        var y = x.each = x.forEach = function(a, b, d) {
            if (null != a) if (l && a.forEach === l) a.forEach(b, d);
            else if (a.length === +a.length) {
                for (var e = 0,
                         f = a.length; f > e; e++) if (b.call(d, a[e], e, a) === c) return
            } else for (var g in a) if (x.has(a, g) && b.call(d, a[g], g, a) === c) return
        };
        x.map = x.collect = function(a, b, c) {
            var d = [];
            return null == a ? d: m && a.map === m ? a.map(b, c) : (y(a,
                function(a, e, f) {
                    d[d.length] = b.call(c, a, e, f)
                }), d)
        };
        var z = "Reduce of empty array with no initial value";
        x.reduce = x.foldl = x.inject = function(a, b, c, d) {
            var e = arguments.length > 2;
            if (null == a && (a = []), n && a.reduce === n) return d && (b = x.bind(b, d)),
                e ? a.reduce(b, c) : a.reduce(b);
            if (y(a,
                    function(a, f, g) {
                        e ? c = b.call(d, c, a, f, g) : (c = a, e = !0)
                    }), !e) throw new TypeError(z);
            return c
        },
            x.reduceRight = x.foldr = function(a, b, c, d) {
                var e = arguments.length > 2;
                if (null == a && (a = []), o && a.reduceRight === o) return d && (b = x.bind(b, d)),
                    e ? a.reduceRight(b, c) : a.reduceRight(b);
                var f = a.length;
                if (f !== +f) {
                    var g = x.keys(a);
                    f = g.length
                }
                if (y(a,
                        function(h, i, j) {
                            i = g ? g[--f] : --f,
                                e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0)
                        }), !e) throw new TypeError(z);
                return c
            },
            x.find = x.detect = function(a, b, c) {
                var d;
                return A(a,
                    function(a, e, f) {
                        return b.call(c, a, e, f) ? (d = a, !0) : void 0
                    }),
                    d
            },
            x.filter = x.select = function(a, b, c) {
                var d = [];
                return null == a ? d: p && a.filter === p ? a.filter(b, c) : (y(a,
                    function(a, e, f) {
                        b.call(c, a, e, f) && (d[d.length] = a)
                    }), d)
            },
            x.reject = function(a, b, c) {
                return x.filter(a,
                    function(a, d, e) {
                        return ! b.call(c, a, d, e)
                    },
                    c)
            },
            x.every = x.all = function(a, b, d) {
                b || (b = x.identity);
                var e = !0;
                return null == a ? e: q && a.every === q ? a.every(b, d) : (y(a,
                    function(a, f, g) {
                        return (e = e && b.call(d, a, f, g)) ? void 0 : c
                    }), !!e)
            };
        var A = x.some = x.any = function(a, b, d) {
            b || (b = x.identity);
            var e = !1;
            return null == a ? e: r && a.some === r ? a.some(b, d) : (y(a,
                function(a, f, g) {
                    return e || (e = b.call(d, a, f, g)) ? c: void 0
                }), !!e)
        };
        x.contains = x.include = function(a, b) {
            return null == a ? !1 : s && a.indexOf === s ? -1 != a.indexOf(b) : A(a,
                function(a) {
                    return a === b
                })
        },
            x.invoke = function(a, b) {
                var c = h.call(arguments, 2),
                    d = x.isFunction(b);
                return x.map(a,
                    function(a) {
                        return (d ? b: a[b]).apply(a, c)
                    })
            },
            x.pluck = function(a, b) {
                return x.map(a,
                    function(a) {
                        return a[b]
                    })
            },
            x.where = function(a, b, c) {
                return x.isEmpty(b) ? c ? null: [] : x[c ? "find": "filter"](a,
                    function(a) {
                        for (var c in b) if (b[c] !== a[c]) return ! 1;
                        return ! 0
                    })
            },
            x.findWhere = function(a, b) {
                return x.where(a, b, !0)
            },
            x.max = function(a, b, c) {
                if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.max.apply(Math, a);
                if (!b && x.isEmpty(a)) return - 1 / 0;
                var d = {
                    computed: -1 / 0,
                    value: -1 / 0
                };
                return y(a,
                    function(a, e, f) {
                        var g = b ? b.call(c, a, e, f) : a;
                        g >= d.computed && (d = {
                            value: a,
                            computed: g
                        })
                    }),
                    d.value
            },
            x.min = function(a, b, c) {
                if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.min.apply(Math, a);
                if (!b && x.isEmpty(a)) return 1 / 0;
                var d = {
                    computed: 1 / 0,
                    value: 1 / 0
                };
                return y(a,
                    function(a, e, f) {
                        var g = b ? b.call(c, a, e, f) : a;
                        g < d.computed && (d = {
                            value: a,
                            computed: g
                        })
                    }),
                    d.value
            },
            x.shuffle = function(a) {
                var b, c = 0,
                    d = [];
                return y(a,
                    function(a) {
                        b = x.random(c++),
                            d[c - 1] = d[b],
                            d[b] = a
                    }),
                    d
            };
        var B = function(a) {
            return x.isFunction(a) ? a: function(b) {
                return b[a]
            }
        };
        x.sortBy = function(a, b, c) {
            var d = B(b);
            return x.pluck(x.map(a,
                function(a, b, e) {
                    return {
                        value: a,
                        index: b,
                        criteria: d.call(c, a, b, e)
                    }
                }).sort(function(a, b) {
                    var c = a.criteria,
                        d = b.criteria;
                    if (c !== d) {
                        if (c > d || void 0 === c) return 1;
                        if (d > c || void 0 === d) return - 1
                    }
                    return a.index < b.index ? -1 : 1
                }), "value")
        };
        var C = function(a, b, c, d) {
            var e = {},
                f = B(b || x.identity);
            return y(a,
                function(b, g) {
                    var h = f.call(c, b, g, a);
                    d(e, h, b)
                }),
                e
        };
        x.groupBy = function(a, b, c) {
            return C(a, b, c,
                function(a, b, c) { (x.has(a, b) ? a[b] : a[b] = []).push(c)
                })
        },
            x.countBy = function(a, b, c) {
                return C(a, b, c,
                    function(a, b) {
                        x.has(a, b) || (a[b] = 0),
                            a[b]++
                    })
            },
            x.sortedIndex = function(a, b, c, d) {
                c = null == c ? x.identity: B(c);
                for (var e = c.call(d, b), f = 0, g = a.length; g > f;) {
                    var h = f + g >>> 1;
                    c.call(d, a[h]) < e ? f = h + 1 : g = h
                }
                return f
            },
            x.toArray = function(a) {
                return a ? x.isArray(a) ? h.call(a) : a.length === +a.length ? x.map(a, x.identity) : x.values(a) : []
            },
            x.size = function(a) {
                return null == a ? 0 : a.length === +a.length ? a.length: x.keys(a).length
            },
            x.first = x.head = x.take = function(a, b, c) {
                return null == a ? void 0 : null == b || c ? a[0] : h.call(a, 0, b)
            },
            x.initial = function(a, b, c) {
                return h.call(a, 0, a.length - (null == b || c ? 1 : b))
            },
            x.last = function(a, b, c) {
                return null == a ? void 0 : null == b || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0))
            },
            x.rest = x.tail = x.drop = function(a, b, c) {
                return h.call(a, null == b || c ? 1 : b)
            },
            x.compact = function(a) {
                return x.filter(a, x.identity)
            };
        var D = function(a, b, c) {
            return y(a,
                function(a) {
                    x.isArray(a) ? b ? g.apply(c, a) : D(a, b, c) : c.push(a)
                }),
                c
        };
        x.flatten = function(a, b) {
            return D(a, b, [])
        },
            x.without = function(a) {
                return x.difference(a, h.call(arguments, 1))
            },
            x.uniq = x.unique = function(a, b, c, d) {
                x.isFunction(b) && (d = c, c = b, b = !1);
                var e = c ? x.map(a, c, d) : a,
                    f = [],
                    g = [];
                return y(e,
                    function(c, d) { (b ? d && g[g.length - 1] === c: x.contains(g, c)) || (g.push(c), f.push(a[d]))
                    }),
                    f
            },
            x.union = function() {
                return x.uniq(i.apply(d, arguments))
            },
            x.intersection = function(a) {
                var b = h.call(arguments, 1);
                return x.filter(x.uniq(a),
                    function(a) {
                        return x.every(b,
                            function(b) {
                                return x.indexOf(b, a) >= 0
                            })
                    })
            },
            x.difference = function(a) {
                var b = i.apply(d, h.call(arguments, 1));
                return x.filter(a,
                    function(a) {
                        return ! x.contains(b, a)
                    })
            },
            x.zip = function() {
                for (var a = h.call(arguments), b = x.max(x.pluck(a, "length")), c = new Array(b), d = 0; b > d; d++) c[d] = x.pluck(a, "" + d);
                return c
            },
            x.object = function(a, b) {
                if (null == a) return {};
                for (var c = {},
                         d = 0,
                         e = a.length; e > d; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
                return c
            },
            x.indexOf = function(a, b, c) {
                if (null == a) return - 1;
                var d = 0,
                    e = a.length;
                if (c) {
                    if ("number" != typeof c) return d = x.sortedIndex(a, b),
                        a[d] === b ? d: -1;
                    d = 0 > c ? Math.max(0, e + c) : c
                }
                if (s && a.indexOf === s) return a.indexOf(b, c);
                for (; e > d; d++) if (a[d] === b) return d;
                return - 1
            },
            x.lastIndexOf = function(a, b, c) {
                if (null == a) return - 1;
                var d = null != c;
                if (t && a.lastIndexOf === t) return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
                for (var e = d ? c: a.length; e--;) if (a[e] === b) return e;
                return - 1
            },
            x.range = function(a, b, c) {
                arguments.length <= 1 && (b = a || 0, a = 0),
                    c = arguments[2] || 1;
                for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e;) f[e++] = a,
                    a += c;
                return f
            },
            x.bind = function(a, b) {
                if (a.bind === w && w) return w.apply(a, h.call(arguments, 1));
                var c = h.call(arguments, 2);
                return function() {
                    return a.apply(b, c.concat(h.call(arguments)))
                }
            },
            x.partial = function(a) {
                var b = h.call(arguments, 1);
                return function() {
                    return a.apply(this, b.concat(h.call(arguments)))
                }
            },
            x.bindAll = function(a) {
                var b = h.call(arguments, 1);
                return 0 === b.length && (b = x.functions(a)),
                    y(b,
                        function(b) {
                            a[b] = x.bind(a[b], a)
                        }),
                    a
            },
            x.memoize = function(a, b) {
                var c = {};
                return b || (b = x.identity),
                    function() {
                        var d = b.apply(this, arguments);
                        return x.has(c, d) ? c[d] : c[d] = a.apply(this, arguments)
                    }
            },
            x.delay = function(a, b) {
                var c = h.call(arguments, 2);
                return setTimeout(function() {
                        return a.apply(null, c)
                    },
                    b)
            },
            x.defer = function(a) {
                return x.delay.apply(x, [a, 1].concat(h.call(arguments, 1)))
            },
            x.throttle = function(a, b) {
                var c, d, e, f, g = 0,
                    h = function() {
                        g = new Date,
                            e = null,
                            f = a.apply(c, d)
                    };
                return function() {
                    var i = new Date,
                        j = b - (i - g);
                    return c = this,
                        d = arguments,
                        0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)),
                        f
                }
            },
            x.debounce = function(a, b, c) {
                var d, e;
                return function() {
                    var f = this,
                        g = arguments,
                        h = function() {
                            d = null,
                            c || (e = a.apply(f, g))
                        },
                        i = c && !d;
                    return clearTimeout(d),
                        d = setTimeout(h, b),
                    i && (e = a.apply(f, g)),
                        e
                }
            },
            x.once = function(a) {
                var b, c = !1;
                return function() {
                    return c ? b: (c = !0, b = a.apply(this, arguments), a = null, b)
                }
            },
            x.wrap = function(a, b) {
                return function() {
                    var c = [a];
                    return g.apply(c, arguments),
                        b.apply(this, c)
                }
            },
            x.compose = function() {
                var a = arguments;
                return function() {
                    for (var b = arguments,
                             c = a.length - 1; c >= 0; c--) b = [a[c].apply(this, b)];
                    return b[0]
                }
            },
            x.after = function(a, b) {
                return 0 >= a ? b() : function() {
                    return--a < 1 ? b.apply(this, arguments) : void 0
                }
            },
            x.keys = v ||
            function(a) {
                if (a !== Object(a)) throw new TypeError("Invalid object");
                var b = [];
                for (var c in a) x.has(a, c) && (b[b.length] = c);
                return b
            },
            x.values = function(a) {
                var b = [];
                for (var c in a) x.has(a, c) && b.push(a[c]);
                return b
            },
            x.pairs = function(a) {
                var b = [];
                for (var c in a) x.has(a, c) && b.push([c, a[c]]);
                return b
            },
            x.invert = function(a) {
                var b = {};
                for (var c in a) x.has(a, c) && (b[a[c]] = c);
                return b
            },
            x.functions = x.methods = function(a) {
                var b = [];
                for (var c in a) x.isFunction(a[c]) && b.push(c);
                return b.sort()
            },
            x.extend = function(a) {
                return y(h.call(arguments, 1),
                    function(b) {
                        if (b) for (var c in b) a[c] = b[c]
                    }),
                    a
            },
            x.pick = function(a) {
                var b = {},
                    c = i.apply(d, h.call(arguments, 1));
                return y(c,
                    function(c) {
                        c in a && (b[c] = a[c])
                    }),
                    b
            },
            x.omit = function(a) {
                var b = {},
                    c = i.apply(d, h.call(arguments, 1));
                for (var e in a) x.contains(c, e) || (b[e] = a[e]);
                return b
            },
            x.defaults = function(a) {
                return y(h.call(arguments, 1),
                    function(b) {
                        if (b) for (var c in b) null == a[c] && (a[c] = b[c])
                    }),
                    a
            },
            x.clone = function(a) {
                return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({},
                    a) : a
            },
            x.tap = function(a, b) {
                return b(a),
                    a
            };
        var E = function(a, b, c, d) {
            if (a === b) return 0 !== a || 1 / a == 1 / b;
            if (null == a || null == b) return a === b;
            a instanceof x && (a = a._wrapped),
            b instanceof x && (b = b._wrapped);
            var e = j.call(a);
            if (e != j.call(b)) return ! 1;
            switch (e) {
                case "[object String]":
                    return a == String(b);
                case "[object Number]":
                    return a != +a ? b != +b: 0 == a ? 1 / a == 1 / b: a == +b;
                case "[object Date]":
                case "[object Boolean]":
                    return + a == +b;
                case "[object RegExp]":
                    return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
            }
            if ("object" != typeof a || "object" != typeof b) return ! 1;
            for (var f = c.length; f--;) if (c[f] == a) return d[f] == b;
            c.push(a),
                d.push(b);
            var g = 0,
                h = !0;
            if ("[object Array]" == e) {
                if (g = a.length, h = g == b.length) for (; g--&&(h = E(a[g], b[g], c, d)););
            } else {
                var i = a.constructor,
                    k = b.constructor;
                if (i !== k && !(x.isFunction(i) && i instanceof i && x.isFunction(k) && k instanceof k)) return ! 1;
                for (var l in a) if (x.has(a, l) && (g++, !(h = x.has(b, l) && E(a[l], b[l], c, d)))) break;
                if (h) {
                    for (l in b) if (x.has(b, l) && !g--) break;
                    h = !g
                }
            }
            return c.pop(),
                d.pop(),
                h
        };
        x.isEqual = function(a, b) {
            return E(a, b, [], [])
        },
            x.isEmpty = function(a) {
                if (null == a) return ! 0;
                if (x.isArray(a) || x.isString(a)) return 0 === a.length;
                for (var b in a) if (x.has(a, b)) return ! 1;
                return ! 0
            },
            x.isElement = function(a) {
                return ! (!a || 1 !== a.nodeType)
            },
            x.isArray = u ||
            function(a) {
                return "[object Array]" == j.call(a)
            },
            x.isObject = function(a) {
                return a === Object(a)
            },
            y(["Arguments", "Function", "String", "Number", "Date", "RegExp"],
                function(a) {
                    x["is" + a] = function(b) {
                        return j.call(b) == "[object " + a + "]"
                    }
                }),
        x.isArguments(arguments) || (x.isArguments = function(a) {
            return ! (!a || !x.has(a, "callee"))
        }),
        "function" != typeof / . / &&(x.isFunction = function(a) {
            return "function" == typeof a
        }),
            x.isFinite = function(a) {
                return isFinite(a) && !isNaN(parseFloat(a))
            },
            x.isNaN = function(a) {
                return x.isNumber(a) && a != +a
            },
            x.isBoolean = function(a) {
                return a === !0 || a === !1 || "[object Boolean]" == j.call(a)
            },
            x.isNull = function(a) {
                return null === a
            },
            x.isUndefined = function(a) {
                return void 0 === a
            },
            x.has = function(a, b) {
                return k.call(a, b)
            },
            x.noConflict = function() {
                return a._ = b,
                    this
            },
            x.identity = function(a) {
                return a
            },
            x.times = function(a, b, c) {
                for (var d = Array(a), e = 0; a > e; e++) d[e] = b.call(c, e);
                return d
            },
            x.random = function(a, b) {
                return null == b && (b = a, a = 0),
                a + Math.floor(Math.random() * (b - a + 1))
            };
        var F = {
            escape: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "/": "&#x2F;"
            }
        };
        F.unescape = x.invert(F.escape);
        var G = {
            escape: new RegExp("[" + x.keys(F.escape).join("") + "]", "g"),
            unescape: new RegExp("(" + x.keys(F.unescape).join("|") + ")", "g")
        };
        x.each(["escape", "unescape"],
            function(a) {
                x[a] = function(b) {
                    return null == b ? "": ("" + b).replace(G[a],
                        function(b) {
                            return F[a][b]
                        })
                }
            }),
            x.result = function(a, b) {
                if (null == a) return null;
                var c = a[b];
                return x.isFunction(c) ? c.call(a) : c
            },
            x.mixin = function(a) {
                y(x.functions(a),
                    function(b) {
                        var c = x[b] = a[b];
                        x.prototype[b] = function() {
                            var a = [this._wrapped];
                            return g.apply(a, arguments),
                                L.call(this, c.apply(x, a))
                        }
                    })
            };
        var H = 0;
        x.uniqueId = function(a) {
            var b = ++H + "";
            return a ? a + b: b
        },
            x.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
        var I = /(.)^/,
            J = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "	": "t",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            K = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        x.template = function(a, b, c) {
            var d;
            c = x.defaults({},
                c, x.templateSettings);
            var e = new RegExp([(c.escape || I).source, (c.interpolate || I).source, (c.evaluate || I).source].join("|") + "|$", "g"),
                f = 0,
                g = "__p+='";
            a.replace(e,
                function(b, c, d, e, h) {
                    return g += a.slice(f, h).replace(K,
                        function(a) {
                            return "\\" + J[a]
                        }),
                    c && (g += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'"),
                    d && (g += "'+\n((__t=(" + d + "))==null?'':__t)+\n'"),
                    e && (g += "';\n" + e + "\n__p+='"),
                        f = h + b.length,
                        b
                }),
                g += "';\n",
            c.variable || (g = "with(obj||{}){\n" + g + "}\n"),
                g = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + g + "return __p;\n";
            try {
                d = new Function(c.variable || "obj", "_", g)
            } catch(h) {
                throw h.source = g,
                    h
            }
            if (b) return d(b, x);
            var i = function(a) {
                return d.call(this, a, x)
            };
            return i.source = "function(" + (c.variable || "obj") + "){\n" + g + "}",
                i
        },
            x.chain = function(a) {
                return x(a).chain()
            };
        var L = function(a) {
            return this._chain ? x(a).chain() : a
        };
        x.mixin(x),
            y(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
                function(a) {
                    var b = d[a];
                    x.prototype[a] = function() {
                        var c = this._wrapped;
                        return b.apply(c, arguments),
                        "shift" != a && "splice" != a || 0 !== c.length || delete c[0],
                            L.call(this, c)
                    }
                }),
            y(["concat", "join", "slice"],
                function(a) {
                    var b = d[a];
                    x.prototype[a] = function() {
                        return L.call(this, b.apply(this._wrapped, arguments))
                    }
                }),
            x.extend(x.prototype, {
                chain: function() {
                    return this._chain = !0,
                        this
                },
                value: function() {
                    return this._wrapped
                }
            })
    }.call(this);
var XRegExp;
XRegExp = XRegExp ||
function(a) {
    "use strict";
    function b(a, b, c) {
        var d;
        for (d in k.prototype) k.prototype.hasOwnProperty(d) && (a[d] = k.prototype[d]);
        return a.xregexp = {
            captureNames: b,
            isNative: !!c
        },
            a
    }
    function c(a) {
        return (a.global ? "g": "") + (a.ignoreCase ? "i": "") + (a.multiline ? "m": "") + (a.extended ? "x": "") + (a.sticky ? "y": "")
    }
    function d(a, d, e) {
        if (!k.isRegExp(a)) throw new TypeError("type RegExp expected");
        var f = o.replace.call(c(a) + (d || ""), w, "");
        return e && (f = o.replace.call(f, new RegExp("[" + e + "]+", "g"), "")),
            a = a.xregexp && !a.xregexp.isNative ? b(k(a.source, f), a.xregexp.captureNames ? a.xregexp.captureNames.slice(0) : null) : b(new RegExp(a.source, f), null, !0)
    }
    function e(a, b) {
        var c = a.length;
        if (Array.prototype.lastIndexOf) return a.lastIndexOf(b);
        for (; c--;) if (a[c] === b) return c;
        return - 1
    }
    function f(a, b) {
        return Object.prototype.toString.call(a).toLowerCase() === "[object " + b + "]"
    }
    function g(a) {
        return a = a || {},
            "all" === a || a.all ? a = {
                natives: !0,
                extensibility: !0
            }: f(a, "string") && (a = k.forEach(a, /[^\s,]+/,
                function(a) {
                    this[a] = !0
                },
                {})),
            a
    }
    function h(a, b, c, d) {
        var e, f, g = r.length,
            h = null;
        A = !0;
        try {
            for (; g--;) if (f = r[g], ("all" === f.scope || f.scope === c) && (!f.trigger || f.trigger.call(d)) && (f.pattern.lastIndex = b, e = p.exec.call(f.pattern, a), e && e.index === b)) {
                h = {
                    output: f.handler.call(d, e, c),
                    match: e
                };
                break
            }
        } catch(i) {
            throw i
        } finally {
            A = !1
        }
        return h
    }
    function i(a) {
        k.addToken = l[a ? "on": "off"],
            n.extensibility = a
    }
    function j(a) {
        RegExp.prototype.exec = (a ? p: o).exec,
            RegExp.prototype.test = (a ? p: o).test,
            String.prototype.match = (a ? p: o).match,
            String.prototype.replace = (a ? p: o).replace,
            String.prototype.split = (a ? p: o).split,
            n.natives = a
    }
    var k, l, m, n = {
            natives: !1,
            extensibility: !1
        },
        o = {
            exec: RegExp.prototype.exec,
            test: RegExp.prototype.test,
            match: String.prototype.match,
            replace: String.prototype.replace,
            split: String.prototype.split
        },
        p = {},
        q = {},
        r = [],
        s = "default",
        t = "class",
        u = {
            "default": /^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/,
            "class": /^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/
        },
        v = /\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g,
        w = /([\s\S])(?=[\s\S]*\1)/g,
        x = /^(?:[?*+]|{\d+(?:,\d*)?})\??/,
        y = o.exec.call(/()??/, "")[1] === a,
        z = RegExp.prototype.sticky !== a,
        A = !1,
        B = "gim" + (z ? "y": "");
    return k = function(c, e) {
        if (k.isRegExp(c)) {
            if (e !== a) throw new TypeError("can't supply flags when constructing one RegExp from another");
            return d(c)
        }
        if (A) throw new Error("can't call the XRegExp constructor within token definition functions");
        var f, g, i, j = [],
            l = s,
            m = {
                hasNamedCapture: !1,
                captureNames: [],
                hasFlag: function(a) {
                    return e.indexOf(a) > -1
                }
            },
            n = 0;
        if (c = c === a ? "": String(c), e = e === a ? "": String(e), o.match.call(e, w)) throw new SyntaxError("invalid duplicate regular expression flag");
        for (c = o.replace.call(c, /^\(\?([\w$]+)\)/,
            function(a, b) {
                if (o.test.call(/[gy]/, b)) throw new SyntaxError("can't use flag g or y in mode modifier");
                return e = o.replace.call(e + b, w, ""),
                    ""
            }), k.forEach(e, /[\s\S]/,
            function(a) {
                if (B.indexOf(a[0]) < 0) throw new SyntaxError("invalid regular expression flag " + a[0])
            }); n < c.length;) f = h(c, n, l, m),
            f ? (j.push(f.output), n += f.match[0].length || 1) : (g = o.exec.call(u[l], c.slice(n)), g ? (j.push(g[0]), n += g[0].length) : (i = c.charAt(n), "[" === i ? l = t: "]" === i && (l = s), j.push(i), ++n));
        return b(new RegExp(j.join(""), o.replace.call(e, /[^gimy]+/g, "")), m.hasNamedCapture ? m.captureNames: null)
    },
        l = {
            on: function(a, b, c) {
                c = c || {},
                a && r.push({
                    pattern: d(a, "g" + (z ? "y": "")),
                    handler: b,
                    scope: c.scope || s,
                    trigger: c.trigger || null
                }),
                c.customFlags && (B = o.replace.call(B + c.customFlags, w, ""))
            },
            off: function() {
                throw new Error("extensibility must be installed before using addToken")
            }
        },
        k.addToken = l.off,
        k.cache = function(a, b) {
            var c = a + "/" + (b || "");
            return q[c] || (q[c] = k(a, b))
        },
        k.escape = function(a) {
            return o.replace.call(a, /[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        },
        k.exec = function(a, b, c, e) {
            var f, g = d(b, "g" + (e && z ? "y": ""), e === !1 ? "y": "");
            return g.lastIndex = c = c || 0,
                f = p.exec.call(g, a),
            e && f && f.index !== c && (f = null),
            b.global && (b.lastIndex = f ? g.lastIndex: 0),
                f
        },
        k.forEach = function(a, b, c, d) {
            for (var e, f = 0,
                     g = -1; e = k.exec(a, b, f);) c.call(d, e, ++g, a, b),
                f = e.index + (e[0].length || 1);
            return d
        },
        k.globalize = function(a) {
            return d(a, "g")
        },
        k.install = function(a) {
            a = g(a),
            !n.natives && a.natives && j(!0),
            !n.extensibility && a.extensibility && i(!0)
        },
        k.isInstalled = function(a) {
            return !! n[a]
        },
        k.isRegExp = function(a) {
            return f(a, "regexp")
        },
        k.matchChain = function(a, b) {
            return function c(a, d) {
                for (var e = b[d].regex ? b[d] : {
                        regex: b[d]
                    },
                         f = [], g = function(a) {
                        f.push(e.backref ? a[e.backref] || "": a[0])
                    },
                         h = 0; h < a.length; ++h) k.forEach(a[h], e.regex, g);
                return d !== b.length - 1 && f.length ? c(f, d + 1) : f
            } ([a], 0)
        },
        k.replace = function(b, c, e, f) {
            var g, h = k.isRegExp(c),
                i = c;
            return h ? (f === a && c.global && (f = "all"), i = d(c, "all" === f ? "g": "", "all" === f ? "": "g")) : "all" === f && (i = new RegExp(k.escape(String(c)), "g")),
                g = p.replace.call(String(b), i, e),
            h && c.global && (c.lastIndex = 0),
                g
        },
        k.split = function(a, b, c) {
            return p.split.call(a, b, c)
        },
        k.test = function(a, b, c, d) {
            return !! k.exec(a, b, c, d)
        },
        k.uninstall = function(a) {
            a = g(a),
            n.natives && a.natives && j(!1),
            n.extensibility && a.extensibility && i(!1)
        },
        k.union = function(a, b) {
            var c, d, e, g, h = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,
                i = 0,
                j = function(a, b, e) {
                    var f = d[i - c];
                    if (b) {
                        if (++i, f) return "(?<" + f + ">"
                    } else if (e) return "\\" + ( + e + c);
                    return a
                },
                l = [];
            if (!f(a, "array") || !a.length) throw new TypeError("patterns must be a nonempty array");
            for (g = 0; g < a.length; ++g) e = a[g],
                k.isRegExp(e) ? (c = i, d = e.xregexp && e.xregexp.captureNames || [], l.push(k(e.source).source.replace(h, j))) : l.push(k.escape(e));
            return k(l.join("|"), b)
        },
        k.version = "2.0.0",
        p.exec = function(b) {
            var d, f, g, h, i;
            if (this.global || (h = this.lastIndex), d = o.exec.apply(this, arguments)) {
                if (!y && d.length > 1 && e(d, "") > -1 && (g = new RegExp(this.source, o.replace.call(c(this), "g", "")), o.replace.call(String(b).slice(d.index), g,
                        function() {
                            for (var b = 1; b < arguments.length - 2; ++b) arguments[b] === a && (d[b] = a)
                        })), this.xregexp && this.xregexp.captureNames) for (i = 1; i < d.length; ++i) f = this.xregexp.captureNames[i - 1],
                f && (d[f] = d[i]);
                this.global && !d[0].length && this.lastIndex > d.index && (this.lastIndex = d.index)
            }
            return this.global || (this.lastIndex = h),
                d
        },
        p.test = function(a) {
            return !! p.exec.call(this, a)
        },
        p.match = function(a) {
            if (k.isRegExp(a)) {
                if (a.global) {
                    var b = o.match.apply(this, arguments);
                    return a.lastIndex = 0,
                        b
                }
            } else a = new RegExp(a);
            return p.exec.call(a, this)
        },
        p.replace = function(a, b) {
            var c, d, g, h, i = k.isRegExp(a);
            return i ? (a.xregexp && (c = a.xregexp.captureNames), a.global || (h = a.lastIndex)) : a += "",
                f(b, "function") ? d = o.replace.call(String(this), a,
                    function() {
                        var d, e = arguments;
                        if (c) for (e[0] = new String(e[0]), d = 0; d < c.length; ++d) c[d] && (e[0][c[d]] = e[d + 1]);
                        return i && a.global && (a.lastIndex = e[e.length - 2] + e[0].length),
                            b.apply(null, e)
                    }) : (g = String(this), d = o.replace.call(g, a,
                    function() {
                        var a = arguments;
                        return o.replace.call(String(b), v,
                            function(b, d, f) {
                                var g;
                                if (d) {
                                    if (g = +d, g <= a.length - 3) return a[g] || "";
                                    if (g = c ? e(c, d) : -1, 0 > g) throw new SyntaxError("backreference to undefined group " + b);
                                    return a[g + 1] || ""
                                }
                                if ("$" === f) return "$";
                                if ("&" === f || 0 == +f) return a[0];
                                if ("`" === f) return a[a.length - 1].slice(0, a[a.length - 2]);
                                if ("'" === f) return a[a.length - 1].slice(a[a.length - 2] + a[0].length);
                                if (f = +f, !isNaN(f)) {
                                    if (f > a.length - 3) throw new SyntaxError("backreference to undefined group " + b);
                                    return a[f] || ""
                                }
                                throw new SyntaxError("invalid token " + b)
                            })
                    })),
            i && (a.lastIndex = a.global ? 0 : h),
                d
        },
        p.split = function(b, c) {
            if (!k.isRegExp(b)) return o.split.apply(this, arguments);
            var d, e = String(this),
                f = b.lastIndex,
                g = [],
                h = 0;
            return c = (c === a ? -1 : c) >>> 0,
                k.forEach(e, b,
                    function(a) {
                        a.index + a[0].length > h && (g.push(e.slice(h, a.index)), a.length > 1 && a.index < e.length && Array.prototype.push.apply(g, a.slice(1)), d = a[0].length, h = a.index + d)
                    }),
                h === e.length ? (!o.test.call(b, "") || d) && g.push("") : g.push(e.slice(h)),
                b.lastIndex = f,
                g.length > c ? g.slice(0, c) : g
        },
        m = l.on,
        m(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4})|x(?![\dA-Fa-f]{2}))/,
            function(a, b) {
                if ("B" === a[1] && b === s) return a[0];
                throw new SyntaxError("invalid escape " + a[0])
            },
            {
                scope: "all"
            }),
        m(/\[(\^?)]/,
            function(a) {
                return a[1] ? "[\\s\\S]": "\\b\\B"
            }),
        m(/(?:\(\?#[^)]*\))+/,
            function(a) {
                return o.test.call(x, a.input.slice(a.index + a[0].length)) ? "": "(?:)"
            }),
        m(/\\k<([\w$]+)>/,
            function(a) {
                var b = isNaN(a[1]) ? e(this.captureNames, a[1]) + 1 : +a[1],
                    c = a.index + a[0].length;
                if (!b || b > this.captureNames.length) throw new SyntaxError("backreference to undefined group " + a[0]);
                return "\\" + b + (c === a.input.length || isNaN(a.input.charAt(c)) ? "": "(?:)")
            }),
        m(/(?:\s+|#.*)+/,
            function(a) {
                return o.test.call(x, a.input.slice(a.index + a[0].length)) ? "": "(?:)"
            },
            {
                trigger: function() {
                    return this.hasFlag("x")
                },
                customFlags: "x"
            }),
        m(/\./,
            function() {
                return "[\\s\\S]"
            },
            {
                trigger: function() {
                    return this.hasFlag("s")
                },
                customFlags: "s"
            }),
        m(/\(\?P?<([\w$]+)>/,
            function(a) {
                if (!isNaN(a[1])) throw new SyntaxError("can't use integer as capture name " + a[0]);
                return this.captureNames.push(a[1]),
                    this.hasNamedCapture = !0,
                    "("
            }),
        m(/\\(\d+)/,
            function(a, b) {
                if (! (b === s && /^[1-9]/.test(a[1]) && +a[1] <= this.captureNames.length) && "0" !== a[1]) throw new SyntaxError("can't use octal escape or backreference to undefined group " + a[0]);
                return a[0]
            },
            {
                scope: "all"
            }),
        m(/\((?!\?)/,
            function() {
                return this.hasFlag("n") ? "(?:": (this.captureNames.push(null), "(")
            },
            {
                customFlags: "n"
            }),
    "undefined" != typeof exports && (exports.XRegExp = k),
        k
} (),
    function(a) {
        "use strict";
        function b(a) {
            return a.replace(/[- _]+/g, "").toLowerCase()
        }
        function c(a) {
            return a.replace(/\w{4}/g, "\\u$&")
        }
        function d(a) {
            for (; a.length < 4;) a = "0" + a;
            return a
        }
        function e(a) {
            return parseInt(a, 16)
        }
        function f(a) {
            return parseInt(a, 10).toString(16)
        }
        function g(b) {
            var c, g = [],
                h = -1;
            return a.forEach(b, /\\u(\w{4})(?:-\\u(\w{4}))?/,
                function(a) {
                    c = e(a[1]),
                    c > h + 1 && (g.push("\\u" + d(f(h + 1))), c > h + 2 && g.push("-\\u" + d(f(c - 1)))),
                        h = e(a[2] || a[1])
                }),
            65535 > h && (g.push("\\u" + d(f(h + 1))), 65534 > h && g.push("-\\uFFFF")),
                g.join("")
        }
        function h(a) {
            return i["^" + a] || (i["^" + a] = g(i[a]))
        }
        var i = {};
        a.install("extensibility"),
            a.addUnicodePackage = function(d, e) {
                var f;
                if (!a.isInstalled("extensibility")) throw new Error("extensibility must be installed before adding Unicode packages");
                if (d) for (f in d) d.hasOwnProperty(f) && (i[b(f)] = c(d[f]));
                if (e) for (f in e) e.hasOwnProperty(f) && (i[b(e[f])] = i[b(f)])
            },
            a.addUnicodePackage({
                    L: "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05270531-055605590561-058705D0-05EA05F0-05F20620-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280840-085808A008A2-08AC0904-0939093D09500958-09610971-09770979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10CF10CF20D05-0D0C0D0E-0D100D12-0D3A0D3D0D4E0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC-0EDF0F000F40-0F470F49-0F6C0F88-0F8C1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510C710CD10D0-10FA10FC-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1BBA-1BE51C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11CF51CF61D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209C21022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2CF22CF32D00-2D252D272D2D2D30-2D672D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31BA31F0-31FF3400-4DB54E00-9FCCA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78B-A78EA790-A793A7A0-A7AAA7F8-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDAAE0-AAEAAAF2-AAF4AB01-AB06AB09-AB0EAB11-AB16AB20-AB26AB28-AB2EABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC"
                },
                {
                    L: "Letter"
                }),
            a.addToken(/\\([pP]){(\^?)([^}]*)}/,
                function(a, c) {
                    var d = "P" === a[1] || a[2] ? "^": "",
                        e = b(a[3]);
                    if ("P" === a[1] && a[2]) throw new SyntaxError("invalid double negation \\P{^");
                    if (!i.hasOwnProperty(e)) throw new SyntaxError("invalid or unknown Unicode property " + a[0]);
                    return "class" === c ? d ? h(e) : i[e] : "[" + d + i[e] + "]"
                },
                {
                    scope: "all"
                })
    } (XRegExp),
    function(a) {
        "use strict";
        if (!a.addUnicodePackage) throw new ReferenceError("Unicode Base must be loaded before Unicode Categories");
        a.install("extensibility"),
            a.addUnicodePackage({
                    Ll: "0061-007A00B500DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F05210523052505270561-05871D00-1D2B1D6B-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7B2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2CF32D00-2D252D272D2DA641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA661A663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CA78EA791A793A7A1A7A3A7A5A7A7A7A9A7FAFB00-FB06FB13-FB17FF41-FF5A",
                    Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E05200522052405260531-055610A0-10C510C710CD1E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CED2CF2A640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA660A662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BA78DA790A792A7A0A7A2A7A4A7A6A7A8A7AAFF21-FF3A",
                    Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",
                    Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D6A1D781D9B-1DBF2071207F2090-209C2C7C2C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A7F8A7F9A9CFAA70AADDAAF3AAF4FF70FF9EFF9F",
                    Lo: "00AA00BA01BB01C0-01C3029405D0-05EA05F0-05F20620-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150840-085808A008A2-08AC0904-0939093D09500958-09610972-09770979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10CF10CF20D05-0D0C0D0E-0D100D12-0D3A0D3D0D4E0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC-0EDF0F000F40-0F470F49-0F6C0F88-0F8C1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA10FD-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1BBA-1BE51C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF11CF51CF62135-21382D30-2D672D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31BA31F0-31FF3400-4DB54E00-9FCCA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCAAE0-AAEAAAF2AB01-AB06AB09-AB0EAB11-AB16AB20-AB26AB28-AB2EABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
                    M: "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065F067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0859-085B08E4-08FE0900-0903093A-093C093E-094F0951-0957096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F8D-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135D-135F1712-17141732-1734175217531772177317B4-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAD1BE6-1BF31C24-1C371CD0-1CD21CD4-1CE81CED1CF2-1CF41DC0-1DE61DFC-1DFF20D0-20F02CEF-2CF12D7F2DE0-2DFF302A-302F3099309AA66F-A672A674-A67DA69FA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1AAEB-AAEFAAF5AAF6ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",
                    Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065F067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0859-085B08E4-08FE0900-0902093A093C0941-0948094D0951-095709620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F8D-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135D-135F1712-17141732-1734175217531772177317B417B517B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91BAB1BE61BE81BE91BED1BEF-1BF11C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1CF41DC0-1DE61DFC-1DFF20D0-20DC20E120E5-20F02CEF-2CF12D7F2DE0-2DFF302A-302D3099309AA66FA674-A67DA69FA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1AAECAAEDAAF6ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",
                    Mc: "0903093B093E-09400949-094C094E094F0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1BAC1BAD1BE71BEA-1BEC1BEE1BF21BF31C24-1C2B1C341C351CE11CF21CF3302E302FA823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BAAEBAAEEAAEFAAF5ABE3ABE4ABE6ABE7ABE9ABEAABEC",
                    Me: "0488048920DD-20E020E2-20E4A670-A672",
                    N: "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0B72-0B770BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293248-324F3251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
                    Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19D91A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
                    Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",
                    No: "00B200B300B900BC-00BE09F4-09F90B72-0B770BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F919DA20702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293248-324F3251-325F3280-328932B1-32BFA830-A835",
                    P: "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100A700AB00B600B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E085E0964096509700AF00DF40E4F0E5A0E5B0F04-0F120F140F3A-0F3D0F850FD0-0FD40FD90FDA104A-104F10FB1360-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A194419451A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601BFC-1BFF1C3B-1C3F1C7E1C7F1CC0-1CC71CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2D702E00-2E2E2E30-2E3B3001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFAAF0AAF1ABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",
                    Pd: "002D058A05BE140018062010-20152E172E1A2E3A2E3B301C303030A0FE31FE32FE58FE63FF0D",
                    Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62",
                    Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",
                    Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20",
                    Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21",
                    Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F",
                    Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100A700B600B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E085E0964096509700AF00DF40E4F0E5A0E5B0F04-0F120F140F850FD0-0FD40FD90FDA104A-104F10FB1360-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A194419451A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601BFC-1BFF1C3B-1C3F1C7E1C7F1CC0-1CC71CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2D702E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E30-2E393001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFAAF0AAF1ABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",
                    S: "0024002B003C-003E005E0060007C007E00A2-00A600A800A900AC00AE-00B100B400B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F60482058F0606-0608060B060E060F06DE06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0D790E3F0F01-0F030F130F15-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F1390-139917DB194019DE-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B9210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23F32400-24262440-244A249C-24E92500-26FF2701-27672794-27C427C7-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-324732503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FBB2-FBC1FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",
                    Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C21182140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC",
                    Sc: "002400A2-00A5058F060B09F209F309FB0AF10BF90E3F17DB20A0-20B9A838FDFCFE69FF04FFE0FFE1FFE5FFE6",
                    Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFBB2-FBC1FF3EFF40FFE3",
                    So: "00A600A900AE00B00482060E060F06DE06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0D790F01-0F030F130F15-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F1390-1399194019DE-19FF1B61-1B6A1B74-1B7C210021012103-210621082109211421162117211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23F32400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26FF2701-27672794-27BF2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-324732503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",
                    Z: "002000A01680180E2000-200A20282029202F205F3000",
                    Zs: "002000A01680180E2000-200A202F205F3000",
                    Zl: "2028",
                    Zp: "2029",
                    C: "0000-001F007F-009F00AD03780379037F-0383038B038D03A20528-05300557055805600588058B-058E059005C8-05CF05EB-05EF05F5-0605061C061D06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F085C085D085F-089F08A108AD-08E308FF097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B78-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D3B0D3C0D450D490D4F-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EE0-0EFF0F480F6D-0F700F980FBD0FCD0FDB-0FFF10C610C8-10CC10CE10CF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B135C137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BF4-1BFB1C38-1C3A1C4A-1C4C1C80-1CBF1CC8-1CCF1CF7-1CFF1DE7-1DFB1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F209D-209F20BA-20CF20F1-20FF218A-218F23F4-23FF2427-243F244B-245F27002B4D-2B4F2B5A-2BFF2C2F2C5F2CF4-2CF82D262D28-2D2C2D2E2D2F2D68-2D6E2D71-2D7E2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E3C-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31BB-31BF31E4-31EF321F32FF4DB6-4DBF9FCD-9FFFA48D-A48FA4C7-A4CFA62C-A63FA698-A69EA6F8-A6FFA78FA794-A79FA7AB-A7F7A82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAF7-AB00AB07AB08AB0FAB10AB17-AB1FAB27AB2F-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBC2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",
                    Cc: "0000-001F007F-009F",
                    Cf: "00AD0600-060406DD070F200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB",
                    Co: "E000-F8FF",
                    Cs: "D800-DFFF",
                    Cn: "03780379037F-0383038B038D03A20528-05300557055805600588058B-058E059005C8-05CF05EB-05EF05F5-05FF0605061C061D070E074B074C07B2-07BF07FB-07FF082E082F083F085C085D085F-089F08A108AD-08E308FF097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B78-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D3B0D3C0D450D490D4F-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EE0-0EFF0F480F6D-0F700F980FBD0FCD0FDB-0FFF10C610C8-10CC10CE10CF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B135C137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BF4-1BFB1C38-1C3A1C4A-1C4C1C80-1CBF1CC8-1CCF1CF7-1CFF1DE7-1DFB1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F209D-209F20BA-20CF20F1-20FF218A-218F23F4-23FF2427-243F244B-245F27002B4D-2B4F2B5A-2BFF2C2F2C5F2CF4-2CF82D262D28-2D2C2D2E2D2F2D68-2D6E2D71-2D7E2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E3C-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31BB-31BF31E4-31EF321F32FF4DB6-4DBF9FCD-9FFFA48D-A48FA4C7-A4CFA62C-A63FA698-A69EA6F8-A6FFA78FA794-A79FA7AB-A7F7A82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAF7-AB00AB07AB08AB0FAB10AB17-AB1FAB27AB2F-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBC2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"
                },
                {
                    Ll: "Lowercase_Letter",
                    Lu: "Uppercase_Letter",
                    Lt: "Titlecase_Letter",
                    Lm: "Modifier_Letter",
                    Lo: "Other_Letter",
                    M: "Mark",
                    Mn: "Nonspacing_Mark",
                    Mc: "Spacing_Mark",
                    Me: "Enclosing_Mark",
                    N: "Number",
                    Nd: "Decimal_Number",
                    Nl: "Letter_Number",
                    No: "Other_Number",
                    P: "Punctuation",
                    Pd: "Dash_Punctuation",
                    Ps: "Open_Punctuation",
                    Pe: "Close_Punctuation",
                    Pi: "Initial_Punctuation",
                    Pf: "Final_Punctuation",
                    Pc: "Connector_Punctuation",
                    Po: "Other_Punctuation",
                    S: "Symbol",
                    Sm: "Math_Symbol",
                    Sc: "Currency_Symbol",
                    Sk: "Modifier_Symbol",
                    So: "Other_Symbol",
                    Z: "Separator",
                    Zs: "Space_Separator",
                    Zl: "Line_Separator",
                    Zp: "Paragraph_Separator",
                    C: "Other",
                    Cc: "Control",
                    Cf: "Format",
                    Co: "Private_Use",
                    Cs: "Surrogate",
                    Cn: "Unassigned"
                })
    } (XRegExp),
    function(a) {
        "use strict";
        if (!a.addUnicodePackage) throw new ReferenceError("Unicode Base must be loaded before Unicode Scripts");
        a.install("extensibility"),
            a.addUnicodePackage({
                Arabic: "0600-06040606-060B060D-061A061E0620-063F0641-064A0656-065E066A-066F0671-06DC06DE-06FF0750-077F08A008A2-08AC08E4-08FEFB50-FBC1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFCFE70-FE74FE76-FEFC",
                Armenian: "0531-05560559-055F0561-0587058A058FFB13-FB17",
                Balinese: "1B00-1B4B1B50-1B7C",
                Bamum: "A6A0-A6F7",
                Batak: "1BC0-1BF31BFC-1BFF",
                Bengali: "0981-09830985-098C098F09900993-09A809AA-09B009B209B6-09B909BC-09C409C709C809CB-09CE09D709DC09DD09DF-09E309E6-09FB",
                Bopomofo: "02EA02EB3105-312D31A0-31BA",
                Braille: "2800-28FF",
                Buginese: "1A00-1A1B1A1E1A1F",
                Buhid: "1740-1753",
                Canadian_Aboriginal: "1400-167F18B0-18F5",
                Cham: "AA00-AA36AA40-AA4DAA50-AA59AA5C-AA5F",
                Cherokee: "13A0-13F4",
                Common: "0000-0040005B-0060007B-00A900AB-00B900BB-00BF00D700F702B9-02DF02E5-02E902EC-02FF0374037E038503870589060C061B061F06400660-066906DD096409650E3F0FD5-0FD810FB16EB-16ED173517361802180318051CD31CE11CE9-1CEC1CEE-1CF31CF51CF62000-200B200E-2064206A-20702074-207E2080-208E20A0-20B92100-21252127-2129212C-21312133-214D214F-215F21892190-23F32400-24262440-244A2460-26FF2701-27FF2900-2B4C2B50-2B592E00-2E3B2FF0-2FFB3000-300430063008-30203030-3037303C-303F309B309C30A030FB30FC3190-319F31C0-31E33220-325F327F-32CF3358-33FF4DC0-4DFFA700-A721A788-A78AA830-A839FD3EFD3FFDFDFE10-FE19FE30-FE52FE54-FE66FE68-FE6BFEFFFF01-FF20FF3B-FF40FF5B-FF65FF70FF9EFF9FFFE0-FFE6FFE8-FFEEFFF9-FFFD",
                Coptic: "03E2-03EF2C80-2CF32CF9-2CFF",
                Cyrillic: "0400-04840487-05271D2B1D782DE0-2DFFA640-A697A69F",
                Devanagari: "0900-09500953-09630966-09770979-097FA8E0-A8FB",
                Ethiopic: "1200-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A135D-137C1380-13992D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDEAB01-AB06AB09-AB0EAB11-AB16AB20-AB26AB28-AB2E",
                Georgian: "10A0-10C510C710CD10D0-10FA10FC-10FF2D00-2D252D272D2D",
                Glagolitic: "2C00-2C2E2C30-2C5E",
                Greek: "0370-03730375-0377037A-037D038403860388-038A038C038E-03A103A3-03E103F0-03FF1D26-1D2A1D5D-1D611D66-1D6A1DBF1F00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FC41FC6-1FD31FD6-1FDB1FDD-1FEF1FF2-1FF41FF6-1FFE2126",
                Gujarati: "0A81-0A830A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABC-0AC50AC7-0AC90ACB-0ACD0AD00AE0-0AE30AE6-0AF1",
                Gurmukhi: "0A01-0A030A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A3C0A3E-0A420A470A480A4B-0A4D0A510A59-0A5C0A5E0A66-0A75",
                Han: "2E80-2E992E9B-2EF32F00-2FD5300530073021-30293038-303B3400-4DB54E00-9FCCF900-FA6DFA70-FAD9",
                Hangul: "1100-11FF302E302F3131-318E3200-321E3260-327EA960-A97CAC00-D7A3D7B0-D7C6D7CB-D7FBFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
                Hanunoo: "1720-1734",
                Hebrew: "0591-05C705D0-05EA05F0-05F4FB1D-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FB4F",
                Hiragana: "3041-3096309D-309F",
                Inherited: "0300-036F04850486064B-0655065F0670095109521CD0-1CD21CD4-1CE01CE2-1CE81CED1CF41DC0-1DE61DFC-1DFF200C200D20D0-20F0302A-302D3099309AFE00-FE0FFE20-FE26",
                Javanese: "A980-A9CDA9CF-A9D9A9DEA9DF",
                Kannada: "0C820C830C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBC-0CC40CC6-0CC80CCA-0CCD0CD50CD60CDE0CE0-0CE30CE6-0CEF0CF10CF2",
                Katakana: "30A1-30FA30FD-30FF31F0-31FF32D0-32FE3300-3357FF66-FF6FFF71-FF9D",
                Kayah_Li: "A900-A92F",
                Khmer: "1780-17DD17E0-17E917F0-17F919E0-19FF",
                Lao: "0E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB90EBB-0EBD0EC0-0EC40EC60EC8-0ECD0ED0-0ED90EDC-0EDF",
                Latin: "0041-005A0061-007A00AA00BA00C0-00D600D8-00F600F8-02B802E0-02E41D00-1D251D2C-1D5C1D62-1D651D6B-1D771D79-1DBE1E00-1EFF2071207F2090-209C212A212B2132214E2160-21882C60-2C7FA722-A787A78B-A78EA790-A793A7A0-A7AAA7F8-A7FFFB00-FB06FF21-FF3AFF41-FF5A",
                Lepcha: "1C00-1C371C3B-1C491C4D-1C4F",
                Limbu: "1900-191C1920-192B1930-193B19401944-194F",
                Lisu: "A4D0-A4FF",
                Malayalam: "0D020D030D05-0D0C0D0E-0D100D12-0D3A0D3D-0D440D46-0D480D4A-0D4E0D570D60-0D630D66-0D750D79-0D7F",
                Mandaic: "0840-085B085E",
                Meetei_Mayek: "AAE0-AAF6ABC0-ABEDABF0-ABF9",
                Mongolian: "1800180118041806-180E1810-18191820-18771880-18AA",
                Myanmar: "1000-109FAA60-AA7B",
                New_Tai_Lue: "1980-19AB19B0-19C919D0-19DA19DE19DF",
                Nko: "07C0-07FA",
                Ogham: "1680-169C",
                Ol_Chiki: "1C50-1C7F",
                Oriya: "0B01-0B030B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3C-0B440B470B480B4B-0B4D0B560B570B5C0B5D0B5F-0B630B66-0B77",
                Phags_Pa: "A840-A877",
                Rejang: "A930-A953A95F",
                Runic: "16A0-16EA16EE-16F0",
                Samaritan: "0800-082D0830-083E",
                Saurashtra: "A880-A8C4A8CE-A8D9",
                Sinhala: "0D820D830D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60DCA0DCF-0DD40DD60DD8-0DDF0DF2-0DF4",
                Sundanese: "1B80-1BBF1CC0-1CC7",
                Syloti_Nagri: "A800-A82B",
                Syriac: "0700-070D070F-074A074D-074F",
                Tagalog: "1700-170C170E-1714",
                Tagbanwa: "1760-176C176E-177017721773",
                Tai_Le: "1950-196D1970-1974",
                Tai_Tham: "1A20-1A5E1A60-1A7C1A7F-1A891A90-1A991AA0-1AAD",
                Tai_Viet: "AA80-AAC2AADB-AADF",
                Tamil: "0B820B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BBE-0BC20BC6-0BC80BCA-0BCD0BD00BD70BE6-0BFA",
                Telugu: "0C01-0C030C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D-0C440C46-0C480C4A-0C4D0C550C560C580C590C60-0C630C66-0C6F0C78-0C7F",
                Thaana: "0780-07B1",
                Thai: "0E01-0E3A0E40-0E5B",
                Tibetan: "0F00-0F470F49-0F6C0F71-0F970F99-0FBC0FBE-0FCC0FCE-0FD40FD90FDA",
                Tifinagh: "2D30-2D672D6F2D702D7F",
                Vai: "A500-A62B",
                Yi: "A000-A48CA490-A4C6"
            })
    } (XRegExp),
    function(a) {
        "use strict";
        if (!a.addUnicodePackage) throw new ReferenceError("Unicode Base must be loaded before Unicode Blocks");
        a.install("extensibility"),
            a.addUnicodePackage({
                InBasic_Latin: "0000-007F",
                InLatin_1_Supplement: "0080-00FF",
                InLatin_Extended_A: "0100-017F",
                InLatin_Extended_B: "0180-024F",
                InIPA_Extensions: "0250-02AF",
                InSpacing_Modifier_Letters: "02B0-02FF",
                InCombining_Diacritical_Marks: "0300-036F",
                InGreek_and_Coptic: "0370-03FF",
                InCyrillic: "0400-04FF",
                InCyrillic_Supplement: "0500-052F",
                InArmenian: "0530-058F",
                InHebrew: "0590-05FF",
                InArabic: "0600-06FF",
                InSyriac: "0700-074F",
                InArabic_Supplement: "0750-077F",
                InThaana: "0780-07BF",
                InNKo: "07C0-07FF",
                InSamaritan: "0800-083F",
                InMandaic: "0840-085F",
                InArabic_Extended_A: "08A0-08FF",
                InDevanagari: "0900-097F",
                InBengali: "0980-09FF",
                InGurmukhi: "0A00-0A7F",
                InGujarati: "0A80-0AFF",
                InOriya: "0B00-0B7F",
                InTamil: "0B80-0BFF",
                InTelugu: "0C00-0C7F",
                InKannada: "0C80-0CFF",
                InMalayalam: "0D00-0D7F",
                InSinhala: "0D80-0DFF",
                InThai: "0E00-0E7F",
                InLao: "0E80-0EFF",
                InTibetan: "0F00-0FFF",
                InMyanmar: "1000-109F",
                InGeorgian: "10A0-10FF",
                InHangul_Jamo: "1100-11FF",
                InEthiopic: "1200-137F",
                InEthiopic_Supplement: "1380-139F",
                InCherokee: "13A0-13FF",
                InUnified_Canadian_Aboriginal_Syllabics: "1400-167F",
                InOgham: "1680-169F",
                InRunic: "16A0-16FF",
                InTagalog: "1700-171F",
                InHanunoo: "1720-173F",
                InBuhid: "1740-175F",
                InTagbanwa: "1760-177F",
                InKhmer: "1780-17FF",
                InMongolian: "1800-18AF",
                InUnified_Canadian_Aboriginal_Syllabics_Extended: "18B0-18FF",
                InLimbu: "1900-194F",
                InTai_Le: "1950-197F",
                InNew_Tai_Lue: "1980-19DF",
                InKhmer_Symbols: "19E0-19FF",
                InBuginese: "1A00-1A1F",
                InTai_Tham: "1A20-1AAF",
                InBalinese: "1B00-1B7F",
                InSundanese: "1B80-1BBF",
                InBatak: "1BC0-1BFF",
                InLepcha: "1C00-1C4F",
                InOl_Chiki: "1C50-1C7F",
                InSundanese_Supplement: "1CC0-1CCF",
                InVedic_Extensions: "1CD0-1CFF",
                InPhonetic_Extensions: "1D00-1D7F",
                InPhonetic_Extensions_Supplement: "1D80-1DBF",
                InCombining_Diacritical_Marks_Supplement: "1DC0-1DFF",
                InLatin_Extended_Additional: "1E00-1EFF",
                InGreek_Extended: "1F00-1FFF",
                InGeneral_Punctuation: "2000-206F",
                InSuperscripts_and_Subscripts: "2070-209F",
                InCurrency_Symbols: "20A0-20CF",
                InCombining_Diacritical_Marks_for_Symbols: "20D0-20FF",
                InLetterlike_Symbols: "2100-214F",
                InNumber_Forms: "2150-218F",
                InArrows: "2190-21FF",
                InMathematical_Operators: "2200-22FF",
                InMiscellaneous_Technical: "2300-23FF",
                InControl_Pictures: "2400-243F",
                InOptical_Character_Recognition: "2440-245F",
                InEnclosed_Alphanumerics: "2460-24FF",
                InBox_Drawing: "2500-257F",
                InBlock_Elements: "2580-259F",
                InGeometric_Shapes: "25A0-25FF",
                InMiscellaneous_Symbols: "2600-26FF",
                InDingbats: "2700-27BF",
                InMiscellaneous_Mathematical_Symbols_A: "27C0-27EF",
                InSupplemental_Arrows_A: "27F0-27FF",
                InBraille_Patterns: "2800-28FF",
                InSupplemental_Arrows_B: "2900-297F",
                InMiscellaneous_Mathematical_Symbols_B: "2980-29FF",
                InSupplemental_Mathematical_Operators: "2A00-2AFF",
                InMiscellaneous_Symbols_and_Arrows: "2B00-2BFF",
                InGlagolitic: "2C00-2C5F",
                InLatin_Extended_C: "2C60-2C7F",
                InCoptic: "2C80-2CFF",
                InGeorgian_Supplement: "2D00-2D2F",
                InTifinagh: "2D30-2D7F",
                InEthiopic_Extended: "2D80-2DDF",
                InCyrillic_Extended_A: "2DE0-2DFF",
                InSupplemental_Punctuation: "2E00-2E7F",
                InCJK_Radicals_Supplement: "2E80-2EFF",
                InKangxi_Radicals: "2F00-2FDF",
                InIdeographic_Description_Characters: "2FF0-2FFF",
                InCJK_Symbols_and_Punctuation: "3000-303F",
                InHiragana: "3040-309F",
                InKatakana: "30A0-30FF",
                InBopomofo: "3100-312F",
                InHangul_Compatibility_Jamo: "3130-318F",
                InKanbun: "3190-319F",
                InBopomofo_Extended: "31A0-31BF",
                InCJK_Strokes: "31C0-31EF",
                InKatakana_Phonetic_Extensions: "31F0-31FF",
                InEnclosed_CJK_Letters_and_Months: "3200-32FF",
                InCJK_Compatibility: "3300-33FF",
                InCJK_Unified_Ideographs_Extension_A: "3400-4DBF",
                InYijing_Hexagram_Symbols: "4DC0-4DFF",
                InCJK_Unified_Ideographs: "4E00-9FFF",
                InYi_Syllables: "A000-A48F",
                InYi_Radicals: "A490-A4CF",
                InLisu: "A4D0-A4FF",
                InVai: "A500-A63F",
                InCyrillic_Extended_B: "A640-A69F",
                InBamum: "A6A0-A6FF",
                InModifier_Tone_Letters: "A700-A71F",
                InLatin_Extended_D: "A720-A7FF",
                InSyloti_Nagri: "A800-A82F",
                InCommon_Indic_Number_Forms: "A830-A83F",
                InPhags_pa: "A840-A87F",
                InSaurashtra: "A880-A8DF",
                InDevanagari_Extended: "A8E0-A8FF",
                InKayah_Li: "A900-A92F",
                InRejang: "A930-A95F",
                InHangul_Jamo_Extended_A: "A960-A97F",
                InJavanese: "A980-A9DF",
                InCham: "AA00-AA5F",
                InMyanmar_Extended_A: "AA60-AA7F",
                InTai_Viet: "AA80-AADF",
                InMeetei_Mayek_Extensions: "AAE0-AAFF",
                InEthiopic_Extended_A: "AB00-AB2F",
                InMeetei_Mayek: "ABC0-ABFF",
                InHangul_Syllables: "AC00-D7AF",
                InHangul_Jamo_Extended_B: "D7B0-D7FF",
                InHigh_Surrogates: "D800-DB7F",
                InHigh_Private_Use_Surrogates: "DB80-DBFF",
                InLow_Surrogates: "DC00-DFFF",
                InPrivate_Use_Area: "E000-F8FF",
                InCJK_Compatibility_Ideographs: "F900-FAFF",
                InAlphabetic_Presentation_Forms: "FB00-FB4F",
                InArabic_Presentation_Forms_A: "FB50-FDFF",
                InVariation_Selectors: "FE00-FE0F",
                InVertical_Forms: "FE10-FE1F",
                InCombining_Half_Marks: "FE20-FE2F",
                InCJK_Compatibility_Forms: "FE30-FE4F",
                InSmall_Form_Variants: "FE50-FE6F",
                InArabic_Presentation_Forms_B: "FE70-FEFF",
                InHalfwidth_and_Fullwidth_Forms: "FF00-FFEF",
                InSpecials: "FFF0-FFFF"
            })
    } (XRegExp),
    function(a) {
        "use strict";
        if (!a.addUnicodePackage) throw new ReferenceError("Unicode Base must be loaded before Unicode Properties");
        a.install("extensibility"),
            a.addUnicodePackage({
                Alphabetic: "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE03450370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05270531-055605590561-058705B0-05BD05BF05C105C205C405C505C705D0-05EA05F0-05F20610-061A0620-06570659-065F066E-06D306D5-06DC06E1-06E806ED-06EF06FA-06FC06FF0710-073F074D-07B107CA-07EA07F407F507FA0800-0817081A-082C0840-085808A008A2-08AC08E4-08E908F0-08FE0900-093B093D-094C094E-09500955-09630971-09770979-097F0981-09830985-098C098F09900993-09A809AA-09B009B209B6-09B909BD-09C409C709C809CB09CC09CE09D709DC09DD09DF-09E309F009F10A01-0A030A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A3E-0A420A470A480A4B0A4C0A510A59-0A5C0A5E0A70-0A750A81-0A830A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD-0AC50AC7-0AC90ACB0ACC0AD00AE0-0AE30B01-0B030B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D-0B440B470B480B4B0B4C0B560B570B5C0B5D0B5F-0B630B710B820B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BBE-0BC20BC6-0BC80BCA-0BCC0BD00BD70C01-0C030C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D-0C440C46-0C480C4A-0C4C0C550C560C580C590C60-0C630C820C830C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD-0CC40CC6-0CC80CCA-0CCC0CD50CD60CDE0CE0-0CE30CF10CF20D020D030D05-0D0C0D0E-0D100D12-0D3A0D3D-0D440D46-0D480D4A-0D4C0D4E0D570D60-0D630D7A-0D7F0D820D830D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60DCF-0DD40DD60DD8-0DDF0DF20DF30E01-0E3A0E40-0E460E4D0E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB90EBB-0EBD0EC0-0EC40EC60ECD0EDC-0EDF0F000F40-0F470F49-0F6C0F71-0F810F88-0F970F99-0FBC1000-10361038103B-103F1050-10621065-1068106E-1086108E109C109D10A0-10C510C710CD10D0-10FA10FC-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A135F1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA16EE-16F01700-170C170E-17131720-17331740-17531760-176C176E-1770177217731780-17B317B6-17C817D717DC1820-18771880-18AA18B0-18F51900-191C1920-192B1930-19381950-196D1970-19741980-19AB19B0-19C91A00-1A1B1A20-1A5E1A61-1A741AA71B00-1B331B35-1B431B45-1B4B1B80-1BA91BAC-1BAF1BBA-1BE51BE7-1BF11C00-1C351C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF31CF51CF61D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209C21022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E2160-218824B6-24E92C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2CF22CF32D00-2D252D272D2D2D30-2D672D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2DE0-2DFF2E2F3005-30073021-30293031-30353038-303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31BA31F0-31FF3400-4DB54E00-9FCCA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A66EA674-A67BA67F-A697A69F-A6EFA717-A71FA722-A788A78B-A78EA790-A793A7A0-A7AAA7F8-A801A803-A805A807-A80AA80C-A827A840-A873A880-A8C3A8F2-A8F7A8FBA90A-A92AA930-A952A960-A97CA980-A9B2A9B4-A9BFA9CFAA00-AA36AA40-AA4DAA60-AA76AA7AAA80-AABEAAC0AAC2AADB-AADDAAE0-AAEFAAF2-AAF5AB01-AB06AB09-AB0EAB11-AB16AB20-AB26AB28-AB2EABC0-ABEAAC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1D-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
                Uppercase: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E05200522052405260531-055610A0-10C510C710CD1E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F21452160-216F218324B6-24CF2C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CED2CF2A640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA660A662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BA78DA790A792A7A0A7A2A7A4A7A6A7A8A7AAFF21-FF3A",
                Lowercase: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02B802C002C102E0-02E40345037103730377037A-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F05210523052505270561-05871D00-1DBF1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF72071207F2090-209C210A210E210F2113212F21342139213C213D2146-2149214E2170-217F218424D0-24E92C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7D2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2CF32D00-2D252D272D2DA641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA661A663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76F-A778A77AA77CA77FA781A783A785A787A78CA78EA791A793A7A1A7A3A7A5A7A7A7A9A7F8-A7FAFB00-FB06FB13-FB17FF41-FF5A",
                White_Space: "0009-000D0020008500A01680180E2000-200A20282029202F205F3000",
                Noncharacter_Code_Point: "FDD0-FDEFFFFEFFFF",
                Default_Ignorable_Code_Point: "00AD034F115F116017B417B5180B-180D200B-200F202A-202E2060-206F3164FE00-FE0FFEFFFFA0FFF0-FFF8",
                Any: "0000-FFFF",
                Ascii: "0000-007F",
                Assigned: "0000-0377037A-037E0384-038A038C038E-03A103A3-05270531-05560559-055F0561-05870589058A058F0591-05C705D0-05EA05F0-05F40600-06040606-061B061E-070D070F-074A074D-07B107C0-07FA0800-082D0830-083E0840-085B085E08A008A2-08AC08E4-08FE0900-09770979-097F0981-09830985-098C098F09900993-09A809AA-09B009B209B6-09B909BC-09C409C709C809CB-09CE09D709DC09DD09DF-09E309E6-09FB0A01-0A030A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A3C0A3E-0A420A470A480A4B-0A4D0A510A59-0A5C0A5E0A66-0A750A81-0A830A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABC-0AC50AC7-0AC90ACB-0ACD0AD00AE0-0AE30AE6-0AF10B01-0B030B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3C-0B440B470B480B4B-0B4D0B560B570B5C0B5D0B5F-0B630B66-0B770B820B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BBE-0BC20BC6-0BC80BCA-0BCD0BD00BD70BE6-0BFA0C01-0C030C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D-0C440C46-0C480C4A-0C4D0C550C560C580C590C60-0C630C66-0C6F0C78-0C7F0C820C830C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBC-0CC40CC6-0CC80CCA-0CCD0CD50CD60CDE0CE0-0CE30CE6-0CEF0CF10CF20D020D030D05-0D0C0D0E-0D100D12-0D3A0D3D-0D440D46-0D480D4A-0D4E0D570D60-0D630D66-0D750D79-0D7F0D820D830D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60DCA0DCF-0DD40DD60DD8-0DDF0DF2-0DF40E01-0E3A0E3F-0E5B0E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB90EBB-0EBD0EC0-0EC40EC60EC8-0ECD0ED0-0ED90EDC-0EDF0F00-0F470F49-0F6C0F71-0F970F99-0FBC0FBE-0FCC0FCE-0FDA1000-10C510C710CD10D0-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A135D-137C1380-139913A0-13F41400-169C16A0-16F01700-170C170E-17141720-17361740-17531760-176C176E-1770177217731780-17DD17E0-17E917F0-17F91800-180E1810-18191820-18771880-18AA18B0-18F51900-191C1920-192B1930-193B19401944-196D1970-19741980-19AB19B0-19C919D0-19DA19DE-1A1B1A1E-1A5E1A60-1A7C1A7F-1A891A90-1A991AA0-1AAD1B00-1B4B1B50-1B7C1B80-1BF31BFC-1C371C3B-1C491C4D-1C7F1CC0-1CC71CD0-1CF61D00-1DE61DFC-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FC41FC6-1FD31FD6-1FDB1FDD-1FEF1FF2-1FF41FF6-1FFE2000-2064206A-20712074-208E2090-209C20A0-20B920D0-20F02100-21892190-23F32400-24262440-244A2460-26FF2701-2B4C2B50-2B592C00-2C2E2C30-2C5E2C60-2CF32CF9-2D252D272D2D2D30-2D672D6F2D702D7F-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2DE0-2E3B2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB3000-303F3041-30963099-30FF3105-312D3131-318E3190-31BA31C0-31E331F0-321E3220-32FE3300-4DB54DC0-9FCCA000-A48CA490-A4C6A4D0-A62BA640-A697A69F-A6F7A700-A78EA790-A793A7A0-A7AAA7F8-A82BA830-A839A840-A877A880-A8C4A8CE-A8D9A8E0-A8FBA900-A953A95F-A97CA980-A9CDA9CF-A9D9A9DEA9DFAA00-AA36AA40-AA4DAA50-AA59AA5C-AA7BAA80-AAC2AADB-AAF6AB01-AB06AB09-AB0EAB11-AB16AB20-AB26AB28-AB2EABC0-ABEDABF0-ABF9AC00-D7A3D7B0-D7C6D7CB-D7FBD800-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1D-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBC1FBD3-FD3FFD50-FD8FFD92-FDC7FDF0-FDFDFE00-FE19FE20-FE26FE30-FE52FE54-FE66FE68-FE6BFE70-FE74FE76-FEFCFEFFFF01-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDCFFE0-FFE6FFE8-FFEEFFF9-FFFD"
            })
    } (XRegExp),
    function(a) {
        "use strict";
        function b(a, b, c, d) {
            return {
                value: a,
                name: b,
                start: c,
                end: d
            }
        }
        a.matchRecursive = function(c, d, e, f, g) {
            f = f || "",
                g = g || {};
            var h, i, j, k, l, m = f.indexOf("g") > -1,
                n = f.indexOf("y") > -1,
                o = f.replace(/y/g, ""),
                p = g.escapeChar,
                q = g.valueNames,
                r = [],
                s = 0,
                t = 0,
                u = 0,
                v = 0;
            if (d = a(d, o), e = a(e, o), p) {
                if (p.length > 1) throw new SyntaxError("can't use more than one escape character");
                p = a.escape(p),
                    l = new RegExp("(?:" + p + "[\\S\\s]|(?:(?!" + a.union([d, e]).source + ")[^" + p + "])+)+", f.replace(/[^im]+/g, ""))
            }
            for (;;) {
                if (p && (u += (a.exec(c, l, u, "sticky") || [""])[0].length), j = a.exec(c, d, u), k = a.exec(c, e, u), j && k && (j.index <= k.index ? k = null: j = null), j || k) t = (j || k).index,
                    u = t + (j || k)[0].length;
                else if (!s) break;
                if (n && !s && t > v) break;
                if (j) s || (h = t, i = u),
                    ++s;
                else {
                    if (!k || !s) throw new Error("string contains unbalanced delimiters");
                    if (!--s && (q ? (q[0] && h > v && r.push(b(q[0], c.slice(v, h), v, h)), q[1] && r.push(b(q[1], c.slice(h, i), h, i)), q[2] && r.push(b(q[2], c.slice(i, t), i, t)), q[3] && r.push(b(q[3], c.slice(t, u), t, u))) : r.push(c.slice(i, t)), v = u, !m)) break
                }
                t === u && ++u
            }
            return m && !n && q && q[0] && c.length > v && r.push(b(q[0], c.slice(v), v, c.length)),
                r
        }
    } (XRegExp),
    function(a) {
        "use strict";
        function b(a) {
            var b = /^(?:\(\?:\))?\^/,
                c = /\$(?:\(\?:\))?$/;
            return c.test(a.replace(/\\[\s\S]/g, "")) ? a.replace(b, "").replace(c, "") : a
        }
        function c(b) {
            return a.isRegExp(b) ? b.xregexp && !b.xregexp.isNative ? b: a(b.source) : a(b)
        }
        var d = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,
            e = a.union([/\({{([\w$]+)}}\)|{{([\w$]+)}}/, d], "g");
        a.build = function(f, g, h) {
            var i, j, k, l, m = /^\(\?([\w$]+)\)/.exec(f),
                n = {},
                o = 0,
                p = 0,
                q = [0];
            m && (h = h || "", m[1].replace(/./g,
                function(a) {
                    h += h.indexOf(a) > -1 ? "": a
                }));
            for (l in g) g.hasOwnProperty(l) && (k = c(g[l]), n[l] = {
                pattern: b(k.source),
                names: k.xregexp.captureNames || []
            });
            return f = c(f),
                j = f.xregexp.captureNames || [],
                f = f.source.replace(e,
                    function(a, b, c, e, f) {
                        var g, h, k = b || c;
                        if (k) {
                            if (!n.hasOwnProperty(k)) throw new ReferenceError("undefined property " + a);
                            return b ? (g = j[p], q[++p] = ++o, h = "(?<" + (g || k) + ">") : h = "(?:",
                                i = o,
                            h + n[k].pattern.replace(d,
                                function(a, b, c) {
                                    if (b) {
                                        if (g = n[k].names[o - i], ++o, g) return "(?<" + g + ">"
                                    } else if (c) return "\\" + ( + c + i);
                                    return a
                                }) + ")"
                        }
                        if (e) {
                            if (g = j[p], q[++p] = ++o, g) return "(?<" + g + ">"
                        } else if (f) return "\\" + q[ + f];
                        return a
                    }),
                a(f, h)
        }
    } (XRegExp),
    function(a) {
        "use strict";
        function b(a, b) {
            for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
        }
        b(a.prototype, {
            apply: function(a, b) {
                return this.test(b[0])
            },
            call: function(a, b) {
                return this.test(b)
            },
            forEach: function(b, c, d) {
                return a.forEach(b, this, c, d)
            },
            globalize: function() {
                return a.globalize(this)
            },
            xexec: function(b, c, d) {
                return a.exec(b, this, c, d)
            },
            xtest: function(b, c, d) {
                return a.test(b, this, c, d)
            }
        })
    } (XRegExp),
    com.zybuluo.mdeditor.toc = function() {
        function a(a, b, c) {
            this.tagName = a,
                this.anchor = b,
                this.text = c,
                this.children = []
        }
        function b(c, d) {
            function e() {
                void 0 !== g && (g.children.length > 0 && (g.children = b(g.children, d + 1)), i.push(g))
            }
            d = d || 1;
            var g, h = "H" + d,
                i = [];
            return _.each(c,
                function(b) {
                    b.tagName != h ? d !== f && (void 0 === g && (g = new a), g.children.push(b)) : (e(), g = b)
                }),
                e(),
                i
        }
        function c(a) {
            return a.toLowerCase().replace(/\s/g, "-").replace(h, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        }
        function d() {
            function d(a) {
                for (var b = a.id || c(a.textContent) || "title", d = b, f = 0; _.has(e, d);) d = b + "-" + ++f;
                return e[d] = !0,
                    a.id = d,
                    d
            }
            var e = {},
                f = [];
            return _.each(g.querySelectorAll("h1, h2, h3, h4, h5, h6"),
                function(b) {
                    f.push(new a(b.tagName, d(b), b.textContent))
                }),
                f = b(f),
            '<div class="toc">\n<ul>\n' + f.join("") + "</ul>\n</div>\n"
        }
        var e = "\\[(TOC|toc)\\]",
            f = 6;
        a.prototype.childrenToString = function() {
            if (0 === this.children.length) return "";
            var a = "<ul>\n";
            return _.each(this.children,
                function(b) {
                    a += b.toString()
                }),
                a += "</ul>\n"
        },
            a.prototype.toString = function() {
                var a = "<li>";
                return this.anchor && this.text && (a += '<a href="#' + this.anchor + '">' + this.text + "</a>"),
                    a += this.childrenToString() + "</li>\n"
            };
        var g, h = XRegExp("[^\\p{L}\\p{N}-]", "g");
        g = document.getElementById("wmd-preview");
        var i = new RegExp("^" + e + "$"),
            j = function() {
                var a = document.querySelectorAll(".table-of-contents, .toc"),
                    b = null;
                _.each(g.getElementsByTagName("p"),
                    function(a) {
                        i.test(a.innerHTML) && (null === b && (b = d()), a.innerHTML = b)
                    }),
                    null === b ? setTimeout(function() {
                            b = d(),
                                _.each(a,
                                    function(a) {
                                        a.innerHTML = b
                                    })
                        },
                        1e3) : _.each(a,
                        function(a) {
                            a.innerHTML = b
                        })
            };
        return {
            renderToc: j
        }
    } ();