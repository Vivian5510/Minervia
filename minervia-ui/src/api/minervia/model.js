import request from '@/utils/request'

// 查询Model列表
export function listModel(query) {
    return request({
        url: '/model/list',
        method: 'get',
        params: query
    })
}

// 查询Model详细
export function getModel(Id) {
    return request({
        url: '/model/' + Id,
        method: 'get'
    })
}

// 新增Model
export function addModel(data) {
    return request({
        url: '/model',
        method: 'post',
        data: data
    })
}

// 修改Model
export function updateModel(data) {
    return request({
        url: '/model',
        method: 'put',
        data: data
    })
}


// 删除Model
export function delModel(Id) {
    return request({
        url: '/model/' + Id,
        method: 'delete'
    })
}

