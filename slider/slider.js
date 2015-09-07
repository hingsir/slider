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
            var slideDoms = self.container.find('.slide');
            var slides = []
            for (var i = 0; i < slideDoms.length; i++) {
                var dom = slideDoms[i],
                    id = self.sid();
                dom.id = id;
                slides.push({
                    id: id
                })
            }
            self.slides = slides;
            self.count = slides.length;
            var pos = url.indexOf('#');
            if (pos > -1) {
                $('.slide').removeClass('current');
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
            $('#' + self.slides[self.current - 1].id).removeClass('current');
            $('#' + self.slides[index - 1].id).addClass('current');
            self.current = index;
            self.showPage();
        },
        pre: function() {
            if (this.current > 1) {
                this.goto(this.current - 1);
            } else {
                alert('前面木有了 (┬＿┬)');
            }
        },
        next: function() {
            if (this.current < this.count) {
                this.goto(this.current + 1);
            } else {
                alert('播放结束，唔该晒！');
            }
        },
        showPage: function() {
            var self = this,
                $page = $('#slide_page');
            if ($page.length === 0) {
                $('<p id="slide_page">' + self.current + ' / ' + self.count + '</p>').appendTo($(self.container));
            } else {
                $page.html(self.current + ' / ' + self.count);
            }
        }
    }
    $(document).on('keydown', function(key) {
        var kc = key.keyCode;
        var slider = window.sliderInstance;
        /*if (kc === 37 || kc === 38) {
            slider.pre();
        } else if (kc === 39 || kc === 40) {
            slider.next();
        }*/
        if (kc === 38) {
            slider.pre();
        } else if (kc === 40) {
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
