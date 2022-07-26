# eslint-plugin-canyon

Collection of useful rules in every day work.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-canyon`:

```sh
npm install eslint-plugin-canyon --save-dev
```

## Usage

Add `canyon` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "canyon"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "canyon/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


