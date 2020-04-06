import request from '@/utils/request'
import module from '@/settings'
export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    // url: 'https://wx.wuminmin.top/canteen/login',
    url: module.canteen_base_url+'login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-element-admin/user/info',
    // url: 'https://wx.wuminmin.top/canteen/info',
    url: module.canteen_base_url+'info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    // url: '/vue-element-admin/user/logout',
    // url: 'https://wx.wuminmin.top/canteen/logout',
    url: module.canteen_base_url+'logout',
    method: 'post'
  })
}
