module.exports = {
  // 可选类型
  types: [
    {
      value: ':tada: feat',
      name: '🎉 feat|新功能',
    },
    {
      value: ':bug: fix',
      name: '🐛 fix|修复',
    },
    {
      value: ':building_construction: wip',
      name: '🏗️ wip|开发中',
    },
    {
      value: ':zap: chore',
      name: '⚡️ chore|优化',
    },
    {
      value: ':memo: docs',
      name: '📝 docs|文档变更',
    },
    {
      value: ':art: style',
      name: '🎨 style|代码格式(不影响代码运行的变动)',
    },
    {
      value: ':recycle: refactor',

      name: '♻️ refactor|重构(既不增加feature,也不是修复bug)',
    },
    {
      value: ':rocket: perf',
      name: '🚀 perf|性能优化',
    },
    {
      value: ':construction: test',
      name: '🚧 test|测试',
    },
    {
      value: ':rewind: revert',
      name: '⏪ revert|回退',
    },
    {
      value: ':package: build',
      name: '📦️ build|打包',
    },
  ],

  // 步骤

  messages: {
    type: '请选择提交的类型：',
    customScope: '情输入修改的范围（可选）',
    subject: '请简要描述提交（必填）',
    body: '请输入详细描述（可选）',
    footer: '请输入要关闭的issuse（可选）',
    confirmCommit: '确认要使用以上信息提交？（y/n）',
  },
  // 默认长度72
  subjectLimit: 72,
}
