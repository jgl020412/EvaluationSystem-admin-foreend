//导入request.js请求工具
import request from '@/utils/adminRequest.js'

//提供调用登录接口的函数
export const userLoginService = (loginData) => {
    const params = new URLSearchParams()
    for (let key in loginData) {
        params.append(key, loginData[key])
    }
    return request.post('/admin/doLogonByPassword', params)
}

// 提供退出登录的函数
export const userLogoutService = (adminId) => {
    const params = new URLSearchParams()
    params.append("adminId", adminId)
    return request.post('/admin/adminLogout', params)
}