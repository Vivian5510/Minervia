import request from '@/utils/request'

// 查询Category列表
export function listCategory(query) {
    return request({
        url: '/category/list',
        method: 'get',
        params: query
    })
}

// 查询Category详细
export function getCategory(Id) {
    return request({
        url: '/category/' + Id,
        method: 'get'
    })
}

// 新增Category
export function addCategory(data) {
    return request({
        url: '/category',
        method: 'post',
        data: data
    })
}

// 修改Category
export function updateCategory(data) {
    return request({
        url: '/category',
        method: 'put',
        data: data
    })
}


// 删除Category
export function delCategory(Id) {
    return request({
        url: '/category/' + Id,
        method: 'delete'
    })
}

