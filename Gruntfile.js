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
        src: ['src/node.js', 'src/priorityqueue.js', 'src/instance.js', 'src/easystar.js'],
        dest: '',
      }
    }
  });

  var releaseFilename = "bin/easystar-" + grunt.file.readJSON('package.json').version + ".min.js";
  var files = {};
  files[releaseFilename] = ['src/node.js', 'src/priorityqueue.js', 'src/instance.js', 'src/easystar.js'];
  grunt.config.set('uglify.release.files',files)

  grunt.config.set('concat.dist.dest', "bin/easystar-" + grunt.file.readJSON('package.json').version + ".js")

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

};