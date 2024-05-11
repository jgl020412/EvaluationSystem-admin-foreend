//导入request.js请求工具
import request from '@/utils/evaluationRequest.js'
import { ref } from 'vue'

export const evaluationList = ref([{
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
    {
        id: "5000",
        serviceId: "3000",
        userId: "2000",
        content: "满分",
        level: 5,
        time: "2020-12-12 12:55:35",
    },
]);

export const replyList = ref([]);

export const getEvaluationList = async(serviceId, startDate, endDate, level) => {
    const params = new URLSearchParams()
    params.append("serviceId", serviceId)
    if (!(typeof startDate === 'undefined' && typeof endDate === 'undefined')) {
        params.append("startDate", startDate)
        params.append("endDate", endDate)
    }
    params.append("level", level)
    return request.post("/EvaluationMng/queryEvaluationList", params)
}

export const getReplaies = async(evaluationId) => {
    const params = new URLSearchParams()
    params.append("evaluationId", evaluationId)
    return request.post("/reply/getReplies", params)
}

export const insertReply = async(newReplyBO) => {
    return request.post("/reply/createReply", newReplyBO)
}

export const deleteReply = async(id) => {
    const params = new URLSearchParams()
    params.append("id", id)
    return request.post("/reply/deleteReply", params)
}

export const deleteEvaluation = async(id) => {
    const params = new URLSearchParams()
    params.append("id", id)
    return request.post("/EvaluationMng/deleteEvaluation", params)
}