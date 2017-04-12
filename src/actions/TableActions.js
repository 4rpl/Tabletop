export const FLIP_CARD = 'FLIP_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const ADD_CARD = 'ADD_CARD';
export const CARD_UP = 'CARD_UP';
export const CARD_DOWN = 'CARD_DOWN';

export const FLIP_DECK = 'FLIP_DECK';
export const MOVE_DECK = 'MOVE_DECK';
export const DECK_UP = 'DECK_UP';



export function flipCard(id) {
	return { type: FLIP_CARD, id };
}
export function moveCard(id, x, y) {
	return { type: MOVE_CARD, id, x, y };
}
export function addCard(id, x, y, h, w, visible, contentTop, contentBottom) {
	return { type: ADD_CARD, id, x, y, h, w, visible, contentTop, contentBottom };
}
export function cardUp(z) {
	return { type: CARD_UP, z };
}
export function cardDown(x, y, w, h) {
	return { type: CARD_DOWN, x, y, w, h };
}

export function flipDeck(id) {
	return { type: FLIP_DECK, id };
}
export function moveDeck(id, x, y) {
	return { type: MOVE_DECK, id, x, y };
}
export function deckUp(z) {
	return { type: DECK_UP, z };
}