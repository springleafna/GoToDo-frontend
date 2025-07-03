import request from '@/utils/request'

/**
 * 创建便签（点击“新建”时调用）
 * 返回memoId
 */
export const saveMemo = async () => {
  try {
    const res = await request.post('/memo/save')
    return res.data
  } catch (err) {
    console.error('创建便签失败:', err)
    message.error('创建便签失败')
    throw err
  }
}

/**
 * 创建便签，当用户离开界面且内容不为空时触发便签内容同步到数据库
 */
export const addMemo = async (memoData) => {
  try {
    const res = await request.post('/memo/add', memoData)
    return res
  } catch (err) {
    console.error('创建便签失败:', err)
    message.error('创建便签失败')
    throw err
  }
}

/**
 * 获取所有非空的便签列表
 */
export const getMemoList = async () => {
  try {
    const res = await request.get('/memo/list')
    return res
  } catch (err) {
    console.error('获取便签列表失败:', err)
    message.error('获取便签列表失败')
    throw err
  }
}

/**
 * 更新便签内容（自动保存或手动保存时调用）
 * @param {Object} memoData - MemoUpdateDTO 参数对象
 * @param {Long} memoData.memoId - 便签ID
 * @param {string} [memoData.title] - 便签标题（可为空）
 * @param {string} memoData.content - 便签内容
 * @param {number} memoData.pinned - 是否置顶 (0:否 1:是)
 */
export const updateMemo = async (memoData) => {
  try {
    const res = await request.put('/memo/update', memoData)
    return res
  } catch (err) {
    console.error('更新便签失败:', err)
    message.error('更新便签失败')
    throw err
  }
}

/**
 * 更新便签内容（自动保存或手动保存时调用）
 * @param {Object} memoData - MemoUpdateDTO 参数对象
 * @param {Long} memoData.memoId - 便签ID
 * @param {boolean} memoData.pinned - 是否置顶 (false:否 true:是)
 */
export const updatePinnedMemo = async (memoData) => {
  try {
    const res = await request.put('/memo/updatePinned', memoData)
    return res
  } catch (err) {
    console.error('更新便签置顶状态失败:', err)
    message.error('更新便签置顶状态失败')
    throw err
  }
}

/**
 * 删除便签
 * @param {Long} memoId - 便签ID
 */
export const deleteMemo = async (memoId) => {
  try {
    const res = await request.delete(`/memo/delete/${memoId}`)
    return res
  } catch (err) {
    console.error('删除便签失败:', err)
    message.error('删除便签失败')
    throw err
  }
}

/**
 * 获取便签详情
 * @param {Long} memoId - 便签ID
 */
export const getMemoDetail = async (memoId) => {
  try {
    const res = await request.get('/memo/detail', {
      params: { memoId }
    })
    return res
  } catch (err) {
    console.error('获取便签详情失败:', err)
    message.error('获取便签详情失败')
    throw err
  }
}