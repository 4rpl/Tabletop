import React, {Component} from 'react';
import '../resources/style.css';

class Card extends Component {
	
	cardTop;
	cardBack;
	onDrag;
	
	constructor(props) {
		super(props);
		this.cardTop = props.top;
		this.cardBack = props.back;
		this.onDrag = props.onDrag;
		this.state = {
			x: 0,
			y: 0,
			z: props.zIndex,
			mx: 0,
			my: 0,
			card: undefined,
			onTop: true,
			content: props.top,
		};
	}
	
	MouseDown(e) {
		//console.log('Down');
		if(this.onDrag) {
			this.onDrag(this);
		}
		this.setState( {
			card: e.target,
			mx: e.clientX - this.state.x,
			my: e.clientY - this.state.y
		} );
		document.onmousemove = this.MouseMove.bind(this);
		document.onmouseup = this.MouseUp.bind(this);
		return false;
	}
	
	MouseRC(e) {
		e.preventDefault();
		this.setState( {
			onTop: !this.state.onTop,
            content: !this.state.onTop ? this.cardTop : this.cardBack
		} );
		return false;
	}
	
	MouseMove(e) {
		//console.log('Move');
		this.setState( {
			x: e.clientX - this.state.mx,
			y: e.clientY - this.state.my
		} );
		this.state.card.style.left = this.state.x + "px";
		this.state.card.style.top = this.state.y + "px";
		return false;
	}
	
	MouseUp(e) {
		this.setState( {
			mx: e.clientX,
			my: e.clientY
		} );
		//console.log('Up');
		document.onmousemove = undefined;
		document.onmouseup = undefined;
		return false;
	}
	
	render() {
		return (
			<div onMouseDown={this.MouseDown.bind(this)} onContextMenu={this.MouseRC.bind(this)} className="card noselect">
				{this.state.content}
			</div>
		);
	}	
}

export default Card;