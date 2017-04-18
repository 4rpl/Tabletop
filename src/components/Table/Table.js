import React from 'react';
import { connect } from 'react-redux';

import Card from './Card';
import Deck from './Deck';
import '../../resources/style.css';
import logo from '../../resources/logo.svg';

const mapStateToProps = function(state) {
	return {
		state: state
	};
}

const mapDispatchToProps = function(dispatch) {
	return {
	}
}

const Table = connect(
	mapStateToProps,
	mapDispatchToProps
)(function({ state }) {
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
		<div className="Table">
			<div className="Table-header">
				<img src={logo} className="Table-logo" alt="logo" />
				<h2>Welcome to React</h2>
			</div>
			<div className="Table-body">
				{decks}
				{cards}
			</div>
		</div>
	);
});

export default Table;
