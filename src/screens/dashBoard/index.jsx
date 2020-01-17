import React,{useEffect,useState,Fragment} from 'react'
import {Link,useHistory} from 'react-router-dom'
import LoadingImg from '../../assets/loading.gif'
import api from '../../services/api'
import './style.css'

export default function DashBoard(props){
	const history = useHistory()
	if(!sessionStorage.getItem("user")){
		history.push('/')
	}
	const [spots,setSpots] = useState([])
	const [loading,setLoading] = useState(false)
	useEffect(()=>{
		async function loadSpots(){
			const user_id = localStorage.getItem('user')
			const request = {
				headers:{
					user_id,
				}
			}
			try{
				setLoading(true)
				const response = await api.get('/dashboard/show',request)
				setLoading(false)
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
			{loading?
			<img src={LoadingImg} alt="loading"/>
			:
			<ul className="spot-list">
				{spots.map(spot=>
					<li key={spot._id}>
						<header style={{backgroundImage:`url(${spot.thumbnail_url})`}} />
						<strong>{spot.company}</strong>
						<span>{spot.price?`R$${spot.price}`:'GRATUITO'}</span>
					</li>
				)}
			</ul>
			}
			<Link to='/new'>
				<button className='btn'>Cadastrar novo sport</button>
			</Link>

		</Fragment>
	)
}