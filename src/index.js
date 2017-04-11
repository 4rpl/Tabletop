import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table/Table';
import './resources/style.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { addCard } from './actions/TableActions.js';

import logo from './resources/logo.svg';
import top1 from './resources/top1.png';
import top2 from './resources/top2.png';
import top3 from './resources/top3.png';

import tableReducer from './reducers/TableReducer'

let store = createStore(tableReducer);

store.dispatch(addCard(
	1, 0, 0, 102, 142, false,
	<img src={top1} alt="top" />,
	<img src={logo} className="Table-logo" alt="bottom" />
));
store.dispatch(addCard(
	2, 0, 0, 102, 142, false,
	<img src={top2} alt="top" />,
	<img src={logo} className="Table-logo" alt="bottom" />
));
store.dispatch(addCard(
	3, 0, 0, 102, 142, false,
	<img src={top3} alt="top" />,
	<img src={logo} className="Table-logo" alt="bottom" />
));

ReactDOM.render(
	<Provider store={store}>
		<Table />
	</Provider>,
	document.getElementById('root')
);
