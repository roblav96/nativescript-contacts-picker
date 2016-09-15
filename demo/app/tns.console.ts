// 

import * as application from "application"
var _ = require("lodash")
var moment = require("moment")
var colors = require("ansicolors")
var styles = require("ansistyles")



global.tnsconsole = {
	'chrome': function chrome(str: string, obj: any) {
		let sendi: any = {
			str: str,
			members: '',
			properties: [],
			array: {},
		}

		let cachei = []
		let cachev = []
		sendi.members = JSON.stringify(obj, function(k, v) {
			cachei.push(k)
			if (typeof v === 'object' && v !== null) {
				if (cachev.indexOf(v) !== -1) {
					return (v.toString ? v.toString() : v)
				}
				cachev.push(v)
			}
			if (typeof v === 'function') {
				return k + "()" + v
			}
			return v
		}, 4)

		// sendi.members = map(obj, function(v, k) {
		// 	cachei.push(k)
		// 	if (typeof v === 'object' && v !== null) {
		// 		if (cachev.indexOf(v) !== -1) {
		// 			return (v.toString ? v.toString() : v)
		// 		}
		// 		cachev.push(v)
		// 	}
		// 	if (typeof v === 'function') {
		// 		return k + "()" + v
		// 	}
		// 	return v
		// })

		// console.log(colors.blue('[sendi] '), sendi)
		// console.dump(sendi)

		for (var id in obj) {
			try {
				if (typeof (obj[id]) === 'function') {
					sendi.properties.push(id + '()')
				}
				else {
					if (typeof (obj[id]) !== 'object' && cachei.indexOf(id) === -1) {
						sendi.properties.push(id + ": " + (obj[id]))
					}
				}
			} catch (err) {
				sendi.properties.push(id + ': inaccessible')
			}
		}

		let forcearray: boolean = false
		if (_.isArray(obj)) {
			forcearray = true
			// global.tnsconsole.error('forcearray', forcearray)
			// global.tnsconsole.error('isArray(obj)', isArray(obj))
			let i, len = obj.length
			for (i = 0; i < len; i++) {
				sendi.array[i] = obj[i]
			}
			// global.tnsconsole.log('sendi.array', sendi.array)
		}

		// android.util.Log.v(obj)
		// console.log(obj)
		// console.dump(obj)

		//      global.tnsconsole.log('typeof logit', typeof logit)

		//      let is = []
		//      let vs = []

		//      if (isFunction(logit)) {
		// sendi = JSON.stringify(logit.toString())
		//      } else if (isString(logit) || isNumber(logit) || isBoolean(logit)) {
		// sendi = JSON.stringify(logit)
		//      } else if (isArray(logit)) {

		//      }

		console.dump(obj)

		// let size: any = Object.keys(sendi.members).length
		// if (size <= 1000 && forcearray == false) {
		// 	console.dump(obj)
		// } else {
		// 	// console.log('\n ' + colors.blue('[CHROME] ') + '> ' + str + '\n \n')
		// 	console.log(colors.blue(styles.underline('[Node Inspector]')))
		// 	// request({
		// 	// 	url: ip + '/api/log',
		// 	// 	method: "POST",
		// 	// 	headers: { "Content-Type": "application/json" },
		// 	// 	content: JSON.stringify(sendi),
		// 	// })
		// }

		cachei = null
		cachev = null
		sendi = null
	},

	'logit': function logit(type: string, args: any[]) {
		let errs = []
		let str = '\n' // + this.getStack() + '\n'
		{
			let i, len = args.length
			for (i = 0; i < len; i++) {
				let arg // cause args[i] = JSON.stringify(args[i]) would overwrite the original object
				if (typeof args[i] == 'object') {
					if (args[i] instanceof Error) {
						errs.push(args[i])
					}
					arg = JSON.stringify(args[i])
				} else if (i == 1 && typeof args[i] == 'string') {
					arg = styles.underline(args[i])
				} else {
					arg = args[i]
				}
				if (i == 0) {
					str = str + arg + this.getStack(2) + '\n'
				} else if (i == len - 1) {
					str = str + arg
				} else {
					str = str + arg + ' > '
				}
			}
		}
		str = str + '\n \n'
		console[type](str)
		{
			let i, len = errs.length
			for (i = 0; i < len; i++) {
				console.error(errs[i])
				console.dump(errs[i])
				this.dumpit('ERROR', errs[i])
			}
		}
	},

	'getStack': function getStack(num: number): string {
		if (application.ios) {
			num--
		}
		// let t: string = colors.magenta(moment().format('hh:mm:ss:SSS')) + ' '
		let t: string = moment().format('hh:mm:ss:SSS') + ' '
		let stack: string = (<any>(new Error())).stack.toString()
        stack = stack.replace(/^([^\n]*?\n){2}((.|\n)*)$/gmi, "$2")
        stack = stack.split('\n')[num]
        stack = '@' + stack.substring(6, stack.length)
        let ia: number = stack.indexOf('/data/')
        let ib: number = stack.indexOf('/app/')
        let a: string = stack.substring(0, ia)
        let b: string = stack.substring(ib + 4, stack.length)
        return t + a + b
	},

	'log': function log(...args: any[]) {
		args.unshift(colors.blue('[LOG] '))
		this.logit('log', args)
	},

	'info': function info(...args: any[]) {
		args.unshift(colors.green('[INFO] '))
		this.logit('info', args)
	},

	'warn': function warn(...args: any[]) {
		args.unshift(colors.yellow('[WARN] '))
		this.logit('warn', args)
	},

	'error': function error(...args: any[]) {
		args.unshift(colors.red('[ERROR] '))
		if (typeof args[1] == 'string') {
			args[1] = colors.red(args[1])
		}
		this.logit('error', args)
	},

	'dumpit': function dumpit(def: string, obj: any) {
		if (_.isUndefined(obj) || _.isNull(obj)) {
			console.log('\n' + colors.red('▼ ▼ ▼ ▼  ' + styles.underline(def) + '  ▼ ▼ ▼ ▼') + ' ' + this.getStack(1))
			console.log('\n' + colors.red('IS NULL'))
			console.log('\n' + colors.red('▲ ▲ ▲ ▲  ' + styles.underline(def) + '  ▲ ▲ ▲ ▲') + '\n')
		} else {
			console.log('\n' + colors.blue('▼ ▼ ▼ ▼  ' + styles.underline(def) + '  ▼ ▼ ▼ ▼') + ' ' + this.getStack(1))
			this.chrome(def, obj)
			console.log('\n' + colors.blue('▲ ▲ ▲ ▲  ' + styles.underline(def) + '  ▲ ▲ ▲ ▲') + '\n')
		}
	},

}

global.tnsconsole.dump = global.tnsconsole.dumpit
global.tnsconsole.dir = global.tnsconsole.dumpit

// global.tnsconsole = new TnsConsole()


