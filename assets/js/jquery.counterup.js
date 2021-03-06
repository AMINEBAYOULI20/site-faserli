! function(t) {
    "use strict";
    t.fn.counterUp = function(e) {
        var a, n = t.extend({
            time: 400,
            delay: 10,
            formatter: !1,
            callback: function() {}
        }, e);
        return this.each(function() {
            var e = t(this),
                r = {
                    time: t(this).data("counterup-time") || n.time,
                    delay: t(this).data("counterup-delay") || n.delay
                },
                u = function() {
                    var t = [],
                        u = r.time / r.delay,
                        o = e.text(),
                        i = /[0-9]+,[0-9]+/.test(o);
                    o = o.replace(/,/g, "");
                    var c = (o.split(".")[1] || []).length,
                        s = /[0-9]+:[0-9]+:[0-9]+/.test(o);
                    if (s) {
                        var l = o.split(":"),
                            f = 1;
                        for (a = 0; l.length > 0;) a += f * parseInt(l.pop(), 10), f *= 60
                    }
                    for (var d = u; d >= 1; d--) {
                        var p = parseFloat(o / u * d).toFixed(c);
                        if (s) {
                            p = parseInt(a / u * d);
                            var m = parseInt(p / 3600) % 24,
                                h = parseInt(p / 60) % 60,
                                y = parseInt(p % 60, 10);
                            p = (10 > m ? "0" + m : m) + ":" + (10 > h ? "0" + h : h) + ":" + (10 > y ? "0" + y : y)
                        }
                        if (i)
                            for (;
                                /(\d+)(\d{3})/.test(p.toString());) p = p.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                        n.formatter && (p = n.formatter.call(this, p)), t.unshift(p)
                    }
                    e.data("counterup-nums", t), e.text("0");
                    var v = function() {
                        e.html(e.data("counterup-nums").shift()), e.data("counterup-nums").length ? setTimeout(e.data("counterup-func"), r.delay) : (e.data("counterup-nums", null), e.data("counterup-func", null), n.callback.call(this))
                    };
                    e.data("counterup-func", v), setTimeout(e.data("counterup-func"), r.delay)
                };
            e.waypoint(function(t) {
                u(), this.destroy()
            }, {
                offset: "100%"
            })
        })
    }
}(jQuery);