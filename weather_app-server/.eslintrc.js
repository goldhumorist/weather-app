module.exports = {
    env: {
        es6: true,
        node: true,
        jest: true,
        mocha: true
    },
    extends: ["airbnb-base", "plugin:prettier/recommended"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
        logger: true,
        assert: true,
        expect: true,
        chai: true,
        fetch: false,
        sinon: true,
        request: true
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        allowImportExportEverywhere: true
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                singleQuote: true,
                endOfLine: "auto",
                tabWidth: 4,
                printWidth: 120,
                trailingComma: "none",
                overrides: [
                    {
                        files: "*.json",
                        options: {
                            tabWidth: 4
                        }
                    }
                ]
            }
        ],
        "global-require": 0,
        "func-names": 0,
        // allow vars to be declared in nested funcs
        "vars-on-top": 0,
        // don't care about max-length
        "max-len": 0,
        // allow unused variables only when arguments to a function
        "no-unused-vars": ["error", { args: "none" }],
        // allow to reference functions that are defined below
        "no-use-before-define": 0,
        // allow to reassign parameters
        "no-param-reassign": 0,
        // require "new" keyword to only be used with Caps, but allow Caps to be used without new.
        // Allowed:
        // var p = new Person();
        // var p = Person();
        // Not allowed:
        // var p = new person();
        "new-cap": [2, { capIsNew: false }],
        // allow to log to console
        "no-console": 0,
        // don't warn about unnecessarily quoted props
        "quote-props": 0,
        // don't warn about padded blocks
        "padded-blocks": 0,
        // allow using prototype methods on Object
        "no-prototype-builtins": 0,
        // allow usage of ++
        "no-plusplus": 0,
        // don't warn about inconsitent windows/unix linebreaks
        "linebreak-style": 0,
        // allow any IIFE style:
        // (function() {}())
        // (function() {})()
        "wrap-iife": ["error", "any"],
        // do not force lines around directives such as "use strict"
        "lines-around-directive": 0,
        "arrow-spacing": [2, { before: true, after: true }],
        "no-const-assign": 2,
        "no-duplicate-imports": 2,
        "no-useless-computed-key": 2,
        "no-useless-rename": 2,
        "no-var": 2,
        "prefer-const": 2,
        "prefer-template": 2,
        "rest-spread-spacing": 2,
        "sort-imports": 2,
        "template-curly-spacing": 2
    }
};
