# react-360zfw
尝试给公司主页换成react

做了几个表单类的Component
还有一个服务端渲染的sever.js

目前发现的主要问题是
1.公司的服务器语言是php，php做react渲染，需要v8插件，由于服务器centos6.4版本太低，按照插件失败
2.尝试调用nodejs渲染，结果发现页面慢了500ms显示，需要有完善的缓存机制，目前搁置

[运行DEMO](http://www.luoyongjie.cn/mygit/react-360zfw/)
