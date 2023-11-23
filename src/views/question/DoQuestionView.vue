<template>
  <a-spin dot  size="40"  tip="代码提交中" style="margin-left: 600px"  v-if="show" />
  <a-row :gutter="[24, 24]">
    <a-col :md="12" :xs="24">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" title="题目">
          <a-descriptions title="判题信息" :column="{ xs: 1, md: 3, lg: 4 }">
            <a-descriptions-item label="时间限制">
              <div>{{ questionInfo?.judgeConfig.timeLimit + "ms" }}</div>
            </a-descriptions-item>

            <a-descriptions-item label="内存限制">
              <div>{{ questionInfo?.judgeConfig.memoryLimit + "kb" }}</div>
            </a-descriptions-item>

            <a-descriptions-item label="堆栈限制">
              <div>{{ questionInfo?.judgeConfig.stackLimit + "kb" }}</div>
            </a-descriptions-item>
          </a-descriptions>
          <a-card :title="questionInfo?.title">
            <MdView :value="questionInfo?.content"></MdView>
            <template #extra>
              <a-tag
                v-for="(item, index) of questionInfo?.tags"
                :key="index"
                color="blue"
                >{{ item }}
              </a-tag>
            </template>
          </a-card>
        </a-tab-pane>

        <a-tab-pane key="2" title="题解"> 题解</a-tab-pane>

        <a-tab-pane key="3" title="评论"> 评论</a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col :md="12" :xs="24">
      编程语言：
      <a-select :style="{ width: '90px' }" v-model="form.language">
        <a-option>java</a-option>
        <a-option>cpp</a-option>
      </a-select>
      <a-button
          type="primary"
          style="margin-top: 10px; min-width: 50px; margin-left: 50px"
          @click="submit"
      >提交
      </a-button>
      <CodeEitor
        :value="form.code"
        :handleChange="codehandleChange"
        :language="form.language"
      ></CodeEitor>
    </a-col>
  </a-row>
</template>
0
<script setup lang="ts">
import {
  QuestionControllerService,
  QuestionVO,
  SubmitQuestionRequest,
} from "@/service";
import { onMounted, reactive, ref } from "vue";
import {useRoute, useRouter} from "vue-router";
import message from "@arco-design/web-vue/es/message";
import CodeEitor from "@/components/CodeEitor.vue";
import MdView from "@/components/MdView.vue";
const route = useRoute();
const router = useRouter()
const show =ref(false)

const questionInfo = ref<QuestionVO>();
onMounted(() => {
  loadData();
});
const form = ref<SubmitQuestionRequest>({
  language: "java",
  code: "",
  questionId: route.params.id as any,
});

//获取题目信息
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    route.params.id as any
  );
  if (res.code === 0) {
    message.success("成功");
    questionInfo.value = res.data;
  } else {
    message.error("获取数据失败" + res.message);
  }
};

//提交编写的代码
const submit = async () => {
  show.value = true
  const res = await QuestionControllerService.submitQuestionUsingPost(
    form.value
  );
  if (res.code === 0) {
    message.success("提交成功");

  } else {
    message.error("提交失败");
  }
  show.value = false
  router.push({
    //todo做题路由
    path: `/submited`,
  });

};
//更新代码编辑的内容
const codehandleChange = (v: string) => {
  form.value.code = v;
};

//选择编程语言
</script>

<style scoped></style>