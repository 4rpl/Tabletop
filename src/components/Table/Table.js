import React from 'react';
import { connect } from 'react-redux';

import Card from './Card';
import Deck from './Deck';
import '../../resources/style.css';
import logo from '../../resources/logo.svg';

//import * as reducers from '../reducers';

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
					z={card.z}
					contentTop={card.contentTop}
					contentBottom={card.contentBottom}
					visible={card.visible} />
			</div>
		);
	});
	return (
		<div className="Table">
			<div className="Table-header">
				<img src={logo} className="Table-logo" alt="logo" />
				<h2>Welcome to React</h2>
			</div>
			<div className="Table-body">
				{cards}
			</div>
		</div>
	);
});

export default Table;
