import React from 'react';
import * as actions from '../../actions/TableActions.js';
import { connect } from 'react-redux';

import '../../resources/style.css';

const mapStateToProps = function(state) {
	return {
		state: state
	};
}

const mapDispatchToProps = function(dispatch) {
	return {
		onFlipDeck: function(id) {
			dispatch(actions.flipDeck(id));
		},
		onMoveDeck: function(id, x, y) {
			dispatch(actions.moveDeck(id, x, y));
		},
		onDeckUp: function(z) {
			dispatch(actions.deckUp(z));
		}
	};
}

const Deck = connect(
	mapStateToProps,
	mapDispatchToProps
)(function({ id, x, y, z, h, w, cards, onFlipDeck, onMoveDeck, onDeckUp }) {
	
	let mx = 0;
	let my = 0;

	function MouseDown(e) {
		//console.log('Down');
		mx = e.clientX - x;
		my = e.clientY - y;
		document.onmousemove = MouseMove;
		document.onmouseup = MouseUp;
		onDeckUp(z);
		return false;
	}

	function OnContextMenu(e) {
		e.preventDefault();
		onFlipDeck(id);
		return false;
	}

	function MouseMove(e) {
		//console.log('Move');
		onMoveDeck(id, e.clientX - mx, e.clientY - my);
		return false;
	}

	function MouseUp(e) {
		//console.log('Up');
		document.onmousemove = undefined;
		document.onmouseup = undefined;
		return false;
	}
	
	return (
		<div
			style={{top: y, left: x, width: w, height: h, zIndex: z}}
			onMouseDown={MouseDown}
			onContextMenu={OnContextMenu}
			className="deck noselect">
			{cards[0].visible ? cards[0].contentTop : cards[0].contentBottom}
		</div>
	)
});

export default Deck;