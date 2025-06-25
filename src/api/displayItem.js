import request from '@/utils/request'
import { message } from 'antd'

/**
 * 获取所有的展示项
 */
export const listDisplayItems = async () => {
  try {
    const res = await request.get('/display-item/list')
    return res
  } catch (err) {
    console.error('获取展示项列表失败:', err)
    message.error('获取展示项列表失败')
    throw err
  }
}