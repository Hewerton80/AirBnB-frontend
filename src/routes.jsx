import React from 'react'

import {BrowserRouter,Switch,Route} from 'react-router-dom';

import Login from './screens/login'
import DashBoard from './screens/dashBoard'
import New from './screens/new'

export default function Router(){
	return(
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Login} />
				<Route path='/dashBoard' exact component={DashBoard} />
				<Route path='/new' exact component={New} />
			</Switch>
		</BrowserRouter>
	)
}