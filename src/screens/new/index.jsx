import React,{useState,useMemo} from 'react'
import {useHistory} from 'react-router-dom'
import api from '../../services/api'
import cameraImg from '../../assets/camera.png'
import LoadingImg from '../../assets/loading.gif'

import './style.css'
export default function New(props){
	const history = useHistory()
	if(!sessionStorage.getItem("user")){
		history.push('/')
		return null
	}
	const [thumbnail,setThumbnail]=useState(null)
	const [company,setCompany]=useState('')
	const [techs,setTechs]=useState('')
	const [price,setPrice]=useState('')
	const [loading,setLoading] = useState(false)

	const preview = useMemo(()=>{
		//console.log(URL.createObjectURL(thumbnail));
		return thumbnail?URL.createObjectURL(thumbnail):null
	},[thumbnail])
	async function handleSubmit(e){
		e.preventDefault()
		const user_id = localStorage.getItem('user')

		const data = new FormData()
		data.append('thumbnail',thumbnail)
		data.append('company',company)
		data.append('techs',techs)
		data.append('price',price)
		try{
			setLoading(true)
			const response = await api.post('/spots/store',data,{
				headers:{user_id}
			})
			setLoading(false)
			console.log(response);
			props.history.push('/dashBoard')
		}
		catch(err){
			console.log('err:');
			console.log(err);
		}
	}
	return (
		<form onSubmit={handleSubmit}>
			<label 
				id='thumbnail' 
				style={{backgroundImage:`url(${preview})`}}
				className={preview?'has-thumbnail':''}
			>
				<input 
					type='file'
					onChange={e => setThumbnail(e.target.files[0])}
				/>
				<img  src={cameraImg} width='50px' alt='Selecione uma imagem'/>
			</label>
			<label htmlFor='company'>EMPRESA *</label>
			<input
				id='company'
				placeholder='Sua empresa incrível'
				value={company}
				onChange={e => setCompany(e.target.value)}
			/>
			<label htmlFor='techs'>TECNOLOGIAS * <span>(Separadas por virgula)</span></label>
			<input
				id='techs'
				placeholder='Quais tecnologias usam?'
				value={techs}
				onChange={e => setTechs(e.target.value)}
			/>
			<label htmlFor='price'>VALOR DA DIÁRIA * <span>(Em branco para gratuito)</span></label>
			<input
				id='price'
				placeholder='Valor cobrado por dia'
				value={price}
				onChange={e => setPrice(e.target.value)}
			/>
			{loading?
				<button className='btn' disabled type='button'>
					<img src={LoadingImg} alt="loading" width="40px"/>
				</button>
				:
				<button className='btn' type='submit'>
					Cadastrar
				</button>
				}
		</form>
	)
}