/*! zybuluo */
function onUpdateReady() {
    com.zybuluo.common.popupConfirm.popup("新版本通知", '发现新版本， 在这里查看<a href="https://www.zybuluo.com/ghosert/note/102771" target="_blank"> <i class="icon-wrench"></i> 更新详细</a>，点击下方按钮进行更新操作。',
        function () {
            window.location.reload()
        },
        function () {
            window.location.reload()
        },
        function () {
            $("#notification-popup-window #notification-confirm").html("更新"),
                $("#notification-popup-window button.close").hide(),
                $("#notification-popup-window #notification-cancel").hide()
        },
        function () {
            window.location.reload()
        }
    )
}
!function (a, b) {
    function c(a) {
        var b = ob[a] = {};
        return $.each(a.split(bb),
            function (a, c) {
                b[c] = !0
            }), b
    }

    function d(a, c, d) {
        if (d === b && 1 === a.nodeType) {
            var e = "data-" + c.replace(qb, "-$1").toLowerCase();
            if (d = a.getAttribute(e), "string" == typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : pb.test(d) ? $.parseJSON(d) : d
                } catch (f) {
                }
                $.data(a, c, d)
            } else d = b
        }
        return d
    }

    function e(a) {
        var b;
        for (b in a)
            if (("data" !== b || !$.isEmptyObject(a[b])) && "toJSON" !== b)
                return !1;
        return !0
    }

    function f() {
        return !1
    }

    function g() {
        return !0
    }

    function h(a) {
        return !a || !a.parentNode || 11 === a.parentNode.nodeType
    }

    function i(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType
            );
        return a
    }

    function j(a, b, c) {
        if (b = b || 0, $.isFunction(b))
            return $.grep(a, function (a, d) {
                var e = !!b.call(a, d, a);
                return e === c
            });
        if (b.nodeType)return $.grep(a, function (a) {
            return a === b === c
        });
        if ("string" == typeof b) {
            var d = $.grep(a, function (a) {
                return 1 === a.nodeType
            });
            if (Kb.test(b))return $.filter(b, d, !c);
            b = $.filter(b, d)
        }
        return $.grep(a, function (a) {
                return $.inArray(a, b) >= 0 === c
            }
        )
    }

    function k(a) {
        var b = Nb.split("|"), c = a.createDocumentFragment();
        if (c.createElement
        )for (; b.length;)
            c.createElement(b.pop());
        return c
    }

    function l(a, b) {
        return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
    }

    function m(a, b) {
        if (1 === b.nodeType && $.hasData(a)
        ) {
            var c, d, e, f = $._data(a), g = $._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)for (d = 0, e = h[c].length; e > d; d++)$.event.add(b, c, h[c][d])
            }
            g.data && (g.data = $.extend({}, g.data))
        }
    }

    function n(a, b) {
        var c;
        1 === b.nodeType && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), $.support.html5Clone && a.innerHTML && !$.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Xb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.selected = a.defaultSelected : "input" === c || "textarea" === c ? b.defaultValue = a.defaultValue : "script" === c && b.text !== a.text && (b.text = a.text), b.removeAttribute($.expando))
    }

    function o(a) {
        return "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll("*") : []
    }

    function p(a) {
        Xb.test(a.type) && (a.defaultChecked = a.checked)
    }

    function q(a, b) {
        if (b in a)return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = rc.length; e--;)if (b = rc[e] + c, b in a)return b;
        return d
    }

    function r(a, b) {
        return a = b || a, "none" === $.css(a, "display") || !$.contains(a.ownerDocument, a)
    }

    function s(a, b) {
        for (var c, d, e = [], f = 0, g = a.length; g > f; f++)c = a[f], c.style && (e[f] = $._data(c, "olddisplay"), b ? (e[f] || "none" !== c.style.display || (c.style.display = ""), "" === c.style.display && r(c) && (e[f] = $._data(c, "olddisplay", w(c.nodeName)))) : (d = cc(c, "display"), e[f] || "none" === d || $._data(c, "olddisplay", d)));
        for (f = 0; g > f; f++)c = a[f], c.style && (b && "none" !== c.style.display && "" !== c.style.display || (c.style.display = b ? e[f] || "" : "none"));
        return a
    }

    function t(a, b, c) {
        var d = kc.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function u(a, b, c, d) {
        for (var e = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, f = 0; 4 > e; e += 2)"margin" === c && (f += $.css(a, c + qc[e], !0)), d ? ("content" === c && (f -= parseFloat(cc(a, "padding" + qc[e])) || 0), "margin" !== c && (f -= parseFloat(cc(a, "border" + qc[e] + "Width")) || 0)) : (f += parseFloat(cc(a, "padding" + qc[e])) || 0, "padding" !== c && (f += parseFloat(cc(a, "border" + qc[e] + "Width")) || 0));
        return f
    }

    function v(a, b, c) {
        var d = "width" === b ? a.offsetWidth : a.offsetHeight, e = !0, f = $.support.boxSizing && "border-box" === $.css(a, "boxSizing");
        if (0 >= d || null == d) {
            if (d = cc(a, b), (0 > d || null == d) && (d = a.style[b]), lc.test(d))return d;
            e = f && ($.support.boxSizingReliable || d === a.style[b]), d = parseFloat(d) || 0
        }
        return d + u(a, b, c || (f ? "border" : "content"), e) + "px"
    }

    function w(a) {
        if (nc[a])return nc[a];
        var b = $("<" + a + ">").appendTo(P.body), c = b.css("display");
        return b.remove(), ("none" === c || "" === c) && (dc = P.body.appendChild(dc || $.extend(P.createElement("iframe"), {
            frameBorder: 0,
            width: 0,
            height: 0
        })), ec && dc.createElement || (ec = (dc.contentWindow || dc.contentDocument).document, ec.write("<!doctype html><html><body>"), ec.close()), b = ec.body.appendChild(ec.createElement(a)), c = cc(b, "display"), P.body.removeChild(dc)), nc[a] = c, c
    }

    function x(a, b, c, d) {
        var e;
        if ($.isArray(b))$.each(b, function (b, e) {
            c || uc.test(a) ? d(a, e) : x(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        }); else if (c || "object" !== $.type(b))d(a, b); else for (e in b)x(a + "[" + e + "]", b[e], c, d)
    }

    function y(a) {
        return function (b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e, f, g = b.toLowerCase().split(bb), h = 0, i = g.length;
            if ($.isFunction(c))for (; i > h; h++)d = g[h], f = /^\+/.test(d), f && (d = d.substr(1) || "*"), e = a[d] = a[d] || [], e[f ? "unshift" : "push"](c)
        }
    }

    function z(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        for (var h, i = a[f], j = 0, k = i ? i.length : 0, l = a === Kc; k > j && (l || !h); j++)h = i[j](c, d, e), "string" == typeof h && (!l || g[h] ? h = b : (c.dataTypes.unshift(h), h = z(a, c, d, e, h, g)));
        return !l && h || g["*"] || (h = z(a, c, d, e, "*", g)), h
    }

    function A(a, c) {
        var d, e, f = $.ajaxSettings.flatOptions || {};
        for (d in c)c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
        e && $.extend(!0, a, e)
    }

    function B(a, c, d) {
        var e, f, g, h, i = a.contents, j = a.dataTypes, k = a.responseFields;
        for (f in k)f in d && (c[k[f]] = d[f]);
        for (; "*" === j[0];)j.shift(), e === b && (e = a.mimeType || c.getResponseHeader("content-type"));
        if (e)for (f in i)if (i[f] && i[f].test(e)) {
            j.unshift(f);
            break
        }
        if (j[0]in d)g = j[0]; else {
            for (f in d) {
                if (!j[0] || a.converters[f + " " + j[0]]) {
                    g = f;
                    break
                }
                h || (h = f)
            }
            g = g || h
        }
        return g ? (g !== j[0] && j.unshift(g), d[g]) : void 0
    }

    function C(a, b) {
        var c, d, e, f, g = a.dataTypes.slice(), h = g[0], i = {}, j = 0;
        if (a.dataFilter && (b = a.dataFilter(b, a.dataType)), g[1])for (c in a.converters)i[c.toLowerCase()] = a.converters[c];
        for (; e = g[++j];)if ("*" !== e) {
            if ("*" !== h && h !== e) {
                if (c = i[h + " " + e] || i["* " + e], !c)for (d in i)if (f = d.split(" "), f[1] === e && (c = i[h + " " + f[0]] || i["* " + f[0]])) {
                    c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0], g.splice(j--, 0, e));
                    break
                }
                if (c !== !0)if (c && a["throws"])b = c(b); else try {
                    b = c(b)
                } catch (k) {
                    return {state: "parsererror", error: c ? k : "No conversion from " + h + " to " + e}
                }
            }
            h = e
        }
        return {state: "success", data: b}
    }

    function D() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function E() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    function F() {
        return setTimeout(function () {
            Vc = b
        }, 0), Vc = $.now()
    }

    function G(a, b) {
        $.each(b, function (b, c) {
            for (var d = (_c[b] || []).concat(_c["*"]), e = 0, f = d.length; f > e; e++)if (d[e].call(a, b, c))return
        })
    }

    function H(a, b, c) {
        var d, e = 0, f = $c.length, g = $.Deferred().always(function () {
            delete h.elem
        }), h = function () {
            for (var b = Vc || F(), c = Math.max(0, i.startTime + i.duration - b), d = c / i.duration || 0, e = 1 - d, f = 0, h = i.tweens.length; h > f; f++)i.tweens[f].run(e);
            return g.notifyWith(a, [i, e, c]), 1 > e && h ? c : (g.resolveWith(a, [i]), !1)
        }, i = g.promise({
            elem: a,
            props: $.extend({}, b),
            opts: $.extend(!0, {specialEasing: {}}, c),
            originalProperties: b,
            originalOptions: c,
            startTime: Vc || F(),
            duration: c.duration,
            tweens: [],
            createTween: function (b, c) {
                var d = $.Tween(a, i.opts, b, c, i.opts.specialEasing[b] || i.opts.easing);
                return i.tweens.push(d), d
            },
            stop: function (b) {
                for (var c = 0, d = b ? i.tweens.length : 0; d > c; c++)i.tweens[c].run(1);
                return b ? g.resolveWith(a, [i, b]) : g.rejectWith(a, [i, b]), this
            }
        }), j = i.props;
        for (I(j, i.opts.specialEasing); f > e; e++)if (d = $c[e].call(i, a, j, i.opts))return d;
        return G(i, j), $.isFunction(i.opts.start) && i.opts.start.call(a, i), $.fx.timer($.extend(h, {
            anim: i,
            queue: i.opts.queue,
            elem: a
        })), i.progress(i.opts.progress).done(i.opts.done, i.opts.complete).fail(i.opts.fail).always(i.opts.always)
    }

    function I(a, b) {
        var c, d, e, f, g;
        for (c in a)if (d = $.camelCase(c), e = b[d], f = a[c], $.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = $.cssHooks[d], g && "expand"in g) {
            f = g.expand(f), delete a[d];
            for (c in f)c in a || (a[c] = f[c], b[c] = e)
        } else b[d] = e
    }

    function J(a, b, c) {
        var d, e, f, g, h, i, j, k, l, m = this, n = a.style, o = {}, p = [], q = a.nodeType && r(a);
        c.queue || (k = $._queueHooks(a, "fx"), null == k.unqueued && (k.unqueued = 0, l = k.empty.fire, k.empty.fire = function () {
            k.unqueued || l()
        }), k.unqueued++, m.always(function () {
            m.always(function () {
                k.unqueued--, $.queue(a, "fx").length || k.empty.fire()
            })
        })), 1 === a.nodeType && ("height"in b || "width"in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], "inline" === $.css(a, "display") && "none" === $.css(a, "float") && ($.support.inlineBlockNeedsLayout && "inline" !== w(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")), c.overflow && (n.overflow = "hidden", $.support.shrinkWrapBlocks || m.done(function () {
            n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
        }));
        for (d in b)if (f = b[d], Xc.exec(f)) {
            if (delete b[d], i = i || "toggle" === f, f === (q ? "hide" : "show"))continue;
            p.push(d)
        }
        if (g = p.length) {
            h = $._data(a, "fxshow") || $._data(a, "fxshow", {}), "hidden"in h && (q = h.hidden), i && (h.hidden = !q), q ? $(a).show() : m.done(function () {
                $(a).hide()
            }), m.done(function () {
                var b;
                $.removeData(a, "fxshow", !0);
                for (b in o)$.style(a, b, o[b])
            });
            for (d = 0; g > d; d++)e = p[d], j = m.createTween(e, q ? h[e] : 0), o[e] = h[e] || $.style(a, e), e in h || (h[e] = j.start, q && (j.end = j.start, j.start = "width" === e || "height" === e ? 1 : 0))
        }
    }

    function K(a, b, c, d, e) {
        return new K.prototype.init(a, b, c, d, e)
    }

    function L(a, b) {
        var c, d = {height: a}, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b)c = qc[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d
    }

    function M(a) {
        return $.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }

    var N, O, P = a.document, Q = a.location, R = a.navigator, S = a.jQuery, T = a.$, U = Array.prototype.push, V = Array.prototype.slice, W = Array.prototype.indexOf, X = Object.prototype.toString, Y = Object.prototype.hasOwnProperty, Z = String.prototype.trim, $ = function (a, b) {
        return new $.fn.init(a, b, N)
    }, _ = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, ab = /\S/, bb = /\s+/, cb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, db = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, eb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, fb = /^[\],:{}\s]*$/, gb = /(?:^|:|,)(?:\s*\[)+/g, hb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, ib = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, jb = /^-ms-/, kb = /-([\da-z])/gi, lb = function (a, b) {
        return (b + "").toUpperCase()
    }, mb = function () {
        P.addEventListener ? (P.removeEventListener("DOMContentLoaded", mb, !1), $.ready()) : "complete" === P.readyState && (P.detachEvent("onreadystatechange", mb), $.ready())
    }, nb = {};
    $.fn = $.prototype = {
        constructor: $, init: function (a, c, d) {
            var e, f, g;
            if (!a)return this;
            if (a.nodeType)return this.context = this[0] = a, this.length = 1, this;
            if ("string" == typeof a) {
                if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : db.exec(a), !e || !e[1] && c)return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
                if (e[1])return c = c instanceof $ ? c[0] : c, g = c && c.nodeType ? c.ownerDocument || c : P, a = $.parseHTML(e[1], g, !0), eb.test(e[1]) && $.isPlainObject(c) && this.attr.call(a, c, !0), $.merge(this, a);
                if (f = P.getElementById(e[2]), f && f.parentNode) {
                    if (f.id !== e[2])return d.find(a);
                    this.length = 1, this[0] = f
                }
                return this.context = P, this.selector = a, this
            }
            return $.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), $.makeArray(a, this))
        }, selector: "", jquery: "1.8.3", length: 0, size: function () {
            return this.length
        }, toArray: function () {
            return V.call(this)
        }, get: function (a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        }, pushStack: function (a, b, c) {
            var d = $.merge(this.constructor(), a);
            return d.prevObject = this, d.context = this.context, "find" === b ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d
        }, each: function (a, b) {
            return $.each(this, a, b)
        }, ready: function (a) {
            return $.ready.promise().done(a), this
        }, eq: function (a) {
            return a = +a, -1 === a ? this.slice(a) : this.slice(a, a + 1)
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, slice: function () {
            return this.pushStack(V.apply(this, arguments), "slice", V.call(arguments).join(","))
        }, map: function (a) {
            return this.pushStack($.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: U, sort: [].sort, splice: [].splice
    }, $.fn.init.prototype = $.fn, $.extend = $.fn.extend = function () {
        var a, c, d, e, f, g, h = arguments[0] || {}, i = 1, j = arguments.length, k = !1;
        for ("boolean" == typeof h && (k = h, h = arguments[1] || {}, i = 2), "object" == typeof h || $.isFunction(h) || (h = {}), j === i && (h = this, --i); j > i; i++)if (null != (a = arguments[i]))for (c in a)d = h[c], e = a[c], h !== e && (k && e && ($.isPlainObject(e) || (f = $.isArray(e))) ? (f ? (f = !1, g = d && $.isArray(d) ? d : []) : g = d && $.isPlainObject(d) ? d : {}, h[c] = $.extend(k, g, e)) : e !== b && (h[c] = e));
        return h
    }, $.extend({
        noConflict: function (b) {
            return a.$ === $ && (a.$ = T), b && a.jQuery === $ && (a.jQuery = S), $
        }, isReady: !1, readyWait: 1, holdReady: function (a) {
            a ? $.readyWait++ : $.ready(!0)
        }, ready: function (a) {
            if (a === !0 ? !--$.readyWait : !$.isReady) {
                if (!P.body)return setTimeout($.ready, 1);
                $.isReady = !0, a !== !0 && --$.readyWait > 0 || (O.resolveWith(P, [$]), $.fn.trigger && $(P).trigger("ready").off("ready"))
            }
        }, isFunction: function (a) {
            return "function" === $.type(a)
        }, isArray: Array.isArray || function (a) {
            return "array" === $.type(a)
        }, isWindow: function (a) {
            return null != a && a == a.window
        }, isNumeric: function (a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        }, type: function (a) {
            return null == a ? String(a) : nb[X.call(a)] || "object"
        }, isPlainObject: function (a) {
            if (!a || "object" !== $.type(a) || a.nodeType || $.isWindow(a))return !1;
            try {
                if (a.constructor && !Y.call(a, "constructor") && !Y.call(a.constructor.prototype, "isPrototypeOf"))return !1
            } catch (c) {
                return !1
            }
            var d;
            for (d in a);
            return d === b || Y.call(a, d)
        }, isEmptyObject: function (a) {
            var b;
            for (b in a)return !1;
            return !0
        }, error: function (a) {
            throw new Error(a)
        }, parseHTML: function (a, b, c) {
            var d;
            return a && "string" == typeof a ? ("boolean" == typeof b && (c = b, b = 0), b = b || P, (d = eb.exec(a)) ? [b.createElement(d[1])] : (d = $.buildFragment([a], b, c ? null : []), $.merge([], (d.cacheable ? $.clone(d.fragment) : d.fragment).childNodes))) : null
        }, parseJSON: function (b) {
            return b && "string" == typeof b ? (b = $.trim(b), a.JSON && a.JSON.parse ? a.JSON.parse(b) : fb.test(b.replace(hb, "@").replace(ib, "]").replace(gb, "")) ? new Function("return " + b)() : void $.error("Invalid JSON: " + b)) : null
        }, parseXML: function (c) {
            var d, e;
            if (!c || "string" != typeof c)return null;
            try {
                a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
            } catch (f) {
                d = b
            }
            return d && d.documentElement && !d.getElementsByTagName("parsererror").length || $.error("Invalid XML: " + c), d
        }, noop: function () {
        }, globalEval: function (b) {
            b && ab.test(b) && (a.execScript || function (b) {
                a.eval.call(a, b)
            })(b)
        }, camelCase: function (a) {
            return a.replace(jb, "ms-").replace(kb, lb)
        }, nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        }, each: function (a, c, d) {
            var e, f = 0, g = a.length, h = g === b || $.isFunction(a);
            if (d)if (h) {
                for (e in a)if (c.apply(a[e], d) === !1)break
            } else for (; g > f && c.apply(a[f++], d) !== !1;); else if (h) {
                for (e in a)if (c.call(a[e], e, a[e]) === !1)break
            } else for (; g > f && c.call(a[f], f, a[f++]) !== !1;);
            return a
        }, trim: Z && !Z.call("﻿ ") ? function (a) {
            return null == a ? "" : Z.call(a)
        } : function (a) {
            return null == a ? "" : (a + "").replace(cb, "")
        }, makeArray: function (a, b) {
            var c, d = b || [];
            return null != a && (c = $.type(a), null == a.length || "string" === c || "function" === c || "regexp" === c || $.isWindow(a) ? U.call(d, a) : $.merge(d, a)), d
        }, inArray: function (a, b, c) {
            var d;
            if (b) {
                if (W)return W.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)if (c in b && b[c] === a)return c
            }
            return -1
        }, merge: function (a, c) {
            var d = c.length, e = a.length, f = 0;
            if ("number" == typeof d)for (; d > f; f++)a[e++] = c[f]; else for (; c[f] !== b;)a[e++] = c[f++];
            return a.length = e, a
        }, grep: function (a, b, c) {
            var d, e = [], f = 0, g = a.length;
            for (c = !!c; g > f; f++)d = !!b(a[f], f), c !== d && e.push(a[f]);
            return e
        }, map: function (a, c, d) {
            var e, f, g = [], h = 0, i = a.length, j = a instanceof $ || i !== b && "number" == typeof i && (i > 0 && a[0] && a[i - 1] || 0 === i || $.isArray(a));
            if (j)for (; i > h; h++)e = c(a[h], h, d), null != e && (g[g.length] = e); else for (f in a)e = c(a[f], f, d), null != e && (g[g.length] = e);
            return g.concat.apply([], g)
        }, guid: 1, proxy: function (a, c) {
            var d, e, f;
            return "string" == typeof c && (d = a[c], c = a, a = d), $.isFunction(a) ? (e = V.call(arguments, 2), f = function () {
                return a.apply(c, e.concat(V.call(arguments)))
            }, f.guid = a.guid = a.guid || $.guid++, f) : b
        }, access: function (a, c, d, e, f, g, h) {
            var i, j = null == d, k = 0, l = a.length;
            if (d && "object" == typeof d) {
                for (k in d)$.access(a, c, k, d[k], 1, g, e);
                f = 1
            } else if (e !== b) {
                if (i = h === b && $.isFunction(e), j && (i ? (i = c, c = function (a, b, c) {
                        return i.call($(a), c)
                    }) : (c.call(a, e), c = null)), c)for (; l > k; k++)c(a[k], d, i ? e.call(a[k], k, c(a[k], d)) : e, h);
                f = 1
            }
            return f ? a : j ? c.call(a) : l ? c(a[0], d) : g
        }, now: function () {
            return (new Date).getTime()
        }
    }), $.ready.promise = function (b) {
        if (!O)if (O = $.Deferred(), "complete" === P.readyState)setTimeout($.ready, 1); else if (P.addEventListener)P.addEventListener("DOMContentLoaded", mb, !1), a.addEventListener("load", $.ready, !1); else {
            P.attachEvent("onreadystatechange", mb), a.attachEvent("onload", $.ready);
            var c = !1;
            try {
                c = null == a.frameElement && P.documentElement
            } catch (d) {
            }
            c && c.doScroll && !function e() {
                if (!$.isReady) {
                    try {
                        c.doScroll("left")
                    } catch (a) {
                        return setTimeout(e, 50)
                    }
                    $.ready()
                }
            }()
        }
        return O.promise(b)
    }, $.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
        nb["[object " + b + "]"] = b.toLowerCase()
    }), N = $(P);
    var ob = {};
    $.Callbacks = function (a) {
        a = "string" == typeof a ? ob[a] || c(a) : $.extend({}, a);
        var d, e, f, g, h, i, j = [], k = !a.once && [], l = function (b) {
            for (d = a.memory && b, e = !0, i = g || 0, g = 0, h = j.length, f = !0; j && h > i; i++)if (j[i].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                d = !1;
                break
            }
            f = !1, j && (k ? k.length && l(k.shift()) : d ? j = [] : m.disable())
        }, m = {
            add: function () {
                if (j) {
                    var b = j.length;
                    !function c(b) {
                        $.each(b, function (b, d) {
                            var e = $.type(d);
                            "function" === e ? a.unique && m.has(d) || j.push(d) : d && d.length && "string" !== e && c(d)
                        })
                    }(arguments), f ? h = j.length : d && (g = b, l(d))
                }
                return this
            }, remove: function () {
                return j && $.each(arguments, function (a, b) {
                    for (var c; (c = $.inArray(b, j, c)) > -1;)j.splice(c, 1), f && (h >= c && h--, i >= c && i--)
                }), this
            }, has: function (a) {
                return $.inArray(a, j) > -1
            }, empty: function () {
                return j = [], this
            }, disable: function () {
                return j = k = d = b, this
            }, disabled: function () {
                return !j
            }, lock: function () {
                return k = b, d || m.disable(), this
            }, locked: function () {
                return !k
            }, fireWith: function (a, b) {
                return b = b || [], b = [a, b.slice ? b.slice() : b], !j || e && !k || (f ? k.push(b) : l(b)), this
            }, fire: function () {
                return m.fireWith(this, arguments), this
            }, fired: function () {
                return !!e
            }
        };
        return m
    }, $.extend({
        Deferred: function (a) {
            var b = [["resolve", "done", $.Callbacks("once memory"), "resolved"], ["reject", "fail", $.Callbacks("once memory"), "rejected"], ["notify", "progress", $.Callbacks("memory")]], c = "pending", d = {
                state: function () {
                    return c
                }, always: function () {
                    return e.done(arguments).fail(arguments), this
                }, then: function () {
                    var a = arguments;
                    return $.Deferred(function (c) {
                        $.each(b, function (b, d) {
                            var f = d[0], g = a[b];
                            e[d[1]]($.isFunction(g) ? function () {
                                var a = g.apply(this, arguments);
                                a && $.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + "With"](this === e ? c : this, [a])
                            } : c[f])
                        }), a = null
                    }).promise()
                }, promise: function (a) {
                    return null != a ? $.extend(a, d) : d
                }
            }, e = {};
            return d.pipe = d.then, $.each(b, function (a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function () {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = g.fire, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        }, when: function (a) {
            var b, c, d, e = 0, f = V.call(arguments), g = f.length, h = 1 !== g || a && $.isFunction(a.promise) ? g : 0, i = 1 === h ? a : $.Deferred(), j = function (a, c, d) {
                return function (e) {
                    c[a] = this, d[a] = arguments.length > 1 ? V.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                }
            };
            if (g > 1)for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++)f[e] && $.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise()
        }
    }), $.support = function () {
        var b, c, d, e, f, g, h, i, j, k, l, m = P.createElement("div");
        if (m.setAttribute("className", "t"), m.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = m.getElementsByTagName("*"), d = m.getElementsByTagName("a")[0], !c || !d || !c.length)return {};
        e = P.createElement("select"), f = e.appendChild(P.createElement("option")), g = m.getElementsByTagName("input")[0], d.style.cssText = "top:1px;float:left;opacity:.5", b = {
            leadingWhitespace: 3 === m.firstChild.nodeType,
            tbody: !m.getElementsByTagName("tbody").length,
            htmlSerialize: !!m.getElementsByTagName("link").length,
            style: /top/.test(d.getAttribute("style")),
            hrefNormalized: "/a" === d.getAttribute("href"),
            opacity: /^0.5/.test(d.style.opacity),
            cssFloat: !!d.style.cssFloat,
            checkOn: "on" === g.value,
            optSelected: f.selected,
            getSetAttribute: "t" !== m.className,
            enctype: !!P.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== P.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === P.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, g.checked = !0, b.noCloneChecked = g.cloneNode(!0).checked, e.disabled = !0, b.optDisabled = !f.disabled;
        try {
            delete m.test
        } catch (n) {
            b.deleteExpando = !1
        }
        if (!m.addEventListener && m.attachEvent && m.fireEvent && (m.attachEvent("onclick", l = function () {
                b.noCloneEvent = !1
            }), m.cloneNode(!0).fireEvent("onclick"), m.detachEvent("onclick", l)), g = P.createElement("input"), g.value = "t", g.setAttribute("type", "radio"), b.radioValue = "t" === g.value, g.setAttribute("checked", "checked"), g.setAttribute("name", "t"), m.appendChild(g), h = P.createDocumentFragment(), h.appendChild(m.lastChild), b.checkClone = h.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = g.checked, h.removeChild(g), h.appendChild(m), m.attachEvent)for (j in{
            submit: !0,
            change: !0,
            focusin: !0
        })i = "on" + j, k = i in m, k || (m.setAttribute(i, "return;"), k = "function" == typeof m[i]), b[j + "Bubbles"] = k;
        return $(function () {
            var c, d, e, f, g = "padding:0;margin:0;border:0;display:block;overflow:hidden;", h = P.getElementsByTagName("body")[0];
            h && (c = P.createElement("div"), c.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", h.insertBefore(c, h.firstChild), d = P.createElement("div"), c.appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = d.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", k = 0 === e[0].offsetHeight, e[0].style.display = "", e[1].style.display = "none", b.reliableHiddenOffsets = k && 0 === e[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = 4 === d.offsetWidth, b.doesNotIncludeMarginInBodyOffset = 1 !== h.offsetTop, a.getComputedStyle && (b.pixelPosition = "1%" !== (a.getComputedStyle(d, null) || {}).top, b.boxSizingReliable = "4px" === (a.getComputedStyle(d, null) || {width: "4px"}).width, f = P.createElement("div"), f.style.cssText = d.style.cssText = g, f.style.marginRight = f.style.width = "0", d.style.width = "1px", d.appendChild(f), b.reliableMarginRight = !parseFloat((a.getComputedStyle(f, null) || {}).marginRight)), "undefined" != typeof d.style.zoom && (d.innerHTML = "", d.style.cssText = g + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.style.overflow = "visible", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", b.shrinkWrapBlocks = 3 !== d.offsetWidth, c.style.zoom = 1), h.removeChild(c), c = d = e = f = null)
        }), h.removeChild(m), c = d = e = f = g = h = m = null, b
    }();
    var pb = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, qb = /([A-Z])/g;
    $.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + ($.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0},
        hasData: function (a) {
            return a = a.nodeType ? $.cache[a[$.expando]] : a[$.expando], !!a && !e(a)
        },
        data: function (a, c, d, e) {
            if ($.acceptData(a)) {
                var f, g, h = $.expando, i = "string" == typeof c, j = a.nodeType, k = j ? $.cache : a, l = j ? a[h] : a[h] && h;
                if (l && k[l] && (e || k[l].data) || !i || d !== b)return l || (j ? a[h] = l = $.deletedIds.pop() || $.guid++ : l = h), k[l] || (k[l] = {}, j || (k[l].toJSON = $.noop)), ("object" == typeof c || "function" == typeof c) && (e ? k[l] = $.extend(k[l], c) : k[l].data = $.extend(k[l].data, c)), f = k[l], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[$.camelCase(c)] = d), i ? (g = f[c], null == g && (g = f[$.camelCase(c)])) : g = f, g
            }
        },
        removeData: function (a, b, c) {
            if ($.acceptData(a)) {
                var d, f, g, h = a.nodeType, i = h ? $.cache : a, j = h ? a[$.expando] : $.expando;
                if (i[j]) {
                    if (b && (d = c ? i[j] : i[j].data)) {
                        $.isArray(b) || (b in d ? b = [b] : (b = $.camelCase(b), b = b in d ? [b] : b.split(" ")));
                        for (f = 0, g = b.length; g > f; f++)delete d[b[f]];
                        if (!(c ? e : $.isEmptyObject)(d))return
                    }
                    (c || (delete i[j].data, e(i[j]))) && (h ? $.cleanData([a], !0) : $.support.deleteExpando || i != i.window ? delete i[j] : i[j] = null)
                }
            }
        },
        _data: function (a, b, c) {
            return $.data(a, b, c, !0)
        },
        acceptData: function (a) {
            var b = a.nodeName && $.noData[a.nodeName.toLowerCase()];
            return !b || b !== !0 && a.getAttribute("classid") === b
        }
    }), $.fn.extend({
        data: function (a, c) {
            var e, f, g, h, i, j = this[0], k = 0, l = null;
            if (a === b) {
                if (this.length && (l = $.data(j), 1 === j.nodeType && !$._data(j, "parsedAttrs"))) {
                    for (g = j.attributes, i = g.length; i > k; k++)h = g[k].name, h.indexOf("data-") || (h = $.camelCase(h.substring(5)), d(j, h, l[h]));
                    $._data(j, "parsedAttrs", !0)
                }
                return l
            }
            return "object" == typeof a ? this.each(function () {
                $.data(this, a)
            }) : (e = a.split(".", 2), e[1] = e[1] ? "." + e[1] : "", f = e[1] + "!", $.access(this, function (c) {
                return c === b ? (l = this.triggerHandler("getData" + f, [e[0]]), l === b && j && (l = $.data(j, a), l = d(j, a, l)), l === b && e[1] ? this.data(e[0]) : l) : (e[1] = c, void this.each(function () {
                    var b = $(this);
                    b.triggerHandler("setData" + f, e), $.data(this, a, c), b.triggerHandler("changeData" + f, e)
                }))
            }, null, c, arguments.length > 1, null, !1))
        }, removeData: function (a) {
            return this.each(function () {
                $.removeData(this, a)
            })
        }
    }), $.extend({
        queue: function (a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = $._data(a, b), c && (!d || $.isArray(c) ? d = $._data(a, b, $.makeArray(c)) : d.push(c)), d || []) : void 0
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = $.queue(a, b), d = c.length, e = c.shift(), f = $._queueHooks(a, b), g = function () {
                $.dequeue(a, b)
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        }, _queueHooks: function (a, b) {
            var c = b + "queueHooks";
            return $._data(a, c) || $._data(a, c, {
                empty: $.Callbacks("once memory").add(function () {
                    $.removeData(a, b + "queue", !0), $.removeData(a, c, !0)
                })
            })
        }
    }), $.fn.extend({
        queue: function (a, c) {
            var d = 2;
            return "string" != typeof a && (c = a, a = "fx", d--), arguments.length < d ? $.queue(this[0], a) : c === b ? this : this.each(function () {
                var b = $.queue(this, a, c);
                $._queueHooks(this, a), "fx" === a && "inprogress" !== b[0] && $.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                $.dequeue(this, a)
            })
        }, delay: function (a, b) {
            return a = $.fx ? $.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, c) {
            var d, e = 1, f = $.Deferred(), g = this, h = this.length, i = function () {
                --e || f.resolveWith(g, [g])
            };
            for ("string" != typeof a && (c = a, a = b), a = a || "fx"; h--;)d = $._data(g[h], a + "queueHooks"), d && d.empty && (e++, d.empty.add(i));
            return i(), f.promise(c)
        }
    });
    var rb, sb, tb, ub = /[\t\r\n]/g, vb = /\r/g, wb = /^(?:button|input)$/i, xb = /^(?:button|input|object|select|textarea)$/i, yb = /^a(?:rea|)$/i, zb = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Ab = $.support.getSetAttribute;
    $.fn.extend({
        attr: function (a, b) {
            return $.access(this, $.attr, a, b, arguments.length > 1)
        }, removeAttr: function (a) {
            return this.each(function () {
                $.removeAttr(this, a)
            })
        }, prop: function (a, b) {
            return $.access(this, $.prop, a, b, arguments.length > 1)
        }, removeProp: function (a) {
            return a = $.propFix[a] || a, this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {
                }
            })
        }, addClass: function (a) {
            var b, c, d, e, f, g, h;
            if ($.isFunction(a))return this.each(function (b) {
                $(this).addClass(a.call(this, b, this.className))
            });
            if (a && "string" == typeof a)for (b = a.split(bb), c = 0, d = this.length; d > c; c++)if (e = this[c], 1 === e.nodeType)if (e.className || 1 !== b.length) {
                for (f = " " + e.className + " ", g = 0, h = b.length; h > g; g++)f.indexOf(" " + b[g] + " ") < 0 && (f += b[g] + " ");
                e.className = $.trim(f)
            } else e.className = a;
            return this
        }, removeClass: function (a) {
            var c, d, e, f, g, h, i;
            if ($.isFunction(a))return this.each(function (b) {
                $(this).removeClass(a.call(this, b, this.className))
            });
            if (a && "string" == typeof a || a === b)for (c = (a || "").split(bb), h = 0, i = this.length; i > h; h++)if (e = this[h], 1 === e.nodeType && e.className) {
                for (d = (" " + e.className + " ").replace(ub, " "), f = 0, g = c.length; g > f; f++)for (; d.indexOf(" " + c[f] + " ") >= 0;)d = d.replace(" " + c[f] + " ", " ");
                e.className = a ? $.trim(d) : ""
            }
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a, d = "boolean" == typeof b;
            return this.each($.isFunction(a) ? function (c) {
                $(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function () {
                if ("string" === c)for (var e, f = 0, g = $(this), h = b, i = a.split(bb); e = i[f++];)h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e); else("undefined" === c || "boolean" === c) && (this.className && $._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : $._data(this, "__className__") || "")
            })
        }, hasClass: function (a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ub, " ").indexOf(b) >= 0)return !0;
            return !1
        }, val: function (a) {
            var c, d, e, f = this[0];
            {
                if (arguments.length)return e = $.isFunction(a), this.each(function (d) {
                    var f, g = $(this);
                    1 === this.nodeType && (f = e ? a.call(this, d, g.val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : $.isArray(f) && (f = $.map(f, function (a) {
                        return null == a ? "" : a + ""
                    })), c = $.valHooks[this.type] || $.valHooks[this.nodeName.toLowerCase()], c && "set"in c && c.set(this, f, "value") !== b || (this.value = f))
                });
                if (f)return c = $.valHooks[f.type] || $.valHooks[f.nodeName.toLowerCase()], c && "get"in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, "string" == typeof d ? d.replace(vb, "") : null == d ? "" : d)
            }
        }
    }), $.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            }, select: {
                get: function (a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)if (c = d[i], !(!c.selected && i !== e || ($.support.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && $.nodeName(c.parentNode, "optgroup"))) {
                        if (b = $(c).val(), f)return b;
                        g.push(b)
                    }
                    return g
                }, set: function (a, b) {
                    var c = $.makeArray(b);
                    return $(a).find("option").each(function () {
                        this.selected = $.inArray($(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1), c
                }
            }
        },
        attrFn: {},
        attr: function (a, c, d, e) {
            var f, g, h, i = a.nodeType;
            if (a && 3 !== i && 8 !== i && 2 !== i)return e && $.isFunction($.fn[c]) ? $(a)[c](d) : "undefined" == typeof a.getAttribute ? $.prop(a, c, d) : (h = 1 !== i || !$.isXMLDoc(a), h && (c = c.toLowerCase(), g = $.attrHooks[c] || (zb.test(c) ? sb : rb)), d !== b ? null === d ? void $.removeAttr(a, c) : g && "set"in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, d + ""), d) : g && "get"in g && h && null !== (f = g.get(a, c)) ? f : (f = a.getAttribute(c), null === f ? b : f))
        },
        removeAttr: function (a, b) {
            var c, d, e, f, g = 0;
            if (b && 1 === a.nodeType)for (d = b.split(bb); g < d.length; g++)e = d[g], e && (c = $.propFix[e] || e, f = zb.test(e), f || $.attr(a, e, ""), a.removeAttribute(Ab ? e : c), f && c in a && (a[c] = !1))
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (wb.test(a.nodeName) && a.parentNode)$.error("type property can't be changed"); else if (!$.support.radioValue && "radio" === b && $.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }, value: {
                get: function (a, b) {
                    return rb && $.nodeName(a, "button") ? rb.get(a, b) : b in a ? a.value : null
                }, set: function (a, b, c) {
                    return rb && $.nodeName(a, "button") ? rb.set(a, b, c) : void(a.value = b)
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, f, g, h = a.nodeType;
            if (a && 3 !== h && 8 !== h && 2 !== h)return g = 1 !== h || !$.isXMLDoc(a), g && (c = $.propFix[c] || c, f = $.propHooks[c]), d !== b ? f && "set"in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get"in f && null !== (e = f.get(a, c)) ? e : a[c]
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : xb.test(a.nodeName) || yb.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), sb = {
        get: function (a, c) {
            var d, e = $.prop(a, c);
            return e === !0 || "boolean" != typeof e && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        }, set: function (a, b, c) {
            var d;
            return b === !1 ? $.removeAttr(a, c) : (d = $.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
        }
    }, Ab || (tb = {name: !0, id: !0, coords: !0}, rb = $.valHooks.button = {
        get: function (a, c) {
            var d;
            return d = a.getAttributeNode(c), d && (tb[c] ? "" !== d.value : d.specified) ? d.value : b
        }, set: function (a, b, c) {
            var d = a.getAttributeNode(c);
            return d || (d = P.createAttribute(c), a.setAttributeNode(d)), d.value = b + ""
        }
    }, $.each(["width", "height"], function (a, b) {
        $.attrHooks[b] = $.extend($.attrHooks[b], {
            set: function (a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
            }
        })
    }), $.attrHooks.contenteditable = {
        get: rb.get, set: function (a, b, c) {
            "" === b && (b = "false"), rb.set(a, b, c)
        }
    }), $.support.hrefNormalized || $.each(["href", "src", "width", "height"], function (a, c) {
        $.attrHooks[c] = $.extend($.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return null === d ? b : d
            }
        })
    }), $.support.style || ($.attrHooks.style = {
        get: function (a) {
            return a.style.cssText.toLowerCase() || b
        }, set: function (a, b) {
            return a.style.cssText = b + ""
        }
    }), $.support.optSelected || ($.propHooks.selected = $.extend($.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    })), $.support.enctype || ($.propFix.enctype = "encoding"), $.support.checkOn || $.each(["radio", "checkbox"], function () {
        $.valHooks[this] = {
            get: function (a) {
                return null === a.getAttribute("value") ? "on" : a.value
            }
        }
    }), $.each(["radio", "checkbox"], function () {
        $.valHooks[this] = $.extend($.valHooks[this], {
            set: function (a, b) {
                return $.isArray(b) ? a.checked = $.inArray($(a).val(), b) >= 0 : void 0
            }
        })
    });
    var Bb = /^(?:textarea|input|select)$/i, Cb = /^([^\.]*|)(?:\.(.+)|)$/, Db = /(?:^|\s)hover(\.\S+|)\b/, Eb = /^key/, Fb = /^(?:mouse|contextmenu)|click/, Gb = /^(?:focusinfocus|focusoutblur)$/, Hb = function (a) {
        return $.event.special.hover ? a : a.replace(Db, "mouseenter$1 mouseleave$1")
    };
    $.event = {
        add: function (a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, p, q;
            if (3 !== a.nodeType && 8 !== a.nodeType && c && d && (g = $._data(a))) {
                for (d.handler && (o = d, d = o.handler, f = o.selector), d.guid || (d.guid = $.guid++), i = g.events, i || (g.events = i = {}), h = g.handle, h || (g.handle = h = function (a) {
                    return "undefined" == typeof $ || a && $.event.triggered === a.type ? b : $.event.dispatch.apply(h.elem, arguments)
                }, h.elem = a), c = $.trim(Hb(c)).split(" "), j = 0; j < c.length; j++)k = Cb.exec(c[j]) || [], l = k[1], m = (k[2] || "").split(".").sort(), q = $.event.special[l] || {}, l = (f ? q.delegateType : q.bindType) || l, q = $.event.special[l] || {}, n = $.extend({
                    type: l,
                    origType: k[1],
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: f,
                    needsContext: f && $.expr.match.needsContext.test(f),
                    namespace: m.join(".")
                }, o), p = i[l], p || (p = i[l] = [], p.delegateCount = 0, q.setup && q.setup.call(a, e, m, h) !== !1 || (a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h))), q.add && (q.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), f ? p.splice(p.delegateCount++, 0, n) : p.push(n), $.event.global[l] = !0;
                a = null
            }
        },
        global: {},
        remove: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = $.hasData(a) && $._data(a);
            if (q && (m = q.events)) {
                for (b = $.trim(Hb(b || "")).split(" "), f = 0; f < b.length; f++)if (g = Cb.exec(b[f]) || [], h = i = g[1], j = g[2], h) {
                    for (n = $.event.special[h] || {}, h = (d ? n.delegateType : n.bindType) || h, o = m[h] || [], k = o.length, j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, l = 0; l < o.length; l++)p = o[l], !e && i !== p.origType || c && c.guid !== p.guid || j && !j.test(p.namespace) || d && d !== p.selector && ("**" !== d || !p.selector) || (o.splice(l--, 1), p.selector && o.delegateCount--, n.remove && n.remove.call(a, p));
                    0 === o.length && k !== o.length && (n.teardown && n.teardown.call(a, j, q.handle) !== !1 || $.removeEvent(a, h, q.handle), delete m[h])
                } else for (h in m)$.event.remove(a, h + b[f], c, d, !0);
                $.isEmptyObject(m) && (delete q.handle, $.removeData(a, "events", !0))
            }
        },
        customEvent: {getData: !0, setData: !0, changeData: !0},
        trigger: function (c, d, e, f) {
            if (!e || 3 !== e.nodeType && 8 !== e.nodeType) {
                var g, h, i, j, k, l, m, n, o, p, q = c.type || c, r = [];
                if (!Gb.test(q + $.event.triggered) && (q.indexOf("!") >= 0 && (q = q.slice(0, -1), h = !0), q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort()), e && !$.event.customEvent[q] || $.event.global[q]))if (c = "object" == typeof c ? c[$.expando] ? c : new $.Event(q, c) : new $.Event(q), c.type = q, c.isTrigger = !0, c.exclusive = h, c.namespace = r.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, l = q.indexOf(":") < 0 ? "on" + q : "", e) {
                    if (c.result = b, c.target || (c.target = e), d = null != d ? $.makeArray(d) : [], d.unshift(c), m = $.event.special[q] || {}, !m.trigger || m.trigger.apply(e, d) !== !1) {
                        if (o = [[e, m.bindType || q]], !f && !m.noBubble && !$.isWindow(e)) {
                            for (p = m.delegateType || q, j = Gb.test(p + q) ? e : e.parentNode, k = e; j; j = j.parentNode)o.push([j, p]), k = j;
                            k === (e.ownerDocument || P) && o.push([k.defaultView || k.parentWindow || a, p])
                        }
                        for (i = 0; i < o.length && !c.isPropagationStopped(); i++)j = o[i][0], c.type = o[i][1], n = ($._data(j, "events") || {})[c.type] && $._data(j, "handle"), n && n.apply(j, d), n = l && j[l], n && $.acceptData(j) && n.apply && n.apply(j, d) === !1 && c.preventDefault();
                        return c.type = q, f || c.isDefaultPrevented() || m._default && m._default.apply(e.ownerDocument, d) !== !1 || "click" === q && $.nodeName(e, "a") || !$.acceptData(e) || l && e[q] && ("focus" !== q && "blur" !== q || 0 !== c.target.offsetWidth) && !$.isWindow(e) && (k = e[l], k && (e[l] = null), $.event.triggered = q, e[q](), $.event.triggered = b, k && (e[l] = k)), c.result
                    }
                } else {
                    g = $.cache;
                    for (i in g)g[i].events && g[i].events[q] && $.event.trigger(c, d, g[i].handle.elem, !0)
                }
            }
        },
        dispatch: function (c) {
            c = $.event.fix(c || a.event);
            var d, e, f, g, h, i, j, k, l, m = ($._data(this, "events") || {})[c.type] || [], n = m.delegateCount, o = V.call(arguments), p = !c.exclusive && !c.namespace, q = $.event.special[c.type] || {}, r = [];
            if (o[0] = c, c.delegateTarget = this, !q.preDispatch || q.preDispatch.call(this, c) !== !1) {
                if (n && (!c.button || "click" !== c.type))for (f = c.target; f != this; f = f.parentNode || this)if (f.disabled !== !0 || "click" !== c.type) {
                    for (h = {}, j = [], d = 0; n > d; d++)k = m[d], l = k.selector, h[l] === b && (h[l] = k.needsContext ? $(l, this).index(f) >= 0 : $.find(l, this, null, [f]).length), h[l] && j.push(k);
                    j.length && r.push({elem: f, matches: j})
                }
                for (m.length > n && r.push({
                    elem: this,
                    matches: m.slice(n)
                }), d = 0; d < r.length && !c.isPropagationStopped(); d++)for (i = r[d], c.currentTarget = i.elem, e = 0; e < i.matches.length && !c.isImmediatePropagationStopped(); e++)k = i.matches[e], (p || !c.namespace && !k.namespace || c.namespace_re && c.namespace_re.test(k.namespace)) && (c.data = k.data, c.handleObj = k, g = (($.event.special[k.origType] || {}).handle || k.handler).apply(i.elem, o), g !== b && (c.result = g, g === !1 && (c.preventDefault(), c.stopPropagation())));
                return q.postDispatch && q.postDispatch.call(this, c), c.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, c) {
                var d, e, f, g = c.button, h = c.fromElement;
                return null == a.pageX && null != c.clientX && (d = a.target.ownerDocument || P, e = d.documentElement, f = d.body, a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), a.which || g === b || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
            }
        },
        fix: function (a) {
            if (a[$.expando])return a;
            var b, c, d = a, e = $.event.fixHooks[a.type] || {}, f = e.props ? this.props.concat(e.props) : this.props;
            for (a = $.Event(d), b = f.length; b;)c = f[--b], a[c] = d[c];
            return a.target || (a.target = d.srcElement || P), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, e.filter ? e.filter(a, d) : a
        },
        special: {
            load: {noBubble: !0},
            focus: {delegateType: "focusin"},
            blur: {delegateType: "focusout"},
            beforeunload: {
                setup: function (a, b, c) {
                    $.isWindow(this) && (this.onbeforeunload = c)
                }, teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = $.extend(new $.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
            d ? $.event.trigger(e, null, b) : $.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, $.event.handle = $.event.dispatch, $.removeEvent = P.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        var d = "on" + b;
        a.detachEvent && ("undefined" == typeof a[d] && (a[d] = null), a.detachEvent(d, c))
    }, $.Event = function (a, b) {
        return this instanceof $.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? g : f) : this.type = a, b && $.extend(this, b), this.timeStamp = a && a.timeStamp || $.now(), void(this[$.expando] = !0)) : new $.Event(a, b)
    }, $.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = g;
            var a = this.originalEvent;
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        }, stopPropagation: function () {
            this.isPropagationStopped = g;
            var a = this.originalEvent;
            a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }, stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = g, this.stopPropagation()
        }, isDefaultPrevented: f, isPropagationStopped: f, isImmediatePropagationStopped: f
    }, $.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
        $.event.special[a] = {
            delegateType: b, bindType: b, handle: function (a) {
                {
                    var c, d = this, e = a.relatedTarget, f = a.handleObj;
                    f.selector
                }
                return (!e || e !== d && !$.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), $.support.submitBubbles || ($.event.special.submit = {
        setup: function () {
            return $.nodeName(this, "form") ? !1 : void $.event.add(this, "click._submit keypress._submit", function (a) {
                var c = a.target, d = $.nodeName(c, "input") || $.nodeName(c, "button") ? c.form : b;
                d && !$._data(d, "_submit_attached") && ($.event.add(d, "submit._submit", function (a) {
                    a._submit_bubble = !0
                }), $._data(d, "_submit_attached", !0))
            })
        }, postDispatch: function (a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && $.event.simulate("submit", this.parentNode, a, !0))
        }, teardown: function () {
            return $.nodeName(this, "form") ? !1 : void $.event.remove(this, "._submit")
        }
    }), $.support.changeBubbles || ($.event.special.change = {
        setup: function () {
            return Bb.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && ($.event.add(this, "propertychange._change", function (a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }), $.event.add(this, "click._change", function (a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1), $.event.simulate("change", this, a, !0)
            })), !1) : void $.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                Bb.test(b.nodeName) && !$._data(b, "_change_attached") && ($.event.add(b, "change._change", function (a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || $.event.simulate("change", this.parentNode, a, !0)
                }), $._data(b, "_change_attached", !0))
            })
        }, handle: function (a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
        }, teardown: function () {
            return $.event.remove(this, "._change"), !Bb.test(this.nodeName)
        }
    }), $.support.focusinBubbles || $.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var c = 0, d = function (a) {
            $.event.simulate(b, a.target, $.event.fix(a), !0)
        };
        $.event.special[b] = {
            setup: function () {
                0 === c++ && P.addEventListener(a, d, !0)
            }, teardown: function () {
                0 === --c && P.removeEventListener(a, d, !0)
            }
        }
    }), $.fn.extend({
        on: function (a, c, d, e, g) {
            var h, i;
            if ("object" == typeof a) {
                "string" != typeof c && (d = d || c, c = b);
                for (i in a)this.on(i, c, d, a[i], g);
                return this
            }
            if (null == d && null == e ? (e = c, d = c = b) : null == e && ("string" == typeof c ? (e = d, d = b) : (e = d, d = c, c = b)), e === !1)e = f; else if (!e)return this;
            return 1 === g && (h = e, e = function (a) {
                return $().off(a), h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = $.guid++)), this.each(function () {
                $.event.add(this, a, e, d, c)
            })
        }, one: function (a, b, c, d) {
            return this.on(a, b, c, d, 1)
        }, off: function (a, c, d) {
            var e, g;
            if (a && a.preventDefault && a.handleObj)return e = a.handleObj, $(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
            if ("object" == typeof a) {
                for (g in a)this.off(g, c, a[g]);
                return this
            }
            return (c === !1 || "function" == typeof c) && (d = c, c = b), d === !1 && (d = f), this.each(function () {
                $.event.remove(this, a, d, c)
            })
        }, bind: function (a, b, c) {
            return this.on(a, null, b, c)
        }, unbind: function (a, b) {
            return this.off(a, null, b)
        }, live: function (a, b, c) {
            return $(this.context).on(a, this.selector, b, c), this
        }, die: function (a, b) {
            return $(this.context).off(a, this.selector || "**", b), this
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        }, undelegate: function (a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }, trigger: function (a, b) {
            return this.each(function () {
                $.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            return this[0] ? $.event.trigger(a, b, this[0], !0) : void 0
        }, toggle: function (a) {
            var b = arguments, c = a.guid || $.guid++, d = 0, e = function (c) {
                var e = ($._data(this, "lastToggle" + a.guid) || 0) % d;
                return $._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1
            };
            for (e.guid = c; d < b.length;)b[d++].guid = c;
            return this.click(e)
        }, hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), $.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        $.fn[b] = function (a, c) {
            return null == c && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, Eb.test(b) && ($.event.fixHooks[b] = $.event.keyHooks), Fb.test(b) && ($.event.fixHooks[b] = $.event.mouseHooks)
    }), function (a, b) {
        function c(a, b, c, d) {
            c = c || [], b = b || F;
            var e, f, g, h, i = b.nodeType;
            if (!a || "string" != typeof a)return c;
            if (1 !== i && 9 !== i)return [];
            if (g = v(b), !g && !d && (e = cb.exec(a)))if (h = e[1]) {
                if (9 === i) {
                    if (f = b.getElementById(h), !f || !f.parentNode)return c;
                    if (f.id === h)return c.push(f), c
                } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(h)) && w(b, f) && f.id === h)return c.push(f), c
            } else {
                if (e[2])return K.apply(c, L.call(b.getElementsByTagName(a), 0)), c;
                if ((h = e[3]) && mb && b.getElementsByClassName)return K.apply(c, L.call(b.getElementsByClassName(h), 0)), c
            }
            return p(a.replace(Z, "$1"), b, c, d, g)
        }

        function d(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function e(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function f(a) {
            return N(function (b) {
                return b = +b, N(function (c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--;)c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function g(a, b, c) {
            if (a === b)return c;
            for (var d = a.nextSibling; d;) {
                if (d === b)return -1;
                d = d.nextSibling
            }
            return 1
        }

        function h(a, b) {
            var d, e, f, g, h, i, j, k = Q[D][a + " "];
            if (k)return b ? 0 : k.slice(0);
            for (h = a, i = [], j = t.preFilter; h;) {
                (!d || (e = _.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ab.exec(h)) && (f.push(d = new E(e.shift())), h = h.slice(d.length), d.type = e[0].replace(Z, " "));
                for (g in t.filter)!(e = hb[g].exec(h)) || j[g] && !(e = j[g](e)) || (f.push(d = new E(e.shift())), h = h.slice(d.length), d.type = g, d.matches = e);
                if (!d)break
            }
            return b ? h.length : h ? c.error(a) : Q(a, i).slice(0)
        }

        function i(a, b, c) {
            var d = b.dir, e = c && "parentNode" === b.dir, f = I++;
            return b.first ? function (b, c, f) {
                for (; b = b[d];)if (e || 1 === b.nodeType)return a(b, c, f)
            } : function (b, c, g) {
                if (g) {
                    for (; b = b[d];)if ((e || 1 === b.nodeType) && a(b, c, g))return b
                } else for (var h, i = H + " " + f + " ", j = i + r; b = b[d];)if (e || 1 === b.nodeType) {
                    if ((h = b[D]) === j)return b.sizset;
                    if ("string" == typeof h && 0 === h.indexOf(i)) {
                        if (b.sizset)return b
                    } else {
                        if (b[D] = j, a(b, c, g))return b.sizset = !0, b;
                        b.sizset = !1
                    }
                }
            }
        }

        function j(a) {
            return a.length > 1 ? function (b, c, d) {
                for (var e = a.length; e--;)if (!a[e](b, c, d))return !1;
                return !0
            } : a[0]
        }

        function k(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }

        function l(a, b, c, d, e, f) {
            return d && !d[D] && (d = l(d)), e && !e[D] && (e = l(e, f)), N(function (f, g, h, i) {
                var j, l, m, n = [], p = [], q = g.length, r = f || o(b || "*", h.nodeType ? [h] : h, []), s = !a || !f && b ? r : k(r, n, a, h, i), t = c ? e || (f ? a : q || d) ? [] : g : s;
                if (c && c(s, t, h, i), d)for (j = k(t, p), d(j, [], h, i), l = j.length; l--;)(m = j[l]) && (t[p[l]] = !(s[p[l]] = m));
                if (f) {
                    if (e || a) {
                        if (e) {
                            for (j = [], l = t.length; l--;)(m = t[l]) && j.push(s[l] = m);
                            e(null, t = [], j, i)
                        }
                        for (l = t.length; l--;)(m = t[l]) && (j = e ? M.call(f, m) : n[l]) > -1 && (f[j] = !(g[j] = m))
                    }
                } else t = k(t === g ? t.splice(q, t.length) : t), e ? e(null, g, t, i) : K.apply(g, t)
            })
        }

        function m(a) {
            for (var b, c, d, e = a.length, f = t.relative[a[0].type], g = f || t.relative[" "], h = f ? 1 : 0, k = i(function (a) {
                return a === b
            }, g, !0), n = i(function (a) {
                return M.call(b, a) > -1
            }, g, !0), o = [function (a, c, d) {
                return !f && (d || c !== A) || ((b = c).nodeType ? k(a, c, d) : n(a, c, d))
            }]; e > h; h++)if (c = t.relative[a[h].type])o = [i(j(o), c)]; else {
                if (c = t.filter[a[h].type].apply(null, a[h].matches), c[D]) {
                    for (d = ++h; e > d && !t.relative[a[d].type]; d++);
                    return l(h > 1 && j(o), h > 1 && a.slice(0, h - 1).join("").replace(Z, "$1"), c, d > h && m(a.slice(h, d)), e > d && m(a = a.slice(d)), e > d && a.join(""))
                }
                o.push(c)
            }
            return j(o)
        }

        function n(a, b) {
            var d = b.length > 0, e = a.length > 0, f = function (g, h, i, j, l) {
                var m, n, o, p = [], q = 0, s = "0", u = g && [], v = null != l, w = A, x = g || e && t.find.TAG("*", l && h.parentNode || h), y = H += null == w ? 1 : Math.E;
                for (v && (A = h !== F && h, r = f.el); null != (m = x[s]); s++) {
                    if (e && m) {
                        for (n = 0; o = a[n]; n++)if (o(m, h, i)) {
                            j.push(m);
                            break
                        }
                        v && (H = y, r = ++f.el)
                    }
                    d && ((m = !o && m) && q--, g && u.push(m))
                }
                if (q += s, d && s !== q) {
                    for (n = 0; o = b[n]; n++)o(u, p, h, i);
                    if (g) {
                        if (q > 0)for (; s--;)u[s] || p[s] || (p[s] = J.call(j));
                        p = k(p)
                    }
                    K.apply(j, p), v && !g && p.length > 0 && q + b.length > 1 && c.uniqueSort(j)
                }
                return v && (H = y, A = w), u
            };
            return f.el = 0, d ? N(f) : f
        }

        function o(a, b, d) {
            for (var e = 0, f = b.length; f > e; e++)c(a, b[e], d);
            return d
        }

        function p(a, b, c, d, e) {
            {
                var f, g, i, j, k, l = h(a);
                l.length
            }
            if (!d && 1 === l.length) {
                if (g = l[0] = l[0].slice(0), g.length > 2 && "ID" === (i = g[0]).type && 9 === b.nodeType && !e && t.relative[g[1].type]) {
                    if (b = t.find.ID(i.matches[0].replace(gb, ""), b, e)[0], !b)return c;
                    a = a.slice(g.shift().length)
                }
                for (f = hb.POS.test(a) ? -1 : g.length - 1; f >= 0 && (i = g[f], !t.relative[j = i.type]); f--)if ((k = t.find[j]) && (d = k(i.matches[0].replace(gb, ""), db.test(g[0].type) && b.parentNode || b, e))) {
                    if (g.splice(f, 1), a = d.length && g.join(""), !a)return K.apply(c, L.call(d, 0)), c;
                    break
                }
            }
            return x(a, l)(d, b, e, c, db.test(a)), c
        }

        function q() {
        }

        var r, s, t, u, v, w, x, y, z, A, B = !0, C = "undefined", D = ("sizcache" + Math.random()).replace(".", ""), E = String, F = a.document, G = F.documentElement, H = 0, I = 0, J = [].pop, K = [].push, L = [].slice, M = [].indexOf || function (a) {
                for (var b = 0, c = this.length; c > b; b++)if (this[b] === a)return b;
                return -1
            }, N = function (a, b) {
            return a[D] = null == b || b, a
        }, O = function () {
            var a = {}, b = [];
            return N(function (c, d) {
                return b.push(c) > t.cacheLength && delete a[b.shift()], a[c + " "] = d
            }, a)
        }, P = O(), Q = O(), R = O(), S = "[\\x20\\t\\r\\n\\f]", T = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", U = T.replace("w", "w#"), V = "([*^$|!~]?=)", W = "\\[" + S + "*(" + T + ")" + S + "*(?:" + V + S + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + U + ")|)|)" + S + "*\\]", X = ":(" + T + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + W + ")|[^:]|\\\\.)*|.*))\\)|)", Y = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + S + "*((?:-\\d)?\\d*)" + S + "*\\)|)(?=[^-]|$)", Z = new RegExp("^" + S + "+|((?:^|[^\\\\])(?:\\\\.)*)" + S + "+$", "g"), _ = new RegExp("^" + S + "*," + S + "*"), ab = new RegExp("^" + S + "*([\\x20\\t\\r\\n\\f>+~])" + S + "*"), bb = new RegExp(X), cb = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, db = /[\x20\t\r\n\f]*[+~]/, eb = /h\d/i, fb = /input|select|textarea|button/i, gb = /\\(?!\\)/g, hb = {
            ID: new RegExp("^#(" + T + ")"),
            CLASS: new RegExp("^\\.(" + T + ")"),
            NAME: new RegExp("^\\[name=['\"]?(" + T + ")['\"]?\\]"),
            TAG: new RegExp("^(" + T.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + W),
            PSEUDO: new RegExp("^" + X),
            POS: new RegExp(Y, "i"),
            CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + S + "*(even|odd|(([+-]|)(\\d*)n|)" + S + "*(?:([+-]|)" + S + "*(\\d+)|))" + S + "*\\)|)", "i"),
            needsContext: new RegExp("^" + S + "*[>+~]|" + Y, "i")
        }, ib = function (a) {
            var b = F.createElement("div");
            try {
                return a(b)
            } catch (c) {
                return !1
            } finally {
                b = null
            }
        }, jb = ib(function (a) {
            return a.appendChild(F.createComment("")), !a.getElementsByTagName("*").length
        }), kb = ib(function (a) {
            return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== C && "#" === a.firstChild.getAttribute("href")
        }), lb = ib(function (a) {
            a.innerHTML = "<select></select>";
            var b = typeof a.lastChild.getAttribute("multiple");
            return "boolean" !== b && "string" !== b
        }), mb = ib(function (a) {
            return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", a.getElementsByClassName && a.getElementsByClassName("e").length ? (a.lastChild.className = "e", 2 === a.getElementsByClassName("e").length) : !1
        }), nb = ib(function (a) {
            a.id = D + 0, a.innerHTML = "<a name='" + D + "'></a><div name='" + D + "'></div>", G.insertBefore(a, G.firstChild);
            var b = F.getElementsByName && F.getElementsByName(D).length === 2 + F.getElementsByName(D + 0).length;
            return s = !F.getElementById(D), G.removeChild(a), b
        });
        try {
            L.call(G.childNodes, 0)[0].nodeType
        } catch (ob) {
            L = function (a) {
                for (var b, c = []; b = this[a]; a++)c.push(b);
                return c
            }
        }
        c.matches = function (a, b) {
            return c(a, null, null, b)
        }, c.matchesSelector = function (a, b) {
            return c(b, null, null, [a]).length > 0
        }, u = c.getText = function (a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent)return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling)c += u(a)
                } else if (3 === e || 4 === e)return a.nodeValue
            } else for (; b = a[d]; d++)c += u(b);
            return c
        }, v = c.isXML = function (a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, w = c.contains = G.contains ? function (a, b) {
            var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
            return a === d || !!(d && 1 === d.nodeType && c.contains && c.contains(d))
        } : G.compareDocumentPosition ? function (a, b) {
            return b && !!(16 & a.compareDocumentPosition(b))
        } : function (a, b) {
            for (; b = b.parentNode;)if (b === a)return !0;
            return !1
        }, c.attr = function (a, b) {
            var c, d = v(a);
            return d || (b = b.toLowerCase()), (c = t.attrHandle[b]) ? c(a) : d || lb ? a.getAttribute(b) : (c = a.getAttributeNode(b), c ? "boolean" == typeof a[b] ? a[b] ? b : null : c.specified ? c.value : null : null)
        }, t = c.selectors = {
            cacheLength: 50,
            createPseudo: N,
            match: hb,
            attrHandle: kb ? {} : {
                href: function (a) {
                    return a.getAttribute("href", 2)
                }, type: function (a) {
                    return a.getAttribute("type")
                }
            },
            find: {
                ID: s ? function (a, b, c) {
                    if (typeof b.getElementById !== C && !c) {
                        var d = b.getElementById(a);
                        return d && d.parentNode ? [d] : []
                    }
                } : function (a, c, d) {
                    if (typeof c.getElementById !== C && !d) {
                        var e = c.getElementById(a);
                        return e ? e.id === a || typeof e.getAttributeNode !== C && e.getAttributeNode("id").value === a ? [e] : b : []
                    }
                }, TAG: jb ? function (a, b) {
                    return typeof b.getElementsByTagName !== C ? b.getElementsByTagName(a) : void 0
                } : function (a, b) {
                    var c = b.getElementsByTagName(a);
                    if ("*" === a) {
                        for (var d, e = [], f = 0; d = c[f]; f++)1 === d.nodeType && e.push(d);
                        return e
                    }
                    return c
                }, NAME: nb && function (a, b) {
                    return typeof b.getElementsByName !== C ? b.getElementsByName(name) : void 0
                }, CLASS: mb && function (a, b, c) {
                    return typeof b.getElementsByClassName === C || c ? void 0 : b.getElementsByClassName(a)
                }
            },
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (a) {
                    return a[1] = a[1].replace(gb, ""), a[3] = (a[4] || a[5] || "").replace(gb, ""), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                }, CHILD: function (a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1] ? (a[2] || c.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * ("even" === a[2] || "odd" === a[2])), a[4] = +(a[6] + a[7] || "odd" === a[2])) : a[2] && c.error(a[0]), a
                }, PSEUDO: function (a) {
                    var b, c;
                    return hb.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[3] : (b = a[4]) && (bb.test(b) && (c = h(b, !0)) && (c = b.indexOf(")", b.length - c) - b.length) && (b = b.slice(0, c), a[0] = a[0].slice(0, c)), a[2] = b), a.slice(0, 3))
                }
            },
            filter: {
                ID: s ? function (a) {
                    return a = a.replace(gb, ""), function (b) {
                        return b.getAttribute("id") === a
                    }
                } : function (a) {
                    return a = a.replace(gb, ""), function (b) {
                        var c = typeof b.getAttributeNode !== C && b.getAttributeNode("id");
                        return c && c.value === a
                    }
                }, TAG: function (a) {
                    return "*" === a ? function () {
                        return !0
                    } : (a = a.replace(gb, "").toLowerCase(), function (b) {
                        return b.nodeName && b.nodeName.toLowerCase() === a
                    })
                }, CLASS: function (a) {
                    var b = P[D][a + " "];
                    return b || (b = new RegExp("(^|" + S + ")" + a + "(" + S + "|$)")) && P(a, function (a) {
                        return b.test(a.className || typeof a.getAttribute !== C && a.getAttribute("class") || "")
                    })
                }, ATTR: function (a, b, d) {
                    return function (e) {
                        var f = c.attr(e, a);
                        return null == f ? "!=" === b : b ? (f += "", "=" === b ? f === d : "!=" === b ? f !== d : "^=" === b ? d && 0 === f.indexOf(d) : "*=" === b ? d && f.indexOf(d) > -1 : "$=" === b ? d && f.substr(f.length - d.length) === d : "~=" === b ? (" " + f + " ").indexOf(d) > -1 : "|=" === b ? f === d || f.substr(0, d.length + 1) === d + "-" : !1) : !0
                    }
                }, CHILD: function (a, b, c, d) {
                    return "nth" === a ? function (a) {
                        var b, e, f = a.parentNode;
                        if (1 === c && 0 === d)return !0;
                        if (f)for (e = 0, b = f.firstChild; b && (1 !== b.nodeType || (e++, a !== b)); b = b.nextSibling);
                        return e -= d, e === c || e % c === 0 && e / c >= 0
                    } : function (b) {
                        var c = b;
                        switch (a) {
                            case"only":
                            case"first":
                                for (; c = c.previousSibling;)if (1 === c.nodeType)return !1;
                                if ("first" === a)return !0;
                                c = b;
                            case"last":
                                for (; c = c.nextSibling;)if (1 === c.nodeType)return !1;
                                return !0
                        }
                    }
                }, PSEUDO: function (a, b) {
                    var d, e = t.pseudos[a] || t.setFilters[a.toLowerCase()] || c.error("unsupported pseudo: " + a);
                    return e[D] ? e(b) : e.length > 1 ? (d = [a, a, "", b], t.setFilters.hasOwnProperty(a.toLowerCase()) ? N(function (a, c) {
                        for (var d, f = e(a, b), g = f.length; g--;)d = M.call(a, f[g]), a[d] = !(c[d] = f[g])
                    }) : function (a) {
                        return e(a, 0, d)
                    }) : e
                }
            },
            pseudos: {
                not: N(function (a) {
                    var b = [], c = [], d = x(a.replace(Z, "$1"));
                    return d[D] ? N(function (a, b, c, e) {
                        for (var f, g = d(a, null, e, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function (a, e, f) {
                        return b[0] = a, d(b, null, f, c), !c.pop()
                    }
                }),
                has: N(function (a) {
                    return function (b) {
                        return c(a, b).length > 0
                    }
                }),
                contains: N(function (a) {
                    return function (b) {
                        return (b.textContent || b.innerText || u(b)).indexOf(a) > -1
                    }
                }),
                enabled: function (a) {
                    return a.disabled === !1
                },
                disabled: function (a) {
                    return a.disabled === !0
                },
                checked: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },
                parent: function (a) {
                    return !t.pseudos.empty(a)
                },
                empty: function (a) {
                    var b;
                    for (a = a.firstChild; a;) {
                        if (a.nodeName > "@" || 3 === (b = a.nodeType) || 4 === b)return !1;
                        a = a.nextSibling
                    }
                    return !0
                },
                header: function (a) {
                    return eb.test(a.nodeName)
                },
                text: function (a) {
                    var b, c;
                    return "input" === a.nodeName.toLowerCase() && "text" === (b = a.type) && (null == (c = a.getAttribute("type")) || c.toLowerCase() === b)
                },
                radio: d("radio"),
                checkbox: d("checkbox"),
                file: d("file"),
                password: d("password"),
                image: d("image"),
                submit: e("submit"),
                reset: e("reset"),
                button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                input: function (a) {
                    return fb.test(a.nodeName)
                },
                focus: function (a) {
                    var b = a.ownerDocument;
                    return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                active: function (a) {
                    return a === a.ownerDocument.activeElement
                },
                first: f(function () {
                    return [0]
                }),
                last: f(function (a, b) {
                    return [b - 1]
                }),
                eq: f(function (a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: f(function (a, b) {
                    for (var c = 0; b > c; c += 2)a.push(c);
                    return a
                }),
                odd: f(function (a, b) {
                    for (var c = 1; b > c; c += 2)a.push(c);
                    return a
                }),
                lt: f(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;)a.push(d);
                    return a
                }),
                gt: f(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;)a.push(d);
                    return a
                })
            }
        }, y = G.compareDocumentPosition ? function (a, b) {
            return a === b ? (z = !0, 0) : (a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) : a.compareDocumentPosition) ? -1 : 1
        } : function (a, b) {
            if (a === b)return z = !0, 0;
            if (a.sourceIndex && b.sourceIndex)return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], h = a.parentNode, i = b.parentNode, j = h;
            if (h === i)return g(a, b);
            if (!h)return -1;
            if (!i)return 1;
            for (; j;)e.unshift(j), j = j.parentNode;
            for (j = i; j;)f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; c > k && d > k; k++)if (e[k] !== f[k])return g(e[k], f[k]);
            return k === c ? g(a, f[k], -1) : g(e[k], b, 1)
        }, [0, 0].sort(y), B = !z, c.uniqueSort = function (a) {
            var b, c = [], d = 1, e = 0;
            if (z = B, a.sort(y), z) {
                for (; b = a[d]; d++)b === a[d - 1] && (e = c.push(d));
                for (; e--;)a.splice(c[e], 1)
            }
            return a
        }, c.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, x = c.compile = function (a, b) {
            var c, d = [], e = [], f = R[D][a + " "];
            if (!f) {
                for (b || (b = h(a)), c = b.length; c--;)f = m(b[c]), f[D] ? d.push(f) : e.push(f);
                f = R(a, n(e, d))
            }
            return f
        }, F.querySelectorAll && !function () {
            var a, b = p, d = /'|\\/g, e = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, f = [":focus"], g = [":active"], i = G.matchesSelector || G.mozMatchesSelector || G.webkitMatchesSelector || G.oMatchesSelector || G.msMatchesSelector;
            ib(function (a) {
                a.innerHTML = "<select><option selected=''></option></select>", a.querySelectorAll("[selected]").length || f.push("\\[" + S + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), a.querySelectorAll(":checked").length || f.push(":checked")
            }), ib(function (a) {
                a.innerHTML = "<p test=''></p>", a.querySelectorAll("[test^='']").length && f.push("[*^$]=" + S + "*(?:\"\"|'')"), a.innerHTML = "<input type='hidden'/>", a.querySelectorAll(":enabled").length || f.push(":enabled", ":disabled")
            }), f = new RegExp(f.join("|")), p = function (a, c, e, g, i) {
                if (!g && !i && !f.test(a)) {
                    var j, k, l = !0, m = D, n = c, o = 9 === c.nodeType && a;
                    if (1 === c.nodeType && "object" !== c.nodeName.toLowerCase()) {
                        for (j = h(a), (l = c.getAttribute("id")) ? m = l.replace(d, "\\$&") : c.setAttribute("id", m), m = "[id='" + m + "'] ", k = j.length; k--;)j[k] = m + j[k].join("");
                        n = db.test(a) && c.parentNode || c, o = j.join(",")
                    }
                    if (o)try {
                        return K.apply(e, L.call(n.querySelectorAll(o), 0)), e
                    } catch (p) {
                    } finally {
                        l || c.removeAttribute("id")
                    }
                }
                return b(a, c, e, g, i)
            }, i && (ib(function (b) {
                a = i.call(b, "div");
                try {
                    i.call(b, "[test!='']:sizzle"), g.push("!=", X)
                } catch (c) {
                }
            }), g = new RegExp(g.join("|")), c.matchesSelector = function (b, d) {
                if (d = d.replace(e, "='$1']"), !v(b) && !g.test(d) && !f.test(d))try {
                    var h = i.call(b, d);
                    if (h || a || b.document && 11 !== b.document.nodeType)return h
                } catch (j) {
                }
                return c(d, null, null, [b]).length > 0
            })
        }(), t.pseudos.nth = t.pseudos.eq, t.filters = q.prototype = t.pseudos, t.setFilters = new q, c.attr = $.attr, $.find = c, $.expr = c.selectors, $.expr[":"] = $.expr.pseudos, $.unique = c.uniqueSort, $.text = c.getText, $.isXMLDoc = c.isXML, $.contains = c.contains
    }(a);
    var Ib = /Until$/, Jb = /^(?:parents|prev(?:Until|All))/, Kb = /^.[^:#\[\.,]*$/, Lb = $.expr.match.needsContext, Mb = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    $.fn.extend({
        find: function (a) {
            var b, c, d, e, f, g, h = this;
            if ("string" != typeof a)return $(a).filter(function () {
                for (b = 0, c = h.length; c > b; b++)if ($.contains(h[b], this))return !0
            });
            for (g = this.pushStack("", "find", a), b = 0, c = this.length; c > b; b++)if (d = g.length, $.find(a, this[b], g), b > 0)for (e = d; e < g.length; e++)for (f = 0; d > f; f++)if (g[f] === g[e]) {
                g.splice(e--, 1);
                break
            }
            return g
        }, has: function (a) {
            var b, c = $(a, this), d = c.length;
            return this.filter(function () {
                for (b = 0; d > b; b++)if ($.contains(this, c[b]))return !0
            })
        }, not: function (a) {
            return this.pushStack(j(this, a, !1), "not", a)
        }, filter: function (a) {
            return this.pushStack(j(this, a, !0), "filter", a)
        }, is: function (a) {
            return !!a && ("string" == typeof a ? Lb.test(a) ? $(a, this.context).index(this[0]) >= 0 : $.filter(a, this).length > 0 : this.filter(a).length > 0)
        }, closest: function (a, b) {
            for (var c, d = 0, e = this.length, f = [], g = Lb.test(a) || "string" != typeof a ? $(a, b || this.context) : 0; e > d; d++)for (c = this[d]; c && c.ownerDocument && c !== b && 11 !== c.nodeType;) {
                if (g ? g.index(c) > -1 : $.find.matchesSelector(c, a)) {
                    f.push(c);
                    break
                }
                c = c.parentNode
            }
            return f = f.length > 1 ? $.unique(f) : f, this.pushStack(f, "closest", a)
        }, index: function (a) {
            return a ? "string" == typeof a ? $.inArray(this[0], $(a)) : $.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        }, add: function (a, b) {
            var c = "string" == typeof a ? $(a, b) : $.makeArray(a && a.nodeType ? [a] : a), d = $.merge(this.get(), c);
            return this.pushStack(h(c[0]) || h(d[0]) ? d : $.unique(d))
        }, addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    }), $.fn.andSelf = $.fn.addBack, $.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        }, parents: function (a) {
            return $.dir(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return $.dir(a, "parentNode", c)
        }, next: function (a) {
            return i(a, "nextSibling")
        }, prev: function (a) {
            return i(a, "previousSibling")
        }, nextAll: function (a) {
            return $.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return $.dir(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return $.dir(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return $.dir(a, "previousSibling", c)
        }, siblings: function (a) {
            return $.sibling((a.parentNode || {}).firstChild, a)
        }, children: function (a) {
            return $.sibling(a.firstChild)
        }, contents: function (a) {
            return $.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : $.merge([], a.childNodes)
        }
    }, function (a, b) {
        $.fn[a] = function (c, d) {
            var e = $.map(this, b, c);
            return Ib.test(a) || (d = c), d && "string" == typeof d && (e = $.filter(d, e)), e = this.length > 1 && !Mb[a] ? $.unique(e) : e, this.length > 1 && Jb.test(a) && (e = e.reverse()), this.pushStack(e, a, V.call(arguments).join(","))
        }
    }), $.extend({
        filter: function (a, b, c) {
            return c && (a = ":not(" + a + ")"), 1 === b.length ? $.find.matchesSelector(b[0], a) ? [b[0]] : [] : $.find.matches(a, b)
        }, dir: function (a, c, d) {
            for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !$(f).is(d));)1 === f.nodeType && e.push(f), f = f[c];
            return e
        }, sibling: function (a, b) {
            for (var c = []; a; a = a.nextSibling)1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    });
    var Nb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Ob = / jQuery\d+="(?:null|\d+)"/g, Pb = /^\s+/, Qb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Rb = /<([\w:]+)/, Sb = /<tbody/i, Tb = /<|&#?\w+;/, Ub = /<(?:script|style|link)/i, Vb = /<(?:script|object|embed|option|style)/i, Wb = new RegExp("<(?:" + Nb + ")[\\s/>]", "i"), Xb = /^(?:checkbox|radio)$/, Yb = /checked\s*(?:[^=]|=\s*.checked.)/i, Zb = /\/(java|ecma)script/i, $b = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, _b = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    }, ac = k(P), bc = ac.appendChild(P.createElement("div"));
    _b.optgroup = _b.option, _b.tbody = _b.tfoot = _b.colgroup = _b.caption = _b.thead, _b.th = _b.td, $.support.htmlSerialize || (_b._default = [1, "X<div>", "</div>"]), $.fn.extend({
        text: function (a) {
            return $.access(this, function (a) {
                return a === b ? $.text(this) : this.empty().append((this[0] && this[0].ownerDocument || P).createTextNode(a))
            }, null, a, arguments.length)
        }, wrapAll: function (a) {
            if ($.isFunction(a))return this.each(function (b) {
                $(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = $(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;)a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        }, wrapInner: function (a) {
            return this.each($.isFunction(a) ? function (b) {
                $(this).wrapInner(a.call(this, b))
            } : function () {
                var b = $(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            var b = $.isFunction(a);
            return this.each(function (c) {
                $(this).wrapAll(b ? a.call(this, c) : a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                $.nodeName(this, "body") || $(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, !0, function (a) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(a)
            })
        }, prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(a, this.firstChild)
            })
        }, before: function () {
            if (!h(this[0]))return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = $.clean(arguments);
                return this.pushStack($.merge(a, this), "before", this.selector)
            }
        }, after: function () {
            if (!h(this[0]))return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = $.clean(arguments);
                return this.pushStack($.merge(this, a), "after", this.selector)
            }
        }, remove: function (a, b) {
            for (var c, d = 0; null != (c = this[d]); d++)(!a || $.filter(a, [c]).length) && (b || 1 !== c.nodeType || ($.cleanData(c.getElementsByTagName("*")), $.cleanData([c])), c.parentNode && c.parentNode.removeChild(c));
            return this
        }, empty: function () {
            for (var a, b = 0; null != (a = this[b]); b++)for (1 === a.nodeType && $.cleanData(a.getElementsByTagName("*")); a.firstChild;)a.removeChild(a.firstChild);
            return this
        }, clone: function (a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
                return $.clone(this, a, b)
            })
        }, html: function (a) {
            return $.access(this, function (a) {
                var c = this[0] || {}, d = 0, e = this.length;
                if (a === b)return 1 === c.nodeType ? c.innerHTML.replace(Ob, "") : b;
                if (!("string" != typeof a || Ub.test(a) || !$.support.htmlSerialize && Wb.test(a) || !$.support.leadingWhitespace && Pb.test(a) || _b[(Rb.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(Qb, "<$1></$2>");
                    try {
                        for (; e > d; d++)c = this[d] || {}, 1 === c.nodeType && ($.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                        c = 0
                    } catch (f) {
                    }
                }
                c && this.empty().append(a)
            }, null, a, arguments.length)
        }, replaceWith: function (a) {
            return h(this[0]) ? this.length ? this.pushStack($($.isFunction(a) ? a() : a), "replaceWith", a) : this : $.isFunction(a) ? this.each(function (b) {
                var c = $(this), d = c.html();
                c.replaceWith(a.call(this, b, d))
            }) : ("string" != typeof a && (a = $(a).detach()), this.each(function () {
                var b = this.nextSibling, c = this.parentNode;
                $(this).remove(), b ? $(b).before(a) : $(c).append(a)
            }))
        }, detach: function (a) {
            return this.remove(a, !0)
        }, domManip: function (a, c, d) {
            a = [].concat.apply([], a);
            var e, f, g, h, i = 0, j = a[0], k = [], m = this.length;
            if (!$.support.checkClone && m > 1 && "string" == typeof j && Yb.test(j))return this.each(function () {
                $(this).domManip(a, c, d)
            });
            if ($.isFunction(j))return this.each(function (e) {
                var f = $(this);
                a[0] = j.call(this, e, c ? f.html() : b), f.domManip(a, c, d)
            });
            if (this[0]) {
                if (e = $.buildFragment(a, this, k), g = e.fragment, f = g.firstChild, 1 === g.childNodes.length && (g = f), f)for (c = c && $.nodeName(f, "tr"), h = e.cacheable || m - 1; m > i; i++)d.call(c && $.nodeName(this[i], "table") ? l(this[i], "tbody") : this[i], i === h ? g : $.clone(g, !0, !0));
                g = f = null, k.length && $.each(k, function (a, b) {
                    b.src ? $.ajax ? $.ajax({
                        url: b.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : $.error("no ajax") : $.globalEval((b.text || b.textContent || b.innerHTML || "").replace($b, "")), b.parentNode && b.parentNode.removeChild(b)
                })
            }
            return this
        }
    }), $.buildFragment = function (a, c, d) {
        var e, f, g, h = a[0];
        return c = c || P, c = !c.nodeType && c[0] || c, c = c.ownerDocument || c, !(1 === a.length && "string" == typeof h && h.length < 512 && c === P && "<" === h.charAt(0)) || Vb.test(h) || !$.support.checkClone && Yb.test(h) || !$.support.html5Clone && Wb.test(h) || (f = !0, e = $.fragments[h], g = e !== b), e || (e = c.createDocumentFragment(), $.clean(a, c, e, d), f && ($.fragments[h] = g && e)), {
            fragment: e,
            cacheable: f
        }
    }, $.fragments = {}, $.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        $.fn[a] = function (c) {
            var d, e = 0, f = [], g = $(c), h = g.length, i = 1 === this.length && this[0].parentNode;
            if ((null == i || i && 11 === i.nodeType && 1 === i.childNodes.length) && 1 === h)return g[b](this[0]), this;
            for (; h > e; e++)d = (e > 0 ? this.clone(!0) : this).get(), $(g[e])[b](d), f = f.concat(d);
            return this.pushStack(f, a, g.selector)
        }
    }), $.extend({
        clone: function (a, b, c) {
            var d, e, f, g;
            if ($.support.html5Clone || $.isXMLDoc(a) || !Wb.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (bc.innerHTML = a.outerHTML, bc.removeChild(g = bc.firstChild)), !($.support.noCloneEvent && $.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || $.isXMLDoc(a)))for (n(a, g), d = o(a), e = o(g), f = 0; d[f]; ++f)e[f] && n(d[f], e[f]);
            if (b && (m(a, g), c))for (d = o(a), e = o(g), f = 0; d[f]; ++f)m(d[f], e[f]);
            return d = e = null, g
        }, clean: function (a, b, c, d) {
            var e, f, g, h, i, j, l, m, n, o, q, r = b === P && ac, s = [];
            for (b && "undefined" != typeof b.createDocumentFragment || (b = P), e = 0; null != (g = a[e]); e++)if ("number" == typeof g && (g += ""), g) {
                if ("string" == typeof g)if (Tb.test(g)) {
                    for (r = r || k(b), l = b.createElement("div"), r.appendChild(l), g = g.replace(Qb, "<$1></$2>"), h = (Rb.exec(g) || ["", ""])[1].toLowerCase(), i = _b[h] || _b._default, j = i[0], l.innerHTML = i[1] + g + i[2]; j--;)l = l.lastChild;
                    if (!$.support.tbody)for (m = Sb.test(g), n = "table" !== h || m ? "<table>" !== i[1] || m ? [] : l.childNodes : l.firstChild && l.firstChild.childNodes, f = n.length - 1; f >= 0; --f)$.nodeName(n[f], "tbody") && !n[f].childNodes.length && n[f].parentNode.removeChild(n[f]);
                    !$.support.leadingWhitespace && Pb.test(g) && l.insertBefore(b.createTextNode(Pb.exec(g)[0]), l.firstChild), g = l.childNodes, l.parentNode.removeChild(l)
                } else g = b.createTextNode(g);
                g.nodeType ? s.push(g) : $.merge(s, g)
            }
            if (l && (g = l = r = null), !$.support.appendChecked)for (e = 0; null != (g = s[e]); e++)$.nodeName(g, "input") ? p(g) : "undefined" != typeof g.getElementsByTagName && $.grep(g.getElementsByTagName("input"), p);
            if (c)for (o = function (a) {
                return !a.type || Zb.test(a.type) ? d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a) : void 0
            }, e = 0; null != (g = s[e]); e++)$.nodeName(g, "script") && o(g) || (c.appendChild(g), "undefined" != typeof g.getElementsByTagName && (q = $.grep($.merge([], g.getElementsByTagName("script")), o), s.splice.apply(s, [e + 1, 0].concat(q)), e += q.length));
            return s
        }, cleanData: function (a, b) {
            for (var c, d, e, f, g = 0, h = $.expando, i = $.cache, j = $.support.deleteExpando, k = $.event.special; null != (e = a[g]); g++)if ((b || $.acceptData(e)) && (d = e[h], c = d && i[d])) {
                if (c.events)for (f in c.events)k[f] ? $.event.remove(e, f) : $.removeEvent(e, f, c.handle);
                i[d] && (delete i[d], j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null, $.deletedIds.push(d))
            }
        }
    }), function () {
        var a, b;
        $.uaMatch = function (a) {
            a = a.toLowerCase();
            var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {browser: b[1] || "", version: b[2] || "0"}
        }, a = $.uaMatch(R.userAgent), b = {}, a.browser && (b[a.browser] = !0, b.version = a.version), b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0), $.browser = b, $.sub = function () {
            function a(b, c) {
                return new a.fn.init(b, c)
            }

            $.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (c, d) {
                return d && d instanceof $ && !(d instanceof a) && (d = a(d)), $.fn.init.call(this, c, d, b)
            }, a.fn.init.prototype = a.fn;
            var b = a(P);
            return a
        }
    }();
    var cc, dc, ec, fc = /alpha\([^)]*\)/i, gc = /opacity=([^)]*)/, hc = /^(top|right|bottom|left)$/, ic = /^(none|table(?!-c[ea]).+)/, jc = /^margin/, kc = new RegExp("^(" + _ + ")(.*)$", "i"), lc = new RegExp("^(" + _ + ")(?!px)[a-z%]+$", "i"), mc = new RegExp("^([-+])=(" + _ + ")", "i"), nc = {BODY: "block"}, oc = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, pc = {
        letterSpacing: 0,
        fontWeight: 400
    }, qc = ["Top", "Right", "Bottom", "Left"], rc = ["Webkit", "O", "Moz", "ms"], sc = $.fn.toggle;
    $.fn.extend({
        css: function (a, c) {
            return $.access(this, function (a, c, d) {
                return d !== b ? $.style(a, c, d) : $.css(a, c)
            }, a, c, arguments.length > 1)
        }, show: function () {
            return s(this, !0)
        }, hide: function () {
            return s(this)
        }, toggle: function (a, b) {
            var c = "boolean" == typeof a;
            return $.isFunction(a) && $.isFunction(b) ? sc.apply(this, arguments) : this.each(function () {
                (c ? a : r(this)) ? $(this).show() : $(this).hide()
            })
        }
    }), $.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = cc(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": $.support.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (a, c, d, e) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var f, g, h, i = $.camelCase(c), j = a.style;
                if (c = $.cssProps[i] || ($.cssProps[i] = q(j, i)), h = $.cssHooks[c] || $.cssHooks[i], d === b)return h && "get"in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
                if (g = typeof d, "string" === g && (f = mc.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat($.css(a, c)), g = "number"), !(null == d || "number" === g && isNaN(d) || ("number" !== g || $.cssNumber[i] || (d += "px"), h && "set"in h && (d = h.set(a, d, e)) === b)))try {
                    j[c] = d
                } catch (k) {
                }
            }
        },
        css: function (a, c, d, e) {
            var f, g, h, i = $.camelCase(c);
            return c = $.cssProps[i] || ($.cssProps[i] = q(a.style, i)), h = $.cssHooks[c] || $.cssHooks[i], h && "get"in h && (f = h.get(a, !0, e)), f === b && (f = cc(a, c)), "normal" === f && c in pc && (f = pc[c]), d || e !== b ? (g = parseFloat(f), d || $.isNumeric(g) ? g || 0 : f) : f
        },
        swap: function (a, b, c) {
            var d, e, f = {};
            for (e in b)f[e] = a.style[e], a.style[e] = b[e];
            d = c.call(a);
            for (e in b)a.style[e] = f[e];
            return d
        }
    }), a.getComputedStyle ? cc = function (b, c) {
        var d, e, f, g, h = a.getComputedStyle(b, null), i = b.style;
        return h && (d = h.getPropertyValue(c) || h[c], "" !== d || $.contains(b.ownerDocument, b) || (d = $.style(b, c)), lc.test(d) && jc.test(c) && (e = i.width, f = i.minWidth, g = i.maxWidth, i.minWidth = i.maxWidth = i.width = d, d = h.width, i.width = e, i.minWidth = f, i.maxWidth = g)), d
    } : P.documentElement.currentStyle && (cc = function (a, b) {
        var c, d, e = a.currentStyle && a.currentStyle[b], f = a.style;
        return null == e && f && f[b] && (e = f[b]), lc.test(e) && !hc.test(b) && (c = f.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), f.left = "fontSize" === b ? "1em" : e, e = f.pixelLeft + "px", f.left = c, d && (a.runtimeStyle.left = d)), "" === e ? "auto" : e
    }), $.each(["height", "width"], function (a, b) {
        $.cssHooks[b] = {
            get: function (a, c, d) {
                return c ? 0 === a.offsetWidth && ic.test(cc(a, "display")) ? $.swap(a, oc, function () {
                    return v(a, b, d)
                }) : v(a, b, d) : void 0
            }, set: function (a, c, d) {
                return t(a, c, d ? u(a, b, d, $.support.boxSizing && "border-box" === $.css(a, "boxSizing")) : 0)
            }
        }
    }), $.support.opacity || ($.cssHooks.opacity = {
        get: function (a, b) {
            return gc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        }, set: function (a, b) {
            var c = a.style, d = a.currentStyle, e = $.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
            c.zoom = 1, b >= 1 && "" === $.trim(f.replace(fc, "")) && c.removeAttribute && (c.removeAttribute("filter"), d && !d.filter) || (c.filter = fc.test(f) ? f.replace(fc, e) : f + " " + e)
        }
    }), $(function () {
        $.support.reliableMarginRight || ($.cssHooks.marginRight = {
            get: function (a, b) {
                return $.swap(a, {display: "inline-block"}, function () {
                    return b ? cc(a, "marginRight") : void 0
                })
            }
        }), !$.support.pixelPosition && $.fn.position && $.each(["top", "left"], function (a, b) {
            $.cssHooks[b] = {
                get: function (a, c) {
                    if (c) {
                        var d = cc(a, b);
                        return lc.test(d) ? $(a).position()[b] + "px" : d
                    }
                }
            }
        })
    }), $.expr && $.expr.filters && ($.expr.filters.hidden = function (a) {
        return 0 === a.offsetWidth && 0 === a.offsetHeight || !$.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || cc(a, "display"))
    }, $.expr.filters.visible = function (a) {
        return !$.expr.filters.hidden(a)
    }), $.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        $.cssHooks[a + b] = {
            expand: function (c) {
                var d, e = "string" == typeof c ? c.split(" ") : [c], f = {};
                for (d = 0; 4 > d; d++)f[a + qc[d] + b] = e[d] || e[d - 2] || e[0];
                return f
            }
        }, jc.test(a) || ($.cssHooks[a + b].set = t)
    });
    var tc = /%20/g, uc = /\[\]$/, vc = /\r?\n/g, wc = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, xc = /^(?:select|textarea)/i;
    $.fn.extend({
        serialize: function () {
            return $.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? $.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || xc.test(this.nodeName) || wc.test(this.type))
            }).map(function (a, b) {
                var c = $(this).val();
                return null == c ? null : $.isArray(c) ? $.map(c, function (a) {
                    return {name: b.name, value: a.replace(vc, "\r\n")}
                }) : {name: b.name, value: c.replace(vc, "\r\n")}
            }).get()
        }
    }), $.param = function (a, c) {
        var d, e = [], f = function (a, b) {
            b = $.isFunction(b) ? b() : null == b ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (c === b && (c = $.ajaxSettings && $.ajaxSettings.traditional), $.isArray(a) || a.jquery && !$.isPlainObject(a))$.each(a, function () {
            f(this.name, this.value)
        }); else for (d in a)x(d, a[d], c, f);
        return e.join("&").replace(tc, "+")
    };
    var yc, zc, Ac = /#.*$/, Bc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Cc = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, Dc = /^(?:GET|HEAD)$/, Ec = /^\/\//, Fc = /\?/, Gc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, Hc = /([?&])_=[^&]*/, Ic = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Jc = $.fn.load, Kc = {}, Lc = {}, Mc = ["*/"] + ["*"];
    try {
        zc = Q.href
    } catch (Nc) {
        zc = P.createElement("a"), zc.href = "", zc = zc.href
    }
    yc = Ic.exec(zc.toLowerCase()) || [], $.fn.load = function (a, c, d) {
        if ("string" != typeof a && Jc)return Jc.apply(this, arguments);
        if (!this.length)return this;
        var e, f, g, h = this, i = a.indexOf(" ");
        return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), $.isFunction(c) ? (d = c, c = b) : c && "object" == typeof c && (f = "POST"), $.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: c,
            complete: function (a, b) {
                d && h.each(d, g || [a.responseText, b, a])
            }
        }).done(function (a) {
            g = arguments, h.html(e ? $("<div>").append(a.replace(Gc, "")).find(e) : a)
        }), this
    }, $.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        $.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), $.each(["get", "post"], function (a, c) {
        $[c] = function (a, d, e, f) {
            return $.isFunction(d) && (f = f || e, e = d, d = b), $.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: f
            })
        }
    }), $.extend({
        getScript: function (a, c) {
            return $.get(a, b, c, "script")
        },
        getJSON: function (a, b, c) {
            return $.get(a, b, c, "json")
        },
        ajaxSetup: function (a, b) {
            return b ? A(a, $.ajaxSettings) : (b = a, a = $.ajaxSettings), A(a, b), a
        },
        ajaxSettings: {
            url: zc,
            isLocal: Cc.test(yc[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Mc
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText"},
            converters: {"* text": a.String, "text html": !0, "text json": $.parseJSON, "text xml": $.parseXML},
            flatOptions: {context: !0, url: !0}
        },
        ajaxPrefilter: y(Kc),
        ajaxTransport: y(Lc),
        ajax: function (a, c) {
            function d(a, c, d, g) {
                var j, l, s, t, v, x = c;
                2 !== u && (u = 2, i && clearTimeout(i), h = b, f = g || "", w.readyState = a > 0 ? 4 : 0, d && (t = B(m, w, d)), a >= 200 && 300 > a || 304 === a ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && ($.lastModified[e] = v), v = w.getResponseHeader("Etag"), v && ($.etag[e] = v)), 304 === a ? (x = "notmodified", j = !0) : (j = C(m, t), x = j.state, l = j.data, s = j.error, j = !s)) : (s = x, (!x || a) && (x = "error", 0 > a && (a = 0))), w.status = a, w.statusText = (c || x) + "", j ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = b, k && o.trigger("ajax" + (j ? "Success" : "Error"), [w, m, j ? l : s]), q.fireWith(n, [w, x]), k && (o.trigger("ajaxComplete", [w, m]), --$.active || $.event.trigger("ajaxStop")))
            }

            "object" == typeof a && (c = a, a = b), c = c || {};
            var e, f, g, h, i, j, k, l, m = $.ajaxSetup({}, c), n = m.context || m, o = n !== m && (n.nodeType || n instanceof $) ? $(n) : $.event, p = $.Deferred(), q = $.Callbacks("once memory"), r = m.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {
                readyState: 0,
                setRequestHeader: function (a, b) {
                    if (!u) {
                        var c = a.toLowerCase();
                        a = t[c] = t[c] || a, s[a] = b
                    }
                    return this
                },
                getAllResponseHeaders: function () {
                    return 2 === u ? f : null
                },
                getResponseHeader: function (a) {
                    var c;
                    if (2 === u) {
                        if (!g)for (g = {}; c = Bc.exec(f);)g[c[1].toLowerCase()] = c[2];
                        c = g[a.toLowerCase()]
                    }
                    return c === b ? null : c
                },
                overrideMimeType: function (a) {
                    return u || (m.mimeType = a), this
                },
                abort: function (a) {
                    return a = a || v, h && h.abort(a), d(0, a), this
                }
            };
            if (p.promise(w), w.success = w.done, w.error = w.fail, w.complete = q.add, w.statusCode = function (a) {
                    if (a) {
                        var b;
                        if (2 > u)for (b in a)r[b] = [r[b], a[b]]; else b = a[w.status], w.always(b)
                    }
                    return this
                }, m.url = ((a || m.url) + "").replace(Ac, "").replace(Ec, yc[1] + "//"), m.dataTypes = $.trim(m.dataType || "*").toLowerCase().split(bb), null == m.crossDomain && (j = Ic.exec(m.url.toLowerCase()), m.crossDomain = !(!j || j[1] === yc[1] && j[2] === yc[2] && (j[3] || ("http:" === j[1] ? 80 : 443)) == (yc[3] || ("http:" === yc[1] ? 80 : 443)))), m.data && m.processData && "string" != typeof m.data && (m.data = $.param(m.data, m.traditional)), z(Kc, m, c, w), 2 === u)return w;
            if (k = m.global, m.type = m.type.toUpperCase(), m.hasContent = !Dc.test(m.type), k && 0 === $.active++ && $.event.trigger("ajaxStart"), !m.hasContent && (m.data && (m.url += (Fc.test(m.url) ? "&" : "?") + m.data, delete m.data), e = m.url, m.cache === !1)) {
                var x = $.now(), y = m.url.replace(Hc, "$1_=" + x);
                m.url = y + (y === m.url ? (Fc.test(m.url) ? "&" : "?") + "_=" + x : "")
            }
            (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), m.ifModified && (e = e || m.url, $.lastModified[e] && w.setRequestHeader("If-Modified-Since", $.lastModified[e]), $.etag[e] && w.setRequestHeader("If-None-Match", $.etag[e])), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Mc + "; q=0.01" : "") : m.accepts["*"]);
            for (l in m.headers)w.setRequestHeader(l, m.headers[l]);
            if (m.beforeSend && (m.beforeSend.call(n, w, m) === !1 || 2 === u))return w.abort();
            v = "abort";
            for (l in{success: 1, error: 1, complete: 1})w[l](m[l]);
            if (h = z(Lc, m, c, w)) {
                w.readyState = 1, k && o.trigger("ajaxSend", [w, m]), m.async && m.timeout > 0 && (i = setTimeout(function () {
                    w.abort("timeout")
                }, m.timeout));
                try {
                    u = 1, h.send(s, d)
                } catch (A) {
                    if (!(2 > u))throw A;
                    d(-1, A)
                }
            } else d(-1, "No Transport");
            return w
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var Oc = [], Pc = /\?/, Qc = /(=)\?(?=&|$)|\?\?/, Rc = $.now();
    $.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var a = Oc.pop() || $.expando + "_" + Rc++;
            return this[a] = !0, a
        }
    }), $.ajaxPrefilter("json jsonp", function (c, d, e) {
        var f, g, h, i = c.data, j = c.url, k = c.jsonp !== !1, l = k && Qc.test(j), m = k && !l && "string" == typeof i && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Qc.test(i);
        return "jsonp" === c.dataTypes[0] || l || m ? (f = c.jsonpCallback = $.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, g = a[f], l ? c.url = j.replace(Qc, "$1" + f) : m ? c.data = i.replace(Qc, "$1" + f) : k && (c.url += (Pc.test(j) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function () {
            return h || $.error(f + " was not called"), h[0]
        }, c.dataTypes[0] = "json", a[f] = function () {
            h = arguments
        }, e.always(function () {
            a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, Oc.push(f)), h && $.isFunction(g) && g(h[0]), h = g = b
        }), "script") : void 0
    }), $.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /javascript|ecmascript/},
        converters: {
            "text script": function (a) {
                return $.globalEval(a), a
            }
        }
    }), $.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), $.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var c, d = P.head || P.getElementsByTagName("head")[0] || P.documentElement;
            return {
                send: function (e, f) {
                    c = P.createElement("script"), c.async = "async", a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function (a, e) {
                        (e || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || f(200, "success"))
                    }, d.insertBefore(c, d.firstChild)
                }, abort: function () {
                    c && c.onload(0, 1)
                }
            }
        }
    });
    var Sc, Tc = a.ActiveXObject ? function () {
        for (var a in Sc)Sc[a](0, 1)
    } : !1, Uc = 0;
    $.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return !this.isLocal && D() || E()
    } : D, function (a) {
        $.extend($.support, {ajax: !!a, cors: !!a && "withCredentials"in a})
    }($.ajaxSettings.xhr()), $.support.ajax && $.ajaxTransport(function (c) {
        if (!c.crossDomain || $.support.cors) {
            var d;
            return {
                send: function (e, f) {
                    var g, h, i = c.xhr();
                    if (c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async), c.xhrFields)for (h in c.xhrFields)i[h] = c.xhrFields[h];
                    c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), c.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (h in e)i.setRequestHeader(h, e[h])
                    } catch (j) {
                    }
                    i.send(c.hasContent && c.data || null), d = function (a, e) {
                        var h, j, k, l, m;
                        try {
                            if (d && (e || 4 === i.readyState))if (d = b, g && (i.onreadystatechange = $.noop, Tc && delete Sc[g]), e)4 !== i.readyState && i.abort(); else {
                                h = i.status, k = i.getAllResponseHeaders(), l = {}, m = i.responseXML, m && m.documentElement && (l.xml = m);
                                try {
                                    l.text = i.responseText
                                } catch (n) {
                                }
                                try {
                                    j = i.statusText
                                } catch (n) {
                                    j = ""
                                }
                                h || !c.isLocal || c.crossDomain ? 1223 === h && (h = 204) : h = l.text ? 200 : 404
                            }
                        } catch (o) {
                            e || f(-1, o)
                        }
                        l && f(h, j, l, k)
                    }, c.async ? 4 === i.readyState ? setTimeout(d, 0) : (g = ++Uc, Tc && (Sc || (Sc = {}, $(a).unload(Tc)), Sc[g] = d), i.onreadystatechange = d) : d()
                }, abort: function () {
                    d && d(0, 1)
                }
            }
        }
    });
    var Vc, Wc, Xc = /^(?:toggle|show|hide)$/, Yc = new RegExp("^(?:([-+])=|)(" + _ + ")([a-z%]*)$", "i"), Zc = /queueHooks$/, $c = [J], _c = {
        "*": [function (a, b) {
            var c, d, e = this.createTween(a, b), f = Yc.exec(b), g = e.cur(), h = +g || 0, i = 1, j = 20;
            if (f) {
                if (c = +f[2], d = f[3] || ($.cssNumber[a] ? "" : "px"), "px" !== d && h) {
                    h = $.css(e.elem, a, !0) || c || 1;
                    do i = i || ".5", h /= i, $.style(e.elem, a, h + d); while (i !== (i = e.cur() / g) && 1 !== i && --j)
                }
                e.unit = d, e.start = h, e.end = f[1] ? h + (f[1] + 1) * c : c
            }
            return e
        }]
    };
    $.Animation = $.extend(H, {
        tweener: function (a, b) {
            $.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++)c = a[d], _c[c] = _c[c] || [], _c[c].unshift(b)
        }, prefilter: function (a, b) {
            b ? $c.unshift(a) : $c.push(a)
        }
    }), $.Tween = K, K.prototype = {
        constructor: K, init: function (a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || ($.cssNumber[c] ? "" : "px")
        }, cur: function () {
            var a = K.propHooks[this.prop];
            return a && a.get ? a.get(this) : K.propHooks._default.get(this)
        }, run: function (a) {
            var b, c = K.propHooks[this.prop];
            return this.pos = b = this.options.duration ? $.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : K.propHooks._default.set(this), this
        }
    }, K.prototype.init.prototype = K.prototype, K.propHooks = {
        _default: {
            get: function (a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = $.css(a.elem, a.prop, !1, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            }, set: function (a) {
                $.fx.step[a.prop] ? $.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[$.cssProps[a.prop]] || $.cssHooks[a.prop]) ? $.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, K.propHooks.scrollTop = K.propHooks.scrollLeft = {
        set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, $.each(["toggle", "show", "hide"], function (a, b) {
        var c = $.fn[b];
        $.fn[b] = function (d, e, f) {
            return null == d || "boolean" == typeof d || !a && $.isFunction(d) && $.isFunction(e) ? c.apply(this, arguments) : this.animate(L(b, !0), d, e, f)
        }
    }), $.fn.extend({
        fadeTo: function (a, b, c, d) {
            return this.filter(r).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        }, animate: function (a, b, c, d) {
            var e = $.isEmptyObject(a), f = $.speed(b, c, d), g = function () {
                var b = H(this, $.extend({}, a), f);
                e && b.stop(!0)
            };
            return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        }, stop: function (a, c, d) {
            var e = function (a) {
                var b = a.stop;
                delete a.stop, b(d)
            };
            return "string" != typeof a && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                var b = !0, c = null != a && a + "queueHooks", f = $.timers, g = $._data(this);
                if (c)g[c] && g[c].stop && e(g[c]); else for (c in g)g[c] && g[c].stop && Zc.test(c) && e(g[c]);
                for (c = f.length; c--;)f[c].elem !== this || null != a && f[c].queue !== a || (f[c].anim.stop(d), b = !1, f.splice(c, 1));
                (b || !d) && $.dequeue(this, a)
            })
        }
    }), $.each({
        slideDown: L("show"),
        slideUp: L("hide"),
        slideToggle: L("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        $.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), $.speed = function (a, b, c) {
        var d = a && "object" == typeof a ? $.extend({}, a) : {
            complete: c || !c && b || $.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !$.isFunction(b) && b
        };
        return d.duration = $.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in $.fx.speeds ? $.fx.speeds[d.duration] : $.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
            $.isFunction(d.old) && d.old.call(this), d.queue && $.dequeue(this, d.queue)
        }, d
    }, $.easing = {
        linear: function (a) {
            return a
        }, swing: function (a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, $.timers = [], $.fx = K.prototype.init, $.fx.tick = function () {
        var a, c = $.timers, d = 0;
        for (Vc = $.now(); d < c.length; d++)a = c[d], a() || c[d] !== a || c.splice(d--, 1);
        c.length || $.fx.stop(), Vc = b
    }, $.fx.timer = function (a) {
        a() && $.timers.push(a) && !Wc && (Wc = setInterval($.fx.tick, $.fx.interval))
    }, $.fx.interval = 13, $.fx.stop = function () {
        clearInterval(Wc), Wc = null
    }, $.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, $.fx.step = {}, $.expr && $.expr.filters && ($.expr.filters.animated = function (a) {
        return $.grep($.timers, function (b) {
            return a === b.elem
        }).length
    });
    var ad = /^(?:body|html)$/i;
    $.fn.offset = function (a) {
        if (arguments.length)return a === b ? this : this.each(function (b) {
            $.offset.setOffset(this, a, b)
        });
        var c, d, e, f, g, h, i, j = {top: 0, left: 0}, k = this[0], l = k && k.ownerDocument;
        if (l)return (d = l.body) === k ? $.offset.bodyOffset(k) : (c = l.documentElement, $.contains(c, k) ? ("undefined" != typeof k.getBoundingClientRect && (j = k.getBoundingClientRect()), e = M(l), f = c.clientTop || d.clientTop || 0, g = c.clientLeft || d.clientLeft || 0, h = e.pageYOffset || c.scrollTop, i = e.pageXOffset || c.scrollLeft, {
            top: j.top + h - f,
            left: j.left + i - g
        }) : j)
    }, $.offset = {
        bodyOffset: function (a) {
            var b = a.offsetTop, c = a.offsetLeft;
            return $.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat($.css(a, "marginTop")) || 0, c += parseFloat($.css(a, "marginLeft")) || 0), {
                top: b,
                left: c
            }
        }, setOffset: function (a, b, c) {
            var d = $.css(a, "position");
            "static" === d && (a.style.position = "relative");
            var e, f, g = $(a), h = g.offset(), i = $.css(a, "top"), j = $.css(a, "left"), k = ("absolute" === d || "fixed" === d) && $.inArray("auto", [i, j]) > -1, l = {}, m = {};
            k ? (m = g.position(), e = m.top, f = m.left) : (e = parseFloat(i) || 0, f = parseFloat(j) || 0), $.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (l.top = b.top - h.top + e), null != b.left && (l.left = b.left - h.left + f), "using"in b ? b.using.call(a, l) : g.css(l)
        }
    }, $.fn.extend({
        position: function () {
            if (this[0]) {
                var a = this[0], b = this.offsetParent(), c = this.offset(), d = ad.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
                return c.top -= parseFloat($.css(a, "marginTop")) || 0, c.left -= parseFloat($.css(a, "marginLeft")) || 0, d.top += parseFloat($.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat($.css(b[0], "borderLeftWidth")) || 0, {
                    top: c.top - d.top,
                    left: c.left - d.left
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var a = this.offsetParent || P.body; a && !ad.test(a.nodeName) && "static" === $.css(a, "position");)a = a.offsetParent;
                return a || P.body
            })
        }
    }), $.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, c) {
        var d = /Y/.test(c);
        $.fn[a] = function (e) {
            return $.access(this, function (a, e, f) {
                var g = M(a);
                return f === b ? g ? c in g ? g[c] : g.document.documentElement[e] : a[e] : void(g ? g.scrollTo(d ? $(g).scrollLeft() : f, d ? f : $(g).scrollTop()) : a[e] = f)
            }, a, e, arguments.length, null)
        }
    }), $.each({Height: "height", Width: "width"}, function (a, c) {
        $.each({padding: "inner" + a, content: c, "": "outer" + a}, function (d, e) {
            $.fn[e] = function (e, f) {
                var g = arguments.length && (d || "boolean" != typeof e), h = d || (e === !0 || f === !0 ? "margin" : "border");
                return $.access(this, function (c, d, e) {
                    var f;
                    return $.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? $.css(c, d, e, h) : $.style(c, d, e, h)
                }, c, g ? e : b, g, null)
            }
        })
    }), a.jQuery = a.$ = $, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return $
    })
}(window), function (a, b, c) {
    function d(a) {
        var b = {}, d = /^jQuery\d+$/;
        return c.each(a.attributes, function (a, c) {
            c.specified && !d.test(c.name) && (b[c.name] = c.value)
        }), b
    }

    function e(a, d) {
        var e = this, f = c(e);
        if (e.value == f.attr("placeholder") && f.hasClass("placeholder"))if (f.data("placeholder-password")) {
            if (f = f.hide().next().show().attr("id", f.removeAttr("id").data("placeholder-id")), a === !0)return f[0].value = d;
            f.focus()
        } else e.value = "", f.removeClass("placeholder"), e == b.activeElement && e.select()
    }

    function f() {
        var a, b = this, f = c(b), g = this.id;
        if ("" == b.value) {
            if ("password" == b.type) {
                if (!f.data("placeholder-textinput")) {
                    try {
                        a = f.clone().attr({type: "text"})
                    } catch (h) {
                        a = c("<input>").attr(c.extend(d(this), {type: "text"}))
                    }
                    a.removeAttr("name").data({
                        "placeholder-password": f,
                        "placeholder-id": g
                    }).bind("focus.placeholder", e), f.data({"placeholder-textinput": a, "placeholder-id": g}).before(a)
                }
                f = f.removeAttr("id").hide().prev().attr("id", g).show()
            }
            f.addClass("placeholder"), f[0].value = f.attr("placeholder")
        } else f.removeClass("placeholder")
    }

    var g, h, i = "placeholder"in b.createElement("input"), j = "placeholder"in b.createElement("textarea"), k = c.fn, l = c.valHooks, m = c.propHooks;
    i && j ? (h = k.placeholder = function () {
        return this
    }, h.input = h.textarea = !0) : (h = k.placeholder = function () {
        var a = this;
        return a.filter((i ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
            "focus.placeholder": e,
            "blur.placeholder": f
        }).data("placeholder-enabled", !0).trigger("blur.placeholder"), a
    }, h.input = i, h.textarea = j, g = {
        get: function (a) {
            var b = c(a), d = b.data("placeholder-password");
            return d ? d[0].value : b.data("placeholder-enabled") && b.hasClass("placeholder") ? "" : a.value
        }, set: function (a, d) {
            var g = c(a), h = g.data("placeholder-password");
            return h ? h[0].value = d : g.data("placeholder-enabled") ? ("" == d ? (a.value = d, a != b.activeElement && f.call(a)) : g.hasClass("placeholder") ? e.call(a, !0, d) || (a.value = d) : a.value = d, g) : a.value = d
        }
    }, i || (l.input = g, m.value = g), j || (l.textarea = g, m.value = g), c(function () {
        c(b).delegate("form", "submit.placeholder", function () {
            var a = c(".placeholder", this).each(e);
            setTimeout(function () {
                a.each(f)
            }, 10)
        })
    }), c(a).bind("beforeunload.placeholder", function () {
        c(".placeholder").each(function () {
            this.value = ""
        })
    }))
}(this, document, jQuery), function (a, b, c) {
    "use strict";
    a.map(["localStorage", "sessionStorage"], function (d) {
        var e = {
            cookiePrefix: "fallback:" + d + ":",
            cookieOptions: {path: "/", domain: c.domain, expires: "localStorage" === d ? {expires: 365} : void 0}
        };
        try {
            a.support[d] = d in b && null !== b[d]
        } catch (f) {
            a.support[d] = !1
        }
        a[d] = function (f, g) {
            var h = a.extend({}, e, a[d].options);
            return this.getItem = function (c) {
                var e = function (c) {
                    return JSON.parse(a.support[d] ? b[d].getItem(c) : a.cookie(h.cookiePrefix + c))
                };
                if ("string" == typeof c)return e(c);
                for (var f = [], g = c.length; g--;)f[g] = e(c[g]);
                return f
            }, this.setItem = function (c, e) {
                return e = JSON.stringify(e), a.support[d] ? b[d].setItem(c, e) : a.cookie(h.cookiePrefix + c, e, h.cookieOptions)
            }, this.removeItem = function (c) {
                return a.support[d] ? b[d].removeItem(c) : a.cookie(h.cookiePrefix + c, null, a.extend(h.cookieOptions, {expires: -1}))
            }, this.clear = function () {
                if (a.support[d])return b[d].clear();
                var e = new RegExp("^" + h.cookiePrefix, ""), f = a.extend(h.cookieOptions, {expires: -1});
                c.cookie && "" !== c.cookie && a.map(c.cookie.split(";"), function (b) {
                    e.test(b = a.trim(b)) && a.cookie(b.substr(0, b.indexOf("=")), null, f)
                })
            }, "undefined" != typeof f ? "undefined" != typeof g ? null === g ? this.removeItem(f) : this.setItem(f, g) : this.getItem(f) : this
        }, a[d].options = e
    })
}(jQuery, window, document), function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function (a) {
    function b(a) {
        return h.raw ? a : encodeURIComponent(a)
    }

    function c(a) {
        return h.raw ? a : decodeURIComponent(a)
    }

    function d(a) {
        return b(h.json ? JSON.stringify(a) : String(a))
    }

    function e(a) {
        0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return a = decodeURIComponent(a.replace(g, " ")), h.json ? JSON.parse(a) : a
        } catch (b) {
        }
    }

    function f(b, c) {
        var d = h.raw ? b : e(b);
        return a.isFunction(c) ? c(d) : d
    }

    var g = /\+/g, h = a.cookie = function (e, g, i) {
        if (arguments.length > 1 && !a.isFunction(g)) {
            if (i = a.extend({}, h.defaults, i), "number" == typeof i.expires) {
                var j = i.expires, k = i.expires = new Date;
                k.setTime(+k + 864e5 * j)
            }
            return document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
        }
        for (var l = e ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; o > n; n++) {
            var p = m[n].split("="), q = c(p.shift()), r = p.join("=");
            if (e && e === q) {
                l = f(r, g);
                break
            }
            e || void 0 === (r = f(r)) || (l[q] = r)
        }
        return l
    };
    h.defaults = {}, a.removeCookie = function (b, c) {
        return void 0 === a.cookie(b) ? !1 : (a.cookie(b, "", a.extend({}, c, {expires: -1})), !a.cookie(b))
    }
}), !function (a) {
    "use strict";
    a(function () {
        a.support.transition = function () {
            var a = function () {
                var a, b = document.createElement("bootstrap"), c = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                for (a in c)if (void 0 !== b.style[a])return c[a]
            }();
            return a && {end: a}
        }()
    })
}(window.jQuery), !function (a) {
    "use strict";
    var b = '[data-dismiss="alert"]', c = function (c) {
        a(c).on("click", b, this.close)
    };
    c.prototype.close = function (b) {
        function c() {
            d.trigger("closed").remove()
        }

        var d, e = a(this), f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, "")), d = a(f), b && b.preventDefault(), d.length || (d = e.hasClass("alert") ? e : e.parent()), d.trigger(b = a.Event("close")), b.isDefaultPrevented() || (d.removeClass("in"), a.support.transition && d.hasClass("fade") ? d.on(a.support.transition.end, c) : c())
    };
    var d = a.fn.alert;
    a.fn.alert = function (b) {
        return this.each(function () {
            var d = a(this), e = d.data("alert");
            e || d.data("alert", e = new c(this)), "string" == typeof b && e[b].call(d)
        })
    }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function () {
        return a.fn.alert = d, this
    }, a(document).on("click.alert.data-api", b, c.prototype.close)
}(window.jQuery), !function (a) {
    "use strict";
    var b = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.button.defaults, c)
    };
    b.prototype.setState = function (a) {
        var b = "disabled", c = this.$element, d = c.data(), e = c.is("input") ? "val" : "html";
        a += "Text", d.resetText || c.data("resetText", c[e]()), c[e](d[a] || this.options[a]), setTimeout(function () {
            "loadingText" == a ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b)
        }, 0)
    }, b.prototype.toggle = function () {
        var a = this.$element.closest('[data-toggle="buttons-radio"]');
        a && a.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var c = a.fn.button;
    a.fn.button = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("button"), f = "object" == typeof c && c;
            e || d.data("button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c)
        })
    }, a.fn.button.defaults = {loadingText: "loading..."}, a.fn.button.Constructor = b, a.fn.button.noConflict = function () {
        return a.fn.button = c, this
    }, a(document).on("click.button.data-api", "[data-toggle^=button]", function (b) {
        var c = a(b.target);
        c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle")
    })
}(window.jQuery), !function (a) {
    "use strict";
    var b = function (b, c) {
        this.$element = a(b), this.options = c, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
    };
    b.prototype = {
        cycle: function (b) {
            return b || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
        }, to: function (b) {
            var c = this.$element.find(".item.active"), d = c.parent().children(), e = d.index(c), f = this;
            if (!(b > d.length - 1 || 0 > b))return this.sliding ? this.$element.one("slid", function () {
                f.to(b)
            }) : e == b ? this.pause().cycle() : this.slide(b > e ? "next" : "prev", a(d[b]))
        }, pause: function (b) {
            return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle()), clearInterval(this.interval), this.interval = null, this
        }, next: function () {
            return this.sliding ? void 0 : this.slide("next")
        }, prev: function () {
            return this.sliding ? void 0 : this.slide("prev")
        }, slide: function (b, c) {
            var d, e = this.$element.find(".item.active"), f = c || e[b](), g = this.interval, h = "next" == b ? "left" : "right", i = "next" == b ? "first" : "last", j = this;
            if (this.sliding = !0, g && this.pause(), f = f.length ? f : this.$element.find(".item")[i](), d = a.Event("slide", {relatedTarget: f[0]}), !f.hasClass("active")) {
                if (a.support.transition && this.$element.hasClass("slide")) {
                    if (this.$element.trigger(d), d.isDefaultPrevented())return;
                    f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), this.$element.one(a.support.transition.end, function () {
                        f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), j.sliding = !1, setTimeout(function () {
                            j.$element.trigger("slid")
                        }, 0)
                    })
                } else {
                    if (this.$element.trigger(d), d.isDefaultPrevented())return;
                    e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
                }
                return g && this.cycle(), this
            }
        }
    };
    var c = a.fn.carousel;
    a.fn.carousel = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("carousel"), f = a.extend({}, a.fn.carousel.defaults, "object" == typeof c && c), g = "string" == typeof c ? c : f.slide;
            e || d.data("carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.cycle()
        })
    }, a.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = c, this
    }, a(document).on("click.carousel.data-api", "[data-slide]", function (b) {
        var c, d = a(this), e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")), f = a.extend({}, e.data(), d.data());
        e.carousel(f), b.preventDefault()
    })
}(window.jQuery), !function (a) {
    "use strict";
    var b = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.collapse.defaults, c), this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    b.prototype = {
        constructor: b, dimension: function () {
            var a = this.$element.hasClass("width");
            return a ? "width" : "height"
        }, show: function () {
            var b, c, d, e;
            if (!this.transitioning) {
                if (b = this.dimension(), c = a.camelCase(["scroll", b].join("-")), d = this.$parent && this.$parent.find("> .accordion-group > .in"), d && d.length) {
                    if (e = d.data("collapse"), e && e.transitioning)return;
                    d.collapse("hide"), e || d.data("collapse", null)
                }
                this.$element[b](0), this.transition("addClass", a.Event("show"), "shown"), a.support.transition && this.$element[b](this.$element[0][c])
            }
        }, hide: function () {
            var b;
            this.transitioning || (b = this.dimension(), this.reset(this.$element[b]()), this.transition("removeClass", a.Event("hide"), "hidden"), this.$element[b](0))
        }, reset: function (a) {
            var b = this.dimension();
            return this.$element.removeClass("collapse")[b](a || "auto")[0].offsetWidth, this.$element[null !== a ? "addClass" : "removeClass"]("collapse"), this
        }, transition: function (b, c, d) {
            var e = this, f = function () {
                "show" == c.type && e.reset(), e.transitioning = 0, e.$element.trigger(d)
            };
            this.$element.trigger(c), c.isDefaultPrevented() || (this.transitioning = 1, this.$element[b]("in"), a.support.transition && this.$element.hasClass("collapse") ? this.$element.one(a.support.transition.end, f) : f())
        }, toggle: function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    };
    var c = a.fn.collapse;
    a.fn.collapse = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("collapse"), f = "object" == typeof c && c;
            e || d.data("collapse", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.collapse.defaults = {toggle: !0}, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = c, this
    }, a(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (b) {
        var c, d = a(this), e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""), f = a(e).data("collapse") ? "toggle" : d.data();
        d[a(e).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), a(e).collapse(f)
    })
}(window.jQuery), !function (a) {
    "use strict";
    function b() {
        a(d).each(function () {
            var b = c(a(this)), d = b.hasClass("open");
            d && b.trigger("hide"), b.removeClass("open")
        })
    }

    function c(b) {
        var c, d = b.attr("data-target");
        return d || (d = b.attr("href"), d = d && /#/.test(d) && d.replace(/.*(?=#[^\s]*$)/, "")), c = a(d), c.length || (c = b.parent()), c
    }

    var d = "[data-toggle=dropdown]", e = function (b) {
        var c = a(b).on("click.dropdown.data-api", this.toggle);
        a("html").on("click.dropdown.data-api", function () {
            c.parent().trigger("hide"), c.parent().removeClass("open")
        })
    };
    e.prototype = {
        constructor: e, toggle: function () {
            var d, e, f = a(this);
            if (!f.is(".disabled, :disabled"))return d = c(f), e = d.hasClass("open"), b(), e || (d.toggleClass("open"), d.trigger("show")), f.focus(), !1
        }, keydown: function (b) {
            var d, e, f, g, h;
            if (/(38|40|27)/.test(b.keyCode) && (d = a(this), b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled"))) {
                if (f = c(d), g = f.hasClass("open"), !g || g && 27 == b.keyCode)return d.click();
                e = a("[role=menu] li:not(.divider):visible a", f), e.length && (h = e.index(e.filter(":focus")), 38 == b.keyCode && h > 0 && h--, 40 == b.keyCode && h < e.length - 1 && h++, ~h || (h = 0), e.eq(h).focus())
            }
        }
    };
    var f = a.fn.dropdown;
    a.fn.dropdown = function (b) {
        return this.each(function () {
            var c = a(this), d = c.data("dropdown");
            d || c.data("dropdown", d = new e(this)), "string" == typeof b && d[b].call(c)
        })
    }, a.fn.dropdown.Constructor = e, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = f, this
    }, a(document).on("click.dropdown.data-api touchstart.dropdown.data-api", b).on("click.dropdown touchstart.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation()
    }).on("touchstart.dropdown.data-api", ".dropdown-menu", function (a) {
        a.stopPropagation()
    }).on("click.dropdown.data-api touchstart.dropdown.data-api", d, e.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", d + ", [role=menu]", e.prototype.keydown)
}(window.jQuery), !function (a) {
    "use strict";
    var b = function (b, c) {
        this.options = c, this.$element = a(b).delegate('[data-dismiss="modal"]', "click.dismiss.modal", a.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    b.prototype = {
        constructor: b, toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        }, show: function () {
            var b = this, c = a.Event("show");
            this.$element.trigger(c), this.isShown || c.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function () {
                var c = a.support.transition && b.$element.hasClass("fade");
                b.$element.parent().length || b.$element.appendTo(document.body), b.$element.show(), c && b.$element[0].offsetWidth, b.$element.addClass("in").attr("aria-hidden", !1), b.enforceFocus(), c ? b.$element.one(a.support.transition.end, function () {
                    b.$element.focus().trigger("shown")
                }) : b.$element.focus().trigger("shown")
            }))
        }, hide: function (b) {
            b && b.preventDefault();
            b = a.Event("hide"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), a.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        }, enforceFocus: function () {
            var b = this;
            a(document).on("focusin.modal", function (a) {
                b.$element[0] === a.target || b.$element.has(a.target).length || b.$element.focus()
            })
        }, escape: function () {
            var a = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (b) {
                27 == b.which && a.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        }, hideWithTransition: function () {
            var b = this, c = setTimeout(function () {
                b.$element.off(a.support.transition.end), b.hideModal()
            }, 500);
            this.$element.one(a.support.transition.end, function () {
                clearTimeout(c), b.hideModal()
            })
        }, hideModal: function () {
            this.$element.hide().trigger("hidden"), this.backdrop()
        }, removeBackdrop: function () {
            this.$backdrop.remove(), this.$backdrop = null
        }, backdrop: function (b) {
            var c = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var d = a.support.transition && c;
                this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? a.proxy(this.$element[0].focus, this.$element[0]) : a.proxy(this.hide, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), d ? this.$backdrop.one(a.support.transition.end, b) : b()
            } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, a.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : b && b()
        }
    };
    var c = a.fn.modal;
    a.fn.modal = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("modal"), f = a.extend({}, a.fn.modal.defaults, d.data(), "object" == typeof c && c);
            e || d.data("modal", e = new b(this, f)), "string" == typeof c ? e[c]() : f.show && e.show()
        })
    }, a.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function () {
        return a.fn.modal = c, this
    }, a(document).on("click.modal.data-api", '[data-toggle="modal"]', function (b) {
        var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({remote: !/#/.test(d) && d}, e.data(), c.data());
        b.preventDefault(), e.modal(f).one("hide", function () {
            c.focus()
        })
    })
}(window.jQuery), !function (a) {
    "use strict";
    var b = function (a, b) {
        this.init("tooltip", a, b)
    };
    b.prototype = {
        constructor: b, init: function (b, c, d) {
            var e, f;
            this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.enabled = !0, "click" == this.options.trigger ? this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)) : "manual" != this.options.trigger && (e = "hover" == this.options.trigger ? "mouseenter" : "focus", f = "hover" == this.options.trigger ? "mouseleave" : "blur", this.$element.on(e + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(f + "." + this.type, this.options.selector, a.proxy(this.leave, this))), this.options.selector ? this._options = a.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, getOptions: function (b) {
            return b = a.extend({}, a.fn[this.type].defaults, b, this.$element.data()), b.delay && "number" == typeof b.delay && (b.delay = {
                show: b.delay,
                hide: b.delay
            }), b
        }, enter: function (b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            return c.options.delay && c.options.delay.show ? (clearTimeout(this.timeout), c.hoverState = "in", void(this.timeout = setTimeout(function () {
                "in" == c.hoverState && c.show()
            }, c.options.delay.show))) : c.show()
        }, leave: function (b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), c.options.delay && c.options.delay.hide ? (c.hoverState = "out", void(this.timeout = setTimeout(function () {
                "out" == c.hoverState && c.hide()
            }, c.options.delay.hide))) : c.hide()
        }, show: function () {
            var a, b, c, d, e, f, g;
            if (this.hasContent() && this.enabled) {
                switch (a = this.tip(), this.setContent(), this.options.animation && a.addClass("fade"), f = "function" == typeof this.options.placement ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement, b = /in/.test(f), a.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).insertAfter(this.$element), c = this.getPosition(b), d = a[0].offsetWidth, e = a[0].offsetHeight, b ? f.split(" ")[1] : f) {
                    case"bottom":
                        g = {top: c.top + c.height, left: c.left + c.width / 2 - d / 2};
                        break;
                    case"top":
                        g = {top: c.top - e, left: c.left + c.width / 2 - d / 2};
                        break;
                    case"left":
                        g = {top: c.top + c.height / 2 - e / 2, left: c.left - d};
                        break;
                    case"right":
                        g = {top: c.top + c.height / 2 - e / 2, left: c.left + c.width}
                }
                a.offset(g).addClass(f).addClass("in")
            }
        }, setContent: function () {
            var a = this.tip(), b = this.getTitle();
            a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
        }, hide: function () {
            function b() {
                var b = setTimeout(function () {
                    c.off(a.support.transition.end).detach()
                }, 500);
                c.one(a.support.transition.end, function () {
                    clearTimeout(b), c.detach()
                })
            }

            var c = this.tip();
            return c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? b() : c.detach(), this
        }, fixTitle: function () {
            var a = this.$element;
            (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").removeAttr("title")
        }, hasContent: function () {
            return this.getTitle()
        }, getPosition: function (b) {
            return a.extend({}, b ? {top: 0, left: 0} : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        }, getTitle: function () {
            var a, b = this.$element, c = this.options;
            return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
        }, tip: function () {
            return this.$tip = this.$tip || a(this.options.template)
        }, validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, enable: function () {
            this.enabled = !0
        }, disable: function () {
            this.enabled = !1
        }, toggleEnabled: function () {
            this.enabled = !this.enabled
        }, toggle: function (b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            c[c.tip().hasClass("in") ? "hide" : "show"]()
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var c = a.fn.tooltip;
    a.fn.tooltip = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("tooltip"), f = "object" == typeof c && c;
            e || d.data("tooltip", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0,
        html: !1
    }, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = c, this
    }
}(window.jQuery), !function (a) {
    "use strict";
    var b = function (a, b) {
        this.init("popover", a, b)
    };
    b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype, {
        constructor: b, setContent: function () {
            var a = this.tip(), b = this.getTitle(), c = this.getContent();
            a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in")
        }, hasContent: function () {
            return this.getTitle() || this.getContent()
        }, getContent: function () {
            var a, b = this.$element, c = this.options;
            return a = b.attr("data-content") || ("function" == typeof c.content ? c.content.call(b[0]) : c.content)
        }, tip: function () {
            return this.$tip || (this.$tip = a(this.options.template)), this.$tip
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    });
    var c = a.fn.popover;
    a.fn.popover = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("popover"), f = "object" == typeof c && c;
            e || d.data("popover", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.popover.Constructor = b, a.fn.popover.defaults = a.extend({}, a.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>'
    }), a.fn.popover.noConflict = function () {
        return a.fn.popover = c, this
    }
}(window.jQuery), !function (a) {
    "use strict";
    function b(b, c) {
        var d, e = a.proxy(this.process, this), f = a(a(b).is("body") ? window : b);
        this.options = a.extend({}, a.fn.scrollspy.defaults, c), this.$scrollElement = f.on("scroll.scroll-spy.data-api", e), this.selector = (this.options.target || (d = a(b).attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = a("body"), this.refresh(), this.process()
    }

    b.prototype = {
        constructor: b, refresh: function () {
            var b, c = this;
            this.offsets = a([]), this.targets = a([]), b = this.$body.find(this.selector).map(function () {
                var b = a(this), d = b.data("target") || b.attr("href"), e = /^#\w/.test(d) && a(d);
                return e && e.length && [[e.position().top + c.$scrollElement.scrollTop(), d]] || null
            }).sort(function (a, b) {
                return a[0] - b[0]
            }).each(function () {
                c.offsets.push(this[0]), c.targets.push(this[1])
            })
        }, process: function () {
            var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
            if (b >= d)return g != (a = f.last()[0]) && this.activate(a);
            for (a = e.length; a--;)g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
        }, activate: function (b) {
            var c, d;
            this.activeTarget = b, a(this.selector).parent(".active").removeClass("active"), d = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', c = a(d).parent("li").addClass("active"), c.parent(".dropdown-menu").length && (c = c.closest("li.dropdown").addClass("active")), c.trigger("activate")
        }
    };
    var c = a.fn.scrollspy;
    a.fn.scrollspy = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("scrollspy"), f = "object" == typeof c && c;
            e || d.data("scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.defaults = {offset: 10}, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = c, this
    }, a(window).on("load", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            b.scrollspy(b.data())
        })
    })
}(window.jQuery), !function (a) {
    "use strict";
    var b = function (b) {
        this.element = a(b)
    };
    b.prototype = {
        constructor: b, show: function () {
            var b, c, d, e = this.element, f = e.closest("ul:not(.dropdown-menu)"), g = e.attr("data-target");
            g || (g = e.attr("href"), g = g && g.replace(/.*(?=#[^\s]*$)/, "")), e.parent("li").hasClass("active") || (b = f.find(".active:last a")[0], d = a.Event("show", {relatedTarget: b}), e.trigger(d), d.isDefaultPrevented() || (c = a(g), this.activate(e.parent("li"), f), this.activate(c, c.parent(), function () {
                e.trigger({type: "shown", relatedTarget: b})
            })))
        }, activate: function (b, c, d) {
            function e() {
                f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
            }

            var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade");
            g ? f.one(a.support.transition.end, e) : e(), f.removeClass("in")
        }
    };
    var c = a.fn.tab;
    a.fn.tab = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("tab");
            e || d.data("tab", e = new b(this)), "string" == typeof c && e[c]()
        })
    }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function () {
        return a.fn.tab = c, this
    }, a(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) {
        b.preventDefault(), a(this).tab("show")
    })
}(window.jQuery), !function (a) {
    "use strict";
    var b = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.typeahead.defaults, c), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = a(this.options.menu), this.shown = !1, this.listen()
    };
    b.prototype = {
        constructor: b, select: function () {
            var a = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(a)).change(), this.hide()
        }, updater: function (a) {
            return a
        }, show: function () {
            var b = a.extend({}, this.$element.position(), {height: this.$element[0].offsetHeight});
            return this.$menu.insertAfter(this.$element).css({
                top: b.top + b.height,
                left: b.left
            }).show(), this.shown = !0, this
        }, hide: function () {
            return this.$menu.hide(), this.shown = !1, this
        }, lookup: function () {
            var b;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (b = a.isFunction(this.source) ? this.source(this.query, a.proxy(this.process, this)) : this.source, b ? this.process(b) : this)
        }, process: function (b) {
            var c = this;
            return b = a.grep(b, function (a) {
                return c.matcher(a)
            }), b = this.sorter(b), b.length ? this.render(b.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        }, matcher: function (a) {
            return ~a.toLowerCase().indexOf(this.query.toLowerCase())
        }, sorter: function (a) {
            for (var b, c = [], d = [], e = []; b = a.shift();)b.toLowerCase().indexOf(this.query.toLowerCase()) ? ~b.indexOf(this.query) ? d.push(b) : e.push(b) : c.push(b);
            return c.concat(d, e)
        }, highlighter: function (a) {
            var b = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return a.replace(new RegExp("(" + b + ")", "ig"), function (a, b) {
                return "<strong>" + b + "</strong>"
            })
        }, render: function (b) {
            var c = this;
            return b = a(b).map(function (b, d) {
                return b = a(c.options.item).attr("data-value", d), b.find("a").html(c.highlighter(d)), b[0]
            }), b.first().addClass("active"), this.$menu.html(b), this
        }, next: function () {
            var b = this.$menu.find(".active").removeClass("active"), c = b.next();
            c.length || (c = a(this.$menu.find("li")[0])), c.addClass("active")
        }, prev: function () {
            var a = this.$menu.find(".active").removeClass("active"), b = a.prev();
            b.length || (b = this.$menu.find("li").last()), b.addClass("active")
        }, listen: function () {
            this.$element.on("blur", a.proxy(this.blur, this)).on("keypress", a.proxy(this.keypress, this)).on("keyup", a.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", a.proxy(this.keydown, this)), this.$menu.on("click", a.proxy(this.click, this)).on("mouseenter", "li", a.proxy(this.mouseenter, this))
        }, eventSupported: function (a) {
            var b = a in this.$element;
            return b || (this.$element.setAttribute(a, "return;"), b = "function" == typeof this.$element[a]), b
        }, move: function (a) {
            if (this.shown) {
                switch (a.keyCode) {
                    case 9:
                    case 13:
                    case 27:
                        a.preventDefault();
                        break;
                    case 38:
                        a.preventDefault(), this.prev();
                        break;
                    case 40:
                        a.preventDefault(), this.next()
                }
                a.stopPropagation()
            }
        }, keydown: function (b) {
            this.suppressKeyPressRepeat = ~a.inArray(b.keyCode, [40, 38, 9, 13, 27]), this.move(b)
        }, keypress: function (a) {
            this.suppressKeyPressRepeat || this.move(a)
        }, keyup: function (a) {
            switch (a.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                case 13:
                    if (!this.shown)return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown)return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            a.stopPropagation(), a.preventDefault()
        }, blur: function () {
            var a = this;
            setTimeout(function () {
                a.hide()
            }, 150)
        }, click: function (a) {
            a.stopPropagation(), a.preventDefault(), this.select()
        }, mouseenter: function (b) {
            this.$menu.find(".active").removeClass("active"), a(b.currentTarget).addClass("active")
        }
    };
    var c = a.fn.typeahead;
    a.fn.typeahead = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("typeahead"), f = "object" == typeof c && c;
            e || d.data("typeahead", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, a.fn.typeahead.Constructor = b, a.fn.typeahead.noConflict = function () {
        return a.fn.typeahead = c, this
    }, a(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (b) {
        var c = a(this);
        c.data("typeahead") || (b.preventDefault(), c.typeahead(c.data()))
    })
}(window.jQuery), !function (a) {
    "use strict";
    var b = function (b, c) {
        this.options = a.extend({}, a.fn.affix.defaults, c), this.$window = a(window).on("scroll.affix.data-api", a.proxy(this.checkPosition, this)).on("click.affix.data-api", a.proxy(function () {
            setTimeout(a.proxy(this.checkPosition, this), 1)
        }, this)), this.$element = a(b), this.checkPosition()
    };
    b.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var b, c = a(document).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.bottom, h = f.top, i = "affix affix-top affix-bottom";
            "object" != typeof f && (g = h = f), "function" == typeof h && (h = f.top()), "function" == typeof g && (g = f.bottom()), b = null != this.unpin && d + this.unpin <= e.top ? !1 : null != g && e.top + this.$element.height() >= c - g ? "bottom" : null != h && h >= d ? "top" : !1, this.affixed !== b && (this.affixed = b, this.unpin = "bottom" == b ? e.top - d : null, this.$element.removeClass(i).addClass("affix" + (b ? "-" + b : "")))
        }
    };
    var c = a.fn.affix;
    a.fn.affix = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("affix"), f = "object" == typeof c && c;
            e || d.data("affix", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.affix.Constructor = b, a.fn.affix.defaults = {offset: 0}, a.fn.affix.noConflict = function () {
        return a.fn.affix = c, this
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var b = a(this), c = b.data();
            c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c)
        })
    })
}(window.jQuery), function (a, b) {
    var c = a();
    a.fn.dropdownHover = function (d) {
        return "ontouchstart"in document ? this : (c = c.add(this.parent()), this.each(function () {
            var e, f = a(this), g = f.parent(), h = {
                delay: 500,
                instantlyCloseOthers: !0
            }, i = {
                delay: a(this).data("delay"),
                instantlyCloseOthers: a(this).data("close-others")
            }, j = "show.bs.dropdown", k = "hide.bs.dropdown", l = a.extend(!0, {}, h, d, i);
            g.hover(function (a) {
                return g.hasClass("open") || f.is(a.target) ? (l.instantlyCloseOthers === !0 && c.removeClass("open"), b.clearTimeout(e), g.addClass("open"), void f.trigger(j)) : !0
            }, function () {
                e = b.setTimeout(function () {
                    g.removeClass("open"), f.trigger(k)
                }, l.delay)
            }), f.hover(function () {
                l.instantlyCloseOthers === !0 && c.removeClass("open"), b.clearTimeout(e), g.addClass("open"), f.trigger(j)
            }), g.find(".dropdown-submenu").each(function () {
                var c, d = a(this);
                d.hover(function () {
                    b.clearTimeout(c), d.children(".dropdown-menu").show(), d.siblings().children(".dropdown-menu").hide()
                }, function () {
                    var a = d.children(".dropdown-menu");
                    c = b.setTimeout(function () {
                        a.hide()
                    }, l.delay)
                })
            })
        }))
    }, a(document).ready(function () {
        a('[data-hover="dropdown"]').dropdownHover()
    })
}(jQuery, this), function () {
    Date.shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Date.longMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], Date.shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Date.longDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var a = {
        d: function () {
            return (this.getDate() < 10 ? "0" : "") + this.getDate()
        }, D: function () {
            return Date.shortDays[this.getDay()]
        }, j: function () {
            return this.getDate()
        }, l: function () {
            return Date.longDays[this.getDay()]
        }, N: function () {
            return 0 == this.getDay() ? 7 : this.getDay()
        }, S: function () {
            return this.getDate() % 10 == 1 && 11 != this.getDate() ? "st" : this.getDate() % 10 == 2 && 12 != this.getDate() ? "nd" : this.getDate() % 10 == 3 && 13 != this.getDate() ? "rd" : "th"
        }, w: function () {
            return this.getDay()
        }, z: function () {
            var a = new Date(this.getFullYear(), 0, 1);
            return Math.ceil((this - a) / 864e5)
        }, W: function () {
            var a = new Date(this.valueOf()), b = (this.getDay() + 6) % 7;
            a.setDate(a.getDate() - b + 3);
            var c = a.valueOf();
            return a.setMonth(0, 1), 4 !== a.getDay() && a.setMonth(0, 1 + (4 - a.getDay() + 7) % 7), 1 + Math.ceil((c - a) / 6048e5)
        }, F: function () {
            return Date.longMonths[this.getMonth()]
        }, m: function () {
            return (this.getMonth() < 9 ? "0" : "") + (this.getMonth() + 1)
        }, M: function () {
            return Date.shortMonths[this.getMonth()]
        }, n: function () {
            return this.getMonth() + 1
        }, t: function () {
            var a = new Date;
            return new Date(a.getFullYear(), a.getMonth(), 0).getDate()
        }, L: function () {
            var a = this.getFullYear();
            return a % 400 == 0 || a % 100 != 0 && a % 4 == 0
        }, o: function () {
            var a = new Date(this.valueOf());
            return a.setDate(a.getDate() - (this.getDay() + 6) % 7 + 3), a.getFullYear()
        }, Y: function () {
            return this.getFullYear()
        }, y: function () {
            return ("" + this.getFullYear()).substr(2)
        }, a: function () {
            return this.getHours() < 12 ? "am" : "pm"
        }, A: function () {
            return this.getHours() < 12 ? "AM" : "PM"
        }, B: function () {
            return Math.floor(1e3 * ((this.getUTCHours() + 1) % 24 + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) / 24)
        }, g: function () {
            return this.getHours() % 12 || 12
        }, G: function () {
            return this.getHours()
        }, h: function () {
            return ((this.getHours() % 12 || 12) < 10 ? "0" : "") + (this.getHours() % 12 || 12)
        }, H: function () {
            return (this.getHours() < 10 ? "0" : "") + this.getHours()
        }, i: function () {
            return (this.getMinutes() < 10 ? "0" : "") + this.getMinutes()
        }, s: function () {
            return (this.getSeconds() < 10 ? "0" : "") + this.getSeconds()
        }, u: function () {
            var a = this.getMilliseconds();
            return (10 > a ? "00" : 100 > a ? "0" : "") + a
        }, e: function () {
            return "Not Yet Supported"
        }, I: function () {
            for (var a = null, b = 0; 12 > b; ++b) {
                var c = new Date(this.getFullYear(), b, 1), d = c.getTimezoneOffset();
                if (null === a)a = d; else {
                    if (a > d) {
                        a = d;
                        break
                    }
                    if (d > a)break
                }
            }
            return this.getTimezoneOffset() == a | 0
        }, O: function () {
            return (-this.getTimezoneOffset() < 0 ? "-" : "+") + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? "0" : "") + Math.abs(this.getTimezoneOffset() / 60) + "00"
        }, P: function () {
            return (-this.getTimezoneOffset() < 0 ? "-" : "+") + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? "0" : "") + Math.abs(this.getTimezoneOffset() / 60) + ":00"
        }, T: function () {
            return this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, "$1")
        }, Z: function () {
            return 60 * -this.getTimezoneOffset()
        }, c: function () {
            return this.format("Y-m-d\\TH:i:sP")
        }, r: function () {
            return this.toString()
        }, U: function () {
            return this.getTime() / 1e3
        }
    };
    Date.prototype.format = function (b) {
        var c = this;
        return b.replace(/(\\?)(.)/g, function (b, d, e) {
            return "" === d && a[e] ? a[e].call(c) : e
        })
    }
}.call(this), !function () {
    var a = null;
    window.PR_SHOULD_USE_CONTINUATION = !0, function () {
        function b(a) {
            function b(a) {
                var b = a.charCodeAt(0);
                if (92 !== b)return b;
                var c = a.charAt(1);
                return (b = l[c]) ? b : c >= "0" && "7" >= c ? parseInt(a.substring(1), 8) : "u" === c || "x" === c ? parseInt(a.substring(2), 16) : a.charCodeAt(1)
            }

            function c(a) {
                return 32 > a ? (16 > a ? "\\x0" : "\\x") + a.toString(16) : (a = String.fromCharCode(a), "\\" === a || "-" === a || "]" === a || "^" === a ? "\\" + a : a)
            }

            function d(a) {
                var d = a.substring(1, a.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g), a = [], e = "^" === d[0], f = ["["];
                e && f.push("^");
                for (var e = e ? 1 : 0, g = d.length; g > e; ++e) {
                    var h = d[e];
                    if (/\\[bdsw]/i.test(h))f.push(h); else {
                        var i, h = b(h);
                        g > e + 2 && "-" === d[e + 1] ? (i = b(d[e + 2]), e += 2) : i = h, a.push([h, i]), 65 > i || h > 122 || (65 > i || h > 90 || a.push([32 | Math.max(65, h), 32 | Math.min(i, 90)]), 97 > i || h > 122 || a.push([-33 & Math.max(97, h), -33 & Math.min(i, 122)]))
                    }
                }
                for (a.sort(function (a, b) {
                    return a[0] - b[0] || b[1] - a[1]
                }), d = [], g = [], e = 0; e < a.length; ++e)h = a[e], h[0] <= g[1] + 1 ? g[1] = Math.max(g[1], h[1]) : d.push(g = h);
                for (e = 0; e < d.length; ++e)h = d[e], f.push(c(h[0])), h[1] > h[0] && (h[1] + 1 > h[0] && f.push("-"), f.push(c(h[1])));
                return f.push("]"), f.join("")
            }

            function e(a) {
                for (var b = a.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), e = b.length, h = [], i = 0, j = 0; e > i; ++i) {
                    var k = b[i];
                    "(" === k ? ++j : "\\" === k.charAt(0) && (k = +k.substring(1)) && (j >= k ? h[k] = -1 : b[i] = c(k))
                }
                for (i = 1; i < h.length; ++i)-1 === h[i] && (h[i] = ++f);
                for (j = i = 0; e > i; ++i)k = b[i], "(" === k ? (++j, h[j] || (b[i] = "(?:")) : "\\" === k.charAt(0) && (k = +k.substring(1)) && j >= k && (b[i] = "\\" + h[k]);
                for (i = 0; e > i; ++i)"^" === b[i] && "^" !== b[i + 1] && (b[i] = "");
                if (a.ignoreCase && g)for (i = 0; e > i; ++i)k = b[i], a = k.charAt(0), k.length >= 2 && "[" === a ? b[i] = d(k) : "\\" !== a && (b[i] = k.replace(/[A-Za-z]/g, function (a) {
                    return a = a.charCodeAt(0), "[" + String.fromCharCode(-33 & a, 32 | a) + "]"
                }));
                return b.join("")
            }

            for (var f = 0, g = !1, h = !1, i = 0, j = a.length; j > i; ++i) {
                var k = a[i];
                if (k.ignoreCase)h = !0; else if (/[a-z]/i.test(k.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
                    g = !0, h = !1;
                    break
                }
            }
            for (var l = {b: 8, t: 9, n: 10, v: 11, f: 12, r: 13}, m = [], i = 0, j = a.length; j > i; ++i) {
                if (k = a[i], k.global || k.multiline)throw Error("" + k);
                m.push("(?:" + e(k) + ")")
            }
            return RegExp(m.join("|"), h ? "gi" : "g")
        }

        function c(a, b) {
            function c(a) {
                var i = a.nodeType;
                if (1 == i) {
                    if (!d.test(a.className)) {
                        for (i = a.firstChild; i; i = i.nextSibling)c(i);
                        i = a.nodeName.toLowerCase(), ("br" === i || "li" === i) && (e[h] = "\n", g[h << 1] = f++, g[h++ << 1 | 1] = a)
                    }
                } else(3 == i || 4 == i) && (i = a.nodeValue, i.length && (i = b ? i.replace(/\r\n?/g, "\n") : i.replace(/[\t\n\r ]+/g, " "), e[h] = i, g[h << 1] = f, f += i.length, g[h++ << 1 | 1] = a))
            }

            var d = /(?:^|\s)nocode(?:\s|$)/, e = [], f = 0, g = [], h = 0;
            return c(a), {a: e.join("").replace(/\n$/, ""), d: g}
        }

        function d(a, b, c, d) {
            b && (a = {a: b, e: a}, c(a), d.push.apply(d, a.g))
        }

        function e(a) {
            for (var b = void 0, c = a.firstChild; c; c = c.nextSibling)var d = c.nodeType, b = 1 === d ? b ? a : c : 3 === d ? v.test(c.nodeValue) ? a : b : b;
            return b === a ? void 0 : b
        }

        function f(c, e) {
            function f(a) {
                for (var b = a.e, c = [b, "pln"], k = 0, l = a.a.match(g) || [], m = {}, n = 0, o = l.length; o > n; ++n) {
                    var p, q = l[n], r = m[q], s = void 0;
                    if ("string" == typeof r)p = !1; else {
                        var t = h[q.charAt(0)];
                        if (t)s = q.match(t[1]), r = t[0]; else {
                            for (p = 0; i > p; ++p)if (t = e[p], s = q.match(t[1])) {
                                r = t[0];
                                break
                            }
                            s || (r = "pln")
                        }
                        !(p = r.length >= 5 && "lang-" === r.substring(0, 5)) || s && "string" == typeof s[1] || (p = !1, r = "src"), p || (m[q] = r)
                    }
                    if (t = k, k += q.length, p) {
                        p = s[1];
                        var u = q.indexOf(p), v = u + p.length;
                        s[2] && (v = q.length - s[2].length, u = v - p.length), r = r.substring(5), d(b + t, q.substring(0, u), f, c), d(b + t + u, p, j(r, p), c), d(b + t + v, q.substring(v), f, c)
                    } else c.push(b + t, r)
                }
                a.g = c
            }

            var g, h = {};
            !function () {
                for (var d = c.concat(e), f = [], i = {}, j = 0, k = d.length; k > j; ++j) {
                    var l = d[j], m = l[3];
                    if (m)for (var n = m.length; --n >= 0;)h[m.charAt(n)] = l;
                    l = l[1], m = "" + l, i.hasOwnProperty(m) || (f.push(l), i[m] = a)
                }
                f.push(/[\S\s]/), g = b(f)
            }();
            var i = e.length;
            return f
        }

        function g(b) {
            var c = [], d = [];
            c.push(b.tripleQuotedStrings ? ["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, a, "'\""] : b.multiLineStrings ? ["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/, a, "'\"`"] : ["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, a, "\"'"]), b.verbatimStrings && d.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, a]);
            var e = b.hashComments;
            if (e && (b.cStyleComments ? (c.push(e > 1 ? ["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, a, "#"] : ["com", /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\n\r]*)/, a, "#"]), d.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, a])) : c.push(["com", /^#[^\n\r]*/, a, "#"])), b.cStyleComments && (d.push(["com", /^\/\/[^\n\r]*/, a]), d.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, a])), e = b.regexLiterals) {
                var g = (e = e > 1 ? "" : "\n\r") ? "." : "[\\S\\s]";
                d.push(["lang-regex", RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(" + ("/(?=[^/*" + e + "])(?:[^/\\x5B\\x5C" + e + "]|\\x5C" + g + "|\\x5B(?:[^\\x5C\\x5D" + e + "]|\\x5C" + g + ")*(?:\\x5D|$))+/") + ")")])
            }
            return (e = b.types) && d.push(["typ", e]), e = ("" + b.keywords).replace(/^ | $/g, ""), e.length && d.push(["kwd", RegExp("^(?:" + e.replace(/[\s,]+/g, "|") + ")\\b"), a]), c.push(["pln", /^\s+/, a, " \r\n	 "]), e = "^.[^\\s\\w.$@'\"`/\\\\]*", b.regexLiterals && (e += "(?!s*/)"), d.push(["lit", /^@[$_a-z][\w$@]*/i, a], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, a], ["pln", /^[$_a-z][\w$@]*/i, a], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, a, "0123456789"], ["pln", /^\\[\S\s]?/, a], ["pun", RegExp(e), a]), f(c, d)
        }

        function h(a, b, c) {
            function d(a) {
                var b = a.nodeType;
                if (1 != b || f.test(a.className)) {
                    if ((3 == b || 4 == b) && c) {
                        var i = a.nodeValue, j = i.match(g);
                        j && (b = i.substring(0, j.index), a.nodeValue = b, (i = i.substring(j.index + j[0].length)) && a.parentNode.insertBefore(h.createTextNode(i), a.nextSibling), e(a), b || a.parentNode.removeChild(a))
                    }
                } else if ("br" === a.nodeName)e(a), a.parentNode && a.parentNode.removeChild(a); else for (a = a.firstChild; a; a = a.nextSibling)d(a)
            }

            function e(a) {
                function b(a, c) {
                    var d = c ? a.cloneNode(!1) : a, e = a.parentNode;
                    if (e) {
                        var e = b(e, 1), f = a.nextSibling;
                        e.appendChild(d);
                        for (var g = f; g; g = f)f = g.nextSibling, e.appendChild(g)
                    }
                    return d
                }

                for (; !a.nextSibling;)if (a = a.parentNode, !a)return;
                for (var c, a = b(a.nextSibling, 0); (c = a.parentNode) && 1 === c.nodeType;)a = c;
                j.push(a)
            }

            for (var f = /(?:^|\s)nocode(?:\s|$)/, g = /\r\n?|\n/, h = a.ownerDocument, i = h.createElement("li"); a.firstChild;)i.appendChild(a.firstChild);
            for (var j = [i], k = 0; k < j.length; ++k)d(j[k]);
            b === (0 | b) && j[0].setAttribute("value", b);
            var l = h.createElement("ol");
            l.className = "linenums";
            for (var b = Math.max(0, b - 1 | 0) || 0, k = 0, m = j.length; m > k; ++k)i = j[k], i.className = "L" + (k + b) % 10, i.firstChild || i.appendChild(h.createTextNode(" ")), l.appendChild(i);
            a.appendChild(l)
        }

        function i(a, b) {
            for (var c = b.length; --c >= 0;) {
                var d = b[c];
                x.hasOwnProperty(d) ? l.console && console.warn("cannot override language handler %s", d) : x[d] = a
            }
        }

        function j(a, b) {
            return a && x.hasOwnProperty(a) || (a = /^\s*</.test(b) ? "default-markup" : "default-code"), x[a]
        }

        function k(a) {
            var b = a.h;
            try {
                var d = c(a.c, a.i), e = d.a;
                a.a = e, a.d = d.d, a.e = 0, j(b, e)(a);
                var f = /\bMSIE\s(\d+)/.exec(navigator.userAgent), f = f && +f[1] <= 8, b = /\n/g, g = a.a, h = g.length, d = 0, i = a.d, k = i.length, e = 0, m = a.g, n = m.length, o = 0;
                m[n] = h;
                var p, q;
                for (q = p = 0; n > q;)m[q] !== m[q + 2] ? (m[p++] = m[q++], m[p++] = m[q++]) : q += 2;
                for (n = p, q = p = 0; n > q;) {
                    for (var r = m[q], s = m[q + 1], t = q + 2; n >= t + 2 && m[t + 1] === s;)t += 2;
                    m[p++] = r, m[p++] = s, q = t
                }
                m.length = p;
                var u, v = a.c;
                v && (u = v.style.display, v.style.display = "none");
                try {
                    for (; k > e;) {
                        var w, x = i[e + 2] || h, y = m[o + 2] || h, t = Math.min(x, y), z = i[e + 1];
                        if (1 !== z.nodeType && (w = g.substring(d, t))) {
                            f && (w = w.replace(b, "\r")), z.nodeValue = w;
                            var A = z.ownerDocument, B = A.createElement("span");
                            B.className = m[o + 1];
                            var C = z.parentNode;
                            C.replaceChild(B, z), B.appendChild(z), x > d && (i[e + 1] = z = A.createTextNode(g.substring(t, x)), C.insertBefore(z, B.nextSibling))
                        }
                        d = t, d >= x && (e += 2), d >= y && (o += 2)
                    }
                } finally {
                    v && (v.style.display = u)
                }
            } catch (D) {
                l.console && console.log(D && D.stack || D)
            }
        }

        var l = window, m = ["break,continue,do,else,for,if,return,while"], n = [[m, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"], o = [n, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"], p = [n, "abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"], q = [p, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"], n = [n, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"], r = [m, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"], s = [m, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"], t = [m, "as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"], m = [m, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"], u = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/, v = /\S/, w = g({
            keywords: [o, q, n, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", r, s, m],
            hashComments: !0,
            cStyleComments: !0,
            multiLineStrings: !0,
            regexLiterals: !0
        }), x = {};
        i(w, ["default-code"]), i(f([], [["pln", /^[^<?]+/], ["dec", /^<!\w[^>]*(?:>|$)/], ["com", /^<\!--[\S\s]*?(?:--\>|$)/], ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/], ["lang-", /^<%([\S\s]+?)(?:%>|$)/], ["pun", /^(?:<[%?]|[%?]>)/], ["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i], ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i], ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i], ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]), i(f([["pln", /^\s+/, a, " 	\r\n"], ["atv", /^(?:"[^"]*"?|'[^']*'?)/, a, "\"'"]], [["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i], ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i], ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/], ["pun", /^[/<->]+/], ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i], ["lang-js", /^on\w+\s*=\s*'([^']+)'/i], ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i], ["lang-css", /^style\s*=\s*"([^"]+)"/i], ["lang-css", /^style\s*=\s*'([^']+)'/i], ["lang-css", /^style\s*=\s*([^\s"'>]+)/i]]), ["in.tag"]), i(f([], [["atv", /^[\S\s]+/]]), ["uq.val"]), i(g({
            keywords: o,
            hashComments: !0,
            cStyleComments: !0,
            types: u
        }), ["c", "cc", "cpp", "cxx", "cyc", "m"]), i(g({keywords: "null,true,false"}), ["json"]), i(g({
            keywords: q,
            hashComments: !0,
            cStyleComments: !0,
            verbatimStrings: !0,
            types: u
        }), ["cs"]), i(g({keywords: p, cStyleComments: !0}), ["java"]), i(g({
            keywords: m,
            hashComments: !0,
            multiLineStrings: !0
        }), ["bash", "bsh", "csh", "sh"]), i(g({
            keywords: r,
            hashComments: !0,
            multiLineStrings: !0,
            tripleQuotedStrings: !0
        }), ["cv", "py", "python"]), i(g({
            keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: 2
        }), ["perl", "pl", "pm"]), i(g({
            keywords: s,
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: !0
        }), ["rb", "ruby"]), i(g({
            keywords: n,
            cStyleComments: !0,
            regexLiterals: !0
        }), ["javascript", "js"]), i(g({
            keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",
            hashComments: 3,
            cStyleComments: !0,
            multilineStrings: !0,
            tripleQuotedStrings: !0,
            regexLiterals: !0
        }), ["coffee"]), i(g({
            keywords: t,
            cStyleComments: !0,
            multilineStrings: !0
        }), ["rc", "rs", "rust"]), i(f([], [["str", /^[\S\s]+/]]), ["regex"]);
        var y = l.PR = {
            createSimpleLexer: f,
            registerLangHandler: i,
            sourceDecorator: g,
            PR_ATTRIB_NAME: "atn",
            PR_ATTRIB_VALUE: "atv",
            PR_COMMENT: "com",
            PR_DECLARATION: "dec",
            PR_KEYWORD: "kwd",
            PR_LITERAL: "lit",
            PR_NOCODE: "nocode",
            PR_PLAIN: "pln",
            PR_PUNCTUATION: "pun",
            PR_SOURCE: "src",
            PR_STRING: "str",
            PR_TAG: "tag",
            PR_TYPE: "typ",
            prettyPrintOne: l.prettyPrintOne = function (a, b, c) {
                var d = document.createElement("div");
                return d.innerHTML = "<pre>" + a + "</pre>", d = d.firstChild, c && h(d, c, !0), k({
                    h: b,
                    j: c,
                    c: d,
                    i: 1
                }), d.innerHTML
            },
            prettyPrint: l.prettyPrint = function (b, c) {
                function d() {
                    for (var c = l.PR_SHOULD_USE_CONTINUATION ? o.now() + 250 : 1 / 0; q < i.length && o.now() < c; q++) {
                        for (var f = i[q], j = x, m = f; m = m.previousSibling;) {
                            var n = m.nodeType, y = (7 === n || 8 === n) && m.nodeValue;
                            if (y ? !/^\??prettify\b/.test(y) : 3 !== n || /\S/.test(m.nodeValue))break;
                            if (y) {
                                j = {}, y.replace(/\b(\w+)=([\w%+\-.:]+)/g, function (a, b, c) {
                                    j[b] = c
                                });
                                break
                            }
                        }
                        if (m = f.className, (j !== x || s.test(m)) && !t.test(m)) {
                            for (n = !1, y = f.parentNode; y; y = y.parentNode)if (w.test(y.tagName) && y.className && s.test(y.className)) {
                                n = !0;
                                break
                            }
                            if (!n) {
                                if (f.className += " prettyprinted", n = j.lang, !n) {
                                    var z, n = m.match(r);
                                    !n && (z = e(f)) && v.test(z.tagName) && (n = z.className.match(r)), n && (n = n[1])
                                }
                                if (u.test(f.tagName))y = 1; else var y = f.currentStyle, A = g.defaultView, y = (y = y ? y.whiteSpace : A && A.getComputedStyle ? A.getComputedStyle(f, a).getPropertyValue("white-space") : 0) && "pre" === y.substring(0, 3);
                                A = j.linenums, (A = "true" === A || +A) || (A = (A = m.match(/\blinenums\b(?::(\d+))?/)) ? A[1] && A[1].length ? +A[1] : !0 : !1), A && h(f, A, y), p = {
                                    h: n,
                                    c: f,
                                    j: A,
                                    i: y
                                }, k(p)
                            }
                        }
                    }
                    q < i.length ? setTimeout(d, 250) : "function" == typeof b && b()
                }

                for (var f = c || document.body, g = f.ownerDocument || document, f = [f.getElementsByTagName("pre"), f.getElementsByTagName("code"), f.getElementsByTagName("xmp")], i = [], j = 0; j < f.length; ++j)for (var m = 0, n = f[j].length; n > m; ++m)i.push(f[j][m]);
                var f = a, o = Date;
                o.now || (o = {
                    now: function () {
                        return +new Date
                    }
                });
                var p, q = 0, r = /\blang(?:uage)?-([\w.]+)(?!\S)/, s = /\bprettyprint\b/, t = /\bprettyprinted\b/, u = /pre|xmp/i, v = /^code$/i, w = /^(?:pre|code|xmp)$/i, x = {};
                d()
            }
        };
        "function" == typeof define && define.amd && define("google-code-prettify", [], function () {
            return y
        })
    }()
}();
var Namespace = function (a) {
    var b = window;
    if ("" !== a)for (var c = a.split(Namespace.separator), d = 0, e = c.length; e > d; d++)b[c[d]] || (b[c[d]] = {}), b = b[c[d]];
    return b
};
Namespace.separator = ".", Namespace("com.zybuluo"), com.zybuluo.indexedDB = function () {
    var a = "zybuluoIndexedDB", b = 1, c = "localNoteActions", d = ["local_note_id", "version_id", "author", "tags", "action", "title", "details", "public", "anchor_list", "created_by", "created_date", "last_updated_by", "last_updated_date"], e = "loginUser", f = ["name", "user_tier"], g = null, h = function (d) {
        if (!window.indexedDB)return d(), window.alert("您的浏览器不支持 IndexedDB 离线存储技术，将影响部分离线功能。您可以升级当前浏览器，或者使用最新版的 Chrome 浏览器，或者下载使用 Cmd Markdown 的客户端版本。"), !1;
        if (null !== g)return window.alert("database has been opened."), console.error("database has been opened."), !1;

        var f = window.indexedDB.open(a, b);
        return f.onsuccess = function (a) {
            g = a.target.result,  d()
        }, f.onerror = function (a) {
            console.error("openDatabase ERROR:", a.target.errorCode), d()
        }, f.onupgradeneeded = function (a) {
            var b = a.target.result, d = b.createObjectStore(c, {keyPath: "local_note_id"});
            d.createIndex("author", "author", {unique: !1});
            b.createObjectStore(e, {keyPath: "name"})
        }, !0
    }, i = function (a, b, c, d) {
        var e = (new Date).toISOString(), f = {
            local_note_id: -1,
            version_id: -1,
            author: a,
            tags: ["未分类"],
            action: d,
            title: b,
            details: c,
            "public": !1,
            anchor_list: null,
            created_by: a,
            created_date: e,
            last_updated_by: a,
            last_updated_date: e
        };
        return f
    };
    return {
        openDatabase: h,
        getDatabase: function () {
            return g
        },
        STORE_LOCALNOTE_ACTIONS: c,
        STRUCTURE_LOCALNOTE_ACTIONS: d,
        newLocalNoteAction: i,
        STORE_LOGIN_USER: e,
        STRUCTURE_LOGIN_USER: f
    }
}(), Namespace("com.zybuluo.common"), com.zybuluo.common.encodeBase64 = function (a) {
    if (0 === a.length)return "";
    var b, c, d = [], e = 0;
    for (a = encodeURI(a), b = a.length; b > e;)c = a[e], e += 1, "%" !== c ? d.push(c.charCodeAt(0)) : (c = a[e] + a[e + 1], d.push(parseInt(c, 16)), e += 2);
    var f, g, h = "=", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", j = [], k = d.length - d.length % 3;
    for (f = 0; k > f; f += 3)g = d[f] << 16 | d[f + 1] << 8 | d[f + 2], j.push(i.charAt(g >> 18)), j.push(i.charAt(g >> 12 & 63)), j.push(i.charAt(g >> 6 & 63)), j.push(i.charAt(63 & g));
    switch (d.length - k) {
        case 1:
            g = d[f] << 16, j.push(i.charAt(g >> 18) + i.charAt(g >> 12 & 63) + h + h);
            break;
        case 2:
            g = d[f] << 16 | d[f + 1] << 8, j.push(i.charAt(g >> 18) + i.charAt(g >> 12 & 63) + i.charAt(g >> 6 & 63) + h)
    }
    return j.join("")
}, com.zybuluo.common.pushState = function (a) {
    var b = window.location.hash;
    window.history.pushState ? (window.history.pushState(null, "", a), window.location.hash = b) : (null === a.match(/#.*?$/) && (a += b), window.location = a)
}, com.zybuluo.common.browserType = {
    isIE: /msie/.test(window.navigator.userAgent.toLowerCase()),
    isIE_5or6: /msie 6/.test(window.navigator.userAgent.toLowerCase()) || /msie 5/.test(window.navigator.userAgent.toLowerCase()),
    isOpera: /opera/.test(window.navigator.userAgent.toLowerCase()),
    isFirefox: /firefox/.test(window.navigator.userAgent.toLowerCase()),
    isChrome: /(chrome|chromium)/.test(window.navigator.userAgent.toLowerCase())
}, com.zybuluo.common.getCurrentScreenType = function () {
    var a = {isMobile: !1, isTablet: !1, isDesktop: !1}, b = $(window).width();
    return 767 >= b && b > 0 ? a.isMobile = !0 : b > 767 && 979 >= b ? a.isTablet = !0 : a.isDesktop = !0, a
}, com.zybuluo.common.popupConfirm = function () {
    function a(a, h, i, j, k, l) {
        g !== !0 && (g = !0, e.html(a), f.children("p").html(h), b.modal({keyboard: !0}), i ? c.data("operation", i) : c.removeData("operation"), j ? d.data("cancelOperation", j) : d.removeData("cancelOperation"), b.unbind("shown"), k && b.on("shown", k), b.unbind("hidden"), b.on("hidden", function () {
            c.removeData("operation"), d.removeData("cancelOperation"), g = !1, l && l(), e.html(""), f.html("<p></p>"), c.html("确认"), d.html("取消")
        }))
    }

    var b = $("#notification-popup-window"), c = $("#notification-confirm"), d = $("#notification-cancel"), e = $("#notification-title"), f = b.children(".modal-body");
    c.click(function () {
        var a = $(this).data("operation");
        a ? ($(this).removeData("operation"), a()) : (b.modal("hide"), window.location.reload())
    }), d.click(function () {
        var a = $(this).data("cancelOperation");
        a && ($(this).removeData("cancelOperation"), a())
    });
    var g = !1;
    return {
        popup: a, isShown: function () {
            return g
        }
    }
}(), com.zybuluo.common.createAutoClosingAlert = function (a, b) {
    var c = $(a).alert();
    window.setTimeout(function () {
        c.alert("close")
    }, b)
}, com.zybuluo.common.bindResendConfirmation = function (a, b) {
    $("a#email-request-verification").click(function (c) {
        c.preventDefault(), $.post($("a#email-request-verification").attr("href"), null, function (c) {
            "sent" == c.success ? $("#resend-confirmation").html(b ? "验证链接已经发送到您的邮箱： " + c.user_email + ' 请注意查收，<a href="' + b + '">返回首页</a>。' : "验证链接已经发送到您的邮箱： " + c.user_email + " 请注意查收。") : "no_email" == c.fail ? $("#resend-confirmation").html(b ? '发送验证链接失败，<a href="' + b + '">返回首页</a>。' : "发送验证链接失败。") : c.loggedin === !1 && (window.location = a)
        }, "json")
    })
}, com.zybuluo.common.loginUser = function () {
    var a = com.zybuluo.indexedDB, b = null, c = function (c) {
        if (b)return void(c && c(b));
        var d = a.getDatabase();
        if (null === d)return void(c && c(null));
        var e = d.transaction(a.STORE_LOGIN_USER, "readonly"), f = e.objectStore(a.STORE_LOGIN_USER);
        f.openCursor().onsuccess = function (a) {
            var d = a.target.result;
            d ? (b = d.value, c && c(d.value)) : c && c(null)
        }
    }, d = function (c, d) {
        e(function () {
            b = c;
            var e = a.getDatabase();
            if (null === e)return void(d && d(c));
            var f = e.transaction(a.STORE_LOGIN_USER, "readwrite");
            f.oncomplete = function () {
                console.log("SUCCESS: write to login user!"), d && d(c)
            }, f.onerror = function () {
                console.error("ERROR: write to login user!"), d && d(c)
            };
            var g = f.objectStore(a.STORE_LOGIN_USER);
            g.add(c)
        })
    }, e = function (c) {
        b = null;
        var d = a.getDatabase();
        if (null === d)return void(c && c(null));
        var e = d.transaction(a.STORE_LOGIN_USER, "readwrite"), f = e.objectStore(a.STORE_LOGIN_USER), g = f.clear();
        g.onsuccess = function () {
            console.log("SUCCESS: clear the login user!"), c && c(null)
        }, g.onerror = function () {
            console.error("ERROR: clear the login user!"), c && c(null)
        }
    };
    return {get: c, set: d, clear: e}
}(), window.applicationCache.addEventListener("updateready", onUpdateReady), window.applicationCache.status === window.applicationCache.UPDATEREADY && onUpdateReady(), $(function () {
    $.ajaxSetup({cache: !1}), $("input.autofocus").focus(), $("input, textarea").placeholder(), $("div[rel=tooltip]").tooltip()
}), $(function () {
    var a = $("#global-prompt-alert"), b = $("#close-global-prompt-alert"), c = $("#global-prompt-message"), d = com.zybuluo.base.initData;
    $.get(d.globalPromptUrl, {}, function (d) {
        var e = d.global_prompt_messages.shift();
        e && (c.html(e), a.removeClass("hide"), b.on("click", function (b) {
            b.preventDefault();
            var e = d.global_prompt_messages.shift();
            e ? c.html(e) : (a.addClass("hide"), setTimeout(function () {
                $(window).resize()
            }, 250))
        }))
    }, "json").fail(function () {
    })
});