# Mypromise

一个用于学习 JavaScript 核心原理与前端基础知识的练习项目。项目通过手写常用原生 API、Promise、工具函数和经典页面布局，帮助理解它们的运行机制与实现思路，而不只是停留在 API 的使用层面。

## 项目内容

- **手写 Promise**：实现状态管理、链式调用、值穿透、异常处理，以及 `resolve`、`reject`、`all`、`any`、`race`、`allSettled` 等静态方法。
- **原生 API 实现**：包含 Array、Object 和 Function 常用方法的模拟实现，例如数组遍历与变更方法、`Object.assign`、`call`、`apply`、`bind` 等。
- **常用工具函数**：包含深浅拷贝、防抖、节流、柯里化、函数组合、记忆函数、集合运算、JSON 序列化等练习。
- **JavaScript 基础专题**：整理多种继承方式和常见设计模式的示例。
- **经典 CSS 布局**：提供圣杯布局、双飞翼布局和瀑布流布局的可运行示例。

## 目录结构

```text
.
├── NativeJs/                    # 原生 API、Promise 和工具函数实现
│   ├── Promise.js               # 自定义 MyPromise
│   ├── Array.js                 # Array 方法实现
│   ├── Object.js                # Object 方法实现
│   ├── Function.js              # call、apply、bind 实现
│   ├── methods.js               # 常用工具函数
│   ├── inherit.js               # JavaScript 继承示例
│   └── designPattern.js         # 设计模式示例
├── CommonLayout/                # 常见页面布局示例
│   ├── HolyGrailLayout/         # 圣杯布局
│   ├── DoubleWingLayout/        # 双飞翼布局
│   └── WaterfallLayout/         # 瀑布流布局
├── cesPromise.js                # Promise 示例与测试代码
├── cesArray.js                  # Array 示例与测试代码
├── cesObject.js                 # Object / Function 示例与测试代码
├── index3.js                    # 工具函数练习
└── index4.js                    # JavaScript 综合练习
```

## 快速开始

本项目以原生 JavaScript 为主，准备好 Node.js 和浏览器即可运行。

```bash
# 运行 Promise 示例
node cesPromise.js

# 运行数组或对象相关示例
node cesArray.js
node cesObject.js
```

布局示例可直接使用浏览器打开对应目录中的 `index.html`。部分练习代码默认以注释形式保留，使用时可取消相应注释并重新运行。

## 说明

该项目主要用于原理学习和个人练习，代码侧重展示实现过程，不建议直接用于生产环境。阅读源码时可以结合原生 API 的实际行为进行对比，以进一步理解边界情况与规范细节。
