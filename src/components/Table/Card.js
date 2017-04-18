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
		onFlipCard: function(id) {
			dispatch(actions.flipCard(id));
		},
		onMoveCard: function(id, x, y) {
			dispatch(actions.moveCard(id, x, y));
		},
		onCardUp: function(mx, my, z) {
			dispatch(actions.cardUp(mx, my, z));
		},
		onCardDown: function(id, x, y, h, w) {
			dispatch(actions.cardDown(id, x, y, h, w));
		}
	}
}

const Card = connect(
	mapStateToProps,
	mapDispatchToProps
)(function({ id, x = 0, y = 0, mx = 0, my = 0, z = id, h = 142, w = 102, active = false, visible = false, contentTop = 'TOP', contentBottom = 'BOTTOM', onFlipCard, onMoveCard, onCardUp, onCardDown }) {

	function MouseDown(e) {
		//console.log('Down', x, y);
		onCardUp(x - e.clientX, y - e.clientY, z);
		return false;
	}

	function OnContextMenu(e) {
		e.preventDefault();
		onFlipCard(id);
		return false;
	}

	function MouseMove(e) {
		//console.log('Move', x, y);
		onMoveCard(id, e.clientX + mx, e.clientY + my);
		return false;
	}

	function MouseUp(e) {
		//console.log('Up', x, y);
		document.onmousemove = undefined;
		document.onmouseup = undefined;
		onCardDown(id, x, y, h, w);
		return false;
	}
	
	if (active) {
		document.onmousemove = MouseMove;
		document.onmouseup = MouseUp;
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