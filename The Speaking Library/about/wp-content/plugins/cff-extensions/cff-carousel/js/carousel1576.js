"function" !== typeof Object.create && (Object.create = function (f) { function g() { } g.prototype = f; return new g });
(function (f, g, k) {
    var l = {
        init: function (a, b) { this.$elem = f(b); this.options = f.extend({}, f.fn.cffOwlCarousel.options, this.$elem.data(), a); this.userOptions = a; this.loadContent() }, loadContent: function () {
            function a(a) { var d, e = ""; if ("function" === typeof b.options.jsonSuccess) b.options.jsonSuccess.apply(this, [a]); else { for (d in a.cff_owl) a.cff_owl.hasOwnProperty(d) && (e += a.cff_owl[d].item); b.$elem.html(e) } b.logIn() } var b = this, e; "function" === typeof b.options.beforeInit && b.options.beforeInit.apply(this, [b.$elem]); "string" === typeof b.options.jsonPath ?
                (e = b.options.jsonPath, f.getJSON(e, a)) : b.logIn()
        }, logIn: function () { this.$elem.data("cff_owl-originalStyles", this.$elem.attr("style")); this.$elem.data("cff_owl-originalClasses", this.$elem.attr("class")); this.$elem.css({ opacity: 0 }); this.orignalItems = this.options.items; this.checkBrowser(); this.wrapperWidth = 0; this.checkVisible = null; this.setVars() }, setVars: function () {
            if (0 === this.$elem.children().length) return !1; this.baseClass(); this.eventTypes(); this.$userItems = this.$elem.children(); this.itemsAmount = this.$userItems.length;
            this.wrapItems(); this.$cff_owlItems = this.$elem.find(".cff_owl-item"); this.$cff_owlWrapper = this.$elem.find(".cff_owl-wrapper"); this.playDirection = "next"; this.prevItem = 0; this.prevArr = [0]; this.currentItem = 0; this.customEvents(); this.onStartup()
        }, onStartup: function () {
            this.updateItems(); this.calculateAll(); this.buildControls(); this.updateControls(); this.response(); this.moveEvents(); this.stopOnHover(); this.cff_owlStatus(); !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle); !0 === this.options.autoPlay &&
                (this.options.autoPlay = 5E3); this.play(); this.$elem.find(".cff_owl-wrapper").css("display", "block"); this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility(); this.onstartup = !1; this.eachMoveUpdate(); "function" === typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem])
        }, eachMoveUpdate: function () {
            !0 === this.options.lazyLoad && this.lazyLoad(); !0 === this.options.autoHeight && this.autoHeight(); this.onVisibleItems(); "function" === typeof this.options.afterAction && this.options.afterAction.apply(this,
                [this.$elem])
        }, updateVars: function () { "function" === typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]); this.watchVisibility(); this.updateItems(); this.calculateAll(); this.updatePosition(); this.updateControls(); this.eachMoveUpdate(); "function" === typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem]) }, reload: function () { var a = this; g.setTimeout(function () { a.updateVars() }, 0) }, watchVisibility: function () {
            var a = this; if (!1 === a.$elem.is(":visible")) a.$elem.css({ opacity: 0 }),
                g.clearInterval(a.autoPlayInterval), g.clearInterval(a.checkVisible); else return !1; a.checkVisible = g.setInterval(function () { a.$elem.is(":visible") && (a.reload(), a.$elem.animate({ opacity: 1 }, 200), g.clearInterval(a.checkVisible)) }, 500)
        }, wrapItems: function () { this.$userItems.wrapAll('<div class="cff_owl-wrapper">').wrap('<div class="cff_owl-item"></div>'); this.$elem.find(".cff_owl-wrapper").wrap('<div class="cff_owl-wrapper-outer">'); this.wrapperOuter = this.$elem.find(".cff_owl-wrapper-outer"); this.$elem.css("display", "block") },
        baseClass: function () { var a = this.$elem.hasClass(this.options.baseClass), b = this.$elem.hasClass(this.options.theme); a || this.$elem.addClass(this.options.baseClass); b || this.$elem.addClass(this.options.theme) }, updateItems: function () {
            var a, b; if (!1 === this.options.responsive) return !1; if (!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall =
                !1, this.options.itemsMobile = !1; a = f(this.options.responsiveBaseWidth).width(); a > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems); if (!1 !== this.options.itemsCustom) for (this.options.itemsCustom.sort(function (a, b) { return a[0] - b[0] }), b = 0; b < this.options.itemsCustom.length; b += 1)this.options.itemsCustom[b][0] <= a && (this.options.items = this.options.itemsCustom[b][1]); else a <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]),
                    a <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), a <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), a <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), a <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]); this.options.items > this.itemsAmount &&
                        !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount)
        }, response: function () { var a = this, b, e; if (!0 !== a.options.responsive) return !1; e = f(g).width(); a.resizer = function () { f(g).width() !== e && (!1 !== a.options.autoPlay && g.clearInterval(a.autoPlayInterval), g.clearTimeout(b), b = g.setTimeout(function () { e = f(g).width(); a.updateVars() }, a.options.responsiveRefreshRate)) }; f(g).resize(a.resizer) }, updatePosition: function () { this.jumpTo(this.currentItem); !1 !== this.options.autoPlay && this.checkAp() }, appendItemsSizes: function () {
            var a =
                this, b = 0, e = a.itemsAmount - a.options.items; a.$cff_owlItems.each(function (c) { var d = f(this); d.css({ width: a.itemWidth }).data("cff_owl-item", Number(c)); if (0 === c % a.options.items || c === e) c > e || (b += 1); d.data("cff_owl-roundPages", b) })
        }, appendWrapperSizes: function () { this.$cff_owlWrapper.css({ width: this.$cff_owlItems.length * this.itemWidth * 2, left: 0 }); this.appendItemsSizes() }, calculateAll: function () { this.calculateWidth(); this.appendWrapperSizes(); this.loops(); this.max() }, calculateWidth: function () {
            this.itemWidth = Math.round(this.$elem.width() /
                this.options.items)
        }, max: function () { var a = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth); this.options.items > this.itemsAmount ? this.maximumPixels = a = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = a); return a }, min: function () { return 0 }, loops: function () {
            var a = 0, b = 0, e, c; this.positionsInArray = [0]; this.pagesInArray = []; for (e = 0; e < this.itemsAmount; e += 1)b += this.itemWidth, this.positionsInArray.push(-b), !0 === this.options.scrollPerPage && (c = f(this.$cff_owlItems[e]),
                c = c.data("cff_owl-roundPages"), c !== a && (this.pagesInArray[a] = this.positionsInArray[e], a = c))
        }, buildControls: function () { if (!0 === this.options.navigation || !0 === this.options.pagination) this.cff_owlControls = f('<div class="cff_owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem); !0 === this.options.pagination && this.buildPagination(); !0 === this.options.navigation && this.buildButtons() }, buildButtons: function () {
            var a = this, b = f('<div class="cff_owl-buttons"/>'); a.cff_owlControls.append(b); a.buttonPrev =
                f("<div/>", { "class": "cff_owl-prev", html: a.options.navigationText[0] || "" }); a.buttonNext = f("<div/>", { "class": "cff_owl-next", html: a.options.navigationText[1] || "" }); b.append(a.buttonPrev).append(a.buttonNext); b.on("touchstart.cff_owlControls mousedown.cff_owlControls", 'div[class^="cff_owl"]', function (a) { a.preventDefault() }); b.on("touchend.cff_owlControls mouseup.cff_owlControls", 'div[class^="cff_owl"]', function (b) { b.preventDefault(); f(this).hasClass("cff_owl-next") ? a.next() : a.prev() })
        }, buildPagination: function () {
            var a = this; a.paginationWrapper =
                f('<div class="cff_owl-pagination"/>'); a.cff_owlControls.append(a.paginationWrapper); a.paginationWrapper.on("touchend.cff_owlControls mouseup.cff_owlControls", ".cff_owl-page", function (b) { b.preventDefault(); Number(f(this).data("cff_owl-page")) !== a.currentItem && a.goTo(Number(f(this).data("cff_owl-page")), !0) })
        }, updatePagination: function () {
            var a, b, e, c, d, g; if (!1 === this.options.pagination) return !1; this.paginationWrapper.html(""); a = 0; b = this.itemsAmount - this.itemsAmount % this.options.items; for (c = 0; c < this.itemsAmount; c += 1)0 === c % this.options.items &&
                (a += 1, b === c && (e = this.itemsAmount - this.options.items), d = f("<div/>", { "class": "cff_owl-page" }), g = f("<span></span>", { text: !0 === this.options.paginationNumbers ? a : "", "class": !0 === this.options.paginationNumbers ? "cff_owl-numbers" : "" }), d.append(g), d.data("cff_owl-page", b === c ? e : c), d.data("cff_owl-roundPages", a), this.paginationWrapper.append(d)); this.checkPagination()
        }, checkPagination: function () {
            var a = this; if (!1 === a.options.pagination) return !1; a.paginationWrapper.find(".cff_owl-page").each(function () {
                f(this).data("cff_owl-roundPages") ===
                f(a.$cff_owlItems[a.currentItem]).data("cff_owl-roundPages") && (a.paginationWrapper.find(".cff_owl-page").removeClass("active"), f(this).addClass("active"))
            })
        }, checkNavigation: function () {
            if (!1 === this.options.navigation) return !1; !1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem ===
                this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled")))
        }, updateControls: function () { this.updatePagination(); this.checkNavigation(); this.cff_owlControls && (this.options.items >= this.itemsAmount ? this.cff_owlControls.hide() : this.cff_owlControls.show()) }, destroyControls: function () { this.cff_owlControls && this.cff_owlControls.remove() }, next: function (a) {
            if (this.isTransition) return !1;
            this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1; if (this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0)) if (!0 === this.options.rewindNav) this.currentItem = 0, a = "rewind"; else return this.currentItem = this.maximumItem, !1; this.goTo(this.currentItem, a)
        }, prev: function (a) {
            if (this.isTransition) return !1; this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ?
                this.options.items : 1); if (0 > this.currentItem) if (!0 === this.options.rewindNav) this.currentItem = this.maximumItem, a = "rewind"; else return this.currentItem = 0, !1; this.goTo(this.currentItem, a)
        }, goTo: function (a, b, e) {
            var c = this; if (c.isTransition) return !1; "function" === typeof c.options.beforeMove && c.options.beforeMove.apply(this, [c.$elem]); a >= c.maximumItem ? a = c.maximumItem : 0 >= a && (a = 0); c.currentItem = c.cff_owl.currentItem = a; if (!1 !== c.options.transitionStyle && "drag" !== e && 1 === c.options.items && !0 === c.browser.support3d) return c.swapSpeed(0),
                !0 === c.browser.support3d ? c.transition3d(c.positionsInArray[a]) : c.css2slide(c.positionsInArray[a], 1), c.afterGo(), c.singleItemTransition(), !1; a = c.positionsInArray[a]; !0 === c.browser.support3d ? (c.isCss3Finish = !1, !0 === b ? (c.swapSpeed("paginationSpeed"), g.setTimeout(function () { c.isCss3Finish = !0 }, c.options.paginationSpeed)) : "rewind" === b ? (c.swapSpeed(c.options.rewindSpeed), g.setTimeout(function () { c.isCss3Finish = !0 }, c.options.rewindSpeed)) : (c.swapSpeed("slideSpeed"), g.setTimeout(function () { c.isCss3Finish = !0 },
                    c.options.slideSpeed)), c.transition3d(a)) : !0 === b ? c.css2slide(a, c.options.paginationSpeed) : "rewind" === b ? c.css2slide(a, c.options.rewindSpeed) : c.css2slide(a, c.options.slideSpeed); c.afterGo()
        }, jumpTo: function (a) {
            "function" === typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]); a >= this.maximumItem || -1 === a ? a = this.maximumItem : 0 >= a && (a = 0); this.swapSpeed(0); !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[a]) : this.css2slide(this.positionsInArray[a], 1); this.currentItem =
                this.cff_owl.currentItem = a; this.afterGo()
        }, afterGo: function () { this.prevArr.push(this.currentItem); this.prevItem = this.cff_owl.prevItem = this.prevArr[this.prevArr.length - 2]; this.prevArr.shift(0); this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp()); "function" === typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem]) }, stop: function () { this.apStatus = "stop"; g.clearInterval(this.autoPlayInterval) },
        checkAp: function () { "stop" !== this.apStatus && this.play() }, play: function () { var a = this; a.apStatus = "play"; if (!1 === a.options.autoPlay) return !1; g.clearInterval(a.autoPlayInterval); a.autoPlayInterval = g.setInterval(function () { a.next(!0) }, a.options.autoPlay) }, swapSpeed: function (a) { "slideSpeed" === a ? this.$cff_owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === a ? this.$cff_owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" !== typeof a && this.$cff_owlWrapper.css(this.addCssSpeed(a)) },
        addCssSpeed: function (a) { return { "-webkit-transition": "all " + a + "ms ease", "-moz-transition": "all " + a + "ms ease", "-o-transition": "all " + a + "ms ease", transition: "all " + a + "ms ease" } }, removeTransition: function () { return { "-webkit-transition": "", "-moz-transition": "", "-o-transition": "", transition: "" } }, doTranslate: function (a) {
            return {
                "-webkit-transform": "translate3d(" + a + "px, 0px, 0px)", "-moz-transform": "translate3d(" + a + "px, 0px, 0px)", "-o-transform": "translate3d(" + a + "px, 0px, 0px)", "-ms-transform": "translate3d(" +
                    a + "px, 0px, 0px)", transform: "translate3d(" + a + "px, 0px,0px)"
            }
        }, transition3d: function (a) { this.$cff_owlWrapper.css(this.doTranslate(a)) }, css2move: function (a) { this.$cff_owlWrapper.css({ left: a }) }, css2slide: function (a, b) { var e = this; e.isCssFinish = !1; e.$cff_owlWrapper.stop(!0, !0).animate({ left: a }, { duration: b || e.options.slideSpeed, complete: function () { e.isCssFinish = !0 } }) }, checkBrowser: function () {
            var a = k.createElement("div"); a.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
            a = a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g); this.browser = { support3d: null !== a && 1 === a.length, isTouch: "ontouchstart" in g || g.navigator.msMaxTouchPoints }
        }, moveEvents: function () { if (!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) this.gestures(), this.disabledEvents() }, eventTypes: function () {
            var a = ["s", "e", "x"]; this.ev_types = {}; !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.cff_owl mousedown.cff_owl", "touchmove.cff_owl mousemove.cff_owl", "touchend.cff_owl touchcancel.cff_owl mouseup.cff_owl"] :
                !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.cff_owl", "touchmove.cff_owl", "touchend.cff_owl touchcancel.cff_owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (a = ["mousedown.cff_owl", "mousemove.cff_owl", "mouseup.cff_owl"]); this.ev_types.start = a[0]; this.ev_types.move = a[1]; this.ev_types.end = a[2]
        }, disabledEvents: function () { this.$elem.on("dragstart.cff_owl", function (a) { a.preventDefault() }); this.$elem.on("mousedown.disableTextSelect", function (a) { return f(a.target).is("input, textarea, select, option") }) },
        gestures: function () {
            function a(a) { if (void 0 !== a.touches) return { x: a.touches[0].pageX, y: a.touches[0].pageY }; if (void 0 === a.touches) { if (void 0 !== a.pageX) return { x: a.pageX, y: a.pageY }; if (void 0 === a.pageX) return { x: a.clientX, y: a.clientY } } } function b(a) { "on" === a ? (f(k).on(d.ev_types.move, e), f(k).on(d.ev_types.end, c)) : "off" === a && (f(k).off(d.ev_types.move), f(k).off(d.ev_types.end)) } function e(b) {
                b = b.originalEvent || b || g.event; d.newPosX = a(b).x - h.offsetX; d.newPosY = a(b).y - h.offsetY; d.newRelativeX = d.newPosX - h.relativePos;
                "function" === typeof d.options.startDragging && !0 !== h.dragging && 0 !== d.newRelativeX && (h.dragging = !0, d.options.startDragging.apply(d, [d.$elem])); (8 < d.newRelativeX || -8 > d.newRelativeX) && !0 === d.browser.isTouch && (void 0 !== b.preventDefault ? b.preventDefault() : b.returnValue = !1, h.sliding = !0); (10 < d.newPosY || -10 > d.newPosY) && !1 === h.sliding && f(k).off("touchmove.cff_owl"); d.newPosX = Math.max(Math.min(d.newPosX, d.newRelativeX / 5), d.maximumPixels + d.newRelativeX / 5); !0 === d.browser.support3d ? d.transition3d(d.newPosX) : d.css2move(d.newPosX)
            }
            function c(a) {
                a = a.originalEvent || a || g.event; var c; a.target = a.target || a.srcElement; h.dragging = !1; !0 !== d.browser.isTouch && d.$cff_owlWrapper.removeClass("grabbing"); d.dragDirection = 0 > d.newRelativeX ? d.cff_owl.dragDirection = "left" : d.cff_owl.dragDirection = "right"; 0 !== d.newRelativeX && (c = d.getNewPosition(), d.goTo(c, !1, "drag"), h.targetElement === a.target && !0 !== d.browser.isTouch && (f(a.target).on("click.disable", function (a) { a.stopImmediatePropagation(); a.stopPropagation(); a.preventDefault(); f(a.target).off("click.disable") }),
                    a = f._data(a.target, "events").click, c = a.pop(), a.splice(0, 0, c))); b("off")
            } var d = this, h = { offsetX: 0, offsetY: 0, baseElWidth: 0, relativePos: 0, position: null, minSwipe: null, maxSwipe: null, sliding: null, dargging: null, targetElement: null }; d.isCssFinish = !0; d.$elem.on(d.ev_types.start, ".cff_owl-wrapper", function (c) {
                c = c.originalEvent || c || g.event; var e; if (3 === c.which) return !1; if (!(d.itemsAmount <= d.options.items)) {
                    if (!1 === d.isCssFinish && !d.options.dragBeforeAnimFinish || !1 === d.isCss3Finish && !d.options.dragBeforeAnimFinish) return !1;
                    !1 !== d.options.autoPlay && g.clearInterval(d.autoPlayInterval); !0 === d.browser.isTouch || d.$cff_owlWrapper.hasClass("grabbing") || d.$cff_owlWrapper.addClass("grabbing"); d.newPosX = 0; d.newRelativeX = 0; f(this).css(d.removeTransition()); e = f(this).position(); h.relativePos = e.left; h.offsetX = a(c).x - e.left; h.offsetY = a(c).y - e.top; b("on"); h.sliding = !1; h.targetElement = c.target || c.srcElement
                }
            })
        }, getNewPosition: function () {
            var a = this.closestItem(); a > this.maximumItem ? a = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem =
                a = 0); return a
        }, closestItem: function () {
            var a = this, b = !0 === a.options.scrollPerPage ? a.pagesInArray : a.positionsInArray, e = a.newPosX, c = null; f.each(b, function (d, g) {
                e - a.itemWidth / 20 > b[d + 1] && e - a.itemWidth / 20 < g && "left" === a.moveDirection() ? (c = g, a.currentItem = !0 === a.options.scrollPerPage ? f.inArray(c, a.positionsInArray) : d) : e + a.itemWidth / 20 < g && e + a.itemWidth / 20 > (b[d + 1] || b[d] - a.itemWidth) && "right" === a.moveDirection() && (!0 === a.options.scrollPerPage ? (c = b[d + 1] || b[b.length - 1], a.currentItem = f.inArray(c, a.positionsInArray)) :
                    (c = b[d + 1], a.currentItem = d + 1))
            }); return a.currentItem
        }, moveDirection: function () { var a; 0 > this.newRelativeX ? (a = "right", this.playDirection = "next") : (a = "left", this.playDirection = "prev"); return a }, customEvents: function () {
            var a = this; a.$elem.on("cff_owl.next", function () { a.next() }); a.$elem.on("cff_owl.prev", function () { a.prev() }); a.$elem.on("cff_owl.play", function (b, e) { a.options.autoPlay = e; a.play(); a.hoverStatus = "play" }); a.$elem.on("cff_owl.stop", function () { a.stop(); a.hoverStatus = "stop" }); a.$elem.on("cff_owl.goTo", function (b, e) { a.goTo(e) });
            a.$elem.on("cff_owl.jumpTo", function (b, e) { a.jumpTo(e) })
        }, stopOnHover: function () { var a = this; !0 === a.options.stopOnHover && !0 !== a.browser.isTouch && !1 !== a.options.autoPlay && (a.$elem.on("mouseover", function () { a.stop() }), a.$elem.on("mouseout", function () { "stop" !== a.hoverStatus && a.play() })) }, lazyLoad: function () {
            var a, b, e, c, d; if (!1 === this.options.lazyLoad) return !1; for (a = 0; a < this.itemsAmount; a += 1)b = f(this.$cff_owlItems[a]), "loaded" !== b.data("cff_owl-loaded") && (e = b.data("cff_owl-item"), c = b.find(".lazyOwl"), "string" !== typeof c.data("src") ?
                b.data("cff_owl-loaded", "loaded") : (void 0 === b.data("cff_owl-loaded") && (c.hide(), b.addClass("loading").data("cff_owl-loaded", "checked")), (d = !0 === this.options.lazyFollow ? e >= this.currentItem : !0) && e < this.currentItem + this.options.items && c.length && this.lazyPreload(b, c)))
        }, lazyPreload: function (a, b) {
            function e() {
                a.data("cff_owl-loaded", "loaded").removeClass("loading"); b.removeAttr("data-src"); "fade" === d.options.lazyEffect ? b.fadeIn(400) : b.show(); "function" === typeof d.options.afterLazyLoad && d.options.afterLazyLoad.apply(this,
                    [d.$elem])
            } function c() { f += 1; d.completeImg(b.get(0)) || !0 === k ? e() : 100 >= f ? g.setTimeout(c, 100) : e() } var d = this, f = 0, k; "DIV" === b.prop("tagName") ? (b.css("background-image", "url(" + b.data("src") + ")"), k = !0) : b[0].src = b.data("src"); c()
        }, autoHeight: function () {
            function a() { var a = f(e.$cff_owlItems[e.currentItem]).height(); e.wrapperOuter.css("height", a + "px"); e.wrapperOuter.hasClass("autoHeight") || g.setTimeout(function () { e.wrapperOuter.addClass("autoHeight") }, 0) } function b() {
                d += 1; e.completeImg(c.get(0)) ? a() : 100 >= d ? g.setTimeout(b,
                    100) : e.wrapperOuter.css("height", "")
            } var e = this, c = f(e.$cff_owlItems[e.currentItem]).find("img"), d; void 0 !== c.get(0) ? (d = 0, b()) : a()
        }, completeImg: function (a) { return !a.complete || "undefined" !== typeof a.naturalWidth && 0 === a.naturalWidth ? !1 : !0 }, onVisibleItems: function () {
            var a; !0 === this.options.addClassActive && this.$cff_owlItems.removeClass("active"); this.visibleItems = []; for (a = this.currentItem; a < this.currentItem + this.options.items; a += 1)this.visibleItems.push(a), !0 === this.options.addClassActive && f(this.$cff_owlItems[a]).addClass("active");
            this.cff_owl.visibleItems = this.visibleItems
        }, transitionTypes: function (a) { this.outClass = "cff_owl-" + a + "-out"; this.inClass = "cff_owl-" + a + "-in" }, singleItemTransition: function () {
            var a = this, b = a.outClass, e = a.inClass, c = a.$cff_owlItems.eq(a.currentItem), d = a.$cff_owlItems.eq(a.prevItem), f = Math.abs(a.positionsInArray[a.currentItem]) + a.positionsInArray[a.prevItem], g = Math.abs(a.positionsInArray[a.currentItem]) + a.itemWidth / 2; a.isTransition = !0; a.$cff_owlWrapper.addClass("cff_owl-origin").css({
                "-webkit-transform-origin": g + "px", "-moz-perspective-origin": g +
                    "px", "perspective-origin": g + "px"
            }); d.css({ position: "relative", left: f + "px" }).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () { a.endPrev = !0; d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"); a.clearTransStyle(d, b) }); c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () { a.endCurrent = !0; c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"); a.clearTransStyle(c, e) })
        }, clearTransStyle: function (a, b) { a.css({ position: "", left: "" }).removeClass(b); this.endPrev && this.endCurrent && (this.$cff_owlWrapper.removeClass("cff_owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1) }, cff_owlStatus: function () { this.cff_owl = { userOptions: this.userOptions, baseElement: this.$elem, userItems: this.$userItems, cff_owlItems: this.$cff_owlItems, currentItem: this.currentItem, prevItem: this.prevItem, visibleItems: this.visibleItems, isTouch: this.browser.isTouch, browser: this.browser, dragDirection: this.dragDirection } }, clearEvents: function () {
            this.$elem.off(".cff_owl cff_owl mousedown.disableTextSelect");
            f(k).off(".cff_owl cff_owl"); f(g).off("resize", this.resizer)
        }, unWrap: function () { 0 !== this.$elem.children().length && (this.$cff_owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.cff_owlControls && this.cff_owlControls.remove()); this.clearEvents(); this.$elem.attr("style", this.$elem.data("cff_owl-originalStyles") || "").attr("class", this.$elem.data("cff_owl-originalClasses")) }, destroy: function () { this.stop(); g.clearInterval(this.checkVisible); this.unWrap(); this.$elem.removeData() }, reinit: function (a) {
            a = f.extend({}, this.userOptions,
                a); this.unWrap(); this.init(a, this.$elem)
        }, addItem: function (a, b) { var e; if (!a) return !1; if (0 === this.$elem.children().length) return this.$elem.append(a), this.setVars(), !1; this.unWrap(); e = void 0 === b || -1 === b ? -1 : b; e >= this.$userItems.length || -1 === e ? this.$userItems.eq(-1).after(a) : this.$userItems.eq(e).before(a); this.setVars() }, removeItem: function (a) { if (0 === this.$elem.children().length) return !1; a = void 0 === a || -1 === a ? -1 : a; this.unWrap(); this.$userItems.eq(a).remove(); this.setVars() }
    }; f.fn.cffOwlCarousel = function (a) {
        return this.each(function () {
            if (!0 ===
                f(this).data("cff_owl-init")) return !1; f(this).data("cff_owl-init", !0); var b = Object.create(l); b.init(a, this); f.data(this, "cff_owlCarousel", b)
        })
    }; f.fn.cffOwlCarousel.options = {
        items: 5, itemsCustom: !1, itemsDesktop: [1199, 4], itemsDesktopSmall: [979, 3], itemsTablet: [768, 2], itemsTabletSmall: !1, itemsMobile: [479, 1], singleItem: !1, itemsScaleUp: !1, slideSpeed: 200, paginationSpeed: 800, rewindSpeed: 1E3, autoPlay: !1, stopOnHover: !1, navigation: !1, navigationText: ["prev", "next"], rewindNav: !0, scrollPerPage: !1, pagination: !0, paginationNumbers: !1,
        responsive: !0, responsiveRefreshRate: 200, responsiveBaseWidth: g, baseClass: "cff_owl-carousel", theme: "cff_owl-theme", lazyLoad: !1, lazyFollow: !0, lazyEffect: "fade", autoHeight: !1, jsonPath: !1, jsonSuccess: !1, dragBeforeAnimFinish: !0, mouseDrag: !0, touchDrag: !0, addClassActive: !1, transitionStyle: !1, beforeUpdate: !1, afterUpdate: !1, beforeInit: !1, afterInit: !1, beforeMove: !1, afterMove: !1, afterAction: !1, startDragging: !1, afterLazyLoad: !1
    }
})(jQuery, window, document);

