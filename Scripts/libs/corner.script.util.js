

//滚动条插件
; (function ($) {

    var CornerSlide = function (element, options) {

        this.options = options;
        this.element = $(element);
        this.isActive = false;
        this.content = null, this.slide = null, this.slideBar = null;

        this.createSlide();
        this.show();

        this.element.on('mousewheel.slide', $.proxy(this.mousewheel, this));
        this.element.on('show.slide', $.proxy(this.show, this));
        this.element.on('mouseenter.slide', $.proxy(this.show, this));
        var that = this;
        this.element.on('DOMNodeInserted.slide DOMNodeRemoved.slide',
        //this.element.on('DOMNodeInserted.slide DOMNodeRemovedFromDocument.slide',
            function (e) {
                if (e.type == 'DOMNodeRemoved') {
                    //$.proxy(that.show, that);
                    window.setTimeout(function () {
                        that.show.call(that);
                        console.log('remove');
                    }, 1000);
                }
                if (e.type == 'DOMNodeInserted') {
                    $.proxy(that.show, that);
                    console.log('add');
                }
            });
        var axis = 'y';
        if (this.options.scrollType != 'vertical') {
            axis = 'x';
        }
        var $cornerSlide = this.element.children('.cornerSlide');
        $cornerSlide.find('.cornerBar').draggable({
            axis: axis,
            containment: $cornerSlide,
            drag: $.proxy(this.drag, this)
        });

        if (this.options.isAutoHide) {
            this.element.on('mouseleave.slide', $.proxy(this.hide, this));
        }

    }

    CornerSlide.prototype = {

        createSlide: function () {
            this.element.css('overflow', 'hidden');
            var children;
            if ((children = this.element.children()).length > 0) {
                children.wrapAll('<div class="cornerSlideContent"></div>');
            } else {
                this.element.append('<div class="cornerSlideContent"></div>');
            }
            this.content = this.element.children('.cornerSlideContent');
            var width = '100%';

            if (this.options.scrollType == 'herizontal') {
                var $child = this.content.children();
                width = $child[0].clientWidth;
            }

            this.content.css({
                'position': 'relative',
                'top': '0',
                'left': '0',
                'width': width,
                'height': 'auto',
                'overflow': 'hidden'
            });
            this.element.append('<div class="cornerSlide" style=""><div class="cornerBar"></div></div>');
            this.controlScrollBarStyle.call(this);
            this.controlBarColorStyle.call(this);
        },



        show: function () {
            var element = this.element,
                content = this.content,
                slide = this.slide,
                slideBar = this.slideBar;

            if (this.options.scrollType == 'vertical') {
                this.calculateScrollBarInfo(element, content, slide, slideBar);
            }
            else {
                this.calculateScrollBarInfoForH(element, content, slide, slideBar);
            }
        },

        /*计算滚动条的长度等信息  默认情况，竖直滚动条*/
        calculateScrollBarInfo: function (element, content, slide, slideBar) {
            if (content.height() > element.height()) {
                this.isActive = true;
                this.slide.show();
                //计算滚动条的高度
                var contentHeight = content[0].clientHeight,
                        clientHeight = element[0].clientHeight,
                        slideHeight = slide[0].clientHeight;
                var height = Math.max(clientHeight / contentHeight * slideHeight, this.options.minBarHeight);
                slideBar.css('height', height + 'px');
            } else {
                if (this.element.is(":visible")) {
                    this.isActive = false;
                    this.slide.hide();
                    this.content.css('top', '0');
                }
            }
        },

        /*水平滚动条*/
        calculateScrollBarInfoForH: function (element, content, slide, slideBar) {
            var cw = content.width(),
                ew = element.width();
            if (cw > ew) {
                this.isActive = true;
                this.slide.show();

                //计算滚动条的宽度
                var sw = slide.width();
                var w = Math.max(ew / cw * sw, this.options.minBarHeight);
                slideBar.css('width', w + 'px');
            } else {
                if (this.element.is(":visible")) {
                    this.isActive = false;
                    this.slide.hide();
                    this.content.css('left', '0');
                }
            }
        },

        /**鼠标滚动事件**/
        mousewheel: function (evt) {
            if (!this.isActive) return;
            var delta = evt.delta || evt.wheelDelta || (evt.originalEvent && evt.originalEvent.wheelDelta) || -evt.detail || (evt.originalEvent && -evt.originalEvent.detail);
            var stepHeight = this.options.stepHeight, top;

            var isVertical = this.options.scrollType == 'vertical';  //滚动条类型
            var styleFileName = 'top';
            if (!isVertical) {
                styleFileName = 'left';
            }
            if (delta < 0) { //up or left
                top = parseInt(this.content.css(styleFileName), 10) - stepHeight;
            } else {//down or right
                top = parseInt(this.content.css(styleFileName), 10) + stepHeight;
            }
            adjustPosition(this, top);
            evt.preventDefault();
            evt.stopPropagation();
        },

        /**拖动滚动条**/
        drag: function (evt) {
            evt.stopPropagation();
            var element = this.element, content = this.content, slide = this.slide;

            if (this.options.scrollType == 'vertical') {
                var contentHeight = content.height(), clientHeight = element.height(), slideHeight = slide.height();
                var top = parseInt($(evt.target).css("top"));
                if (top >= slideHeight - this.options.minBarHeight) {
                    this.scrollTop(contentHeight - clientHeight);
                } else {
                    var scrollTop = top / slideHeight * contentHeight;
                    this.scrollTop(scrollTop);
                }
            } else {
                var left = parseInt($(evt.target).css("left"));
                var cw = content.width(), ew = element.width(), sw = slide.width();
                if (left >= sw - this.options.minBarHeight) {
                    this.scrollTop(cw - ew);
                } else {
                    var scrollLeft = left / sw * cw;
                    this.scrollTop(scrollLeft);
                }
            }

        },

        hide: function () {
            if (this.isActive) {
                this.slide.hide();
            }
        },

        clear: function () {
            this.element.off('mousewheel.slide');
            this.element.off('show.slide');
            this.element.off('mouseenter.slide');
            this.element.off('DOMNodeInserted.slide');
            this.element.off('DOMNodeRemoved.slide');
            this.element.off('mouseleave.slide');
            this.element.find(".cornerBar").draggable("destroy");
            this.slide.remove();
        },

        scrollTop: function (top) {
            if (!this.isActive) return;
            top = -Math.abs(parseInt(top, 10) || 0);
            adjustPosition(this, top);
        },

        toBottom: function () {
            if (!this.isActive || this.element.is(":hidden")) return;
            var top = this.element.height() - this.content.height();
            adjustPosition(this, top);
        },

        toTop: function () {
            if (!this.isActive) return;
            adjustPosition(this, 0);
        },

        /*获得当前的滚动距离*/
        getCurrentScrollValue: function () {
            return this.content.position().top;
        },

        /*获得当前滚动条的最大长度*/
        getScrollMaxLength: function () {
            return (this.content.height() - this.element.height());
        },

        /*
        *在当前的基础上进行滚动
        *Parameters:
        *diff - {int} 进行调整的差值，正数 向上滚动，负数 为了向下滚动
        */
        scroollByDiff: function (diff) {
            diff = diff[0];
            var newTop = parseFloat(this.getCurrentScrollValue()) + parseFloat(diff);
            adjustPosition(this, newTop);
        },


        //滚动条颜色更改
        changeSlideBarStyle: function (myArguments) {
            var color = myArguments[0],
                bgColor = myArguments[1];
            if (!color) {
                color = '#dcdcdc';
            }
            if (!bgColor) {
                bgColor = '#c0c0c0';
            }
            this.options.slideColor = color;
            this.options.slideBarColor = bgColor;
            this.controlBarStyle();
        },

        /*滚动条样式*/
        controlScrollBarStyle: function () {
            var options = this.options;
            this.slide = this.element.children('.cornerSlide');
            this.slideBar = this.slide.find('.cornerBar');
            //竖直滚动条
            if (this.options.scrollType == 'vertical') {
                this.slide.css({
                    'position': 'absolute',
                    'top': '0',
                    'bottom': '0',
                    'right': '0',
                    'width': options.slideWidth,
                    'background-color': options.slideColor,
                    'z-index': '6000',
                    'border-radius': '4px',
                    'display': 'none',
                    'overflow': 'hidden'
                });
                this.slideBar.css({
                    'position': 'absolute',
                    'top': '0',
                    'left': '0',
                    'width': options.slideWidth,
                    'height': options.minBarHeight,
                    'background-color': options.slideBarColor,
                    'border-radius': '4px',
                    'cursor': 'pointer'
                });
            }
                //水平滚动条
            else {
                this.slide.css({
                    'position': 'absolute',
                    'bottom': '0',
                    'left': '0',
                    'right': '0',
                    'height': options.slideWidth,
                    'background-color': options.slideColor,
                    'z-index': '6000',
                    'border-radius': '4px',
                    'display': 'none',
                    'overflow': 'hidden'
                });
                this.slideBar.css({
                    'position': 'absolute',
                    'bottom': '0',
                    'left': '0',
                    'right': '0',
                    'height': options.slideWidth,
                    'width': options.minBarHeight,
                    'background-color': options.slideBarColor,
                    'border-radius': '4px',
                    'cursor': 'pointer'
                });
            }
        },


        controlBarColorStyle: function () {
            var options = this.options;
            this.element.children('.cornerSlide').css({ 'background-color': options.slideColor });
            this.slide.find('.cornerBar').css({ 'background-color': options.slideBarColor });
        },

    };

    //私有方法
    //这里top为div的top属性值，为负数
    function adjustPosition(context, value) {
        var obj = {
            minBarHeight: context.options.minBarHeight,
            element: context.element,
            content: context.content,
            slide: context.slide,
            slideBar: context.slideBar
        };
        if (context.options.scrollType == 'vertical') {
            scrollContainer(context, obj, value);
        }
        else {
            scrollContainerForH(context, obj, value);
        }
    };


    /*竖直滚动*/
    function scrollContainer(context, obj, top) {
        var contentHeight = obj.content.height(),
            clientHeight = obj.element.height(),
            slideHeight = obj.slide.height();
        top = parseInt(top) || 0;
        var diffHeight = clientHeight - contentHeight;
        //底部
        if (top < diffHeight) {
            context.options.bottomCallBack();
        }
        //顶部
        if (top > 0) {
            context.options.topCallBack(function () {
                var newDiffHeight = clientHeight - content.height();
                top = newDiffHeight - diffHeight;
                content.css('top', top + 'px');
                var barTop = Math.min(Math.abs(top) / contentHeight * slideHeight, slideHeight - height);
                slideBar.css({ 'top': barTop + 'px', 'height': height + 'px' });
                return;
            });
        }
        top = Math.max(clientHeight - contentHeight, top);
        top = Math.min(0, top);
        obj.content.css('top', top + 'px');
        var height = Math.max(clientHeight / contentHeight * slideHeight, obj.minBarHeight);
        var barTop = Math.min(Math.abs(top) / contentHeight * slideHeight, slideHeight - height);
        obj.slideBar.css({ 'top': barTop + 'px', 'height': height + 'px' });
    }

    /*水平滚动*/
    function scrollContainerForH(context, obj, left) {
        var cw = obj.content.width(),
            ew = obj.element.width(),
            sw = obj.slide.width();
        left = parseInt(left) || 0;
        if (left < ew - cw) {
            context.options.bottomCallBack();
        }
        if (left > 0) {
            context.options.topCallBack();
        }
        left = Math.max(ew - cw, left);
        left = Math.min(0, left);
        obj.content.css('left', left + 'px');
        var w = Math.max(ew / cw * sw, obj.minBarHeight);
        var newLeft = Math.min(Math.abs(left) / cw * sw, sw - w);
        obj.slideBar.css({ 'left': newLeft + 'px', 'width': w + 'px' });
    }




    $.fn.cornerSlide = function (option) {

        if (this.length == 0) {
            return;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        var innerReturn;

        var slideDefault = {
            /*滚动条的类型 水平（horizontal）、竖直(vertical) */
            scrollType: 'vertical',
            minBarHeight: 25,
            hideSlideBarAtFirst: false,
            slideWidth: 8,
            stepHeight: 40,
            slideColor: '#dcdcdc',
            slideBarColor: '#c0c0c0',
            isAutoHide: true, //离开后是否自动隐藏
            topCallBack: $.noop,  //滚动到顶部的回调
            bottomCallBack: $.noop,  //滚动到底部的回调
        };

        this.each(function () {
            var $this = $(this),
                data = $this.data('cornerslide'),
                options = typeof option == 'object' ? option : {};

            if (!data) {
                $this.data('cornerslide', data = new CornerSlide(this, $.extend(slideDefault, options)));
            }
            if (typeof option == 'string' && typeof data[option] == 'function') {
                innerReturn = data[option].call(data, args);
            }
        });

        if (innerReturn !== undefined)
            return innerReturn;
        else
            return this;
    };

})(jQuery);





