//
//	作者：少司命
//	博客：www.shaosiming.net
//	联系QQ：997757557
//	时间：2019/09/08
//	说明：禁止商业使用收转售卖！
//	嘤嘤嘤：可以的话，希望给我一个友情链接！
//
"use strict";
var _extends = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
        }
        return t
    },
    _createClass = function () {
        function i(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function (t, e, n) {
            return e && i(t.prototype, e), n && i(t, n), t
        }
    }();

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
        return n
    }
    return Array.from(t)
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}
var Graphic = function () {
    function d() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
            e = t.parent,
            n = t.links,
            i = void 0 === n ? document.querySelectorAll("[data-sjslink]") : n,
            s = t.active,
            a = void 0 === s ? "is-active" : s,
            r = t.margin,
            o = void 0 === r ? 20 : r,
            l = t.responsive,
            u = void 0 === l ? {
                980: {
                    columns: 3
                },
                480: {
                    columns: 2
                },
                0: {
                    columns: 1
                }
            } : l,
            c = t.fadeDuration,
            h = void 0 === c ? {
                in: 300,
                out: 0
            } : c;
        _classCallCheck(this, d), this.parent = e, this.links = Array.from(i), this.active = a, this.margin = o, this.responsive = u, this.fadeDuration = h, this.elements = Array.from(this.parent.children), this.activeElements = this.elements, this.columns = 1, this.dataLink = "all", this.winWidth = window.innerWidth, this.init()
    }
    return _createClass(d, [{
        key: "orderelements",
        value: function () {
            var r = this,
                t = this.parent,
                e = this.activeElements,
                o = this.columns,
                l = this.blocWidth,
                u = (this.responsive, this.margin),
                n = e.reduce(function (t, e, n) {
                    var i = r._sumArrHeight(t, o),
                        s = n % o * (l + u),
                        a = 0 <= n - o ? i[n % o] + u * Math.floor(n / o) : 0;
                    return e.style.transform = "translate3d(" + s + "px, " + a + "px, 0)", t.push(e.offsetHeight), t
                }, []),
                i = this._sumArrHeight(n, o),
                s = Math.max.apply(Math, _toConsumableArray(i)) + u * (Math.floor(e.length / o) - 1);
            t.style.height = s + "px"
        }
    }, {
        key: "handleFilterClick",
        value: function (t, e) {
            var n = this;
            t.preventDefault();
            var i = this.links,
                s = this.active;
            e.dataset.sjslink !== this.dataLink && (this.dataLink = e.dataset.sjslink, i.forEach(function (t) {
                t.isEqualNode(e) ? t.classList.add(s) : t.classList.remove(s)
            }), this._filterElements(function () {
                n.orderelements()
            }))
        }
    }, {
        key: "resize",
        value: function () {
            var t = this;
            window.addEventListener("resize", function () {
                clearTimeout(window.GraphicResize), window.GraphicResize = setTimeout(function () {
                    t.winWidth = window.innerWidth, t._setBlocWidth(function () {
                        t.orderelements()
                    })
                }, 500)
            })
        }
    }, {
        key: "init",
        value: function () {
            var n = this,
                t = this.parent,
                e = this.links,
                i = this.active;
            e.forEach(function (e, t) {
                0 === t && (e.classList.add(i), n.dataLink = e.dataset.sjslink), e.addEventListener("click", function (t) {
                    n.handleFilterClick(t, e)
                })
            }), this._setBlocWidth(), window.addEventListener("load", function () {
                n._filterElements(function () {
                    n.orderelements()
                }), t.style.opacity = 1
            }), this.resize()
        }
    }, {
        key: "_setBlocWidth",
        value: function (t) {
            var e = this.parent,
                n = this.elements,
                i = this.margin,
                s = this.responsive,
                a = this.columns = this._columnsCount(s).columns,
                r = this.blocWidth = (e.clientWidth - i * (a - 1)) / a;
            n.forEach(function (t) {
                t.style.width = r + "px"
            }), t && t()
        }
    }, {
        key: "_filterElements",
        value: function (t) {
            var e = this,
                n = this.elements,
                i = this.dataLink,
                s = this.fadeDuration;
            this.activeElements = n.filter(function (t) {
                return "all" === i ? (e._fadeIn(t, s.in), !0) : t.dataset.sjsel !== i ? (e._fadeOut(t, s.out), !1) : (e._fadeIn(t, s.in), !0)
            }), t && t()
        }
    }, {
        key: "_sumArrHeight",
        value: function (t, s) {
            return t.reduce(function (t, e, n) {
                var i = n % s;
                return t[i] || (t[i] = 0), t[i] = t[i] + e, t
            }, [])
        }
    }, {
        key: "_columnsCount",
        value: function (t) {
            var n = this.winWidth;
            return Object.entries(t).reduce(function (t, e) {
                return n > e[0] && e[0] >= Math.max(t.width) ? {
                    width: e[0],
                    columns: e[1].columns
                } : t
            }, {
                width: 0,
                columns: 4
            })
        }
    }, {
        key: "_fadeIn",
        value: function (e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 300,
                n = arguments[2],
                i = parseFloat(window.getComputedStyle(e, null).getPropertyValue("opacity")),
                s = 16 / t;
            e.style.display = "block", requestAnimationFrame(function t() {
                (i += s) <= 1 ? (e.style.opacity = i, requestAnimationFrame(t)) : (e.style.opacity = 1, n && n())
            })
        }
    }, {
        key: "_fadeOut",
        value: function (e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 300,
                n = arguments[2],
                i = parseFloat(window.getComputedStyle(e, null).getPropertyValue("opacity")),
                s = t ? 16 / t : 1;
            requestAnimationFrame(function t() {
                0 <= (i -= s) ? (e.style.opacity = i, requestAnimationFrame(t)) : (e.style.opacity = 0, e.style.display = "none", n && n())
            })
        }
    }]), d
}();
HTMLElement.prototype.Graphicjs = HTMLElement.prototype.Graphicjs || function (t) {
    return new Graphic(_extends({
        parent: this
    }, t))
};

jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d)
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * (--t * (t - 2) - 1) + b
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c /
            2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
    },
    easeInSine: function (x,
        t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
    },
    easeInExpo: function (x, t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
    },
    easeOutExpo: function (x, t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * 0.3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * 2 *
            Math.PI / p)) + b
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * 0.3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * 2 * Math.PI / p) + c + b
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * 0.3 * 1.5;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -0.5 * a * Math.pow(2, 10 *
            (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p) * 0.5 + c + b
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * t * t * (((s *= 1.525) + 1) * t - s) + b;
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
    },
    easeInBounce: function (x, t, b, c, d) {
        return c -
            jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < 1 / 2.75) return c * 7.5625 * t * t + b;
        else if (t < 2 / 2.75) return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        else if (t < 2.5 / 2.75) return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        else return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
    }
});
(function ($) {
    var Tab = function (config) {
        this.config = $.extend({}, Tab.config, config);
        this.init()
    };
    Tab.config = {
        effect: "base",
        direction: "x",
        autoPlay: false,
        playTo: 0,
        type: "mouseover",
        curClass: "current",
        link: false,
        stay: 2E3,
        delay: 200,
        lazy: false,
        merge: false,
        degradation: "base",
        animateTime: 300,
        easing: "swing",
        radius: 20,
        oninit: function () {},
        onchange: function () {}
    };
    Tab.prototype = {
        init: function () {
            var self = this,
                c = self.config;
            c.target = $(c.target);
            if (c.target.length <= 1) return;
            self.target = $(c.target);
            self.length = c.target.length;
            self.effect = Tab.effect[c.effect];
            if (self.effect.onInitStart) {
                var result = self.effect.onInitStart.call(self);
                if (result) return result
            }
            self.wrap = c.target.eq(0).parent();
            if (/(:?ul|ol|dl)/i.test(self.wrap[0].tagName)) {
                self.content = self.wrap;
                self.wrap = self.wrap.parent()
            } else {
                c.target.wrapAll('<div class="tabContent">');
                self.content = c.target.eq(0).parent()
            }
            if (c.control !== false) {
                c.control = c.control || self.wrap.find(".control");
                c.control = $(c.control);
                if (c.control.length < 1) {
                    var ul = $('<ul class="control">')[0],
                        tocStr = "";
                    for (var i = 0; i < self.length; i++) tocStr += '<li><a href="#">' + (i + 1) + "</a></li>";
                    ul.innerHTML = tocStr;
                    ul = self.wrap[0].appendChild(ul);
                    c.control = $(ul).children()
                }
                $.each(c.control, function (i, elem) {
                    if ($(elem).hasClass("next")) self.nextBtn = elem;
                    else if ($(elem).hasClass("prev")) self.prevBtn = elem
                });
                self.control = c.control
            }
            if (c.nextBtn) self.nextBtn = $(c.nextBtn);
            if (c.prevBtn) self.prevBtn = $(c.prevBtn);
            c.oninit.call(self);
            if (self.effect) self.effect.oninit.call(self);
            self.playTo(c.playTo);
            if (c.autoPlay) self.play();
            self.attach()
        },
        attach: function () {
            var self = this,
                c = self.config;
            if (c.autoPlay) {
                var stopElems = [self.wrap],
                    ctrlBar = self.control && self.control[0].parentNode;
                if (ctrlBar) stopElems.push(ctrlBar);
                $.each(stopElems, function (i, elem) {
                    $(elem).bind("mouseover", function (e) {
                        self.stop()
                    });
                    $(elem).bind("mouseout", function (e) {
                        self.play()
                    })
                })
            }
            var needDelay = c.type == "mouseover";
            if (c.control) $.each(self.control, function (i, elem) {
                $(elem).bind(c.type, function () {
                    var delay = needDelay ? c.delay : 0;
                    if (self.delayTimer) window.clearTimeout(self.delayTimer);
                    self.delayTimer = window.setTimeout(function () {
                        self.playTo(i)
                    }, delay)
                });
                if (needDelay) {
                    $(elem).bind("mouseout", function () {
                        if (self.delayTimer) window.clearTimeout(self.delayTimer)
                    });
                    $(elem).bind("click", function () {
                        self.playTo(i)
                    })
                }
                if (!self.config.link) $(elem).bind("click", function (e) {
                    e.preventDefault()
                })
            });
            if (self.nextBtn) $(self.nextBtn).bind("click", function (e) {
                self.next();
                e.preventDefault()
            });
            if (self.prevBtn) $(self.prevBtn).bind("click", function (e) {
                self.prev();
                e.preventDefault()
            })
        },
        playTo: function (page) {
            var self =
                this,
                c = self.config,
                hasCur = self.curPage !== window.undefined,
                prevPage;
            if (self.running) return;
            self.running = true;
            window.setTimeout(function () {
                self.running = false
            }, 200);
            if (hasCur && self.curPage === page) return;
            self.prevPage = self.curPage;
            if ((c.effect == "slide" || c.effect == "slide3d") && c.merge) {
                prevPage = outBound(self.curPage);
                self.curPage = page;
                page = outBound(page)
            } else {
                prevPage = self.curPage;
                page = self.curPage = outBound(page)
            }
            if (self.control && page !== prevPage) {
                var curCtrl = self.control[page],
                    prevCtrl = self.control[prevPage];
                if (curCtrl) $(curCtrl).addClass(self.config.curClass);
                if (prevCtrl) $(prevCtrl).removeClass(self.config.curClass)
            }
            if (c.lazy) {
                var curTarget = self.target[self.curPage];
                if (curTarget && !curTarget.parsed) self._lazyload(curTarget)
            }
            self.config.onchange.call(self, page);
            if (self.effect) self.effect.onchange.call(self);

            function outBound(i) {
                if (i >= self.length) i %= self.length;
                if (i < 0) {
                    var m = i % self.length;
                    i = m === 0 ? 0 : m + self.length
                }
                return i
            }
        },
        next: function () {
            this.playTo(this.curPage + 1)
        },
        prev: function () {
            this.playTo(this.curPage -
                1)
        },
        play: function () {
            var self = this,
                c = self.config;
            if (self.timer) self.stop();
            self.timer = window.setInterval(function () {
                var to = self.curPage + 1;
                self.playTo(to)
            }, c.stay)
        },
        stop: function () {
            window.clearInterval(this.timer)
        },
        _lazyload: function (obj) {
            var textarea = jQuery(obj).find("textarea");
            if (textarea.length === 2) {
                var bg_img = textarea[0].value;
                jQuery(obj).find("#child0").get(0).innerHTML = bg_img;
                var img = textarea[1].value;
                jQuery(obj).find("#child1").get(0).innerHTML = img;
                obj.parsed = true
            }
        }
    };
    Tab.effect = {};
    $.extend(Tab.effect, {
        base: {
            oninit: function () {
                var self = this,
                    c = self.config;
                $.each(self.target, function (i, elem) {
                    if (self.target[c.playTo][0] != elem) $(elem).hide()
                })
            },
            onchange: function () {
                var self = this,
                    prevElem = self.prevPage === window.undefined ? null : self.target[self.prevPage],
                    curElem = self.target[self.curPage];
                if (prevElem) $(prevElem).hide();
                $(curElem).show()
            }
        },
        fade: {
            oninit: function () {
                var self = this,
                    c = self.config;
                self.content.css("position", "relative");
                $.each(self.target, function (i, elem) {
                    elem = $(elem);
                    elem.show();
                    elem.data("index",
                        i);
                    elem.css({
                        opacity: 0,
                        position: "absolute",
                        zIndex: i
                    })
                })
            },
            onchange: function () {
                var self = this,
                    prevElem = self.prevPage === window.undefined ? null : $(self.target[self.prevPage]),
                    curElem = $(self.target[self.curPage]);
                if (prevElem) prevElem.css("zIndex", prevElem.data("index"));
                curElem.css({
                    "zIndex": self.length,
                    "opacity": 0
                });
                curElem.fadeTo(self.config.animateTime, 1, "swing", function () {
                    self.target.not(curElem[0]).css("opacity", 0)
                });
                if (prevElem) prevElem.fadeTo(self.config.animateTime, 0);
                self.target.not(curElem[0]).stop()
            }
        },
        slide: {
            oninit: function () {
                var self = this,
                    c = self.config;
                var tabItem = $(self.target[c.playTo]);
                self.wrap.css({
                    "overflow": "hidden",
                    "zoom": "1"
                });
                self.target.show();
                if (c.direction == "x") {
                    self.prop = "marginLeft";
                    self.boxProp = "width";
                    self.step = c.width || tabItem.outerWidth(true)
                } else {
                    self.prop = "marginTop";
                    self.boxProp = "height";
                    self.step = c.height || tabItem.outerHeight(true)
                }
                self.showNum = Math.ceil(parseFloat(self.wrap.css(self.boxProp)) / self.step);
                if (c.merge);
                if (c.direction == "x") {
                    self.content.css("width", (c.totalWidth ||
                        self.step * self.target.length) + "px");
                    self.target.css("float", "left")
                }
            },
            onchange: function () {
                var self = this,
                    c = self.config,
                    from = self.prevPage === window.undefined ? 0 : self.prevPage,
                    to = self.curPage,
                    pos;
                if (to + self.showNum > self.length) to = self.length - self.showNum;
                pos = to * self.step;
                var o = {};
                o[self.prop] = -pos + "px";
                self.content.stop();
                self.content.animate(o, self.config.animateTime)
            }
        },
        blur: {
            onInitStart: function () {
                if (!document.createElement("canvas").getContext) {
                    var config = $.extend({}, this.config, {
                        effect: this.config.degradation
                    });
                    return new Tab(config)
                }
            },
            oninit: function () {
                var self = this,
                    c = self.config;
                self.content.css("position", "relative");
                $.each(self.target, function (i, elem) {
                    elem = $(elem);
                    elem.data("index", i);
                    elem.show();
                    elem.css({
                        opacity: 1,
                        position: "absolute",
                        zIndex: i
                    });
                    var img = elem.find("img").eq(0),
                        blurImg;
                    img.css("opacity", 0);
                    elem.data("img", img);
                    var tempImg = new Image;
                    $(tempImg).bind("load", function () {
                        var blurImg;
                        if (!!document.createElement("canvas").getContext) {
                            blurImg = $("<canvas>");
                            blurImg.css({
                                position: "absolute",
                                left: this.offsetLeft +
                                    "px",
                                top: this.offsetTop + "px",
                                opacity: 0
                            });
                            blurImg.attr({
                                width: this.width,
                                height: this.height
                            });
                            var randomNum = Math.floor(Math.random() * 3);
                            $.blur({
                                img: this,
                                canvas: blurImg[0],
                                process: function (r, g, b, x, y) {
                                    var channel = [r, g, b];
                                    if (x % 2 && y % 2) {
                                        channel[randomNum] += 100;
                                        channel[randomNum] = channel[randomNum] > 255 ? 255 : channel[randomNum]
                                    }
                                    return {
                                        r: channel[0],
                                        g: channel[1],
                                        b: channel[2]
                                    }
                                },
                                radius: self.config.radius
                            })
                        } else {
                            blurImg = $('<img src="' + this.src + '"/>');
                            blurImg.css({
                                position: "absolute",
                                left: this.offsetLeft + "px",
                                top: this.offsetTop +
                                    "px",
                                opacity: 0,
                                filter: 'Blur(Add="1",Direction="90",Strength="20")'
                            })
                        }
                        img.after(blurImg);
                        elem.data("blurImg", blurImg)
                    });
                    var tempImgURL = $.browser.msie ? img[0].src + "?" + Math.random() : img[0].src;
                    tempImg.src = img[0].src + "?" + Math.random();
                    var time = self.config.animateTime;
                    elem.data("in", function () {
                        var img = elem.data("img"),
                            blurImg = elem.data("blurImg");
                        if (blurImg) {
                            blurImg.stop().fadeTo(time, 1).fadeTo(time, 0);
                            img.stop().delay(time).fadeTo(1, 1)
                        } else img.css("opacity", 1)
                    });
                    elem.data("out", function () {
                        var img = elem.data("img"),
                            blurImg = elem.data("blurImg");
                        if (blurImg) {
                            blurImg.stop().fadeTo(time, 1).fadeTo(time, 0);
                            img.stop().fadeTo(1, 1).delay(time).fadeTo(1, 0)
                        }
                        img.stop().fadeTo(time, 0)
                    })
                })
            },
            onchange: function () {
                var self = this,
                    prevElem = self.prevPage === window.undefined ? null : $(self.target[self.prevPage]),
                    curElem = $(self.target[self.curPage]);
                if (prevElem) {
                    prevElem.data("out")();
                    window.setTimeout(function () {
                        curElem.data("in")()
                    }, self.config.animateTime)
                } else curElem.data("in")()
            }
        },
        slide3d: {
            oninit: function () {
                var self = this,
                    c = self.config;
                var arrTarget = [];
                for (var i = 0; i < self.target.length; i++) arrTarget[i] = self.target.eq(i);
                self.target = arrTarget;
                var tabItem = self.target[c.playTo];
                self.wrap.css({
                    "overflow": "hidden",
                    "zoom": "1"
                });
                $.each(self.target, function (i, $obj) {
                    $obj.show()
                });
                self.prop = "left";
                self.boxProp = "width";
                self.step = c.width || tabItem.outerWidth(true);
                self.showNum = Math.ceil(parseFloat(self.wrap.css(self.boxProp)) / self.step);
                if (c.merge) {
                    var copies = [];
                    $.each(self.target, function (i, $obj) {
                        var $copy = $obj.clone(true).appendTo(self.content);
                        copies.push($copy)
                    });
                    self.target = self.target.concat(copies);
                    self.plus = 0
                }
                if (c.direction == "x") {
                    self.content.css({
                        "position": "relative",
                        "left": 0,
                        "marginLeft": 0,
                        "width": (c.totalWidth || self.step * self.target.length) + "px"
                    });
                    $.each(self.target, function (i, $obj) {
                        $obj.css({
                            "float": "left"
                        });
                        var child = $obj.find(".child");
                        $obj.data("child", child)
                    })
                }
            },
            onchange: function () {
                if (this.prevPage === window.undefined) return;
                var self = this,
                    c = self.config,
                    from = self.prevPage === window.undefined ? 0 : self.prevPage,
                    to = self.curPage,
                    pos;
                to = from + (to - from) % self.target.length;
                if (Math.abs(to - from) > self.target.length / 2)
                    if (to < from) to += self.target.length;
                    else to -= self.target.length;
                self.curPage = to;
                var pointerOffset = 0;
                merge: if (c.merge) {
                    var across = to - from,
                        num = Math.abs(across);
                    if (across === 0) break merge;
                    if (across < 0) {
                        if (to >= self.plus) break merge;
                        for (var i = 0; i < num; i++) {
                            var elem = self.target.pop();
                            self.content.prepend(elem);
                            self.target.unshift(elem);
                            pointerOffset--
                        }
                    } else if (across > 0) {
                        if (to <= self.target.length + self.plus - self.showNum) break merge;
                        for (var i = 0; i < num; i++) {
                            var elem = self.target.shift();
                            self.content.append(elem);
                            self.target.push(elem);
                            pointerOffset++
                        }
                    }
                    self.plus += across;
                    self.content.css("marginLeft", parseInt(self.content.css("marginLeft")) + across * self.step + "px")
                }
                if (c.merge) pos = to * self.step;
                else {
                    if (to + self.showNum > self.length) to = self.length - self.showNum;
                    pos = to * self.step
                }
                var plus;
                if (to > from) plus = 1;
                else plus = -1;
                var offset = -1;
                if (to > from) offset = 1;
                var prevChild = getObj(from).data("child");
                prevChild.each(function (i, obj) {
                    var z = parseInt($(obj).attr("data-z"));
                    z = z >= 5 ? 5 : z;
                    if (z > 1) {
                        var myOffset = -offset * self.step * ($(obj).attr("data-z") - 1);
                        window.setTimeout(function () {
                            $(obj).stop().animate({
                                "marginLeft": myOffset
                            }, self.config.animateTime, "easeInOutExpo", function () {
                                $(obj).css("marginLeft", "0px")
                            })
                        }, (5 - z) * 50)
                    }
                });
                window.setTimeout(function () {
                    var o = {};
                    o[self.prop] = -pos + "px";
                    self.content.stop();
                    self.content.animate(o, self.config.animateTime, "easeInOutExpo")
                }, 250);
                window.setTimeout(function () {
                    var child = getObj(to).data("child");
                    child.each(function (i, obj) {
                        var z = parseInt($(obj).attr("data-z"));
                        z = z >= 5 ? 5 : z;
                        if (z > 1) {
                            var myOffset = offset * self.step * $(obj).attr("data-z");
                            window.setTimeout(function () {
                                $(obj).css("marginLeft", myOffset + "px");
                                $(obj).stop().animate({
                                    "marginLeft": 0
                                }, self.config.animateTime, "easeInOutExpo")
                            }, (z - 1) * 50)
                        }
                    })
                }, 250);

                function getObj(n) {
                    var offset = self.plus % self.target.length;
                    var index = (n - offset) % self.target.length;
                    return self.target[index]
                }
            }
        }
    });
    jQuery.Tab = Tab
})(jQuery);

