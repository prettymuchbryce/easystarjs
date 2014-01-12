module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    uglify: {
      release: {
        files: {}
      }
    },
    concat: {
      options: {},
      dist: {
        src: ['src/node.js', 'src/priorityqueue.js', 'src/instance.js', 'src/easystar.js', 'src/amd.js'],
        dest: '',
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      dev: {

      },
      coverage: {
        preprocessors: {
          'src/*.js': 'coverage'
        },

        browsers: ['PhantomJS'],
        coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        },
        reporters: ['coverage', 'progress']
      }
    }
  });

  var releaseFilename = "bin/easystar-" + grunt.file.readJSON('package.json').version + ".min.js";
  var files = {};
  files[releaseFilename] = ['src/node.js', 'src/priorityqueue.js', 'src/instance.js', 'src/easystar.js', 'src/amd.js'];
  grunt.config.set('uglify.release.files',files)

  grunt.config.set('concat.dist.dest', "bin/easystar-" + grunt.file.readJSON('package.json').version + ".js")

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');


};
