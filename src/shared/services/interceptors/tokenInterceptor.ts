import { environments } from '../../environments'

export const tokenInterceptor = (request: any) => {
  const payload = localStorage.getItem(environments.APP_NAME)

  if (!payload) return request

  const { token } = JSON.parse(payload)

  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
}
