const path = require("path");

const isDevelopmentEnv = process.argv.indexOf('--development') !== -1;

module.exports = function(config) {

  let chromeFlags = [
    '--headless', // only in Production testing.
    '--disable-gpu', // only in Production testing.
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--remote-debugging-port=9222'
  ];
  if (isDevelopmentEnv) {
    chromeFlags = chromeFlags.slice(2)
  }

  let karmaReporters = [
    'verbose',
    'progress',
    'coverage-istanbul'
  ];

  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: './',

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-verbose-reporter',
      'karma-coverage-istanbul-reporter',
      'karma-webpack'
    ],

    // frameworks to use
    frameworks: ['jasmine'],

    preprocessors: {
      'src/**/*.js': ['webpack'],
      'test/**/*.js': ['webpack']
    },

    // list of files / patterns to load in the browser
    files: [
      'src/**/*.js',
      'test/easystartest.js'
    ],

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: karmaReporters,

    coverageIstanbulReporter: {
      // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: path.join(__dirname, 'coverage'),
      fixWebpackSourcePaths: true,
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies
      // webpack configuration
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js/,
            include: /src/,
            exclude: /node_modules/,
            use: "@jsdevtools/coverage-istanbul-loader"
          }
        ]
      },
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only',
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browsers: [
        'ChromeHeadless'
    ],

    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: chromeFlags
      }
    },

    coverageReporter: {
      type: 'html',
      dir: 'coverage'
    },

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 1000 * 10,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: !isDevelopmentEnv
  });
};
