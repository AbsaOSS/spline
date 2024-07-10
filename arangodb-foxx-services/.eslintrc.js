module.exports = {
    env: {
        browser: false,
        commonjs: true,
        es6: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        indent: [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            // eslint-disable-next-line no-undef
            process.platform === 'win32' ? 'windows' : 'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'never'
        ]
    }
}
