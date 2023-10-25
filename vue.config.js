const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8081,
  },

  chainWebpack(config) {
    config.plugin("moncao").use(new MonacoWebpackPlugin());
  },
});
