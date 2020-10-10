const karmaConfig = require('./karma.conf');

karmaConfig.plugins = [
  'karma-benchmark',
  'karma-benchmarkjs-reporter',
  'karma-chrome-launcher'
];

karmaConfig.frameworks = ['benchmark'];

karmaConfig.files = [
  'src/**/*.js',
  'test/easystarbenchmark.js'
];

karmaConfig.reporters = ['benchmark'];

module.exports = karmaConfig;