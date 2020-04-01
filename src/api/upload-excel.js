import request from '@/utils/request'

export function upload_canteen_list(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: 'https://tieta.wuminmin.top/canteen/upload_canteen_list',
    method: 'post',
    data
  })
}