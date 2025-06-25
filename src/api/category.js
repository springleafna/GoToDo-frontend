import request from '@/utils/request'
import { message } from 'antd'

/**
 * 获取任务分类列表
 */
export const listTaskCategories = async () => {
  try {
    const res = await request.get('/category/list')
    return res
  } catch (err) {
    console.error('获取任务分类列表失败:', err)
    message.error('获取任务分类列表失败')
    throw err
  }
}

/**
 * 创建任务分类
 * @param {string} categoryName - 分类名称
 */
export const createTaskCategory = async (categoryName) => {
  try {
    const res = await request.post('/category/save', null, {
      params: { categoryName }
    })
    return res
  } catch (err) {
    console.error('创建任务分类失败:', err)
    message.error('创建任务分类失败')
    throw err
  }
}

/**
 * 将一个任务移动到某个任务分类下
 * @param {number} taskId - 任务ID
 * @param {number} categoryId - 目标分类ID
 */
export const moveTaskToCategory = async (taskId, categoryId) => {
  try {
    const res = await request.put('/category/move', null, {
      params: { taskId, categoryId }
    })
    return res
  } catch (err) {
    console.error('移动任务失败:', err)
    message.error('移动任务失败')
    throw err
  }
}

/**
 * 更新任务排序
 * @param {Object} data - TaskSortDTO 参数对象
 * @param {number} data.categoryId - 分类ID
 * @param {Array<number>} data.taskIds - 任务ID排序列表
 */
export const sortTasks = async (data) => {
  try {
    const res = await request.put('/category/sort', data)
    return res
  } catch (err) {
    console.error('任务排序失败:', err)
    message.error('任务排序失败')
    throw err
  }
}