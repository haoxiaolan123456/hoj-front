<template>
  <h1>题目管理</h1>
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
  >
    <template #tags="{ record }">
      <a-space wrap>
        <a-tag v-for="(item, index) of record.tags" :key="index" color="blue"
          >{{ item }}
        </a-tag>
      </a-space>
    </template>

    <template #createTime="{ record }">
      {{ moment(record.createTime).format("YYYY-MM-DD") }}
    </template>

    <template #updateTime="{ record }">
      {{ moment(record.createTime).format("YYYY-MM-DD") }}
    </template>

    <template #optional="{ record }">
      <a-space>
        <a-button type="primary" status="success" @click="update(record)"
          >修改
        </a-button>
        <a-button type="primary" status="danger" @click="remove(record)"
          >删除
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
import moment from "moment/moment";

//获取数据
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    Searchpage
  );
  if (res.code === 0) {
    total.value = parseInt(res.data.total);
    datalist.value = res.data.records;
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
  current: 1,
  pageSize: 10,
});

const router = useRouter();

//更新函数
const update = (record: QuestionVO) => {
  router.push({
    path: "/updatequest",
    query: {
      id: record.id,
    },
  });
};

//删除函数
const remove = async (record: QuestionVO) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: record.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败" + res.message);
  }
};

//组件加载完成时执行的钩子
onMounted(() => {
  loadData();
});

const onPageChange = (current: number) => {
  Searchpage.current = current
  loadData();
};

//表格的列名
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },

  {
    title: "标签",
    slotName: "tags",
  },

  // {
  //   title: "测试用例",
  //   dataIndex: "judgeCase",
  // },
  //
  // {
  //   title: "判题要求",
  //   dataIndex: "judgeConfig",
  // },

  {
    title: "内容",
    dataIndex: "content",
  },

/*  {
    title: "答案",
    dataIndex: "answer",
  },*/

  {
    title: "创建时间",
    slotName: "createTime",
  },

  {
    title: "修改时间",
    slotName: "updateTime",
  },

  {
    title: "操作",
    slotName: "optional",
  },
];
</script>

<style scoped></style>