var G = {};

G.createFnQueue = function (shift) {
    var _list = [];

    return {
        add: function (fn) {
            if ($.isFunction(fn))
                _list.push(fn);
        },

        exec: function (o) {
            if (shift !== false) {
                while (_list.length > 0) {
                    _list.shift()(o);
                }
            } else {
                for (var i = 0, len = _list.length; i < len; i++) {
                    if (_list[i](o) === false) {
                        return false; // 类似事件的回调函数
                    }
                }
            }
        },

        clear: function () {
            _list.length = 0;
        }
    };
};

G.app = {}; // 应用
G.logic = {}; // 业务公共逻辑相关
G.ui = {}; // 界面相关
G.util = {}; // 工具相关

if ($.browser.msie && parseInt($.browser.version, 10) < 7) {
    try {
        document.execCommand("BackgroundImageCache", false, true);
    } catch (e) {}
}
/*
 * Cookie 相关操作
 */
G.util.cookie = {
    get: function (name) {
        var r = new RegExp("(^|;|\\s+)" + name + "=([^;]*)(;|$)");
        var m = document.cookie.match(r);
        return (!m ? "" : unescape(m[2]));
    },

    add: function (name, v, path, expire, domain) {
        var s = name + "=" + escape(v) +
            "; path=" + (path || '/') // 默认根目录
            +
            (domain ? ("; domain=" + domain) : '');
        if (expire > 0) {
            var d = new Date();
            d.setTime(d.getTime() + expire * 1000);
            s += ";expires=" + d.toGMTString();
        }
        document.cookie = s;
    },

    del: function (name, domain) {
        document.cookie = name + "=;path=/;" + (domain ? ("domain=" + domain + ";") : '') + "expires=" + (new Date(0)).toGMTString();
    }
};

