import axios from 'axios'

import { responseInterceptor, tokenInterceptor } from './interceptors'

const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.interceptors.response.use((response) => responseInterceptor(response))
api.interceptors.request.use((request) => tokenInterceptor(request))

export { api }
