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
                            ...
                        }
                    }
                }]
            }
        ]
    },
```

## License
[The MIT License (MIT)](http://opensource.org/licenses/MIT)

