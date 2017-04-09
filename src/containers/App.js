import React, {Component} from 'react';
import { combineReducers, createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import Card from '../components/Card';
import logo from '../resources/logo.svg';
import top1 from '../resources/top1.png';
import top2 from '../resources/top2.png';
import top3 from '../resources/top3.png';
import '../resources/style.css';

//import * as reducers from '../reducers';

//const reducer = combineReducers(reducers);
//const store = createStore(reducer);

class App extends Component {
	
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<div className="App-body">
					<Card top={<img src={top1} alt="top" />} back={<img src={logo} className="App-logo" alt="bottom" />} />
					<Card top={<img src={top2} alt="top" />} back={<img src={logo} className="App-logo" alt="bottom" />} />
					<Card top={<img src={top3} alt="top" />} back={<img src={logo} className="App-logo" alt="bottom" />} />
				</div>
			</div>
		);
	}
}

export default App;
