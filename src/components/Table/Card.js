import React from 'react';
import { flipCard, moveCard, cardUp } from '../../actions/TableActions.js';
import { connect } from 'react-redux';

import '../../resources/style.css';

const mapStateToProps = function(state) {
	return state;
}

const mapDispatchToProps = function(dispatch) {
	return {
		onFlipCard: function(id) {
			dispatch(flipCard(id));
		},
		onMoveCard: function(id, x, y) {
			dispatch(moveCard(id, x, y));
		},
		onCardUp: function(z) {
			dispatch(cardUp(z));
		}
	}
}

const Card = connect(
	mapStateToProps,
	mapDispatchToProps
)(function({ id, x = 0, y = 0, z = id, h = 142, w = 102, visible = false, contentTop = 'TOP', contentBottom = 'BOTTOM', onFlipCard, onMoveCard, onCardUp }) {
	let mx = 0;
	let my = 0;

	function MouseDown(e) {
		//console.log('Down');
		mx = e.clientX - x;
		my = e.clientY - y;
		document.onmousemove = MouseMove;
		document.onmouseup = MouseUp;
		onCardUp(z);
		return false;
	}

	function OnContextMenu(e) {
		e.preventDefault();
		onFlipCard(id);
		return false;
	}

	function MouseMove(e) {
		//console.log('Move');
		onMoveCard(id, e.clientX - mx, e.clientY - my);
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
			className="card noselect">
			{visible ? contentTop : contentBottom}
		</div>
	);
});

export default Card;