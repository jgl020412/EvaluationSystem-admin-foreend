//导入request.js请求工具
import request from '@/utils/adminRequest.js'
import { ref } from 'vue'

export const serviceList = ref([{
        id: "300",
        name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
        details: "暂无详细信息",
        department: "中华人民共和国文化和旅游部"
    }, {
        id: "300",
        name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
        details: "暂无详细信息",
        department: "中华人民共和国文化和旅游部"
    },
    {
        id: "300",
        name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
        details: "暂无详细信息",
        department: "中华人民共和国文化和旅游部"
    },
    {
        id: "300",
        name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
        details: "暂无详细信息",
        department: "中华人民共和国文化和旅游部"
    },
    {
        id: "300",
        name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
        details: "暂无详细信息",
        department: "中华人民共和国文化和旅游部"
    },
    {
        id: "300",
        name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
        details: "暂无详细信息",
        department: "中华人民共和国文化和旅游部"
    },
    {
        id: "300",
        name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
        details: "暂无详细信息",
        department: "中华人民共和国文化和旅游部"
    },
    {
        id: "300",
        name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
        details: "暂无详细信息",
        department: "中华人民共和国文化和旅游部"
    },
    {
        id: "300",
        name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
        details: "暂无详细信息",
        department: "中华人民共和国文化和旅游部"
    },
    {
        id: "300",
        name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
        details: "暂无详细信息",
        department: "中华人民共和国文化和旅游部"
    },
    {
        id: "300",
        name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
        details: "暂无详细信息",
        department: "中华人民共和国文化和旅游部"
    },
    {
        id: "300",
        name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
        details: "暂无详细信息",
        department: "中华人民共和国文化和旅游部"
    },
])

export const getServiceList = () => {
    return request.post('/serviceMng/getServiceList')
}

export const getServiceListByName = (name) => {
    const params = new URLSearchParams()
    params.append("name", name)
    return request.post("/serviceMng/getServiceListByName", params)
}

export const saveOrUpdateService = (saveOrModifyServiceBo) => {
    return request.post("/serviceMng/saveOrUpdateService", saveOrModifyServiceBo)
}

export const deleteService = (id) => {
    const params = new URLSearchParams()
    params.append("id", id)
    return request.post("/serviceMng/deleteService", params)
}

export const getTotalServiceCount = async() => {
    return request.get("/serviceMng/getTotalServiceCount");
}