/*
 * token 相关操作
 */
G.util.token = {
    //给连接加上token
    addToken: function (url, type) {
        //type标识请求的方式,jq标识jquery，lk标识普通链接,fr标识form表单,ow打开新窗口
        var token = this.getToken();
        //只支持http和https协议，当url中无协议头的时候，应该检查当前页面的协议头
        if (url == "" || (url.indexOf("://") < 0 ? location.href : url).indexOf("http") != 0) {
            return url;
        }
        if (url.indexOf("#") != -1) {
            var f1 = url.match(/\?.+\#/);
            if (f1) {
                var t = f1[0].split("#"),
                    newPara = [t[0], "&g_tk=", token, "&g_ty=", type, "#", t[1]].join("");
                return url.replace(f1[0], newPara);
            } else {
                var t = url.split("#");
                return [t[0], "?g_tk=", token, "&g_ty=", type, "#", t[1]].join("");
            }
        }
        //无论如何都把g_ty带上，用户服务器端判断请求的类型
        return token == "" ? (url + (url.indexOf("?") != -1 ? "&" : "?") + "g_ty=" + type) : (url + (url.indexOf("?") != -1 ? "&" : "?") + "g_tk=" + token + "&g_ty=" + type);
    },
    //获取转换后的token
    getToken: function () {
        var skey = G.util.cookie.get("skey"),
            token = skey == null ? "" : this.time33(skey);
        return token;
    },
    //skey转token
    time33: function (str) {
        //哈希time33算法
        for (var i = 0, len = str.length, hash = 5381; i < len; ++i) {
            hash += (hash << 5) + str.charAt(i).charCodeAt();
        };
        return hash & 0x7fffffff;
    }
}


/*新增token处理*/
G.util.getACSRFToken = function () {
    if (G.util.cookie.get("g_tk")) {
        return G.util._DJB(G.util.cookie.get("g_tk"))
    } else {
        return false;
    };
}

G.util._DJB = function (str) {
    var hash = 5381;
    for (var i = 0, len = str.length; i < len; ++i) {
        hash += (hash << 5) + str.charAt(i).charCodeAt();
    }
    return hash & 0x7fffffff;
}

G.util.token_post = function (options) {
    var opt = jQuery.extend({
        "type": "POST",
        "cache": false,
        "dataType": "json",
        "timeout": 8000
    }, options);

    //加上token值
    if (G.util.getACSRFToken()) {
        opt.url = options.url + "&token=" + G.util.getACSRFToken();
    }

    //调用jQuery AJAX
    jQuery.ajax(opt);
};

G.util.parse = {
    url: function () {

        var _myDecode = function (q) {
            var q = (q + '').replace(/(&amp;|\?)/g, "&").split('&');
            var p = {};
            var c = q.length;
            for (var i = 0; i < c; i++) {
                var pos = q[i].indexOf('=');
                if (-1 == pos) continue;
                p[q[i].substr(0, pos).replace(/[^a-zA-Z0-9_]/g, '')] = unescape(q[i].substr(pos + 1));
            }

            return p;
        };

        var hash = location.href.toString().indexOf('#');
        if (hash < 0) hash = '';
        else {
            hash = location.href.toString().substring(hash, location.href.toString().length);
        }
        return {
            search: _myDecode(location.search.substr(1)),
            hash: _myDecode(hash)
        };
    },
};
/**
 * 请求本地存储
 * 避免操作的紊乱
 * @param Function fn 回调函数，它的参数是cache对象
 */
G.util.localShare = (function () {
    // 事件队列
    var _queue = G.createFnQueue(),
        _scriptLoaded = 0,
        _localCache = false;

    return function (fn) {
        _queue.add(fn);

        if (_scriptLoaded == 2 && _localCache) { // 加载已完成
            _queue.exec(_localCache);
            return;
        }

        if (_scriptLoaded == 1) { // 加载中
            return;
        }

        _scriptLoaded = 1;

        var ver = '1.1';
        $.ajax({
            dataType: 'script',
            crossDomain: true,
            cache: true,
            scriptCharset: 'gb2312',
            success: function () {
                G.app.localShare(function () {
                    _scriptLoaded = 2;
                    _localCache = this,
                        _queue.exec(_localCache);
                });
            }
        });
    };
})();

G.util.ping = {
    VISIT_INFO_KEY: 'vinfo',
    _visMap: ['lastVisit'],
    _performance: false,

    getVisitInfo: function () {
        var self = G.util.ping,
            visitInfo = G.util.cookie.get(self.VISIT_INFO_KEY),
            ret = {};

        visitInfo = visitInfo.split(',');
        $.each(self._visMap, function (k, v) {
            ret[v] = visitInfo[k] || '';
        });

        return ret;
    },

    setVisitInfo: function (key, val) {
        var self = G.util.ping,
            visitInfo = self.getVisitInfo(),
            p = {},
            r = [];

        if (arguments.length < 2) {
            p = key;
        } else {
            p[key] = val;
        }

        visitInfo = $.extend(visitInfo, key);
        $.each(self._visMap, function (k, v) {
            r[k] = visitInfo[v] || '';
        });

        G.util.cookie.add(self.VISIT_INFO_KEY, r.join(','), '/', 24 * 3600 * 365, '.' + G.domain);
    },
};
(function (G, $, undefined) {
    function tip(opt) {
        var instanceOf = function (o, type) {
            return (o && o.hasOwnProperty && (o instanceof type));
        };
        if (!(instanceOf(this, tip))) {
            return new tip(opt);
        }
        opt = jQuery.extend({}, {
            "position": "rightBottom", // 提示tip相对于target的位置, 可选：'leftTop','rightTop','rightBottom','leftBottom'
            "distance": 20, //尖角相对于tip顶点的距离
            "width": "120",
            "html": "", //提示信息
            "target": null, //tip相对停靠的节点, 类型： selector
            "buttons": null, //tip中的按钮文字, 如 ['确定', '取消']
            "group": null, //tip所属的组，当设定了这个参数，属于同一组的tip将在document中最多显示一个
            "className": "global_tip", //tip最外层 节点的样式
            "time": null // time毫秒后自动关闭, 当存在按钮时，该参数无效
            //  "click_1" : function(){}	//点击第n个按钮时的回调函数, 从1开始
        }, opt || {});

        var self = this,
            target = $(opt.target),
            instance = target.data('tipInstnace');
        if (instance)
            instance.close();

        //属于同一组的tip只显示一个
        tip.instance = tip.instance || [];
        if (opt.group) {
            for (var i = 0, len = tip.instance.length; i < len; i++) {
                if (tip.instance[i].opt.group === opt.group) {
                    tip.instance[i].close();
                }
            }
        };

        var showButtons = (opt.buttons && !$.isArray(opt.buttons)) || ($.isArray(opt.buttons) && opt.buttons.length > 0);
        this.element = $('<div class="' + opt.className + '"><div class="content">' + opt.html + '</div>' + (showButtons ? '<div class="buttons"></div>' : '') + '<span class="arrow">◆<span class="inner">◆</span></span></div>').css('width', opt.width);
        this.opt = opt;
        this.opt.id = new Date().getTime();

        //展现按钮
        if (showButtons) {
            var str = $.map($.isArray(opt.buttons) ? opt.buttons : [opt.buttons], function (value, index) {
                return '<a href="#" onclick="return false" class="' + (index == 0 ? 'btn_strong' : 'btn_common') + '">' + value + '</a>';
            }).join('');
            var buttons = this.element.find('.buttons');
            buttons.append(str);
            buttons.find('a').each(function (index) {
                $(this).click(function () {
                    if (self.element.triggerHandler('click_' + (index + 1)) !== false)
                        self.close();
                });
            }).first().focus();
        }
        this.element.appendTo(document.body);

        //time毫秒后自动关闭
        if (!showButtons && opt.time) {
            this.timer = setTimeout(function () {
                self.close();
            }, parseInt(opt.time, 10));
        }

        //确定尖角的位置
        var arrowCss = {},
            innerCss = {},
            distance = parseInt(opt.distance, 10);
        var sizeTop = $.browser.mozilla ? 12 : ($.browser.webkit ? 12 : 13)
        var sizeBottom = $.browser.mozilla ? 10 : ($.browser.webkit ? 10 : 10)
        switch (opt.position) {
            case "leftTop":
                arrowCss = {
                    bottom: -1 * sizeTop,
                    right: distance
                };
                innerCss = {
                    top: -1
                };
                break;
            case "rightTop":
                arrowCss = {
                    left: distance,
                    bottom: -1 * sizeTop
                };
                innerCss = {
                    top: -1
                };
                break;
            case "leftBottom":
                arrowCss = {
                    top: -1 * sizeBottom,
                    right: distance
                };
                innerCss = {
                    top: 1
                }
                break;
            default:
                arrowCss = {
                    top: -1 * sizeBottom,
                    left: distance
                };
                innerCss = {
                    top: 1
                };
                break;
        }

        var arrow = $(".arrow", this.element);
        arrow.css(arrowCss);
        $(".inner", this.element).css(innerCss);

        //确定整个tip的位置
        var arrowOffset = arrow.offset(),
            targetOffset = target.offset(),
            point1, point2;
        switch (opt.position) {
            case "leftTop":
            case "rightTop":
                point1 = {
                    x: parseInt(arrowOffset.left, 10) + parseInt(arrow.width(), 10) / 2,
                    y: parseInt(arrowOffset.top, 10) + parseInt(arrow.height(), 10)
                };

                point2 = {
                    x: parseInt(targetOffset.left, 10) + parseInt(target.width(), 10) / 2,
                    y: parseInt(targetOffset.top, 10)
                }
                break;
            default:
                point1 = {
                    x: parseInt(arrowOffset.left, 10) + parseInt(arrow.width(), 10) / 2,
                    y: parseInt(arrowOffset.top, 10)
                };

                point2 = {
                    x: parseInt(targetOffset.left, 10) + parseInt(target.width(), 10) / 2,
                    y: parseInt(targetOffset.top, 10) + parseInt(target.height(), 10)
                }
                break;
        }
        var pos = this.element.position();
        this.element.css({
            "left": parseInt(pos.left) - point1.x + point2.x,
            "top": parseInt(pos.top) - point1.y + point2.y
        });

        var self = this;
        self._close = function () {
            self && self.close();
        };
        $(window).bind('resize', self._close);

        tip.instance.push(this);
        target.data('tipInstnace', this);

        //通过形参绑定事件
        for (var name in opt) {
            if (/^click_\d$/.test(name.toString())) {
                this.bind(name, opt[name]);
            }
        }
    };

    $.extend(tip.prototype, {
        //绑定按钮事件
        bind: function () {
            this.element.bind.apply(this.element, $.makeArray(arguments));
        },

        //关闭tip
        close: function () {
            clearTimeout(this.timer);
            $(window).unbind('resize', self._close);
            this.element.data('tipInstnace', null);
            for (var i = 0, len = tip.instance.length; i < len; i++) {
                if (tip.instance[i].opt.id == this.opt.id) {
                    tip.instance.splice(i, 1);
                    break;
                }
            }
            this.element.remove();
        },

        //tip中的按钮
        getButtons: function () {
            return this.element.find(".buttons>a");
        },

        //tip最外层dom(jquery对象)
        getElement: function () {
            return this.element;
        },

        //tip是否显示
        isShow: function () {
            return this.element[0].style.display !== 'none'
        },

        //显示tip
        show: function () {
            this.element[0].style.display = 'block';
        },

        //隐藏tip
        hide: function () {
            this.element[0].style.display = 'none';
        }
    });
    G.ui.arrowTip = tip;
})(G, jQuery);

"use strict";
var _extends = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
        }
        return t
    },
    _createClass = function () {
        function i(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function (t, e, n) {
            return e && i(t.prototype, e), n && i(t, n), t
        }
    }();

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
        return n
    }
    return Array.from(t)
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}
var Graphic = function () {
    function d() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
            e = t.parent,
            n = t.links,
            i = void 0 === n ? document.querySelectorAll("[data-sjslink]") : n,
            s = t.active,
            a = void 0 === s ? "is-active" : s,
            r = t.margin,
            o = void 0 === r ? 20 : r,
            l = t.responsive,
            u = void 0 === l ? {
                980: {
                    columns: 3
                },
                480: {
                    columns: 2
                },
                0: {
                    columns: 1
                }
            } : l,
            c = t.fadeDuration,
            h = void 0 === c ? {
                in: 300,
                out: 0
            } : c;
        _classCallCheck(this, d), this.parent = e, this.links = Array.from(i), this.active = a, this.margin = o, this.responsive = u, this.fadeDuration = h, this.elements = Array.from(this.parent.children), this.activeElements = this.elements, this.columns = 1, this.dataLink = "all", this.winWidth = window.innerWidth, this.init()
    }
    return _createClass(d, [{
        key: "orderelements",
        value: function () {
            var r = this,
                t = this.parent,
                e = this.activeElements,
                o = this.columns,
                l = this.blocWidth,
                u = (this.responsive, this.margin),
                n = e.reduce(function (t, e, n) {
                    var i = r._sumArrHeight(t, o),
                        s = n % o * (l + u),
                        a = 0 <= n - o ? i[n % o] + u * Math.floor(n / o) : 0;
                    return e.style.transform = "translate3d(" + s + "px, " + a + "px, 0)", t.push(e.offsetHeight), t
                }, []),
                i = this._sumArrHeight(n, o),
                s = Math.max.apply(Math, _toConsumableArray(i)) + u * (Math.floor(e.length / o) - 1);
            t.style.height = s + "px"
        }
    }, {
        key: "handleFilterClick",
        value: function (t, e) {
            var n = this;
            t.preventDefault();
            var i = this.links,
                s = this.active;
            e.dataset.sjslink !== this.dataLink && (this.dataLink = e.dataset.sjslink, i.forEach(function (t) {
                t.isEqualNode(e) ? t.classList.add(s) : t.classList.remove(s)
            }), this._filterElements(function () {
                n.orderelements()
            }))
        }
    }, {
        key: "resize",
        value: function () {
            var t = this;
            window.addEventListener("resize", function () {
                clearTimeout(window.GraphicResize), window.GraphicResize = setTimeout(function () {
                    t.winWidth = window.innerWidth, t._setBlocWidth(function () {
                        t.orderelements()
                    })
                }, 500)
            })
        }
    }, {
        key: "init",
        value: function () {
            var n = this,
                t = this.parent,
                e = this.links,
                i = this.active;
            e.forEach(function (e, t) {
                0 === t && (e.classList.add(i), n.dataLink = e.dataset.sjslink), e.addEventListener("click", function (t) {
                    n.handleFilterClick(t, e)
                })
            }), this._setBlocWidth(), window.addEventListener("load", function () {
                n._filterElements(function () {
                    n.orderelements()
                }), t.style.opacity = 1
            }), this.resize()
        }
    }, {
        key: "_setBlocWidth",
        value: function (t) {
            var e = this.parent,
                n = this.elements,
                i = this.margin,
                s = this.responsive,
                a = this.columns = this._columnsCount(s).columns,
                r = this.blocWidth = (e.clientWidth - i * (a - 1)) / a;
            n.forEach(function (t) {
                t.style.width = r + "px"
            }), t && t()
        }
    }, {
        key: "_filterElements",
        value: function (t) {
            var e = this,
                n = this.elements,
                i = this.dataLink,
                s = this.fadeDuration;
            this.activeElements = n.filter(function (t) {
                return "all" === i ? (e._fadeIn(t, s.in), !0) : t.dataset.sjsel !== i ? (e._fadeOut(t, s.out), !1) : (e._fadeIn(t, s.in), !0)
            }), t && t()
        }
    }, {
        key: "_sumArrHeight",
        value: function (t, s) {
            return t.reduce(function (t, e, n) {
                var i = n % s;
                return t[i] || (t[i] = 0), t[i] = t[i] + e, t
            }, [])
        }
    }, {
        key: "_columnsCount",
        value: function (t) {
            var n = this.winWidth;
            return Object.entries(t).reduce(function (t, e) {
                return n > e[0] && e[0] >= Math.max(t.width) ? {
                    width: e[0],
                    columns: e[1].columns
                } : t
            }, {
                width: 0,
                columns: 4
            })
        }
    }, {
        key: "_fadeIn",
        value: function (e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 300,
                n = arguments[2],
                i = parseFloat(window.getComputedStyle(e, null).getPropertyValue("opacity")),
                s = 16 / t;
            e.style.display = "block", requestAnimationFrame(function t() {
                (i += s) <= 1 ? (e.style.opacity = i, requestAnimationFrame(t)) : (e.style.opacity = 1, n && n())
            })
        }
    }, {
        key: "_fadeOut",
        value: function (e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 300,
                n = arguments[2],
                i = parseFloat(window.getComputedStyle(e, null).getPropertyValue("opacity")),
                s = t ? 16 / t : 1;
            requestAnimationFrame(function t() {
                0 <= (i -= s) ? (e.style.opacity = i, requestAnimationFrame(t)) : (e.style.opacity = 0, e.style.display = "none", n && n())
            })
        }
    }]), d
}();
HTMLElement.prototype.Graphicjs = HTMLElement.prototype.Graphicjs || function (t) {
    return new Graphic(_extends({
        parent: this
    }, t))
};