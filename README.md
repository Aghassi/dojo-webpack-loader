# dojo-webpack-loader for Webpack 2
[Webpack](https://webpack.github.io/) loader for [Dojo Toolkit 1.x](https://dojotoolkit.org/) (actually, tested with version 1.10). It adapts dojo modules so they can be bundled by webpack and even used out of Dojo Toolkit ecosystem.

Originally, i have wrote this loader to be able to use remarkable [dgrid](http://dgrid.io/) component in my new project which based on webpack. Later i have added support for `dijit` package, so i hope it is enough  to work with most of dojo projects.  If you have any questions or problems with loader, please feel free to ask.

Why custom loader is needed? Because of specificity of dojo modules, webpack cannot bundle them itself (when i first tried it just had greedy required all modules until it had failed in error). So `dojo-webpack-loader` transforms modules to handle dojo loaders such as `dojo/nls!`, `dojo/text!` , disables dynamic requiring (all modules should be already in bundle) and provides api for widgets registration (used by`dojo/parser`). 

## Examples:
```javascript
module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'dojo-webpack-loader',
                    options: {
                        // We should specify paths to core and dijit modules because we using both
                        dojoCorePath: path.resolve(__dirname, './bower_components/dojo/'),
                        dojoDijitPath: path.resolve(__dirname, './bower_components/dijit/'),

                        // Languages for dojo/nls module which will be in result pack.
                        includeLanguages: ['en'],

                        staticHasFeatures: {
                            // The trace & log APIs are used for debugging the loader,
                            // so we don't need them in the build
                            'dojo-trace-api': 0,
                            'dojo-log-api': 0,
                            // This causes normally private loader data to be exposed for debugging,
                            // so we don't need that either
                            'dojo-publish-privates': 0,
                            // We're fully async, so get rid of the legacy loader
                            'dojo-sync-loader': 0,

                            // We aren't loading tests in production
                            'dojo-test-sniff': 0,

                            // No need for IE6 select bleedthrough workaround
                            'config-bgIframe': 0,

                            'config-tlmSiblingOfDojo': 0,
                            'dojo-built': 1,
                            'host-node': 0,
                            'host-rhino': 0,
                            'dom': 1,
                            'dom-qsa': 1,
                            'dom-qsa3': 1,
                            'host-browser': 1,

                            'dojo-inject-api': 1,
                            'dojo-loader-eval-hint-url': 1,
                            'dojo-combo-api': 0,
                            'dojo-undef-api': 0,
                            'config-dojo-loader-catches': 0,
                            'config-stripStrict': 0,
                            'dojo-timeout-api': 0,
                            'dojo-dom-ready-api': 0,
                            'dojo-amd-factory-scan': 0,
                            'dijit-legacy-requires': 0,
                            'dojo-unit-tests': 0
                        }
                    }
                }]
            }
        ]
    },
```

## License
[The MIT License (MIT)](http://opensource.org/licenses/MIT)

