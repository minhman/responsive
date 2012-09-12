; (function ($) {
    $.jQueryAdaptive960 = function (el, options) {
        var defaultOptions = {
            ranges: [
            '0px    to 760px  = mobile.min.css',
            '760px  to 980px  = 720.min.css',
            '980px            = 960.min.css'
            ],
            path: 'css/',
            onResize: function () { },
            onRotate: function () { }
        }
        // console.log(defaultOptions.ranges[2]);
        // save the element
        var pluginElement = el;

        var jQuery960 = this;

        var init = function () {
            if (options) {
                jQuery960.settings = $.extend(defaultOptions, options);
            }
            else {
                jQuery960.settings = options;
            }

            if (pluginElement.addEventListener) {
                pluginElement.addEventListener('resize', reactiveDisplay, false);

                if (pluginElement.onorientationchange) {
                    pluginElement.addEventListener('orientationchange', rotateDisplay, false);
                }

                setTimeout(checkDisplayOrientation, 1000);
            }
            else if (pluginElement.attachEvent) {
                // old ie support and there is no support for orientation
                pluginElement.attachEvent('onresize', reactiveDisplay);
            }
            else {
                // definitely no orientation support
                pluginElement.onresize = reactiveDisplay;
            }

            adaptDisplay();
        }

        var url, urlOld, timer, timerOrientation;

        var css = el.document.createElement('link');
        css.rel = 'stylesheet';

        var orientation = 0;

        var adaptDisplay = function () {
            clearTimeout(timer);

            var item, range, val_1, val_2, is_range, cssFile;

            var rangeLen = defaultOptions.ranges.length;
            var index = rangeLen;

            var width = pluginElement.innerWidth || pluginElement.document.documentElement.clientWidth || pluginElement.document.body.clientWidth || 0;

            while (index--) {
                item = defaultOptions.ranges[index].split('=');

                range = item[0];
                cssFile = item[1] ? item[1].replace(/\s/g, '') : index;

                is_range = range.match('to');

                val_1 = is_range ? parseInt(range.split('to')[0], 10) : parseInt(range, 10);
                val_2 = is_range ? parseInt(range.split('to')[1], 10) : undefined;

                if ((!val_2 && index === (rangeLen - 1) && width > val_1) || (width > val_1 && width <= val_2)) {
                    url = defaultOptions.path + cssFile;
                    break;
                }
                else {
                    url = '';
                }
            }

            if (urlOld) {
                css.href = url;
                urlOld = url;
            }
            else {
                css.href = url;
                urlOld = url;

                (pluginElement.document.head || pluginElement.document.getElementsByTagName('head')[0]).appendChild(css);
            }
        }

        var reactiveDisplay = function () {
            clearTimeout(timer);
            defaultOptions.onResize();
            timer = setTimeout(adaptDisplay, 50);
        }

        var checkDisplayOrientation = function () {
            if (pluginElement.orientation) {
                var newOrientation = pluginElement.orientation;
                if (newOrientation != orientation) {
                    orientation = newOrientation;

                    defaultOptions.onRotate(orientation);
                }
            }
        }

        var rotateDisplay = function () {
            var newOrientation = pluginElement.orientation;
            if (newOrientation != orientation) {
                orientation = newOrientation;

                clearTimeout(timer);
                timer = setTimeout(adaptDisplay, 50);
            }

            defaultOptions.onRotate(orientation);
        }

        init();
    }
})(jQuery);    
