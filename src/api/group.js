import request from '@/utils/request'
import { message } from 'antd'

/**
 * 将一个任务类移动到某个任务组下
 * @param {number} categoryId - 任务类ID
 * @param {number} groupId - 目标任务组ID
 */
export const moveCategoryToGroup = async (categoryId, groupId) => {
  try {
    const res = await request.put('/group/move', null, {
      params: { categoryId, groupId }
    })
    return res
  } catch (err) {
    console.error('移动任务类失败:', err)
    message.error('移动任务类失败')
    throw err
  }
}

/**
 * 创建任务组
 * @param {string} groupName - 任务组名称
 */
export const saveGroup = async (groupName) => {
  try {
    const res = await request.post('/group/save', null, {
      params: { groupName }
    })
    return res
  } catch (err) {
    console.error('创建任务组失败:', err)
    message.error('创建任务组失败')
    throw err
  }
}

/**
 * 更新任务类排序
 * @param {Object} data - CategorySortDTO 参数对象
 * @param {number} data.groupId - 任务组ID
 * @param {Array<number>} data.categoryIds - 任务类ID排序列表
 */
export const sortCategory = async (data) => {
  try {
    const res = await request.put('/group/sort', data)
    return res
  } catch (err) {
    console.error('任务类排序失败:', err)
    message.error('任务类排序失败')
    throw err
  }
}

/**
 * 获取某个任务组下的所有任务类
 * @param {number} groupId - 任务组ID
 */
export const listGroupCategory = async (groupId) => {
  try {
    const res = await request.get('/group/list', {
      params: { groupId }
    })
    return res
  } catch (err) {
    console.error('获取任务组下的任务类失败:', err)
    message.error('获取任务组下的任务类失败')
    throw err
  }
}