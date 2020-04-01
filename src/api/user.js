import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: 'https://tieta.wuminmin.top/canteen/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-element-admin/user/info',
    url: 'https://tieta.wuminmin.top/canteen/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    // url: '/vue-element-admin/user/logout',
    url: 'https://tieta.wuminmin.top/canteen/logout',
    method: 'post'
  })
}
