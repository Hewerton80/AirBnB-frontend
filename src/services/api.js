import axios from 'axios'

const api = axios.create({
	//baseURL : process.env.REACT_APP_BASE_URL_BACKEND || 'http://localhost:3001'
	baseURL :"https://airnnn-backend.herokuapp.com"
})

export default api