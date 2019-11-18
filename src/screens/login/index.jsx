import React,{Fragment,useState} from 'react'
import api from '../../services/api'

export default function Login(props){
	const [email,setEmail] = useState('')
	async function handleSubmit(e){
		e.preventDefault()
		const request={
			email,
		}
		try{

			const response = await api.post('/sessions/store',request)
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
				<button className='btn' type='submit'>Entrar</button>
			</form>
		</Fragment>
	)
}