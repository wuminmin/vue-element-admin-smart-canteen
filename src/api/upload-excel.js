import request from '@/utils/request'

export function upload_canteen_list(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: 'https://wx.wuminmin.top/canteen/upload_canteen_list',
    method: 'post',
    data
  })
}