/*
 * Copyright 2007  Google, Inc.
 * All Rights Reserved.
 */

var _dbmode = false;
function Ic(a, b)
{
    return"Added " + a + " on " + b + "."
}
function Jc(a, b, c)
{
    return"Added " + a + " on " + b + " at " + c + "."
}
;
function Kb(a, b, c)
{
    return a + ":" + b + c
}
function Ua(a, b)
{
    return a + " " + b
}
var Kc = Ua;
var Pc = Ua;
function Oc(a, b)
{
    var c = undefined == a ? "??" : "" + a;
    if (c.length < 2)
    {
        c = "0" + c
    }
    var d = undefined != b ? (b < 10 ? "0" : "") + b : "??";
    return c + ":" + d
}
function Lc(a, b)
{
    var c = a < 12 ? "am" : "pm",d = undefined == a ? "??" : "" + (a % 12 || 12),f = undefined != b ? (b < 10 ? "0" : "")
            + b : "??";
    return Kb(d, f, c)
}
function Mc(a, b)
{
    var c = a < 12 ? "" : "p",d = undefined == a ? "??" : "" + (a % 12 || 12),f = undefined != b ? (b < 10 ? "0" : "") + b :
                                                                                  "??";
    return Kb(d, f, c)
}
function Nc(a)
{
    var b = a < 12 ? "" : "p",c = undefined == a ? "??" : "" + (a % 12 || 12);
    return c + "" + b
}
;
;
var nb = ["S","M","T","W","T","F","S"],Ta = [,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],qa = [,"January","February","March","April","May","June","July","August","September","October","November","December"];
function _MSG_DayOfWeekMask(a)
{
    var b = 0;
    for (var c = 0; c < a.length; ++c)
    {
        b |= 1 << a[c]
    }
    return b
}
;
var ha,qd,rd,sd,Vb,ia,Wb,na,ud,Xb,jb,td,_isMSIE,_isWin,_isMac,_isMoz;
function ed()
{
    _isMSIE = ha;
    _isWin = Xb;
    _isMac = jb;
    _isMoz = na
}
(function()
{
    var a = navigator.userAgent.toLowerCase();
    ha = a.indexOf("msie") != -1;
    qd = a.indexOf("msie 5") != -1 && document.all;
    rd = a.indexOf("msie 6") != -1 && document.all;
    sd = a.indexOf("msie 7") != -1 && document.all;
    Vb = a.indexOf("konqueror") != -1;
    ia = a.indexOf("safari") != -1 || Vb;
    var b = a.match(/ AppleWebKit\/(\d+)/);
    Wb = b && parseInt(b[1], 10) >= 500;
    na = !ha && !ia && a.indexOf("mozilla") != -1;
    ud = !(!window.opera);
    var c = navigator.appVersion;
    jb = c.indexOf("Mac") != -1;
    Xb = (c.indexOf("Win") != -1 || c.indexOf("NT") != -1) && !jb;
    td = a.indexOf("linux") != -1;
    ed()
})();
function Fa(a, b)
{
}
;
var Zc = /&/g,vd = /</g,md = />/g;
function ea(a)
{
    if (!a)return"";
    return a.replace(Zc, "&amp;").replace(vd, "&lt;").replace(md, "&gt;").replace(Cd, "&quot;")
}
function Ia(a)
{
    if (!a)return"";
    return a.replace(/&#(\d+);/g, function(b, c)
    {
        return String.fromCharCode(parseInt(c, 10))
    }).replace(/&#x([a-f0-9]+);/gi, function(b, c)
    {
        return String.fromCharCode(parseInt(c, 16))
    }).replace(/&(\w+);/g, function(b, c)
    {
        c = c.toLowerCase();
        return c in Ia.unesc ? Ia.unesc[c] : "?"
    })
}
Ia.unesc = {lt:"<",gt:">",quot:'"',nbsp:" ",amp:"&"};
var Cd = /\"/g;
var Dc = new RegExp("" + ["[\\\\'\r\n\u0008\"<>&\u0085\u2028\u2029]"], "g");
function ua(a)
{
    return ua.xc[a]
}
function Xa(a)
{
    if (!ua.xc)
    {
        var b = {};
        b["\\"] = "\\\\";
        b["'"] = "\\047";
        b["\u0008"] = "\\b";
        b['"'] = "\\042";
        b["<"] = "\\074";
        b[">"] = "\\076";
        b["&"] = "\\046";
        b["\n"] = "\\n";
        b["\r"] = "\\r";
        b["\u0085"] = "\\205";
        b["\u2028"] = "\\u2028";
        b["\u2029"] = "\\u2029";
        ua.xc = b
    }
    return"'" + a.toString().replace(Dc, ua) + "'"
}
var ob;
if ("".Ia)
{
    ob = function(a, b)
    {
        return a.toLowerCase().Ia(b.toLowerCase())
    }
}
else
{
    ob = function(a, b)
    {
        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a < b)
        {
            return-1
        }
        else if (a === b)
        {
            return 0
        }
        else
        {
            return 1
        }
    }
}
function Sc(a, b, c)
{
    if (Ma(b.selectionEnd) && Ma(b.selectionStart))
    {
        b.selectionStart = c;
        b.selectionEnd = c
    }
    else if (a.document.selection && b.createTextRange)
    {
        var d = b.createTextRange();
        d.collapse(true);
        d.move("character", c);
        d.select()
    }
}
function Ma(a)
{
    return typeof a != "undefined"
}
function Bc(a)
{
    var b;
    if (a.type === "keypress")
    {
        if (ha)
        {
            b = a.keyCode
        }
        else if (na)
        {
            b = a.which;
            if (b)
            {
            }
            else
            {
                b = a.keyCode
            }
        }
        else
        {
            return a.keyCode || a.which
        }
    }
    else
    {
        if (a.keyCode)
        {
            b = a.keyCode
        }
        else if (a.which)
        {
            b = a.which
        }
    }
    return b
}
function id(a)
{
    return document.getElementById(a)
}
function jd(a)
{
    return document.all[a]
}
var s = document.getElementById ? id : jd;
function Ha(a)
{
    var b;
    if (!("name"in a))
    {
        var c = /\W*function\s+([\w\$]+)\(/.exec(a);
        if (!c)
        {
            throw new Error("Cannot extract name from function: " + a);
        }
        b = c[1];
        a.name = b
    }
    else
    {
        b = a.name
    }
    if (!b || b == "anonymous")
    {
        throw new Error("Anonymous function has no name: " + a);
    }
    return b in document.documentElement ? "window." + b : b
}
function ac(a)
{
}
function _showLogWindow()
{
}
function Tc(a)
{
    var b = typeof a === "string" ? s(a) : a;
    if (b)
    {
        try
        {
            b.focus();
            if (b.tagName == "INPUT" && (b.type == "text" || b.type == "password"))
            {
                Sc(window, b, 0)
            }
        }
        catch(c)
        {
        }
    }
}
function _getVarZHtml()
{
}
function _showVarZWindow()
{
}
;
var Rb;
if (Date.now)
{
    Rb = Date.now
}
else
{
    Rb = function()
    {
        return(new Date).getTime()
    }
}
;
var rb = false;
function xc(a)
{
    try
    {
        throw a;
    }
    catch(b)
    {
        tb(b)
    }
}
function tb(a, b)
{
    var c = "Javascript exception: " + (b ? b : "") + " " + a;
    if (ha)
    {
        c += " " + a.name + ": " + a.message + " (" + a.number + ")"
    }
    var d = "";
    if (typeof a == "string")
    {
        d = a + "\n"
    }
    else
    {
        for (var f in a)
        {
            try
            {
                d += f + ": " + a[f] + "\n"
            }
            catch(g)
            {
            }
        }
    }
    d += pb(tb.caller);
    qc(c + "\n" + d, 1)
}
var kd = /function (\w+)/;
function oc(a)
{
    var b = kd.exec(String(a));
    if (b)
    {
        return b[1]
    }
    return""
}
function pb(a)
{
    try
    {
        if (na)
        {
            return Error().stack
        }
        if (!a)return"";
        var b = "- " + oc(a) + "(";
        for (var c = 0; c < a.arguments.length; c++)
        {
            if (c > 0)b += ", ";
            var d = String(a.arguments[c]);
            if (d.length > 40)
            {
                d = d.substr(0, 40) + "..."
            }
            b += d
        }
        b += ")\n";
        b += pb(a.caller);
        return b
    }
    catch(f)
    {
        return"[Cannot get stack trace]: " + f + "\n"
    }
}
var rc;
var Q = null,Ga = false;
function pc()
{
    if ((Q == null || Q.closed) && !Ga)
    {
        try
        {
            Ga = true;
            Q = window.open("", "debug", "width=700,height=500,toolbar=no,resizable=yes,scrollbars=yes,left=16,top=16,screenx=16,screeny=16");
            Q.blur();
            Q.document.open();
            Ga = false;
            var a = "<font color=#ff0000><b>To turn off this debugging window,hit 'D' inside the main caribou window, then close this window.</b></font><br>";
            qb(a)
        }
        catch(b)
        {
        }
    }
}
function qc(a, b)
{
    if (!rb)
    {
        if (typeof ac != "undefined")
        {
            ac(ea(a))
        }
        return
    }
    try
    {
        var c = (new Date).getTime() - rc,d = "[" + c + "] " + ea(a).replace(/\n/g, "<br>") + "<br>";
        if (b == 1)
        {
            d = "<font color=#ff0000><b>Error: " + d + "</b></font>";
            Q.focus()
        }
        qb(d)
    }
    catch(f)
    {
    }
}
function qb(a)
{
    if (!rb)
    {
        return
    }
    try
    {
        pc();
        Q.document.write(a);
        Q.scrollTo(0, 1000000)
    }
    catch(b)
    {
    }
}
;
function fa(a)
{
    return a < 0 ? -1 : 1
}
function sa(a)
{
    return a | 0
}
function Cb(a)
{
    xc(a);
    throw a;
}
function w(a, b)
{
    var c = a.toString();
    while (c.length < b)
    {
        c = "0" + c
    }
    return c
}
var La = [undefined,31,undefined,31,30,31,30,31,31,30,31,30,31];
function N(a, b)
{
    if (2 !== b)
    {
        return La[b]
    }
    var c = a << 4,d = La[c];
    if (!d)
    {
        d = Math.round((Date.UTC(a, 2, 1) - Date.UTC(a, 1, 1)) / 86400000);
        La[c] = d
    }
    return d
}
var Db = {};
function Cc(a, b)
{
    var c = a << 4 | b,d = Db[c];
    if (!d)
    {
        d = (new Date(a, b - 1, 1, 0, 0, 0, 0)).getDay();
        Db[c] = d
    }
    return d
}
function ra(a)
{
    return(a.date - 1 + Cc(a.year, a.month)) % 7
}
function Ab(a, b, c, d, f, g)
{
    var h;
    if (a === d)
    {
        if ((h = b - f) === 0)
        {
            return c - g
        }
        else if (h < 0)
        {
            h = c - g;
            do{
                h -= N(a, b++)
            }
            while (b < f);
            return h
        }
        else
        {
            h = c - g;
            do{
                h += N(d, f++)
            }
            while (f < b);
            return h
        }
    }
    else
    {
        return Math.round((Date.UTC(a, b - 1, c) - Date.UTC(d, f - 1, g)) / 86400000)
    }
}
function Bb(a, b)
{
    return Ab(a.year, a.month, a.date, b.year, b.month, b.date)
}
function H(a, b, c, d, f, g)
{
    if (!isNaN(a))
    {
        this.year = a
    }
    if (!isNaN(b))
    {
        this.month = b
    }
    if (!isNaN(c))
    {
        this.date = c
    }
    if (!isNaN(d))
    {
        this.hour = d
    }
    if (!isNaN(f))
    {
        this.minute = f
    }
    if (!isNaN(g))
    {
        this.second = g
    }
}
H.prototype.year = NaN;
H.prototype.month = NaN;
H.prototype.date = NaN;
H.prototype.hour = NaN;
H.prototype.minute = NaN;
H.prototype.second = NaN;
H.prototype.bb = function()
{
    return ra(this)
};
H.prototype.toString = function()
{
    if (this.C !== undefined)return this.C;
    this.C = this.n();
    return this.C
};
function W()
{
}
W.prototype = new H;
W.prototype.constructor = W;
function o(a, b, c)
{
    this.year = a;
    this.month = b;
    this.date = c;
    this.l = Ja(a, b, c)
}
o.prototype = new W;
o.prototype.constructor = o;
o.now = function()
{
    var a = new Date;
    return o.create(a.getFullYear(), a.getMonth() + 1, a.getDate())
};
o.prototype.type = "Date";
o.prototype.b = function()
{
    return this
};
o.prototype.D = function()
{
    return new v(this.year, this.month, this.date, 0, 0, 0)
};
o.prototype.a = function()
{
    return this.l
};
function Ja(a, b, c)
{
    return(((a - 1970) * 12 + b << 5) + c) * 86400
}
o.prototype.z = function()
{
    return true
};
o.prototype.n = function()
{
    return w(this.year, 4).concat(w(this.month, 2), w(this.date, 2))
};
o.prototype.equals = function(a)
{
    return this.constructor === a.constructor && this.date === a.date && this.month === a.month && this.year === a.year
};
o.Va = {};
o.nd = 0;
o.fd = 200;
o.create = function(a, b, c)
{
    var d = Ja(a, b, c);
    if (d in o.Va)
    {
        return o.Va[d]
    }
    else
    {
        var f = new o(a, b, c);
        f.l = d;
        if (o.nd < o.fd)
        {
            o.Va[d] = f
        }
        return f
    }
};
function v(a, b, c, d, f, g)
{
    Fa(!isNaN(g));
    this.year = a;
    this.month = b;
    this.date = c;
    this.hour = d;
    this.minute = f;
    this.second = g
}
v.prototype = new W;
v.prototype.constructor = v;
v.now = function()
{
    var a = new Date;
    return new v(a.getFullYear(), a.getMonth() + 1, a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds())
};
v.nowInLocalTime = function(a)
{
    var b = new Date;
    return v.convertToTimeZone(b, a)
};
v.convertToTimeZone = function(a, b)
{
    var c = a.getTime() + a.getTimezoneOffset() * 60 * 1000,d = c + b,f = new Date(d);
    return new v(f.getFullYear(), f.getMonth() + 1, f.getDate(), f.getHours(), f.getMinutes(), f.getSeconds())
};
v.prototype.type = "DateTime";
v.prototype.b = function()
{
    return o.create(this.year, this.month, this.date)
};
v.prototype.D = function()
{
    return this
};
v.prototype.pa = function()
{
    return new M(this.hour, this.minute, this.second)
};
v.prototype.a = function()
{
    if (undefined === this.l)
    {
        this.l = (((((this.year - 1970) * 12 + this.month << 5) + this.date) * 24 + this.hour) * 60 + this.minute) * 60
                + this.second
    }
    return this.l
};
v.prototype.z = function()
{
    return true
};
v.prototype.n = function()
{
    return w(this.year, 4).concat(w(this.month, 2), w(this.date, 2), "T", w(this.hour, 2), w(this.minute, 2), w(this.second, 2))
};
v.prototype.equals = function(a)
{
    return this.constructor === a.constructor && this.date === a.date && this.month === a.month && this.year === a.year
            && this.hour === a.hour && this.minute === a.minute && this.second === a.second
};
v.prototype.clone = function()
{
    var a = new v(this.year, this.month, this.date, this.hour, this.minute, this.second);
    if (this.C !== undefined)a.C = this.C;
    return a
};
function M(a, b, c)
{
    H.call(this, NaN, NaN, NaN, a, b, c)
}
M.prototype = new H;
M.prototype.constructor = M;
M.prototype.type = "Time";
M.prototype.pa = function()
{
    return this
};
M.prototype.n = function()
{
    return"T" + w(this.hour, 2) + w(this.minute, 2) + w(this.second, 2)
};
M.prototype.equals = function(a)
{
    return this.constructor === a.constructor && this.hour === a.hour && this.minute === a.minute && this.second === a.second
};
M.prototype.a = function()
{
    return(this.hour * 60 + this.minute) * 60 + this.second
};
function I(a, b, c, d)
{
    var f = d + 60 * (c + 60 * (b + 24 * a)),g = sa(f / 86400);
    f -= g * 86400;
    var h = sa(f / 3600);
    f -= h * 3600;
    var i = sa(f / 60);
    f -= i * 60;
    var j = sa(f);
    H.call(this, NaN, NaN, g, h, i, j)
}
I.prototype = new H;
I.prototype.constructor = I;
I.prototype.type = "Duration";
I.prototype.Ge = function()
{
    return this.date
};
I.prototype.He = function()
{
    return this.date * 24 + this.hour
};
I.prototype.Ie = function()
{
    return 1440 * this.date + this.hour * 60 + this.minute
};
I.prototype.Je = function()
{
    return this.second + this.minute * 60 + this.hour * 3600 + 86400 * this.date
};
I.prototype.a = function()
{
    if (undefined === this.l)
    {
        this.l = ((this.date * 24 + this.hour) * 60 + this.minute) * 60 + this.second
    }
    return this.l
};
I.prototype.n = function()
{
    var a = this.year ? fa(this.year) : (this.month ? fa(this.month) : (this.date ? fa(this.date) : (this.hour ? fa(this.hour) :
                                                                                                     (this.minute ? fa(this.minute) :
                                                                                                      (this.second ? fa(this.second) :
                                                                                                       0))))),b = a < 0 ?
                                                                                                                  "-P" :
                                                                                                                  "P";
    if (this.year)
    {
        b += a * this.year + "Y"
    }
    if (this.month)
    {
        b += a * this.month + "N"
    }
    if (this.date)
    {
        b += this.date % 7 ? a * this.date + "D" : a * this.date / 7 + "W"
    }
    if (this.hour || this.minute || this.second)
    {
        b += "T"
    }
    if (this.hour)
    {
        b += a * this.hour + "H"
    }
    if (this.minute)
    {
        b += a * this.minute + "M"
    }
    if (this.second)
    {
        b += a * this.second + "S"
    }
    if (!a)
    {
        b += "0D"
    }
    return b
};
I.prototype.equals = function(a)
{
    return this.constructor === a.constructor && this.date === a.date && this.hour === a.hour && this.minute === a.minute
            && this.second === a.second
};
function J(a)
{
    var b = new t;
    b.year = a.year || 0;
    b.month = a.month || 0;
    b.date = a.date || 0;
    b.hour = a.hour || 0;
    b.minute = a.minute || 0;
    b.second = a.second || 0;
    return b
}
function Ca(a, b, c)
{
    Fa(!(isNaN(a) | isNaN(b) | isNaN(c)));
    var d = new t;
    d.year = a || 0;
    d.month = b || 0;
    d.date = c || 0;
    return d
}
function t()
{
}
t.prototype = new H;
t.prototype.constructor = t;
t.prototype.type = "DTBuilder";
t.prototype.year = (t.prototype.month = (t.prototype.date = (t.prototype.hour = (t.prototype.minute = (t.prototype.second =
                                                                                                       0)))));
t.prototype.a = function()
{
    this.S();
    var a;
    if (isNaN(this.hour))
    {
        a = Ja(this.year, this.month, this.date)
    }
    else
    {
        a = (((((this.year - 1970) * 12 + this.month << 5) + this.date) * 24 + this.hour) * 60 + this.minute) * 60 + this.second
    }
    return a
};
t.prototype.advance = function(a)
{
    if (a.date)
    {
        this.date += a.date
    }
    if (a.hour)
    {
        this.hour += a.hour
    }
    if (a.minute)
    {
        this.minute += a.minute
    }
    if (a.second)
    {
        this.second += a.second
    }
};
t.prototype.S = function()
{
    this.Cc();
    this.Ja();
    var a = N(this.year, this.month);
    while (this.date < 1)
    {
        this.month -= 1;
        this.Ja();
        a = N(this.year, this.month);
        this.date += a
    }
    while (this.date > a)
    {
        this.date -= a;
        this.month += 1;
        this.Ja();
        a = N(this.year, this.month)
    }
};
t.prototype.Cc = function()
{
    var a;
    if (this.second < 0)
    {
        a = Math.ceil(this.second / -60);
        this.second += 60 * a;
        this.minute -= a
    }
    else if (this.second >= 60)
    {
        a = Math.floor(this.second / 60);
        this.second -= 60 * a;
        this.minute += a
    }
    if (this.minute < 0)
    {
        a = Math.ceil(this.minute / -60);
        this.minute += 60 * a;
        this.hour -= a
    }
    else if (this.minute >= 60)
    {
        a = Math.floor(this.minute / 60);
        this.minute -= 60 * a;
        this.hour += a
    }
    if (this.hour < 0)
    {
        a = Math.ceil(this.hour / -24);
        this.hour += 24 * a;
        this.date -= a
    }
    else if (this.hour >= 24)
    {
        a = Math.floor(this.hour / 24);
        this.hour -= 24 * a;
        this.date += a
    }
};
t.prototype.Ja = function()
{
    var a;
    if (this.month < 1)
    {
        a = Math.ceil((this.month - 1) / -12);
        this.month += 12 * a;
        this.year -= a
    }
    else if (this.month > 12)
    {
        a = Math.floor((this.month - 1) / 12);
        this.month -= 12 * a;
        this.year += a
    }
};
t.prototype.b = function()
{
    this.S();
    return o.create(this.year, this.month, this.date)
};
t.prototype.D = function()
{
    this.S();
    return new v(this.year, this.month, this.date, this.hour, this.minute, this.second)
};
t.prototype.na = function()
{
    this.S();
    return new F(isFinite(this.year) ? this.year : undefined, isFinite(this.month) ? this.month : undefined, isFinite(this.date) ?
                                                                                                             this.date :
                                                                                                             undefined)
};
t.prototype.oa = function()
{
    this.S();
    return new G(isFinite(this.year) ? this.year : undefined, isFinite(this.month) ? this.month : undefined, isFinite(this.date) ?
                                                                                                             this.date :
                                                                                                             undefined,
            isFinite(this.hour) ? this.hour : undefined, isFinite(this.minute) ? this.minute : undefined, isFinite(this.second) ?
                                                                                                          this.second :
                                                                                                          undefined)
};
t.prototype.pa = function()
{
    this.S();
    return new M(this.hour, this.minute, this.second)
};
t.prototype.$c = function()
{
    if (this.year || this.month)
    {
        Cb("Can't convert months or years to ICAL_Duration");
        return undefined
    }
    else
    {
        return new I(this.date, this.hour, this.minute, this.second)
    }
};
t.prototype.bd = function()
{
    return"number" == typeof this.year && 1 + this.year % 1 === 1 && "number" == typeof this.month && 1 + this.month % 1
            === 1 && "number" == typeof this.date && 1 + this.date % 1 === 1
};
t.prototype.Ke = function()
{
    return this.bd() && this.cd()
};
t.prototype.cd = function()
{
    return"number" == typeof this.hour && 1 + this.hour % 1 === 1 && "number" == typeof this.minute && 1 + this.minute % 1
            === 1 && "number" == typeof this.second && 1 + this.second % 1 === 1
};
t.prototype.toString = function()
{
    return"[" + (undefined !== this.year ? w(this.year, 4) : "????") + "/" + (undefined !== this.month ? w(this.month, 2) :
                                                                              "??") + "/" + (
            undefined !== this.date ? w(this.date, 2) : "??") + " " + (undefined !== this.hour ? w(this.hour, 2) : "??")
            + " " + (undefined !== this.minute ? w(this.minute, 2) : "??") + " " + (undefined !== this.second ? w(this.second, 2) :
                                                                                    "??") + "]"
};
t.prototype.equals = function(a)
{
    return this.constructor === a.constructor && this.date === a.date && this.month === a.month && this.year === a.year
            && this.hour === a.hour && this.minute === a.minute && this.second === a.second
};
function X(a, b)
{
    this.start = a;
    if (b.constructor == I)
    {
        var c = J(a);
        c.advance(b);
        this.end = this.start instanceof v ? c.D() : c.b()
    }
    else
    {
        this.end = b
    }
    this.duration = yb(this.end, this.start)
}
X.prototype.type = "PeriodOfTime";
X.prototype.toString = function()
{
    if (this.C !== undefined)return this.C;
    this.C = this.start + "/" + this.end;
    return this.C
};
X.prototype.equals = function(a)
{
    return this.constructor === a.constructor && this.start.equals(a.start) && this.end.equals(a.end)
};
X.prototype.overlaps = function(a)
{
    return a.end.a() > this.start.a() && a.start.a() < this.end.a()
};
X.prototype.Xd = function(a, b)
{
    return b.a() > this.start.a() && a.a() < this.end.a()
};
X.prototype.Yd = function(a, b)
{
    return b.a() >= this.start.a() && a.a() <= this.end.a()
};
X.prototype.contains = function(a)
{
    return this.start.a() <= a.start.a() && this.end.a() >= a.end.a()
};
function Ka(a, b)
{
    this.start = a;
    this.end = b;
    try
    {
        this.duration = yb(this.end, this.start)
    }
    catch(c)
    {
        this.duration = null
    }
}
Ka.prototype.type = "PartialPeriodOfTime";
Ka.prototype.n = function()
{
    return this.start + "/" + this.end
};
Ka.prototype.equals = function(a)
{
    return this.constructor === a.constructor && this.start.equals(a.start) && this.end.equals(a.end)
};
function yb(a, b)
{
    if (isNaN(a.year) != isNaN(b.year) || isNaN(a.hour) != isNaN(b.hour))
    {
        Cb("diff(" + a + ", " + b + ")");
        return undefined
    }
    var c = J(a);
    if (isNaN(a.year))
    {
        c.hour -= b.hour;
        c.minute -= b.minute;
        c.second -= b.second
    }
    else
    {
        c.year = NaN;
        c.month = NaN;
        c.date = Ab(a.year, a.month, a.date, b.year, b.month, b.date);
        if (!isNaN(a.hour))
        {
            c.hour -= b.hour;
            c.minute -= b.minute;
            c.second -= b.second
        }
    }
    return c.$c()
}
function F(a, b, c)
{
    this.year = a;
    this.month = b;
    this.date = c
}
F.prototype = new W;
F.prototype.constructor = F;
F.prototype.type = "PartialDate";
F.prototype.b = function()
{
    return o.create(this.year || 0, this.month || 1, this.date || 1)
};
F.prototype.D = function()
{
    return new v(this.year || 0, this.month || 1, this.date || 1, 0, 0, 0)
};
F.prototype.na = function()
{
    return this
};
F.prototype.oa = function()
{
    return new G(this.year, this.month, this.date, 0, 0, 0)
};
F.prototype.z = function()
{
    return!isNaN(this.a())
};
F.prototype.a = function()
{
    if (undefined === this.l)
    {
        this.l = (((this.year - 1970) * 12 + this.month << 5) + this.date) * 86400
    }
    return this.l
};
F.prototype.equals = function(a)
{
    return this.constructor === a.constructor && (this.date === a.date || isNaN(this.date) && isNaN(a.date)) && (this.month
            === a.month || isNaN(this.month) && isNaN(a.month)) && (this.year === a.year || isNaN(this.year) && isNaN(a.year))
};
F.prototype.n = function()
{
    return(undefined !== this.year ? w(this.year, 4) : "????") + (undefined !== this.month ? w(this.month, 2) : "??") + (undefined
            !== this.date ? w(this.date, 2) : "??")
};
function G(a, b, c, d, f, g)
{
    this.year = a;
    this.month = b;
    this.date = c;
    this.hour = d;
    this.minute = f;
    this.second = g
}
G.prototype = new W;
G.prototype.constructor = G;
G.prototype.type = "PartialDateTime";
G.prototype.b = function()
{
    return o.create(this.year || 0, this.month || 1, this.date || 1)
};
G.prototype.D = function()
{
    return new v(this.year || 0, this.month || 1, this.date || 1, this.hour || 0, this.minute || 0, this.second || 0)
};
G.prototype.na = function()
{
    return new F(this.year, this.month, this.date)
};
G.prototype.oa = function()
{
    return this
};
G.prototype.z = function()
{
    return!isNaN(this.a())
};
G.prototype.a = function()
{
    if (undefined === this.l)
    {
        this.l = (((((this.year - 1970) * 12 + this.month << 5) + this.date) * 24 + this.hour) * 60 + this.minute) * 60
                + this.second
    }
    return this.l
};
G.prototype.equals = function(a)
{
    return this.constructor === a.constructor && (this.date === a.date || isNaN(this.date) && isNaN(a.date)) && (this.month
            === a.month || isNaN(this.month) && isNaN(a.month)) && (this.year === a.year || isNaN(this.year) && isNaN(a.year))
            && (this.hour === a.hour || isNaN(this.hour) && isNaN(a.hour)) && (this.minute === a.minute || isNaN(this.minute)
            && isNaN(a.minute)) && (this.second === a.second || isNaN(this.second) && isNaN(a.second))
};
G.prototype.n = function()
{
    return(undefined !== this.year ? w(this.year, 4) : "????") + (undefined !== this.month ? w(this.month, 2) : "??") + (undefined
            !== this.date ? w(this.date, 2) : "??") + "T" + (undefined !== this.hour ? w(this.hour, 2) : "??") + (undefined
            !== this.minute ? w(this.minute, 2) : "??") + (
            undefined !== this.second ? w(this.second, 2) : "??")
};
var C = undefined,Eb = [];
function zb(a, b, c)
{
    var d = b > 2 && 29 === N(a, 2);
    return zb.gd[b] + d + c - 1
}
zb.gd = [undefined,0,31,
        59,90,120,151,181,212,243,273,304,334];
function ic()
{
    var a = new Date,b = C;
    C = o.create(a.getFullYear(), a.getMonth() + 1, a.getDate());
    if (b && !b.equals(C))
    {
        for (var c = 0; c < Eb.length; ++c)
        {
            var d = Eb[c];
            try
            {
                d(C)
            }
            catch(f)
            {
            }
        }
    }
    var g = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 0, 0, 0, 0);
    g.setDate(g.getDate() + 1);
    var h = g.getTime() - a.getTime();
    if (h < 0 || h >= 1800000)
    {
        h = 1800000
    }
    setTimeout(ic, h)
}
ic();
function Y(a, b, c)
{
    this.x = a;
    this.y = b;
    this.coordinateFrame = c
}
Y.prototype.toString = function()
{
    return"[P " + this.x + "," + this.y + "]"
};
Y.prototype.clone = function()
{
    return new Y(this.x, this.y, this.coordinateFrame)
};
Y.prototype.equals = function(a)
{
    return a.x === this.x && a.y === this.y && a.coordinateFrame == this.coordinateFrame
};
function wc(a, b)
{
    this.dx = a;
    this.dy = b
}
wc.prototype.toString = function()
{
    return"[D " + this.dx + "," + this.dy + "]"
};
function T(a, b, c, d, f)
{
    this.x = a;
    this.y = b;
    this.w = c;
    this.h = d;
    this.coordinateFrame = f
}
T.prototype.contains = function(a)
{
    return this.x <= a.x && a.x < this.x + this.w && this.y <= a.y && a.y < this.y + this.h
};
T.prototype.toString = function()
{
    return"[R " + this.w + "x" + this.h + "+" + this.x + "+" + this.y + "]"
};
T.prototype.clone = function()
{
    return new T(this.x, this.y, this.w, this.h, this.coordinateFrame)
};
T.prototype.equals = function(a)
{
    return a.w === this.w && a.h === this.h && a.x === this.x && a.y === this.y && a.coordinateFrame == this.coordinateFrame
};
function lb(a)
{
    var b = a.ownerDocument;
    if (b && b.getBoxObjectFor)
    {
        var c = b.getBoxObjectFor(a);
        return new T(c.x, c.y, c.width, c.height, window)
    }
    var d = 0,f = 0;
    for (var g = a; g.offsetParent; g = g.offsetParent)
    {
        d += g.offsetLeft;
        f += g.offsetTop
    }
    return new T(d, f, a.offsetWidth, a.offsetHeight, window)
}
function yd(a)
{
    var b = a.ownerDocument;
    if (b && b.getBoxObjectFor)
    {
        var c = b.getBoxObjectFor(a);
        return c.height
    }
    else
    {
        return a.offsetHeight
    }
}
function zd(a)
{
    var b = a.ownerDocument;
    if (b && b.getBoxObjectFor)
    {
        var c = b.getBoxObjectFor(a);
        return c.width
    }
    else
    {
        return a.offsetWidth
    }
}
function bc(a)
{
    var b = a.ownerDocument;
    if (b && b.getBoxObjectFor)
    {
        var c = b.getBoxObjectFor(a);
        return new Y(c.x, c.y, window)
    }
    var d = 0,f = 0;
    while (a.offsetParent)
    {
        d += a.offsetLeft;
        f += a.offsetTop;
        a = a.offsetParent
    }
    return new Y(d, f, window)
}
function wb(a)
{
    var b = 0,c = 0;
    if (a.pageX || a.pageY)
    {
        b = a.pageX;
        c = a.pageY
    }
    else if (a.clientX || a.clientY)
    {
        b = a.clientX + document.body.scrollLeft;
        c = a.clientY + document.body.scrollTop
    }
    return new Y(b, c, window)
}
;
function k(a, b, c, d, f)
{
    this.E = a;
    this.e = c ? c : this.E.id + "_";
    this.d = d ? d : "DP_";
    this.Pb();
    k.fa[this.e] = this;
    if (f)
    {
        this.s = f
    }
    else
    {
        this.s = o.now()
    }
    this.K = o.create(this.s.year, this.s.month, 1);
    this.ha = 0;
    this.td = !(!b);
    this.Qa = false;
    this.Ec = null;
    this.Bc = null;
    this.ea = {};
    this.Fa = {};
    this.uc = {};
    this.c = {};
    this.L = null;
    this.Ha = null;
    this.Ab = new S(this);
    this.sb = new S(this);
    this.Gb = false;
    this.q = false;
    this.m = new R;
    this.Wb = false;
    this.T = 0;
    this.Y = null;
    this.Ya = null;
    this.Fb = true;
    this.vb = null;
    this.Xa = null;
    this.tb = null;
    this.r();
    this.Ne = false;
    this.Tc(0);
    this.Hc(0);
    this.Le = false;
    this.F = null;
    this.sd = null;
    this.rd = null;
    this.La = null;
    this.Ka = null;
    this.Me = null;
    this.wc = false;
    this.Kb = null;
    this.Jb = null;
    var g = this,h = function(i)
    {
        var j = i.startDate,l;
        if (!j)
        {
            l = ja[this.Ma]
        }
        else
        {
            l = ""
        }
        g.Fc(l)
    };
    if (this.Gb)this.Sa(h);
    this.rb = new S(this)
}
;
k.prototype.Pb = function()
{
    var a = this.d + "day_top ",b = this.d + "day_left ",c = this.d + "day_right ",d = this.d + "onmonth ",f = this.d + "offmonth ",g = this.d
            + "month_top ",h = this.d + "month_left ",i = this.d + "weekend ",j = this.d + "weekday ",l = this.d + "weekend_selected ",n = this.d
            + "weekday_selected ",r = {};
    r[0] = "";
    r[1] = a;
    r[3] = a + b;
    r[5] = a + c;
    r[2] = b;
    r[4] = c;
    var x = {};
    for (var m in r)
    {
        x[m | 16 | 256] = r[m] + d + i;
        x[m | 16 | 512] = r[m] + d + j;
        x[m | 32 | 256] = r[m] + f + i;
        x[m | 32 | 512] = r[m] + f + j;
        x[m | 16 | 1024] = r[m] + d + l;
        x[m | 16 | 2048] = r[m] + d + n;
        x[m | 32 | 1024] = r[m] + f + l;
        x[m | 32 | 2048] = r[m] + f + n
    }
    var u = {};
    for (var m in x)
    {
        u[m] = x[m];
        u[m | 64] = x[m] + g;
        u[m | 64 | 128] = x[m] + g + h
    }
    this._classMap = u
};
var ja = {};
ja[0] = "Select a date";
ja[1] = "Select a range of dates";
ja[2] = "Select dates";
ja[3] = "&nbsp;";
k.prototype.Hc = function(a, b)
{
    if (a != 0 && a != 1 && a != 7 && a != 30 && a != -1 && !(b instanceof Function))
    {
        throw new Error("Invalid click mode: " + a);
    }
    this.pd = a;
    this.Rb = b
};
k.prototype.Td = function()
{
    return this.Qa
};
k.prototype.Vc = function(a)
{
    if (a != this.Qa)
    {
        this.Qa = a;
        this.r()
    }
};
k.prototype.ac = function()
{
    return this.pd
};
k.prototype.Tc = function(a)
{
    if (this.Ma == a)
    {
        return
    }
    this.Ma = a;
    this.X()
};
k.prototype.Ca = function()
{
    return this.Ma
};
k.prototype.show = function()
{
    this.q = true;
    this.r()
};
k.prototype.hide = function()
{
    this.E.innerHTML = "";
    this.q = false
};
k.prototype.Ga = function()
{
    return this.q
};
k.prototype.Hd = function(a)
{
    return this.Fa[a.id]
};
k.prototype.Kd = function(a)
{
    return this.uc[a.id]
};
k.prototype.xd = function(a)
{
    return this.c[a.id]
};
k.prototype.Nd = function()
{
    return s(this.e + "tbl")
};
k.prototype.Nc = function(a)
{
    this.ha = a;
    this.r()
};
k.prototype.cb = function()
{
    return this.ha
};
k.prototype.ee = function(a)
{
    this.Y = a;
    this.r();
    return true
};
k.prototype.Kc = function(a)
{
    this.Ya = a
};
k.prototype.yd = function()
{
    return this.Y
};
k.prototype.Cd = function()
{
    return this.L
};
k.prototype.Aa = function()
{
    if (!this.q)return null;
    return this.c[this.L.id]
};
k.prototype.Ba = function()
{
    if (!this.q)return null;
    var a = s(this.e + "day_" + (this.T - 1) + "_6");
    return this.c[a.id]
};
k.prototype.Fe = function(a)
{
    if (a != this.Fb)
    {
        this.Fb = a;
        this.r()
    }
};
k.prototype.Rc = function(a)
{
    this.vb = a
};
k.prototype.Jc = function(a)
{
    this.Xa = a
};
k.prototype.Qc = function(a)
{
    this.tb = a
};
k.prototype.Gd = function()
{
    return Ta
};
k.prototype.Dd = function()
{
    return qa
};
k.prototype.r = function()
{
    if (!this.q)
    {
        return
    }
    var a = this.e,b,c = this.K.month,
            d = this.K.year,f = nb.length,g = [c == 1 ? 12 : c - 1,c,c == 12 ? 1 : c + 1],h = o.create(this.s.year, this.s.month, 1),i = Ca(d, c
            - 1, 1).b(),j = Ca(d, c + 1, 1).b();
    if (this.vb)
    {
        g[0] = this.vb(i)
    }
    else
    {
        var l = i.a() >= h.a() ? "&laquo;" : "&lsaquo;&nbsp;";
        g[0] = l + Ta[g[0]]
    }
    if (this.Xa)
    {
        g[1] = this.Xa(this.K)
    }
    else
    {
        g[1] = vb(g[1], d)
    }
    if (this.tb)
    {
        g[2] = this.tb(j)
    }
    else
    {
        var n = j.a() - h.a() <= 0 ? "&raquo;" : "&nbsp;&rsaquo;";
        g[2] = Ta[g[2]] + n
    }
    var r = N(d, c),x = N(i.year, i.month),m = new Array(49),u = this.K.bb() - this.ha;
    if (u < 0)u += 7;
    if (r < 30 || u < 5)u += 7;
    for (var q = 0; q < u; ++q)
    {
        m[q] = o.create(i.year, i.month, x - u + q + 1)
    }
    for (var q = u,p = 0; p < r; ++q)
    {
        m[q] = o.create(d, c, ++p)
    }
    var y = u + r;
    for (var q = y,p = 0; q < m.length; ++q)
    {
        m[q] = o.create(j.year, j.month, ++p)
    }
    this.Kb = m[0];
    this.Jb = m[m.length - 1];
    var A = [],ga = this.td ? [2,3,2] : [1,5,1];
    A.push('<table cols=7 cellspacing="0" cellpadding="3" id="', a, 'tbl" class="', this.d, 'monthtable"  style="-moz-user-select:none; cursor:pointer;"><tr class="', this.d, 'heading" id="', a, 'header"><td colspan=', ga[0], ' unselectable=on onmousedown="', Ha(vc), "(", Xa(this.e), ')" id="', a, 'mhl" class="', this.d, 'prev">', g[0], "</td><td colspan=", ga[1], ' unselectable="on" id="', a, 'mhc" class="', this.d, 'cur">', g[1], "</td><td colspan=", ga[2], ' unselectable="on" onmousedown="'
            + Ha(uc) + "(", Xa(this.e), ')" id="', a, 'mhr" class="', this.d, 'next">', g[2], "</td></tr>");
    if (this.Qa)
    {
        A.push('<tr class="', this.d, 'days" id="', a, 'dow">');
        for (var q = 0; q < f; ++q)
        {
            A.push('<td unselectable="on" class="', this.d, 'dayh" id="', a, "day_", q, '">', sb(nb[(q + this.ha) % 7]), "</td>")
        }
        A.push("</tr>")
    }
    var Fb = (7 - this.ha) % 7,Ec = (Fb + 6) % 7;
    this.ea = {};
    var b = null,z = null,Fc = Ha(tc),Gb,z,Na = null;
    if (this.Ya)
    {
        Na = this.Ya(this.Kb, this.Jb)
    }
    for (var q = 0,p = -1; q < 7; ++q)
    {
        A.push('<tr id="', a, "week_", q, '">');
        for (var O = 0; O < f; ++O)
        {
            ++p;
            var Oa = this.m.contains(m[p]);
            z = 0;
            if (q == 0)z |= 1;
            if (O == 0)z |= 2;
            else if (O == 6)z |= 4;
            z |= O == Fb || O == Ec ? (Oa ? 1024 : 256) : (Oa ? 2048 : 512);
            if (p < u || p >= y)
            {
                z |= 32;
                if (m[p].date <= 7)
                {
                    z |= 64;
                    if (m[p].date == 1 && O != 0)
                    {
                        z |= 128
                    }
                }
                z = this._classMap[z]
            }
            else
            {
                z |= 16;
                if (m[p].date <= 7)
                {
                    z |= 64;
                    if (m[p].date == 1 && O != 0)
                    {
                        z |= 128
                    }
                }
                if (m[p].date == this.s.date && c == this.s.month && d == this.s.year)
                {
                    z = this._classMap[z] + (this.d + "today" + (Oa ? "_selected " : " "))
                }
                else
                {
                    z = this._classMap[z]
                }
            }
            A.push('<td id="', a, "day_", q, "_", O, '" class="', z, '"');
            if (Na && (Gb = Na[m[p]]))
            {
                A.push(' style="', Gb, '"')
            }
            A.push(' onclick="', Fc, '(this)" unselectable="on">', m[p].date, "</td>")
        }
        A.push("</tr>")
    }
    if (this.Gb)
    {
        A.push('<tr class="', this.d, 'months"><td colspan="7" id="', a, 'sel"></td></tr>')
    }
    A.push("</table>");
    this.E.innerHTML = A.join("");
    this.L = s(a + "day_0_0");
    this.Ha = s(a + "day_6_6");
    var b = this.L,ka = b.parentNode,
            Pa = null,Hb = null,p = -1,Qa = -1;
    while (ka != null)
    {
        ++Qa;
        var Gc = a + "day_" + Qa + "_";
        if (Qa == 7)break;
        var Ib = -1;
        while (b != null)
        {
            ++p;
            ++Ib;
            var Ra = Gc + Ib;
            this.c[Ra] = m[p];
            this.ea[m[p].toString()] = b;
            this.uc[Ra] = Pa;
            if (Pa)this.Fa[Hb] = b;
            Pa = b;
            Hb = Ra;
            b = b.nextSibling
        }
        ka = ka.nextSibling;
        if (ka != null)
        {
            b = ka.firstChild
        }
    }
    this.T = 7;
    if (!this.Fb)
    {
        var Hc = s(a + "week_4"),Jb = s(a + "week_5"),Sa = s(a + "week_6");
        if (this.c[a + "day_4_0"].month != c)
        {
            Hc.style.display = "none";
            Jb.style.display = "none";
            Sa.style.display = "none";
            this.T = 4
        }
        else if (this.c[a + "day_5_0"].month != c)
        {
            Jb.style.display = "none";
            Sa.style.display = "none";
            this.T = 5
        }
        else if (this.c[a + "day_6_0"].month != c)
        {
            Sa.style.display = "none";
            this.T = 6
        }
    }
    this.Ec = i;
    this.Bc = j;
    if (this.Y)
    {
        this.Y.call(null, this)
    }
    if (this.jd)this.jd()
};
k.prototype.refresh = function()
{
    if (this.Y)
    {
        this.Y.call(null, this)
    }
};
k.prototype.Sa = function(a)
{
    return this.Ab.add(a)
};
k.prototype.be = function(a)
{
    return this.Ab.remove(a)
};
k.prototype.X = function(a)
{
    a = arguments.length === 0 || a;
    var b = this.m.p(true);
    for (var c = 0; c < b.length; ++c)
    {
        var d = this.ea[b[c]];
        this.U(d, false)
    }
    this.m.clear();
    if (!this.wc)
    {
        this.Mc(null);
        this.Lc(null)
    }
    if (a)
    {
        this.ga(undefined)
    }
};
k.prototype.Wd = function(a)
{
    return this.m.contains(a)
};
k.prototype.Qb = function(a)
{
    if (this.Rb)
    {
        this.Rb.call(null, a);
        return
    }
    var b = s(a),c = this.m;
    switch (this.Ma)
            {case 1:var d = this.ac();if (d == 0)break;if (d != 1 && (d != -1 || !c.contains(this.c[a])))
    {
        var f = this.c[b.id],g;
        switch (d)
                {case -1:if (c.v() > 7 && this.isSnapToWeek())
        {
            var h = b.id.substr(b.id.length - 3, 1);
            f = this.c[this.e + "day_" + h + "_0"]
        }g = c.v() - 1;break;case 7:var h = b.id.substr(b.id.length - 3, 1);f = this.c[this.e + "day_" + h + "_0"];g = 6;break;case 30:f =
                                                                                                                                       this.c[b.id];f =
                                                                                                                                                    o.create(f.year, f.month, 1);var i = J(f);g =
                                                                                                                                                                                              N(f.year, f.month)
                                                                                                                                                                                                      - 1;break;default:}
        var i = J(f);
        i.date += g;
        var j = i.b();
        this.Db(f, j);
        return
    }Fa(d == 1 || d == -1 && c.contains(this.c[a]), "not a case for single date selection");this.X(false);case 0:if (c.v()
            > 0)
    {
        var l = c.p(true)[0];
        c.clear();
        var n = this.ea[l];
        if (n)this.U(n, false)
    }c.add(this.c[b.id]);this.U(b);this.ga(this.c[b.id]);break;case 2:break;case 3:default:break}
};
k.prototype.Mc = function(a)
{
    this.sd = a;
    this.La = a ? this.c[a.id] : null
};
k.prototype.Lc = function(a)
{
    this.rd = a;
    this.Ka = a ? this.c[a.id] : null
};
k.prototype.vc = function()
{
    return this.wc
};
k.prototype.ge = function(a, b, c)
{
    var d = false;
    while (a)
    {
        if (c)
        {
            d = this.m.add(this.c[a.id])
        }
        else
        {
            d = this.m.remove(this.c[a.id])
        }
        if (d)
        {
            this.U(a, c)
        }
        if (a.id === b.id)break;
        a = this.Fa[a.id]
    }
};
k.LAST_DAY_OF_WEEK = {4:"day_3_6",5:"day_4_6",6:"day_5_6",7:"day_6_6"};
k.prototype.le = function(a)
{
    if (a)
    {
        this.F = {};
        this.F.x = a.x;
        this.F.y = a.y
    }
    else
    {
        this.F = null
    }
};
k.prototype.Ob = function(a, b)
{
    if (!this.F)return;
    if (b)
    {
        a.x -= this.F.x;
        a.y -= this.F.y
    }
    else
    {
        a.x += this.F.x;
        a.y += this.F.y
    }
};
k.prototype.ud = function(a)
{
    var b = zd(this.L),c = yd(this.L),d = this.mc(),f = wb(a);
    this.Ob(f);
    var g = 7,h = this.ab(d.x, b, g, f.x),i = this.ab(d.y, c, this.T, f.y);
    return s(this.e + "day_" + i + "_" + h)
};
k.prototype.ab = function(a, b, c, d)
{
    if (d < a)return 0;
    var f = Math.floor((d - a) / b);
    return f >= c ? c - 1 : f
};
k.prototype.mc = function()
{
    var a = this.e,b = this.T,c = bc(this.L),d = lb(s(a + k.LAST_DAY_OF_WEEK[b]));
    return new T(c.x, c.y, d.x + d.w - c.x, d.y + d.h - c.y, c.coordinateFrame)
};
k.prototype.ga = function(a, b, c)
{
    var d = {};
    d.startDate = a;
    d.endDate = b || a;
    d.vc = !(!c);
    d.mode = this.Ca();
    this.Ab.va(d)
};
k.prototype.Pd = function()
{
    return this.s
};
k.prototype.ye = function(a)
{
    if (a.equals(this.s))return;
    this.s = a;
    this.r()
};
k.prototype.Ua = function(a)
{
    if (a instanceof o)return a;
    if (a instanceof v)
    {
        return o.create(a.year, a.month, a.date)
    }
};
k.prototype.fe = function(a)
{
    this.Wb = !(!a)
};
k.prototype.Db = function(a, b, c)
{
    var d = this.Ca();
    c = c !== false;
    if (a)a = this.Ua(a);
    if (b)b = this.Ua(b);
    if (a)this.Eb(a);
    if (!a || d == 3)
    {
        this.X(c);
        return
    }
    if (d == 0)
    {
        this.X(false);
        var f = this.ea[a.toString()];
        this.m.add(a);
        this.U(f);
        if (c)this.ga(a)
    }
    else if (d == 1)
    {
        if (!b)b = a;
        var g = Bb(b, a),h = false;
        if (this.isSnapToWeek() && g >= 7)
        {
            var i = ra(a) + 7,j = ra(b) + 7;
            i = (i - this.cb()) % 7;
            j = (j - this.cb()) % 7;
            var l;
            l = Ca(a.year, a.month, a.date - i);
            a = l.b();
            l = Ca(b.year, b.month, b.date + (6 - j));
            b = l.b();
            h = this.Eb(a)
        }
        if (h)
        {
            this.X(false)
        }
        var f = this.L;
        this.La = a;
        this.Ka = b;
        var n = this.Ha,r = a.a(),x = b.a(),m = new R;
        for (; f; f = this.Fa[f.id])
        {
            var u = this.c[f.id],q = this.m.contains(u),
                    p = u.a() >= r && u.a() <= x;
            if (q != p)
            {
                this.U(f, p)
            }
            if (p)
            {
                m.add(u)
            }
        }
        this.m = m;
        if (this.c[n.id].a() < x)
        {
            n = this.Ha;
            var l = J(this.c[this.Ha.id]),y = null;
            do{
                l.date += 1;
                y = l.b();
                this.m.add(y)
            }
            while (!y.equals(b))
        }
        if (c)this.ga(a, b)
    }
};
k.prototype.la = function(a, b, c)
{
    if (this.K.month == a.month && this.K.year == a.year && !c)return false;
    b = arguments.length === 1 || b;
    this.K = o.create(a.year, a.month, 1);
    this.r();
    if (b)this.sb.va();
    return true
};
k.prototype.cc = function()
{
    return this.K
};
k.prototype.Eb = function(a, b)
{
    if (a.a() >= this.Kb.a() && a.a() <= this.Jb.a())
    {
        return false
    }
    return this.la(a, b)
};
k.prototype.gb = function()
{
    switch (this.Ca())
            {case 0:if (this.m.v())
    {
        return this.m.p()[0]
    }
    else
    {
        return null
    }case 1:var a = this.La ? this.La : null,b = this.Ka ? this.Ka : null;if (!a || !b)return null;return[a,b];case 2:return null;case 3:default:return null}
};
k.prototype.Jd = function()
{
    return this.m.v()
};
k.prototype.Fc = function(a)
{
    if (this.Gb)
    {
        s(this.e + "sel").innerHTML = a
    }
};
k.prototype.U = function(a, b)
{
    if (this.Wb || !a)return;
    if (!Ma(b))b = true;
    var c = [],d = [],f = " " + a.className + " ",g = " " + this.d;
    if (b)
    {
        if (-1 != f.indexOf(g + "today "))
        {
            c.push(g + "today ");
            d.push(g + "today_selected ")
        }
        if (-1 != f.indexOf(g + "weekday "))
        {
            c.push(g + "weekday ");
            d.push(g + "weekday_selected ")
        }
        else if (-1 != f.indexOf(g + "weekend "))
        {
            c.push(g + "weekend ");
            d.push(g + "weekend_selected ")
        }
    }
    else
    {
        if (-1 != f.indexOf(g + "today_selected "))
        {
            d.push(g + "today ");
            c.push(g + "today_selected ")
        }
        if (-1 != f.indexOf(g + "weekday_selected "))
        {
            d.push(g + "weekday ");
            c.push(g + "weekday_selected ")
        }
        else if (-1 != f.indexOf(g + "weekend_selected "))
        {
            d.push(g + "weekend ");
            c.push(g + "weekend_selected ")
        }
    }
    for (var h = 0; h < c.length; ++h)
    {
        f = f.replace(c[h], d[h])
    }
    if (c.length != 0)
    {
        a.className = f
    }
};
k.prototype.Nb = function(a)
{
    this.sb.add(a)
};
k.prototype.ae = function(a)
{
    this.sb.remove(a)
};
k.fa = {};
k.prototype.ed = function()
{
    return this.e
};
k.staticGetPickerById = function(a)
{
    return k.fa[a]
};
function vc(a)
{
    var b = k.fa[a];
    return b.la(b.Ec)
}
function uc(a)
{
    var b = k.fa[a];
    return b.la(b.Bc)
}
function tc(a)
{
    var b = a.id,c = b.match(/(.*)day_\d+_\d+/),d = k.fa[c[1]];
    return d.Qb(b)
}
k.prototype.kd = function(a)
{
    return this.rb.add(a)
};
k.prototype.$d = function(a)
{
    return this.rb.remove(a)
};
k.prototype.log = function()
{
    this.rb.va(arguments)
};
k.prototype.zd = function()
{
    return this.E
};
function R()
{
    this.J = {};
    this.Oa = 0
}
R.prototype.v = function()
{
    return this.Oa
};
R.prototype.add = function(a)
{
    var b = a.b(),c = b.toString();
    if (c in this.J)return false;
    this.J[c] = b;
    ++this.Oa;
    return true
};
R.prototype.remove = function(a)
{
    var b = a.b().toString();
    if (!(b in this.J))return false;
    delete this.J[b];
    --this.Oa;
    return true
};
R.prototype.clear = function()
{
    this.J = {};
    this.Oa = 0
};
R.prototype.contains = function(a)
{
    var b = a.b().toString();
    return b in this.J
};
R.prototype.p = function(a)
{
    var b = new Array(this.v()),c = -1;
    for (var d in this.J)
    {
        b[++c] = a ? d : this.J[d]
    }
    return b
};
function S(a)
{
    this.Zd = a;
    this.A = []
}
S.prototype.add = function(a)
{
    if (!a)return false;
    for (var b = 0; b < this.A.length; ++b)
    {
        if (a === this.A[b])return false
    }
    this.A.push(a);
    return true
};
S.prototype.remove = function(a)
{
    if (!a)return false;
    for (var b = 0; b < this.A.length; ++b)
    {
        if (a === this.A[b])
        {
            this.A.splice(b, 1);
            return true
        }
    }
    return false
};
S.prototype.va = function()
{
    for (var a = 0; a < this.A.length; ++a)
    {
        this.A[a].apply(this.Zd, arguments)
    }
};
S.prototype.v = function()
{
    return this.A.length
};
S.prototype.iterator = function()
{
    return new la(this)
};
function la(a)
{
    this.qb = a;
    this.ob = 0;
    this.P = null
}
la.prototype.tc = function()
{
    return this.ob < this.qb.v()
};
la.prototype.next = function()
{
    if (this.tc())
    {
        this.P = this.qb.A[this.ob++]
    }
    else
    {
        this.P = null
    }
    return this.P
};
la.prototype.current = function()
{
    return this.P
};
la.prototype.remove = function()
{
    if (!this.P)throw new Error("no current element!");
    this.qb.remove(this.P);
    this.P = null;
    --this.ob
};
var _IG_AdjustIFrameHeight,_IG_Prefs;
function vb(a, b)
{
    return Kc(qa[b], a)
}
function sb(a)
{
    if ("ru" !== "en")
    {
        return a
    }
    else
    {
        return a.substring(0, 1).toUpperCase() + a.substring(1)
    }
}
var L,U,P = true,gc,kc,dc,D = {},va;
function Hd()
{
    L = new _IG_Prefs;
    U = L.getString("firstDay");
    var a = {Sunday:0,Monday:1,Saturday:6,"0":0,"1":1,"6":6};
    U = L.getString("firstDay");
    if (U in a)
    {
        U = a[U]
    }
    else
    {
        U = 0
    }
    P = L.getString("showAgenda") == "true";
    gc = true;
    kc = L.getString("timeFormat") == "13:00";
    dc = L.getString("dateFormat") != "1";
    va = L.getString("calendarFeedsImported") != "0"
}
function Gd()
{
    var a = s("content");
    a.style.lineHeight = "1em";
    if (!gc)s("datepicker").style.display = "none";
    var b = new k(a, false, undefined, "DP_gadget_");
    b.Rc(function()
    {
        return"&laquo;"
    });
    b.Qc(function()
    {
        return"&raquo;"
    });
    b.Jc(sc(b));
    b.Vc(true);
    b.Nc(U);
    b.show();
    return b
}
function sc(a)
{
    return function(b)
    {
        return vb(b.year, b.month)
    }
}
;
Function.prototype.bind = function(a)
{
    if (typeof this != "function")
    {
        throw new Error("Bind must be called as a method of a function object.");
    }
    var b = this,c = Array.prototype.splice.call(arguments, 1, arguments.length);
    return function()
    {
        var d = c.concat();
        for (var f = 0; f < arguments.length; f++)
        {
            d.push(arguments[f])
        }
        return b.apply(a, d)
    }
};
var kb,Jd;
(function()
{
    var a = {},b = 0;
    function c(g)
    {
        if (!g.hashCode)
        {
            g.hashCode = ++b
        }
        return g.hashCode
    }
    function d(g, h, i, j)
    {
        var l = c(g),n = c(i);
        j = !(!j);
        var r = l + "_" + h + "_" + n + "_" + j;
        return r
    }
    kb = function(g, h, i, j)
    {
        var l = d(g, h, i, j);
        if (l in a)
        {
            return l
        }
        var n = f.bind(null, l);
        a[l] = {listener:i,proxy:n};
        if (g.addEventListener)
        {
            g.addEventListener(h, n, j)
        }
        else if (g.attachEvent)
        {
            g.attachEvent("on" + h, n)
        }
        else
        {
            throw new Error("Node {" + g + "} does not support event listeners.");
        }
        return l
    };
    Jd = function(g, h, i, j)
    {
        var l = d(g, h, i, j);
        if (!(l in
              a))
        {
            return false
        }
        var n = a[l].proxy;
        if (g.removeEventListener)
        {
            g.removeEventListener(h, n, j)
        }
        else if (g.detachEvent)
        {
            g.detachEvent("on" + h, n)
        }
        delete a[l];
        return true
    };
    function f(g)
    {
        var h = Array.prototype.splice.call(arguments, 1, arguments.length);
        return a[g].listener.apply(null, h)
    }
})();
var ba = new Rc,Pb = false;
function Rc()
{
    this.O = []
}
function _PC_Install(a)
{
    if (Pb)return false;
    Pb = true;
    var b = a ? a : document;
    kb(b.body, "mousedown", Lb);
    kb(b, "keydown", function(c)
    {
        Lb(c);
        return true
    });
    return true
}
function Lb(a)
{
    a = a || window.event;
    if (a.type == "keydown" && Bc(a) != 27)return false;
    if (ba.O.length == 0)return false;
    for (var b = ba.O.length - 1; b >= 0; --b)
    {
        var c = ba.O[b];
        if (c.deactivate(a))
        {
            ba.O.splice(b, 1)
        }
    }
    return true
}
function Qc(a)
{
    for (var b = 0; b < ba.O.length; ++b)
    {
        if (a === ba.O[b])return false
    }
    ba.O.push(a);
    return true
}
;
var Ya;
Ya = function()
{
    return true
};
var Wa;
Wa = function()
{
    return true
};
function xb(a)
{
    return Pc(sb(["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][a.bb()]), zc(a))
}
function zc(a)
{
    if (Wa())
    {
        return a.month + "/" + a.date
    }
    else
    {
        return a.date + "/" + a.month
    }
}
function ub(a)
{
    var b = qa[a.month];
    if (a.year === C.year && Math.abs(a.month - C.month) < 4)
    {
        return Ua(b, a.date)
    }
    else
    {
        return b + " " + a.date + ", " + a.year
    }
}
function Va(a, b)
{
    return(Ya() || undefined == a.hour ? Oc : (b ? (0 === a.minute ? Nc : Mc) : Lc))(a.hour, a.minute)
}
;
var e = {};
e.util = {};
e.client = {};
e.data = {};
e.data.calendar = {};
e.data.extensions = {};
e.util.Utils = {};
e.util.Utils.nb = undefined;
(function()
{
    if (typeof XMLHttpRequest == "undefined" && typeof ActiveXObject != "undefined")
    {
        var a = ["MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","MICROSOFT.XMLHTTP.1.0","MICROSOFT.XMLHTTP.1","MICROSOFT.XMLHTTP"];
        for (var b = 0; b < a.length; ++b)
        {
            var c = a[b];
            try
            {
                new ActiveXObject(c);
                e.util.Utils.nb = c;
                return
            }
            catch(d)
            {
            }
        }
        throw"Could not create ActiveXObject. ActiveX might be disabled, or msxml might not be installed";
    }
})();
e.util.Utils.getHttpRequest = function()
{
    if (e.util.Utils.nb !== undefined)
    {
        return new ActiveXObject(e.util.Utils.nb)
    }
    else
    {
        return new XMLHttpRequest
    }
};
e.util.Utils.getXmlDomFromRequest = function(a)
{
    var b = a.responseXML;
    if ((!b || !b.documentElement) && typeof ActiveXObject != "undefined")
    {
        b = new ActiveXObject("Microsoft.XMLDOM");
        b.loadXML(a.responseText)
    }
    return b
};
e.util.Utils.convertXmlDomToJson = function(a)
{
    var b = e.util.Utils.convertElementToJson(a);
    if (a.xmlVersion)
    {
        b.version = a.xmlVersion
    }
    else
    {
        var c = a.firstChild.attributes;
        for (var d = 0; d < c.length; ++d)
        {
            var f = c[d];
            if (f.nodeName == "version")
            {
                b.version = f.nodeValue;
                break
            }
        }
    }
    if (a.xmlEncoding)
    {
        b.encoding = a.xmlEncoding
    }
    else
    {
        var c = a.firstChild.attributes;
        for (var d = 0; d < c.length; ++d)
        {
            var f = c[d];
            if (f.nodeName == "encoding")
            {
                b.encoding = f.nodeValue;
                break
            }
        }
    }
    return b
};
e.util.Utils.convertElementToJson = function(a)
{
    var b = {};
    if (a.attributes)
    {
        for (var c = 0; c < a.attributes.length; ++c)
        {
            var d = a.attributes[c],f = d.nodeName.replace(/:/g, "$"),g = d.nodeValue;
            b[f] = g;
            if (f.indexOf("xmlns") == 0)
            {
                var h = f == "xmlns" ? "_" : f.substring("xmlns:".length);
                if (!b.$ns)b.$ns = {};
                b.$ns[h] = g;
                if (!b.$rns)b.$rns = {};
                b.$rns[g] = h == "_" ? "" : h
            }
        }
    }
    if (a.childNodes.length == 1 && (a.childNodes[0].nodeType == 3 || a.childNodes[0].nodeType == 4))
    {
        b.$t = a.childNodes[0].nodeValue
    }
    else if ("getAttribute"in a && a.getAttribute("type") == "application/xhtml+xml" && a.getAttribute("mode") != "escaped")
    {
        b.$t = e.util.Utils.asXhtml(a)
    }
    else
    {
        for (var c = 0; c < a.childNodes.length; ++c)
        {
            var i = a.childNodes[c];
            if (i.nodeType != 1)continue;
            var f = i.tagName.replace(/:/g, "$");
            if (f in b)
            {
                if (!(b[f]instanceof Array))
                {
                    b[f] = [b[f]]
                }
                b[f].push(e.util.Utils.convertElementToJson(i))
            }
            else
            {
                b[f] = e.util.Utils.convertElementToJson(i)
            }
        }
    }
    return b
};
e.util.Utils.convertJsonToXml = function(a, b)
{
    var c = ['<?xml version="' + (a.version || "1.0") + '" encoding="' + (a.encoding || "UTF-8") + '" ?>'];
    e.util.Utils.Tb(a, b, c);
    return c.join("")
};
e.util.Utils.Tb = function(a, b, c)
{
    var d = [],f = [];
    for (var g in a)
    {
        var h = a[g];
        g = g.replace(/\$/g, ":");
        var i = false;
        if (g.charAt(0) == ":")
        {
            if (g == ":t")
            {
                f.push(e.util.Utils.escapeXml(h))
            }
        }
        else if ((i = e.util.Utils.isArray(h)) || typeof h == "object")
        {
            var j = [],l = i ? h : [h];
            for (var n = 0; n < l.length; ++n)
            {
                e.util.Utils.Tb(l[n], g, j)
            }
            f.push(j.join(""))
        }
        else
        {
            d.push(g + '="' + e.util.Utils.escapeXml(h) + '"')
        }
    }
    c.push("<" + b);
    if (d.length)
    {
        c.push(" " + d.join(" "))
    }
    if (f.length)
    {
        c.push(">" + f.join("") + "</" + b, ">\n")
    }
    else
    {
        c.push("/>\n")
    }
};
e.util.Utils.escapeXml = function(a)
{
    if (!a)return"";
    return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/>/g, "&gt;")
};
e.util.Utils.asXhtml = function(a)
{
    function b(c, d)
    {
        var f = d || [];
        if (c.nodeType == 1)
        {
            var g = c.firstChild;
            if (d)
            {
                f.push("<", c.tagName);
                var h = c.attributes;
                for (var i = 0; i < h.length; ++i)
                {
                    var j = h[i],l = j.nodeName,n = j.nodeValue.toString();
                    f.push(" ", l, '="', e.util.Utils.escapeXml(n), '"')
                }
            }
            if (g)
            {
                if (d)f.push(">");
                while (g)
                {
                    b(g, f);
                    g = g.nextSibling
                }
                if (d)f.push("</", c.tagName, ">")
            }
            else
            {
                if (d)f.push("/>")
            }
        }
        else if (c.nodeType == 3)
        {
            f.push(c.nodeValue)
        }
        return f
    }
    return b(a).join("")
};
e.util.Utils.isArray = function(a)
{
    return a instanceof Array || a && typeof a == "object" && typeof a.join == "function" && typeof a.reverse == "function"
};
e.util.Utils.p = function(a)
{
    if (!a)return[];
    return e.util.Utils.isArray(a) ? a : [a]
};
e.util.Template = function(a, b)
{
    if (!b)
    {
        a = a.replace(/>(\s+)</g, "><");
        a = a.replace(/\s{2,}/g, " ")
    }
    this.H = [];
    this.Dc = 0;
    this.Q = {};
    var c = a.match(/\$\{\w+\}/g) || [],d = 0;
    for (var f = 0; f < c.length; ++f)
    {
        var g = c[f],h = a.indexOf(g, d);
        if (d != h)
        {
            this.H.push(a.substring(d, h))
        }
        d = h + g.length;
        g = g.substring(2, g.length - 1);
        var i = this.Q[g];
        if (!i)
        {
            i = [];
            this.Q[g] = i;
            ++this.Dc
        }
        i.push(this.H.length);
        this.H.push(undefined)
    }
    if (d != a.length)
    {
        this.H.push(a.substring(d))
    }
    this.ub = 0
};
e.util.Template.prototype.put = function(a, b)
{
    var c = this.Q[a];
    if (this.H[c[0]] === undefined)++this.ub;
    if (c.length === 1)
    {
        this.H[c[0]] = b
    }
    else
    {
        for (var d = 0; d < c.length; ++d)
        {
            this.H[c[d]] = b
        }
    }
};
e.util.Template.prototype.M = function(a, b, c)
{
    if (b == null)
    {
        this.put(a, "")
    }
    else
    {
        var d = c || a;
        this.put(a, " " + d + '="' + e.util.Utils.escapeXml(b) + '"')
    }
};
e.util.Template.prototype.G = function(a, b, c)
{
    var d = c || a;
    if (b == null)
    {
        this.put(a, "")
    }
    else
    {
        this.put(a, "<" + d + ">" + e.util.Utils.escapeXml(b) + "</" + d + ">")
    }
};
e.util.Template.prototype.toString = function()
{
    if (!this.z())
    {
        throw new Error("Some keys are missing values: " + this.zc());
    }
    return this.H.join("")
};
e.util.Template.prototype.zc = function()
{
    var a = [];
    for (var b in this.pc())a.push(b);
    return a.join()
};
e.util.Template.prototype.qd = function(a)
{
    return a && a in this.Q
};
e.util.Template.prototype.Id = function()
{
    return this.ub
};
e.util.Template.prototype.z = function()
{
    return this.ub == this.Dc
};
e.util.Template.prototype.Fd = function()
{
    var a = {};
    for (var b in this.Q)a[b] = null;
    return a
};
e.util.Template.prototype.pc = function()
{
    var a = {};
    for (var b in this.Q)
    {
        if (this.H[this.Q[b][0]] === undefined)
        {
            a[b] = null
        }
    }
    return a
};
e.client.Service = function(a, b)
{
    this.ce = a;
    this.md = b
};
e.client.Service.prototype.authenticate = function(a)
{
    a()
};
e.client.Service.prototype.R = function()
{
    return false
};
e.client.Service.prototype.Da = function(a, b, c, d)
{
    if (this.R())
    {
        var f = this;
        this.authenticate(function()
        {
            f.za(b, c, d)
        })
    }
    else
    {
        this.sc(b, function(g)
        {
            var h = new c;
            h.init(a ? g.feed : g.entry);
            d.call(null, h)
        })
    }
};
e.client.Service.prototype.za = function(a, b, c)
{
    this.Da(true, a, b, c)
};
e.client.Service.prototype.Bd = function(a, b, c)
{
    this.Da(false, a, b, c)
};
e.client.Service.prototype.query = function(a, b, c)
{
    this.Da(true, a.rc(), b, c)
};
e.client.Service.prototype.insert = function(a, b, c)
{
    var d = c || function()
    {
    };
    if (this.R())
    {
        var f = this;
        this.authenticate(function()
        {
            f.insert(a, b, d)
        })
    }
    else
    {
        this.Bb("POST", a, b, d)
    }
};
e.client.Service.prototype.update = function(a, b, c)
{
    var d = c || function()
    {
    };
    if (this.R())
    {
        var f = this;
        this.authenticate(function()
        {
            f.update(a, b, d)
        })
    }
    else
    {
        this.Bb("PUT", a, b, d)
    }
};
e.client.Service.prototype.remove = function(a, b)
{
    var c = b || function()
    {
    };
    if (this.R())
    {
        var d = this;
        this.authenticate(function()
        {
            d.remove(a, c)
        })
    }
    else
    {
        var f = e.util.Utils.getHttpRequest();
        this.ca(f, function(g)
        {
            c.call(null)
        });
        f.open("DELETE", a, true);
        f.setRequestHeader("Content-Type", "application/atom+xml; charset=utf-8");
        this.W(f);
        this.aa(f);
        f.send(null)
    }
};
e.client.Service.prototype.Bb = function(a, b, c, d)
{
    var f = e.util.Utils.getHttpRequest();
    this.ca(f, function(h)
    {
        var i = new c.constructor,j = e.util.Utils.getXmlDomFromRequest(h);
        i.init(e.util.Utils.convertXmlDomToJson(j).entry);
        d.call(null, i)
    });
    f.open(a, b, true);
    f.setRequestHeader("Content-Type", "application/atom+xml; charset=utf-8");
    var g = c.f();
    f.setRequestHeader("Content-Length", g.length);
    this.W(f);
    this.aa(f);
    f.send(g)
};
e.client.Service.prototype.Ub = function(a)
{
    var b = this;
    return function(c)
    {
        if (c.status > 299)
        {
            throw new Error("Bad server response during authentication operation: " + c.status);
        }
        var d = c.responseText;
        if (!d)
        {
            throw new Error("Server failed to provide authentication token.");
        }
        var f = d.match(/^Auth=(.*)/m);
        if (!f || !f[1])
        {
            throw new Error("Malformed authentication token: " + d);
        }
        b.Cb(f[1]);
        a.call(null)
    }
};
e.client.Service.prototype.ca = function(a, b)
{
    var c = a,d = this;
    a.onreadystatechange = function()
    {
        if (c.readyState != 4)return;
        var f = parseInt(c.status, 10);
        if (f >= 400)
        {
            if (d.Zb)
            {
                d.Zb.call(null, c)
            }
            else
            {
                throw new Error(f + ": " + c.statusText);
            }
        }
        else
        {
            b.call(null, c)
        }
    }
};
e.client.Service.prototype.ke = function(a)
{
    this.Zb = a
};
e.client.Service.prototype.sc = function(a, b)
{
    var c = e.util.Utils.getHttpRequest();
    this.ca(c, function(d)
    {
        var f = e.util.Utils.getXmlDomFromRequest(d);
        b.call(null, e.util.Utils.convertXmlDomToJson(f))
    });
    c.open("GET", a, true);
    c.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
    c.setRequestHeader("X-If-No-Redirect", "1");
    this.W(c);
    this.aa(c);
    c.send(null)
};
e.client.Service.prototype.aa = function(a)
{
    var b = "JavaScript-V1.0-" + (this.md || "");
    a.setRequestHeader("X-GData-Client", b)
};
e.client.Service.prototype.W = function(a)
{
};
e.client.GoogleService = function(a, b)
{
    e.client.Service.call(this, a, b);
    this.qa = null;
    this.sa = null;
    this.ka = null
};
e.client.GoogleService.prototype = new e.client.Service;
e.client.GoogleService.prototype.constructor = e.client.GoogleService;
e.client.GoogleService.prototype.Cb = function(a)
{
    this.qa = a
};
e.client.GoogleService.prototype.R = function()
{
    return(this.sa || this.ka) && !this.qa
};
e.client.GoogleService.prototype.Ce = function(a, b)
{
    if (this.sa != a || this.ka != b)
    {
        this.qa = null
    }
    this.sa = a;
    this.ka = b
};
e.client.GoogleService.prototype.gc = function()
{
    return"https://www.google.com/accounts/ClientLogin"
};
e.client.GoogleService.prototype.authenticate = function(a)
{
    if (!this.sa || !this.ka)
    {
        throw new Error("need to set username and password to authenticate");
    }
    var b = "Email=" + encodeURIComponent(this.sa) + "&Passwd=" + encodeURIComponent(this.ka) + "&source=desktop_Feed_reader&service="
            + encodeURIComponent(this.ce),c = e.util.Utils.getHttpRequest();
    this.ca(c, this.Ub(a));
    c.open("POST", this.gc(), true);
    c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    this.aa(c);
    c.send(b)
};
e.client.GoogleService.prototype.W = function(a)
{
    if (this.qa)
    {
        var b = "GoogleLogin auth=" + this.qa;
        a.setRequestHeader("Authorization", b)
    }
};
e.data.Person = function(a, b, c)
{
    this.Ac = a;
    this.ad = b;
    this.Xb = c
};
e.data.Person.prototype.fb = function()
{
    return this.Ac
};
e.data.Person.prototype.Sd = function()
{
    return this.ad
};
e.data.Person.prototype.dc = function()
{
    return this.Xb
};
e.data.Person.prototype.pe = function(a)
{
    return this.Ac = a
};
e.data.Person.prototype.Be = function(a)
{
    return this.ad = a
};
e.data.Person.prototype.ie = function(a)
{
    return this.Xb = a
};
e.data.Person.hd = new e.util.Template("<author>${name}${email}</author>");
e.data.Person.prototype.f = function()
{
    var a = e.data.Person.hd;
    a.G("name", this.fb());
    a.G("email", this.dc());
    return a.toString()
};
e.data.Person.prototype.toString = function()
{
    return this.fb()
};
e.data.Category = function(a, b, c)
{
    this.Gc = a;
    this.Yc = b;
    this.yc = c
};
e.data.Category.prototype.ic = function()
{
    return this.Gc
};
e.data.Category.prototype.nc = function()
{
    return this.Yc
};
e.data.Category.prototype.eb = function()
{
    return this.yc
};
e.data.Category.prototype.se = function(a)
{
    return this.Gc = a
};
e.data.Category.prototype.xe = function(a)
{
    return this.Yc = a
};
e.data.Category.prototype.oe = function(a)
{
    return this.yc = a
};
e.data.Category.prototype.toString = function()
{
    return this.ic() + "/" + this.nc() + (this.eb() ? "/" + this.eb() : "")
};
e.data.Link = function(a, b, c)
{
    this.yb = a;
    this.V = b;
    this.Ea = c;
    this.k = null
};
e.data.Link.prototype.Md = function()
{
    return this.yb
};
e.data.Link.prototype.ib = function()
{
    return this.V
};
e.data.Link.prototype.db = function()
{
    return this.Ea
};
e.data.Link.prototype.g = function()
{
    return this.k
};
e.data.Link.prototype.re = function(a)
{
    return this.yb = a
};
e.data.Link.prototype.Na = function(a)
{
    return this.V = a
};
e.data.Link.prototype.me = function(a)
{
    return this.Ea = a
};
e.data.Link.prototype.N = function(a)
{
    return this.k = a
};
e.data.Link.Ra = new e.util.Template("<link${rel}${type}${href}${title}/>");
e.data.Link.prototype.i = function(a)
{
    a.M("rel", this.yb);
    a.M("type", this.V);
    a.M("href", this.Ea);
    a.M("title", this.k)
};
e.data.Link.prototype.f = function()
{
    var a = e.data.Link.Ra;
    this.i(a);
    return a.toString()
};
e.data.Link.prototype.toString = function()
{
    return this.Ea
};
e.data.Entry = function()
{
    this.j = null;
    this.e = null;
    this.k = null;
    this.Wa = null;
    this.Pa = null;
    this.Hb = null;
    this.wb = null;
    this.Pa = null;
    this.pb = [];
    this.Ta = null;
    this.B = null;
    this.Za = null;
    this.ba = null;
    this.da = null
};
e.data.Entry.prototype.init = function(a)
{
    this.j = a;
    a.link = e.util.Utils.p(a.link);
    a.author = e.util.Utils.p(a.author);
    a.category = e.util.Utils.p(a.category);
    if (a.id)this.e = a.id.$t;
    if (a.title)this.k = a.title.$t;
    if (a.content)this.Wa = a.content.$t;
    if (a.summary)this.Pa = a.summary.$t;
    if (a.updated)this.Hb = a.updated.$t;
    if (a.published)this.wb = a.published.$t;
    var b = a.link;
    for (var c = 0; c < b.length; ++c)
    {
        var d = b[c],f = new e.data.Link(d.rel, d.type, d.href);
        if (d.rel == "alternate")
        {
            this.Ta = f
        }
        else if (d.rel == "self")
        {
            this.B = f
        }
        else if (d.rel == "edit")
        {
            this.Za = f
        }
        this.pb.push(f)
    }
};
e.data.Entry.prototype.Z = function()
{
    return this.j
};
e.data.Entry.prototype.ja = function()
{
    return this.e
};
e.data.Entry.prototype.g = function()
{
    return this.k
};
e.data.Entry.prototype.bc = function()
{
    return this.Wa
};
e.data.Entry.prototype.lc = function()
{
    return this.Pa
};
e.data.Entry.prototype.qc = function()
{
    return this.Hb
};
e.data.Entry.prototype.hc = function()
{
    return this.wb
};
e.data.Entry.prototype.wa = function()
{
    return this.Ta
};
e.data.Entry.prototype.hb = function()
{
    return this.B
};
e.data.Entry.prototype.Ad = function()
{
    return this.Za
};
e.data.Entry.prototype.vd = function()
{
    if (this.da != null)return this.da;
    this.da = [];
    if (this.j)
    {
        var a = this.j.category;
        for (var b = 0; b < a.length; ++b)
        {
            var c = a[b];
            this.da.push(new e.data.Category(c.scheme, c.term, c.label))
        }
    }
    return this.da
};
e.data.Entry.prototype.$b = function()
{
    if (this.ba != null)return this.ba;
    this.ba = [];
    if (this.j)
    {
        var a = this.j.author;
        for (var b = 0; b < a.length; ++b)
        {
            var c = a[b],d = c.name ? c.name.$t : null,f = c.email ? c.email.$t : null;
            this.ba.push(new e.data.Person(d, null, f))
        }
    }
    return this.ba
};
e.data.Entry.prototype.ne = function(a)
{
    this.e = a
};
e.data.Entry.prototype.N = function(a)
{
    this.k = a
};
e.data.Entry.prototype.Ic = function(a)
{
    this.Wa = a
};
e.data.Entry.prototype.we = function(a)
{
    this.Pa = a
};
e.data.Entry.prototype.Ae = function(a)
{
    this.Hb = a
};
e.data.Entry.prototype.qe = function(a)
{
    this.wb = a
};
e.data.Entry.prototype.de = function(a)
{
    this.Ta = a
};
e.data.Entry.prototype.te = function(a)
{
    this.B = a
};
e.data.Entry.prototype.he = function(a)
{
    this.Za = a
};
e.data.Entry.prototype.toString = function()
{
    return this.g()
};
e.data.Entry.$ = new e.util.Template('<entry xmlns="http://www.w3.org/2005/Atom">${id}${published}${updated}${categories}${title}${summary}${content}${links}${authors}</entry>');
e.data.Entry.prototype.i = function(a)
{
    a.G("id", this.ja());
    a.G("published", this.hc());
    a.G("updated", this.qc());
    a.put("categories", '<category scheme="http://schemas.google.com/g/2005#kind" term="http://schemas.google.com/g/2005#event" />');
    a.G("title", this.g());
    a.G("summary", this.lc());
    a.G("content", this.bc());
    var b = [];
    for (var c = 0; c < this.pb.length; ++c)
    {
        b.push(this.pb[c].f())
    }
    a.put("links", b.join(""));
    var d = [],f = this.$b();
    for (var c = 0; c < f.length; ++c)
    {
        d.push(f[c].f())
    }
    a.put("authors", d.join(""))
};
e.data.Entry.prototype.f = function()
{
    var a = e.data.Entry.$;
    this.i(a);
    return a.toString()
};
e.data.Feed = function()
{
    this.j = null;
    this.e = null;
    this.k = null;
    this.$a = null;
    this.B = null
};
e.data.Feed.prototype.init = function(a)
{
    this.j = a;
    a.entry = e.util.Utils.p(a.entry);
    a.link = e.util.Utils.p(a.link);
    if (a.id)this.e = a.id.$t;
    if (a.title)this.k = a.title.$t
};
e.data.Feed.prototype.u = function()
{
    return e.data.Entry
};
e.data.Feed.prototype.Vb = function()
{
    var a = this.u();
    return new a
};
e.data.Feed.prototype.ja = function()
{
    return this.e
};
e.data.Feed.prototype.g = function()
{
    return this.k
};
e.data.Feed.prototype.ya = function()
{
    if (this.$a != null)return this.$a;
    var a = [];
    if (this.j && this.j.entry)
    {
        var b = this.j.entry;
        for (var c = 0; c < b.length; ++c)
        {
            var d = this.Vb();
            d.init(b[c]);
            a.push(d)
        }
    }
    this.$a = a;
    return a
};
e.data.Feed.prototype.hb = function()
{
    if (this.B != null)return this.B;
    if (this.j && this.j.link)
    {
        var a = this.j.link;
        for (var b = 0; b < a.length; ++b)
        {
            var c = a[b];
            if (c.rel == "self")
            {
                this.B = new e.data.Link(c.rel, c.type, c.href);
                return this.B
            }
        }
    }
    this.B = undefined;
    return this.B
};
e.data.Feed.prototype.Qd = function()
{
    return this.ya().length
};
e.data.Feed.prototype.Z = function()
{
    return this.j
};
e.data.Feed.prototype.toString = function()
{
    return this.g()
};
e.data.extensions.When = function(a, b)
{
    this.Xc = a;
    this.Yb = b
};
e.data.extensions.When.prototype.o = function()
{
    return this.Xc
};
e.data.extensions.When.prototype.t = function()
{
    return this.Yb
};
e.data.extensions.When.prototype.ue = function(a)
{
    return this.Xc = a
};
e.data.extensions.When.prototype.je = function(a)
{
    return this.Yb = a
};
e.data.extensions.When.prototype.f = function()
{
    return'<gd:when startTime="' + this.o() + '" endTime="' + this.t() + '" xmlns:gd="http://schemas.google.com/g/2005"/>'
};
e.data.extensions.When.prototype.toString = function()
{
    return this.o() + "/" + this.t()
};
e.data.extensions.EventEntry = function()
{
    e.data.Entry.call(this);
    this.ma = null;
    this.ra = null;
    this.ta = null;
    this.I = []
};
e.data.extensions.EventEntry.prototype = new e.data.Entry;
e.data.extensions.EventEntry.prototype.constructor = e.data.extensions.EventEntry;
e.data.extensions.EventEntry.EventStatus = {CANCELED:"http://schemas.google.com/g/2005#event.canceled",CONFIRMED:"http://schemas.google.com/g/2005#event.confirmed",TENTATIVE:"http://schemas.google.com/g/2005#event.tentative"};
e.data.extensions.EventEntry.Transparency =
{OPAQUE:"http://schemas.google.com/g/2005#event.opaque",TRANSPARENT:"http://schemas.google.com/g/2005#event.transparent"};
e.data.extensions.EventEntry.Visibility = {CONFIDENTIAL:"http://schemas.google.com/g/2005#event.confidential",DEFAULT:"http://schemas.google.com/g/2005#event.default",PRIVATE:"http://schemas.google.com/g/2005#event.private",PUBLIC:"http://schemas.google.com/g/2005#event.public"};
e.data.extensions.EventEntry.prototype.init = function(a)
{
    e.data.Entry.prototype.init.call(this, a);
    var b = e.util.Utils.p(a["gd$when"]);
    if (a["gd$eventstatus"])this.ma = a["gd$eventstatus"].value;
    if (a["gd$transparency"])this.ra = a["gd$transparency"].value;
    if (a["gd$visibility"])this.ta = a["gd$visibility"].value;
    for (var c = 0; c < b.length; ++c)
    {
        var d = b[c];
        this.I.push(new e.data.extensions.When(d.startTime, d.endTime))
    }
};
e.data.extensions.EventEntry.prototype.kc = function()
{
    return this.ma
};
e.data.extensions.EventEntry.prototype.Rd = function()
{
    return this.ra
};
e.data.extensions.EventEntry.prototype.Ud = function()
{
    return this.ta
};
e.data.extensions.EventEntry.prototype.oc = function()
{
    return this.I
};
e.data.extensions.EventEntry.prototype.ve = function(a)
{
    this.ma = a
};
e.data.extensions.EventEntry.prototype.ze = function(a)
{
    this.ra = a
};
e.data.extensions.EventEntry.prototype.De = function(a)
{
    this.ta = a
};
e.data.extensions.EventEntry.prototype.ld = function(a)
{
    this.I.push(a)
};
e.data.extensions.EventEntry.prototype.o = function()
{
    if (this.I.length != 1)
    {
        throw new Error("Entry has more than one When associated with it");
    }
    return this.I[0].o()
};
e.data.extensions.EventEntry.prototype.t = function()
{
    if (this.I.length != 1)
    {
        throw new Error("Entry has more than one When associated with it");
    }
    return this.I[0].t()
};
e.data.extensions.EventEntry.$ = new e.util.Template('<entry xmlns="http://www.w3.org/2005/Atom"        xmlns:gd="http://schemas.google.com/g/2005"        xmlns:gCal="http://schemas.google.com/gCal/2005">${id}${published}${updated}${categories}${title}${summary}${content}${links}${authors}${times}${status}${transparency}${visibility}</entry>');
e.data.extensions.EventEntry.prototype.i = function(a)
{
    e.data.Entry.prototype.i.call(this, a);
    var b = "";
    for (var c = 0; c < this.I.length; ++c)
    {
        var d = this.I[c];
        b += d.f()
    }
    a.put("times", b);
    a.put("status", this.ma ? '<gd:eventStatus value="' + this.ma + '" xmlns:gd="http://schemas.google.com/g/2005"/>' :
                    "");
    a.put("transparency", this.ra ? '<gd:transparency value="' + this.ra + '" xmlns:gd="http://schemas.google.com/g/2005"/>' :
                          "");
    a.put("visibility", this.ta ? '<gd:visibility value="' + this.ta + '" xmlns:gd="http://schemas.google.com/g/2005"/>' :
                        "")
};
e.data.extensions.EventEntry.prototype.f = function()
{
    var a = e.data.extensions.EventEntry.$;
    this.i(a);
    return a.toString()
};
e.data.extensions.EventFeed = function()
{
    e.data.Feed.call(this)
};
e.data.extensions.EventFeed.prototype = new e.data.Feed;
e.data.extensions.EventFeed.prototype.constructor = e.data.extensions.EventFeed;
e.data.extensions.EventFeed.prototype.u = function()
{
    return e.data.extensions.EventEntry
};
e.data.calendar.CalendarEntry = function()
{
    e.data.Entry.call(this);
    this.Mb = null;
    this.lb = null;
    this.Zc = null;
    this.zb = null;
    this.Sb = null
};
e.data.calendar.CalendarEntry.prototype = new e.data.Entry;
e.data.calendar.CalendarEntry.prototype.constructor = e.data.calendar.CalendarEntry;
e.data.calendar.CalendarEntry.prototype.init = function(a)
{
    e.data.Entry.prototype.init.call(this, a);
    if (a["gCal$overridename"])
    {
        this.k = a["gCal$overridename"].value
    }
    if (a["gCal$accesslevel"])
    {
        this.Mb = a["gCal$accesslevel"].value
    }
    if (a["gCal$hidden"])
    {
        this.lb = a["gCal$hidden"].value == "true"
    }
    if (a["gCal$timezone"])this.Zc = a["gCal$timezone"].value;
    if (a["gCal$selected"])
    {
        this.zb = a["gCal$selected"].value == "true"
    }
    else
    {
        this.zb = !this.lb
    }
    if (a["gCal$color"])this.Sb = a["gCal$color"].value
};
e.data.calendar.CalendarEntry.prototype.ia = function()
{
    return this.Mb
};
e.data.calendar.CalendarEntry.prototype.ec = function()
{
    return this.lb
};
e.data.calendar.CalendarEntry.prototype.Od = function()
{
    return this.Zc
};
e.data.calendar.CalendarEntry.prototype.jc = function()
{
    return this.zb
};
e.data.calendar.CalendarEntry.prototype.xa = function()
{
    return this.Sb
};
e.data.calendar.CalendarFeed = function()
{
    e.data.Feed.call(this)
};
e.data.calendar.CalendarFeed.prototype = new e.data.Feed;
e.data.calendar.CalendarFeed.prototype.constructor = e.data.calendar.CalendarFeed;
e.data.calendar.CalendarFeed.prototype.u = function()
{
    return e.data.calendar.CalendarEntry
};
e.data.calendar.CalendarFeed.prototype.init = function(a)
{
    e.data.Feed.prototype.init.call(this, a)
};
e.data.calendar.WebContent = function()
{
    this.mb = null;
    this.k = null;
    this.V = null;
    this.Ib = null;
    this.Lb = null;
    this.kb = null
};
e.data.calendar.WebContent.Ra = new e.util.Template("<link${rel}${type}${href}${title}><gCal:webContent${url}${width}${height}/></link>");
e.data.calendar.WebContent.prototype.f = function()
{
    var a = new e.data.Link("http://schemas.google.com/gCal/2005/webContent", this.V, this.mb);
    a.N(this.k);
    var b = e.data.calendar.WebContent.Ra;
    a.i(b);
    b.M("width", this.Lb);
    b.M("height", this.kb);
    b.M("url", this.Ib);
    return b.toString()
};
e.data.calendar.WebContent.prototype.fc = function()
{
    return this.mb
};
e.data.calendar.WebContent.prototype.g = function()
{
    return this.k
};
e.data.calendar.WebContent.prototype.rc = function()
{
    return this.Ib
};
e.data.calendar.WebContent.prototype.Vd = function()
{
    return this.Lb
};
e.data.calendar.WebContent.prototype.Ed = function()
{
    return this.kb
};
e.data.calendar.WebContent.prototype.ib = function()
{
    return this.V
};
e.data.calendar.WebContent.prototype.Pc = function(a)
{
    this.mb = a
};
e.data.calendar.WebContent.prototype.N = function(a)
{
    this.k = a
};
e.data.calendar.WebContent.prototype.Uc = function(a)
{
    this.Ib = a
};
e.data.calendar.WebContent.prototype.Wc = function(a)
{
    this.Lb = a
};
e.data.calendar.WebContent.prototype.Oc = function(a)
{
    this.kb = a
};
e.data.calendar.WebContent.prototype.Na = function(a)
{
    this.V = a
};
e.data.calendar.CalendarEventEntry = function()
{
    e.data.extensions.EventEntry.call(this);
    this.xb = false;
    this.dd = null;
    this.ua = null
};
e.data.calendar.CalendarEventEntry.prototype = new e.data.extensions.EventEntry;
e.data.calendar.CalendarEventEntry.prototype.constructor = e.data.calendar.CalendarEventEntry;
e.data.calendar.CalendarEventEntry.prototype.init = function(a)
{
    e.data.extensions.EventEntry.prototype.init.call(this, a);
    var b = e.util.Utils.p(a.link);
    for (var c = 0; c < b.length; ++c)
    {
        var d = b[c];
        if (d.rel == "http://schemas.google.com/gCal/2005/webContent")
        {
            this.dd = new e.data.Link(d.rel, d.type, d.href);
            if (d.title != null)this.dd.N(d.title);
            var f = new e.data.calendar.WebContent;
            f.Pc(d.href);
            f.N(d.title);
            f.Na(d.type);
            if ("gCal$webContent"in d)
            {
                var g = d["gCal$webContent"];
                f.Uc(g.url);
                f.Wc(g.width);
                f.Oc(g.height)
            }
            this.ua = f;
            break
        }
    }
};
e.data.calendar.CalendarEventEntry.prototype.u = function()
{
    return e.data.calendar.CalendarEventEntry
};
e.data.calendar.CalendarEventEntry.prototype.Ld = function()
{
    return this.xb
};
e.data.calendar.CalendarEventEntry.prototype.jb = function()
{
    return this.ua
};
e.data.calendar.CalendarEventEntry.prototype.Sc = function(a)
{
    this.xb = a
};
e.data.calendar.CalendarEventEntry.prototype.Ee = function(a)
{
    this.ua = a
};
e.data.calendar.CalendarEventEntry.$ = new e.util.Template('<entry xmlns="http://www.w3.org/2005/Atom"        xmlns:gd="http://schemas.google.com/g/2005"        xmlns:gCal="http://schemas.google.com/gCal/2005">${id}${published}${updated}${categories}${title}${summary}${content}${links}${authors}${times}${status}${transparency}${visibility}${quickAdd}${webContent}</entry>');
e.data.calendar.CalendarEventEntry.prototype.i = function(a)
{
    e.data.extensions.EventEntry.prototype.i.call(this, a);
    var b = this.xb ? '<gCal:quickadd value="true"/>' : "";
    a.put("quickAdd", b);
    a.put("webContent", this.ua ? this.ua.f() : "")
};
e.data.calendar.CalendarEventEntry.prototype.f = function()
{
    var a = e.data.calendar.CalendarEventEntry.$;
    this.i(a);
    return a.toString()
};
e.data.calendar.CalendarEventFeed = function()
{
    e.data.extensions.EventFeed.call(this);
    this.tzName = null
};
e.data.calendar.CalendarEventFeed.prototype = new e.data.extensions.EventFeed;
e.data.calendar.CalendarEventFeed.prototype.constructor = e.data.calendar.CalendarEventFeed;
e.data.calendar.CalendarEventFeed.prototype.u = function()
{
    return e.data.calendar.CalendarEventEntry
};
var B,Za,ma;
function _onload(a, b)
{
    _PC_Install();
    Hd();
    Ya = function()
    {
        return kc
    };
    Wa = function()
    {
        return dc
    };
    Ad();
    B = Gd();
    if (!Fd() && b)
    {
        return
    }
    else
    {
        s("linkbar").style.display = ""
    }
    B.Kc(ad);
    B.Sa(nd);
    B.Nb(od);
    Za = a;
    ma = b;
    P = !P;
    _toggleAgenda();
    var c = L.getString("calendarFeeds");
    D = fd(c);
    hd()
}
function fd(a)
{
    if (ma)
    {
        var b = {};
        b[ib()] = 1;
        return b
    }
    if (!a)return{};
    if (!a.match(/^\(\{.*\}\)$/))return{};
    var c = a.substring(2, a.length - 2).split(","),d = new RegExp("^['\"]http://" + window.location.host + "/calendar/feeds/[a-zA-Z0-9@.-_]+/private/full['\"]:[01]$"),
            f = /((\.\.)|(\.\/)|(\/\/))/,g = "http://".length;
    for (var h = 0,i = c.length; h < i; ++h)
    {
        var j = c[h];
        j = j.replace("%40", "@");
        if (!j.match(d) || j.substring(g).match(f))
        {
            return{}
        }
    }
    return eval(a)
}
function xd(a)
{
    var b;
    if (!a)
    {
        b = C
    }
    else
    {
        var c = B.gb() || V,d = J(c);
        d.date += a;
        b = d.b()
    }
    B.Db(b);
    B.la(b)
}
function Z(a)
{
    if (a === undefined)
    {
        _IG_AdjustIFrameHeight()
    }
    var b;
    if (a && !ia || ia && !a)
    {
        b = document.documentElement.scrollHeight
    }
    else
    {
        var c = document.body,d = c.scrollHeight,f = c.offsetHeight;
        b = d > f ? d : f
    }
    _IG_AdjustIFrameHeight(b)
}
;
var Aa = new e.client.GoogleService("cl", "google.com-ig"),za,Ba;
function Tb()
{
    if (za)return za;
    za = "http://" + window.location.host + "/calendar/feeds/";
    return za
}
function ib()
{
    var a = jc(Za);
    return Tb() + a + "/private/full"
}
function jc(a)
{
    return window.encodeURIComponent(a)
}
function Ub()
{
    if (Ba !== undefined)return Ba;
    Ba = window.location.protocol == "https:";
    return Ba
}
function Ob(a)
{
    if (!Ub())return a;
    if (a.substring(0, 7) == "http://")
    {
        return a.replace("http://", "https://")
    }
    else
    {
        return a
    }
}
function Fd()
{
    var a = document.cookie.split(/;?\s/),
            b = Ub(),c = ma ? (b ? "CALHS=" : "CALH=") + ma + "=" : "CAL=",d = c.length,c = new RegExp("^" + c);
    for (var f = 0,g = a.length; f < g; ++f)
    {
        var h = a[f];
        if (h.match(c))
        {
            var i = h.substring(d);
            Aa.Cb(i);
            return true
        }
    }
    return false
}
function hd()
{
    if (ma)
    {
        eb = 1;
        K = ib();
        var a = {id:{$t:K},title:{$t:""},content:{$t:""},summary:{$t:""},updated:{$t:""},published:{$t:""},link:[{rel:"alternate",type:"application/atom+xml",href:K}],author:[],category:[],gCal$accesslevel:{value:"owner"},gCal$hidden:{value:"false"},gCal$timezone:{value:""},gCal$selected:{value:"true"},
            gCal$color:{value:"#2952A3"}},b = new e.data.calendar.CalendarEntry;
        b.init(a);
        xa[K] = b.xa();
        aa.push(b);
        var c = B.Aa(),d = B.Ba();
        Da(c, d, $a)
    }
    else
    {
        var f = Ob(Tb() + jc(Za));
        Aa.za(f, e.data.calendar.CalendarFeed, Bd)
    }
}
function hb(a)
{
    if (a.wa)
    {
        return a.wa().db()
    }
    else
    {
        return a.feedUrl
    }
}
var eb = 0,K,fb,aa = [],xa = {},ca = {owner:0,editor:1,read:2};
function Bd(a)
{
    var b = ib(),c = a.ya(),d = {};
    for (var f = 0,g = c.length; f < g; ++f)
    {
        var h = c[f],i = hb(h);
        d[i] = 1;
        if (h.ec())
        {
            delete D[i];
            continue
        }
        xa[i] = h.xa();
        var j = ca[h.ia()];
        if (j < ca.editor)
        {
            ++eb
        }
        if (!K && i == b)
        {
            K = i;
            fb = h
        }
        else
        {
            aa.push(h)
        }
        if (!va)
        {
            if (h.jc())D[i] = 1
        }
    }
    var l = false;
    for (var n in D)
    {
        if (!(n in d))
        {
            delete D[n];
            continue
        }
        if (D[n])
        {
            l = true
        }
    }
    if (!l && K)
    {
        D[K] = 1;
        l = true
    }
    if (!va)
    {
        va = true;
        L.set("calendarFeedsImported", "1");
        fc()
    }
    aa.sort(gd);
    if (fb)aa.unshift(fb);
    if (l)
    {
        var r = B.Aa(),x = B.Ba();
        Da(r, x, $a)
    }
    else
    {
        $a()
    }
}
function fc()
{
    var a = [],b = 0,c = false;
    for (var d in D)
    {
        b += d.length + 10;
        if (b > 1400)
        {
            delete D[d];
            c = true
        }
        else
        {
            a.push(Xa(d) + ":1")
        }
    }
    L.set("calendarFeeds", "({" + a.join() + "})")
}
function gd(a, b)
{
    var c = ca[a.ia()] - ca[b.ia()];
    if (c)return c;
    return Nb(a, b)
}
function Nb(a, b)
{
    if (String.prototype.Ia)
    {
        return a.g().Ia(b.g())
    }
    else
    {
        var c = a.g().toLowerCase(),d = b.g().toLowerCase();
        return c < d ? -1 : (c == d ? 0 : 1)
    }
}
function $a()
{
    xd();
    pa();
    s("calListPopup").onclick = nc
}
function nc()
{
    var a = Ac();
    if (a.Ga())
    {
        a.hide()
    }
    else
    {
        a.show()
    }
}
var E = {};
function Zb(a, b)
{
    var c = J(a);
    c.date -= 14;
    var d = c.b();
    c.date += 59;
    var f = c.b();
    Da(d, f, b)
}
function Da(a, b, c)
{
    if (!E.start)
    {
        E.start = a;
        E.end = b
    }
    else if (a.a() >= E.start.a())
    {
        if (E.end.a() >= b.a())return;
        a = E.end;
        E.end = b
    }
    else
    {
        if (b.a() <= E.end.a())
        {
            b = E.start
        }
        else
        {
            E.end = b
        }
        E.start = a
    }
    $b(wa(a), wa(b), c)
}
function $b(a, b, c, d)
{
    var f = d ? [{feedUrl:d}] : aa;
    for (var g = 0; g < f.length; ++g)
    {
        var h = f[g],i = hb(h);
        if (!D[i])continue;
        var j = i.indexOf("?") < 0 ? "?" : "&",l = i + j + "singleevents=true&start-min=" + a + "&start-max=" + b + "&max-results=1000",n = xa[i],r = cd(n, c);
        l = Ob(l);
        Aa.za(l, e.data.calendar.CalendarEventFeed, r)
    }
}
function cd(a, b)
{
    return function(c)
    {
        c.color = a;
        var d = c.Z().link,f = {color:a};
        for (var g = 0; g < d.length; ++g)
        {
            if (d[g].rel == "http://schemas.google.com/g/2005#feed")
            {
                f.url = d[g].href;
                break
            }
        }
        Yb(c.ya(), f);
        if (b)b.call(null)
    }
}
var ya = {},mc = e.data.extensions.EventEntry.EventStatus.CANCELED;
function hc(a)
{
    return function()
    {
        return a
    }
}
function Yb(a, b)
{
    var c = false,d = B.Aa(),f = B.Ba();
    for (var g = 0,h = a.length; g < h; ++g)
    {
        var i = a[g];
        i.owner = b;
        var j = i.kc();
        if (j == mc)continue;
        var l = ia && !Wb;
        if (l)
        {
            var n = i.Z()["gd$when"].starttime,r = i.Z()["gd$when"].endtime;
            i.o = hc(n);
            i.t = hc(r)
        }
        var x = i.o(),m = i.t(),u = Ea(x),q,p;
        if (ta(i))
        {
            q = cc(m).a()
        }
        else
        {
            m = oa(m);
            p = J(m.b());
            if (m.hour || m.minute || m.second)
            {
                p.date += 1
            }
            q = p.b().a()
        }
        p = J(u);
        for (var y = p.b(); y.a() < q; p.date += 1,y = p.b())
        {
            var A;
            if (y in ya)
            {
                A = ya[y]
            }
            else
            {
                A = {};
                ya[y] = A
            }
            var ga = i.ja();
            if (!(ga in A))
            {
                A[ga] = i;
                if (!c)
                {
                    c = y.a() >= d.a() && y.a() <= f.a()
                }
            }
        }
    }
    if (c)B.r()
}
function ta(a)
{
    if ("allday"in a)return a.allday;
    var b = a.o().length == 10;
    return a.allday = b
}
function bd(a, b)
{
    var c = ta(b) - ta(a);
    if (c)return c;
    c = Ea(a.o()).a() - Ea(b.o()).a();
    if (c)return c;
    return Nb(a, b)
}
function Sb(a, b)
{
    var c = ya[a],d = [];
    for (var f in c)
    {
        var g = c[f].owner.url;
        if (!D[g])
        {
            continue
        }
        d.push(c[f])
    }
    d.sort(bd);
    if (b)
    {
        var h = b.length;
        d.unshift(h);
        d.unshift(h);
        b.splice.apply(b, d);
        return b
    }
    else
    {
        return d
    }
}
function ad(a, b)
{
    var c = {},d = J(a);
    for (var f = d.b(); f.a() <= b.a(); d.date += 1,f = d.b())
    {
        if (Sb(f).length)c[f] = "font-weight:bold"
    }
    return c
}
var Qb = {"#A32929":["#D96666","#CC3333"],"#B1365F":["#E67399","#DD4477"],"#7A367A":["#B373B3","#994499"],"#5229A3":["#8C66D9","#6633CC"],"#29527A":["#668CB3","#336699"],"#2952A3":["#668CD9","#3366CC"],"#1B887A":["#59BFB3","#22AA99"],"#28754E":["#65AD89","#329262"],"#0D7813":["#4CB052",
        "#109618"],"#528800":["#8CBF40","#66AA00"],"#88880E":["#BFBF4D","#AAAA11"],"#AB8B00":["#E0C240","#D6AE00"],"#BE6D00":["#F2A640","#EE8800"],"#B1440E":["#E6804D","#DD5511"],"#865A5A":["#BE9494","#A87070"],"#705770":["#A992A9","#8C6D8C"],"#4E5D6C":["#8997A5","#627487"],"#5A6986":["#94A2BE","#7083A8"],"#4A716C":["#85AAA5","#5C8D87"],"#6E6E41":["#A7A77D","#898951"],"#8D6F47":["#C4A883","#B08B59"]};
function da()
{
    var a = document.createElement("DIV");
    document.body.appendChild(a);
    a.style.display = "none";
    a.style.position = "absolute";
    a.style.backgroundColor = "white";
    a.style.border = "1px solid gray";
    a.style.width = "150px";
    this.E = a;
    this.q = false
}
da.prototype.show = function()
{
    var a = "calListForm",b = ["<FORM id=",a,'><table style="border:0">'];
    b.push('<tr><td colspan="2">', "My Calendars", "</td></tr>");
    var c = [];
    this.od = {};
    var d = " onmouseover=\"this.style.textDecoration='underline'\" onmouseout=\"this.style.textDecoration='none'\"";
    for (var f = 0; f < aa.length; ++f)
    {
        if (f === eb)
        {
            b.push('<tr><td colspan="2">', "Other Calendars", "</td></tr>")
        }
        var g = aa[f],h = hb(g),i = h in D ? "CHECKED" : "";
        c.push(h);
        var j = g.xa();
        if (j in Qb)
        {
            j = Qb[j][ca[g.ia()] < ca.read ? 0 : 1]
        }
        var l = g.g();
        l = ea(l.replace(/([\W_])([^\W_])/g, "$1\u00ad$2")).replace(/\255/g, "<WBR>");
        var n = "cidTemp" + f;
        b.push('<tr><td style="vertical-align:top">', "<input type=CHECKBOX ", i, " id=", n, "></td>", '<td style="width:100%; padding-right: 4px">', '<div class="t2" style="background-color:', j, '">&nbsp;</div>');
        b.push('<div class=calChip style="cursor:pointer;background-color:', j, '; font-family:Verdana; font-size:86%; padding:2px">', '<label style="cursor:pointer" for=', n, d, ">", l, "</label></div>");
        b.push('<div class="t2" style="background-color:', j, '">&nbsp;</div></td></tr>')
    }
    b.push("</table>");
    this.E.innerHTML = b.join("");
    var r = s(a),x = r.elements;
    for (var f = 0; f < x.length; ++f)
    {
        var m = x[f];
        m.onchange = wd(c[f])
    }
    var u = bc(s("calListPopup")),q = this.E,p = u.y + 14 + 2,y = u.x + 15 - 150;
    if (ia)
    {
        p += 3;
        y += 6
    }
    else if (ha)
    {
        --y
    }
    else if (na)
    {
        y -= 2
    }
    q.style.top = p + "px";
    q.style.left = y + "px";
    q.style.display = "";
    this.q = true;
    Qc(this);
    Z(true)
};
da.prototype.hide = function()
{
    this.E.style.display = "none";
    this.q = false;
    Z(false)
};
da.prototype.wd = function()
{
    return this.od
};
da.prototype.Ga = function()
{
    return this.q
};
da.prototype.deactivate = function(a)
{
    if (this.q)
    {
        var b = wb(a);
        if (lb(this.E).contains(b) || lb(s("calListPopup")).contains(b))
        {
            return false
        }
        else
        {
            this.hide();
            return true
        }
    }
    else
    {
        return true
    }
};
function wd(a)
{
    return function()
    {
        $c(a)
    }
}
function $c(a)
{
    var b = null;
    if (a in D)
    {
        delete D[a]
    }
    else
    {
        D[a] = 1;
        b = a
    }
    fc();
    $b(wa(E.start), wa(E.end), mb, b);
    mb()
}
var ab;
function Ac()
{
    if (!ab)ab = new da;
    return ab
}
;
function ec(a)
{
    var b = /^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)\.\d+(\+|-)(\d\d):(\d\d)$/.exec(a);
    if (!b)
    {
        b = /^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)\.\d+Z$/.exec(a)
    }
    var c;
    if (b && b.length > 0)
    {
        c = new Date;
        c.setUTCFullYear(b[1], parseInt(b[2], 10) - 1, b[3]);
        c.setUTCHours(b[4]);
        c.setUTCMinutes(b[5]);
        c.setUTCSeconds(b[6]);
        var d = 0;
        if (b.length > 7)
        {
            d = parseInt(b[8], 10) * 60 + parseInt(b[9], 10);
            if (b[7] != "-")
            {
                d = -d
            }
        }
        c = new Date(c.getTime() + d * 60 * 1000);
        return new v(c.getFullYear(), c.getMonth() + 1, c.getDate(), c.getHours(), c.getMinutes(), c.getSeconds())
    }
    b = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec(a);
    if (b && b.length > 0)
    {
        c = new Date(b[1], parseInt(b[2], 10) - 1, b[3]);
        return o.create(c.getFullYear(), c.getMonth() + 1, c.getDate())
    }
    return null
}
function oa(a)
{
    return ec(a)
}
function cc(a)
{
    return ec(a)
}
function Ea(a)
{
    if (a.length === 10)return cc(a);
    return oa(a)
}
function wa(a)
{
    var b = a.month;
    if (b < 10)b = "0" + b;
    var c = a.date;
    if (c < 10)c = "0" + c;
    return a.year + "-" + b + "-" + c
}
;
var lc = new e.util.Template('<TR>  <TD class="eventCell timeSlot">All day  <TD style="width:100%" colspan=3>    <A href="${href}" target=_BLANK class=eventCell style="color:${color}">${title}</A>'),Vc = new e.util.Template('<TR>  <TD class="eventCell timeSlot">${time}  <TD style="width:100%" colspan=3>    <A href="${href}" target=_BLANK class=eventCell style="color:${color}">${title}</A>'),yc = new e.util.Template('<TR>  <TD class="eventCell timeSlot">&nbsp;  <TD style="width:100%" colspan=3>    <A href="${href}" target=_BLANK class=eventCell style="color:${color}">${title}   &raquo; ${time}</A>'),
        Kd = new e.util.Template('<TR id="${id}">  <TD align="right" class="eventCell"><IMG src="${icon}"       style="height:16px;width:16px;cursor:pointer;margin-right:5px">  <TD colspan=3><SPAN class=eventCell     onmouseover="this.style.textDecoration=\'underline\'"     onmouseout="this.style.textDecoration=\'none\'"     style="color:${color};cursor:pointer"     >${title}</SPAN>'),Wc = new e.util.Template('<TR>  <TD align="right" class="eventCell">    <IMG src="${icon}" height="16" width="16">  <TD class=eventCell colspan=3 style="color:${color}">${title}');