(function ($) {

    // a minimum height is used in several functions so it is kept in a global scope
    var minHeight;

    // function used to set feed height to the smallest post, then user can expand
    function cffUpdateSize($self) {

        setTimeout(function () { //Slight delay so images can fully load before calculating min height
            minHeight = parseInt($self.find('.cff_owl-item').eq(0).outerHeight);
            $self.find('.cff_owl-item').each(function () {
                var thisHeight = parseInt($(this).css('height'));
                minHeight = (minHeight <= thisHeight ? minHeight : thisHeight);
            });
            $self.find('.cff_owl-wrapper-outer').css('height', minHeight + 'px');
        }, 200);

    }

    // used to resize the feed after certain click events when autoheight is enabled
    function cffAutoHeightToggle($thisCommentElement, $self) {
        var feedHeight = parseInt($thisCommentElement.closest('.cff_owl-item').eq(0).css('height')),
            $owlWrapperOuter = $self.find('.cff_owl-wrapper-outer');
        $owlWrapperOuter.animate({
            height: feedHeight + 'px'
        }, 400);
    }

    // used to resize the feed after certain click events
    function cffFeedHeightToggle(maxHeight, $self) {
        var commentsOpenHeights = new Array(),
            $owlWrapperOuter = $self.find('.cff_owl-wrapper-outer'),
            $commentBox = $self.find('.cff-comments-box');

        $commentBox.each(function () {
            var $thisCommentBox = $(this);
            if ($thisCommentBox.is(':visible')) {
                var thisPostHeight = parseInt($thisCommentBox.closest('.cff_owl-item').eq(0).css('height'));
                commentsOpenHeights.push(thisPostHeight);
            }
        }).promise().done(function () { // wait for the heights of all of the open comments to be recorded before resetting the feed height
            if (commentsOpenHeights.length) {
                setTimeout(function () {
                    var greatestPostHeight = Math.max.apply(null, commentsOpenHeights);
                    $owlWrapperOuter.animate({
                        height: greatestPostHeight + 'px'
                    }, 400);
                }, 500);
            } else {
                $owlWrapperOuter.animate({
                    height: maxHeight + 'px'
                }, 400);
            }
        });
    }

    // gather and set user defined feed options from data attributes
    $(".cff-carousel").each(function () {

        var $self = $(this);

        //If it's an events feed then remove any events which don't need to be shown, otherwise it shows all of them
        $self.find('.cff-event').slice(parseInt($self.attr('data-pag-num'))).remove();

        var carouselHeightInput = $self.attr('data-cff-height'),
            carouselCols = $self.attr('data-cff-cols'),
            carouselMobileCols = $self.attr('data-cff-mobilecols'),
            carouselArrowsInput = $self.attr('data-cff-arrows'),
            carouselArrows = true,
            carouselPag = ($self.attr('data-cff-pag') == "true"),
            carouselTime = $self.attr('data-cff-interval'),
            afterUpdate = false,
            afterInit = cffShowCarousel,
            singleItem = false,
            autoHeight = false;

        //Remove the load more button
        $self.find('.cff-load-more, .cff-empty-album').remove();

        if (typeof carouselTime == 'undefined') {
            carouselTime = false;
        }
        if (carouselHeightInput === 'clickexpand') {
            afterUpdate = function () {
                cffUpdateSize($self);
            };
            afterInit = function () {
                cffUpdateSize($self);
                cffShowCarousel();
            };
        }
        function cffShowCarousel() {
            $self.css('visibility', 'visible');
        }
        //check if it's a photo only feed and if so set autoHeight to false
        if (carouselHeightInput === 'autoexpand' && $self.hasClass('cff-album-items-feed')) {
            singleItem = true; // the auto feed height setting requires single items
            autoHeight = false;
            carouselCols = 1;
            carouselMobileCols = 1;
        } else if (carouselHeightInput === 'autoexpand' && $self.hasClass('cff-timeline-feed')) {
            singleItem = true; // the auto feed height setting requires single items
            autoHeight = true;
            carouselCols = 1;
            carouselMobileCols = 1;
        }
        if (carouselArrowsInput === 'none') {
            carouselArrows = false;
        }

        window.cffCarouselSettings = {
            items: carouselCols,
            itemsDesktop: [1199, carouselCols],
            itemsDesktopSmall: false,
            itemsTablet: false,
            itemsTabletSmall: false,
            itemsMobile: [479, carouselMobileCols],
            navigation: carouselArrows,
            navigationText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
            pagination: carouselPag,
            autoPlay: carouselTime,
            stopOnHover: true,
            singleItem: singleItem,
            autoHeight: autoHeight,
            afterUpdate: afterUpdate,
            afterInit: afterInit
        };
        var evt = jQuery.Event('cffbeforecarousel');
        evt.$self = $self;
        jQuery(window).trigger(evt);

        // initialize the owl carousel feed
        $self.find('.cff-posts-wrap').cffOwlCarousel(window.cffCarouselSettings);

        // record the heights of all of the loaded posts
        var elementHeights = $self.find('.cff_owl-item').map(function () {
            return $(this).height();
        }).get();
        // record the greatest height of the loaded posts
        var maxHeight = Math.max.apply(null, elementHeights),
            $owlWrapperOuter = $self.find('.cff_owl-wrapper-outer'),
            $cffItem = $self.find('.cff-item'),
            moreClass = 'cff_carousel-more',
            lessClass = 'cff-carousel-less',
            moreText = '<i class="fa fa-plus"></i>',
            lessText = '<i class="fa fa-minus"></i>',
            moreHtml = '<a href="#" class="' + moreClass + '"><span>' + moreText + '</span></a>',
            $navElementsWrapper = $self.find('.cff_owl-buttons > div'),
            $commentsToggleElements = $self.find('.cff-view-comments, .cff-comment-replies a, .cff-show-more-comments a');

        // generate a button and give it the necessary functionality if the user selects expand on click for the feed height
        if (carouselHeightInput === 'clickexpand') {
            $owlWrapperOuter.after(moreHtml);
            $self.find('.cff_carousel-more').on('click', function (e) {
                e.preventDefault();
                var $thisMoreButton = $(this);
                if ($(this).hasClass(lessClass)) {
                    $owlWrapperOuter.animate({
                        height: minHeight + 'px'
                    }, 400);
                    $thisMoreButton.removeClass(lessClass).find('span').html(moreText);
                } else {
                    cffFeedHeightToggle(maxHeight, $self);
                    $thisMoreButton.addClass(lessClass).find('span').html(lessText);
                }
            });
        }

        // add some padding between posts if there are multiple columns
        if ((carouselCols > 1 && $(window).width() > 479) || (carouselMobileCols > 1 && $(window).width() < 480)) {
            $cffItem.each(function () {
                var $item = $(this);
                $item.css('padding', '0 10px');

                //If it has a boxed post style then add a class to apply spacing
                if ($item.hasClass('cff-box')) $item.closest('.cff_owl-item').addClass('cff-space');
            });
        }

        //If it has a shadow then add a class so can add some space around item
        if ($cffItem.hasClass('cff-shadow')) $cffItem.closest('.cff_owl-item').addClass('cff-space');

        // arrows are hidden on load and shown on hover for the arrows on hover option
        if (carouselArrowsInput === 'onhover') {
            $navElementsWrapper.addClass('onhover').hide();
            $self.on({
                mouseenter: function () {
                    $navElementsWrapper.fadeIn();
                },
                mouseleave: function () {
                    $navElementsWrapper.fadeOut();
                }
            });
        } else if (carouselArrowsInput === 'below') {
            $self.find('.cff_owl-controls').addClass('cff_carousel_arrows_pag');
            // Clone the original pagination so we can have one left and one right
            $('.cff_owl-buttons').clone(true).addClass('cff-left').prependTo($self.find('.cff_carousel_arrows_pag'));
        }

        // there are a few click events that affect the feed height
        $commentsToggleElements.on('click', function () {
            var $thisCommentElement = $(this);
            if (carouselHeightInput === 'autoexpand') {
                setTimeout(function () {
                    cffAutoHeightToggle($thisCommentElement, $self);
                }, 500);
            } else {
                if ($self.find('.cff_carousel-more').hasClass(lessClass)) {
                    setTimeout(function () {
                        cffFeedHeightToggle(maxHeight, $self);
                    }, 500);
                }
            }
        });

    });

})(jQuery);