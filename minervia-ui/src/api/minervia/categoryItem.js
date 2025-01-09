import request from '@/utils/request'

// 查询CategoryItem列表
export function listCategoryItem(query) {
    return request({
        url: '/categoryItem/list',
        method: 'get',
        params: query
    })
}

// 查询CategoryItem详细
export function getCategoryItem(Id) {
    return request({
        url: '/categoryItem/' + Id,
        method: 'get'
    })
}

// 新增CategoryItem
export function addCategoryItem(data) {
    return request({
        url: '/categoryItem',
        method: 'post',
        data: data
    })
}

// 修改CategoryItem
export function updateCategoryItem(data) {
    return request({
        url: '/categoryItem',
        method: 'put',
        data: data
    })
}


// 删除CategoryItem
export function delCategoryItem(Id) {
    return request({
        url: '/categoryItem/' + Id,
        method: 'delete'
    })
}

