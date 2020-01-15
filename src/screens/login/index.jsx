import React,{Fragment,useState} from 'react'
import api from '../../services/api'
import LoadingImg from '../../assets/loading.gif'

export default function Login(props){
	const [email,setEmail] = useState('')
	const [loading,setLoading] = useState(false)
	async function handleSubmit(e){
		e.preventDefault()
		const request={
			email,
		}
		try{
			setLoading(true)
			const response = await api.post('/sessions/store',request)
			setLoading(false)
			localStorage.setItem('user',response.data.user._id)
			props.history.push('/dashBoard')
		}
		catch(err){
			console.log(err);
		}
	}
	function hangleInputChange(e){
		setEmail(e.target.value)
	}
	return(
		<Fragment>
			<p>
				Ofereça <b>spots</b> para programadores e encontre <b>talentos</b> para sua empresa
			</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email" >E-MAIL</label>
				<input onChange={hangleInputChange} type='text' id="email" placeholder="Seu melhor e-mail"></input>
				{loading?
				<button className='btn' disabled type='button'>
					<img src={LoadingImg} alt="loading" width="40px"/>
				</button>
				:
				<button className='btn' type='submit'>
					Entrar
				</button>
				}
				
			</form>
		</Fragment>
	)
}