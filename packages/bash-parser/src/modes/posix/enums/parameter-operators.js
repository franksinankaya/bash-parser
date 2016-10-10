'use strict';

const name = '[a-zA-Z_][a-zA-Z0-9_]*';

const parameterOps = {
	[`^(${name}):\\-(.*)$`]: {
		op: 'useDefaultValue',
		parameter: m => m[1],
		word: {text: m => m[2], expand: true}
	},
	[`^(${name}):\\=(.*)$`]: {
		op: 'assignDefaultValue',
		parameter: m => m[1],
		word: {text: m => m[2], expand: true}
	},
	[`^(${name}):\\?(.*)$`]: {
		op: 'indicateErrorIfNull',
		parameter: m => m[1],
		word: {text: m => m[2], expand: true}
	},
	[`^(${name}):\\+(.*)$`]: {
		op: 'useAlternativeValue',
		parameter: m => m[1],
		word: {text: m => m[2], expand: true}
	},
	[`^([1-9][0-9]*)$`]: {
		kind: 'positional',
		parameter: m => Number(m[1])
	},

	'^!$': {
		kind: 'last-background-pid'
	},

	'^\\@$': {
		kind: 'positional-list'
	},

	'^\\-$': {
		kind: 'current-option-flags'
	},

	'^\\#$': {
		kind: 'positional-count'
	},

	'^\\?$': {
		kind: 'last-exit-status'
	},

	'^\\*$': {
		kind: 'positional-string'
	},

	'^\\$$': {
		kind: 'shell-process-id'
	},

	'^0$': {
		kind: 'shell-script-name'
	}

};

module.exports = parameterOps;

