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
		onDeckUp: function(mx, my, z) {
			dispatch(actions.deckUp(mx, my, z));
		},
		onDeckDown: function(id, x, y, h, w) {
			dispatch(actions.deckDown(id, x, y, h, w));
		},
		takeTopDeckCard: function(id, mx, my) {
			dispatch(actions.takeTopDeckCard(id, mx, my));
		},
		shuffleDeck: function(id) {
			dispatch(actions.shuffleDeck(id));
		}
	};
}

const Deck = connect(
	mapStateToProps,
	mapDispatchToProps
)(function({ id, x, y, mx = 0, my = 0, z = id, h, w, active = false, cards, onFlipDeck, onMoveDeck, onDeckUp, onDeckDown, takeTopDeckCard, shuffleDeck }) {
	
	function MouseDown(e) {
		//console.log('Down');
		if(e.shiftKey) {
			takeTopDeckCard(id, x - e.clientX, y - e.clientY);
		} else {
			onDeckUp(x - e.clientX, y - e.clientY, z);
		}
		e.stopPropagation();
		return false;
	}

	function OnContextMenu(e) {
		e.preventDefault();
		onFlipDeck(id);
		return false;
	}

	function MouseMove(e) {
		//console.log('Move');
		onMoveDeck(id, e.clientX + mx, e.clientY + my);
		return false;
	}

	function MouseUp(e) {
		//console.log('Up');
		document.onmousemove = undefined;
		document.onmouseup = undefined;
		onDeckDown(id, x, y, h, w);
		return false;
	}
	
	function OnKeyPress(e) {
		if (e.keyCode === 82) {
			shuffleDeck(id);
		}
		return false;
	}
	
	if (active) {
		document.onmousemove = MouseMove;
		document.onmouseup = MouseUp;
	}
	
	// Shuffle animation
	//<div style={{top: y, left: x, width: w, height: h, zIndex: z - 1}} className="deckAnimaiton deckAnimaitonLeft noselect">
	//	{cards[0].visible ? cards[0].contentTop : cards[0].contentBottom}
	//</div>
	//<div style={{top: y, left: x, width: w, height: h, zIndex: z - 1}} className="deckAnimaiton deckAnimaitonRight noselect">
	//	{cards[0].visible ? cards[0].contentTop : cards[0].contentBottom}
	//</div>
	let animation = (
		<div>
			<div style={{top: y, left: x, width: w, height: h, zIndex: z - 1, visibility: 'visible'}} className="deckAnimaiton deckAnimaitonLeft noselect">
				{cards[0].visible ? cards[0].contentTop : cards[0].contentBottom}
			</div>
			<div style={{top: y, left: x, width: w, height: h, zIndex: z - 1}} className="deckAnimaiton deckAnimaitonRight noselect">
				{cards[0].visible ? cards[0].contentTop : cards[0].contentBottom}
			</div>
		</div>
	);
	return (
		<div>
			{animation}
			<div style={{top: y, left: x, width: w, height: h, zIndex: z}}
				onMouseDown={MouseDown}
				onKeyDown={OnKeyPress}
				tabIndex="-1"
				onContextMenu={OnContextMenu}
				className="deck noselect">
				<span className="deckCardsCounter">{cards.length}</span>
				{cards[0].visible ? cards[0].contentTop : cards[0].contentBottom}
			</div>
		</div>
	);
});

export default Deck;