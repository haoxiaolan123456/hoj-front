<template>
  <h1 style="text-align: center; margin-bottom: 50px">创建题目</h1>
  <div>
    <a-form :model="form">
      <a-form-item field="title" label="标题">
        <div style="min-width: 900px">
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
          style="width: 900px"
        ></MdEditor>
      </a-form-item>

      <a-form-item field="answer" label="答案">
        <MdEditor
          :value="form.answer"
          :handle-change="mdChangeContentAnswer"
          style="width: 900px"
        ></MdEditor>
      </a-form-item>

      <a-form-item field="tags" label="题目标签">
        <div style="min-width: 500px">
          <a-input-tag
            v-model="form.tags"
            placeholder="Please Enter"
            allow-clear
          />
        </div>
      </a-form-item>

      <a-form-item label="题目要求" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 480px">
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
      <div style="margin: 25px 0 0 284px">测试用例</div>
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
            <a-input
              v-model="item.input"
              placeholder="please enter your post..."
            />
          </a-form-item>

          <a-form-item
            :field="`intem[${index}].output`"
            :label="`测试输出-${index}`"
            :key="index"
          >
            <a-input
              v-model="item.output"
              placeholder="please enter your post..."
            />
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
      <div style="margin: -24px 0 0 358px">
        <a-button type="primary" @click="handleAdd">添加测试用例</a-button>
      </div>

      <a-button type="primary" status="success" @click="submitForm">创建</a-button>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, toRaw} from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {QuestionAddRequest, QuestionControllerService} from "@/service";
import message from "@arco-design/web-vue/es/message";

const form = reactive({
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


//发送请求
const submitForm = async ()=>{
  const res =  await QuestionControllerService.addQuestionUsingPost(form)
  if (res.code === 0){
    message.success("创建题目成功")
  }else {
    message.error(`创建题目失败${res.message}`)
  }
}


//md编辑器
const mdChangeContent = (v: string) => {
  form.content = v;
};

const mdChangeContentAnswer = (v: string) => {
  form.answer = v;
};


//删除，添加测试用例
const handleAdd = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.judgeCase.splice(index, 1);
};
</script>

<style scoped></style>
