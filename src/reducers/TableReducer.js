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

//deck: {
//	id: 0,
//	x: 0,
//	y: 0,
//	z: 0,
//	h: 0,
//	w: 0,
//	cards[]
//}

const tableReducer = table;

function cards(state = [], action) {
	switch (action.type) {
		case actions.FLIP_CARD: {
			return state.map((card, _) => {
				return card.id === action.id
					? Object.assign({}, card, {
						visible: !card.visible
					})
					: card;
			})
		}	
		case actions.MOVE_CARD: {
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
		}
		case actions.CARD_UP: {
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
		}
		case actions.ADD_CARD: {
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
		}
		default: {
			return state;
		}
	}
}

function decks(state = [], action) {
	switch (action.type) {
		case actions.FLIP_DECK: {
			return state.map((deck, _) => {
				if (deck.id === action.id) {
					return Object.assign({}, deck, {
						cards: deck.cards.slice().reverse().map(function(card, _) {
							return Object.assign({}, card, {
								visible: !card.visible
							});
						})
					});
				} else {
					return deck;
				}
			})
		}
		case actions.MOVE_DECK: {
			return state.map((deck, _) => {
				if (deck.id === action.id) {
					return Object.assign({}, deck, {
						x: action.x,
						y: action.y
					});
				} else {
					return deck;
				}
			})
		}
		case actions.DECK_UP: {
			return state.map((deck, _) => {
				if (deck.z === action.z) {
					return Object.assign({}, deck, {
						z: state.length
					});
				} else if (deck.z > action.z) {
					return Object.assign({}, deck, {
						z: deck.z - 1
					});
				} else {
					return deck;
				}
			})
		}
		default: {
			return state;
		}
	}
}

function table(state = {}, action) {
	switch (action.type) {
		case actions.CARD_DOWN: {
			let deck = [];
			let cards = [];
			for (let i in state.cards) {
				let card = state.cards[i];
				let radius = (card.x - action.x)*(card.x - action.x) + (card.y - action.y)*(card.y - action.y);
				//console.log(card);
				//console.log(card.w, action.w, card.h, action.h, action.x, action.y, radius);
				if (card.w === action.w &&
					card.h === action.h &&
					radius <= 10) {
					deck.push(card);
				} else {
					cards.push(card);
				}
			}
			console.log(deck.length);
			if (deck.length > 1) {
				return Object.assign({}, state, {
					cards: cards,
					decks: [
						...state.decks,
						{
							id: state.decks.length,
							x: cards[0].x,
							y: cards[0].y,
							z: state.decks.length,
							h: cards[0].h,
							w: cards[0].w,
							cards: cards
						}
					]
				});
			} else {
				return state;
			}
		}
		default: {
			return {
				cards: cards(state.cards, action),
				decks: decks(state.decks, action)
			};
		}
	}
}

export default tableReducer;