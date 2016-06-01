/*! zybuluo */
function MediumEditor(a, b) {
    "use strict";
    return this.init(a, b)
}
Namespace("com.zybuluo.mdeditor.common"),
    function(a) {
        a.fn.tabHandler = function() {
            a(this).keydown(function(b) {
                if (9 === b.keyCode) {
                    var c = this.selectionStart,
                        d = this.selectionEnd,
                        e = a(this),
                        f = e.val();
                    e.val(f.substring(0, c) + "    " + f.substring(d)),
                        this.selectionStart = this.selectionEnd = c + 4,
                        b.preventDefault()
                }
            })
        }
    } (jQuery),
    function(a) {
        var b;
        return a.event.fix = function(a) {
            return function(b) {
                return b = a.apply(this, arguments),
                (0 === b.type.indexOf("copy") || 0 === b.type.indexOf("paste")) && (b.clipboardData = b.originalEvent.clipboardData),
                    b
            }
        } (a.event.fix),
            b = {
                callback: a.noop,
                matchType: /image.*/
            },
            a.fn.pasteImageReader = function(c) {
                return "function" == typeof c && (c = {
                    callback: c
                }),
                    c = a.extend({},
                        b, c),
                    this.each(function() {
                        var b, d;
                        return d = this,
                            b = a(this),
                            b.bind("paste",
                                function(a) {
                                    var b, e;
                                    return e = !1,
                                        b = a.clipboardData,
                                        Array.prototype.forEach.call(b.types,
                                            function(a, f) {
                                                var g;
                                                if (!e) return a.match(c.matchType) || b.items[f].type.match(c.matchType) ? (g = b.items[f].getAsFile(), c.callback.call(d, g), e = !0) : void 0
                                            })
                                })
                    })
            },
            a.fn.pasteImageReader
    } (jQuery);
