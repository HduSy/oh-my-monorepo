# setTimeout 第二个参数必须为整数 (settimeout-correct-number)

Please describe the origin of the rule here.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

setTimeout(()=>console.log(0))
setTimeout(()=>console.log(0), 0)
setTimeout(()=>console.log(0), 1)

```

Examples of **correct** code for this rule:

```js

setTimeout(()=>console.log(0), -1.1)
setTimeout(()=>console.log(0), 1.1)

```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
