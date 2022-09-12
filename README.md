# webpack 测试
```
// webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 开发者工具 不需要开发调试
  devtool: false,
  // 开发模式 不进行代码压缩
  mode: 'development',
  // 入口文件
  entry: './index.js',
  output: {
    // 输出文件名称
    filename: 'bundle.js',
    // 输出文件路径
    path: path.join(__dirname, './'),
  },
  module: {
    rules: [
      {
        // 正则匹配后缀名为 .css 的文件
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  devServer: {
    // DevServer 根目录
    static: './',
    // DevServer 端口
    port: 8081,
    // 打开浏览器
    open: true,
  },
};
```
## entry
+ webpack的入口

## output
+ webpack的出口

## module
+ 配置webpack的loader

## plugins
+ 配置webpack的plugins


