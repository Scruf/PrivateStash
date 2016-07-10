import {List,Map} from 'immutable';
export function next(state){
	const entries = state.get('entries');
	return state.merge({
		vote: Map({pair:entries.take(2)}),
		entries: entries.skip(2)
	})
}
export function setEnteries(state,entries){
	return state.set('entries',entries);
}