var fullScreenApi = function() {
    var a = {
            supportsFullScreen: !1,
            isFullScreen: function() {
                return ! 1
            },
            requestFullScreen: function() {},
            cancelFullScreen: function() {},
            fullScreenEventName: "",
            prefix: ""
        },
        b = "webkit moz o ms khtml".split(" ");
    if ("undefined" != typeof document.cancelFullScreen) a.supportsFullScreen = !0;
    else for (var c = 0,
                  d = b.length; d > c; c++) if (a.prefix = b[c], "undefined" != typeof document[a.prefix + "CancelFullScreen"]) {
        a.supportsFullScreen = !0;
        break
    }
    return a.supportsFullScreen && (a.fullScreenEventName = a.prefix + "fullscreenchange", a.isFullScreen = function() {
        switch (this.prefix) {
            case "":
                return document.fullScreen;
            case "webkit":
                return document.webkitIsFullScreen;
            default:
                return document[this.prefix + "FullScreen"]
        }
    },
        a.requestFullScreen = function(a) {
            return "webkit" === this.prefix ? a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : "" === this.prefix ? a.requestFullScreen() : a[this.prefix + "RequestFullScreen"]()
        },
        a.cancelFullScreen = function() {
            return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
        }),
    "undefined" != typeof jQuery && (jQuery.fn.requestFullScreen = function() {
        return this.each(function() {
            a.supportsFullScreen && a.requestFullScreen(this)
        })
    }),
        a
} ();
com.zybuluo.mdeditor.common.setCursorPositionInContenteditable = function(a, b, c) {
    var d = a,
        e = document.createRange(),
        f = window.getSelection();
    e.setStart(d.childNodes[b], c),
        e.collapse(!0),
        f.removeAllRanges(),
        f.addRange(e),
        setTimeout(function() {
                d.focus()
            },
            200)
},
    com.zybuluo.mdeditor.common.setCursorPositionEndOfContenteditable = function(a) {
        a.text(a.text()),
            a.focus();
        var b, c, d = a.get(0);
        document.createRange ? (b = document.createRange(), b.selectNodeContents(d), b.collapse(!1), c = window.getSelection(), c.removeAllRanges(), c.addRange(b)) : document.selection && (b = document.body.createTextRange(), b.moveToElementText(d), b.collapse(!1), b.select())
    },
    com.zybuluo.mdeditor.common.getCurrentMode = function() {
        if (com.zybuluo.mdeditor.user_note) return null;
        var a = window.location.hash,
            b = {
                isFullEditor: !1,
                isFullReader: !1,
                isEditorReader: !1,
                isHashMode: !1
            };
        return null !== a.match(/^#(\d+-)?full-editor/) ? b.isFullEditor = !0 : null !== a.match(/^#(\d+-)?full-reader/) ? b.isFullReader = !0 : (a && null === a.match(/^#\d+$/) && (b.isHashMode = !0), b.isEditorReader = !0),
            b
    },
    com.zybuluo.mdeditor.common.getCurrentIdInHash = function() {
        var a = null,
            b = window.location.hash.match(/^#(\d+)$/);
        return null === b && (b = window.location.hash.match(/^#(\d+)(-full-reader|-full-editor)/)),
        null !== b && (a = Number(b[1])),
            a
    },
    com.zybuluo.mdeditor.common.saveAs = function(a, b) {
        if (void 0 === saveAs || /constructor/i.test(window.HTMLElement)) if (_.isString(a)) {
            var c = "data:application/octet-stream;base64," + com.zybuluo.common.encodeBase64(a);
            window.open(c, "file")
        } else {
            var d = new FileReader,
                e = b.substring(b.lastIndexOf(".") + 1).toLowerCase();
            "pdf" === e ? (d.onload = function(a) {
                var b = window.confirm("Safari 无法直接下载PDF，即将打开PDF，打开后可选择另存为PDF文件完成下载。");
                if (b) {
                    var c = "data:application/pdf;" + a.target.result.substring(a.target.result.indexOf("base64"));
                    setTimeout(function() {
                            var a = window.open(c, "file");
                            a || window.alert("当前浏览器设置无法打开PDF，请前往 Safari -> Preferences -> Security 取消 Block pop-up windows 选项后重试。")
                        },
                        1e3)
                }
            },
                d.readAsDataURL(a)) : (d.onload = function(a) {
                var b = window.confirm("Safari 无法直接保存 " + e + " 格式，即将使用 Unknown 文件名下载，下载后请自行重命名为 *." + e + " 格式，然后打开查看。");
                if (b) {
                    var c = "data:application/" + e + ";" + a.target.result.substring(a.target.result.indexOf("base64"));
                    setTimeout(function() {
                            var a = window.open(c, "file");
                            a || window.alert("当前浏览器设置无法下载文件，请前往 Safari -> Preferences -> Security 取消 Block pop-up windows 选项后重试。")
                        },
                        1e3)
                }
            },
                d.readAsDataURL(a))
        } else _.isString(a) && (a = new Blob([a], {
            type: "text/plain;charset=utf-8"
        })),
            saveAs(a, b)
    },
    com.zybuluo.mdeditor.common.buttonBinding = function(a, b, c) {
        $(a).each(function() {
            $(this).unbind("hover")
        }),
            $(a).animate({
                    color: c
                },
                200),
            $(a).each(function() {
                $(this).hover(function() {
                        $(this).animate({
                                color: b
                            },
                            200)
                    },
                    function() {
                        $(this).animate({
                                color: c
                            },
                            200)
                    })
            })
    },
    com.zybuluo.mdeditor.common.bindingFullScreenApi = function(a) {
        fullScreenApi.supportsFullScreen ? $(a).on("click",
            function() {
                fullScreenApi.isFullScreen() ? fullScreenApi.cancelFullScreen() : fullScreenApi.requestFullScreen(document.documentElement)
            }) : $(a).on("click",
            function() {
                alert("您的浏览器不支持自动全屏，请尝试按 F11 切换全屏")
            })
    },
    com.zybuluo.mdeditor.common.colorWmdButtons = function() {
        var a = com.zybuluo.mdeditor.common.buttonBinding,
            b = com.zybuluo.mdeditor.common.getCurrentMode();
        b && b.isFullEditor ? $("body").hasClass("theme-white") ? a(".wmd-button > span", "#2C3E50", "#999999") : a(".wmd-button > span", "#F9F9F5", "#BBBBBB") : a(".wmd-button > span", "#F9F9F5", "#BBBBBB")
    },
    com.zybuluo.mdeditor.common.applyPreviewElementTheme = function(a) {
        var b = $("#prettify-style").attr("href");
        b = b.match(/.*\//)[0],
        null === a && (a = $("body").hasClass("theme-black") ? "theme-black": "theme-white");
        var c = com.zybuluo.mdeditor.common.buttonBinding;
        "theme-white" == a ? ($("#wmd-preview table").each(function() {
            $(this).removeClass().addClass("table table-striped-white table-bordered")
        }), $("code").each(function() {
            0 === $(this).parents("pre.prettyprint").length && $(this).removeClass("code-black")
        }), $("pre > code").each(function() {
            $(this).parent("pre").removeClass("code-black")
        }), $("#prettify-style").attr("href", b + "prettify-cmd.css"), c(".in-page-button > span", "rgba(44, 62, 80, 0.65)", "rgba(102, 128, 153, 0.45)"), $(".wmd-preview blockquote").removeClass().addClass("white-blockquote")) : ($("#wmd-preview table").each(function() {
            $(this).removeClass().addClass("table table-striped-black table-bordered")
        }), $("code").each(function() {
            0 === $(this).parents("pre.prettyprint").length && $(this).addClass("code-black")
        }), $("pre > code").each(function() {
            $(this).parent("pre").addClass("code-black")
        }), $("#prettify-style").attr("href", b + "desert-cmd.css"), c(".in-page-button > span", "rgba(249, 249, 245, 0.65)", "rgb(187, 187, 187, 0.45)"), $(".wmd-preview blockquote").removeClass().addClass("black-blockquote")),
            com.zybuluo.mdeditor.common.colorWmdButtons()
    },
    com.zybuluo.mdeditor.common.applySiteTheme = function(a) {
        $(".theme").each(function() {
            $(this).removeClass("theme-white theme-black").addClass(a)
        });
        var b = com.zybuluo.mdeditor.common.applyPreviewElementTheme;
        b(a),
            $.localStorage("siteThemeClassName", a)
    },
    com.zybuluo.mdeditor.common.switchSiteTheme = function(a) {
        var b = com.zybuluo.mdeditor.common.applySiteTheme;
        $("body").hasClass("theme-white") ? (a && a.applyTheme("theme-black"), b("theme-black")) : (a && a.applyTheme("theme-white"), b("theme-white"))
    },
    com.zybuluo.mdeditor.common.loadSiteTheme = function(a) {
        var b = $.localStorage("siteThemeClassName");
        b || (b = "theme-white"),
        a && a.applyTheme(b);
        var c = com.zybuluo.mdeditor.common.applySiteTheme;
        c(b)
    },
    com.zybuluo.mdeditor.common.getCurrentThemeClassName = function() {
        var a = $.localStorage("siteThemeClassName");
        return a || (a = "theme-white"),
            a
    },
    com.zybuluo.mdeditor.common.initiateToc = function() {
        $("#toc-list").on("click",
            function(a) {
                a.stopPropagation()
            })
    } (),
    com.zybuluo.mdeditor.common.initialHiddenSideToolBar = function() {
        var a = com.zybuluo.mdeditor.common.buttonBinding;
        a(".preview-button-full-reader > span", "#F9F9F5", "#BBBBBB");
        var b = !1,
            c = function() {
                $("#reader-full-toolbar-tail").hasClass("reader-full-toolbar-tail-hidden") || (b ? ($("#reader-full-toolbar").show(), $("#preview-hidden-button span").attr("title", "隐藏工具栏 Ctrl+Alt+I").removeClass("icon-chevron-sign-left").addClass("icon-chevron-sign-right"), a("#preview-hidden-button span", "#F9F9F5", "#BBBBBB"), b = !1) : ($("#reader-full-toolbar").hide(), $("#preview-hidden-button span").attr("title", "显示工具栏 Ctrl+Alt+I").removeClass("icon-chevron-sign-right").addClass("icon-chevron-sign-left"), a("#preview-hidden-button span", "#BBBBBB", "#BBBBBB"), b = !0))
            };
        $("#preview-hidden-button").on("click", c);
        var d = function() {
            var a = com.zybuluo.common.getCurrentScreenType,
                b = a();
            b.isMobile && c()
        };
        return {
            hideToolBar: c,
            hideToolBarForMobile: d,
            isHidden: function() {
                return b
            }
        }
    } (),
    com.zybuluo.mdeditor.common.resetMaxHeightOfFileList = function() {
        var a = $("#preview-list-button");
        if (0 !== a.length) {
            var b = $(window).height() - a.position().top - 100;
            $("ul.dropdown-menu#file-list").css("max-height", b)
        }
    },
    com.zybuluo.mdeditor.common.caculatePreviewCharacters = function() {
        var a = $("#wmd-preview").text();
        return (a.match(/\S/g) || []).length
    },
    com.zybuluo.mdeditor.common.caculateAndFillPreviewCharacters = function() {
        var a = com.zybuluo.mdeditor.common.caculatePreviewCharacters(),
            b = $(".article-characters");
        0 !== b.length && b.each(function() {
            $(this).text(a)
        })
    },
    com.zybuluo.mdeditor.common.generateUUID = function(a) {
        var b = 0,
            c = "";
        for (b = 0; a > b; b++) c += "0123456789abcdefghijklmnopqrstuvwxyz" [Math.floor(36 * Math.random())];
        return c
    },
    com.zybuluo.mdeditor.common.wmdPreviewChildNodes_callback = function(a, b) {
        void 0 === b && (b = document.getElementById("wmd-preview").childNodes);
        var c = 0,
            d = 0;
        for (d in b) if (b[d] && 1 === b[d].nodeType) {
            var e = b[d].innerHTML,
                f = "" !== e ? !0 : !1;
            f && c++,
                a(b[d], f)
        }
        return c
    },
    com.zybuluo.mdeditor.common.reloadCurrentId = function(a) {
        if (a) {
            $.localStorage("currentId", a);
            var b = com.zybuluo.mdeditor.common.getCurrentMode();
            b.isEditorReader ? window.location.hash = "#" + a: b.isFullReader ? window.location.hash = "#" + a + "-full-reader": b.isFullEditor && (window.location.hash = "#" + a + "-full-editor"),
                window.location.reload()
        }
    },
    com.zybuluo.mdeditor.common.setToastrOptions = function(a, b, c, d, e) {
        toastr.options.positionClass = a,
            toastr.options.closeButton = b,
            toastr.options.timeOut = c,
            toastr.options.extendedTimeOut = d,
            toastr.options.onclick = e
    },
    com.zybuluo.mdeditor.common.isOnline = function(a, b, c) {
        $.get(com.zybuluo.mdeditor.initData.cmdDesktopVersionUrl, {},
            function() {
                a()
            },
            "json").fail(function() {
                c ? c() : (toastr.clear(), com.zybuluo.mdeditor.common.setToastrOptions("toast-bottom-right", !0, "5000", "1000", null), toastr.error(b ? b: "离线状态下无法使用此功能，请连接网络后重试。"))
            })
    },
    com.zybuluo.mdeditor.common.openUrlOnline = function(a, b) {
        com.zybuluo.mdeditor.common.isOnline(function() {
                window.location = a
            },
            b)
    },
    com.zybuluo.mdeditor.common.extractMarkdownTitle = function() {
        var a = "(^|\\n)#{1,4}[^\\S\\n]*([^\\s#]+.*?)[^\\S\\n]*#*\\s*(\\n|$)",
            b = "(^|\\n)[^\\S\\n]*([\\S]+.*?)[^\\S\\n]*\\n=+\\s*(\\n|$)",
            c = "(^|\\n)[^\\S\\n]*([\\S]+.*?)[^\\S\\n]*\\n-+\\s*(\\n|$)",
            d = new RegExp("(" + a + "|" + b + "|" + c + ")"),
            e = function(a) {
                var b = a.match(d);
                if (b) {
                    var c = b[3] || b[6] || b[9];
                    if (c) return c
                }
                return null
            };
        return {
            get: e
        }
    } (),
    com.zybuluo.mdeditor.common.doUserTierFeature = function(a, b, c) {
        $.ajax({
            type: "get",
            url: com.zybuluo.mdeditor.initData.userTierUrl,
            data: {},
            dateType: "json"
        }).done(function(a) {
            if (a.loggedin === !1) window.location = com.zybuluo.mdeditor.initData.loginComeFromUrl;
            else if (a.user_tier) b();
            else {
                if (c) return void c(!0);
                window.desktopGui ? window.open(com.zybuluo.mdeditor.initData.paymentUrl) : (toastr.clear(), com.zybuluo.mdeditor.common.setToastrOptions("toast-bottom-right", !0, "10000", "1000",
                    function() {
                        window.open(com.zybuluo.mdeditor.initData.paymentUrl)
                    }), toastr.warning("点击此处升级为高级会员以开通此功能。"))
            }
        }).fail(function() {
            if (null === a) return toastr.clear(),
                com.zybuluo.mdeditor.common.setToastrOptions("toast-bottom-right", !0, "5000", "1000", null),
                void toastr.error("离线状态下无法使用此功能，请连接网络后重试。");
            if (a.user_tier) b();
            else {
                if (c) return void c(!1);
                toastr.clear(),
                    com.zybuluo.mdeditor.common.setToastrOptions("toast-bottom-right", !0, "5000", "1000", null),
                    toastr.warning("使用此功能需要升级为高级会员，离线状态下无法升级，请连接网络后重试。")
            }
        })
    };
var _getFullScreenWidthHeight = function(a, b) {
    var c = a,
        d = b,
        e = document.documentElement.clientWidth,
        f = document.documentElement.clientHeight,
        g = e / c,
        h = f / d;
    return f >= g * d ? {
        width: "100%",
        height: g * d / f * 100 + "%"
    }: {
        width: h * c / e * 100 + "%",
        height: "100%"
    }
};
com.zybuluo.mdeditor.common.clickToOpenSequenceFlowDiagram = function() {
    $("#wmd-preview").on("click", ".sequence-diagram:has(>svg), .flow-diagram:has(>svg)",
        function() {
            var a = $(this).find("svg")[0],
                b = parseInt(a.width.baseVal.value, 10),
                c = parseInt(a.height.baseVal.value, 10),
                d = a.textContent,
                e = '<?xml version="1.0" encoding="utf-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"><svg xmlns="http://www.w3.org/2000/svg" width="' + b + '" height="' + c + '" xmlns:xlink="http://www.w3.org/1999/xlink"><source><![CDATA[' + d + "]]></source>" + a.innerHTML + "</svg>",
                f = "data:image/svg+xml," + encodeURIComponent(e),
                g = $("#large-image");
            g.attr("src", f);
            var h = _getFullScreenWidthHeight(b, c);
            g.attr("width", h.width),
                g.attr("height", h.height),
                document.getElementById("large-image-panel").style.display = "block",
            document.selection && document.selection.empty(),
            window.getSelection && window.getSelection().removeAllRanges()
        }),
        $("#large-image-panel").on("click",
            function() {
                this.style.display = "none",
                    $("#large-image").removeAttr("src").removeAttr("width").removeAttr("height")
            })
} (),
    com.zybuluo.mdeditor.common.clickToOpenImage = function() {
        $("#wmd-preview").on("click", "img",
            function() {
                var a = $(this),
                    b = a.parent("a");
                if (1 !== b.length || "_blank" !== b.attr("target")) {
                    var c = $("#large-image");
                    c.attr("src", a.attr("src"));
                    var d = _getFullScreenWidthHeight(a[0].width, a[0].height);
                    c.attr("width", d.width),
                        c.attr("height", d.height),
                        document.getElementById("large-image-panel").style.display = "block",
                    document.selection && document.selection.empty(),
                    window.getSelection && window.getSelection().removeAllRanges()
                }
            }).on("mouseenter", "img",
            function() {
                $(this).attr("title", "点击查看大图")
            }).on("mouseleave", "img",
            function() {
                $(this).removeAttr("title")
            }),
            $("#large-image-panel").on("click",
                function() {
                    this.style.display = "none",
                        $("#large-image").removeAttr("src").removeAttr("width").removeAttr("height")
                })
    } (),
    com.zybuluo.mdeditor.common.initiateSearchFileComponent = function(a) {
        $("#file-list-topbar").on("click",
            function(a) {
                a.stopPropagation(),
                    $("#search-file-textbox").focus()
            });
        var b = 0,
            c = 0,
            d = function() {
                var a = $("#file-list .tag-item");
                a.show(),
                    a.siblings().hide(),
                    a.data("hidden", !0);
                var d = $("#file-list .whiter-on-black").first().parent("a").parent("li"),
                    e = d.siblings(".tag-item");
                e.siblings().show(),
                    e.data("hidden", !1),
                    d.addClass("selected-item");
                var f = d.prevAll().length,
                    g = e.index(".tag-item");
                c = d.height(),
                    b = e.height();
                var h = $("#file-list"),
                    i = f * c + (g + 1) * b - h.height();
                h.scrollTop(i)
            },
            e = function(a, b) {
                b.stopPropagation(),
                    a.data("hidden") === !0 ? (a.siblings().show(), a.data("hidden", !1)) : (a.siblings().hide(), a.data("hidden", !0))
            };
        $("#file-list").on("click", ".tag-item",
            function(a) {
                e($(this), a)
            });
        var f = null,
            g = function() {
                f = {},
                    $("#file-list .file-item").each(function() {
                        var a = $(this).find("span"),
                            b = a.attr("id"),
                            c = a.text();
                        b in f || (f[b] = [c, $(this)])
                    })
            },
            h = _.debounce(function() {
                    $("#file-list .selected-item").removeClass("selected-item");
                    var a = $(this).val();
                    if ("" === a) d();
                    else {
                        $("#file-list .tag-item").hide(),
                            $("#file-list .file-item:visible").hide();
                        for (var b in f) - 1 !== f[b][0].toLowerCase().indexOf(a.toLowerCase()) || "*" === a ? f[b][1].show() : f[b][1].hide();
                        $("#file-list").scrollTop(0),
                            $("#file-list .file-item:visible").first().addClass("selected-item")
                    }
                },
                100);
        $("#search-file-textbox").on("input", h);
        var i = function(a, d) {
            var e = $("#file-list .selected-item");
            if (0 !== e.length) {
                var f = $("#file-list .item:visible");
                e.removeClass("selected-item");
                var g = null;
                a === !0 ? (g = e.index(".item:visible") + 1, g >= f.length && (g = 0)) : (g = e.index(".item:visible") - 1, 0 > g && (g = $("#file-list .item:visible").length - 1));
                var h = $(f[g]);
                h.addClass("selected-item");
                var i = 0,
                    j = 0;
                f.each(function() {
                    return $(this).hasClass("file-item") === !0 ? j += 1 : $(this).hasClass("tag-item") === !0 && (i += 1),
                        j + i === g + 1 ? !1 : void 0
                });
                var k = $("#file-list"),
                    l = j * c + i * b - k.height();
                k.scrollTop(l),
                    d.stopPropagation()
            }
        };
        $("#search-file-textbox").on("keydown",
            function(a) {
                var b = a.charCode || a.keyCode;
                switch (b) {
                    case 13:
                        var c = $("#file-list .selected-item");
                        if (c.hasClass("file-item")) {
                            var d = $.localStorage("currentId"),
                                f = c.find("span"),
                                g = Number(f.attr("id")),
                                h = com.zybuluo.common.loginUser;
                            h.get(function(a) {
                                return null === a || g === d ? void $("#preview-list-button > span").dropdown("toggle") : void com.zybuluo.mdeditor.common.reloadCurrentId(g)
                            })
                        } else c.hasClass("tag-item") && e(c, a);
                        break;
                    case 27:
                        $("#preview-list-button > span").dropdown("toggle");
                        break;
                    case 40:
                        i(!0, a);
                        break;
                    case 38:
                        i(!1, a)
                }
            }),
            $("#preview-list-button").on("show",
                function() {
                    $("#search-file-bar").css("display", "block"),
                        $("#tag-file-bar").css("display", "none"),
                        $("#search-file-textbox").val(""),
                        d(),
                        $("#search-file-textbox").focus(),
                        g()
                }).on("hide",
                function() {
                    f = null,
                        $("#file-list .selected-item").removeClass("selected-item"),
                    a && a.focus()
                })
    },
    com.zybuluo.mdeditor.common.populateFileList = function(a, b) {
        var c = $("#file-list");
        c.html("");
        var d = $(".tag-list.editor-reader-hidden"),
            e = $(".file-item-template.editor-reader-hidden .file-item");
        for (var f in b) {
            var g = b[f],
                h = d.clone().removeClass("editor-reader-hidden"),
                i = h.children(".tag-item");
            i.attr("tag-name", g.name),
                i.find(".tag-name").text(g.name),
                i.children(".tag-count").text(g.userNoteUIs.length);
            var j = g.userNoteUIs;
            for (var k in j) {
                var l = j[k],
                    m = !1;
                l.isOffline && l.isOffline === !0 && (m = !0);
                var n = null,
                    o = null;
                l.public ? (n = "【已发布】", o = "icon-share-sign") : (n = "【未发布】", o = "icon-share");
                var p = e.clone();
                p.attr("file-created-date", new Date(l.created_date).format("Y-m-d H:i:s"));
                var q = p.children("a");
                q.attr("title", n + " " + new Date(l.updated_date).format("Y-m-d H:i")),
                    q.children("i").addClass(o),
                    a === l.id ? q.children("span").attr("id", l.id).addClass("whiter-on-black").text(l.title) : m === !1 ? q.children("span").attr("id", l.id).text(l.title) : (q.children("i").addClass("yellow-on-black"), q.children("span").attr("id", l.id).addClass("yellow-on-black").text(l.title)),
                    h.append(p)
            }
            var r = $("<li></li>").append(h);
            c.append(r)
        }
    },
"object" == typeof module && (module.exports = MediumEditor),
    function(a, b) {
        "use strict";
        function c(a, b) {
            var c;
            if (void 0 === a) return b;
            for (c in b) b.hasOwnProperty(c) && a.hasOwnProperty(c) === !1 && (a[c] = b[c]);
            return a
        }
        function d() {
            var c, d, e, f, g = "";
            if (void 0 !== a.getSelection) {
                if (d = a.getSelection(), d.rangeCount) {
                    for (f = b.createElement("div"), c = 0, e = d.rangeCount; e > c; c += 1) f.appendChild(d.getRangeAt(c).cloneContents());
                    g = f.innerHTML
                }
            } else void 0 !== b.selection && "Text" === b.selection.type && (g = b.selection.createRange().htmlText);
            return g
        }
        function e() {
            var c = "";
            return a.getSelection ? c = a.getSelection().toString() : b.selection && "Control" != b.selection.type && (c = b.selection.createRange().text),
                c
        }
        function f(a) {
            return ! (!a || 1 !== a.nodeType)
        }
        MediumEditor.prototype = {
            defaults: {
                buttons: ["remark", "highlight"],
                delay: 0,
                diffLeft: 0,
                diffTop: -10,
                disableToolbar: !1,
                elementsContainer: !1,
                extensions: {},
                firstButtonClass: "medium-editor-button-first",
                lastButtonClass: "medium-editor-button-last"
            },
            isIE: "Microsoft Internet Explorer" === navigator.appName || "Netscape" === navigator.appName && null !== new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent),
            init: function(a, d) {
                return this.elementSelection = a,
                    this.id = b.querySelectorAll(".medium-editor-toolbar").length + 1,
                    this.options = c(d, this.defaults),
                    this.setup()
            },
            setup: function() {
                this.isActive = !0,
                    this.initElements().bindSelect().bindWindowActions()
            },
            initElements: function() {
                this.elements = "string" == typeof this.elementSelection ? b.querySelectorAll(this.elementSelection) : this.elementSelection;
                var a;
                for (a = 0; a < this.elements.length; a += 1) this.elements[a].setAttribute("data-medium-element", !0);
                return this.options.elementsContainer || (this.options.elementsContainer = b.body),
                    this.initToolbar().bindButtons(),
                    this
            },
            buttonTemplate: function(a) {
                var b = {
                    remark: '<button data-action="remark"><i class="icon-comment"></i></button>',
                    highlight: '<button data-action="highlight"><i class="icon-pencil"></i></button>'
                };
                return b[a] || !1
            },
            initToolbar: function() {
                return this.toolbar ? this: (this.toolbar = this.createToolbar(), this.keepToolbarAlive = !1, this.toolbarActions = this.toolbar.querySelector(".medium-editor-toolbar-actions"), this)
            },
            createToolbar: function() {
                var a = b.createElement("div");
                return a.id = "medium-editor-toolbar-" + this.id,
                    a.className = "medium-editor-toolbar",
                    a.appendChild(this.toolbarButtons()),
                    this.options.elementsContainer.appendChild(a),
                    a
            },
            toolbarButtons: function() {
                var a, c, d, e, g = this.options.buttons,
                    h = b.createElement("ul");
                for (h.id = "medium-editor-toolbar-actions", h.className = "medium-editor-toolbar-actions clearfix", c = 0; c < g.length; c += 1) this.options.extensions.hasOwnProperty(g[c]) ? (e = this.options.extensions[g[c]], d = void 0 !== e.getButton ? e.getButton() : null) : d = this.buttonTemplate(g[c]),
                d && (a = b.createElement("li"), f(d) ? a.appendChild(d) : a.innerHTML = d, h.appendChild(a));
                return h
            },
            bindSelect: function() {
                var a = this,
                    c = "";
                return this.checkSelectionWrapper = function() {
                    clearTimeout(c),
                        c = setTimeout(function() {
                                a.checkSelection()
                            },
                            a.options.delay)
                },
                    b.documentElement.addEventListener("mouseup", this.checkSelectionWrapper),
                    this
            },
            checkSelection: function() {
                var b, c = this.getMediumElementForShowingToolBar();
                if (null === c || c === !1 || this.getSideRemark().isPopulatedNoteRemarks() === !1) return this.hideToolbarActions(),
                    this;
                if (this.keepToolbarAlive !== !0 && !this.options.disableToolbar) if (b = a.getSelection(), "" !== b.toString().trim() && this.isToolbarShowableForSelection()) {
                    var d = b.getRangeAt(0);
                    if (d && !b.isCollapsed) {
                        var e = this.getTopLevelMediumElement(d.commonAncestorContainer),
                            f = e.getAttribute("data-anchor-id");
                        f ? this.checkSelectionElement(b) : this.hideToolbarActions()
                    } else this.hideToolbarActions()
                } else this.hideToolbarActions();
                return this
            },
            isToolbarShowableForSelection: function() {
                var a = d().replace(/<[\S]+><\/[\S]+>/gim, ""),
                    b = a.match(/(<[\s\S]+?>|<\/[\s\S]+?>)/g);
                if (b = b ? b.length: 0, 0 === b) return ! 0;
                var c = a.match(/(<(strong|em|code|a|del|span|i|br)?>|<(strong|em|code|a|del|span|i|br)(\s+?|\s+[\s\S]+?)>|<\/(strong|em|code|a|del|span|i|br)?>)/g);
                return c = c ? c.length: 0,
                    b === c ? !0 : !1
            },
            checkSelectionElement: function(a) {
                this.selection = a,
                    this.selectionRange = this.selection.getRangeAt(0),
                    this.setToolbarPosition().showToolbarActions()
            },
            toolbarShownForMediumElements: ["blockquote", "pre", "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong", "em", "code", "a", "del", "span", "i", "br"],
            getMediumElementForShowingToolBar: function() {
                var b, c, d, e, f = a.getSelection(),
                    g = this.toolbarShownForMediumElements,
                    h = function(a) {
                        var b = !0,
                            c = a;
                        try {
                            for (; ! c.getAttribute("data-medium-element");) b === !0 && -1 === g.indexOf(c.tagName.toLowerCase()) && (b = !1),
                                c = c.parentNode
                        } catch(d) {
                            return null
                        }
                        return b
                    };
                try {
                    if (b = f.getRangeAt(0), c = b.commonAncestorContainer, d = c.parentNode, c.getAttribute("data-medium-element")) return ! 1;
                    e = h(d)
                } catch(i) {
                    e = h(d)
                }
                return e
            },
            setToolbarPosition: function() {
                var b = 50,
                    c = a.getSelection(),
                    d = c.getRangeAt(0),
                    e = d.getBoundingClientRect(),
                    f = this.options.diffLeft - this.toolbar.offsetWidth / 2,
                    g = (e.left + e.right) / 2,
                    h = this.toolbar.offsetWidth / 2;
                return e.top < b ? (this.toolbar.classList.add("medium-toolbar-arrow-over"), this.toolbar.classList.remove("medium-toolbar-arrow-under"), this.toolbar.style.top = b + e.bottom - this.options.diffTop + a.pageYOffset - this.toolbar.offsetHeight + "px") : (this.toolbar.classList.add("medium-toolbar-arrow-under"), this.toolbar.classList.remove("medium-toolbar-arrow-over"), this.toolbar.style.top = e.top + this.options.diffTop + a.pageYOffset - this.toolbar.offsetHeight + "px"),
                    this.toolbar.style.left = h > g ? f + h + "px": a.innerWidth - g < h ? a.innerWidth + f - h + "px": f + g + "px",
                    this
            },
            bindButtons: function() {
                var a, b = this.toolbar.querySelectorAll("button"),
                    c = this,
                    d = function(a) {
                        a.preventDefault(),
                            a.stopPropagation(),
                        void 0 === c.selection && c.checkSelection(),
                        this.hasAttribute("data-action") && c.execAction(this.getAttribute("data-action"), a)
                    };
                for (a = 0; a < b.length; a += 1) b[a].addEventListener("click", d);
                return this.setFirstAndLastItems(b),
                    this
            },
            setFirstAndLastItems: function(a) {
                return a.length > 0 && (a[0].className += " " + this.options.firstButtonClass, a[a.length - 1].className += " " + this.options.lastButtonClass),
                    this
            },
            deselectText: function() {
                var c = e();
                if ("" !== c) {
                    var d = this.getMediumElementForShowingToolBar();
                    null !== d && (a.getSelection ? a.getSelection().empty ? a.getSelection().empty() : a.getSelection().removeAllRanges && a.getSelection().removeAllRanges() : b.selection && b.selection.empty())
                }
            },
            getTopLevelMediumElement: function(a) {
                try {
                    a.getAttribute("data-medium-element")
                } catch(b) {
                    a = a.parentNode
                }
                var c = null;
                try {
                    for (; ! a.getAttribute("data-medium-element");) c = a,
                        a = a.parentNode
                } catch(d) {
                    return null
                }
                return c
            },
            highlight: function(a, c, d) {
                this.removeHighlight(),
                    this.backupTopLevelMediumElement = a.innerHTML;
                var e = b.createRange(),
                    f = 0,
                    g = !1,
                    h = !1,
                    i = function(a) {
                        for (var b in a.childNodes) {
                            var j = a.childNodes[b];
                            if (j = 3 === j.nodeType ? j: i(j), null !== j && void 0 !== j && 0 !== j.textContent.length) {
                                if (h === !0) return;
                                if (g === !1) {
                                    if (j.textContent.length - 1 + f >= c && (e.setStart(j, c - f), g = !0, j.textContent.length + f >= d)) return e.setEnd(j, d - f),
                                        void(h = !0)
                                } else if (j.textContent.length + f >= d) return e.setEnd(j, d - f),
                                    void(h = !0);
                                f += j.textContent.length
                            }
                        }
                    };
                i(a);
                var j = b.createElement("div");
                j.appendChild(e.extractContents()),
                    j.innerHTML = '<span class="highlight-blue">' + j.innerHTML + "</span>",
                    e.insertNode(j.firstChild)
            },
            highlightSelection: function() {
                var c;
                a.getSelection ? c = a.getSelection() : "undefined" != typeof b.selection && (c = b.selection);
                var d = c.getRangeAt(0);
                if (d && !c.isCollapsed) {
                    var f = e(),
                        g = this.getTopLevelMediumElement(d.commonAncestorContainer),
                        h = g.getAttribute("data-anchor-id");
                    if (!h) return null;
                    for (var i = d.startOffset,
                             j = d.startContainer; j !== g;) null !== j.previousSibling ? (j = j.previousSibling, i += j.textContent.length) : j = j.parentNode;
                    var k = f.length,
                        l = i + k;
                    return this.getSideRemark().hideSideRemark(),
                        this.highlight(g, i, l),
                    {
                        anchorId: h,
                        highlightContent: f,
                        highlightStart: i,
                        highlightEnd: l
                    }
                }
                return null
            },
            backupTopLevelMediumElement: null,
            removeHighlight: function() {
                var a = b.getElementsByClassName("highlight-blue");
                if (a.length > 0 && null !== this.backupTopLevelMediumElement) {
                    var c = this.getTopLevelMediumElement(a[0]);
                    c.innerHTML = this.backupTopLevelMediumElement
                }
                this.backupTopLevelMediumElement = null
            },
            highlightInfo: null,
            getSideRemark: function() {
                return com.zybuluo.mdeditor.sideRemark
            },
            execAction: function(a) {
                this.highlightInfo = this.highlightSelection(),
                this.highlightInfo && ("remark" === a ? this.getSideRemark().showSideRemarkByHighlight(this.highlightInfo.anchorId, !0) : "highlight" === a && this.getSideRemark().showSideRemarkByHighlight(this.highlightInfo.anchorId, !1)),
                    this.deselectTextAndHideToolbar()
            },
            deselectTextAndHideToolbar: function() {
                this.deselectText(),
                    this.hideToolbarActions()
            },
            hideToolbarActions: function() {
                this.keepToolbarAlive = !1,
                void 0 !== this.toolbar && (this.toolbar.classList.remove("medium-editor-toolbar-active"), this.toolbar.classList.remove("medium-toolbar-arrow-under"), this.toolbar.classList.remove("medium-toolbar-arrow-over"), this.toolbar.removeAttribute("style"), this.toolbarActions.removeAttribute("style"))
            },
            showToolbarActions: function() {
                var a, b = this;
                this.toolbarActions.style.display = "block",
                    this.keepToolbarAlive = !1,
                    clearTimeout(a),
                    a = setTimeout(function() {
                            b.toolbar && !b.toolbar.classList.contains("medium-editor-toolbar-active") && b.toolbar.classList.add("medium-editor-toolbar-active")
                        },
                        100)
            },
            bindWindowActions: function() {
                var b, c = this;
                return this.windowResizeHandler = function() {
                    clearTimeout(b),
                        b = setTimeout(function() {
                                c.toolbar && c.toolbar.classList.contains("medium-editor-toolbar-active") && c.setToolbarPosition()
                            },
                            100)
                },
                    a.addEventListener("resize", this.windowResizeHandler),
                    this
            }
        }
    } (window, document),
    com.zybuluo.mdeditor.mediumEditor = function() {
        return new MediumEditor(".wmd-preview", {})
    } (),
    com.zybuluo.mdeditor.sideRemark = function() {
        var a = com.zybuluo.mdeditor.common.setCursorPositionInContenteditable,
            b = com.zybuluo.mdeditor.common.setCursorPositionEndOfContenteditable,
            c = com.zybuluo.mdeditor.common.getCurrentMode,
            d = com.zybuluo.mdeditor.mediumEditor,
            e = com.zybuluo.mdeditor.layout.initData,
            f = {
                remarkIconTopGutter: -5,
                remarkIconRightGutter: 10,
                remarkIconRightAdditionalGutter: 25,
                remarkLeftGutter: 55,
                remarkRightGutter: 50,
                maxRemarkContentLength: 400,
                maxRemarkReplyContentLength: 200
            },
            g = null,
            h = null,
            i = null,
            j = $(window),
            k = $("#wmd-preview"),
            l = $("#wmd-panel-preview"),
            m = $(".remark-list"),
            n = m.children(".remark-items"),
            o = $(".new-remark-reply.side-remark-hidden"),
            p = o.clone().removeClass("side-remark-hidden").html(),
            q = m.children(".new-remark").prepend(p),
            r = q.children(".remark-editor"),
            s = m.children(".leave-remark"),
            t = $(".remark-item.side-remark-hidden"),
            u = $(".remark-icons"),
            v = $(".remark-icon.side-remark-hidden").clone().removeClass("side-remark-hidden"),
            w = $(".remark-item-reply.side-remark-hidden"),
            x = function(a, b) {
                var c = a.find("span#default-span");
                0 !== c.length && c.remove(),
                    b.preventDefault();
                var d = null;
                if (b.clipboardData) {
                    if (d = (b.originalEvent || b).clipboardData.getData("text/plain"), d = d.replace(/(\n|\r)/gim, "").replace(/\s+/gim, " ").trim(), "" === d) return ! 1;
                    document.execCommand("insertText", !1, d)
                } else if (window.clipboardData) {
                    if (d = window.clipboardData.getData("Text"), d = d.replace(/(\n|\r)/gim, "").replace(/\s+/gim, " ").trim(), "" === d) return ! 1;
                    document.selection.createRange().pasteHTML(d)
                }
            },
            y = function(a, b, c) {
                a.attr("data-rand-id", b.rand_id).attr("data-version-id", b.version_id),
                    c ? a.children(".remark-head").find("img").css("width", "32px").css("height", "32px") : a.children(".remark-head").find("img").css("width", "24px").css("height", "24px"),
                    a.children(".remark-author").html("<strong>" + b.username + "</strong>");
                var d = a.children(".remark-editor");
                d.removeAttr("contentEditable").text(b.content),
                    d.get(0).addEventListener("paste",
                        function(a) {
                            return x(d, a)
                        });
                var f = a.children(".remark-footer");
                e.loggedInUsername === b.username ? (f.children(".remark-save").hide(), f.children(".remark-cancel").hide(), f.children(".remark-delete").hide()) : f.hide()
            },
            z = function(a) {
                var b = t.clone().removeClass("side-remark-hidden"),
                    c = b.children(".remark-options"),
                    d = c.children(".remark-private").remove(),
                    f = c.children(".remark-public").remove(),
                    g = c.children(".remark-delete").remove(),
                    h = b.children(".remark-published-link").hide();
                e.isPageOwner === !0 ? (a.public === !0 ? (c.append(f.show()), c.append(d.hide()), h.show(), h.css("right", "95px"), h.tooltip({
                    title: "点击更新地址栏以获取可分享此批注的链接",
                    placement: "top"
                })) : (c.append(d.show()), c.append(f.hide())), c.append(g.hide())) : a.public === !0 ? (c.hide(), h.show(), h.tooltip({
                    title: "点击更新地址栏以获取可分享此批注的链接",
                    placement: "top"
                })) : (c.append(d.show()), d.tooltip({
                    title: "此批注目前仅对批注者和作者可见，作者可以公开此批注使所有人可见。",
                    placement: "top"
                })),
                c.children("li").length > 1 && c.children("li:first").append('<span class="icon-chevron-down"></span>');
                var i = w.clone().removeClass("side-remark-hidden");
                i.children(".remark-delete-link").remove(),
                    c.after(i.html()),
                    y(b, a, !0);
                var j = a.username,
                    k = b.children(".remark-reply-view-more").hide(),
                    l = a.userNoteRemarkReplyUIs,
                    m = l.length;
                for (var n in l) {
                    var o = l[n],
                        p = w.clone().removeClass("side-remark-hidden remark-item-reply").addClass("remark-reply");
                    e.isPageOwner || e.loggedInUsername === j ? e.loggedInUsername === o.username ? p.children(".remark-delete-link").remove() : p.children(".remark-delete-link").tooltip({
                        title: "删除这条回复",
                        placement: "top"
                    }).hide() : p.children(".remark-delete-link").remove(),
                        y(p, o, !1),
                    m > 3 && m - 3 > n && p.hide(),
                        b.children(".remark-replies").append(p)
                }
                return m > 3 && (k.text("展开较早的 " + (m - 3) + " 条回复"), k.show()),
                    b.children(".leave-reply").show(),
                    b.children(".new-reply").hide(),
                    b
            },
            A = function() {
                var a = null,
                    b = document.getElementsByClassName("highlight-blue");
                if (b.length > 0) a = $(b[0]).position().top;
                else {
                    var c = u.children(".remark-icon-clicked");
                    if (0 === c.length) return;
                    a = c.position().top
                }
                j.scrollTop() > a ? j.scrollTop(a - 100) : (a -= j.height(), j.scrollTop() < a + 100 && j.scrollTop(a + j.height() / 2))
            },
            B = function(a, b, c) {
                var e = null,
                    g = null,
                    h = null,
                    i = null,
                    l = null,
                    o = null;
                if (m.hasClass("side-remark-hidden")) return null;
                c !== !0 && A();
                var p = document.getElementsByClassName("highlight-blue");
                if (p.length > 0) {
                    e = p[0].getBoundingClientRect().top;
                    var r = d.getTopLevelMediumElement(p[0]);
                    g = r.getBoundingClientRect().right,
                        h = r.getAttribute("data-anchor-id"),
                        i = e + (document.documentElement.scrollTop || document.body.scrollTop)
                } else {
                    var t = u.children(".remark-icon-clicked");
                    if (0 === t.length) return null;
                    e = t.position().top - f.remarkIconTopGutter,
                        g = t.position().left - f.remarkIconRightGutter,
                        h = t.attr("data-anchor-id"),
                        i = e
                }
                l = g + f.remarkLeftGutter,
                    o = g + f.remarkIconRightGutter;
                var v = l + m.width() + f.remarkRightGutter,
                    w = parseFloat(k.css("left"));
                if (w = isNaN(w) ? 0 : -1 * w, v + w > j.width()) {
                    var x = v - j.width();
                    k.animate({
                            left: "-=" + x
                        },
                        100),
                        R(o - x),
                        l -= x
                } else k.animate({
                        left: "0px"
                    },
                    100),
                    R(o + w),
                    l += w;
                if (a === !0) i -= q.is(":visible") ? m.height() - q.height() : m.height() - s.height();
                else if (void 0 !== b && b > 0) {
                    for (var y = 0,
                             z = n.children(".remark-item"), B = 0; b > B; B++) {
                        var C = $(z[B]);
                        y = y + parseInt(C.css("padding-top"), 10) + C.height() + parseInt(C.css("padding-bottom"), 10)
                    }
                    i -= y
                }
                return db = !0,
                    m.animate({
                            left: l + "px"
                        },
                        0),
                    m.animate({
                            top: i + "px"
                        },
                        100,
                        function() {
                            db = !1
                        }),
                    h
            },
            C = function() {
                var a = null,
                    b = document.getElementsByClassName("highlight-blue");
                if (b.length > 0) {
                    var c = d.getTopLevelMediumElement(b[0]);
                    a = c.getAttribute("data-anchor-id")
                } else {
                    var e = u.children(".remark-icon-clicked");
                    if (0 === e.length) return null;
                    a = e.attr("data-anchor-id")
                }
                return a
            },
            D = function(a, b) {
                var c = g[a];
                if (c && c.length > b) {
                    var e = c[b],
                        f = e.highlight_content,
                        i = e.highlight_start,
                        j = e.highlight_end;
                    if (null !== f && null !== i) {
                        var k = h[a],
                            l = k.textContent.indexOf(f, i);
                        if (l === i) return void d.highlight(k, i, j)
                    }
                    d.removeHighlight()
                }
            },
            E = function(a, c, d) {
                var e = C();
                if (null !== g && e) {
                    var f = g[e];
                    for (var h in f) {
                        var i = f[h],
                            j = z(i);
                        n.append(j)
                    }
                }
                a === !0 ? (s.hide(), q.show()) : (s.show(), q.hide());
                var k = q.children(".remark-footer").children(".remark-save");
                c ? k.addClass("highlight-save") : k.removeClass("highlight-save"),
                    A(),
                    m.removeClass("side-remark-hidden").addClass("side-remark-shown"),
                    B(c, 0),
                a === !0 && (c === !0 && d === !1 ? (r.text("高亮批注"), setTimeout(function() {
                        b(r)
                    },
                    200)) : I(q))
            },
            F = function() {
                d.highlightInfo = null,
                    r.text(""),
                    r.next(".inline-error").remove(),
                    n.html("");
                var a = u.children(".remark-icon-clicked").removeClass("remark-icon-clicked");
                a.removeClass("remark-icon-hover"),
                a.hasClass("remark-icon-empty") && a.hide()
            },
            G = function() {
                var a = c();
                if (null === a) window.location.hash.match(/([0-9a-z]{4})-([0-9a-z]{12})/) && window.history.pushState && window.history.pushState(null, "", window.location.pathname);
                else if (a.isFullReader) {
                    var b = window.location.hash.match(/^#(\d+-)?full-reader-([0-9a-z]{4})-([0-9a-z]{12})/);
                    null !== b && (window.location.hash = void 0 !== b[1] ? "#" + b[1] + "full-reader": "#full-reader")
                }
            },
            H = function() {
                G();
                var a = u.children(".remark-icon-clicked");
                if (0 !== a.length) {
                    var b = parseFloat(k.css("left"));
                    b = isNaN(b) ? 0 : -1 * b,
                        R(a.position().left + b)
                }
                k.animate({
                        left: "0px"
                    },
                    100),
                    F(),
                    m.removeClass("side-remark-shown").addClass("side-remark-hidden")
            },
            I = function(b) {
                var c = b.children(".remark-editor");
                return "" === c.text().trim() ? (c.html(b.hasClass("new-reply") ? '<p><span id="default-span">在此处回复批注</span><br></p>': '<p><span id="default-span">在此处批注</span><br></p>'), a(c.get(0), 0, 0), !0) : !1
            },
            J = com.zybuluo.mdeditor.common.wmdPreviewChildNodes_callback,
            K = null,
            L = null,
            M = function() {
                null !== L && L.hasClass("remark-icon-clicked") === !1 && (clearTimeout(K), L.hide(), L = null)
            },
            N = function(a) {
                null !== L && L.hasClass("remark-icon-clicked") === !1 && (clearTimeout(K), L.hide()),
                    L = a,
                    a.show()
            },
            O = function(a) {
                a.hasClass("remark-icon-clicked") === !1 && (clearTimeout(K), K = setTimeout(function() {
                        a.hide(),
                            L = null
                    },
                    1e3))
            },
            P = function(a, b, c, d) {
                if (c && c.length > 0) {
                    b.find(".remark-count").text(c.length),
                        b.removeClass("remark-icon-empty");
                    var e = Q(a);
                    b.attr("style", "top:" + e.top + "px;left:" + e.left + "px;")
                } else d === !1 && (b.find(".remark-count").text("+"), b.addClass("remark-icon-empty"))
            };
        u.on("mouseenter.bind", ".remark-icon[data-anchor-id]",
            function() {
                var a = $(this),
                    b = a.attr("data-anchor-id");
                if (null !== g) {
                    var c = g[b];
                    c && c.length > 0 ? M() : N(a)
                }
            }).on("mouseleave.bind", ".remark-icon[data-anchor-id]",
            function() {
                var a = $(this),
                    b = a.attr("data-anchor-id");
                if (null !== g) {
                    var c = g[b];
                    c && c.length > 0 || O(a)
                }
            }),
            k.on("mouseenter.bind", "[data-anchor-id]",
                function() {
                    var a = this,
                        b = a.getAttribute("data-anchor-id");
                    if (null !== g && null !== i) {
                        var c = g[b],
                            d = i[b];
                        if (void 0 !== d) {
                            var e = null;
                            c && c.length > 0 ? (d.find(".remark-count").text(c.length), M(), e = Q(a), d.attr("style", "top:" + e.top + "px;left:" + e.left + "px;")) : (d.find(".remark-count").text("+"), e = Q(a), d.attr("style", "top:" + e.top + "px;left:" + e.left + "px;"), N(d))
                        }
                    }
                }).on("mouseleave.bind", "[data-anchor-id]",
                function() {
                    var a = this,
                        b = a.getAttribute("data-anchor-id");
                    if (null !== g && null !== i) {
                        var c = g[b],
                            d = i[b];
                        void 0 !== d && (c && c.length > 0 || O(d))
                    }
                });
        var Q = function(a) {
                var b = a.getBoundingClientRect().top,
                    c = 0,
                    d = 0;
                "relative" === u.parent().css("position") ? (c = k.width() + f.remarkIconRightAdditionalGutter, d = b + (document.documentElement.scrollTop || document.body.scrollTop) + f.remarkIconTopGutter - l.position().top + l.scrollTop()) : (c = a.getBoundingClientRect().right, d = b + (document.documentElement.scrollTop || document.body.scrollTop) + f.remarkIconTopGutter);
                var e = c + f.remarkIconRightGutter;
                return {
                    top: d,
                    left: e
                }
            },
            R = function(a) {
                var b = u.children(".remark-icon");
                if (0 !== b.length) {
                    var c = u.children(".remark-icon:visible");
                    c.each(void 0 === a ?
                        function() {
                            var a = $(this),
                                b = a.attr("data-anchor-id"),
                                c = h[b],
                                d = Q(c);
                            a.attr("style", "top:" + d.top + "px;left:" + d.left + "px;")
                        }: function() {
                        var b = $(this);
                        b.css("left", a)
                    }),
                        u.find(".remark-icon-empty").hide(),
                        u.children(".remark-icon-clicked").show()
                }
            },
            S = function() {
                return null !== g ? !0 : !1
            },
            T = function() {
                u.html(""),
                    q.children(".remark-head").find("img").css("width", "32px").css("height", "32px"),
                    q.children(".remark-author").html("<strong>" + e.loggedInUsername + "</strong>");
                var a = function() {
                    var a = c(),
                        b = null,
                        d = null,
                        e = null,
                        f = null;
                    null === a ? b = window.location.hash.match(/([0-9a-z]{4})-([0-9a-z]{12})(-reply)?/) : a.isFullReader && (b = window.location.hash.match(/full-reader-([0-9a-z]{4})-([0-9a-z]{12})(-reply)?/)),
                    b && (d = b[1], e = b[2], f = b[3]);
                    var j = null;
                    if (h = {},
                            i = {},
                            J(function(b, c) {
                                if (c !== !1) {
                                    var e = b.getAttribute("data-anchor-id");
                                    if (null !== e) {
                                        var f = v.clone();
                                        if (null !== g) {
                                            var k = g[e];
                                            P(b, f, k, !0)
                                        }
                                        f.attr("data-anchor-id", e),
                                            u.append(f),
                                            i[e] = f,
                                            h[e] = b,
                                        e === d && (j = f)
                                    } else if (null === a) {
                                        var l = $(b);
                                        if (l.hasClass("MathJax_Display")) {
                                            var m = l.prev();
                                            if (0 === l.next().attr("id").indexOf("MathJax-Element")) {
                                                var n = l.next();
                                                m.append(l),
                                                    m.append(n)
                                            } else m.append(l)
                                        }
                                    }
                                }
                            }), j && !j.hasClass("remark-icon-empty")) {
                        M(),
                            j.trigger("click");
                        var k = n.children(".remark-item"),
                            l = null;
                        k.each(function() {
                            var a = $(this);
                            return e === a.attr("data-rand-id") ? (l = a, !1) : void 0
                        }),
                        l && setTimeout(function() {
                                l.trigger("mouseenter"),
                                    l.trigger("mouseup"),
                                f && l.find(".leave-reply span").trigger("click")
                            },
                            300)
                    }
                };
                null === g ? $.get(e.noteRemarksUrl, {},
                    function(b) {
                        b.anchorUserNoteRemarkUIsMap ? (g = JSON.parse(b.anchorUserNoteRemarkUIsMap), a()) : b.error
                    },
                    "json").fail(function() {}) : a()
            },
            U = function(a, b) {
                a.next(".inline-error").remove();
                var c = a.text().trim().length;
                c > b && a.after('<div class="inline-error">' + c + "/" + b + "</div>")
            };
        $(".remark-list").on("mousedown", ".remark-editor",
            function(b) {
                if (0 !== $(this).find("span#default-span").length && window.getSelection().rangeCount > 0) {
                    var c = window.getSelection().getRangeAt(0);
                    if (c && c.commonAncestorContainer) {
                        var d = c.commonAncestorContainer.firstChild;
                        if (d && "function" == typeof d.getAttribute && "default-span" === d.getAttribute("id")) return void b.preventDefault()
                    }
                    a($(this).get(0), 0, 0),
                        b.preventDefault()
                }
            });
        var V = com.zybuluo.common.popupConfirm.popup,
            W = function(a) {
                if (m.hasClass("side-remark-shown")) {
                    var c = function(c) {
                            V("提醒", "您有未保存的批注信息，是否确认放弃？",
                                function() {
                                    $("#notification-popup-window").modal("hide"),
                                        a()
                                },
                                function() {
                                    b(c)
                                })
                        },
                        d = !1;
                    if ($(".remark-item>.remark-editor[contentEditable='true'], .remark-reply>.remark-editor[contentEditable='true']").each(function() {
                            var a = $(this),
                                b = a.parent(".remark-item"),
                                e = Z(b),
                                f = e.userNoteRemarkUI,
                                g = a.parent(".remark-reply");
                            if (0 === g.length) {
                                if (a.text() !== f.content) return c(a),
                                    d = !0,
                                    !1
                            } else {
                                var h = g.prevAll().length;
                                if (a.text() !== f.userNoteRemarkReplyUIs[h].content) return c(a),
                                    d = !0,
                                    !1
                            }
                        }), d) return;
                    $(".new-reply>.remark-editor[contentEditable='true'], .new-remark>.remark-editor[contentEditable='true']").each(function() {
                        var b = $(this),
                            e = b.find("span#default-span");
                        return 0 === e.length && b.text().trim().length > 0 && (0 !== b.parent(".new-reply").length || "高亮批注" !== b.text()) ? (c(b), d = !0, !1) : void a()
                    })
                } else a()
            };
        $("body").on("mouseup",
            function() {
                W(function() {
                    d.removeHighlight(),
                        H()
                })
            }),
            m.on("mouseup",
                function() {
                    return ! 1
                }),
            u.on("mouseup", ".remark-icon",
                function() {
                    return ! 1
                }),
            $("#notification-popup-window").on("mouseup",
                function() {
                    return ! 1
                }),
            $("#preview-reader-small-button").on("mouseup",
                function() {
                    return ! 1
                });
        var X = com.zybuluo.common.browserType;
        X.isOpera || X.isFirefox ? ($(".remark-list").on("input", ".remark-editor[contentEditable='true']",
            function() {
                var a = $(this).find("span#default-span");
                0 !== a.length && a.remove();
                var b = $(this);
                b.parent(".new-reply").length > 0 || b.parent(".remark-reply").length > 0 ? U(b, f.maxRemarkReplyContentLength) : U(b, f.maxRemarkContentLength)
            }), $(".remark-list").on("keypress", ".remark-editor[contentEditable='true']",
            function(a) {
                var b = a.charCode || a.keyCode;
                return 13 === b ? ($(this).next(".remark-footer").children(".remark-save").trigger("click"), !1) : void 0
            })) : ($(".remark-list").on("keydown", ".remark-editor[contentEditable='true']",
            function(a) {
                var b = a.charCode || a.keyCode;
                if (13 === b) return $(this).next(".remark-footer").children(".remark-save").trigger("click"),
                    !1;
                var c = $(this).find("span#default-span");
                0 !== c.length && c.remove()
            }), $(".remark-list").on("keyup", ".remark-editor[contentEditable='true']",
            function() {
                var a = $(this);
                a.parent(".new-reply").length > 0 || a.parent(".remark-reply").length > 0 ? U(a, f.maxRemarkReplyContentLength) : U(a, f.maxRemarkContentLength)
            }))
        var Y = function(a, b, c) {
            var d = a.find("span#default-span");
            if (0 !== d.length) return c.trigger("click"),
                null;
            var e = a.text().trim(),
                f = e.length;
            return f > b ? null: 0 === f ? (c.trigger("click"), null) : e
        };
        n.on("click", ".remark-edit",
            function() {
                var a = $(this).parent(".remark-footer"),
                    c = a.siblings(".remark-editor");
                c.attr("contentEditable", "true"),
                    a.children().show(),
                    $(this).hide(),
                    setTimeout(function() {
                            b(c)
                        },
                        200)
            });
        var Z = function(a) {
            var b = C(),
                c = h[b],
                d = g[b],
                e = a.prevAll().length,
                f = d[e];
            return {
                anchorId: b,
                wmdPreviewChildNode: c,
                userNoteRemarkUIs: d,
                indexOfRemarkItem: e,
                userNoteRemarkUI: f
            }
        };
        n.on("click", ".remark-item > .remark-footer > .remark-cancel, .remark-reply > .remark-footer > .remark-cancel",
            function() {
                var a = $(this).parents(".remark-item"),
                    b = Z(a),
                    c = b.userNoteRemarkUI,
                    d = $(this).parent(".remark-footer"),
                    e = d.siblings(".remark-editor"),
                    f = d.parent(".remark-reply");
                if (f.length > 0) {
                    var g = f.prevAll().length;
                    e.removeAttr("contentEditable").text(c.userNoteRemarkReplyUIs[g].content)
                } else e.removeAttr("contentEditable").text(c.content);
                e.next(".inline-error").remove(),
                    d.children().hide(),
                    d.children(".remark-edit").show()
            });
        var _ = function(a) {
                var b = "【" + a + "】需要用户登录，现在登录？";
                return e.loggedInUsername ? !0 : (V(a, b,
                    function() {
                        window.location = e.loginComeFromUrl
                    }), !1)
            },
            ab = function(a) {
                var b = "确认删除这条批注吗？";
                window.confirm(b) && (Pace.restart(), $.post(e.deleteNoteRemarkUrl, {
                        remark_rand_id: a.attr("data-rand-id"),
                        version_id: a.attr("data-version-id")
                    },
                    function(b) {
                        if (b.loggedin === !1) window.location = e.loginComeFromUrl;
                        else if (b.success === !0) {
                            var c = Z(a),
                                f = c.userNoteRemarkUIs,
                                g = c.indexOfRemarkItem;
                            f.splice(g, 1),
                                a.remove(),
                                d.removeHighlight();
                            var h = u.children(".remark-icon-clicked"),
                                i = c.wmdPreviewChildNode;
                            1 === h.length && i && P(i, h, f, !1)
                        } else b.version_error === !0 ? V("删除批注", '批注已在别处被更新，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试') : b.error && V("删除批注", '出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                    },
                    "json").fail(function() {
                        V("删除批注", '出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                    }))
            };
        n.on("click", ".remark-item > .remark-footer > .remark-delete",
            function() {
                var a = $(this).parents(".remark-item");
                ab(a)
            }),
            n.on("click", ".remark-item > .remark-options > .remark-delete",
                function() {
                    var a = $(this).parents(".remark-item");
                    ab(a)
                });
        var bb = function(a, b) {
            var c = "确认删除这条批注回复吗？";
            window.confirm(c) && (Pace.restart(), $.post(e.deleteNoteRemarkReplyUrl, {
                    remark_rand_id: a.attr("data-rand-id"),
                    remark_reply_rand_id: b.attr("data-rand-id"),
                    version_id: b.attr("data-version-id")
                },
                function(c) {
                    if (c.loggedin === !1) window.location = e.loginComeFromUrl;
                    else if (c.success === !0) {
                        var d = Z(a),
                            f = d.userNoteRemarkUI;
                        f.userNoteRemarkReplyUIs.splice(b.prevAll().length, 1),
                            b.remove();
                        var g = a.children(".remark-reply-view-more"),
                            h = g.siblings(".remark-replies"),
                            i = h.children(".remark-reply"),
                            j = i.length;
                        j === h.children(".remark-reply:visible").length ? j > 3 ? g.text("收起较早的 " + (j - 3) + " 条回复") : g.hide() : j >= 3 && ($(i[j - 3]).show(), j - 3 > 0 ? g.text("展开较早的 " + (j - 3) + " 条回复") : g.hide())
                    } else c.version_error === !0 ? V("删除批注回复", '批注回复已在别处被更新，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试') : c.error && V("删除批注回复", '出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                },
                "json").fail(function() {
                    V("删除批注回复", '出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                }))
        };
        n.on("click", ".remark-reply > .remark-footer > .remark-delete",
            function() {
                var a = $(this),
                    b = a.parents(".remark-item"),
                    c = a.parent(".remark-footer").parent(".remark-reply");
                bb(b, c)
            }),
            n.on("click", ".remark-reply > .remark-delete-link",
                function() {
                    var a = $(this),
                        b = a.parents(".remark-item"),
                        c = a.parent(".remark-reply");
                    bb(b, c)
                }),
            n.on("click", ".remark-item > .remark-footer > .remark-save",
                function() {
                    var a = $(this).parent(".remark-footer").siblings(".remark-editor"),
                        b = $(this).siblings(".remark-delete"),
                        c = Y(a, f.maxRemarkContentLength, b);
                    if (null !== c) {
                        var d = $(this).parents(".remark-item"),
                            g = Z(d),
                            h = g.userNoteRemarkUI;
                        Pace.restart(),
                            $.post(e.updateNoteRemarkUrl, {
                                    remark_rand_id: d.attr("data-rand-id"),
                                    version_id: d.attr("data-version-id"),
                                    content: c
                                },
                                function(b) {
                                    if (b.loggedin === !1) window.location = e.loginComeFromUrl;
                                    else if (b.content && b.version_id) {
                                        h.content = b.content,
                                            h.version_id = b.version_id,
                                            d.attr("data-version-id", b.version_id),
                                            a.removeAttr("contentEditable").text(h.content);
                                        var c = d.children(".remark-footer");
                                        c.children().hide(),
                                            c.children(".remark-edit").show()
                                    } else b.version_error === !0 ? V("保存失败", '批注已在别处被更新，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试') : b.error && V("保存失败", '出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                                },
                                "json").fail(function() {
                                    V("保存失败", '出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                                })
                    }
                }),
            n.on("click", ".remark-reply > .remark-footer > .remark-save",
                function() {
                    var a = $(this).parent(".remark-footer").siblings(".remark-editor"),
                        b = $(this).siblings(".remark-delete"),
                        c = Y(a, f.maxRemarkReplyContentLength, b);
                    if (null !== c) {
                        var d = $(this).parents(".remark-item"),
                            g = $(this).parent(".remark-footer"),
                            h = g.parent(".remark-reply");
                        Pace.restart(),
                            $.post(e.updateNoteRemarkReplyUrl, {
                                    remark_rand_id: d.attr("data-rand-id"),
                                    remark_reply_rand_id: h.attr("data-rand-id"),
                                    version_id: h.attr("data-version-id"),
                                    content: c
                                },
                                function(b) {
                                    if (b.loggedin === !1) window.location = e.loginComeFromUrl;
                                    else if (b.content && b.version_id) {
                                        var c = Z(d),
                                            f = c.userNoteRemarkUI,
                                            i = f.userNoteRemarkReplyUIs[h.prevAll().length];
                                        i.content = b.content,
                                            i.version_id = b.version_id,
                                            h.attr("data-version-id", b.version_id),
                                            a.removeAttr("contentEditable").text(i.content),
                                            g.children().hide(),
                                            g.children(".remark-edit").show()
                                    } else b.version_error === !0 ? V("保存失败", '批注回复已在别处被更新，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试') : b.error && V("保存失败", '出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                                },
                                "json").fail(function() {
                                    V("保存失败", '出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                                })
                    }
                });
        var cb = function(a, b) {
            var c = Z(a),
                d = c.userNoteRemarkUI;
            b !== d.public && (Pace.restart(), $.post(e.publishNoteRemarkUrl, {
                    remark_rand_id: a.attr("data-rand-id"),
                    version_id: a.attr("data-version-id"),
                    is_public: b
                },
                function(b) {
                    if (b.loggedin === !1) window.location = e.loginComeFromUrl;
                    else if (void 0 !== b.is_public && b.version_id) {
                        d.public = b.is_public,
                            d.version_id = b.version_id,
                            a.attr("data-version-id", b.version_id);
                        var c = a.children(".remark-options");
                        c.children("li:first").children(".icon-chevron-down").remove();
                        var f = a.children(".remark-published-link").hide();
                        b.is_public === !0 ? (c.prepend(c.children(".remark-public")), f.show(), f.css("right", "95px"), f.tooltip({
                            title: "点击更新地址栏以获取可分享此批注的链接",
                            placement: "top"
                        })) : c.prepend(c.children(".remark-private")),
                            c.children().hide(),
                            c.children("li:first").append('<span class="icon-chevron-down"></span>').show()
                    } else b.version_error === !0 ? V("保存失败", '批注已在别处被更新，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试') : b.error && V("保存失败", '出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                },
                "json").fail(function() {
                    V("保存失败", '出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                }))
        };
        n.on("click", ".remark-item > .remark-options > .remark-public",
            function() {
                var a = $(this).parents(".remark-item");
                cb(a, !0)
            }),
            n.on("click", ".remark-item > .remark-options > .remark-private",
                function() {
                    var a = $(this).parents(".remark-item");
                    cb(a, !1)
                }),
            n.on("click", ".remark-item > .remark-published-link",
                function() {
                    var a = $(this).parents(".remark-item"),
                        b = C(),
                        d = c();
                    if (null === d) window.location.hash = b + "-" + a.attr("data-rand-id");
                    else if (d.isFullReader) {
                        var e = "",
                            f = window.location.hash.match(/^#(\d+-)?full-reader/);
                        null !== f && void 0 !== f[1] && (e = f[1]),
                            window.location.hash = e + "full-reader-" + b + "-" + a.attr("data-rand-id"),
                        window.desktopGui && window.open(window.location.href)
                    }
                }),
            n.on("click", ".leave-reply span",
                function() {
                    if (_("添加新回复")) {
                        var a = $(this).parent(".leave-reply"),
                            b = a.siblings(".new-reply"),
                            c = o.clone().removeClass("side-remark-hidden").html();
                        b.prepend(c),
                            b.children(".remark-head").find("img").css("width", "24px").css("height", "24px"),
                            b.children(".remark-author").html("<strong>" + e.loggedInUsername + "</strong>"),
                            a.hide(),
                            b.show(),
                            I(b)
                    }
                }),
            n.on("click", ".new-reply .remark-cancel",
                function() {
                    var a = $(this).parents(".new-reply").html("").hide();
                    a.siblings(".leave-reply").show()
                }),
            n.on("click", ".new-reply .remark-save",
                function() {
                    var a = $(this),
                        b = a.siblings(".remark-cancel"),
                        c = a.parent(".remark-footer"),
                        d = c.siblings(".remark-editor"),
                        g = Y(d, f.maxRemarkReplyContentLength, b);
                    if (null !== g) {
                        var h = a.parents(".remark-item"),
                            i = {
                                remark_rand_id: h.attr("data-rand-id"),
                                content: g
                            };
                        Pace.restart(),
                            $.post(e.newNoteRemarkReplyUrl, i,
                                function(a) {
                                    if (a.loggedin === !1) window.location = e.loginComeFromUrl;
                                    else if (a.userNoteRemarkReplyUI) {
                                        var c = JSON.parse(a.userNoteRemarkReplyUI),
                                            d = w.clone().removeClass("side-remark-hidden remark-item-reply").addClass("remark-reply");
                                        d.children(".remark-delete-link").remove(),
                                            y(d, c, !1),
                                            h.children(".remark-replies").append(d),
                                            b.trigger("click");
                                        var f = Z(h),
                                            g = f.userNoteRemarkUI,
                                            i = g.userNoteRemarkReplyUIs;
                                        i ? i.push(c) : (i = [c], g.userNoteRemarkReplyUIs = i)
                                    } else a.error
                                },
                                "json").fail(function() {})
                    }
                }),
            n.on("click", ".remark-reply-view-more",
                function() {
                    var a = $(this),
                        b = a.siblings(".remark-replies"),
                        c = b.children(".remark-reply"),
                        d = c.length;
                    d === b.children(".remark-reply:visible").length ? (c.each(function(a) {
                        d > 3 && d - 3 > a && $(this).hide()
                    }), a.text("展开较早的 " + (d - 3) + " 条回复")) : (c.show(), a.text("收起较早的 " + (d - 3) + " 条回复"))
                }),
            s.on("click",
                function() {
                    _("添加新批注") && (s.hide(), q.show(), I(q))
                }),
            q.on("mouseenter",
                function() {
                    if (d.highlightInfo) {
                        var a = h[d.highlightInfo.anchorId];
                        d.highlight(a, d.highlightInfo.highlightStart, d.highlightInfo.highlightEnd)
                    } else d.removeHighlight()
                }).on("mouseleave",
                function() {}),
            q.on("click", ".remark-cancel",
                function() {
                    n.children(".remark-item").length > 0 ? (r.text(""), r.next(".inline-error").remove(), q.hide(), s.show()) : (H(), d.removeHighlight())
                }),
            q.on("click", ".remark-save",
                function() {
                    var a = $(this),
                        b = a.siblings(".remark-cancel"),
                        c = Y(r, f.maxRemarkContentLength, b);
                    if (null !== c) {
                        var i = u.children(".remark-icon-clicked");
                        if (0 !== i.length) {
                            var j = i.attr("data-anchor-id"),
                                k = h[j].textContent,
                                l = null;
                            l = a.hasClass("highlight-save") && null !== d.highlightInfo ? {
                                content: c,
                                anchor_id: d.highlightInfo.anchorId,
                                anchor_content: k,
                                highlight_content: d.highlightInfo.highlightContent,
                                highlight_start: d.highlightInfo.highlightStart,
                                highlight_end: d.highlightInfo.highlightEnd
                            }: {
                                content: c,
                                anchor_id: j,
                                anchor_content: k
                            },
                                Pace.restart(),
                                $.post(e.newNoteRemarkUrl, l,
                                    function(b) {
                                        if (b.loggedin === !1) window.location = e.loginComeFromUrl;
                                        else if (b.userNoteRemarkUI) {
                                            var c = JSON.parse(b.userNoteRemarkUI),
                                                f = z(c);
                                            n.append(f),
                                                q.hide(),
                                                s.show(),
                                                r.text(""),
                                                a.removeClass("highlight-save"),
                                                d.highlightInfo = null;
                                            var j = g[c.anchor_id];
                                            j ? j.push(c) : (j = [c], g[c.anchor_id] = j);
                                            var k = h[c.anchor_id];
                                            1 === i.length && k && (L = null, P(k, i, j, !1))
                                        } else b.error
                                    },
                                    "json").fail(function() {})
                        }
                    }
                }),
            n.on("mouseenter", ".remark-item .remark-options",
                function() {
                    $(this).children().show()
                }).on("mouseleave", ".remark-item .remark-options",
                function() {
                    $(this).children().hide(),
                        $(this).children("li:first").show()
                }),
            u.on("mouseenter", ".remark-icon",
                function() {
                    $(this).addClass("remark-icon-hover")
                }).on("mouseleave", ".remark-icon",
                function() {
                    $(this).removeClass("remark-icon-hover")
                }),
            n.on("mouseenter", ".remark-reply",
                function() {
                    $(this).children(".remark-delete-link").show()
                }).on("mouseleave", ".remark-reply",
                function() {
                    $(this).children(".remark-delete-link").hide()
                }),
            n.on("mouseup", ".remark-item",
                function(a) {
                    var b = $(this);
                    if (b.hasClass("remark-item-active")) {
                        var c = $(a.target);
                        1 === c.parents(".remark-footer").length || c.is(".remark-editor[contentEditable='true']") || 1 === c.parents(".remark-editor[contentEditable='true']").length || c.is(".leave-reply") || 1 === c.parents(".leave-reply").length ? B(!1, $(this).prevAll().length, !0) : B(!1, $(this).prevAll().length)
                    } else n.children(".remark-item-active").removeClass("remark-item-active"),
                        b.addClass("remark-item-active"),
                        B(!1, $(this).prevAll().length)
                });
        var db = !1;
        n.on("mouseenter", ".remark-item",
            function() {
                var a = $(this);
                if (db) return X.isFirefox && setTimeout(function() {
                        a.trigger("mouseenter")
                    },
                    500),
                    !1;
                var b = u.children(".remark-icon-clicked"),
                    c = b.attr("data-anchor-id");
                D(c, a.prevAll().length)
            }).on("mouseleave", ".remark-item",
            function() {
                var a = $(this);
                if (db) return X.isFirefox && setTimeout(function() {
                        a.trigger("mouseleave")
                    },
                    500),
                    !1;
                if (d.removeHighlight(), $remarkItemActive = n.children(".remark-item-active"), 1 === $remarkItemActive.length) {
                    var b = u.children(".remark-icon-clicked"),
                        c = b.attr("data-anchor-id");
                    D(c, $remarkItemActive.prevAll().length)
                }
            });
        var eb = function(a, b, c) {
            var f = u.children(".remark-icon-clicked"),
                g = function() {
                    if (a.addClass("remark-icon-clicked"), b === !0) e.loggedInUsername ? E(!0, !0, c) : E(!1, !0, null);
                    else if (a.hasClass("remark-icon-empty") === !0) e.loggedInUsername ? E(!0, !1, null) : E(!1, !1, null);
                    else {
                        E(!1, !1, null);
                        var d = a.attr("data-anchor-id");
                        D(d, 0)
                    }
                };
            0 === f.length ? g() : (d.removeHighlight(), a.attr("data-anchor-id") !== f.attr("data-anchor-id") ? (F(), g()) : (H(), a.hasClass("remark-icon-empty") === !0 && a.show()))
        };
        u.on("click", ".remark-icon",
            function() {
                d.deselectTextAndHideToolbar();
                var a = $(this),
                    b = c();
                b && b.isEditorReader ? com.zybuluo.mdeditor.mode.switchFullReaderMode(function() {
                    a.hasClass("remark-icon-empty") === !0 ? N(a) : M(),
                        eb(a, !1, null)
                }) : W(function() {
                    eb(a, !1, null)
                })
            }),
            u.on("highlightClick", ".remark-icon",
                function(a) {
                    var b = $(this);
                    W(function() {
                        eb(b, !0, a.isRemarkOrHighlight)
                    })
                });
        var fb = function(a, b) {
                var c = u.children(".remark-icon");
                for (var d in c) {
                    var e = c[d];
                    if (e.getAttribute("data-anchor-id") === a) {
                        var f = $(e);
                        f.hasClass("remark-icon-empty") === !0 ? N(f) : M(),
                            f.trigger({
                                type: "highlightClick",
                                isRemarkOrHighlight: b
                            });
                        break
                    }
                }
            },
            gb = function(a, b) {
                var d = c();
                d && d.isEditorReader ? com.zybuluo.mdeditor.mode.switchFullReaderMode(function() {
                    fb(a, b)
                }) : fb(a, b)
            };
        return {
            relocateRemarkIcons: R,
            relocateSideRemark: B,
            hideSideRemark: H,
            populateNoteRemarks: T,
            isPopulatedNoteRemarks: S,
            showSideRemarkByHighlight: gb
        }
    } ();