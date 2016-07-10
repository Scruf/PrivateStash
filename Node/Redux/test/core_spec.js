import {List,Map} from 'immutable';
import {expect} from 'chai';
import {setEnteries,next} from '../src/core';


decribe('application logic', ()=>{
	describe('setEnteries',()=>{
		it('added the enteries to the state', ()=>{
			const state = Map(),
					enteries = List.of("Transporting","20 Days Later"),
					nextState = setEnteries(state,enteries);
					expect(nextState).to.equal(Map({
						entries: List.of("Transporting","20 Days Later")
					}));
		});
	})
	describe("next", ()=>{
		it('takes the next two entries under vote', ()=>{
			const state = Map({
				entries: List.of('Transporting','20 Days Later')
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of("Transporting","20 Days Later")
				}),
				entries: List.of('Sunshine')
			}))
		})
	})

})