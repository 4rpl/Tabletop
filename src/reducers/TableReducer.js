import { combineReducers } from 'redux';
import * as actions from '../actions/TableActions';

//card : {
//	id: 0,
//	x: 0,
//	y: 0,
//	z: 0,
//	h: 102,
//	w: 142,
//	visible: true,
//	contentTop: '<img />',
//	contentBottom: '<img />'
//}

const tableReducer = combineReducers({
	cards: cards
});

function cards(state = [], action) {
	console.log(action);
	switch (action.type) {
		case actions.FLIP_CARD:
			return state.map((card, _) => {
				return card.id === action.id
					? Object.assign({}, card, {
						visible: !card.visible
					})
					: card;
			})
			
		case actions.MOVE_CARD:
			return state.map((card, _) => {
				if (card.id === action.id) {
					return Object.assign({}, card, {
						x: action.x,
						y: action.y
					});
				} else {
					return card;
				}
			})
			
		case actions.CARD_UP:
			return state.map((card, _) => {
				if (card.z === action.z) {
					return Object.assign({}, card, {
						z: state.length
					});
				} else if (card.z > action.z) {
					return Object.assign({}, card, {
						z: card.z - 1
					});
				} else {
					return card;
				}
			})
			
		case actions.ADD_CARD:
			return [
				...state,
				{
					id: 			action.id,
					x: 				action.x,
					y: 				action.y,
					z:				action.id,
					h: 				action.h,
					w: 				action.w,
					visible: 		action.visible,
					contentTop: 	action.contentTop,
					contentBottom: 	action.contentBottom
				}
			]
		default:
			return state;
	}
}

export default tableReducer;