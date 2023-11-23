<template>
  <a-table
    :columns="columns"
    :data="datalist"
    @page-change="onPageChange"
    :pagination="{
      total,
      current: Searchpage.current,
      pageSize: Searchpage.pageSize,
      showTotal: true,
    }"
    style="width: 1200px; margin: 0 auto"
  >
    <template #tags="{ record }">
      <a-space wrap>
        <a-tag v-for="(item, index) of record.tags" :key="index" color="blue"
          >{{ item }}
        </a-tag>
      </a-space>
    </template>


    <template #status="{ record }">
      <a-space wrap>
        <a-tag  color="green" v-if="record.status === 1">
          {{"成功"}}
        </a-tag>
        <a-tag  color="red" v-else>
          {{"错误"}}
        </a-tag>
      </a-space>
    </template>

    <template #rate="{ record }">
      {{
        `${record.submitNum ? record.acceptedNum / record.submitNum : 0}(${
          record.acceptedNum
        }/${record.submitNum})`
      }}
    </template>

    <template #createTime="{ record }">
      {{ moment(record.createTime).format("YYYY-MM-DD") }}
    </template>

    <template #optional="{ record }">
      <a-space>
        <a-button type="primary" status="success" @click="toDoQuestion(record)"
          >查看
        </a-button>
      </a-space>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { QuestionControllerService, QuestionVO } from "@/service";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

//获取数据
const loadData = async () => {
  const res = await QuestionControllerService.listSubmitQuestionPageUsingPost(
    Searchpage
  );
  if (res.code === 0) {
    total.value = parseInt(res.data.total);
    datalist.value = res.data.records.map((item: QuestionVO) => {
      let a = JSON.stringify(item.judgeConfig);
      return { ...item, judgeConfig: a };
    });
  } else {
    message.error("获取数据失败" + res.message);
  }
};

//表格数据
let datalist = ref([]);
//数据总数
const total = ref(0);
//查询条件
const Searchpage = reactive({
  title: "",
  language:'java',
  current: 1,
  pageSize: 10,
});

const router = useRouter();

//做题函数
const toDoQuestion = (record: QuestionVO) => {
 /* router.push({
    //todo做题路由
    path: ''
  });*/
};

//点击分页按钮
const onPageChange = (current: number) => {
  Searchpage.current = current;
  loadData();
};

//组件加载完成时执行的钩子
onMounted(() => {
  loadData();
});

const queryDate = () => {
  Searchpage.current = 1;
  loadData();
};
//表格的列名
const columns = [
  {
    title: "提交号",
    dataIndex: "id",
    width: 150,
  },

  {
    title: "状态",
    slotName: "status",
    width: 150,
  },

  {
    title: "题号",
    dataIndex: "questionId",
    width: 150,
  },

  // {
  //   title: "操作",
  //   slotName: "",
  // },


  {
    title: "提交时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
</script>

<style scoped></style>
