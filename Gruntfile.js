module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    uglify: {
      release: {
        files: {}
      }
    }
  });

  var releaseFilename = "bin/easystar-" + grunt.file.readJSON('package.json').version + ".min.js";
  var files = {};
  files[releaseFilename] = ['src/node.js', 'src/priorityqueue.js', 'src/instance.js', 'src/easystar.js'];
  grunt.config.set('uglify.release.files',files)

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

};