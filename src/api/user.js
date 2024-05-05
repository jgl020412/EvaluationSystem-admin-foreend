//导入request.js请求工具
import request from '@/utils/userRequest.js'
import { ref } from 'vue'

export const userList = ref([{
        id: "1001",
        name: "user1",
        phoneNum: "18888888888",
        mail: "288898884@user.com",
        idNum: "230123200012123456",
        job: "程序员",
        sex: "男",
        birthday: "2000-12-12",
        province: "黑龙江",
        city: "哈尔滨",
        district: "依兰县",
        status: "已冻结",
    },
    {
        id: "1001",
        name: "user1",
        phoneNum: "18888888888",
        mail: "288898884@user.com",
        idNum: "230123200012123456",
        job: "程序员",
        sex: "男",
        birthday: "2000-12-12",
        province: "黑龙江",
        city: "哈尔滨",
        district: "依兰县",
        status: "已冻结",
    },
    {
        id: "1001",
        name: "user1",
        phoneNum: "18888888888",
        mail: "288898884@user.com",
        idNum: "230123200012123456",
        job: "程序员",
        sex: "男",
        birthday: "2000-12-12",
        province: "黑龙江",
        city: "哈尔滨",
        district: "依兰县",
        status: "已冻结",
    },
    {
        id: "1001",
        name: "user1",
        phoneNum: "18888888888",
        mail: "288898884@user.com",
        idNum: "230123200012123456",
        job: "程序员",
        sex: "男",
        birthday: "2000-12-12",
        province: "黑龙江",
        city: "哈尔滨",
        district: "依兰县",
        status: "已冻结",
    },
    {
        id: "1001",
        name: "user1",
        phoneNum: "18888888888",
        mail: "288898884@user.com",
        idNum: "230123200012123456",
        job: "程序员",
        sex: "男",
        birthday: "2000-12-12",
        province: "黑龙江",
        city: "哈尔滨",
        district: "依兰县",
        status: "已冻结",
    },
])

export const getUserList = async(page, pageSize) => {
    const params = new URLSearchParams()
    params.append("page", page)
    params.append("pageSize", pageSize)
    return request.post("/userMng/getUserList", params);
}

export const changeUserStatus = async(userId, status) => {
    const params = new URLSearchParams()
    params.append("userId", userId);
    params.append("status", status === 0 ? 1 : 0);
    return request.post("/userMng/freezeUserOrNot", params)
}

export const getUserListByCondition = async(searchUserBO, page, pageSize) => {
    const params = new URLSearchParams()
    params.append("page", page)
    params.append("pageSize", pageSize)
    return request.post("/userMng/getUserListByCondition", searchUserBO, { params })
}