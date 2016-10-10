import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import SnapGrid from './components/snap-grid';
import SingleSnap from './components/single-snap';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

const router = (
	<Provider store={store}>
		<Router history={browserHistory} >
			<Route path="/" component={App}>
				<IndexRoute component={SnapGrid} />
				<Route path="/snap/:snapId" component={SingleSnap} />
			</Route>
		</Router>
	</Provider>
);

ReactDOM.render(router, document.getElementById('app'));
