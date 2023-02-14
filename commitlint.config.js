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
        'lrn',
      ],
    ],
    'subject-empty': [0, 'always'],
    'type-empty': [0, 'always'],
  },
}