function Xc(a, b, c)
{
    if (b.jb())
    {
        Yc(a, b, c);
        return
    }
    var d = b.g(),f = b.wa().db(),g,h = false,i = ta(b) || !(g = oa(b.o())).b().equals(a) && !(h = oa(b.t()).b().equals(a)),j;
    if (i)
    {
        j = lc
    }
    else
    {
        if (h)
        {
            j = yc;
            j.put("time", Va(oa(b.t())))
        }
        else
        {
            j = Vc;
            j.put("time", Va(g))
        }
    }
    j.put("color", b.owner.color);
    j.put("title", ea(d || "(No Subject)"));
    j.put("href", f);
    c.push(j.toString())
}
function Yc(a, b, c)
{
    var d = b.jb(),f = Dd(d.fc()),g = ea(d.g()),h;
    h = Wc;
    h.put("color", b.owner.color);
    h.put("icon", f);
    h.put("title", g);
    c.push(h.toString())
}
function Dd(a)
{
    if (!a.match(/^https?:\/\//))return"about:blank";
    return window.escape(a).replace(/%3A/g, ":").replace(/%2F/g, "/").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/%3F/g, "?").replace(/%23/g, "#")
}
var V;
function pa(a)
{
    V = a || C;
    var b = 4,c = 0,d = 366,f = 0,g = [],h = J(V),i = true,j = ['<table cellspacing="1" style="width:100%">'];
    j.push('<tr><td width=0><td width="50%"><td width="25%"><td width="25%">');
    var l = Mb(V, j);
    while (c < b && f < d)
    {
        var n = h.b();
        if (E.end && n.a() > E.end.a())
        {
            var r = n;
            h.date += 366;
            var x = h.b();
            setTimeout(function()
            {
                Da(r, x, mb)
            }, 0);
            break
        }
        g.push(n);
        var m = g.length;
        Sb(n, g);
        var u = g.length - m;
        c += u;
        if (i)
        {
            i = false;
            if (u == 0)
            {
                j.push("<tr><td colspan=4 align=center>", "<I class=eventChip>", "No events on " + ub(V), "</I>")
            }
        }
        else if (u == 0)
        {
            g.pop()
        }
        h.date += 1;
        ++f
    }
    var q = V;
    for (var p = 1; p < g.length; ++p)
    {
        var y = g[p];
        if (y instanceof o)
        {
            q = y;
            l = Mb(q, j, l)
        }
        else
        {
            Xc(q, y, j)
        }
    }
    j.push("</table>");
    s("agendaTable").innerHTML = j.join("");
    Z()
}
function mb()
{
    pa(V);
    B.r()
}
var $ = {},bb,db,cb;
function Ad()
{
    $[C.a()] = ["Today",0];
    var a = J(C);
    a.date -= 1;
    $[a.b().a()] = ["Yesterday",-1];
    a.date += 2;
    $[a.b().a()] = ["Tomorrow",
            1];
    var b = C,c = ra(b);
    bb = (14 - c + U) % 7 || 7;
    a.date -= 1;
    a.month += 1;
    db = a.b();
    a.month -= 2;
    cb = a.b()
}
;
function Mb(a, b, c)
{
    var d,f = a.a(),g,h;
    if (f in $)
    {
        var i = $[f];
        d = i[0];
        h = i[1]
    }
    else
    {
        g = Bb(a, C);
        var j = g > 0,l = j ? bb : 8 - bb,n = Math.abs(g);
        if (n < l)
        {
            h = g;
            d = (j ? [null,null,"In 2 days","In 3 days","In 4 days","In 5 days","In 6 days"] : [null,null,"2 days ago","3 days ago","4 days ago","5 days ago","6 days ago"])[n]
                    || "";
            if (!j)h *= -1
        }
        else if (n < l + 7)
        {
            if (j)
            {
                h = 7;
                d = "Next Week"
            }
            else
            {
                h = -7;
                d = "Last Week"
            }
        }
        else if (a.year === C.year && a.month === C.month)
        {
            n = ((n - l) / 7 | 0) + 1;
            h = 7 * n;
            d = (j ? [null,null,"In 2 weeks","In 3 weeks","In 4 weeks","In 5 weeks","In 6 weeks"] : [null,null,"2 weeks ago","3 weeks ago","4 weeks ago","5 weeks ago","6 weeks ago"])[n]
                    || "";
            if (!j)h *= -1
        }
        else if (a.year === db.year && a.month === db.month)
        {
            h = 50;
            d = "Next Month"
        }
        else if (a.year === cb.year && a.month === cb.month)
        {
            h = -50;
            d = "Last Month"
        }
        else
        {
            h = a.year * 100 + a.month;
            d = qa[a.month] + " " + a.year
        }
    }
    if (!(f in $))
    {
        $[f] = [d,h]
    }
    if (h === c)d = undefined;
    if (!d)d = "&nbsp;";
    b.push("<tr><td colspan=4 class=agendaLine>&nbsp;");
    if ("en" === "en")
    {
        b.push('<tr><td colspan=2 class="dateDescription eventCell">', d, "<td class=eventCell colspan=2 ", 'style="text-align:right"><b>', xb(a), "</b>")
    }
    else
    {
        b.push("<tr><td class=eventCell colspan=4><b>", xb(a), "</b>")
    }
    return h
}
function nd(a)
{
    pa(a.startDate)
}
function od()
{
    var a = B.cc();
    Zb(a);
    var b = J(a),c = a.a() < C.a() ? -1 : 1;
    b.month += c;
    var d = b.b();
    Zb(d)
}
var ld = false;
function _toggleAgenda()
{
    P = !P;
    L.set("showAgenda", P.toString());
    var a = s("agenda").style;
    if (P)
    {
        ld = false;
        pa(B.gb() || V);
        a.display = ""
    }
    else
    {
        a.display = "none"
    }
    Ed();
    Z(P)
}
function Ed()
{
    var a = P ? "Hide Agenda" : "Show Agenda";
    s("toggleA").innerHTML = a
}
;
function _quickAdd()
{
    dd(s("quickAddText").value)
}
function dd(a)
{
    var b = new e.data.calendar.CalendarEventEntry;
    b.Sc(true);
    b.Ic(a);
    Aa.insert(K, b, pd);
    _hideQuickAdd()
}
var gb = false;
function Id()
{
    s("quickAddText").value = "";
    s("quickadd").style.display = "";
    var a = s("qa").style;
    a.backgroundColor = "rgb(195, 217, 255)";
    a.paddingBottom = "2px";
    Z(true);
    gb = true;
    setTimeout(function()
    {
        Tc("quickAddText")
    }, 0)
}
function _hideQuickAdd()
{
    s("quickadd").style.display = "none";
    var a = s("qa").style;
    a.backgroundColor = "white";
    a.paddingBottom = "0";
    Z(false);
    gb = false
}
function _toggleQuickAdd()
{
    var a = gb ? _hideQuickAdd : Id;
    a()
}
function pd(a)
{
    var b = {url:K,color:xa[K]};
    Yb([a], b);
    pa();
    var c = Ea(a.oc()[0].o()),d,f;
    if (c instanceof v)
    {
        d = Jc;
        f = Va(c)
    }
    else
    {
        d = Ic;
        f = undefined
    }
    var g = ub(c);
    Uc(d("<b>" + ea(a.g()) + "</b>", g, f))
}
function Uc(a)
{
    s("msgarea").innerHTML = a;
    s("msgtable").style.display = "";
    Z(true)
}
;

