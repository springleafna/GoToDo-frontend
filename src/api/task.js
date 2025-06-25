import request from '@/utils/request'
import { message } from 'antd'

/**
 * 创建任务
 * @param {Object} taskData - TaskSaveDTO 参数对象
 * @param {string} taskData.title - 任务标题
 * @param {number} taskData.categoryId - 所属分类ID
 */
export const saveTask = async (taskData) => {
  try {
    const res = await request.post('/task/save', taskData)
    return res
  } catch (err) {
    console.error('创建任务失败:', err)
    message.error('创建任务失败')
    throw err
  }
}

/**
 * 获取某个任务分类下的所有任务
 * @param {number} categoryId - 分类ID
 */
export const listTaskByCategoryId = async (categoryId) => {
  try {
    const res = await request.get('/task/list', {
      params: { categoryId }
    })
    return res
  } catch (err) {
    console.error('获取任务列表失败:', err)
    message.error('获取任务列表失败')
    throw err
  }
}

/**
 * 删除任务
 * @param {number} taskId - 任务ID
 */
export const deleteTask = async (taskId) => {
  try {
    const res = await request.put('/task/delete', null, {
      params: { taskId }
    })
    return res
  } catch (err) {
    console.error('删除任务失败:', err)
    message.error('删除任务失败')
    throw err
  }
}

/**
 * 完成/未完成任务
 * @param {number} taskId - 任务ID
 * @param {boolean} status - 是否完成状态
 */
export const completedTask = async (taskId, status) => {
  try {
    const res = await request.put('/task/completed', null, {
      params: { taskId, status }
    })
    return res
  } catch (err) {
    console.error('更新任务状态失败:', err)
    message.error('更新任务状态失败')
    throw err
  }
}

/**
 * 更新任务基本信息（标题、备注、时间等）
 * @param {Object} updateData - TaskUpdateDTO 参数对象
 * @param {number} updateData.taskId - 任务ID
 * @param {string} [updateData.title] - 任务标题
 * @param {string} [updateData.remark] - 备注信息
 * @param {string} [updateData.endTime] - 结束时间（ISO格式）
 * @param {string} [updateData.reminderTime] - 提醒时间（ISO格式）
 * @param {number} [updateData.priority] - 优先级（0:低 1:中 2:高）
 */
export const updateTaskInfo = async (updateData) => {
  try {
    const res = await request.put('/task/update', updateData)
    return res
  } catch (err) {
    console.error('更新任务信息失败:', err)
    message.error('更新任务信息失败')
    throw err
  }
}