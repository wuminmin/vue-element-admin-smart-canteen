import request from '@/utils/request'

export function export_canteen_data(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: 'https://tieta.wuminmin.top/canteen/export_canteen_data',
    method: 'post',
    data
  })
}