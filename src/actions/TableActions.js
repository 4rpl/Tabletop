export const FLIP_CARD = 'FLIP_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const ADD_CARD = 'ADD_CARD';
export const CARD_UP = 'CARD_UP';

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