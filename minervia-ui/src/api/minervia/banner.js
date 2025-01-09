import request from '@/utils/request'

// 查询Banner列表
export function listBanner(query) {
    return request({
        url: '/banner/list',
        method: 'get',
        params: query
    })
}

// 查询Banner详细
export function getBanner(Id) {
    return request({
        url: '/banner/' + Id,
        method: 'get'
    })
}

// 新增Banner
export function addBanner(data) {
    return request({
        url: '/banner',
        method: 'post',
        data: data
    })
}

// 修改Banner
export function updateBanner(data) {
    return request({
        url: '/banner',
        method: 'put',
        data: data
    })
}


// 删除Banner
export function delBanner(Id) {
    return request({
        url: '/banner/' + Id,
        method: 'delete'
    })
}

