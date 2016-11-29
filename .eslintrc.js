module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jquery": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4,
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            1,
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
