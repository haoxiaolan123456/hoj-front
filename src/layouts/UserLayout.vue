<template>
  <dvi id="usrlayout">
    <a-layout style="min-height: 100vh" class="conent">
<!--          <a-layout-header>-->
<!--            用户界面-->
<!--          </a-layout-header>-->
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">Footer</a-layout-footer>
    </a-layout>
  </dvi>
</template>
<script setup></script>
<style scoped>
.conent{
  background-color:#f2f3f5;
}

.footer {
  position: sticky;
  padding: 20px;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
}
</style>


