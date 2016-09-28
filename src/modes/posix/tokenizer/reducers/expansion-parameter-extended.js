'use strict';

import last from 'array-last';
import {continueToken} from '..';

export default function expansionParameterExtended(state, source) {
	const char = source && source.shift();

	const xp = last(state.expansion);

	if (char === '}') {
		const newXp = {
			...xp,
			type: 'parameter_expansion',
			loc: {...xp.loc, end: state.loc.current}
		};

		const expansion = state.expansion
			.slice(0, -1)
			.concat(newXp);

		return {
			nextReduction: state.previousReducer,
			nextState: state.appendChar(char).setExpansion(expansion)
		};
	}

	if (char === undefined) {
		const newXp = {
			...xp,
			loc: {...xp.loc, end: state.loc.previous}
		};

		const expansion = state.expansion
			.slice(0, -1)
			.concat(newXp);

		return {
			nextReduction: state.previousReducer,
			tokensToEmit: [continueToken('${')],
			nextState: state.setExpansion(expansion)
		};
	}

	const newXp = {
		...xp,
		parameter: (xp.parameter || '') + char
	};

	const expansion = state.expansion
			.slice(0, -1)
			.concat(newXp);

	return {
		nextReduction: expansionParameterExtended,
		nextState: state.appendChar(char).setExpansion(expansion)
	};
}
