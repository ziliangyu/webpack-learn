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

[项目性能优化之用url-loader把小图片转base64，大图片使用image-webpack-loader压缩](https://segmentfault.com/a/1190000042008146?utm_source=sf-similar-article)
```
chainWebpack(config) {
    config.module.rule("images").test(/\.(jpg|jpeg|png|gif|ico)$/) // 给这些图片类型做压缩
        .use("url-loader") // url-loader要搭配file-loader做图片压缩
        .loader("url-loader")
        .options({
            limit: 1024 * 12,// 小于12kb的图片压缩成base64，图片太大转成base64反而不太合适
            name: "static/img/[name].[ext]"//指定打包后的图片存放的位置，一般放在static下img文件夹里 name.ext分别为：文件名.文件后缀（按照原图片名）
        })
        .end() // 返回上一级 以便于继续添加loader
        .use('image-webpack-loader')
        .loader("image-webpack-loader")
        .options({
            disable: process.env.NODE_ENV == 'development' ? true : false, // 开发环境禁用压缩，生产环境才做压缩，提升开发调试速度
            mozjpeg: { quality: 60 }, // 压缩JPEG图像，压缩质量quality为60，范围0到100
            optipng: { enabled: true }, // 压缩PNG图像，enabled为true开启压缩
            pngquant: { quality: [0.65, 0.90], speed: 4 }, // 质量区间和速度就使用默认值吧
            gifsicle: { interlaced: false }, // Interlace gif for progressive rendering 默认false
            webp: { quality: 60 } // 压缩webp图片，压缩质量quality为60，范围0到100
        })
        .end() // 返回上一级 继续添加loader
        .enforce('post') // 表示先执行配置在下面那个loader，即image-webpack-loader
},
```
## 压缩CSS
安装插件：  npm  install  css-minimizer-webpack-plugin  --save-dev
+ 引入
```
//引入css-minimizer-webpack-plugin
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
```
+ 配置插件
```
plugins: [
    //压缩css
    new CssMinimizerWebpackPlugin()
],
```
## 压缩 js、html
```
module.exports = {
  mode: 'production'
}
```
## Webpack的externals的理解
+ 通过externals加载外部资源，从而让项目体积更小。
+ 默认情况下，通过import导入的第三方依赖包，最终会被合并到同一个文件中，从而导致打包成功后，单个文件的体积过大的问题。
+ 为了解决上述问题，可以通过webpack的externals节点，来配置并加载外部的CDN资源，凡是在exernals中的第三方依赖包，都不会被打包。用到的时候直接通过script引入。



