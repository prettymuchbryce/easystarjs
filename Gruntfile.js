module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    uglify: {
      release: {
        files: {}
      }
    }
  });

  var releaseFilename = "easystar-" + grunt.file.readJSON('package.json').version + ".min.js";
  var files = {};
  files[releaseFilename] = ['lib/node.js', 'lib/priorityqueue.js', 'lib/easystar.js'];
  grunt.config.set('uglify.release.files',files)

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

};