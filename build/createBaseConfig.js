const createMegaloTarget = require( '@megalo/target' )
const compiler = require( '@megalo/template-compiler' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' )
const pages = require('./entry')
const _ = require( './util' );

const CSS_EXT = {
  wechat: 'wxss',
  alipay: 'acss',
  swan: 'css',
};

function createBaseConfig( platform = 'wechat' ) {
  const cssExt = CSS_EXT[platform]

  return {
    mode: 'development',

    target: createMegaloTarget( {
      compiler: Object.assign( compiler, { } ),
      platform,
      htmlParse: {
        templateName: 'octoParse',
        src: _.resolve(`./node_modules/octoparse/lib/platform/${platform}`)
      }
    } ),

    entry: {
      'app': _.resolve( 'src/app.js' ),
      ...pages
    },

    output: {
      path: _.resolve( `dist-${platform}/` ),
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/[id].js'
    },

    devServer: {
      // hot: true,
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]|megalo[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      },
      runtimeChunk: {
        name: 'runtime'
      }
    },

    // devtool: 'cheap-source-map',
    devtool: false,

    resolve: {
      extensions: ['.vue', '.js', '.json'],
      alias: {
        'vue': 'megalo',
        '@': _.resolve('src'),
        'flyio': 'flyio/dist/npm/wx'
      },
    },

    module: {
      rules: [
        // eslint
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [_.resolve('src')],
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },

        // ... other rules
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                a: 1,
                cacheIdentifier: 'x'
              }
            }
          ]
        },

        {
          test: /\.js$/,
          use: 'babel-loader'
        },

        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },

        {
          test: /\.styl(us)?$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader',
          ]
        },

        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            path: _.resolve(`dist-${platform}/`),
            name: './src/images/[name].[ext]'
          }
        }
      ]
    },

    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin( {
        filename: `./static/css/[name].${cssExt}`,
      } ),
      new CopyWebpackPlugin([{
        from: _.resolve(__dirname, '../src/images'),
        to: _.resolve(`dist-${platform}/static/images`),
        ignore: ['.*']
      }])
    ],
    stats:{
      env: true,
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      entrypoints: false,
    }
  }
}

module.exports = createBaseConfig
