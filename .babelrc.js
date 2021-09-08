module.exports = {
    "presets": [
        "next/babel",
        ["@babel/preset-env", {
            "targets": {
                "chrome": 75,
                "esmodules": true,
            },
            "bugfixes": true,
            "loose": true,
            "shippedProposals": true
        }],
        "@babel/preset-react",
    ],
    "plugins": [
        "styled-components",
        ["@babel/plugin-proposal-export-default-from"],
        ["@babel/plugin-syntax-throw-expressions"],
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
        ["module-resolver", {
            "root": ["./src"],
            "alias": { '@': __dirname+"/src/" },
        }],
        /* ['babel-plugin-transform-imports',{
            '@material-ui/core': {
                // Use "transform: '@material-ui/core/${member}'," if your bundler does not support ES modules
                'transform': '@material-ui/core/esm/${member}',
                'preventFullImport': true
            },
            '@material-ui/icons': {
                // Use "transform: '@material-ui/icons/${member}'," if your bundler does not support ES modules
                'transform': '@material-ui/icons/esm/${member}',
                'preventFullImport': true
            }
        }] */
    ]
};
