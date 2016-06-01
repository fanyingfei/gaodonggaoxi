/*! zybuluo */
if (window.desktopGui) {
    var gui = window.desktopGui,
        win = gui.Window.get();
    if (gui.App.manifest.isFirstTimeStartup) {
        if (gui.App.manifest.isFirstTimeStartup = !1, process.on("uncaughtException",
                function(a) {
                    console.error(a)
                }), "darwin" === process.platform) {
            var nativeMenuBar = new gui.Menu({
                type: "menubar"
            });
            nativeMenuBar.createMacBuiltin("Cmd Markdown"),
                win.menu = nativeMenuBar
        }
        win.show(),
            win.maximize(),
            win.on("new-win-policy",
                function(a, b, c) {
                    gui.Shell.openExternal(b),
                        c.ignore()
                })
    }
}
com.zybuluo.mdeditor.unifiedEditor = function() {
    function a() {
        window.lightMode || (e.renderer.setPadding(15), f[0].style.fontSize = "16px", f[0].style.lineHeight = "27px", f[0].style.fontFamily = 'Menlo, Ubuntu Mono, Consolas, "Courier New", Microsoft Yahei, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif')
    }
    function b(a, b) {
        var c = require("ace/config");
        c.loadModule("ace/ext/searchbox",
            function(c) {
                c.Search(a, b)
            }),
            $(".ace_search_form .ace_search_field").attr("placeholder", "查找"),
            $(".ace_replace_form .ace_search_field").attr("placeholder", "替换成");
        var d = $(".ace_replace_form .ace_replacebtn");
        $(d[0]).text("替换"),
            $(d[1]).text("所有");
        var e = $(".ace_search_options span");
        $(e[0]).attr("title", "按正则表达式查找"),
            $(e[1]).attr("title", "大小写敏感"),
            $(e[2]).attr("title", "查找完整单词")
    }
    function c() {
        e = ace.edit("wmd-input"),
            e.setOption("spellcheck", !0),
            e.setOption("scrollPastEnd", !0),
            e.renderer.setShowGutter(!1),
            e.renderer.setPrintMarginColumn(!1),
            e.session.setUseWrapMode(!0),
            e.session.setNewLineMode("unix"),
            e.setTheme("ace/theme/dawn");
        var c = require("ace/mode/markdown").Mode;
        return e.getSession().setMode(new c),
            e.session.$selectLongWords = !0,
            a(),
            e.setKeyboardHandler(""),
            e.$blockScrolling = 1 / 0,
            e.commands.addCommands([{
                name: "Find",
                bindKey: {
                    win: "Ctrl-F",
                    mac: "Command-F"
                },
                exec: function(a) {
                    b(a, !1)
                },
                readOnly: !0
            },
                {
                    name: "Replace",
                    bindKey: {
                        win: "Ctrl-Shift-F",
                        mac: "Command-Option-F"
                    },
                    exec: function(a) {
                        b(a, !0)
                    },
                    readOnly: !0
                }]),
            e
    }
    var d, e, f, g = $("#wmd-input").text();
    window.lightMode ? ($("#wmd-panel-editor").html("").append('<textarea class="wmd-input theme" id="wmd-input" spellcheck="false" autocomplete="off"></textarea>'), d = $("#wmd-input"), f = d, d.tabHandler()) : ($("#wmd-panel-editor").html("").append('<div style="display:none" class="wmd-input theme" id="wmd-input"></div>'), f = $("#wmd-input"), e = c()),
        f.on("keydown",
            function(a) {
                var b = a.charCode || a.keyCode;
                switch (b) {
                    case 27:
                        a.preventDefault()
                }
            });
    var h = {
        initValue: function(a) {
            if (window.lightMode) d.text(a);
            else {
                e.setValue(a, -1);
                var b = e.getSession().getUndoManager();
                b.reset(),
                    e.getSession().setUndoManager(b),
                    f.css("display", "block")
            }
        },
        getDefaultDocument: function() {
            return g
        },
        setValue: function(a) {
            window.lightMode ? d.val(a) : e.setValue(a, -1)
        },
        getValue: function() {
            return window.lightMode ? d.val() : e.getValue()
        },
        focus: function() {
            window.lightMode ? d.focus() : e.focus()
        },
        getEditor: function() {
            return window.lightMode ? d: e
        },
        getWmdInput: function() {
            return f
        },
        restoreAceEditor: a,
        applyTheme: function(a) {
            window.lightMode || e.setTheme("theme-black" === a ? "ace/theme/tomorrow_night_eighties": "ace/theme/dawn")
        },
        applyMode: function(a) {
            window.lightMode || (e.setKeyboardHandler("vim" === a ? "ace/keyboard/vim": "emacs" === a ? "ace/keyboard/emacs": ""), e.focus())
        },
        showLineNumber: function(a) {
            window.lightMode || (e.renderer.setShowGutter(a), e.focus())
        },
        searchEditor: function(a) {
            window.lightMode || b(e, a)
        },
        warningToSaveBeforeLogin: function(a) {
            var b = window.lightMode ? d.val() : e.getValue(),
                c = g.length - b.length;
            if (c = c >= 0 ? c: -1 * c, c >= 50) {
                var f = window.confirm("警告！未登录状态下继续当前操作会丢失正在编辑的内容，如需保存请点击取消后自行复制编辑区内容保存，点击确定放弃保存继续当前操作。");
                f === !0 && a()
            } else a()
        }
    };
    return h
} (),
    com.zybuluo.mdeditor.fileManager = function() {
        function a(a) {
            o().isEditorReader && (a ? ($("#preview-published-button").show(), $("#preview-publish-button").hide(), $("#preview-published-td").show(), $("#preview-publish-td").hide()) : ($("#preview-publish-button").show(), $("#preview-published-button").hide(), $("#preview-publish-td").show(), $("#preview-published-td").hide())),
                p.isPublic = a
        }
        function b(b, c) {
            c = new Date(c).format("Y-m-d H:i"),
                parentATag = $("ul#file-list span.whiter-on-black").parent("a"),
                b === !0 ? (parentATag.attr("title", "【已发布】 " + c), parentATag.find("i").removeClass().addClass("icon-share-sign"), a(b)) : (parentATag.attr("title", "【未发布】 " + c), parentATag.find("i").removeClass().addClass("icon-share"), a(b));
            var d = $(".article-updated-date");
            0 !== d.length && d.each(function() {
                $(this).html(c)
            })
        }
        function c(a) {
            var b = $("#file-list .whiter-on-black").first().parent("a").parent("li"),
                c = b.siblings(".tag-item"),
                d = [];
            $("#file-list .tag-item").each(function() {
                var c = $(this).attr("tag-name"),
                    e = $(this).children(".tag-count"),
                    f = $(this).parent("ul.tag-list"),
                    g = f.find(".whiter-on-black"),
                    h = 0 !== g.length;
                if ( - 1 !== a.indexOf(c)) {
                    if (!h) {
                        var i = null;
                        $(this).nextAll().each(function() {
                            return b.attr("file-created-date") > $(this).attr("file-created-date") ? (i = $(this), !1) : void 0
                        }),
                            null === i ? f.append(b.clone()) : i.before(b.clone()),
                            e.text(Number(e.text()) + 1)
                    }
                    d.push(c)
                } else h && (1 === $(this).siblings().length ? $(this).parent("ul.tag-list").parent("li").remove() : (g.parent("a").parent("li").remove(), e.text(Number(e.text()) - 1)))
            });
            var e = function(a) {
                    var b = null;
                    return $("#file-list .tag-item").each(function() {
                        return a < $(this).attr("tag-name") ? (b = $(this), !1) : void 0
                    }),
                        b
                },
                f = $("#file-list");
            for (var g in a) {
                var h = a[g];
                if ( - 1 === d.indexOf(h)) {
                    var i = $('<li><ul class="tag-list"></ul></li>');
                    i.find(".tag-list").append(c.clone()),
                        i.find(".tag-name").text(h),
                        i.find(".tag-count").text("1"),
                        i.find(".tag-item").attr("tag-name", h).after(b.clone());
                    var j = e(h);
                    null === j ? f.append(i) : j.parent("ul").parent("li").before(i)
                }
            }
        }
        function d(a) {
            s.get(function(b) {
                if (null === b) return void t.warningToSaveBeforeLogin(function() {
                    u(p.loginComeFromUrl, "此功能需要登录，离线状态下无法登录，请连接网络后重试。")
                });
                var c = null,
                    d = null;
                a === !0 ? (c = "新建离线文稿", d = '离线文稿只存储在本机（Cmd 客户端可指定本机保存路径），任何情况下不与云端同步，保障企业级私密，确认新建离线文稿（高级会员功能）？<input style="display:none;" id="nwNewFileDialog" type="file" nwsaveas="未命名.md" />') : (c = "新建文稿", d = "当前文稿内容已保存至云端，确认新建文稿？");
                var e = !1,
                    f = !0;
                r(c, d,
                    function() {
                        if (a === !0 && e === !1) $("#notification-popup-window").modal("hide"),
                            f === !0 ? window.open(p.paymentUrl) : (toastr.clear(), com.zybuluo.mdeditor.common.setToastrOptions("toast-bottom-right", !0, "5000", "1000", null), toastr.warning("使用此功能需要升级为高级会员，离线状态下无法升级，请连接网络后重试。"));
                        else if (a === !0) if (window.desktopGui) {
                            var c = function(a) {
                                var c = document.getElementById(a);
                                c.addEventListener("change",
                                    function() {
                                        var a = this.value;
                                        this.value = "",
                                            v(b, a)
                                    },
                                    !1),
                                    c.click()
                            };
                            c("nwNewFileDialog"),
                                $("#notification-popup-window").modal("hide")
                        } else v(b, "");
                        else v(b, null)
                    },
                    null,
                    function() {
                        a === !0 && com.zybuluo.mdeditor.common.doUserTierFeature(b,
                            function() {
                                e = !0
                            },
                            function(a) {
                                f = a,
                                    e = !1
                            })
                    },
                    function() {
                        t.focus()
                    })
            })
        }
        function e() {
            s.get(function(a) {
                if (null === a) return void t.warningToSaveBeforeLogin(function() {
                    u(p.loginComeFromUrl, "此功能需要登录，离线状态下无法登录，请连接网络后重试。")
                });
                var b = "删除文稿",
                    c = $("ul#file-list span#" + p.currentId).text(),
                    d = "删除不可撤销，确认删除【<strong>" + c + "</strong>】？",
                    e = com.zybuluo.mdeditor.syncUserNotes;
                r(b, d,
                    function() {
                        e.checkLocalNoteAction(p.currentId,
                            function(a) {
                                a ? "offline" === a.action ? ($("#notification-popup-window").modal("hide"), e.deleteLocalNoteAction(p.currentId,
                                    function() {
                                        window.location.reload()
                                    },
                                    function() {
                                        window.alert("删除本地存储时出错，您的浏览器可能不支持indexedDB，或者关闭客户端/浏览器后重试，也可以联系我们。")
                                    })) : ($("#notification-popup-window").find(".modal-body p").html("正在提交您的请求......"), $.post(p.deleteUserNoteUrl, {
                                        id: p.currentId,
                                        version_id: p.currentVersionId
                                    },
                                    function(a) {
                                        if (a.loggedin === !1) $("#notification-popup-window").modal("hide"),
                                            window.location = p.loginComeFromUrl;
                                        else if (a.userNoteId) {
                                            var b = function() {
                                                $("#notification-popup-window").modal("hide"),
                                                    -1 !== a.userNoteId ? ($.localStorage("currentId", a.userNoteId), window.location.hash = "#" + a.userNoteId) : ($.localStorage("currentId", null), window.location.hash = ""),
                                                    window.location.reload()
                                            };
                                            e.deleteLocalNoteAction(p.currentId, b, b)
                                        } else a.version_error === !0 ? $("#notification-popup-window").find(".modal-body p").html('文稿已在别处被更新，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试') : a.error && $("#notification-popup-window").find(".modal-body p").html('出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                                    },
                                    "json").fail(function() {
                                        p.currentId > 0 ? e.updateLocalNoteAction(p.currentId,
                                            function(a) {
                                                a.action = "delete",
                                                    a.last_updated_date = (new Date).toISOString()
                                            },
                                            function() {
                                                window.location.reload()
                                            },
                                            function() {
                                                window.alert("更新本地存储时出错，您的浏览器可能不支持indexedDB，或者关闭客户端/浏览器后重试，也可以联系我们。")
                                            }) : e.deleteLocalNoteAction(p.currentId,
                                            function() {
                                                window.location.reload()
                                            },
                                            function() {
                                                window.alert("删除本地存储时出错，您的浏览器可能不支持indexedDB，或者关闭客户端/浏览器后重试，也可以联系我们。")
                                            })
                                    })) : ($("#notification-popup-window").modal("hide"), window.location.reload())
                            },
                            function() {
                                $("#notification-popup-window").modal("hide"),
                                    window.alert("检测本地存储时出错，请关闭客户端或浏览器后重启程序，或者联系我们。")
                            })
                    },
                    null, null,
                    function() {
                        t.focus()
                    })
            })
        }
        function f(a, b) {
            s.get(function(c) {
                return null === c ? void t.warningToSaveBeforeLogin(function() {
                    u(p.loginComeFromUrl, "此功能需要登录，离线状态下无法登录，请连接网络后重试。")
                }) : void("markdowns" === a || "template-html" === a || "pdf" === a ? com.zybuluo.mdeditor.common.doUserTierFeature(c,
                    function() {
                        C(c, a, b)
                    }) : C(c, a, b))
            })
        }
        function g(a) {
            s.get(function(b) {
                return null === b ? void t.warningToSaveBeforeLogin(function() {
                    u(p.loginComeFromUrl, "此功能需要登录，离线状态下无法登录，请连接网络后重试。")
                }) : void com.zybuluo.mdeditor.common.doUserTierFeature(b,
                    function() {
                        com.zybuluo.mdeditor.common.isOnline(function() {
                            D(a)
                        })
                    })
            })
        }
        function h(a, c, d) {
            r(c, d,
                function() {
                    var a = $("#input-publish-password").val();
                    $("#notification-popup-window .modal-body").html("<p></p>"),
                        $("#notification-popup-window").find(".modal-body p").html("正在提交您的请求......");
                    var c = $("#wmd-preview"),
                        d = c.html(),
                        e = com.zybuluo.mdeditor.common.caculatePreviewCharacters();
                    $.post(p.publishUserNoteUrl, {
                            id: p.currentId,
                            version_id: p.currentVersionId,
                            preview: d,
                            is_public: !0,
                            chars_count: e,
                            publish_password: a
                        },
                        function(a) {
                            if (a.loggedin === !1) $("#notification-popup-window").modal("hide"),
                                window.location = p.loginComeFromUrl;
                            else if (a.id && a.version_id) {
                                b(a.is_public, a.updated_date);
                                var c = com.zybuluo.mdeditor.syncUserNotes;
                                c.updateLocalNoteAction(p.currentId,
                                    function(b) {
                                        b.last_updated_date = a.updated_date,
                                            p.currentVersionId = a.version_id,
                                            b.version_id = a.version_id,
                                            b.public = a.is_public
                                    },
                                    null,
                                    function() {
                                        p.currentVersionId = a.version_id
                                    });
                                var d = p.userNoteUrl;
                                $("#notification-popup-window").find(".modal-body p").html('发布成功！本文固定链接：<a href="' + d + '" target="_blank">' + d + "</a>，欢迎分享至社交网络"),
                                    $("#notification-cancel").hide(),
                                    $("#notification-confirm").data("operation",
                                        function() {
                                            $("#notification-popup-window").modal("hide"),
                                                $("#notification-cancel").show()
                                        })
                            } else a.version_error === !0 ? $("#notification-popup-window").find(".modal-body p").html('文稿已在别处被更新，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试') : a.error && ("no preview" === a.error ? ($("#notification-popup-window").find(".modal-body p").html("不能发布空白内容，请撰写内容后再发布"), $("#notification-confirm").data("operation",
                                function() {
                                    $("#notification-popup-window").modal("hide")
                                })) : $("#notification-popup-window").find(".modal-body p").html('出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试'))
                        },
                        "json")
                },
                null,
                function() {
                    var b = $("#notification-popup-window .modal-body");
                    b.append('<div id="publish-password" class="input-prepend pull-left"> <span class="add-on"> <i class="icon-lock"></i> </span><input id="input-publish-password" class="span3" type="password" placeholder="设置发布后的访问密码，高级会员功能"></div>'),
                        setTimeout(function() {
                                $("#input-publish-password").val("")
                            },
                            50),
                        com.zybuluo.mdeditor.common.doUserTierFeature(a,
                            function() {},
                            function() {
                                $("#input-publish-password").on("focus",
                                    function() {
                                        $(this).blur(),
                                            window.open(p.paymentUrl)
                                    })
                            })
                },
                function() {
                    $("#notification-cancel").show(),
                        t.focus()
                })
        }
        function i() {
            s.get(function(a) {
                return null === a ? void t.warningToSaveBeforeLogin(function() {
                    u(p.loginComeFromUrl, "此功能需要登录，离线状态下无法登录，请连接网络后重试。")
                }) : void com.zybuluo.mdeditor.common.isOnline(function() {
                    var b = function() {
                            var b = "发布文稿",
                                c = $("ul#file-list span#" + p.currentId).text(),
                                d = "发布文稿后您的稿件可以被他人访问分享，确认发布【<strong>" + c + "</strong>】？";
                            h(a, b, d)
                        },
                        c = com.zybuluo.mdeditor.syncUserNotes;
                    c.checkLocalNoteAction(p.currentId,
                        function(a) {
                            a && "offline" === a.action ? window.alert("为了保障绝对私密，无法发布离线文稿，请新建普通文稿后发布。") : b()
                        },
                        function() {
                            b()
                        })
                })
            })
        }
        function j() {
            s.get(function(a) {
                return null === a ? void t.warningToSaveBeforeLogin(function() {
                    u(p.loginComeFromUrl, "此功能需要登录，离线状态下无法登录，请连接网络后重试。")
                }) : void com.zybuluo.mdeditor.common.isOnline(function() {
                    var b = "发布更新",
                        c = $("ul#file-list span#" + p.currentId).text(),
                        d = "文稿发布后，如果您对稿件进行了修改更新，可以再次发布更新后的内容到固定链接，确认发布更新【<strong>" + c + "</strong>】？";
                    h(a, b, d)
                })
            })
        }
        function k() {
            s.get(function(a) {
                return null === a ? void t.warningToSaveBeforeLogin(function() {
                    u(p.loginComeFromUrl, "此功能需要登录，离线状态下无法登录，请连接网络后重试。")
                }) : void com.zybuluo.mdeditor.common.isOnline(function() {
                    var a = "撤销发布",
                        c = $("ul#file-list span#" + p.currentId).text(),
                        d = "撤销发布后您的文稿只能被自己所见，确认撤销发布【<strong>" + c + "</strong>】？";
                    r(a, d,
                        function() {
                            $("#notification-popup-window").find(".modal-body p").html("正在提交您的请求......"),
                                $.post(p.publishUserNoteUrl, {
                                        id: p.currentId,
                                        version_id: p.currentVersionId,
                                        preivew: null,
                                        is_public: !1
                                    },
                                    function(a) {
                                        if (a.loggedin === !1) $("#notification-popup-window").modal("hide"),
                                            window.location = p.loginComeFromUrl;
                                        else if (a.id && a.version_id) {
                                            $("#notification-popup-window").modal("hide"),
                                                b(a.is_public, a.updated_date);
                                            var c = com.zybuluo.mdeditor.syncUserNotes;
                                            c.updateLocalNoteAction(p.currentId,
                                                function(b) {
                                                    b.last_updated_date = a.updated_date,
                                                        p.currentVersionId = a.version_id,
                                                        b.version_id = a.version_id,
                                                        b.public = a.is_public
                                                },
                                                null,
                                                function() {
                                                    p.currentVersionId = a.version_id
                                                })
                                        } else a.version_error === !0 ? $("#notification-popup-window").find(".modal-body p").html('文稿已在别处被更新，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试') : a.error && $("#notification-popup-window").find(".modal-body p").html('出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                                    },
                                    "json")
                        },
                        null, null,
                        function() {
                            t.focus()
                        })
                })
            })
        }
        function l() {
            com.zybuluo.mdeditor.common.isOnline(function() {
                var a = "清除访问密码",
                    b = "点击确认清除当前文稿的访问密码（如果存在），任何知道此文稿链接的人都将可以阅读。";
                r(a, b,
                    function() {
                        $("#notification-popup-window").find(".modal-body p").html("正在提交您的请求......"),
                            $.post(p.removePasswordUserNoteUrl, {
                                    id: p.currentId,
                                    version_id: p.currentVersionId
                                },
                                function(a) {
                                    a.loggedin === !1 ? ($("#notification-popup-window").modal("hide"), window.location = p.loginComeFromUrl) : a.success === !0 ? $("#notification-popup-window").modal("hide") : a.version_error === !0 ? $("#notification-popup-window").find(".modal-body p").html('文稿已在别处被更新，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试') : a.error && $("#notification-popup-window").find(".modal-body p").html('出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                                },
                                "json")
                    },
                    null, null,
                    function() {
                        t.focus()
                    })
            })
        }
        function m(a) {
            s.get(function(b) {
                if (null === b) return void t.warningToSaveBeforeLogin(function() {
                    u(p.loginComeFromUrl, "此功能需要登录，离线状态下无法登录，请连接网络后重试。")
                });
                var c = "打开本地文稿",
                    d = '请选择 Markdown 文件，或者直接将文件拖拽至以下区域： <br><br><input type="file" id="input-file-open-local-file"/><label id="label-offline-local-file" class="checkbox"><input type="checkbox" id="cb-offline-local-file">以离线文稿方式打开确保企业级私密（高级会员功能）</label><div id="alert-open-local-file" class="alert alert-info hide"></div>';
                r(c, d, null, null,
                    function() {
                        $("#notification-popup-window #notification-confirm").hide();
                        var c = !1;
                        com.zybuluo.mdeditor.common.doUserTierFeature(b,
                            function() {
                                $("#cb-offline-local-file").on("click",
                                    function() {
                                        var a = $(this).attr("checked") ? !0 : !1;
                                        c = a
                                    })
                            },
                            function(a) {
                                c = !1,
                                    $("#cb-offline-local-file").on("click",
                                        function() {
                                            $(this).removeAttr("checked"),
                                                a ? window.open(p.paymentUrl) : (toastr.clear(), com.zybuluo.mdeditor.common.setToastrOptions("toast-bottom-right", !0, "5000", "1000", null), toastr.warning("使用此功能需要升级为高级会员，离线状态下无法升级，请连接网络后重试。"))
                                        })
                            });
                        var d = $("#alert-open-local-file"),
                            e = function(a, c) {
                                var e = new FileReader;
                                e.onload = function(a) {
                                    return function(e) {
                                        var f = e.target.result;
                                        return a.type.match("text.*") || "" === a.type && !f.match(/\uFFFD/) ? 0 === a.size ? void d.show().html("<strong>警告！</strong>文件【" + a.name + "】内容为空，请重新选择文件。") : a.size > 102400 ? void d.show().html("<strong>警告！</strong>文件【" + a.name + "】内容大于 100KB，请重新选择文件。") : (d.hide(), void v(b, c, f)) : void d.show().html("<strong>警告！</strong>文件【" + a.name + "】不是文本文件，请重新选择文件。")
                                    }
                                } (a);
                                var f = a.slice(0, 102400);
                                e.readAsText(f)
                            };
                        document.getElementById("input-file-open-local-file").addEventListener("change",
                            function(a) {
                                var b = a.target.files,
                                    d = b[0];
                                if (c === !0) if (window.desktopGui) {
                                    var f = this.value;
                                    this.value = "",
                                        e(d, f)
                                } else e(d, "");
                                else e(d, null)
                            },
                            !1),
                        a && e(a, null)
                    },
                    function() {
                        $("#notification-popup-window #notification-confirm").show(),
                            t.focus()
                    })
            })
        }
        function n() {
            s.get(function(a) {
                if (null === a) return void t.warningToSaveBeforeLogin(function() {
                    u(p.loginComeFromUrl, "此功能需要登录，离线状态下无法登录，请连接网络后重试。")
                });
                var b = "手动保存历史版本",
                    c = "将当前文稿的当前内容保存为一份历史版本以便回顾或恢复，确认手动保存？";
                r(b, c,
                    function() {
                        $("#notification-popup-window").find(".modal-body p").html("正在提交您的请求......"),
                            $.post(p.noteRevisionSaveUrl, {
                                    version_id: p.currentVersionId
                                },
                                function(a) {
                                    if (a.loggedin === !1) $("#notification-popup-window").modal("hide"),
                                        window.location = p.loginComeFromUrl;
                                    else if (a.success === !0) {
                                        if (a.is_saved === !0) {
                                            var b = com.zybuluo.mdeditor.syncUserNotes;
                                            b.updateLocalNoteAction(p.currentId,
                                                function(b) {
                                                    p.currentVersionId = a.version_id,
                                                        b.version_id = a.version_id
                                                },
                                                null,
                                                function() {
                                                    p.currentVersionId = a.version_id
                                                }),
                                                $("#notification-popup-window").find(".modal-body p").html('手动保存历史版本成功，您可以前往工具栏【<i class="icon-th-large"></i>文稿信息】 菜单查看，或使用快捷键 Ctrl+Alt+I 查看。')
                                        } else $("#notification-popup-window").find(".modal-body p").html('当前文稿和最近的历史版本内容相同，不再重复保存，您可以前往工具栏【<i class="icon-th-large"></i>文稿信息】 菜单查看，或使用快捷键 Ctrl+Alt+I 查看。');
                                        $("#notification-cancel").hide(),
                                            $("#notification-confirm").data("operation",
                                                function() {
                                                    $("#notification-popup-window").modal("hide"),
                                                        $("#notification-cancel").show()
                                                })
                                    } else a.version_error === !0 ? $("#notification-popup-window").find(".modal-body p").html('文稿已在别处被更新，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试') : a.error && $("#notification-popup-window").find(".modal-body p").html('出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                                },
                                "json").fail(function(a) {
                                    $("#notification-popup-window").find(".modal-body p").html(500 === a.status ? "服务器内部错误，请联系我们处理。": "离线状态下无法使用此功能，请连接网络后重试。")
                                })
                    },
                    null,
                    function() {
                        p.currentId < 0 && ($("#notification-popup-window").find(".modal-body p").html("无法手动保存离线文稿的历史版本。"), $("#notification-confirm").hide())
                    },
                    function() {
                        $("#notification-confirm").show(),
                            $("#notification-cancel").show(),
                            t.focus()
                    })
            })
        }
        var o = com.zybuluo.mdeditor.common.getCurrentMode,
            p = com.zybuluo.mdeditor.initData,
            q = com.zybuluo.mdeditor.common.saveAs,
            r = com.zybuluo.common.popupConfirm.popup,
            s = com.zybuluo.common.loginUser,
            t = com.zybuluo.mdeditor.unifiedEditor,
            u = com.zybuluo.mdeditor.common.openUrlOnline,
            v = function(a, b, c) {
                var d = function(a, b, c, d) {
                    var e = com.zybuluo.mdeditor.syncUserNotes,
                        f = com.zybuluo.indexedDB,
                        g = com.zybuluo.mdeditor.common.extractMarkdownTitle,
                        h = b ? b: "# 在此处输入标题\n\n标签（空格分隔）： 未分类\n\n---\n\n在此输入正文\n\n\n\n\n",
                        i = g.get(h);
                    null === i && (i = "未命名");
                    var j = f.newLocalNoteAction(a.name, i, h, c);
                    if (null !== d && "" !== d && (j.local_file_path = d, void 0 === b)) {
                        var k = require("fs");
                        try {
                            k.writeFileSync(j.local_file_path, h)
                        } catch(l) {
                            console.error(l),
                                console.error("The file " + j.local_file_path + " failed to save!")
                        }
                    }
                    e.createLocalNoteAction(j, c,
                        function() {
                            $.localStorage("currentId", j.local_note_id),
                                window.location.hash = "#" + j.local_note_id,
                                window.location.reload()
                        },
                        function() {
                            window.alert("新增本地文稿时出错，请关闭客户端或浏览器后重启程序，或者联系我们。")
                        })
                };
                if (null !== b) return $("#notification-popup-window").modal("hide"),
                    void d(a, c, "offline", b);
                $("#notification-popup-window").find(".modal-body p").html("正在提交您的请求......");
                var e = {};
                c && (e = {
                    new_note: c
                }),
                    $.post(p.newUserNoteUrl, e,
                        function(a) {
                            a.loggedin === !1 ? ($("#notification-popup-window").modal("hide"), window.location = p.loginComeFromUrl) : a.userNoteId && a.version_id ? ($("#notification-popup-window").modal("hide"), $.localStorage("currentId", a.userNoteId), window.location.hash = "#" + a.userNoteId, window.location.reload()) : a.error && $("#notification-popup-window").find(".modal-body p").html('出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                        },
                        "json").fail(function() {
                            $("#notification-popup-window").modal("hide"),
                                d(a, c, "create", null)
                        })
            },
            w = function() {
                var a = com.zybuluo.mdeditor.common.getCurrentThemeClassName();
                "theme-black" === a && com.zybuluo.mdeditor.common.switchSiteTheme(t);
                var b = $("#wmd-preview").html();
                return "theme-black" === a && com.zybuluo.mdeditor.common.switchSiteTheme(t),
                    b
            },
            x = function() {
                var a = $("div#MathJax_SVG_Hidden"),
                    b = "";
                if (0 !== a.length) {
                    var c = $("<div></div>");
                    c.prepend(a.parent().clone()),
                        b = c.html()
                }
                return b
            },
            y = function(a, b) {
                var c = w(),
                    d = $("<div>" + c + "</div>"),
                    e = p.staticAssetsUrl + "template-theme-white.css",
                    f = x();
                d.find(".sequence-diagram text").each(function() {
                    $(this).prev("rect").remove()
                });
                var g = [];
                d.find(".flow-diagram, .sequence-diagram").each(function() {
                    g.push($(this))
                }),
                    z(g, 0,
                        function() {
                            html = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>' + a + '</title>\n<link href="' + e + '" rel="stylesheet" media="screen">\n<style> .theme-white {background-color: white;} .theme-white.sequence-diagram [fill="#ffffff"], .theme-white.flow-diagram [fill="#ffffff"] { fill: white; } thead { display: table-header-group } tfoot { display: table-row-group } tr { page-break-inside: avoid }</style>\n' + B() + "\n</head>\n<body>\n" + f + '<div id="wmd-preview" class="wmd-preview wmd-preview-full-reader" style="overflow:visible;">' + d.html() + "</div>\n</body>\n</html>",
                                b(html)
                        })
            },
            z = function(a, b, c) {
                if (a.length === b) return void c();
                var d = a[b];
                d.hasClass("MathJax_SVG") && d.children("svg").prepend($("div#MathJax_SVG_Hidden").next("svg").children("defs").clone());
                var e = document.getElementById("svg-canvas-image");
                e.innerHTML = "";
                var f = e.getContext("2d"),
                    g = window.URL || window.webkitURL || window,
                    h = new Image,
                    i = (new XMLSerializer).serializeToString(d.children("svg")[0]),
                    j = new Blob([i], {
                        type: "image/svg+xml;charset=utf-8"
                    }),
                    k = g.createObjectURL(j);
                h.onload = function() {
                    f.canvas.width = 2 * h.width,
                        f.canvas.height = 2 * h.height,
                        f.drawImage(h, 0, 0, f.canvas.width, f.canvas.height);
                    var i = e.toDataURL("image/png");
                    d.html('<img src="' + i + '" width="' + h.width + '" height="' + h.height + '"/>'),
                        g.revokeObjectURL(k),
                        z(a, ++b, c)
                },
                    h.onerror = function() {
                        console.error("fail to convert svg to canvas"),
                            d.html('<img src=""/>'),
                            g.revokeObjectURL(k),
                            z(a, ++b, c)
                    },
                    h.src = k
            },
            A = function(a) {
                var b = w(),
                    c = $("<div>" + b + "</div>");
                c.children("[data-anchor-id]").removeAttr("data-anchor-id"),
                    c.find(".MathJax_SVG_Display").removeAttr("role").removeAttr("aria-readonly"),
                    c.find("script").remove(),
                    c.find("span[role]").removeAttr("role"),
                    c.find("span[aria-readonly]").removeAttr("aria-readonly"),
                    c.find('*[class=""]').removeAttr("class");
                for (var d = function(a) {
                        c.find(a).each(function() {
                            var a = $(this);
                            a.prepend('<a name="' + a.attr("id") + '" style="background: transparent;text-decoration: none;"></a>')
                        })
                    },
                         e = 1; 6 >= e; e++) d("h" + e);
                c.find("a[id^='fnref:']").each(function() {
                    var a = $(this);
                    a.attr("name", a.attr("id"))
                }),
                    c.find("span[id^='fn:']").each(function() {
                        var a = $(this);
                        a.replaceWith('<a name="' + a.attr("id") + '" style="background: transparent;text-decoration: none;">' + a.html() + "</a>")
                    }),
                    c.find("img").each(function() {
                        $(this).attr("style", "max-width: 100%;")
                    }),
                    c.find("li.todo-list-item > i.icon-check-empty").replaceWith('<img src="' + p.staticImgUrl + 'icon-check-empty.png" style="margin: 0 6px 0 -20px; vertical-align: middle;"></img>'),
                    c.find("li.todo-list-item > i.icon-check-sign").replaceWith('<img src="' + p.staticImgUrl + 'icon-check-sign.png" style="margin: 0 6px 0 -20px; vertical-align: middle;"></img>');
                var f = [];
                $("#wmd-preview svg").each(function() {
                    $currentSVG = $(this),
                        f.push({
                            width: $currentSVG.width(),
                            height: $currentSVG.height()
                        })
                });
                var g = [];
                c.find("svg").each(function(a) {
                    var b = $(this);
                    void 0 === b.attr("width") && b.attr("width", f[a].width),
                    void 0 === b.attr("height") && b.attr("height", f[a].height),
                        g.push(b.parent())
                }),
                    z(g, 0,
                        function() {
                            html = '<html>\n<head>\n<meta charset="utf-8">\n<link href="">\n' + B() + '\n</head>\n<body>\n<div id="wmd-preview" class="wmd-preview wmd-preview-full-reader">' + c.html() + "</div>\n</body>\n</html>",
                                a(html)
                        })
            },
            B = function() {
                return '<style type="text/css">' + $("#customized-font-css").html() + "\n" + $("#customized-style-css").html() + "</style>"
            },
            C = function(a, b, c) {
                var d = null,
                    e = null,
                    f = $("ul#file-list span#" + p.currentId).text();
                if ("markdown" === b) q(c, f + ".md");
                else if ("markdowns" === b) {
                    var g = new JSZip,
                        h = com.zybuluo.mdeditor.syncUserNotes;
                    h.exportAllLocalNotes(a,
                        function(a) {
                            for (var b in a.tags) {
                                var c = g.folder(a.tags[b]);
                                c.file(a.title + ".md", a.details)
                            }
                        },
                        function() {
                            var a = g.generate({
                                type: "blob"
                            });
                            q(a, "Cmd-Markdowns-" + (new Date).format("Y-m-d-H:i") + ".zip")
                        },
                        function() {
                            window.alert("导出本地文稿时出错，请关闭客户端/浏览器后重启程序，或者联系我们。")
                        })
                } else if ("html" === b) e = x(),
                    d = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>' + f + "</title>\n</head>\n<body>\n" + e + '<div id="wmd-preview" class="wmd-preview">' + $("#wmd-preview").html() + "</div>\n</body>\n</html>",
                    q(d, f + ".html");
                else if ("template-html" === b) {
                    var i = com.zybuluo.mdeditor.common.getCurrentThemeClassName(),
                        j = ' class="theme ' + i + '"',
                        k = p.staticAssetsUrl + "template-" + i + ".css";
                    e = x(),
                        d = "<!DOCTYPE html>\n<html" + j + '>\n<head>\n<meta charset="utf-8">\n<title>' + f + '</title>\n<link href="' + k + '" rel="stylesheet" media="screen">\n' + B() + "\n</head>\n<body" + j + ">\n" + e + '<div id="wmd-preview" class="wmd-preview wmd-preview-full-reader">' + $("#wmd-preview").html() + "</div>\n</body>\n</html>",
                        q(d, f + ".html")
                } else "pdf" === b && com.zybuluo.mdeditor.common.isOnline(function() {
                    y(f,
                        function(a) {
                            var b = "导出 PDF 文件",
                                c = "导出此文稿的 PDF 版本，确认导出<strong>【" + f + ".pdf</strong>】？";
                            r(b, c,
                                function() {
                                    $("#notification-popup-window #notification-confirm").hide(),
                                        $("#notification-popup-window").find(".modal-body p").html("正在提交处理您的请求，预计 30 秒内返回结果，请稍候......");
                                    var b = new XMLHttpRequest;
                                    b.open("POST", p.downloadPdfUrl, !0),
                                        b.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8"),
                                        b.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                                        b.responseType = "blob",
                                        b.onreadystatechange = function() {
                                            if (4 == this.readyState) if (201 == this.status) pdf = this.response,
                                            void 0 !== pdf && ($("#notification-popup-window").modal("hide"), q(pdf, f + ".pdf"));
                                            else if (200 == this.status) {
                                                var a = new window.FileReader;
                                                a.readAsDataURL(this.response),
                                                    a.onloadend = function() {
                                                        var b = a.result,
                                                            c = atob(b.substring(b.indexOf("base64,") + "base64,".length)),
                                                            d = JSON.parse(c);
                                                        d.loggedin === !1 ? ($("#notification-popup-window").modal("hide"), window.location = p.loginComeFromUrl) : d.version_error === !0 ? $("#notification-popup-window").find(".modal-body p").html('文稿已在别处被更新，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试') : d.error && $("#notification-popup-window").find(".modal-body p").html('出错啦，请 <a href="javascript:window.location.reload();void 0;">刷新</a> 页面后重试')
                                                    }
                                            } else $("#notification-popup-window").find(".modal-body p").html("导出 PDF 文件失败，服务器可能正忙，请稍后再试，或联系我们")
                                        },
                                        b.send("id=" + p.currentId + "&version_id=" + p.currentVersionId + "&html=" + encodeURIComponent(a))
                                },
                                null, null,
                                function() {
                                    $("#notification-popup-window #notification-confirm").show(),
                                        t.focus()
                                })
                        })
                })
            },
            D = function(a) {
                var b = {
                        yinxiang: "印象笔记",
                        evernote: "Evernote"
                    },
                    c = b[a];
                if (void 0 === c && (c = "第三方"), "yinxiang" === a || "evernote" === a) {
                    var d = $("ul#file-list span#" + p.currentId).text(),
                        e = "导出/同步到" + c,
                        f = "正在导出/同步当前文稿<strong>【" + d + "</strong>】到" + c + "，预计 30 秒内返回结果，请稍候......",
                        g = !0,
                        h = "";
                    r(e, f,
                        function() {
                            return g === !1 ? void $("#notification-popup-window").modal("hide") : "" !== h ? ($("#notification-popup-window").modal("hide"), void window.open(window.desktopGui ? p.thirdPartyAccountUrl + a: h)) : void $("#notification-popup-window").modal("hide")
                        },
                        null,
                        function() {
                            A(function(b) {
                                $("#notification-cancel").hide(),
                                    $.post(p.thirdPartyAccountExportUrl + a, {
                                            id: p.currentId,
                                            title: d,
                                            html: b
                                        },
                                        function(a) {
                                            a.loggedin === !1 ? ($("#notification-popup-window").modal("hide"), window.location = p.loginComeFromUrl) : a.success ? $("#notification-popup-window").find(".modal-body p").html("当前文稿<strong>【" + d + "</strong>】已成功导出/同步到您的" + c + "帐号。") : a.authorized_url ? ($("#notification-cancel").show(), h = a.authorized_url, $("#notification-popup-window").find(".modal-body p").html("尚未绑定" + c + "帐号或绑定过期，请点击确认按钮进行绑定。")) : a.error && $("#notification-popup-window").find(".modal-body p").html("导出当前文稿出错，请重试或联系我们，错误详情：" + a.error)
                                        },
                                        "json").fail(function(a) {
                                            $("#notification-popup-window").find(".modal-body p").html(500 === a.status ? "服务器内部错误，无法导出，请联系我们处理。": "离线状态下无法使用此功能，请连接网络后重试。"),
                                                g = !1
                                        })
                            })
                        },
                        function() {
                            $("#notification-cancel").show(),
                                t.focus()
                        })
                }
            },
            E = function() {
                var a = null,
                    b = function(b, c) {
                        a = b.watch(c,
                            function() {
                                window.confirm('正在编辑的文件 "' + c + '" 有变动，是否重新加载？') && (a.close(), window.location.reload())
                            })
                    },
                    c = function() {
                        null !== a && a.close()
                    };
                return {
                    watch: b,
                    stop: c
                }
            } ();
        return {
            switchPublishButton: a,
            reset_file_public_changes: b,
            reset_tag_changes: c,
            newFile: d,
            deleteFile: e,
            downloadFile: f,
            uploadFile: g,
            publishFile: i,
            republishFile: j,
            publishedFile: k,
            removePassword: l,
            openLocalFile: m,
            saveRevision: n,
            fileWatcher: E
        }
    } (),
    com.zybuluo.mdeditor.scrollLink = function() {
        var a, b = com.zybuluo.mdeditor.unifiedEditor,
            c = {
                extensionId: "scrollLink",
                extensionName: "Scroll Link",
                optional: !0,
                settingsBloc: ["<p>Binds together editor and preview scrollbars.</p>", '<blockquote class="muted"><b>NOTE:</b>', "   The mapping between Markdown and HTML is based on the position of the title elements (h1, h2, ...) in the page.", "   Therefore, if your document does not contain any title, the mapping will be linear and consequently less accurate.", "</bloquote>"].join("")
            },
            d = window.lightMode ? null: b.getEditor();
        c.onSectionsCreated = function(b) {
            a = b
        };
        var e = 0;
        c.onMarkdownTrim = function(a) {
            e = a
        };
        var f, g, h, i = [],
            j = [],
            k = -10,
            l = -10,
            m = _.debounce(function(b) {
                    function c(a) {
                        var b = r;
                        if (void 0 !== a) {
                            var c = document.createTextNode(a);
                            g.empty().append(c),
                                b += g.prop("scrollHeight")
                        }
                        var d = p + b;
                        i.push({
                            startOffset: p,
                            endOffset: d,
                            height: b,
                            length: void 0 === a ? 0 : a.length + 1
                        }),
                            p = d
                    }
                    i = [];
                    var m = 0,
                        p = 0,
                        q = e,
                        r = 0;
                    if (window.lightMode) {
                        g.innerWidth(f.innerWidth()),
                            _.each(a,
                                function(b, d) {
                                    var e = b.text;
                                    d !== a.length - 1 ? 0 === e.length && (e = void 0) : /\n$/.test(e) && (e += "\n"),
                                        c(e)
                                });
                        var t = _.last(i).endOffset,
                            u = f[0].scrollHeight,
                            v = u / t;
                        i = _.map(i,
                            function(a) {
                                return {
                                    startOffset: a.startOffset * v,
                                    endOffset: a.endOffset * v,
                                    height: a.height * v,
                                    length: a.length
                                }
                            })
                    } else _.each(a,
                        function(a) {
                            m += a.text.length + q,
                                q = 0;
                            var b = d.session.doc.indexToPosition(m),
                                c = d.session.documentToScreenPosition(b.row, b.column),
                                e = c.row * d.renderer.lineHeight,
                                f = e - p;
                            i.push({
                                startOffset: p,
                                endOffset: e,
                                height: f,
                                length: void 0 === a.text ? 0 : a.text.length + 1
                            }),
                                p = e
                        });
                    j = [];
                    var w, x = h.scrollTop();
                    h.find("#wmd-preview > .md-section-divider").each(function() {
                        if (void 0 === w) return void(w = 0);
                        var a = $(this),
                            b = a.position().top + x;
                        j.push({
                            startOffset: w,
                            endOffset: b,
                            height: b - w
                        }),
                            w = b
                    });
                    var y = h.prop("scrollHeight");
                    j.push({
                        startOffset: w,
                        endOffset: y,
                        height: y - w
                    }),
                        k = -10,
                        l = -10,
                        b === !0 ? n = !0 : b === !1 ? o = !0 : (null === b || void 0 === b) && (n = !0),
                        s()
                },
                500),
            n = !1,
            o = !1,
            p = !1,
            q = !1,
            r = $("<div>"),
            s = _.throttle(function() {
                    function a(a, b, c) {
                        var d, e = _.find(b,
                            function(b, c) {
                                return d = c,
                                a < b.endOffset
                            });
                        if (void 0 !== e) {
                            var f = (a - e.startOffset) / (e.height || 1),
                                g = c[d];
                            return g.startOffset + g.height * f
                        }
                    }
                    if (0 === i.length || i.length !== j.length) return void s();
                    var b = window.lightMode ? f.scrollTop() : d.renderer.getScrollTop();
                    0 > b && (b = 0);
                    var c, e = h.scrollTop();
                    if (n === !0) {
                        if (Math.abs(b - k) <= 9) return;
                        if (n = !1, k = b, c = a(b, i, j), c = _.min([c, h.prop("scrollHeight") - h.outerHeight()]), Math.abs(c - e) <= 9) return void(l = e);
                        r.stop("scrollLinkFx", !0).css("value", 0).animate({
                                value: c - e
                            },
                            {
                                duration: 200,
                                queue: "scrollLinkFx",
                                step: function(a) {
                                    q = !0,
                                        l = e + a,
                                        h.scrollTop(l)
                                },
                                done: function() {
                                    _.defer(function() {
                                        q = !1,
                                            v = !1
                                    })
                                }
                            }).dequeue("scrollLinkFx")
                    } else if (o === !0) {
                        if (Math.abs(e - l) <= 9) return;
                        if (o = !1, l = e, c = a(e, j, i), window.lightMode ? c = _.min([c, f.prop("scrollHeight") - f.outerHeight()]) : (c = _.min([c, d.session.getScreenLength() * d.renderer.lineHeight + d.renderer.scrollMargin.bottom - d.renderer.$size.scrollerHeight]), 0 > c && (c = 0)), Math.abs(c - b) <= 9) return void(k = b);
                        r.stop("scrollLinkFx", !0).css("value", 0).animate({
                                value: c - b
                            },
                            {
                                duration: 200,
                                queue: "scrollLinkFx",
                                step: function(a) {
                                    p = !0,
                                        k = b + a,
                                        window.lightMode ? f.scrollTop(k) : d.session.setScrollTop(k)
                                },
                                done: function() {
                                    _.defer(function() {
                                        p = !1,
                                            v = !1
                                    })
                                }
                            }).dequeue("scrollLinkFx")
                    }
                },
                100);
        c.buildSections = function() {
            m(!0)
        };
        var t = !1;
        c.onLayoutCreated = function() {
            h = $(".preview-container"),
                f = $("#wmd-input"),
                g = $("#md-section-helper"),
                h.scroll(function() {
                    q === !1 && t === !1 && (o = !0, n = !1, s()),
                        t = !1
                });
            var a = function() {
                p === !1 && (n = !0, o = !1, s())
            };
            window.lightMode ? f.scroll(a) : d.session.on("changeScrollTop", a)
        };
        var u;
        c.onEditorConfigure = function(a) {
            u = $("#wmd-preview"),
                a.getConverter().hooks.chain("postConversion",
                    function(a) {
                        return u.height(u.height()),
                            a
                    });
            var b = "^.+[ \\t]*\\n=+[ \\t]*\\n+|^.+[ \\t]*\\n-+[ \\t]*\\n+|^\\#{1,6}[ \\t]*.+?[ \\t]*\\#*\\n+";
            b = "^```.*\\n[\\s\\S]*?\\n```|" + b,
                b = "^[ \\t]*\\n\\$\\$[\\s\\S]*?\\$\\$|" + b,
                b = "^[ \\t]*\\n\\\\\\\\[[\\s\\S]*?\\\\\\\\]|" + b,
                b = "^[ \\t]*\\n\\\\?\\\\begin\\{[a-z]*\\*?\\}[\\s\\S]*?\\\\end\\{[a-z]*\\*?\\}|" + b,
                b = new RegExp(b, "gm");
            var d = a.getConverter();
            d.hooks.chain("preConversion",
                function(a) {
                    function d(a, b) {
                        var c = e.substring(g, b);
                        f.push({
                            text: c,
                            textWithDelimiter: '\n<div class="md-section-divider"></div>\n\n' + c + "\n"
                        })
                    }
                    var e = a + "\n\n",
                        f = [],
                        g = 0;
                    return e.replace(b,
                        function(a, b) {
                            d(g, b),
                                g = b
                        }),
                        d(g, a.length),
                        c.onSectionsCreated(f),
                        _.reduce(f,
                            function(a, b) {
                                return a + b.textWithDelimiter
                            },
                            "")
                })
        };
        var v = !0;
        return c.onPreviewFinished = function() {
            var a = u.height();
            u.height("auto");
            var b = u.height();
            a > b && (t = !0),
                m(v === !0 ? !1 : !0)
        },
            c.getCursorPositionForPageDownUpInFullEditorMode = function(a) {
                var b, c = _.find(i,
                    function(c, d) {
                        return b = d,
                        a < c.endOffset
                    });
                if (void 0 === c) return - 1;
                for (var d = 0,
                         e = 0; b >= e; e++) d += i[e].length;
                return d
            },
            c
    } (),
    com.zybuluo.mdeditor.mode = function() {
        function a() {
            if (f().isFullReader && 0 === $editorReaderFull.has("#wmd-preview").length) {
                $editorReaderFull.html("");
                var a = $("#reader-full-topInfo").clone().removeClass("reader-full-topInfo-hidden").addClass("reader-full-topInfo-shown");
                $editorReaderFull.append(a),
                    $editorReaderFull.append($(".in-page-preview-buttons").addClass("in-page-preview-buttons-full-reader")),
                    $editorReaderFull.append($("#wmd-preview").addClass("wmd-preview-full-reader").focus()),
                    $editorReaderFull.append($(".remark-icons"))
            }
        }
        var b = com.zybuluo.mdeditor.unifiedEditor,
            c = com.zybuluo.mdeditor.sideRemark,
            d = com.zybuluo.mdeditor.scrollLink,
            e = com.zybuluo.mdeditor.common.buttonBinding,
            f = com.zybuluo.mdeditor.common.getCurrentMode,
            g = com.zybuluo.mdeditor.common.initialHiddenSideToolBar,
            h = com.zybuluo.mdeditor.common.colorWmdButtons,
            i = b.getWmdInput();
        $editorReaderFull = $("#editor-reader-full");
        var j = function() {
                $("#global-prompt-alert").addClass("hide"),
                    c.hideSideRemark();
                var a = com.zybuluo.mdeditor.common.getCurrentIdInHash();
                window.location.hash = null !== a ? a + "-full-editor": "full-editor",
                    o(),
                    $("#container").hide(),
                    $editorReaderFull.removeClass("editor-reader-full-hidden").addClass("editor-reader-full-shown"),
                    $("#wmd-editor-small-button").show(),
                    $("#wmd-editor-full-button").hide(),
                window.lightMode && i.keydown(function(a) {
                    var b = null,
                        c = $(window).height() - $("#wmd-panel-editor").position().top,
                        e = parseInt($(this).css("line-height"), 10);
                    c -= 2 * e;
                    var f = $("#wmd-panel-editor").scrollTop();
                    if (33 === a.keyCode && (b = f - c), 34 === a.keyCode && (b = f + c), null !== b) {
                        $("#wmd-panel-editor").animate({
                                scrollTop: b
                            },
                            1);
                        var g = d.getCursorPositionForPageDownUpInFullEditorMode(b);
                        if ( - 1 != g) {
                            var h = i.val().length;
                            g > h && (g = h),
                                i.caret(g),
                                a.preventDefault()
                        }
                    }
                }),
                    h(),
                    $editorReaderFull.append($("#wmd-button-bar").removeClass().addClass("wmd-button-bar-full-shown")),
                    $editorReaderFull.append(window.lightMode ? $("#wmd-panel-editor").removeClass().addClass("wmd-panel-editor-full-shown") : $("#wmd-panel-editor").removeClass().addClass("wmd-panel-editor-full-shown-ace")),
                    $("#wmd-panel-editor").prepend($(".in-page-editor-buttons")),
                    n(),
                    window.lightMode ? (i.css("max-width", "850px").focus(), $("#md-section-helper").attr("style", "max-width:850px; overflow:hidden; word-wrap:break-word; resize: none;")) : b.focus(),
                    $(window).unbind("resize");
                var e = null;
                e = window.lightMode ?
                    function() {
                        i.autosize(),
                            i.trigger("autosize.resize"),
                            $("#wmd-panel-editor").height($(window).height() - $("#wmd-panel-editor").position().top),
                            $(".in-page-editor-buttons").css("margin-left", i.position().left + i.width() - 125)
                    }: function() {
                    var a = $(window).width();
                    i.width(a - 15);
                    var c = a >= 850 ? (a - 850) / 2 : 0;
                    b.getEditor().renderer.setPadding(c);
                    var d = $(window).height() - $("#wmd-panel-editor").position().top;
                    i.height(d),
                        b.getEditor().resize(),
                        $(".in-page-editor-buttons").css("margin-left", c + 850 - 125)
                },
                    $(window).resize(function() {
                        e()
                    }),
                    $(window).resize()
            },
            k = function(a) {
                var c = com.zybuluo.mdeditor.common.getCurrentIdInHash();
                window.location.hash = null !== c ? c: "",
                window.lightMode && i.unbind("keydown"),
                    h(),
                    $("#wmd-button-bar").removeClass().addClass("wmd-button-bar"),
                    $("#wmd-panel-editor").removeClass().addClass("wmd-panel-editor"),
                    $("#editor-column").append($("#wmd-button-bar")),
                    $("#editor-column").append($(".in-page-editor-buttons")),
                    $("#editor-column").append($("#wmd-panel-editor")),
                    n(),
                    window.lightMode ? ($("#md-section-helper").removeAttr("style"), i.trigger("autosize.destroy"), i.removeAttr("style")) : (i.removeAttr("style"), b.restoreAceEditor(), b.getEditor().resize()),
                    $("#wmd-panel-editor").removeAttr("style"),
                    $("#wmd-editor-small-button").hide(),
                    $("#wmd-editor-full-button").show(),
                    $editorReaderFull.removeClass("editor-reader-full-shown").addClass("editor-reader-full-hidden"),
                    $("#container").show(),
                    a()
            },
            l = function(b) {
                $("#global-prompt-alert").addClass("hide"),
                    com.zybuluo.mdeditor.common.caculateAndFillPreviewCharacters(),
                    i.blur();
                var d = window.location.hash.match(/^#(\d+-)?full-reader/);
                if (null === d) {
                    var f = com.zybuluo.mdeditor.common.getCurrentIdInHash();
                    window.location.hash = null !== f ? f + "-full-reader": "full-reader"
                }
                $("#container").hide(),
                    $editorReaderFull.removeClass("editor-reader-full-hidden").addClass("editor-reader-full-shown"),
                    $editorReaderFull.css("position", "static").css("padding-right", "75px"),
                    $("#preview-reader-small-button").show(),
                    $("#preview-reader-full-button").hide(),
                    $("#preview-column li.editor-only").hide();
                var h = $("#preview-theme-button").removeClass("in-page-button").addClass("preview-button"),
                    j = $("#preview-reader-full-button").removeClass("in-page-button").addClass("preview-button"),
                    k = $("#preview-reader-small-button").removeClass("in-page-button").addClass("preview-button"),
                    l = $("#preview-fullscreen-button").removeClass("in-page-button").addClass("preview-button");
                e(".preview-button > span", "#F9F9F5", "#BBBBBB"),
                    0 !== $("#preview-button-row #preview-list-button").length ? $("#preview-button-row #preview-list-button").after(l).after(k).after(j).after(h) : $("#preview-button-row").prepend(l).prepend(k).prepend(j).prepend(h),
                    $("#reader-full-toolbar").removeClass("reader-full-toolbar-hidden").addClass("reader-full-toolbar-shown"),
                    $("#reader-full-toolbar").append($("#preview-button-row").removeClass("pull-left pull-right")),
                    $("#reader-full-toolbar-tail").removeClass("reader-full-toolbar-tail-hidden").addClass("reader-full-toolbar-tail-shown"),
                    $("#file-list-topbar, #file-list, #about-menu").removeClass("pull-left pull-right").addClass("pull-right"),
                    a(),
                    $("#preview-button-row > li:visible").css("display", "block"),
                    $("#preview-button-row > li:visible").removeClass("preview-button").addClass("preview-button-full-reader"),
                    g.hideToolBarForMobile(),
                    $(window).unbind("resize");
                var m = !1,
                    n = _.debounce(function() {
                            com.zybuluo.mdeditor.common.resetMaxHeightOfFileList(),
                                c.relocateRemarkIcons(),
                                c.relocateSideRemark(),
                            m || (m = !0, b && "function" == typeof b && b())
                        },
                        200);
                $(window).resize(n),
                    $(window).resize()
            },
            m = function(a) {
                c.hideSideRemark();
                var b = com.zybuluo.mdeditor.common.getCurrentIdInHash();
                window.location.hash = null !== b ? b: "",
                g.isHidden() && g.hideToolBar(),
                    $("#preview-button-row > li:visible").removeAttr("style"),
                    $("#preview-button-row > li:visible").removeClass("preview-button-full-reader").addClass("preview-button"),
                    $("#preview-button-row > li.wmd-spacer:visible").removeClass("preview-button"),
                    $("#wmd-panel-preview").before($(".in-page-preview-buttons").removeClass("in-page-preview-buttons-full-reader")),
                    $("#wmd-panel-preview").append($("#wmd-preview").removeClass("wmd-preview-full-reader")),
                    $("#wmd-panel-preview").append($(".remark-icons"));
                var d = r.isExchanged(),
                    e = "pull-right";
                d && (e = "pull-left"),
                    $("#preview-button-bar").prepend($("#preview-button-row").addClass(e)),
                    $("#file-list-topbar, #file-list, #about-menu").removeClass("pull-left pull-right").addClass(e),
                    $("#reader-full-toolbar").removeClass("reader-full-toolbar-shown").addClass("reader-full-toolbar-hidden"),
                    $("#reader-full-toolbar-tail").addClass("reader-full-toolbar-tail-hidden").addClass("reader-full-toolbar-tail-shown"),
                    $("#preview-column li.editor-only").show();
                var f = $("#preview-theme-button").removeClass("preview-button").addClass("in-page-button"),
                    h = $("#preview-reader-full-button").removeClass("preview-button").addClass("in-page-button"),
                    i = $("#preview-reader-small-button").removeClass("preview-button").addClass("in-page-button"),
                    j = $("#preview-fullscreen-button").removeClass("preview-button").addClass("in-page-button");
                n(),
                    $(".in-page-preview-buttons > ul").append(f).append(h).append(i).append(j),
                    $(".in-page-preview-buttons").removeClass("in-page-preview-buttons-full-reader"),
                    $("#preview-reader-small-button").hide(),
                    $("#preview-reader-full-button").show(),
                    $editorReaderFull.html(""),
                    $editorReaderFull.removeAttr("style"),
                    $editorReaderFull.removeClass("editor-reader-full-shown").addClass("editor-reader-full-hidden"),
                    $("#container").show(),
                    a()
            },
            n = function() {
                $("body").hasClass("theme-black") ? e(".in-page-button > span", "rgba(249, 249, 245, 0.65)", "rgb(187, 187, 187, 0.45)") : e(".in-page-button > span", "rgba(44, 62, 80, 0.65)", "rgba(102, 128, 153, 0.45)")
            },
            o = function() {
                $("#article-loading-alert").hasClass("editor-reader-hidden") || ($("#article-loading-alert").removeAttr("style"), $("#article-loading-alert").addClass("editor-reader-hidden"))
            },
            p = function(a) {
                if (a && (f().isFullReader || f().isEditorReader)) {
                    var b = 0;
                    if (f().isEditorReader) {
                        var c = $("#wmd-panel-preview");
                        b = c.position().left + c.width() / 2 - 100
                    } else b = $(window).width() / 2 - 150;
                    var d = $(window).height() / 2 - 50;
                    $("#article-loading-alert").removeClass("editor-reader-hidden").css("position", "fixed").css("z-index", 5e3).css("left", b + "px").css("top", d + "px")
                }
            },
            q = function() {
                var a = !1,
                    b = function() {
                        a ? ($("#wmd-button-bar").show(), $("#preview-button-bar").show(), a = !1) : ($("#wmd-button-bar").hide(), $("#preview-button-bar").hide(), a = !0)
                    };
                return {
                    hideToolBar: b,
                    isHidden: function() {
                        return a
                    }
                }
            } (),
            r = function() {
                var a = !1,
                    b = function() {
                        a ? ($("#editor-column").removeClass("pull-right").addClass("pull-left"), $("#preview-column").removeClass("pull-left").addClass("pull-right"), $("#preview-button-row").removeClass("pull-left").addClass("pull-right"), $("ul.dropdown-menu.pull-left").removeClass("pull-left").addClass("pull-right"), $("#editor-reader-exchange-button span").removeClass("icon-chevron-sign-right").addClass("icon-chevron-sign-left"), a = !1) : ($("#editor-column").removeClass("pull-left").addClass("pull-right"), $("#preview-column").removeClass("pull-right").addClass("pull-left"), $("#preview-button-row").removeClass("pull-right").addClass("pull-left"), $("ul.dropdown-menu.pull-right").removeClass("pull-right").addClass("pull-left"), $("#editor-reader-exchange-button span").removeClass("icon-chevron-sign-left").addClass("icon-chevron-sign-right"), a = !0),
                            $.localStorage("isEditorPreviewExchanged", a)
                    },
                    c = function() {
                        var a = $.localStorage("isEditorPreviewExchanged");
                        a || (a = !1),
                        a && b()
                    };
                return {
                    exchange: b,
                    loadDefault: c,
                    isExchanged: function() {
                        return a
                    }
                }
            } ();
        return {
            switchFullEditorMode: j,
            switchNormalModeFromFullEditorMode: k,
            switchFullReaderMode: l,
            switchNormalModeFromFullReaderMode: m,
            openArticleLoadingAlert: p,
            closeArticleLoadingAlert: o,
            initialHiddenTopToolBar: q,
            exchangeEditorPreview: r
        }
    } (),
    com.zybuluo.mdeditor.syncUserNotes = function() {
        var a = com.zybuluo.indexedDB,
            b = a.STORE_LOCALNOTE_ACTIONS,
            c = a.STRUCTURE_LOCALNOTE_ACTIONS,
            d = com.zybuluo.mdeditor.initData,
            e = function(c, e, g, h, i) {
                var j = a.getDatabase();
                if (null === c || d.isUrlMode === !0 || null === j) return void(i && i());
                g && g();
                var k = j.transaction(b, "readonly"),
                    l = {},
                    m = k.objectStore(b),
                    n = m.index("author"),
                    o = IDBKeyRange.only(c.name);
                n.openCursor(o).onsuccess = function(a) {
                    var b = a.target.result;
                    if (b) {
                        var g = b.value;
                        g.local_note_id !== e && "offline" !== g.action && (null === g.action || "delete" === g.action || "merge" === g.action ? l[g.local_note_id] = {
                            action: g.action,
                            version_id: g.version_id
                        }: ("create" === g.action || "modify" === g.action) && (l[g.local_note_id] = g)),
                            b.
                                continue ()
                    } else $.post(d.mdeditorNoteSyncUrl, {
                            local_username: c.name,
                            current_id: e,
                            local_note_action_map: JSON.stringify(l)
                        },
                        function(a) {
                            if (a.loggedin === !1) window.location = d.loginComeFromUrl;
                            else if (a.synchronized_usernote_actions) {
                                var b = JSON.parse(a.synchronized_usernote_actions),
                                    c = a.sync_left_over;
                                f(b, l, c, h, i)
                            } else a.version_error === !0 ? (console.error("synchronize notes: version error"), i("同步失败：遭遇版本冲突，请稍后重试或联系我们。")) : a.error && (console.error("synchronize notes: error"), i("同步失败：非法请求，请退出重登或联系我们。"))
                        },
                        "json").fail(function() {
                            console.error("synchronize notes: fail"),
                                i("离线状态下无法同步数据，但可以离线编辑，请连接网络后重试。", !0)
                        })
                }
            },
            f = function(c, d, e, f, g) {
                var i = [],
                    j = a.getDatabase(),
                    k = j.transaction(b, "readwrite");
                k.oncomplete = function() {
                    console.log("SUCCESS: sync all the notes except current one!"),
                    f && f(e, i)
                },
                    k.onerror = function(a) {
                        console.error("ERROR: sync all the notes except current one: " + a.target.error.message),
                        g && g("同步失败：读写本地存储失败，请退出重试或联系我们。")
                    };
                var l = k.objectStore(b);
                for (var n in c) {
                    var o = c[n];
                    "create" === o.action || "modify" === o.action ? o.server_data === !1 && (localNoteAction = d[o.local_note_id], m(localNoteAction, o)) : "merge" === o.action && i.push(o.server_note_id),
                        h(l, o)
                }
            },
            g = function(c, d, e) {
                var f = a.getDatabase();
                if (null === f) {
                    var g = e ? e: d;
                    return void(g && g())
                }
                var i = f.transaction(b, "readwrite");
                i.oncomplete = function() {
                    console.log("SUCCESS: sync current serverNoteAction!"),
                        d()
                },
                    i.onerror = function(a) {
                        console.error("ERROR: sync current serverNoteAction: " + a.target.error.message),
                            e ? e() : d()
                    };
                var j = i.objectStore(b);
                h(j, c)
            },
            h = function(a, b) {
                if ("create" === b.action) {
                    var c = k(b);
                    c.local_note_id = b.server_note_id,
                        c.action = null,
                        c.base = c.details;
                    var d = a.add(c);
                    d.onsuccess = function() {
                        b.local_note_id < 0 && a.delete(b.local_note_id)
                    }
                } else if ("delete" === b.action) a.delete(b.local_note_id);
                else if ("modify" === b.action) i(a, b);
                else if ("merge" === b.action) {
                    var e = a.get(b.local_note_id);
                    e.onsuccess = function(b) {
                        var c = b.target.result;
                        c.action = "merge",
                            a.put(c)
                    }
                }
            },
            i = function(a, b) {
                var c = a.get(b.local_note_id);
                c.onsuccess = function(c) {
                    var d = c.target.result;
                    l(b, d),
                        d.action = null,
                        d.base = d.details,
                        a.put(d)
                }
            },
            j = function(a, b) {
                for (var c in b) null !== a[c] && void 0 !== a[c] && (b[c] = a[c])
            },
            k = function(a) {
                var b = {};
                for (var d in c) {
                    var e = c[d];
                    b[e] = a[e]
                }
                return b
            },
            l = function(a, b) {
                var c = k(a);
                j(c, b)
            },
            m = function(a, b) {
                for (var c in a)(void 0 === b[c] || null === b[c]) && (b[c] = a[c])
            },
            n = function(b, c, d) {
                var e = a.getDatabase();
                if (null === e) {
                    var f = d ? d: c;
                    return void(f && f())
                }
                var g = e.transaction(a.STORE_LOCALNOTE_ACTIONS, "readonly"),
                    h = g.objectStore(a.STORE_LOCALNOTE_ACTIONS),
                    i = h.get(b);
                i.onsuccess = function(a) {
                    var b = a.target.result;
                    c(b)
                },
                    i.onerror = function() {
                        d && d()
                    }
            },
            o = function(b, c, d, e) {
                var f = a.getDatabase();
                if (null === f) return void(e && e());
                var g = f.transaction(a.STORE_LOCALNOTE_ACTIONS, "readwrite"),
                    h = g.objectStore(a.STORE_LOCALNOTE_ACTIONS),
                    i = h.get(b);
                i.onerror = function() {
                    e && e()
                },
                    i.onsuccess = function(a) {
                        var b = a.target.result;
                        if (!b) return void(e && e());
                        c(b);
                        var f = h.put(b);
                        f.onerror = function() {
                            e && e()
                        },
                            f.onsuccess = function() {
                                d && d(b)
                            }
                    }
            },
            p = function(c, d, e, f) {
                var g = a.getDatabase();
                if (null === g) return void(f && f());
                var h = {},
                    i = !1;
                d && "delete" !== d.action || (d = null, i = !0);
                var j = g.transaction(b, "readonly");
                j.oncomplete = function() {
                    console.log("SUCCESS: populate offline data!")
                },
                    j.onerror = function() {
                        console.error("ERROR: populate offline data!"),
                        f && f()
                    };
                var k = j.objectStore(b),
                    l = k.index("author"),
                    m = IDBKeyRange.only(c.name);
                l.openCursor(m).onsuccess = function(a) {
                    var b = a.target.result;
                    if (b) {
                        var c = b.value;
                        if ("delete" === c.action) return void b.
                            continue ();
                        i === !0 && (null === d ? d = c: c.last_updated_date >= d.last_updated_date && (d = c));
                        var f = {
                            updated_date: c.last_updated_date,
                            title: c.title,
                            version_id: c.version_id,
                            id: c.local_note_id,
                            created_date: c.created_date,
                            "public": c.public,
                            isOffline: "offline" === c.action
                        };
                        for (var g in c.tags) {
                            var j = c.tags[g],
                                k = h[j];
                            k ? k.push(f) : (k = [f], h[j] = k)
                        }
                        b.
                            continue ()
                    } else {
                        var l = [],
                            m = function(a, b) {
                                return a.created_date > b.created_date ? -1 : a.created_date < b.created_date ? 1 : 0
                            };
                        for (var n in h) h[n].sort(m),
                            l.push({
                                name: n,
                                userNoteUIs: h[n]
                            });
                        l.sort(function(a, b) {
                            return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
                        }),
                            null === d ? e(d, l) : e(d, l)
                    }
                }
            },
            q = function(c, d, e, f) {
                var g = a.getDatabase();
                if (null === g) return void(f && f());
                var h = g.transaction(b, "readwrite");
                h.oncomplete = function() {
                    console.log("SUCCESS: create local note action!"),
                        e()
                },
                    h.onerror = function() {
                        console.error("ERROR: create local note action!"),
                        f && f()
                    };
                var i = h.objectStore(b),
                    j = -1,
                    k = function() {
                        var a = i.get(j);
                        a.onsuccess = function(a) {
                            return a.target.result ? (j -= 1, void k()) : (c.local_note_id = j, c.action = d, c.base = c.details, void i.add(c))
                        },
                            a.onerror = function() {
                                f && f()
                            }
                    };
                k()
            },
            r = function(c, d, e) {
                var f = a.getDatabase();
                if (null === f) return void(e && e());
                var g = f.transaction(b, "readwrite");
                g.oncomplete = function() {
                    console.log("SUCCESS: delete local note action!"),
                        d()
                },
                    g.onerror = function() {
                        console.error("ERROR: delete local note action!"),
                        e && e()
                    };
                var h = g.objectStore(b);
                h.delete(c)
            },
            s = function(c, d, e, f) {
                var g = a.getDatabase();
                if (null === g) return void(f && f());
                var h = g.transaction(b, "readonly");
                h.oncomplete = function() {
                    console.log("SUCCESS: export all local notes!")
                },
                    h.onerror = function() {
                        console.error("ERROR: export all local notes!"),
                        f && f()
                    };
                var i = h.objectStore(b),
                    j = i.index("author"),
                    k = IDBKeyRange.only(c.name);
                j.openCursor(k).onsuccess = function(a) {
                    var b = a.target.result;
                    if (b) {
                        var c = b.value;
                        if ("delete" === c.action) return void b.
                            continue ();
                        d(c),
                            b.
                                continue ()
                    } else e()
                }
            };
        return {
            syncServerNoteActions: e,
            checkLocalNoteAction: n,
            syncCurrentServerNoteAction: g,
            convertServerNoteActionToLocalNoteAction: k,
            copyLocalNoteActionToServerNoteAction: m,
            updateLocalNoteAction: o,
            populateOfflineData: p,
            createLocalNoteAction: q,
            deleteLocalNoteAction: r,
            exportAllLocalNotes: s
        }
    } (),
    com.zybuluo.mdeditor.render = function(a) {
        var b = com.zybuluo.mdeditor.initData,
            c = com.zybuluo.mdeditor.layout.initData,
            d = com.zybuluo.common.loginUser,
            e = b.mdeditorNoteInfoUrl,
            f = com.zybuluo.mdeditor.common.getCurrentIdInHash(),
            g = com.zybuluo.indexedDB,
            h = g.getDatabase(),
            i = com.zybuluo.mdeditor.syncUserNotes,
            j = com.zybuluo.mdeditor.unifiedEditor,
            k = com.zybuluo.mdeditor.common.extractMarkdownTitle,
            l = com.zybuluo.mdeditor.common.populateFileList,
            m = com.zybuluo.mdeditor.fileManager,
            n = function(a, c, d, e, f, g) {
                if (a) {
                    var h = $("#preview-button-row-login.editor-reader-hidden"),
                        i = h.find("#preview-button-row-loginuser").attr("href", b.loginUserUrl + a.name);
                    a.user_tier ? (i.html('<span class="paid-user-color">' + a.name + "</span>"), $("#mdeditor-payment-submenu").removeClass("paid-user-color").children("span").text("高级会员")) : i.html("<span>" + a.name + "</span>"),
                        h.removeClass("editor-reader-hidden")
                } else $("#preview-button-row-notlogin.editor-reader-hidden").removeClass("editor-reader-hidden");
                b.isUrlMode === !1 && ($("#preview-published-button.editor-reader-hidden").removeClass("editor-reader-hidden"), $("#preview-publish-button.editor-reader-hidden").removeClass("editor-reader-hidden"), $("#preview-file-button.editor-reader-hidden").removeClass("editor-reader-hidden"), $("#preview-file-button .btn-group").show(), $("#preview-button-row-spacer.editor-reader-hidden").removeClass("editor-reader-hidden"), $("#preview-list-button.editor-reader-hidden").removeClass("editor-reader-hidden"), $("#preview-info-button.editor-reader-hidden").removeClass("editor-reader-hidden"), $("#preview-settings-button.editor-reader-hidden").removeClass("editor-reader-hidden")),
                    b.isUrlMode === !0 || null === a ? $("#reader-full-topInfo").html("") : $(".article-author").text("@" + a.name),
                    $(".article-updated-date").text(new Date(g).format("Y-m-d H:i")),
                    $(".article-created-date").text(null !== f ? new Date(f).format("Y-m-d H:i") : null),
                    $(".article-read").text(d),
                    l(e, c),
                    com.zybuluo.mdeditor.common.initiateSearchFileComponent(j)
            },
            o = function() {
                var a = window.location.search.match(/(\?|&)(url=.*?)($|&)/);
                if (a) b.isUrlMode = !0,
                    e = e + "?" + a[2],
                    p(e, null);
                else {
                    b.isUrlMode = !1;
                    var c = $.localStorage("currentId");
                    c = null === c ? "": c,
                    null !== f && (c = f),
                        e += c,
                        c ? i.checkLocalNoteAction(c,
                            function(a) {
                                a ? p(e, a) : p(e, null)
                            },
                            function() {
                                p(e, null)
                            }) : p(e, null)
                }
            },
            p = function(a, e) {
                var f = null;
                f = JSON.stringify(e && "offline" === e.action ? {
                    local_note_id: e.local_note_id,
                    action: "offline"
                }: e),
                    $.post(a, {
                            local_note_action: f
                        },
                        function(a) {
                            if (a.version_error === !0) return window.alert("遭遇数据版本冲突，点击【确认】后自动重试。"),
                                void window.location.reload();
                            var f = function(d) {
                                b.userNoteUrl = b.userNoteUrl.replace("loggedin_username_placeholder", a.loggedin_username),
                                    c.loggedInUsername = a.loggedin_username,
                                    b.isEditablePage = a.is_editable_page;
                                var f = JSON.parse(a.tag_uis),
                                    g = a.read_count,
                                    h = JSON.parse(a.synchronized_usernote_action);
                                r(d, e, h,
                                    function(a) {
                                        h = a ? a: h,
                                            s(d, h, f, g)
                                    })
                            };
                            a.loggedin_username ? d.set({
                                    name: a.loggedin_username,
                                    user_tier: a.user_tier
                                },
                                f) : d.clear(f)
                        },
                        "json").fail(function() {
                            b.isUrlMode === !0 && (window.alert("离线状态下无法开启外链接模式，请连接网络后重试，点击确认回到离线模式。"), window.location = window.location.origin + window.location.pathname),
                                d.get(function(a) {
                                    if (null === a) {
                                        var d = "";
                                        b.userNoteUrl = b.userNoteUrl.replace("loggedin_username_placeholder", d),
                                            c.loggedInUsername = d,
                                            b.isEditablePage = !1,
                                            b.isUrlMode = !1;
                                        var f = q(d);
                                        return void s(a, f.serverNoteAction, f.tagUIs, 0)
                                    }
                                    b.userNoteUrl = b.userNoteUrl.replace("loggedin_username_placeholder", a.name),
                                        c.loggedInUsername = a.name,
                                        b.isEditablePage = !0,
                                        b.isUrlMode = !1;
                                    var g = 0;
                                    i.populateOfflineData(a, e,
                                        function(b, c) {
                                            var d = null;
                                            if (null !== b) d = {
                                                server_note_id: b.local_note_id,
                                                server_data: !1
                                            },
                                                i.copyLocalNoteActionToServerNoteAction(b, d),
                                                s(a, d, c, g);
                                            else {
                                                var e = q(a.name);
                                                d = e.serverNoteAction,
                                                    b = i.convertServerNoteActionToLocalNoteAction(d),
                                                    i.createLocalNoteAction(b, "create",
                                                        function() {
                                                            d.local_note_id = b.local_note_id,
                                                                d.server_note_id = b.local_note_id,
                                                                e.tagUIs[0].userNoteUIs[0].id = b.local_note_id,
                                                                s(a, d, e.tagUIs, 0)
                                                        },
                                                        function() {
                                                            window.alert("新增本地文稿时出错，请关闭客户端或浏览器后重启程序，或者联系我们。")
                                                        })
                                            }
                                        },
                                        function() {
                                            window.alert("获取本地文稿时出错，请关闭客户端/浏览器后重启程序，或者联系我们。")
                                        })
                                })
                        })
            },
            q = function(a) {
                var b = j.getDefaultDocument(),
                    c = k.get(b),
                    d = g.newLocalNoteAction(a, c, b, null),
                    e = {
                        id: d.local_note_id,
                        title: d.title,
                        "public": d.public,
                        created_date: d.created_date,
                        updated_date: d.last_updated_date,
                        version_id: d.version_id
                    },
                    f = {
                        name: d.tags[0],
                        userNoteUIs: [e]
                    },
                    h = [f],
                    i = d;
                return i.server_note_id = -1,
                    i.server_data = !1,
                {
                    tagUIs: h,
                    serverNoteAction: i
                }
            },
            r = function(a, c, d, e) {
                if (null === h) return void e();
                if (null === d.action) return null === a || b.isUrlMode === !0 ? void e() : d.server_data === !0 ? void i.checkLocalNoteAction(d.server_note_id,
                    function(a) {
                        a ? com.zybuluo.mdeditor.common.reloadCurrentId(d.server_note_id) : (d.action = "create", i.syncCurrentServerNoteAction(d, e))
                    },
                    function() {
                        window.alert("检测本地存储时出错，请关闭客户端或浏览器后重启程序，或者联系我们。")
                    }) : (i.copyLocalNoteActionToServerNoteAction(c, d), void e());
                if ("offline" === d.action) return i.copyLocalNoteActionToServerNoteAction(c, d),
                    void e();
                if ("create" === d.action) return d.server_data === !0 ? void i.syncCurrentServerNoteAction(d, e) : (i.copyLocalNoteActionToServerNoteAction(c, d), void i.syncCurrentServerNoteAction(d, e));
                if ("modify" === d.action) return d.server_data === !0 ? void i.syncCurrentServerNoteAction(d, e) : (i.copyLocalNoteActionToServerNoteAction(c, d), void i.syncCurrentServerNoteAction(d, e));
                if ("merge" === d.action) {
                    b.mergeServerNoteAction = d;
                    var f = {
                        server_note_id: c.local_note_id,
                        server_data: !1
                    };
                    i.copyLocalNoteActionToServerNoteAction(c, f),
                        e(f)
                }
            },
            s = function(d, e, g, h) {
                var j = e.server_note_id;
                if (null !== d && b.isUrlMode === !1) if ($.localStorage("currentId", j), null === f) {
                    var k = com.zybuluo.mdeditor.common.getCurrentMode();
                    window.location.hash = k.isEditorReader ? j: j + "-" + window.location.hash.match(/^#(.*)$/)[1]
                } else f !== j && (window.location.hash = window.location.hash.replace(/^#(\d+)/, j));
                b.currentId = j,
                    b.currentVersionId = e.version_id,
                    b.isPublic = e.public,
                    b.anchorListString = e.anchor_list,
                    b.userNoteUrl = b.userNoteUrl + j,
                    b.noteRevisionsUrl = b.noteRevisionsUrl.replace("current_id_placeholder", j),
                    b.noteRevisionUrl = b.noteRevisionUrl.replace("current_id_placeholder", j),
                    b.noteRevisionSaveUrl = b.noteRevisionSaveUrl.replace("current_id_placeholder", j),
                b.isEditablePage === !0 && (c.noteRemarksUrl = c.noteRemarksUrl.replace("current_id_placeholder", j), c.newNoteRemarkUrl = c.newNoteRemarkUrl.replace("current_id_placeholder", j), c.updateNoteRemarkUrl = c.updateNoteRemarkUrl.replace("current_id_placeholder", j), c.deleteNoteRemarkUrl = c.deleteNoteRemarkUrl.replace("current_id_placeholder", j), c.publishNoteRemarkUrl = c.publishNoteRemarkUrl.replace("current_id_placeholder", j), c.newNoteRemarkReplyUrl = c.newNoteRemarkReplyUrl.replace("current_id_placeholder", j), c.updateNoteRemarkReplyUrl = c.updateNoteRemarkReplyUrl.replace("current_id_placeholder", j), c.deleteNoteRemarkReplyUrl = c.deleteNoteRemarkReplyUrl.replace("current_id_placeholder", j)),
                null !== d && null !== e.title && $("title").first().text(e.title + " - 作业部落 Cmd Markdown 编辑阅读器");
                var l = function() {
                    var b = e.created_date,
                        c = e.last_updated_date;
                    n(d, g, h, j, b, c);
                    var f = e.details;
                    a(d, j, f)
                };
                if (window.desktopGui && e.local_file_path) {
                    var o = require("fs");
                    try {
                        var p = o.readFileSync(e.local_file_path, "utf8");
                        if (p !== e.details) {
                            var q = (new Date).toISOString();
                            e.details = p,
                                e.last_updated_date = q,
                                i.updateLocalNoteAction(j,
                                    function(a) {
                                        a.details = p,
                                            a.last_updated_date = q
                                    },
                                    l, l)
                        } else l();
                        var r = m.fileWatcher;
                        r.watch(o, e.local_file_path);
                        var s = require("path"),
                            t = s.basename(e.local_file_path),
                            u = s.dirname(e.local_file_path);
                        $("title").first().text(t + " (" + u + ") - 作业部落 Cmd Markdown 编辑阅读器")
                    } catch(v) {
                        console.error(v),
                            window.alert("无法读取离线文件：" + e.local_file_path + "，此文件路径将被忽略。"),
                            i.updateLocalNoteAction(j,
                                function(a) {
                                    delete a.local_file_path
                                },
                                l, l)
                    }
                } else l()
            };
        o()
    },
    com.zybuluo.mdeditor.MergeEditor = function(a, b, c) {
        var d = com.zybuluo.mdeditor.common.setCursorPositionInContenteditable,
            e = new diff_match_patch,
            f = 30,
            g = e.diff_main(a, b);
        e.diff_cleanupSemantic(g);
        var h = e.diff_prettyHtml(g),
            i = function(a, b, c) {
                var e = $("#merge-editor");
                e.css("height", c + "px");
                var g = e.find("span.delete").length,
                    h = e.find("span.insert").length,
                    i = '<br><div id="merge-text" style="float: left;">' + a + "和" + b + "共有 " + (g + h) + ' 处不同，<span class="insert">' + a + "</span> " + h + ' 处，<span class="delete">' + b + "</span> " + g + " 处。</div>",
                    j = '<div style="float: right; margin-right: 185px;"><a id="previous-diff-button" class="btn btn-mini" href="#"><i class="icon-arrow-up"></i> 上一处</a>&nbsp;&nbsp;<a id="next-diff-button" class="btn btn-mini" href="#"><i class="icon-arrow-down"></i> 下一处</a></div>';
                e.after(i + j),
                    e.get(0).addEventListener("paste",
                        function(a) {
                            a.preventDefault();
                            var b = null,
                                c = document.createElement("div");
                            if (a.clipboardData) {
                                if (b = (a.originalEvent || a).clipboardData.getData("text/plain"), "" === b) return ! 1;
                                c.innerHTML = b.replace(/</gm, "&lt;").replace(/>/gm, "&gt;"),
                                    b = c.textContent.replace(/</gm, "&lt;").replace(/>/gm, "&gt;"),
                                    b = b.replace(/(\n|\r)/gm, "<br>"),
                                    document.execCommand("insertHTML", !1, b)
                            } else if (window.clipboardData) {
                                if (b = window.clipboardData.getData("Text"), "" === b) return ! 1;
                                c.innerHTML = b.replace(/</gm, "&lt;").replace(/>/gm, "&gt;"),
                                    b = c.textContent.replace(/</gm, "&lt;").replace(/>/gm, "&gt;"),
                                    b = b.replace(/(\n|\r)/gm, "<br>"),
                                    document.selection.createRange().pasteHTML(b)
                            }
                        });
                var k = function(a) {
                        var b = a.prevAll().length;
                        d(e.get(0), b, 0);
                        var c = a.position().top,
                            g = e.position().top,
                            h = e.scrollTop() + c - g - f;
                        e.scrollTop(h)
                    },
                    l = $(e.find("span.diff")[0]);
                k(l),
                    e.focus(),
                    $("#merge-editor > span").on("mousedown",
                        function() {
                            l = $(this)
                        }),
                    $("#merge-editor > span").on("keydown",
                        function() {
                            l = $(this)
                        }),
                    $("#previous-diff-button").on("click",
                        function() {
                            var a = l.prevAll("span.diff");
                            if (0 === a.length) {
                                var b = l.nextAll("span.diff");
                                if (0 === b.length) return void e.focus();
                                l = $(b[b.length - 1])
                            } else l = $(a[0]);
                            k(l),
                                e.focus()
                        }),
                    $("#next-diff-button").on("click",
                        function() {
                            var a = l.nextAll("span.diff");
                            if (0 === a.length) {
                                var b = l.prevAll("span.diff");
                                if (0 === b.length) return void e.focus();
                                l = $(b[b.length - 1])
                            } else l = $(a[0]);
                            k(l),
                                e.focus()
                        })
            },
            j = function() {
                return c === !0 ? '<div id="merge-editor" class="theme-white" contentEditable="true" spellcheck="false">' + h + "</div>": '<div id="merge-editor" class="theme-white" contentEditable="false" spellcheck="false">' + h + "</div>"
            },
            k = function() {
                $("#merge-editor > div").each(function() {
                    var a = $(this);
                    a.replaceWith("" === a.text() ? "<br>": "<br>" + a.html())
                });
                var a = $("#merge-editor");
                return a.html(a.html().replace(/&nbsp;/gm, " ").replace(/<br>/gim, "\n")),
                    a.text()
            };
        return {
            init: i,
            html: j,
            text: k
        }
    },
    com.zybuluo.mdeditor.init = function(a) {
        function b(a) {
            var b = !1;
            if (E.length !== a.length) b = !0;
            else for (var c in E) if ( - 1 === a.indexOf(E[c])) {
                b = !0;
                break
            }
            return b && (E = a, l.reset_tag_changes(E), I === !1 && (F === !1 ? (F = !0, $("#file-list-topbar").css("display", "block"), $("#file-list").css("display", "block"), $("#search-file-bar").css("display", "none"), $("#tag-file-bar").css("display", "block")) : clearTimeout(G), $("#file-list .tag-item:visible").hide(), $("#file-list .file-item:visible").hide(), $("#file-list .whiter-on-black").parent("a").parent("li").siblings(".tag-item").show(), G = setTimeout(function() {
                    $("#file-list-topbar").css("display", ""),
                        $("#file-list").css("display", ""),
                        $("#search-file-bar").css("display", "block"),
                        $("#tag-file-bar").css("display", "none"),
                        F = !1
                },
                3e3))),
                b
        }
        function c(a) {
            var b, c, d, e, f = a.match(/^@@\s(.*)\s@@/),
                g = f[1].split(" "),
                h = g[0].match(/^-(\d+),(\d+)/);
            h ? (b = h[1], c = h[2]) : (b = g[0].match(/^-(\d+)/)[1], c = 1);
            var i = g[1].match(/^\+(\d+),(\d+)/);
            return i ? (d = i[1], e = i[2]) : (d = g[1].match(/^\+(\d+)/)[1], e = 1),
                [b, c, d, e]
        }
        function d(a) {
            for (var b = q(4); - 1 !== a.indexOf(b);) b = q(4);
            return a.push(b),
                b
        }
        function e(a, b) {
            var c = ab[b];
            return null !== c ? (a.push(Y[c]), Y[c]) : null
        }
        function f(a) {
            var b = Y.join(" ");
            b !== a && (n.anchorListString = a, Y = null, Z = null, ab = null)
        }
        function g(a) {
            var b = [],
                f = document.createElement("div");
            f.innerHTML = a;
            var g = f.childNodes;
            if (null === Y && null === Z) {
                if (null !== n.anchorListString) {
                    Y = "" === n.anchorListString ? [] : n.anchorListString.split(" "),
                        Z = [],
                        ab = [];
                    var h = 0;
                    return u(function(a, c) {
                            Z.push(a.outerHTML),
                                ab.push(c ? h: null),
                                b.push({
                                    index: 0,
                                    action: "add",
                                    wmdPreviewChildNode: a.outerHTML,
                                    anchorId: c ? Y[h++] : null
                                })
                        },
                        g),
                    {
                        anchorIdsContainer: Y,
                        wmdPreviewDiffResults: b,
                        overwrite: !0
                    }
                }
                Y = [],
                    Z = [],
                    ab = []
            }
            var i = 0;
            if (0 === Y.length && 0 === Z.length) return u(function(a, c) {
                    Z.push(a.outerHTML),
                        ab.push(c ? i++:null),
                        b.push({
                            index: 0,
                            action: "add",
                            wmdPreviewChildNode: a.outerHTML,
                            anchorId: c ? d(Y) : null
                        })
                },
                g),
            {
                anchorIdsContainer: Y,
                wmdPreviewDiffResults: b,
                overwrite: !0
            };
            for (var j = [], k = [], l = u(function(a, b) {
                    j.push(a.outerHTML),
                        k.push(b ? i++:null)
                },
                g), m = difflib.unifiedDiff(Z, j), o = [], p = 0, q = 2; q < m.length;) {
                var r = c(m[q]),
                    s = r[0];
                for (r[1], r[2], r[3]; s - 1 > p; p++) e(o, p);
                for (var t = -1,
                         v = 0,
                         w = 0; ++q < m.length;) {
                    var x = m[q][0];
                    if (" " === x) {
                        if (v > 0) {
                            for (w = 0; v > w; w++) b.push({
                                index: p + w,
                                action: "delete"
                            });
                            p += v,
                                t = -1,
                                v = 0
                        }
                        e(o, p),
                            p++
                    } else if ("+" === x) {
                        var y = m[q].substring(1);
                        if (v > 0) {
                            var z = !1;
                            for (w = 0; v > w; w++) {
                                var A = $(m[t + w].substring(1)).html(),
                                    B = $(m[q].substring(1)).html(),
                                    C = new difflib.SequenceMatcher(null, A, B);
                                if (C.quickRatio() >= .33) {
                                    for (var D = 0; w > D; D++) b.push({
                                        index: p + D,
                                        action: "delete"
                                    });
                                    var E = p + w,
                                        F = e(o, E);
                                    b.push({
                                        index: E,
                                        action: "update",
                                        wmdPreviewChildNode: y,
                                        anchorId: F
                                    }),
                                        p = E + 1,
                                        t = t + w + 1,
                                        v = v - w - 1,
                                    0 === v && (t = -1),
                                        z = !0;
                                    break
                                }
                            }
                            if (z === !0) continue
                        }
                        b.push({
                            index: p,
                            action: "add",
                            wmdPreviewChildNode: y,
                            anchorId: "" !== $(y).html() ? d(o) : null
                        })
                    } else {
                        if ("-" !== x) break; - 1 === t && (t = q),
                            v++
                    }
                }
                if (v > 0) {
                    for (w = 0; v > w; w++) b.push({
                        index: p + w,
                        action: "delete"
                    });
                    p += v,
                        t = -1,
                        v = 0
                }
            }
            for (; p < ab.length; p++) e(o, p);
            return Z = j,
                ab = k,
                Y = o,
            l !== Y.length && console.error("The number of generated anchor ids are different from the qualified elements."),
            {
                anchorIdsContainer: Y,
                wmdPreviewDiffResults: b,
                overwrite: !1
            }
        }
        function h(a, b, c, d, e) {
            var f = !1,
                g = !1;
            x(a, b,
                function() {
                    g = !0,
                        $("#notification-popup-window").modal("hide")
                },
                function() {
                    f = !0
                },
                function() {
                    var a = ($("#notification-popup-window"), $("#notification-popup-window .modal-body"));
                    a.append('<i class="' + c + '"></i> <input id="editorDialogInput" class="span5" type="text" placeholder="">');
                    var b = $("#editorDialogInput"),
                        f = $("#notification-popup-window #notification-confirm");
                    f.html('确认 <i class="icon-level-down icon-rotate-90 icon-large"></i>'),
                        $("#notification-popup-window #notification-cancel").html("取消 (Esc)"),
                    e && e(),
                        b.on("keydown",
                            function(a) {
                                var b = a.charCode || a.keyCode;
                                switch (b) {
                                    case 13:
                                        f.click()
                                }
                            }),
                        b.attr("placeholder", d),
                        b.val(""),
                        b.focus()
                },
                function() {
                    if (bb) if (g === !0) {
                        var a = $("#editorDialogInput"),
                            b = a.val();
                        if (b) {
                            var c = a.data("fileInfo");
                            c ? bb(b, c) : bb(b)
                        } else bb(null)
                    } else bb(null);
                    j.focus()
                })
        }
        var i = com.zybuluo.common.loginUser,
            j = com.zybuluo.mdeditor.unifiedEditor,
            k = com.zybuluo.mdeditor.scrollLink,
            l = com.zybuluo.mdeditor.fileManager,
            m = com.zybuluo.mdeditor.MergeEditor,
            n = com.zybuluo.mdeditor.initData,
            o = com.zybuluo.mdeditor.mode,
            p = com.zybuluo.mdeditor.common.applyPreviewElementTheme,
            q = com.zybuluo.mdeditor.common.generateUUID,
            r = com.zybuluo.mdeditor.common.extractMarkdownTitle,
            s = com.zybuluo.mdeditor.toc,
            t = com.zybuluo.mdeditor.sideRemark,
            u = com.zybuluo.mdeditor.common.wmdPreviewChildNodes_callback,
            v = com.zybuluo.mdeditor.syncUserNotes,
            w = new diff_match_patch,
            x = com.zybuluo.common.popupConfirm.popup,
            y = window.lightMode ? null: require("ace/range").Range,
            z = $("#wmd-preview"),
            A = Markdown.getSanitizingConverter();
        Markdown.Extra.init(A, {
            extensions: ["tables", "fenced_code_gfm", "def_list", "attr_list", "footnotes", "smartypants", "strikethrough", "newlines"],
            highlighter: "prettify"
        });
        var B, C = {
            strings: Markdown.local.zh
        };
        B = window.lightMode ? new Markdown.EditorLight(A, null, C) : new Markdown.Editor(A, null, C),
            k.onEditorConfigure(B),
            k.onLayoutCreated(),
            bindMathJaxHooks(A);
        var D = /((\n|^)(标签|tags)(.*?)(:|：)[^\S\n]*(\S*.*?)(\n|$))/i,
            E = [],
            F = !1,
            G = null,
            H = !1,
            I = !0,
            J = !1,
            K = [];
        A.hooks.chain("preConversion",
            function(c) {
                if (a) {
                    var d = [],
                        e = function(a, b, c, e, f, g, h, i) {
                            if (f.length > 10) return b;
                            var j = "",
                                k = h.trim().split(" ");
                            for (var l in k) {
                                var m = k[l].trim();
                                if ("" !== m && (j = j + "`" + m + "` ", -1 === d.indexOf(m) && d.push(m), "4" === l)) break
                            }
                            return j = "" === j ? "` `": j.substring(0, j.length - 1),
                            c + j + i
                        },
                        f = c.replace(D, e);
                    0 === d.length && (d = ["未分类"]);
                    var g = b(d);
                    return K = g === !0 || H === !0 ? d: [],
                        f
                }
                return K = [],
                    c
            });
        var L = !1,
            M = function(a, b, c) {
                if (a === b) return N(b, a),
                    L = !0,
                    void B.refreshPreview();
                var d = m(a, b, !0),
                    e = !1;
                x("人工合并文稿版本", "此文稿在本地和云端有过不同的修改，请编辑以下高亮部分确保文稿的正确性。编辑完成后点击<strong>【完成编辑】</strong>， 或者点击<strong>【使用本地版本】</strong>继续使用本地版本。<br><br>" + d.html(),
                    function() {
                        e = !0,
                            $("#notification-popup-window").modal("hide");
                        var g = d.text();
                        N(b, g),
                        g === a && f(c),
                            L = !0,
                            B.refreshPreview()
                    },
                    function() {
                        e = !0,
                            N(b, b),
                            L = !0,
                            B.refreshPreview()
                    },
                    function() {
                        $("#notification-popup-window #notification-confirm").html("完成编辑"),
                            $("#notification-popup-window #notification-cancel").html("使用本地版本"),
                            $("#notification-popup-window button.close").hide();
                        var a = $("#notification-popup-window");
                        a.css("width", "800px").css("left", ($(window).width() - 800) / 2 + "px").css("margin-left", "0px");
                        var b = 600,
                            c = 400;
                        $(window).height() <= 720 && (a.css("top", "0px"), b = $(window).height(), c = b - 250),
                            $("#notification-popup-window .modal-body").css("max-height", b + "px"),
                            d.init("本地", "云端", c)
                    },
                    function() {
                        $("#notification-popup-window").removeAttr("style"),
                            $("#notification-popup-window .modal-body").removeAttr("style"),
                            $("#notification-popup-window button.close").show(),
                        e === !1 && (N(b, b), L = !0, B.refreshPreview()),
                            j.focus()
                    })
            },
            N = function(a, b) {
                var c = w.diff_main(a, b),
                    d = 0,
                    e = 0,
                    f = null;
                if (window.lightMode) {
                    var g = j.getEditor().caret();
                    j.setValue(b);
                    for (e in c) if (f = c[e], 0 === f[0]) {
                        if (d += f[1].length, d >= g) break
                    } else if (1 === f[0]) {
                        if (d += f[1].length, d >= g) break;
                        g += f[1].length
                    } else if ( - 1 === f[0] && (g -= f[1].length, d >= g)) {
                        g = d;
                        break
                    }
                    0 > g ? g = 0 : g > b.length && (g = b.length),
                        j.getEditor().caret(g)
                } else {
                    var h = j.getEditor().getSession().getDocument();
                    for (e in c) if (f = c[e], 0 === f[0]) d += f[1].length;
                    else if (1 === f[0]) {
                        var i = h.indexToPosition(d, 0);
                        h.insert(i, f[1]),
                            d += f[1].length
                    } else if ( - 1 === f[0]) {
                        var k = h.indexToPosition(d, 0),
                            l = h.indexToPosition(d + f[1].length, 0),
                            m = y.fromPoints(k, l);
                        h.remove(m)
                    }
                }
            },
            O = !0,
            P = function(a) {
                if (!a) return delete n.mergeServerNoteAction,
                {
                    isMerge: !1
                };
                var b = n.mergeServerNoteAction;
                if (b) {
                    if (O === !0) {
                        O = !1,
                            w.Match_Threshold = .1;
                        var c = w.patch_make(a.base, a.details),
                            d = w.patch_apply(c, b.details);
                        if (d[0] !== a.details) {
                            var e = !1;
                            for (var g in d[1]) d[1][g] === !1 && (e = !0);
                            return e ? (M(b.details, a.details, b.anchor_list), null) : (N(a.details, d[0]), d[0] === b.details && f(b.anchor_list), L = !0, B.refreshPreview(), null)
                        }
                    }
                    delete n.mergeServerNoteAction,
                        O = !0;
                    var h = w.patch_make(b.details, a.details);
                    return h = w.patch_toText(h),
                    {
                        isMerge: !0,
                        serverVersionId: b.version_id,
                        diffDetails: h
                    }
                }
                return "merge" === a.action ? null: {
                    isMerge: !1
                }
            },
            Q = !0,
            R = null,
            S = function(b, c) {
                if (n.isEditablePage === !0) {
                    var d = j.getValue(),
                        e = r.get(d);
                    if (e && a) {
                        var g = $("ul#file-list span.whiter-on-black");
                        g.text() !== e && (g.text(e), $("title").first().text(e + " - 作业部落 Cmd Markdown 编辑阅读器"))
                    }
                    var h = function(f) {
                            var g = P(f);
                            if (null === g) return void(fb = !1);
                            var h = null;
                            if (g.isMerge === !0) I = !1,
                                h = {
                                    title: f.title,
                                    diff_details: g.diffDetails,
                                    tags: JSON.stringify(f.tags),
                                    anchor_list: f.anchor_list,
                                    id: f.local_note_id,
                                    version_id: g.serverVersionId
                                };
                            else if (null !== R || f || (R = d), I === !0) I = !1,
                                h = {
                                    tags: JSON.stringify(b),
                                    anchor_list: c,
                                    id: n.currentId,
                                    version_id: n.currentVersionId
                                };
                            else {
                                var j = null;
                                j = f ? f.base: R;
                                var k = w.patch_make(j, d);
                                k = w.patch_toText(k),
                                    h = null !== c ? {
                                        title: e,
                                        diff_details: k,
                                        tags: JSON.stringify(b),
                                        anchor_list: c,
                                        id: n.currentId,
                                        version_id: n.currentVersionId,
                                        restore_revision: db
                                    }: {
                                        title: e,
                                        diff_details: k,
                                        tags: JSON.stringify(b),
                                        id: n.currentId,
                                        version_id: n.currentVersionId,
                                        restore_revision: db
                                    }
                            }
                            $.ajax({
                                type: "post",
                                url: n.updateUserNoteUrl,
                                data: h,
                                dateType: "json"
                            }).done(function(b) {
                                db = !1,
                                    b.loggedin === !1 ? window.location = n.loginComeFromUrl: b.id && b.version_id ? (a ? (Q = !0, l.reset_file_public_changes(b.is_public, b.updated_date), v.updateLocalNoteAction(n.currentId,
                                        function(a) {
                                            n.currentVersionId = b.version_id,
                                                g.isMerge === !1 ? (a.action = null, a.base = d, a.last_updated_date = b.updated_date, a.version_id = b.version_id, a.public = b.is_public) : (a.base = d, a.last_updated_date = b.updated_date, a.version_id = b.version_id, a.public = b.is_public, a.details === d ? a.action = null: (a.action = "modify", L = !0, B.refreshPreview()))
                                        },
                                        null,
                                        function() {
                                            n.currentVersionId = b.version_id
                                        }), f || (R = d)) : n.currentVersionId = b.version_id, H = !1, fb = !1, g.isMerge === !1 ? ('') : ('')) : b.version_error === !0 && b.version_id ? f ? g.isMerge === !1 ? (n.mergeServerNoteAction = {
                                        details: b.details,
                                        version_id: b.version_id,
                                        anchor_list: b.anchor_list
                                    },
                                        L = !0, B.refreshPreview()) : (n.mergeServerNoteAction = {
                                        details: b.details,
                                        version_id: b.version_id,
                                        anchor_list: b.anchor_list
                                    },
                                        L = !0, B.refreshPreview()) : (window.alert("当前文稿在别处有新的更新，点击【确认】后重新加载。"), window.location.reload()) : b.error && (window.alert("保存文稿时遇到问题，点击【确认】后重试。"), window.location.reload())
                            }).fail(function() {
                                db = !1,
                                    H = !0,
                                    fb = !1,
                                a && l.reset_file_public_changes(n.isPublic, i)
                            })
                        },
                        i = (new Date).toISOString();
                    a ? v.updateLocalNoteAction(n.currentId,
                        function(a) {
                            n.currentVersionId < a.version_id || (void 0 !== n.mergeServerNoteAction && (a.action = "merge"), null === a.action && (a.action = "modify"), e && (a.title = e), a.details = d, 0 !== b.length && (a.tags = b), a.anchor_list = c, a.last_updated_date = i)
                        },
                        function(b) {
                            if (n.currentVersionId < b.version_id) Q === !0 && window.alert("当前文稿在别处已被同步，点击【确认】后重新从本地加载。"),
                                n.currentVersionId = b.version_id,
                                n.isPublic = b.public,
                                N(d, b.details),
                                f(b.anchor_list),
                                L = !0,
                                B.refreshPreview();
                            else if ("offline" !== b.action) J = !1,
                                h(b);
                            else {

                            }
                        },
                        h) : h()
                } else fb = !1,
                    n.isUrlMode === !0 ? ('') : ('')
            },
            T = _.debounce(S, 1e3),
            U = function() {
                $(".flow-diagram, .sequence-diagram").each(function() {
                    var a = $(this).children("svg").remove();
                    $(this).append(a)
                })
            },
            V = !0;
        A.hooks.chain("postConversion",
            function(b) {
                var c = null,
                    d = null,
                    e = g(b);
                a && (c = e.anchorIdsContainer.join(" ")),
                e.overwrite === !0 && z.empty(),
                    d = e.wmdPreviewDiffResults;
                var f = 0;
                for (var h in d) {
                    var i = d[h],
                        j = i.index + f;
                    if ("add" === i.action) 0 === j ? (z.prepend(i.wmdPreviewChildNode), i.anchorId && z.children()[0].setAttribute("data-anchor-id", i.anchorId)) : ($(z.children()[j - 1]).after(i.wmdPreviewChildNode), i.anchorId && z.children()[j].setAttribute("data-anchor-id", i.anchorId)),
                        f++;
                    else if ("delete" === i.action) {
                        var k = $(z.children()[j]);
                        k.remove(),
                        (k.hasClass("flow-diagram") || k.hasClass("sequence-diagram")) && U(),
                            f--
                    } else if ("update" === i.action) {
                        var l = $(z.children()[j]);
                        if ((l.hasClass("flow-diagram") || l.hasClass("sequence-diagram")) && 1 === l.children("svg").length) {
                            var m = !1,
                                n = $(i.wmdPreviewChildNode);
                            n.hasClass("flow-diagram") || n.hasClass("sequence-diagram") ? 0 === n.children("svg").length && (m = !0) : m = !0,
                            m === !0 && U()
                        }
                        l.replaceWith(i.wmdPreviewChildNode),
                        i.anchorId && z.children()[j].setAttribute("data-anchor-id", i.anchorId)
                    }
                }
                return V === !0 ? (V = !1, S(K, c)) : L === !0 ? (L = !1, S(K, c)) : T(K, c),
                    ""
            });
        var W = function(a, b) {
                if ("flow" !== b && "seq" !== b) return "";
                var c = document.getElementById("uml-X-x-X-diagram");
                try {
                    var d = null;
                    "flow" === b ? (d = flowchart.parse(a), d.drawSVG("uml-X-x-X-diagram", {
                        "line-width": 2,
                        "line-length": 50,
                        "text-margin": 10,
                        "font-size": 15,
                        "yes-text": "yes",
                        "no-text": "no",
                        "arrow-end": "block"
                    })) : (d = Diagram.parse(a), d.drawSVG("uml-X-x-X-diagram", {
                        theme: "simple"
                    }));
                    var e = c.innerHTML;
                    c.innerHTML = "";
                    var f = $("<div>" + e + "</div>"),
                        g = f.children("svg").children("defs");
                    if (0 !== g.length) {
                        var h = g.children("path#raphael-marker-block");
                        0 === h.length && g.prepend('<path stroke-linecap="round" d="M5,0 0,2.5 5,5z" id="raphael-marker-block" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>'),
                            "flow" === b ? 0 === g.children("marker#raphael-marker-endblock33").length && g.append('<marker id="raphael-marker-endblock33" markerHeight="3" markerWidth="3" orient="auto" refX="1.5" refY="1.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#raphael-marker-block" transform="rotate(180 1.5 1.5) scale(0.6,0.6)" stroke-width="1.6667" fill="black" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></use></marker>') : (0 === g.children("marker#raphael-marker-endblock55").length && g.append('<marker id="raphael-marker-endblock55" markerHeight="5" markerWidth="5" orient="auto" refX="2.5" refY="2.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#raphael-marker-block" transform="rotate(180 2.5 2.5) scale(1,1)" stroke-width="1.0000" fill="#000" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></use></marker>'), 0 === g.children("marker#raphael-marker-endblock77").length && g.append('<path stroke-linecap="round" d="M6,1 1,3.5 6,6" id="raphael-marker-open" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><marker id="raphael-marker-endopen77" markerHeight="7" markerWidth="7" orient="auto" refX="4" refY="3.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#raphael-marker-open" transform="rotate(180 3.5 3.5) scale(1,1)" stroke-width="1.0000" fill="none" stroke="#000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></use></marker>'))
                    }
                    return f.html()
                } catch(i) {
                    return c.innerHTML = "",
                        ""
                }
            },
            X = !0;
        B.hooks.chain("onPreviewRefresh",
            function() {
                function b() {++c === d && (p(null), k.onPreviewFinished(), a && n.isEditablePage === !0 && J === !1 && t.populateNoteRemarks(), o.closeArticleLoadingAlert())
                }
                $("div.sequence-diagram:not(:has(>svg))").each(function() {
                    var a = W(this.textContent, "seq");
                    "" !== a && (this.innerHTML = a)
                }),
                    $("div.flow-diagram:not(:has(>svg))").each(function() {
                        var a = W(this.textContent, "flow");
                        "" !== a && (this.innerHTML = a)
                    }),
                    s.renderToc(),
                    $(".prettyprint").each(function() {
                        $(this).addClass("linenums")
                    }),
                    prettyPrint(),
                    $('#wmd-preview a:not([href^="#"])').each(function() {
                        $(this).attr("target", "_blank")
                    }),
                X === !0 && (X = !1, k.onPreviewFinished());
                var c = 0,
                    d = 2;
                o.openArticleLoadingAlert(a),
                    z.waitForImages(b),
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "wmd-preview"]),
                    MathJax.Hub.Queue(b)
            });
        var Y = null,
            Z = null,
            ab = null;
        B.hooks.set("insertLinkDialog",
            function(a) {
                return h("链接", "请输入链接地址", "icon-link icon-2x", 'http://example.com/ "可选标题"'),
                    bb = a,
                    !0
            });
        var bb = null;
        B.hooks.set("insertImageDialog",
            function(a) {
                var b = function() {
                    var a = $("#wmd-image-button").data("droppedFile");
                    a && $("#wmd-image-button").data("droppedFile", null);
                    var b = $("#notification-popup-window .modal-body");
                };
                return h("图片", "请输入图片地址", "icon-picture icon-2x", 'http://example.com/images/diagram.jpg "可选标题"', b),
                    bb = a,
                    !0
            });
        var cb = function() {
                $("#wmd-bold-button > span").addClass("icon-bold muted"),
                    $("#wmd-italic-button > span").addClass("icon-italic muted"),
                    $("#wmd-link-button > span").addClass("icon-link muted"),
                    $("#wmd-quote-button > span").addClass("icon-quote-left muted"),
                    $("#wmd-code-button > span").addClass("icon-code muted"),
                    $("#wmd-image-button > span").addClass("icon-picture muted").addClass("paid-user-color"),
                    $("#wmd-olist-button > span").addClass("icon-list-ol muted"),
                    $("#wmd-ulist-button > span").addClass("icon-list-ul muted"),
                    $("#wmd-heading-button > span").addClass("icon-list-alt muted"),
                    $("#wmd-hr-button > span").addClass("icon-minus muted"),
                    $("#wmd-undo-button > span").addClass("icon-reply muted"),
                    $("#wmd-redo-button > span").addClass("icon-share-alt muted"),
                    $("#wmd-bold-button").before('<li class="wmd-spacer"></li>'),
                    $("#wmd-redo-button").after('')
            },
            db = !1,
            eb = function(a) {
                var b = j.getValue();
                if (a === b) return void window.alert("此历史版本和当前文稿没有差别。");
                var c = m(a, b, !1),
                    d = !1;
                x("当前文稿和历史版本的差别", '请查看当前文稿和历史版本的差别，<span class="insert">绿色高亮</span>代表当前文稿独有的内容，<span class="delete">红色高亮</span>代表历史版本独有的内容，其余为共有内容，点击<strong>【恢复到这个版本】</strong>使用历史版本替换当前文稿（去除绿色部分，保留红色部分）， 或者点击<strong>【取消】</strong>继续使用当前文稿。<br><br>' + c.html(),
                    function() {
                        d = !0,
                            $("#notification-popup-window").modal("hide"),
                            db = !0,
                            N(b, a),
                            L = !0,
                            B.refreshPreview()
                    },
                    function() {
                        d = !0,
                            N(b, b),
                            L = !0,
                            B.refreshPreview()
                    },
                    function() {
                        $("#notification-popup-window #notification-confirm").html("恢复到这个版本"),
                            $("#notification-popup-window #notification-cancel").html("取消"),
                            $("#notification-popup-window button.close").hide();
                        var a = $("#notification-popup-window");
                        a.css("width", "800px").css("left", ($(window).width() - 800) / 2 + "px").css("margin-left", "0px");
                        var b = 600,
                            d = 400;
                        $(window).height() <= 720 && (a.css("top", "0px"), b = $(window).height(), d = b - 250),
                            $("#notification-popup-window .modal-body").css("max-height", b + "px"),
                            c.init("当前文稿", "历史版本", d)
                    },
                    function() {
                        $("#notification-popup-window").removeAttr("style"),
                            $("#notification-popup-window .modal-body").removeAttr("style"),
                            $("#notification-popup-window button.close").show(),
                        d === !1 && (N(b, b), L = !0, B.refreshPreview()),
                            j.focus()
                    })
            },
            fb = !1,
            gb = function(a) {
                j.initValue(a);
                var b = null,
                    c = function(a) {
                        var c = _.debounce(function() {
                                var b = a();
                                b === !1 && (fb = !1)
                            },
                            500);
                        return function() {
                            null === b ? (a(), b = "") : (n.isEditablePage === !0 && (fb = !0), c())
                        }
                    };
                window.lightMode ? (B.run(c), B.undoManager.reinit(a, 0, 0, 0)) : B.run(j.getEditor(), c),
                    cb()
            };
        return {
            initEditor: gb,
            markdownEditor: B,
            setRefreshFromLocalAlertFalse: function() {
                Q = !1
            },
            setForceToRefreshPreviewTrue: function() {
                L = !0
            },
            isSavingInProgress: function() {
                return fb
            },
            setSavingInProgressFalse: function() {
                fb = !1
            },
            diffRevision: eb
        }
    },
    $(function() {
        var a = com.zybuluo.mdeditor.unifiedEditor,
            b = com.zybuluo.mdeditor.init(!0),
            c = com.zybuluo.mdeditor.common.getCurrentMode,
            d = com.zybuluo.mdeditor.scrollLink,
            e = com.zybuluo.mdeditor.fileManager,
            f = com.zybuluo.mdeditor.initData,
            g = com.zybuluo.mdeditor.mode,
            h = com.zybuluo.mdeditor.common.buttonBinding,
            i = com.zybuluo.mdeditor.common.initialHiddenSideToolBar,
            j = g.initialHiddenTopToolBar,
            k = g.exchangeEditorPreview,
            l = com.zybuluo.mdeditor.common.resetMaxHeightOfFileList,
            m = com.zybuluo.mdeditor.sideRemark,
            n = com.zybuluo.common.loginUser,
            o = com.zybuluo.common.popupConfirm.isShown,
            p = com.zybuluo.common.popupConfirm.popup,
            q = com.zybuluo.mdeditor.syncUserNotes,
            r = com.zybuluo.mdeditor.common.populateFileList,
            s = com.zybuluo.mdeditor.common.openUrlOnline,
            t = function(a, b) {
                if (a.children().length > 0) {
                    a.removeClass("editor-reader-hidden");
                    var c = b.position().top + 30;
                    a.css("margin-top", c);
                    var d = $(window).height() - c - 65;
                    a.css("max-height", d)
                }
            },
            u = function() {
                var a = $.localStorage("customized-style");
                return a || (a = {
                    inputFontSize: "16",
                    inputEditorFont: "",
                    inputPreviewFont: "",
                    textCustomizedCss: "h1 {\n    color: #0077bb; /* 将标题改为蓝色 */\n}"
                }),
                    a
            },
            v = function(a) {
                var b = "";
                if ("16" !== a.inputFontSize) {
                    var c = Math.round(1.6875 * a.inputFontSize);
                    b = "font-size: " + a.inputFontSize + "px !important;line-height: " + c + "px !important;"
                }
                var d = "";
                "" !== a.inputEditorFont && (d = "font-family: " + a.inputEditorFont + " !important;");
                var e = "";
                "" !== a.inputPreviewFont && (e = "font-family: " + a.inputPreviewFont + " !important;");
                var f = "";
                b + d !== "" && (f = f + ".wmd-input, .wmd-input:focus, #md-section-helper {" + (b + d) + "}\n"),
                b + e !== "" && (f = f + "#wmd-preview {" + (b + e) + "}"),
                    $("#customized-font-css").text(f),
                    $("#customized-style-css").text(a.textCustomizedCss.replace(/(^|\})([\s\S]+?)\{/g,
                        function(a, b, c) {
                            c = c.replace(/[\n]+/g, "");
                            var d = [],
                                e = c.split(",");
                            for (var f in e)"" !== e[f] && d.push("#wmd-preview " + e[f]);
                            return b + "\n" + d.join(", ") + " {"
                        }))
            },
            w = function() {
                function r() {
                    null === K ? K = new Date: (I(!1), K = new Date),
                        setTimeout(r, J)
                }
                function w() {
                    L === !0 ? L = !1 : o() === !1 && window.applicationCache.update(),
                        setTimeout(w, 96e4)
                }
                function x() {
                    e.switchPublishButton(f.isPublic),
                        $(window).unbind("resize"),
                        $(window).resize(Z),
                        $(window).resize(),
                        a.focus()
                }
                function y() {
                    Y();
                    var b = $(window).height() - $(".preview-container").position().top - 20;
                    a.getWmdInput().height(b),
                    window.lightMode || a.getEditor().resize(),
                        $(".preview-container").height(b),
                        $("#wmd-preview").height("auto"),
                        $(".in-page-preview-buttons").css("margin-left", $("#preview-column").width() - 235),
                        window.lightMode ? $(".in-page-editor-buttons").css("margin-left", $("#editor-column").width() - 170) : $(".in-page-editor-buttons").css("margin-left", $("#editor-column").width() - 200),
                        l(),
                        t($("#revision-list"), $("#info-revision-label")),
                        t($("#latest-notes-list"), $("#latest-notes-label"))
                }
                h(".wmd-button > span", "#F9F9F5", "#BBBBBB"),
                    h(".preview-button > span", "#F9F9F5", "#BBBBBB"),
                    $("a#signup, a#login").on("click",
                        function(b) {
                            b.preventDefault();
                            var c = $(this).attr("href");
                            a.warningToSaveBeforeLogin(function() {
                                s(c)
                            })
                        }),
                    $("#mdeditor-logout-submenu").on("click",
                        function() {
                            var a = function() {
                                n.clear(function() {
                                    $.removeCookie("auth_tkt"),
                                        $.removeCookie("auth_tkt", {
                                            domain: "." + window.location.hostname
                                        }),
                                        $.removeCookie("auth_tkt", {
                                            domain: "zybuluo.com"
                                        }),
                                        $.removeCookie("auth_tkt", {
                                            domain: ".zybuluo.com"
                                        }),
                                        $.removeCookie("auth_tkt", {
                                            domain: "www.zybuluo.com"
                                        }),
                                        $.removeCookie("auth_tkt", {
                                            domain: ".www.zybuluo.com"
                                        }),
                                        window.location.reload()
                                })
                            };
                            b.isSavingInProgress() ? p("警告！", "正在保存文稿，离开当前文稿可能会丢失内容，确定立即离开？",
                                function() {
                                    b.setSavingInProgressFalse(),
                                        a()
                                }) : a()
                        }),
                    $("#mdeditor-user-settings-submenu, #user-settings-resend, #user-settings-update-email").on("click",
                        function(a) {
                            a.preventDefault(),
                                s($(this).attr("href"))
                        }),
                window.lightMode || $("#wmd-search-replace-button").on("click",
                    function() {
                        a.searchEditor(!0)
                    }),
                    $("#wmd-help-button").on("click",
                        function() {
                            window.open(f.markdownHelpUrl)
                        });
                var z = function() {
                    j.hideToolBar(),
                        j.isHidden() ? ($("#wmd-hidden-menu-button span").removeClass("icon-chevron-sign-up").addClass("icon-chevron-sign-down"), $("#wmd-hidden-menu-button").attr("title", "显示工具栏")) : ($("#wmd-hidden-menu-button span").removeClass("icon-chevron-sign-down").addClass("icon-chevron-sign-up"), $("#wmd-hidden-menu-button").attr("title", "隐藏工具栏")),
                        $(window).resize()
                };
                $("#wmd-hidden-menu-button").on("click", z),
                    k.loadDefault(),
                    $("#editor-reader-exchange-button").on("click",
                        function() {
                            k.exchange()
                        });
                var B = function(a) {
                        $.get(f.noteRevisionUrl + a, {},
                            function(a) {
                                a.success ? b.diffRevision(a.details) : a.error && window.alert("加载历史版本时发生错误。")
                            },
                            "json").fail(function() {
                                window.alert("无法加载历史版本。")
                            })
                    },
                    C = {
                        autosave: "自动保存",
                        publish: "发布版本",
                        republish: "发布更新",
                        restore: "恢复版本",
                        sync: "同步版本",
                        manual: "手动保存"
                    },
                    D = $("#revision-list"),
                    E = $("#info-revision-label");
                $("#preview-info-button").on("show",
                    function() {
                        com.zybuluo.mdeditor.common.caculateAndFillPreviewCharacters(),
                            D.children(".revision-item").remove(),
                            E.text("历史版本：正在加载中..."),
                            $.get(f.noteRevisionsUrl, {},
                                function(a) {
                                    if (a.userNoteRevisionUIs) {
                                        var b = a.user_tier,
                                            c = JSON.parse(a.userNoteRevisionUIs);
                                        E.text("历史版本：" + c.length + " 个");
                                        var d = $(".revision-item-template.editor-reader-hidden .revision-item");
                                        for (var e in c) {
                                            var f = c[e],
                                                g = d.clone();
                                            g.attr("file-created-date", new Date(f.created_date).format("Y-m-d H:i"));
                                            var h = g.children("a");
                                            h.attr("id", f.rand_id);
                                            var i = h.children(".revision-reason").text(C[f.reason]),
                                                j = h.children(".revision-time-diff").attr("created_time_diff", f.created_time_diff + "前").text(f.created_time_diff + "前"); ("publish" === f.reason || "republish" === f.reason) && (i.addClass("yellow-on-black"), j.addClass("yellow-on-black")),
                                                D.append(g),
                                            e >= 2 && h.addClass("paid-user-color")
                                        }
                                        D.children(".revision-item").on("mouseenter",
                                            function() {
                                                var a = $(this),
                                                    b = a.find(".revision-time-diff");
                                                b.text(a.attr("file-created-date"))
                                            }).on("mouseleave",
                                            function() {
                                                var a = $(this),
                                                    b = a.find(".revision-time-diff");
                                                b.text(b.attr("created_time_diff"))
                                            }),
                                            D.children(".revision-item").children("a").on("click",
                                                function(a) {
                                                    a.preventDefault();
                                                    var c = $(this);
                                                    c.hasClass("paid-user-color") ? b ? B(c.attr("id")) : window.open(com.zybuluo.mdeditor.initData.paymentUrl) : B(c.attr("id"))
                                                }),
                                            t(D, E)
                                    } else a.error && E.text("历史版本：加载错误")
                                },
                                "json").fail(function() {
                                    E.text("历史版本：无法加载")
                                })
                    }).on("hide",
                    function() {
                        E.text("历史版本："),
                            D.children(".revision-item").remove(),
                            D.addClass("editor-reader-hidden")
                    });
                var F = $("#latest-notes-list"),
                    G = $("#latest-notes-label");
                $("#preview-file-button").on("show",
                    function() {
                        n.get(function(a) {
                            if (null !== a) {
                                F.children(".latest-note").remove(),
                                    G.text("最近使用：加载中...");
                                var b = [];
                                q.exportAllLocalNotes(a,
                                    function(a) {
                                        b.push({
                                            last_updated_date: a.last_updated_date,
                                            local_note_id: a.local_note_id,
                                            title: a.title,
                                            local_file_path: a.local_file_path
                                        })
                                    },
                                    function() {
                                        b.sort(function(a, b) {
                                            return a.last_updated_date < b.last_updated_date ? 1 : a.last_updated_date > b.last_updated_date ? -1 : 0
                                        }),
                                            b = b.slice(0, 15);
                                        for (var a in b) {
                                            var c = b[a],
                                                d = $('<li class="latest-note"> <a note-id="" tabindex="-1" title=""> <span class="note-title"></span> </a> </li>'),
                                                e = d.children("a");
                                            e.attr("note-id", c.local_note_id),
                                                c.local_file_path ? e.attr("title", c.local_file_path) : e.attr("title", c.title);
                                            var f = e.children(".note-title");
                                            f.text(c.title.length > 12 ? c.title.substring(0, 12) + "...": c.title),
                                                F.append(d)
                                        }
                                        G.text("最近使用：" + b.length + " 个"),
                                            F.children(".latest-note").children("a").on("click",
                                                function(a) {
                                                    a.preventDefault();
                                                    var b = Number($(this).attr("note-id"));
                                                    com.zybuluo.mdeditor.common.reloadCurrentId(b)
                                                }),
                                            t(F, G)
                                    },
                                    function() {
                                        G.text("最近使用：加载出错")
                                    })
                            }
                        })
                    }).on("hide",
                    function() {
                        G.text("最近使用"),
                            F.children(".latest-note").remove(),
                            F.addClass("editor-reader-hidden")
                    }),
                    $("ul#file-list").on("click", "li a",
                        function(a) {
                            a.preventDefault();
                            var b = $.localStorage("currentId"),
                                c = $(this).find("span"),
                                d = Number(c.attr("id"));
                            n.get(function(a) {
                                null !== a && d !== b && com.zybuluo.mdeditor.common.reloadCurrentId(d)
                            })
                        }),
                    $(".preview-new-submenu").each(function() {
                        $(this).on("click",
                            function() {
                                e.newFile()
                            })
                    }),
                    $("#new-offline-file-submenu").on("click",
                        function() {
                            e.newFile(!0)
                        }),
                    $("#open-file-submenu").on("click",
                        function() {
                            e.openLocalFile()
                        }),
                    $("#preview-delete-submenu").on("click",
                        function() {
                            e.deleteFile()
                        }),
                    $("#preview-revision-submenu").on("click",
                        function() {
                            e.saveRevision()
                        });
                var H = document.getElementById("wmd-panel-editor");
                H.addEventListener("dragover",
                    function(a) {
                        a.stopPropagation(),
                            a.preventDefault(),
                            a.dataTransfer.dropEffect = "copy"
                    },
                    !1),
                    H.addEventListener("drop",
                        function(a) {
                            a.stopPropagation(),
                                a.preventDefault();
                            var b = a.dataTransfer.files,
                                c = b[0];
                            if (c) {
                                var d = new FileReader;
                                d.onload = function(a) {
                                    return function(b) {
                                        var c = b.target.result;
                                        if (!a.type.match("text.*") && ("" !== a.type || c.match(/\uFFFD/))) return void $("#wmd-image-button").data("droppedFile", a).click();
                                        var d = window.confirm("以新文稿方式加载【" + a.name + "】 请选【确认】，以当前文稿的附件形式上传文件请选【取消】。");
                                        d ? e.openLocalFile(a) : $("#wmd-image-button").data("droppedFile", a).click()
                                    }
                                } (c);
                                var f = c.slice(0, 102400);
                                d.readAsText(f)
                            }
                        },
                        !1),
                    $(H).pasteImageReader(function(a) {
                        $("#wmd-image-button").data("droppedFile", a).click()
                    });
                var I = function(c) {
                    o() !== !0 && n.get(function(d) {
                        if (null === d) {
                            if (c) return void a.warningToSaveBeforeLogin(function() {
                                s(f.loginComeFromUrl, "此功能需要登录，离线状态下无法登录，请连接网络后重试。")
                            })
                        } else b.setRefreshFromLocalAlertFalse(),
                            b.setForceToRefreshPreviewTrue(),
                            b.markdownEditor.refreshPreview(),
                            A(d, f.currentId)
                    })
                };
                $("#sync-now-submenu").on("click",
                    function() {
                        I(!0)
                    });
                var J = 18e5;
                $("#sync-thirty-submenu > span").addClass("yellow-on-black"),
                    $("#sync-thirty-submenu").on("mouseenter",
                        function() {
                            var a = Math.floor((J - (new Date - K)) / 1e3);
                            $(this).parent().attr("title", "距离下次自动同步时间 " + a + " 秒")
                        });
                var K = null;
                r();
                var L = !0;
                window.applicationCache && n.get(function(a) {
                    null !== a && w()
                }),
                    window.desktopGui ? ($("#about-menu").append('<li><a tabindex="-1" href="https://www.zybuluo.com/cmd" target="_blank">客户端版本 v' + window.desktopGui.App.manifest.version + "</a></li>"), win.removeAllListeners("close"), win.on("close",
                        function() {
                            var a = function() {
                                win.hide(),
                                    console.log("Cmd Markdown is going to be closed immediately."),
                                    win.close(!0)
                            };
                            b.isSavingInProgress() ? p("警告！", "正在保存文稿，离开当前文稿可能会丢失内容，确定立即离开？", a) : a()
                        }), window.addEventListener("beforeunload",
                        function() {
                            var a = e.fileWatcher;
                            a.stop()
                        },
                        !1)) : $("#about-menu").append('<li><a tabindex="-1" href="https://www.zybuluo.com/cmd" target="_blank">Web 端版本</a></li>'),
                    $("#reload-current-usernote-submenu").on("click",
                        function() {
                            n.get(function(a) {
                                null !== a && com.zybuluo.mdeditor.common.reloadCurrentId(f.currentId)
                            })
                        }),
                    $("#download-markdown-submenu").on("click",
                        function() {
                            e.downloadFile("markdown", a.getValue())
                        }),
                    $("#download-html-submenu").on("click",
                        function() {
                            e.downloadFile("html", null)
                        }),
                    $("#download-all-submenu").on("click",
                        function() {
                            e.downloadFile("markdowns", null)
                        }),
                    $("#download-template-html-submenu").on("click",
                        function() {
                            e.downloadFile("template-html", null)
                        }),
                    $("#download-pdf-submenu").on("click",
                        function() {
                            e.downloadFile("pdf", null)
                        }),
                    $("#upload-yinxiang-submenu").on("click",
                        function() {
                            e.uploadFile("yinxiang")
                        }),
                    $("#upload-evernote-submenu").on("click",
                        function() {
                            e.uploadFile("evernote")
                        }),
                    $("#preview-publish-button").on("click", e.publishFile),
                    $(".publish-updated-submenu").each(function() {
                        $(this).on("click",
                            function(a) {
                                a.preventDefault(),
                                    e.republishFile()
                            })
                    }),
                    $(".fixed-link-submenu").each(function() {
                        $(this).on("click",
                            function(a) {
                                a.preventDefault(),
                                    window.open(f.userNoteUrl)
                            })
                    }),
                    $("#remove-password-submenu").on("click",
                        function(a) {
                            a.preventDefault(),
                                e.removePassword()
                        }),
                    $("#revert-publish-submenu").on("click",
                        function(a) {
                            a.preventDefault(),
                                e.publishedFile()
                        }),
                    e.switchPublishButton(f.isPublic),
                    com.zybuluo.mdeditor.common.loadSiteTheme(a);
                var M = com.zybuluo.mdeditor.common.switchSiteTheme;
                if ($("#preview-theme-button").on("click",
                        function() {
                            M(a)
                        }), $("#customized-style-submenu").on("click",
                        function() {
                            p("自定义页面样式", "",
                                function() {
                                    var a = $("#notification-popup-window"),
                                        b = a.find("#inputFontSize").val(); ("" === b || isNaN(b) === !0) && (b = "16");
                                    var c = a.find("#inputEditorFont").val(),
                                        d = a.find("#inputPreviewFont").val(),
                                        e = a.find("#textCustomizedCss").val();
                                    "" === e && (e = "h1 {\n    color: #0077bb; /* 将标题改为蓝色 */\n}");
                                    var f = {
                                        inputFontSize: b,
                                        inputEditorFont: c,
                                        inputPreviewFont: d,
                                        textCustomizedCss: e
                                    };
                                    $.localStorage("customized-style", f),
                                        v(f),
                                        a.modal("hide")
                                },
                                function() {},
                                function() {
                                    var a = $("#notification-popup-window .modal-body"),
                                        b = '<div class="control-group"> <label class="control-label" for="${id}"><strong>${label}</strong></label> <div class="controls"> <input type="text" id="${id}" ${anyAttribute}> <span class="help-block" style="font-size: 12px; margin-top: 5px;">${help}</span> </div> </div>',
                                        c = b.replace(/\$\{id\}/g, "inputFontSize").replace("${label}", "字号大小").replace("${anyAttribute}", 'value="16"').replace("${help}", ""),
                                        d = b.replace(/\$\{id\}/g, "inputEditorFont").replace("${label}", "编辑区字体").replace("${anyAttribute}", 'placeholder="默认字体"').replace("${help}", '示例：Consolas, 微软雅黑 <br> 编辑区请使用<a href="https://zh.wikipedia.org/zh/%E7%AD%89%E5%AE%BD%E5%AD%97%E4%BD%93" target="_blank">等宽字体</a>，否则会引起光标错位。'),
                                        e = b.replace(/\$\{id\}/g, "inputPreviewFont").replace("${label}", "预览区字体").replace("${anyAttribute}", 'placeholder="默认字体"').replace("${help}", "示例：Consolas, 微软雅黑"),
                                        f = '<div class="control-group"> <label class="control-label" for="textCustomizedCss"><strong>自定义 CSS</strong></label> <div class="controls"> <textarea id="textCustomizedCss" spellcheck="false" style="width:280px; height:110px";></textarea> <span class="help-block" style="font-size: 12px; margin-top: 5px;">CSS 可用于改变预览区的默认样式，查看<a href="https://zh.wikipedia.org/wiki/%E5%B1%82%E5%8F%A0%E6%A0%B7%E5%BC%8F%E8%A1%A8" target="_blank">语法简介</a></span> </div> </div>';
                                    a.append('<form class="form-horizontal">' + c + d + e + f + "</form>");
                                    var g = u(),
                                        h = $("#notification-popup-window");
                                    h.find("#inputFontSize").val(g.inputFontSize),
                                        h.find("#inputEditorFont").val(g.inputEditorFont),
                                        h.find("#inputPreviewFont").val(g.inputPreviewFont),
                                        h.find("#textCustomizedCss").val(g.textCustomizedCss)
                                },
                                function() {
                                    a.focus()
                                })
                        }), !window.lightMode) {
                    var N = $("#mode-normal-submenu > span"),
                        O = $("#mode-vim-submenu > span"),
                        P = $("#mode-emacs-submenu > span"),
                        Q = function(b) {
                            a.applyMode(b),
                                N.removeClass("blue-on-black"),
                                O.removeClass("blue-on-black"),
                                P.removeClass("blue-on-black"),
                                "vim" === b ? O.addClass("blue-on-black") : "emacs" === b ? P.addClass("blue-on-black") : N.addClass("blue-on-black"),
                                $.localStorage("editorMode", b)
                        };
                    $("#mode-normal-submenu").on("click",
                        function() {
                            Q("")
                        }),
                        $("#mode-vim-submenu").on("click",
                            function() {
                                Q("vim")
                            }),
                        $("#mode-emacs-submenu").on("click",
                            function() {
                                Q("emacs")
                            });
                    var R = $.localStorage("editorMode");
                    R || (R = ""),
                        Q(R);
                    var S = $("#show-line-number-submenu > span"),
                        T = function(b) {
                            a.showLineNumber(b),
                                b ? S.addClass("blue-on-black") : S.removeClass("blue-on-black"),
                                $.localStorage("showLineNumber", b)
                        };
                    $("#show-line-number-submenu").on("click",
                        function() {
                            T(S.hasClass("blue-on-black") ? !1 : !0)
                        });
                    var U = $.localStorage("showLineNumber");
                    U || (U = !1),
                        T(U)
                }
                com.zybuluo.mdeditor.common.bindingFullScreenApi("#preview-fullscreen-button"),
                    window.addEventListener("beforeunload",
                        function(a) {
                            if (b.isSavingInProgress()) {
                                var c = "正在保存文稿，离开当前文稿可能会丢失内容，确定立即离开？";
                                return (a || window.event).returnValue = c,
                                    c
                            }
                        }),
                    window.addEventListener("unload",
                        function() {
                            b.setSavingInProgressFalse()
                        });
                var V = com.zybuluo.common.browserType,
                    W = "keydown"; (V.isOpera || V.isFirefox) && (W = "keypress"),
                    $(document).on(W,
                        function(b) {
                            if ((b.ctrlKey || b.metaKey) && !b.shiftKey) {
                                var d = c(),
                                    h = b.charCode || b.keyCode,
                                    j = String.fromCharCode(h).toLowerCase();
                                switch (j) {
                                    case "q":
                                        if (window.isMacDesktopApp === !0 && !b.altKey && !b.ctrlKey && b.metaKey) {
                                            window.desktopGui.Window.get().close();
                                            break
                                        }
                                        return;
                                    case "s":
                                        if (!b.altKey) break;
                                        return;
                                    case "m":
                                        if (b.altKey) {
                                            if (d.isEditorReader) {
                                                g.switchFullReaderMode();
                                                break
                                            }
                                            if (d.isFullReader) {
                                                g.switchNormalModeFromFullReaderMode(x);
                                                break
                                            }
                                            if (d.isFullEditor) {
                                                g.switchNormalModeFromFullEditorMode(x),
                                                    g.switchFullReaderMode();
                                                break
                                            }
                                        } else {
                                            if (d.isEditorReader) {
                                                g.switchFullEditorMode();
                                                break
                                            }
                                            if (d.isFullEditor) {
                                                g.switchNormalModeFromFullEditorMode(x);
                                                break
                                            }
                                            if (d.isFullReader) {
                                                g.switchNormalModeFromFullReaderMode(x),
                                                    g.switchFullEditorMode();
                                                break
                                            }
                                        }
                                        return;
                                    case "y":
                                        if (b.altKey) {
                                            M(a);
                                            break
                                        }
                                        return;
                                    case "h":
                                        if (b.altKey) {
                                            window.open(f.markdownHelpUrl);
                                            break
                                        }
                                        return;
                                    case "n":
                                        if (b.altKey && d.isEditorReader) {
                                            e.newFile();
                                            break
                                        }
                                        return;
                                    case "d":
                                        if (b.altKey && d.isEditorReader) {
                                            e.deleteFile();
                                            break
                                        }
                                        return;
                                    case "p":
                                        if (b.altKey && d.isEditorReader) {
                                            if (f.isPublic) {
                                                e.republishFile();
                                                break
                                            }
                                            e.publishFile();
                                            break
                                        }
                                        return;
                                    case "f":
                                        if (b.altKey && !d.isFullEditor) {
                                            $("#preview-list-button > span").dropdown("toggle");
                                            break
                                        }
                                        return;
                                    case "o":
                                        if (b.altKey && !d.isFullEditor) {
                                            $("#preview-toc-button > span").dropdown("toggle");
                                            break
                                        }
                                        return;
                                    case "i":
                                        if (b.altKey) if (d.isEditorReader) $("#preview-info-button > span").dropdown("toggle");
                                        else if (d.isFullReader) {
                                            i.hideToolBar();
                                            break
                                        }
                                        return;
                                    case "u":
                                        if (b.altKey && !d.isFullReader) {
                                            z();
                                            break
                                        }
                                        return;
                                    case "x":
                                        if (b.altKey && d.isEditorReader) {
                                            k.exchange();
                                            break
                                        }
                                        return;
                                    case "r":
                                        if (b.altKey && d.isEditorReader) {
                                            $("#preview-settings-button > span").dropdown("toggle");
                                            break
                                        }
                                        return;
                                    default:
                                        return
                                }
                                b.preventDefault && b.preventDefault(),
                                window.event && (window.event.returnValue = !1)
                            }
                        });
                var X = com.zybuluo.mdeditor.mediumEditor,
                    Y = function() {
                        c().isEditorReader && (X.deselectText(), X.hideToolbarActions())
                    };
                $previewElt = $(".preview-container"),
                    $previewElt.scroll(Y);
                var Z = function() {
                    y(),
                        d.buildSections(),
                        m.relocateRemarkIcons()
                };
                $("#wmd-editor-full-button").on("click", g.switchFullEditorMode),
                    $("#wmd-editor-small-button").on("click",
                        function() {
                            g.switchNormalModeFromFullEditorMode(x)
                        }),
                    $("#preview-reader-full-button").on("click", g.switchFullReaderMode),
                    $("#preview-reader-small-button").on("click",
                        function() {
                            g.switchNormalModeFromFullReaderMode(x)
                        }),
                    $("#preview-reader-small-button").hide(),
                    $(window).resize(Z),
                    y()
            },
            x = function() {
                var b = 0,
                    c = a.getValue(),
                    d = c.indexOf("\n");
                b = -1 != d ? d: c.length;
                var e = a.getEditor();
                window.lightMode ? e.caret(b) : ( - 1 != d ? e.navigateLineEnd() : e.navigateFileEnd(), e.focus())
            },
            y = function() {
                window.desktopGui && $.get(f.cmdDesktopVersionUrl, {},
                    function(a) {
                        a.version && parseFloat(window.desktopGui.App.manifest.version) < parseFloat(a.version) && (com.zybuluo.mdeditor.common.setToastrOptions("toast-bottom-right", !0, "0", "0",
                            function() {
                                window.desktopGui.Shell.openExternal("https://www.zybuluo.com/cmd")
                            }), toastr.info("检测到主程序新版本 " + a.version + "，包含重要更新，点击此处下载。"))
                    },
                    "json").fail(function() {})
            },
            z = null,
            A = function(a, b, c) {
                q.syncServerNoteActions(a, b,
                    function() {
                        com.zybuluo.mdeditor.common.setToastrOptions("toast-bottom-right", !0, "0", "0", null),
                            void 0 === c ? z = toastr.info("正在同步本地文稿 ...") : $(z).children(".toast-message").html("正在同步本地文稿，剩余 " + c + " ...")
                    },
                    function(c, d) {
                        return c > 0 ? void A(a, b, c) : (toastr.clear(z), z = null, q.populateOfflineData(a, null,
                            function(a, c) {
                                r(b, c)
                            }), void setTimeout(function() {
                                d.length > 0 ? (com.zybuluo.mdeditor.common.setToastrOptions("toast-bottom-right", !0, "10000", "1000",
                                    function() {
                                        com.zybuluo.mdeditor.common.reloadCurrentId(d[0])
                                    }), toastr.success("同步已完成，其中 " + d.length + " 篇文稿需要合并版本，点击此处访问文稿并合并。")) : (com.zybuluo.mdeditor.common.setToastrOptions("toast-bottom-right", !1, "5000", "1000", null), toastr.success("本地文稿已同步至最新状态。"))
                            },
                            1500))
                    },
                    function(a, b) {
                        toastr.clear(z),
                            z = null,
                        a && setTimeout(function() {
                                com.zybuluo.mdeditor.common.setToastrOptions("toast-bottom-right", !0, "5000", "1000", null),
                                    b ? toastr.warning(a) : toastr.error(a)
                            },
                            1500)
                    })
            },
            B = function(a, d, e) {
                w(),
                    $(".in-page-editor-buttons.editor-reader-hidden").removeClass("editor-reader-hidden"),
                    $(".in-page-preview-buttons.editor-reader-hidden").removeClass("editor-reader-hidden"),
                    b.initEditor(e);
                var h = c();
                if (h.isFullEditor ? (g.switchFullEditorMode(), x()) : h.isFullReader ? g.switchFullReaderMode() : h.isHashMode || x(), f.isUrlMode === !0) {
                    var i = window.location.hash;
                    "" !== i && (window.location.href = i)
                }
                var j = u();
                v(j),
                a && (A(a, d), y())
            },
            C = com.zybuluo.indexedDB;
        C.openDatabase(function() {
            com.zybuluo.mdeditor.render(B)
        })
    });