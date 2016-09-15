"use strict";
var application = require("application");
var _ = require("lodash");
var moment = require("moment");
var colors = require("ansicolors");
var styles = require("ansistyles");
global.tnsconsole = {
    'chrome': function chrome(str, obj) {
        var sendi = {
            str: str,
            members: '',
            properties: [],
            array: {},
        };
        var cachei = [];
        var cachev = [];
        sendi.members = JSON.stringify(obj, function (k, v) {
            cachei.push(k);
            if (typeof v === 'object' && v !== null) {
                if (cachev.indexOf(v) !== -1) {
                    return (v.toString ? v.toString() : v);
                }
                cachev.push(v);
            }
            if (typeof v === 'function') {
                return k + "()" + v;
            }
            return v;
        }, 4);
        for (var id in obj) {
            try {
                if (typeof (obj[id]) === 'function') {
                    sendi.properties.push(id + '()');
                }
                else {
                    if (typeof (obj[id]) !== 'object' && cachei.indexOf(id) === -1) {
                        sendi.properties.push(id + ": " + (obj[id]));
                    }
                }
            }
            catch (err) {
                sendi.properties.push(id + ': inaccessible');
            }
        }
        var forcearray = false;
        if (_.isArray(obj)) {
            forcearray = true;
            var i = void 0, len = obj.length;
            for (i = 0; i < len; i++) {
                sendi.array[i] = obj[i];
            }
        }
        console.dump(obj);
        cachei = null;
        cachev = null;
        sendi = null;
    },
    'logit': function logit(type, args) {
        var errs = [];
        var str = '\n';
        {
            var i = void 0, len = args.length;
            for (i = 0; i < len; i++) {
                var arg = void 0;
                if (typeof args[i] == 'object') {
                    if (args[i] instanceof Error) {
                        errs.push(args[i]);
                    }
                    arg = JSON.stringify(args[i]);
                }
                else if (i == 1 && typeof args[i] == 'string') {
                    arg = styles.underline(args[i]);
                }
                else {
                    arg = args[i];
                }
                if (i == 0) {
                    str = str + arg + this.getStack(2) + '\n';
                }
                else if (i == len - 1) {
                    str = str + arg;
                }
                else {
                    str = str + arg + ' > ';
                }
            }
        }
        str = str + '\n \n';
        console[type](str);
        {
            var i = void 0, len = errs.length;
            for (i = 0; i < len; i++) {
                console.error(errs[i]);
                console.dump(errs[i]);
                this.dumpit('ERROR', errs[i]);
            }
        }
    },
    'getStack': function getStack(num) {
        if (application.ios) {
            num--;
        }
        var t = moment().format('hh:mm:ss:SSS') + ' ';
        var stack = (new Error()).stack.toString();
        stack = stack.replace(/^([^\n]*?\n){2}((.|\n)*)$/gmi, "$2");
        stack = stack.split('\n')[num];
        stack = '@' + stack.substring(6, stack.length);
        var ia = stack.indexOf('/data/');
        var ib = stack.indexOf('/app/');
        var a = stack.substring(0, ia);
        var b = stack.substring(ib + 4, stack.length);
        return t + a + b;
    },
    'log': function log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        args.unshift(colors.blue('[LOG] '));
        this.logit('log', args);
    },
    'info': function info() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        args.unshift(colors.green('[INFO] '));
        this.logit('info', args);
    },
    'warn': function warn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        args.unshift(colors.yellow('[WARN] '));
        this.logit('warn', args);
    },
    'error': function error() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        args.unshift(colors.red('[ERROR] '));
        if (typeof args[1] == 'string') {
            args[1] = colors.red(args[1]);
        }
        this.logit('error', args);
    },
    'dumpit': function dumpit(def, obj) {
        if (_.isUndefined(obj) || _.isNull(obj)) {
            console.log('\n' + colors.red('▼ ▼ ▼ ▼  ' + styles.underline(def) + '  ▼ ▼ ▼ ▼') + ' ' + this.getStack(1));
            console.log('\n' + colors.red('IS NULL'));
            console.log('\n' + colors.red('▲ ▲ ▲ ▲  ' + styles.underline(def) + '  ▲ ▲ ▲ ▲') + '\n');
        }
        else {
            console.log('\n' + colors.blue('▼ ▼ ▼ ▼  ' + styles.underline(def) + '  ▼ ▼ ▼ ▼') + ' ' + this.getStack(1));
            this.chrome(def, obj);
            console.log('\n' + colors.blue('▲ ▲ ▲ ▲  ' + styles.underline(def) + '  ▲ ▲ ▲ ▲') + '\n');
        }
    },
};
global.tnsconsole.dump = global.tnsconsole.dumpit;
global.tnsconsole.dir = global.tnsconsole.dumpit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG5zLmNvbnNvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0bnMuY29uc29sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBWSxXQUFXLFdBQU0sYUFDN0IsQ0FBQyxDQUR5QztBQUMxQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDekIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzlCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUNsQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7QUFJbEMsTUFBTSxDQUFDLFVBQVUsR0FBRztJQUNuQixRQUFRLEVBQUUsZ0JBQWdCLEdBQVcsRUFBRSxHQUFRO1FBQzlDLElBQUksS0FBSyxHQUFRO1lBQ2hCLEdBQUcsRUFBRSxHQUFHO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsRUFBRTtZQUNkLEtBQUssRUFBRSxFQUFFO1NBQ1QsQ0FBQTtRQUVELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNmLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNmLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQztZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEdB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