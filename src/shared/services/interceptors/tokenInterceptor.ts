import { environments } from '../../environments'

export const tokenInterceptor = (request: any) => {
  const token = localStorage.getItem(environments.APP_NAME)

  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
}
