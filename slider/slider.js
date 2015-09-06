;
(function(window, document, $) {

    $.fn.slider = function() {
        new Slider(this);
        return this;
    }

    function Slider(container) {
        this.container = container;
        this.init();
    }

    Slider.prototype = {
        init: function() {
            var self = this,
                url = window.location.href;
            var sliderDoms = self.container.find('.slider');
            var sliders = []
            for (var i = 0; i < sliderDoms.length; i++) {
                var dom = sliderDoms[i],
                    id = self.sid();
                dom.id = id;
                sliders.push({
                    id: id
                })
            }
            self.sliders = sliders;
            self.count = sliders.length;
            var pos = url.indexOf('#');
            if (pos > -1) {
                $('.slider').removeClass('current');
                $(url.substr(pos)).addClass('current');
                self.current = parseInt(url.substr(pos + 1));
            } else {
                self.current = 1;
            }
            self.showPage();
            window.sliderInstance = self;
        },
        sid: (function(id) {
            return function() {
                return id++;
            }
        })(1),
        goto: function(index) {
            var self = this,
                url = window.location.href;

            if (url.indexOf('#') > -1) {
                window.location.href = url.replace(/#.*/, '#' + index);
            } else {
                window.location.href = url + '#' + index;
            }
            $('#' + self.sliders[self.current - 1].id).removeClass('current');
            $('#' + self.sliders[index - 1].id).addClass('current');
            self.current = index;
            self.showPage();
        },
        pre: function() {
            if (this.current > 1) {
                this.goto(this.current - 1);
            } else {
                alert('已经是第一页');
            }
        },
        next: function() {
            if (this.current < this.count) {
                this.goto(this.current + 1);
            } else {
                alert('播放结束，谢谢观看！');
            }
        },
        showPage: function() {
            var self = this,
                $page = $('#slider_page');
            if ($page.length === 0) {
                $('<p id="slider_page">' + self.current + ' / ' + self.count + '</p>').appendTo($(self.container));
            } else {
                $page.html(self.current + ' / ' + self.count);
            }
        }
    }
    $(document).on('keydown', function(key) {
        var kc = key.keyCode;
        var slider = window.sliderInstance;
        if (kc === 37 || kc === 38) {
            slider.pre();
        } else if (kc === 39 || kc === 40) {
            slider.next();
        }
    })

    function mousewheel(e, delta) {
        var slider = window.sliderInstance;
        delta < 0 ? slider.pre() : slider.next();
    }
    if (document.attachEvent) {
        document.attachEvent("onmousewheel", function(e) {
            mousewheel(e, -e.wheelDelta)
        });
    } else if (document.addEventListener) {
        document.addEventListener("DOMMouseScroll", function(e) {
            mousewheel(e, e.detail)
        }, false);
        document.addEventListener("mousewheel", function(e) {
            mousewheel(e, -e.wheelDelta)
        }, false);
    }

})(window, document, jQuery)
