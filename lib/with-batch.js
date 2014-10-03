define(function (require) {
    'use strict';

    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    var queue = [];
    function go() {
        while (queue.length) {
            queue.shift().call(queue.shift());
        }
    }

    return function withBatchedUpdates() {
        this.batch = function (fn) {
            var len = queue.length;
            queue.push(fn, this);
            if (!len) {
                window.requestAnimationFrame(go);
            }
        };
        this.batchify = function (method) {
            var ctx = this;
            if (!ctx[method]) {
                throw new Error('No method called ' + method);
            }
            return function () {
                return ctx.batch(ctx[method]);
            };
        };
    };
});
