import axios from "axios"
export const LambdaAPI = {
  _url: "https://7b7xlap5jvkahyo5himfrzqy640qnadr.lambda-url.eu-west-1.on.aws",
  post: async (path, body, options = {}) => {
    let url = new URL(`${LambdaAPI._url}/${path}`)
    const token = localStorage.getItem('auth.token')
    return axios.post(url, body, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined  
      },
      ...options
    })
  },
  get: async (path, options = {}) => {
    let url = new URL(`${LambdaAPI._url}/${path}`)
    const token = localStorage.getItem('auth.token')
    return axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined 
      },
      ...options 
    })
  }
}