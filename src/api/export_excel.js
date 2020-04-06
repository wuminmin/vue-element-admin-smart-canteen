import request from '@/utils/request'
import module from '@/settings'
export function export_canteen_data(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    // url: 'https://wx.wuminmin.top/canteen/export_canteen_data',
    url: module.canteen_base_url+'export_canteen_data',
    method: 'post',
    data
  })
}