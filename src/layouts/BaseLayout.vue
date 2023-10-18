<template>
  <a-layout style="height: 400px">
    <a-layout-header>
      <GlobalNav></GlobalNav>
    </a-layout-header>
    <a-layout-content>
      <router-view />
    </a-layout-content>
    <a-layout-footer class="footer">Footer</a-layout-footer>
  </a-layout>
</template>
<script setup>
import GlobalNav from "@/components/GlobalNav.vue";
</script>
<style scoped>
.footer {
  background-color: skyblue;
  position: absolute;
  padding: 20px;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
}
</style>
