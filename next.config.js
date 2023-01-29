/** @type {import('next').NextConfig} */
// const webpackConfig = require("./webpack.config");

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   webpack(config) {
//     return webpackConfig;
//   },
// };

const withLess = require("next-with-less");

// const themeVariables = lessToJS(
//   fs.readFileSync(
//     path.resolve(__dirname, "./public/styles/custom.less"),
//     "utf8"
//   )
// );

module.exports = withLess({
  // optional: you can modify antd less variables directly here
  // modifyVars: { "@primary-color": "#04f" },
  // // Or better still you can specify a path to a file
  // lessVarsFilePath: "./styles/variables.less",
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
      // modifyVars: themeVariables, // make your antd custom effective
      localIdentName: "[path]___[local]___[hash:base64:5]",
    },
  },
});
//   // Other Config Here...

//   webpack(config) {
//     return config;
//   },

//   // ONLY for Next.js 10, if you use Next.js 11, delete this block
// });

// module.exports = nextConfig;
