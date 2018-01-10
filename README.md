# dojo-loader for Webpack 2
[Webpack](https://webpack.github.io/) loader for [Dojo Toolkit 1.x](https://dojotoolkit.org/) (actually, tested with version 1.10). It adapts dojo modules so they can be bundled by webpack and even used out of Dojo Toolkit ecosystem.

This package is adapted from https://github.com/Nordth/dojo-webpack-loader
It supports Webpack 2 as well as comment stripping. It will strip multiline comments, but will not strip single line comments as that can also result in destruction of regular expressions. Please see below for an example of what is needed to add to your webpack config.

## Examples:
```javascript
module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'webpack-loader-dojo',
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

## Development

1. Clone
1. `yarn`
1. `npm link` to which ever repo you intend to use with

## Tests

None, but we are always looking for contributions! There are going to be some when I have a chance. I promise...

## License
[The MIT License (MIT)](http://opensource.org/licenses/MIT)
