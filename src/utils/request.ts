import { baseURL } from '@/config'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      console.error(res['msg']);
      return Promise.reject(new Error(res.msg))
    } else {
      return res.data
    }
  },
  error => {
    console.error('服务器或网络错误', error);
    return Promise.reject(error)
  }
)

// export async function req_get(url: string) {
//   let requestResult = {
//     code: -1,
//     msg: ''
//   }
//   try {
//     let response = await fetch(baseURL + url, {
//       method: 'GET',
//     })
//     if (!response.ok) {
//       throw new Error('服务器错误')
//     }
//     let json = await response.json()
//     if (json['code'] === 0) {
//       requestResult.code = 0
//       requestResult.msg = JSON.stringify(json['data'])
//     } else {
//       requestResult.code = json['code']
//       requestResult.msg = json['msg']
//     }
//     return requestResult
//   }
//   catch (err) {
//     requestResult.msg = '网络或服务器错误'
//     return requestResult
//   }
// }

// export async function req_post(url: string, body: Object | null = null) {
//   let requestResult = {
//     code: -1,
//     msg: ''
//   }
//   try {
//     let response = await fetch(baseURL + url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(body)
//     })
//     if (!response.ok) {
//       throw new Error('服务器错误')
//     }
//     let json = await response.json()
//     if (json['code'] === 0) {
//       requestResult.code = 0
//       requestResult.msg = JSON.stringify(json['data'])
//     } else {
//       requestResult.code = json['code']
//       requestResult.msg = json['msg']
//     }
//     return requestResult
//   } catch (err) {
//     requestResult.msg = '网络或服务器错误'
//     return requestResult
//   }

// }

export default instance