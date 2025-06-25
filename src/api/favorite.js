import request from '@/utils/request'
import { message } from 'antd'

/**
 * 收藏或取消收藏任务
 * @param {number} taskId - 任务ID
 * @param {boolean} favorite - 是否收藏（true: 收藏，false: 取消收藏）
 */
export const addOrCancelFavorite = async (taskId, favorite) => {
  try {
    const res = await request.put('/favorite', null, {
      params: { taskId, favorite }
    })
    return res
  } catch (err) {
    console.error('操作收藏失败:', err)
    message.error('操作收藏失败')
    throw err
  }
}

/**
 * 获取收藏任务的数量
 */
export const countFavoriteTasks = async () => {
  try {
    const res = await request.get('/favorite/count')
    return res
  } catch (err) {
    console.error('获取收藏任务数量失败:', err)
    message.error('获取收藏任务数量失败')
    throw err
  }
}

/**
 * 获取收藏的任务列表
 */
export const getFavoriteTaskList = async () => {
  try {
    const res = await request.get('/favorite/list')
    return res
  } catch (err) {
    console.error('获取收藏任务列表失败:', err)
    message.error('获取收藏任务列表失败')
    throw err
  }
}