import React,{useEffect,useState,Fragment} from 'react'
import {Link} from 'react-router-dom'
import api from '../../services/api'
import './style.css'

export default function DashBoard(){
	const [spots,setSpots] = useState([])
	useEffect(()=>{
		async function loadSpots(){
			const user_id = localStorage.getItem('user')
			const request = {
				headers:{
					user_id,
				}
			}
			try{
				const response = await api.get('/dashboard/show',request)
				console.log('spots');
				console.log(response);
				setSpots(response.data)

			}
			catch(err){
				console.log(err);
			}

		}
		loadSpots()
	},[])

	return (
		<Fragment>
			<ul className="spot-list">
				{spots.map(spot=>
					<li key={spot._id}>
						<header style={{backgroundImage:`url(${spot.thumbnail_url})`}} />
						<strong>{spot.company}</strong>
						<span>{spot.price?`R$${spot.price}`:'GRATUITO'}</span>
					</li>
				)}
			</ul>
			<Link to='/new'>
				<button className='btn'>Cadastrar novo sport</button>
			</Link>

		</Fragment>
	)
}