import React from 'react'
import Routes from './routes'
import './App.css'
import logo from './assets/airbnb.svg'

const App = (props) => {
	return(
		<div className='container'>
			<img src={logo} alt='logo' width='80px'/>
			<div className="content">
				<Routes/>
			</div>
		</div>
	)
}
export default App;
