<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="evaluation-header-wrapper">
          <div class="evaluation-service-search">
            <el-select
              v-model="serviceId"
              filterable
              remote
              reserve-keyword
              placeholder="输入服务名称"
              :remote-method="remoteMethod"
              :loading="加载中"
              style="width: 300px"
            >
              <el-option
                v-for="item in serviceList"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="evaluation-time-search">
            <el-date-picker
              v-model="date"
              type="datetimerange"
              :shortcuts="shortcuts"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
          <div class="evaluation-level-search">
            <el-input-number
              placeholder="输入星级"
              v-model="level"
              :min="-1"
              :max="5"
              @change="handleChange"
            />
          </div>
          <div class="evaluation-button-search">
            <el-button type="primary" @click="getEvaluations"
              ><el-icon><Search /></el-icon>&nbsp;&nbsp;搜索</el-button
            >
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="evalution-main">
          <el-table
            :data="evaluationList"
            stripe
            height="450px"
            style="width: 100%"
          >
            <el-table-column
              align="center"
              prop="name"
              label="服务名称"
              width="180"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              align="center"
              prop="content"
              label="内容"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              align="center"
              prop="level"
              label="评价星级"
              width="100"
            />
            <el-table-column
              align="center"
              prop="time"
              label="时间"
              width="200"
            />
            <el-table-column align="center" label="查看" width="80"
              ><template #default="{ row }">
                <div class="evaluation-list-item-button">
                  <el-button type="primary" circle @click="showReply(row)"
                    ><el-icon><ChatDotRound /></el-icon
                  ></el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>

      <!-- 弹窗部分 -->
      <el-dialog v-model="evaluationDialogVisiable" title="评价" width="800">
        <h1>服务名称：{{ evaluationData.serviceName }}</h1>
        <div>
          <div class="evaluationContent">
            评价内容：<br/>{{ evaluationData.content }}
          </div>
          <div class="evaluationOperation">
            <el-button type="warning" round @click="createReplyInitNoFather"
              ><el-icon><ChatRound /></el-icon
            ></el-button>
            <el-popconfirm
              width="220"
              confirm-button-text="确定删除"
              cancel-button-text="取消"
              icon-color="red"
              title="真的要删除这条评价吗？"
              @confirm="deleteEval"
            >
              <template #reference>
                <el-button type="danger" round
                  ><el-icon><Delete /></el-icon></el-button
                >>
              </template>
            </el-popconfirm>
          </div>
        </div>
        <div class="all-replys-list-wrapper">
          <div
            class="all-replys-list"
            v-for="(reply, index) in replyList"
            :key="index"
          >
            <div class="reply-info-wrapper">
              <!-- 回复的内容，如果判断是回复别人的留言，则再此引用一下 -->
              <div class="quote-wrapper" v-if="reply.fatherId != null">
                <span class="quote-content">
                  <span>回复“</span>
                  <span
                    ><strong>用户{{ reply.fatherUserId }}</strong
                    >：</span
                  ><span>{{ reply.fatherContent }}</span>
                  <span>”</span>
                </span>
              </div>
              <div class="blank-wrapper" v-else></div>

              <div class="publish-info">
                <div v-if="reply.isAdmin==0">用户{{ reply.userId }} 发表：</div>
                <div v-else><strong>管理员{{ reply.userId }}</strong> 发表：</div>
              </div>
              <div class="publish-content">{{ reply.content }}</div>
              <div class="publish-date">{{ reply.time }}</div>
            </div>
            <div class="replyOperation">
              <el-button type="warning" circle @click="createReplyInit(reply)"
                ><el-icon><ChatSquare /></el-icon
              ></el-button>
              <el-popconfirm
                width="220"
                confirm-button-text="确定删除"
                cancel-button-text="取消"
                icon-color="red"
                title="真的要删除这条评论吗？"
                @confirm="deleteRep(reply)"
              >
                <template #reference>
                  <el-button type="danger" circle
                    ><el-icon><Delete /></el-icon
                  ></el-button>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </div>
      </el-dialog>

      <el-dialog
        v-model="replyDialog"
        title="请输入评论内容"
        width="500"
        :before-close="handleClose"
      >
        <el-input
          v-model="newReply.content"
          :rows="5"
          type="textarea"
          placeholder="请文明发言哦"
        />
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="replyDialog = false">取消</el-button>
            <el-button type="primary" @click="createReply"> 发表 </el-button>
          </div>
        </template>
      </el-dialog>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/evaluation_mng.css";
</style>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import {
  evaluationList,
  replyList,
  getEvaluationList,
  getReplaies,
  insertReply,
  deleteReply,
  deleteEvaluation,
} from "@/api/evaluation.js";
import { serviceList, getServiceList } from "@/api/service.js";
import { useTokenStore } from "@/stores/token.js";

const evaluationDialogVisiable = ref(false);
const getServices = async () => {
  let result = await getServiceList();
  if (result.data.status == 200) {
    serviceList.value = result.data.data;
  } else {
    alert(result.data.msg ? result.data.msg : "请求失败");
  }
};
getServices();

const serviceId = ref("");
const level = ref("-1");
const date = ref({
  0: null,
  1: null,
});

const getEvaluations = async () => {
  console.log(date[0]);
  let result = await getEvaluationList(
    serviceId.value,
    date[0],
    date[1],
    level.value
  );
  if (result.data.status == 200) {
    evaluationList.value = result.data.data;
  } else {
    alert(result.data.msg ? result.data.msg : "查询失败");
  }
};
getEvaluations();

const evaluationData = ref({
  id: "",
  serviceName: "",
  content: "",
});

const showReply = async (row) => {
  evaluationData.value.serviceName = row.name;
  evaluationData.value.content = row.content;
  evaluationData.value.id = row.id;
  let result = await getReplaies(row.id);
  if (result.data.status == 200) {
    replyList.value = result.data.data;
    evaluationDialogVisiable.value = true;
  } else {
    alert(result.data.msg ? result.data.msg : "查询失败");
  }
};

const tokenStore = useTokenStore();

const newReply = ref({
  content: "",
  evaluationId: "",
  fatherId: "",
  isAdmin: "",
  userId: "",
});

const replyDialog = ref(false);

const createReplyInit = async (row) => {
  newReply.value.evaluationId = evaluationData.value.id;
  newReply.value.fatherId = row.id;
  newReply.value.isAdmin = 1;
  newReply.value.userId = tokenStore.token.adminId;
  replyDialog.value = true;
};

const createReplyInitNoFather = async () => {
  newReply.value.evaluationId = evaluationData.value.id;
  newReply.value.fatherId = null;
  newReply.value.isAdmin = 1;
  newReply.value.userId = tokenStore.token.adminId;
  replyDialog.value = true;
};

const createReply = async () => {
  let result = await insertReply(newReply.value);
  if (result.data.status == 200) {
    alert("发表成功");
  } else {
    alert(result.data.msg ? result.data.msg : "发表失败");
  }
  replyDialog.value = false;
};

const deleteRep = async (reply) => {
  console.log(reply.id);
  let result = await deleteReply(reply.id);
  if (result.data.status == 200) {
    alert("删除成功");
  } else {
    alert(result.data.msg ? result.data.msg : "删除失败");
  }
};

const deleteEval = async () => {
  let result = await deleteEvaluation(evaluationData.value.id);
  if (result.data.status == 200) {
    alert("删除成功");
  } else {
    alert(result.data.msg ? result.data.msg : "删除失败");
  }
};
</script>