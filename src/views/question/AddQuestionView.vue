<template>
  <h1
    v-if="route.path.includes('/addquestion')"
    style="text-align: center; margin-bottom: 50px"
  >
    创建题目
  </h1>
  <h1 v-else style="text-align: center; margin-bottom: 50px">修改题目</h1>
  <div style="margin-left: 200px;:">
    <a-form :model="form">
      <a-form-item field="title" label="标题">
        <div style="width: 700px">
          <a-input
            v-model="form.title"
            placeholder="请输入标题"
            style="min-height: 50px"
          />
        </div>
      </a-form-item>

      <a-form-item field="content" label="内容">
        <MdEditor
          :value="form.content"
          :handle-change="mdChangeContent"
          style="width: 700px"
        ></MdEditor>
      </a-form-item>

      <a-form-item field="answer" label="答案">
        <MdEditor
          :value="form.answer"
          :handle-change="mdChangeContentAnswer"
          style="width: 700px"
        ></MdEditor>
      </a-form-item>

      <a-form-item field="tags" label="题目标签">
        <div style="min-width: 700px">
          <a-input-tag
            v-model="form.tags"
            placeholder="Please Enter"
            allow-clear
          />
        </div>
      </a-form-item>

      <a-form-item label="题目要求" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="width: 480px">
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
            <a-input
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入堆栈限制"
            />
          </a-form-item>
        </a-space>
      </a-form-item>

      <!--      测试用例-->
      <div style="margin: 24px 0 20px 231px">测试用例</div>
      <a-form-item
        v-for="(item, index) of form.judgeCase"
        :field="`item[${index}].input`"
        :key="index"
      >
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item
            :field="`posts[${index}].input`"
            :label="`测试输入-${index}`"
            :key="index"
          >
            <a-input v-model="item.input" placeholder="请输入测试输入用例" />
          </a-form-item>

          <a-form-item
            :field="`intem[${index}].output`"
            :label="`测试输出-${index}`"
            :key="index"
          >
            <a-input v-model="item.output" placeholder="请输入测试输出用例" />
          </a-form-item>
        </a-space>

        <a-button
          type="primary"
          status="danger"
          @click="handleDelete(index)"
          :style="{ marginLeft: '10px' }"
          >删除
        </a-button>
      </a-form-item>
      <div style="margin: -20px 0 0 300px">
        <a-button type="primary" @click="handleAdd">添加测试用例</a-button>
      </div>

      <a-button
        type="primary"
        status="success"
        @click="submitForm"
        style="width: 400px; margin: 24px 0 0 358px"
        >提交
      </a-button>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionAddRequest, QuestionControllerService } from "@/service";
import message from "@arco-design/web-vue/es/message";
import {useRoute, useRouter} from "vue-router";


const router = useRouter()
const route = useRoute();
let form = ref({
  title: "",
  content: "",
  answer: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 0,
    stackLimit: 0,
    timeLimit: 0,
  },
  tags: [],
});

onMounted(() => {
  loadData();
});

//查询数据
const loadData = async () => {
  const id: any = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(id);
  if (res.code === 0) {
    form.value = res.data as any;
    form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    form.value.tags = JSON.parse(form.value.tags as any);
    form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    console.log(form.value);
  } else {
    message.error("获取数据失败");
  }
};

//发送请求
const submitForm = async () => {
  console.log(route.path.includes("/addquestion"));
  if (route.path.includes("/addquestion")) {
    const res = await QuestionControllerService.addQuestionUsingPost(form.value);
    if (res.code === 0) {
      message.success("创建题目成功");
      router.push({
        path: "/admin/mangerquestion",
      });
    } else {
      message.error(`创建题目失败${res.message}`);
    }
  } else {
    const res = await QuestionControllerService.updateQuestionUsingPost(form.value);
    if (res.code === 0) {
      message.success("修改题目成功");
      router.push({
        path: "/admin/mangerquestion",
      });
    } else {
      message.error(`修改题目失败${res.message}`);
    }
  }
};

//md编辑器
const mdChangeContent = (v: string) => {
  form.value.content = v;
};

const mdChangeContentAnswer = (v: string) => {
  form.value.answer = v;
};

//删除，添加测试用例
const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};
</script>

<style scoped></style>
