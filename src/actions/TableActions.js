export const FLIP_CARD = 'FLIP_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const ADD_CARD = 'ADD_CARD';
export const CARD_UP = 'CARD_UP';
export const CARD_DOWN = 'CARD_DOWN';

export const FLIP_DECK = 'FLIP_DECK';
export const MOVE_DECK = 'MOVE_DECK';
export const DECK_UP = 'DECK_UP';
export const DECK_DOWN = 'DECK_DOWN';
export const SHUFFLE_DECK = 'SHUFFLE_DECK';
export const TAKE_TOP_DECK_CARD = 'TAKE_TOP_DECK_CARD';

export const TABLE_SCALE = 'TABLE_SCALE';
export const TABLE_MOVE = 'TABLE_MOVE';
export const TABLE_MOUSE_DOWN = 'TABLE_MOUSE_DOWN';
export const TABLE_MOUSE_UP = 'TABLE_MOUSE_UP';



export function flipCard(id) {
	return { type: FLIP_CARD, id };
}
export function moveCard(id, x, y) {
	return { type: MOVE_CARD, id, x, y };
}
export function addCard(id, x, y, mx, my, h, w, visible, active, contentTop, contentBottom) {
	return { type: ADD_CARD, id, x, y, mx, my, h, w, visible, active, contentTop, contentBottom };
}
export function cardUp(mx, my, z) {
	return { type: CARD_UP, mx, my, z };
}
export function cardDown(id, x, y, h, w) {
	return { type: CARD_DOWN, id, x, y, h, w };
}

export function flipDeck(id) {
	return { type: FLIP_DECK, id };
}
export function moveDeck(id, x, y) {
	return { type: MOVE_DECK, id, x, y };
}
export function deckUp(mx, my, z) {
	return { type: DECK_UP, mx, my, z };
}
export function deckDown(id, x, y, h, w) {
	return { type: DECK_DOWN, id, x, y, h, w };
}
export function shuffleDeck(id) {
	return { type: SHUFFLE_DECK, id };
}
export function takeTopDeckCard(id, mx, my) {
	return { type: TAKE_TOP_DECK_CARD, id, mx, my };
}

export function tableScale(scale) {
	return { type: TABLE_SCALE, scale };
}
export function tableMove(x, y) {
	return { type: TABLE_MOVE, x, y };
}
export function tableMouseDown(mx, my) {
	return { type: TABLE_MOUSE_DOWN, mx, my };
}
export function tableMouseUp() {
	return { type: TABLE_MOUSE_UP };
}