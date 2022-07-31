module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'chore',
        'docs',
        'style',
        'revert',
        'perf',
        'refactor',
        'test',
        'build',
        'ci',
      ],
    ],
  },
}
