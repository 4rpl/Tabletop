//import { combineReducers } from 'redux';
import * as actions from '../actions/TableActions';

const _radius = 300;
const _minScale = 0.4;
const _maxScale = 1;

//card : {
//	id: 0,
//	x: 0,
//	y: 0,
//	mx: 0,
//	my: 0,
//	z: 0,
//	h: 102,
//	w: 142,
//	active: flase,
//	visible: true,
//	contentTop: '<img />',
//	contentBottom: '<img />'
//}

//deck: {
//	id: 0,
//	x: 0,
//	y: 0,
//	mx: 0,
//	my: 0,
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
						active: true,
						mx: action.mx,
						my: action.my,
						z: 100 + state.length
					});
				} else if (card.z > action.z) {
					return Object.assign({}, card, {
						z: card.z - 1
					});
				} else {
					return card;
				}
			});
		}
		case actions.ADD_CARD: {
			return [
				...state,
				{
					id: 			guid(),
					x: 				action.x,
					y: 				action.y,
					mx:				action.mx,
					my:				action.my,
					z:				100 + state.length + 1,
					h: 				action.h,
					w: 				action.w,
					active:			action.active,
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
			return state.map(function(deck, _) {
				if (deck.z === action.z) {
					return Object.assign({}, deck, {
						active: true,
						mx: action.mx,
						my: action.my,
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
		case actions.DECK_DOWN: {
			// колода может слиться с другой колодой
			for (let i in state) {
				let deck = state[i];
				if (deck.id !== action.id &&
					deck.w === action.w &&
					deck.h === action.h &&
					(deck.x - action.x)*(deck.x - action.x) + (deck.y - action.y)*(deck.y - action.y) <= _radius) {
					let cards = state.find(function(d) { return d.id === action.id }).cards;
					return state.filter(function(d) { return d.id !== action.id }).map(function(d) {
							if (d.id === deck.id) {
								return Object.assign({}, d, {
									cards: [
										...cards,
										...d.cards
									]
								});
							} else {
								return d;
							}
						});
				}
			}
			
			// или может ничего не произойти
			return state.map(function(deck) {
				if (deck.Id === action.Id) {
					return Object.assign({}, deck, {
						active: false
					});
				} else {
					return deck;
				}
			});
		}
		case actions.SHUFFLE_DECK: {
			// не чистая  функция, huh?
			let randoms = state
				.find(function(deck) { return deck.id === action.id })
				.cards.map(function(_, i) { return i });
			
			let m = randoms.length;
			while (m !== 0) {
				let i = Math.floor(Math.random() * m--);
				let t = randoms[m];
				randoms[m] = randoms[i];
				randoms[i] = t;
			}
	
			return state.map(function(deck) {
				if(deck.id === action.id) {
					return Object.assign({}, deck, {
						cards: randoms.map(function(i) { return deck.cards[i] })
					})
				} else {
					return deck;
				}
			});
		}
		default: {
			return state;
		}
	}
}

function table(state = {}, action) {
	switch (action.type) {
		case actions.TABLE_SCALE: {
			if(state.table.scale >= _maxScale && action.scale > 0){
				return state;
			}
			if(state.table.scale <= _minScale && action.scale < 0){
				return state;
			}
			return Object.assign({}, state, {
				table: {
					...state.table,
					scale: state.table.scale + action.scale
				}
			});
		}
		case actions.TABLE_MOUSE_UP: {
			return Object.assign({}, state, {
				table: {
					...state.table,
					active: false
				}
			});
		}
		case actions.TABLE_MOUSE_DOWN: {
			return Object.assign({}, state, {
				table: {
					...state.table,
					active: true,
					mx: action.mx,
					my: action.my
				}
			});
		}
		case actions.TABLE_MOVE: {
			if( action.x <= -state.table.w / 2 ||
				action.y <= -state.table.h / 2) {
				return Object.assign({}, state, {
					table: {
						...state.table,
						x: -state.table.w / 2,
						y: -state.table.h / 2
					}
				});
			}
			if( action.x >= state.table.w / 2 ||
				action.y >= state.table.h / 2) {
				return Object.assign({}, state, {
					table: {
						...state.table,
						x: action.x,
						y: action.y
					}
				});
			}
			return Object.assign({}, state, {
				table: {
					...state.table,
					x: action.x,
					y: action.y
				}
			});
		}
		case actions.CARD_DOWN: {
			// карта может попасть в существующую колоду
			for (let i in state.decks) {
				let deck = state.decks[i];
				if (deck.w === action.w &&
					deck.h === action.h &&
					(deck.x - action.x)*(deck.x - action.x) + (deck.y - action.y)*(deck.y - action.y) <= _radius) {
					let card = state.cards.find(function(c) { return c.id === action.id });
					return {
						table: state.table,
						cards: state.cards
							.filter(function(c) { return c.id !== action.id })
							.map(function(c) {
								if(c.z > card.z) {
									return Object.assign({}, c, {
										z: c.z - 1
									});
								} else {
									return c;
								}
							}),
						decks: state.decks.map(function (d) {
							if (d.id === deck.id) {
								return Object.assign({}, d, {
									cards: [
										Object.assign({}, card, {
											active: false
										}),
										...d.cards
									]
								});
							} else {
								return d;
							}
						})
					}
				}
			}
			
			// две карты могут сформировать новую колоду
			let newDeck = [];
			let cards = [];
			for (let i in state.cards) {
				let card = state.cards[i];
				if (card.w === action.w &&
					card.h === action.h &&
					(card.x - action.x)*(card.x - action.x) + (card.y - action.y)*(card.y - action.y) <= _radius) {
					newDeck.push(Object.assign({}, card, {
						active: false
					}));
				} else {
					cards.push(card);
				}
			}
			if (newDeck.length > 1) {
				return Object.assign({}, state, {
					cards: cards.map(function(card) {
						return Object.assign({}, card, {
							z: card.z - newDeck.reduce(function(acc, c) {
								return c.z < card.z ? acc + 1 : acc;
							}, 0)
						});
					}),
					decks: [
						...state.decks,
						{
							id: guid(),
							x: newDeck[0].x,
							y: newDeck[0].y,
							z: state.decks.length + 1,
							h: newDeck[0].h,
							w: newDeck[0].w,
							cards: newDeck.sort(function (a, b) {
								return a.z < b.z;
							})
						}
					]
				});
			}
			
			// или может ничего не произойти
			return Object.assign({}, state, {
					cards: state.cards.map(function(card) {
						if (card.Id === action.Id) {
							return Object.assign({}, card, {
								active: false
							});
						} else {
							return card;
						}
					})
				});
		}
		case actions.TAKE_TOP_DECK_CARD: {
			let deck = state.decks.find(function(d) { return d.id === action.id });
			if (deck.cards.length > 2) {
				return {
					table: state.table,
					cards: [
						...state.cards,
						Object.assign({}, deck.cards[0], {
							id: guid(),
							active: true,
							x: deck.x,
							y: deck.y,
							mx: action.mx,
							my: action.my,
							z: 100 + state.cards.length + 1
						})
					],
					decks: state.decks.map(function(d) {
						if (d.id === action.id) {
							return Object.assign({}, d, {
								cards: d.cards.slice(1)
							});
						} else {
							return d;
						}
					})
				}
			} else {
				return {
					table: state.table,
					cards: [
						...state.cards,
						Object.assign({}, deck.cards[1], {
							id: guid(),
							x: deck.x,
							y: deck.y,
							z: 100 + state.cards.length + 1
						}),
						Object.assign({}, deck.cards[0], {
							id: guid(),
							active: true,
							x: deck.x,
							y: deck.y,
							mx: action.mx,
							my: action.my,
							z: 100 + state.cards.length + 2
						})
					],
					decks: state.decks
						.filter(function(d) { return d.id !== action.id })
						.map(function(d) {
							if (d.z > deck.z) {
								return Object.assign({}, d, {
									z: d.z - 1
								});
							} else {
								return d;
							}
						})
				}
			}
		}
		default: {
			return {
				table: state.table || {
					x: 0,
					y: 0,
					scale: 1,
					w: 3000,
					h: 1600
				},
				cards: cards(state.cards, action),
				decks: decks(state.decks, action)
			};
		}
	}
}

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default tableReducer;