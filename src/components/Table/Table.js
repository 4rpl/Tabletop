import React from 'react';
import * as actions from '../../actions/TableActions.js';
import { connect } from 'react-redux';

import Card from './Card';
import Deck from './Deck';
import '../../resources/style.css';

const mapStateToProps = function(state) {
	return {
		state: state
	};
}

const mapDispatchToProps = function(dispatch) {
	return {
		onTableScale: function(scale) {
			dispatch(actions.tableScale(scale));
		},
		onTableMove: function(x, y) {
			dispatch(actions.tableMove(x, y));
		},
		onTableMouseUp: function() {
			dispatch(actions.tableMouseUp());
		},
		onTableMouseDown: function(mx, my) {
			dispatch(actions.tableMouseDown(mx, my));
		}
	}
}

const Table = connect(
	mapStateToProps,
	mapDispatchToProps
)(function({ state, onTableScale, onTableMouseDown, onTableMove, onTableMouseUp }) {
	let table = state.table;
	
	function MouseDown(e) {
		onTableMouseDown(table.x - e.clientX, table.y - e.clientY);
		return false;
	}

	function MouseMove(e) {
		onTableMove(e.clientX + table.mx, e.clientY + table.my);
		return false;
	}
	
	if (table.active) {
		document.onmousemove = MouseMove;
		document.onmouseup = MouseUp;
	}

	function MouseUp(e) {
		document.onmousemove = undefined;
		document.onmouseup = undefined;
		onTableMouseUp();
		return false;
	}
	
	function Wheel(e) {
		if(e.deltaY > 0){
			onTableScale(-0.05);
		} else {
			onTableScale(0.05);
		}
		e.preventDefault();
	}
	
	let cards = state.cards.map(function(card) {
		return (
			<div key={'card_' + card.id}>
				<Card
					id={card.id}
					x={card.x}
					y={card.y}
					mx={card.mx}
					my={card.my}
					z={card.z}
					h={card.h}
					w={card.w}
					active={card.active}
					contentTop={card.contentTop}
					contentBottom={card.contentBottom}
					visible={card.visible} />
			</div>
		);
	});
	let decks = state.decks.map(function (deck) {
		return (
			<div key={'deck_' + deck.id}>
				<Deck
					id={deck.id}
					x={deck.x}
					y={deck.y}
					mx={deck.mx}
					my={deck.my}
					z={deck.z}
					h={deck.h}
					w={deck.w}
					active={deck.active}
					cards={deck.cards} />
			</div>
		)
	});
	return (
		<div
			className="Table"
			style={{position: 'absolute', top: table.y, left: table.x, transform: 'scale(' + table.scale + ')', width: table.w, height: table.h}}
			onWheel={Wheel}
			onMouseDown={MouseDown}>
			<div className="Table-body">
				<p>Card: lmb, rmb</p>
				<p>Deck: lmb, rmb, shift+lmb, focus+r</p>
				{decks}
				{cards}
			</div>
		</div>
	);
});

export default Table;
