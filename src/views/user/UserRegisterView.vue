<template>
  <div id="userlogin">
    <h1 style="text-align: center; margin-bottom: 100px; letter-spacing: 50px">
      注册
    </h1>
    <a-row class="grid-demo" :gutter="24">
      <a-col :span="12">
        <div>
          <a-image width="600px" :src="ing" style="margin-top: -65px" />
        </div>
      </a-col>
      <a-col :span="12">
        <div>
          <a-form
            ref="formRef"
            :model="form"
            :style="{ width: '500px' }"
            size="large"
          >
            <a-form-item
              field="userName"
              :hide-asterisk="true"
              :rules="[{ required: true, message: '昵称不能为空' }]"
            >
              <a-input v-model="form.userName" placeholder="请输入昵称">
                <template #prefix>
                  <icon-user />
                </template>
              </a-input>
            </a-form-item>


            <a-form-item
                field="userAccount"
                :hide-asterisk="true"
                :rules="[{ required: true, message: '用户名不能为空' }]"
            >
              <a-input v-model="form.userAccount" placeholder="请输入账号">
                <template #prefix>
                  <icon-user />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              field="userPassword"
              :hide-asterisk="true"
              :rules="[{ required: true, message: '用户名不能为空' }]"
            >
              <a-input-password
                v-model="form.userPassword"
                autocomplete="off"
                placeholder="请输入密码"
              >
                <template #prefix>
                  <icon-lock />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item field="isRead">
              <a-checkbox>单选按钮</a-checkbox>

              <a class="forgetpas">忘记密码?</a>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" @click="handleRegister" long
                >注册</a-button
              >
            </a-form-item>

            <a-form-item>
              <a-button @click="submitView" long>登录</a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import ing from "@/assets/login.svg";
import {UserControllerService} from "@/service";
import router from "@/router";
import message from "@arco-design/web-vue/es/message";

const submitView = () => {
  router.push({
    path: "/user/login"
  })
}

const handleRegister = async () => {
  const res = await UserControllerService.addUserUsingPost(form)
  if (res.code == 0){
    message.success("注册成功")
  }else {
    message.error("注册失败")
  }
  router.push({
    path:"/user/login"
  })
}

const form = reactive({
  userName:"",
  userAccount: "",
  userPassword: "",
});
</script>

<style scoped>
#userlogin {
  padding: 30px;
}

.forgetpas {
  margin-left: 250px;
  text-decoration: none;
  color: #57a9fb;
  cursor: pointer;
}

.forgetpas:hover {
  color: #3491fa;
}
</style>